(function () {
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
  ];
  const LEVELS = {
    ab: ["AB"],
    aab: ["AAB"],
    abb: ["ABB"],
    abc: ["ABC"],
    mix: ["AB", "AAB", "ABB", "ABC"],
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

  let level = "ab";
  let answer = "";
  let stars = 0;
  let locked = false;
  let voice = null;

  function loadStars() {
    try {
      stars = Math.max(0, parseInt(localStorage.getItem(STARS_KEY) || "0", 10) || 0);
    } catch (_) {
      stars = 0;
    }
    els.homeStars.textContent = "⭐ " + stars;
  }
  function saveStars() {
    try {
      localStorage.setItem(STARS_KEY, String(stars));
    } catch (_) {}
    els.homeStars.textContent = "⭐ " + stars;
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
    return [symbols[0], symbols[1], symbols[2]];
  }

  function buildRound() {
    locked = false;
    const kinds = LEVELS[level];
    const kind = kinds[Math.floor(Math.random() * kinds.length)];
    let pool = SETS.filter((s) => (kind === "ABC" ? s.length >= 3 : s.length >= 2));
    const symbols = pool[Math.floor(Math.random() * pool.length)].slice();
    const unit = patternUnits(kind, symbols);
    const repeats = kind === "ABC" ? 2 : 3;
    const seq = [];
    for (let r = 0; r < repeats; r++) seq.push(...unit);
    answer = unit[0]; // next after full repeats ends on last of unit, next is first
    // Actually after full cycles, next is unit[0]. Show seq without last item so gap is last of unit? 
    // Better: show n complete units + partial, gap is next in unit.
    const showLen = unit.length * 2 + Math.floor(Math.random() * unit.length);
    const full = [];
    while (full.length < showLen + 1) full.push(...unit);
    const visible = full.slice(0, showLen);
    answer = full[showLen];

    els.belt.innerHTML = "";
    visible.forEach((sym) => {
      const c = document.createElement("div");
      c.className = "cell";
      c.textContent = sym;
      els.belt.appendChild(c);
    });
    const gap = document.createElement("div");
    gap.className = "cell gap";
    gap.textContent = "?";
    gap.setAttribute("aria-label", "missing");
    els.belt.appendChild(gap);

    const distractors = new Set([answer]);
    symbols.forEach((s) => distractors.add(s));
    while (distractors.size < 3) {
      const extra = SETS.flat()[Math.floor(Math.random() * SETS.flat().length)];
      distractors.add(extra);
    }
    const opts = [...distractors].sort(() => Math.random() - 0.5).slice(0, 3);
    if (!opts.includes(answer)) opts[0] = answer;

    els.choices.innerHTML = "";
    opts.sort(() => Math.random() - 0.5).forEach((sym) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "choice";
      b.textContent = sym;
      b.addEventListener("click", () => pick(sym, b));
      els.choices.appendChild(b);
    });

    els.prompt.textContent = "What comes next?";
    els.score.textContent = "⭐ " + stars + " · " + kind;
  }

  function pick(sym, btn) {
    if (locked) return;
    locked = true;
    const ok = sym === answer;
    document.querySelectorAll(".choice").forEach((c) => {
      if (c.textContent === answer) c.classList.add("correct");
      if (c === btn && !ok) c.classList.add("wrong");
      c.disabled = true;
    });
    if (ok) {
      stars += 1;
      saveStars();
      els.fbIcon.textContent = "⭐";
      els.fbTitle.textContent = "Yes!";
      els.fbMsg.textContent = "The pattern continues with " + answer;
      /* no auto-speak */
    } else {
      els.fbIcon.textContent = "🔧";
      els.fbTitle.textContent = "Keep trying";
      els.fbMsg.textContent = "Next was " + answer;
      /* no auto-speak */
    }
    setTimeout(() => show("fb"), 400);
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
      level = b.getAttribute("data-level");
      show("play");
      buildRound();
    });
  });
  els.btnHome.addEventListener("click", () => show("home"));
  els.btnAgain.addEventListener("click", () => show("home"));
  els.btnNext.addEventListener("click", () => {
    show("play");
    buildRound();
  });
  els.btnHear.addEventListener("click", () => speak("What comes next?"));

  loadStars();
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initVoice);
  else initVoice();
})();
