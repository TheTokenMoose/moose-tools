(function () {
  const KEY = "token-moose-bingo-maker-v1";
  const $ = (id) => document.getElementById(id);

  function parseItems(raw) {
    return String(raw || "")
      .split(",")
      .map((s) => s.trim())
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

  function load() {
    try {
      const d = JSON.parse(localStorage.getItem(KEY) || "{}");
      if (d.items) $("items").value = d.items;
      if (d.count) $("board-count").value = d.count;
      if (typeof d.free === "boolean") $("free-center").checked = d.free;
    } catch (_) {}
  }

  function save() {
    try {
      localStorage.setItem(
        KEY,
        JSON.stringify({
          items: $("items").value,
          count: $("board-count").value,
          free: $("free-center").checked,
        })
      );
    } catch (_) {}
  }

  function makeBoard(pool, freeCenter) {
    const need = freeCenter ? 24 : 25;
    if (pool.length < need) return null;
    const picks = shuffle(pool).slice(0, need);
    const cells = [];
    let pi = 0;
    for (let i = 0; i < 25; i++) {
      if (freeCenter && i === 12) cells.push({ text: "FREE", free: true });
      else cells.push({ text: picks[pi++], free: false });
    }
    return cells;
  }

  function renderBoards() {
    save();
    const pool = parseItems($("items").value);
    const n = Math.max(1, Math.min(30, parseInt($("board-count").value, 10) || 1));
    const free = $("free-center").checked;
    const need = free ? 24 : 25;
    const host = $("boards");
    host.innerHTML = "";
    if (pool.length < need) {
      host.innerHTML = "<p>Need at least " + need + " unique items (you have " + pool.length + ").</p>";
      return;
    }
    for (let b = 0; b < n; b++) {
      const cells = makeBoard(pool, free);
      const card = document.createElement("div");
      card.className = "board";
      card.innerHTML = "<h3>Bingo · Board " + (b + 1) + "</h3>";
      const grid = document.createElement("div");
      grid.className = "grid";
      cells.forEach((c) => {
        const cell = document.createElement("div");
        cell.className = "cell" + (c.free ? " free" : "");
        cell.textContent = c.text;
        grid.appendChild(cell);
      });
      card.appendChild(grid);
      host.appendChild(card);
    }
  }

  let callPool = [];
  let called = [];

  function openCaller() {
    const pool = parseItems($("items").value);
    if (pool.length < 5) {
      alert("Add more items first.");
      return;
    }
    callPool = shuffle(pool);
    called = [];
    $("called-now").textContent = "Ready";
    $("called-list").innerHTML = "";
    $("caller").hidden = false;
  }

  function callNext() {
    if (!callPool.length) {
      $("called-now").textContent = "Done!";
      return;
    }
    const item = callPool.shift();
    called.push(item);
    $("called-now").textContent = item;
    const span = document.createElement("span");
    span.textContent = item;
    $("called-list").appendChild(span);
  }

  $("btn-gen").addEventListener("click", renderBoards);
  $("btn-print").addEventListener("click", () => window.print());
  $("btn-caller").addEventListener("click", openCaller);
  $("btn-call").addEventListener("click", callNext);
  $("btn-caller-reset").addEventListener("click", () => {
    callPool = shuffle(parseItems($("items").value));
    called = [];
    $("called-now").textContent = "Ready";
    $("called-list").innerHTML = "";
  });
  $("btn-caller-exit").addEventListener("click", () => {
    $("caller").hidden = true;
  });

  load();
})();
