/**
 * Classroom Timer — goal-based visual timers
 * Scalable canvas stage, character along a timeline, Bomb Time fuse mode.
 */

const GOALS = [
  {
    id: "focus",
    name: "Focus",
    desc: "Silent independent focus",
    emoji: "🎯",
    hint: "Eyes on your work…",
    theme: { sky: ["#0f172a", "#1e3a5f"], accent: "#38bdf8", path: "#334155" },
  },
  {
    id: "pair",
    name: "Pair work",
    desc: "Talk with your partner",
    emoji: "🤝",
    hint: "Share ideas — stay on task",
    theme: { sky: ["#1a1033", "#3b0764"], accent: "#c084fc", path: "#4c1d95" },
  },
  {
    id: "cleanup",
    name: "Clean up",
    desc: "Tidy desks & floor",
    emoji: "🧹",
    hint: "Leave it better than you found it",
    theme: { sky: ["#052e16", "#14532d"], accent: "#4ade80", path: "#166534" },
  },
  {
    id: "transition",
    name: "Transition",
    desc: "Move & settle",
    emoji: "🚪",
    hint: "Walk quietly… seats ready",
    theme: { sky: ["#1c1917", "#44403c"], accent: "#fbbf24", path: "#57534e" },
  },
  {
    id: "write",
    name: "Write time",
    desc: "Pencils moving",
    emoji: "✏️",
    hint: "Keep those pencils going",
    theme: { sky: ["#0c4a6e", "#0e7490"], accent: "#67e8f9", path: "#155e75" },
  },
  {
    id: "bomb",
    name: "BOMB TIME",
    desc: "Rapid-fire questions!",
    emoji: "💣",
    hint: "Think fast — fuse is burning",
    theme: { sky: ["#1c0606", "#450a0a"], accent: "#fb7185", path: "#7f1d1d" },
    bomb: true,
  },
];

function pad2(n) {
  return String(n).padStart(2, "0");
}

function formatTime(sec) {
  sec = Math.max(0, Math.ceil(sec));
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${pad2(s)}`;
}

class ClassroomTimer {
  constructor() {
    this.canvas = document.getElementById("stage");
    this.ctx = this.canvas.getContext("2d");
    this.goal = GOALS[0];
    this.duration = 300;
    this.remaining = 300;
    this.state = "menu"; // menu | run | done
    this.running = false;
    this.lastTs = 0;
    this.raf = null;
    this.phase = 0; // animation phase
    this.dpr = 1;

    this.els = {
      menu: document.getElementById("screen-menu"),
      run: document.getElementById("screen-run"),
      done: document.getElementById("screen-done"),
      goalGrid: document.getElementById("goal-grid"),
      presets: document.getElementById("presets"),
      customMin: document.getElementById("custom-min"),
      customSec: document.getElementById("custom-sec"),
      startBtn: document.getElementById("start-btn"),
      runGoal: document.getElementById("run-goal-label"),
      runClock: document.getElementById("run-clock"),
      runHint: document.getElementById("run-hint"),
      doneEmoji: document.getElementById("done-emoji"),
      doneTitle: document.getElementById("done-title"),
      doneMsg: document.getElementById("done-msg"),
    };

    this._buildGoalGrid();
    this._bind();
    this._resizeCanvas();
    window.addEventListener("resize", () => this._resizeCanvas());
  }

  _buildGoalGrid() {
    this.els.goalGrid.innerHTML = "";
    GOALS.forEach((g, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "goal-card" + (g.bomb ? " bomb" : "") + (i === 0 ? " is-selected" : "");
      btn.setAttribute("role", "option");
      btn.setAttribute("aria-selected", i === 0 ? "true" : "false");
      btn.dataset.id = g.id;
      btn.innerHTML = `
        <div class="goal-emoji">${g.emoji}</div>
        <div class="goal-name">${g.name}</div>
        <div class="goal-desc">${g.desc}</div>
      `;
      btn.addEventListener("click", () => this.selectGoal(g.id));
      this.els.goalGrid.appendChild(btn);
    });
  }

  selectGoal(id) {
    this.goal = GOALS.find((g) => g.id === id) || GOALS[0];
    this.els.goalGrid.querySelectorAll(".goal-card").forEach((el) => {
      const on = el.dataset.id === this.goal.id;
      el.classList.toggle("is-selected", on);
      el.setAttribute("aria-selected", on ? "true" : "false");
    });
  }

  _bind() {
    this.els.presets.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-sec]");
      if (!btn) return;
      this.els.presets.querySelectorAll("button").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const sec = parseInt(btn.dataset.sec, 10);
      this.duration = sec;
      this.els.customMin.value = String(Math.floor(sec / 60));
      this.els.customSec.value = String(sec % 60);
    });

    const syncCustom = () => {
      const m = Math.max(0, parseInt(this.els.customMin.value, 10) || 0);
      const s = Math.max(0, Math.min(59, parseInt(this.els.customSec.value, 10) || 0));
      this.duration = m * 60 + s;
      this.els.presets.querySelectorAll("button").forEach((b) => {
        b.classList.toggle("is-active", parseInt(b.dataset.sec, 10) === this.duration);
      });
    };
    this.els.customMin.addEventListener("input", syncCustom);
    this.els.customSec.addEventListener("input", syncCustom);

    this.els.startBtn.addEventListener("click", () => this.start());
    document.getElementById("btn-restart").addEventListener("click", () => this.restart());
    document.getElementById("btn-stop").addEventListener("click", () => this.stopToMenu());
    document.getElementById("btn-menu").addEventListener("click", () => this.stopToMenu());
    document.getElementById("btn-fs").addEventListener("click", () => this.toggleFullscreen());
    document.getElementById("done-restart").addEventListener("click", () => this.restart());
    document.getElementById("done-menu").addEventListener("click", () => this.showMenu());

    document.addEventListener("fullscreenchange", () => {
      document.body.classList.toggle("is-fs", !!document.fullscreenElement);
      this._resizeCanvas();
    });
  }

  _resizeCanvas() {
    const canvas = this.canvas;
    const parent = canvas.parentElement;
    if (!parent) return;
    const rect = parent.getBoundingClientRect();
    // Prefer filling available run area
    let cssW = rect.width;
    let cssH = Math.max(240, rect.height - (this.state === "run" ? 100 : 0));
    if (this.state === "run") {
      const chrome = parent.querySelector(".run-chrome");
      const hint = parent.querySelector(".run-hint");
      const used = (chrome ? chrome.offsetHeight : 0) + (hint ? hint.offsetHeight : 0) + 24;
      cssH = Math.max(240, parent.clientHeight - used);
    }
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.style.width = cssW + "px";
    canvas.style.height = cssH + "px";
    canvas.width = Math.floor(cssW * this.dpr);
    canvas.height = Math.floor(cssH * this.dpr);
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    if (this.state === "run") this.draw(performance.now());
  }

  show(screen) {
    this.els.menu.hidden = screen !== "menu";
    this.els.run.hidden = screen !== "run";
    this.els.done.hidden = screen !== "done";
    this.state = screen;
  }

  showMenu() {
    this.stopLoop();
    this.running = false;
    this.show("menu");
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  }

  start() {
    syncDurationFromUI(this);
    if (this.duration < 5) {
      alert("Please set at least 5 seconds.");
      return;
    }
    this.remaining = this.duration;
    this.running = true;
    this.phase = 0;
    this.show("run");
    this.els.runGoal.textContent = `${this.goal.emoji} ${this.goal.name}`;
    this.els.runHint.textContent = this.goal.hint;
    this.els.runClock.textContent = formatTime(this.remaining);
    this._resizeCanvas();
    this.lastTs = performance.now();
    this.loop(this.lastTs);
  }

  restart() {
    this.stopLoop();
    this.remaining = this.duration;
    this.running = true;
    this.phase = 0;
    this.show("run");
    this.els.runGoal.textContent = `${this.goal.emoji} ${this.goal.name}`;
    this.els.runHint.textContent = this.goal.hint;
    this.els.runClock.textContent = formatTime(this.remaining);
    this._resizeCanvas();
    this.lastTs = performance.now();
    this.loop(this.lastTs);
  }

  stopToMenu() {
    this.showMenu();
  }

  toggleFullscreen() {
    const root = document.documentElement;
    if (!document.fullscreenElement) {
      root.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  }

  stopLoop() {
    if (this.raf) {
      cancelAnimationFrame(this.raf);
      this.raf = null;
    }
  }

  finish() {
    this.stopLoop();
    this.running = false;
    this.show("done");
    if (this.goal.bomb) {
      this.els.doneEmoji.textContent = "💥";
      this.els.doneTitle.textContent = "BOOM!";
      this.els.doneMsg.textContent = "Time’s up — pencils down / answers ready!";
    } else {
      this.els.doneEmoji.textContent = "✅";
      this.els.doneTitle.textContent = "Time’s up!";
      this.els.doneMsg.textContent = `${this.goal.name} session complete. Nice work.`;
    }
  }

  loop(ts) {
    if (!this.running) return;
    const dt = Math.min(0.05, (ts - this.lastTs) / 1000);
    this.lastTs = ts;
    this.remaining -= dt;
    this.phase += dt;
    this.els.runClock.textContent = formatTime(this.remaining);
    // urgency color on clock
    if (this.remaining <= 10) {
      this.els.runClock.style.color = "#fb7185";
    } else if (this.remaining <= 30) {
      this.els.runClock.style.color = "#fbbf24";
    } else {
      this.els.runClock.style.color = "#fef3c7";
    }

    this.draw(ts);

    if (this.remaining <= 0) {
      this.remaining = 0;
      this.finish();
      return;
    }
    this.raf = requestAnimationFrame((t) => this.loop(t));
  }

  // ── Drawing ────────────────────────────────────────────────────────────

  draw(ts) {
    const ctx = this.ctx;
    const W = this.canvas.width / this.dpr;
    const H = this.canvas.height / this.dpr;
    const progress = 1 - Math.max(0, this.remaining) / this.duration; // 0 → 1

    ctx.clearRect(0, 0, W, H);

    // Background gradient
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, this.goal.theme.sky[0]);
    g.addColorStop(1, this.goal.theme.sky[1]);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    // Soft vignette stars / dust
    ctx.globalAlpha = 0.35;
    for (let i = 0; i < 40; i++) {
      const x = (Math.sin(i * 12.3 + this.phase * 0.05) * 0.5 + 0.5) * W;
      const y = (Math.cos(i * 7.1) * 0.5 + 0.5) * H * 0.55;
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(x, y, 1.2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    if (this.goal.bomb) {
      this.drawBombScene(ctx, W, H, progress);
    } else {
      this.drawPathScene(ctx, W, H, progress);
    }
  }

  drawPathScene(ctx, W, H, progress) {
    const padX = W * 0.08;
    const pathY = H * 0.62;
    const pathW = W - padX * 2;

    // Ground band
    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.fillRect(0, pathY + 20, W, H - pathY);

    // Timeline track
    ctx.strokeStyle = this.goal.theme.path;
    ctx.lineWidth = 14;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(padX, pathY);
    ctx.lineTo(padX + pathW, pathY);
    ctx.stroke();

    // Progress fill
    ctx.strokeStyle = this.goal.theme.accent;
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(padX, pathY);
    ctx.lineTo(padX + pathW * progress, pathY);
    ctx.stroke();

    // Tick marks
    ctx.fillStyle = "rgba(255,255,255,0.25)";
    for (let i = 0; i <= 10; i++) {
      const x = padX + (pathW * i) / 10;
      ctx.fillRect(x - 1, pathY + 16, 2, 10);
    }

    // Start / end flags
    this.drawFlag(ctx, padX, pathY - 8, "#94a3b8", "Start");
    this.drawFlag(ctx, padX + pathW, pathY - 8, this.goal.theme.accent, "Done");

    // Character position
    const cx = padX + pathW * progress;
    const bob = Math.sin(this.phase * 6) * 4;
    this.drawCharacter(ctx, this.goal.id, cx, pathY - 10 + bob, this.phase);

    // Big progress ring (top-right)
    this.drawProgressRing(ctx, W - 70, 70, 48, progress, this.goal.theme.accent);
  }

  drawFlag(ctx, x, y, color, label) {
    ctx.fillStyle = color;
    ctx.fillRect(x - 2, y - 40, 4, 40);
    ctx.beginPath();
    ctx.moveTo(x, y - 40);
    ctx.lineTo(x + 22, y - 30);
    ctx.lineTo(x, y - 20);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.font = "11px Segoe UI, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(label, x, y + 28);
  }

  drawProgressRing(ctx, x, y, r, progress, color) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,255,255,0.1)";
    ctx.lineWidth = 8;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, r, -Math.PI / 2, -Math.PI / 2 + progress * Math.PI * 2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    ctx.stroke();
    ctx.fillStyle = "#eef2ff";
    ctx.font = "bold 14px Segoe UI, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${Math.round(progress * 100)}%`, x, y);
  }

  drawCharacter(ctx, id, x, y, phase) {
    ctx.save();
    ctx.translate(x, y);

    if (id === "focus") {
      // Student with book
      this._body(ctx, "#38bdf8");
      ctx.fillStyle = "#fef3c7";
      ctx.fillRect(10, -28, 18, 14);
      ctx.strokeStyle = "#92400e";
      ctx.strokeRect(10, -28, 18, 14);
    } else if (id === "pair") {
      // Two small figures
      ctx.translate(-14, 0);
      this._body(ctx, "#c084fc", 0.85);
      ctx.translate(28, 0);
      this._body(ctx, "#f9a8d4", 0.85);
    } else if (id === "cleanup") {
      this._body(ctx, "#4ade80");
      // Broom
      const swing = Math.sin(phase * 8) * 0.35;
      ctx.save();
      ctx.translate(16, -10);
      ctx.rotate(swing);
      ctx.strokeStyle = "#a3a3a3";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, 36);
      ctx.stroke();
      ctx.fillStyle = "#fbbf24";
      ctx.fillRect(-10, 32, 20, 8);
      ctx.restore();
    } else if (id === "transition") {
      // Walking lean
      ctx.rotate(Math.sin(phase * 8) * 0.08);
      this._body(ctx, "#fbbf24");
      // Motion lines
      ctx.strokeStyle = "rgba(255,255,255,0.3)";
      ctx.lineWidth = 2;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(-28 - i * 8, -20 + i * 6);
        ctx.lineTo(-18 - i * 8, -20 + i * 6);
        ctx.stroke();
      }
    } else if (id === "write") {
      this._body(ctx, "#67e8f9");
      // Pencil
      const bob = Math.sin(phase * 10) * 3;
      ctx.save();
      ctx.translate(14, -18 + bob);
      ctx.rotate(-0.5);
      ctx.fillStyle = "#fde047";
      ctx.fillRect(0, 0, 6, 22);
      ctx.fillStyle = "#ef4444";
      ctx.fillRect(0, 0, 6, 5);
      ctx.fillStyle = "#78716c";
      ctx.beginPath();
      ctx.moveTo(0, 22);
      ctx.lineTo(3, 28);
      ctx.lineTo(6, 22);
      ctx.fill();
      ctx.restore();
    } else {
      this._body(ctx, "#a78bfa");
    }

    ctx.restore();
  }

  _body(ctx, color, scale = 1) {
    ctx.save();
    ctx.scale(scale, scale);
    // legs
    ctx.strokeStyle = color;
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    const leg = Math.sin(this.phase * 8) * 6;
    ctx.beginPath();
    ctx.moveTo(-6, 0);
    ctx.lineTo(-8, 16 + leg);
    ctx.moveTo(6, 0);
    ctx.lineTo(8, 16 - leg);
    ctx.stroke();
    // body
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(0, -18, 14, 20, 0, 0, Math.PI * 2);
    ctx.fill();
    // head
    ctx.beginPath();
    ctx.arc(0, -44, 12, 0, Math.PI * 2);
    ctx.fill();
    // face
    ctx.fillStyle = "#0f172a";
    ctx.beginPath();
    ctx.arc(-4, -46, 2, 0, Math.PI * 2);
    ctx.arc(4, -46, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  drawBombScene(ctx, W, H, progress) {
    // Fuse burns from full → empty as time runs out (progress 0→1)
    const fuseLeft = 1 - progress;

    // Danger floor
    ctx.fillStyle = "rgba(0,0,0,0.35)";
    ctx.fillRect(0, H * 0.7, W, H * 0.3);

    // Fuse path (curve across screen)
    const startX = W * 0.12;
    const endX = W * 0.72;
    const y = H * 0.42;
    const midY = y - H * 0.12;

    // Draw remaining fuse
    ctx.save();
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#a3a3a3";
    ctx.beginPath();
    const steps = 60;
    const drawUntil = Math.max(0.02, fuseLeft);
    for (let i = 0; i <= steps * drawUntil; i++) {
      const t = i / steps;
      const x = startX + (endX - startX) * t;
      const yy = y + Math.sin(t * Math.PI) * (midY - y) * 2 * (t < 0.5 ? t * 2 : (1 - t) * 2);
      // simpler quadratic-ish
      const yy2 = y - Math.sin(t * Math.PI) * H * 0.1;
      if (i === 0) ctx.moveTo(x, yy2);
      else ctx.lineTo(x, yy2);
    }
    ctx.stroke();

    // Burning tip + sparks
    const tipT = fuseLeft;
    const tipX = startX + (endX - startX) * tipT;
    const tipY = y - Math.sin(tipT * Math.PI) * H * 0.1;

    if (fuseLeft > 0.01) {
      // Flame
      const flicker = 1 + Math.sin(this.phase * 20) * 0.15;
      const grd = ctx.createRadialGradient(tipX, tipY, 0, tipX, tipY, 22 * flicker);
      grd.addColorStop(0, "#fef08a");
      grd.addColorStop(0.4, "#fb923c");
      grd.addColorStop(1, "rgba(239,68,68,0)");
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(tipX, tipY, 22 * flicker, 0, Math.PI * 2);
      ctx.fill();

      // Sparks
      ctx.fillStyle = "#fde047";
      for (let i = 0; i < 8; i++) {
        const a = this.phase * 8 + i * 0.9;
        const dist = 12 + (i % 3) * 6;
        ctx.globalAlpha = 0.5 + Math.sin(a) * 0.4;
        ctx.beginPath();
        ctx.arc(tipX + Math.cos(a) * dist, tipY + Math.sin(a * 1.3) * dist * 0.6 - 8, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    // Bomb at end of fuse
    const bx = endX + 50;
    const by = y + 10;
    ctx.save();
    ctx.translate(bx, by);
    // body
    ctx.fillStyle = "#1f2937";
    ctx.beginPath();
    ctx.arc(0, 0, 48, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#374151";
    ctx.beginPath();
    ctx.arc(-12, -12, 14, 0, Math.PI * 2);
    ctx.fill();
    // cap
    ctx.fillStyle = "#6b7280";
    ctx.fillRect(-14, -58, 28, 16);
    ctx.fillStyle = "#9ca3af";
    ctx.fillRect(-8, -68, 16, 12);
    // angry face when low time
    if (progress > 0.7) {
      ctx.strokeStyle = "#f87171";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-16, -8);
      ctx.lineTo(-6, -2);
      ctx.moveTo(16, -8);
      ctx.lineTo(6, -2);
      ctx.stroke();
      ctx.fillStyle = "#f87171";
      ctx.beginPath();
      ctx.arc(0, 12, 10, 0.1, Math.PI - 0.1);
      ctx.fill();
    } else {
      ctx.fillStyle = "#fbbf24";
      ctx.beginPath();
      ctx.arc(-12, -4, 5, 0, Math.PI * 2);
      ctx.arc(12, -4, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#111";
      ctx.beginPath();
      ctx.arc(-12, -4, 2.5, 0, Math.PI * 2);
      ctx.arc(12, -4, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // Progress ring
    this.drawProgressRing(ctx, W - 70, 70, 48, progress, "#fb7185");

    // Warning text
    if (progress > 0.85) {
      ctx.fillStyle = "rgba(251,113,133,0.85)";
      ctx.font = "bold 28px Segoe UI, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("HURRY!", W / 2, H * 0.2);
    }
  }
}

function syncDurationFromUI(app) {
  const active = app.els.presets.querySelector("button.is-active");
  const m = Math.max(0, parseInt(app.els.customMin.value, 10) || 0);
  const s = Math.max(0, Math.min(59, parseInt(app.els.customSec.value, 10) || 0));
  const custom = m * 60 + s;
  if (custom > 0) {
    app.duration = custom;
  } else if (active) {
    app.duration = parseInt(active.dataset.sec, 10) || 300;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new ClassroomTimer();
});
