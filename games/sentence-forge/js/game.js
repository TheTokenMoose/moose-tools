/**
 * Sentence Forge — reading fluency & sentence building
 * Modes: Forge · Fluency · Challenge
 */

// ── Sentence banks by level ────────────────────────────────────────────────

const BANK = {
  1: [
    { words: ["The", "cat", "is", "big"], tip: "Who is big?" },
    { words: ["I", "see", "a", "dog"], tip: "What do you see?" },
    { words: ["We", "like", "to", "play"], tip: "What do we like?" },
    { words: ["She", "has", "a", "red", "hat"], tip: "What color is the hat?" },
    { words: ["The", "sun", "is", "hot"], tip: "How does the sun feel?" },
    { words: ["My", "name", "is", "Sam"], tip: "Who is speaking?" },
    { words: ["Look", "at", "the", "bird"], tip: "What should you look at?" },
    { words: ["He", "can", "run", "fast"], tip: "How can he run?" },
    { words: ["This", "is", "my", "book"], tip: "Whose book?" },
    { words: ["The", "fish", "can", "swim"], tip: "What can the fish do?" },
  ],
  2: [
    { words: ["The", "little", "dog", "ran", "home"], tip: "Where did the dog run?" },
    { words: ["I", "want", "to", "read", "a", "story"], tip: "What do you want?" },
    { words: ["She", "put", "the", "book", "on", "the", "desk"], tip: "Where is the book?" },
    { words: ["We", "went", "to", "the", "park", "today"], tip: "When did we go?" },
    { words: ["The", "birds", "sing", "in", "the", "morning"], tip: "When do birds sing?" },
    { words: ["He", "found", "a", "shiny", "coin"], tip: "What did he find?" },
    { words: ["Please", "open", "your", "books", "now"], tip: "What should you open?" },
    { words: ["They", "played", "soccer", "after", "school"], tip: "When did they play?" },
    { words: ["My", "best", "friend", "lives", "next", "door"], tip: "Where does the friend live?" },
    { words: ["The", "rain", "made", "the", "grass", "wet"], tip: "What did the rain do?" },
  ],
  3: [
    { words: ["After", "lunch", "we", "cleaned", "our", "desks"], tip: "When did we clean?" },
    { words: ["The", "curious", "kitten", "chased", "the", "yarn"], tip: "What did the kitten chase?" },
    { words: ["Because", "it", "rained", "the", "game", "was", "canceled"], tip: "Why was the game canceled?" },
    { words: ["Our", "class", "wrote", "letters", "to", "the", "mayor"], tip: "Who received the letters?" },
    { words: ["She", "quietly", "turned", "the", "pages", "of", "her", "book"], tip: "How did she turn the pages?" },
    { words: ["When", "the", "bell", "rings", "we", "line", "up"], tip: "What do we do when the bell rings?" },
    { words: ["The", "scientist", "carefully", "mixed", "the", "colors"], tip: "How did the scientist mix?" },
    { words: ["Under", "the", "old", "bridge", "the", "river", "flows", "slowly"], tip: "Where does the river flow?" },
    { words: ["Everyone", "cheered", "when", "the", "team", "scored"], tip: "When did everyone cheer?" },
    { words: ["Reading", "every", "day", "helps", "your", "brain", "grow"], tip: "What helps your brain grow?" },
  ],
};

// ── Audio ──────────────────────────────────────────────────────────────────

class GameAudio {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this._voice = window.TokenMooseVoice ? TokenMooseVoice.create("sentence-forge") : null;
    this.master = null;
  }

  ensure() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.35;
      this.master.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") this.ctx.resume();
    return this.ctx;
  }

  setEnabled(on) {
    this.enabled = !!on;
    if (this._voice) {
      this._voice.setEnabled(this.enabled);
      if (!this.enabled) this._voice.stop();
    }
  }

  _beep(freq, dur, type = "sine", vol = 0.2, when = 0) {
    if (!this.enabled) return;
    const ctx = this.ensure();
    if (!ctx) return;
    const t0 = ctx.currentTime + when;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol, t0 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g);
    g.connect(this.master);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }

  tap() {
    this._beep(520, 0.08, "triangle", 0.12);
  }

  place() {
    this._beep(380, 0.1, "sine", 0.15);
  }

  success() {
    this._beep(523, 0.12, "sine", 0.2, 0);
    this._beep(659, 0.12, "sine", 0.2, 0.1);
    this._beep(784, 0.2, "sine", 0.22, 0.2);
  }

  fail() {
    this._beep(200, 0.15, "square", 0.1);
    this._beep(150, 0.2, "square", 0.1, 0.12);
  }

  hint() {
    this._beep(880, 0.08, "sine", 0.1);
  }

  star() {
    this._beep(988, 0.1, "sine", 0.15);
    this._beep(1319, 0.18, "sine", 0.15, 0.1);
  }

  /** Speak sentence via speechSynthesis when available */
  speak(text) {
    if (!this.enabled) return;
    if (this._voice) {
      this._voice.speak(text);
      return;
    }
    if (!window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.9;
      u.pitch = 1.05;
      window.speechSynthesis.speak(u);
    } catch (_) {}
  }
}

// ── Particles ──────────────────────────────────────────────────────────────

class FX {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.parts = [];
    this.raf = null;
    this._resize();
    window.addEventListener("resize", () => this._resize());
  }

  _resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  burst(x, y, color) {
    for (let i = 0; i < 28; i++) {
      const a = Math.random() * Math.PI * 2;
      const sp = 2 + Math.random() * 6;
      this.parts.push({
        x, y,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp - 2,
        life: 1,
        color: color || `hsl(${280 + Math.random() * 60}, 90%, 70%)`,
        r: 2 + Math.random() * 4,
      });
    }
    this._run();
  }

  _run() {
    if (this.raf) return;
    const step = () => {
      const ctx = this.ctx;
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.parts = this.parts.filter((p) => p.life > 0);
      for (const p of this.parts) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15;
        p.life -= 0.02;
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (this.parts.length) this.raf = requestAnimationFrame(step);
      else {
        this.raf = null;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    };
    this.raf = requestAnimationFrame(step);
  }
}

// ── Game ───────────────────────────────────────────────────────────────────

class SentenceForge {
  constructor() {
    this.audio = new GameAudio();
    this.fx = new FX(document.getElementById("fx"));
    this.mode = "forge";
    this.level = 2;
    this.score = 0;
    this.streak = 0;
    this.order = []; // indices into current.words in player order... actually store words
    this.built = []; // words placed
    this.current = null;
    this.usedIndices = new Set();
    this.hintsUsed = 0;
    this.fluencyTimer = null;
    this.phase = "build"; // build | fluency

    this.els = {
      title: document.getElementById("screen-title"),
      play: document.getElementById("screen-play"),
      result: document.getElementById("screen-result"),
      sentenceRow: document.getElementById("sentence-row"),
      wordBank: document.getElementById("word-bank"),
      prompt: document.getElementById("prompt-text"),
      hudMode: document.getElementById("hud-mode"),
      hudScore: document.getElementById("hud-score"),
      hudStreak: document.getElementById("hud-streak"),
      fluencyPanel: document.getElementById("fluency-panel"),
      fluencyWords: document.getElementById("fluency-words"),
      playActions: document.querySelector(".play-actions"),
      muteTitle: document.getElementById("btn-mute"),
      mutePlay: document.getElementById("btn-mute-play"),
    };

    this._bind();
  }

  _bind() {
    document.querySelectorAll(".mode-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.audio.ensure();
        this.mode = btn.dataset.mode;
        this.level = parseInt(document.getElementById("level-select").value, 10) || 2;
        this.score = 0;
        this.streak = 0;
        this.startRound();
      });
    });

    document.getElementById("btn-menu").addEventListener("click", () => this.showTitle());
    document.getElementById("btn-result-menu").addEventListener("click", () => this.showTitle());
    document.getElementById("btn-next").addEventListener("click", () => this.startRound());
    document.getElementById("btn-check").addEventListener("click", () => this.check());
    document.getElementById("btn-clear").addEventListener("click", () => this.clearBuilt());
    document.getElementById("btn-hint").addEventListener("click", () => this.hint());
    document.getElementById("btn-listen").addEventListener("click", () => {
      if (this.current) this.audio.speak(this.current.words.join(" "));
    });
    document.getElementById("btn-fluency-go").addEventListener("click", () => this.runFluency());
    document.getElementById("btn-fluency-done").addEventListener("click", () => this.finishFluency());

    const toggleMute = () => {
      this.audio.setEnabled(!this.audio.enabled);
      const t = this.audio.enabled ? "🔊" : "🔇";
      this.els.muteTitle.textContent = t;
      this.els.mutePlay.textContent = t;
    };
    this.els.muteTitle.addEventListener("click", toggleMute);
    this.els.mutePlay.addEventListener("click", toggleMute);
  }

  show(screen) {
    this.els.title.hidden = screen !== "title";
    this.els.play.hidden = screen !== "play";
    this.els.result.hidden = screen !== "result";
  }

  showTitle() {
    this.clearFluencyTimer();
    this.show("title");
  }

  pickSentence() {
    const list = BANK[this.level] || BANK[2];
    // Prefer unused
    const available = list
      .map((s, i) => i)
      .filter((i) => !this.usedIndices.has(`${this.level}-${i}`));
    let idx;
    if (available.length === 0) {
      this.usedIndices.clear();
      idx = Math.floor(Math.random() * list.length);
    } else {
      idx = available[Math.floor(Math.random() * available.length)];
    }
    this.usedIndices.add(`${this.level}-${idx}`);
    return { ...list[idx], words: list[idx].words.slice() };
  }

  shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    // Avoid accidental correct order
    if (a.length > 1 && a.every((w, i) => w === arr[i])) {
      [a[0], a[1]] = [a[1], a[0]];
    }
    return a;
  }

  startRound() {
    this.clearFluencyTimer();
    this.current = this.pickSentence();
    this.built = [];
    this.hintsUsed = 0;
    this.phase = "build";
    this.bankWords = this.shuffle(this.current.words);

    this.show("play");
    this.els.hudMode.textContent =
      this.mode === "forge" ? "Forge" : this.mode === "fluency" ? "Fluency" : "Challenge";
    this.els.hudScore.textContent = `Score ${this.score}`;
    this.els.hudStreak.hidden = this.mode !== "challenge";
    this.els.hudStreak.textContent = `Streak ${this.streak}`;
    this.els.prompt.textContent =
      this.mode === "fluency"
        ? "Build the sentence, then practice reading it."
        : `Build the sentence. ${this.current.tip || ""}`;
    this.els.fluencyPanel.hidden = true;
    this.els.playActions.hidden = false;

    this.render();
  }

  render() {
    // Sentence row
    const row = this.els.sentenceRow;
    row.innerHTML = "";
    if (this.built.length === 0) {
      for (let i = 0; i < Math.min(4, this.current.words.length); i++) {
        const slot = document.createElement("div");
        slot.className = "slot-empty";
        row.appendChild(slot);
      }
    } else {
      this.built.forEach((word, idx) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "word-tile in-sentence";
        btn.textContent = word;
        btn.addEventListener("click", () => this.removeAt(idx));
        row.appendChild(btn);
      });
    }

    // Bank — remaining words (multiset)
    const remaining = this.bankWords.slice();
    // Remove one instance per built word (order of build)
    const builtCopy = this.built.slice();
    const display = [];
    for (const w of remaining) {
      const bi = builtCopy.indexOf(w);
      if (bi !== -1) {
        builtCopy.splice(bi, 1);
      } else {
        display.push(w);
      }
    }

    const bank = this.els.wordBank;
    bank.innerHTML = "";
    display.forEach((word) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "word-tile";
      btn.textContent = word;
      btn.addEventListener("click", () => this.addWord(word));
      bank.appendChild(btn);
    });
  }

  addWord(word) {
    if (this.phase !== "build") return;
    // Only if still available
    const counts = {};
    for (const w of this.bankWords) counts[w] = (counts[w] || 0) + 1;
    for (const w of this.built) counts[w] = (counts[w] || 0) - 1;
    if (!counts[word] || counts[word] <= 0) return;

    this.built.push(word);
    this.audio.tap();
    this.render();
  }

  removeAt(idx) {
    if (this.phase !== "build") return;
    this.built.splice(idx, 1);
    this.audio.place();
    this.render();
  }

  clearBuilt() {
    if (this.phase !== "build") return;
    this.built = [];
    this.audio.place();
    this.render();
  }

  hint() {
    if (this.phase !== "build" || !this.current) return;
    const nextIdx = this.built.length;
    if (nextIdx >= this.current.words.length) return;
    const need = this.current.words[nextIdx];
    // Flash matching bank tile
    this.els.wordBank.querySelectorAll(".word-tile").forEach((el) => {
      if (el.textContent === need) {
        el.classList.add("correct-flash");
        setTimeout(() => el.classList.remove("correct-flash"), 500);
      }
    });
    this.hintsUsed += 1;
    this.audio.hint();
    this.els.prompt.textContent = `Hint: next word is “${need}”`;
  }

  isCorrect() {
    if (!this.current || this.built.length !== this.current.words.length) return false;
    return this.built.every((w, i) => w === this.current.words[i]);
  }

  check() {
    if (this.phase !== "build") return;
    if (this.built.length !== this.current.words.length) {
      this.els.prompt.textContent = "Use all the words, then check.";
      this.audio.fail();
      return;
    }
    if (this.isCorrect()) {
      this.onCorrect();
    } else {
      this.audio.fail();
      this.els.sentenceRow.querySelectorAll(".word-tile").forEach((el) => {
        el.classList.add("wrong-flash");
        setTimeout(() => el.classList.remove("wrong-flash"), 450);
      });
      this.els.prompt.textContent = "Not quite — try a different order. Hint if you need it!";
      if (this.mode === "challenge") {
        this.streak = 0;
        this.els.hudStreak.textContent = `Streak ${this.streak}`;
      }
    }
  }

  onCorrect() {
    this.audio.success();
    const rect = this.els.sentenceRow.getBoundingClientRect();
    this.fx.burst(rect.left + rect.width / 2, rect.top + rect.height / 2);

    let points = 10 * this.level;
    if (this.hintsUsed === 0) points += 5;
    if (this.mode === "challenge") {
      this.streak += 1;
      points += Math.min(20, this.streak * 2);
      this.els.hudStreak.textContent = `Streak ${this.streak}`;
    }
    this.score += points;
    this.els.hudScore.textContent = `Score ${this.score}`;

    if (this.mode === "fluency") {
      this.phase = "fluency";
      this.els.prompt.textContent = "Nice! Now read it with the glowing words.";
      this.els.playActions.hidden = true;
      this.els.fluencyPanel.hidden = false;
      this.els.fluencyWords.innerHTML = this.current.words
        .map((w) => `<span class="fw">${escapeHtml(w)}</span>`)
        .join(" ");
    } else {
      this.showResult(points);
    }
  }

  runFluency() {
    this.clearFluencyTimer();
    const spans = [...this.els.fluencyWords.querySelectorAll(".fw")];
    spans.forEach((s) => s.classList.remove("active", "done"));
    const wpm = parseInt(document.getElementById("wpm-select").value, 10) || 120;
    const delay = (60 / wpm) * 1000;
    let i = 0;

    // Speak full sentence at start
    this.audio.speak(this.current.words.join(" "));

    const step = () => {
      if (i > 0) spans[i - 1].classList.remove("active"), spans[i - 1].classList.add("done");
      if (i >= spans.length) {
        this.fluencyTimer = null;
        return;
      }
      spans[i].classList.add("active");
      this.audio.tap();
      i += 1;
      this.fluencyTimer = setTimeout(step, delay);
    };
    step();
  }

  finishFluency() {
    this.clearFluencyTimer();
    this.score += 8;
    this.els.hudScore.textContent = `Score ${this.score}`;
    this.showResult(8, true);
  }

  clearFluencyTimer() {
    if (this.fluencyTimer) {
      clearTimeout(this.fluencyTimer);
      this.fluencyTimer = null;
    }
    try {
      window.speechSynthesis?.cancel();
    } catch (_) {}
  }

  showResult(points, fromFluency = false) {
    this.show("result");
    const stars =
      this.hintsUsed === 0 ? "⭐⭐⭐" : this.hintsUsed === 1 ? "⭐⭐" : "⭐";
    document.getElementById("result-stars").textContent = stars;
    document.getElementById("result-title").textContent = fromFluency
      ? "Fluency complete!"
      : "Great forge!";
    document.getElementById("result-msg").textContent = fromFluency
      ? `+${points} fluency points · Total ${this.score}`
      : `+${points} points · Total ${this.score}`;
    document.getElementById("result-sentence").textContent =
      this.current.words.join(" ") + ".";
    this.audio.star();
  }
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

document.addEventListener("DOMContentLoaded", () => {
  new SentenceForge();
});

(function () {
  function mount() {
    // Voice picker: app-chrome only
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
