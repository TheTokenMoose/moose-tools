/**
 * The Quiet Game
 * Mic-driven gorilla vs banana — stay quiet to win.
 */

const W = 960;
const H = 540;

// ─── Mic ─────────────────────────────────────────────────────────────────────

class NoiseMeter {
  constructor() {
    this.ctx = null;
    this.analyser = null;
    this.stream = null;
    this.data = null;
    this.level = 0; // smoothed 0–1
    this.sensitivity = 0.4; // 0–1, higher = more strict
  }

  setSensitivity(percent) {
    // UI: 1–100. Map so higher = stricter (more movement for same sound)
    this.sensitivity = Math.max(0.05, Math.min(1, percent / 100));
  }

  async start() {
    if (this.stream) return;
    this.stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: false,
        autoGainControl: false,
      },
      video: false,
    });
    const AC = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AC();
    if (this.ctx.state === "suspended") await this.ctx.resume();
    const source = this.ctx.createMediaStreamSource(this.stream);
    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 512;
    this.analyser.smoothingTimeConstant = 0.5;
    source.connect(this.analyser);
    this.data = new Uint8Array(this.analyser.frequencyBinCount);
  }

  stop() {
    if (this.stream) {
      this.stream.getTracks().forEach((t) => t.stop());
      this.stream = null;
    }
    if (this.ctx) {
      try {
        this.ctx.close();
      } catch (_) {}
      this.ctx = null;
    }
    this.analyser = null;
    this.level = 0;
  }

  /** Returns 0–1 effective noise after sensitivity. */
  sample() {
    if (!this.analyser || !this.data) {
      this.level = 0;
      return 0;
    }
    this.analyser.getByteTimeDomainData(this.data);
    // RMS of waveform centered at 128
    let sum = 0;
    for (let i = 0; i < this.data.length; i++) {
      const v = (this.data[i] - 128) / 128;
      sum += v * v;
    }
    const rms = Math.sqrt(sum / this.data.length);
    // Typical quiet room ~0.01–0.04; speech higher
    const raw = Math.min(1, rms * 6);
    // Sensitivity: at low sensitivity need more volume to register
    const scaled = Math.pow(raw, 1.1 - this.sensitivity * 0.6) * (0.5 + this.sensitivity);
    const clamped = Math.min(1, Math.max(0, scaled));
    this.level = this.level * 0.65 + clamped * 0.35;
    return this.level;
  }
}

// ─── Game ────────────────────────────────────────────────────────────────────

class QuietGame {
  constructor() {
    this.canvas = document.getElementById("game");
    this.ctx = this.canvas.getContext("2d");
    this.meter = new NoiseMeter();

    this.state = "menu"; // menu | play | win | lose
    this.duration = 120;
    this.remaining = 120;
    this.lastTs = 0;
    this.raf = null;

    // Gorilla path: left → right toward banana
    this.gorillaX = 0.18; // normalized 0–1 along path
    this.bananaX = 0.88;
    this.winThreshold = 0.82; // if gorilla gets this far, lose
    this.coverEyes = true;
    this.dancePhase = 0;
    this.leafPhase = 0;
    this.status = "Shhh… the gorilla is listening.";

    this.els = {
      menu: document.getElementById("screen-menu"),
      play: document.getElementById("screen-play"),
      result: document.getElementById("screen-result"),
      time: document.getElementById("time-display"),
      noiseBar: document.getElementById("noise-bar"),
      status: document.getElementById("status-line"),
      sens: document.getElementById("sensitivity"),
      sensLabel: document.getElementById("sens-label"),
      timerSelect: document.getElementById("timer-select"),
      micError: document.getElementById("mic-error"),
      resultEmoji: document.getElementById("result-emoji"),
      resultTitle: document.getElementById("result-title"),
      resultMsg: document.getElementById("result-msg"),
    };

    document.getElementById("start-btn").addEventListener("click", () => this.start());
    document.getElementById("quit-btn").addEventListener("click", () => this.quitToMenu());
    document.getElementById("again-btn").addEventListener("click", () => this.start());
    document.getElementById("new-timer-btn").addEventListener("click", () => this.showMenu());

    this.els.sens.addEventListener("input", () => this.updateSensLabel());
    this.updateSensLabel();
  }

  updateSensLabel() {
    const v = parseInt(this.els.sens.value, 10);
    let label = "Normal";
    if (v <= 25) label = "Relaxed";
    else if (v <= 45) label = "Normal";
    else if (v <= 70) label = "Strict";
    else label = "Very strict";
    this.els.sensLabel.textContent = `${label} (${v})`;
    this.meter.setSensitivity(v);
  }

  show(screen) {
    this.els.menu.hidden = screen !== "menu";
    this.els.play.hidden = screen !== "play";
    this.els.result.hidden = screen !== "result";
  }

  showMenu() {
    this.stopLoop();
    this.meter.stop();
    this.state = "menu";
    this.show("menu");
    this.els.micError.hidden = true;
  }

  async start() {
    this.els.micError.hidden = true;
    this.updateSensLabel();
    this.duration = parseInt(this.els.timerSelect.value, 10) || 120;
    this.remaining = this.duration;
    this.gorillaX = 0.18;
    this.coverEyes = true;
    this.dancePhase = 0;
    this.status = "Shhh… the gorilla is listening.";

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Microphone not supported in this browser.");
      }
      await this.meter.start();
    } catch (err) {
      this.els.micError.hidden = false;
      this.els.micError.textContent =
        "Could not access the microphone. Allow mic permission and try again. (" +
        (err && err.message ? err.message : "blocked") +
        ")";
      return;
    }

    this.state = "play";
    this.show("play");
    this.lastTs = performance.now();
    this.loop(this.lastTs);
  }

  quitToMenu() {
    this.showMenu();
  }

  stopLoop() {
    if (this.raf) {
      cancelAnimationFrame(this.raf);
      this.raf = null;
    }
  }

  end(win) {
    this.stopLoop();
    this.meter.stop();
    this.state = win ? "win" : "lose";
    this.show("result");
    if (win) {
      this.els.resultEmoji.textContent = "🍌✨";
      this.els.resultTitle.textContent = "Banana escapes!";
      this.els.resultMsg.textContent =
        "The class stayed quiet long enough. The banana got away — great teamwork!";
    } else {
      this.els.resultEmoji.textContent = "🦍🍌";
      this.els.resultTitle.textContent = "Oh no — he got it!";
      this.els.resultMsg.textContent =
        "The gorilla heard the noise and stole the banana. Try again, a little quieter.";
    }
  }

  loop(ts) {
    if (this.state !== "play") return;
    const dt = Math.min(0.05, (ts - this.lastTs) / 1000);
    this.lastTs = ts;

    const noise = this.meter.sample();
    this.els.noiseBar.style.width = `${Math.round(noise * 100)}%`;

    // Quiet threshold: below this, eyes covered and no move
    const quietCut = 0.12 + (1 - this.meter.sensitivity) * 0.08;
    this.coverEyes = noise < quietCut;

    if (!this.coverEyes) {
      // Move toward banana; speed scales with noise
      const speed = 0.015 + noise * 0.12; // fraction of path per second
      this.gorillaX += speed * dt;
      this.status = noise > 0.55 ? "Too loud! He’s running!" : "Getting noisy… he’s peeking!";
    } else {
      this.status = "Shhh… eyes covered. He’s waiting.";
    }

    this.dancePhase += dt * (this.coverEyes ? 1.2 : 4 + noise * 8);
    this.leafPhase += dt * 0.8;
    this.remaining -= dt;

    if (this.gorillaX >= this.winThreshold) {
      this.gorillaX = this.winThreshold;
      this.draw();
      this.end(false);
      return;
    }
    if (this.remaining <= 0) {
      this.remaining = 0;
      this.draw();
      this.end(true);
      return;
    }

    this.els.time.textContent = formatTime(this.remaining);
    this.els.status.textContent = this.status;
    this.draw();
    this.raf = requestAnimationFrame((t) => this.loop(t));
  }

  // ── Drawing ──────────────────────────────────────────────────────────────

  draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, W, H);
    this.drawBackground(ctx);
    this.drawBanana(ctx);
    this.drawGorilla(ctx);
    this.drawGroundDecor(ctx);
  }

  drawBackground(ctx) {
    // Sky gradient
    const sky = ctx.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, "#7ec8e3");
    sky.addColorStop(0.55, "#b8e0f0");
    sky.addColorStop(0.55, "#5d9c6a");
    sky.addColorStop(1, "#3d7a4a");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H);

    // Soft hills
    ctx.fillStyle = "#4a9b5c";
    ctx.beginPath();
    ctx.moveTo(0, H * 0.58);
    ctx.quadraticCurveTo(W * 0.25, H * 0.48, W * 0.5, H * 0.56);
    ctx.quadraticCurveTo(W * 0.75, H * 0.64, W, H * 0.52);
    ctx.lineTo(W, H);
    ctx.lineTo(0, H);
    ctx.fill();

    ctx.fillStyle = "#3d7a4a";
    ctx.beginPath();
    ctx.moveTo(0, H * 0.72);
    ctx.quadraticCurveTo(W * 0.3, H * 0.66, W * 0.55, H * 0.74);
    ctx.quadraticCurveTo(W * 0.8, H * 0.8, W, H * 0.7);
    ctx.lineTo(W, H);
    ctx.lineTo(0, H);
    ctx.fill();

    // Sun
    ctx.beginPath();
    ctx.arc(W * 0.85, H * 0.14, 42, 0, Math.PI * 2);
    ctx.fillStyle = "#ffe66d";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(W * 0.85, H * 0.14, 54, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 230, 109, 0.25)";
    ctx.fill();

    // Clouds
    this.cloud(ctx, 120 + Math.sin(this.leafPhase) * 8, 70, 1);
    this.cloud(ctx, 400, 100, 0.85);
    this.cloud(ctx, 680, 60, 1.1);
  }

  cloud(ctx, x, y, s) {
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.beginPath();
    ctx.arc(x, y, 22 * s, 0, Math.PI * 2);
    ctx.arc(x + 28 * s, y - 8 * s, 26 * s, 0, Math.PI * 2);
    ctx.arc(x + 56 * s, y, 20 * s, 0, Math.PI * 2);
    ctx.arc(x + 28 * s, y + 10 * s, 18 * s, 0, Math.PI * 2);
    ctx.fill();
  }

  drawBanana(ctx) {
    const x = this.bananaX * W;
    const y = H * 0.62;
    const bob = Math.sin(this.leafPhase * 2.2) * 6;

    // Tree trunk / perch
    ctx.fillStyle = "#6b4226";
    ctx.fillRect(x - 8, y - 20, 16, 90);
    ctx.fillStyle = "#2d6a4f";
    ctx.beginPath();
    ctx.ellipse(x, y - 30, 70, 28, 0, 0, Math.PI * 2);
    ctx.fill();

    // Banana
    ctx.save();
    ctx.translate(x + 30, y - 10 + bob);
    ctx.rotate(-0.4 + Math.sin(this.leafPhase * 1.5) * 0.08);
    ctx.fillStyle = "#ffe66d";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(28, 8, 36, 40);
    ctx.quadraticCurveTo(18, 36, 4, 28);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#e9c46a";
    ctx.lineWidth = 2;
    ctx.stroke();
    // Stem
    ctx.fillStyle = "#6b4226";
    ctx.fillRect(-4, -8, 8, 10);
    ctx.restore();

    // Sparkle if close to win
    if (this.remaining < 15 && this.state === "play") {
      ctx.fillStyle = "rgba(255,255,255,0.8)";
      ctx.font = "20px sans-serif";
      ctx.fillText("✨", x + 50, y - 40 + bob);
    }
  }

  drawGorilla(ctx) {
    const x = this.gorillaX * W;
    const groundY = H * 0.78;
    const bounce = this.coverEyes
      ? Math.sin(this.dancePhase) * 3
      : Math.abs(Math.sin(this.dancePhase)) * 12;
    const armSwing = this.coverEyes ? 0.15 : Math.sin(this.dancePhase) * 0.6;

    ctx.save();
    ctx.translate(x, groundY - bounce);

    // Shadow
    ctx.fillStyle = "rgba(0,0,0,0.18)";
    ctx.beginPath();
    ctx.ellipse(0, 8, 48, 12, 0, 0, Math.PI * 2);
    ctx.fill();

    // Legs
    ctx.fillStyle = "#4a3728";
    ctx.fillRect(-28, -20, 18, 28);
    ctx.fillRect(10, -20, 18, 28);

    // Body
    ctx.beginPath();
    ctx.ellipse(0, -55, 42, 48, 0, 0, Math.PI * 2);
    ctx.fillStyle = "#5c4033";
    ctx.fill();

    // Belly
    ctx.beginPath();
    ctx.ellipse(0, -48, 24, 28, 0, 0, Math.PI * 2);
    ctx.fillStyle = "#a67c52";
    ctx.fill();

    // Arms
    ctx.strokeStyle = "#5c4033";
    ctx.lineWidth = 16;
    ctx.lineCap = "round";
    // Left arm
    ctx.beginPath();
    ctx.moveTo(-30, -70);
    if (this.coverEyes) {
      ctx.quadraticCurveTo(-50, -100, -18, -108);
    } else {
      ctx.quadraticCurveTo(-55, -60 + armSwing * 40, -40, -20 + armSwing * 20);
    }
    ctx.stroke();
    // Right arm
    ctx.beginPath();
    ctx.moveTo(30, -70);
    if (this.coverEyes) {
      ctx.quadraticCurveTo(50, -100, 18, -108);
    } else {
      ctx.quadraticCurveTo(55, -60 - armSwing * 40, 40, -20 - armSwing * 20);
    }
    ctx.stroke();

    // Head
    ctx.beginPath();
    ctx.ellipse(0, -105, 32, 30, 0, 0, Math.PI * 2);
    ctx.fillStyle = "#5c4033";
    ctx.fill();

    // Face
    ctx.beginPath();
    ctx.ellipse(0, -100, 20, 18, 0, 0, Math.PI * 2);
    ctx.fillStyle = "#c4a574";
    ctx.fill();

    if (this.coverEyes) {
      // Hands covering eyes
      ctx.fillStyle = "#5c4033";
      ctx.beginPath();
      ctx.ellipse(-12, -108, 12, 10, -0.3, 0, Math.PI * 2);
      ctx.ellipse(12, -108, 12, 10, 0.3, 0, Math.PI * 2);
      ctx.fill();
      // Smile (peaceful)
      ctx.strokeStyle = "#4a3728";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, -94, 8, 0.1, Math.PI - 0.1);
      ctx.stroke();
    } else {
      // Eyes open — mischievous
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.ellipse(-10, -106, 7, 8, 0, 0, Math.PI * 2);
      ctx.ellipse(10, -106, 7, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#222";
      ctx.beginPath();
      ctx.arc(-9, -105, 3.5, 0, Math.PI * 2);
      ctx.arc(11, -105, 3.5, 0, Math.PI * 2);
      ctx.fill();
      // Grin
      ctx.fillStyle = "#4a3728";
      ctx.beginPath();
      ctx.ellipse(0, -90, 12, 7, 0, 0, Math.PI);
      ctx.fill();
    }

    ctx.restore();
  }

  drawGroundDecor(ctx) {
    // Grass tufts along path
    ctx.strokeStyle = "#2d6a4f";
    ctx.lineWidth = 2;
    for (let i = 0; i < 18; i++) {
      const gx = 40 + i * 52 + Math.sin(this.leafPhase + i) * 4;
      const gy = H * 0.82 + (i % 3) * 8;
      ctx.beginPath();
      ctx.moveTo(gx, gy);
      ctx.quadraticCurveTo(gx - 4, gy - 14, gx + 2, gy - 18);
      ctx.moveTo(gx, gy);
      ctx.quadraticCurveTo(gx + 6, gy - 12, gx + 4, gy - 16);
      ctx.stroke();
    }
  }
}

function formatTime(sec) {
  const s = Math.max(0, Math.ceil(sec));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, "0")}`;
}

document.addEventListener("DOMContentLoaded", () => {
  new QuietGame();
});
