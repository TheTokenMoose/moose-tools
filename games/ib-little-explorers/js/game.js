/**
 * IB Little Explorers — Web / PWA port
 * Kindergarten ESL · IB PYP Learner Profile themed
 * Touch-friendly quiz. Canvas + Web Audio + Speech Synthesis.
 */

const LOGICAL_W = 1920;
const LOGICAL_H = 1080;
const FPS = 60;

const BG = "#0B1F3A";
const PANEL = "#143456";
const CARD = "#1E4A73";
const WHITE = "#F5F8FC";
const MUTED = "#A8BDD4";
const GOLD = "#F0C75E";
const GREEN = "#5FCF8F";
const RED = "#F07178";
const BLUE = "#5BB8F0";
const PURPLE = "#9B8CDB";
const ORANGE = "#F0A05A";
const PINK = "#E891C0";
const CYAN = "#5DCEC6";
const TEAL = "#2A9D8F";

const TRAITS = [
  {
    id: "caring",
    name: "Caring",
    ib: "Caring",
    emoji: "❤️",
    color: PINK,
    meaning: "We help and look after others.",
    examples: [
      ["Helping a friend who fell down", "❤️"],
      ["Sharing your snack", "🍎"],
      ["Comforting someone who is sad", "🤗"],
    ],
  },
  {
    id: "curious",
    name: "Curious",
    ib: "Inquirer",
    emoji: "🔍",
    color: CYAN,
    meaning: "We ask questions and love to explore.",
    examples: [
      ["Asking 'Why is the sky blue?'", "❓"],
      ["Looking closely at a bug", "🐛"],
      ["Trying a science experiment", "🔬"],
    ],
  },
  {
    id: "brave",
    name: "Brave",
    ib: "Risk-taker",
    emoji: "🦸",
    color: ORANGE,
    meaning: "We try new things even when we feel unsure.",
    examples: [
      ["Trying a new food", "🥦"],
      ["Speaking in front of the class", "🎤"],
      ["Making a new friend", "👋"],
    ],
  },
  {
    id: "communicator",
    name: "Communicator",
    ib: "Communicator",
    emoji: "💬",
    color: BLUE,
    meaning: "We listen and use kind words.",
    examples: [
      ["Listening when a friend talks", "👂"],
      ["Using words instead of grabbing", "🗣️"],
      ["Saying please and thank you", "🙏"],
    ],
  },
  {
    id: "thinker",
    name: "Thinker",
    ib: "Thinker",
    emoji: "💡",
    color: GOLD,
    meaning: "We solve problems with our minds.",
    examples: [
      ["Figuring out a puzzle", "🧩"],
      ["Finding a fair way to share toys", "⚖️"],
      ["Planning how to build a tower", "🧱"],
    ],
  },
  {
    id: "balanced",
    name: "Balanced",
    ib: "Balanced",
    emoji: "⚖️",
    color: TEAL,
    meaning: "We work, play, rest, and eat well.",
    examples: [
      ["Playing outside after quiet reading", "🌳"],
      ["Resting when we are tired", "😴"],
      ["Eating fruit and veggies", "🥗"],
    ],
  },
  {
    id: "open",
    name: "Open-minded",
    ib: "Open-minded",
    emoji: "🌍",
    color: PURPLE,
    meaning: "We welcome new ideas and different friends.",
    examples: [
      ["Trying music from another country", "🎵"],
      ["Playing with someone new", "🤝"],
      ["Listening to a different idea", "💭"],
    ],
  },
  {
    id: "fair",
    name: "Fair",
    ib: "Principled",
    emoji: "⭐",
    color: GREEN,
    meaning: "We take turns and tell the truth.",
    examples: [
      ["Waiting for your turn", "⏳"],
      ["Telling the truth about a spill", "💧"],
      ["Following class rules", "📋"],
    ],
  },
  {
    id: "learner",
    name: "Learner",
    ib: "Knowledgeable",
    emoji: "📚",
    color: BLUE,
    meaning: "We enjoy learning new things.",
    examples: [
      ["Reading a new book", "📖"],
      ["Learning a new word", "✏️"],
      ["Practising counting", "🔢"],
    ],
  },
  {
    id: "reflective",
    name: "Reflective",
    ib: "Reflective",
    emoji: "🪞",
    color: PURPLE,
    meaning: "We think about what we did and how to grow.",
    examples: [
      ["Thinking 'What went well today?'", "☀️"],
      ["Noticing how to do better next time", "🌱"],
      ["Talking about our feelings", "😊"],
    ],
  },
];

const MODES = {
  explore: {
    title: "EXPLORE",
    blurb: "Meet each Learner Profile trait",
    rounds: 10,
    choices: 3,
    lives: 99,
    timed: false,
  },
  quest: {
    title: "QUEST",
    blurb: "Match situations to the right trait",
    rounds: 8,
    choices: 4,
    lives: 4,
    timed: false,
  },
  challenge: {
    title: "CHALLENGE",
    blurb: "Faster · more choices · timed",
    rounds: 10,
    choices: 5,
    lives: 3,
    timed: true,
    seconds: 90,
  },
};

// ─── Helpers ────────────────────────────────────────────────────────────────

function rand(a, b) {
  return a + Math.random() * (b - a);
}
function randInt(a, b) {
  return Math.floor(rand(a, b + 1));
}
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function pointIn(x, y, r) {
  return x >= r[0] && x <= r[2] && y >= r[1] && y <= r[3];
}
function traitById(id) {
  return TRAITS.find((t) => t.id === id);
}

// ─── Sound ──────────────────────────────────────────────────────────────────

class SoundManager {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.speechOn = true;
    this.enabled = true;
    this._voice = (typeof window !== "undefined" && window.TokenMooseVoice) ? window.TokenMooseVoice.create("ib-little-explorers") : null;
  }

  ensure() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) {
        this.enabled = false;
        return null;
      }
      this.ctx = new AC();
    }
    if (this.ctx.state === "suspended") this.ctx.resume();
    return this.ctx;
  }

  setMuted(m) {
    this.muted = !!m;
  }

  tone(freq, dur, vol = 0.2, when = 0) {
    if (this.muted || !this.enabled) return;
    const ctx = this.ensure();
    if (!ctx) return;
    const t0 = ctx.currentTime + when;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, t0);
    gain.gain.linearRampToValueAtTime(vol, t0 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }

  play(key) {
    if (key === "click") this.tone(640, 0.04, 0.12);
    else if (key === "correct") {
      this.tone(523, 0.1, 0.18);
      this.tone(659, 0.1, 0.18, 0.1);
      this.tone(784, 0.16, 0.16, 0.2);
    } else if (key === "wrong") {
      this.tone(262, 0.12, 0.14);
      this.tone(220, 0.16, 0.12, 0.12);
    } else if (key === "star") {
      this.tone(784, 0.07, 0.14);
      this.tone(988, 0.07, 0.14, 0.07);
      this.tone(1175, 0.14, 0.12, 0.14);
    } else if (key === "victory") {
      let t = 0;
      for (const [f, d] of [
        [392, 0.12],
        [523, 0.12],
        [659, 0.12],
        [784, 0.28],
        [659, 0.1],
        [784, 0.36],
      ]) {
        this.tone(f, d, 0.15, t);
        t += d;
      }
    }
  }

  speak(text) {
    if (!this.speechOn || !text) return;
    if (this._voice) { this._voice.speak(text); return; }
    if (!window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.95;
      window.speechSynthesis.speak(u);
    } catch (e) {}
  }
}

// ─── Game ───────────────────────────────────────────────────────────────────

class IBLittleExplorers {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.sound = new SoundManager();

    this.state = "MENU";
    this.mode = "quest";
    this.muted = false;
    this.speechOn = true;
    this.isFullscreen = false;

    this.roundI = 0;
    this.roundsTotal = 8;
    this.lives = 4;
    this.score = 0;
    this.streak = 0;
    this.bestStreak = 0;
    this.correct = 0;
    this.total = 0;
    this.timeLeft = 0;
    this.locked = false;
    this.prompt = null;
    this.choices = [];
    this.answerId = null;
    this.feedback = "";
    this.feedbackColor = WHITE;
    this.feedbackT = 0;
    this.particles = [];
    this.confetti = [];
    this.menuPulse = 0;
    this.anim = 0;
    this.hitRects = {};
    this.queue = [];
    this.pointer = [0, 0];
    this._timerId = null;
    this._afterPickId = null;

    this._bindInput();
    this._resize();
    window.addEventListener("resize", () => this._resize());
    window.addEventListener("orientationchange", () => setTimeout(() => this._resize(), 150));

    this._last = performance.now();
    this._acc = 0;
    requestAnimationFrame((t) => this._frame(t));
  }

  _resize() {
    const wrap = this.canvas.parentElement;
    const s = Math.min(wrap.clientWidth / LOGICAL_W, wrap.clientHeight / LOGICAL_H);
    this.canvas.style.width = Math.floor(LOGICAL_W * s) + "px";
    this.canvas.style.height = Math.floor(LOGICAL_H * s) + "px";
    this.canvas.width = LOGICAL_W;
    this.canvas.height = LOGICAL_H;
  }

  toLogical(clientX, clientY) {
    const rect = this.canvas.getBoundingClientRect();
    return [
      ((clientX - rect.left) / rect.width) * LOGICAL_W,
      ((clientY - rect.top) / rect.height) * LOGICAL_H,
    ];
  }

  _bindInput() {
    const c = this.canvas;
    c.tabIndex = 0;
    c.focus();

    window.addEventListener("keydown", (e) => {
      if ((e.key === "Enter" || e.key === " ") && this.state === "MENU") {
        e.preventDefault();
        this.start("quest");
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        this.onEsc();
        return;
      }
      if (e.key === "F11") {
        e.preventDefault();
        this.toggleFs();
        return;
      }
      if (this.state === "PLAY" && !this.locked && e.key >= "1" && e.key <= "9") {
        const idx = parseInt(e.key, 10) - 1;
        if (idx >= 0 && idx < this.choices.length) {
          this.pick(this.choices[idx].id);
        }
      }
    });

    const down = (e) => {
      e.preventDefault();
      this.sound.ensure();
      const src = e.touches ? e.touches[0] : e;
      const [lx, ly] = this.toLogical(src.clientX, src.clientY);
      this.pointer = [lx, ly];
      this.handle(lx, ly);
      c.focus();
    };
    c.addEventListener("mousedown", down);
    c.addEventListener("touchstart", down, { passive: false });
    c.addEventListener("mousemove", (e) => {
      this.pointer = this.toLogical(e.clientX, e.clientY);
    });
  }

  onEsc() {
    if (this.state === "PLAY" || this.state === "RESULT") {
      this.clearTimers();
      this.state = "MENU";
      this.locked = false;
    }
  }

  toggleFs() {
    const el = document.documentElement;
    if (!document.fullscreenElement) {
      el.requestFullscreen?.().then(() => {
        this.isFullscreen = true;
        this._resize();
      }).catch(() => {});
    } else {
      document.exitFullscreen?.().then(() => {
        this.isFullscreen = false;
        this._resize();
      });
    }
  }

  clearTimers() {
    if (this._timerId) {
      clearTimeout(this._timerId);
      this._timerId = null;
    }
    if (this._afterPickId) {
      clearTimeout(this._afterPickId);
      this._afterPickId = null;
    }
  }

  handle(lx, ly) {
    for (const [key, r] of Object.entries(this.hitRects)) {
      if (!pointIn(lx, ly, r)) continue;
      this.sound.play("click");
      if (key === "fs") {
        this.toggleFs();
      } else if (key === "mute") {
        this.muted = !this.muted;
        this.sound.setMuted(this.muted);
      } else if (key === "speech") {
        this.speechOn = !this.speechOn;
        this.sound.speechOn = this.speechOn;
        if (this.sound._voice) this.sound._voice.setEnabled(this.speechOn);
      } else if (key === "menu") {
        this.clearTimers();
        this.state = "MENU";
        this.locked = false;
      } else if (key.startsWith("mode_")) {
        this.start(key.replace("mode_", ""));
      } else if (key.startsWith("choice_")) {
        if (this.state === "PLAY" && !this.locked) {
          this.pick(key.replace("choice_", ""));
        }
      } else if (key === "again") {
        this.start(this.mode);
      } else if (key === "hear") {
        this.hear();
      }
      return;
    }
  }

  // ── Flow ────────────────────────────────────────────────────────────────

  start(mode) {
    this.clearTimers();
    this.mode = mode;
    const cfg = MODES[mode];
    this.roundsTotal = cfg.rounds;
    this.lives = cfg.lives;
    this.timeLeft = cfg.seconds || 0;
    this.score = 0;
    this.streak = 0;
    this.bestStreak = 0;
    this.correct = 0;
    this.total = 0;
    this.roundI = 0;
    this.locked = false;
    this.feedback = "";
    this.feedbackT = 0;
    this.particles = [];
    this.confetti = [];

    const bag = [];
    for (const tr of TRAITS) {
      for (const [exText, exEmoji] of tr.examples) {
        bag.push({
          traitId: tr.id,
          text: exText,
          emoji: exEmoji,
          trait: tr,
        });
      }
    }
    const shuffled = shuffle(bag);
    this.queue = shuffled.slice(0, this.roundsTotal);
    while (this.queue.length < this.roundsTotal) {
      this.queue.push(shuffled[randInt(0, shuffled.length - 1)]);
    }

    this.state = "PLAY";
    this.nextRound();
  }

  nextRound() {
    if (this.roundI >= this.roundsTotal || this.lives <= 0) {
      this.finish();
      return;
    }
    this.prompt = this.queue[this.roundI];
    this.answerId = this.prompt.traitId;
    this.roundI += 1;
    this.locked = false;
    this.feedback = "";
    this.feedbackT = 0;

    const n = MODES[this.mode].choices;
    const ids = new Set([this.answerId]);
    while (ids.size < n) {
      ids.add(TRAITS[randInt(0, TRAITS.length - 1)].id);
    }
    const idList = shuffle([...ids]);
    this.choices = idList.map((id) => traitById(id));

    if (this.roundI === 1 && MODES[this.mode].timed) {
      this._timerTick();
    }

    this.sound.speak(this.prompt.text);
  }

  pick(traitId) {
    if (this.locked || this.state !== "PLAY") return;
    this.locked = true;
    this.total += 1;
    const right = traitId === this.answerId;
    const tr = traitById(this.answerId);

    if (right) {
      this.correct += 1;
      this.streak += 1;
      this.bestStreak = Math.max(this.bestStreak, this.streak);
      const pts = 100 + Math.min(this.streak - 1, 8) * 25;
      this.score += pts;
      this.feedback = `Yes! That is being ${tr.name} — ${tr.meaning}`;
      this.feedbackColor = GREEN;
      this.sound.play("correct");
      this.sound.speak(tr.name);
      this.burst(LOGICAL_W / 2, 420, GREEN, 28);
      if (this.streak >= 3) {
        this.score += 50;
        this.sound.play("star");
      }
    } else {
      this.lives -= 1;
      this.streak = 0;
      this.feedback = `Not quite. This shows ${tr.name}: ${tr.meaning}`;
      this.feedbackColor = ORANGE;
      this.sound.play("wrong");
      this.burst(LOGICAL_W / 2, 420, ORANGE, 16);
    }

    this.feedbackT = 90;
    const delay = right ? 1400 : 1600;
    this._afterPickId = setTimeout(() => {
      this._afterPickId = null;
      if (this.lives <= 0 || this.roundI >= this.roundsTotal) this.finish();
      else this.nextRound();
    }, delay);
  }

  _timerTick() {
    if (this.state !== "PLAY" || !MODES[this.mode].timed) return;
    this.timeLeft -= 1;
    if (this.timeLeft <= 0) {
      this.lives = 0;
      this.finish();
      return;
    }
    this._timerId = setTimeout(() => this._timerTick(), 1000);
  }

  hear() {
    if (!this.prompt) return;
    const tr = this.prompt.trait;
    this.sound.speak(`${this.prompt.text}. This is about being ${tr.name}.`);
  }

  finish() {
    this.clearTimers();
    this.state = "RESULT";
    this.locked = true;
    this.sound.play("victory");
    const colors = [GOLD, GREEN, BLUE, PINK, PURPLE, CYAN, ORANGE];
    this.confetti = [];
    for (let i = 0; i < 160; i++) {
      this.confetti.push({
        x: randInt(0, LOGICAL_W),
        y: randInt(-LOGICAL_H, 0),
        vy: rand(2.5, 7),
        size: randInt(5, 12),
        color: colors[randInt(0, colors.length - 1)],
      });
    }
    if (this.correct >= this.roundsTotal && this.lives > 0) {
      this.sound.speak("Wonderful exploring! You are a true IB Little Explorer.");
    } else {
      this.sound.speak(`Great effort! You scored ${this.score} points.`);
    }
  }

  burst(x, y, color, n = 20) {
    for (let i = 0; i < n; i++) {
      const ang = Math.random() * Math.PI * 2;
      const sp = rand(2, 11);
      this.particles.push({
        x,
        y,
        vx: Math.cos(ang) * sp,
        vy: Math.sin(ang) * sp,
        life: 40,
        color,
        size: randInt(4, 10),
      });
    }
  }

  // ── Update / frame ──────────────────────────────────────────────────────

  update() {
    this.anim += 1;
    this.menuPulse += 1;
    if (this.feedbackT > 0) this.feedbackT -= 1;
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.25;
      p.life -= 1;
      if (p.life <= 0) this.particles.splice(i, 1);
    }
    if (this.state === "RESULT") {
      for (const c of this.confetti) {
        c.y += c.vy;
        c.x += Math.sin(c.y * 0.02) * 1.5;
        if (c.y > LOGICAL_H) {
          c.y = -20;
          c.x = randInt(0, LOGICAL_W);
        }
      }
    }
  }

  _frame(t) {
    const dt = t - this._last;
    this._last = t;
    this._acc += dt;
    const step = 1000 / FPS;
    while (this._acc >= step) {
      this.update();
      this._acc -= step;
    }
    this.draw();
    requestAnimationFrame((nt) => this._frame(nt));
  }

  // ── Draw helpers ────────────────────────────────────────────────────────

  fillRect(x1, y1, x2, y2, fill) {
    this.ctx.fillStyle = fill;
    this.ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
  }

  strokeRect(x1, y1, x2, y2, stroke, width = 2) {
    this.ctx.strokeStyle = stroke;
    this.ctx.lineWidth = width;
    this.ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
  }

  circle(cx, cy, r, fill, stroke = null, sw = 2) {
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, r, 0, Math.PI * 2);
    if (fill) {
      this.ctx.fillStyle = fill;
      this.ctx.fill();
    }
    if (stroke) {
      this.ctx.strokeStyle = stroke;
      this.ctx.lineWidth = sw;
      this.ctx.stroke();
    }
  }

  text(x, y, str, size, fill, align = "center", bold = true) {
    this.ctx.font = `${bold ? "bold " : ""}${size}px "Segoe UI", system-ui, Arial, sans-serif`;
    this.ctx.fillStyle = fill;
    this.ctx.textAlign = align;
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(str, x, y);
  }

  emoji(x, y, str, size) {
    this.ctx.font = `${size}px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif`;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(str, x, y);
  }

  // ── Screens ─────────────────────────────────────────────────────────────

  draw() {
    this.hitRects = {};
    this.ctx.clearRect(0, 0, LOGICAL_W, LOGICAL_H);
    if (this.state === "MENU") this.drawMenu();
    else if (this.state === "PLAY") this.drawPlay();
    else if (this.state === "RESULT") this.drawResult();
  }

  drawHeaderBar(subtitle = "") {
    this.fillRect(0, 0, LOGICAL_W, 100, PANEL);
    this.text(40, 50, "IB Little Explorers", 28, GOLD, "left");
    if (subtitle) this.text(420, 50, subtitle, 16, MUTED, "left", false);

    let x = LOGICAL_W - 40;
    const controls = [
      ["fs", "FULL", 110],
      ["mute", this.muted ? "SOUND" : "MUTE", 120],
      ["speech", this.speechOn ? "VOICE" : "VOICE OFF", 150],
    ];
    for (const [key, label, w] of controls) {
      x -= w + 12;
      const r = [x, 22, x + w, 78];
      this.hitRects[key] = r;
      this.fillRect(r[0], r[1], r[2], r[3], CARD);
      this.strokeRect(r[0], r[1], r[2], r[3], WHITE, 2);
      this.text((r[0] + r[2]) / 2, (r[1] + r[3]) / 2, label, 16, WHITE);
    }
  }

  drawMenu() {
    this.fillRect(0, 0, LOGICAL_W, LOGICAL_H, BG);
    this.drawHeaderBar();

    const cx = LOGICAL_W / 2;
    const cy = 250;
    TRAITS.forEach((tr, i) => {
      const ang = -Math.PI / 2 + (i * 2 * Math.PI) / TRAITS.length;
      const rad = 150 + 8 * Math.sin(this.menuPulse * 0.05 + i);
      const x = cx + Math.cos(ang) * rad;
      const y = cy + Math.sin(ang) * rad * 0.55;
      this.circle(x, y, 36, tr.color);
      this.emoji(x, y, tr.emoji, 32);
    });

    const pulse = 1 + 0.015 * Math.sin(this.menuPulse * 0.08);
    this.text(LOGICAL_W / 2, 430, "Grow your Learner Profile!", Math.floor(42 * pulse), WHITE);
    this.text(
      LOGICAL_W / 2,
      485,
      "Kindergarten ESL  ·  IB PYP inspired  ·  Touch or click to play",
      22,
      MUTED,
      "center",
      false
    );

    const modes = Object.entries(MODES);
    const baseX = LOGICAL_W / 2 - (modes.length * 320) / 2;
    modes.forEach(([mid, cfg], i) => {
      const x1 = baseX + i * 330;
      const y1 = 560;
      const r = [x1, y1, x1 + 300, y1 + 200];
      this.hitRects[`mode_${mid}`] = r;
      this.fillRect(r[0], r[1], r[2], r[3], CARD);
      this.strokeRect(r[0], r[1], r[2], r[3], GOLD, 3);
      this.text(x1 + 150, y1 + 55, cfg.title, 28, GOLD);
      this.text(x1 + 150, y1 + 110, cfg.blurb, 16, WHITE, "center", false);
      this.text(x1 + 150, y1 + 160, "TAP TO START", 16, CYAN);
    });

    this.text(
      LOGICAL_W / 2,
      LOGICAL_H - 50,
      "Esc = Menu/Back   ·   F11 = Fullscreen   ·   Keys 1–5 answer in play",
      16,
      MUTED,
      "center",
      false
    );
  }

  drawPlay() {
    this.fillRect(0, 0, LOGICAL_W, LOGICAL_H, BG);
    const cfg = MODES[this.mode];
    this.drawHeaderBar(`${cfg.title}  ·  Round ${this.roundI}/${this.roundsTotal}`);

    this.fillRect(40, 120, LOGICAL_W - 40, 190, PANEL);
    const hearts = this.lives < 20 ? "♥ ".repeat(Math.max(this.lives, 0)) : "∞";
    const bits = [`⭐ ${this.score}`, `🔥 Streak ${this.streak}`, hearts.trim()];
    if (cfg.timed) bits.push(`⏱ ${Math.max(this.timeLeft, 0)}s`);
    this.text(80, 155, bits.join("   ·   "), 22, WHITE, "left", false);

    this.fillRect(120, 220, LOGICAL_W - 120, 480, PANEL);
    this.strokeRect(120, 220, LOGICAL_W - 120, 480, GOLD, 3);
    if (this.prompt) {
      this.emoji(LOGICAL_W / 2, 280, this.prompt.emoji, 48);
      this.text(LOGICAL_W / 2, 360, "What IB trait is this?", 16, MUTED, "center", false);
      this.text(LOGICAL_W / 2, 420, this.prompt.text, 36, WHITE);
    }

    if (this.feedback && this.feedbackT > 0) {
      this.fillRect(160, 500, LOGICAL_W - 160, 560, CARD);
      this.strokeRect(160, 500, LOGICAL_W - 160, 560, this.feedbackColor, 3);
      this.text(LOGICAL_W / 2, 530, this.feedback, 22, this.feedbackColor);
    }

    const n = this.choices.length;
    const gap = 24;
    const bw = Math.min(340, Math.floor((LOGICAL_W - 160 - gap * (n - 1)) / Math.max(n, 1)));
    const totalW = n * bw + (n - 1) * gap;
    const x0 = Math.floor((LOGICAL_W - totalW) / 2);
    const y1 = 600;
    const y2 = 780;
    this.choices.forEach((tr, i) => {
      const x1 = x0 + i * (bw + gap);
      const r = [x1, y1, x1 + bw, y2];
      this.hitRects[`choice_${tr.id}`] = r;
      let fill = this.locked ? CARD : tr.color;
      if (this.locked && tr.id === this.answerId) fill = GREEN;
      this.fillRect(r[0], r[1], r[2], r[3], fill);
      this.strokeRect(r[0], r[1], r[2], r[3], WHITE, 3);
      this.emoji(x1 + bw / 2, y1 + 55, tr.emoji, 48);
      this.text(x1 + bw / 2, y1 + 120, tr.name, 22, WHITE);
      this.text(x1 + bw / 2, y1 + 155, tr.ib, 16, WHITE, "center", false);
    });

    for (const [key, label, x] of [
      ["menu", "MENU", 40],
      ["hear", "HEAR", 200],
    ]) {
      const r = [x, 820, x + 140, 900];
      this.hitRects[key] = r;
      this.fillRect(r[0], r[1], r[2], r[3], CARD);
      this.strokeRect(r[0], r[1], r[2], r[3], WHITE, 2);
      this.text((r[0] + r[2]) / 2, (r[1] + r[3]) / 2, label, 16, WHITE);
    }

    for (const p of this.particles) {
      this.circle(p.x, p.y, p.size, p.color);
    }
  }

  drawResult() {
    this.fillRect(0, 0, LOGICAL_W, LOGICAL_H, BG);
    for (const c of this.confetti) {
      this.circle(c.x, c.y, c.size, c.color);
    }
    this.drawHeaderBar("Quest complete");

    const won = this.correct >= Math.max(1, this.roundsTotal - 1) && this.lives > 0;
    const title = won ? "You are a Little Explorer!" : "Great effort, explorer!";
    this.text(LOGICAL_W / 2, 200, title, 56, GOLD);
    this.text(
      LOGICAL_W / 2,
      280,
      "IB learners grow by trying, caring, and reflecting.",
      22,
      MUTED,
      "center",
      false
    );

    this.fillRect(460, 340, 1460, 620, PANEL);
    this.strokeRect(460, 340, 1460, 620, GOLD, 3);
    const acc = this.total ? Math.floor((100 * this.correct) / this.total) : 0;
    const rows = [
      ["Score", String(this.score)],
      ["Correct", `${this.correct} / ${this.total}`],
      ["Accuracy", `${acc}%`],
      ["Best streak", String(this.bestStreak)],
    ];
    let y = 390;
    for (const [lab, val] of rows) {
      this.text(520, y, lab, 22, MUTED, "left", false);
      this.text(1400, y, val, 28, WHITE, "right");
      y += 55;
    }

    const stars = acc >= 90 && won ? 3 : acc >= 70 ? 2 : 1;
    this.text(LOGICAL_W / 2, 680, "⭐ ".repeat(stars).trim(), 36, GOLD);

    for (const [key, label, x] of [
      ["again", "PLAY AGAIN", 720],
      ["menu", "MAIN MENU", 1100],
    ]) {
      const r = [x, 760, x + 280, 860];
      this.hitRects[key] = r;
      const fill = key === "again" ? GREEN : CARD;
      this.fillRect(r[0], r[1], r[2], r[3], fill);
      this.strokeRect(r[0], r[1], r[2], r[3], WHITE, 3);
      this.text((r[0] + r[2]) / 2, (r[1] + r[3]) / 2, label, 22, WHITE);
    }
  }
}

// ─── Boot ─────────────────────────────────────────────────────────────────

const canvas = document.getElementById("game");
if (canvas) {
  new IBLittleExplorers(canvas);
}

try {
  const slot = document.getElementById("tm-voice-slot");
  if (slot && window.TokenMooseVoice) window.TokenMooseVoice.create("ib-little-explorers").mountPicker(slot);
} catch (_) {}
