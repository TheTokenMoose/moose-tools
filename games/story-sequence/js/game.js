/**
 * Story Sequence Board — panel order then sentence order
 */

class SFX {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.master = null;
  }
  ensure() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.3;
      this.master.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") this.ctx.resume();
    return this.ctx;
  }
  setEnabled(on) {
    this.enabled = !!on;
  }
  tone(f, d, type = "sine", v = 0.18, when = 0) {
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
    g.connect(this.master);
    o.start(t0);
    o.stop(t0 + d + 0.02);
  }
  tap() {
    this.tone(480, 0.07, "triangle", 0.12);
  }
  ok() {
    this.tone(523, 0.1);
    this.tone(659, 0.12, "sine", 0.18, 0.1);
    this.tone(784, 0.16, "sine", 0.18, 0.2);
  }
  bad() {
    this.tone(180, 0.14, "square", 0.08);
  }
  hint() {
    this.tone(880, 0.08, "sine", 0.1);
  }
}

class StorySequence {
  constructor() {
    this.stories = window.STORY_SEQUENCE_DATA || [];
    this.sfx = new SFX();
    this.story = null;
    this.stage = "panels"; // panels | sentences
    this.order = []; // ids in slot order
    this.bank = [];
    this.hints = 0;
    this.panelStars = 3;
    this.sentenceStars = 3;

    this.els = {
      menu: document.getElementById("screen-menu"),
      play: document.getElementById("screen-play"),
      result: document.getElementById("screen-result"),
      select: document.getElementById("story-select"),
      slots: document.getElementById("slots"),
      bank: document.getElementById("bank"),
      prompt: document.getElementById("play-prompt"),
      hudTitle: document.getElementById("hud-title"),
      hudStage: document.getElementById("hud-stage"),
      mute: document.getElementById("btn-mute"),
    };

    this._fillSelect();
    this._bind();
  }

  _fillSelect() {
    this.els.select.innerHTML = this.stories
      .map((s, i) => `<option value="${i}">${escapeHtml(s.title)} (${escapeHtml(s.origin)})</option>`)
      .join("");
  }

  _bind() {
    document.getElementById("btn-start").addEventListener("click", () => {
      const i = parseInt(this.els.select.value, 10) || 0;
      this.startStory(i);
    });
    document.getElementById("btn-random").addEventListener("click", () => {
      this.startStory(Math.floor(Math.random() * this.stories.length));
    });
    document.getElementById("btn-print-blank").addEventListener("click", () => this.printBlank());
    document.getElementById("btn-menu").addEventListener("click", () => this.showMenu());
    document.getElementById("btn-result-menu").addEventListener("click", () => this.showMenu());
    document.getElementById("btn-another").addEventListener("click", () => {
      this.startStory(Math.floor(Math.random() * this.stories.length));
    });
    document.getElementById("btn-next-stage").addEventListener("click", () => this.onContinue());
    document.getElementById("btn-check").addEventListener("click", () => this.check());
    document.getElementById("btn-hint").addEventListener("click", () => this.hint());
    document.getElementById("btn-reset").addEventListener("click", () => this.resetPieces());
    this.els.mute.addEventListener("click", () => {
      this.sfx.setEnabled(!this.sfx.enabled);
      this.els.mute.textContent = this.sfx.enabled ? "🔊" : "🔇";
    });
  }

  show(name) {
    this.els.menu.hidden = name !== "menu";
    this.els.play.hidden = name !== "play";
    this.els.result.hidden = name !== "result";
  }

  showMenu() {
    this.show("menu");
  }

  startStory(index) {
    this.sfx.ensure();
    this.story = this.stories[index] || this.stories[0];
    this.stage = "panels";
    this.hints = 0;
    this.panelStars = 3;
    this.sentenceStars = 3;
    this.setupStage();
    this.show("play");
  }

  setupStage() {
    const n =
      this.stage === "panels" ? this.story.panels.length : this.story.sentences.length;
    this.order = Array(n).fill(null);
    const ids = Array.from({ length: n }, (_, i) => i);
    this.bank = shuffle(ids);
    // Avoid perfect shuffle luck
    if (this.bank.every((v, i) => v === i) && n > 1) {
      [this.bank[0], this.bank[1]] = [this.bank[1], this.bank[0]];
    }

    this.els.hudTitle.textContent = this.story.title;
    this.els.hudStage.textContent = this.stage === "panels" ? "Stage 1 · Panels" : "Stage 2 · Sentences";
    this.els.prompt.textContent =
      this.stage === "panels"
        ? "Put the scenes in order from first to last. Tap a piece, then a slot."
        : "Now put the sentences in story order.";

    this.selectedBankId = null;
    this.render();
  }

  pieceLabel(id) {
    if (this.stage === "panels") {
      const p = this.story.panels[id];
      return { emoji: p.emoji, text: p.text, sentence: false };
    }
    return { emoji: "", text: this.story.sentences[id], sentence: true };
  }

  render() {
    const n = this.order.length;
    // Slots
    this.els.slots.innerHTML = "";
    for (let i = 0; i < n; i++) {
      const slot = document.createElement("div");
      slot.className = "slot" + (this.order[i] != null ? " filled" : "");
      slot.innerHTML = `<span class="slot-num">${i + 1}</span>`;
      const pid = this.order[i];
      if (pid != null) {
        slot.appendChild(this.makeCard(pid, () => this.removeFromSlot(i)));
      }
      slot.addEventListener("click", (e) => {
        if (e.target.closest(".card")) return;
        this.placeInSlot(i);
      });
      this.els.slots.appendChild(slot);
    }

    // Bank
    this.els.bank.innerHTML = "";
    this.bank.forEach((id) => {
      const card = this.makeCard(id, () => this.pickFromBank(id));
      if (this.selectedBankId === id) {
        card.style.outline = "3px solid #c47b2c";
      }
      this.els.bank.appendChild(card);
    });
  }

  makeCard(id, onClick) {
    const info = this.pieceLabel(id);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "card" + (info.sentence ? " sentence" : "");
    btn.innerHTML = info.emoji
      ? `<span class="card-emoji">${info.emoji}</span><span class="card-text">${escapeHtml(info.text)}</span>`
      : `<span class="card-text">${escapeHtml(info.text)}</span>`;
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      onClick();
    });
    return btn;
  }

  pickFromBank(id) {
    this.selectedBankId = this.selectedBankId === id ? null : id;
    this.sfx.tap();
    // Auto-place into first empty slot
    if (this.selectedBankId != null) {
      const empty = this.order.indexOf(null);
      if (empty !== -1) {
        this.placeInSlot(empty);
        return;
      }
    }
    this.render();
  }

  placeInSlot(slotIndex) {
    if (this.selectedBankId == null) return;
    const id = this.selectedBankId;
    // If slot occupied, return that piece to bank
    if (this.order[slotIndex] != null) {
      this.bank.push(this.order[slotIndex]);
    }
    this.order[slotIndex] = id;
    this.bank = this.bank.filter((x) => x !== id);
    this.selectedBankId = null;
    this.sfx.tap();
    this.render();
  }

  removeFromSlot(slotIndex) {
    const id = this.order[slotIndex];
    if (id == null) return;
    this.order[slotIndex] = null;
    this.bank.push(id);
    this.sfx.tap();
    this.render();
  }

  resetPieces() {
    const n = this.order.length;
    this.order = Array(n).fill(null);
    this.bank = shuffle(Array.from({ length: n }, (_, i) => i));
    this.selectedBankId = null;
    this.sfx.tap();
    this.render();
  }

  hint() {
    // Reveal next correct piece for first wrong/empty slot
    let target = -1;
    for (let i = 0; i < this.order.length; i++) {
      if (this.order[i] !== i) {
        target = i;
        break;
      }
    }
    if (target === -1) return;
    this.hints += 1;
    this.sfx.hint();
    // Flash correct card in bank or note
    this.els.prompt.textContent = `Hint: position ${target + 1} is “${this.pieceLabel(target).text.slice(0, 48)}…”`;
    this.els.bank.querySelectorAll(".card").forEach((el, idx) => {
      if (this.bank[idx] === target) {
        el.classList.add("correct-flash");
        setTimeout(() => el.classList.remove("correct-flash"), 600);
      }
    });
  }

  check() {
    if (this.order.some((x) => x == null)) {
      this.els.prompt.textContent = "Fill every slot, then check.";
      this.sfx.bad();
      return;
    }
    const correct = this.order.every((id, i) => id === i);
    if (correct) {
      this.sfx.ok();
      const stars = this.hints === 0 ? 3 : this.hints === 1 ? 2 : 1;
      if (this.stage === "panels") this.panelStars = stars;
      else this.sentenceStars = stars;
      this.showResult(true);
    } else {
      this.sfx.bad();
      this.els.slots.querySelectorAll(".card").forEach((c) => {
        c.classList.add("wrong-flash");
        setTimeout(() => c.classList.remove("wrong-flash"), 400);
      });
      this.els.prompt.textContent = "Not quite — try a different order. Use Hint if needed.";
    }
  }

  showResult(success) {
    this.show("result");
    const stageDone = this.stage;
    const stars = stageDone === "panels" ? this.panelStars : this.sentenceStars;
    document.getElementById("result-stars").textContent = "⭐".repeat(stars);
    const nextBtn = document.getElementById("btn-next-stage");
    if (stageDone === "panels") {
      document.getElementById("result-title").textContent = "Panels complete!";
      document.getElementById("result-msg").textContent =
        "Great sequencing. Next: put the sentences in order.";
      nextBtn.hidden = false;
      nextBtn.textContent = "Sentence stage";
    } else {
      document.getElementById("result-title").textContent = "Story complete!";
      document.getElementById("result-msg").textContent =
        `You sequenced “${this.story.title}”. Panel ⭐${this.panelStars} · Sentence ⭐${this.sentenceStars}`;
      nextBtn.hidden = false;
      nextBtn.textContent = "Random new story";
    }
  }

  onContinue() {
    if (this.stage === "panels") {
      this.stage = "sentences";
      this.hints = 0;
      this.setupStage();
      this.show("play");
    } else {
      this.startStory(Math.floor(Math.random() * this.stories.length));
    }
  }

  printBlank() {
    const root = document.getElementById("print-root");
    root.innerHTML = `
      <div class="print-sheet">
        <h1>My Story Sequence Board</h1>
        <div class="meta-lines">
          <span>Name:</span>
          <span>Date:</span>
          <span>Title:</span>
        </div>
        <div class="print-grid">
          ${[1, 2, 3, 4]
            .map(
              (n) => `
            <div class="print-panel">
              <div class="num">Scene ${n}</div>
              <div class="draw"></div>
              <div class="write"></div>
              <div class="write"></div>
            </div>`
            )
            .join("")}
        </div>
        <div class="print-footer">
          <p><strong>Write your story in order:</strong></p>
          <div class="line"></div>
          <div class="line"></div>
          <div class="line"></div>
          <div class="line"></div>
          <p style="margin-top:10px"><strong>Moral or message (optional):</strong></p>
          <div class="line"></div>
        </div>
      </div>
    `;
    requestAnimationFrame(() => window.print());
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

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

document.addEventListener("DOMContentLoaded", () => {
  new StorySequence();
});
