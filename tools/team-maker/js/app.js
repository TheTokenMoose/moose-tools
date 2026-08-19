/**
 * Team Maker — fast classroom team randomiser
 */
(function () {
  "use strict";

  const LIST_KEY = "token-moose-team-maker-list";
  const HISTORY_KEY = "token-moose-team-maker-history";
  const PRESET_NAMES = [
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
  ];

  let students = loadList();
  let teams = [];
  let mode = "teams"; // teams | size
  let teamCount = 4;
  let groupSize = 3;
  let history = loadHistory(); // array of past pair keys
  let animating = false;

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
      for (let i = 0; i < nTeams; i++) {
        const preset = PRESET_NAMES[i % PRESET_NAMES.length];
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
    const raw = $("custom-names").value.trim();
    if (!raw) return;
    const names = raw.split(",").map((s) => s.trim()).filter(Boolean);
    teams.forEach((tm, i) => {
      if (names[i]) {
        tm.name = names[i];
        tm.emoji = "⭐";
      }
    });
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

  document.addEventListener("DOMContentLoaded", () => {
    if (students.length) {
      $("name-list").value = students.join(", ");
      $("count-label").textContent = students.length + " students";
    }

    document.querySelectorAll('input[name="mode"]').forEach((r) => {
      r.addEventListener("change", () => {
        mode = r.value;
        $("ctrl-teams").hidden = mode !== "teams";
        $("ctrl-size").hidden = mode !== "size";
      });
    });
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
    $("btn-clear-history").addEventListener("click", () => {
      history = [];
      saveHistory();
      $("copy-status").textContent = "History cleared";
      setTimeout(() => ($("copy-status").textContent = ""), 1500);
    });
  });
})();
