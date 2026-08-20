/**
 * The Enchanted Library — choose-your-own-adventure
 * Supports expanded story graphs (any node/choice/ending counts).
 * Click choices · multiple reading levels · TTS "Hear the page"
 */
(function () {
  const USER_STORIES_KEY = "token-moose-enchanted-user-stories";

  /** Deep-clone default stories and merge class packs from Story Workshop */
  function getMergedStories() {
    const base = window.ENCHANTED_STORIES;
    if (!base || typeof base !== "object") return base;

    let packs = [];
    // Built-in class stories (shipped with the game)
    try {
      if (window.ENCHANTED_CLASS_DEFAULTS && Array.isArray(window.ENCHANTED_CLASS_DEFAULTS.packs)) {
        packs = packs.concat(window.ENCHANTED_CLASS_DEFAULTS.packs);
      }
    } catch (_) {}
    // Teacher / Story Workshop packs from this device
    try {
      const raw = localStorage.getItem(USER_STORIES_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        if (data && Array.isArray(data.packs)) packs = packs.concat(data.packs);
      }
    } catch (_) {}

    if (!packs.length) return base;

    // Shallow structural clone so we never mutate the bundled default object
    const merged = {
      title: base.title,
      subtitle: base.subtitle,
      hubs: base.hubs,
      levels: {},
      nodes: Object.assign({}, base.nodes),
    };

    Object.keys(base.levels || {}).forEach((lid) => {
      const L = base.levels[lid];
      merged.levels[lid] = {
        id: L.id,
        label: L.label,
        blurb: L.blurb,
        worlds: (L.worlds || []).slice(),
      };
    });

    packs.forEach((pack) => {
      if (!pack || !pack.nodes || !pack.start) return;
      const level = pack.level || "easy";
      if (!merged.levels[level]) {
        merged.levels[level] = {
          id: level,
          label: level,
          blurb: "Class stories",
          worlds: [],
        };
      }
      // Ensure start node exists in pack.nodes
      if (!pack.nodes[pack.start]) return;

      Object.keys(pack.nodes).forEach((nid) => {
        merged.nodes[nid] = pack.nodes[nid];
      });

      const endings = Object.keys(pack.nodes).filter(
        (k) => pack.nodes[k] && pack.nodes[k].ending === true
      ).length;

      const world = {
        id: pack.worldId || pack.id || "user_story",
        title: (pack.title || pack.worldTitle || "Class story") + " ★",
        start: pack.start,
        endings: endings,
        userCreated: true,
      };

      // Avoid duplicate world ids if re-opening
      const worlds = merged.levels[level].worlds;
      const filtered = worlds.filter((w) => w.id !== world.id);
      filtered.push(world);
      merged.levels[level].worlds = filtered;
    });

    return merged;
  }

  const DATA = () => getMergedStories();


  const SCENE_EMOJI = {
    treasure: "🗝️",
    dragon_friend: "🐉",
    castle: "🏰",
    forest: "🌲",
    forest_home: "🌲",
    sea: "🌊",
    star_ship: "🚀",
    stars: "⭐",
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
  const KNOWN_SCENES = new Set(Object.keys(SCENE_EMOJI));

  /**
   * Validate story graph integrity once at load.
   * Does not traverse for play — only checks structure.
   */
  function validateStories(data) {
    const errors = [];
    if (!data || typeof data !== "object") {
      return ["ENCHANTED_STORIES is missing or not an object"];
    }
    if (!data.levels || typeof data.levels !== "object") {
      errors.push("Missing levels");
    }
    if (!data.nodes || typeof data.nodes !== "object") {
      errors.push("Missing nodes");
    }
    if (errors.length) return errors;

    const nodes = data.nodes;
    const nodeIds = new Set(Object.keys(nodes));

    Object.keys(data.levels).forEach((lid) => {
      const L = data.levels[lid];
      if (!L || !Array.isArray(L.worlds)) {
        errors.push(`Level "${lid}" missing worlds array`);
        return;
      }
      L.worlds.forEach((w) => {
        if (!w || !w.start) {
          errors.push(`Level "${lid}" has a world without start`);
          return;
        }
        if (!nodeIds.has(w.start)) {
          errors.push(`World start missing: ${lid}/${w.id || "?"} → ${w.start}`);
        }
      });
    });

    Object.keys(nodes).forEach((id) => {
      const n = nodes[id];
      if (!n || typeof n !== "object") {
        errors.push(`Invalid node object: ${id}`);
        return;
      }
      if (n.ending === true) {
        if (!n.text) errors.push(`Ending missing text: ${id}`);
        if (!n.title) errors.push(`Ending missing title: ${id}`);
        // Unknown scene keys are tolerated (mapped at render time)
        if (n.scene && !KNOWN_SCENES.has(n.scene)) {
          /* non-fatal: console.debug only */
        }
      } else {
        const choices = n.choices;
        if (!Array.isArray(choices) || choices.length === 0) {
          errors.push(`Non-ending node has no choices: ${id}`);
          return;
        }
        choices.forEach((c, i) => {
          if (!c || typeof c !== "object") {
            errors.push(`Bad choice #${i} on ${id}`);
            return;
          }
          if (!c.next) {
            errors.push(`Choice missing next on ${id} (#${i})`);
          } else if (!nodeIds.has(c.next)) {
            errors.push(`Broken choice target: ${id} → ${c.next}`);
          }
        });
      }
    });

    return errors;
  }

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

      this.voice = window.TokenMooseVoice
        ? TokenMooseVoice.create("enchanted-library")
        : null;
      this.bind();
      this.renderLevels();
      this.show("menu");
      if (this.voice) {
        const slot = document.getElementById("tm-voice-slot");
        const slotEnd = document.getElementById("tm-voice-slot-end");
        if (slot) this.voice.mountPicker(slot);
        if (slotEnd) this.voice.mountPicker(slotEnd);
      }
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
      const order = ["easy", "medium", "hard"];
      const ids = order.filter((id) => data.levels && data.levels[id]);
      // Include any extra levels not in the preferred order
      Object.keys(data.levels || {}).forEach((id) => {
        if (!ids.includes(id)) ids.push(id);
      });
      ids.forEach((id) => {
        const L = data.levels[id];
        if (!L) return;
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "menu-card";
        const emoji = id === "easy" ? "📗" : id === "medium" ? "📘" : id === "hard" ? "📙" : "📖";
        btn.innerHTML =
          `<div class="emoji">${emoji}</div>` +
          `<strong>${escapeHtml(L.label || id)}</strong>` +
          `<span>${escapeHtml(L.blurb || "")}</span>`;
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
        (data.hubs && data.hubs[this.level]) || "Choose a doorway into the story.";
      (L.worlds || []).forEach((w) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "menu-card";
        btn.innerHTML =
          `<div class="emoji">${WORLD_EMOJI[w.id] || "📖"}</div>` +
          `<strong>${escapeHtml(w.title || w.id)}</strong>` +
          `<span>A branching path · many endings</span>`;
        btn.addEventListener("click", () => this.startWorld(w));
        box.appendChild(btn);
      });
    }

    startWorld(w) {
      this.world = w;
      this.nodeId = w.start;
      this.renderNode();
    }

    getNode() {
      const data = DATA();
      if (!data || !data.nodes) return null;
      return data.nodes[this.nodeId] || null;
    }

    renderNode() {
      this.stopSpeech();
      const n = this.getNode();
      if (!n) {
        console.error("[Enchanted Library] Missing node:", this.nodeId);
        this.els.pageText.textContent =
          "This page is missing from the book (node: " + (this.nodeId || "?") + "). Try another doorway.";
        this.els.choices.innerHTML = "";
        const back = document.createElement("button");
        back.type = "button";
        back.className = "choice-btn";
        back.textContent = "Return to doorways";
        back.addEventListener("click", () => {
          this.renderWorlds();
          this.show("worlds");
        });
        this.els.choices.appendChild(back);
        this.show("page");
        return;
      }

      // Ending detection: explicit flag only (not id naming)
      if (n.ending === true) {
        this.showEnding(n);
        return;
      }

      this.els.pageText.textContent = n.text || "";
      const levelLabel =
        (DATA().levels[this.level] && DATA().levels[this.level].label) || this.level;
      const worldTitle = (this.world && this.world.title) || "";
      this.els.crumb.textContent = levelLabel + (worldTitle ? " · " + worldTitle : "");

      const box = this.els.choices;
      box.innerHTML = "";
      const choices = Array.isArray(n.choices) ? n.choices : [];
      if (!choices.length) {
        console.error("[Enchanted Library] Node has no choices:", this.nodeId);
        const back = document.createElement("button");
        back.type = "button";
        back.className = "choice-btn";
        back.textContent = "Return to doorways";
        back.addEventListener("click", () => {
          this.renderWorlds();
          this.show("worlds");
        });
        box.appendChild(back);
      } else {
        // Dynamic: 1, 2, 3, 4+ choices — never assume a fixed count
        choices.forEach((c) => {
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = "choice-btn";
          btn.textContent = c.text || "Continue";
          btn.addEventListener("click", () => {
            if (!c.next) {
              console.error("[Enchanted Library] Choice missing next on", this.nodeId);
              return;
            }
            this.nodeId = c.next;
            this.renderNode();
          });
          box.appendChild(btn);
        });
      }
      this.show("page");
      // Keep current passage in view after navigation
      if (this.els.pageText && this.els.pageText.scrollIntoView) {
        try {
          this.els.pageText.scrollIntoView({ block: "nearest", behavior: "smooth" });
        } catch (_) {}
      }
    }

    showEnding(n) {
      this.stopSpeech();
      const scene = n.scene && KNOWN_SCENES.has(n.scene) ? n.scene : "library_return";
      this.els.endingTitle.textContent = n.title || "The End";
      this.els.endingText.textContent = n.text || "";
      this.els.endingArt.className = "ending-art scene-" + scene;
      this.els.endingArt.innerHTML =
        `<span aria-hidden="true">${SCENE_EMOJI[scene] || "📖"}</span>` +
        `<span class="caption">Closing picture</span>`;
      this.show("ending");
    }

    pageSpeechText() {
      const n = this.getNode();
      if (!n) return "";
      let t = n.text || "";
      if (n.ending !== true && Array.isArray(n.choices) && n.choices.length) {
        t += " Your choices are: " + n.choices.map((c) => c.text || "").filter(Boolean).join(". ");
      }
      return t;
    }

    speakPage() {
      this.speak(this.pageSpeechText(), this.els.hearBtn);
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
      if (!text) return;
      if (!window.speechSynthesis && !this.voice) {
        alert("Sorry — read-aloud is not available in this browser.");
        return;
      }
      if (this.speaking) {
        this.stopSpeech();
        return;
      }
      this.speaking = true;
      if (btn) {
        btn.classList.add("is-speaking");
        btn.textContent = "⏹ Stop";
      }
      const clear = () => {
        this.speaking = false;
        if (btn) {
          btn.classList.remove("is-speaking");
          btn.textContent = "🔊 Hear the page";
        }
      };
      if (this.voice) {
        this.voice.speak(text, { onend: clear, onerror: clear });
      } else {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.onend = clear;
        u.onerror = clear;
        window.speechSynthesis.speak(u);
      }
    }

    stopSpeech() {
      if (this.voice) this.voice.stop();
      else if (window.speechSynthesis) window.speechSynthesis.cancel();
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

  /**
   * Lightweight path tests (no DOM): walk random and forced routes.
   * Runs only in console via window.__testEnchantedLibrary()
   */
  function testAllWorlds() {
    const data = DATA();
    const report = [];
    Object.keys(data.levels).forEach((lid) => {
      data.levels[lid].worlds.forEach((w) => {
        // Path A: always first choice
        let id = w.start;
        const pathA = [id];
        let guard = 0;
        while (guard++ < 50) {
          const n = data.nodes[id];
          if (!n) {
            report.push(`FAIL ${lid}/${w.id} pathA missing ${id}`);
            break;
          }
          if (n.ending === true) {
            report.push(`OK ${lid}/${w.id} pathA → "${n.title}" (${pathA.length} steps)`);
            break;
          }
          if (!n.choices || !n.choices.length) {
            report.push(`FAIL ${lid}/${w.id} pathA no choices at ${id}`);
            break;
          }
          id = n.choices[0].next;
          pathA.push(id);
        }
        // Path B: prefer last choice when multiple (side adventures)
        id = w.start;
        const pathB = [id];
        guard = 0;
        while (guard++ < 50) {
          const n = data.nodes[id];
          if (!n) {
            report.push(`FAIL ${lid}/${w.id} pathB missing ${id}`);
            break;
          }
          if (n.ending === true) {
            report.push(`OK ${lid}/${w.id} pathB → "${n.title}" (${pathB.length} steps)`);
            break;
          }
          const ch = n.choices || [];
          id = ch[ch.length - 1].next;
          pathB.push(id);
        }
        // 3-choice nodes reachable?
        const with3 = [];
        const seen = new Set();
        const q = [w.start];
        while (q.length) {
          const cur = q.pop();
          if (seen.has(cur)) continue;
          seen.add(cur);
          const n = data.nodes[cur];
          if (!n || n.ending === true) continue;
          const ch = n.choices || [];
          if (ch.length >= 3) with3.push(cur);
          ch.forEach((c) => q.push(c.next));
        }
        report.push(
          `INFO ${lid}/${w.id}: reachable ${seen.size}, nodes with 3+ choices: ${with3.length}`
        );
      });
    });
    return report;
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (!window.ENCHANTED_STORIES) {
      console.error("[Enchanted Library] Stories not loaded (window.ENCHANTED_STORIES missing)");
      return;
    }
    const errs = validateStories(getMergedStories() || window.ENCHANTED_STORIES);
    if (errs.length) {
      console.error("[Enchanted Library] Story validation failed:");
      errs.forEach((e) => console.error("  ·", e));
    } else {
      const _merged = getMergedStories() || window.ENCHANTED_STORIES;
      const n = Object.keys(_merged.nodes).length;
      const ends = Object.keys(_merged.nodes).filter(
        (k) => _merged.nodes[k].ending === true
      ).length;
      console.info(
        `[Enchanted Library] Story graph OK · ${n} nodes · ${ends} endings`
      );
    }
    window.__testEnchantedLibrary = testAllWorlds;
    new Adventure();
  });
})();
