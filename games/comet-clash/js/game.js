/**
 * Comet Clash — whole-class projector review game
 * Grade bands + flash FX
 */
const TEAM_COLORS = ["#f472b6", "#60a5fa", "#34d399", "#fbbf24", "#a78bfa", "#2dd4bf"];
const TEAM_DEFAULTS = ["Nebula", "Quasars", "Pulsars", "Comets", "Orbits", "Meteors"];

const GRADE_ORDER = { K: 0, "1-2": 1, "3-4": 2 };

class SFX {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }
  ensure() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      this.ctx = new AC();
    }
    if (this.ctx.state === "suspended") this.ctx.resume();
    return this.ctx;
  }
  tone(f, d, type = "sine", v = 0.1, when = 0) {
    if (!this.enabled) return;
    const ctx = this.ensure();
    if (!ctx) return;
    const t0 = ctx.currentTime + when;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.value = f;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(v, t0 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + d);
    o.connect(g);
    g.connect(ctx.destination);
    o.start(t0);
    o.stop(t0 + d + 0.02);
  }
  ok() {
    [523, 659, 784].forEach((f, i) => this.tone(f, 0.12, "sine", 0.1, i * 0.07));
  }
  bad() {
    this.tone(220, 0.18, "triangle", 0.1);
    this.tone(160, 0.22, "sine", 0.08, 0.1);
  }
  tick() {
    this.tone(880, 0.04, "square", 0.04);
  }
  win() {
    [523, 659, 784, 1046, 784, 1046].forEach((f, i) => this.tone(f, 0.12, "sine", 0.1, i * 0.09));
  }
  power() {
    this.tone(392, 0.1, "sawtooth", 0.06);
    this.tone(784, 0.15, "sine", 0.1, 0.08);
  }
  launch() {
    [330, 440, 550, 660].forEach((f, i) => this.tone(f, 0.1, "sine", 0.08, i * 0.05));
  }
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function burstParticles(root, count, colors) {
  if (!root) return;
  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    p.className = "fx-particle";
    const ang = (Math.PI * 2 * i) / count + Math.random() * 0.4;
    const dist = 60 + Math.random() * 140;
    p.style.setProperty("--dx", Math.cos(ang) * dist + "px");
    p.style.setProperty("--dy", Math.sin(ang) * dist + "px");
    p.style.background = colors[i % colors.length];
    root.appendChild(p);
    setTimeout(() => p.remove(), 900);
  }
}

function screenFlash(kind) {
  const el = document.getElementById("screen-flash");
  if (!el) return;
  el.className = "screen-flash " + kind;
  el.hidden = false;
  requestAnimationFrame(() => el.classList.add("go"));
  setTimeout(() => {
    el.hidden = true;
    el.className = "screen-flash";
  }, 450);
}

class CometClash {
  constructor() {
    this.sfx = new SFX();
    this.teamCount = 3;
    this.packId = "kinder";
    this.grade = "K";
    this.questions = [];
    this.qi = 0;
    this.teams = [];
    this.selectedTeam = 0;
    this.timer = null;
    this.timeLeft = 0;
    this.timerSecs = 20;
    this.powerups = true;
    this.awaitingAnswer = false;

    this.els = {
      setup: document.getElementById("screen-setup"),
      play: document.getElementById("screen-play"),
      results: document.getElementById("screen-results"),
      teamSetup: document.getElementById("team-setup"),
      packList: document.getElementById("pack-list"),
      scoreboard: document.getElementById("scoreboard"),
      question: document.getElementById("question-text"),
      choices: document.getElementById("choices"),
      teamPick: document.getElementById("team-pick"),
      hudPack: document.getElementById("hud-pack"),
      hudProgress: document.getElementById("hud-progress"),
      hudTimer: document.getElementById("hud-timer"),
      streak: document.getElementById("streak-banner"),
      fx: document.getElementById("fx-overlay"),
      arena: document.querySelector(".arena"),
    };

    this.renderTeamSetup();
    this.renderPacks();
    this.bind();
  }

  bind() {
    document.getElementById("btn-add-team").addEventListener("click", () => {
      if (this.teamCount < 6) {
        this.teamCount += 1;
        this.renderTeamSetup();
      }
    });
    document.getElementById("btn-rem-team").addEventListener("click", () => {
      if (this.teamCount > 2) {
        this.teamCount -= 1;
        this.renderTeamSetup();
      }
    });
    document.getElementById("btn-launch").addEventListener("click", () => this.launch());
    document.getElementById("btn-abort").addEventListener("click", () => this.abort());
    document.getElementById("btn-rematch").addEventListener("click", () => this.launch());
    document.getElementById("btn-home").addEventListener("click", () => this.showSetup());
    document.getElementById("opt-sound").addEventListener("change", (e) => {
      this.sfx.enabled = e.target.checked;
    });
    document.querySelectorAll("[data-grade]").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.grade = btn.getAttribute("data-grade");
        document.querySelectorAll("[data-grade]").forEach((b) => {
          b.classList.toggle("selected", b === btn);
        });
        this.renderPacks();
      });
    });
  }

  show(name) {
    this.els.setup.hidden = name !== "setup";
    this.els.play.hidden = name !== "play";
    this.els.results.hidden = name !== "results";
  }

  showSetup() {
    this.clearTimer();
    this.show("setup");
  }

  renderTeamSetup() {
    const box = this.els.teamSetup;
    box.innerHTML = "";
    for (let i = 0; i < this.teamCount; i++) {
      const row = document.createElement("div");
      row.className = "team-row";
      const sw = document.createElement("span");
      sw.className = "team-swatch";
      sw.style.background = TEAM_COLORS[i];
      const input = document.createElement("input");
      input.type = "text";
      input.maxLength = 18;
      input.value = TEAM_DEFAULTS[i];
      input.setAttribute("aria-label", `Team ${i + 1} name`);
      row.appendChild(sw);
      row.appendChild(input);
      box.appendChild(row);
    }
  }

  packFitsGrade(pack) {
    if (!pack.grades || !pack.grades.length) return true;
    return pack.grades.includes(this.grade);
  }

  filterItems(items) {
    const max = GRADE_ORDER[this.grade] ?? 2;
    return items.filter((it) => {
      const d = it.difficulty || "all";
      if (d === "all") return true;
      const lvl = GRADE_ORDER[d];
      if (lvl === undefined) return true;
      // K band: only K items
      if (this.grade === "K") return d === "K";
      // 1-2: K and 1-2
      if (this.grade === "1-2") return lvl <= 1;
      // 3-4: all
      return true;
    });
  }

  renderPacks() {
    const box = this.els.packList;
    box.innerHTML = "";
    const packs = (window.COMET_PACKS || []).filter((p) => this.packFitsGrade(p));
    if (!packs.find((p) => p.id === this.packId)) {
      this.packId = packs[0]?.id || "mix";
    }
    packs.forEach((p) => {
      const filtered = this.filterItems(p.items || []);
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "pack-card" + (p.id === this.packId ? " selected" : "");
      btn.innerHTML =
        `<span class="pe">${p.emoji}</span>` +
        `<span class="pt">${p.title}</span>` +
        `<span class="pb">${p.blurb}</span>` +
        `<span class="pb">${filtered.length} Qs for this grade</span>`;
      btn.addEventListener("click", () => {
        this.packId = p.id;
        this.renderPacks();
      });
      box.appendChild(btn);
    });
  }

  readTeams() {
    const inputs = [...this.els.teamSetup.querySelectorAll("input")];
    return inputs.map((inp, i) => ({
      name: (inp.value || TEAM_DEFAULTS[i]).trim() || TEAM_DEFAULTS[i],
      color: TEAM_COLORS[i],
      score: 0,
      streak: 0,
      shield: false,
    }));
  }

  launch() {
    this.sfx.ensure();
    this.sfx.enabled = document.getElementById("opt-sound").checked;
    this.powerups = document.getElementById("opt-powerups").checked;
    this.timerSecs = parseInt(document.getElementById("q-timer").value, 10) || 0;
    // K default: longer time if still on 20 and they didn't change — leave as selected
    if (this.grade === "K" && !document.getElementById("q-timer").dataset.touched) {
      // keep user choice
    }
    const count = parseInt(document.getElementById("q-count").value, 10) || 12;

    const pack = (window.COMET_PACKS || []).find((p) => p.id === this.packId) || window.COMET_PACKS[0];
    let pool = this.filterItems(pack.items || []);
    if (pack.id === "mix") {
      const all = [];
      (window.COMET_PACKS || []).forEach((p) => {
        if (p.id === "mix") return;
        this.filterItems(p.items).forEach((it) => all.push({ ...it }));
      });
      pool = all;
    }
    pool = shuffle(pool);
    if (pool.length < 3) {
      alert("Not enough questions for this grade + pack. Try Cosmic Mix or another grade.");
      return;
    }
    this.questions = pool.slice(0, Math.min(count, pool.length));
    this.qi = 0;
    this.teams = this.readTeams();
    this.selectedTeam = 0;
    this.els.hudPack.textContent = `${pack.emoji} ${pack.title} · Grade ${this.grade}`;
    this.sfx.launch();
    screenFlash("launch");
    this.show("play");
    this.renderScoreboard();
    this.showQuestion();
  }

  abort() {
    if (confirm("Leave the match and return to setup?")) this.showSetup();
  }

  clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  renderScoreboard() {
    const box = this.els.scoreboard;
    box.innerHTML = "";
    this.teams.forEach((t, i) => {
      const card = document.createElement("div");
      card.className = "score-card" + (i === this.selectedTeam ? " active" : "");
      card.innerHTML =
        `<div class="sn" style="color:${t.color}">${escapeHtml(t.name)}</div>` +
        `<div class="ss">${t.score}</div>` +
        `<div class="st">${t.streak > 1 ? "🔥 " + t.streak : t.shield ? "🛡️" : "—"}</div>`;
      box.appendChild(card);
    });
  }

  renderTeamPick() {
    const box = this.els.teamPick;
    box.innerHTML = "";
    this.teams.forEach((t, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "team-chip" + (i === this.selectedTeam ? " selected" : "");
      b.textContent = t.name;
      if (i === this.selectedTeam) b.style.borderColor = t.color;
      b.addEventListener("click", () => {
        this.selectedTeam = i;
        this.renderTeamPick();
        this.renderScoreboard();
      });
      box.appendChild(b);
    });
  }

  showQuestion() {
    this.clearTimer();
    this.awaitingAnswer = true;
    const q = this.questions[this.qi];
    this.els.hudProgress.textContent = `${this.qi + 1} / ${this.questions.length}`;
    this.els.question.textContent = q.q;
    this.els.question.classList.remove("q-in");
    void this.els.question.offsetWidth;
    this.els.question.classList.add("q-in");
    this.els.streak.hidden = true;

    const choices = shuffle(q.choices || [q.a]);
    this.els.choices.innerHTML = "";
    choices.forEach((c, idx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "choice";
      btn.style.animationDelay = idx * 0.05 + "s";
      btn.textContent = c;
      btn.addEventListener("click", () => this.answer(c, btn));
      this.els.choices.appendChild(btn);
    });

    this.renderTeamPick();
    this.renderScoreboard();

    if (this.timerSecs > 0) {
      this.timeLeft = this.timerSecs;
      this.els.hudTimer.hidden = false;
      this.els.hudTimer.textContent = String(this.timeLeft);
      this.els.hudTimer.classList.remove("warn");
      this.timer = setInterval(() => {
        this.timeLeft -= 1;
        this.els.hudTimer.textContent = String(this.timeLeft);
        if (this.timeLeft <= 5) {
          this.els.hudTimer.classList.add("warn");
          this.sfx.tick();
        }
        if (this.timeLeft <= 0) {
          this.clearTimer();
          this.timeout();
        }
      }, 1000);
    } else {
      this.els.hudTimer.hidden = true;
    }
  }

  timeout() {
    if (!this.awaitingAnswer) return;
    this.awaitingAnswer = false;
    const q = this.questions[this.qi];
    [...this.els.choices.children].forEach((btn) => {
      btn.disabled = true;
      if (btn.textContent === q.a) btn.classList.add("correct");
    });
    const team = this.teams[this.selectedTeam];
    if (team) {
      team.streak = 0;
      team.shield = false;
    }
    this.sfx.bad();
    screenFlash("bad");
    this.flash("⏰", "Time!", "No points this round", () => this.next());
  }

  answer(choice, btnEl) {
    if (!this.awaitingAnswer) return;
    this.awaitingAnswer = false;
    this.clearTimer();

    const q = this.questions[this.qi];
    const correct = choice === q.a;
    const team = this.teams[this.selectedTeam];

    [...this.els.choices.children].forEach((btn) => {
      btn.disabled = true;
      if (btn.textContent === q.a) btn.classList.add("correct");
    });
    if (!correct && btnEl) btnEl.classList.add("wrong");

    let sub = "";
    if (correct) {
      team.streak += 1;
      let pts = 100;
      let bonus = "";
      if (this.powerups && team.streak >= 3) {
        pts = 200;
        bonus = " · DOUBLE POINTS!";
        this.sfx.power();
      } else {
        this.sfx.ok();
      }
      if (this.powerups && team.streak === 2) {
        team.shield = true;
        bonus += " · Shield earned!";
      }
      team.score += pts;
      sub = `${team.name} +${pts}${bonus}`;
      if (team.streak > 1) {
        this.els.streak.hidden = false;
        this.els.streak.textContent = `🔥 ${team.name} streak ×${team.streak}`;
      }
      screenFlash("good");
      burstParticles(this.els.arena, 18, [team.color, "#fbbf24", "#fff", "#67e8f9"]);
      // score pop
      const sc = this.els.scoreboard.children[this.selectedTeam];
      if (sc) {
        sc.classList.add("pop");
        setTimeout(() => sc.classList.remove("pop"), 400);
      }
      this.flash("✨", "Correct!", sub, () => this.next());
    } else {
      this.sfx.bad();
      screenFlash("bad");
      if (this.powerups && team.shield) {
        team.shield = false;
        team.streak = 0;
        sub = `${team.name} shield broke — no penalty`;
        this.flash("🛡️", "Shield!", sub, () => this.next());
      } else {
        team.streak = 0;
        sub = `Answer was “${q.a}”`;
        this.flash("💥", "Not quite", sub, () => this.next());
      }
    }
    this.renderScoreboard();
  }

  flash(emoji, title, sub, then) {
    const ov = this.els.fx;
    document.getElementById("fx-emoji").textContent = emoji;
    document.getElementById("fx-title").textContent = title;
    document.getElementById("fx-sub").textContent = sub || "";
    ov.hidden = false;
    setTimeout(() => {
      ov.hidden = true;
      then();
    }, 1100);
  }

  next() {
    this.qi += 1;
    if (this.qi >= this.questions.length) {
      this.finish();
      return;
    }
    this.selectedTeam = (this.selectedTeam + 1) % this.teams.length;
    this.showQuestion();
  }

  finish() {
    this.clearTimer();
    this.show("results");
    this.sfx.win();
    screenFlash("win");
    burstParticles(document.querySelector(".results-wrap"), 28, ["#fbbf24", "#f9a8d4", "#67e8f9", "#fff"]);
    const ranked = this.teams.slice().sort((a, b) => b.score - a.score);
    const top = ranked[0];
    const tie = ranked.length > 1 && ranked[1].score === top.score;
    document.getElementById("winner-title").textContent = tie ? "It's a tie!" : `${top.name} wins!`;
    document.getElementById("winner-sub").textContent = tie
      ? "Share the glory — or demand a rematch."
      : "Galactic champions of this match.";
    const board = document.getElementById("final-board");
    board.innerHTML = "";
    ranked.forEach((t, i) => {
      const row = document.createElement("div");
      row.className = "final-row" + (i === 0 ? " gold" : "");
      row.innerHTML = `<span style="color:${t.color}">${escapeHtml(t.name)}</span><span>${t.score} pts</span>`;
      board.appendChild(row);
    });
  }
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

document.addEventListener("DOMContentLoaded", () => {
  new CometClash();
});
