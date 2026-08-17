/**
 * Alphabet Hunt — Web / PWA port
 * Classroom letter-hunt game. Canvas, touch + keyboard.
 * Ported from the Python/Tkinter original for The Token Moose.
 */

const LOGICAL_W = 1920;
const LOGICAL_H = 1080;
const FPS = 60;

const WHITE = "#FFFFFF";
const BLACK = "#000000";
const RED = "#DC143C";
const DARK_RED = "#8B0000";
const GREEN = "#228B22";
const LIME = "#32CD32";
const BLUE = "#1E90FF";
const SKY_BLUE = "#87CEEB";
const YELLOW = "#FFD700";
const GOLD = "#FFDF00";
const ORANGE = "#FF8C00";
const PURPLE = "#800080";
const PINK = "#FF69B4";
const CYAN = "#00CED1";
const BROWN = "#8B4513";
const DARK_BROWN = "#654321";
const TAN = "#D2B48C";
const GRAY = "#808080";
const DARK_GRAY = "#404040";
const LIGHT_GRAY = "#C8C8C8";
const BG_WALL = "#FFF8DC";
const BG_FLOOR = "#F5DEB3";
const WOOD = "#DEB887";
const STEEL_BLUE = "#4682B4";
const CORNFLOWER = "#6495ED";
const IVORY = "#FFFFF0";
const PLAYER_BLUE = "#1E90FF";
const PLAYER_LIGHT = "#64B5F6";
const BLUSH = "#FFB4B4";
const UI_BAR = "#2C3E50";
const UI_BAR_TOP = "#34495E";

const LETTER_DATA = {
  A: ["Apple", RED, "apple"],
  B: ["Ball", BLUE, "ball"],
  C: ["Cat", ORANGE, "cat"],
  D: ["Dog", BROWN, "dog"],
  E: ["Elephant", GRAY, "elephant"],
  F: ["Fish", CYAN, "fish"],
  G: ["Giraffe", YELLOW, "giraffe"],
  H: ["House", BROWN, "house"],
  I: ["Ice Cream", PINK, "icecream"],
  J: ["Juice", ORANGE, "juice"],
  K: ["Kite", RED, "kite"],
  L: ["Lion", GOLD, "lion"],
  M: ["Moon", YELLOW, "moon"],
  N: ["Nest", DARK_BROWN, "nest"],
  O: ["Orange", ORANGE, "orange"],
  P: ["Penguin", BLACK, "penguin"],
  Q: ["Queen", PURPLE, "queen"],
  R: ["Rocket", RED, "rocket"],
  S: ["Sun", GOLD, "sun"],
  T: ["Tree", GREEN, "tree"],
  U: ["Umbrella", PURPLE, "umbrella"],
  V: ["Violin", DARK_BROWN, "violin"],
  W: ["Whale", BLUE, "whale"],
  X: ["Xylophone", RED, "xylo"],
  Y: ["Yo-Yo", RED, "yoyo"],
  Z: ["Zebra", BLACK, "zebra"],
};

const WALL_H = 150;
const FLOOR_TOP = 150;
const FLOOR_BOTTOM = 780;
const UI_TOP = 800;
const PROMPT_Y = 10;
const PROMPT_H = 128;
const PLAYER_SPEED = 10;
const PLAYER_RADIUS = 32;
const LETTER_RADIUS = 52;
const TOUCH_LETTER_PAD = 14;
const PEEL_RADIUS = 34;

// ─── Simple Web Audio SFX ───────────────────────────────────────────────────

class SoundManager {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.enabled = true;
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

  tone(freq, dur, vol = 0.2, type = "sine", when = 0) {
    if (this.muted || !this.enabled) return;
    const ctx = this.ensure();
    if (!ctx) return;
    const t0 = ctx.currentTime + when;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, t0);
    gain.gain.linearRampToValueAtTime(vol, t0 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }

  click() {
    this.tone(660, 0.05, 0.12);
  }
  correct() {
    this.tone(523, 0.09, 0.18);
    this.tone(659, 0.09, 0.18, "sine", 0.09);
    this.tone(784, 0.12, 0.16, "sine", 0.18);
    this.tone(1047, 0.2, 0.14, "sine", 0.3);
  }
  wrong() {
    this.tone(277, 0.12, 0.14);
    this.tone(233, 0.18, 0.12, "sine", 0.12);
  }
  slip() {
    this.tone(360, 0.08, 0.12);
    this.tone(300, 0.08, 0.11, "sine", 0.08);
    this.tone(240, 0.1, 0.1, "sine", 0.16);
    this.tone(180, 0.14, 0.09, "sine", 0.26);
  }
  star() {
    this.tone(784, 0.07, 0.14);
    this.tone(988, 0.07, 0.14, "sine", 0.07);
    this.tone(1175, 0.14, 0.12, "sine", 0.14);
  }
  victory() {
    const notes = [523, 659, 784, 1047, 784, 1047];
    const durs = [0.12, 0.12, 0.12, 0.28, 0.1, 0.4];
    let t = 0;
    notes.forEach((f, i) => {
      this.tone(f, durs[i], 0.15, "sine", t);
      t += durs[i];
    });
  }
  hint() {
    this.tone(880, 0.07, 0.12);
    this.tone(880, 0.09, 0.11, "sine", 0.11);
  }
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function rand(a, b) {
  return a + Math.random() * (b - a);
}
function randInt(a, b) {
  return Math.floor(rand(a, b + 1));
}
function hypot(dx, dy) {
  return Math.hypot(dx, dy);
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

// ─── Game ───────────────────────────────────────────────────────────────────

class AlphabetHuntGame {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.sound = new SoundManager();

    this.scale = 1;
    this.offsetX = 0;
    this.offsetY = 0;
    this.cssW = LOGICAL_W;
    this.cssH = LOGICAL_H;

    this.keys = new Set();
    this.pointerDown = false;
    this.holdMoveDir = [0, 0];
    this.pointerLogical = [0, 0];

    this.mode = "adventure";
    this.state = "MENU";
    this.letterOrder = [];
    this.levelTotal = 26;
    this.currentLevel = 0;
    this.letters = [];
    this.obstacles = [];
    this.particles = [];
    this.confetti = [];
    this.floatStars = [];
    this.message = "";
    this.messageColor = DARK_GRAY;
    this.messageTimer = 0;
    this.transitionTimer = 0;
    this.slipCooldown = 0;
    this.wrongStreak = 0;
    this.correctStreak = 0;
    this.bestStreak = 0;
    this.starsEarned = 0;
    this.hintPulse = 0;
    this.playerPos = [LOGICAL_W / 2, 500];
    this.soundMuted = false;
    this.menuPulse = 0;
    this.animT = 0;
    this.isFullscreen = false;

    this._bindInput();
    this._resize();
    window.addEventListener("resize", () => this._resize());
    window.addEventListener("orientationchange", () => setTimeout(() => this._resize(), 150));

    this._last = performance.now();
    this._acc = 0;
    requestAnimationFrame((t) => this._frame(t));
  }

  // ── Layout / coordinates ────────────────────────────────────────────────

  _resize() {
    const wrap = this.canvas.parentElement;
    const ww = wrap.clientWidth;
    const wh = wrap.clientHeight;
    const s = Math.min(ww / LOGICAL_W, wh / LOGICAL_H);
    this.scale = s;
    this.cssW = Math.floor(LOGICAL_W * s);
    this.cssH = Math.floor(LOGICAL_H * s);
    this.canvas.style.width = this.cssW + "px";
    this.canvas.style.height = this.cssH + "px";
    // Keep internal resolution fixed for crisp drawing
    this.canvas.width = LOGICAL_W;
    this.canvas.height = LOGICAL_H;
  }

  toLogical(clientX, clientY) {
    const rect = this.canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * LOGICAL_W;
    const y = ((clientY - rect.top) / rect.height) * LOGICAL_H;
    return [x, y];
  }

  // ── Input ───────────────────────────────────────────────────────────────

  _bindInput() {
    const c = this.canvas;
    c.tabIndex = 0;
    c.focus();

    window.addEventListener("keydown", (e) => {
      const k = e.key.toLowerCase();
      this.keys.add(k);
      if ((k === "enter" || k === " ") && this.state === "MENU") {
        e.preventDefault();
        this.startGame("adventure");
      }
      if (k === "escape") {
        e.preventDefault();
        this.onEscape();
      }
      if (k === "f11") {
        e.preventDefault();
        this.toggleFullscreen();
      }
    });
    window.addEventListener("keyup", (e) => {
      this.keys.delete(e.key.toLowerCase());
    });

    const down = (e) => {
      e.preventDefault();
      this.pointerDown = true;
      this.sound.ensure();
      const src = e.touches ? e.touches[0] : e;
      const [lx, ly] = this.toLogical(src.clientX, src.clientY);
      this.pointerLogical = [lx, ly];
      this.handlePointer(lx, ly, true);
      c.focus();
    };
    const move = (e) => {
      if (!this.pointerDown) return;
      e.preventDefault();
      const src = e.touches ? e.touches[0] : e;
      const [lx, ly] = this.toLogical(src.clientX, src.clientY);
      this.pointerLogical = [lx, ly];
      this.updateHoldMove(lx, ly);
    };
    const up = (e) => {
      e.preventDefault();
      this.pointerDown = false;
      this.holdMoveDir = [0, 0];
    };

    c.addEventListener("mousedown", down);
    c.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    c.addEventListener("touchstart", down, { passive: false });
    c.addEventListener("touchmove", move, { passive: false });
    c.addEventListener("touchend", up, { passive: false });
    c.addEventListener("touchcancel", up, { passive: false });
  }

  onEscape() {
    if (this.state === "PLAYING" || this.state === "TRANSITION" || this.state === "VICTORY") {
      this.gotoMenu();
    }
  }

  toggleFullscreen() {
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

  // ── Rects (UI hit areas) ────────────────────────────────────────────────

  getMenuRects() {
    const cx = LOGICAL_W / 2;
    let y = 340;
    const bw = 560, bh = 70, gap = 12;
    const keys = ["adventure", "quick", "challenge", "fullscreen", "mute"];
    const rects = {};
    for (const k of keys) {
      rects[k] = [cx - bw / 2, y, cx + bw / 2, y + bh];
      y += bh + gap;
    }
    return rects;
  }

  getArrowRects() {
    const size = 88, gap = 12;
    const baseX = LOGICAL_W - 120 - (size * 3 + gap * 2) - 24;
    const baseY = UI_TOP + 16;
    return {
      up: [baseX + size + gap, baseY, baseX + size * 2 + gap, baseY + size],
      left: [baseX, baseY + size + gap, baseX + size, baseY + size * 2 + gap],
      down: [baseX + size + gap, baseY + size + gap, baseX + size * 2 + gap, baseY + size * 2 + gap],
      right: [baseX + size * 2 + gap * 2, baseY + size + gap, baseX + size * 3 + gap * 2, baseY + size * 2 + gap],
    };
  }

  getUiRects() {
    const y1 = UI_TOP + 36, y2 = UI_TOP + 116;
    const bw = 108, gap = 12;
    let x = 20;
    const rects = {};
    for (const key of ["menu", "restart", "fullscreen", "mute", "hint"]) {
      rects[key] = [x, y1, x + bw, y2];
      x += bw + gap;
    }
    return rects;
  }

  getVictoryRects() {
    const btnY = LOGICAL_H / 2 + 200;
    const bw = 230, bh = 72;
    const cx = LOGICAL_W / 2;
    return {
      restart: [cx - bw - 16, btnY, cx - 16, btnY + bh],
      menu: [cx + 16, btnY, cx + bw + 16, btnY + bh],
    };
  }

  // ── Pointer handling ────────────────────────────────────────────────────

  handlePointer(lx, ly, down) {
    if (this.state === "MENU") {
      const rects = this.getMenuRects();
      for (const [key, r] of Object.entries(rects)) {
        if (pointIn(lx, ly, r)) {
          this.sound.click();
          if (key === "adventure") this.startGame("adventure");
          else if (key === "quick") this.startGame("quick");
          else if (key === "challenge") this.startGame("challenge");
          else if (key === "fullscreen") this.toggleFullscreen();
          else if (key === "mute") {
            this.soundMuted = !this.soundMuted;
            this.sound.setMuted(this.soundMuted);
          }
          return;
        }
      }
    } else if (this.state === "PLAYING" || this.state === "TRANSITION") {
      const ui = this.getUiRects();
      for (const [key, r] of Object.entries(ui)) {
        if (pointIn(lx, ly, r)) {
          this.sound.click();
          if (key === "menu") this.gotoMenu();
          else if (key === "restart") this.startGame(this.mode);
          else if (key === "fullscreen") this.toggleFullscreen();
          else if (key === "mute") {
            this.soundMuted = !this.soundMuted;
            this.sound.setMuted(this.soundMuted);
          } else if (key === "hint" && this.state === "PLAYING") {
            this.triggerHint(true);
          }
          return;
        }
      }
      if (this.state === "PLAYING" && down && this.trySelectLetterAt(lx, ly)) return;
      this.updateHoldMove(lx, ly);
    } else if (this.state === "VICTORY") {
      for (const [key, r] of Object.entries(this.getVictoryRects())) {
        if (pointIn(lx, ly, r)) {
          this.sound.click();
          if (key === "restart") this.startGame(this.mode);
          else if (key === "menu") this.gotoMenu();
          return;
        }
      }
    }
  }

  updateHoldMove(lx, ly) {
    let dx = 0, dy = 0;
    for (const [key, r] of Object.entries(this.getArrowRects())) {
      if (pointIn(lx, ly, r)) {
        if (key === "left") dx = -1;
        else if (key === "right") dx = 1;
        else if (key === "up") dy = -1;
        else if (key === "down") dy = 1;
      }
    }
    this.holdMoveDir = [dx, dy];
  }

  trySelectLetterAt(lx, ly) {
    if (this.currentLevel >= this.levelTotal) return false;
    const target = this.letterOrder[this.currentLevel];
    let best = null, bestD = 1e9;
    for (const letter of this.letters) {
      const d = hypot(lx - letter.pos[0], ly - letter.pos[1]);
      if (d < letter.radius + TOUCH_LETTER_PAD && d < bestD) {
        best = letter;
        bestD = d;
      }
    }
    if (!best) return false;
    this.resolveLetterChoice(best, target);
    return true;
  }

  getInputDirection() {
    let dx = 0, dy = 0;
    if (this.keys.has("arrowleft") || this.keys.has("a")) dx -= 1;
    if (this.keys.has("arrowright") || this.keys.has("d")) dx += 1;
    if (this.keys.has("arrowup") || this.keys.has("w")) dy -= 1;
    if (this.keys.has("arrowdown") || this.keys.has("s")) dy += 1;
    dx += this.holdMoveDir[0];
    dy += this.holdMoveDir[1];
    if (Math.abs(dx) > 1) dx = dx > 0 ? 1 : -1;
    if (Math.abs(dy) > 1) dy = dy > 0 ? 1 : -1;
    if (dx && dy) {
      dx *= 0.707;
      dy *= 0.707;
    }
    return [dx, dy];
  }

  // ── Game flow ───────────────────────────────────────────────────────────

  startGame(mode = "adventure") {
    this.mode = mode;
    let letters = shuffle(Object.keys(LETTER_DATA));
    if (mode === "quick") {
      this.letterOrder = letters.slice(0, 10);
      this.levelTotal = 10;
    } else {
      this.letterOrder = letters;
      this.levelTotal = 26;
    }
    this.currentLevel = 0;
    this.letters = [];
    this.obstacles = [];
    this.particles = [];
    this.confetti = [];
    this.floatStars = [];
    this.message = "";
    this.messageTimer = 0;
    this.slipCooldown = 0;
    this.wrongStreak = 0;
    this.correctStreak = 0;
    this.bestStreak = 0;
    this.starsEarned = 0;
    this.hintPulse = 0;
    this.holdMoveDir = [0, 0];
    this.state = "PLAYING";
    this.loadLevel();
  }

  gotoMenu() {
    this.state = "MENU";
    this.holdMoveDir = [0, 0];
    this.particles = [];
    this.confetti = [];
    this.floatStars = [];
  }

  clampPlayer() {
    this.playerPos[0] = Math.max(PLAYER_RADIUS + 8, Math.min(LOGICAL_W - PLAYER_RADIUS - 8, this.playerPos[0]));
    this.playerPos[1] = Math.max(FLOOR_TOP + PLAYER_RADIUS + 8, Math.min(FLOOR_BOTTOM - PLAYER_RADIUS - 8, this.playerPos[1]));
  }

  loadLevel() {
    if (this.currentLevel >= this.levelTotal) {
      this.generateConfetti();
      this.sound.victory();
      this.state = "VICTORY";
      return;
    }
    const target = this.letterOrder[this.currentLevel];
    const word = LETTER_DATA[target][0];
    let decoys = Object.keys(LETTER_DATA).filter((l) => l !== target);
    decoys = shuffle(decoys);
    const progress = this.currentLevel / Math.max(1, this.levelTotal - 1);
    const nDecoy = progress < 0.3 ? 3 : progress < 0.65 ? 4 : 5;
    const pool = shuffle([target, ...decoys.slice(0, nDecoy)]);
    this.letters = [];
    const marginX = 160;
    const marginY = FLOOR_TOP + 70;
    const floorBottom = FLOOR_BOTTOM - 70;
    for (const letter of pool) {
      const pos = this._findSpot(marginX, marginY, floorBottom, true);
      this.letters.push({
        char: letter,
        pos,
        radius: LETTER_RADIUS,
        color: LETTER_DATA[letter][1],
        wrongFlash: 0,
        bob: Math.random() * Math.PI * 2,
      });
    }
    this.obstacles = [];
    this.slipCooldown = 0;
    const peelStart = this.mode === "challenge" ? 0.35 : 0.5;
    if (progress >= peelStart) {
      const nPeels = progress < 0.7 ? 1 : progress < 0.85 ? 2 : 3;
      for (let i = 0; i < nPeels; i++) {
        const pos = this._findSpot(marginX, marginY, floorBottom, true, this.obstacles);
        this.obstacles.push({
          pos,
          radius: PEEL_RADIUS,
          spin: Math.random() * Math.PI * 2,
          vx: [-1.2, -0.8, 0.8, 1.2][randInt(0, 3)],
          vy: [-0.9, -0.5, 0.5, 0.9][randInt(0, 3)],
        });
      }
    }
    this.playerPos = [LOGICAL_W / 2, (marginY + floorBottom) / 2];
    this.wrongStreak = 0;
    this.hintPulse = 0;
    this.message = `Find the letter for: ${word}`;
    this.messageColor = DARK_GRAY;
    this.messageTimer = 65;
  }

  _findSpot(marginX, marginY, floorBottom, avoidPlayer = false, extra = null) {
    extra = extra || [];
    for (let attempt = 0; attempt < 400; attempt++) {
      const x = randInt(marginX, LOGICAL_W - marginX);
      const y = randInt(marginY, floorBottom);
      let ok = true;
      if (avoidPlayer && hypot(x - LOGICAL_W / 2, y - 500) < 110) ok = false;
      for (const other of this.letters) {
        if (hypot(x - other.pos[0], y - other.pos[1]) < 140) {
          ok = false;
          break;
        }
      }
      for (const peel of [...extra, ...this.obstacles]) {
        if (hypot(x - peel.pos[0], y - peel.pos[1]) < 100) {
          ok = false;
          break;
        }
      }
      if (ok) return [x, y];
    }
    return [LOGICAL_W / 2, 480];
  }

  reshuffleLetters() {
    const marginX = 160;
    const marginY = FLOOR_TOP + 70;
    const floorBottom = FLOOR_BOTTOM - 70;
    for (const letter of this.letters) {
      letter.pos = this._findSpot(marginX, marginY, floorBottom);
      if (hypot(letter.pos[0] - this.playerPos[0], letter.pos[1] - this.playerPos[1]) < 120) {
        letter.pos = this._findSpot(marginX, marginY, floorBottom);
      }
    }
  }

  resolveLetterChoice(letter, target) {
    if (letter.char === target) {
      this.sound.correct();
      this.spawnParticles(letter.pos[0], letter.pos[1], LIME, 40);
      this.correctStreak += 1;
      this.bestStreak = Math.max(this.bestStreak, this.correctStreak);
      this.wrongStreak = 0;
      let bonus = "";
      if (this.correctStreak >= 3) {
        this.starsEarned += 1;
        this.sound.star();
        this.floatStars.push({ x: letter.pos[0], y: letter.pos[1] - 30, life: 50, vy: -1.5 });
        bonus = `  Streak ${this.correctStreak}!`;
      }
      this.message = "Correct! Great job!" + bonus;
      this.messageColor = GREEN;
      this.messageTimer = 48;
      this.state = "TRANSITION";
      this.transitionTimer = 52;
    } else {
      this.sound.wrong();
      this.correctStreak = 0;
      this.wrongStreak += 1;
      const word = LETTER_DATA[letter.char][0];
      this.message = `That's ${word}! Try again!`;
      this.messageColor = RED;
      this.messageTimer = 50;
      letter.wrongFlash = 24;
      const ang = Math.atan2(this.playerPos[1] - letter.pos[1], this.playerPos[0] - letter.pos[0]);
      this.playerPos[0] += Math.cos(ang) * 50;
      this.playerPos[1] += Math.sin(ang) * 50;
      this.clampPlayer();
      if (this.wrongStreak >= 2) this.triggerHint(false);
    }
  }

  triggerHint(manual) {
    if (this.state !== "PLAYING" || this.currentLevel >= this.levelTotal) return;
    this.hintPulse = 90;
    this.sound.hint();
    if (manual) {
      this.message = "Hint: the matching letter is glowing!";
      this.messageColor = CORNFLOWER;
      this.messageTimer = 50;
    }
  }

  onBananaSlip(peel) {
    this.sound.slip();
    this.spawnParticles(peel.pos[0], peel.pos[1], YELLOW, 24);
    this.spawnParticles(this.playerPos[0], this.playerPos[1], ORANGE, 14);
    this.reshuffleLetters();
    this.correctStreak = 0;
    this.message = "Bookworm! Letters scrambled!";
    this.messageColor = ORANGE;
    this.messageTimer = 55;
    this.slipCooldown = 90;
    const ang = Math.random() * Math.PI * 2;
    this.playerPos[0] += Math.cos(ang) * 60;
    this.playerPos[1] += Math.sin(ang) * 60;
    this.clampPlayer();
  }

  generateConfetti() {
    const colors = [RED, GREEN, BLUE, YELLOW, ORANGE, PURPLE, PINK, CYAN, GOLD];
    this.confetti = [];
    for (let i = 0; i < 200; i++) {
      this.confetti.push({
        x: randInt(0, LOGICAL_W),
        y: randInt(-LOGICAL_H, 0),
        speed: rand(2.5, 8),
        color: colors[randInt(0, colors.length - 1)],
        size: randInt(5, 14),
      });
    }
  }

  spawnParticles(x, y, color, count = 28) {
    for (let i = 0; i < count; i++) {
      const ang = Math.random() * Math.PI * 2;
      const sp = rand(3, 13);
      this.particles.push({
        pos: [x, y],
        vel: [Math.cos(ang) * sp, Math.sin(ang) * sp],
        life: 50,
        color,
        size: randInt(5, 12),
      });
    }
  }

  // ── Update ──────────────────────────────────────────────────────────────

  update() {
    this.animT += 1;
    if (this.state === "MENU") {
      this.menuPulse += 1;
    } else if (this.state === "PLAYING") {
      const [dx, dy] = this.getInputDirection();
      this.playerPos[0] += dx * PLAYER_SPEED;
      this.playerPos[1] += dy * PLAYER_SPEED;
      this.clampPlayer();

      for (const peel of this.obstacles) {
        peel.pos[0] += peel.vx || 0;
        peel.pos[1] += peel.vy || 0;
        peel.spin = (peel.spin || 0) + 0.05;
        if (peel.pos[0] < 120 || peel.pos[0] > LOGICAL_W - 120) peel.vx = -(peel.vx || 1);
        if (peel.pos[1] < FLOOR_TOP + 60 || peel.pos[1] > FLOOR_BOTTOM - 60) peel.vy = -(peel.vy || 1);
      }

      if (this.slipCooldown > 0) this.slipCooldown -= 1;
      else {
        for (const peel of this.obstacles) {
          if (hypot(this.playerPos[0] - peel.pos[0], this.playerPos[1] - peel.pos[1]) < PLAYER_RADIUS + peel.radius - 4) {
            this.onBananaSlip(peel);
            break;
          }
        }
      }

      if (this.currentLevel < this.levelTotal) {
        const target = this.letterOrder[this.currentLevel];
        for (const letter of this.letters) {
          letter.bob = (letter.bob || 0) + 0.06;
          if (hypot(this.playerPos[0] - letter.pos[0], this.playerPos[1] - letter.pos[1]) < PLAYER_RADIUS + letter.radius - 6) {
            this.resolveLetterChoice(letter, target);
            break;
          }
        }
      }

      if (this.messageTimer > 0) this.messageTimer -= 1;
      if (this.hintPulse > 0) this.hintPulse -= 1;
      for (const letter of this.letters) {
        if (letter.wrongFlash > 0) letter.wrongFlash -= 1;
      }
    } else if (this.state === "TRANSITION") {
      this.transitionTimer -= 1;
      if (this.messageTimer > 0) this.messageTimer -= 1;
      if (this.transitionTimer <= 0) {
        this.currentLevel += 1;
        this.loadLevel();
        if (this.state !== "VICTORY") this.state = "PLAYING";
      }
    } else if (this.state === "VICTORY") {
      for (const c of this.confetti) {
        c.y += c.speed;
        c.x += Math.sin(c.y * 0.02) * 2;
        if (c.y > LOGICAL_H) {
          c.y = -20;
          c.x = randInt(0, LOGICAL_W);
        }
      }
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.pos[0] += p.vel[0];
      p.pos[1] += p.vel[1];
      p.vel[1] += 0.28;
      p.life -= 1;
      if (p.life <= 0) this.particles.splice(i, 1);
    }
    for (let i = this.floatStars.length - 1; i >= 0; i--) {
      const fs = this.floatStars[i];
      fs.y += fs.vy;
      fs.life -= 1;
      if (fs.life <= 0) this.floatStars.splice(i, 1);
    }
  }

  // ── Drawing helpers ─────────────────────────────────────────────────────

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

  draw() {
    const ctx = this.ctx;
    ctx.save();
    ctx.clearRect(0, 0, LOGICAL_W, LOGICAL_H);
    if (this.state === "MENU") this.drawMenu();
    else if (this.state === "PLAYING" || this.state === "TRANSITION") this.drawGame();
    else if (this.state === "VICTORY") this.drawVictory();
    ctx.restore();
  }

  fillRect(x1, y1, x2, y2, fill) {
    const ctx = this.ctx;
    ctx.fillStyle = fill;
    ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
  }

  strokeRect(x1, y1, x2, y2, stroke, width = 2) {
    const ctx = this.ctx;
    ctx.strokeStyle = stroke;
    ctx.lineWidth = width;
    ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
  }

  circle(cx, cy, r, fill, stroke = null, sw = 2) {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
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
    const ctx = this.ctx;
    ctx.font = `${bold ? "bold " : ""}${size}px Arial, sans-serif`;
    ctx.fillStyle = fill;
    ctx.textAlign = align;
    ctx.textBaseline = "middle";
    ctx.fillText(str, x, y);
  }

  poly(points, fill) {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.moveTo(points[0], points[1]);
    for (let i = 2; i < points.length; i += 2) ctx.lineTo(points[i], points[i + 1]);
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
  }

  // ── Screens ─────────────────────────────────────────────────────────────

  drawMenu() {
    this.fillRect(0, 0, LOGICAL_W, LOGICAL_H, BG_WALL);
    const letters = "ABCDEFG";
    for (let i = 0; i < letters.length; i++) {
      const ch = letters[i];
      const color = LETTER_DATA[ch][1];
      const x = 200 + i * 230;
      const y = 100;
      this.circle(x, y, 44, color);
      this.text(x, y, ch, 48, WHITE);
    }
    const pulse = 1 + 0.02 * Math.sin(this.menuPulse * 0.08);
    this.text(LOGICAL_W / 2, 200, "Alphabet Hunt", Math.floor(64 * pulse), BLUE);
    this.text(LOGICAL_W / 2, 268, "Touch letters · Learn words · Watch out for Bookworms!", 22, DARK_GRAY, "center", false);

    const mx = this.pointerLogical[0];
    const my = this.pointerLogical[1];
    const labels = {
      adventure: "ADVENTURE — 26 Letters",
      quick: "QUICK PLAY — 10 Letters",
      challenge: "CHALLENGE — Word Only",
      fullscreen: this.isFullscreen || document.fullscreenElement ? "EXIT FULLSCREEN" : "FULLSCREEN",
      mute: this.soundMuted ? "SOUND: OFF" : "SOUND: ON",
    };
    for (const [key, r] of Object.entries(this.getMenuRects())) {
      const hover = pointIn(mx, my, r);
      let fill;
      if (key === "adventure" || key === "quick" || key === "challenge") fill = hover ? CORNFLOWER : STEEL_BLUE;
      else fill = hover ? "#5DADE2" : "#2E86C1";
      this.fillRect(r[0], r[1], r[2], r[3], fill);
      this.strokeRect(r[0], r[1], r[2], r[3], WHITE, 3);
      this.text((r[0] + r[2]) / 2, (r[1] + r[3]) / 2, labels[key], 24, WHITE);
    }
    this.text(LOGICAL_W / 2, LOGICAL_H - 48, "Arrows / WASD to move   ·   Tap letters   ·   Esc = Menu", 16, GRAY, "center", false);
  }

  drawGame() {
    this.drawRoom();
    for (const peel of this.obstacles) this.drawBookworm(peel);
    for (const letter of this.letters) this.drawLetter(letter);
    this.drawPlayer();
    for (const p of this.particles) {
      this.circle(p.pos[0], p.pos[1], p.size, p.color);
    }
    for (const fs of this.floatStars) {
      this.text(fs.x, fs.y, "★", 48, GOLD);
    }
    if (this.currentLevel < this.levelTotal) {
      this.drawPromptCard(this.letterOrder[this.currentLevel]);
    }
    this.drawUiBar();
    this.drawArrowButtons();
    if (this.messageTimer > 0 && this.message) {
      const boxW = 940, boxH = 100;
      const mx = LOGICAL_W / 2;
      const my = (FLOOR_TOP + FLOOR_BOTTOM) / 2 - 20;
      this.fillRect(mx - boxW / 2, my - boxH / 2, mx + boxW / 2, my + boxH / 2, WHITE);
      this.strokeRect(mx - boxW / 2, my - boxH / 2, mx + boxW / 2, my + boxH / 2, this.messageColor, 5);
      this.text(mx, my, this.message, 32, this.messageColor);
    }
  }

  drawRoom() {
    this.fillRect(0, 0, LOGICAL_W, WALL_H, BG_WALL);
    for (let x = 0; x < LOGICAL_W; x += 80) {
      for (let y = 0; y < WALL_H; y += 80) {
        this.circle(x + 40, y + 40, 5, "#F0E6D2");
      }
    }
    this.fillRect(0, FLOOR_TOP, LOGICAL_W, FLOOR_BOTTOM, BG_FLOOR);
    const ctx = this.ctx;
    ctx.strokeStyle = WOOD;
    for (let x = 0; x < LOGICAL_W; x += 120) {
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, FLOOR_TOP);
      ctx.lineTo(x, FLOOR_BOTTOM);
      ctx.stroke();
    }
    for (let y = FLOOR_TOP; y < FLOOR_BOTTOM; y += 60) {
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(LOGICAL_W, y);
      ctx.stroke();
    }
    this.fillRect(0, FLOOR_TOP - 10, LOGICAL_W, FLOOR_TOP, TAN);
    this.fillRect(0, FLOOR_BOTTOM, LOGICAL_W, FLOOR_BOTTOM + 10, TAN);

    // Window
    const wx = 50, wy = 28;
    this.fillRect(wx, wy, wx + 150, wy + 100, SKY_BLUE);
    this.circle(wx + 115, wy + 32, 20, YELLOW);
    this.strokeRect(wx, wy, wx + 150, wy + 100, WHITE, 6);
    ctx.strokeStyle = WHITE;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(wx + 75, wy);
    ctx.lineTo(wx + 75, wy + 100);
    ctx.moveTo(wx, wy + 50);
    ctx.lineTo(wx + 150, wy + 50);
    ctx.stroke();

    // Plant
    const fx = LOGICAL_W - 200;
    this.fillRect(fx, 40, fx + 120, 140, DARK_BROWN);
    this.fillRect(fx + 8, 48, fx + 112, 132, "#C8E6FF");
    this.poly([fx + 20, 120, fx + 60, 70, fx + 100, 120], GREEN);
    this.fillRect(fx + 52, 120, fx + 68, 138, DARK_BROWN);

    // Rug
    const rx = LOGICAL_W / 2;
    const ry = (FLOOR_TOP + FLOOR_BOTTOM) / 2;
    ctx.beginPath();
    ctx.ellipse(rx, ry + 40, 280, 130, 0, 0, Math.PI * 2);
    ctx.fillStyle = "#B48264";
    ctx.fill();
    ctx.strokeStyle = "#A07050";
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  drawPlayer() {
    const [x, y] = this.playerPos;
    const r = PLAYER_RADIUS;
    if (this.slipCooldown > 0 && Math.floor(this.slipCooldown / 4) % 2 === 0) return;
    this.circle(x, y + r + 3, r - 6, "#C8C8C8");
    this.circle(x, y, r, PLAYER_BLUE);
    this.circle(x - r / 2, y - r / 2, 8, PLAYER_LIGHT);
    this.circle(x - 11, y - 6, 9, WHITE);
    this.circle(x + 11, y - 6, 9, WHITE);
    this.circle(x - 10, y - 7, 4, BLACK);
    this.circle(x + 12, y - 7, 4, BLACK);
    this.circle(x - 11, y - 8, 1.5, WHITE);
    this.circle(x + 11, y - 8, 1.5, WHITE);
    // smile
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.arc(x, y + 4, 10, 0.15 * Math.PI, 0.85 * Math.PI);
    ctx.strokeStyle = BLACK;
    ctx.lineWidth = 2;
    ctx.stroke();
    this.circle(x - 15, y + 7, 5, BLUSH);
    this.circle(x + 15, y + 7, 5, BLUSH);
  }

  drawBookworm(peel) {
    const [x, y] = peel.pos;
    const spin = peel.spin || 0;
    this.circle(x, y + 19, 28, "#C8B89A");
    const body = "#7CB342";
    const bodyDark = "#558B2F";
    const segs = [-22, -8, 6, 18];
    segs.forEach((ox, i) => {
      const oy = Math.sin(spin + i * 0.9) * 5;
      const r = i < 3 ? 14 : 12;
      this.circle(x + ox, y + oy + 2, r, i % 2 === 0 ? body : bodyDark);
    });
    const hx = x + 26;
    const hy = y + Math.sin(spin + 3.2) * 5;
    this.circle(hx, hy, 16, "#9CCC65", bodyDark, 2);
    this.circle(hx + 7, hy - 3, 5, WHITE);
    this.circle(hx + 8, hy - 2.5, 2.5, BLACK);
    this.circle(hx - 2, hy - 3, 5, WHITE);
    this.circle(hx - 1, hy - 2.5, 2.5, BLACK);
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.arc(hx + 2, hy + 4, 6, 0.2 * Math.PI, 0.8 * Math.PI);
    ctx.strokeStyle = DARK_BROWN;
    ctx.lineWidth = 2;
    ctx.stroke();
    this.fillRect(x - 6, y - 18, x + 10, y - 6, RED);
    this.strokeRect(x - 6, y - 18, x + 10, y - 6, DARK_RED, 1);
  }

  drawLetter(letter) {
    const bob = Math.sin(letter.bob || 0) * 4;
    const x = letter.pos[0];
    const y = letter.pos[1] + bob;
    const r = letter.radius;
    const wrong = letter.wrongFlash || 0;
    const target = this.currentLevel < this.levelTotal ? this.letterOrder[this.currentLevel] : "";
    const isHint = this.hintPulse > 0 && letter.char === target;
    let color = letter.color;
    if (wrong > 0 && Math.floor(wrong / 3) % 2 === 0) color = RED;
    if (isHint && Math.floor(this.hintPulse / 6) % 2 === 0) {
      this.circle(x, y, r + 10, null, GOLD, 5);
    }
    this.circle(x, y + r - 2, r - 12, "#B4B4B4");
    this.circle(x, y, r, WHITE, color, 6);
    this.circle(x, y, r - 12, null, LIGHT_GRAY, 2);
    this.text(x, y, letter.char, 44, BLACK);
  }

  drawIcon(kind, cx, cy, color) {
    const s = 22;
    if (kind === "apple") {
      this.circle(cx, cy + 4, s, color);
      this.fillRect(cx - 3, cy - s - 4, cx + 3, cy - s + 8, GREEN);
    } else if (kind === "ball") {
      this.circle(cx, cy, s, color);
      const ctx = this.ctx;
      ctx.beginPath();
      ctx.moveTo(cx - s, cy);
      ctx.lineTo(cx + s, cy);
      ctx.strokeStyle = WHITE;
      ctx.lineWidth = 2;
      ctx.stroke();
    } else if (kind === "cat") {
      this.circle(cx, cy + 6, s - 2, color);
      this.poly([cx - 14, cy - 8, cx - 8, cy - 22, cx - 2, cy - 8], color);
      this.poly([cx + 2, cy - 8, cx + 8, cy - 22, cx + 14, cy - 8], color);
    } else if (kind === "tree") {
      this.poly([cx, cy - s - 4, cx - s, cy + 8, cx + s, cy + 8], GREEN);
      this.fillRect(cx - 5, cy + 8, cx + 5, cy + s + 4, BROWN);
    } else if (kind === "rocket") {
      this.poly([cx, cy - s - 4, cx - 12, cy + 10, cx + 12, cy + 10], color);
    } else if (kind === "fish") {
      this.circle(cx - 4, cy, 14, color);
      this.poly([cx + 8, cy, cx + s + 4, cy - 12, cx + s + 4, cy + 12], color);
    } else if (kind === "house") {
      this.poly([cx, cy - s - 2, cx - s, cy, cx + s, cy], color);
      this.fillRect(cx - 14, cy, cx + 14, cy + s, TAN);
    } else {
      this.circle(cx, cy, s - 2, color);
    }
  }

  drawPromptCard(targetLetter) {
    const [word, color, icon] = LETTER_DATA[targetLetter];
    const hideLetter = this.mode === "challenge";
    const cardW = 600, cardH = PROMPT_H;
    const cardX = LOGICAL_W / 2 - cardW / 2;
    const cardY = PROMPT_Y;
    this.fillRect(cardX + 6, cardY + 6, cardX + cardW, cardY + cardH, "#D0D0D0");
    this.fillRect(cardX, cardY, cardX + cardW, cardY + cardH, IVORY);
    this.strokeRect(cardX, cardY, cardX + cardW, cardY + cardH, DARK_GRAY, 3);
    this.fillRect(cardX + 14, cardY + 14, cardX + 110, cardY + 114, "#FFFAF0");
    this.strokeRect(cardX + 14, cardY + 14, cardX + 110, cardY + 114, color, 3);
    if (hideLetter) {
      this.drawIcon(icon, cardX + 62, cardY + 64, color);
      this.text(cardX + 62, cardY + 100, "?", 22, color);
    } else {
      this.circle(cardX + 62, cardY + 62, 34, color);
      this.text(cardX + 62, cardY + 62, targetLetter, 48, WHITE);
    }
    this.text(cardX + 128, cardY + 40, "Find the letter for:", 22, DARK_GRAY, "left", false);
    this.text(cardX + 128, cardY + 82, word, 32, color, "left");
    const dotY = cardY + cardH - 12;
    const startX = cardX + 128;
    const span = Math.min(26, this.levelTotal);
    for (let i = 0; i < span; i++) {
      const cx = startX + i * (span === 26 ? 15 : 20);
      if (i < this.currentLevel) this.circle(cx, dotY, 4, GREEN);
      else if (i === this.currentLevel) this.circle(cx, dotY, 5, color);
      else this.circle(cx, dotY, 3, LIGHT_GRAY);
    }
  }

  drawUiBar() {
    this.fillRect(0, UI_TOP, LOGICAL_W, LOGICAL_H, UI_BAR);
    const ctx = this.ctx;
    ctx.strokeStyle = UI_BAR_TOP;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, UI_TOP);
    ctx.lineTo(LOGICAL_W, UI_TOP);
    ctx.stroke();

    const mx = this.pointerLogical[0];
    const my = this.pointerLogical[1];
    const ui = this.getUiRects();
    const labels = {
      menu: "MENU",
      restart: "RESTART",
      fullscreen: "FULL",
      mute: this.soundMuted ? "SOUND" : "MUTE",
      hint: "HINT",
    };
    const base = {
      menu: STEEL_BLUE,
      restart: GREEN,
      fullscreen: STEEL_BLUE,
      mute: STEEL_BLUE,
      hint: PURPLE,
    };
    const hoverC = {
      menu: CORNFLOWER,
      restart: LIME,
      fullscreen: CORNFLOWER,
      mute: CORNFLOWER,
      hint: PINK,
    };
    for (const [key, r] of Object.entries(ui)) {
      const fill = pointIn(mx, my, r) ? hoverC[key] : base[key];
      this.fillRect(r[0], r[1], r[2], r[3], fill);
      this.strokeRect(r[0], r[1], r[2], r[3], WHITE, 2);
      this.text((r[0] + r[2]) / 2, (r[1] + r[3]) / 2, labels[key], 16, WHITE);
    }
    const modeTag = { adventure: "Adventure", quick: "Quick", challenge: "Challenge" }[this.mode] || "";
    this.text(
      LOGICAL_W / 2,
      UI_TOP + 28,
      `${modeTag}  ·  Level ${this.currentLevel + 1} of ${this.levelTotal}  ·  Stars ${this.starsEarned}  ·  Streak ${this.correctStreak}`,
      16,
      LIGHT_GRAY,
      "center",
      false
    );
  }

  drawArrowButtons() {
    const mx = this.pointerLogical[0];
    const my = this.pointerLogical[1];
    for (const [key, r] of Object.entries(this.getArrowRects())) {
      const pressed = this.pointerDown && pointIn(mx, my, r);
      const fill = pressed ? CORNFLOWER : STEEL_BLUE;
      this.fillRect(r[0], r[1], r[2], r[3], fill);
      this.strokeRect(r[0], r[1], r[2], r[3], WHITE, 3);
      const cx = (r[0] + r[2]) / 2;
      const cy = (r[1] + r[3]) / 2;
      const s = 20;
      if (key === "up") this.poly([cx, cy - s, cx - s, cy + 12, cx + s, cy + 12], WHITE);
      else if (key === "down") this.poly([cx, cy + s, cx - s, cy - 12, cx + s, cy - 12], WHITE);
      else if (key === "left") this.poly([cx - s, cy, cx + 12, cy - s, cx + 12, cy + s], WHITE);
      else if (key === "right") this.poly([cx + s, cy, cx - 12, cy - s, cx - 12, cy + s], WHITE);
    }
  }

  drawVictory() {
    this.fillRect(0, 0, LOGICAL_W, LOGICAL_H, "#FFFAF0");
    for (const cf of this.confetti) {
      this.circle(cf.x, cf.y, cf.size, cf.color);
    }
    const cx = LOGICAL_W / 2;
    const cy = LOGICAL_H / 2 - 220;
    const pts = [];
    for (let i = 0; i < 10; i++) {
      const ang = Math.PI / 2 + (i * Math.PI) / 5;
      const rr = i % 2 === 0 ? 56 : 24;
      pts.push(cx + Math.cos(ang) * rr, cy - Math.sin(ang) * rr);
    }
    this.poly(pts, GOLD);
    this.text(LOGICAL_W / 2, LOGICAL_H / 2 - 90, "You did it!", 64, GREEN);
    this.text(LOGICAL_W / 2, LOGICAL_H / 2 - 20, `You found all ${this.levelTotal} letters!`, 32, DARK_GRAY);
    this.text(LOGICAL_W / 2, LOGICAL_H / 2 + 40, `Stars: ${this.starsEarned}    Best streak: ${this.bestStreak}`, 22, GOLD);

    const shown = this.letterOrder.slice(0, Math.min(13, this.letterOrder.length));
    for (let i = 0; i < shown.length; i++) {
      const ch = shown[i];
      const x = LOGICAL_W / 2 - (shown.length - 1) * 28 + i * 56;
      this.circle(x, LOGICAL_H / 2 + 110, 20, LETTER_DATA[ch][1]);
      this.text(x, LOGICAL_H / 2 + 110, ch, 16, WHITE);
    }

    const mx = this.pointerLogical[0];
    const my = this.pointerLogical[1];
    const labels = { restart: "Play Again", menu: "Main Menu" };
    for (const [key, r] of Object.entries(this.getVictoryRects())) {
      const hover = pointIn(mx, my, r);
      let fill;
      fill = hover ? CORNFLOWER : STEEL_BLUE;
      this.fillRect(r[0], r[1], r[2], r[3], fill);
      this.strokeRect(r[0], r[1], r[2], r[3], WHITE, 3);
      this.text((r[0] + r[2]) / 2, (r[1] + r[3]) / 2, labels[key], 22, WHITE);
    }
  }
}

// ─── Boot ─────────────────────────────────────────────────────────────────

const canvas = document.getElementById("game");
if (canvas) {
  new AlphabetHuntGame(canvas);
}
