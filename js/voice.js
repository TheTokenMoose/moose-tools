/**
 * Token Moose — shared speech helper
 * Natural system-voice preference + per-app voice picker (localStorage).
 *
 * Usage:
 *   const voice = TokenMooseVoice.create("enchanted-library");
 *   voice.speak("Hello");
 *   voice.mountPicker(document.getElementById("toolbar"));
 *
 * Future apps: same pattern. One module, per-app saved choice.
 */
(function (global) {
  const STORAGE_PREFIX = "token-moose-voice-choice:";
  const RATE_DEFAULT = 0.95;
  const PITCH_DEFAULT = 1;

  const PREFERRED_NAME =
    /neural|natural|google|microsoft|samantha|karen|moira|daniel|moira|premium|enhanced|aria|jenny|guy|sara|zira|susan|tom|alex|fiona|victoria|serena|ava|allison/i;
  const AVOID_NAME = /espeak|compact|robot|novelty|whisper|zarvox|bad\s*news|cellos|boing|organ|trinoids/i;

  function storageKey(appId) {
    return STORAGE_PREFIX + (appId || "default");
  }

  function safeGet(key) {
    try {
      return localStorage.getItem(key);
    } catch (_) {
      return null;
    }
  }
  function safeSet(key, val) {
    try {
      localStorage.setItem(key, val);
    } catch (_) {}
  }

  function listVoices() {
    if (!global.speechSynthesis) return [];
    return global.speechSynthesis.getVoices() || [];
  }

  function scoreVoice(v) {
    let s = 0;
    const lang = (v.lang || "").toLowerCase();
    if (lang.startsWith("en")) s += 50;
    if (lang === "en-us" || lang === "en_us") s += 15;
    if (lang === "en-gb" || lang === "en_gb") s += 10;
    if (v.localService) s += 8;
    if (PREFERRED_NAME.test(v.name || "")) s += 25;
    if (AVOID_NAME.test(v.name || "")) s -= 40;
    // slight preference for female-sounding names often clearer for kids (heuristic only)
    if (/female|woman|girl|samantha|karen|moira|zira|susan|sara|aria|jenny|ava/i.test(v.name || "")) s += 3;
    return s;
  }

  function pickBest(voices) {
    if (!voices.length) return null;
    return voices.slice().sort((a, b) => scoreVoice(b) - scoreVoice(a))[0] || null;
  }

  function findByURI(voices, uri) {
    if (!uri) return null;
    return voices.find((v) => v.voiceURI === uri) || null;
  }

  function ensureVoicesLoaded(cb) {
    if (!global.speechSynthesis) {
      cb([]);
      return;
    }
    let voices = listVoices();
    if (voices.length) {
      cb(voices);
      return;
    }
    const done = () => {
      global.speechSynthesis.removeEventListener("voiceschanged", done);
      cb(listVoices());
    };
    global.speechSynthesis.addEventListener("voiceschanged", done);
    // Fallback timeout
    setTimeout(() => cb(listVoices()), 500);
  }

  function create(appId, options) {
    const opts = options || {};
    const id = appId || "default";
    let enabled = opts.enabled !== false;
    let rate = opts.rate != null ? opts.rate : RATE_DEFAULT;
    let pitch = opts.pitch != null ? opts.pitch : PITCH_DEFAULT;
    let selectedURI = safeGet(storageKey(id)); // null => auto
    let currentUtterance = null;
    let pickerEl = null;

    function resolveVoice(voices) {
      const chosen = findByURI(voices, selectedURI);
      if (chosen) return chosen;
      return pickBest(voices.filter((v) => /^en/i.test(v.lang || "")) || voices);
    }

    function speak(text, speakOpts) {
      if (!enabled || !text) return null;
      const so = speakOpts || {};
      const r = so.rate != null ? so.rate : rate;

      // Piper catalog selection stored as "piper:<id>"
      if (selectedURI && String(selectedURI).indexOf("piper:") === 0 && global.MooseTTS) {
        const pid = String(selectedURI).slice(6);
        global.MooseTTS.speak(String(text), { rate: r, voiceId: pid }).then(function () {
          if (so.onend) try { so.onend(); } catch (_) {}
        }).catch(function (err) {
          if (so.onerror) try { so.onerror(err); } catch (_) {}
        });
        return { engine: "MooseTTS" };
      }

      // Explicit system voice → browser engine
      if (selectedURI && String(selectedURI).indexOf("piper:") !== 0) {
        if (global.MooseTTS && typeof global.MooseTTS.speak === "function") {
          global.MooseTTS.speak(String(text), {
            rate: r,
            engine: "browser",
            browserVoiceURI: selectedURI,
          }).then(function () {
            if (so.onend) try { so.onend(); } catch (_) {}
          }).catch(function (err) {
            if (so.onerror) try { so.onerror(err); } catch (_) {}
          });
          return { engine: "browser" };
        }
      }

      // Auto: prefer MooseTTS (Piper default + fallback)
      if (!selectedURI && global.MooseTTS && typeof global.MooseTTS.speak === "function") {
        global.MooseTTS.speak(String(text), { rate: r }).then(function () {
          if (so.onend) try { so.onend(); } catch (_) {}
        }).catch(function (err) {
          if (so.onerror) try { so.onerror(err); } catch (_) {}
        });
        return { engine: "MooseTTS" };
      }

      if (!global.speechSynthesis) return null;
      try { global.speechSynthesis.cancel(); } catch (_) {}
      const u = new SpeechSynthesisUtterance(String(text));
      u.rate = r;
      u.pitch = so.pitch != null ? so.pitch : pitch;
      const voices = listVoices();
      const voice = resolveVoice(voices);
      if (voice) u.voice = voice;
      currentUtterance = u;
      if (so.onend) u.onend = so.onend;
      if (so.onerror) u.onerror = so.onerror;
      global.speechSynthesis.speak(u);
      return u;
    }

    function stop() {
      if (global.MooseTTS && typeof global.MooseTTS.stop === "function") global.MooseTTS.stop();
      if (global.speechSynthesis) global.speechSynthesis.cancel();
      currentUtterance = null;
    }

    function setEnabled(on) {
      enabled = !!on;
      if (!enabled) stop();
    }

    function isEnabled() {
      return enabled;
    }

    function getSelectedURI() {
      return selectedURI;
    }

    function setVoiceURI(uri) {
      // uri === "" or null => auto
      selectedURI = uri || null;
      if (selectedURI) safeSet(storageKey(id), selectedURI);
      else {
        try {
          localStorage.removeItem(storageKey(id));
        } catch (_) {}
      }
      refreshPickerLabel();
    }

    function getVoiceLabel() {
      if (!selectedURI) {
        if (global.MooseTTS) return "Auto · Piper";
        const voices = listVoices();
        const best = pickBest(voices.filter((v) => /^en/i.test(v.lang || "")) || voices);
        return best ? `Auto · ${shortName(best)}` : "Auto · system";
      }
      if (String(selectedURI).indexOf("piper:") === 0) {
        const pid = String(selectedURI).slice(6);
        const cat = global.MooseTTSCatalog && global.MooseTTSCatalog.get(pid);
        return cat ? (cat.label || cat.name) : pid;
      }
      const voices = listVoices();
      const v = findByURI(voices, selectedURI);
      return v ? shortName(v) : "Saved voice";
    }

    function shortName(v) {
      const n = (v.name || "Voice").replace(/\s*\(.*\)\s*/g, "").trim();
      return n.length > 28 ? n.slice(0, 26) + "…" : n;
    }

    function refreshPickerLabel() {
      if (!pickerEl) return;
      const lab = pickerEl.querySelector(".tm-voice-label");
      if (lab) lab.textContent = getVoiceLabel();
    }

    /**
     * Mount a compact voice control into container.
     * Returns the root element.
     */
    function mountPicker(container, mountOpts) {
      if (!container) return null;
      const mo = mountOpts || {};
      // avoid duplicates
      const existing = container.querySelector(".tm-voice-picker");
      if (existing) {
        pickerEl = existing;
        refreshPickerLabel();
        return existing;
      }

      const root = document.createElement("div");
      root.className = "tm-voice-picker";
      root.innerHTML =
        '<button type="button" class="tm-voice-btn" aria-haspopup="listbox" aria-expanded="false" title="Choose reading voice">' +
        '<span class="tm-voice-icon" aria-hidden="true">🗣️</span> ' +
        '<span class="tm-voice-label">Voice</span>' +
        "</button>" +
        '<div class="tm-voice-menu" hidden role="listbox" aria-label="Choose voice"></div>';

      // Minimal styles scoped to picker (works across themes)
      if (!document.getElementById("tm-voice-picker-css")) {
        const style = document.createElement("style");
        style.id = "tm-voice-picker-css";
        style.textContent =
          ".tm-voice-picker{position:relative;display:inline-block;vertical-align:middle;z-index:40}" +
          ".tm-voice-btn{font:inherit;font-weight:800;font-size:0.85rem;cursor:pointer;border-radius:999px;" +
          "padding:6px 12px;border:2px solid rgba(127,127,127,0.35);background:rgba(255,255,255,0.92);color:#222;" +
          "max-width:220px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}" +
          ".tm-voice-btn:hover,.tm-voice-btn[aria-expanded='true']{border-color:#7c4dff}" +
          ".tm-voice-menu{position:absolute;top:calc(100% + 6px);right:0;min-width:240px;max-width:min(320px,90vw);" +
          "max-height:280px;overflow:auto;background:#fff;color:#222;border:2px solid rgba(0,0,0,0.12);" +
          "border-radius:12px;box-shadow:0 12px 28px rgba(0,0,0,0.18);padding:6px;z-index:50}" +
          ".tm-voice-menu[hidden]{display:none!important}" +
          ".tm-voice-option{display:block;width:100%;text-align:left;border:none;background:transparent;" +
          "padding:8px 10px;border-radius:8px;cursor:pointer;font:inherit;font-size:0.85rem;font-weight:700;color:#222}" +
          ".tm-voice-option:hover,.tm-voice-option:focus{background:#f3e8ff;outline:none}" +
          ".tm-voice-option.is-active{background:#ede7f6;box-shadow:inset 0 0 0 2px #7c4dff}" +
          ".tm-voice-option small{display:block;font-weight:600;opacity:0.65;font-size:0.72rem}" +
          ".tm-voice-empty{padding:10px;font-size:0.85rem;opacity:0.8}";
        document.head.appendChild(style);
      }

      const btn = root.querySelector(".tm-voice-btn");
      const menu = root.querySelector(".tm-voice-menu");

      function close() {
        menu.hidden = true;
        btn.setAttribute("aria-expanded", "false");
      }
      function open() {
        buildMenu();
        menu.hidden = false;
        btn.setAttribute("aria-expanded", "true");
      }

      function buildMenu() {
        const voices = listVoices()
          .slice()
          .sort((a, b) => scoreVoice(b) - scoreVoice(a));
        menu.innerHTML = "";
        const autoBtn = document.createElement("button");
        autoBtn.type = "button";
        autoBtn.className = "tm-voice-option" + (!selectedURI ? " is-active" : "");
        autoBtn.setAttribute("role", "option");
        autoBtn.innerHTML =
          "Auto (best available)" +
          "<small>" +
          (global.MooseTTS ? "Piper when ready, else browser" : "System voice") +
          "</small>";
        autoBtn.addEventListener("click", () => {
          setVoiceURI(null);
          close();
          if (mo.preview !== false) speak("This is the automatic voice.");
        });
        menu.appendChild(autoBtn);

        // Piper UK voices (if catalog loaded)
        const piperList = (global.MooseTTSCatalog && global.MooseTTSCatalog.list()) || [];
        piperList.forEach((pv) => {
          const key = "piper:" + pv.id;
          const b = document.createElement("button");
          b.type = "button";
          b.className = "tm-voice-option" + (selectedURI === key ? " is-active" : "");
          b.setAttribute("role", "option");
          b.innerHTML =
            escapeHtml(pv.label || pv.name) +
            "<small>Piper · " +
            escapeHtml(pv.locale || "en-GB") +
            " · neural</small>";
          b.addEventListener("click", () => {
            setVoiceURI(key);
            if (global.MooseTTS) global.MooseTTS.setVoice(pv.id);
            close();
            if (mo.preview !== false) speak("Hello! This is how I sound.");
          });
          menu.appendChild(b);
        });

        const en = voices.filter((v) => /^en/i.test(v.lang || ""));
        const list = en.length ? en : voices;
        if (!list.length && !piperList.length) {
          const empty = document.createElement("div");
          empty.className = "tm-voice-empty";
          empty.textContent = "No voices found in this browser yet. Try again in a moment.";
          menu.appendChild(empty);
          return;
        }
        list.forEach((v) => {
          const b = document.createElement("button");
          b.type = "button";
          b.className = "tm-voice-option" + (selectedURI === v.voiceURI ? " is-active" : "");
          b.setAttribute("role", "option");
          b.innerHTML =
            escapeHtml(v.name) +
            "<small>" +
            escapeHtml(v.lang || "") +
            (v.localService ? " · on device" : " · network") +
            "</small>";
          b.addEventListener("click", () => {
            setVoiceURI(v.voiceURI);
            close();
            if (mo.preview !== false) speak("Hello! This is how I sound.");
          });
          menu.appendChild(b);
        });
      }

      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (menu.hidden) open();
        else close();
      });
      document.addEventListener("click", (e) => {
        if (!menu.hidden && !root.contains(e.target)) close();
      });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") close();
      });

      container.appendChild(root);
      pickerEl = root;
      ensureVoicesLoaded(() => refreshPickerLabel());
      refreshPickerLabel();
      return root;
    }

    // Warm voices list
    ensureVoicesLoaded(() => {});

    const api = {
      appId: id,
      speak,
      stop,
      setEnabled,
      isEnabled,
      getSelectedURI,
      setVoiceURI,
      getVoiceLabel,
      mountPicker,
      listVoices,
      ensureVoicesLoaded,
    };

    // Mount into shared top-center chrome slot when present
    function tryMountChrome() {
      const slot = document.getElementById("tm-voice-slot");
      if (slot && !slot.querySelector(".tm-voice-picker")) {
        mountPicker(slot);
      }
    }
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () {
        setTimeout(tryMountChrome, 0);
      });
    } else {
      setTimeout(tryMountChrome, 0);
    }
    let tries = 0;
    const iv = setInterval(function () {
      tries += 1;
      tryMountChrome();
      if (tries > 25 || document.querySelector("#tm-voice-slot .tm-voice-picker")) clearInterval(iv);
    }, 120);

    return api;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // Warm global voice list early
  if (global.speechSynthesis) {
    try {
      global.speechSynthesis.getVoices();
      global.speechSynthesis.addEventListener("voiceschanged", () => {
        global.speechSynthesis.getVoices();
      });
    } catch (_) {}
  }

  global.TokenMooseVoice = { create, pickBest, listVoices: listVoices, ensureVoicesLoaded };
})(typeof window !== "undefined" ? window : globalThis);
