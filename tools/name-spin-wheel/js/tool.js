/**
 * Name Spin Wheel — web port (pointer-accurate + instant mute)
 */

const COLORS = [
  "#E63946", "#F4A261", "#E9C46A", "#2A9D8F", "#457B9D",
  "#9B5DE5", "#F15BB5", "#00BBF9", "#00F5D4", "#FEE440",
  "#FF6B6B", "#4ECDC4", "#FFE66D", "#95E06C", "#A06CD5",
];

/** Top of canvas with y-down cos/sin drawing == -π/2 */
const POINTER_ANGLE = -Math.PI / 2;

function parseNames(text) {
  return text
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);
}

// ─── Background music (real Mixkit track, soft loop) ─────────────────────────

class BackgroundMusic {
  constructor(src) {
    this.enabled = true;
    this.audio = new Audio(src);
    this.audio.loop = true;
    this.audio.preload = "auto";
    this.audio.volume = 0.32;
    this._started = false;
  }

  ensureCtx() {
    /* HTMLAudio; resume after user gesture */
    return this.audio;
  }

  setEnabled(on) {
    this.enabled = !!on;
    if (!this.enabled) this.stop();
    else this.start();
  }

  start() {
    if (!this.enabled) return;
    const p = this.audio.play();
    if (p && typeof p.then === "function") {
      p.then(() => {
        this._started = true;
      }).catch(() => {
        /* autoplay blocked until gesture */
      });
    } else {
      this._started = true;
    }
  }

  stop() {
    try {
      this.audio.pause();
      this.audio.currentTime = 0;
    } catch (_) {}
  }
}

// ─── App ─────────────────────────────────────────────────────────────────────

class NameSpinWheel {
  constructor() {
    this.canvas = document.getElementById("wheel");
    this.ctx = this.canvas.getContext("2d");
    this.names = [];
    this.angle = 0;
    this.spinning = false;
    this.targetAngle = 0;
    this.raf = null;
    this.music = new BackgroundMusic("audio/background.mp3");

    this.resultEl = document.getElementById("result");
    this.countEl = document.getElementById("count");
    this.spinBtn = document.getElementById("spin-btn");
    this.muteBtn = document.getElementById("mute-btn");

    document.getElementById("load-btn").addEventListener("click", () => this.loadNames());
    document.getElementById("reset-btn").addEventListener("click", () => this.loadNames());
    this.spinBtn.addEventListener("click", () => this.spin());
    this.muteBtn.addEventListener("click", () => this.toggleMute());

    const unlock = () => {
      this.music.ensureCtx();
      if (this.music.enabled) this.music.start();
      window.removeEventListener("pointerdown", unlock);
    };
    window.addEventListener("pointerdown", unlock);

    this.draw();
  }

  mode() {
    const el = document.querySelector('input[name="mode"]:checked');
    return el ? el.value : "standard";
  }

  loadNames() {
    if (this.spinning) return;
    const names = parseNames(document.getElementById("name-input").value);
    if (names.length < 2) {
      alert("Enter at least two names, separated by commas.");
      return;
    }
    this.names = names;
    this.angle = 0;
    this.resultEl.textContent = "Ready — press SPIN!";
    this.updateCount();
    this.draw();
  }

  updateCount() {
    const n = this.names.length;
    this.countEl.textContent = `${n} name${n === 1 ? "" : "s"} on the wheel`;
  }

  toggleMute() {
    this.music.setEnabled(!this.music.enabled);
    this.muteBtn.textContent = this.music.enabled ? "🔊 Music" : "🔇 Muted";
  }

  sliceAngle() {
    const n = this.names.length;
    return n ? (Math.PI * 2) / n : 0;
  }

  /** Name index currently under the top pointer. */
  indexAtPointer() {
    const n = this.names.length;
    if (n <= 0) return -1;
    const slice = this.sliceAngle();
    const rel = (POINTER_ANGLE - this.angle) % (Math.PI * 2);
    const positive = (rel + Math.PI * 2) % (Math.PI * 2);
    return Math.floor(positive / slice) % n;
  }

  /** Wheel angle that centres `index` under the pointer. */
  angleForIndex(index) {
    const slice = this.sliceAngle();
    const mid = index * slice + slice / 2;
    return (POINTER_ANGLE - mid) % (Math.PI * 2);
  }

  draw() {
    const ctx = this.ctx;
    const W = this.canvas.width;
    const H = this.canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    const r = 210;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#1a1033";
    ctx.fillRect(0, 0, W, H);

    ctx.beginPath();
    ctx.arc(cx, cy, r + 8, 0, Math.PI * 2);
    ctx.fillStyle = "#5a3d9a";
    ctx.fill();

    const n = this.names.length;
    if (n === 0) {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = "#2a1b4d";
      ctx.fill();
      ctx.fillStyle = "#c4b5e0";
      ctx.font = "16px Segoe UI, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("No names yet", cx, cy);
      this.drawPointer(cx);
      return;
    }

    const slice = this.sliceAngle();
    for (let i = 0; i < n; i++) {
      const a0 = this.angle + i * slice;
      const a1 = a0 + slice;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, a0, a1);
      ctx.closePath();
      ctx.fillStyle = COLORS[i % COLORS.length];
      ctx.fill();
      ctx.strokeStyle = "#1a1033";
      ctx.lineWidth = 2;
      ctx.stroke();

      const mid = a0 + slice / 2;
      const lx = cx + Math.cos(mid) * r * 0.62;
      const ly = cy + Math.sin(mid) * r * 0.62;
      ctx.save();
      ctx.translate(lx, ly);
      ctx.rotate(mid);
      ctx.fillStyle = "#111";
      ctx.font = "bold 13px Segoe UI, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const label = this.names[i].length > 12 ? this.names[i].slice(0, 11) + "…" : this.names[i];
      ctx.fillText(label, 0, 0);
      ctx.restore();
    }

    ctx.beginPath();
    ctx.arc(cx, cy, 28, 0, Math.PI * 2);
    ctx.fillStyle = "#ffd166";
    ctx.fill();
    ctx.strokeStyle = "#1a1033";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = "#1a1033";
    ctx.font = "bold 16px Segoe UI, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("★", cx, cy);

    this.drawPointer(cx);
  }

  drawPointer(cx) {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.moveTo(cx - 16, 12);
    ctx.lineTo(cx + 16, 12);
    ctx.lineTo(cx, 52);
    ctx.closePath();
    ctx.fillStyle = "#ffd166";
    ctx.fill();
    ctx.strokeStyle = "#1a1033";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  spin() {
    if (this.spinning) return;
    if (this.names.length < 1) {
      alert("Load at least one name first.");
      return;
    }
    this.music.ensureCtx();
    if (this.music.enabled) this.music.start();

    if (this.names.length === 1 && this.mode() === "remove") {
      const name = this.names[0];
      this.resultEl.textContent = `★  ${name}  ★\n(last name left)`;
      this.names = [];
      this.updateCount();
      this.draw();
      return;
    }

    this.spinning = true;
    this.spinBtn.disabled = true;

    const pick = Math.floor(Math.random() * this.names.length);
    const targetMod = this.angleForIndex(pick);
    // Normalize JS % for negatives
    const norm = (a) => ((a % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    const current = norm(this.angle);
    const target = norm(targetMod);
    const delta = (target - current + Math.PI * 2) % (Math.PI * 2);
    const turns = (4.5 + Math.random() * 3) * Math.PI * 2;
    this.targetAngle = this.angle + turns + delta;
    this.animate();
  }

  animate() {
    const remaining = this.targetAngle - this.angle;
    if (remaining <= 0.002) {
      this.angle = this.targetAngle;
      this.draw();
      this.finishSpin();
      return;
    }
    this.angle += Math.max(0.002, remaining * 0.045);
    this.draw();
    this.raf = requestAnimationFrame(() => this.animate());
  }

  finishSpin() {
    this.spinning = false;
    this.spinBtn.disabled = false;

    const idx = this.indexAtPointer();
    if (idx < 0 || idx >= this.names.length) return;
    const name = this.names[idx];
    this.resultEl.textContent = `★  ${name}  ★`;

    if (this.mode() === "remove") {
      this.names.splice(idx, 1);
      this.updateCount();
      this.angle = 0;
      this.draw();
      if (!this.names.length) {
        this.resultEl.textContent = `★  ${name}  ★\nEveryone has had a turn!`;
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new NameSpinWheel();
});
