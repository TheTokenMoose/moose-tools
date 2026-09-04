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

  /** Boom: prefers audio/explosion.mp3 then .wav, else procedural */
  playBoom() {
    if (!this.enabled) return;
    const tryPlay = (src) => {
      try {
        const a = new Audio(src);
        a.loop = false;
        a.volume = 0.9;
        const p = a.play();
        if (p && p.catch) p.catch(() => this._proceduralBoom());
        return true;
      } catch (_) {
        return false;
      }
    };
    if (tryPlay("audio/explosion.mp3")) return;
    if (tryPlay("audio/explosion.wav")) return;
    this._proceduralBoom();
  }

  _proceduralBoom() {
    const ctx = this.ensure();
    if (!ctx) return;
    const t0 = ctx.currentTime;
    const osc = ctx.createOscillator();
    const og = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(140, t0);
    osc.frequency.exponentialRampToValueAtTime(35, t0 + 0.45);
    og.gain.setValueAtTime(0.0001, t0);
    og.gain.exponentialRampToValueAtTime(0.65, t0 + 0.02);
    og.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.7);
    osc.connect(og);
    og.connect(this.master);
    osc.start(t0);
    osc.stop(t0 + 0.75);

    const len = Math.floor(ctx.sampleRate * 0.55);
    const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < len; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.1));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(0.5, t0);
    ng.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.55);
    const filt = ctx.createBiquadFilter();
    filt.type = "lowpass";
    filt.frequency.value = 1200;
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
    this.exploding = false;
    this.explosionT = 0;
    this.explosionDone = false;
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
    document.getElementById("btn-rewind").addEventListener("click", () => this.adjustTime(15));
    document.getElementById("btn-ff").addEventListener("click", () => this.adjustTime(-15));

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

  /** deltaSec > 0 adds time; < 0 skips ahead */
  adjustTime(deltaSec) {
    if (this.state !== "run") return;
    const maxRemain = Math.max(this.duration + 600, this.remaining + 600); // allow extra time
    this.remaining = Math.min(maxRemain, Math.max(0, this.remaining + deltaSec));
    this._syncClockDisplay();
    this.draw(performance.now());
    if (this.remaining <= 0) {
      this.remaining = 0;
      this.finish();
    }
  }

  _syncClockDisplay() {
    const el = this.els.runClock;
    if (!el) return;
    el.textContent = formatTime(this.remaining);
    el.classList.remove("is-warn", "is-critical");
    if (this.remaining <= 10) el.classList.add("is-critical");
    else if (this.remaining <= 30) el.classList.add("is-warn");
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
    this.exploding = false;
    this.explosionT = 0;
    this.explosionDone = false;
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
    this.explosionDone = false;
    this.exploding = false;
    this.explosionT = 0;
    this.running = true;
    this.paused = false;
    this.phase = 0;
    this.els.btnPause.textContent = "Pause";
    this.show("run");
    this.els.runGoal.textContent = `${this.goal.emoji} ${this.goal.name}`;
    this.els.runHint.textContent = this.goal.hint;
    this._syncClockDisplay();
    this._resizeCanvas();
    this.audio.ensure();
    this.audio.startMusic();
    this.lastTs = performance.now();
    this.loop(this.lastTs);
  }

  restart() {
    this.stopLoop();
    this.remaining = this.duration;
    this.explosionDone = false;
    this.exploding = false;
    this.explosionT = 0;
    this.running = true;
    this.paused = false;
    this.phase = 0;
    this.els.btnPause.textContent = "Pause";
    this.show("run");
    this.els.runGoal.textContent = `${this.goal.emoji} ${this.goal.name}`;
    this.els.runHint.textContent = this.goal.hint;
    this._syncClockDisplay();
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
    this.audio.stopMusic();
    if (this.goal.bomb && !this.explosionDone) {
      if (!this.exploding) {
        this.exploding = true;
        this.explosionT = 0;
        this.running = true;
        this.paused = false;
        this.audio.playBoom();
        this.lastTs = performance.now();
        this.loop(this.lastTs);
        return;
      }
      this.explosionDone = true;
      this.exploding = false;
    }
    this.stopLoop();
    this.running = false;
    this.paused = false;
    this.exploding = false;
    this.show("done");
    if (this.goal.bomb) {
      this.els.doneEmoji.textContent = "💥";
      this.els.doneTitle.textContent = "Time’s up!";
      this.els.doneMsg.textContent = "Pencils down / answers ready!";
    } else {
      this.audio.playChime();
      this.els.doneEmoji.textContent = "✅";
      this.els.doneTitle.textContent = "Time’s up!";
      this.els.doneMsg.textContent = `${this.goal.name} session complete. Nice work.`;
    }
  }

  loop(ts) {
    if (!this.running) return;
    const dt = Math.min(0.05, (ts - this.lastTs) / 1000);
    this.lastTs = ts;
    this.phase += dt;

    if (this.exploding) {
      this.explosionT += dt;
      this.draw(ts);
      if (this.explosionT >= 2.8) {
        this.finish();
        return;
      }
      this.raf = requestAnimationFrame((t) => this.loop(t));
      return;
    }

    if (this.paused) return;
    this.remaining -= dt;
    this._syncClockDisplay();
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
    g.addColorStop(1, this.goal.theme.sky[1]);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

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

    if (this.exploding) {
      this.drawBombScene(ctx, W, H, 1);
      this.drawExplosion(ctx, W, H, this.explosionT);
    } else if (this.goal.bomb) {
      this.drawBombScene(ctx, W, H, progress);
      this.drawStageClock(ctx, W, H);
    } else {
      this.drawPathScene(ctx, W, H, progress);
      this.drawStageClock(ctx, W, H);
    }

    if (this.paused && !this.exploding) {
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "#fef3c7";
      ctx.font = "bold 42px Segoe UI, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("PAUSED", W / 2, H / 2);
    }
  }

  drawExplosion(ctx, W, H, t) {
    const bx = W * 0.78;
    const by = H * 0.48;
    const pieces = [
      { ang: 0.2, spd: 140, spin: 3.2, w: 28, h: 22, col: "#1f2937", shape: "chunk" },
      { ang: 1.1, spd: 160, spin: -2.5, w: 22, h: 18, col: "#374151", shape: "chunk" },
      { ang: 2.0, spd: 130, spin: 4.1, w: 18, h: 16, col: "#1f2937", shape: "chunk" },
      { ang: 2.8, spd: 175, spin: -3.0, w: 20, h: 14, col: "#4b5563", shape: "chunk" },
      { ang: 3.6, spd: 150, spin: 2.2, w: 24, h: 20, col: "#1f2937", shape: "chunk" },
      { ang: 4.4, spd: 120, spin: -4.0, w: 16, h: 16, col: "#6b7280", shape: "post" },
      { ang: 5.2, spd: 145, spin: 2.8, w: 14, h: 12, col: "#9ca3af", shape: "post" },
      { ang: 5.9, spd: 110, spin: -1.5, w: 12, h: 10, col: "#fbbf24", shape: "eye" },
      { ang: 0.7, spd: 100, spin: 1.8, w: 12, h: 10, col: "#fbbf24", shape: "eye" },
      { ang: 4.0, spd: 190, spin: 5.0, w: 10, h: 8, col: "#f87171", shape: "spark" },
      { ang: 1.6, spd: 200, spin: -4.5, w: 9, h: 9, col: "#fb923c", shape: "spark" },
      { ang: 3.2, spd: 185, spin: 3.5, w: 8, h: 8, col: "#fde047", shape: "spark" }
    ];

    const flash = Math.max(0, 1 - t * 1.8);
    if (flash > 0) {
      ctx.fillStyle = "rgba(255, 248, 200, " + (0.7 * flash) + ")";
      ctx.fillRect(0, 0, W, H);
    }

    const shake = t < 0.5 ? (Math.random() - 0.5) * 16 * (1 - t / 0.5) : 0;
    ctx.save();
    ctx.translate(shake, shake * 0.5);

    for (let i = 0; i < 4; i++) {
      const age = t - i * 0.07;
      if (age < 0) continue;
      const r = 18 + age * 160;
      const a = Math.max(0, 0.65 - age * 0.5);
      ctx.strokeStyle = "rgba(251, 146, 60, " + a + ")";
      ctx.lineWidth = 8 - i;
      ctx.beginPath();
      ctx.arc(bx, by, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    if (t < 0.08) {
      ctx.save();
      ctx.translate(bx, by);
      ctx.fillStyle = "#1f2937";
      ctx.beginPath();
      ctx.arc(0, 0, 48, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#6b7280";
      ctx.fillRect(-12, -58, 24, 14);
      ctx.restore();
    } else {
      const grav = 220;
      for (let i = 0; i < pieces.length; i++) {
        const pc = pieces[i];
        const life = Math.min(1, t / 2.2);
        const dist = pc.spd * t;
        const px = bx + Math.cos(pc.ang) * dist;
        const py = by + Math.sin(pc.ang) * dist + 0.5 * grav * t * t;
        const rot = pc.spin * t;
        const alpha = Math.max(0, 1 - life * 0.85);
        if (alpha <= 0.02) continue;
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(rot);
        ctx.globalAlpha = alpha;
        if (pc.shape === "chunk") {
          ctx.fillStyle = pc.col;
          ctx.beginPath();
          ctx.moveTo(-pc.w / 2, -pc.h / 2);
          ctx.lineTo(pc.w / 2, -pc.h / 3);
          ctx.lineTo(pc.w / 3, pc.h / 2);
          ctx.lineTo(-pc.w / 3, pc.h / 2);
          ctx.closePath();
          ctx.fill();
        } else if (pc.shape === "post") {
          ctx.fillStyle = pc.col;
          ctx.fillRect(-pc.w / 2, -pc.h / 2, pc.w, pc.h);
        } else if (pc.shape === "eye") {
          ctx.fillStyle = pc.col;
          ctx.beginPath();
          ctx.arc(0, 0, pc.w / 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#111";
          ctx.beginPath();
          ctx.arc(0, 0, pc.w / 4, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = pc.col;
          ctx.beginPath();
          ctx.arc(0, 0, pc.w / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    }

    for (let i = 0; i < 20; i++) {
      const ang = (i / 20) * Math.PI * 2 + t * 0.8;
      const dist = 40 + t * (100 + (i % 4) * 30);
      const px = bx + Math.cos(ang) * dist;
      const py = by + Math.sin(ang) * dist - t * 50;
      const a = Math.max(0, 1 - t * 0.5);
      ctx.globalAlpha = a;
      ctx.fillStyle = i % 2 ? "#fde047" : "#fb923c";
      ctx.beginPath();
      ctx.arc(px, py, 3 + (i % 3), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    for (let i = 0; i < 12; i++) {
      const a = Math.max(0, 0.4 - t * 0.12);
      ctx.fillStyle = "rgba(70, 70, 80, " + a + ")";
      ctx.beginPath();
      ctx.arc(bx + (i - 6) * 16 + Math.sin(t + i) * 8, by - 10 - t * 55 - i * 3, 16 + t * 28, 0, Math.PI * 2);
      ctx.fill();
    }

    if (t > 0.12 && t < 1.5) {
      ctx.globalAlpha = Math.max(0, 1 - (t - 0.12) * 0.8);
      ctx.fillStyle = "#fef3c7";
      ctx.font = "900 " + Math.min(64, W * 0.09) + "px Segoe UI, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("BOOM!", W / 2, H * 0.22);
      ctx.globalAlpha = 1;
    }

    ctx.restore();
  }

  drawStageClock(ctx, W, H) {
    const label = formatTime(this.remaining);
    const fontSize = Math.max(40, Math.min(W * 0.12, H * 0.16));
    const cy = H * 0.88;
    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "900 " + fontSize + "px Segoe UI, system-ui, sans-serif";
    ctx.fillStyle = "rgba(0,0,0,0.45)";
    ctx.fillText(label, W / 2 + 3, cy + 3);
    if (this.remaining <= 10) ctx.fillStyle = "#fb7185";
    else if (this.remaining <= 30) ctx.fillStyle = "#fbbf24";
    else ctx.fillStyle = "#fef9c3";
    ctx.fillText(label, W / 2, cy);
    ctx.font = "700 " + Math.max(11, fontSize * 0.2) + "px Segoe UI, system-ui, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.75)";
    ctx.fillText("REMAINING", W / 2, cy - fontSize * 0.55);
    ctx.restore();
  }

  drawPathScene(ctx, W, H, progress) {
    const padX = W * 0.08;
    const pathY = H * 0.62;
    const pathW = W - padX * 2;

    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.fillRect(0, pathY + 20, W, H - pathY);

    ctx.strokeStyle = this.goal.theme.path;
    ctx.lineWidth = 14;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(padX, pathY);
    ctx.lineTo(padX + pathW, pathY);
    ctx.stroke();

    ctx.strokeStyle = this.goal.theme.accent;
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(padX, pathY);
    ctx.lineTo(padX + pathW * progress, pathY);
    ctx.stroke();

    ctx.fillStyle = "rgba(255,255,255,0.25)";
    for (let i = 0; i <= 10; i++) {
      const x = padX + (pathW * i) / 10;
      ctx.fillRect(x - 1, pathY + 16, 2, 10);
    }

    this.drawFlag(ctx, padX, pathY - 8, "#94a3b8", "Start");
    this.drawFlag(ctx, padX + pathW, pathY - 8, this.goal.theme.accent, "Done");

    const cx = padX + pathW * progress;
    const bob = Math.sin(this.phase * 6) * 4;
    this.drawCharacter(ctx, this.goal.id, cx, pathY - 10 + bob, this.phase);
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
      this._body(ctx, "#38bdf8");
      ctx.fillStyle = "#fef3c7";
      ctx.fillRect(10, -28, 18, 14);
      ctx.strokeStyle = "#92400e";
      ctx.strokeRect(10, -28, 18, 14);
    } else if (id === "pair") {
      ctx.translate(-14, 0);
      this._body(ctx, "#c084fc", 0.85);
      ctx.translate(28, 0);
      this._body(ctx, "#f9a8d4", 0.85);
    } else if (id === "cleanup") {
      this._body(ctx, "#4ade80");
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
      ctx.rotate(Math.sin(phase * 8) * 0.08);
      this._body(ctx, "#fbbf24");
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
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(0, -18, 14, 20, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(0, -44, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#0f172a";
    ctx.beginPath();
    ctx.arc(-4, -46, 2, 0, Math.PI * 2);
    ctx.arc(4, -46, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  /**
   * Fuse burns FROM free end TOWARD bomb fuse-post on top of the bomb.
   * progress 0 = full fuse; progress 1 = burned to the bomb.
   */
  drawBombScene(ctx, W, H, progress) {
    ctx.fillStyle = "rgba(0,0,0,0.35)";
    ctx.fillRect(0, H * 0.7, W, H * 0.3);

    // Bomb body position (shared with explosion)
    const bx = W * 0.78;
    const by = H * 0.48;
    // Fuse attaches to the top of the metal fuse post
    const fuseEndX = bx;
    const fuseEndY = by - 62;
    const startX = W * 0.1;
    const startY = H * 0.5;

    // Arc fuse path: quadratic from free end to bomb top
    const fusePoint = (t) => {
      // control point for a gentle arch
      const cpx = (startX + fuseEndX) / 2;
      const cpy = Math.min(startY, fuseEndY) - H * 0.14;
      const u = 1 - t;
      const x = u * u * startX + 2 * u * t * cpx + t * t * fuseEndX;
      const y = u * u * startY + 2 * u * t * cpy + t * t * fuseEndY;
      return { x, y };
    };

    const tipT = Math.min(1, Math.max(0, progress));
    const steps = 72;
    ctx.lineWidth = 9;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#a8a29e";
    ctx.beginPath();
    let started = false;
    for (let i = Math.floor(steps * tipT); i <= steps; i++) {
      const p = fusePoint(i / steps);
      if (!started) {
        ctx.moveTo(p.x, p.y);
        started = true;
      } else ctx.lineTo(p.x, p.y);
    }
    if (started) ctx.stroke();

    // Burn tip
    const tip = fusePoint(tipT);
    if (progress < 0.995 && !this.exploding) {
      const flicker = 1 + Math.sin(this.phase * 22) * 0.18;
      const grd = ctx.createRadialGradient(tip.x, tip.y, 0, tip.x, tip.y, 24 * flicker);
      grd.addColorStop(0, "#fef08a");
      grd.addColorStop(0.4, "#fb923c");
      grd.addColorStop(1, "rgba(239,68,68,0)");
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(tip.x, tip.y, 22 * flicker, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#fde047";
      for (let i = 0; i < 8; i++) {
        const a = this.phase * 9 + i;
        ctx.globalAlpha = 0.45 + Math.sin(a) * 0.4;
        ctx.beginPath();
        ctx.arc(
          tip.x + Math.cos(a) * (10 + (i % 3) * 5),
          tip.y + Math.sin(a * 1.2) * 8 - 6,
          2.2,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    // Bomb (hidden mid-explosion flash)
    if (!this.exploding || this.explosionT < 0.12) {
      ctx.save();
      ctx.translate(bx, by);
      ctx.fillStyle = "#1f2937";
      ctx.beginPath();
      ctx.arc(0, 0, 48, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#374151";
      ctx.beginPath();
      ctx.arc(-12, -12, 14, 0, Math.PI * 2);
      ctx.fill();
      // Fuse post — top aligns with fuseEndY (by - 62)
      ctx.fillStyle = "#6b7280";
      ctx.fillRect(-12, -58, 24, 14);
      ctx.fillStyle = "#9ca3af";
      ctx.fillRect(-7, -66, 14, 10);
      // stub of fuse into post
      ctx.strokeStyle = "#a8a29e";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(0, -66);
      ctx.lineTo(0, -72);
      ctx.stroke();

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
    }

    this.drawProgressRing(ctx, W - 70, 70, 48, progress, "#fb7185");

    if (progress > 0.85 && !this.exploding) {
      ctx.fillStyle = "rgba(251,113,133,0.9)";
      ctx.font = "bold 26px Segoe UI, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("HURRY!", W / 2, H * 0.74);
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
