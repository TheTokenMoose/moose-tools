/**
 * Team Maker — fast classroom team randomiser
 */
(function () {
  "use strict";

  const LIST_KEY = "token-moose-team-maker-list";
  const HISTORY_KEY = "token-moose-team-maker-history";

  /** Preset packs — emoji as picture, colour drives team card / score UI */
  const PRESET_PACKS = {
    animals: [
      { name: "Foxes", emoji: "🦊", color: "#f97316" },
      { name: "Wolves", emoji: "🐺", color: "#3b82f6" },
      { name: "Pandas", emoji: "🐼", color: "#22c55e" },
      { name: "Lions", emoji: "🦁", color: "#eab308" },
      { name: "Tigers", emoji: "🐯", color: "#ef4444" },
      { name: "Dolphins", emoji: "🐬", color: "#06b6d4" },
      { name: "Eagles", emoji: "🦅", color: "#8b5cf6" },
      { name: "Bears", emoji: "🐻", color: "#a16207" },
      { name: "Sharks", emoji: "🦈", color: "#0ea5e9" },
      { name: "Owls", emoji: "🦉", color: "#64748b" },
      { name: "Dragons", emoji: "🐉", color: "#dc2626" },
      { name: "Unicorns", emoji: "🦄", color: "#ec4899" },
    ],
    produce: [
      { name: "Apples", emoji: "🍎", color: "#ef4444" },
      { name: "Bananas", emoji: "🍌", color: "#eab308" },
      { name: "Oranges", emoji: "🍊", color: "#f97316" },
      { name: "Grapes", emoji: "🍇", color: "#8b5cf6" },
      { name: "Strawberries", emoji: "🍓", color: "#e11d48" },
      { name: "Watermelons", emoji: "🍉", color: "#22c55e" },
      { name: "Lemons", emoji: "🍋", color: "#facc15" },
      { name: "Peaches", emoji: "🍑", color: "#fb923c" },
      { name: "Carrots", emoji: "🥕", color: "#ea580c" },
      { name: "Broccoli", emoji: "🥦", color: "#16a34a" },
      { name: "Corn", emoji: "🌽", color: "#ca8a04" },
      { name: "Kiwi", emoji: "🥝", color: "#65a30d" },
    ],
    colours: [
      { name: "Red", emoji: "🔴", color: "#ef4444" },
      { name: "Blue", emoji: "🔵", color: "#3b82f6" },
      { name: "Green", emoji: "🟢", color: "#22c55e" },
      { name: "Yellow", emoji: "🟡", color: "#eab308" },
      { name: "Orange", emoji: "🟠", color: "#f97316" },
      { name: "Purple", emoji: "🟣", color: "#a855f7" },
      { name: "Pink", emoji: "💗", color: "#ec4899" },
      { name: "Teal", emoji: "🩵", color: "#14b8a6" },
      { name: "Brown", emoji: "🟤", color: "#a16207" },
      { name: "Black", emoji: "⚫", color: "#1e293b" },
      { name: "White", emoji: "⚪", color: "#94a3b8" },
      { name: "Indigo", emoji: "🟦", color: "#6366f1" },
    ],
    shapes: [
      { name: "Circles", emoji: "⭕", color: "#3b82f6" },
      { name: "Squares", emoji: "⬛", color: "#1e293b" },
      { name: "Triangles", emoji: "🔺", color: "#ef4444" },
      { name: "Stars", emoji: "⭐", color: "#eab308" },
      { name: "Hearts", emoji: "❤️", color: "#e11d48" },
      { name: "Diamonds", emoji: "💎", color: "#06b6d4" },
      { name: "Hexagons", emoji: "⬡", color: "#8b5cf6" },
      { name: "Ovals", emoji: "🔵", color: "#0ea5e9" },
      { name: "Rectangles", emoji: "▬", color: "#64748b" },
      { name: "Crescents", emoji: "🌙", color: "#6366f1" },
      { name: "Arrows", emoji: "➤", color: "#f97316" },
      { name: "Pentagons", emoji: "⬠", color: "#22c55e" },
    ],
  };

  let students = loadList();
  let teams = [];
  let mode = "teams"; // teams | size
  let namePack = "animals";
  let useCustomNames = false;
  let teamCount = 4;
  let groupSize = 3;
  let history = loadHistory(); // array of past pair keys
  let animating = false;

  function activePresets() {
    return PRESET_PACKS[namePack] || PRESET_PACKS.animals;
  }

  const $ = (id) => document.getElementById(id);

  function loadList() {
    try {
      const a = JSON.parse(localStorage.getItem(LIST_KEY) || "[]");
      return Array.isArray(a) ? a : [];
    } catch (_) {
      return [];
    }
  }
  function saveList() {
    try {
      localStorage.setItem(LIST_KEY, JSON.stringify(students));
    } catch (_) {}
  }
  function loadHistory() {
    try {
      const a = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
      return Array.isArray(a) ? a : [];
    } catch (_) {
      return [];
    }
  }
  function saveHistory() {
    try {
      // keep last 200 pair keys
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(-200)));
    } catch (_) {}
  }

  function parseNames(text) {
    return text
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  function pairKey(a, b) {
    return [a, b].sort().join("|");
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  /** Score how often members of a team were paired before */
  function teamHistoryScore(members) {
    let score = 0;
    for (let i = 0; i < members.length; i++) {
      for (let j = i + 1; j < members.length; j++) {
        const k = pairKey(members[i], members[j]);
        score += history.filter((h) => h === k).length;
      }
    }
    return score;
  }

  function makeTeams(list) {
    if (list.length < 2) return [];
    let nTeams;
    if (mode === "size") {
      nTeams = Math.max(1, Math.ceil(list.length / groupSize));
    } else {
      nTeams = Math.max(1, Math.min(teamCount, list.length));
    }

    // try several shuffles; pick lowest history score when history exists
    let best = null;
    let bestScore = Infinity;
    const tries = history.length ? 24 : 6;
    for (let t = 0; t < tries; t++) {
      const shuffled = shuffle(list);
      const result = [];
      const presets = activePresets();
      for (let i = 0; i < nTeams; i++) {
        const preset = presets[i % presets.length];
        result.push({
          name: preset.name,
          emoji: preset.emoji,
          color: preset.color,
          members: [],
        });
      }
      shuffled.forEach((name, i) => {
        result[i % nTeams].members.push(name);
      });
      // balance: if mode size, prefer closer to groupSize by filling sequentially
      if (mode === "size") {
        result.forEach((tm) => (tm.members = []));
        let idx = 0;
        shuffled.forEach((name) => {
          // find team with fewest members under groupSize, else least members
          let bestI = 0;
          let bestLen = result[0].members.length;
          for (let i = 1; i < result.length; i++) {
            if (result[i].members.length < bestLen) {
              bestLen = result[i].members.length;
              bestI = i;
            }
          }
          result[bestI].members.push(name);
        });
      }
      const score = result.reduce((s, tm) => s + teamHistoryScore(tm.members), 0);
      if (score < bestScore) {
        bestScore = score;
        best = result;
      }
    }
    return best || [];
  }

  function recordHistory() {
    teams.forEach((tm) => {
      for (let i = 0; i < tm.members.length; i++) {
        for (let j = i + 1; j < tm.members.length; j++) {
          history.push(pairKey(tm.members[i], tm.members[j]));
        }
      }
    });
    saveHistory();
  }

  function applyCustomNames() {
    if (!useCustomNames) return;
    const raw = ($("custom-names") && $("custom-names").value.trim()) || "";
    if (!raw) return;
    const names = raw.split(",").map((s) => s.trim()).filter(Boolean);
    teams.forEach((tm, i) => {
      if (names[i]) {
        tm.name = names[i];
        tm.emoji = "⭐";
        // keep preset colour unless name is a known colour word
        const colourHit = (PRESET_PACKS.colours || []).find(
          (c) => c.name.toLowerCase() === names[i].toLowerCase()
        );
        if (colourHit) tm.color = colourHit.color;
      }
    });
  }

  function syncModeUI() {
    const teamsEl = $("ctrl-teams");
    const sizeEl = $("ctrl-size");
    if (teamsEl) teamsEl.hidden = mode !== "teams";
    if (sizeEl) sizeEl.hidden = mode !== "size";
  }

  function syncCustomUI() {
    const wrap = $("custom-wrap");
    if (wrap) wrap.hidden = !useCustomNames;
  }

  function renderTeams(animate) {
    const board = $("team-board");
    board.innerHTML = "";
    if (!teams.length) {
      board.innerHTML = '<p class="empty">Paste names and press Make teams</p>';
      return;
    }
    teams.forEach((tm, ti) => {
      const card = document.createElement("div");
      card.className = "team-card" + (animate ? " anim" : "");
      card.style.setProperty("--tc", tm.color);
      card.style.animationDelay = ti * 0.08 + "s";
      card.innerHTML =
        '<div class="team-head">' +
        '<span class="team-emoji">' +
        tm.emoji +
        "</span>" +
        '<input class="team-name-input" data-i="' +
        ti +
        '" value="' +
        escapeAttr(tm.name) +
        '" />' +
        '<span class="team-count">' +
        tm.members.length +
        "</span></div>" +
        '<ul class="team-members">' +
        tm.members
          .map(
            (m, mi) =>
              '<li class="member" style="animation-delay:' +
              (ti * 0.08 + mi * 0.04) +
              's">' +
              escapeHtml(m) +
              "</li>"
          )
          .join("") +
        "</ul>";
      board.appendChild(card);
    });
    board.querySelectorAll(".team-name-input").forEach((inp) => {
      inp.addEventListener("change", () => {
        const i = Number(inp.dataset.i);
        if (teams[i]) teams[i].name = inp.value.trim() || teams[i].name;
      });
    });
    $("result-actions").hidden = false;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
  function escapeAttr(s) {
    return escapeHtml(s).replace(/"/g, "&quot;");
  }

  function doMake(animate) {
    students = parseNames($("name-list").value);
    saveList();
    $("count-label").textContent = students.length + " students";
    if (students.length < 2) {
      $("team-board").innerHTML =
        '<p class="empty">Need at least 2 names</p>';
      return;
    }
    teams = makeTeams(students);
    applyCustomNames();
    scores = {};
    renderTeams(animate);
    recordHistory();
  }

  function copyResults() {
    const text = teams
      .map(
        (tm) =>
          tm.emoji + " " + tm.name + "\n" + tm.members.map((m) => "  • " + m).join("\n")
      )
      .join("\n\n");
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        $("copy-status").textContent = "Copied!";
        setTimeout(() => ($("copy-status").textContent = ""), 1500);
      });
    } else {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      $("copy-status").textContent = "Copied!";
    }
  }

  
  let scores = {}; // team index -> points

  function openScoreKeeper() {
    if (!teams.length) {
      $("copy-status").textContent = "Make teams first";
      return;
    }
    teams.forEach((_, i) => {
      if (scores[i] == null) scores[i] = 0;
    });
    $("score-screen").hidden = false;
    document.querySelector(".setup").hidden = true;
    document.querySelector(".results").hidden = true;
    renderScores();
  }

  function closeScoreKeeper() {
    $("score-screen").hidden = true;
    document.querySelector(".setup").hidden = false;
    document.querySelector(".results").hidden = false;
  }

  function renderScores() {
    const controls = $("score-controls");
    const board = $("score-leaderboard");
    controls.innerHTML = "<h3>Adjust points</h3>";
    board.innerHTML = "<h3>Leaderboard</h3>";
    teams.forEach((tm, i) => {
      const row = document.createElement("div");
      row.className = "score-row";
      row.style.setProperty("--tc", tm.color);
      row.innerHTML =
        '<span class="name">' +
        escapeHtml(tm.emoji + " " + tm.name) +
        '</span><button type="button" class="minus" data-i="' +
        i +
        '">−</button><span class="pts">' +
        (scores[i] || 0) +
        '</span><button type="button" class="plus" data-i="' +
        i +
        '">+</button>';
      controls.appendChild(row);
    });
    controls.querySelectorAll(".plus").forEach((b) => {
      b.onclick = () => {
        scores[Number(b.dataset.i)] = (scores[Number(b.dataset.i)] || 0) + 1;
        renderScores();
      };
    });
    controls.querySelectorAll(".minus").forEach((b) => {
      b.onclick = () => {
        scores[Number(b.dataset.i)] = (scores[Number(b.dataset.i)] || 0) - 1;
        renderScores();
      };
    });
    // leaderboard sorted
    const ranked = teams
      .map((tm, i) => ({ tm, i, pts: scores[i] || 0 }))
      .sort((a, b) => b.pts - a.pts || a.tm.name.localeCompare(b.tm.name));
    let rank = 0;
    let lastPts = null;
    ranked.forEach((r, idx) => {
      if (r.pts !== lastPts) {
        rank = idx + 1;
        lastPts = r.pts;
      }
      const tied = ranked.filter((x) => x.pts === r.pts).length > 1;
      const card = document.createElement("div");
      card.className = "lead-card" + (tied ? " tied" : "");
      card.style.setProperty("--tc", r.tm.color);
      card.innerHTML =
        '<div class="lead-rank">#' +
        rank +
        (tied ? " (tie)" : "") +
        '</div><div class="lead-name">' +
        escapeHtml(r.tm.emoji + " " + r.tm.name) +
        '</div><div class="lead-pts">' +
        r.pts +
        " pts</div>";
      board.appendChild(card);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (students.length) {
      $("name-list").value = students.join(", ");
      $("count-label").textContent = students.length + " students";
    }

    document.querySelectorAll('input[name="mode"]').forEach((r) => {
      r.addEventListener("change", () => {
        mode = r.value;
        syncModeUI();
      });
    });
    syncModeUI();

    document.querySelectorAll('input[name="pack"]').forEach((r) => {
      r.addEventListener("change", () => {
        if (r.checked) namePack = r.value;
      });
    });

    const useCustom = $("use-custom");
    if (useCustom) {
      useCustom.addEventListener("change", () => {
        useCustomNames = !!useCustom.checked;
        syncCustomUI();
      });
      syncCustomUI();
    }

    $("team-count").addEventListener("input", (e) => {
      teamCount = Math.max(2, Math.min(12, Number(e.target.value) || 2));
      $("team-count-val").textContent = teamCount;
    });
    $("group-size").addEventListener("input", (e) => {
      groupSize = Math.max(2, Math.min(10, Number(e.target.value) || 2));
      $("group-size-val").textContent = groupSize;
    });

    $("btn-make").addEventListener("click", () => doMake(true));
    $("btn-reroll").addEventListener("click", () => doMake(true));
    $("btn-skip-anim").addEventListener("click", () => {
      document.querySelectorAll(".anim, .member").forEach((el) => {
        el.style.animation = "none";
      });
    });
    $("btn-reset").addEventListener("click", () => {
      teams = [];
      $("team-board").innerHTML = '<p class="empty">Teams cleared</p>';
      $("result-actions").hidden = true;
    });
    $("btn-copy").addEventListener("click", copyResults);
    $("btn-print").addEventListener("click", () => window.print());
    $("btn-score").addEventListener("click", openScoreKeeper);
    $("btn-back-teams").addEventListener("click", closeScoreKeeper);
    $("btn-reset-scores").addEventListener("click", () => {
      scores = {};
      teams.forEach((_, i) => (scores[i] = 0));
      renderScores();
    });
    $("btn-clear-history").addEventListener("click", () => {
      history = [];
      saveHistory();
      $("copy-status").textContent = "History cleared";
      setTimeout(() => ($("copy-status").textContent = ""), 1500);
    });
  });
})();
