/**
 * Classroom Seating Planner — teacher tool
 * Comma-separated names · layouts · drag · keep-apart · save · print
 */
(function () {
  "use strict";

  const STORE_KEY = "token-moose-seating-planner";
  const COLORS = [
    "#5ec8ff", "#ffc857", "#f472b6", "#3dd68c", "#a78bfa",
    "#fb923c", "#38bdf8", "#f87171", "#34d399", "#c084fc",
  ];

  let students = []; // { id, name, color }
  let seats = []; // { id, label, studentId|null, row, col }
  let keepApart = []; // pairs of student ids [a,b]
  let layoutType = "rows";
  let className = "My Class";
  let dragId = null;

  const $ = (id) => document.getElementById(id);

  function uid() {
    return "s" + Math.random().toString(36).slice(2, 9);
  }

  function parseNames(text) {
    return text
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
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
      if (data.className) className = data.className;
    } catch (_) {}
  }

  function saveStore() {
    try {
      localStorage.setItem(
        STORE_KEY,
        JSON.stringify({ students, seats, keepApart, layoutType, className })
      );
      setStatus("Saved on this device");
    } catch (_) {
      setStatus("Could not save");
    }
  }

  function setStatus(msg) {
    const el = $("status");
    if (el) el.textContent = msg || "";
  }

  function buildLayout(type) {
    layoutType = type;
    const n = students.length;
    seats = [];
    let rows, cols;

    if (type === "pairs") {
      cols = 2;
      rows = Math.max(1, Math.ceil(n / 2));
    } else if (type === "groups3") {
      cols = 3;
      rows = Math.max(1, Math.ceil(n / 3));
    } else if (type === "groups4") {
      cols = 4;
      rows = Math.max(1, Math.ceil(n / 4));
    } else if (type === "carpet") {
      // arc-ish grid: more cols
      cols = Math.min(8, Math.max(4, Math.ceil(Math.sqrt(n * 1.5))));
      rows = Math.max(1, Math.ceil(n / cols));
    } else if (type === "custom") {
      cols = Math.min(8, Math.max(3, Number($("custom-cols").value) || 5));
      rows = Math.max(1, Math.ceil(Math.max(n, 1) / cols));
    } else {
      // rows — classic
      cols = Math.min(6, Math.max(3, Math.ceil(Math.sqrt(n))));
      rows = Math.max(1, Math.ceil(n / cols));
    }

    let i = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        seats.push({
          id: "seat-" + r + "-" + c,
          label: r + 1 + "-" + (c + 1),
          studentId: students[i] ? students[i].id : null,
          row: r,
          col: c,
        });
        i++;
      }
    }
    // leftover students stay unassigned if more names than seats (shouldn't happen)
    render();
  }

  function applyNames() {
    const names = parseNames($("name-input").value);
    if (!names.length) {
      setStatus("Paste names separated by commas");
      return;
    }
    students = names.map((name, i) => ({
      id: uid(),
      name,
      color: COLORS[i % COLORS.length],
    }));
    keepApart = [];
    buildLayout(layoutType);
    $("name-input").value = names.join(", ");
    setStatus(students.length + " students loaded");
  }

  function seatOfStudent(sid) {
    return seats.find((s) => s.studentId === sid);
  }

  function studentById(id) {
    return students.find((s) => s.id === id);
  }

  function swapSeats(aId, bId) {
    const sa = seats.find((s) => s.id === aId);
    const sb = seats.find((s) => s.id === bId);
    if (!sa || !sb) return;
    const tmp = sa.studentId;
    sa.studentId = sb.studentId;
    sb.studentId = tmp;
    renderRoom();
  }

  function assignToSeat(studentId, seatId) {
    const seat = seats.find((s) => s.id === seatId);
    if (!seat) return;
    // clear previous seat of this student
    seats.forEach((s) => {
      if (s.studentId === studentId) s.studentId = null;
    });
    // if target had someone, swap
    const other = seat.studentId;
    seat.studentId = studentId;
    if (other) {
      const empty = seats.find((s) => !s.studentId && s.id !== seatId);
      if (empty) empty.studentId = other;
    }
    renderRoom();
  }

  /* ---- Keep apart ---- */
  function pairsConflict(arrangement) {
    // arrangement: seat.studentId map
    const pos = {};
    arrangement.forEach((s) => {
      if (s.studentId) pos[s.studentId] = { row: s.row, col: s.col };
    });
    const bad = [];
    keepApart.forEach(([a, b]) => {
      const pa = pos[a];
      const pb = pos[b];
      if (!pa || !pb) return;
      const near =
        Math.abs(pa.row - pb.row) <= 1 && Math.abs(pa.col - pb.col) <= 1;
      if (near) bad.push([a, b]);
    });
    return bad;
  }

  function randomise() {
    if (!students.length) {
      setStatus("Load names first");
      return;
    }
    const ids = students.map((s) => s.id);
    const maxTries = 400;
    let best = null;
    let bestConflicts = Infinity;

    for (let t = 0; t < maxTries; t++) {
      const shuffled = ids.slice();
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      const trial = seats.map((s, i) => ({
        ...s,
        studentId: shuffled[i] || null,
      }));
      // only assign to first N seats
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
    if (bestConflicts > 0) {
      const names = pairsConflict(best)
        .map(([a, b]) => {
          const na = studentById(a)?.name || "?";
          const nb = studentById(b)?.name || "?";
          return na + " & " + nb;
        })
        .join("; ");
      setStatus(
        "Could not fully separate: " +
          names +
          ". Showing best attempt (" +
          bestConflicts +
          " conflict" +
          (bestConflicts > 1 ? "s" : "") +
          ")."
      );
    } else {
      setStatus("Random seating ready (keep-apart OK)");
    }
    seats = best;
    renderRoom();
  }

  function resetSeating() {
    seats.forEach((s, i) => {
      s.studentId = students[i] ? students[i].id : null;
    });
    renderRoom();
    setStatus("Seating reset to list order");
  }

  /* ---- Render ---- */
  function render() {
    $("class-title").textContent = className || "Classroom";
    $("layout-label").textContent = layoutType;
    renderKeepApart();
    renderRoom();
    renderRoster();
  }

  function renderRoster() {
    const el = $("roster");
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
        '"></span>' +
        '<span class="nm">' +
        escapeHtml(st.name) +
        "</span>" +
        '<button type="button" class="icon-btn" data-act="rename" title="Rename">✎</button>' +
        '<button type="button" class="icon-btn" data-act="remove" title="Remove">×</button>';
      chip.addEventListener("dragstart", (e) => {
        dragId = st.id;
        e.dataTransfer.setData("text/plain", st.id);
      });
      chip.querySelector('[data-act="remove"]').addEventListener("click", (e) => {
        e.stopPropagation();
        students = students.filter((x) => x.id !== st.id);
        seats.forEach((s) => {
          if (s.studentId === st.id) s.studentId = null;
        });
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
        '</span><button type="button" data-i="' +
        idx +
        '">Remove</button>';
      row.querySelector("button").addEventListener("click", () => {
        keepApart.splice(idx, 1);
        renderKeepApart();
      });
      el.appendChild(row);
    });
    // selects
    const sa = $("keep-a");
    const sb = $("keep-b");
    const opts =
      '<option value="">—</option>' +
      students
        .map((s) => '<option value="' + s.id + '">' + escapeHtml(s.name) + "</option>")
        .join("");
    sa.innerHTML = opts;
    sb.innerHTML = opts;
  }

  function renderRoom() {
    const room = $("room");
    room.innerHTML = "";
    room.className = "room layout-" + layoutType;

    // Board + teacher
    const front = document.createElement("div");
    front.className = "room-front";
    front.innerHTML =
      '<div class="board">BOARD</div><div class="teacher-desk">Teacher</div>';
    room.appendChild(front);

    const grid = document.createElement("div");
    grid.className = "seat-grid";
    const maxCol = seats.reduce((m, s) => Math.max(m, s.col), 0) + 1;
    grid.style.gridTemplateColumns = "repeat(" + maxCol + ", minmax(72px, 1fr))";

    seats.forEach((seat) => {
      const cell = document.createElement("div");
      cell.className = "seat" + (seat.studentId ? " filled" : " empty");
      cell.dataset.seatId = seat.id;
      const st = seat.studentId ? studentById(seat.studentId) : null;
      if (st) {
        cell.innerHTML =
          '<div class="student-card" draggable="true" data-student-id="' +
          st.id +
          '" style="--c:' +
          st.color +
          '">' +
          escapeHtml(st.name) +
          "</div>";
        const card = cell.querySelector(".student-card");
        card.addEventListener("dragstart", (e) => {
          dragId = st.id;
          e.dataTransfer.setData("text/plain", st.id);
        });
      } else {
        cell.innerHTML = '<span class="seat-label">' + seat.label + "</span>";
      }
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
      // touch: tap empty then tap student? skip for speed — drag is enough
      grid.appendChild(cell);
    });
    room.appendChild(grid);

    const door = document.createElement("div");
    door.className = "door";
    door.textContent = "Door";
    room.appendChild(door);

    // conflict highlight
    const bad = pairsConflict(seats);
    bad.forEach(([a, b]) => {
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
    const exists = keepApart.some(
      ([x, y]) => (x === a && y === b) || (x === b && y === a)
    );
    if (exists) {
      setStatus("Already on keep-apart list");
      return;
    }
    keepApart.push([a, b]);
    renderKeepApart();
    setStatus("Keep-apart added");
  }

  function printChart() {
    window.print();
  }

  document.addEventListener("DOMContentLoaded", () => {
    loadStore();
    if (students.length) {
      $("name-input").value = students.map((s) => s.name).join(", ");
      $("class-name").value = className;
      render();
    }

    $("btn-load").addEventListener("click", applyNames);
    $("btn-random").addEventListener("click", randomise);
    $("btn-reset").addEventListener("click", resetSeating);
    $("btn-save").addEventListener("click", () => {
      className = $("class-name").value.trim() || "My Class";
      saveStore();
      render();
    });
    $("btn-print").addEventListener("click", printChart);
    $("btn-keep-add").addEventListener("click", addKeepApart);
    $("class-name").addEventListener("change", () => {
      className = $("class-name").value.trim() || "My Class";
      render();
    });

    document.querySelectorAll("[data-layout]").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("[data-layout]").forEach((b) => b.classList.remove("is-on"));
        btn.classList.add("is-on");
        buildLayout(btn.dataset.layout);
        setStatus("Layout: " + btn.dataset.layout);
      });
    });

    $("btn-rebuild").addEventListener("click", () => buildLayout(layoutType));
  });
})();
