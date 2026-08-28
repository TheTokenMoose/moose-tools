/**
 * Classroom Timer — goal-based visual timers
 * Path characters + Bomb Time fuse, pause, lofi bed, mild boom.
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

// ─── Audio (procedural — offline, no external files) ───────────────────────

class TimerAudio {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.master = null;
    this.musicNodes = [];
    this.musicTimer = null;
    this.step = 0;
  }

  ensure() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.22;
      this.master.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") this.ctx.resume();
    return this.ctx;
  }

  setEnabled(on) {
    this.enabled = !!on;
    if (!this.enabled) this.stopMusic();
    else if (this._wantMusic) this.startMusic();
  }

  startMusic() {
    this._wantMusic = true;
    if (!this.enabled) return;
    const ctx = this.ensure();
    if (!ctx || this.musicTimer) return;

    // Upbeat chill lofi-ish loop: soft keys + offbeat hi + warm bass
    const chordSeq = [
      [261.63, 329.63, 392.0],  // C major
      [220.0, 261.63, 329.63],  // Am
      [174.61, 220.0, 261.63],  // F
      [196.0, 246.94, 293.66],  // G
    ];
    const bpm = 86;
    const beat = 60 / bpm;
    this.step = 0;

    const tick = () => {
      if (!this.enabled || !this._wantMusic || !this.ctx) return;
      const t0 = this.ctx.currentTime;
      const chord = chordSeq[Math.floor(this.step / 4) % chordSeq.length];
      const beatInBar = this.step % 4;

      // Soft pad chord
      chord.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = i === 0 ? "triangle" : "sine";
        osc.frequency.value = freq / 2;
        g.gain.setValueAtTime(0.0001, t0);
        g.gain.exponentialRampToValueAtTime(0.045, t0 + 0.05);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + beat * 1.1);
        osc.connect(g);
        g.connect(this.master);
        osc.start(t0);
        osc.stop(t0 + beat * 1.2);
        this.musicNodes.push(osc);
      });

      // Melody pluck on beats 0 and 2
      if (beatInBar === 0 || beatInBar === 2) {
        const m = this.ctx.createOscillator();
        const mg = this.ctx.createGain();
        m.type = "sine";
        m.frequency.value = chord[beatInBar === 0 ? 2 : 1] * 2;
        mg.gain.setValueAtTime(0.0001, t0);
        mg.gain.exponentialRampToValueAtTime(0.06, t0 + 0.02);
        mg.gain.exponentialRampToValueAtTime(0.0001, t0 + beat * 0.7);
        m.connect(mg);
        mg.connect(this.master);
        m.start(t0);
        m.stop(t0 + beat * 0.8);
        this.musicNodes.push(m);
      }

      // Soft offbeat tick
      if (beatInBar === 1 || beatInBar === 3) {
        const noise = this.ctx.createBufferSource();
        const buffer = this.ctx.createBuffer(1, 800, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.exp(-i / 120);
        noise.buffer = buffer;
        const ng = this.ctx.createGain();
        ng.gain.value = 0.03;
        const filt = this.ctx.createBiquadFilter();
        filt.type = "highpass";
        filt.frequency.value = 4000;
        noise.connect(filt);
        filt.connect(ng);
        ng.connect(this.master);
        noise.start(t0);
        this.musicNodes.push(noise);
      }

      this.step += 1;
      this.musicTimer = setTimeout(tick, beat * 1000);
    };
    tick();
  }

  stopMusic() {
    this._wantMusic = false;
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
    for (const n of this.musicNodes) {
      try {
        n.stop();
      } catch (_) {}
    }
    this.musicNodes = [];
  }

  /** Mild classroom-friendly boom */
  playBoom() {
    if (!this.enabled) return;
    const ctx = this.ensure();
    if (!ctx) return;
    const t0 = ctx.currentTime;

    // Low thump
    const osc = ctx.createOscillator();
    const og = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(120, t0);
    osc.frequency.exponentialRampToValueAtTime(40, t0 + 0.35);
    og.gain.setValueAtTime(0.0001, t0);
    og.gain.exponentialRampToValueAtTime(0.5, t0 + 0.02);
    og.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.5);
    osc.connect(og);
    og.connect(this.master);
    osc.start(t0);
    osc.stop(t0 + 0.55);

    // Soft noise burst
    const len = Math.floor(ctx.sampleRate * 0.35);
    const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < len; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.08));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(0.35, t0);
    ng.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.35);
    const filt = ctx.createBiquadFilter();
    filt.type = "lowpass";
    filt.frequency.value = 800;
    noise.connect(filt);
    filt.connect(ng);
    ng.connect(this.master);
    noise.start(t0);
  }

  /** Soft chime for normal timer end */
  playChime() {
    if (!this.enabled) return;
    const ctx = this.ensure();
    if (!ctx) return;
    const t0 = ctx.currentTime;
    [523.25, 659.25, 783.99].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      const start = t0 + i * 0.12;
      g.gain.setValueAtTime(0.0001, start);
      g.gain.exponentialRampToValueAtTime(0.2, start + 0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, start + 0.6);
      osc.connect(g);
      g.connect(this.master);
      osc.start(start);
      osc.stop(start + 0.65);
    });
  }
}

// ─── App ───────────────────────────────────────────────────────────────────

class ClassroomTimer {
  constructor() {
    this.canvas = document.getElementById("stage");
    this.ctx = this.canvas.getContext("2d");
    this.goal = GOALS[0];
    this.duration = 300;
    this.remaining = 300;
    this.state = "menu";
    this.running = false;
    this.paused = false;
    this.lastTs = 0;
    this.raf = null;
    this.phase = 0;
    this.dpr = 1;
    this.audio = new TimerAudio();

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
      btnPause: document.getElementById("btn-pause"),
      btnMute: document.getElementById("btn-mute"),
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
    this.els.btnPause.addEventListener("click", () => this.togglePause());
    this.els.btnMute.addEventListener("click", () => this.toggleMute());

    document.addEventListener("fullscreenchange", () => {
      document.body.classList.toggle("is-fs", !!document.fullscreenElement);
      this._resizeCanvas();
    });
  }

  toggleMute() {
    this.audio.setEnabled(!this.audio.enabled);
    this.els.btnMute.textContent = this.audio.enabled ? "🔊" : "🔇";
  }

  togglePause() {
    if (this.state !== "run") return;
    this.paused = !this.paused;
    this.els.btnPause.textContent = this.paused ? "Resume" : "Pause";
    this.els.runHint.textContent = this.paused ? "Paused" : this.goal.hint;
    if (this.paused) {
      this.audio.stopMusic();
      this.audio._wantMusic = true; // remember to resume
    } else {
      this.lastTs = performance.now();
      this.audio.startMusic();
      this.loop(this.lastTs);
    }
  }

  _resizeCanvas() {
    const canvas = this.canvas;
    const parent = canvas.parentElement;
    if (!parent) return;
    let cssW = parent.getBoundingClientRect().width;
    let cssH = Math.max(240, 400);
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
    this.paused = false;
    this.audio.stopMusic();
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
    this.paused = false;
    this.phase = 0;
    this.els.btnPause.textContent = "Pause";
    this.show("run");
    this.els.runGoal.textContent = `${this.goal.emoji} ${this.goal.name}`;
    this.els.runHint.textContent = this.goal.hint;
    this.els.runClock.textContent = formatTime(this.remaining);
    this._resizeCanvas();
    this.audio.ensure();
    this.audio.startMusic();
    this.lastTs = performance.now();
    this.loop(this.lastTs);
  }

  restart() {
    this.stopLoop();
    this.remaining = this.duration;
    this.running = true;
    this.paused = false;
    this.phase = 0;
    this.els.btnPause.textContent = "Pause";
    this.show("run");
    this.els.runGoal.textContent = `${this.goal.emoji} ${this.goal.name}`;
    this.els.runHint.textContent = this.goal.hint;
    this.els.runClock.textContent = formatTime(this.remaining);
    this._resizeCanvas();
    this.audio.startMusic();
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
    this.paused = false;
    this.audio.stopMusic();
    this.show("done");
    if (this.goal.bomb) {
      this.audio.playBoom();
      this.els.doneEmoji.textContent = "💥";
      this.els.doneTitle.textContent = "BOOM!";
      this.els.doneMsg.textContent = "Time’s up — pencils down / answers ready!";
    } else {
      this.audio.playChime();
      this.els.doneEmoji.textContent = "✅";
      this.els.doneTitle.textContent = "Time’s up!";
      this.els.doneMsg.textContent = `${this.goal.name} session complete. Nice work.`;
    }
  }

  loop(ts) {
    if (!this.running || this.paused) return;
    const dt = Math.min(0.05, (ts - this.lastTs) / 1000);
    this.lastTs = ts;
    this.remaining -= dt;
    this.phase += dt;
    this.els.runClock.textContent = formatTime(this.remaining);
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

  draw(ts) {
    const ctx = this.ctx;
    const W = this.canvas.width / this.dpr;
    const H = this.canvas.height / this.dpr;
    const progress = 1 - Math.max(0, this.remaining) / this.duration;

    ctx.clearRect(0, 0, W, H);

    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, this.goal.theme.sky[0]);
    g.addColorStop(0.55, this.goal.theme.sky[1]);
    g.addColorStop(1, this.goal.theme.sky[1]);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    // Soft floating orbs (not hard pixel dots)
    for (let i = 0; i < 18; i++) {
      const x = ((Math.sin(i * 1.7 + this.phase * 0.15) * 0.5 + 0.5) * W);
      const y = ((Math.cos(i * 0.9 + this.phase * 0.08) * 0.5 + 0.5) * H * 0.5);
      const r = 3 + (i % 4);
      const orb = ctx.createRadialGradient(x, y, 0, x, y, r * 2.5);
      orb.addColorStop(0, "rgba(255,255,255,0.22)");
      orb.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = orb;
      ctx.beginPath();
      ctx.arc(x, y, r * 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    if (this.goal.bomb) {
      this.drawBombScene(ctx, W, H, progress);
    } else {
      this.drawPathScene(ctx, W, H, progress);
    }

    if (this.paused) {
      ctx.fillStyle = "rgba(0,0,0,0.4)";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "#fef3c7";
      ctx.font = "bold 42px Segoe UI, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.shadowColor = "rgba(0,0,0,0.5)";
      ctx.shadowBlur = 12;
      ctx.fillText("PAUSED", W / 2, H / 2);
      ctx.shadowBlur = 0;
    }
  }

  drawPathScene(ctx, W, H, progress) {
    const padX = W * 0.08;
    const pathY = H * 0.64;
    const pathW = W - padX * 2;

    // Ground band
    const ground = ctx.createLinearGradient(0, pathY - 20, 0, H);
    ground.addColorStop(0, "rgba(0,0,0,0)");
    ground.addColorStop(0.15, "rgba(0,0,0,0.18)");
    ground.addColorStop(1, "rgba(0,0,0,0.35)");
    ctx.fillStyle = ground;
    ctx.fillRect(0, pathY - 20, W, H - pathY + 20);

    // Soft path shadow
    ctx.strokeStyle = "rgba(0,0,0,0.35)";
    ctx.lineWidth = 28;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(padX, pathY + 4);
    ctx.lineTo(padX + pathW, pathY + 4);
    ctx.stroke();

    // Path track
    ctx.strokeStyle = this.goal.theme.path;
    ctx.lineWidth = 22;
    ctx.beginPath();
    ctx.moveTo(padX, pathY);
    ctx.lineTo(padX + pathW, pathY);
    ctx.stroke();

    // Inner highlight rail
    ctx.strokeStyle = "rgba(255,255,255,0.12)";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(padX, pathY - 4);
    ctx.lineTo(padX + pathW, pathY - 4);
    ctx.stroke();

    // Progress fill
    if (progress > 0.001) {
      const pg = ctx.createLinearGradient(padX, 0, padX + pathW, 0);
      pg.addColorStop(0, this.goal.theme.accent);
      pg.addColorStop(1, this.goal.theme.accent);
      ctx.strokeStyle = this.goal.theme.accent;
      ctx.lineWidth = 14;
      ctx.shadowColor = this.goal.theme.accent;
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.moveTo(padX, pathY);
      ctx.lineTo(padX + pathW * progress, pathY);
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // Mile markers
    ctx.fillStyle = "rgba(255,255,255,0.28)";
    for (let i = 0; i <= 10; i++) {
      const x = padX + (pathW * i) / 10;
      ctx.beginPath();
      ctx.roundRect
        ? ctx.roundRect(x - 2, pathY + 14, 4, 12, 2)
        : ctx.rect(x - 2, pathY + 14, 4, 12);
      ctx.fill();
    }

    this.drawFlag(ctx, padX, pathY - 10, "#94a3b8", "Start");
    this.drawFlag(ctx, padX + pathW, pathY - 10, this.goal.theme.accent, "Done");

    const cx = padX + pathW * progress;
    const walk = Math.sin(this.phase * 4.2);
    const bob = Math.abs(walk) * 3;
    this.drawCharacter(ctx, this.goal.id, cx, pathY - 12 + bob, this.phase);
    this.drawProgressRing(ctx, W - 72, 72, 50, progress, this.goal.theme.accent);
  }

  drawFlag(ctx, x, y, color, label) {
    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.fillRect(x - 1, y - 38, 5, 42);
    ctx.fillStyle = color;
    ctx.fillRect(x - 2, y - 42, 5, 44);
    ctx.beginPath();
    ctx.moveTo(x + 3, y - 42);
    ctx.lineTo(x + 28, y - 32);
    ctx.lineTo(x + 3, y - 22);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.font = "bold 12px Segoe UI, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(label, x + 4, y + 18);
  }

  drawProgressRing(ctx, x, y, r, progress, color) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,255,255,0.12)";
    ctx.lineWidth = 8;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * progress);
    ctx.strokeStyle = color;
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    ctx.shadowColor = color;
    ctx.shadowBlur = 10;
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.fillStyle = "rgba(255,255,255,0.92)";
    ctx.font = "bold 16px Segoe UI, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(Math.round(progress * 100) + "%", x, y);
  }

  drawCharacter(ctx, id, x, y, phase) {
    ctx.save();
    ctx.translate(x, y);
    const leg = Math.sin(phase * 4.2) * 5;

    if (id === "focus") {
      this._figure(ctx, "#38bdf8", "#0ea5e9", leg);
      // Target / focus badge floating
      ctx.save();
      ctx.translate(22, -48 + Math.sin(phase * 2) * 2);
      ctx.strokeStyle = "#fde68a";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, 12, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#fde68a";
      ctx.fill();
      ctx.restore();
    } else if (id === "pair") {
      ctx.save();
      ctx.translate(-16, 0);
      this._figure(ctx, "#c084fc", "#a855f7", leg, 0.88);
      ctx.restore();
      ctx.save();
      ctx.translate(16, 0);
      this._figure(ctx, "#f9a8d4", "#ec4899", -leg, 0.88);
      ctx.restore();
      // Link
      ctx.strokeStyle = "rgba(255,255,255,0.5)";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(-4, -30);
      ctx.quadraticCurveTo(0, -38, 4, -30);
      ctx.stroke();
    } else if (id === "cleanup") {
      this._figure(ctx, "#4ade80", "#22c55e", leg);
      const swing = Math.sin(phase * 3.5) * 0.4;
      ctx.save();
      ctx.translate(18, -14);
      ctx.rotate(swing);
      // Broom handle
      ctx.strokeStyle = "#a8a29e";
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, 40);
      ctx.stroke();
      // Bristles
      const br = ctx.createLinearGradient(-12, 38, 12, 48);
      br.addColorStop(0, "#fbbf24");
      br.addColorStop(1, "#d97706");
      ctx.fillStyle = br;
      ctx.beginPath();
      ctx.moveTo(-12, 38);
      ctx.lineTo(12, 38);
      ctx.lineTo(10, 50);
      ctx.lineTo(-10, 50);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    } else if (id === "transition") {
      ctx.save();
      ctx.translate(Math.sin(phase * 3) * 2, 0);
      this._figure(ctx, "#fbbf24", "#f59e0b", leg);
      // Motion streaks
      ctx.strokeStyle = "rgba(255,255,255,0.35)";
      ctx.lineWidth = 2.5;
      ctx.lineCap = "round";
      for (let i = 0; i < 3; i++) {
        const oy = -28 + i * 10;
        ctx.globalAlpha = 0.45 - i * 0.1;
        ctx.beginPath();
        ctx.moveTo(-34 - i * 4, oy);
        ctx.lineTo(-20 - i * 4, oy);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      ctx.restore();
    } else if (id === "write") {
      this._figure(ctx, "#67e8f9", "#06b6d4", leg * 0.4);
      const bob = Math.sin(phase * 5) * 2.5;
      ctx.save();
      ctx.translate(16, -22 + bob);
      ctx.rotate(-0.55);
      // Pencil body
      const pen = ctx.createLinearGradient(0, 0, 0, 28);
      pen.addColorStop(0, "#fde047");
      pen.addColorStop(1, "#eab308");
      ctx.fillStyle = pen;
      ctx.beginPath();
      ctx.moveTo(0, 4);
      ctx.lineTo(8, 4);
      ctx.lineTo(8, 26);
      ctx.lineTo(4, 32);
      ctx.lineTo(0, 26);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#ef4444";
      ctx.fillRect(0, 0, 8, 6);
      ctx.fillStyle = "#78716c";
      ctx.beginPath();
      ctx.moveTo(0, 26);
      ctx.lineTo(4, 34);
      ctx.lineTo(8, 26);
      ctx.fill();
      ctx.restore();
    } else {
      this._figure(ctx, "#a78bfa", "#8b5cf6", leg);
    }

    ctx.restore();
  }

  /** Soft shaded character with walk cycle */
  _figure(ctx, color, colorDark, leg = 0, scale = 1) {
    ctx.save();
    ctx.scale(scale, scale);

    // Contact shadow
    ctx.fillStyle = "rgba(0,0,0,0.22)";
    ctx.beginPath();
    ctx.ellipse(0, 18, 22, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Legs
    ctx.strokeStyle = colorDark;
    ctx.lineWidth = 7;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(-7, 0);
    ctx.lineTo(-9, 16 + leg);
    ctx.moveTo(7, 0);
    ctx.lineTo(9, 16 - leg);
    ctx.stroke();

    // Body
    const body = ctx.createRadialGradient(-4, -28, 4, 0, -16, 28);
    body.addColorStop(0, color);
    body.addColorStop(1, colorDark);
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.ellipse(0, -16, 16, 22, 0, 0, Math.PI * 2);
    ctx.fill();

    // Head
    const head = ctx.createRadialGradient(-3, -48, 2, 0, -44, 14);
    head.addColorStop(0, color);
    head.addColorStop(1, colorDark);
    ctx.fillStyle = head;
    ctx.beginPath();
    ctx.arc(0, -44, 13, 0, Math.PI * 2);
    ctx.fill();

    // Face
    ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
    ctx.beginPath();
    ctx.arc(-4.5, -45, 2.2, 0, Math.PI * 2);
    ctx.arc(4.5, -45, 2.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(15, 23, 42, 0.7)";
    ctx.lineWidth = 1.5;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.arc(0, -40, 4, 0.15, Math.PI - 0.15);
    ctx.stroke();

    // Arms
    ctx.strokeStyle = colorDark;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(-14, -24);
    ctx.lineTo(-18, -6 + leg * 0.3);
    ctx.moveTo(14, -24);
    ctx.lineTo(18, -6 - leg * 0.3);
    ctx.stroke();

    ctx.restore();
  }

  /**
   * Fuse burns FROM the free end TOWARD the bomb.
   * progress 0 = full fuse; progress 1 = tip at bomb
   */
  drawBombScene(ctx, W, H, progress) {
    const y = H * 0.55;
    const startX = W * 0.12;
    const endX = W * 0.72;
    const fuseLen = endX - startX;
    const tipX = startX + fuseLen * progress;
    const tipY = y + Math.sin(progress * Math.PI * 3) * 18;

    // Soft floor
    const floor = ctx.createLinearGradient(0, y + 40, 0, H);
    floor.addColorStop(0, "rgba(0,0,0,0)");
    floor.addColorStop(1, "rgba(0,0,0,0.4)");
    ctx.fillStyle = floor;
    ctx.fillRect(0, y + 20, W, H - y);

    // Unburned fuse (tip → bomb)
    if (progress < 0.995) {
      ctx.strokeStyle = "#a16207";
      ctx.lineWidth = 6;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(tipX, tipY);
      const segs = 16;
      for (let i = 1; i <= segs; i++) {
        const t = progress + (1 - progress) * (i / segs);
        const fx = startX + fuseLen * t;
        const fy = y + Math.sin(t * Math.PI * 3) * 18;
        ctx.lineTo(fx, fy);
      }
      ctx.stroke();
      // Fuse highlight
      ctx.strokeStyle = "rgba(253, 224, 71, 0.35)";
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Burn tip flame
    if (progress < 0.99) {
      const flicker = 0.85 + Math.sin(this.phase * 14) * 0.15;
      const flame = ctx.createRadialGradient(tipX, tipY - 8, 2, tipX, tipY - 8, 26 * flicker);
      flame.addColorStop(0, "rgba(255, 250, 200, 0.95)");
      flame.addColorStop(0.35, "rgba(251, 146, 60, 0.85)");
      flame.addColorStop(0.7, "rgba(239, 68, 68, 0.45)");
      flame.addColorStop(1, "rgba(239, 68, 68, 0)");
      ctx.fillStyle = flame;
      ctx.beginPath();
      ctx.arc(tipX, tipY - 8, 26 * flicker, 0, Math.PI * 2);
      ctx.fill();

      // Flame core
      ctx.fillStyle = "rgba(254, 243, 199, 0.9)";
      ctx.beginPath();
      ctx.ellipse(tipX, tipY - 10, 5 * flicker, 10 * flicker, 0, 0, Math.PI * 2);
      ctx.fill();

      // Sparks
      ctx.fillStyle = "#fde047";
      for (let i = 0; i < 6; i++) {
        const a = this.phase * 6 + i * 1.1;
        const dist = 10 + (i % 3) * 5;
        ctx.globalAlpha = 0.4 + Math.sin(a) * 0.35;
        ctx.beginPath();
        ctx.arc(
          tipX + Math.cos(a) * dist,
          tipY - 12 + Math.sin(a * 1.4) * dist * 0.5,
          2,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    // Bomb body
    const bx = endX + 52;
    const by = y + 8;
    ctx.save();
    ctx.translate(bx, by);

    // Shadow
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    ctx.beginPath();
    ctx.ellipse(0, 48, 40, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    // Shell
    const shell = ctx.createRadialGradient(-14, -16, 6, 0, 0, 52);
    shell.addColorStop(0, "#4b5563");
    shell.addColorStop(0.55, "#1f2937");
    shell.addColorStop(1, "#111827");
    ctx.fillStyle = shell;
    ctx.beginPath();
    ctx.arc(0, 0, 48, 0, Math.PI * 2);
    ctx.fill();

    // Specular
    ctx.fillStyle = "rgba(255,255,255,0.12)";
    ctx.beginPath();
    ctx.ellipse(-14, -14, 14, 10, -0.4, 0, Math.PI * 2);
    ctx.fill();

    // Cap
    ctx.fillStyle = "#6b7280";
    ctx.beginPath();
    ctx.roundRect
      ? ctx.roundRect(-14, -58, 28, 14, 4)
      : ctx.rect(-14, -58, 28, 14);
    ctx.fill();
    ctx.fillStyle = "#9ca3af";
    ctx.fillRect(-8, -66, 16, 10);

    // Face
    if (progress > 0.7) {
      ctx.strokeStyle = "#f87171";
      ctx.lineWidth = 3.5;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(-16, -10);
      ctx.lineTo(-6, -2);
      ctx.moveTo(-6, -10);
      ctx.lineTo(-16, -2);
      ctx.moveTo(16, -10);
      ctx.lineTo(6, -2);
      ctx.moveTo(6, -10);
      ctx.lineTo(16, -2);
      ctx.stroke();
      ctx.fillStyle = "#f87171";
      ctx.beginPath();
      ctx.ellipse(0, 14, 12, 8, 0, 0.1, Math.PI - 0.1);
      ctx.fill();
    } else {
      ctx.fillStyle = "#fbbf24";
      ctx.beginPath();
      ctx.arc(-12, -4, 6, 0, Math.PI * 2);
      ctx.arc(12, -4, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#111";
      ctx.beginPath();
      ctx.arc(-12, -4, 2.8, 0, Math.PI * 2);
      ctx.arc(12, -4, 2.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#374151";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 10, 8, 0.2, Math.PI - 0.2);
      ctx.stroke();
    }
    ctx.restore();

    this.drawProgressRing(ctx, W - 72, 72, 50, progress, "#fb7185");

    if (progress > 0.85) {
      ctx.fillStyle = "rgba(251,113,133,0.9)";
      ctx.font = "bold 28px Segoe UI, sans-serif";
      ctx.textAlign = "center";
      ctx.shadowColor = "rgba(0,0,0,0.4)";
      ctx.shadowBlur = 8;
      ctx.fillText("HURRY!", W / 2, H * 0.18);
      ctx.shadowBlur = 0;
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
