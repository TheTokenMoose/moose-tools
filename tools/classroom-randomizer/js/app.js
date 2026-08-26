(function () {
  const KEY = "token-moose-classroom-randomizer-v1";
  const $ = (id) => document.getElementById(id);
  let mode = "names";
  let pool = [];

  function parseList(raw) {
    return String(raw || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  function load() {
    try {
      const d = JSON.parse(localStorage.getItem(KEY) || "{}");
      if (d.names) $("name-list").value = d.names;
      if (d.custom) $("custom-list").value = d.custom;
      if (typeof d.removeAfter === "boolean") $("remove-after").checked = d.removeAfter;
      if (d.min != null) $("num-min").value = d.min;
      if (d.max != null) $("num-max").value = d.max;
    } catch (_) {}
  }

  function save() {
    try {
      localStorage.setItem(
        KEY,
        JSON.stringify({
          names: $("name-list").value,
          custom: $("custom-list").value,
          removeAfter: $("remove-after").checked,
          min: $("num-min").value,
          max: $("num-max").value,
        })
      );
    } catch (_) {}
  }

  function setMode(m) {
    mode = m;
    document.querySelectorAll(".mode").forEach((b) => {
      b.classList.toggle("is-active", b.getAttribute("data-mode") === m);
    });
    ["names", "number", "letter", "coin", "custom"].forEach((id) => {
      const el = $("panel-" + id);
      if (el) el.hidden = id !== m;
    });
  }

  function showResult(text) {
    const box = $("result");
    const val = $("result-value");
    val.textContent = text;
    box.classList.remove("pop");
    void box.offsetWidth;
    box.classList.add("pop");
  }

  function go() {
    save();
    if (mode === "names") {
      const full = parseList($("name-list").value);
      if (!full.length) return showResult("Add some names");
      let list = full;
      if ($("remove-after").checked) {
        // Rebuild pool when empty or when list membership changed
        const key = full.join("\0");
        if (!pool.length || pool._key !== key) {
          pool = full.slice();
          pool._key = key;
        }
        list = pool;
        if (!list.length) {
          pool = full.slice();
          pool._key = key;
          list = pool;
        }
      }
      const i = Math.floor(Math.random() * list.length);
      const pick = list[i];
      if ($("remove-after").checked) {
        pool.splice(i, 1);
        if (!pool.length) {
          pool = full.slice();
          pool._key = full.join("\0");
          showResult(pick + " (all done — reshuffling)");
          return;
        }
      }
      showResult(pick);
      return;
    }
    if (mode === "number") {
      let a = parseInt($("num-min").value, 10);
      let b = parseInt($("num-max").value, 10);
      if (isNaN(a)) a = 1;
      if (isNaN(b)) b = 10;
      if (a > b) {
        const t = a;
        a = b;
        b = t;
      }
      showResult(String(a + Math.floor(Math.random() * (b - a + 1))));
      return;
    }
    if (mode === "letter") {
      showResult(String.fromCharCode(65 + Math.floor(Math.random() * 26)));
      return;
    }
    if (mode === "coin") {
      showResult(Math.random() < 0.5 ? "Yes" : "No");
      return;
    }
    if (mode === "custom") {
      const list = parseList($("custom-list").value);
      if (!list.length) return showResult("Add some items");
      showResult(list[Math.floor(Math.random() * list.length)]);
    }
  }

  document.querySelectorAll(".mode").forEach((b) => {
    b.addEventListener("click", () => setMode(b.getAttribute("data-mode")));
  });
  $("btn-go").addEventListener("click", go);
  $("btn-reset").addEventListener("click", () => {
    pool = [];
    showResult("—");
  });
  ["name-list", "custom-list", "num-min", "num-max", "remove-after"].forEach((id) => {
    const el = $(id);
    if (el) el.addEventListener("change", save);
  });
  const nameList = $("name-list");
  if (nameList) {
    nameList.addEventListener("input", () => {
      pool = [];
      save();
    });
  }
  const rem = $("remove-after");
  if (rem) {
    rem.addEventListener("change", () => {
      pool = [];
      save();
    });
  }

  load();
})();
