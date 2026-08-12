/**
 * Teacher to-do list — localStorage only, no accounts.
 * Tasks: text, optional due date, completed flag.
 * Hide/show preference also stored locally.
 */
(function () {
  const STORAGE_KEY = "token-moose-todos";
  const HIDDEN_KEY = "token-moose-todo-hidden";

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const list = raw ? JSON.parse(raw) : [];
      return Array.isArray(list) ? list : [];
    } catch (_) {
      return [];
    }
  }

  function save(items) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (_) {}
  }

  function isHidden() {
    try {
      return localStorage.getItem(HIDDEN_KEY) === "1";
    } catch (_) {
      return false;
    }
  }

  function setHidden(v) {
    try {
      localStorage.setItem(HIDDEN_KEY, v ? "1" : "0");
    } catch (_) {}
  }

  function uid() {
    return "t" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function formatDue(due) {
    if (!due) return "";
    try {
      const [y, m, d] = due.split("-").map(Number);
      const dt = new Date(y, m - 1, d);
      return dt.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch (_) {
      return due;
    }
  }

  function dueStatus(due, done) {
    if (!due || done) return "";
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [y, m, d] = due.split("-").map(Number);
    const dt = new Date(y, m - 1, d);
    const diff = Math.round((dt - today) / 86400000);
    if (diff < 0) return "overdue";
    if (diff === 0) return "today";
    if (diff <= 3) return "soon";
    return "";
  }

  function sortItems(items) {
    return items.slice().sort((a, b) => {
      if (a.done !== b.done) return a.done ? 1 : -1;
      if (a.due && b.due) return a.due < b.due ? -1 : a.due > b.due ? 1 : 0;
      if (a.due) return -1;
      if (b.due) return 1;
      return (b.created || 0) - (a.created || 0);
    });
  }

  function init() {
    const sidebar = document.getElementById("todo-sidebar");
    const listEl = document.getElementById("todo-list");
    const form = document.getElementById("todo-form");
    const textIn = document.getElementById("todo-text");
    const dueIn = document.getElementById("todo-due");
    const hideBtn = document.getElementById("todo-toggle-visibility");
    const showFab = document.getElementById("todo-show-fab");
    const layout = document.querySelector(".home-layout");

    if (!sidebar || !listEl || !form) return;

    let items = load();

    function applyVisibility() {
      const hidden = isHidden();
      sidebar.hidden = hidden;
      if (showFab) showFab.hidden = !hidden;
      if (layout) layout.classList.toggle("todo-hidden", hidden);
      if (hideBtn) {
        hideBtn.setAttribute("aria-pressed", hidden ? "true" : "false");
        hideBtn.textContent = "Hide";
      }
    }

    function render() {
      items = sortItems(items);
      listEl.innerHTML = "";
      if (!items.length) {
        const empty = document.createElement("li");
        empty.className = "todo-empty";
        empty.textContent = "No tasks yet — add one above.";
        listEl.appendChild(empty);
        return;
      }
      for (const item of items) {
        const li = document.createElement("li");
        li.className = "todo-item" + (item.done ? " is-done" : "");
        li.dataset.id = item.id;
        const status = dueStatus(item.due, item.done);
        if (status) li.classList.add("due-" + status);

        li.innerHTML =
          `<label class="todo-check">` +
          `<input type="checkbox" ${item.done ? "checked" : ""} data-action="toggle" aria-label="Mark complete">` +
          `<span class="todo-body">` +
          `<span class="todo-text">${escapeHtml(item.text)}</span>` +
          (item.due
            ? `<span class="todo-due ${status}">${escapeHtml(formatDue(item.due))}</span>`
            : "") +
          `</span></label>` +
          `<button type="button" class="todo-del" data-action="delete" aria-label="Delete task">×</button>`;
        listEl.appendChild(li);
      }
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = (textIn.value || "").trim();
      if (!text) return;
      const due = (dueIn.value || "").trim() || null;
      items.push({
        id: uid(),
        text,
        due,
        done: false,
        created: Date.now(),
      });
      save(items);
      textIn.value = "";
      dueIn.value = "";
      textIn.focus();
      render();
    });

    listEl.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-action]");
      if (!btn) return;
      const li = btn.closest(".todo-item");
      if (!li) return;
      const id = li.dataset.id;
      const action = btn.getAttribute("data-action");
      if (action === "delete") {
        items = items.filter((x) => x.id !== id);
        save(items);
        render();
      }
    });

    listEl.addEventListener("change", (e) => {
      const input = e.target;
      if (!(input instanceof HTMLInputElement) || input.type !== "checkbox") return;
      const li = input.closest(".todo-item");
      if (!li) return;
      const id = li.dataset.id;
      const item = items.find((x) => x.id === id);
      if (!item) return;
      item.done = input.checked;
      save(items);
      render();
    });

    if (hideBtn) {
      hideBtn.addEventListener("click", () => {
        setHidden(true);
        applyVisibility();
      });
    }
    if (showFab) {
      showFab.addEventListener("click", () => {
        setHidden(false);
        applyVisibility();
      });
    }

    applyVisibility();
    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
