(function () {
  const STORAGE_KEY = "token-moose-visual-schedule-v1";
  const PRESETS = [
    { id: "morning", emoji: "🌅", label: "Morning Meeting", color: "#fde68a" },
    { id: "reading", emoji: "📚", label: "Reading", color: "#bfdbfe" },
    { id: "phonics", emoji: "🔤", label: "Phonics", color: "#c4b5fd" },
    { id: "maths", emoji: "🔢", label: "Maths", color: "#a7f3d0" },
    { id: "snack", emoji: "🍎", label: "Snack", color: "#fecaca" },
    { id: "art", emoji: "🎨", label: "Art", color: "#fbcfe8" },
    { id: "pe", emoji: "🏃", label: "PE", color: "#bbf7d0" },
    { id: "lunch", emoji: "🍱", label: "Lunch", color: "#fed7aa" },
    { id: "science", emoji: "🔬", label: "Science", color: "#99f6e4" },
    { id: "music", emoji: "🎵", label: "Music", color: "#ddd6fe" },
    { id: "writing", emoji: "✍️", label: "Writing", color: "#fce7f3" },
    { id: "centers", emoji: "🧩", label: "Centres", color: "#e0e7ff" },
    { id: "story", emoji: "📖", label: "Story Time", color: "#fef3c7" },
    { id: "packup", emoji: "🎒", label: "Pack Up", color: "#e2e8f0" },
    { id: "home", emoji: "🏠", label: "Home Time", color: "#bae6fd" },
  ];

  const els = {
    palette: document.getElementById("palette-list"),
    list: document.getElementById("schedule-list"),
    empty: document.getElementById("empty-hint"),
    title: document.getElementById("day-title"),
    custom: document.getElementById("custom-label"),
    addCustom: document.getElementById("btn-add-custom"),
    clear: document.getElementById("btn-clear"),
    present: document.getElementById("btn-present"),
    overlay: document.getElementById("present-overlay"),
    presentTitle: document.getElementById("present-title"),
    presentList: document.getElementById("present-list"),
    exitPresent: document.getElementById("btn-exit-present"),
  };

  let items = [];
  let dragId = null;

  function uid() {
    return "b_" + Math.random().toString(36).slice(2, 9);
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      if (data && Array.isArray(data.items)) items = data.items;
      if (data && typeof data.title === "string") els.title.value = data.title;
    } catch (_) {}
  }

  function save() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ title: els.title.value || "Today's Schedule", items })
      );
    } catch (_) {}
  }

  function renderPalette() {
    els.palette.innerHTML = "";
    PRESETS.forEach((p) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "pal-btn";
      b.style.background = p.color;
      b.innerHTML = `<span aria-hidden="true">${p.emoji}</span><span>${p.label}</span>`;
      b.addEventListener("click", () => addBlock({ emoji: p.emoji, label: p.label, color: p.color }));
      els.palette.appendChild(b);
    });
  }

  function addBlock(block) {
    items.push({ id: uid(), emoji: block.emoji || "📌", label: block.label, color: block.color || "#e2e8f0" });
    save();
    renderList();
  }

  function removeBlock(id) {
    items = items.filter((x) => x.id !== id);
    save();
    renderList();
  }

  function renderList() {
    els.list.innerHTML = "";
    els.empty.hidden = items.length > 0;
    items.forEach((it, idx) => {
      const li = document.createElement("li");
      li.className = "sched-item";
      li.draggable = true;
      li.dataset.id = it.id;
      li.style.background = it.color;
      li.innerHTML = `
        <span class="emoji" aria-hidden="true">${it.emoji}</span>
        <span class="label">${escapeHtml(it.label)}</span>
        <button type="button" class="remove" aria-label="Remove ${escapeHtml(it.label)}">×</button>
      `;
      li.querySelector(".remove").addEventListener("click", (e) => {
        e.stopPropagation();
        removeBlock(it.id);
      });
      li.addEventListener("dragstart", () => {
        dragId = it.id;
        li.classList.add("dragging");
      });
      li.addEventListener("dragend", () => {
        dragId = null;
        li.classList.remove("dragging");
      });
      li.addEventListener("dragover", (e) => e.preventDefault());
      li.addEventListener("drop", (e) => {
        e.preventDefault();
        if (!dragId || dragId === it.id) return;
        const from = items.findIndex((x) => x.id === dragId);
        const to = items.findIndex((x) => x.id === it.id);
        if (from < 0 || to < 0) return;
        const [moved] = items.splice(from, 1);
        items.splice(to, 0, moved);
        save();
        renderList();
      });
      // touch-friendly reorder: long-press not required; use move buttons via shift
      els.list.appendChild(li);
    });
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function openPresent() {
    els.presentTitle.textContent = els.title.value.trim() || "Today's Schedule";
    els.presentList.innerHTML = "";
    items.forEach((it, i) => {
      const li = document.createElement("li");
      li.style.background = it.color;
      li.innerHTML = `<span class="num">${i + 1}</span><span class="emoji">${it.emoji}</span><span>${escapeHtml(it.label)}</span>`;
      els.presentList.appendChild(li);
    });
    els.overlay.hidden = false;
  }

  function closePresent() {
    els.overlay.hidden = true;
  }

  els.addCustom.addEventListener("click", () => {
    const label = (els.custom.value || "").trim();
    if (!label) return;
    addBlock({ emoji: "📌", label, color: "#e2e8f0" });
    els.custom.value = "";
  });
  els.custom.addEventListener("keydown", (e) => {
    if (e.key === "Enter") els.addCustom.click();
  });
  els.clear.addEventListener("click", () => {
    if (items.length && !confirm("Clear the whole schedule?")) return;
    items = [];
    save();
    renderList();
  });
  els.present.addEventListener("click", openPresent);
  els.exitPresent.addEventListener("click", closePresent);
  els.title.addEventListener("change", save);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !els.overlay.hidden) closePresent();
  });

  load();
  renderPalette();
  renderList();
})();
