/**
 * Phonics Pairing Quest — Web / PWA port
 * Match phonics sounds to pictures. Levels, streaks, timed modes.
 */

const W = 1120;
const H = 760;

const BG = "rgba(10, 21, 40, 0.55)";
const PANEL = "#172B4D";
const CARD = "#213A63";
const CARD_HOVER = "#2C4C7D";
const WHITE = "#F7FAFF";
const MUTED = "#B8C7DE";
const GOLD = "#FFD166";
const GREEN = "#63D297";
const RED = "#FF6B6B";
const BLUE = "#55B7FF";
const PURPLE = "#A78BFA";
const ORANGE = "#FF9F43";

// [sound, emoji, word, clue, category]
const ITEMS = [
  ["b", "🐝", "bee", "B says buh", "single"],
  ["c", "🐱", "cat", "C says kuh", "single"],
  ["d", "🐶", "dog", "D says duh", "single"],
  ["f", "🐟", "fish", "F says fff", "single"],
  ["h", "🏠", "house", "H says huh", "single"],
  ["j", "🧃", "juice", "J says juh", "single"],
  ["k", "🪁", "kite", "K says kuh", "single"],
  ["l", "🦁", "lion", "L says lll", "single"],
  ["m", "🌙", "moon", "M says mmm", "single"],
  ["n", "👃", "nose", "N says nnn", "single"],
  ["p", "🐷", "pig", "P says puh", "single"],
  ["r", "🐰", "rabbit", "R says rrr", "single"],
  ["s", "☀️", "sun", "S says sss", "single"],
  ["t", "🐢", "turtle", "T says tuh", "single"],
  ["v", "🎻", "violin", "V says vvv", "single"],
  ["w", "🍉", "watermelon", "W says wuh", "single"],
  ["y", "🧶", "yarn", "Y says yuh", "single"],
  ["z", "🦓", "zebra", "Z says zzz", "single"],
  ["sh", "🐑", "sheep", "S H says shh", "digraph"],
  ["ch", "🧀", "cheese", "C H says ch", "digraph"],
  ["th", "👍", "thumb", "T H says th", "digraph"],
  ["wh", "❓", "what", "W H says wh", "digraph"],
  ["ph", "📱", "phone", "P H says fff", "digraph"],
  ["ck", "🦆", "duck", "C K says kuh", "digraph"],
  ["ng", "👑", "king", "N G says ng", "digraph"],
  ["ee", "🐝", "bee", "E E says ee", "digraph"],
  ["oo", "🌙", "moon", "O O says oo", "digraph"],
  ["ai", "🌧️", "rain", "A I says ay", "digraph"],
  ["oa", "⛵", "boat", "O A says oh", "digraph"],
  ["ar", "⭐", "star", "A R says ar", "digraph"],
  ["or", "🚪", "door", "O R says or", "digraph"],
  ["er", "🌸", "fern", "E R says er", "digraph"],
  ["igh", "💡", "light", "I G H says eye", "digraph"],
];

const LEVELS = {
  Easy: {
    pairs: 5,
    choices: 4,
    seconds: 0,
    pool: "single",
    lives: 5,
    multiplier: 1.0,
  },
  Medium: {
    pairs: 7,
    choices: 5,
    seconds: 75,
    pool: "single",
    lives: 4,
    multiplier: 1.25,
  },
  Hard: {
    pairs: 9,
    choices: 6,
    seconds: 60,
    pool: "mixed",
    lives: 3,
    multiplier: 1.6,
  },
  "Super Phonics": {
    pairs: 12,
    choices: 7,
    seconds: 55,
    pool: "digraph",
    lives: 3,
    multiplier: 2.1,
  },
};

const LEVEL_BLURBS = {
  Easy: "Letters · relaxed · 5 pairs",
  Medium: "Letters · timed · 7 pairs",
  Hard: "Mixed sounds · timed · 9 pairs",
  "Super Phonics": "Digraphs · timed · 12 pairs",
};

function poolFor(cfg) {
  if (cfg.pool === "single") return ITEMS.filter((it) => it[4] === "single");
  if (cfg.pool === "digraph") return ITEMS.filter((it) => it[4] === "digraph");
  return ITEMS.slice();
}

function soundsFor(cfg) {
  return poolFor(cfg).map((it) => it[0]);
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

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ─── Speech ─────────────────────────────────────────────────────────────────

class Speech {
  constructor() {
    this.enabled = true;
    this._voice = (typeof window !== "undefined" && window.TokenMooseVoice) ? window.TokenMooseVoice.create("phonics-pairing-quest") : null;
  }
  setEnabled(on) {
    this.enabled = !!on;
    if (this._voice) {
      this._voice.setEnabled(this.enabled);
      if (!this.enabled) this._voice.stop();
    }
  }
  speak(text) {
    if (!this.enabled || !text) return;
    if (this._voice) { this._voice.speak(text); return; }
    if (!window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.95;
      window.speechSynthesis.speak(u);
    } catch (_) {
      /* ignore */
    }
  }
  success() {
    this.speak(pick(["Great job!", "Fantastic!", "You got it!", "Excellent!", "Brilliant!"]));
  }
  fail() {
    this.speak(pick(["Try again!", "Almost!", "Keep going!"]));
  }
  complete() {
    this.speak("Amazing! You completed the phonics challenge!");
  }
}

// ─── Game ───────────────────────────────────────────────────────────────────

class PhonicsPairingQuest {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.sound = new Speech();
    this.state = "title"; // title | play | result
    this.hitRects = {};
    this.pointer = [0, 0];
    this.hoverKey = null;

    this.levelName = "Easy";
    this.level = LEVELS.Easy;
    this.mode = "relaxed";
    this.score = 0;
    this.streak = 0;
    this.bestStreak = 0;
    this.lives = 5;
    this.roundNo = 0;
    this.correct = 0;
    this.total = 0;
    this.timeLeft = 0;
    this.locked = false;
    this.currentItem = null;
    this.roundItems = [];
    this.choiceSounds = [];
    this.choiceStates = {}; // sound -> "ok" | "bad" | null
    this.hintText = "";
    this.hintColor = MUTED;
    this.questionFlash = null;
    this.won = false;
    this.timeout = false;
    this._timerId = null;
    this._afterId = null;
    this.anim = 0;

    this._bind();
    this._resize();
    window.addEventListener("resize", () => this._resize());
    this._last = performance.now();
    requestAnimationFrame((t) => this._frame(t));
  }

  _resize() {
    const wrap = this.canvas.parentElement;
    const s = Math.min(wrap.clientWidth / W, wrap.clientHeight / H);
    this.canvas.style.width = Math.floor(W * s) + "px";
    this.canvas.style.height = Math.floor(H * s) + "px";
    this.canvas.width = W;
    this.canvas.height = H;
  }

  toLogical(cx, cy) {
    const rect = this.canvas.getBoundingClientRect();
    return [((cx - rect.left) / rect.width) * W, ((cy - rect.top) / rect.height) * H];
  }

  _bind() {
    const c = this.canvas;
    c.tabIndex = 0;
    c.focus();

    const down = (e) => {
      e.preventDefault();
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
      this.hoverKey = null;
      for (const [key, r] of Object.entries(this.hitRects)) {
        if (pointIn(this.pointer[0], this.pointer[1], r)) {
          this.hoverKey = key;
          break;
        }
      }
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        this.clearTimers();
        this.state = "title";
        return;
      }
      if (this.state === "play" && !this.locked && e.key >= "1" && e.key <= "9") {
        const idx = parseInt(e.key, 10) - 1;
        if (idx >= 0 && idx < this.choiceSounds.length) {
          this.chooseSound(this.choiceSounds[idx]);
        }
      }
    });
  }

  clearTimers() {
    if (this._timerId) {
      clearTimeout(this._timerId);
      this._timerId = null;
    }
    if (this._afterId) {
      clearTimeout(this._afterId);
      this._afterId = null;
    }
  }

  handle(lx, ly) {
    for (const [key, r] of Object.entries(this.hitRects)) {
      if (!pointIn(lx, ly, r)) continue;
      if (key.startsWith("level_")) {
        this.startGame(key.replace("level_", ""));
      } else if (key.startsWith("choice_")) {
        if (this.state === "play" && !this.locked) {
          this.chooseSound(key.replace("choice_", ""));
        }
      } else if (key === "hear") {
        this.hearCurrent();
      } else if (key === "menu") {
        this.clearTimers();
        this.state = "title";
      } else if (key === "again") {
        this.startGame(this.levelName);
      }
      return;
    }
  }

  // ── Flow ────────────────────────────────────────────────────────────────

  startGame(levelName) {
    this.clearTimers();
    this.levelName = levelName;
    this.level = LEVELS[levelName];
    this.mode = this.level.seconds ? "timed" : "relaxed";
    this.score = 0;
    this.streak = 0;
    this.bestStreak = 0;
    this.lives = this.level.lives;
    this.roundNo = 0;
    this.correct = 0;
    this.total = 0;
    this.timeLeft = this.level.seconds | 0;
    this.locked = false;
    this.choiceStates = {};
    this.hintText = "";
    this.questionFlash = null;
    this.won = false;
    this.timeout = false;

    const pool = poolFor(this.level);
    const n = Math.min(this.level.pairs, pool.length);
    this.roundItems = shuffle(pool).slice(0, n);
    this.state = "play";
    this.nextRound();
  }

  nextRound() {
    if (this.roundNo >= this.roundItems.length) {
      this.finishGame(true);
      return;
    }
    this.roundNo += 1;
    this.currentItem = this.roundItems[this.roundNo - 1];
    this.locked = false;
    this.choiceStates = {};
    this.hintText = "Which phonics sound belongs to this word?";
    this.hintColor = MUTED;
    this.questionFlash = null;

    const answer = this.currentItem[0];
    const poolSounds = soundsFor(this.level);
    const choices = new Set([answer]);
    let guard = 0;
    while (choices.size < this.level.choices && guard < 80) {
      choices.add(pick(poolSounds));
      guard += 1;
    }
    this.choiceSounds = shuffle([...choices]);

    if (this.roundNo === 1) {
      /* no auto-speak */
      if (this.mode === "timed") this.tickTimer();
    }
  }

  chooseSound(selected) {
    if (this.locked || !this.currentItem) return;
    this.locked = true;
    const answer = this.currentItem[0];
    selected = selected.toLowerCase().trim();

    if (selected === answer) {
      this.correct += 1;
      this.total += 1;
      this.streak += 1;
      this.bestStreak = Math.max(this.bestStreak, this.streak);
      const base = 100;
      const combo = Math.min(this.streak - 1, 10) * 20;
      const points = Math.floor((base + combo) * this.level.multiplier);
      this.score += points;
      const clue = this.currentItem[3];
      this.hintText = `✓ Correct!  ${answer.toUpperCase()} — ${clue}`;
      this.hintColor = GREEN;
      this.choiceStates[selected] = "ok";
      this.sound.success();
      if (this.streak >= 3) {
        this.questionFlash = pick(["ON FIRE! 🔥", "PHONICS PRO! ⭐", "AMAZING! 🚀", "SUPER READER!"]);
      }
      this._afterId = setTimeout(() => {
        this._afterId = null;
        this.nextRound();
      }, 900);
    } else {
      this.total += 1;
      this.lives -= 1;
      this.streak = 0;
      this.hintText = `✗ Not quite — the answer is ${answer.toUpperCase()}. Remember it!`;
      this.hintColor = RED;
      this.choiceStates[selected] = "bad";
      this.choiceStates[answer] = "ok";
      this.sound.fail();
      if (this.lives <= 0) {
        this._afterId = setTimeout(() => {
          this._afterId = null;
          this.finishGame(false);
        }, 1100);
      } else {
        this._afterId = setTimeout(() => {
          this._afterId = null;
          this.nextRound();
        }, 1300);
      }
    }
  }

  tickTimer() {
    if (this.mode !== "timed" || this.state !== "play") return;
    this.timeLeft -= 1;
    if (this.timeLeft <= 0) {
      this.locked = true;
      this.finishGame(false, true);
      return;
    }
    this._timerId = setTimeout(() => this.tickTimer(), 1000);
  }

  hearCurrent() {
    if (!this.currentItem) return;
    /* no auto-speak */
  }

  finishGame(won, timeout = false) {
    this.clearTimers();
    this.won = won;
    this.timeout = timeout;
    this.state = "result";
    if (won) this.sound.complete();
    if (won) {
      const acc = this.total ? Math.floor((100 * this.correct) / this.total) : 0;
      setTimeout(() => {
        this.sound.speak(`You scored ${this.score} points. Accuracy ${acc} percent.`);
      }, 400);
    }
  }

  starRating(accuracy, won) {
    if (!won) return accuracy >= 60 ? "⭐  ⭐  ☆" : "⭐  ☆  ☆";
    if (accuracy >= 95) return "⭐  ⭐  ⭐";
    if (accuracy >= 80) return "⭐  ⭐  ☆";
    return "⭐  ☆  ☆";
  }

  // ── Frame ───────────────────────────────────────────────────────────────

  _frame(t) {
    this.anim += 1;
    this.draw();
    requestAnimationFrame((nt) => this._frame(nt));
  }

  // ── Draw helpers ────────────────────────────────────────────────────────

  fillRect(x1, y1, x2, y2, fill) {
    this.ctx.fillStyle = fill;
    this.ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
  }

  roundRect(x, y, w, h, r, fill, stroke, sw = 2) {
    const ctx = this.ctx;
    const rr = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + rr, y);
    ctx.arcTo(x + w, y, x + w, y + h, rr);
    ctx.arcTo(x + w, y + h, x, y + h, rr);
    ctx.arcTo(x, y + h, x, y, rr);
    ctx.arcTo(x, y, x + w, y, rr);
    ctx.closePath();
    if (fill) {
      ctx.fillStyle = fill;
      ctx.fill();
    }
    if (stroke) {
      ctx.strokeStyle = stroke;
      ctx.lineWidth = sw;
      ctx.stroke();
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

  draw() {
    this.hitRects = {};
    this.ctx.clearRect(0, 0, W, H);
    this.fillRect(0, 0, W, H, BG);
    if (this.state === "title") this.drawTitle();
    else if (this.state === "play") this.drawPlay();
    else if (this.state === "result") this.drawResult();
  }

  drawTitle() {
    this.text(W / 2, 56, "★  PHONICS PAIRING QUEST  ★", 32, GOLD);
    this.text(W / 2, 100, "Match the sound to the picture!", 22, WHITE);
    this.text(W / 2, 130, "A quick, colourful phonics adventure for young readers", 14, MUTED, "center", false);

    this.roundRect(80, 160, W - 160, 120, 12, PANEL);
    this.text(W / 2, 185, "HOW TO PLAY", 20, BLUE);
    this.text(
      W / 2,
      230,
      "1. Look at the picture and word.   2. Choose the phonics sound.   3. Build your streak!",
      14,
      WHITE,
      "center",
      false
    );
    this.text(W / 2, 255, "4. Miss? Learn the hint and keep going.", 14, MUTED, "center", false);

    this.text(W / 2, 320, "CHOOSE YOUR CHALLENGE", 20, WHITE);

    const names = Object.keys(LEVELS);
    const cardW = 220;
    const gap = 16;
    const totalW = names.length * cardW + (names.length - 1) * gap;
    let x0 = (W - totalW) / 2;
    names.forEach((name, i) => {
      const x = x0 + i * (cardW + gap);
      const y = 350;
      const r = [x, y, x + cardW, y + 200];
      this.hitRects[`level_${name}`] = r;
      const hover = this.hoverKey === `level_${name}`;
      this.roundRect(x, y, cardW, 200, 12, hover ? CARD_HOVER : CARD, GOLD, 2);
      this.text(x + cardW / 2, y + 40, name, 20, GOLD);
      this.text(x + cardW / 2, y + 90, LEVEL_BLURBS[name], 13, MUTED, "center", false);
      this.roundRect(x + 40, y + 140, cardW - 80, 40, 8, BLUE);
      this.text(x + cardW / 2, y + 160, "PLAY", 16, WHITE);
    });

    this.text(W / 2, H - 50, "Keys 1–7 select answers · Esc = menu", 12, MUTED, "center", false);

    
  }

  drawPlay() {
    // Header
    this.fillRect(0, 0, W, 70, PANEL);
    this.text(24, 35, "PHONICS QUEST", 20, GOLD, "left");
    this.text(220, 35, this.levelName.toUpperCase(), 13, BLUE, "left", false);

    const hearts = Math.max(this.lives, 0);
    const heartStr = hearts > 0 ? "♥ ".repeat(hearts).trim() : "—";
    const timeStr = this.mode === "timed" ? `⏱ ${Math.max(this.timeLeft, 0)}s` : "⏱ Relaxed";
    this.text(W - 24, 35, `⭐ ${this.score}   🔥 ${this.streak}   ${heartStr}   ${timeStr}`, 14, WHITE, "right", false);

    const total = this.roundItems.length;
    const shown = Math.min(this.roundNo, total);
    this.text(W / 2, 95, `PAIR ${shown} / ${total}`, 13, MUTED, "center", false);

    // Question panel
    this.roundRect(48, 115, W - 96, 200, 12, PANEL);
    if (this.currentItem) {
      const word = this.questionFlash || this.currentItem[2].toUpperCase();
      const wordColor = this.questionFlash ? GOLD : WHITE;
      this.text(W / 2, 155, word, 30, wordColor);
      this.emoji(W / 2, 215, this.currentItem[1], 48);
      this.text(W / 2, 280, this.hintText, 15, this.hintColor, "center", false);
    }

    // Choice buttons
    const n = this.choiceSounds.length;
    const cols = Math.min(4, n);
    const rows = Math.ceil(n / cols);
    const gap = 14;
    const btnW = Math.min(200, (W - 96 - gap * (cols - 1)) / cols);
    const btnH = 72;
    const totalW = cols * btnW + (cols - 1) * gap;
    const startX = (W - totalW) / 2;
    const startY = 340;

    this.choiceSounds.forEach((snd, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = startX + col * (btnW + gap);
      const y = startY + row * (btnH + gap);
      const key = `choice_${snd}`;
      this.hitRects[key] = [x, y, x + btnW, y + btnH];
      let fill = CARD;
      const st = this.choiceStates[snd];
      if (st === "ok") fill = GREEN;
      else if (st === "bad") fill = RED;
      else if (this.hoverKey === key && !this.locked) fill = CARD_HOVER;
      this.roundRect(x, y, btnW, btnH, 10, fill, WHITE, 2);
      const labelColor = st === "ok" ? BG : WHITE;
      this.text(x + btnW / 2, y + btnH / 2, snd.toUpperCase(), 26, labelColor);
    });

    // Bottom tools
    const hearR = [48, H - 70, 220, H - 28];
    this.hitRects.hear = hearR;
    this.roundRect(hearR[0], hearR[1], 172, 42, 8, PURPLE);
    this.text((hearR[0] + hearR[2]) / 2, (hearR[1] + hearR[3]) / 2, "🔊  HEAR SOUND", 14, WHITE);

    const menuR = [W - 140, H - 70, W - 48, H - 28];
    this.hitRects.menu = menuR;
    this.roundRect(menuR[0], menuR[1], 92, 42, 8, CARD);
    this.text((menuR[0] + menuR[2]) / 2, (menuR[1] + menuR[3]) / 2, "MENU", 14, WHITE);
  }

  drawResult() {
    const accuracy = this.total ? Math.floor((100 * this.correct) / this.total) : 0;
    let title, titleColor, subtitle;
    if (this.won) {
      title = pick(["🎉  QUEST COMPLETE!  🎉", "🌟  PHONICS CHAMPION!  🌟", "🏆  AMAZING WORK!  🏆"]);
      titleColor = GOLD;
      subtitle = "You matched every phonics pair!";
    } else if (this.timeout) {
      title = "⏰  TIME'S UP!";
      titleColor = ORANGE;
      subtitle = "Every mistake is a chance to learn.";
    } else {
      title = "💪  KEEP PRACTISING!";
      titleColor = RED;
      subtitle = "Every mistake is a chance to learn.";
    }

    this.text(W / 2, 80, title, 32, titleColor);
    this.text(W / 2, 125, subtitle, 20, WHITE);

    this.roundRect(200, 170, W - 400, 280, 12, PANEL, GOLD, 2);
    const rows = [
      ["⭐ SCORE", String(this.score)],
      ["✓ CORRECT", String(this.correct)],
      ["🎯 ACCURACY", `${accuracy}%`],
      ["🔥 BEST STREAK", String(this.bestStreak)],
      ["♥ LIVES LEFT", String(Math.max(this.lives, 0))],
    ];
    rows.forEach(([lab, val], i) => {
      const y = 210 + i * 45;
      this.text(240, y, lab, 16, MUTED, "left", false);
      this.text(W - 240, y, val, 22, WHITE, "right");
    });

    this.text(W / 2, 480, this.starRating(accuracy, this.won), 28, GOLD);

    const btns = [
      ["again", "PLAY AGAIN", BLUE, 350],
      ["menu", "CHOOSE LEVEL", CARD, 560],
    ];
    btns.forEach(([key, label, fill, x]) => {
      const r = [x, 540, x + 180, 600];
      this.hitRects[key] = r;
      this.roundRect(r[0], r[1], 180, 60, 10, fill, WHITE, 2);
      this.text((r[0] + r[2]) / 2, (r[1] + r[3]) / 2, label, 16, WHITE);
    });
  }
}

const canvas = document.getElementById("game");
if (canvas) new PhonicsPairingQuest(canvas);

try {
  const slot = document.getElementById("tm-voice-slot");
  if (slot && window.TokenMooseVoice) window.TokenMooseVoice.create("phonics-pairing-quest").mountPicker(slot);
} catch (_) {}
