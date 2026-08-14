/**
 * The Enchanted Library — choose-your-own-adventure
 * Click choices · multiple reading levels · TTS "Hear the page"
 */
(function () {
  const DATA = () => window.ENCHANTED_STORIES;
  const SCENE_EMOJI = {
    treasure: "🗝️",
    dragon_friend: "🐉",
    castle: "🏰",
    forest_home: "🌲",
    star_ship: "🚀",
    ocean_boat: "⛵",
    library_return: "📚",
    feast: "🥧",
    crown: "👑",
    map: "🗺️",
    phoenix: "🔥",
    unicorn: "🦄",
    wizard: "🧙",
    garden: "🌸",
    mountain: "⛰️",
    cave_light: "🕯️",
    bridge: "🌉",
    village: "🏠",
    moon: "🌙",
    sun: "☀️",
  };
  const WORLD_EMOJI = { forest: "🌲", castle: "🏰", sea: "🌊", stars: "⭐" };

  class Adventure {
    constructor() {
      this.level = null;
      this.world = null;
      this.nodeId = null;
      this.speaking = false;
      this.utterance = null;

      this.els = {
        menu: document.getElementById("screen-menu"),
        worlds: document.getElementById("screen-worlds"),
        page: document.getElementById("screen-page"),
        ending: document.getElementById("screen-ending"),
        levelGrid: document.getElementById("level-grid"),
        worldGrid: document.getElementById("world-grid"),
        pageText: document.getElementById("page-text"),
        choices: document.getElementById("choices"),
        crumb: document.getElementById("crumb"),
        endingTitle: document.getElementById("ending-title"),
        endingArt: document.getElementById("ending-art"),
        endingText: document.getElementById("ending-text"),
        hearBtn: document.getElementById("btn-hear"),
        hearEnd: document.getElementById("btn-hear-end"),
      };

      this.bind();
      this.renderLevels();
      this.show("menu");
    }

    bind() {
      document.getElementById("btn-back-menu").addEventListener("click", () => {
        this.stopSpeech();
        this.show("menu");
      });
      document.getElementById("btn-back-worlds").addEventListener("click", () => {
        this.stopSpeech();
        this.renderWorlds();
        this.show("worlds");
      });
      document.getElementById("btn-restart").addEventListener("click", () => {
        this.stopSpeech();
        this.show("menu");
      });
      document.getElementById("btn-again-world").addEventListener("click", () => {
        this.stopSpeech();
        if (this.world) this.startWorld(this.world);
      });
      this.els.hearBtn.addEventListener("click", () => this.speakPage());
      this.els.hearEnd.addEventListener("click", () => this.speakEnding());
    }

    show(name) {
      this.els.menu.hidden = name !== "menu";
      this.els.worlds.hidden = name !== "worlds";
      this.els.page.hidden = name !== "page";
      this.els.ending.hidden = name !== "ending";
    }

    renderLevels() {
      const data = DATA();
      const box = this.els.levelGrid;
      box.innerHTML = "";
      ["easy", "medium", "hard"].forEach((id) => {
        const L = data.levels[id];
        if (!L) return;
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "menu-card";
        btn.innerHTML =
          `<div class="emoji">${id === "easy" ? "📗" : id === "medium" ? "📘" : "📙"}</div>` +
          `<strong>${escapeHtml(L.label)}</strong>` +
          `<span>${escapeHtml(L.blurb)}</span>`;
        btn.addEventListener("click", () => {
          this.level = id;
          this.renderWorlds();
          this.show("worlds");
        });
        box.appendChild(btn);
      });
    }

    renderWorlds() {
      const data = DATA();
      const L = data.levels[this.level];
      const box = this.els.worldGrid;
      box.innerHTML = "";
      document.getElementById("worlds-hub").textContent =
        data.hubs[this.level] || "Choose a doorway into the story.";
      (L.worlds || []).forEach((w) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "menu-card";
        btn.innerHTML =
          `<div class="emoji">${WORLD_EMOJI[w.id] || "📖"}</div>` +
          `<strong>${escapeHtml(w.title)}</strong>` +
          `<span>A branching path · many endings</span>`;
        btn.addEventListener("click", () => this.startWorld(w));
        box.appendChild(btn);
      });
    }

    startWorld(w) {
      this.world = w;
      this.nodeId = w.start;
      this.renderNode();
      this.show("page");
    }

    getNode() {
      return DATA().nodes[this.nodeId];
    }

    renderNode() {
      this.stopSpeech();
      const n = this.getNode();
      if (!n) return;
      if (n.ending) {
        this.showEnding(n);
        return;
      }
      this.els.pageText.textContent = n.text;
      this.els.crumb.textContent = `${DATA().levels[this.level].label} · ${this.world.title}`;
      const box = this.els.choices;
      box.innerHTML = "";
      (n.choices || []).forEach((c) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "choice-btn";
        btn.textContent = c.text;
        btn.addEventListener("click", () => {
          this.nodeId = c.next;
          this.renderNode();
        });
        box.appendChild(btn);
      });
      this.show("page");
    }

    showEnding(n) {
      this.stopSpeech();
      const scene = n.scene || "library_return";
      this.els.endingTitle.textContent = n.title || "The End";
      this.els.endingText.textContent = n.text;
      this.els.endingArt.className = "ending-art scene-" + scene;
      this.els.endingArt.innerHTML =
        `<span aria-hidden="true">${SCENE_EMOJI[scene] || "📖"}</span>` +
        `<span class="caption">Closing picture</span>`;
      this.show("ending");
    }

    pageSpeechText() {
      const n = this.getNode();
      if (!n) return "";
      let t = n.text;
      if (!n.ending && n.choices) {
        t += " Your choices are: " + n.choices.map((c) => c.text).join(". ");
      }
      return t;
    }

    speakPage() {
      const text = this.pageSpeechText();
      this.speak(text, this.els.hearBtn);
    }

    speakEnding() {
      const t =
        (this.els.endingTitle.textContent || "") +
        ". " +
        (this.els.endingText.textContent || "") +
        " The end.";
      this.speak(t, this.els.hearEnd);
    }

    speak(text, btn) {
      if (!window.speechSynthesis) {
        alert("Sorry — read-aloud is not available in this browser.");
        return;
      }
      if (this.speaking) {
        this.stopSpeech();
        return;
      }
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.95;
      u.pitch = 1;
      const voices = window.speechSynthesis.getVoices();
      const en = voices.find((v) => /en[-_]?US/i.test(v.lang) && /child|female|samantha|google/i.test(v.name))
        || voices.find((v) => /^en/i.test(v.lang));
      if (en) u.voice = en;
      u.onend = () => {
        this.speaking = false;
        if (btn) btn.classList.remove("is-speaking");
        if (btn) btn.textContent = "🔊 Hear the page";
      };
      u.onerror = () => {
        this.speaking = false;
        if (btn) btn.classList.remove("is-speaking");
      };
      this.utterance = u;
      this.speaking = true;
      if (btn) {
        btn.classList.add("is-speaking");
        btn.textContent = "⏹ Stop";
      }
      window.speechSynthesis.speak(u);
    }

    stopSpeech() {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      this.speaking = false;
      [this.els.hearBtn, this.els.hearEnd].forEach((b) => {
        if (!b) return;
        b.classList.remove("is-speaking");
        b.textContent = "🔊 Hear the page";
      });
    }
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // Chrome often loads voices async
  if (window.speechSynthesis) {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (!window.ENCHANTED_STORIES) {
      console.error("Stories not loaded");
      return;
    }
    new Adventure();
  });
})();
