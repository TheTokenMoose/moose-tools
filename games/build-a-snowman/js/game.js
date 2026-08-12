const PARTS = ["ground", "base", "mid", "head", "eyes", "nose", "arms", "hat", "scarf"];
// Map wrong count to parts revealed (build up the snowman = running out of guesses)
const PART_ORDER = ["ground", "base", "mid", "head", "eyes", "nose", "arms", "hat", "scarf"];

function normalizeWord(s) {
  return String(s || "")
    .toUpperCase()
    .replace(/[^A-Z\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

class SnowmanGame {
  constructor() {
    this.maxWrong = 6;
    this.word = "";
    this.hint = "";
    this.guessed = new Set();
    this.wrong = 0;
    this.mode = "auto";
    this.lastMode = "auto";

    this.els = {
      menu: document.getElementById("screen-menu"),
      secret: document.getElementById("screen-secret"),
      play: document.getElementById("screen-play"),
      end: document.getElementById("screen-end"),
      stage: document.getElementById("snow-stage"),
      slots: document.getElementById("word-slots"),
      keys: document.getElementById("keyboard"),
      status: document.getElementById("status"),
      lives: document.getElementById("lives"),
      hint: document.getElementById("hint-line"),
    };

    this.buildStage();
    this.bind();
  }

  bind() {
    document.getElementById("btn-auto").addEventListener("click", () => {
      this.mode = "auto";
      this.lastMode = "auto";
      this.startAuto();
    });
    document.getElementById("btn-hotseat").addEventListener("click", () => {
      this.mode = "hotseat";
      this.lastMode = "hotseat";
      this.show("secret");
      document.getElementById("secret-input").value = "";
      document.getElementById("secret-hint").value = "";
      document.getElementById("secret-input").focus();
    });
    document.getElementById("btn-secret-cancel").addEventListener("click", () => this.show("menu"));
    document.getElementById("btn-secret-start").addEventListener("click", () => this.startHotseat());
    document.getElementById("btn-quit").addEventListener("click", () => this.show("menu"));
    document.getElementById("btn-menu").addEventListener("click", () => this.show("menu"));
    document.getElementById("btn-again").addEventListener("click", () => {
      if (this.lastMode === "hotseat") {
        this.show("secret");
      } else {
        this.startAuto();
      }
    });
    window.addEventListener("keydown", (e) => {
      if (this.els.play.hidden) return;
      const k = e.key.toUpperCase();
      if (k.length === 1 && k >= "A" && k <= "Z") this.guess(k);
    });
  }

  show(name) {
    this.els.menu.hidden = name !== "menu";
    this.els.secret.hidden = name !== "secret";
    this.els.play.hidden = name !== "play";
    this.els.end.hidden = name !== "end";
  }

  buildStage() {
    const s = this.els.stage;
    s.innerHTML = `<div class="snowman" id="snowman">
      <div class="sm-part sm-ground" data-part="ground"></div>
      <div class="sm-part sm-base" data-part="base"></div>
      <div class="sm-part sm-mid" data-part="mid"></div>
      <div class="sm-part sm-head" data-part="head"></div>
      <div class="sm-part sm-eyes" data-part="eyes"><i></i><i></i></div>
      <div class="sm-part sm-nose" data-part="nose"></div>
      <div class="sm-part sm-arms" data-part="arms"></div>
      <div class="sm-part sm-hat" data-part="hat"></div>
      <div class="sm-part sm-scarf" data-part="scarf"></div>
    </div>`;
  }

  readMaxWrong() {
    return parseInt(document.getElementById("max-wrong").value, 10) || 6;
  }

  startAuto() {
    const bank = window.SNOWMAN_WORDS || ["SNOW", "FRIEND"];
    this.word = bank[Math.floor(Math.random() * bank.length)];
    this.hint = "Classroom word";
    this.beginRound();
  }

  startHotseat() {
    const raw = document.getElementById("secret-input").value;
    const word = normalizeWord(raw);
    if (word.length < 2) {
      alert("Please enter a word with at least 2 letters.");
      return;
    }
    this.word = word;
    this.hint = (document.getElementById("secret-hint").value || "Secret word").trim();
    this.beginRound();
  }

  beginRound() {
    this.maxWrong = this.readMaxWrong();
    this.guessed = new Set();
    this.wrong = 0;
    this.show("play");
    this.els.hint.textContent = this.hint ? `Hint: ${this.hint}` : "";
    this.renderSlots();
    this.renderKeys();
    this.renderSnowman();
    this.updateStatus("Pick a letter");
  }

  lettersInWord() {
    return new Set([...this.word].filter((c) => c >= "A" && c <= "Z"));
  }

  renderSlots() {
    const box = this.els.slots;
    box.innerHTML = "";
    for (const ch of this.word) {
      const slot = document.createElement("div");
      if (ch === " ") {
        slot.className = "slot space";
      } else {
        slot.className = "slot";
        if (this.guessed.has(ch)) slot.textContent = ch;
      }
      box.appendChild(slot);
    }
  }

  renderKeys() {
    const box = this.els.keys;
    box.innerHTML = "";
    for (let i = 0; i < 26; i++) {
      const letter = String.fromCharCode(65 + i);
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "key";
      btn.textContent = letter;
      if (this.guessed.has(letter)) {
        btn.disabled = true;
        btn.classList.add(this.word.includes(letter) ? "ok" : "bad");
      }
      btn.addEventListener("click", () => this.guess(letter));
      box.appendChild(btn);
    }
  }

  renderSnowman() {
    // Reveal parts proportional to wrong guesses
    const steps = Math.min(PART_ORDER.length, this.maxWrong);
    const showCount = Math.round((this.wrong / this.maxWrong) * steps);
    document.querySelectorAll(".sm-part").forEach((el) => {
      const part = el.getAttribute("data-part");
      const idx = PART_ORDER.indexOf(part);
      el.classList.toggle("on", idx >= 0 && idx < showCount);
    });
    this.els.lives.textContent = `Misses: ${this.wrong} / ${this.maxWrong}`;
  }

  updateStatus(msg) {
    this.els.status.textContent = msg;
  }

  guess(letter) {
    letter = letter.toUpperCase();
    if (this.guessed.has(letter) || this.els.play.hidden) return;
    this.guessed.add(letter);
    if (this.word.includes(letter)) {
      this.updateStatus(`Nice! “${letter}” is in the word`);
      this.renderSlots();
      this.renderKeys();
      if ([...this.lettersInWord()].every((c) => this.guessed.has(c))) {
        this.end(true);
      }
    } else {
      this.wrong += 1;
      this.updateStatus(`No “${letter}” — snowman grows`);
      this.renderKeys();
      this.renderSnowman();
      if (this.wrong >= this.maxWrong) this.end(false);
    }
  }

  end(won) {
    this.show("end");
    document.getElementById("end-emoji").textContent = won ? "🎉" : "❄️";
    document.getElementById("end-title").textContent = won
      ? "You saved the day!"
      : "Snowman complete!";
    document.getElementById("end-sub").textContent = won
      ? "Great letter detective work."
      : "The snowman is finished — try another word!";
    document.getElementById("end-word").textContent = this.word;
  }
}

document.addEventListener("DOMContentLoaded", () => new SnowmanGame());
