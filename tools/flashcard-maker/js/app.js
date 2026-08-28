(function () {
  const KEY = "token-moose-flashcard-maker-v2";
  const $ = (id) => document.getElementById(id);

  const PRINT_THEMES = {
    classic: { font: "#111111", bg: "#ffffff", border: "#222222" },
    ocean: { font: "#0c4a6e", bg: "#e0f2fe", border: "#0284c7" },
    sunshine: { font: "#78350f", bg: "#fef3c7", border: "#d97706" },
    forest: { font: "#14532d", bg: "#dcfce7", border: "#16a34a" },
    candy: { font: "#9d174d", bg: "#fce7f3", border: "#db2777" },
  };

  const LAYOUT_PER_PAGE = {
    "2x2": 4,
    "2x3": 6,
    "2x5": 10,
  };

  function parseDeck(raw) {
    // Prefer comma: "front, back" per line. Still accept | and tab.
    const lines = String(raw || "")
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean);
    const cards = [];
    lines.forEach((line) => {
      if (line.includes("|")) {
        const parts = line.split("|").map((s) => s.trim());
        if (parts[0])
          cards.push({
            front: parts[0],
            back: parts.slice(1).join(" | ") || parts[0],
          });
        return;
      }
      if (line.includes("\t")) {
        const parts = line.split("\t").map((s) => s.trim());
        if (parts[0])
          cards.push({
            front: parts[0],
            back: parts.slice(1).join(" ") || parts[0],
          });
        return;
      }
      const comma = line.indexOf(",");
      if (comma >= 0) {
        const front = line.slice(0, comma).trim();
        const back = line.slice(comma + 1).trim();
        if (front) cards.push({ front, back: back || front });
        return;
      }
      cards.push({ front: line, back: line });
    });
    return cards.filter((c) => c.front);
  }

  function cardsToText(list) {
    return list.map((c) => c.front + ", " + c.back).join("\n");
  }

  let cards = [];
  let idx = 0;
  let showingBack = false;

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const d = JSON.parse(raw);
        if (typeof d === "string") $("deck").value = d;
        else if (d && typeof d.deck === "string") $("deck").value = d.deck;
        if (d && d.print) applyPrintSettings(d.print, false);
      } else {
        const legacy = localStorage.getItem("token-moose-flashcard-maker-v1");
        if (legacy) $("deck").value = legacy;
      }
    } catch (_) {
      try {
        const legacy = localStorage.getItem("token-moose-flashcard-maker-v1");
        if (legacy) $("deck").value = legacy;
      } catch (__) {}
    }
    updatePreview();
  }

  function saveLocal() {
    try {
      localStorage.setItem(
        KEY,
        JSON.stringify({
          deck: $("deck").value,
          print: getPrintSettings(),
        })
      );
    } catch (_) {}
  }

  function getPrintSettings() {
    return {
      layout: $("print-layout").value,
      theme: $("print-theme").value,
      textSize: $("print-text-size").value,
      border: $("print-border").value,
      font: $("print-font").value,
      bg: $("print-bg").value,
      borderColor: $("print-border-color").value,
      rotate: !!( $("print-rotate") && $("print-rotate").checked ),
    };
  }

  function applyPrintSettings(s, rebuildPreview) {
    if (!s) return;
    if (s.layout) $("print-layout").value = s.layout;
    if (s.theme) $("print-theme").value = s.theme;
    if (s.textSize) $("print-text-size").value = s.textSize;
    if (s.border) $("print-border").value = s.border;
    if (s.font) $("print-font").value = s.font;
    if (s.bg) $("print-bg").value = s.bg;
    if (s.borderColor) $("print-border-color").value = s.borderColor;
    if ($("print-rotate") && typeof s.rotate === "boolean") $("print-rotate").checked = s.rotate;
    if (rebuildPreview !== false) updatePreview();
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function fitTextToCard(el, text) {
    el.textContent = text;
    el.style.fontSize = "";
    const card = $("flip-card");
    if (!card) {
      el.style.fontSize = "1.5rem";
      return;
    }
    let size = 2.8;
    el.style.fontSize = size + "rem";
    el.style.lineHeight = "1.2";
    for (let i = 0; i < 24; i++) {
      const fits =
        el.scrollHeight <= card.clientHeight - 48 &&
        el.scrollWidth <= card.clientWidth - 24;
      if (fits || size <= 0.75) break;
      size -= 0.12;
      el.style.fontSize = size + "rem";
    }
  }

  function showCard() {
    if (!cards.length) return;
    const c = cards[idx];
    const text = showingBack ? c.back : c.front;
    fitTextToCard($("card-text"), text);
    $("flip-card").classList.toggle("is-back", showingBack);
    $("prog").textContent = idx + 1 + " / " + cards.length;
  }

  function openPractice() {
    saveLocal();
    cards = parseDeck($("deck").value);
    if (!cards.length) {
      alert("Add cards first (front, back per line).");
      return;
    }
    idx = 0;
    showingBack = false;
    $("practice").hidden = false;
    showCard();
  }

  function downloadTxt() {
    saveLocal();
    const text = $("deck").value || "";
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "flashcard-deck.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 500);
    const btn = $("btn-save");
    btn.textContent = "Downloaded";
    setTimeout(() => {
      btn.textContent = "Save deck (.txt)";
    }, 1000);
  }

  function importTxt(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result || "");
      $("deck").value = text;
      saveLocal();
    };
    reader.readAsText(file);
  }

  function updatePreview() {
    const size = parseInt($("print-text-size").value, 10) || 18;
    const border = parseInt($("print-border").value, 10) || 2;
    const font = $("print-font").value;
    const bg = $("print-bg").value;
    const borderC = $("print-border-color").value;
    const layout = ($("print-layout") && $("print-layout").value) || "2x3";
    const rotate = !!( $("print-rotate") && $("print-rotate").checked );

    $("print-text-size-label").textContent = size + "px";
    $("print-border-label").textContent = border + "px";

    document.documentElement.style.setProperty("--print-text-size", size + "px");
    document.documentElement.style.setProperty("--print-border-w", border + "px");
    document.documentElement.style.setProperty("--print-font", font);
    document.documentElement.style.setProperty("--print-bg", bg);
    document.documentElement.style.setProperty("--print-border-c", borderC);

    const list = parseDeck($("deck").value);
    const sample = list[0] ? list[0].front : "Sample word";
    const face = $("print-preview-text");
    face.textContent = sample;
    face.style.fontSize = size + "px";
    face.style.color = font;
    face.style.transform = rotate ? "rotate(90deg)" : "none";

    const card = $("print-preview");
    card.style.background = bg;
    card.style.borderColor = borderC;
    card.style.borderWidth = border + "px";
    card.style.color = font;
    card.classList.remove("layout-2x2", "layout-2x3", "layout-2x5");
    card.classList.add("layout-" + layout);
    card.classList.toggle("is-rotated", rotate);
  }

  function applyPrintTheme(id) {
    const t = PRINT_THEMES[id];
    if (!t) return;
    $("print-font").value = t.font;
    $("print-bg").value = t.bg;
    $("print-border-color").value = t.border;
    updatePreview();
  }

  function chunk(arr, n) {
    const out = [];
    for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
    return out;
  }

  function makeCardEl(text, empty) {
    const d = document.createElement("div");
    const rotate = !!( $("print-rotate") && $("print-rotate").checked );
    d.className = "print-card" + (empty ? " is-empty" : "") + (rotate ? " is-rotated" : "");
    const size = parseInt($("print-text-size").value, 10) || 18;
    const border = parseInt($("print-border").value, 10) || 2;
    const font = $("print-font").value;
    const bg = $("print-bg").value;
    const borderC = $("print-border-color").value;
    d.style.setProperty("background", bg, "important");
    d.style.setProperty("color", font, "important");
    d.style.setProperty("border", border + "px solid " + borderC, "important");
    const face = document.createElement("div");
    face.className = "print-face";
    face.textContent = text || "";
    face.style.setProperty("font-size", size + "px", "important");
    face.style.setProperty("color", font, "important");
    if (rotate) face.style.setProperty("transform", "rotate(90deg)", "important");
    d.appendChild(face);
    return d;
  }

  function buildPrintPages(side) {
    // side: "front" | "back"
    const list = parseDeck($("deck").value);
    const layout = $("print-layout").value || "2x3";
    const perPage = LAYOUT_PER_PAGE[layout] || 6;
    const pages = chunk(list, perPage);
    const frag = document.createDocumentFragment();

    if (!pages.length) {
      const page = document.createElement("div");
      page.className = "print-page";
      page.style.setProperty("background", "#ffffff", "important");
      page.style.setProperty("background-color", "#ffffff", "important");
      const g = document.createElement("div");
      g.className = "print-grid layout-" + layout;
      for (let i = 0; i < perPage; i++) g.appendChild(makeCardEl("", true));
      page.appendChild(g);
      frag.appendChild(page);
      return frag;
    }

    pages.forEach((group, pi) => {
      const page = document.createElement("div");
      page.className = "print-page";
      page.style.setProperty("background", "#ffffff", "important");
      page.style.setProperty("background-color", "#ffffff", "important");
      const title = document.createElement("h3");
      title.className = "print-only-title";
      title.textContent =
        (side === "front" ? "Fronts" : "Backs") +
        " — page " +
        (pi + 1) +
        (side === "back" ? " (print on reverse)" : "");
      page.appendChild(title);
      const g = document.createElement("div");
      g.className = "print-grid layout-" + layout;
      group.forEach((c) => {
        g.appendChild(makeCardEl(side === "front" ? c.front : c.back, false));
      });
      // fill empty slots so grid stays even
      for (let i = group.length; i < perPage; i++) {
        g.appendChild(makeCardEl("", true));
      }
      page.appendChild(g);
      frag.appendChild(page);
    });
    return frag;
  }

  function buildPrint() {
    saveLocal();
    const host = $("print-area");
    host.innerHTML = "";
    host.classList.add("is-building");
    host.hidden = false;
    host.style.setProperty("background", "#ffffff", "important");
    host.style.setProperty("background-color", "#ffffff", "important");
    host.appendChild(buildPrintPages("front"));
    host.appendChild(buildPrintPages("back"));
  }

  // ── Events ───────────────────────────────────────────────────────────

  $("btn-save").addEventListener("click", downloadTxt);
  $("btn-import").addEventListener("click", () => $("import-file").click());
  $("import-file").addEventListener("change", (e) => {
    const f = e.target.files && e.target.files[0];
    importTxt(f);
    e.target.value = "";
  });

  $("btn-practice").addEventListener("click", openPractice);
  $("btn-shuffle").addEventListener("click", () => {
    const list = parseDeck($("deck").value);
    if (!list.length) return;
    $("deck").value = cardsToText(shuffle(list));
    saveLocal();
  });

  $("btn-print-setup").addEventListener("click", () => {
    $("main-panel").hidden = true;
    $("print-setup").hidden = false;
    updatePreview();
  });
  $("btn-print-cancel").addEventListener("click", () => {
    $("print-setup").hidden = true;
    $("main-panel").hidden = false;
  });
  $("btn-print-go").addEventListener("click", () => {
    buildPrint();
    window.print();
    setTimeout(() => {
      $("print-area").innerHTML = "";
      $("print-area").classList.remove("is-building");
      $("print-area").hidden = true;
    }, 500);
  });

  $("print-theme").addEventListener("change", () => {
    const v = $("print-theme").value;
    if (v !== "custom") applyPrintTheme(v);
    else updatePreview();
    saveLocal();
  });
  ["print-text-size", "print-border", "print-font", "print-bg", "print-border-color", "print-layout", "print-rotate"].forEach(
    (id) => {
      $(id).addEventListener("input", () => {
        if (id !== "print-layout" && id !== "print-theme") {
          $("print-theme").value = "custom";
        }
        updatePreview();
        saveLocal();
      });
      $(id).addEventListener("change", () => {
        updatePreview();
        saveLocal();
      });
    }
  );

  $("deck").addEventListener("change", saveLocal);

  $("btn-exit").addEventListener("click", () => {
    $("practice").hidden = true;
  });
  $("flip-card").addEventListener("click", () => {
    showingBack = !showingBack;
    showCard();
  });
  $("btn-prev").addEventListener("click", () => {
    if (!cards.length) return;
    idx = (idx - 1 + cards.length) % cards.length;
    showingBack = false;
    showCard();
  });
  $("btn-next").addEventListener("click", () => {
    if (!cards.length) return;
    idx = (idx + 1) % cards.length;
    showingBack = false;
    showCard();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !$("practice").hidden) $("practice").hidden = true;
  });

  load();
})();
