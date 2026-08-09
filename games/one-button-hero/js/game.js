/**
 * One Button Hero: The Duckening — Web / PWA port
 * One-button action platformer · 10 levels · combos · power-ups · ranks
 * Tap/click/space/enter = jump · Hold = charge super jump
 */

const CANVAS_W = 1920;
const CANVAS_H = 1080;
const DESIGN_W = 800;
const DESIGN_H = 450;
const SCALE_X = CANVAS_W / DESIGN_W;
const SCALE_Y = CANVAS_H / DESIGN_H;

const BG = "#16213e";
const PLATFORM = "#0f3460";
const PLATFORM_TOP = "#1a4a7a";
const HERO = "#ffcc00";
const HERO_BELLY = "#ffee88";
const HERO_BEAK = "#ff8800";
const HERO_HAT = "#e94560";
const ENEMY = "#ff6b6b";
const ENEMY_FLOAT = "#9b59b6";
const ENEMY_JUMP = "#2ecc71";
const ENEMY_CHASE = "#e74c3c";
const COIN = "#ffd700";
const COIN_LIGHT = "#ffed4a";
const FLAG_POLE = "#e94560";
const WHITE = "#ffffff";
const BLACK = "#000000";
const GOLD_GLOW = "#ffd700";
const PARTICLE_RED = "#e94560";
const PARTICLE_ENEMY = "#ff6b6b";
const ACCENT = "#e94560";
const POWER_SPEED = "#00e5ff";
const POWER_STAR = "#ffe566";
const POWER_MAGNET = "#b388ff";
const RANK_S = "#ffd700";
const RANK_A = "#e0e0e0";
const RANK_B = "#cd7f32";
const RANK_C = "#8899aa";

const GRAVITY = 0.58;
const JUMP_FORCE = -12.2;
const CHARGE_JUMP_FORCE = -18.5;
const MOVE_SPEED = 4.15;
const DASH_SPEED = 13;
const DASH_DURATION = 11;
const CHARGE_GRACE = 8;
const CHARGE_MIN = 14;
const CHARGE_SUPER = 42;
const COYOTE_FRAMES = 14;
const JUMP_BUFFER_FRAMES = 14;
const COMBO_WINDOW = 90;
const COMBO_MULT_CAP = 5.0;
const MAX_HIGHSCORES = 10;

const ENEMY_POINTS = { patrol: 100, jumper: 150, floater: 200, chaser: 250 };

const HS_KEY = "obh-highscores";

// ─── Levels (design units) ───────────────────────────────────────────────────

const LEVELS = [
  {
    platforms: [
      { x: 0, y: 400, w: 400, h: 50 },
      { x: 480, y: 350, w: 150, h: 30 },
      { x: 700, y: 350, w: 200, h: 50 },
      { x: 950, y: 300, w: 150, h: 30 },
      { x: 1200, y: 400, w: 500, h: 50 },
    ],
    enemies: [
      { x: 750, y: 318, w: 24, h: 32, vx: 1, patrolStart: 700, patrolEnd: 880, type: "patrol" },
    ],
    coins: [
      { x: 100, y: 372 }, { x: 200, y: 372 }, { x: 300, y: 372 },
      { x: 520, y: 322 }, { x: 580, y: 322 },
      { x: 780, y: 322 }, { x: 850, y: 322 },
      { x: 1000, y: 272 }, { x: 1080, y: 272 },
      { x: 1300, y: 372 }, { x: 1400, y: 372 }, { x: 1500, y: 372 },
    ],
    flag: { x: 1600, y: 340 },
    start: { x: 100, y: 350 },
  },
  {
    platforms: [
      { x: 0, y: 400, w: 200, h: 50 },
      { x: 280, y: 380, w: 100, h: 30 },
      { x: 450, y: 320, w: 100, h: 30 },
      { x: 620, y: 380, w: 100, h: 30 },
      { x: 800, y: 300, w: 150, h: 30 },
      { x: 1050, y: 350, w: 200, h: 50 },
      { x: 1350, y: 300, w: 100, h: 30 },
      { x: 1550, y: 400, w: 500, h: 50 },
    ],
    enemies: [
      { x: 850, y: 268, w: 24, h: 32, vx: 1.2, patrolStart: 800, patrolEnd: 930, type: "patrol" },
      { x: 1400, y: 318, w: 24, h: 32, vx: -1, patrolStart: 1350, patrolEnd: 1530, type: "patrol" },
    ],
    coins: [
      { x: 80, y: 372 }, { x: 150, y: 372 },
      { x: 310, y: 352 }, { x: 350, y: 352 },
      { x: 480, y: 292 }, { x: 520, y: 292 },
      { x: 660, y: 352 }, { x: 700, y: 352 },
      { x: 860, y: 272 }, { x: 920, y: 272 },
      { x: 1120, y: 322 }, { x: 1200, y: 322 },
      { x: 1380, y: 272 }, { x: 1650, y: 372 }, { x: 1750, y: 372 }, { x: 1850, y: 372 },
    ],
    flag: { x: 1950, y: 340 },
    start: { x: 50, y: 350 },
  },
  {
    platforms: [
      { x: 0, y: 400, w: 150, h: 50 },
      { x: 200, y: 350, w: 100, h: 20 },
      { x: 350, y: 300, w: 100, h: 20 },
      { x: 200, y: 220, w: 100, h: 20 },
      { x: 400, y: 180, w: 150, h: 20 },
      { x: 600, y: 250, w: 100, h: 20 },
      { x: 750, y: 320, w: 100, h: 30 },
      { x: 920, y: 280, w: 80, h: 20 },
      { x: 1050, y: 220, w: 80, h: 20 },
      { x: 1200, y: 300, w: 200, h: 50 },
      { x: 1500, y: 350, w: 100, h: 30 },
      { x: 1700, y: 400, w: 400, h: 50 },
    ],
    enemies: [
      { x: 430, y: 148, w: 24, h: 32, vx: 1, patrolStart: 400, patrolEnd: 550, type: "patrol" },
      { x: 1250, y: 268, w: 24, h: 32, vx: 1.5, patrolStart: 1200, patrolEnd: 1380, type: "patrol" },
    ],
    coins: [
      { x: 50, y: 372 }, { x: 120, y: 372 },
      { x: 240, y: 322 }, { x: 280, y: 322 },
      { x: 390, y: 272 }, { x: 430, y: 272 },
      { x: 240, y: 192 }, { x: 280, y: 192 },
      { x: 460, y: 152 }, { x: 520, y: 152 },
      { x: 640, y: 222 }, { x: 680, y: 222 },
      { x: 780, y: 292 }, { x: 820, y: 292 },
      { x: 950, y: 252 }, { x: 1080, y: 192 },
      { x: 1300, y: 262 }, { x: 1400, y: 262 },
      { x: 1540, y: 322 }, { x: 1800, y: 372 }, { x: 1900, y: 372 },
    ],
    flag: { x: 2000, y: 340 },
    start: { x: 50, y: 350 },
  },
  {
    platforms: [
      { x: 0, y: 400, w: 250, h: 50 },
      { x: 320, y: 350, w: 100, h: 20 },
      { x: 500, y: 280, w: 100, h: 20 },
      { x: 700, y: 350, w: 200, h: 50 },
      { x: 960, y: 250, w: 100, h: 20 },
      { x: 1150, y: 320, w: 100, h: 20 },
      { x: 1350, y: 400, w: 300, h: 50 },
      { x: 1750, y: 350, w: 100, h: 20 },
      { x: 1950, y: 400, w: 400, h: 50 },
    ],
    enemies: [
      { x: 600, y: 200, w: 24, h: 24, vx: 0, baseY: 200, amp: 40, type: "floater" },
      { x: 1000, y: 180, w: 24, h: 24, vx: 0, baseY: 180, amp: 50, type: "floater" },
      { x: 1450, y: 368, w: 24, h: 32, vx: 1.2, patrolStart: 1350, patrolEnd: 1620, type: "patrol" },
    ],
    coins: [
      { x: 80, y: 372 }, { x: 160, y: 372 },
      { x: 350, y: 322 }, { x: 390, y: 322 },
      { x: 540, y: 252 }, { x: 580, y: 252 },
      { x: 800, y: 322 }, { x: 860, y: 322 },
      { x: 990, y: 222 }, { x: 1200, y: 292 },
      { x: 1450, y: 372 }, { x: 1550, y: 372 },
      { x: 1780, y: 322 }, { x: 2050, y: 372 }, { x: 2150, y: 372 },
    ],
    flag: { x: 2250, y: 340 },
    start: { x: 50, y: 350 },
  },
  {
    platforms: [
      { x: 0, y: 400, w: 200, h: 50 },
      { x: 280, y: 350, w: 120, h: 20 },
      { x: 480, y: 300, w: 120, h: 20 },
      { x: 300, y: 200, w: 100, h: 20 },
      { x: 500, y: 150, w: 150, h: 20 },
      { x: 750, y: 350, w: 200, h: 50 },
      { x: 1020, y: 280, w: 100, h: 20 },
      { x: 1200, y: 350, w: 150, h: 50 },
      { x: 1450, y: 300, w: 100, h: 20 },
      { x: 1650, y: 400, w: 500, h: 50 },
    ],
    enemies: [
      { x: 800, y: 318, w: 24, h: 32, vx: 1, patrolStart: 750, patrolEnd: 930, type: "jumper" },
      { x: 1220, y: 318, w: 24, h: 32, vx: -1.2, patrolStart: 1200, patrolEnd: 1330, type: "jumper" },
      { x: 520, y: 118, w: 24, h: 32, vx: 1, patrolStart: 500, patrolEnd: 630, type: "patrol" },
    ],
    coins: [
      { x: 80, y: 372 }, { x: 150, y: 372 },
      { x: 320, y: 322 }, { x: 370, y: 322 },
      { x: 520, y: 272 }, { x: 560, y: 272 },
      { x: 340, y: 172 }, { x: 380, y: 172 },
      { x: 560, y: 122 }, { x: 620, y: 122 },
      { x: 820, y: 322 }, { x: 880, y: 322 },
      { x: 1050, y: 252 }, { x: 1260, y: 322 },
      { x: 1480, y: 272 }, { x: 1700, y: 372 }, { x: 1800, y: 372 }, { x: 1900, y: 372 },
    ],
    flag: { x: 2050, y: 340 },
    start: { x: 50, y: 350 },
  },
  {
    platforms: [
      { x: 0, y: 400, w: 250, h: 50 },
      { x: 350, y: 350, w: 150, h: 30 },
      { x: 600, y: 400, w: 200, h: 50 },
      { x: 900, y: 320, w: 100, h: 20 },
      { x: 1100, y: 400, w: 200, h: 50 },
      { x: 1400, y: 350, w: 150, h: 30 },
      { x: 1650, y: 400, w: 500, h: 50 },
    ],
    enemies: [
      { x: 400, y: 318, w: 24, h: 32, vx: 0, patrolStart: 350, patrolEnd: 480, type: "chaser" },
      { x: 1150, y: 368, w: 24, h: 32, vx: 0, patrolStart: 1100, patrolEnd: 1270, type: "chaser" },
      { x: 700, y: 368, w: 24, h: 32, vx: 1, patrolStart: 600, patrolEnd: 780, type: "patrol" },
    ],
    coins: [
      { x: 80, y: 372 }, { x: 180, y: 372 },
      { x: 400, y: 322 }, { x: 460, y: 322 },
      { x: 680, y: 372 }, { x: 760, y: 372 },
      { x: 940, y: 292 }, { x: 980, y: 292 },
      { x: 1180, y: 372 }, { x: 1260, y: 372 },
      { x: 1450, y: 322 }, { x: 1520, y: 322 },
      { x: 1700, y: 372 }, { x: 1800, y: 372 }, { x: 1900, y: 372 }, { x: 2000, y: 372 },
    ],
    flag: { x: 2100, y: 340 },
    start: { x: 50, y: 350 },
  },
  {
    platforms: [
      { x: 0, y: 400, w: 300, h: 50 },
      { x: 380, y: 320, w: 100, h: 20 },
      { x: 380, y: 420, w: 150, h: 30 },
      { x: 550, y: 280, w: 100, h: 20 },
      { x: 720, y: 240, w: 100, h: 20 },
      { x: 900, y: 280, w: 150, h: 20 },
      { x: 1150, y: 250, w: 100, h: 20 },
      { x: 1350, y: 300, w: 100, h: 20 },
      { x: 600, y: 400, w: 150, h: 50 },
      { x: 850, y: 380, w: 100, h: 30 },
      { x: 1050, y: 420, w: 200, h: 50 },
      { x: 1350, y: 400, w: 100, h: 30 },
      { x: 1500, y: 400, w: 500, h: 50 },
    ],
    enemies: [
      { x: 750, y: 200, w: 24, h: 24, vx: 0, baseY: 200, amp: 30, type: "floater" },
      { x: 1200, y: 210, w: 24, h: 24, vx: 0, baseY: 210, amp: 35, type: "floater" },
      { x: 700, y: 368, w: 24, h: 32, vx: 0, patrolStart: 600, patrolEnd: 730, type: "chaser" },
      { x: 1150, y: 388, w: 24, h: 32, vx: 0, patrolStart: 1050, patrolEnd: 1230, type: "chaser" },
    ],
    coins: [
      { x: 100, y: 372 }, { x: 200, y: 372 },
      { x: 410, y: 282 }, { x: 580, y: 242 }, { x: 620, y: 242 },
      { x: 750, y: 202 }, { x: 960, y: 242 }, { x: 1000, y: 242 },
      { x: 1180, y: 212 }, { x: 1380, y: 262 },
      { x: 650, y: 372 }, { x: 900, y: 352 },
      { x: 1120, y: 392 }, { x: 1400, y: 372 },
      { x: 1600, y: 372 }, { x: 1700, y: 372 }, { x: 1800, y: 372 },
    ],
    flag: { x: 1900, y: 340 },
    start: { x: 50, y: 350 },
  },
  {
    platforms: [
      { x: 0, y: 400, w: 250, h: 50 },
      { x: 320, y: 300, w: 80, h: 20 },
      { x: 480, y: 250, w: 80, h: 20 },
      { x: 650, y: 200, w: 80, h: 20 },
      { x: 820, y: 260, w: 100, h: 20 },
      { x: 1000, y: 220, w: 80, h: 20 },
      { x: 1180, y: 280, w: 100, h: 20 },
      { x: 320, y: 420, w: 200, h: 50 },
      { x: 600, y: 400, w: 200, h: 50 },
      { x: 900, y: 420, w: 200, h: 50 },
      { x: 1200, y: 400, w: 150, h: 50 },
      { x: 1400, y: 350, w: 100, h: 30 },
      { x: 1600, y: 400, w: 500, h: 50 },
    ],
    enemies: [
      { x: 840, y: 228, w: 24, h: 32, vx: 1, patrolStart: 820, patrolEnd: 900, type: "jumper" },
      { x: 400, y: 388, w: 24, h: 32, vx: 1.2, patrolStart: 320, patrolEnd: 500, type: "patrol" },
      { x: 700, y: 368, w: 24, h: 32, vx: -1, patrolStart: 600, patrolEnd: 780, type: "patrol" },
      { x: 1000, y: 388, w: 24, h: 32, vx: 1, patrolStart: 900, patrolEnd: 1080, type: "patrol" },
    ],
    coins: [
      { x: 80, y: 372 }, { x: 180, y: 372 },
      { x: 340, y: 272 }, { x: 380, y: 272 },
      { x: 500, y: 222 }, { x: 540, y: 222 },
      { x: 670, y: 172 }, { x: 710, y: 172 },
      { x: 850, y: 232 }, { x: 890, y: 232 },
      { x: 1020, y: 192 }, { x: 1060, y: 192 },
      { x: 1210, y: 252 }, { x: 1280, y: 252 },
      { x: 400, y: 392 }, { x: 700, y: 372 }, { x: 1000, y: 392 },
      { x: 1430, y: 322 },
      { x: 1650, y: 372 }, { x: 1750, y: 372 }, { x: 1850, y: 372 }, { x: 1950, y: 372 },
    ],
    flag: { x: 2000, y: 340 },
    start: { x: 50, y: 350 },
  },
  {
    platforms: [
      { x: 0, y: 400, w: 200, h: 50 },
      { x: 280, y: 350, w: 100, h: 20 },
      { x: 450, y: 300, w: 100, h: 20 },
      { x: 280, y: 220, w: 100, h: 20 },
      { x: 480, y: 180, w: 150, h: 20 },
      { x: 700, y: 250, w: 80, h: 20 },
      { x: 850, y: 320, w: 100, h: 30 },
      { x: 1050, y: 280, w: 80, h: 20 },
      { x: 1200, y: 220, w: 80, h: 20 },
      { x: 1350, y: 300, w: 150, h: 50 },
      { x: 1600, y: 350, w: 100, h: 30 },
      { x: 1800, y: 400, w: 500, h: 50 },
    ],
    enemies: [
      { x: 520, y: 148, w: 24, h: 32, vx: 1, patrolStart: 480, patrolEnd: 610, type: "patrol" },
      { x: 600, y: 250, w: 24, h: 24, vx: 0, baseY: 250, amp: 40, type: "floater" },
      { x: 900, y: 288, w: 24, h: 32, vx: 1, patrolStart: 850, patrolEnd: 930, type: "jumper" },
      { x: 1400, y: 268, w: 24, h: 32, vx: 0, patrolStart: 1350, patrolEnd: 1480, type: "chaser" },
    ],
    coins: [
      { x: 50, y: 372 }, { x: 120, y: 372 },
      { x: 310, y: 322 }, { x: 350, y: 322 },
      { x: 480, y: 272 }, { x: 520, y: 272 },
      { x: 310, y: 192 }, { x: 350, y: 192 },
      { x: 530, y: 152 }, { x: 590, y: 152 },
      { x: 730, y: 222 }, { x: 880, y: 292 }, { x: 920, y: 292 },
      { x: 1080, y: 252 }, { x: 1230, y: 192 },
      { x: 1400, y: 262 }, { x: 1500, y: 262 },
      { x: 1630, y: 322 }, { x: 1850, y: 372 }, { x: 1950, y: 372 }, { x: 2050, y: 372 },
    ],
    flag: { x: 2200, y: 340 },
    start: { x: 50, y: 350 },
  },
  {
    platforms: [
      { x: 0, y: 400, w: 200, h: 50 },
      { x: 280, y: 350, w: 100, h: 20 },
      { x: 450, y: 300, w: 100, h: 20 },
      { x: 650, y: 350, w: 150, h: 30 },
      { x: 900, y: 280, w: 100, h: 20 },
      { x: 1100, y: 350, w: 150, h: 50 },
      { x: 1350, y: 300, w: 100, h: 20 },
      { x: 1550, y: 250, w: 100, h: 20 },
      { x: 1750, y: 300, w: 100, h: 20 },
      { x: 1950, y: 350, w: 100, h: 30 },
      { x: 2150, y: 400, w: 600, h: 50 },
    ],
    enemies: [
      { x: 700, y: 318, w: 24, h: 32, vx: 1.5, patrolStart: 650, patrolEnd: 780, type: "patrol" },
      { x: 950, y: 240, w: 24, h: 24, vx: 0, baseY: 240, amp: 35, type: "floater" },
      { x: 1150, y: 318, w: 24, h: 32, vx: -1.2, patrolStart: 1100, patrolEnd: 1230, type: "jumper" },
      { x: 1600, y: 218, w: 24, h: 32, vx: 0, patrolStart: 1550, patrolEnd: 1620, type: "chaser" },
      { x: 2000, y: 318, w: 24, h: 32, vx: 1, patrolStart: 1950, patrolEnd: 2120, type: "patrol" },
    ],
    coins: [
      { x: 80, y: 372 }, { x: 160, y: 372 },
      { x: 310, y: 322 }, { x: 350, y: 322 },
      { x: 480, y: 272 }, { x: 520, y: 272 },
      { x: 700, y: 322 }, { x: 760, y: 322 },
      { x: 930, y: 252 }, { x: 980, y: 252 },
      { x: 1150, y: 322 }, { x: 1220, y: 322 },
      { x: 1380, y: 272 }, { x: 1580, y: 222 },
      { x: 1780, y: 272 }, { x: 1980, y: 322 },
      { x: 2200, y: 372 }, { x: 2300, y: 372 }, { x: 2400, y: 372 }, { x: 2500, y: 372 }, { x: 2600, y: 372 },
    ],
    flag: { x: 2650, y: 340 },
    start: { x: 50, y: 350 },
  },
];

// ─── Helpers ────────────────────────────────────────────────────────────────

function rand(a, b) {
  return a + Math.random() * (b - a);
}
function randInt(a, b) {
  return Math.floor(rand(a, b + 1));
}
function rectIntersect(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

// ─── Sound ──────────────────────────────────────────────────────────────────

class SFX {
  constructor() {
    this.ctx = null;
    this.muted = false;
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
  tone(f, d, v = 0.15, when = 0, type = "square") {
    if (this.muted) return;
    const ctx = this.ensure();
    if (!ctx) return;
    const t0 = ctx.currentTime + when;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.value = f;
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(v, t0 + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + d);
    o.connect(g);
    g.connect(ctx.destination);
    o.start(t0);
    o.stop(t0 + d + 0.02);
  }
  jump() {
    this.tone(400, 0.08, 0.1, 0, "sine");
    this.tone(600, 0.1, 0.08, 0.05, "sine");
  }
  coin() {
    this.tone(880, 0.06, 0.12, 0, "sine");
    this.tone(1320, 0.1, 0.1, 0.05, "sine");
  }
  stomp() {
    this.tone(200, 0.08, 0.15, 0, "square");
    this.tone(120, 0.12, 0.12, 0.06, "square");
  }
  hurt() {
    this.tone(180, 0.15, 0.14, 0, "sawtooth");
  }
  charge() {
    this.tone(300, 0.05, 0.06, 0, "sine");
  }
  win() {
    [523, 659, 784, 1047].forEach((f, i) => this.tone(f, 0.15, 0.12, i * 0.12, "sine"));
  }
}

// ─── Game ───────────────────────────────────────────────────────────────────

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.sfx = new SFX();
    this.scaleX = SCALE_X;
    this.scaleY = SCALE_Y;
    this.shakeX = 0;
    this.shakeY = 0;
    this.screenShake = 0;
    this.cameraX = 0;
    this.state = "menu";
    this.menuPulse = 0;
    this.highscores = this.loadScores();
    this.highScore = this.highscores[0]?.score || 0;
    this.nameInput = "";
    this.nameCursor = 0;
    this.pendingEnd = null;
    this.newBest = false;
    this.btnHeld = false;
    this.btnHoldFrames = 0;
    this.jumpBuffered = 0;

    this.stars = [];
    for (let i = 0; i < 50; i++) {
      this.stars.push({
        baseX: i * 137,
        y: (i * 73) % DESIGN_H,
        color: ["#444466", "#555577", "#666688", "#777799", "#8888aa"][i % 5],
        r: 1.5,
      });
    }

    this.resetRun();
    this._bind();
    this._resize();
    window.addEventListener("resize", () => this._resize());
    this._last = performance.now();
    this._acc = 0;
    requestAnimationFrame((t) => this._frame(t));
  }

  _resize() {
    const wrap = this.canvas.parentElement;
    const s = Math.min(wrap.clientWidth / CANVAS_W, wrap.clientHeight / CANVAS_H);
    this.canvas.style.width = Math.floor(CANVAS_W * s) + "px";
    this.canvas.style.height = Math.floor(CANVAS_H * s) + "px";
    this.canvas.width = CANVAS_W;
    this.canvas.height = CANVAS_H;
  }

  _bind() {
    const c = this.canvas;
    c.tabIndex = 0;
    c.focus();

    const press = (e) => {
      e.preventDefault();
      this.sfx.ensure();
      this.onButtonDown();
      c.focus();
    };
    const release = (e) => {
      e.preventDefault();
      this.onButtonUp();
    };

    window.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " " || e.key === "z" || e.key === "Z") {
        if (e.repeat) return;
        e.preventDefault();
        this.sfx.ensure();
        this.onButtonDown();
      } else if (e.key === "x" || e.key === "X" || e.key === "Escape") {
        e.preventDefault();
        this.onExit();
      } else if (this.state === "enter_name") {
        if (e.key === "Backspace") {
          this.nameInput = this.nameInput.slice(0, -1);
        } else if (e.key.length === 1 && this.nameInput.length < 10) {
          this.nameInput += e.key.toUpperCase();
        } else if (e.key === "Enter") {
          this.confirmName();
        }
      }
    });
    window.addEventListener("keyup", (e) => {
      if (e.key === "Enter" || e.key === " " || e.key === "z" || e.key === "Z") {
        e.preventDefault();
        this.onButtonUp();
      }
    });

    c.addEventListener("mousedown", press);
    window.addEventListener("mouseup", release);
    c.addEventListener("touchstart", press, { passive: false });
    window.addEventListener("touchend", release, { passive: false });
  }

  onExit() {
    if (this.state === "menu") {
      window.location.href = "../../index.html";
    } else if (this.state === "playing" || this.state === "level_complete") {
      this.state = "menu";
      this.resetRun();
    } else {
      this.state = "menu";
    }
  }

  onButtonDown() {
    if (this.state === "menu") {
      this.startGame();
      return;
    }
    if (this.state === "gameover" || this.state === "win") {
      this.startGame();
      return;
    }
    if (this.state === "enter_name") {
      this.confirmName();
      return;
    }
    if (this.state !== "playing") return;
    this.btnHeld = true;
    this.btnHoldFrames = 0;
    this.jumpBuffered = JUMP_BUFFER_FRAMES;
  }

  onButtonUp() {
    if (this.state !== "playing") {
      this.btnHeld = false;
      return;
    }
    const h = this.hero;
    if (h.isCharging && h.chargeTimer > CHARGE_GRACE) {
      // Release charged jump
      if (h.onGround || h.coyote > 0) {
        const t = h.chargeTimer - CHARGE_GRACE;
        const force =
          t >= CHARGE_SUPER - CHARGE_GRACE
            ? CHARGE_JUMP_FORCE
            : JUMP_FORCE + (CHARGE_JUMP_FORCE - JUMP_FORCE) * Math.min(1, t / (CHARGE_SUPER - CHARGE_GRACE));
        h.vy = force;
        h.onGround = false;
        h.coyote = 0;
        this.sfx.jump();
        if (t >= CHARGE_MIN) {
          h.dashTimer = DASH_DURATION;
        }
      }
    }
    h.isCharging = false;
    h.chargeTimer = 0;
    this.btnHeld = false;
  }

  loadScores() {
    try {
      const raw = localStorage.getItem(HS_KEY);
      if (!raw) return [];
      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    } catch {
      return [];
    }
  }

  saveScores() {
    try {
      localStorage.setItem(HS_KEY, JSON.stringify(this.highscores.slice(0, MAX_HIGHSCORES)));
    } catch {
      /* ignore */
    }
  }

  resetRun() {
    this.score = 0;
    this.lives = 3;
    this.levelIdx = 0;
    this.combo = 0;
    this.comboMult = 1;
    this.comboTimer = 0;
    this.particles = [];
    this.floatTexts = [];
    this.freezeTimer = 0;
    this.transitionTimer = 0;
    this.levelRank = "C";
    this.levelBonus = 0;
    this.levelHit = false;
    this.levelCoinsGot = 0;
    this.levelCoinsTotal = 0;
  }

  startGame() {
    this.resetRun();
    this.state = "playing";
    this.loadLevel(0);
  }

  loadLevel(idx) {
    this.levelIdx = idx;
    const L = LEVELS[idx];
    this.platforms = L.platforms.map((p) => ({ ...p }));
    this.enemies = L.enemies.map((e) => ({
      ...e,
      jumpTimer: 0,
      onGround: false,
      vy: 0,
      animTimer: 0,
      phase: Math.random() * Math.PI * 2,
    }));
    this.coins = L.coins.map((c) => ({ ...c, collected: false }));
    this.levelCoinsTotal = this.coins.length;
    this.levelCoinsGot = 0;
    this.levelHit = false;
    this.flag = { x: L.flag.x, y: L.flag.y, w: 30, h: 60 };
    this.hero = {
      x: L.start.x,
      y: L.start.y,
      w: 24,
      h: 32,
      vx: 0,
      vy: 0,
      facing: 1,
      onGround: false,
      invincible: 0,
      isCharging: false,
      chargeTimer: 0,
      coyote: 0,
      dashTimer: 0,
      speedTimer: 0,
      starTimer: 0,
      magnetTimer: 0,
      animTimer: 0,
      animFrame: 0,
    };
    this.cameraX = 0;
    this.powerups = [];
    // Occasional power-up on mid platforms
    if (L.platforms.length > 2 && Math.random() < 0.7) {
      const p = L.platforms[1 + randInt(0, Math.min(2, L.platforms.length - 2))];
      const kinds = ["speed", "star", "magnet"];
      this.powerups.push({
        x: p.x + p.w / 2,
        y: p.y - 20,
        kind: kinds[randInt(0, 2)],
        collected: false,
        bob: 0,
      });
    }
    this.combo = 0;
    this.comboMult = 1;
    this.comboTimer = 0;
    this.particles = [];
    this.floatTexts = [];
  }

  // ── Scoring ─────────────────────────────────────────────────────────────

  bumpCombo() {
    this.combo += 1;
    this.comboTimer = COMBO_WINDOW;
    this.comboMult = Math.min(COMBO_MULT_CAP, 1 + (this.combo - 1) * 0.25);
  }

  addScore(base, x, y, label) {
    const pts = Math.floor(base * this.comboMult);
    this.score += pts;
    this.floatTexts.push({
      x,
      y,
      text: label || `+${pts}`,
      color: COIN,
      life: 50,
      maxLife: 50,
      vy: -1,
    });
  }

  computeLevelRank() {
    let bonus = 0;
    if (!this.levelHit) bonus += 500;
    if (this.levelCoinsGot >= this.levelCoinsTotal) bonus += 300;
    if (!this.levelHit && this.levelCoinsGot >= this.levelCoinsTotal) bonus += 1000;
    this.levelBonus = bonus;
    this.score += bonus;
    if (!this.levelHit && this.levelCoinsGot >= this.levelCoinsTotal) this.levelRank = "S";
    else if (!this.levelHit || this.levelCoinsGot >= this.levelCoinsTotal) this.levelRank = "A";
    else if (this.levelCoinsGot >= this.levelCoinsTotal * 0.5) this.levelRank = "B";
    else this.levelRank = "C";
  }

  beginEndSequence(kind) {
    this.newBest = false;
    const qualifies =
      this.highscores.length < MAX_HIGHSCORES ||
      this.score > (this.highscores[this.highscores.length - 1]?.score || 0);
    if (qualifies && this.score > 0) {
      this.pendingEnd = kind;
      this.nameInput = "";
      this.state = "enter_name";
    } else {
      this.state = kind;
      if (this.score > this.highScore) this.highScore = this.score;
    }
  }

  confirmName() {
    const name = (this.nameInput.trim() || "HERO").slice(0, 10);
    this.highscores.push({ name, score: this.score });
    this.highscores.sort((a, b) => b.score - a.score);
    this.highscores = this.highscores.slice(0, MAX_HIGHSCORES);
    this.saveScores();
    this.highScore = this.highscores[0]?.score || this.score;
    this.newBest = true;
    this.state = this.pendingEnd || "gameover";
    this.pendingEnd = null;
  }

  // ── Update ──────────────────────────────────────────────────────────────

  tryJump() {
    const h = this.hero;
    if (h.onGround || h.coyote > 0) {
      h.vy = JUMP_FORCE;
      h.onGround = false;
      h.coyote = 0;
      this.jumpBuffered = 0;
      this.sfx.jump();
      return true;
    }
    return false;
  }

  updatePlaying() {
    if (this.freezeTimer > 0) {
      this.freezeTimer -= 1;
      return;
    }

    const h = this.hero;

    // Button hold → charge
    if (this.btnHeld && h.onGround) {
      h.isCharging = true;
      h.chargeTimer += 1;
      if (h.chargeTimer === CHARGE_GRACE + 1) this.sfx.charge();
    } else if (!this.btnHeld && this.jumpBuffered > 0) {
      // Quick tap jump
      if (this.tryJump()) {
        /* jumped */
      }
      this.jumpBuffered = 0;
    }
    if (this.jumpBuffered > 0) this.jumpBuffered -= 1;

    // Auto-run (one-button hero)
    let speed = MOVE_SPEED;
    if (h.speedTimer > 0) speed *= 1.45;
    if (h.dashTimer > 0) {
      h.vx = DASH_SPEED * h.facing;
      h.dashTimer -= 1;
    } else if (h.isCharging && h.onGround) {
      h.vx = speed * 0.35 * h.facing;
    } else {
      h.vx = speed * h.facing;
    }

    h.vy += GRAVITY;
    h.x += h.vx;
    h.y += h.vy;

    // Platform collision
    h.onGround = false;
    for (const p of this.platforms) {
      if (
        h.x < p.x + p.w &&
        h.x + h.w > p.x &&
        h.y + h.h >= p.y &&
        h.y + h.h - h.vy <= p.y + 8 &&
        h.vy >= 0
      ) {
        h.y = p.y - h.h;
        h.vy = 0;
        h.onGround = true;
      }
    }
    if (h.onGround) h.coyote = COYOTE_FRAMES;
    else if (h.coyote > 0) h.coyote -= 1;

    // Buffered jump after landing
    if (h.onGround && this.jumpBuffered > 0 && !this.btnHeld) {
      this.tryJump();
    }

    if (h.invincible > 0) h.invincible -= 1;
    if (h.speedTimer > 0) h.speedTimer -= 1;
    if (h.starTimer > 0) h.starTimer -= 1;
    if (h.magnetTimer > 0) h.magnetTimer -= 1;

    if (this.comboTimer > 0) {
      this.comboTimer -= 1;
      if (this.comboTimer <= 0) {
        this.combo = 0;
        this.comboMult = 1;
      }
    }

    // Enemies
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const e = this.enemies[i];
      const etype = e.type || "patrol";
      e.animTimer = (e.animTimer || 0) + 1;

      if (etype === "patrol") {
        e.x += e.vx;
        if (e.x <= e.patrolStart || e.x + e.w >= e.patrolEnd) e.vx *= -1;
      } else if (etype === "floater") {
        e.phase = (e.phase || 0) + 0.04;
        e.y = e.baseY + Math.sin(e.phase) * (e.amp || 40);
      } else if (etype === "jumper") {
        e.x += e.vx;
        if (e.x <= e.patrolStart || e.x + e.w >= e.patrolEnd) e.vx *= -1;
        e.jumpTimer = (e.jumpTimer || 0) + 1;
        if (e.onGround && e.jumpTimer > 90) {
          e.vy = -10;
          e.jumpTimer = 0;
          e.onGround = false;
        }
        e.vy += GRAVITY;
        e.y += e.vy;
        e.onGround = false;
        for (const p of this.platforms) {
          if (
            e.x < p.x + p.w &&
            e.x + e.w > p.x &&
            e.y + e.h >= p.y &&
            e.y + e.h - e.vy <= p.y + 5
          ) {
            e.y = p.y - e.h;
            e.vy = 0;
            e.onGround = true;
            break;
          }
        }
      } else if (etype === "chaser") {
        const distX = h.x - e.x;
        const distY = Math.abs(h.y - e.y);
        if (Math.abs(distX) < 250 && distY < 120) {
          e.x += distX > 0 ? 2.5 : -2.5;
        } else {
          e.x += e.vx || 0.5;
          if (e.x <= e.patrolStart || e.x + e.w >= e.patrolEnd) e.vx = (e.vx || 0.5) * -1;
        }
      }

      const star = h.starTimer > 0;
      if (rectIntersect(h, e) && (h.invincible <= 0 || star)) {
        const stomped = h.vy > 0 && h.y + h.h - h.vy <= e.y + 10;
        if (stomped || star) {
          this.enemies.splice(i, 1);
          const points = ENEMY_POINTS[etype] || 100;
          this.bumpCombo();
          this.addScore(points, e.x + e.w / 2, e.y);
          h.vy = JUMP_FORCE * 0.75;
          this.spawnParticles(e.x + e.w / 2, e.y + e.h / 2, PARTICLE_ENEMY, 14);
          this.sfx.stomp();
          this.freezeTimer = 3;
          this.screenShake = Math.max(this.screenShake, 5);
        } else {
          this.lives -= 1;
          this.levelHit = true;
          this.combo = 0;
          this.comboMult = 1;
          this.comboTimer = 0;
          h.invincible = 60;
          h.vy = JUMP_FORCE * 0.5;
          h.x -= 20;
          this.freezeTimer = 8;
          this.screenShake = 14;
          this.sfx.hurt();
          this.spawnParticles(h.x + h.w / 2, h.y + h.h / 2, PARTICLE_RED, 12);
          if (this.lives <= 0) this.beginEndSequence("gameover");
        }
      }
    }

    // Coins
    for (const c of this.coins) {
      if (c.collected) continue;
      if (h.magnetTimer > 0) {
        const dx = h.x + h.w / 2 - c.x;
        const dy = h.y + h.h / 2 - c.y;
        const dist = Math.hypot(dx, dy) + 0.01;
        if (dist < 120) {
          c.x += (dx / dist) * 3.5;
          c.y += (dy / dist) * 3.5;
        }
      }
      if (rectIntersect(h, { x: c.x - 10, y: c.y - 10, w: 20, h: 20 })) {
        c.collected = true;
        this.levelCoinsGot += 1;
        this.bumpCombo();
        this.addScore(50, c.x, c.y);
        this.spawnParticles(c.x, c.y, COIN, 7);
        this.sfx.coin();
      }
    }

    // Power-ups
    for (const pu of this.powerups) {
      if (pu.collected) continue;
      pu.bob = (pu.bob || 0) + 0.08;
      if (rectIntersect(h, { x: pu.x - 8, y: pu.y - 8, w: 16, h: 16 })) {
        pu.collected = true;
        if (pu.kind === "speed") {
          h.speedTimer = 300;
          this.addScore(100, pu.x, pu.y, "SPEED!");
          this.spawnParticles(pu.x, pu.y, POWER_SPEED, 16);
        } else if (pu.kind === "star") {
          h.starTimer = 240;
          h.invincible = Math.max(h.invincible, 240);
          this.addScore(100, pu.x, pu.y, "STAR!");
          this.spawnParticles(pu.x, pu.y, POWER_STAR, 16);
        } else {
          h.magnetTimer = 360;
          this.addScore(100, pu.x, pu.y, "MAGNET!");
          this.spawnParticles(pu.x, pu.y, POWER_MAGNET, 16);
        }
        this.sfx.charge();
      }
    }

    // Flag
    if (rectIntersect(h, this.flag)) {
      this.addScore(500, h.x, h.y - 20, "+500 CLEAR");
      this.computeLevelRank();
      this.levelIdx += 1;
      if (this.levelIdx >= LEVELS.length) {
        this.sfx.win();
        this.beginEndSequence("win");
      } else {
        this.state = "level_complete";
        this.transitionTimer = 120;
        this.spawnParticles(h.x + h.w / 2, h.y + h.h / 2, GOLD_GLOW, 28);
      }
      return;
    }

    // Fall death
    if (h.y > 500) {
      this.lives -= 1;
      this.levelHit = true;
      this.combo = 0;
      this.comboMult = 1;
      this.freezeTimer = 6;
      this.screenShake = 10;
      this.sfx.hurt();
      if (this.lives <= 0) {
        this.beginEndSequence("gameover");
      } else {
        const start = LEVELS[this.levelIdx].start;
        h.x = start.x;
        h.y = start.y;
        h.vx = 0;
        h.vy = 0;
        h.invincible = 30;
      }
    }

    // Camera
    const targetCam = h.x - 220;
    this.cameraX += (targetCam - this.cameraX) * 0.12;
    if (this.cameraX < 0) this.cameraX = 0;

    // Particles / float text
    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.life -= 1;
      p.vx *= 0.98;
    }
    this.particles = this.particles.filter((p) => p.life > 0);
    for (const ft of this.floatTexts) {
      ft.y += ft.vy;
      ft.vy *= 0.97;
      ft.life -= 1;
    }
    this.floatTexts = this.floatTexts.filter((ft) => ft.life > 0);

    h.animTimer += 1;
    if (h.animTimer > 8) {
      h.animTimer = 0;
      h.animFrame = (h.animFrame + 1) % 4;
    }
  }

  update() {
    this.menuPulse += 1;
    this.nameCursor = (this.nameCursor + 1) % 40;

    if (this.state === "playing") {
      this.updatePlaying();
    } else if (this.state === "level_complete") {
      this.transitionTimer -= 1;
      if (this.transitionTimer <= 0) {
        this.state = "playing";
        this.loadLevel(this.levelIdx);
      }
    }
  }

  spawnParticles(x, y, color, count = 5) {
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x,
        y,
        vx: rand(-3, 3),
        vy: rand(-4, -1),
        life: randInt(18, 36),
        color,
        size: randInt(2, 5),
        gravity: 0.12,
      });
    }
  }

  // ── Draw ────────────────────────────────────────────────────────────────

  sx(x) {
    return (x - this.cameraX) * this.scaleX + this.shakeX;
  }
  sy(y) {
    return y * this.scaleY + this.shakeY;
  }
  sw(w) {
    return w * this.scaleX;
  }
  sh(h) {
    return h * this.scaleY;
  }

  _frame(t) {
    const dt = t - this._last;
    this._last = t;
    this._acc += dt;
    const step = 1000 / 60;
    while (this._acc >= step) {
      this.update();
      this._acc -= step;
    }
    this.draw();
    requestAnimationFrame((nt) => this._frame(nt));
  }

  draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    if (this.screenShake > 0) {
      this.shakeX = randInt(-this.screenShake, this.screenShake) * this.scaleX * 0.3;
      this.shakeY = randInt(-this.screenShake, this.screenShake) * this.scaleY * 0.3;
      this.screenShake -= 1;
    } else {
      this.shakeX = 0;
      this.shakeY = 0;
    }

    // Stars
    for (const star of this.stars) {
      const sxi = (star.baseX - this.cameraX * 0.3) % DESIGN_W;
      const x = this.sx(sxi < 0 ? sxi + DESIGN_W : sxi);
      const y = this.sy(star.y);
      ctx.fillStyle = star.color;
      ctx.beginPath();
      ctx.arc(x, y, star.r * this.scaleX, 0, Math.PI * 2);
      ctx.fill();
    }

    if (this.state === "menu") {
      this.drawMenu();
      return;
    }

    // Platforms
    for (const p of this.platforms) {
      const px = this.sx(p.x);
      const py = this.sy(p.y);
      const pw = this.sw(p.w);
      const ph = this.sh(p.h);
      ctx.fillStyle = PLATFORM;
      ctx.fillRect(px, py, pw, ph);
      ctx.fillStyle = PLATFORM_TOP;
      ctx.fillRect(px, py, pw, this.sh(4));
      ctx.strokeStyle = PLATFORM_TOP;
      ctx.lineWidth = 1;
      for (let gx = 0; gx < p.w; gx += 20) {
        ctx.beginPath();
        ctx.moveTo(px + this.sw(gx), py);
        ctx.lineTo(px + this.sw(gx), py + ph);
        ctx.stroke();
      }
    }

    // Coins
    for (const c of this.coins) {
      if (c.collected) continue;
      const bob = Math.sin(performance.now() / 200 + c.x) * 3;
      const cx = this.sx(c.x);
      const cy = this.sy(c.y + bob);
      const r = this.sw(8);
      ctx.fillStyle = COIN;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = COIN_LIGHT;
      ctx.beginPath();
      ctx.arc(cx - this.sw(3), cy - this.sh(3), this.sw(2), 0, Math.PI * 2);
      ctx.fill();
    }

    // Power-ups
    for (const pu of this.powerups) {
      if (pu.collected) continue;
      const bob = Math.sin(pu.bob || 0) * 4;
      const px = this.sx(pu.x);
      const py = this.sy(pu.y + bob);
      const col = pu.kind === "speed" ? POWER_SPEED : pu.kind === "star" ? POWER_STAR : POWER_MAGNET;
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.arc(px, py, this.sw(9), 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = WHITE;
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Enemies
    for (const e of this.enemies) {
      const etype = e.type || "patrol";
      const ex = this.sx(e.x);
      const ey = this.sy(e.y);
      const ew = this.sw(e.w);
      const eh = this.sh(e.h);
      const color =
        etype === "floater"
          ? ENEMY_FLOAT
          : etype === "jumper"
            ? ENEMY_JUMP
            : etype === "chaser"
              ? ENEMY_CHASE
              : ENEMY;
      ctx.fillStyle = color;
      ctx.fillRect(ex + this.sw(4), ey + this.sh(8), ew - this.sw(8), eh - this.sh(8));
      ctx.beginPath();
      ctx.moveTo(ex + this.sw(4), ey + this.sh(8));
      ctx.lineTo(ex + ew / 2, ey);
      ctx.lineTo(ex + ew - this.sw(4), ey + this.sh(8));
      ctx.fill();
      ctx.fillStyle = WHITE;
      ctx.fillRect(ex + this.sw(8), ey + this.sh(14), this.sw(4), this.sh(4));
      ctx.fillRect(ex + this.sw(16), ey + this.sh(14), this.sw(4), this.sh(4));
      ctx.fillStyle = BLACK;
      ctx.fillRect(ex + this.sw(10), ey + this.sh(15), this.sw(2), this.sh(2));
      ctx.fillRect(ex + this.sw(18), ey + this.sh(15), this.sw(2), this.sh(2));
    }

    // Flag
    const fx = this.sx(this.flag.x);
    const fy = this.sy(this.flag.y);
    ctx.fillStyle = FLAG_POLE;
    ctx.fillRect(fx, fy, this.sw(4), this.sh(this.flag.h));
    ctx.beginPath();
    ctx.moveTo(fx + this.sw(4), fy);
    ctx.lineTo(fx + this.sw(30), fy + this.sh(15));
    ctx.lineTo(fx + this.sw(4), fy + this.sh(30));
    ctx.fill();

    // Hero duck
    this.drawHero();

    // Particles
    for (const p of this.particles) {
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(this.sx(p.x), this.sy(p.y), Math.max(1, p.size), 0, Math.PI * 2);
      ctx.fill();
    }
    // Float texts
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (const ft of this.floatTexts) {
      ctx.font = "bold 18px Consolas, monospace";
      ctx.fillStyle = ft.color;
      ctx.fillText(ft.text, this.sx(ft.x), this.sy(ft.y));
    }

    // Charge bar
    const h = this.hero;
    if (h.isCharging && h.chargeTimer > CHARGE_GRACE) {
      const barW = this.sw(40);
      const barH = this.sh(6);
      const barX = this.sx(h.x + h.w / 2 - 20);
      const barY = this.sy(h.y) - this.sh(15);
      const progress = Math.min(1, (h.chargeTimer - CHARGE_GRACE) / (CHARGE_SUPER - CHARGE_GRACE));
      ctx.fillStyle = "#333";
      ctx.fillRect(barX, barY, barW, barH);
      ctx.fillStyle = COIN;
      ctx.fillRect(barX, barY, barW * progress, barH);
    }

    // Combo
    if (this.combo >= 2 && this.state === "playing") {
      ctx.font = "bold 28px Consolas, monospace";
      ctx.fillStyle = this.comboMult >= 2 ? GOLD_GLOW : WHITE;
      ctx.textAlign = "center";
      ctx.fillText(`COMBO ${this.combo}  x${this.comboMult.toFixed(1)}`, CANVAS_W * 0.5, 48);
    }

    // Power icons
    if (this.state === "playing") {
      let ax = 40;
      if (h.speedTimer > 0) {
        ctx.fillStyle = POWER_SPEED;
        ctx.beginPath();
        ctx.arc(ax + 14, 54, 14, 0, Math.PI * 2);
        ctx.fill();
        ax += 36;
      }
      if (h.starTimer > 0) {
        ctx.fillStyle = POWER_STAR;
        ctx.beginPath();
        ctx.arc(ax + 14, 54, 14, 0, Math.PI * 2);
        ctx.fill();
        ax += 36;
      }
      if (h.magnetTimer > 0) {
        ctx.fillStyle = POWER_MAGNET;
        ctx.beginPath();
        ctx.arc(ax + 14, 54, 14, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // HUD
    ctx.font = "bold 20px Consolas, monospace";
    ctx.fillStyle = ACCENT;
    ctx.textAlign = "left";
    ctx.fillText(`Score: ${this.score}`, 24, CANVAS_H - 28);
    ctx.fillText(`Lives: ${this.lives}`, 220, CANVAS_H - 28);
    ctx.fillText(`Level: ${this.levelIdx + 1}`, 400, CANVAS_H - 28);
    ctx.textAlign = "right";
    ctx.fillText(`Best: ${this.highScore}`, CANVAS_W - 24, CANVAS_H - 28);
    ctx.font = "14px Consolas, monospace";
    ctx.fillStyle = "#666";
    ctx.fillText("X / Esc = Menu", CANVAS_W - 24, CANVAS_H - 52);

    // Overlays
    if (this.state === "level_complete") this.drawLevelComplete();
    else if (this.state === "enter_name") this.drawEnterName();
    else if (this.state === "gameover") this.drawGameOver();
    else if (this.state === "win") this.drawWin();
  }

  drawHero() {
    const h = this.hero;
    const hx = this.sx(h.x);
    const hy = this.sy(h.y);
    const hw = this.sw(h.w);
    const hh = this.sh(h.h);
    const f = h.facing;
    const ctx = this.ctx;

    if (h.starTimer > 0) {
      const pulse = 8 + 4 * Math.sin(h.animTimer * 0.4);
      ctx.strokeStyle = POWER_STAR;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(hx + hw / 2, hy + hh / 2, hw / 2 + this.sw(pulse), hh / 2 + this.sh(pulse), 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    if (h.speedTimer > 0) {
      ctx.strokeStyle = POWER_SPEED;
      ctx.lineWidth = 2;
      ctx.strokeRect(hx - this.sw(4), hy - this.sh(2), hw + this.sw(8), hh + this.sh(4));
    }
    if (h.isCharging && h.chargeTimer > CHARGE_GRACE) {
      const glow = this.sw(10 + (h.chargeTimer - CHARGE_GRACE) * 0.4);
      ctx.strokeStyle = GOLD_GLOW;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(hx + hw / 2, hy + hh / 2, glow, 0, Math.PI * 2);
      ctx.stroke();
    }

    if (h.invincible > 0 && Math.floor(h.invincible / 4) % 2 === 0) return;

    // Body
    ctx.fillStyle = HERO;
    ctx.beginPath();
    ctx.ellipse(hx + hw / 2, hy + hh / 2 + this.sh(2), hw / 2 + this.sw(2), hh / 2 - this.sh(2), 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = HERO_BELLY;
    ctx.beginPath();
    ctx.ellipse(hx + hw / 2, hy + hh * 0.65, hw / 2 - this.sw(2), hh / 3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Beak + eye
    ctx.fillStyle = HERO_BEAK;
    if (f === 1) {
      ctx.beginPath();
      ctx.moveTo(hx + hw - this.sw(2), hy + this.sh(10));
      ctx.lineTo(hx + hw + this.sw(10), hy + this.sh(14));
      ctx.lineTo(hx + hw - this.sw(2), hy + this.sh(18));
      ctx.fill();
      ctx.fillStyle = WHITE;
      ctx.beginPath();
      ctx.arc(hx + this.sw(15), hy + this.sh(9), this.sw(3), 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = BLACK;
      ctx.beginPath();
      ctx.arc(hx + this.sw(16), hy + this.sh(9), this.sw(1.5), 0, Math.PI * 2);
      ctx.fill();
    }

    // Hat
    const cx = hx + hw / 2;
    ctx.fillStyle = HERO_HAT;
    ctx.fillRect(cx - this.sw(12), hy + this.sh(2), this.sw(24), this.sh(4));
    ctx.fillRect(cx - this.sw(8), hy - this.sh(6), this.sw(16), this.sh(10));

    // Feet
    const footY = hy + hh - this.sh(2);
    ctx.fillStyle = HERO_BEAK;
    ctx.fillRect(hx + this.sw(4), footY, this.sw(6), this.sh(6));
    ctx.fillRect(hx + this.sw(14), footY, this.sw(6), this.sh(6));
  }

  drawMenu() {
    const ctx = this.ctx;
    ctx.fillStyle = "rgba(0,0,0,0.55)";
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    const titleX = CANVAS_W * 0.38;
    const pulse = 1 + 0.03 * Math.sin(this.menuPulse * 0.08);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `bold ${Math.floor(52 * pulse)}px Consolas, monospace`;
    ctx.fillStyle = ACCENT;
    ctx.fillText("ONE BUTTON HERO", titleX, CANVAS_H * 0.18);
    ctx.font = "26px Consolas, monospace";
    ctx.fillStyle = HERO;
    ctx.fillText("THE DUCKENING  ·  GOTY EDITION", titleX, CANVAS_H * 0.28);
    ctx.font = "30px Consolas, monospace";
    ctx.fillStyle = WHITE;
    ctx.fillText("Tap / ENTER / SPACE to Start", titleX, CANVAS_H * 0.4);
    ctx.font = "16px Consolas, monospace";
    ctx.fillStyle = "#aaa";
    ctx.fillText("Tap = Jump     Hold = Super Jump", titleX, CANVAS_H * 0.48);
    ctx.fillText("Stomp enemies · Grab power-ups · Chain combos for S-Ranks", titleX, CANVAS_H * 0.54);
    ctx.fillStyle = "#666";
    ctx.fillText("X / Esc = Exit to library", titleX, CANVAS_H * 0.6);

    // High scores board
    const boardW = 380;
    const boardX = CANVAS_W - 40 - boardW / 2;
    const boardTop = CANVAS_H * 0.12;
    ctx.fillStyle = "#0d1b2a";
    ctx.strokeStyle = ACCENT;
    ctx.lineWidth = 2;
    ctx.fillRect(boardX - boardW / 2, boardTop - 10, boardW, 480);
    ctx.strokeRect(boardX - boardW / 2, boardTop - 10, boardW, 480);
    ctx.font = "bold 26px Consolas, monospace";
    ctx.fillStyle = COIN;
    ctx.fillText("TOP 10", boardX, boardTop + 20);
    if (!this.highscores.length) {
      ctx.font = "18px Consolas, monospace";
      ctx.fillStyle = "#666";
      ctx.fillText("No scores yet", boardX, boardTop + 70);
    } else {
      this.highscores.slice(0, MAX_HIGHSCORES).forEach((entry, i) => {
        const y = boardTop + 60 + i * 40;
        const color = i === 0 ? COIN : i < 3 ? WHITE : "#aaa";
        ctx.font = "bold 18px Consolas, monospace";
        ctx.fillStyle = color;
        ctx.textAlign = "left";
        ctx.fillText(`${i + 1}. ${entry.name}`.slice(0, 14), boardX - boardW / 2 + 24, y);
        ctx.textAlign = "right";
        ctx.fillText(String(entry.score), boardX + boardW / 2 - 24, y);
      });
      ctx.textAlign = "center";
    }
  }

  drawLevelComplete() {
    const ctx = this.ctx;
    ctx.fillStyle = "rgba(0,0,0,0.45)";
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    ctx.textAlign = "center";
    ctx.font = "bold 52px Consolas, monospace";
    ctx.fillStyle = COIN;
    ctx.fillText(`LEVEL ${this.levelIdx} CLEAR!`, CANVAS_W / 2, CANVAS_H * 0.28);
    const rankCol = { S: RANK_S, A: RANK_A, B: RANK_B, C: RANK_C }[this.levelRank] || WHITE;
    ctx.font = "bold 72px Consolas, monospace";
    ctx.fillStyle = rankCol;
    ctx.fillText(`RANK  ${this.levelRank}`, CANVAS_W / 2, CANVAS_H * 0.42);
    if (this.levelBonus) {
      ctx.font = "28px Consolas, monospace";
      ctx.fillStyle = GOLD_GLOW;
      ctx.fillText(`Bonus +${this.levelBonus}`, CANVAS_W / 2, CANVAS_H * 0.54);
    }
    ctx.font = "28px Consolas, monospace";
    ctx.fillStyle = WHITE;
    ctx.fillText(`Score: ${this.score}`, CANVAS_W / 2, CANVAS_H * 0.64);
    ctx.fillStyle = "#888";
    ctx.font = "22px Consolas, monospace";
    ctx.fillText("Get ready...", CANVAS_W / 2, CANVAS_H * 0.74);
  }

  drawEnterName() {
    const ctx = this.ctx;
    ctx.fillStyle = "rgba(0,0,0,0.7)";
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    ctx.textAlign = "center";
    ctx.font = "bold 56px Consolas, monospace";
    ctx.fillStyle = COIN;
    ctx.fillText("NEW HIGH SCORE!", CANVAS_W / 2, CANVAS_H * 0.28);
    ctx.font = "36px Consolas, monospace";
    ctx.fillStyle = WHITE;
    ctx.fillText(`Score: ${this.score}`, CANVAS_W / 2, CANVAS_H * 0.4);
    ctx.font = "28px Consolas, monospace";
    ctx.fillStyle = "#ccc";
    ctx.fillText("Enter your name:", CANVAS_W / 2, CANVAS_H * 0.52);
    let display = this.nameInput;
    if (this.nameCursor < 20) display += "_";
    ctx.fillStyle = "#1a1a2e";
    ctx.strokeStyle = ACCENT;
    ctx.lineWidth = 2;
    ctx.fillRect(CANVAS_W / 2 - 220, CANVAS_H * 0.58 - 30, 440, 60);
    ctx.strokeRect(CANVAS_W / 2 - 220, CANVAS_H * 0.58 - 30, 440, 60);
    ctx.font = "bold 36px Consolas, monospace";
    ctx.fillStyle = HERO;
    ctx.fillText(display || " ", CANVAS_W / 2, CANVAS_H * 0.58);
    ctx.font = "22px Consolas, monospace";
    ctx.fillStyle = "#888";
    ctx.fillText("Type name  ·  ENTER / Tap to confirm", CANVAS_W / 2, CANVAS_H * 0.7);
    ctx.fillStyle = "#555";
    ctx.fillText("(Blank = HERO)", CANVAS_W / 2, CANVAS_H * 0.78);
  }

  drawGameOver() {
    const ctx = this.ctx;
    ctx.fillStyle = "rgba(0,0,0,0.7)";
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    ctx.textAlign = "center";
    ctx.font = "bold 72px Consolas, monospace";
    ctx.fillStyle = ACCENT;
    ctx.fillText("GAME OVER", CANVAS_W / 2, CANVAS_H * 0.3);
    ctx.font = "36px Consolas, monospace";
    ctx.fillStyle = WHITE;
    ctx.fillText(`Score: ${this.score}`, CANVAS_W / 2, CANVAS_H * 0.45);
    if (this.newBest) {
      ctx.font = "bold 28px Consolas, monospace";
      ctx.fillStyle = COIN;
      ctx.fillText("SAVED TO HIGH SCORES!", CANVAS_W / 2, CANVAS_H * 0.55);
    }
    ctx.font = "36px Consolas, monospace";
    ctx.fillStyle = WHITE;
    ctx.fillText("Tap / ENTER to Restart", CANVAS_W / 2, CANVAS_H * 0.68);
    ctx.font = "22px Consolas, monospace";
    ctx.fillStyle = "#666";
    ctx.fillText("X / Esc = Menu", CANVAS_W / 2, CANVAS_H * 0.78);
  }

  drawWin() {
    const ctx = this.ctx;
    ctx.fillStyle = "rgba(0,0,0,0.7)";
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    ctx.textAlign = "center";
    ctx.font = "bold 72px Consolas, monospace";
    ctx.fillStyle = COIN;
    ctx.fillText("YOU WIN!", CANVAS_W / 2, CANVAS_H * 0.22);
    ctx.font = "40px Consolas, monospace";
    ctx.fillStyle = WHITE;
    ctx.fillText(`Final Score: ${this.score}`, CANVAS_W / 2, CANVAS_H * 0.36);
    if (this.newBest) {
      ctx.font = "bold 28px Consolas, monospace";
      ctx.fillStyle = COIN;
      ctx.fillText("SAVED TO HIGH SCORES!", CANVAS_W / 2, CANVAS_H * 0.48);
    }
    ctx.font = "36px Consolas, monospace";
    ctx.fillStyle = WHITE;
    ctx.fillText("Tap / ENTER to Play Again", CANVAS_W / 2, CANVAS_H * 0.6);
    ctx.font = "22px Consolas, monospace";
    ctx.fillStyle = "#666";
    ctx.fillText("X / Esc = Menu", CANVAS_W / 2, CANVAS_H * 0.72);
  }
}

const canvas = document.getElementById("game");
if (canvas) new Game(canvas);
