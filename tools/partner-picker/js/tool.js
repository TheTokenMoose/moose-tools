/**
 * Partner Picker — web port
 * Comma names, fruit tables (2–20), auto-assign, drag-drop, localStorage save.
 */

const FRUITS = [
  ["Apple", "#E63946"],
  ["Orange", "#F4A261"],
  ["Banana", "#E9C46A"],
  ["Lime", "#A7C957"],
  ["Blueberry", "#457B9D"],
  ["Grape", "#9B5DE5"],
  ["Strawberry", "#F15BB5"],
  ["Watermelon", "#2A9D8F"],
  ["Peach", "#FFADB8"],
  ["Mango", "#FF9F1C"],
  ["Cherry", "#D62828"],
  ["Kiwi", "#80B918"],
  ["Pineapple", "#F6C90E"],
  ["Coconut", "#D4A373"],
  ["Plum", "#7B2D8E"],
  ["Lemon", "#FEE440"],
  ["Raspberry", "#C9184A"],
  ["Pear", "#90BE6D"],
  ["Melon", "#48CAE4"],
  ["Fig", "#6D597A"],
];

const STORAGE_KEY = "partner-picker-layouts-v1";

function parseNames(text) {
  return text
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function loadStore() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveStore(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

class PartnerPicker {
  constructor() {
    this.groups = [];
    this.board = document.getElementById("board");
    this.status = document.getElementById("status");
    this.dragName = null;
    this.dragFrom = null;

    document.getElementById("assign-btn").addEventListener("click", () => this.autoAssign());
    document.getElementById("shuffle-btn").addEventListener("click", () => this.autoAssign());
    document.getElementById("save-btn").addEventListener("click", () => this.saveLayout());
    document.getElementById("load-btn").addEventListener("click", () => this.openLoad());
    document.getElementById("print-btn").addEventListener("click", () => this.openPrint());
    document.getElementById("print-close").addEventListener("click", () => this.closePrint());
    document.getElementById("print-do").addEventListener("click", () => window.print());
    document.getElementById("load-cancel").addEventListener("click", () => this.closeLoad());
    document.getElementById("load-confirm").addEventListener("click", () => this.confirmLoad());
  }

  groupCount() {
    let g = parseInt(document.getElementById("group-count").value, 10);
    if (Number.isNaN(g)) g = 4;
    g = Math.max(2, Math.min(20, g));
    document.getElementById("group-count").value = String(g);
    return g;
  }

  autoAssign() {
    const names = parseNames(document.getElementById("name-input").value);
    if (names.length < 2) {
      alert("Enter at least two names, separated by commas.");
      return;
    }
    const g = this.groupCount();
    const shuffled = shuffle(names);
    this.groups = Array.from({ length: g }, () => []);
    shuffled.forEach((name, i) => {
      this.groups[i % g].push(name);
    });
    this.status.textContent = `${names.length} students → ${g} fruit tables. Drag chips to fix groups.`;
    this.render();
  }

  render() {
    this.board.innerHTML = "";
    if (!this.groups.length) {
      this.board.innerHTML = `<p style="color:#a8b4d0;grid-column:1/-1;text-align:center;padding:3rem;">Auto-assign to see fruit tables</p>`;
      return;
    }

    this.groups.forEach((members, i) => {
      const [fruit, color] = FRUITS[i % FRUITS.length];
      const table = document.createElement("div");
      table.className = "table";
      table.style.background = color;
      table.dataset.group = String(i);

      const header = document.createElement("div");
      header.className = "table-header";
      header.textContent = `${fruit} table · ${members.length}`;
      table.appendChild(header);

      const chips = document.createElement("div");
      chips.className = "table-chips";
      members.forEach((name) => {
        const chip = document.createElement("div");
        chip.className = "chip";
        chip.textContent = name.length > 14 ? name.slice(0, 13) + "…" : name;
        chip.title = name;
        chip.draggable = true;
        chip.dataset.name = name;

        chip.addEventListener("dragstart", (e) => {
          this.dragName = name;
          this.dragFrom = i;
          chip.classList.add("dragging");
          e.dataTransfer.setData("text/plain", name);
          e.dataTransfer.effectAllowed = "move";
        });
        chip.addEventListener("dragend", () => {
          chip.classList.remove("dragging");
          this.board.querySelectorAll(".table").forEach((t) => t.classList.remove("drag-over"));
        });

        // Touch / pointer drag (HTML5 DnD is unreliable on many touch devices)
        chip.style.touchAction = "none";
        chip.addEventListener("pointerdown", (e) => {
          if (e.pointerType === "mouse" && e.button !== 0) return;
          // Let pure mouse use HTML5 DnD when available; pointer path for touch/pen
          if (e.pointerType === "mouse") return;
          e.preventDefault();
          this.dragName = name;
          this.dragFrom = i;
          chip.classList.add("dragging");
          chip.setPointerCapture(e.pointerId);
          const onMove = (ev) => {
            const el = document.elementFromPoint(ev.clientX, ev.clientY);
            this.board.querySelectorAll(".table").forEach((t) => t.classList.remove("drag-over"));
            const over = el && el.closest ? el.closest(".table") : null;
            if (over) over.classList.add("drag-over");
          };
          const onUp = (ev) => {
            chip.releasePointerCapture(e.pointerId);
            chip.classList.remove("dragging");
            const el = document.elementFromPoint(ev.clientX, ev.clientY);
            const over = el && el.closest ? el.closest(".table") : null;
            this.board.querySelectorAll(".table").forEach((t) => t.classList.remove("drag-over"));
            if (over && over.dataset && over.dataset.index != null) {
              const to = Number(over.dataset.index);
              if (!Number.isNaN(to)) this.moveStudent(name, i, to);
            }
            this.dragName = null;
            this.dragFrom = null;
            chip.removeEventListener("pointermove", onMove);
            chip.removeEventListener("pointerup", onUp);
            chip.removeEventListener("pointercancel", onUp);
          };
          chip.addEventListener("pointermove", onMove);
          chip.addEventListener("pointerup", onUp);
          chip.addEventListener("pointercancel", onUp);
        });

        chips.appendChild(chip);
      });
      table.appendChild(chips);
      table.dataset.index = String(i);

      table.addEventListener("dragover", (e) => {
        e.preventDefault();
        table.classList.add("drag-over");
        e.dataTransfer.dropEffect = "move";
      });
      table.addEventListener("dragleave", () => table.classList.remove("drag-over"));
      table.addEventListener("drop", (e) => {
        e.preventDefault();
        table.classList.remove("drag-over");
        const name = this.dragName || e.dataTransfer.getData("text/plain");
        const from = this.dragFrom;
        const to = i;
        if (!name || from === null || from === undefined) return;
        this.moveStudent(name, from, to);
        this.dragName = null;
        this.dragFrom = null;
      });

      this.board.appendChild(table);
    });
  }

  moveStudent(name, from, to) {
    if (from === to) return;
    const list = this.groups[from];
    const idx = list.indexOf(name);
    if (idx === -1) return;
    list.splice(idx, 1);
    if (!this.groups[to].includes(name)) this.groups[to].push(name);
    const fruit = FRUITS[to % FRUITS.length][0];
    this.status.textContent = `Moved ${name} → ${fruit} table`;
    this.render();
  }

  saveLayout() {
    if (!this.groups.length) {
      alert("Nothing to save yet — auto-assign first.");
      return;
    }
    const className = (document.getElementById("class-name").value || "My Class").trim();
    const store = loadStore();
    store[className] = {
      group_count: this.groups.length,
      groups: this.groups,
      names_text: document.getElementById("name-input").value.trim(),
      saved_at: Date.now(),
    };
    saveStore(store);
    this.status.textContent = `Saved layout “${className}”`;
    alert(`Saved “${className}”.`);
  }

  openLoad() {
    const store = loadStore();
    const keys = Object.keys(store).sort();
    if (!keys.length) {
      alert("No saved layouts yet.");
      return;
    }
    const sel = document.getElementById("load-select");
    sel.innerHTML = keys.map((k) => `<option value="${escapeAttr(k)}">${escapeHtml(k)}</option>`).join("");
    document.getElementById("load-modal").hidden = false;
  }

  closeLoad() {
    document.getElementById("load-modal").hidden = true;
  }

  confirmLoad() {
    const key = document.getElementById("load-select").value;
    const store = loadStore();
    const data = store[key];
    if (!data) return;
    document.getElementById("class-name").value = key;
    document.getElementById("group-count").value = String(data.group_count || data.groups.length);
    if (data.names_text) document.getElementById("name-input").value = data.names_text;
    this.groups = (data.groups || []).map((g) => g.slice());
    this.status.textContent = `Loaded “${key}”`;
    this.closeLoad();
    this.render();
  }

  openPrint() {
    if (!this.groups.length) {
      alert("Auto-assign first.");
      return;
    }
    const title = (document.getElementById("class-name").value || "Class").trim();
    document.getElementById("print-title").textContent = `Partner Picker — ${title}`;
    const body = document.getElementById("print-body");
    body.innerHTML = this.groups
      .map((members, i) => {
        const [fruit, color] = FRUITS[i % FRUITS.length];
        const names = members.length ? members.join(", ") : "— empty —";
        return `<div class="print-block" style="background:${color}"><strong>${fruit} table (${members.length})</strong>${escapeHtml(names)}</div>`;
      })
      .join("");
    document.getElementById("print-overlay").hidden = false;
  }

  closePrint() {
    document.getElementById("print-overlay").hidden = true;
  }
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

document.addEventListener("DOMContentLoaded", () => {
  new PartnerPicker();
});
