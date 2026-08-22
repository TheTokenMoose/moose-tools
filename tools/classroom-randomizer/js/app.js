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
      let list = parseList($("name-list").value);
      if (!list.length) return showResult("Add some names");
      if ($("remove-after").checked) {
        if (!pool.length) pool = list.slice();
        list = pool;
      }
      const i = Math.floor(Math.random() * list.length);
      const pick = list[i];
      if ($("remove-after").checked) {
        pool.splice(i, 1);
        if (!pool.length) pool = parseList($("name-list").value).slice();
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

  load();
})();
