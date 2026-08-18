/**
 * Story Workshop — author class stories for The Enchanted Library
 * Storage: localStorage key token-moose-enchanted-user-stories
 * Format merges cleanly into ENCHANTED_STORIES (levels + nodes)
 */
(function () {
  const STORAGE_KEY = "token-moose-enchanted-user-stories";
  const LEVELS = [
    { id: "easy", label: "Picture Path (easy)" },
    { id: "medium", label: "Story Path (medium)" },
    { id: "hard", label: "Chapter Path (hard)" },
  ];

  /** @type {{ packs: Array }} */
  let store = loadStore();
  let activePackId = store.packs[0] ? store.packs[0].id : null;
  let selectedNodeId = null;
  let dragNodeId = null;
  let statusTimer = null;

  function uid(prefix) {
    return (
      (prefix || "id") +
      "_" +
      Math.random().toString(36).slice(2, 8) +
      Date.now().toString(36).slice(-4)
    );
  }

  /** Short label shown in UI (without pack prefix) */
  function shortName(pack, id) {
    if (!id) return "";
    const pref = pack.id + "_";
    return id.indexOf(pref) === 0 ? id.slice(pref.length) : id;
  }

  /** Sanitize user page name → safe id fragment */
  function sanitizePageName(raw) {
    let s = String(raw || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "")
      .replace(/_+/g, "_");
    if (!s) s = "page";
    if (/^[0-9]/.test(s)) s = "p_" + s;
    return s.slice(0, 48);
  }

  /**
   * Rename a page id and rewrite all links / start / order.
   * Returns the new full id, or null if unchanged/failed.
   */
  function renameNode(pack, oldId, desiredShort) {
    if (!pack || !oldId || !pack.nodes[oldId]) return null;
    let short = sanitizePageName(desiredShort);
    let newId = pack.id + "_" + short;
    if (newId === oldId) return oldId;

    // Ensure unique
    if (pack.nodes[newId]) {
      let n = 2;
      while (pack.nodes[pack.id + "_" + short + "_" + n]) n++;
      short = short + "_" + n;
      newId = pack.id + "_" + short;
    }

    pack.nodes[newId] = pack.nodes[oldId];
    delete pack.nodes[oldId];

    if (pack.start === oldId) pack.start = newId;

    Object.keys(pack.nodes).forEach(function (nid) {
      const node = pack.nodes[nid];
      if (!node || !Array.isArray(node.choices)) return;
      node.choices.forEach(function (c) {
        if (c.next === oldId) c.next = newId;
      });
    });

    if (Array.isArray(pack.nodeOrder)) {
      pack.nodeOrder = pack.nodeOrder.map(function (id) {
        return id === oldId ? newId : id;
      });
    }

    return newId;
  }

  function loadStore() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { version: 1, packs: [] };
      const data = JSON.parse(raw);
      if (!data || !Array.isArray(data.packs)) return { version: 1, packs: [] };
      return { version: 1, packs: data.packs };
    } catch (_) {
      return { version: 1, packs: [] };
    }
  }

  function saveStore() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
      setStatus("Saved on this device");
    } catch (e) {
      setStatus("Could not save (storage full or blocked)");
      console.warn(e);
    }
  }

  function activePack() {
    return store.packs.find((p) => p.id === activePackId) || null;
  }

  function setStatus(msg) {
    const el = document.getElementById("status");
    if (!el) return;
    el.textContent = msg || "";
    clearTimeout(statusTimer);
    if (msg) statusTimer = setTimeout(() => { el.textContent = ""; }, 2800);
  }

  function countEndings(nodes) {
    return Object.values(nodes || {}).filter((n) => n && n.ending === true).length;
  }

  function createEmptyPack(title, level) {
    const packId = uid("pack");
    const startId = packId + "_start";
    const endId = packId + "_end1";
    const nodes = {};
    nodes[startId] = {
      text: "Write the opening of your story here…",
      choices: [
        { text: "First choice", next: endId },
        { text: "Second choice", next: endId },
      ],
    };
    nodes[endId] = {
      ending: true,
      title: "The End",
      scene: "library_return",
      text: "Write your ending here…",
    };
    return {
      id: packId,
      title: title || "Untitled class story",
      level: level || "easy",
      worldId: "user_" + packId,
      worldTitle: title || "Class story",
      start: startId,
      nodes: nodes,
      updatedAt: new Date().toISOString(),
    };
  }

  /* ---------- UI render ---------- */

  function render() {
    renderPackList();
    renderBoard();
    renderEditor();
  }

  function renderPackList() {
    const list = document.getElementById("pack-list");
    if (!list) return;
    list.innerHTML = "";
    if (!store.packs.length) {
      list.innerHTML =
        '<p class="empty-state">No class stories yet. Click <strong>New story</strong> to begin.</p>';
      return;
    }
    store.packs.forEach((p) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "pack-item" + (p.id === activePackId ? " is-active" : "");
      const ends = countEndings(p.nodes);
      const levelLabel = (LEVELS.find((l) => l.id === p.level) || {}).label || p.level;
      btn.innerHTML =
        "<strong></strong><small></small>";
      btn.querySelector("strong").textContent = p.title;
      btn.querySelector("small").textContent =
        levelLabel + " · " + Object.keys(p.nodes).length + " pages · " + ends + " endings";
      btn.addEventListener("click", () => {
        activePackId = p.id;
        selectedNodeId = p.start;
        render();
      });
      list.appendChild(btn);
    });
  }

  function renderBoard() {
    const board = document.getElementById("node-board");
    if (!board) return;
    board.innerHTML = "";
    const pack = activePack();
    if (!pack) {
      board.innerHTML =
        '<p class="empty-state">Select or create a story pack to edit pages.</p>';
      return;
    }

    const order = orderNodes(pack);
    order.forEach((id) => {
      const n = pack.nodes[id];
      if (!n) return;
      const card = document.createElement("div");
      card.className =
        "node-card" +
        (id === selectedNodeId ? " is-selected" : "") +
        (id === pack.start ? " is-start" : "") +
        (n.ending ? " is-ending" : "");
      card.draggable = true;
      card.dataset.nodeId = id;

      const idEl = document.createElement("div");
      idEl.className = "node-id";
      idEl.textContent = shortName(pack, id);
      card.appendChild(idEl);

      const prev = document.createElement("p");
      prev.className = "node-preview";
      prev.textContent = n.ending
        ? (n.title ? n.title + " — " : "") + (n.text || "")
        : n.text || "(empty page)";
      card.appendChild(prev);

      if (!n.ending && Array.isArray(n.choices)) {
        const meta = document.createElement("div");
        meta.className = "node-choices-meta";
        meta.textContent =
          n.choices.length +
          " choice" +
          (n.choices.length === 1 ? "" : "s") +
          (n.choices.length
            ? ": " + n.choices.map((c) => c.text || "…").join(" · ")
            : "");
        card.appendChild(meta);
      }

      card.addEventListener("click", () => {
        selectedNodeId = id;
        render();
      });
      card.addEventListener("dragstart", (e) => {
        dragNodeId = id;
        card.classList.add("dragging");
        e.dataTransfer.setData("text/plain", id);
        e.dataTransfer.effectAllowed = "move";
      });
      card.addEventListener("dragend", () => {
        dragNodeId = null;
        card.classList.remove("dragging");
      });
      card.addEventListener("dragover", (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
      });
      card.addEventListener("drop", (e) => {
        e.preventDefault();
        const from = dragNodeId || e.dataTransfer.getData("text/plain");
        const to = id;
        if (!from || from === to) return;
        reorderNodes(pack, from, to);
        pack.updatedAt = new Date().toISOString();
        saveStore();
        render();
      });

      board.appendChild(card);
    });
  }

  /** Stable display order: start first, then BFS, then leftovers */
  function orderNodes(pack) {
    const ids = Object.keys(pack.nodes);
    const seen = new Set();
    const out = [];
    const q = [pack.start];
    while (q.length) {
      const id = q.shift();
      if (!id || seen.has(id) || !pack.nodes[id]) continue;
      seen.add(id);
      out.push(id);
      const n = pack.nodes[id];
      if (!n.ending && Array.isArray(n.choices)) {
        n.choices.forEach((c) => {
          if (c.next && !seen.has(c.next)) q.push(c.next);
        });
      }
    }
    ids.forEach((id) => {
      if (!seen.has(id)) out.push(id);
    });
    // Respect custom order if present
    if (Array.isArray(pack.nodeOrder) && pack.nodeOrder.length) {
      const ordered = pack.nodeOrder.filter((id) => pack.nodes[id]);
      const rest = out.filter((id) => !ordered.includes(id));
      return ordered.concat(rest);
    }
    return out;
  }

  function reorderNodes(pack, fromId, toId) {
    const order = orderNodes(pack);
    const fi = order.indexOf(fromId);
    const ti = order.indexOf(toId);
    if (fi < 0 || ti < 0) return;
    order.splice(fi, 1);
    order.splice(ti, 0, fromId);
    pack.nodeOrder = order;
  }

  function renderEditor() {
    const editor = document.getElementById("editor");
    if (!editor) return;
    const pack = activePack();
    if (!pack) {
      editor.innerHTML = '<p class="empty-state">No story selected.</p>';
      return;
    }

    const nodeIds = Object.keys(pack.nodes);
    if (!selectedNodeId || !pack.nodes[selectedNodeId]) {
      selectedNodeId = pack.start;
    }
    const node = pack.nodes[selectedNodeId];

    editor.innerHTML = "";

    // Pack meta
    const meta = document.createElement("div");
    meta.className = "form-row";
    meta.innerHTML =
      '<label for="pack-title">Story title (shown in Enchanted Library)</label>';
    const titleIn = document.createElement("input");
    titleIn.id = "pack-title";
    titleIn.type = "text";
    titleIn.value = pack.title;
    titleIn.addEventListener("change", () => {
      pack.title = titleIn.value.trim() || "Untitled class story";
      pack.worldTitle = pack.title;
      pack.updatedAt = new Date().toISOString();
      saveStore();
      renderPackList();
    });
    meta.appendChild(titleIn);
    editor.appendChild(meta);

    const levelRow = document.createElement("div");
    levelRow.className = "form-row";
    levelRow.innerHTML = '<label for="pack-level">Reading level</label>';
    const levelSel = document.createElement("select");
    levelSel.id = "pack-level";
    LEVELS.forEach((l) => {
      const o = document.createElement("option");
      o.value = l.id;
      o.textContent = l.label;
      if (l.id === pack.level) o.selected = true;
      levelSel.appendChild(o);
    });
    levelSel.addEventListener("change", () => {
      pack.level = levelSel.value;
      pack.updatedAt = new Date().toISOString();
      saveStore();
      renderPackList();
    });
    levelRow.appendChild(levelSel);
    editor.appendChild(levelRow);

    // Node selector
    const nodeRow = document.createElement("div");
    nodeRow.className = "form-row";
    nodeRow.innerHTML = '<label for="node-select">Editing page</label>';
    const nodeSel = document.createElement("select");
    nodeSel.id = "node-select";
    orderNodes(pack).forEach((id) => {
      const o = document.createElement("option");
      o.value = id;
      const n = pack.nodes[id];
      const short = shortName(pack, id);
      o.textContent =
        (id === pack.start ? "★ " : "") +
        short +
        (n.ending ? " (ending)" : "") +
        " — " +
        ((n.text || n.title || "").slice(0, 32) || "empty");
      if (id === selectedNodeId) o.selected = true;
      nodeSel.appendChild(o);
    });
    nodeSel.addEventListener("change", () => {
      selectedNodeId = nodeSel.value;
      render();
    });
    nodeRow.appendChild(nodeSel);
    editor.appendChild(nodeRow);

    // Editable page name (renames node id used in links)
    const nameRow = document.createElement("div");
    nameRow.className = "form-row";
    nameRow.innerHTML = '<label for="page-name">Page name <span style="font-weight:600;opacity:0.75">(used in links)</span></label>';
    const nameIn = document.createElement("input");
    nameIn.id = "page-name";
    nameIn.type = "text";
    nameIn.value = shortName(pack, selectedNodeId);
    nameIn.placeholder = "e.g. forest_crossroads";
    nameIn.autocomplete = "off";
    nameIn.addEventListener("change", function () {
      const newId = renameNode(pack, selectedNodeId, nameIn.value);
      if (!newId) {
        nameIn.value = shortName(pack, selectedNodeId);
        return;
      }
      selectedNodeId = newId;
      pack.updatedAt = new Date().toISOString();
      saveStore();
      setStatus("Page renamed to " + shortName(pack, newId));
      render();
    });
    nameRow.appendChild(nameIn);
    const nameHint = document.createElement("p");
    nameHint.className = "empty-state";
    nameHint.style.margin = "0.25rem 0 0";
    nameHint.textContent = "Letters, numbers, spaces OK — saved as a clean link id. All choices update automatically.";
    nameRow.appendChild(nameHint);
    editor.appendChild(nameRow);

    // Ending toggle
    const typeRow = document.createElement("div");
    typeRow.className = "form-row";
    const typeLab = document.createElement("label");
    const typeCb = document.createElement("input");
    typeCb.type = "checkbox";
    typeCb.checked = !!node.ending;
    typeCb.addEventListener("change", () => {
      if (typeCb.checked) {
        pack.nodes[selectedNodeId] = {
          ending: true,
          title: node.title || "The End",
          scene: node.scene || "library_return",
          text: node.text || "",
        };
      } else {
        pack.nodes[selectedNodeId] = {
          text: node.text || "",
          choices: node.choices && node.choices.length
            ? node.choices
            : [{ text: "Continue", next: pack.start }],
        };
      }
      pack.updatedAt = new Date().toISOString();
      saveStore();
      render();
    });
    typeLab.appendChild(typeCb);
    typeLab.appendChild(document.createTextNode(" This page is an ending"));
    typeRow.appendChild(typeLab);
    editor.appendChild(typeRow);

    const n2 = pack.nodes[selectedNodeId];

    if (n2.ending) {
      const tRow = document.createElement("div");
      tRow.className = "form-row";
      tRow.innerHTML = '<label for="end-title">Ending title</label>';
      const tIn = document.createElement("input");
      tIn.id = "end-title";
      tIn.type = "text";
      tIn.value = n2.title || "";
      tIn.addEventListener("change", () => {
        n2.title = tIn.value.trim() || "The End";
        pack.updatedAt = new Date().toISOString();
        saveStore();
        renderBoard();
      });
      tRow.appendChild(tIn);
      editor.appendChild(tRow);

      const sRow = document.createElement("div");
      sRow.className = "form-row";
      sRow.innerHTML = '<label for="end-scene">Scene art key</label>';
      const sIn = document.createElement("select");
      sIn.id = "end-scene";
      [
        "library_return", "forest", "forest_home", "castle", "sea", "stars",
        "treasure", "dragon_friend", "garden", "moon", "sun", "map", "feast",
        "crown", "bridge", "village", "cave_light", "ocean_boat", "star_ship",
        "mountain", "phoenix",
      ].forEach((s) => {
        const o = document.createElement("option");
        o.value = s;
        o.textContent = s;
        if ((n2.scene || "library_return") === s) o.selected = true;
        sIn.appendChild(o);
      });
      sIn.addEventListener("change", () => {
        n2.scene = sIn.value;
        pack.updatedAt = new Date().toISOString();
        saveStore();
      });
      sRow.appendChild(sIn);
      editor.appendChild(sRow);
    }

    const textRow = document.createElement("div");
    textRow.className = "form-row";
    textRow.innerHTML = '<label for="node-text">Page text</label>';
    const ta = document.createElement("textarea");
    ta.id = "node-text";
    ta.value = n2.text || "";
    ta.addEventListener("change", () => {
      n2.text = ta.value;
      pack.updatedAt = new Date().toISOString();
      saveStore();
      renderBoard();
    });
    textRow.appendChild(ta);
    editor.appendChild(textRow);

    if (!n2.ending) {
      const chHead = document.createElement("div");
      chHead.className = "form-row";
      chHead.innerHTML = "<label>Choices (drag pages on the board to reorder)</label>";
      editor.appendChild(chHead);

      const list = document.createElement("div");
      list.className = "choice-list";
      (n2.choices || []).forEach((ch, idx) => {
        const row = document.createElement("div");
        row.className = "choice-row";

        const labelIn = document.createElement("input");
        labelIn.type = "text";
        labelIn.placeholder = "Choice label";
        labelIn.value = ch.text || "";
        labelIn.addEventListener("change", () => {
          ch.text = labelIn.value.trim() || "Choice";
          pack.updatedAt = new Date().toISOString();
          saveStore();
          renderBoard();
        });

        const targetSel = document.createElement("select");
        const optNew = document.createElement("option");
        optNew.value = "__new__";
        optNew.textContent = "+ Create new page…";
        targetSel.appendChild(optNew);
        orderNodes(pack).forEach((id) => {
          if (id === selectedNodeId) return; // discourage trivial self-loop unless intentional via other nodes
          const o = document.createElement("option");
          o.value = id;
          const short = shortName(pack, id);
          o.textContent =
            short + (pack.nodes[id].ending ? " (ending)" : "");
          if (id === ch.next) o.selected = true;
          targetSel.appendChild(o);
        });
        // allow self if already set
        if (ch.next === selectedNodeId) {
          const o = document.createElement("option");
          o.value = selectedNodeId;
          o.textContent = "(self)";
          o.selected = true;
          targetSel.appendChild(o);
        }
        targetSel.addEventListener("change", () => {
          if (targetSel.value === "__new__") {
            const newId = uid(pack.id + "_p");
            pack.nodes[newId] = {
              text: "New page…",
              choices: [{ text: "Continue", next: pack.start }],
            };
            ch.next = newId;
            selectedNodeId = newId;
          } else {
            ch.next = targetSel.value;
          }
          pack.updatedAt = new Date().toISOString();
          saveStore();
          render();
        });

        const del = document.createElement("button");
        del.type = "button";
        del.className = "btn-icon";
        del.title = "Remove choice";
        del.textContent = "×";
        del.addEventListener("click", () => {
          n2.choices.splice(idx, 1);
          pack.updatedAt = new Date().toISOString();
          saveStore();
          render();
        });

        row.appendChild(labelIn);
        row.appendChild(targetSel);
        row.appendChild(del);
        list.appendChild(row);
      });
      editor.appendChild(list);

      const addCh = document.createElement("button");
      addCh.type = "button";
      addCh.className = "btn btn-secondary";
      addCh.style.marginTop = "0.5rem";
      addCh.textContent = "+ Add choice";
      addCh.addEventListener("click", () => {
        if (!Array.isArray(n2.choices)) n2.choices = [];
        const newId = uid(pack.id + "_p");
        pack.nodes[newId] = {
          ending: true,
          title: "The End",
          scene: "library_return",
          text: "Write this ending…",
        };
        n2.choices.push({ text: "New choice", next: newId });
        pack.updatedAt = new Date().toISOString();
        saveStore();
        render();
      });
      editor.appendChild(addCh);
    }

    // Page actions
    const actions = document.createElement("div");
    actions.style.marginTop = "0.85rem";
    actions.style.display = "flex";
    actions.style.flexWrap = "wrap";
    actions.style.gap = "0.4rem";

    const addPage = document.createElement("button");
    addPage.type = "button";
    addPage.className = "btn btn-secondary";
    addPage.textContent = "+ New page";
    addPage.addEventListener("click", () => {
      const newId = uid(pack.id + "_p");
      pack.nodes[newId] = {
        text: "New page…",
        choices: [{ text: "Continue", next: pack.start }],
      };
      selectedNodeId = newId;
      pack.updatedAt = new Date().toISOString();
      saveStore();
      render();
    });
    actions.appendChild(addPage);

    const setStart = document.createElement("button");
    setStart.type = "button";
    setStart.className = "btn btn-ghost";
    setStart.textContent = "Set as start";
    setStart.disabled = !!n2.ending;
    setStart.addEventListener("click", () => {
      if (n2.ending) return;
      pack.start = selectedNodeId;
      pack.updatedAt = new Date().toISOString();
      saveStore();
      render();
    });
    actions.appendChild(setStart);

    const delPage = document.createElement("button");
    delPage.type = "button";
    delPage.className = "btn btn-danger";
    delPage.textContent = "Delete page";
    delPage.disabled = selectedNodeId === pack.start;
    delPage.title =
      selectedNodeId === pack.start
        ? "Cannot delete the start page"
        : "Delete this page";
    delPage.addEventListener("click", () => {
      if (selectedNodeId === pack.start) return;
      if (!confirm("Delete this page? Links pointing here should be fixed manually.")) return;
      delete pack.nodes[selectedNodeId];
      // scrub broken choice targets → start
      Object.values(pack.nodes).forEach((n) => {
        if (n.choices) {
          n.choices.forEach((c) => {
            if (c.next === selectedNodeId) c.next = pack.start;
          });
        }
      });
      selectedNodeId = pack.start;
      pack.updatedAt = new Date().toISOString();
      saveStore();
      render();
    });
    actions.appendChild(delPage);

    editor.appendChild(actions);

    const openLib = document.createElement("p");
    openLib.className = "empty-state";
    openLib.style.marginTop = "0.75rem";
    openLib.innerHTML =
      'Open <a href="../../games/enchanted-library/" style="color:#5d4037;font-weight:800">Enchanted Library</a> to play this story under its reading level.';
    editor.appendChild(openLib);
  }

  /* ---------- Pack CRUD / export ---------- */

  function newPack() {
    const title = prompt("Story title (shown in Enchanted Library):", "Our class adventure");
    if (title === null) return;
    const level =
      prompt("Level: easy, medium, or hard", "easy") || "easy";
    const lv = ["easy", "medium", "hard"].includes(level.toLowerCase())
      ? level.toLowerCase()
      : "easy";
    const pack = createEmptyPack(title.trim() || "Our class adventure", lv);
    store.packs.unshift(pack);
    activePackId = pack.id;
    selectedNodeId = pack.start;
    saveStore();
    render();
  }

  function deletePack() {
    const pack = activePack();
    if (!pack) return;
    if (!confirm('Delete story "' + pack.title + '" from this device?')) return;
    store.packs = store.packs.filter((p) => p.id !== pack.id);
    activePackId = store.packs[0] ? store.packs[0].id : null;
    selectedNodeId = activePackId ? store.packs[0].start : null;
    saveStore();
    render();
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(store, null, 2)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download =
      "enchanted-library-class-stories-" +
      new Date().toISOString().slice(0, 10) +
      ".json";
    a.click();
    URL.revokeObjectURL(a.href);
    setStatus("Backup downloaded");
  }

  function importJson(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (!data || !Array.isArray(data.packs)) {
          alert("Invalid backup: expected { packs: [...] }");
          return;
        }
        if (
          store.packs.length &&
          !confirm(
            "Replace all class stories on this device with the backup? (Cancel keeps current stories)"
          )
        ) {
          // merge mode
          const ids = new Set(store.packs.map((p) => p.id));
          data.packs.forEach((p) => {
            if (!p || !p.id || !p.nodes) return;
            if (ids.has(p.id)) {
              store.packs = store.packs.map((x) => (x.id === p.id ? p : x));
            } else {
              store.packs.push(p);
              ids.add(p.id);
            }
          });
        } else {
          store = { version: 1, packs: data.packs.filter((p) => p && p.id && p.nodes) };
        }
        activePackId = store.packs[0] ? store.packs[0].id : null;
        selectedNodeId = activePackId ? store.packs[0].start : null;
        saveStore();
        render();
        setStatus("Backup restored");
      } catch (e) {
        alert("Could not read backup JSON.");
        console.warn(e);
      }
    };
    reader.readAsText(file);
  }

  function bind() {
    document.getElementById("btn-new").addEventListener("click", newPack);
    document.getElementById("btn-delete").addEventListener("click", deletePack);
    document.getElementById("btn-export").addEventListener("click", exportJson);
    document.getElementById("btn-import").addEventListener("click", () => {
      document.getElementById("import-file").click();
    });
    document.getElementById("import-file").addEventListener("change", (e) => {
      const f = e.target.files && e.target.files[0];
      if (f) importJson(f);
      e.target.value = "";
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    bind();
    if (activePackId) {
      const p = activePack();
      selectedNodeId = p ? p.start : null;
    }
    render();
  });
})();
