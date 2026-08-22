(function () {
  const ANIMALS = ["🦁", "🐘", "🦒", "🦓", "🦜", "🦋", "🐸", "🐢", "🦊", "🐼"];
  const MODES = {
    easy: { max: 5, flashMs: 1400, label: "Easy" },
    medium: { max: 8, flashMs: 900, label: "Medium" },
    hard: { max: 10, flashMs: 550, label: "Hard" },
  };
  const STARS_KEY = "token-moose-subitising-stars";

  const els = {
    home: document.getElementById("screen-home"),
    play: document.getElementById("screen-play"),
    fb: document.getElementById("screen-fb"),
    stage: document.getElementById("stage"),
    choices: document.getElementById("choices"),
    prompt: document.getElementById("prompt"),
    score: document.getElementById("score-line"),
    homeStars: document.getElementById("home-stars"),
    btnFlash: document.getElementById("btn-flash"),
    btnHome: document.getElementById("btn-home"),
    btnHear: document.getElementById("btn-hear"),
    fbIcon: document.getElementById("fb-icon"),
    fbTitle: document.getElementById("fb-title"),
    fbMsg: document.getElementById("fb-msg"),
    btnNext: document.getElementById("btn-next"),
    btnAgain: document.getElementById("btn-again"),
  };

  let mode = "easy";
  let answer = 0;
  let stars = 0;
  let round = 0;
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

  function speak(text) {
    if (!text) return;
    if (voice && typeof voice.speak === "function") {
      voice.speak(text);
      return;
    }
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(u);
    } catch (_) {}
  }

  function show(screen) {
    els.home.hidden = screen !== "home";
    els.play.hidden = screen !== "play";
    els.fb.hidden = screen !== "fb";
  }

  function randInt(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function choiceOptions(correct, max) {
    const set = new Set([correct]);
    while (set.size < 3) {
      set.add(randInt(1, max));
    }
    return shuffle([...set]);
  }

  function startMode(m) {
    mode = m;
    round = 0;
    locked = false;
    show("play");
    nextRound();
  }

  function nextRound() {
    locked = false;
    round += 1;
    const cfg = MODES[mode];
    answer = randInt(1, cfg.max);
    els.score.textContent = "⭐ " + stars + " · Round " + round;
    els.stage.innerHTML = "";
    els.choices.hidden = true;
    els.choices.innerHTML = "";
    els.btnFlash.hidden = false;
    els.prompt.textContent = "Tap Show animals, then watch carefully!";
    speak("Get ready.");
  }

  function flash() {
    if (locked) return;
    locked = true;
    els.btnFlash.hidden = true;
    els.prompt.textContent = "Look!";
    const animal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
    els.stage.innerHTML = "";
    for (let i = 0; i < answer; i++) {
      const d = document.createElement("div");
      d.className = "dot";
      d.textContent = animal;
      d.setAttribute("aria-hidden", "true");
      els.stage.appendChild(d);
    }
    const cfg = MODES[mode];
    setTimeout(() => {
      els.stage.innerHTML = "";
      els.prompt.textContent = "How many did you see?";
      speak("How many?");
      const opts = choiceOptions(answer, cfg.max);
      els.choices.innerHTML = "";
      opts.forEach((n) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "choice";
        b.textContent = String(n);
        b.addEventListener("click", () => pick(n, b));
        els.choices.appendChild(b);
      });
      els.choices.hidden = false;
      locked = false;
    }, cfg.flashMs);
  }

  function pick(n, btn) {
    if (locked) return;
    locked = true;
    const ok = n === answer;
    document.querySelectorAll(".choice").forEach((c) => {
      const v = parseInt(c.textContent, 10);
      if (v === answer) c.classList.add("correct");
      if (c === btn && !ok) c.classList.add("wrong");
      c.disabled = true;
    });
    if (ok) {
      stars += 1;
      saveStars();
      els.fbIcon.textContent = "⭐";
      els.fbTitle.textContent = "Yes!";
      els.fbMsg.textContent = "There were " + answer + ".";
      speak("Yes! " + answer);
    } else {
      els.fbIcon.textContent = "👀";
      els.fbTitle.textContent = "Almost";
      els.fbMsg.textContent = "There were " + answer + ". Try the next one!";
      speak("There were " + answer);
    }
    setTimeout(() => show("fb"), 450);
  }

  function initVoice() {
    try {
      if (window.TokenMooseVoice && typeof TokenMooseVoice.create === "function") {
        voice = TokenMooseVoice.create("subitising-safari");
        if (voice && voice.mountPicker) {
          const slot = document.getElementById("tm-voice-slot");
          if (slot) voice.mountPicker(slot);
        }
      }
    } catch (_) {}
  }

  document.querySelectorAll(".mode-card").forEach((btn) => {
    btn.addEventListener("click", () => startMode(btn.getAttribute("data-mode")));
  });
  els.btnFlash.addEventListener("click", flash);
  els.btnHome.addEventListener("click", () => show("home"));
  els.btnAgain.addEventListener("click", () => show("home"));
  els.btnNext.addEventListener("click", () => {
    show("play");
    nextRound();
  });
  els.btnHear.addEventListener("click", () => {
    speak(els.prompt.textContent || "How many animals?");
  });

  loadStars();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initVoice);
  } else {
    initVoice();
  }
})();
