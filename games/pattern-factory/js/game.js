(function () {
  "use strict";

  const SETS = [
    ["🔴", "🔵"],
    ["🟨", "🟩"],
    ["🟪", "🟧"],
    ["⭐", "🌙"],
    ["🍎", "🍇"],
    ["🚗", "🚌"],
    ["🐶", "🐱"],
    ["🟥", "🟦", "🟩"],
    ["⭐", "🌙", "☀️"],
    ["🎵", "🎹", "🥁"],
    ["🟥", "🟦", "🟩", "🟨"],
  ];

  // Difficulty = how many gaps + which pattern kinds
  const LEVELS = {
    easy: { gaps: 1, kinds: ["AB"] },
    medium: { gaps: 2, kinds: ["AB", "AAB", "ABB"] },
    hard: { gaps: 3, kinds: ["AB", "AAB", "ABB", "ABC"] },
    expert: { gaps: 3, kinds: ["AABB", "ABAB", "AABC", "ABCD", "ABC"] },
  };

  const STARS_KEY = "token-moose-pattern-factory-stars";

  const els = {
    home: document.getElementById("screen-home"),
    play: document.getElementById("screen-play"),
    fb: document.getElementById("screen-fb"),
    belt: document.getElementById("belt"),
    choices: document.getElementById("choices"),
    prompt: document.getElementById("prompt"),
    score: document.getElementById("score-line"),
    homeStars: document.getElementById("home-stars"),
    btnHome: document.getElementById("btn-home"),
    btnHear: document.getElementById("btn-hear"),
    fbIcon: document.getElementById("fb-icon"),
    fbTitle: document.getElementById("fb-title"),
    fbMsg: document.getElementById("fb-msg"),
    btnNext: document.getElementById("btn-next"),
    btnAgain: document.getElementById("btn-again"),
  };

  let level = "easy";
  let answers = []; // symbols for each gap in order
  let gapIndex = 0; // which gap the child is filling
  let stars = 0;
  let locked = false;
  let voice = null;

  function loadStars() {
    try {
      stars = Math.max(0, parseInt(localStorage.getItem(STARS_KEY) || "0", 10) || 0);
    } catch (_) {
      stars = 0;
    }
    if (els.homeStars) els.homeStars.textContent = "⭐ " + stars;
  }
  function saveStars() {
    try {
      localStorage.setItem(STARS_KEY, String(stars));
    } catch (_) {}
    if (els.homeStars) els.homeStars.textContent = "⭐ " + stars;
  }

  function speak(t) {
    if (!t) return;
    if (voice && voice.speak) return void voice.speak(t);
    try {
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(t));
    } catch (_) {}
  }

  function show(s) {
    els.home.hidden = s !== "home";
    els.play.hidden = s !== "play";
    els.fb.hidden = s !== "fb";
  }

  function patternUnits(kind, symbols) {
    if (kind === "AB") return [symbols[0], symbols[1]];
    if (kind === "AAB") return [symbols[0], symbols[0], symbols[1]];
    if (kind === "ABB") return [symbols[0], symbols[1], symbols[1]];
    if (kind === "ABC") return [symbols[0], symbols[1], symbols[2]];
    if (kind === "AABB") return [symbols[0], symbols[0], symbols[1], symbols[1]];
    if (kind === "ABAB") return [symbols[0], symbols[1], symbols[0], symbols[1]];
    if (kind === "AABC") return [symbols[0], symbols[0], symbols[1], symbols[2]];
    if (kind === "ABCD") return [symbols[0], symbols[1], symbols[2], symbols[3] || symbols[0]];
    return [symbols[0], symbols[1]];
  }

  function buildRound() {
    locked = false;
    gapIndex = 0;
    const cfg = LEVELS[level] || LEVELS.easy;
    const kind = cfg.kinds[Math.floor(Math.random() * cfg.kinds.length)];
    const need3 = /C|ABCD|AABC/.test(kind);
    const need4 = kind === "ABCD";
    let pool = SETS.filter((s) => {
      if (need4) return s.length >= 3;
      if (need3) return s.length >= 3;
      return s.length >= 2;
    });
    let symbols = pool[Math.floor(Math.random() * pool.length)].slice();
    if (need4 && symbols.length < 4) {
      // pad a fourth distinct-ish symbol
      const extra = SETS.flat().find((x) => !symbols.includes(x)) || "⭐";
      symbols = symbols.concat([extra]);
    }
    const unit = patternUnits(kind, symbols);
    // Build a long enough sequence
    const full = [];
    while (full.length < unit.length * 3 + cfg.gaps) full.push(...unit);

    // Choose gap positions near the end so pattern is visible first
    const minShow = Math.max(unit.length + 1, 4);
    const start = Math.min(minShow, full.length - cfg.gaps - 1);
    const gapPositions = [];
    for (let g = 0; g < cfg.gaps; g++) {
      gapPositions.push(start + g + Math.floor((full.length - start - cfg.gaps) * (g / Math.max(cfg.gaps, 1))));
    }
    // Simpler: last cfg.gaps cells are gaps, with maybe one gap mid-stream for hard
    gapPositions.length = 0;
    if (cfg.gaps === 1) {
      gapPositions.push(full.length - 1);
    } else if (cfg.gaps === 2) {
      gapPositions.push(Math.floor(full.length * 0.55));
      gapPositions.push(full.length - 1);
    } else {
      gapPositions.push(Math.floor(full.length * 0.4));
      gapPositions.push(Math.floor(full.length * 0.7));
      gapPositions.push(full.length - 1);
    }
    // unique sorted
    const gaps = [...new Set(gapPositions)].sort((a, b) => a - b).slice(0, cfg.gaps);
    answers = gaps.map((i) => full[i]);

    els.belt.innerHTML = "";
    full.forEach((sym, i) => {
      const c = document.createElement("div");
      c.className = "cell";
      if (gaps.includes(i)) {
        c.classList.add("gap");
        c.dataset.gap = String(gaps.indexOf(i));
        c.textContent = "?";
        c.setAttribute("aria-label", "missing");
      } else {
        c.textContent = sym;
      }
      els.belt.appendChild(c);
    });

    renderChoices(symbols, kind);
    els.prompt.textContent =
      cfg.gaps === 1 ? "What comes next?" : "Fill the missing parts in order (" + cfg.gaps + " gaps)";
    els.score.textContent = "⭐ " + stars + " · " + kind + " · " + cfg.gaps + " gap" + (cfg.gaps > 1 ? "s" : "");
  }

  function renderChoices(symbols, kind) {
    const need = answers[gapIndex];
    const distractors = new Set([need]);
    symbols.forEach((s) => distractors.add(s));
    while (distractors.size < 4) {
      const extra = SETS.flat()[Math.floor(Math.random() * SETS.flat().length)];
      distractors.add(extra);
    }
    const opts = [...distractors];
    if (!opts.includes(need)) opts[0] = need;

    els.choices.innerHTML = "";
    opts
      .sort(() => Math.random() - 0.5)
      .forEach((sym) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "choice";
        b.textContent = sym;
        b.addEventListener("click", () => pick(sym, b));
        els.choices.appendChild(b);
      });
  }

  function pick(sym, btn) {
    if (locked) return;
    const need = answers[gapIndex];
    const ok = sym === need;
    if (!ok) {
      locked = true;
      btn.classList.add("wrong");
      document.querySelectorAll(".choice").forEach((c) => {
        if (c.textContent === need) c.classList.add("correct");
        c.disabled = true;
      });
      els.fbIcon.textContent = "🔧";
      els.fbTitle.textContent = "Keep trying";
      els.fbMsg.textContent = "That space needed " + need;
      setTimeout(() => show("fb"), 450);
      return;
    }

    // Fill this gap
    const gapEl = els.belt.querySelector('.gap[data-gap="' + gapIndex + '"]');
    if (gapEl) {
      gapEl.textContent = sym;
      gapEl.classList.remove("gap");
      gapEl.classList.add("filled");
    }
    gapIndex += 1;
    if (gapIndex >= answers.length) {
      locked = true;
      stars += 1;
      saveStars();
      document.querySelectorAll(".choice").forEach((c) => {
        c.disabled = true;
        if (c.textContent === sym) c.classList.add("correct");
      });
      els.fbIcon.textContent = "⭐";
      els.fbTitle.textContent = "Yes!";
      els.fbMsg.textContent = "You completed the pattern!";
      setTimeout(() => show("fb"), 400);
    } else {
      // Next gap — refresh choices for next answer
      locked = false;
      const cfg = LEVELS[level] || LEVELS.easy;
      els.prompt.textContent = "Next missing part (" + (gapIndex + 1) + " of " + answers.length + ")";
      // Re-use symbols from belt visible cells
      const seen = [...new Set([...els.belt.querySelectorAll(".cell:not(.gap)")].map((c) => c.textContent))];
      renderChoices(seen.length ? seen : answers, "");
    }
  }

  function initVoice() {
    try {
      if (window.TokenMooseVoice) {
        voice = TokenMooseVoice.create("pattern-factory");
        const slot = document.getElementById("tm-voice-slot");
        if (voice && voice.mountPicker && slot) voice.mountPicker(slot);
      }
    } catch (_) {}
  }

  document.querySelectorAll(".mode-card").forEach((b) => {
    b.addEventListener("click", () => {
      level = b.getAttribute("data-level") || "easy";
      show("play");
      buildRound();
    });
  });
  if (els.btnHome) els.btnHome.addEventListener("click", () => show("home"));
  if (els.btnAgain) els.btnAgain.addEventListener("click", () => show("home"));
  if (els.btnNext)
    els.btnNext.addEventListener("click", () => {
      show("play");
      buildRound();
    });
  if (els.btnHear) els.btnHear.addEventListener("click", () => speak("What comes next?"));

  loadStars();
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initVoice);
  else initVoice();
})();
