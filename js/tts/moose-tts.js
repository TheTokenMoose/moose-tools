/**
 * MooseTTS — hands-free Piper TTS for The Token Moose
 * Models & runtime are same-origin under assets/tts/
 * First use copies needed files into OPFS via piper-tts-web (no Hugging Face at runtime).
 */
(function (global) {
  const PREFS_KEY = "token-moose-tts-prefs-v2";
  const READY_KEY = "token-moose-tts-ready-v2"; // which voice ids prepared in OPFS
  const DEFAULT_ID = () =>
    (global.MooseTTSCatalog && global.MooseTTSCatalog.defaultId) || "en_GB-alba-medium";

  const defaultPrefs = {
    voiceId: null, // filled after catalog load
    rate: 1,
    muted: false,
    engine: "auto",
  };

  let prefs = loadPrefs();
  let piperMod = null;
  let preparePromise = null;
  let audioEl = null;
  let speaking = false;
  let seq = 0;
  let toastEl = null;
  const readySet = loadReady();

  function siteBase() {
    const scripts = document.querySelectorAll(
      "script[src*='moose-tts'],script[src*='voice.js'],script[src*='app-chrome']"
    );
    for (const s of scripts) {
      const src = s.getAttribute("src") || "";
      const i = src.indexOf("js/");
      if (i >= 0) return src.slice(0, i);
    }
    const path = location.pathname;
    if (path.includes("/games/") || path.includes("/tools/")) {
      return path.replace(/\/(games|tools)\/.*$/, "/");
    }
    return path.endsWith("/") ? path : path.replace(/\/[^/]*$/, "/");
  }

  function absUrl(rel) {
    if (/^https?:/i.test(rel)) return rel;
    const base = siteBase();
    return new URL(rel.replace(/^\//, ""), location.origin + base).href;
  }

  function loadPrefs() {
    try {
      return { ...defaultPrefs, ...JSON.parse(localStorage.getItem(PREFS_KEY) || "{}") };
    } catch (_) {
      return { ...defaultPrefs };
    }
  }
  function savePrefs() {
    try {
      localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
    } catch (_) {}
  }
  function loadReady() {
    try {
      const a = JSON.parse(localStorage.getItem(READY_KEY) || "[]");
      return new Set(Array.isArray(a) ? a : []);
    } catch (_) {
      return new Set();
    }
  }
  function saveReady() {
    try {
      localStorage.setItem(READY_KEY, JSON.stringify([...readySet]));
    } catch (_) {}
  }

  function showToast(msg) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.id = "moose-tts-toast";
      toastEl.setAttribute("role", "status");
      toastEl.style.cssText =
        "position:fixed;bottom:1rem;left:50%;transform:translateX(-50%);z-index:10060;" +
        "padding:0.55rem 1rem;border-radius:999px;font:600 0.85rem system-ui,sans-serif;" +
        "background:rgba(20,18,40,0.9);color:#fff;border:1px solid rgba(255,255,255,0.2);" +
        "box-shadow:0 8px 24px rgba(0,0,0,0.35);max-width:90vw;pointer-events:none;";
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.hidden = false;
  }
  function hideToast() {
    if (toastEl) toastEl.hidden = true;
  }

  /** Map Hugging Face / CDN model URLs to local assets */
  function installFetchShim() {
    if (global.__mooseTtsFetchShim) return;
    global.__mooseTtsFetchShim = true;
    const orig = global.fetch.bind(global);
    global.fetch = function (input, init) {
      try {
        const url = typeof input === "string" ? input : input && input.url ? input.url : String(input);
        if (/huggingface\.co|cdn\.jsdelivr\.net.*piper/i.test(url)) {
          const cat = global.MooseTTSCatalog && global.MooseTTSCatalog.list();
          if (cat) {
            for (const v of cat) {
              if (url.includes(v.id + ".onnx.json")) return orig(absUrl(v.configPath), init);
              if (url.includes(v.id + ".onnx")) return orig(absUrl(v.modelPath), init);
            }
          }
          // runtime wasm already local via wasmPaths; ignore other HF
        }
      } catch (_) {}
      return orig(input, init);
    };
  }

  async function loadPiper() {
    if (piperMod) return piperMod;
    installFetchShim();
    const url = absUrl("assets/tts/runtime/piper-tts-web.js");
    piperMod = await import(/* webpackIgnore: true */ url);
    return piperMod;
  }

  function wasmPaths() {
    const base = absUrl("assets/tts/runtime/");
    return {
      onnxWasm: base,
      piperData: base + "piper_phonemize.data",
      piperWasm: base + "piper_phonemize.wasm",
    };
  }

  function selectedId() {
    return prefs.voiceId || DEFAULT_ID();
  }

  async function isPrepared(id) {
    if (readySet.has(id)) return true;
    try {
      const mod = await loadPiper();
      const stored = (await mod.stored()) || [];
      if (stored.includes(id)) {
        readySet.add(id);
        saveReady();
        return true;
      }
    } catch (_) {}
    return false;
  }

  async function prepareVoice(id, { quiet } = {}) {
    id = id || selectedId();
    if (await isPrepared(id)) return true;
    if (!quiet) showToast("Preparing Moose Tools voices…");
    try {
      const mod = await loadPiper();
      // download() uses fetch — shim rewrites HF → local assets, then OPFS stores bytes
      await mod.download(id, (p) => {
        if (p && p.total && !quiet) {
          const pct = Math.min(99, Math.round((p.loaded / p.total) * 100));
          showToast("Preparing Moose Tools voices… " + pct + "%");
        }
      });
      readySet.add(id);
      saveReady();
      if (!quiet) {
        showToast("Voices ready");
        setTimeout(hideToast, 1600);
      }
      return true;
    } catch (err) {
      console.warn("[MooseTTS] prepare failed", id, err);
      hideToast();
      return false;
    }
  }

  /** Background: default first, then rest of catalog */
  function startBackgroundPrepare() {
    if (preparePromise) return preparePromise;
    preparePromise = (async () => {
      const def = selectedId();
      await prepareVoice(def, { quiet: false });
      const list = (global.MooseTTSCatalog && global.MooseTTSCatalog.list()) || [];
      for (const v of list) {
        if (v.id === def) continue;
        await prepareVoice(v.id, { quiet: true });
      }
    })().catch((e) => console.warn("[MooseTTS] background prepare", e));
    return preparePromise;
  }

  function stop() {
    seq += 1;
    speaking = false;
    try {
      if (global.speechSynthesis) global.speechSynthesis.cancel();
    } catch (_) {}
    if (audioEl) {
      try {
        audioEl.pause();
        audioEl.removeAttribute("src");
      } catch (_) {}
      audioEl = null;
    }
  }

  function browserSpeak(text, rate) {
    return new Promise((resolve, reject) => {
      if (!global.speechSynthesis) return reject(new Error("no speechSynthesis"));
      global.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = rate;
      u.onend = () => {
        speaking = false;
        resolve();
      };
      u.onerror = () => {
        speaking = false;
        resolve();
      };
      speaking = true;
      global.speechSynthesis.speak(u);
    });
  }

  async function piperSpeak(text, voiceId, rate) {
    const mod = await loadPiper();
    const blob = await mod.predict({ text, voiceId });
    stop();
    const url = URL.createObjectURL(blob);
    const a = new Audio(url);
    audioEl = a;
    a.playbackRate = Math.max(0.5, Math.min(2, rate));
    speaking = true;
    await new Promise((resolve) => {
      a.onended = () => {
        speaking = false;
        URL.revokeObjectURL(url);
        resolve();
      };
      a.onerror = () => {
        speaking = false;
        URL.revokeObjectURL(url);
        resolve();
      };
      a.play().catch(() => {
        speaking = false;
        resolve();
      });
    });
  }

  async function speak(text, options) {
    options = options || {};
    if (prefs.muted && !options.force) return;
    const t = String(text || "").trim();
    if (!t) return;
    const my = ++seq;
    stop();
    seq = my;
    const rate = options.rate != null ? options.rate : prefs.rate || 1;
    const voiceId = options.voiceId || selectedId();

    // Ensure default prepared (non-blocking start already running)
    try {
      if (!(await isPrepared(voiceId))) {
        await prepareVoice(voiceId, { quiet: false });
      }
      if (my !== seq) return;
      if (await isPrepared(voiceId)) {
        await piperSpeak(t, voiceId, rate);
        return;
      }
    } catch (err) {
      console.warn("[MooseTTS] piper failed, browser fallback", err);
    }
    if (my !== seq) return;
    try {
      await browserSpeak(t, rate);
    } catch (_) {}
  }

  function getVoices() {
    return (global.MooseTTSCatalog && global.MooseTTSCatalog.list()) || [];
  }

  function setVoice(id) {
    prefs.voiceId = id;
    savePrefs();
    prepareVoice(id, { quiet: true });
  }

  function mute() {
    prefs.muted = true;
    savePrefs();
    stop();
  }
  function unmute() {
    prefs.muted = false;
    savePrefs();
  }

  // Boot: prefs default + background prepare
  if (!prefs.voiceId) {
    prefs.voiceId = DEFAULT_ID();
    savePrefs();
  }

  function boot() {
    // Kick preparation after a tick so first paint isn't blocked
    setTimeout(() => startBackgroundPrepare(), 400);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  global.MooseTTS = {
    speak,
    stop,
    isSpeaking: () => speaking,
    getVoices,
    getSelectedVoice: selectedId,
    setVoice,
    mute,
    unmute,
    isMuted: () => !!prefs.muted,
    getPrefs: () => ({ ...prefs }),
    setPrefs: (p) => {
      prefs = { ...prefs, ...p };
      savePrefs();
    },
    prepareVoice,
    isPrepared,
    startBackgroundPrepare,
    previewVoice(id) {
      return speak("Hello! This is how I sound in the classroom.", {
        voiceId: id || selectedId(),
        force: true,
      });
    },
  };
})(typeof window !== "undefined" ? window : globalThis);
