/**
 * Candy Math Trail — 10 difficulties, candyland UI, local high scores
 */
(function () {
  const HS_KEY = "token-moose-candy-math-scores";
  const NAME_KEY = "token-moose-candy-math-name";
  const MAX_SCORES = 15;

  const DIFFS = [
    { id: 1, name: "Gumdrop +", blurb: "Add to 5", color: "#ff6bcb", gen: () => add(1, 5) },
    { id: 2, name: "Lolly +", blurb: "Add to 10", color: "#ff9f1c", gen: () => add(1, 10) },
    { id: 3, name: "Jelly +", blurb: "Add to 20", color: "#ffd54f", gen: () => add(1, 20) },
    { id: 4, name: "Mint −", blurb: "Sub to 10", color: "#69f0ae", gen: () => sub(1, 10) },
    { id: 5, name: "Sour −", blurb: "Sub to 20", color: "#00e5ff", gen: () => sub(1, 20) },
    { id: 6, name: "Mix Pop", blurb: "Add & sub", color: "#40c4ff", gen: () => (Math.random() < 0.5 ? add(1, 20) : sub(1, 20)) },
    { id: 7, name: "Tiny ×", blurb: "× tables 2–5", color: "#b388ff", gen: () => mul(2, 5) },
    { id: 8, name: "Candy ×", blurb: "× tables 2–10", color: "#7c4dff", gen: () => mul(2, 10) },
    { id: 9, name: "Fizz Mix", blurb: "× and +", color: "#f50057", gen: () => (Math.random() < 0.55 ? mul(2, 10) : add(5, 30)) },
    { id: 10, name: "Rainbow", blurb: "All ops", color: "#c2185b", gen: () => fullMix() },
  ];

  function rand(a, b) {
    return a + Math.floor(Math.random() * (b - a + 1));
  }
  function add(min, max) {
    const a = rand(min, max);
    const b = rand(min, max);
    return { a, b, op: "+", answer: a + b, text: `${a} + ${b}` };
  }
  function sub(min, max) {
    let a = rand(min, max);
    let b = rand(min, max);
    if (b > a) [a, b] = [b, a];
    return { a, b, op: "−", answer: a - b, text: `${a} − ${b}` };
  }
  function mul(lo, hi) {
    const a = rand(lo, hi);
    const b = rand(lo, hi);
    return { a, b, op: "×", answer: a * b, text: `${a} × ${b}` };
  }
  function fullMix() {
    const r = Math.random();
    if (r < 0.34) return add(1, 50);
    if (r < 0.62) return sub(1, 50);
    return mul(2, 12);
  }

  function loadScores() {
    try {
      const arr = JSON.parse(localStorage.getItem(HS_KEY) || "[]");
      return Array.isArray(arr) ? arr : [];
    } catch {
      return [];
    }
  }
  function saveScores(arr) {
    try {
      localStorage.setItem(HS_KEY, JSON.stringify(arr.slice(0, MAX_SCORES)));
    } catch (_) {}
  }

  class CandyMath {
    constructor() {
      this.diff = 1;
      this.mode = "sprint";
      this.score = 0;
      this.streak = 0;
      this.qIndex = 0;
      this.totalQ = 10;
      this.current = null;
      this.timer = null;
      this.timeLeft = 60;
      this.locked = false;

      this.els = {
        menu: document.getElementById("screen-menu"),
        play: document.getElementById("screen-play"),
        results: document.getElementById("screen-results"),
        name: document.getElementById("player-name"),
        diffGrid: document.getElementById("diff-grid"),
        scoreboard: document.getElementById("scoreboard"),
        problem: document.getElementById("problem"),
        answer: document.getElementById("answer"),
        feedback: document.getElementById("feedback"),
        choices: document.getElementById("choices"),
        hudScore: document.getElementById("hud-score"),
        hudStreak: document.getElementById("hud-streak"),
        hudTimer: document.getElementById("hud-timer"),
        hudProgress: document.getElementById("hud-progress"),
        playDiff: document.getElementById("play-diff"),
      };

      try {
        const n = localStorage.getItem(NAME_KEY);
        if (n) this.els.name.value = n;
      } catch (_) {}

      this.renderDiffs();
      this.renderScoreboard();
      this.bind();
    }

    bind() {
      document.querySelectorAll(".mode-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          document.querySelectorAll(".mode-btn").forEach((b) => b.classList.remove("is-on"));
          btn.classList.add("is-on");
          this.mode = btn.getAttribute("data-mode");
        });
      });
      document.getElementById("btn-start").addEventListener("click", () => this.start());
      document.getElementById("btn-submit").addEventListener("click", () => this.submit());
      document.getElementById("btn-quit").addEventListener("click", () => {
        if (confirm("Leave this run?")) this.toMenu();
      });
      document.getElementById("btn-again").addEventListener("click", () => this.start());
      document.getElementById("btn-menu").addEventListener("click", () => this.toMenu());
      document.getElementById("btn-clear-scores").addEventListener("click", () => {
        if (confirm("Clear all high scores on this device?")) {
          saveScores([]);
          this.renderScoreboard();
        }
      });
      this.els.answer.addEventListener("keydown", (e) => {
        if (e.key === "Enter") this.submit();
      });
      this.els.name.addEventListener("change", () => {
        try {
          localStorage.setItem(NAME_KEY, this.els.name.value.trim().slice(0, 12));
        } catch (_) {}
      });
    }

    show(name) {
      this.els.menu.hidden = name !== "menu";
      this.els.play.hidden = name !== "play";
      this.els.results.hidden = name !== "results";
    }

    toMenu() {
      this.clearTimer();
      this.renderScoreboard();
      this.show("menu");
    }

    renderDiffs() {
      const box = this.els.diffGrid;
      box.innerHTML = "";
      DIFFS.forEach((d) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "diff-btn" + (d.id === this.diff ? " is-on" : "");
        btn.style.background = d.color;
        btn.innerHTML = `${d.id}<small>${d.blurb}</small>`;
        btn.title = d.name;
        btn.addEventListener("click", () => {
          this.diff = d.id;
          this.renderDiffs();
        });
        box.appendChild(btn);
      });
    }

    renderScoreboard() {
      const scores = loadScores().sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
      const box = this.els.scoreboard;
      box.innerHTML = "";
      if (!scores.length) {
        const li = document.createElement("li");
        li.textContent = "No scores yet — be the first!";
        li.style.fontWeight = "600";
        box.appendChild(li);
        return;
      }
      scores.slice(0, 10).forEach((s, i) => {
        const li = document.createElement("li");
        li.innerHTML = `${escapeHtml(s.name)} <span class="meta">· ${s.score} pts · L${s.diff} · ${s.mode}</span>`;
        if (i === 0) li.style.color = "#c2185b";
        box.appendChild(li);
      });
    }

    start() {
      const name = (this.els.name.value || "").trim() || "Player";
      this.els.name.value = name;
      try {
        localStorage.setItem(NAME_KEY, name);
      } catch (_) {}
      this.playerName = name;
      this.score = 0;
      this.streak = 0;
      this.qIndex = 0;
      this.totalQ = this.mode === "sprint" ? 10 : 999;
      this.timeLeft = 60;
      this.locked = false;
      this.clearTimer();
      this.show("play");
      const d = DIFFS[this.diff - 1];
      this.els.playDiff.textContent = `Level ${d.id} · ${d.name} · ${d.blurb}`;
      this.updateHud();
      this.nextProblem();
      if (this.mode === "timed") {
        this.els.hudTimer.textContent = String(this.timeLeft);
        this.timer = setInterval(() => {
          this.timeLeft -= 1;
          this.els.hudTimer.textContent = String(this.timeLeft);
          if (this.timeLeft <= 0) {
            this.clearTimer();
            this.finish();
          }
        }, 1000);
      } else {
        this.els.hudTimer.textContent = "—";
      }
    }

    clearTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }

    updateHud() {
      this.els.hudScore.textContent = String(this.score);
      this.els.hudStreak.textContent = String(this.streak);
      if (this.mode === "sprint") {
        this.els.hudProgress.textContent = `${Math.min(this.qIndex + 1, 10)}/10`;
      } else {
        this.els.hudProgress.textContent = `${this.qIndex} solved`;
      }
    }

    nextProblem() {
      this.locked = false;
      const d = DIFFS[this.diff - 1];
      this.current = d.gen();
      this.els.problem.textContent = this.current.text + " = ?";
      this.els.feedback.textContent = "";
      this.els.feedback.className = "feedback";
      this.els.answer.value = "";
      this.els.answer.hidden = false;
      document.getElementById("btn-submit").hidden = false;
      // Multiple choice for early levels (easier for young kids)
      if (this.diff <= 4) {
        this.els.choices.hidden = false;
        this.renderChoices();
      } else {
        this.els.choices.hidden = true;
        this.els.choices.innerHTML = "";
      }
      this.els.answer.focus();
      this.updateHud();
    }

    renderChoices() {
      const correct = this.current.answer;
      const set = new Set([correct]);
      while (set.size < 4) {
        const delta = rand(-5, 5) || 1;
        set.add(Math.max(0, correct + delta));
      }
      const opts = shuffle([...set]);
      this.els.choices.innerHTML = "";
      opts.forEach((n) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "choice";
        btn.textContent = String(n);
        btn.addEventListener("click", () => {
          this.els.answer.value = String(n);
          this.submit();
        });
        this.els.choices.appendChild(btn);
      });
    }

    submit() {
      if (this.locked || this.els.play.hidden) return;
      const raw = this.els.answer.value;
      if (raw === "" || raw === null) return;
      const val = Number(raw);
      if (!Number.isFinite(val)) return;
      this.locked = true;
      const ok = val === this.current.answer;
      if (ok) {
        this.streak += 1;
        let pts = 10 * this.diff;
        if (this.streak >= 5) pts = Math.floor(pts * 1.5);
        if (this.streak >= 10) pts = Math.floor(pts * 2);
        this.score += pts;
        this.els.feedback.textContent = this.streak >= 5 ? `Yay! +${pts} · streak 🔥` : `Correct! +${pts}`;
        this.els.feedback.className = "feedback ok";
        burst();
      } else {
        this.streak = 0;
        this.els.feedback.textContent = `Oops — answer was ${this.current.answer}`;
        this.els.feedback.className = "feedback bad";
      }
      this.qIndex += 1;
      this.updateHud();
      const doneSprint = this.mode === "sprint" && this.qIndex >= 10;
      setTimeout(() => {
        if (doneSprint) this.finish();
        else if (!this.els.play.hidden) this.nextProblem();
      }, ok ? 550 : 900);
    }

    finish() {
      this.clearTimer();
      const entry = {
        name: this.playerName,
        score: this.score,
        diff: this.diff,
        mode: this.mode === "sprint" ? "Sprint" : "Rush",
        at: Date.now(),
      };
      const scores = loadScores();
      scores.push(entry);
      scores.sort((a, b) => b.score - a.score);
      saveScores(scores);
      const rank = scores.sort((a, b) => b.score - a.score).findIndex((s) => s === entry) + 1;

      this.show("results");
      document.getElementById("results-score").textContent = String(this.score);
      document.getElementById("results-sub").textContent =
        `${this.playerName} · Level ${this.diff} · ${entry.mode}`;
      const emoji = this.score >= 200 ? "🏆" : this.score >= 100 ? "🎉" : "🍬";
      document.getElementById("results-emoji").textContent = emoji;
      document.getElementById("results-title").textContent =
        this.score >= 150 ? "Candy champion!" : this.score >= 80 ? "Sweet score!" : "Nice try!";
      document.getElementById("results-rank").textContent =
        rank <= 10
          ? `You placed #${rank} on this device’s jar!`
          : "Saved to the jar — beat your best next time!";
    }
  }

  function shuffle(a) {
    const arr = a.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function burst() {
    const layer = document.getElementById("fx-layer");
    if (!layer) return;
    const candies = ["🍬", "🍭", "🍫", "⭐", "✨"];
    for (let i = 0; i < 12; i++) {
      const el = document.createElement("span");
      el.className = "fx-candy";
      el.textContent = candies[i % candies.length];
      el.style.left = 40 + Math.random() * 20 + "%";
      el.style.top = "45%";
      el.style.setProperty("--dx", (Math.random() - 0.5) * 220 + "px");
      el.style.setProperty("--dy", -80 - Math.random() * 160 + "px");
      layer.appendChild(el);
      setTimeout(() => el.remove(), 900);
    }
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  document.addEventListener("DOMContentLoaded", () => new CandyMath());
})();
