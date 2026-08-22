(function () {
  const KEY = "token-moose-number-bonds-bakery-stars";
  const els = {
    home: document.getElementById("home"),
    play: document.getElementById("play"),
    fb: document.getElementById("fb"),
    stars: document.getElementById("stars"),
    score: document.getElementById("score"),
    target: document.getElementById("target"),
    slotA: document.getElementById("slot-a"),
    slotB: document.getElementById("slot-b"),
    slotT: document.getElementById("slot-t"),
    cookies: document.getElementById("cookies"),
    prompt: document.getElementById("prompt"),
    fbIcon: document.getElementById("fb-icon"),
    fbTitle: document.getElementById("fb-title"),
    fbMsg: document.getElementById("fb-msg"),
  };

  let max = 10;
  let target = 10;
  let picks = [];
  let stars = 0;
  let locked = false;
  let voice = null;

  function loadStars() {
    try {
      stars = Math.max(0, parseInt(localStorage.getItem(KEY) || "0", 10) || 0);
    } catch (_) {
      stars = 0;
    }
    els.stars.textContent = "⭐ " + stars;
    els.score.textContent = "⭐ " + stars;
  }
  function saveStars() {
    try {
      localStorage.setItem(KEY, String(stars));
    } catch (_) {}
    loadStars();
  }

  function speak(t) {
    if (!t) return;
    if (voice && voice.speak) return void voice.speak(t);
    try {
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(t));
    } catch (_) {}
  }

  function show(which) {
    els.home.hidden = which !== "home";
    els.play.hidden = which !== "play";
    els.fb.hidden = which !== "fb";
  }

  function clearPicks() {
    picks = [];
    locked = false;
    els.slotA.textContent = "?";
    els.slotB.textContent = "?";
    els.slotA.classList.remove("filled");
    els.slotB.classList.remove("filled");
    els.cookies.querySelectorAll(".cookie").forEach((c) => c.classList.remove("is-picked"));
  }

  function nextRound() {
    clearPicks();
    target = 2 + Math.floor(Math.random() * (max - 1));
    if (target < 2) target = 2;
    els.target.textContent = String(target);
    els.slotT.textContent = String(target);
    els.prompt.innerHTML = "Make <strong>" + target + "</strong>";

    // cookie values: all ints 0..target that can appear
    const values = [];
    for (let i = 0; i <= target; i++) values.push(i);
    // ensure enough tiles
    while (values.length < 8) values.push(Math.floor(Math.random() * (target + 1)));
    // shuffle
    for (let i = values.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [values[i], values[j]] = [values[j], values[i]];
    }
    els.cookies.innerHTML = "";
    values.slice(0, 10).forEach((n) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "cookie";
      b.textContent = String(n);
      b.addEventListener("click", () => pick(n, b));
      els.cookies.appendChild(b);
    });
  }

  function pick(n, btn) {
    if (locked || picks.length >= 2 || btn.classList.contains("is-picked")) return;
    picks.push(n);
    btn.classList.add("is-picked");
    if (picks.length === 1) {
      els.slotA.textContent = String(n);
      els.slotA.classList.add("filled");
    } else {
      els.slotB.textContent = String(n);
      els.slotB.classList.add("filled");
      locked = true;
      const sum = picks[0] + picks[1];
      const ok = sum === target;
      setTimeout(() => {
        if (ok) {
          stars += 1;
          saveStars();
          els.fbIcon.textContent = "🍪";
          els.fbTitle.textContent = "Yum!";
          els.fbMsg.textContent = picks[0] + " + " + picks[1] + " = " + target;
        } else {
          els.fbIcon.textContent = "🥛";
          els.fbTitle.textContent = "Not quite";
          els.fbMsg.textContent = picks[0] + " + " + picks[1] + " = " + sum + " (need " + target + ")";
        }
        show("fb");
      }, 280);
    }
  }

  function initVoice() {
    try {
      if (window.TokenMooseVoice) {
        voice = TokenMooseVoice.create("number-bonds-bakery");
        const slot = document.getElementById("tm-voice-slot");
        if (voice && voice.mountPicker && slot) voice.mountPicker(slot);
      }
    } catch (_) {}
  }

  document.querySelectorAll(".lvl").forEach((b) => {
    b.addEventListener("click", () => {
      max = parseInt(b.getAttribute("data-max"), 10) || 10;
      show("play");
      nextRound();
    });
  });
  document.getElementById("btn-home").addEventListener("click", () => show("home"));
  document.getElementById("btn-again").addEventListener("click", () => show("home"));
  document.getElementById("btn-next").addEventListener("click", () => {
    show("play");
    nextRound();
  });
  document.getElementById("btn-clear").addEventListener("click", clearPicks);
  document.getElementById("btn-hear").addEventListener("click", () => {
    speak("Make " + target + ". Tap two numbers that add up.");
  });

  loadStars();
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initVoice);
  else initVoice();
})();
