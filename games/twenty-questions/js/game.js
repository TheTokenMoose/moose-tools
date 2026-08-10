/**
 * 20 Questions Wizard — attribute-splitting guesser
 */

class OracleSFX {
  constructor() {
    this.ctx = null;
    this.enabled = true;
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
  tone(f, d, type = "sine", v = 0.12, when = 0) {
    const ctx = this.ensure();
    if (!ctx) return;
    const t0 = ctx.currentTime + when;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.value = f;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(v, t0 + 0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + d);
    o.connect(g);
    g.connect(ctx.destination);
    o.start(t0);
    o.stop(t0 + d + 0.02);
  }
  ask() {
    this.tone(392, 0.12, "triangle", 0.1);
    this.tone(523, 0.15, "sine", 0.1, 0.1);
  }
  yes() {
    this.tone(523, 0.1);
    this.tone(659, 0.12, "sine", 0.12, 0.08);
  }
  no() {
    this.tone(280, 0.12, "triangle", 0.1);
  }
  win() {
    [523, 659, 784, 1046].forEach((f, i) => this.tone(f, 0.14, "sine", 0.12, i * 0.1));
  }
  lose() {
    this.tone(300, 0.2, "sine", 0.1);
    this.tone(220, 0.3, "sine", 0.1, 0.15);
  }
}

class TwentyQuestions {
  constructor() {
    this.sfx = new OracleSFX();
    this.items = [];
    this.pool = [];
    this.asked = new Set();
    this.qCount = 0;
    this.maxQ = 20;
    this.currentQ = null;
    this.category = "animal";

    this.els = {
      intro: document.getElementById("screen-intro"),
      play: document.getElementById("screen-play"),
      guess: document.getElementById("screen-guess"),
      end: document.getElementById("screen-end"),
      category: document.getElementById("category"),
      qCounter: document.getElementById("q-counter"),
      candidates: document.getElementById("candidates"),
      wizardLine: document.getElementById("wizard-line"),
      question: document.getElementById("question-text"),
      crystal: document.getElementById("crystal"),
      crystalIcon: document.getElementById("crystal-icon"),
      guessIcon: document.getElementById("guess-icon"),
      guessText: document.getElementById("guess-text"),
      endEmoji: document.getElementById("end-emoji"),
      endTitle: document.getElementById("end-title"),
      endMsg: document.getElementById("end-msg"),
    };

    this._bind();
  }

  _bind() {
    document.getElementById("btn-begin").addEventListener("click", () => this.begin());
    document.getElementById("btn-quit").addEventListener("click", () => this.giveUp());
    document.querySelectorAll(".btn-answer[data-a]").forEach((btn) => {
      btn.addEventListener("click", () => this.answer(btn.dataset.a));
    });
    document.getElementById("btn-correct").addEventListener("click", () => this.finish(true));
    document.getElementById("btn-wrong").addEventListener("click", () => this.afterWrongGuess());
    document.getElementById("btn-again").addEventListener("click", () => this.begin());
    document.getElementById("btn-home").addEventListener("click", () => this.show("intro"));
  }

  show(name) {
    this.els.intro.hidden = name !== "intro";
    this.els.play.hidden = name !== "play";
    this.els.guess.hidden = name !== "guess";
    this.els.end.hidden = name !== "end";
  }

  begin() {
    this.sfx.ensure();
    this.category = this.els.category.value;
    const all = window.Q20_ITEMS || [];
    this.items =
      this.category === "all" ? all.slice() : all.filter((x) => x.cat === this.category);
    if (this.items.length < 2) {
      alert("Not enough items in that realm.");
      return;
    }
    this.pool = this.items.slice();
    this.asked = new Set();
    this.qCount = 0;
    this.currentQ = null;
    this.show("play");
    this.nextQuestion();
  }

  flavor() {
    const lines = window.Q20_FLAVOR || ["Hmm…"];
    return lines[Math.floor(Math.random() * lines.length)];
  }

  /** Pick trait that splits pool closest to half */
  bestQuestion() {
    const questions = window.Q20_QUESTIONS || [];
    let best = null;
    let bestScore = Infinity;

    for (const q of questions) {
      if (this.asked.has(q.key)) continue;
      let yes = 0;
      let no = 0;
      for (const item of this.pool) {
        if (item.traits[q.key]) yes += 1;
        else no += 1;
      }
      if (yes === 0 || no === 0) continue; // useless split
      const score = Math.abs(yes - no);
      // Prefer questions that reduce more when equal split
      const weighted = score - Math.min(yes, no) * 0.01;
      if (weighted < bestScore) {
        bestScore = weighted;
        best = q;
      }
    }
    return best;
  }

  nextQuestion() {
    if (this.pool.length === 1) {
      this.offerGuess(this.pool[0]);
      return;
    }
    if (this.pool.length === 0 || this.qCount >= this.maxQ) {
      this.offerGuess(this.pool[0] || null);
      return;
    }

    const q = this.bestQuestion();
    if (!q) {
      this.offerGuess(this.pool[0] || null);
      return;
    }

    this.currentQ = q;
    this.qCount += 1;
    this.asked.add(q.key);

    this.els.qCounter.textContent = `Question ${this.qCount} / ${this.maxQ}`;
    this.els.candidates.textContent = String(this.pool.length);
    this.els.wizardLine.textContent = this.flavor();
    this.els.question.textContent = q.text;
    this.els.crystalIcon.textContent = "✨";
    this.els.crystal.classList.remove("asking");
    void this.els.crystal.offsetWidth;
    this.els.crystal.classList.add("asking");
    this.sfx.ask();
  }

  answer(kind) {
    if (!this.currentQ || this.els.play.hidden) return;

    if (kind === "yes") {
      this.sfx.yes();
      this.pool = this.pool.filter((item) => item.traits[this.currentQ.key]);
    } else if (kind === "no") {
      this.sfx.no();
      this.pool = this.pool.filter((item) => !item.traits[this.currentQ.key]);
    } else {
      // Not sure — skip trait, don't filter, still counts as a question
      this.sfx.ask();
    }

    this.els.candidates.textContent = String(this.pool.length);

    if (this.pool.length === 1) {
      this.offerGuess(this.pool[0]);
      return;
    }
    if (this.pool.length === 0) {
      this.finish(false, "The mists tangled — nothing in my realm matches those answers.");
      return;
    }
    if (this.qCount >= this.maxQ) {
      this.offerGuess(this.pool[0]);
      return;
    }
    this.nextQuestion();
  }

  offerGuess(item) {
    this.show("guess");
    if (!item) {
      this.els.guessText.innerHTML = "The vision is cloudy… I cannot name it.";
      this.els.guessIcon.textContent = "🌫️";
      document.getElementById("btn-correct").hidden = true;
      document.getElementById("btn-wrong").textContent = "Continue";
      this._emptyGuess = true;
      return;
    }
    this._emptyGuess = false;
    document.getElementById("btn-correct").hidden = false;
    document.getElementById("btn-wrong").textContent = "Wrong";
    this._guessItem = item;
    this.els.guessIcon.textContent = item.emoji;
    this.els.guessText.innerHTML = `You are thinking of <strong>${escapeHtml(item.name)}</strong> ${item.emoji}`;
    this.sfx.ask();
  }

  afterWrongGuess() {
    if (this._emptyGuess) {
      this.finish(false, "The oracle needs clearer answers next time.");
      return;
    }
    // Remove wrong guess and continue if possible
    this.pool = this.pool.filter((x) => x.name !== this._guessItem.name);
    if (this.pool.length === 0 || this.qCount >= this.maxQ) {
      this.finish(false, "Even the stars can be wrong. What mysteries you hold!");
      return;
    }
    this.show("play");
    this.nextQuestion();
  }

  giveUp() {
    const names = this.pool
      .slice(0, 5)
      .map((x) => x.name)
      .join(", ");
    this.finish(
      false,
      names
        ? `The vision fades. I was still considering: ${names}${this.pool.length > 5 ? "…" : "."}`
        : "The vision fades into night."
    );
  }

  finish(won, customMsg) {
    this.show("end");
    if (won) {
      this.sfx.win();
      this.els.endEmoji.textContent = "🌟";
      this.els.endTitle.textContent = "The vision was true!";
      this.els.endMsg.textContent = customMsg ||
        `I named it in ${this.qCount} question${this.qCount === 1 ? "" : "s"}. The crystal never lies… mostly.`;
    } else {
      this.sfx.lose();
      this.els.endEmoji.textContent = "🌙";
      this.els.endTitle.textContent = "The mists remain…";
      this.els.endMsg.textContent = customMsg || "Perhaps another riddle, another night.";
    }
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
  new TwentyQuestions();
});
