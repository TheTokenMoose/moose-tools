(function () {
  const GRADE_KEY = "token-moose-wws-grade";
  let grade = "k3";

  function DATA() {
    return window.WWS_DATA;
  }
  function gradeData() {
    return DATA()[grade] || DATA().k3;
  }

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
  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function applyGrade(g) {
    grade = g === "k2" ? "k2" : "k3";
    try {
      localStorage.setItem(GRADE_KEY, grade);
    } catch (_) {}
    document.body.setAttribute("data-grade", grade);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", grade === "k2" ? "#22d3ee" : "#f9a8d4");

    $all(".grade-btn").forEach((b) => {
      const on = b.dataset.grade === grade;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });

    $all(".grade-shell").forEach((el) => {
      el.hidden = el.dataset.gradeShell !== grade;
    });

    const note = $("#grade-blurb");
    if (note) note.textContent = gradeData().blurb || "";

    const tag = $(".tagline");
    if (tag) {
      tag.textContent =
        grade === "k2"
          ? "K2 · Drawing first · Launching · Show & Tell · Fantasy · How to Draw"
          : "K3 · Narrative · How-To · Opinion";
    }

    // Reset tabs to first unit for grade
    if (grade === "k2") showK2Unit("launching");
    else showK3Genre("fantasy");
  }

  function showK3Genre(id) {
    $all('#shell-k3 .tab').forEach((t) => {
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

  function showK2Unit(id) {
    $all("#shell-k2 .tab").forEach((t) => {
      const on = t.dataset.unit === id;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", on ? "true" : "false");
    });
    ["launching", "showtell", "fantasy", "howtodraw"].forEach((u) => {
      const panel = document.getElementById("panel-k2-" + u);
      if (!panel) return;
      panel.hidden = u !== id;
    });
  }

  function renderList(el, items) {
    if (!el) return;
    el.innerHTML = "";
    (items || []).forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML =
        '<span class="vis" aria-hidden="true">' +
        (item.vis || "") +
        "</span>" +
        escapeHtml(item.text);
      el.appendChild(li);
    });
  }

  function renderK2Cards(unitId, containerId, count) {
    const unit = gradeData().units && gradeData().units[unitId];
    const box = document.getElementById(containerId);
    if (!unit || !box) return;
    const cards = pickN(unit.cards, count || 3);
    box.innerHTML = "";
    cards.forEach((card, i) => {
      const art = document.createElement("article");
      art.className = "idea-card";
      let html =
        "<h3>🌟 " +
        escapeHtml(card.title) +
        "</h3><p class='draw'><strong>Draw:</strong> " +
        escapeHtml(card.draw) +
        "</p>";
      if (card.steps && card.steps.length) {
        html += "<ol class='steps'>";
        card.steps.forEach((s) => {
          html += "<li>" + escapeHtml(s) + "</li>";
        });
        html += "</ol>";
      }
      if (card.next && card.next.length) {
        html += "<ul class='next'>";
        card.next.forEach((n) => {
          html += "<li>" + escapeHtml(n) + "</li>";
        });
        html += "</ul>";
      }
      html += "<p class='cheer'>" + escapeHtml(card.cheer || "You are a real author and illustrator!") + "</p>";
      art.innerHTML = html;
      box.appendChild(art);
    });
  }

  function initK3() {
    const root = DATA().k3;
    if (!root) return;
    renderList($("#list-who"), root.fantasy.who);
    renderList($("#list-what"), root.fantasy.what);
    renderList($("#list-where"), root.fantasy.where);

    const spinF = $("#btn-fantasy-spin");
    if (spinF) {
      spinF.addEventListener("click", () => {
        const d = DATA().k3.fantasy;
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
    }
    const clearF = $("#btn-fantasy-clear");
    if (clearF) clearF.addEventListener("click", () => { $("#fantasy-result").hidden = true; });

    const howto = root.howto;
    if (howto) {
      renderList($("#list-howto-topics"), howto.topics);
      const frames = $("#list-howto-frames");
      if (frames && howto.frames) {
        frames.innerHTML = howto.frames.map((f) => "<li>" + escapeHtml(f) + "</li>").join("");
      }
      const btnT = $("#btn-howto-topic");
      if (btnT) {
        btnT.addEventListener("click", () => {
          const t = pick(howto.topics);
          $("#howto-topic-text").textContent = t.vis + " " + t.text;
          $("#howto-topic").hidden = false;
        });
      }
      const btnS = $("#btn-howto-steps");
      if (btnS && frames) {
        btnS.addEventListener("click", () => {
          frames.scrollIntoView({ behavior: "smooth", block: "nearest" });
        });
      }
    }

    const pers = root.persuasive;
    if (pers) {
      renderList($("#list-claims"), pers.claims);
      renderList($("#list-audience"), pers.audience);
      renderList($("#list-reasons"), pers.reasons);
      renderList($("#list-evidence"), pers.evidence);
      const spinP = $("#btn-persuasive-spin");
      if (spinP) {
        spinP.addEventListener("click", () => {
          const claim = pick(pers.claims);
          const audience = pick(pers.audience);
          const reasons = pickN(pers.reasons, 3);
          const evidence = pickN(pers.evidence, 3);
          $("#res-claim").textContent = claim.vis + " " + claim.text;
          $("#res-audience").textContent = audience.vis + " " + audience.text;
          $("#res-reasons").innerHTML = reasons
            .map((r) => "<li>" + escapeHtml(r.vis + " " + r.text) + "</li>")
            .join("");
          $("#res-evidence").innerHTML = evidence
            .map((r) => "<li>" + escapeHtml(r.vis + " " + r.text) + "</li>")
            .join("");
          const box = $("#persuasive-result");
          box.hidden = false;
          box.scrollIntoView({ behavior: "smooth", block: "nearest" });
        });
      }
      const clearP = $("#btn-persuasive-clear");
      if (clearP) clearP.addEventListener("click", () => { $("#persuasive-result").hidden = true; });
    }
  }

  function initK2() {
    const units = ["launching", "showtell", "fantasy", "howtodraw"];
    units.forEach((u) => {
      const btn = document.getElementById("btn-k2-spark-" + u);
      if (btn) {
        btn.addEventListener("click", () => {
          renderK2Cards(u, "k2-cards-" + u, u === "howtodraw" ? 2 : 3);
        });
      }
      // initial cards
      renderK2Cards(u, "k2-cards-" + u, u === "howtodraw" ? 2 : 3);
      const intro = document.getElementById("k2-intro-" + u);
      const unit = DATA().k2.units[u];
      if (intro && unit) intro.textContent = unit.intro;
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    try {
      const saved = localStorage.getItem(GRADE_KEY);
      if (saved === "k2" || saved === "k3") grade = saved;
    } catch (_) {}

    $all(".grade-btn").forEach((b) => {
      b.addEventListener("click", () => applyGrade(b.dataset.grade));
    });
    $all("#shell-k3 .tab").forEach((tab) => {
      tab.addEventListener("click", () => showK3Genre(tab.dataset.genre));
    });
    $all("#shell-k2 .tab").forEach((tab) => {
      tab.addEventListener("click", () => showK2Unit(tab.dataset.unit));
    });

    initK3();
    initK2();
    applyGrade(grade);
  });
})();
