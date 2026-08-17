/**
 * MooseTTS — Piper (same-origin models) + browser speech fallback
 */
(function (global) {
  const PREFS_KEY = "token-moose-tts-prefs-v2";
  const READY_KEY = "token-moose-tts-ready-v2";

  function defaultId() {
    return (global.MooseTTSCatalog && global.MooseTTSCatalog.defaultId) || "en_GB-alba-medium";
  }

  let prefs = loadPrefs();
  let piperMod = null;
  let piperFailed = false;
  let sessionReady = null;
  let audioEl = null;
  let speaking = false;
  let seq = 0;
  let toastEl = null;
  let preparePromise = null;
  const readySet = loadReady();
  let importMapInjected = false;
  let fetchShimInstalled = false;

  function siteBase() {
    const scripts = document.querySelectorAll(
      "script[src*='moose-tts'],script[src*='voice-catalog'],script[src*='voice.js'],script[src*='app-chrome']"
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
    return new URL(String(rel).replace(/^\//, ""), location.origin + siteBase()).href;
  }

  function loadPrefs() {
    try {
      return Object.assign(
        { voiceId: null, rate: 1, muted: false, engine: "auto" },
        JSON.parse(localStorage.getItem(PREFS_KEY) || "{}")
      );
    } catch (_) {
      return { voiceId: null, rate: 1, muted: false, engine: "auto" };
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
    try {
      if (!document.body) return;
      if (!toastEl) {
        toastEl = document.createElement("div");
        toastEl.id = "moose-tts-toast";
        toastEl.setAttribute("role", "status");
        toastEl.style.cssText =
          "position:fixed;bottom:1rem;left:50%;transform:translateX(-50%);z-index:10060;" +
          "padding:0.55rem 1rem;border-radius:999px;font:600 0.85rem system-ui,sans-serif;" +
          "background:rgba(20,18,40,0.92);color:#fff;border:1px solid rgba(255,255,255,0.2);" +
          "box-shadow:0 8px 24px rgba(0,0,0,0.35);max-width:90vw;pointer-events:none;";
        document.body.appendChild(toastEl);
      }
      toastEl.textContent = msg;
      toastEl.hidden = false;
    } catch (_) {}
  }
  function hideToast() {
    if (toastEl) toastEl.hidden = true;
  }

  function injectImportMap() {
    if (importMapInjected) return;
    importMapInjected = true;
    try {
      if (document.querySelector('script[type="importmap"][data-moose-tts]')) return;
      const ort = absUrl("assets/tts/runtime/ort.wasm.min.mjs");
      const map = {
        imports: {
          "onnxruntime-web": ort,
          "onnxruntime-web/wasm": ort,
        },
      };
      const s = document.createElement("script");
      s.type = "importmap";
      s.dataset.mooseTts = "1";
      s.textContent = JSON.stringify(map);
      // import maps must be before module imports; insert as early as possible
      const first = document.head.firstChild;
      document.head.insertBefore(s, first);
    } catch (e) {
      console.warn("[MooseTTS] import map failed", e);
    }
  }

  function installFetchShim() {
    if (fetchShimInstalled) return;
    fetchShimInstalled = true;
    const orig = global.fetch.bind(global);
    global.fetch = function (input, init) {
      try {
        const url =
          typeof input === "string" ? input : input && input.url ? input.url : String(input);
        if (/huggingface\.co.*piper|diffusionstudio\/piper/i.test(url)) {
          const cat = global.MooseTTSCatalog && global.MooseTTSCatalog.list();
          if (cat) {
            for (let i = 0; i < cat.length; i++) {
              const v = cat[i];
              if (url.indexOf(v.id + ".onnx.json") !== -1) return orig(absUrl(v.configPath), init);
              if (url.indexOf(v.id + ".onnx") !== -1) return orig(absUrl(v.modelPath), init);
            }
          }
        }
      } catch (_) {}
      return orig(input, init);
    };
  }

  function wasmPaths() {
    const base = absUrl("assets/tts/runtime/");
    return {
      onnxWasm: base,
      piperData: base + "piper_phonemize.data",
      piperWasm: base + "piper_phonemize.wasm",
    };
  }

  // Register import map as early as possible (before any dynamic import)
  try { injectImportMap(); } catch (_) {}

  async function loadPiper() {
    if (piperFailed) throw new Error("Piper unavailable");
    if (piperMod) return piperMod;
    injectImportMap();
    installFetchShim();
    try {
      const url = absUrl("assets/tts/runtime/piper-tts-web.js");
      piperMod = await import(/* webpackIgnore: true */ url);
      return piperMod;
    } catch (e) {
      piperFailed = true;
      console.warn("[MooseTTS] Piper module failed to load", e);
      throw e;
    }
  }

  function selectedId() {
    return prefs.voiceId || defaultId();
  }

  async function isPrepared(id) {
    id = id || selectedId();
    if (readySet.has(id)) return true;
    try {
      const mod = await loadPiper();
      if (!mod.stored) return false;
      const stored = (await mod.stored()) || [];
      if (stored.indexOf(id) !== -1) {
        readySet.add(id);
        saveReady();
        return true;
      }
    } catch (_) {}
    return false;
  }

  async function prepareVoice(id, opts) {
    opts = opts || {};
    id = id || selectedId();
    if (await isPrepared(id)) return true;
    if (!opts.quiet) showToast("Preparing Moose Tools voices…");
    try {
      const mod = await loadPiper();
      await mod.download(id, function (p) {
        if (p && p.total && !opts.quiet) {
          const pct = Math.min(99, Math.round((p.loaded / p.total) * 100));
          showToast("Preparing Moose Tools voices… " + pct + "%");
        }
      });
      readySet.add(id);
      saveReady();
      if (!opts.quiet) {
        showToast("Voices ready");
        setTimeout(hideToast, 1500);
      }
      return true;
    } catch (err) {
      console.warn("[MooseTTS] prepare failed", id, err);
      hideToast();
      return false;
    }
  }

  function startBackgroundPrepare() {
    if (preparePromise) return preparePromise;
    preparePromise = (async function () {
      try {
        await prepareVoice(selectedId(), { quiet: false });
      } catch (_) {}
    })();
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
        audioEl.load();
      } catch (_) {}
      audioEl = null;
    }
  }

  function browserSpeak(text, rate, voiceURI) {
    return new Promise(function (resolve) {
      if (!global.speechSynthesis) {
        resolve();
        return;
      }
      try {
        global.speechSynthesis.cancel();
      } catch (_) {}
      const u = new SpeechSynthesisUtterance(text);
      u.rate = rate != null ? rate : 1;
      if (voiceURI) {
        try {
          const voices = global.speechSynthesis.getVoices() || [];
          const v = voices.find(function (x) {
            return x.voiceURI === voiceURI;
          });
          if (v) u.voice = v;
        } catch (_) {}
      }
      u.onend = function () {
        speaking = false;
        resolve();
      };
      u.onerror = function () {
        speaking = false;
        resolve();
      };
      speaking = true;
      try {
        global.speechSynthesis.speak(u);
      } catch (_) {
        speaking = false;
        resolve();
      }
    });
  }

  async function piperSpeak(text, voiceId, rate) {
    const mod = await loadPiper();
    // Create session WITH local wasm paths (library singleton)
    const session = await mod.TtsSession.create({
      voiceId: voiceId,
      wasmPaths: wasmPaths(),
    });
    const blob = await session.predict(text);
    if (!(blob instanceof Blob)) throw new Error("No audio blob from Piper");
    stop();
    const url = URL.createObjectURL(blob);
    const a = new Audio(url);
    audioEl = a;
    a.playbackRate = Math.max(0.5, Math.min(2, rate || 1));
    speaking = true;
    await new Promise(function (resolve) {
      a.onended = function () {
        speaking = false;
        try {
          URL.revokeObjectURL(url);
        } catch (_) {}
        resolve();
      };
      a.onerror = function () {
        speaking = false;
        try {
          URL.revokeObjectURL(url);
        } catch (_) {}
        resolve();
      };
      a.play().catch(function () {
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
    // cancel previous without bumping seq incorrectly
    try {
      if (global.speechSynthesis) global.speechSynthesis.cancel();
    } catch (_) {}
    if (audioEl) {
      try {
        audioEl.pause();
      } catch (_) {}
    }

    const rate = options.rate != null ? options.rate : prefs.rate || 1;
    const forceBrowser = options.engine === "browser" || prefs.engine === "browser";
    const voiceURI = options.browserVoiceURI || null;
    const voiceId = options.voiceId || selectedId();

    if (!forceBrowser && !piperFailed) {
      try {
        const ok = (await isPrepared(voiceId)) || (await prepareVoice(voiceId, { quiet: false }));
        if (my !== seq) return;
        if (ok) {
          await piperSpeak(t, voiceId, rate);
          return;
        }
      } catch (err) {
        console.warn("[MooseTTS] Piper speak failed → browser", err);
      }
    }
    if (my !== seq) return;
    await browserSpeak(t, rate, voiceURI);
  }

  if (!prefs.voiceId) {
    prefs.voiceId = defaultId();
    savePrefs();
  }

  function boot() {
    setTimeout(function () {
      startBackgroundPrepare();
    }, 600);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  global.MooseTTS = {
    speak: speak,
    stop: stop,
    isSpeaking: function () {
      return speaking;
    },
    getVoices: function () {
      return (global.MooseTTSCatalog && global.MooseTTSCatalog.list()) || [];
    },
    getSelectedVoice: selectedId,
    setVoice: function (id) {
      prefs.voiceId = id;
      savePrefs();
      prepareVoice(id, { quiet: true });
    },
    mute: function () {
      prefs.muted = true;
      savePrefs();
      stop();
    },
    unmute: function () {
      prefs.muted = false;
      savePrefs();
    },
    isMuted: function () {
      return !!prefs.muted;
    },
    getPrefs: function () {
      return Object.assign({}, prefs);
    },
    setPrefs: function (p) {
      prefs = Object.assign({}, prefs, p);
      savePrefs();
    },
    prepareVoice: prepareVoice,
    isPrepared: isPrepared,
    startBackgroundPrepare: startBackgroundPrepare,
    previewVoice: function (id) {
      return speak("Hello! This is how I sound in the classroom.", {
        voiceId: id || selectedId(),
        force: true,
      });
    },
  };
})(typeof window !== "undefined" ? window : globalThis);
