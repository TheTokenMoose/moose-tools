(function () {
  async function render(root) {
    if (!window.MooseTTS) {
      root.innerHTML = "<p>Loading voices…</p>";
      return;
    }
    const voices = MooseTTS.getVoices();
    const prefs = MooseTTS.getPrefs();
    const sel = MooseTTS.getSelectedVoice();
    root.innerHTML = "";
    root.className = "moose-tts-panel";

    const h = document.createElement("h2");
    h.textContent = "Voices";
    root.appendChild(h);
    const lead = document.createElement("p");
    lead.className = "moose-tts-lead";
    lead.textContent =
      "UK English Piper voices are built into Moose Tools. They prepare automatically — you only need this page to pick a favourite or change speed.";
    root.appendChild(lead);

    // mute
    const muteLab = document.createElement("label");
    muteLab.className = "moose-tts-row";
    const muteCb = document.createElement("input");
    muteCb.type = "checkbox";
    muteCb.checked = MooseTTS.isMuted();
    muteCb.addEventListener("change", () => (muteCb.checked ? MooseTTS.mute() : MooseTTS.unmute()));
    muteLab.appendChild(muteCb);
    muteLab.appendChild(document.createTextNode(" Mute all speech"));
    root.appendChild(muteLab);

    // rate
    const rateLab = document.createElement("label");
    rateLab.className = "moose-tts-field";
    rateLab.textContent = "Speech rate ";
    const rate = document.createElement("input");
    rate.type = "range";
    rate.min = "0.7";
    rate.max = "1.3";
    rate.step = "0.05";
    rate.value = String(prefs.rate || 1);
    const rateVal = document.createElement("span");
    rateVal.textContent = Number(rate.value).toFixed(2) + "×";
    rate.addEventListener("input", () => {
      rateVal.textContent = Number(rate.value).toFixed(2) + "×";
      MooseTTS.setPrefs({ rate: Number(rate.value) });
    });
    rateLab.appendChild(rate);
    rateLab.appendChild(rateVal);
    root.appendChild(rateLab);

    const list = document.createElement("div");
    list.className = "moose-tts-voice-list";
    for (const v of voices) {
      const card = document.createElement("div");
      card.className = "moose-tts-voice-card" + (v.id === sel ? " is-selected" : "");
      const ready = await MooseTTS.isPrepared(v.id);
      card.innerHTML =
        "<div class='moose-tts-voice-title'></div>" +
        "<div class='moose-tts-voice-meta'></div>" +
        "<div class='moose-tts-voice-status'></div>" +
        "<div class='moose-tts-voice-actions'></div>";
      card.querySelector(".moose-tts-voice-title").textContent = v.label || v.name;
      card.querySelector(".moose-tts-voice-meta").textContent =
        v.locale + " · " + (v.gender || "") + " · " + (v.quality || "");
      const st = card.querySelector(".moose-tts-voice-status");
      st.textContent = ready ? "✓ Ready on this device" : "Will prepare when selected";
      if (ready) st.classList.add("is-ready");
      const actions = card.querySelector(".moose-tts-voice-actions");
      const use = document.createElement("button");
      use.type = "button";
      use.className = "btn btn-primary";
      use.textContent = "Use";
      use.addEventListener("click", async () => {
        MooseTTS.setVoice(v.id);
        await MooseTTS.prepareVoice(v.id);
        render(root);
      });
      const prev = document.createElement("button");
      prev.type = "button";
      prev.className = "btn btn-secondary";
      prev.textContent = "Preview";
      prev.addEventListener("click", () => MooseTTS.previewVoice(v.id));
      actions.appendChild(use);
      actions.appendChild(prev);
      list.appendChild(card);
    }
    root.appendChild(list);
  }

  window.MooseTTSSettings = {
    mount(sel) {
      const root = typeof sel === "string" ? document.querySelector(sel) : sel;
      if (root) render(root);
    },
  };
})();
