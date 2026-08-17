/**
 * Reading Rally — hot-seat board game
 * Reading skills + IB PYP language moments
 */

const COLORS = ["#ef476f", "#118ab2", "#06d6a0", "#ffd166"];
const TOKEN_EMOJI = ["🔴", "🔵", "🟢", "🟡"];

const SPACE_TYPES = [
  "start",
  "read", "read", "choice",
  "rhyme", "pyp", "read",
  "bonus", "choice", "read",
  "pyp", "rhyme", "choice",
  "read", "bonus", "pyp",
  "read", "choice", "rhyme",
  "read", "pyp", "finish_mark",
];
// 24 spaces in a loop; index 0 is start

const READ_BANK = {
  1: [
    "cat", "dog", "sun", "run", "big", "red", "blue", "jump", "play", "book",
    "fish", "bird", "happy", "friend", "school", "water", "green", "smile",
  ],
  2: [
    "garden", "because", "animal", "strong", "whisper", "bridge", "planet",
    "journey", "protect", "curious", "listen", "share", "community", "change",
  ],
  3: [
    "responsibility", "perspective", "reflection", "communicate", "investigate",
    "environment", "celebrate", "challenge", "collaborate", "thoughtful",
  ],
};

const RHYME_PAIRS = {
  1: [
    { word: "cat", options: ["hat", "dog", "sun"], answer: "hat" },
    { word: "big", options: ["dig", "red", "cup"], answer: "dig" },
    { word: "sun", options: ["run", "map", "pen"], answer: "run" },
    { word: "cake", options: ["lake", "bird", "jump"], answer: "lake" },
  ],
  2: [
    { word: "light", options: ["night", "green", "table"], answer: "night" },
    { word: "train", options: ["rain", "cloud", "desk"], answer: "rain" },
    { word: "sheep", options: ["sleep", "stone", "apple"], answer: "sleep" },
    { word: "chair", options: ["share", "floor", "music"], answer: "share" },
  ],
  3: [
    { word: "bright", options: ["flight", "orange", "quiet"], answer: "flight" },
    { word: "peace", options: ["release", "mountain", "pencil"], answer: "release" },
    { word: "create", options: ["relate", "window", "purple"], answer: "relate" },
  ],
};

const CHOICE_BANK = {
  1: [
    { q: "Which word means a place to learn?", options: ["school", "apple", "shoe"], answer: "school" },
    { q: "Which word is a color?", options: ["blue", "run", "sit"], answer: "blue" },
    { q: "Which word is an animal?", options: ["dog", "book", "desk"], answer: "dog" },
  ],
  2: [
    { q: "Which word means to work together?", options: ["collaborate", "ignore", "hide"], answer: "collaborate" },
    { q: "Which word is the opposite of loud?", options: ["quiet", "shout", "crash"], answer: "quiet" },
    { q: "Which word means a long trip?", options: ["journey", "minute", "pocket"], answer: "journey" },
  ],
  3: [
    { q: "Which word means thinking about your learning?", options: ["reflection", "rushing", "copying"], answer: "reflection" },
    { q: "Which word means seeing another point of view?", options: ["perspective", "ignoring", "guessing"], answer: "perspective" },
    { q: "Which word means taking care of our world?", options: ["responsibility", "littering", "wasting"], answer: "responsibility" },
  ],
};

/** IB PYP language / Learner Profile moments */
const PYP_MOMENTS = [
  {
    attribute: "Communicators",
    prompt: "Read this sentence aloud clearly to your group:",
    line: "I can share my ideas with kindness.",
    stars: 2,
  },
  {
    attribute: "Caring",
    prompt: "Read aloud — then say one caring thing to a teammate:",
    line: "We help each other learn every day.",
    stars: 2,
  },
  {
    attribute: "Inquirers",
    prompt: "Read the question aloud, then answer with your group:",
    line: "What makes a good learner?",
    stars: 2,
  },
  {
    attribute: "Thinkers",
    prompt: "Read aloud, then give one example from class:",
    line: "Thinkers solve problems in creative ways.",
    stars: 2,
  },
  {
    attribute: "Open-minded",
    prompt: "Read aloud — listen to one different idea from a friend:",
    line: "Open-minded learners respect many perspectives.",
    stars: 2,
  },
  {
    attribute: "Principled",
    prompt: "Read aloud and talk: when is honesty important?",
    line: "Principled people do the right thing even when it is hard.",
    stars: 2,
  },
  {
    attribute: "Reflective",
    prompt: "Read aloud, then share one thing you learned today:",
    line: "Reflective learners think about how they can improve.",
    stars: 2,
  },
  {
    attribute: "Risk-takers",
    prompt: "Read the bold word aloud three times with confidence:",
    line: "Courage",
    stars: 1,
  },
  {
    attribute: "Knowledgeable",
    prompt: "Read aloud, then add one fact you know about the topic:",
    line: "Reading helps us discover the world.",
    stars: 2,
  },
  {
    attribute: "Balanced",
    prompt: "Read aloud — then take a calm breath together:",
    line: "Balanced learners work hard and rest well.",
    stars: 1,
  },
];

// ── Audio ──────────────────────────────────────────────────────────────────

class SFX {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this._voice = window.TokenMooseVoice ? TokenMooseVoice.create("reading-rally") : null;
    this.master = null;
  }
  ensure() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.3;
      this.master.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") this.ctx.resume();
    return this.ctx;
  }
  setEnabled(on) { this.enabled = !!on; if (this._voice) { this._voice.setEnabled(this.enabled); if (!this.enabled) this._voice.stop(); } }
  tone(freq, dur, type = "sine", vol = 0.2, when = 0) {
    if (!this.enabled) return;
    const ctx = this.ensure();
    if (!ctx) return;
    const t0 = ctx.currentTime + when;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol, t0 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g);
    g.connect(this.master);
    o.start(t0);
    o.stop(t0 + dur + 0.02);
  }
  roll() { this.tone(300, 0.06, "square", 0.1); this.tone(400, 0.06, "square", 0.1, 0.07); }
  move() { this.tone(480, 0.08, "triangle", 0.12); }
  success() { this.tone(523, 0.1); this.tone(659, 0.1, "sine", 0.2, 0.1); this.tone(784, 0.18, "sine", 0.2, 0.2); }
  fail() { this.tone(180, 0.15, "sawtooth", 0.08); }
  win() { [523, 659, 784, 1046].forEach((f, i) => this.tone(f, 0.15, "sine", 0.18, i * 0.12)); }
  speak(text) {
    if (!this.enabled) return;
    if (this._voice) { this._voice.speak(text); return; }
    if (!window.speechSynthesis) return;
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(u);
    } catch (e) {}
  }
}

// ── Game ───────────────────────────────────────────────────────────────────

class ReadingRally {
  constructor() {
    this.sfx = new SFX();
    this.players = [];
    this.turn = 0;
    this.level = 2;
    this.goal = "laps2";
    this.spaces = SPACE_TYPES.length;
    this.anim = null;
    this.pendingChallenge = null;
    this.rolling = false;

    this.canvas = document.getElementById("board");
    this.ctx = this.canvas.getContext("2d");
    this.path = [];

    this._buildNameFields(2);
    this._bind();
    this._computePath();
    window.addEventListener("resize", () => {
      if (!document.getElementById("screen-board").hidden) this.drawBoard();
    });
  }

  _bind() {
    document.getElementById("player-count").addEventListener("change", (e) => {
      this._buildNameFields(parseInt(e.target.value, 10) || 2);
    });
    document.getElementById("btn-start").addEventListener("click", () => this.startGame());
    document.getElementById("btn-quit").addEventListener("click", () => this.showSetup());
    document.getElementById("btn-roll").addEventListener("click", () => this.rollDice());
    document.getElementById("btn-mute").addEventListener("click", () => {
      this.sfx.setEnabled(!this.sfx.enabled);
      document.getElementById("btn-mute").textContent = this.sfx.enabled ? "🔊" : "🔇";
    });
    document.getElementById("btn-again").addEventListener("click", () => this.startGame());
    document.getElementById("btn-setup").addEventListener("click", () => this.showSetup());
    document.getElementById("ch-hear").addEventListener("click", () => {
      const t = document.getElementById("ch-body").textContent;
      if (t) this.sfx.speak(t);
    });
    document.getElementById("ch-ok").addEventListener("click", () => this.resolveChallenge(true));
    document.getElementById("ch-skip").addEventListener("click", () => this.resolveChallenge(false, true));
  }

  _buildNameFields(n) {
    const box = document.getElementById("name-fields");
    box.innerHTML = "";
    for (let i = 0; i < n; i++) {
      const lab = document.createElement("label");
      lab.innerHTML = `Player ${i + 1}<input type="text" maxlength="16" value="Player ${i + 1}" data-pi="${i}">`;
      box.appendChild(lab);
    }
  }

  show(id) {
    ["setup", "board", "challenge", "win"].forEach((s) => {
      document.getElementById(`screen-${s}`).hidden = s !== id;
    });
  }

  showSetup() {
    this.show("setup");
  }

  startGame() {
    this.sfx.ensure();
    const n = parseInt(document.getElementById("player-count").value, 10) || 2;
    this.level = parseInt(document.getElementById("level-select").value, 10) || 2;
    this.goal = document.getElementById("goal-select").value;
    const inputs = [...document.querySelectorAll("#name-fields input")];
    this.players = [];
    for (let i = 0; i < n; i++) {
      const name = (inputs[i]?.value || `Player ${i + 1}`).trim() || `Player ${i + 1}`;
      this.players.push({
        name,
        color: COLORS[i],
        emoji: TOKEN_EMOJI[i],
        pos: 0,
        laps: 0,
        stars: 0,
      });
    }
    this.turn = 0;
    this.rolling = false;
    this.show("board");
    this.updateScoreboard();
    this.updateTurnBanner();
    this.drawBoard();
    document.getElementById("board-hint").textContent = `${this.players[0].name} — roll the dice!`;
    document.getElementById("btn-roll").disabled = false;
    document.getElementById("dice-face").textContent = "–";
  }

  updateScoreboard() {
    const sb = document.getElementById("scoreboard");
    sb.innerHTML = this.players
      .map((p, i) => {
        const active = i === this.turn ? " active" : "";
        return `<div class="player-chip${active}" style="color:${p.color}">${p.emoji} ${escapeHtml(p.name)} · ⭐${p.stars} · lap ${p.laps}</div>`;
      })
      .join("");
  }

  updateTurnBanner() {
    const p = this.players[this.turn];
    const el = document.getElementById("turn-banner");
    el.textContent = `${p.emoji} ${p.name}`;
    el.style.color = p.color;
    el.style.borderColor = p.color;
  }

  // Winding trail (rounded rectangular loop with soft side curves — not a plain circle)
  _computePath() {
    const W = 900;
    const H = 520;
    const marginX = 70;
    const marginY = 55;
    const left = marginX;
    const right = W - marginX;
    const top = marginY;
    const bottom = H - marginY - 10;
    const midY = (top + bottom) / 2;
    // Build a loop: top edge → right curve → bottom → left curve
    const corners = [
      // top left → top right
      ...this._edgePoints(left + 40, top, right - 40, top, 6),
      // top-right bend down
      ...this._arcPoints(right - 40, top, right, midY, 5),
      // right side
      ...this._edgePoints(right, midY, right, bottom - 30, 3),
      // bottom-right bend
      ...this._arcPoints(right, bottom - 30, right - 40, bottom, 4),
      // bottom right → bottom left
      ...this._edgePoints(right - 40, bottom, left + 40, bottom, 6),
      // bottom-left bend up
      ...this._arcPoints(left + 40, bottom, left, midY, 4),
      // left side
      ...this._edgePoints(left, midY, left, top + 30, 3),
      // top-left bend
      ...this._arcPoints(left, top + 30, left + 40, top, 4),
    ];
    // Resample to exactly this.spaces points along the polyline
    this.path = this._resample(corners, this.spaces);
  }

  _edgePoints(x1, y1, x2, y2, n) {
    const out = [];
    for (let i = 0; i < n; i++) {
      const t = i / n;
      out.push({ x: x1 + (x2 - x1) * t, y: y1 + (y2 - y1) * t });
    }
    return out;
  }

  _arcPoints(x1, y1, x2, y2, n) {
    // Simple quadratic-ish bend through a control point outside the segment
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    const dx = x2 - x1;
    const dy = y2 - y1;
    // perpendicular push
    const cx = mx + dy * 0.15;
    const cy = my - dx * 0.15;
    const out = [];
    for (let i = 0; i < n; i++) {
      const t = i / n;
      const u = 1 - t;
      out.push({
        x: u * u * x1 + 2 * u * t * cx + t * t * x2,
        y: u * u * y1 + 2 * u * t * cy + t * t * y2,
      });
    }
    return out;
  }

  _resample(pts, n) {
    if (!pts.length) return [];
    // cumulative lengths
    const seg = [0];
    let total = 0;
    for (let i = 1; i < pts.length; i++) {
      const d = Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
      total += d;
      seg.push(total);
    }
    // close loop distance
    total += Math.hypot(pts[0].x - pts[pts.length - 1].x, pts[0].y - pts[pts.length - 1].y);
    const out = [];
    for (let i = 0; i < n; i++) {
      const target = (i / n) * total;
      // walk
      let acc = 0;
      let found = false;
      for (let j = 0; j < pts.length; j++) {
        const a = pts[j];
        const b = pts[(j + 1) % pts.length];
        const d = Math.hypot(b.x - a.x, b.y - a.y);
        if (acc + d >= target) {
          const t = d < 0.001 ? 0 : (target - acc) / d;
          out.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
          found = true;
          break;
        }
        acc += d;
      }
      if (!found) out.push({ ...pts[0] });
    }
    return out;
  }

  drawBoard() {
    const ctx = this.ctx;
    const W = this.canvas.width;
    const H = this.canvas.height;
    ctx.clearRect(0, 0, W, H);

    // Sky → meadow map
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, "#87ceeb");
    bg.addColorStop(0.35, "#b8e0d2");
    bg.addColorStop(0.55, "#52b788");
    bg.addColorStop(1, "#1b4332");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Clouds
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    [[120,70,50],[200,60,40],[720,80,55],[800,55,35]].forEach(([x,y,r]) => {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.arc(x + r * 0.7, y + 6, r * 0.7, 0, Math.PI * 2);
      ctx.arc(x - r * 0.6, y + 8, r * 0.65, 0, Math.PI * 2);
      ctx.fill();
    });

    // Hills
    ctx.fillStyle = "rgba(45, 106, 79, 0.55)";
    ctx.beginPath();
    ctx.ellipse(160, H - 40, 200, 70, 0, 0, Math.PI * 2);
    ctx.ellipse(750, H - 30, 220, 65, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(64, 145, 108, 0.4)";
    ctx.beginPath();
    ctx.ellipse(450, H - 20, 260, 50, 0, 0, Math.PI * 2);
    ctx.fill();

    // Path ribbon (outer + inner stripe)
    if (this.path.length) {
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.strokeStyle = "#6b3f1d";
      ctx.lineWidth = 44;
      ctx.beginPath();
      this.path.forEach((p, i) => { if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y); });
      ctx.closePath();
      ctx.stroke();
      ctx.strokeStyle = "#d4a373";
      ctx.lineWidth = 34;
      ctx.stroke();
      ctx.strokeStyle = "#faedcd";
      ctx.lineWidth = 5;
      ctx.setLineDash([14, 12]);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Spaces
    const typeColor = {
      start: "#ffd166",
      read: "#8ecae6",
      choice: "#c77dff",
      rhyme: "#90ee90",
      pyp: "#f4a261",
      bonus: "#ef476f",
      finish_mark: "#ffd166",
    };
    const typeLabel = {
      start: "GO",
      read: "Aa",
      choice: "?",
      rhyme: "♫",
      pyp: "IB",
      bonus: "★",
      finish_mark: "★",
    };

    this.path.forEach((p, i) => {
      const type = SPACE_TYPES[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, 18, 0, Math.PI * 2);
      ctx.fillStyle = typeColor[type] || "#ccc";
      ctx.fill();
      ctx.strokeStyle = "rgba(0,0,0,0.35)";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = "#1a1200";
      ctx.font = "bold 11px Segoe UI, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(typeLabel[type] || "·", p.x, p.y);
    });

    // Center title
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.font = "bold 22px Segoe UI, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Reading Rally", W / 2, H / 2 - 8);
    ctx.font = "13px Segoe UI, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.fillText("Be a communicator · Thinker · Friend", W / 2, H / 2 + 16);

    // Tokens (offset if stacked)
    const stacks = {};
    this.players.forEach((pl, idx) => {
      const key = pl.pos;
      stacks[key] = stacks[key] || [];
      stacks[key].push(idx);
    });
    this.players.forEach((pl, idx) => {
      const pt = this.path[pl.pos % this.spaces];
      const stack = stacks[pl.pos];
      const slot = stack.indexOf(idx);
      const ox = (slot - (stack.length - 1) / 2) * 14;
      ctx.beginPath();
      ctx.arc(pt.x + ox, pt.y - 22, 14, 0, Math.PI * 2);
      ctx.fillStyle = pl.color;
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.fillStyle = "#111";
      ctx.font = "bold 12px Segoe UI, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(String(idx + 1), pt.x + ox, pt.y - 22);
    });
  }

  rollDice() {
    if (this.rolling) return;
    this.rolling = true;
    document.getElementById("btn-roll").disabled = true;
    this.sfx.roll();

    const face = document.getElementById("dice-face");
    let flips = 0;
    const anim = setInterval(() => {
      face.textContent = String(1 + Math.floor(Math.random() * 6));
      flips += 1;
      if (flips > 8) {
        clearInterval(anim);
        const value = 1 + Math.floor(Math.random() * 6);
        face.textContent = String(value);
        this.movePlayer(value);
      }
    }, 60);
  }

  movePlayer(steps) {
    const p = this.players[this.turn];
    let remaining = steps;
    const stepOnce = () => {
      if (remaining <= 0) {
        this.onLand(p);
        return;
      }
      const prev = p.pos;
      p.pos = (p.pos + 1) % this.spaces;
      if (p.pos === 0 && prev !== 0) {
        p.laps += 1;
        p.stars += 1;
        document.getElementById("board-hint").textContent = `${p.name} completed a lap! +1★`;
      }
      remaining -= 1;
      this.sfx.move();
      this.drawBoard();
      this.updateScoreboard();
      setTimeout(stepOnce, 220);
    };
    stepOnce();
  }

  onLand(p) {
    const type = SPACE_TYPES[p.pos];
    if (type === "start" || type === "finish_mark") {
      // Passing GO already handled; mild bonus on exact land
      if (type === "finish_mark") {
        p.stars += 1;
        document.getElementById("board-hint").textContent = `${p.name} landed on a star space! +1★`;
      }
      this.afterLand();
      return;
    }
    if (type === "bonus") {
      p.stars += 2;
      this.sfx.success();
      document.getElementById("board-hint").textContent = `${p.name} found a bonus! +2★`;
      this.updateScoreboard();
      this.afterLand();
      return;
    }
    // Challenge spaces
    this.openChallenge(type);
  }

  openChallenge(type) {
    this.show("challenge");
    const chType = document.getElementById("ch-type");
    const chPyp = document.getElementById("ch-pyp");
    const chTitle = document.getElementById("ch-title");
    const chBody = document.getElementById("ch-body");
    const chChoices = document.getElementById("ch-choices");
    const chOk = document.getElementById("ch-ok");
    const chSkip = document.getElementById("ch-skip");

    chChoices.innerHTML = "";
    chPyp.hidden = true;
    chOk.hidden = true;
    chSkip.hidden = false;

    if (type === "read") {
      const words = READ_BANK[this.level] || READ_BANK[2];
      const word = words[Math.floor(Math.random() * words.length)];
      chType.textContent = "Read aloud";
      chTitle.textContent = "Read this word";
      chBody.textContent = word;
      chOk.hidden = false;
      chOk.textContent = "We read it!";
      this.pendingChallenge = { type: "read", stars: 1, word };
    } else if (type === "rhyme") {
      const pairs = RHYME_PAIRS[this.level] || RHYME_PAIRS[2];
      const item = pairs[Math.floor(Math.random() * pairs.length)];
      chType.textContent = "Rhyme time";
      chTitle.textContent = `Which word rhymes with “${item.word}”?`;
      chBody.textContent = item.word;
      this._fillChoices(item.options, item.answer, 2);
      this.pendingChallenge = { type: "rhyme", stars: 2 };
    } else if (type === "choice") {
      const bank = CHOICE_BANK[this.level] || CHOICE_BANK[2];
      const item = bank[Math.floor(Math.random() * bank.length)];
      chType.textContent = "Word meaning";
      chTitle.textContent = item.q;
      chBody.textContent = "Choose the best answer";
      this._fillChoices(item.options, item.answer, 2);
      this.pendingChallenge = { type: "choice", stars: 2 };
    } else if (type === "pyp") {
      const m = PYP_MOMENTS[Math.floor(Math.random() * PYP_MOMENTS.length)];
      chType.textContent = "IB PYP moment";
      chPyp.hidden = false;
      chPyp.textContent = `Learner Profile · ${m.attribute}`;
      chTitle.textContent = m.prompt;
      chBody.textContent = m.line;
      chOk.hidden = false;
      chOk.textContent = "We did it!";
      this.pendingChallenge = { type: "pyp", stars: m.stars, speak: m.line };
    }
  }

  _fillChoices(options, answer, stars) {
    const box = document.getElementById("ch-choices");
    const shuffled = options.slice().sort(() => Math.random() - 0.5);
    shuffled.forEach((opt) => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = opt;
      b.addEventListener("click", () => {
        if (opt === answer) {
          b.classList.add("correct");
          this.sfx.success();
          setTimeout(() => this.resolveChallenge(true), 450);
        } else {
          b.classList.add("wrong");
          this.sfx.fail();
          setTimeout(() => this.resolveChallenge(false), 500);
        }
      });
      box.appendChild(b);
    });
    this.pendingChallenge = { type: "choice", stars };
  }

  resolveChallenge(success, skipped = false) {
    const p = this.players[this.turn];
    if (skipped) {
      p.stars = Math.max(0, p.stars - 1);
      document.getElementById("board-hint").textContent = `${p.name} skipped (−1★)`;
      this.sfx.fail();
    } else if (success) {
      const stars = this.pendingChallenge?.stars || 1;
      p.stars += stars;
      document.getElementById("board-hint").textContent = `${p.name} earned +${stars}★`;
      this.sfx.success();
    } else {
      document.getElementById("board-hint").textContent = `${p.name} missed that one — next time!`;
    }
    this.pendingChallenge = null;
    this.updateScoreboard();
    this.afterLand();
  }

  afterLand() {
    if (this.checkWin()) return;
    this.show("board");
    this.drawBoard();
    // Next turn
    this.turn = (this.turn + 1) % this.players.length;
    this.rolling = false;
    document.getElementById("btn-roll").disabled = false;
    this.updateTurnBanner();
    this.updateScoreboard();
    document.getElementById("board-hint").textContent =
      `${this.players[this.turn].name} — roll when ready!`;
  }

  checkWin() {
    let winner = null;
    if (this.goal === "laps1") {
      winner = this.players.find((p) => p.laps >= 1);
    } else if (this.goal === "laps2") {
      winner = this.players.find((p) => p.laps >= 2);
    } else if (this.goal === "stars15") {
      winner = this.players.find((p) => p.stars >= 15);
    }
    if (!winner) return false;
    this.sfx.win();
    this.show("win");
    document.getElementById("win-title").textContent = `${winner.emoji} ${winner.name} wins!`;
    document.getElementById("win-msg").textContent =
      `${winner.stars} stars · ${winner.laps} lap(s). Outstanding communicating and reading!`;
    return true;
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
  new ReadingRally();
});

