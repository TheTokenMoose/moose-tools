/**
 * MooseTTS — centralized client-side TTS for The Token Moose / Moose Tools
 *
 * Preferred path: Piper (ONNX Runtime Web + piper-wasm) via @mintplex-labs/piper-tts-web
 * Fallback: browser speechSynthesis
 *
 * Models download on demand into OPFS (not localStorage, not SW precache).
 * Runtime WASM lives under assets/tts/runtime/ (same-origin, SW cacheable).
 */
(function (global) {
  const PREFS_KEY = "token-moose-tts-prefs";

  const defaultPrefs = {
    engine: "auto", // auto | piper | browser
    voiceId: "en_GB-alba-medium",
    rate: 1,
    pitch: 1,
    volume: 1,
    enabled: true,
  };

  let prefs = loadPrefs();
  let piperMod = null;
  let piperLoadPromise = null;
  let currentAudio = null;
  let speaking = false;
  let speakSeq = 0;
  const listeners = new Set();

  function siteBase() {
    // Resolve project root for GitHub Pages /moose-tools/ and local /
    const scripts = document.querySelectorAll("script[src*='moose-tts'],script[src*='voice.js'],script[src*='app-chrome']");
    for (const s of scripts) {
      const src = s.getAttribute("src") || "";
      const i = src.indexOf("js/");
      if (i >= 0) return src.slice(0, i);
    }
    // fallback from path
    const path = location.pathname;
    if (path.includes("/games/") || path.includes("/tools/")) {
      return path.replace(/\/(games|tools)\/.*$/, "/");
    }
    return path.endsWith("/") ? path : path.replace(/\/[^/]*$/, "/");
  }

  function piperModuleUrl() {
    return siteBase() + "assets/tts/runtime/piper-tts-web.js";
  }

  function runtimePaths() {
    const base = siteBase() + "assets/tts/runtime/";
    return {
      onnxWasm: base, // directory; ort looks for wasm beside ort.min.js pattern
      piperData: base + "piper_phonemize.data",
      piperWasm: base + "piper_phonemize.wasm",
      ortScript: base + "ort.min.js",
    };
  }

  function loadPrefs() {
    try {
      const raw = localStorage.getItem(PREFS_KEY);
      if (!raw) return { ...defaultPrefs };
      return { ...defaultPrefs, ...JSON.parse(raw) };
    } catch (_) {
      return { ...defaultPrefs };
    }
  }

  function savePrefs() {
    try {
      localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
    } catch (_) {}
    emit("prefs", prefs);
  }

  function emit(type, detail) {
    listeners.forEach((fn) => {
      try {
        fn({ type, detail });
      } catch (_) {}
    });
  }

  function on(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  }

  function getPrefs() {
    return { ...prefs };
  }

  function setPrefs(partial) {
    prefs = { ...prefs, ...partial };
    savePrefs();
  }

  async function loadPiperModule() {
    if (piperMod) return piperMod;
    if (piperLoadPromise) return piperLoadPromise;
    piperLoadPromise = (async () => {
      // Dynamic import of ESM library
      const mod = await import(/* webpackIgnore: true */ piperModuleUrl());
      piperMod = mod;
      return mod;
    })().catch((err) => {
      piperLoadPromise = null;
      console.warn("[MooseTTS] Piper module load failed:", err);
      throw err;
    });
    return piperLoadPromise;
  }

  function piperWasmPaths() {
    const r = runtimePaths();
    // mintplex expects onnxWasm as base URL for ort wasm files
    return {
      onnxWasm: r.onnxWasm,
      piperData: r.piperData,
      piperWasm: r.piperWasm,
    };
  }

  async function storedVoiceIds() {
    try {
      const mod = await loadPiperModule();
      if (mod.stored) return await mod.stored();
    } catch (_) {}
    return [];
  }

  async function isVoiceDownloaded(id) {
    const list = await storedVoiceIds();
    return list.includes(id);
  }

  async function downloadVoice(id, onProgress) {
    const mod = await loadPiperModule();
    if (!mod.download) throw new Error("Download not supported");
    await mod.download(id, (p) => {
      if (onProgress) {
        const pct = p.total ? Math.round((p.loaded / p.total) * 100) : 0;
        onProgress({ loaded: p.loaded, total: p.total, percent: pct, url: p.url });
      }
      emit("download-progress", { id, ...p });
    });
    emit("download-complete", { id });
  }

  async function deleteVoice(id) {
    const mod = await loadPiperModule();
    if (mod.remove) await mod.remove(id);
    emit("voice-deleted", { id });
  }

  function stopBrowser() {
    try {
      if (global.speechSynthesis) global.speechSynthesis.cancel();
    } catch (_) {}
  }

  function stopAudio() {
    if (currentAudio) {
      try {
        currentAudio.pause();
        currentAudio.src = "";
      } catch (_) {}
      currentAudio = null;
    }
    speaking = false;
  }

  function stop() {
    speakSeq += 1;
    stopBrowser();
    stopAudio();
    emit("stop");
  }

  function isSpeaking() {
    return speaking;
  }

  function browserSpeak(text, options) {
    return new Promise((resolve, reject) => {
      if (!global.speechSynthesis) {
        reject(new Error("No speechSynthesis"));
        return;
      }
      stopBrowser();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = options.rate != null ? options.rate : prefs.rate;
      u.pitch = options.pitch != null ? options.pitch : prefs.pitch;
      u.volume = options.volume != null ? options.volume : prefs.volume;
      // optional system voice URI
      if (options.browserVoiceURI) {
        const voices = global.speechSynthesis.getVoices() || [];
        const v = voices.find((x) => x.voiceURI === options.browserVoiceURI);
        if (v) u.voice = v;
      }
      u.onend = () => {
        speaking = false;
        resolve();
      };
      u.onerror = (e) => {
        speaking = false;
        reject(e.error || e);
      };
      speaking = true;
      global.speechSynthesis.speak(u);
    });
  }

  async function piperSpeak(text, options) {
    const mod = await loadPiperModule();
    const voiceId = options.voiceId || prefs.voiceId;
    const downloaded = await isVoiceDownloaded(voiceId);
    if (!downloaded) {
      throw new Error("Voice not downloaded: " + voiceId);
    }

    // predict returns Blob (wav)
    const blob = await mod.predict(
      { text, voiceId },
      options.progress
    );

    stopAudio();
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    currentAudio = audio;
    audio.volume = Math.max(0, Math.min(1, options.volume != null ? options.volume : prefs.volume));
    // rate via playbackRate
    audio.playbackRate = Math.max(0.5, Math.min(2, options.rate != null ? options.rate : prefs.rate));

    speaking = true;
    await new Promise((resolve, reject) => {
      audio.onended = () => {
        speaking = false;
        URL.revokeObjectURL(url);
        resolve();
      };
      audio.onerror = () => {
        speaking = false;
        URL.revokeObjectURL(url);
        reject(new Error("Audio playback failed"));
      };
      const p = audio.play();
      if (p && p.catch) p.catch(reject);
    });
  }

  async function speak(text, options) {
    options = options || {};
    if (!prefs.enabled && options.force !== true) return;
    const t = String(text || "").trim();
    if (!t) return;

    const mySeq = ++speakSeq;
    stopBrowser();
    stopAudio();

    const engine = options.engine || prefs.engine || "auto";
    const preferPiper = engine === "piper" || engine === "auto";

    if (preferPiper) {
      try {
        const voiceId = options.voiceId || prefs.voiceId;
        if (await isVoiceDownloaded(voiceId)) {
          if (mySeq !== speakSeq) return;
          await piperSpeak(t, options);
          return;
        }
        if (engine === "piper") {
          emit("error", { message: "Selected Piper voice is not downloaded yet." });
          // fall through to browser
        }
      } catch (err) {
        console.warn("[MooseTTS] Piper speak failed, falling back:", err);
        emit("error", { message: String(err && err.message ? err.message : err) });
        if (engine === "piper" && options.fallback === false) throw err;
      }
    }

    if (mySeq !== speakSeq) return;
    try {
      await browserSpeak(t, options);
    } catch (err) {
      speaking = false;
      emit("error", { message: "Speech unavailable in this browser." });
      if (options.fallback === false) throw err;
    }
  }

  async function previewVoice(id) {
    const sample = "Hello! This is how I sound when reading with Moose Tools.";
    // If not downloaded, browser fallback for preview tone
    if (await isVoiceDownloaded(id)) {
      return speak(sample, { voiceId: id, engine: "piper", force: true });
    }
    return speak(sample, { engine: "browser", force: true });
  }

  function getVoices() {
    const cat = global.MooseTTSCatalog ? global.MooseTTSCatalog.list() : [];
    return cat;
  }

  function getSelectedVoice() {
    return prefs.voiceId;
  }

  function setVoice(id) {
    setPrefs({ voiceId: id });
  }

  function setEnabled(on) {
    setPrefs({ enabled: !!on });
    if (!on) stop();
  }

  function isEnabled() {
    return !!prefs.enabled;
  }

  // Public API
  const api = {
    speak,
    stop,
    pause() {
      if (currentAudio) currentAudio.pause();
      try {
        if (global.speechSynthesis) global.speechSynthesis.pause();
      } catch (_) {}
    },
    resume() {
      if (currentAudio) currentAudio.play().catch(() => {});
      try {
        if (global.speechSynthesis) global.speechSynthesis.resume();
      } catch (_) {}
    },
    isSpeaking,
    getVoices,
    getSelectedVoice,
    setVoice,
    previewVoice,
    isVoiceDownloaded,
    downloadVoice,
    deleteVoice,
    getPrefs,
    setPrefs,
    setEnabled,
    isEnabled,
    on,
    /** @internal */
    _loadPiperModule: loadPiperModule,
    _runtimePaths: runtimePaths,
  };

  global.MooseTTS = api;
})(typeof window !== "undefined" ? window : globalThis);
