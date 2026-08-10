/**
 * 20 Questions Wizard — classic deduction engine
 * - Max 20 QUESTIONS (guesses do not consume questions)
 * - Yes / No / Probably / Probably not / Don't know
 * - Wrong guesses continue play; answers are never forgotten
 * - Entropy / information-gain question selection
 * - Confidence-based guessing
 */

const MAX_Q = 20;
const GUESS_CONFIDENCE = 0.78;
const MIN_Q_BEFORE_GUESS = 4;
const MULTIPLIERS = {
  yes: { match: 3.2, miss: 0.12 },
  no: { match: 3.2, miss: 0.12 }, // match = trait agrees with "no" (trait false)
  probably: { match: 1.85, miss: 0.45 },
  probably_not: { match: 1.85, miss: 0.45 },
  unknown: { match: 1, miss: 1 },
};

class OracleSFX {
  constructor() { this.ctx = null; }
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
  ask() { this.tone(392, 0.12, "triangle", 0.1); this.tone(523, 0.15, "sine", 0.1, 0.1); }
  yes() { this.tone(523, 0.1); this.tone(659, 0.12, "sine", 0.12, 0.08); }
  no() { this.tone(280, 0.12, "triangle", 0.1); }
  win() { [523, 659, 784, 1046].forEach((f, i) => this.tone(f, 0.14, "sine", 0.12, i * 0.1)); }
  lose() { this.tone(300, 0.2, "sine", 0.1); this.tone(220, 0.3, "sine", 0.1, 0.15); }
}

function hasTrait(item, key) {
  return !!(item.traits && item.traits[key]);
}

function entropyFromProbs(probs) {
  let h = 0;
  for (const p of probs) {
    if (p > 1e-12) h -= p * Math.log2(p);
  }
  return h;
}

function article(name) {
  return /^[aeiou]/i.test(name) ? "an " : "a ";
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

class TwentyQuestions {
  constructor() {
    this.sfx = new OracleSFX();
    this.universe = [];
    this.scores = new Map(); // name -> score (>0)
    this.rejected = new Set();
    this.askedTraits = new Set();
    this.qCount = 0;
    this.currentTrait = null;
    this.category = "animal";
    this._guessItem = null;
    this._finalAttempt = false;

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
      guessTitle: document.getElementById("guess-title"),
      endEmoji: document.getElementById("end-emoji"),
      endTitle: document.getElementById("end-title"),
      endMsg: document.getElementById("end-msg"),
    };

    this._bind();
  }

  _bind() {
    document.getElementById("btn-begin").addEventListener("click", () => this.begin());
    document.getElementById("btn-quit").addEventListener("click", () => this.giveUp());
    document.querySelectorAll("#screen-play .btn-answer[data-a]").forEach((btn) => {
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
    this.universe =
      this.category === "all" ? all.slice() : all.filter((x) => x.cat === this.category);
    if (this.universe.length < 2) {
      alert("Not enough items in that realm.");
      return;
    }
    this.scores = new Map(this.universe.map((x) => [x.name, 1]));
    this.rejected = new Set();
    this.askedTraits = new Set();
    this.qCount = 0;
    this.currentTrait = null;
    this._guessItem = null;
    this._finalAttempt = false;
    this.show("play");
    this.continueDeduction();
  }

  candidates() {
    return this.universe.filter(
      (x) => !this.rejected.has(x.name) && (this.scores.get(x.name) || 0) > 1e-6
    );
  }

  totalScore(list) {
    return list.reduce((s, x) => s + (this.scores.get(x.name) || 0), 0);
  }

  probabilities(list) {
    const t = this.totalScore(list);
    if (t <= 0) return list.map(() => 0);
    return list.map((x) => (this.scores.get(x.name) || 0) / t);
  }

  topCandidate(list) {
    return list.slice().sort((a, b) => (this.scores.get(b.name) || 0) - (this.scores.get(a.name) || 0))[0];
  }

  confidence(list) {
    const probs = this.probabilities(list);
    if (!probs.length) return 0;
    return Math.max(...probs);
  }

  flavorAsk() {
    const lines = window.Q20_FLAVOR || ["Hmm…"];
    return lines[Math.floor(Math.random() * lines.length)];
  }

  /** Expected information gain for trait key */
  infoGain(key, list) {
    const t = this.totalScore(list);
    if (t <= 0) return -1;
    let yes = 0;
    let no = 0;
    for (const item of list) {
      const w = this.scores.get(item.name) || 0;
      if (hasTrait(item, key)) yes += w;
      else no += w;
    }
    if (yes <= 0 || no <= 0) return -1;
    const pYes = yes / t;
    const pNo = no / t;
    // Prior entropy of candidate distribution
    const prior = entropyFromProbs(this.probabilities(list));
    // Approximate posterior entropy: binary split into two groups with internal entropy
    // Use weighted entropy of normalized subsets (uniform within split is ok approx via mass only):
    // H_after ≈ pYes * H(yes group) + pNo * H(no group)
    const yesList = list.filter((x) => hasTrait(x, key));
    const noList = list.filter((x) => !hasTrait(x, key));
    const hYes = entropyFromProbs(this.probabilities(yesList));
    const hNo = entropyFromProbs(this.probabilities(noList));
    const expected = pYes * hYes + pNo * hNo;
    return prior - expected;
  }

  bestTrait(list) {
    const qs = window.Q20_QUESTIONS || [];
    let best = null;
    let bestGain = 0.02;
    for (const q of qs) {
      if (this.askedTraits.has(q.key)) continue;
      const g = this.infoGain(q.key, list);
      if (g > bestGain) {
        bestGain = g;
        best = q;
      }
    }
    return best;
  }

  /**
   * Core loop: maybe guess (no question cost), else ask trait question.
   */
  continueDeduction() {
    const list = this.candidates();
    this.els.candidates.textContent = String(list.length);
    this.els.qCounter.textContent = `Question ${this.qCount} / ${MAX_Q}`;

    if (list.length === 0) {
      this.finish(false, "My hypotheses collapsed — your answers led beyond this realm’s map.");
      return;
    }

    // Single survivor → guess (free)
    if (list.length === 1) {
      this.offerGuess(list[0], false);
      return;
    }

    const conf = this.confidence(list);
    const top = this.topCandidate(list);

    // High confidence guess after enough info (does NOT use a question)
    if (
      top &&
      !this.rejected.has(top.name) &&
      this.qCount >= MIN_Q_BEFORE_GUESS &&
      conf >= GUESS_CONFIDENCE
    ) {
      this.offerGuess(top, false);
      return;
    }

    // Out of questions → final guess attempt
    if (this.qCount >= MAX_Q) {
      this.offerGuess(top, true);
      return;
    }

    // Ask best trait question
    const q = this.bestTrait(list);
    if (!q) {
      // No splitting traits left — guess top
      this.offerGuess(top, this.qCount >= MAX_Q);
      return;
    }

    this.currentTrait = q;
    this.askedTraits.add(q.key);
    this.qCount += 1;
    this.els.qCounter.textContent = `Question ${this.qCount} / ${MAX_Q}`;
    this.els.wizardLine.textContent = this.flavorAsk();
    this.els.question.textContent = q.text;
    this.els.crystalIcon.textContent = "✨";
    this.els.crystal.classList.remove("asking");
    void this.els.crystal.offsetWidth;
    this.els.crystal.classList.add("asking");
    this.sfx.ask();
  }

  answer(kind) {
    if (!this.currentTrait || this.els.play.hidden) return;
    const key = this.currentTrait.key;

    if (kind === "yes" || kind === "probably") {
      this.sfx.yes();
    } else if (kind === "no" || kind === "probably_not") {
      this.sfx.no();
    } else {
      this.sfx.ask();
    }

    const m = MULTIPLIERS[kind] || MULTIPLIERS.unknown;

    if (kind === "unknown") {
      // Don't update much
      this.els.wizardLine.textContent = "Very well — we’ll work around the fog.";
    } else {
      for (const item of this.universe) {
        if (this.rejected.has(item.name)) continue;
        const traitOn = hasTrait(item, key);
        let agrees;
        if (kind === "yes" || kind === "probably") agrees = traitOn;
        else agrees = !traitOn; // no / probably_not
        const mult = agrees ? m.match : m.miss;
        this.scores.set(item.name, (this.scores.get(item.name) || 1) * mult);
      }
      this.els.wizardLine.textContent =
        kind === "yes" || kind === "probably" ? "That helps!" : "Hmm, okay — useful too.";
    }

    this.currentTrait = null;
    this.continueDeduction();
  }

  offerGuess(item, isFinal) {
    this._guessItem = item;
    this._finalAttempt = !!isFinal;
    this.show("guess");
    if (!item) {
      this.els.guessTitle.textContent = "The vision fails…";
      this.els.guessText.textContent = "I cannot form a clear guess.";
      this.els.guessIcon.textContent = "🌫️";
      document.getElementById("btn-correct").hidden = true;
      document.getElementById("btn-wrong").textContent = "Continue";
      return;
    }
    document.getElementById("btn-correct").hidden = false;
    document.getElementById("btn-wrong").textContent = "No";
    this.els.guessTitle.textContent = isFinal ? "Final guess…" : "I think I know!";
    this.els.guessIcon.textContent = item.emoji;
    this.els.guessText.innerHTML = `Are you thinking of ${article(item.name)}<strong>${escapeHtml(
      item.name
    )}</strong>? ${item.emoji}`;
    this.sfx.ask();
  }

  afterWrongGuess() {
    if (!this._guessItem) {
      this.finish(false, "You stumped the oracle.");
      return;
    }

    // Reject guess — keep all prior answers; do NOT burn a question
    this.rejected.add(this._guessItem.name);
    this.scores.set(this._guessItem.name, 0);

    if (this._finalAttempt || this.qCount >= MAX_Q) {
      this.finish(
        false,
        `You stumped me! I used all ${MAX_Q} questions. (Last guess was not ${this._guessItem.name}.)`
      );
      return;
    }

    const left = MAX_Q - this.qCount;
    const name = this._guessItem.name;
    this._guessItem = null;
    this.show("play");
    this.els.wizardLine.textContent = `Okay — not ${name}! I still have ${left} question${
      left === 1 ? "" : "s"
    }.`;
    this.els.question.textContent = "Let me think of a better question…";
    // Brief pause then continue
    setTimeout(() => this.continueDeduction(), 400);
  }

  giveUp() {
    const top = this.candidates()
      .sort((a, b) => (this.scores.get(b.name) || 0) - (this.scores.get(a.name) || 0))
      .slice(0, 5)
      .map((x) => x.name);
    this.finish(
      false,
      top.length
        ? `The vision fades. I was still considering: ${top.join(", ")}.`
        : "The vision fades into night."
    );
  }

  finish(won, customMsg) {
    this.show("end");
    if (won) {
      this.sfx.win();
      this.els.endEmoji.textContent = "🌟";
      this.els.endTitle.textContent = "I got it!";
      this.els.endMsg.textContent =
        customMsg ||
        `Guessed after ${this.qCount} question${this.qCount === 1 ? "" : "s"} (guesses don’t count).`;
    } else {
      this.sfx.lose();
      this.els.endEmoji.textContent = "🌙";
      this.els.endTitle.textContent = "You stumped me!";
      this.els.endMsg.textContent = customMsg || "Perhaps another riddle, another night.";
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new TwentyQuestions();
});
