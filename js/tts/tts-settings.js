/**
 * MooseTTS settings panel — mounts into #moose-tts-settings or creates a modal.
 * Theme-aware via CSS variables.
 */
(function () {
  function el(tag, attrs, children) {
    const n = document.createElement(tag);
    if (attrs) {
      Object.entries(attrs).forEach(([k, v]) => {
        if (k === "className") n.className = v;
        else if (k === "text") n.textContent = v;
        else if (k.startsWith("on") && typeof v === "function") n.addEventListener(k.slice(2).toLowerCase(), v);
        else if (v != null) n.setAttribute(k, v);
      });
    }
    (children || []).forEach((c) => n.appendChild(typeof c === "string" ? document.createTextNode(c) : c));
    return n;
  }

  function fmtBytes(n) {
    if (!n) return "";
    if (n < 1024) return n + " B";
    if (n < 1024 * 1024) return (n / 1024).toFixed(0) + " KB";
    return (n / (1024 * 1024)).toFixed(1) + " MB";
  }

  async function render(root) {
    if (!window.MooseTTS || !window.MooseTTSCatalog) {
      root.innerHTML = "<p>Voice system is loading…</p>";
      return;
    }
    const prefs = MooseTTS.getPrefs();
    const voices = MooseTTS.getVoices();
    let stored = [];
    try {
      stored = await Promise.all(voices.map(async (v) => [v.id, await MooseTTS.isVoiceDownloaded(v.id)]));
      stored = Object.fromEntries(stored);
    } catch (_) {
      stored = {};
    }

    root.innerHTML = "";
    root.classList.add("moose-tts-panel");

    root.appendChild(el("h2", { text: "Voice & speech" }));
    root.appendChild(
      el("p", {
        className: "moose-tts-lead",
        text: "Optional high-quality Piper voices download once and work offline. If a Piper voice is missing, games fall back to your browser’s built-in speech.",
      })
    );

    // Enable
    const enRow = el("label", { className: "moose-tts-row" });
    const en = el("input", { type: "checkbox" });
    en.checked = !!prefs.enabled;
    en.addEventListener("change", () => MooseTTS.setEnabled(en.checked));
    enRow.appendChild(en);
    enRow.appendChild(document.createTextNode(" Enable speech in games"));
    root.appendChild(enRow);

    // Engine
    const engLabel = el("label", { className: "moose-tts-field", text: "Engine preference" });
    const eng = el("select");
    [
      ["auto", "Auto (Piper if downloaded, else browser)"],
      ["piper", "Prefer Piper neural voice"],
      ["browser", "Browser / system voice only"],
    ].forEach(([v, lab]) => {
      const o = el("option", { value: v, text: lab });
      if (prefs.engine === v) o.selected = true;
      eng.appendChild(o);
    });
    eng.addEventListener("change", () => MooseTTS.setPrefs({ engine: eng.value }));
    engLabel.appendChild(eng);
    root.appendChild(engLabel);

    // Rate
    const rateLabel = el("label", { className: "moose-tts-field", text: "Speech rate" });
    const rate = el("input", { type: "range", min: "0.6", max: "1.4", step: "0.05" });
    rate.value = String(prefs.rate || 1);
    const rateVal = el("span", { className: "moose-tts-val", text: Number(rate.value).toFixed(2) + "×" });
    rate.addEventListener("input", () => {
      rateVal.textContent = Number(rate.value).toFixed(2) + "×";
      MooseTTS.setPrefs({ rate: Number(rate.value) });
    });
    rateLabel.appendChild(rate);
    rateLabel.appendChild(rateVal);
    root.appendChild(rateLabel);

    root.appendChild(el("h3", { text: "Piper voices (downloadable)" }));
    const list = el("div", { className: "moose-tts-voice-list" });

    voices.forEach((v) => {
      const card = el("div", { className: "moose-tts-voice-card", "data-id": v.id });
      const title = el("div", { className: "moose-tts-voice-title", text: v.displayName });
      const meta = el("div", {
        className: "moose-tts-voice-meta",
        text: `${v.locale} · ${v.quality} · ${v.sizeLabel || ""} · ${v.license}`,
      });
      const status = el("div", {
        className: "moose-tts-voice-status",
        text: stored[v.id] ? "✓ Available offline" : "Not downloaded",
      });
      if (stored[v.id]) status.classList.add("is-ready");

      const actions = el("div", { className: "moose-tts-voice-actions" });
      const selectBtn = el("button", { type: "button", className: "btn btn-secondary", text: "Use" });
      selectBtn.addEventListener("click", () => {
        MooseTTS.setVoice(v.id);
        root.querySelectorAll(".moose-tts-voice-card").forEach((c) => c.classList.remove("is-selected"));
        card.classList.add("is-selected");
      });
      if (prefs.voiceId === v.id) card.classList.add("is-selected");

      const previewBtn = el("button", { type: "button", className: "btn btn-secondary", text: "Preview" });
      previewBtn.addEventListener("click", () => MooseTTS.previewVoice(v.id));

      const dlBtn = el("button", {
        type: "button",
        className: "btn btn-primary",
        text: stored[v.id] ? "Re-download" : "Download",
      });
      const prog = el("div", { className: "moose-tts-progress", hidden: "true" });
      const progBar = el("div", { className: "moose-tts-progress-bar" });
      prog.appendChild(progBar);

      dlBtn.addEventListener("click", async () => {
        dlBtn.disabled = true;
        prog.hidden = false;
        progBar.style.width = "0%";
        try {
          await MooseTTS.downloadVoice(v.id, (p) => {
            progBar.style.width = (p.percent || 0) + "%";
            status.textContent = `Downloading… ${p.percent || 0}%`;
          });
          status.textContent = "✓ Available offline";
          status.classList.add("is-ready");
          dlBtn.textContent = "Re-download";
        } catch (err) {
          status.textContent = "Download failed — check connection and try again";
          status.classList.remove("is-ready");
          console.warn(err);
        } finally {
          dlBtn.disabled = false;
          prog.hidden = true;
        }
      });

      const delBtn = el("button", { type: "button", className: "btn btn-ghost", text: "Delete" });
      delBtn.addEventListener("click", async () => {
        try {
          await MooseTTS.deleteVoice(v.id);
          status.textContent = "Not downloaded";
          status.classList.remove("is-ready");
          dlBtn.textContent = "Download";
        } catch (err) {
          console.warn(err);
        }
      });

      actions.appendChild(selectBtn);
      actions.appendChild(previewBtn);
      actions.appendChild(dlBtn);
      if (stored[v.id]) actions.appendChild(delBtn);

      card.appendChild(title);
      card.appendChild(meta);
      card.appendChild(status);
      card.appendChild(prog);
      card.appendChild(actions);
      list.appendChild(card);
    });

    root.appendChild(list);

    root.appendChild(
      el("p", {
        className: "moose-tts-note",
        text: "Voice models are MIT-licensed Piper voices from Rhasspy. Runtime uses ONNX Runtime Web and piper-wasm. See assets/tts/VOICES.md for attribution.",
      })
    );
  }

  function mount(selector) {
    const root = typeof selector === "string" ? document.querySelector(selector) : selector;
    if (!root) return;
    render(root);
    if (window.MooseTTS && MooseTTS.on) {
      MooseTTS.on(() => {
        /* soft refresh not required for every event */
      });
    }
  }

  window.MooseTTSSettings = { mount, render };
})();
