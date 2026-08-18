(function () {
  const GRADE_KEY = "token-moose-wws-grade";
  let grade = "k3";

  const K3_UNITS = ["fantasy", "howto", "persuasive"];
  const K2_UNITS = ["howtodraw", "showtell", "fantasy"];

  // OpenMoji (CC BY-SA 4.0) — free educational color SVG clipart
  const OPENMOJI_BASE =
    "https://cdn.jsdelivr.net/npm/openmoji@14.0.0/color/svg/";

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
  function pickN(arr, n) {
    const copy = (arr || []).slice();
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

  /** Convert emoji to OpenMoji SVG filename (hex codepoints joined by -) */
  function emojiToOpenMojiFile(emoji) {
    if (!emoji) return null;
    const cps = [];
    for (const ch of emoji) {
      const cp = ch.codePointAt(0);
      if (cp === 0xfe0f) continue; // variation selector
      if (cp === 0x200d) {
        cps.push("200D");
        continue;
      }
      cps.push(cp.toString(16).toUpperCase());
    }
    if (!cps.length) return null;
    return cps.join("-") + ".svg";
  }

  function cardImageHtml(card) {
    const emoji = card.emoji || "💡";
    const file = emojiToOpenMojiFile(emoji);
    const alt = escapeHtml(card.title || "idea");
    if (!file) {
      return (
        '<div class="card-art" aria-hidden="true"><span class="card-emoji">' +
        emoji +
        "</span></div>"
      );
    }
    const src = OPENMOJI_BASE + file;
    return (
      '<div class="card-art">' +
      '<img class="card-clip" src="' +
      src +
      '" alt="" data-emoji="' +
      escapeHtml(emoji) +
      '" loading="lazy" width="88" height="88" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'grid\'">' +
      '<span class="card-emoji fallback" style="display:none" aria-hidden="true">' +
      emoji +
      "</span>" +
      "</div>"
    );
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
    if (note) note.textContent = (gradeData().blurb) || "";
    const tag = $(".tagline");
    if (tag) {
      tag.textContent =
        grade === "k2"
          ? "K2 · How to Draw · Show & Tell · Fantasy"
          : "K3 · Fantasy · How-To · Opinion";
    }
    if (grade === "k2") showUnit("k2", K2_UNITS[0]);
    else showUnit("k3", K3_UNITS[0]);
  }

  function showUnit(g, id) {
    const shell = document.getElementById("shell-" + g);
    if (!shell) return;
    $all(".tab", shell).forEach((t) => {
      const on = t.dataset.unit === id;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", on ? "true" : "false");
    });
    const units = g === "k2" ? K2_UNITS : K3_UNITS;
    units.forEach((u) => {
      const panel = document.getElementById("panel-" + g + "-" + u);
      if (!panel) return;
      panel.hidden = u !== id;
    });
  }

  function renderCards(g, unitId, count) {
    const gd = DATA()[g];
    if (!gd || !gd.units || !gd.units[unitId]) return;
    const unit = gd.units[unitId];
    const box = document.getElementById(g + "-cards-" + unitId);
    if (!box) return;
    const n = count || (unitId === "howtodraw" ? 2 : 3);
    const cards = pickN(unit.cards, n);
    box.innerHTML = "";
    cards.forEach((card) => {
      const art = document.createElement("article");
      art.className = "idea-card";
      let html = cardImageHtml(card);
      html +=
        "<h3>" +
        escapeHtml(card.title) +
        "</h3><p class='draw'><strong>" +
        (g === "k2" ? "Draw:" : "Spark:") +
        "</strong> " +
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
      html +=
        "<p class='cheer'>" +
        escapeHtml(card.cheer || "You are a real writer!") +
        "</p>";
      art.innerHTML = html;
      box.appendChild(art);
    });
  }

  function initGrade() {
    ["k2", "k3"].forEach((g) => {
      const units = g === "k2" ? K2_UNITS : K3_UNITS;
      units.forEach((u) => {
        const intro = document.getElementById(g + "-intro-" + u);
        const unit = DATA()[g] && DATA()[g].units[u];
        if (intro && unit) intro.textContent = unit.intro;
        const btn = document.getElementById("btn-" + g + "-spark-" + u);
        if (btn) {
          btn.addEventListener("click", () => renderCards(g, u));
        }
        renderCards(g, u);
      });
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
      tab.addEventListener("click", () => showUnit("k3", tab.dataset.unit));
    });
    $all("#shell-k2 .tab").forEach((tab) => {
      tab.addEventListener("click", () => showUnit("k2", tab.dataset.unit));
    });

    initGrade();
    applyGrade(grade);
  });
})();
