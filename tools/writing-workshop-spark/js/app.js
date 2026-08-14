(function () {
  const DATA = () => window.WWS_DATA;

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }
  function $all(sel, root) {
    return Array.from((root || document).querySelectorAll(sel));
  }

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function pickN(arr, n) {
    const copy = arr.slice();
    const out = [];
    while (out.length < n && copy.length) {
      const i = Math.floor(Math.random() * copy.length);
      out.push(copy.splice(i, 1)[0]);
    }
    return out;
  }

  function renderList(el, items, onClick) {
    el.innerHTML = "";
    items.forEach((item, idx) => {
      const li = document.createElement("li");
      li.innerHTML = `<span class="vis" aria-hidden="true">${item.vis || ""}</span>${escapeHtml(item.text)}`;
      li.tabIndex = 0;
      li.addEventListener("click", () => onClick && onClick(item, li, idx));
      li.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick && onClick(item, li, idx);
        }
      });
      el.appendChild(li);
    });
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function showGenre(id) {
    $all(".tab").forEach((t) => {
      const on = t.dataset.genre === id;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", on ? "true" : "false");
    });
    ["fantasy", "howto", "persuasive"].forEach((g) => {
      const panel = document.getElementById("panel-" + g);
      if (!panel) return;
      const on = g === id;
      panel.hidden = !on;
      panel.classList.toggle("is-visible", on);
    });
  }

  function initFantasy() {
    const d = DATA().fantasy;
    renderList($("#list-who"), d.who);
    renderList($("#list-what"), d.what);
    renderList($("#list-where"), d.where);

    $("#btn-fantasy-spin").addEventListener("click", () => {
      const who = pick(d.who);
      const what = pick(d.what);
      const where = pick(d.where);
      $("#res-who").textContent = who.vis + " " + who.text;
      $("#res-what").textContent = what.vis + " " + what.text;
      $("#res-where").textContent = where.vis + " " + where.text;
      const box = $("#fantasy-result");
      box.hidden = false;
      box.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
    $("#btn-fantasy-clear").addEventListener("click", () => {
      $("#fantasy-result").hidden = true;
    });
  }

  function initHowto() {
    const d = DATA().howto;
    renderList($("#list-howto-topics"), d.topics, (item) => {
      $("#howto-topic-text").textContent = item.vis + " " + item.text;
      $("#howto-topic").hidden = false;
    });
    const frames = $("#list-howto-frames");
    frames.innerHTML = d.frames.map((f) => `<li>${escapeHtml(f)}</li>`).join("");

    $("#btn-howto-topic").addEventListener("click", () => {
      const t = pick(d.topics);
      $("#howto-topic-text").textContent = t.vis + " " + t.text;
      $("#howto-topic").hidden = false;
    });
    $("#btn-howto-steps").addEventListener("click", () => {
      frames.scrollIntoView({ behavior: "smooth", block: "nearest" });
      frames.classList.add("pulse");
      setTimeout(() => frames.classList.remove("pulse"), 600);
    });
  }

  function initPersuasive() {
    const d = DATA().persuasive;
    renderList($("#list-claims"), d.claims);
    renderList($("#list-audience"), d.audience);
    renderList($("#list-reasons"), d.reasons);
    renderList($("#list-evidence"), d.evidence);

    $("#btn-persuasive-spin").addEventListener("click", () => {
      const claim = pick(d.claims);
      const audience = pick(d.audience);
      const reasons = pickN(d.reasons, 3);
      const evidence = pickN(d.evidence, 3);
      $("#res-claim").textContent = claim.vis + " " + claim.text;
      $("#res-audience").textContent = audience.vis + " " + audience.text;
      $("#res-reasons").innerHTML = reasons.map((r) => `<li>${escapeHtml(r.vis + " " + r.text)}</li>`).join("");
      $("#res-evidence").innerHTML = evidence.map((r) => `<li>${escapeHtml(r.vis + " " + r.text)}</li>`).join("");
      const box = $("#persuasive-result");
      box.hidden = false;
      box.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
    $("#btn-persuasive-clear").addEventListener("click", () => {
      $("#persuasive-result").hidden = true;
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    $all(".tab").forEach((tab) => {
      tab.addEventListener("click", () => showGenre(tab.dataset.genre));
    });
    initFantasy();
    initHowto();
    initPersuasive();
  });
})();
