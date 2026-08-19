/**
 * Speaking Spinner — teacher projector speaking prompts
 */
(function () {
  "use strict";

  const CUSTOM_KEY = "token-moose-speaking-spinner-custom";
  const NAMES_KEY = "token-moose-speaking-spinner-names";

  let category = "all";
  let difficulty = "easy";
  let currentPrompt = "";
  let currentStudent = "";
  let recent = [];
  let spinning = false;
  let rotation = 0;
  let voice = null;
  let custom = loadCustom();
  let names = loadNames();

  const COLORS = ["#f59e0b", "#22c55e", "#3b82f6", "#ef4444", "#a855f7", "#14b8a6", "#eab308", "#ec4899"];

  const $ = (id) => document.getElementById(id);

  function loadCustom() {
    try {
      const a = JSON.parse(localStorage.getItem(CUSTOM_KEY) || "[]");
      return Array.isArray(a) ? a : [];
    } catch (_) {
      return [];
    }
  }
  function saveCustom() {
    try {
      localStorage.setItem(CUSTOM_KEY, JSON.stringify(custom));
    } catch (_) {}
  }
  function loadNames() {
    try {
      const a = JSON.parse(localStorage.getItem(NAMES_KEY) || "[]");
      return Array.isArray(a) ? a : [];
    } catch (_) {
      return [];
    }
  }
  function saveNames() {
    try {
      localStorage.setItem(NAMES_KEY, JSON.stringify(names));
    } catch (_) {}
  }

  function speak(t) {
    try {
      if (voice) voice.speak(t);
      else if (window.speechSynthesis) {
        const u = new SpeechSynthesisUtterance(t);
        u.rate = 0.95;
        speechSynthesis.cancel();
        speechSynthesis.speak(u);
      }
    } catch (_) {}
  }

  function pool() {
    const out = [];
    if (category === "custom") {
      custom.forEach((p) => out.push({ text: p, cat: "custom" }));
      return out;
    }
    const cats = category === "all" ? SPINNER_CATS : [category];
    const diffs =
      difficulty === "all" ? ["easy", "medium", "hard"] : [difficulty];
    cats.forEach((c) => {
      const bank = SPINNER_PROMPTS[c];
      if (!bank) return;
      diffs.forEach((d) => {
        (bank[d] || []).forEach((text) => out.push({ text, cat: c }));
      });
    });
    custom.forEach((p) => {
      if (category === "all") out.push({ text: p, cat: "custom" });
    });
    return out;
  }

  function pickPrompt() {
    const p = pool();
    if (!p.length) return { text: "Add some prompts first!", cat: "none" };
    const available = p.filter((x) => !recent.includes(x.text));
    const list = available.length ? available : p;
    const choice = list[Math.floor(Math.random() * list.length)];
    recent.push(choice.text);
    if (recent.length > Math.min(12, Math.max(3, Math.floor(p.length * 0.4)))) {
      recent.shift();
    }
    return choice;
  }

  function pickStudent() {
    if (!names.length) return "";
    return names[Math.floor(Math.random() * names.length)];
  }

  function showPrompt(item) {
    currentPrompt = item.text;
    currentStudent = $("toggle-name").checked ? pickStudent() : "";
    const line = currentStudent
      ? currentStudent + " — " + currentPrompt
      : currentPrompt;
    $("prompt-text").textContent = line;
    $("prompt-cat").textContent =
      item.cat && item.cat !== "none"
        ? (SPINNER_PROMPTS[item.cat] && SPINNER_PROMPTS[item.cat].label) || item.cat
        : "";
    if ($("toggle-tts").checked && currentPrompt) speak(line);
  }

  function spin() {
    if (spinning) return;
    spinning = true;
    $("btn-spin").disabled = true;
    const extra = 4 + Math.floor(Math.random() * 3);
    const slice = 360 / Math.max(SPINNER_CATS.length, 1);
    const land = Math.floor(Math.random() * SPINNER_CATS.length);
    rotation += extra * 360 + land * slice + slice / 2;
    $("wheel").style.transform = "rotate(" + rotation + "deg)";
    setTimeout(() => {
      spinning = false;
      $("btn-spin").disabled = false;
      // If category is all, optionally bias display — still pick from filters
      showPrompt(pickPrompt());
    }, 3200);
  }

  function buildWheel() {
    const wheel = $("wheel");
    const n = SPINNER_CATS.length;
    const slice = 360 / n;
    const stops = SPINNER_CATS.map((c, i) => {
      const col = SPINNER_PROMPTS[c].color || COLORS[i % COLORS.length];
      return col + " " + i * slice + "deg " + (i + 1) * slice + "deg";
    }).join(", ");
    wheel.style.background = "conic-gradient(from -90deg, " + stops + ")";
    // labels
    wheel.innerHTML = "";
    SPINNER_CATS.forEach((c, i) => {
      const lab = document.createElement("span");
      lab.className = "w-label";
      const ang = -90 + i * slice + slice / 2;
      lab.style.transform =
        "rotate(" + ang + "deg) translate(0, -118px) rotate(" + -ang + "deg)";
      lab.textContent = SPINNER_PROMPTS[c].label.split(" ")[0];
      wheel.appendChild(lab);
    });
  }

  function fillCategorySelect() {
    const sel = $("sel-cat");
    sel.innerHTML =
      '<option value="all">All categories</option>' +
      SPINNER_CATS.map(
        (c) =>
          '<option value="' +
          c +
          '">' +
          SPINNER_PROMPTS[c].label +
          "</option>"
      ).join("") +
      '<option value="custom">Custom only</option>';
  }

  function renderCustomList() {
    const el = $("custom-list");
    el.innerHTML = "";
    custom.forEach((p, i) => {
      const row = document.createElement("div");
      row.className = "custom-row";
      row.innerHTML =
        "<span>" +
        escapeHtml(p) +
        '</span><button type="button" data-i="' +
        i +
        '">×</button>';
      row.querySelector("button").onclick = () => {
        custom.splice(i, 1);
        saveCustom();
        renderCustomList();
      };
      el.appendChild(row);
    });
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  document.addEventListener("DOMContentLoaded", () => {
    fillCategorySelect();
    buildWheel();
    renderCustomList();
    if (names.length) $("name-input").value = names.join(", ");

    if (window.TokenMooseVoice) {
      voice = TokenMooseVoice.create("speaking-spinner");
      const slot = $("voice-slot");
      if (slot) voice.mountPicker(slot);
    }

    $("sel-cat").addEventListener("change", (e) => {
      category = e.target.value;
    });
    $("sel-diff").addEventListener("change", (e) => {
      difficulty = e.target.value;
    });
    $("btn-spin").addEventListener("click", spin);
    $("btn-next").addEventListener("click", () => showPrompt(pickPrompt()));
    $("btn-repeat").addEventListener("click", () => {
      if (currentPrompt) {
        const line = currentStudent
          ? currentStudent + " — " + currentPrompt
          : currentPrompt;
        speak(line);
      }
    });
    $("btn-add-custom").addEventListener("click", () => {
      const t = $("custom-input").value.trim();
      if (!t) return;
      custom.push(t);
      saveCustom();
      $("custom-input").value = "";
      renderCustomList();
    });
    $("btn-save-names").addEventListener("click", () => {
      names = $("name-input")
        .value.split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      saveNames();
      $("name-status").textContent = names.length + " names saved";
    });
    $("btn-clear-recent").addEventListener("click", () => {
      recent = [];
      $("prompt-text").textContent = "Spin for a prompt!";
      $("prompt-cat").textContent = "";
    });

    // keyboard
    document.addEventListener("keydown", (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        spin();
      }
      if (e.key === "n" || e.key === "N") showPrompt(pickPrompt());
    });
  });
})();
