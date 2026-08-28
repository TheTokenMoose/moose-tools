(function () {
  const STORAGE_KEY = "token-moose-visual-schedule-v2";
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
    print: document.getElementById("btn-print"),
    present: document.getElementById("btn-present"),
    overlay: document.getElementById("present-overlay"),
    presentTitle: document.getElementById("present-title"),
    presentList: document.getElementById("present-list"),
    exitPresent: document.getElementById("btn-exit-present"),
    printTitle: document.getElementById("print-title"),
    printBody: document.getElementById("print-body"),
  };

  let items = [];
  let dragId = null;

  function uid() {
    return "b_" + Math.random().toString(36).slice(2, 9);
  }

  function load() {
    try {
      let raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        // migrate v1
        const legacy = localStorage.getItem("token-moose-visual-schedule-v1");
        if (legacy) raw = legacy;
      }
      if (!raw) return;
      const data = JSON.parse(raw);
      if (data && Array.isArray(data.items)) {
        items = data.items.map((it) => ({
          id: it.id || uid(),
          emoji: it.emoji || "📌",
          label: it.label || "Block",
          color: it.color || "#e2e8f0",
          time: typeof it.time === "string" ? it.time : "",
        }));
      }
      if (data && typeof data.title === "string") els.title.value = data.title;
    } catch (_) {}
  }

  function save() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          title: els.title.value || "Today's Schedule",
          items,
        })
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
      b.innerHTML =
        '<span aria-hidden="true">' +
        p.emoji +
        "</span><span>" +
        p.label +
        "</span>";
      b.addEventListener("click", () =>
        addBlock({ emoji: p.emoji, label: p.label, color: p.color, time: "" })
      );
      els.palette.appendChild(b);
    });
  }

  function addBlock(block) {
    items.push({
      id: uid(),
      emoji: block.emoji || "📌",
      label: block.label,
      color: block.color || "#e2e8f0",
      time: block.time || "",
    });
    save();
    renderList();
  }

  function removeBlock(id) {
    items = items.filter((x) => x.id !== id);
    save();
    renderList();
  }

  function updateTime(id, value) {
    const it = items.find((x) => x.id === id);
    if (!it) return;
    it.time = value;
    save();
  }

  function renderList() {
    els.list.innerHTML = "";
    els.empty.hidden = items.length > 0;
    items.forEach((it) => {
      const li = document.createElement("li");
      li.className = "sched-item";
      li.draggable = true;
      li.dataset.id = it.id;
      li.style.background = it.color;
      li.innerHTML =
        '<span class="emoji" aria-hidden="true">' +
        it.emoji +
        "</span>" +
        '<span class="label">' +
        escapeHtml(it.label) +
        "</span>" +
        '<input type="text" class="time-input" maxlength="24" placeholder="e.g. 9:00–9:30" value="' +
        escapeAttr(it.time || "") +
        '" aria-label="Time for ' +
        escapeAttr(it.label) +
        '" />' +
        '<button type="button" class="remove" aria-label="Remove ' +
        escapeAttr(it.label) +
        '">×</button>';

      const timeInput = li.querySelector(".time-input");
      timeInput.addEventListener("click", (e) => e.stopPropagation());
      timeInput.addEventListener("mousedown", (e) => e.stopPropagation());
      timeInput.addEventListener("pointerdown", (e) => e.stopPropagation());
      timeInput.addEventListener("change", () => updateTime(it.id, timeInput.value.trim()));
      timeInput.addEventListener("blur", () => updateTime(it.id, timeInput.value.trim()));

      li.querySelector(".remove").addEventListener("click", (e) => {
        e.stopPropagation();
        removeBlock(it.id);
      });

      li.addEventListener("dragstart", (e) => {
        if (e.target && e.target.classList && e.target.classList.contains("time-input")) {
          e.preventDefault();
          return;
        }
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

  function escapeAttr(s) {
    return escapeHtml(s).replace(/'/g, "&#39;");
  }

  function openPresent() {
    els.presentTitle.textContent = els.title.value.trim() || "Today's Schedule";
    els.presentList.innerHTML = "";
    items.forEach((it, i) => {
      const li = document.createElement("li");
      li.style.background = it.color;
      const timeTxt = (it.time || "").trim();
      li.innerHTML =
        '<span class="num">' +
        (i + 1) +
        "</span>" +
        '<span class="p-activity"><span class="emoji">' +
        it.emoji +
        "</span> " +
        escapeHtml(it.label) +
        "</span>" +
        '<span class="p-time' +
        (timeTxt ? "" : " is-empty") +
        '">' +
        (timeTxt ? escapeHtml(timeTxt) : "—") +
        "</span>";
      els.presentList.appendChild(li);
    });
    els.overlay.hidden = false;
  }

  function closePresent() {
    els.overlay.hidden = true;
  }

  function doPrint() {
    const title = els.title.value.trim() || "Today's Schedule";
    els.printTitle.textContent = title;
    els.printBody.innerHTML = "";
    if (!items.length) {
      const tr = document.createElement("tr");
      tr.innerHTML = '<td colspan="2">No blocks yet.</td>';
      els.printBody.appendChild(tr);
    } else {
      items.forEach((it) => {
        const tr = document.createElement("tr");
        tr.innerHTML =
          "<td>" +
          escapeHtml(it.emoji + " " + it.label) +
          "</td><td>" +
          escapeHtml((it.time || "").trim() || "—") +
          "</td>";
        els.printBody.appendChild(tr);
      });
    }
    window.print();
  }

  els.addCustom.addEventListener("click", () => {
    const label = (els.custom.value || "").trim();
    if (!label) return;
    addBlock({ emoji: "📌", label, color: "#e2e8f0", time: "" });
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
  els.print.addEventListener("click", doPrint);
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
