/**
 * Voices settings page — default voice, test, disable, remove from device cache
 */
(function () {
  function el(tag, attrs, kids) {
    const n = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "className") n.className = attrs[k];
        else if (k === "text") n.textContent = attrs[k];
        else if (k === "html") n.innerHTML = attrs[k];
        else n.setAttribute(k, attrs[k]);
      });
    }
    (kids || []).forEach(function (c) {
      if (c == null) return;
      n.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return n;
  }

  async function render(root) {
    if (!window.MooseTTS || !window.MooseTTSCatalog) {
      root.innerHTML = "<p class='moose-tts-lead'>Loading voice system…</p>";
      setTimeout(function () { render(root); }, 200);
      return;
    }

    const prefs = MooseTTS.getPrefs();
    const selected = MooseTTS.getSelectedVoice();
    const voices = MooseTTS.getVoices();
    root.innerHTML = "";
    root.className = "moose-tts-panel";

    root.appendChild(el("h2", { text: "Voices" }));
    root.appendChild(
      el("p", {
        className: "moose-tts-lead",
        text:
          "Choose a default classroom voice. Games use this automatically. You can still pick another voice inside a game — but disabled voices stay hidden everywhere.",
      })
    );

    // Global mute
    const muteRow = el("label", { className: "moose-tts-row" });
    const muteCb = el("input", { type: "checkbox" });
    muteCb.checked = MooseTTS.isMuted();
    muteCb.addEventListener("change", function () {
      if (muteCb.checked) MooseTTS.mute();
      else MooseTTS.unmute();
    });
    muteRow.appendChild(muteCb);
    muteRow.appendChild(document.createTextNode(" Mute all speech (all games)"));
    root.appendChild(muteRow);

    // Rate
    const rateLab = el("label", { className: "moose-tts-field" });
    rateLab.appendChild(document.createTextNode("Speech rate "));
    const rate = el("input", { type: "range", min: "0.7", max: "1.3", step: "0.05" });
    rate.value = String(prefs.rate || 1);
    const rateVal = el("span", { className: "moose-tts-val", text: Number(rate.value).toFixed(2) + "×" });
    rate.addEventListener("input", function () {
      rateVal.textContent = Number(rate.value).toFixed(2) + "×";
      MooseTTS.setPrefs({ rate: Number(rate.value) });
    });
    rateLab.appendChild(rate);
    rateLab.appendChild(rateVal);
    root.appendChild(rateLab);

    root.appendChild(el("h3", { text: "Piper voices (UK English)" }));
    root.appendChild(
      el("p", {
        className: "moose-tts-note",
        text: "Test a voice, save it as your default, disable it (hides it in games), or remove its offline cache from this device.",
      })
    );

    const list = el("div", { className: "moose-tts-voice-list" });

    for (let i = 0; i < voices.length; i++) {
      const v = voices[i];
      const disabled = MooseTTS.isDisabled(v.id);
      let ready = false;
      try {
        ready = await MooseTTS.isPrepared(v.id);
      } catch (_) {}

      const card = el("div", {
        className: "moose-tts-voice-card" + (v.id === selected ? " is-selected" : "") + (disabled ? " is-disabled" : ""),
      });

      card.appendChild(el("div", { className: "moose-tts-voice-title", text: v.label || v.name }));
      card.appendChild(
        el("div", {
          className: "moose-tts-voice-meta",
          text: (v.locale || "en-GB") + " · " + (v.gender || "") + " · " + (v.quality || "") + " · " + (v.license || "MIT"),
        })
      );

      const status = el("div", { className: "moose-tts-voice-status" });
      if (disabled) {
        status.textContent = "Disabled — hidden in games";
      } else if (v.id === selected) {
        status.textContent = ready ? "✓ Default · ready on this device" : "✓ Default · preparing when needed";
        status.classList.add("is-ready");
      } else if (ready) {
        status.textContent = "✓ Ready on this device";
        status.classList.add("is-ready");
      } else {
        status.textContent = "Available — prepares on first use";
      }
      card.appendChild(status);

      const actions = el("div", { className: "moose-tts-voice-actions" });

      const testBtn = el("button", { type: "button", className: "btn btn-secondary", text: "Test" });
      testBtn.disabled = disabled;
      testBtn.addEventListener("click", function () {
        MooseTTS.previewVoice(v.id);
      });

      const useBtn = el("button", { type: "button", className: "btn btn-primary", text: "Save as default" });
      useBtn.disabled = disabled;
      useBtn.addEventListener("click", function () {
        MooseTTS.setDisabled(v.id, false);
        MooseTTS.setVoice(v.id);
        render(root);
      });

      const disBtn = el("button", {
        type: "button",
        className: "btn btn-ghost",
        text: disabled ? "Enable" : "Disable",
      });
      disBtn.addEventListener("click", function () {
        MooseTTS.setDisabled(v.id, !disabled);
        render(root);
      });

      const dlBtn = el("button", { type: "button", className: "btn btn-secondary", text: ready ? "Downloaded" : "Download" });
      dlBtn.title = "Download / prepare this voice for offline use on this device";
      dlBtn.disabled = disabled || ready;
      dlBtn.addEventListener("click", async function () {
        dlBtn.disabled = true;
        dlBtn.textContent = "Downloading…";
        try {
          const ok = await MooseTTS.prepareVoice(v.id, { quiet: false });
          dlBtn.textContent = ok ? "Downloaded" : "Retry download";
          if (!ok) dlBtn.disabled = false;
          else render(root);
        } catch (_) {
          dlBtn.textContent = "Retry download";
          dlBtn.disabled = false;
        }
      });

      const remBtn = el("button", { type: "button", className: "btn btn-ghost", text: "Remove cache" });
      remBtn.title = "Delete offline copy of this voice on this device";
      remBtn.addEventListener("click", async function () {
        remBtn.disabled = true;
        remBtn.textContent = "Removing…";
        try {
          await MooseTTS.removeVoice(v.id);
        } catch (_) {}
        render(root);
      });

      actions.appendChild(testBtn);
      actions.appendChild(useBtn);
      actions.appendChild(dlBtn);
      actions.appendChild(disBtn);
      actions.appendChild(remBtn);
      card.appendChild(actions);
      list.appendChild(card);
    }

    root.appendChild(list);
    root.appendChild(
      el("p", {
        className: "moose-tts-note",
        text: "Browser system voices still appear in the in-game voice menu. Disable only affects Piper neural voices listed above.",
      })
    );
  }

  window.MooseTTSSettings = {
    mount: function (sel) {
      const root = typeof sel === "string" ? document.querySelector(sel) : sel;
      if (root) render(root);
    },
  };
})();
