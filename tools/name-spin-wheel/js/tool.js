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

// ─── Circus music (Web Audio) — stop() clears timer immediately ──────────────

class CircusMusic {
  constructor() {
    this.enabled = true;
    this.ctx = null;
    this.timer = null;
    this.activeNodes = [];
  }

  ensureCtx() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      this.ctx = new AC();
    }
    if (this.ctx.state === "suspended") this.ctx.resume();
    return this.ctx;
  }

  setEnabled(on) {
    this.enabled = !!on;
    if (!this.enabled) this.stop();
    else this.start();
  }

  start() {
    if (!this.enabled || this.timer) return;
    const ctx = this.ensureCtx();
    if (!ctx) return;

    const melody = [
      [523.25, 0.2], [659.25, 0.2], [783.99, 0.2], [1046.5, 0.2],
      [783.99, 0.2], [659.25, 0.2], [523.25, 0.4],
      [587.33, 0.2], [698.46, 0.2], [880.0, 0.2], [1174.66, 0.2],
      [880.0, 0.2], [698.46, 0.2], [587.33, 0.4],
      [523.25, 0.2], [659.25, 0.2], [783.99, 0.2], [659.25, 0.2],
      [523.25, 0.2], [392.0, 0.2], [523.25, 0.4],
    ];
    let i = 0;

    const playNote = () => {
      if (!this.enabled || !this.ctx) return;
      const [freq, dur] = melody[i % melody.length];
      i += 1;
      const t0 = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "square";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.exponentialRampToValueAtTime(0.06, t0 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t0);
      osc.stop(t0 + dur + 0.02);

      const bass = this.ctx.createOscillator();
      const bg = this.ctx.createGain();
      bass.type = "triangle";
      bass.frequency.value = i % 4 < 2 ? 130.81 : 174.61;
      bg.gain.value = 0.03;
      bass.connect(bg);
      bg.connect(this.ctx.destination);
      bass.start(t0);
      bass.stop(t0 + dur);

      this.activeNodes.push(osc, bass);
      this.timer = setTimeout(playNote, dur * 1000);
    };
    playNote();
  }

  stop() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    // Silence any currently sounding oscillators
    for (const node of this.activeNodes) {
      try {
        node.stop();
      } catch (_) {
        /* already stopped */
      }
    }
    this.activeNodes = [];
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
    this.music = new CircusMusic();

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
      this.music.start();
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
    if (this.music.enabled && !this.music.timer) this.music.start();

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
