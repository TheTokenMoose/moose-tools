(function () {
  const KEY = "token-moose-word-wall-maker-v1";
  const $ = (id) => document.getElementById(id);

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
      const d = JSON.parse(localStorage.getItem(KEY) || "{}");
      if (d.title) $("title").value = d.title;
      if (d.words) $("words").value = d.words;
      if (d.cols) $("cols").value = d.cols;
      
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
          order: window.__wwOrder || "alpha",
          colorCard: $("color-card") && $("color-card").value,
          colorText: $("color-text") && $("color-text").value,
          colorBg: $("color-bg") && $("color-bg").value,
        })
      );
    } catch (_) {}
  }

  function buildInto(host, present) {
    save();
    let words = parseWords($("words").value);
    const order = window.__wwOrder || "alpha";
    if (order === "alpha") {
      words = words.slice().sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
    } else if (order === "random") {
      words = words.slice();
      for (let i = words.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [words[i], words[j]] = [words[j], words[i]];
      }
    }
    const cols = Math.max(2, Math.min(8, parseInt($("cols").value, 10) || 4));
    host.style.gridTemplateColumns = "repeat(" + cols + ", 1fr)";
    host.innerHTML = "";
    if (!present) {
      const t = document.createElement("div");
      t.className = "wall-title";
      t.textContent = ($("title").value || "Our Word Wall").trim();
      host.appendChild(t);
    }
    if (!words.length) {
      const p = document.createElement("p");
      p.textContent = "Add some words above.";
      p.style.gridColumn = "1 / -1";
      host.appendChild(p);
      return;
    }
    const cardCol = ($("color-card") && $("color-card").value) || "#ffffff";
    const textCol = ($("color-text") && $("color-text").value) || "#0f172a";
    const bgCol = ($("color-bg") && $("color-bg").value) || "";
    if (bgCol && host === $("wall")) {
      host.style.background = bgCol;
      host.style.padding = "0.75rem";
      host.style.borderRadius = "12px";
    }
    words.forEach((w) => {
      const c = document.createElement("div");
      c.className = "card";
      c.textContent = w;
      c.style.setProperty("background", cardCol, "important");
      c.style.setProperty("color", textCol, "important");
      host.appendChild(c);
    });
  }

  window.__wwOrder = "alpha";
  $("btn-build").addEventListener("click", () => buildInto($("wall"), false));
  $("btn-alpha").addEventListener("click", () => {
    window.__wwOrder = "alpha";
    buildInto($("wall"), false);
  });
  $("btn-random").addEventListener("click", () => {
    window.__wwOrder = "random";
    buildInto($("wall"), false);
  });
  // Live colour updates
  ["color-card", "color-text", "color-bg"].forEach((id) => {
    const el = $(id);
    if (!el) return;
    el.addEventListener("input", () => {
      if ($("wall") && $("wall").children.length) buildInto($("wall"), false);
    });
  });
  $("btn-print").addEventListener("click", () => {
    buildInto($("wall"), false);
    window.print();
  });
  $("btn-present").addEventListener("click", () => {
    $("present-title").textContent = ($("title").value || "Our Word Wall").trim();
    buildInto($("present-wall"), true);
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
    bankList = parseWords($("words").value);
    if (window.__wwOrder === "alpha") {
      bankList = bankList.slice().sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
    } else if (window.__wwOrder === "random") {
      bankList = bankList.slice();
      for (let i = bankList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [bankList[i], bankList[j]] = [bankList[j], bankList[i]];
      }
    }
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
    $("wall").innerHTML = "";
    save();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !$("present").hidden) $("present").hidden = true;
  });

  load();
  buildInto($("wall"), false);
})();
