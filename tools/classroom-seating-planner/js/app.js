/**
 * Classroom Seating Planner
 *
 * Grid layouts: strict row/column grid. Obstacles only skip blocked cells
 * (next free slot in order) so rows stay straight.
 * Free-form: table boxes with light separation, no chaos physics.
 */
(function () {
  "use strict";

  const STORE_KEY = "token-moose-seating-planner-v5";
  const COLORS = [
    "#5ec8ff", "#ffc857", "#f472b6", "#3dd68c", "#a78bfa",
    "#fb923c", "#38bdf8", "#f87171", "#34d399", "#c084fc",
  ];

  const OBJ_DEFAULTS = {
    board: { label: "BOARD", w: 300, h: 44 },
    teacher: { label: "Teacher", w: 100, h: 36 },
    tv: { label: "TV", w: 110, h: 50 },
    door: { label: "Door", w: 50, h: 80 },
    column: { label: "Column", w: 44, h: 44 },
    obstacle: { label: "Obstacle", w: 72, h: 56 },
  };

  let students = [];
  let seats = [];
  let keepApart = [];
  let layoutType = "rows";
  let className = "My Class";
  let dragId = null;
  let objects = [];
  let freePos = {};
  let tableSize = 4;

  const $ = (id) => document.getElementById(id);

  function uid(p) {
    return (p || "id") + Math.random().toString(36).slice(2, 9);
  }

  function parseNames(text) {
    return text.split(",").map((s) => s.trim()).filter(Boolean);
  }

  function clamp(v, a, b) {
    return Math.max(a, Math.min(b, v));
  }

  function roomSize() {
    const room = $("room");
    return {
      w: Math.max(420, (room && room.clientWidth) || 640) - 4,
      h: Math.max(520, (room && room.clientHeight) || 560),
    };
  }

  function overlapArea(a, b) {
    const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
    const oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
    if (ox <= 0 || oy <= 0) return 0;
    return ox * oy;
  }

  /**
   * Cell blocked by any non-board object with padding so seats keep clear space.
   * Any real overlap with the padded obstacle counts (not a high %).
   */
  function cellBlocked(x, y, w, h) {
    const pad = 14; // clearance around obstacles before a seat is allowed
    const box = { x, y, w, h };
    const area = w * h || 1;
    for (let i = 0; i < objects.length; i++) {
      const o = objects[i];
      if (o.type === "board") continue; // board is decoration; seats start below it
      const ob = {
        x: (o.x || 0) - pad,
        y: (o.y || 0) - pad,
        w: (o.w || 80) + pad * 2,
        h: (o.h || 48) + pad * 2,
      };
      // centre inside padded obstacle
      const cx = x + w / 2;
      const cy = y + h / 2;
      if (cx >= ob.x && cx <= ob.x + ob.w && cy >= ob.y && cy <= ob.y + ob.h)
        return true;
      // any meaningful overlap (even a few px) with clearance zone
      if (overlapArea(box, ob) > 4) return true;
      // or more than ~8% of seat covered by the real (unpadded) body
      const raw = { x: o.x || 0, y: o.y || 0, w: o.w || 80, h: o.h || 48 };
      if (overlapArea(box, raw) / area > 0.08) return true;
    }
    return false;
  }

  function boardBottom() {
    let y = 58;
    objects.forEach((o) => {
      if (o.type === "board") y = Math.max(y, (o.y || 0) + (o.h || 44) + 14);
    });
    return y;
  }

  /**
   * Strict grid: row-major cells, fixed spacing, centred.
   * Blocked cells are skipped; extra rows added if needed.
   * Result is always axis-aligned rows/columns.
   */
  function placeStrictGrid(count, cols, seatW, seatH) {
    const { w: rw } = roomSize();
    const gapX = 16;
    const gapY = 16;
    const colCount = Math.max(1, cols);
    const totalW = colCount * seatW + (colCount - 1) * gapX;
    const originX = Math.max(12, Math.floor((rw - totalW) / 2));
    const startY = boardBottom();

    const positions = [];
    let row = 0;
    let col = 0;
    let guard = 0;
    const maxRows = Math.ceil(count / colCount) + objects.length + 12;

    while (positions.length < count && guard < count * 40 && row < maxRows) {
      guard++;
      const x = originX + col * (seatW + gapX);
      const y = startY + row * (seatH + gapY);
      if (!cellBlocked(x, y, seatW, seatH)) {
        positions.push({ x, y, w: seatW, h: seatH, row, col });
      }
      col++;
      if (col >= colCount) {
        col = 0;
        row++;
      }
    }

    // Fallback if still short (room full of obstacles): place remaining in open rows below
    while (positions.length < count) {
      const i = positions.length;
      const r = Math.floor(i / colCount) + maxRows;
      const c = i % colCount;
      positions.push({
        x: originX + c * (seatW + gapX),
        y: startY + r * (seatH + gapY),
        w: seatW,
        h: seatH,
        row: r,
        col: c,
      });
    }

    return positions;
  }

  function ensureCoreObjects() {
    const { w: rw } = roomSize();
    if (!objects.some((o) => o.type === "board")) {
      objects.unshift({
        id: uid("obj"),
        type: "board",
        label: "BOARD",
        x: Math.max(40, (rw - 300) / 2),
        y: 10,
        w: 300,
        h: 44,
      });
    }
  }

  function loadStore() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      if (data.students) students = data.students;
      if (data.seats) seats = data.seats;
      if (data.keepApart) keepApart = data.keepApart;
      if (data.layoutType) layoutType = data.layoutType;
      if (data.freePos) freePos = data.freePos;
      if (data.objects) objects = data.objects;
      if (data.className) className = data.className;
      if (data.tableSize) tableSize = data.tableSize;
    } catch (_) {}
  }

  function saveStore() {
    try {
      localStorage.setItem(
        STORE_KEY,
        JSON.stringify({
          students, seats, keepApart, layoutType, className, freePos, objects, tableSize,
        })
      );
      setStatus("Saved on this device");
    } catch (_) {
      setStatus("Could not save");
    }
  }

  function saveState() {
    saveStore();
  }

  function setStatus(msg) {
    const el = $("status");
    if (el) el.textContent = msg || "";
  }

  function enableFreeDrag(el, opts) {
    opts = opts || {};
    let mode = null;
    let ox = 0;
    let oy = 0;
    let startW = 0;
    let startH = 0;
    let startX = 0;
    let startY = 0;
    const getParent = () => el.offsetParent || $("room");

    const down = (e) => {
      const t = e.target;
      const pt = e.touches ? e.touches[0] : e;
      const r = el.getBoundingClientRect();
      if (t.classList && t.classList.contains("resize-handle")) {
        mode = "resize";
        startW = el.offsetWidth;
        startH = el.offsetHeight;
        startX = pt.clientX;
        startY = pt.clientY;
      } else {
        mode = "drag";
        ox = pt.clientX - r.left;
        oy = pt.clientY - r.top;
      }
      e.preventDefault();
      e.stopPropagation();
    };

    const move = (e) => {
      if (!mode) return;
      const pt = e.touches ? e.touches[0] : e;
      const parent = getParent().getBoundingClientRect();
      if (mode === "drag") {
        let x = pt.clientX - parent.left - ox;
        let y = pt.clientY - parent.top - oy;
        x = clamp(x, 0, parent.width - el.offsetWidth);
        y = clamp(y, 0, parent.height - el.offsetHeight);
        el.style.left = x + "px";
        el.style.top = y + "px";
        if (opts.onMove) opts.onMove(x, y, el.offsetWidth, el.offsetHeight);
      } else {
        const nw = clamp(startW + (pt.clientX - startX), opts.minW || 48, opts.maxW || 420);
        const nh = clamp(startH + (pt.clientY - startY), opts.minH || 36, opts.maxH || 280);
        el.style.width = nw + "px";
        el.style.height = nh + "px";
        if (opts.onMove) {
          opts.onMove(parseFloat(el.style.left) || 0, parseFloat(el.style.top) || 0, nw, nh);
        }
      }
      if (e.cancelable) e.preventDefault();
    };

    const up = () => {
      if (mode) {
        mode = null;
        saveState();
      }
    };

    el.addEventListener("mousedown", down);
    el.addEventListener("touchstart", down, { passive: false });
    window.addEventListener("mousemove", move);
    window.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("mouseup", up);
    window.addEventListener("touchend", up);
  }

  function syncFreeformTools() {
    const tools = $("freeform-tools");
    if (tools) tools.hidden = layoutType !== "freeform";
  }

  function colsFor(type, n) {
    if (type === "pairs") return 2;
    if (type === "groups3") return 3;
    if (type === "groups4") return 4;
    if (type === "carpet")
      return Math.min(8, Math.max(4, Math.ceil(Math.sqrt(Math.max(n, 1) * 1.4))));
    if (type === "custom")
      return Math.min(10, Math.max(2, Number($("custom-cols") && $("custom-cols").value) || 5));
    // rows: prefer 3–5 columns for classroom look
    if (n <= 6) return Math.min(3, n);
    if (n <= 12) return 4;
    if (n <= 20) return 5;
    return 6;
  }

  function buildLayout(type) {
    layoutType = type;
    ensureCoreObjects();
    syncFreeformTools();

    if (type === "freeform") {
      buildFreeformTables(tableSize);
      render();
      return;
    }

    const n = Math.max(students.length, 1);
    const cols = colsFor(type, n);
    const positions = placeStrictGrid(n, cols, 92, 58);

    seats = [];
    freePos = {};
    positions.forEach((pos, i) => {
      const id = "seat-" + i;
      seats.push({
        id,
        label: String(i + 1),
        studentId: students[i] ? students[i].id : null,
        members: null,
        row: pos.row,
        col: pos.col,
        table: null,
        kind: "seat",
      });
      freePos[id] = { x: pos.x, y: pos.y, w: pos.w, h: pos.h };
    });
    render();
  }

  function buildFreeformTables(perTable) {
    perTable = Math.max(1, Math.min(12, Number(perTable) || 4));
    tableSize = perTable;
    const n = students.length;
    const tables = Math.max(1, Math.ceil(Math.max(n, 1) / perTable));
    const tableCols = Math.min(3, tables);
    const specs = [];
    for (let t = 0; t < tables; t++) {
      const members = students.slice(t * perTable, t * perTable + perTable).map((s) => s.id);
      specs.push({
        members,
        w: 150,
        h: Math.max(80, 32 + Math.max(members.length, 1) * 24),
      });
    }
    const positions = placeStrictGrid(tables, tableCols, 150, 100);
    seats = [];
    freePos = {};
    positions.forEach((pos, i) => {
      const id = "table-" + (i + 1);
      seats.push({
        id,
        label: "Table " + (i + 1),
        studentId: null,
        members: specs[i].members,
        row: pos.row,
        col: pos.col,
        table: i + 1,
        kind: "table",
      });
      freePos[id] = {
        x: pos.x,
        y: pos.y,
        w: specs[i].w,
        h: specs[i].h,
      };
    });
  }

  function applyNames() {
    const names = parseNames($("name-input").value);
    if (!names.length) {
      setStatus("Paste names separated by commas");
      return;
    }
    students = names.map((name, i) => ({
      id: uid("st"),
      name,
      color: COLORS[i % COLORS.length],
    }));
    keepApart = [];
    buildLayout(layoutType);
    $("name-input").value = names.join(", ");
    setStatus(students.length + " students loaded");
  }

  function studentById(id) {
    return students.find((s) => s.id === id);
  }

  function removeStudentFromSeats(sid) {
    seats.forEach((s) => {
      if (s.studentId === sid) s.studentId = null;
      if (s.members) s.members = s.members.filter((id) => id !== sid);
    });
  }

  function assignToSeat(studentId, seatId) {
    const seat = seats.find((s) => s.id === seatId);
    if (!seat) return;
    if (seat.kind === "table") {
      removeStudentFromSeats(studentId);
      if (!seat.members) seat.members = [];
      if (seat.members.indexOf(studentId) === -1) seat.members.push(studentId);
      const fp = freePos[seat.id];
      if (fp) fp.h = Math.max(fp.h, 32 + seat.members.length * 24);
      renderRoom();
      return;
    }
    removeStudentFromSeats(studentId);
    const other = seat.studentId;
    seat.studentId = studentId;
    if (other) {
      const empty = seats.find((s) => s.kind !== "table" && !s.studentId && s.id !== seatId);
      if (empty) empty.studentId = other;
    }
    renderRoom();
  }

  function pairsConflict(arrangement) {
    const pos = {};
    arrangement.forEach((s) => {
      const fp = freePos[s.id];
      const cell = fp
        ? { row: Math.round(fp.y / 74), col: Math.round(fp.x / 108) }
        : { row: s.row, col: s.col };
      if (s.kind === "table" && s.members) {
        s.members.forEach((sid) => {
          pos[sid] = cell;
        });
      } else if (s.studentId) {
        pos[s.studentId] = cell;
      }
    });
    const bad = [];
    keepApart.forEach(([a, b]) => {
      const pa = pos[a];
      const pb = pos[b];
      if (!pa || !pb) return;
      if (Math.abs(pa.row - pb.row) <= 1 && Math.abs(pa.col - pb.col) <= 1)
        bad.push([a, b]);
    });
    return bad;
  }

  function randomise() {
    if (!students.length) {
      setStatus("Load names first");
      return;
    }
    const ids = students.map((s) => s.id);
    let best = null;
    let bestConflicts = Infinity;
    for (let t = 0; t < 300; t++) {
      const shuffled = ids.slice();
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      let trial;
      if (layoutType === "freeform") {
        trial = seats.map((s, ti) => ({
          ...s,
          members: shuffled.slice(ti * tableSize, ti * tableSize + tableSize),
          studentId: null,
        }));
      } else {
        trial = seats.map((s, i) => ({
          ...s,
          studentId: shuffled[i] || null,
          members: null,
        }));
      }
      const conflicts = pairsConflict(trial).length;
      if (conflicts < bestConflicts) {
        bestConflicts = conflicts;
        best = trial;
      }
      if (conflicts === 0) break;
    }
    if (!best) {
      setStatus("Could not arrange seats");
      return;
    }
    seats = best;
    setStatus(
      bestConflicts > 0
        ? "Best attempt has " + bestConflicts + " conflict(s)."
        : "Random seating ready (keep-apart OK)"
    );
    renderRoom();
  }

  function resetSeating() {
    if (layoutType === "freeform") {
      buildFreeformTables(tableSize);
      render();
    } else {
      seats.forEach((s, i) => {
        s.studentId = students[i] ? students[i].id : null;
        s.members = null;
      });
      renderRoom();
    }
    setStatus("Seating reset to list order");
  }

  function addObject(type) {
    ensureCoreObjects();
    const def = OBJ_DEFAULTS[type] || OBJ_DEFAULTS.obstacle;
    const { w: rw } = roomSize();
    const startY = boardBottom() + 20;
    objects.push({
      id: uid("obj"),
      type: type || "obstacle",
      label: def.label,
      x: clamp(rw * 0.5 - def.w / 2, 40, rw - def.w - 20),
      y: startY + (objects.length % 4) * 8,
      w: def.w,
      h: def.h,
    });
    buildLayout(layoutType);
    setStatus("Added " + def.label);
  }

  function render() {
    if ($("class-title")) $("class-title").textContent = className || "Classroom";
    if ($("layout-label")) $("layout-label").textContent = layoutType;
    syncFreeformTools();
    renderKeepApart();
    renderRoom();
    renderRoster();
  }

  function renderRoster() {
    const el = $("roster");
    if (!el) return;
    el.innerHTML = "";
    students.forEach((st) => {
      const chip = document.createElement("div");
      chip.className = "roster-chip";
      chip.style.borderColor = st.color;
      chip.draggable = true;
      chip.dataset.studentId = st.id;
      chip.innerHTML =
        '<span class="dot" style="background:' +
        st.color +
        '"></span><span class="nm">' +
        escapeHtml(st.name) +
        '</span><button type="button" class="icon-btn" data-act="rename" title="Rename">✎</button><button type="button" class="icon-btn" data-act="remove" title="Remove">×</button>';
      chip.addEventListener("dragstart", (e) => {
        dragId = st.id;
        e.dataTransfer.setData("text/plain", st.id);
      });
      chip.querySelector('[data-act="remove"]').addEventListener("click", (e) => {
        e.stopPropagation();
        students = students.filter((x) => x.id !== st.id);
        removeStudentFromSeats(st.id);
        keepApart = keepApart.filter(([a, b]) => a !== st.id && b !== st.id);
        render();
      });
      chip.querySelector('[data-act="rename"]').addEventListener("click", (e) => {
        e.stopPropagation();
        const n = prompt("Name", st.name);
        if (n && n.trim()) {
          st.name = n.trim();
          render();
        }
      });
      el.appendChild(chip);
    });
  }

  function renderKeepApart() {
    const el = $("keep-list");
    if (!el) return;
    el.innerHTML = "";
    keepApart.forEach(([a, b], idx) => {
      const na = studentById(a)?.name || "?";
      const nb = studentById(b)?.name || "?";
      const row = document.createElement("div");
      row.className = "keep-row";
      row.innerHTML =
        "<span>" +
        escapeHtml(na) +
        " ↔ " +
        escapeHtml(nb) +
        '</span><button type="button">Remove</button>';
      row.querySelector("button").addEventListener("click", () => {
        keepApart.splice(idx, 1);
        renderKeepApart();
        renderRoom();
      });
      el.appendChild(row);
    });
    const sa = $("keep-a");
    const sb = $("keep-b");
    if (sa && sb) {
      const opts =
        '<option value="">—</option>' +
        students
          .map((s) => '<option value="' + s.id + '">' + escapeHtml(s.name) + "</option>")
          .join("");
      sa.innerHTML = opts;
      sb.innerHTML = opts;
    }
  }

  function renderRoom() {
    const room = $("room");
    if (!room) return;
    ensureCoreObjects();
    room.innerHTML = "";
    room.className = "room layout-" + layoutType + " absolute-room";
    if (layoutType === "freeform") room.classList.add("freeform-room");

    const grid = document.createElement("div");
    grid.className = "seat-grid absolute-grid";
    grid.style.position = "relative";
    grid.style.minHeight = "540px";
    grid.style.width = "100%";

    seats.forEach((seat, i) => {
      const isTable = seat.kind === "table";
      const cell = document.createElement("div");
      cell.className =
        "seat free-seat" +
        (isTable ? " table-box" : "") +
        (seat.studentId || (seat.members && seat.members.length) ? " filled" : " empty");
      cell.dataset.seatId = seat.id;

      let inner = "";
      if (isTable) {
        inner += '<div class="table-title">' + escapeHtml(seat.label) + "</div>";
        const members = seat.members || [];
        if (!members.length) {
          inner += '<span class="seat-label">Drop names here</span>';
        } else {
          inner += '<div class="table-members">';
          members.forEach((sid) => {
            const st = studentById(sid);
            if (!st) return;
            inner +=
              '<div class="student-card table-member" draggable="true" data-student-id="' +
              st.id +
              '" style="--c:' +
              st.color +
              '">' +
              escapeHtml(st.name) +
              "</div>";
          });
          inner += "</div>";
        }
      } else {
        const st = seat.studentId ? studentById(seat.studentId) : null;
        if (st) {
          inner +=
            '<div class="student-card" draggable="true" data-student-id="' +
            st.id +
            '" style="--c:' +
            st.color +
            '">' +
            escapeHtml(st.name) +
            "</div>";
        } else {
          inner += '<span class="seat-label">' + escapeHtml(seat.label) + "</span>";
        }
      }
      inner += '<span class="resize-handle" title="Resize"></span>';
      cell.innerHTML = inner;

      cell.querySelectorAll(".student-card").forEach((card) => {
        card.addEventListener("dragstart", (e) => {
          dragId = card.dataset.studentId;
          e.dataTransfer.setData("text/plain", card.dataset.studentId);
          e.stopPropagation();
        });
      });

      cell.addEventListener("dragover", (e) => {
        e.preventDefault();
        cell.classList.add("drag-over");
      });
      cell.addEventListener("dragleave", () => cell.classList.remove("drag-over"));
      cell.addEventListener("drop", (e) => {
        e.preventDefault();
        cell.classList.remove("drag-over");
        const sid = e.dataTransfer.getData("text/plain") || dragId;
        if (sid) assignToSeat(sid, seat.id);
      });

      const pos = freePos[seat.id] || {
        x: 20 + (i % 5) * 100,
        y: 110 + Math.floor(i / 5) * 72,
        w: isTable ? 150 : 92,
        h: isTable ? 90 : 58,
      };
      freePos[seat.id] = pos;
      cell.style.left = pos.x + "px";
      cell.style.top = pos.y + "px";
      cell.style.width = pos.w + "px";
      cell.style.height = pos.h + "px";

      enableFreeDrag(cell, {
        minW: isTable ? 100 : 56,
        minH: isTable ? 64 : 40,
        maxW: 320,
        maxH: 320,
        onMove: (x, y, w, h) => {
          freePos[seat.id] = { x, y, w, h };
        },
      });

      grid.appendChild(cell);
    });
    room.appendChild(grid);

    objects.forEach((obj) => {
      const el = document.createElement("div");
      el.className = "room-object";
      el.dataset.type = obj.type || "obstacle";
      el.style.left = obj.x + "px";
      el.style.top = obj.y + "px";
      el.style.width = (obj.w || 80) + "px";
      el.style.height = (obj.h || 48) + "px";
      el.innerHTML =
        '<div class="obj-label">' +
        escapeHtml(obj.label) +
        '</div><span class="resize-handle" title="Resize"></span>';
      el.title = "Drag · resize · double-click rename";
      el.addEventListener("dblclick", () => {
        const n = prompt("Object name", obj.label);
        if (n) {
          obj.label = n.trim() || obj.label;
          el.querySelector(".obj-label").textContent = obj.label;
          saveState();
        }
      });
      room.appendChild(el);
      enableFreeDrag(el, {
        minW: 36,
        minH: 28,
        maxW: 480,
        maxH: 240,
        onMove: (x, y, w, h) => {
          obj.x = x;
          obj.y = y;
          obj.w = w;
          obj.h = h;
        },
      });
      // After moving a non-board obstacle, rebuild grid so seats stay in straight rows
      el.addEventListener("mouseup", () => {
        if (obj.type !== "board") setTimeout(() => buildLayout(layoutType), 40);
      });
      el.addEventListener("touchend", () => {
        if (obj.type !== "board") setTimeout(() => buildLayout(layoutType), 40);
      });
    });

    pairsConflict(seats).forEach(([a, b]) => {
      [a, b].forEach((sid) => {
        const card = room.querySelector('[data-student-id="' + sid + '"]');
        if (card) card.classList.add("conflict");
      });
    });
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function addKeepApart() {
    const a = $("keep-a").value;
    const b = $("keep-b").value;
    if (!a || !b || a === b) {
      setStatus("Pick two different students");
      return;
    }
    if (keepApart.some(([x, y]) => (x === a && y === b) || (x === b && y === a))) {
      setStatus("Already on keep-apart list");
      return;
    }
    keepApart.push([a, b]);
    renderKeepApart();
    setStatus("Keep-apart added");
  }

  document.addEventListener("DOMContentLoaded", () => {
    loadStore();
    // Drop legacy auto-teacher if present
    objects = objects.filter((o) => o.type !== "teacher" || true);
    ensureCoreObjects();
    if (students.length) {
      $("name-input").value = students.map((s) => s.name).join(", ");
      $("class-name").value = className;
      if ($("table-size")) $("table-size").value = tableSize;
      document.querySelectorAll("[data-layout]").forEach((b) => {
        b.classList.toggle("is-on", b.dataset.layout === layoutType);
      });
      buildLayout(layoutType);
    } else {
      syncFreeformTools();
      renderRoom();
    }

    $("btn-load").addEventListener("click", applyNames);
    $("btn-random").addEventListener("click", randomise);
    $("btn-reset").addEventListener("click", resetSeating);
    $("btn-save").addEventListener("click", () => {
      className = $("class-name").value.trim() || "My Class";
      saveStore();
      render();
    });
    $("btn-print").addEventListener("click", () => window.print());
    $("btn-keep-add").addEventListener("click", addKeepApart);
    $("class-name").addEventListener("change", () => {
      className = $("class-name").value.trim() || "My Class";
      render();
    });

    document.querySelectorAll("[data-layout]").forEach((btn) => {
      btn.addEventListener("click", () => {
        document
          .querySelectorAll("[data-layout]")
          .forEach((b) => b.classList.remove("is-on"));
        btn.classList.add("is-on");
        buildLayout(btn.dataset.layout);
        setStatus("Layout: " + btn.dataset.layout);
      });
    });

    document.querySelectorAll("[data-add-obj]").forEach((btn) => {
      btn.addEventListener("click", () => addObject(btn.dataset.addObj));
    });

    const clearObj = $("btn-clear-objects");
    if (clearObj) {
      clearObj.addEventListener("click", () => {
        objects = objects.filter((o) => o.type === "board");
        buildLayout(layoutType);
        setStatus("Extra objects cleared");
      });
    }

    const buildTables = $("btn-build-tables");
    if (buildTables) {
      buildTables.addEventListener("click", () => {
        tableSize = Number($("table-size").value) || 4;
        layoutType = "freeform";
        document.querySelectorAll("[data-layout]").forEach((b) => {
          b.classList.toggle("is-on", b.dataset.layout === "freeform");
        });
        buildFreeformTables(tableSize);
        render();
        setStatus("Tables of " + tableSize);
      });
    }

    $("btn-rebuild").addEventListener("click", () => buildLayout(layoutType));
  });
})();
