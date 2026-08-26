(function () {
  const KEY = "token-moose-flashcard-maker-v1";
  const $ = (id) => document.getElementById(id);

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
        if (parts[0]) cards.push({ front: parts[0], back: parts.slice(1).join(" | ") || parts[0] });
        return;
      }
      if (line.includes("\t")) {
        const parts = line.split("\t").map((s) => s.trim());
        if (parts[0]) cards.push({ front: parts[0], back: parts.slice(1).join(" ") || parts[0] });
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

  let cards = [];
  let idx = 0;
  let showingBack = false;

  function load() {
    try {
      const d = localStorage.getItem(KEY);
      if (d) $("deck").value = d;
    } catch (_) {}
  }

  function save() {
    try {
      localStorage.setItem(KEY, $("deck").value);
    } catch (_) {}
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
    // Binary-ish shrink until text fits inside the card face
    const card = $("flip-card");
    if (!card) {
      el.style.fontSize = "1.5rem";
      return;
    }
    let size = 2.8;
    el.style.fontSize = size + "rem";
    el.style.lineHeight = "1.2";
    // Allow layout
    for (let i = 0; i < 24; i++) {
      const fits =
        el.scrollHeight <= card.clientHeight - 48 && el.scrollWidth <= card.clientWidth - 24;
      if (fits || size <= 0.75) break;
      size -= 0.12;
      el.style.fontSize = size + "rem";
    }
  }

  function showCard() {
    if (!cards.length) return;
    const c = cards[idx];
    const text = showingBack ? c.back : c.front;
    const el = $("card-text");
    fitTextToCard(el, text);
    $("flip-card").classList.toggle("is-back", showingBack);
    $("prog").textContent = idx + 1 + " / " + cards.length;
  }

  function openPractice() {
    save();
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

  function buildPrint() {
    save();
    const list = parseDeck($("deck").value);
    const host = $("print-area");
    host.innerHTML = "";
    host.hidden = false;
    // Page 1: fronts (for double-sided: print, flip stack, print backs)
    const fronts = document.createElement("div");
    fronts.className = "print-page";
    fronts.innerHTML = "<h3 class=\"print-only-title\">Fronts — print this page first</h3>";
    const fg = document.createElement("div");
    fg.className = "print-grid";
    list.forEach((c) => {
      const d = document.createElement("div");
      d.className = "print-card front";
      d.innerHTML = "<div class=\"print-face\">" + escapeHtml(c.front) + "</div>";
      fg.appendChild(d);
    });
    fronts.appendChild(fg);
    host.appendChild(fronts);
    // Page 2: backs in same order (for duplex, mirror columns if needed — keep same order for simple duplex)
    const backs = document.createElement("div");
    backs.className = "print-page print-page-backs";
    backs.innerHTML = "<h3 class=\"print-only-title\">Backs — print on reverse (same order)</h3>";
    const bg = document.createElement("div");
    bg.className = "print-grid";
    list.forEach((c) => {
      const d = document.createElement("div");
      d.className = "print-card back";
      d.innerHTML = "<div class=\"print-face\">" + escapeHtml(c.back) + "</div>";
      bg.appendChild(d);
    });
    backs.appendChild(bg);
    host.appendChild(backs);
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  $("btn-save").addEventListener("click", () => {
    save();
    $("btn-save").textContent = "Saved";
    setTimeout(() => {
      $("btn-save").textContent = "Save deck";
    }, 900);
  });
  $("btn-practice").addEventListener("click", openPractice);
  $("btn-shuffle").addEventListener("click", () => {
    const list = parseDeck($("deck").value);
    if (!list.length) return;
    const shuffled = shuffle(list);
    $("deck").value = shuffled.map((c) => c.front + " | " + c.back).join("\n");
    save();
  });
  $("btn-print").addEventListener("click", () => {
    buildPrint();
    window.print();
  });
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

  load();
})();
