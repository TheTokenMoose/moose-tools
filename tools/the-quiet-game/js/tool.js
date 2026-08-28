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
      const speed = 0.012 + noise * 0.09; // fraction of path per second
      this.gorillaX += speed * dt;
      this.status = noise > 0.55 ? "Too loud! He’s running!" : "Getting noisy… he’s peeking!";
    } else {
      this.status = "Shhh… eyes covered. He’s waiting.";
    }

    // Calm breathing when quiet; weighty sway when noisy (not frantic)
    this.dancePhase += dt * (this.coverEyes ? 0.9 : 1.6 + noise * 2.2);
    this.leafPhase += dt * 0.45;
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

  // ── Drawing (polished scene) ───────────────────────────────────────────

  draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, W, H);
    this.drawBackground(ctx);
    this.drawBanana(ctx);
    this.drawGorilla(ctx);
    this.drawGroundDecor(ctx);
  }

  drawBackground(ctx) {
    // Soft atmospheric sky
    const sky = ctx.createLinearGradient(0, 0, 0, H * 0.62);
    sky.addColorStop(0, "#9ec9e8");
    sky.addColorStop(0.45, "#c5dff0");
    sky.addColorStop(1, "#d8ebe3");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H * 0.62);

    // Distant haze band
    const haze = ctx.createLinearGradient(0, H * 0.48, 0, H * 0.62);
    haze.addColorStop(0, "rgba(180, 210, 190, 0)");
    haze.addColorStop(1, "rgba(120, 160, 130, 0.35)");
    ctx.fillStyle = haze;
    ctx.fillRect(0, H * 0.48, W, H * 0.14);

    // Far hills — muted
    ctx.fillStyle = "#6a9e78";
    ctx.beginPath();
    ctx.moveTo(0, H * 0.58);
    ctx.bezierCurveTo(W * 0.2, H * 0.5, W * 0.4, H * 0.6, W * 0.55, H * 0.54);
    ctx.bezierCurveTo(W * 0.72, H * 0.48, W * 0.88, H * 0.58, W, H * 0.52);
    ctx.lineTo(W, H);
    ctx.lineTo(0, H);
    ctx.fill();

    // Near meadow
    const grass = ctx.createLinearGradient(0, H * 0.62, 0, H);
    grass.addColorStop(0, "#5a9a68");
    grass.addColorStop(0.5, "#4a8658");
    grass.addColorStop(1, "#3a6f48");
    ctx.fillStyle = grass;
    ctx.beginPath();
    ctx.moveTo(0, H * 0.68);
    ctx.bezierCurveTo(W * 0.25, H * 0.64, W * 0.5, H * 0.72, W * 0.75, H * 0.66);
    ctx.bezierCurveTo(W * 0.9, H * 0.63, W, H * 0.68, W, H * 0.68);
    ctx.lineTo(W, H);
    ctx.lineTo(0, H);
    ctx.fill();

    // Soft sun with glow (no hard circle edge feel)
    const sx = W * 0.82;
    const sy = H * 0.16;
    const sunGlow = ctx.createRadialGradient(sx, sy, 8, sx, sy, 70);
    sunGlow.addColorStop(0, "rgba(255, 236, 170, 0.95)");
    sunGlow.addColorStop(0.35, "rgba(255, 220, 120, 0.45)");
    sunGlow.addColorStop(1, "rgba(255, 220, 120, 0)");
    ctx.fillStyle = sunGlow;
    ctx.beginPath();
    ctx.arc(sx, sy, 70, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(sx, sy, 28, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 244, 200, 0.9)";
    ctx.fill();

    // Soft clouds
    this.cloud(ctx, 110 + Math.sin(this.leafPhase * 0.7) * 12, 78, 1);
    this.cloud(ctx, 420 + Math.cos(this.leafPhase * 0.5) * 6, 105, 0.9);
    this.cloud(ctx, 700, 68, 1.05);
  }

  cloud(ctx, x, y, s) {
    ctx.fillStyle = "rgba(255, 255, 255, 0.72)";
    ctx.beginPath();
    ctx.arc(x, y, 20 * s, 0, Math.PI * 2);
    ctx.arc(x + 26 * s, y - 6 * s, 24 * s, 0, Math.PI * 2);
    ctx.arc(x + 52 * s, y, 18 * s, 0, Math.PI * 2);
    ctx.arc(x + 26 * s, y + 8 * s, 16 * s, 0, Math.PI * 2);
    ctx.fill();
  }

  drawBanana(ctx) {
    const x = this.bananaX * W;
    const y = H * 0.62;
    const bob = Math.sin(this.leafPhase * 1.4) * 3;

    // Soft canopy (blur-like layered ellipses)
    ctx.fillStyle = "rgba(40, 90, 55, 0.55)";
    ctx.beginPath();
    ctx.ellipse(x, y - 28 + bob * 0.3, 78, 32, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#3d7a4f";
    ctx.beginPath();
    ctx.ellipse(x - 10, y - 34 + bob * 0.3, 40, 22, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(x + 18, y - 30 + bob * 0.3, 36, 20, 0.25, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#4f9460";
    ctx.beginPath();
    ctx.ellipse(x + 4, y - 38 + bob * 0.3, 28, 16, 0, 0, Math.PI * 2);
    ctx.fill();

    // Trunk
    const trunk = ctx.createLinearGradient(x - 10, y - 20, x + 10, y + 70);
    trunk.addColorStop(0, "#8b6914");
    trunk.addColorStop(1, "#5c4010");
    ctx.fillStyle = trunk;
    ctx.beginPath();
    ctx.moveTo(x - 9, y - 18);
    ctx.lineTo(x + 9, y - 18);
    ctx.lineTo(x + 12, y + 72);
    ctx.lineTo(x - 12, y + 72);
    ctx.closePath();
    ctx.fill();

    // Banana with gradient + highlight
    ctx.save();
    ctx.translate(x + 28, y - 6 + bob);
    ctx.rotate(-0.35 + Math.sin(this.leafPhase * 1.1) * 0.04);
    const ban = ctx.createLinearGradient(0, 0, 30, 40);
    ban.addColorStop(0, "#ffe566");
    ban.addColorStop(0.55, "#f5c542");
    ban.addColorStop(1, "#d4a017");
    ctx.fillStyle = ban;
    ctx.beginPath();
    ctx.moveTo(2, 2);
    ctx.bezierCurveTo(22, 4, 38, 18, 40, 42);
    ctx.bezierCurveTo(28, 40, 12, 32, 4, 24);
    ctx.bezierCurveTo(0, 14, -2, 6, 2, 2);
    ctx.fill();
    // Highlight
    ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(10, 10);
    ctx.quadraticCurveTo(22, 16, 28, 28);
    ctx.stroke();
    // Stem
    ctx.fillStyle = "#5c4010";
    ctx.fillRect(-3, -6, 8, 10);
    ctx.restore();
  }

  drawGorilla(ctx) {
    const x = this.gorillaX * W;
    const groundY = H * 0.78;
    // Subtle idle bob when quiet; small step bounce when moving
    const breath = Math.sin(this.dancePhase) * (this.coverEyes ? 2.2 : 1.2);
    const bounce = this.coverEyes ? breath : Math.abs(Math.sin(this.dancePhase)) * 3;
    // Smoother arm motion — limited swing
    const armSwing = this.coverEyes
      ? Math.sin(this.dancePhase * 0.8) * 0.08
      : Math.sin(this.dancePhase) * 0.28;

    ctx.save();
    ctx.translate(x, groundY - bounce);

    // Ground contact shadow
    ctx.fillStyle = "rgba(20, 40, 25, 0.22)";
    ctx.beginPath();
    ctx.ellipse(0, 10, 52, 11, 0, 0, Math.PI * 2);
    ctx.fill();

    // Legs (rounded, soft)
    this.roundLimb(ctx, -22, -8, 20, 32, "#4a3728");
    this.roundLimb(ctx, 8, -8, 20, 32, "#4a3728");

    // Body
    ctx.beginPath();
    ctx.ellipse(0, -52, 44, 50, 0, 0, Math.PI * 2);
    const bodyGrad = ctx.createRadialGradient(-8, -70, 8, 0, -50, 55);
    bodyGrad.addColorStop(0, "#6b4e3d");
    bodyGrad.addColorStop(1, "#4a3428");
    ctx.fillStyle = bodyGrad;
    ctx.fill();

    // Belly
    ctx.beginPath();
    ctx.ellipse(0, -44, 22, 26, 0, 0, Math.PI * 2);
    ctx.fillStyle = "#b08a62";
    ctx.fill();

    // Arms
    ctx.strokeStyle = "#4a3428";
    ctx.lineWidth = 18;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    // Left
    ctx.beginPath();
    ctx.moveTo(-28, -68);
    if (this.coverEyes) {
      ctx.quadraticCurveTo(-42, -98 + armSwing * 10, -14, -110);
    } else {
      ctx.quadraticCurveTo(
        -48,
        -55 + armSwing * 28,
        -36,
        -18 + armSwing * 14
      );
    }
    ctx.stroke();
    // Right
    ctx.beginPath();
    ctx.moveTo(28, -68);
    if (this.coverEyes) {
      ctx.quadraticCurveTo(42, -98 - armSwing * 10, 14, -110);
    } else {
      ctx.quadraticCurveTo(
        48,
        -55 - armSwing * 28,
        36,
        -18 - armSwing * 14
      );
    }
    ctx.stroke();

    // Head
    ctx.beginPath();
    ctx.ellipse(0, -102, 34, 32, 0, 0, Math.PI * 2);
    const headGrad = ctx.createRadialGradient(-6, -112, 4, 0, -100, 36);
    headGrad.addColorStop(0, "#6b4e3d");
    headGrad.addColorStop(1, "#4a3428");
    ctx.fillStyle = headGrad;
    ctx.fill();

    // Face plate
    ctx.beginPath();
    ctx.ellipse(0, -96, 20, 18, 0, 0, Math.PI * 2);
    ctx.fillStyle = "#d2b48c";
    ctx.fill();

    if (this.coverEyes) {
      // Hands over eyes — soft
      ctx.fillStyle = "#4a3428";
      ctx.beginPath();
      ctx.ellipse(-11, -104, 13, 11, -0.25, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(11, -104, 13, 11, 0.25, 0, Math.PI * 2);
      ctx.fill();
      // Peaceful mouth
      ctx.strokeStyle = "#5c4033";
      ctx.lineWidth = 2.2;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.arc(0, -90, 7, 0.15, Math.PI - 0.15);
      ctx.stroke();
    } else {
      // Eyes
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.ellipse(-9, -100, 6.5, 7.5, 0, 0, Math.PI * 2);
      ctx.ellipse(9, -100, 6.5, 7.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#1a1a1a";
      ctx.beginPath();
      ctx.arc(-8, -99, 3.2, 0, Math.PI * 2);
      ctx.arc(10, -99, 3.2, 0, Math.PI * 2);
      ctx.fill();
      // Soft grin
      ctx.fillStyle = "#5c4033";
      ctx.beginPath();
      ctx.ellipse(0, -86, 11, 5.5, 0, 0, Math.PI);
      ctx.fill();
    }

    ctx.restore();
  }

  roundLimb(ctx, x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    const r = Math.min(w, h) * 0.35;
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.fill();
  }

  drawGroundDecor(ctx) {
    // Soft grass blades — fewer, subtler
    ctx.strokeStyle = "rgba(35, 90, 55, 0.55)";
    ctx.lineWidth = 1.6;
    ctx.lineCap = "round";
    for (let i = 0; i < 14; i++) {
      const gx = 50 + i * 64 + Math.sin(this.leafPhase * 0.6 + i * 0.7) * 3;
      const gy = H * 0.84 + (i % 3) * 6;
      const sway = Math.sin(this.leafPhase + i) * 3;
      ctx.beginPath();
      ctx.moveTo(gx, gy);
      ctx.quadraticCurveTo(gx - 3 + sway, gy - 12, gx + 1 + sway, gy - 16);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(gx, gy);
      ctx.quadraticCurveTo(gx + 5 + sway, gy - 10, gx + 3 + sway, gy - 14);
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
