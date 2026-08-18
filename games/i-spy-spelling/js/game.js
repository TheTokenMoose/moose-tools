/**
 * I Spy Spelling — find object, then spell
 * Audio: Web Audio API music + softer TTS voice (no external files)
 */

class SFX {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.musicOn = true;
    this._musicNodes = [];
    this._musicTimer = null;
    // Shared Token Moose voice (Piper via MooseTTS, browser fallback)
    this._tmVoice = window.TokenMooseVoice ? TokenMooseVoice.create("i-spy-spelling") : null;
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

  setEnabled(on) {
    this.enabled = !!on;
    if (this._tmVoice) this._tmVoice.setEnabled(this.enabled);
    if (!this.enabled) {
      if (this._tmVoice) this._tmVoice.stop();
      this.stopMusic();
      try {
        if (window.MooseTTS) MooseTTS.stop();
        speechSynthesis.cancel();
      } catch (_) {}
    } else if (this.musicOn) {
      this.startMusic();
    }
  }

  tone(f, d, type = "sine", v = 0.12, when = 0) {
    if (!this.enabled) return;
    const ctx = this.ensure();
    if (!ctx) return;
    const t0 = ctx.currentTime + when;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.value = f;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(v, t0 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + d);
    o.connect(g);
    g.connect(ctx.destination);
    o.start(t0);
    o.stop(t0 + d + 0.02);
  }

  tap() {
    this.tone(520, 0.07, "triangle", 0.08);
  }
  ok() {
    this.tone(523, 0.1);
    this.tone(659, 0.1, "sine", 0.12, 0.1);
    this.tone(784, 0.18, "sine", 0.12, 0.2);
  }
  bad() {
    this.tone(180, 0.15, "triangle", 0.07);
  }
  find() {
    this.tone(440, 0.08, "sine", 0.1);
    this.tone(660, 0.12, "sine", 0.1, 0.08);
  }

  /** Clue / feedback speech via shared MooseTTS pipeline */
  speak(text) {
    if (!this.enabled) return;
    const t = String(text || "").trim();
    if (!t) return;
    if (this._tmVoice) {
      this._tmVoice.speak(t, { rate: 0.92 });
      return;
    }
    if (window.MooseTTS) {
      MooseTTS.speak(t, { rate: 0.92 });
      return;
    }
    if (!window.speechSynthesis) return;
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(t);
      u.rate = 0.92;
      speechSynthesis.speak(u);
    } catch (_) {}
  }

  /** Gentle looping ambient music (procedural, free) */
  startMusic() {
    if (!this.enabled || !this.musicOn) return;
    const ctx = this.ensure();
    if (!ctx) return;
    this.stopMusic(false);

    const master = ctx.createGain();
    master.gain.value = 0.045;
    master.connect(ctx.destination);

    // Soft pad chord (C major-ish ambient)
    const padFreqs = [196, 246.94, 293.66, 392]; // G2 E3 D3 G3-ish warm
    const padOscs = padFreqs.map((f, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.value = f;
      g.gain.value = 0.25 / padFreqs.length;
      // slow pulse
      const lfo = ctx.createOscillator();
      const lfoG = ctx.createGain();
      lfo.frequency.value = 0.08 + i * 0.02;
      lfoG.gain.value = 0.08;
      lfo.connect(lfoG);
      lfoG.connect(g.gain);
      o.connect(g);
      g.connect(master);
      o.start();
      lfo.start();
      return { o, g, lfo };
    });

    // Soft arpeggio plinks
    const notes = [261.63, 329.63, 392.0, 523.25, 392.0, 329.63]; // C E G C G E
    let step = 0;
    const tick = () => {
      if (!this.enabled || !this.musicOn) return;
      const f = notes[step % notes.length];
      step += 1;
      const t0 = ctx.currentTime;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "triangle";
      o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(0.12, t0 + 0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.9);
      o.connect(g);
      g.connect(master);
      o.start(t0);
      o.stop(t0 + 1);
    };
    tick();
    this._musicTimer = setInterval(tick, 900);

    this._musicNodes = [{ master }, ...padOscs];
  }

  stopMusic(clearFlag) {
    if (this._musicTimer) {
      clearInterval(this._musicTimer);
      this._musicTimer = null;
    }
    for (const n of this._musicNodes) {
      try {
        if (n.o) n.o.stop();
        if (n.lfo) n.lfo.stop();
      } catch (_) {}
    }
    this._musicNodes = [];
    if (clearFlag) this.musicOn = false;
  }
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

class ISpySpelling {
  constructor() {
    this.sfx = new SFX();
    this.packs = window.ISPY_PACKS || [];
    this.pack = null;
    this.queue = [];
    this.index = 0;
    this.target = null;
    this.stars = 0;
    this.diff = "medium";
    this.phase = "find";
    this.slots = [];
    this.bank = [];
    this.hintsUsed = 0;
    this.found = new Set();

    this.els = {
      menu: document.getElementById("screen-menu"),
      play: document.getElementById("screen-play"),
      result: document.getElementById("screen-result"),
      done: document.getElementById("screen-done"),
      packSelect: document.getElementById("pack-select"),
      diffSelect: document.getElementById("diff-select"),
      scene: document.getElementById("scene"),
      clue: document.getElementById("clue-text"),
      spellPanel: document.getElementById("spell-panel"),
      slots: document.getElementById("letter-slots"),
      bank: document.getElementById("letter-bank"),
      hint: document.getElementById("hint-line"),
      hudPack: document.getElementById("hud-pack"),
      hudProgress: document.getElementById("hud-progress"),
      hudStars: document.getElementById("hud-stars"),
      mute: document.getElementById("btn-mute"),
    };

    this._fillPacks();
    this._bind();
  }

  _fillPacks() {
    this.els.packSelect.innerHTML = this.packs
      .map((p, i) => `<option value="${i}">${p.title}</option>`)
      .join("");
  }

  _bind() {
    document.getElementById("btn-start").addEventListener("click", () => this.start());
    document.getElementById("btn-menu").addEventListener("click", () => {
      this.sfx.stopMusic();
      this.show("menu");
    });
    document.getElementById("btn-result-menu").addEventListener("click", () => {
      this.sfx.stopMusic();
      this.show("menu");
    });
    document.getElementById("btn-done-menu").addEventListener("click", () => {
      this.sfx.stopMusic();
      this.show("menu");
    });
    document.getElementById("btn-next").addEventListener("click", () => this.nextRound());
    document.getElementById("btn-again").addEventListener("click", () => this.start());
    document.getElementById("btn-clear").addEventListener("click", () => this.clearSpell());
    document.getElementById("btn-check").addEventListener("click", () => this.checkSpell());
    document.getElementById("btn-speak").addEventListener("click", () => {
      this.sfx.speak(this.els.clue.textContent.replace(/\s+/g, " ").trim());
    });
    this.els.mute.addEventListener("click", () => {
      this.sfx.setEnabled(!this.sfx.enabled);
      this.els.mute.textContent = this.sfx.enabled ? "🔊 Sound on" : "🔇 Sound off";
    });
    this.els.clue.addEventListener("dblclick", () => this.softHint());
  }

  show(name) {
    this.els.menu.hidden = name !== "menu";
    this.els.play.hidden = name !== "play";
    this.els.result.hidden = name !== "result";
    this.els.done.hidden = name !== "done";
  }

  start() {
    this.sfx.ensure();
    this.sfx.musicOn = true;
    this.sfx.startMusic();
    const pi = parseInt(this.els.packSelect.value, 10) || 0;
    this.pack = this.packs[pi] || this.packs[0];
    this.diff = this.els.diffSelect.value || "medium";
    this.queue = shuffle(this.pack.items.map((_, i) => i));
    this.index = 0;
    this.stars = 0;
    this.found = new Set();
    this.show("play");
    this.els.hudPack.textContent = this.pack.title;
    this.els.hudStars.textContent = `⭐ ${this.stars}`;
    this.renderScene();
    this.beginClue();
  }

  imgSrc(name) {
    const base = window.ISPY_IMG_BASE || "assets/twemoji/";
    return base + name + ".png";
  }

  renderScene() {
    const scene = this.els.scene;
    scene.className = "scene " + (this.pack.theme || "");
    scene.innerHTML = "";

    (this.pack.decor || []).forEach((d) => {
      const el = document.createElement("div");
      el.className = "decor";
      el.style.left = d.x + "%";
      el.style.top = d.y + "%";
      el.style.transform = "translate(-50%, -50%)";
      if (d.opacity != null) el.style.opacity = d.opacity;
      const size = d.size || 40;
      if (d.img) {
        el.innerHTML = `<img src="${this.imgSrc(d.img)}" alt="" width="${size}" height="${size}" draggable="false">`;
      } else if (d.emoji) {
        el.style.fontSize = (typeof size === "number" ? size + "px" : size);
        el.textContent = d.emoji;
      }
      scene.appendChild(el);
    });

    this.pack.items.forEach((item, idx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "spy-item" + (this.found.has(idx) ? " found" : "");
      btn.style.left = item.x + "%";
      btn.style.top = item.y + "%";
      btn.dataset.idx = String(idx);
      btn.setAttribute("aria-label", this.found.has(idx) ? item.word : "hidden object");
      const src = this.imgSrc(item.img || item.word);
      btn.innerHTML = `<img class="spy-img" src="${src}" alt="" draggable="false">`;
      btn.addEventListener("click", () => this.onItemTap(idx));
      scene.appendChild(btn);
    });
  }

  makeClue(item) {
    const letter = item.word[0].toUpperCase();
    if (this.diff === "challenge") {
      const r = item.challenge || item.riddle;
      return `🧩 <strong>Challenge riddle:</strong> ${r}`;
    }
    if (this.diff === "easy") {
      return `I spy with my little eye something beginning with <strong>${letter}</strong>…`;
    }
    if (this.diff === "hard") {
      return `I spy with my little eye… <strong>${item.riddle}</strong>.`;
    }
    if (Math.random() < 0.5) {
      return `I spy with my little eye something beginning with <strong>${letter}</strong>…`;
    }
    return `I spy with my little eye something <strong>${item.color}</strong>…`;
  }

  beginClue() {
    if (this.index >= this.queue.length) {
      this.show("done");
      document.getElementById("done-msg").textContent =
        `You earned ${this.stars} stars in ${this.pack.title}.`;
      this.sfx.ok();
      return;
    }
    this.phase = "find";
    this.hintsUsed = 0;
    this.target = this.pack.items[this.queue[this.index]];
    this.targetIdx = this.queue[this.index];
    this.els.hudProgress.textContent = `${this.index + 1} / ${this.queue.length}`;
    this.els.clue.innerHTML = this.makeClue(this.target);
    this.els.spellPanel.hidden = true;
    this.els.hint.textContent = "Tap the object that matches the clue.";
    this.renderScene();
    // Small delay so music context is up and voices load
    setTimeout(() => {
      this.sfx.speak(this.els.clue.textContent.replace(/\s+/g, " ").trim());
    }, 200);
  }

  onItemTap(idx) {
    if (this.phase !== "find") return;
    if (this.found.has(idx)) return;

    if (idx === this.targetIdx) {
      this.sfx.find();
      this.found.add(idx);
      this.phase = "spell";
      this.els.hint.textContent = "Great find! Spell the word.";
      this.openSpell();
      this.renderScene();
    } else {
      this.sfx.bad();
      const btn = this.els.scene.querySelector(`.spy-item[data-idx="${idx}"]`);
      if (btn) {
        btn.classList.add("wrong-flash");
        setTimeout(() => btn.classList.remove("wrong-flash"), 400);
      }
      this.els.hint.textContent = "Not that one — keep looking!";
    }
  }

  softHint() {
    if (this.phase !== "find" || this.targetIdx == null) return;
    this.hintsUsed += 1;
    const btn = this.els.scene.querySelector(`.spy-item[data-idx="${this.targetIdx}"]`);
    if (btn) {
      btn.classList.add("pulse-hint");
      setTimeout(() => btn.classList.remove("pulse-hint"), 1600);
    }
    this.sfx.tap();
  }

  openSpell() {
    const word = this.target.word.toLowerCase();
    this.slots = Array(word.length).fill(null);
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const extras = [];
    while (extras.length < 3) {
      const ch = alphabet[Math.floor(Math.random() * 26)];
      if (!word.includes(ch) && !extras.includes(ch)) extras.push(ch);
    }
    this.bank = shuffle(word.split("").concat(extras));
    this.bankUsed = Array(this.bank.length).fill(false);

    const lab = document.getElementById("spell-target-label");
    if (this.target.img) {
      lab.innerHTML = `<img src="${this.imgSrc(this.target.img)}" alt="" width="28" height="28" style="vertical-align:middle"> (${word.length} letters)`;
    } else {
      lab.textContent = `${this.target.emoji || ""} (${word.length} letters)`;
    }
    this.els.spellPanel.hidden = false;
    this.renderSpell();
  }

  renderSpell() {
    this.els.slots.innerHTML = "";
    this.slots.forEach((ch, i) => {
      const slot = document.createElement("button");
      slot.type = "button";
      slot.className = "slot" + (ch ? " filled" : "");
      slot.textContent = ch || "";
      slot.addEventListener("click", () => {
        if (this.slots[i] == null) return;
        const bi = this.bank.findIndex((b, j) => b === this.slots[i] && this.bankUsed[j]);
        if (bi !== -1) this.bankUsed[bi] = false;
        this.slots[i] = null;
        this.sfx.tap();
        this.renderSpell();
      });
      this.els.slots.appendChild(slot);
    });

    this.els.bank.innerHTML = "";
    this.bank.forEach((ch, i) => {
      const tile = document.createElement("button");
      tile.type = "button";
      tile.className = "letter-tile" + (this.bankUsed[i] ? " used" : "");
      tile.textContent = ch;
      tile.addEventListener("click", () => {
        if (this.bankUsed[i]) return;
        const empty = this.slots.indexOf(null);
        if (empty === -1) return;
        this.slots[empty] = ch;
        this.bankUsed[i] = true;
        this.sfx.tap();
        this.renderSpell();
      });
      this.els.bank.appendChild(tile);
    });
  }

  clearSpell() {
    this.slots = Array(this.target.word.length).fill(null);
    this.bankUsed = Array(this.bank.length).fill(false);
    this.sfx.tap();
    this.renderSpell();
  }

  checkSpell() {
    if (this.slots.some((c) => c == null)) {
      this.els.hint.textContent = "Fill every letter first.";
      this.sfx.bad();
      return;
    }
    const attempt = this.slots.join("").toLowerCase();
    const want = this.target.word.toLowerCase();
    if (attempt === want) {
      this.sfx.ok();
      let gain = 3;
      if (this.hintsUsed > 0) gain = 2;
      this.stars += gain;
      this.els.hudStars.textContent = `⭐ ${this.stars}`;
      this.show("result");
      const re = document.getElementById("result-emoji");
      if (this.target.img) {
        re.innerHTML = `<img src="${this.imgSrc(this.target.img)}" alt="" width="64" height="64">`;
      } else {
        re.textContent = this.target.emoji || "🌟";
      }
      document.getElementById("result-title").textContent =
        gain === 3 ? "Super spell!" : "Well done!";
      document.getElementById("result-word").textContent = want;
      document.getElementById("result-msg").textContent = `+${gain} stars · Total ${this.stars}`;
    } else {
      this.sfx.bad();
      this.els.hint.textContent = "Almost — try a different order.";
      this.els.slots.querySelectorAll(".slot").forEach((s) => {
        s.style.background = "#fecaca";
      });
      setTimeout(() => this.renderSpell(), 450);
    }
  }

  nextRound() {
    this.index += 1;
    this.show("play");
    this.beginClue();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new ISpySpelling();
});

