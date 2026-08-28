(function () {
  const KEY = "token-moose-word-wall-maker-v2";
  const $ = (id) => document.getElementById(id);

  /** Five preset colour themes (title, card, text, wall bg) */
  const THEMES = {
    ocean: {
      title: "#e0f2fe",
      card: "#ffffff",
      text: "#0c4a6e",
      bg: "#0c4a6e",
    },
    sunshine: {
      title: "#9a3412",
      card: "#fffbeb",
      text: "#78350f",
      bg: "#fbbf24",
    },
    forest: {
      title: "#ecfdf5",
      card: "#f0fdf4",
      text: "#14532d",
      bg: "#166534",
    },
    candy: {
      title: "#ffffff",
      card: "#fdf2f8",
      text: "#9d174d",
      bg: "#db2777",
    },
    chalkboard: {
      title: "#f8fafc",
      card: "#f1f5f9",
      text: "#1e293b",
      bg: "#1a3a2a",
    },
  };

  function parseWords(raw) {
    const seen = new Set();
    return String(raw || "")
      .split(",")
      .map((s) => s.trim())
      .filter((s) => {
        if (!s) return false;
        const k = s.toLowerCase();
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      });
  }

  function load() {
    try {
      let raw = localStorage.getItem(KEY);
      if (!raw) raw = localStorage.getItem("token-moose-word-wall-maker-v1");
      const d = JSON.parse(raw || "{}");
      if (d.title) $("title").value = d.title;
      if (d.words) $("words").value = d.words;
      if (d.cols) $("cols").value = d.cols;
      if (d.titleSize) {
        $("title-size").value = d.titleSize;
        $("title-size-label").textContent = d.titleSize + "px";
      }
      if (d.colorTitle) $("color-title").value = d.colorTitle;
      if (d.colorCard) $("color-card").value = d.colorCard;
      if (d.colorText) $("color-text").value = d.colorText;
      if (d.colorBg) $("color-bg").value = d.colorBg;
      if (d.theme && THEMES[d.theme]) $("color-theme").value = d.theme;
      else $("color-theme").value = "custom";
      if (d.order) window.__wwOrder = d.order;
    } catch (_) {}
  }

  function save() {
    try {
      localStorage.setItem(
        KEY,
        JSON.stringify({
          title: $("title").value,
          words: $("words").value,
          cols: $("cols").value,
          titleSize: $("title-size").value,
          order: window.__wwOrder || "alpha",
          theme: $("color-theme").value,
          colorTitle: $("color-title").value,
          colorCard: $("color-card").value,
          colorText: $("color-text").value,
          colorBg: $("color-bg").value,
        })
      );
    } catch (_) {}
  }

  function applyTheme(id) {
    const t = THEMES[id];
    if (!t) return;
    $("color-title").value = t.title;
    $("color-card").value = t.card;
    $("color-text").value = t.text;
    $("color-bg").value = t.bg;
  }

  function titleSizePx() {
    return Math.max(18, Math.min(72, parseInt($("title-size").value, 10) || 32));
  }

  function orderedWords() {
    let words = parseWords($("words").value);
    const order = window.__wwOrder || "alpha";
    if (order === "alpha") {
      words = words.slice().sort((a, b) =>
        a.localeCompare(b, undefined, { sensitivity: "base" })
      );
    } else if (order === "random") {
      words = words.slice();
      for (let i = words.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [words[i], words[j]] = [words[j], words[i]];
      }
    }
    return words;
  }

  /**
   * Build wall: title is a centered header ABOVE the word grid (not a grid cell).
   * @param {HTMLElement} wallHost  #wall or #present-wall
   * @param {HTMLElement} titleEl
   * @param {HTMLElement} gridEl
   */
  function buildInto(wallHost, titleEl, gridEl) {
    save();
    const words = orderedWords();
    const cols = Math.max(2, Math.min(8, parseInt($("cols").value, 10) || 4));
    const size = titleSizePx();
    const titleCol = $("color-title").value || "#f8fafc";
    const cardCol = $("color-card").value || "#ffffff";
    const textCol = $("color-text").value || "#0f172a";
    const bgCol = $("color-bg").value || "#1e3a5f";

    document.documentElement.style.setProperty("--ww-title-color", titleCol);
    document.documentElement.style.setProperty("--ww-title-size", size + "px");

    wallHost.style.setProperty("background", bgCol, "important");
    wallHost.style.setProperty("background-color", bgCol, "important");
    wallHost.style.padding = "0.85rem";
    wallHost.style.borderRadius = "12px";

    titleEl.textContent = ($("title").value || "Our Word Wall").trim();
    titleEl.style.setProperty("color", titleCol, "important");
    titleEl.style.fontSize = size + "px";

    gridEl.style.gridTemplateColumns = "repeat(" + cols + ", 1fr)";
    gridEl.innerHTML = "";

    if (!words.length) {
      const p = document.createElement("p");
      p.className = "empty-msg";
      p.textContent = "Add some words above.";
      p.style.gridColumn = "1 / -1";
      p.style.textAlign = "center";
      p.style.color = titleCol;
      p.style.opacity = "0.85";
      gridEl.appendChild(p);
      return;
    }

    words.forEach((w) => {
      const c = document.createElement("div");
      c.className = "card";
      c.textContent = w;
      c.style.setProperty("background", cardCol, "important");
      c.style.setProperty("color", textCol, "important");
      gridEl.appendChild(c);
    });
  }

  function rebuild() {
    buildInto($("wall"), $("wall-title-el"), $("wall-grid"));
  }

  window.__wwOrder = "alpha";

  $("btn-build").addEventListener("click", rebuild);
  $("btn-alpha").addEventListener("click", () => {
    window.__wwOrder = "alpha";
    rebuild();
  });
  $("btn-random").addEventListener("click", () => {
    window.__wwOrder = "random";
    rebuild();
  });

  $("color-theme").addEventListener("change", () => {
    const v = $("color-theme").value;
    if (v !== "custom") applyTheme(v);
    rebuild();
  });

  ["color-title", "color-card", "color-text", "color-bg"].forEach((id) => {
    $(id).addEventListener("input", () => {
      $("color-theme").value = "custom";
      rebuild();
    });
  });

  $("title-size").addEventListener("input", () => {
    $("title-size-label").textContent = titleSizePx() + "px";
    rebuild();
  });

  $("btn-print").addEventListener("click", () => {
    rebuild();
    window.print();
  });

  $("btn-present").addEventListener("click", () => {
    buildInto($("present-wall"), $("present-title-el"), $("present-grid"));
    $("present").hidden = false;
  });
  $("btn-exit").addEventListener("click", () => {
    $("present").hidden = true;
  });

  let bankList = [];
  let bankIdx = 0;
  function showBankWord() {
    if (!bankList.length) {
      $("bank-word").textContent = "Add words first";
      $("bank-count").textContent = "";
      return;
    }
    $("bank-word").textContent = bankList[bankIdx];
    $("bank-count").textContent = bankIdx + 1 + " / " + bankList.length;
  }
  $("btn-bank").addEventListener("click", () => {
    bankList = orderedWords();
    bankIdx = 0;
    $("word-bank").hidden = false;
    showBankWord();
  });
  $("btn-bank-next").addEventListener("click", () => {
    if (!bankList.length) return;
    bankIdx = (bankIdx + 1) % bankList.length;
    showBankWord();
  });
  $("btn-bank-prev").addEventListener("click", () => {
    if (!bankList.length) return;
    bankIdx = (bankIdx - 1 + bankList.length) % bankList.length;
    showBankWord();
  });
  $("btn-bank-exit").addEventListener("click", () => {
    $("word-bank").hidden = true;
  });
  $("btn-clear").addEventListener("click", () => {
    $("words").value = "";
    $("wall-grid").innerHTML = "";
    $("wall-title-el").textContent = "";
    save();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !$("present").hidden) $("present").hidden = true;
  });

  load();
  rebuild();
})();
