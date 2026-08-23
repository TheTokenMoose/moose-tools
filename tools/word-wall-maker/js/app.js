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
      if (typeof d.alpha === "boolean") $("alpha").checked = d.alpha;
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
          alpha: $("alpha").checked,
        })
      );
    } catch (_) {}
  }

  function buildInto(host, present) {
    save();
    let words = parseWords($("words").value);
    if ($("alpha").checked) {
      words = words.slice().sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
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
    words.forEach((w) => {
      const c = document.createElement("div");
      c.className = "card";
      c.textContent = w;
      host.appendChild(c);
    });
  }

  $("btn-build").addEventListener("click", () => buildInto($("wall"), false));
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
