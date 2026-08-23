(function () {
  const KEY = "token-moose-sound-safari-stars";
  const ITEMS = [
    { letter: "S", sound: "sss", word: "sun", emoji: "☀️", phoneme: "/s/" },
    { letter: "M", sound: "mmm", word: "moon", emoji: "🌙", phoneme: "/m/" },
    { letter: "T", sound: "t", word: "tiger", emoji: "🐯", phoneme: "/t/" },
    { letter: "B", sound: "b", word: "ball", emoji: "⚽", phoneme: "/b/" },
    { letter: "P", sound: "p", word: "pig", emoji: "🐷", phoneme: "/p/" },
    { letter: "D", sound: "d", word: "dog", emoji: "🐶", phoneme: "/d/" },
    { letter: "F", sound: "fff", word: "fish", emoji: "🐟", phoneme: "/f/" },
    { letter: "L", sound: "lll", word: "leaf", emoji: "🍃", phoneme: "/l/" },
    { letter: "N", sound: "nnn", word: "nest", emoji: "🪺", phoneme: "/n/" },
    { letter: "R", sound: "rrr", word: "robot", emoji: "🤖", phoneme: "/r/" },
    { letter: "A", sound: "a", word: "apple", emoji: "🍎", phoneme: "/a/" },
    { letter: "I", sound: "i", word: "igloo", emoji: "🏠", phoneme: "/i/" },
  ];

  const $ = (id) => document.getElementById(id);
  let mode = "picture";
  let stars = 0;
  let answer = null;
  let locked = false;
  let voice = null;
  let hearLine = "";

  function loadStars() {
    try { stars = Math.max(0, parseInt(localStorage.getItem(KEY) || "0", 10) || 0); } catch (_) { stars = 0; }
    $("stars").textContent = "⭐ " + stars;
    $("score").textContent = "⭐ " + stars;
  }
  function saveStars() {
    try { localStorage.setItem(KEY, String(stars)); } catch (_) {}
    loadStars();
  }
  function speak(t) {
    if (!t) return;
    if (voice && voice.speak) return void voice.speak(t);
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(t);
      u.rate = 0.9;
      speechSynthesis.speak(u);
    } catch (_) {}
  }
  function show(s) {
    $("home").hidden = s !== "home";
    $("play").hidden = s !== "play";
    $("fb").hidden = s !== "fb";
  }

  function nextRound() {
    locked = false;
    const correct = ITEMS[Math.floor(Math.random() * ITEMS.length)];
    answer = correct.letter;
    hearLine = "The sound is " + correct.phoneme + ". " + correct.word;
    $("prompt").textContent =
      mode === "picture"
        ? "Which picture starts with " + correct.phoneme + "?"
        : "Which letter makes " + correct.phoneme + "?";

    const pool = ITEMS.filter((x) => x.letter !== correct.letter);
    const distractors = [];
    while (distractors.length < 2 && pool.length) {
      distractors.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
    }
    const opts = [correct, ...distractors].sort(() => Math.random() - 0.5);
    const host = $("choices");
    host.innerHTML = "";
    opts.forEach((item) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "choice";
      if (mode === "picture") {
        b.innerHTML = '<span class="big">' + item.emoji + "</span><span>" + item.word + "</span>";
      } else {
        b.innerHTML = '<span class="big">' + item.letter + "</span><span>" + item.phoneme + "</span>";
      }
      b.addEventListener("click", () => pick(item.letter, item));
      host.appendChild(b);
    });
  }

  function pick(letter, item) {
    if (locked) return;
    locked = true;
    const ok = letter === answer;
    if (ok) {
      stars += 1;
      saveStars();
      $("fb-icon").textContent = "⭐";
      $("fb-title").textContent = "Yes!";
      $("fb-msg").textContent = item.word + " starts with " + item.phoneme;
    } else {
      const right = ITEMS.find((x) => x.letter === answer);
      $("fb-icon").textContent = "🎧";
      $("fb-title").textContent = "Almost";
      $("fb-msg").textContent = "Listen again — " + (right ? right.word + " · " + right.phoneme : "");
    }
    show("fb");
  }

  document.querySelectorAll(".mode").forEach((b) => {
    b.addEventListener("click", () => {
      mode = b.getAttribute("data-mode");
      show("play");
      nextRound();
    });
  });
  $("btn-home").addEventListener("click", () => show("home"));
  $("btn-again").addEventListener("click", () => show("home"));
  $("btn-next").addEventListener("click", () => {
    show("play");
    nextRound();
  });
  $("btn-hear").addEventListener("click", () => speak(hearLine || "Listen for the sound"));

  try {
    if (window.TokenMooseVoice) {
      voice = TokenMooseVoice.create("sound-safari");
      const slot = document.getElementById("tm-voice-slot");
      if (voice && voice.mountPicker && slot) voice.mountPicker(slot);
    }
  } catch (_) {}
  loadStars();
})();
