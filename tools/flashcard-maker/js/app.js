(function () {
  const KEY = "token-moose-flashcard-maker-v1";
  const $ = (id) => document.getElementById(id);

  function parseDeck(raw) {
    return String(raw || "")
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const parts = line.split("|").map((s) => s.trim());
        if (parts.length >= 2) return { front: parts[0], back: parts.slice(1).join(" | ") };
        const tabs = line.split("\t").map((s) => s.trim());
        if (tabs.length >= 2) return { front: tabs[0], back: tabs.slice(1).join(" ") };
        return { front: line, back: line };
      })
      .filter((c) => c.front);
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

  function showCard() {
    if (!cards.length) return;
    const c = cards[idx];
    $("card-text").textContent = showingBack ? c.back : c.front;
    $("flip-card").classList.toggle("is-back", showingBack);
    $("prog").textContent = idx + 1 + " / " + cards.length;
  }

  function openPractice() {
    save();
    cards = parseDeck($("deck").value);
    if (!cards.length) {
      alert("Add cards first (front | back per line).");
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
    list.forEach((c) => {
      const d = document.createElement("div");
      d.className = "print-card";
      d.innerHTML = "<strong>" + escapeHtml(c.front) + "</strong><span>" + escapeHtml(c.back) + "</span>";
      host.appendChild(d);
    });
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
