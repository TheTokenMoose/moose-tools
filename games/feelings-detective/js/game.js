(function () {
  const KEY = "token-moose-feelings-detective-stars";
  const FEELINGS = [
    {
      id: "happy",
      word: "happy",
      emoji: "😊",
      scenes: [
        "You got a surprise sticker from your teacher.",
        "Your best friend is coming to play.",
        "It is sunny and you are at the park.",
      ],
    },
    {
      id: "sad",
      word: "sad",
      emoji: "😢",
      scenes: [
        "Your ice cream fell on the ground.",
        "A friend is moving to another city.",
        "You cannot find your favourite toy.",
      ],
    },
    {
      id: "angry",
      word: "angry",
      emoji: "😠",
      scenes: [
        "Someone knocked down the tower you built.",
        "A classmate took your pencil without asking.",
        "The game stopped right when it was your turn.",
      ],
    },
    {
      id: "scared",
      word: "scared",
      emoji: "😨",
      scenes: [
        "There is a loud thunder storm outside.",
        "You hear a strange noise in the dark.",
        "You are about to sing in front of the class.",
      ],
    },
    {
      id: "surprised",
      word: "surprised",
      emoji: "😲",
      scenes: [
        "A birthday cake appears for you at lunch.",
        "Your name is called for a special prize.",
        "A butterfly lands on your nose.",
      ],
    },
    {
      id: "calm",
      word: "calm",
      emoji: "😌",
      scenes: [
        "You are reading a quiet book on a soft cushion.",
        "You take three slow breaths after running.",
        "You listen to soft music with your eyes closed.",
      ],
    },
    {
      id: "proud",
      word: "proud",
      emoji: "😌",
      scenes: [
        "You finished a hard puzzle by yourself.",
        "You helped a younger student tie their shoes.",
        "Your drawing is on the classroom wall.",
      ],
    },
    {
      id: "worried",
      word: "worried",
      emoji: "😟",
      scenes: [
        "You forgot your homework at home.",
        "Your tooth is loose and wobbly.",
        "You are waiting for your grown-up after school.",
      ],
    },
  ];

  // distinct emoji for proud
  FEELINGS.find((f) => f.id === "proud").emoji = "🥳";

  const $ = (id) => document.getElementById(id);
  let mode = "face";
  let stars = 0;
  let answerId = null;
  let promptText = "";
  let locked = false;
  let voice = null;

  function loadStars() {
    try {
      stars = Math.max(0, parseInt(localStorage.getItem(KEY) || "0", 10) || 0);
    } catch (_) {
      stars = 0;
    }
    $("stars").textContent = "⭐ " + stars;
    $("score").textContent = "⭐ " + stars;
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
      speechSynthesis.cancel();
      speechSynthesis.speak(new SpeechSynthesisUtterance(t));
    } catch (_) {}
  }
  function show(s) {
    $("home").hidden = s !== "home";
    $("play").hidden = s !== "play";
    $("fb").hidden = s !== "fb";
  }
  function shuffle(a) {
    const x = a.slice();
    for (let i = x.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [x[i], x[j]] = [x[j], x[i]];
    }
    return x;
  }

  function nextRound() {
    locked = false;
    const useScene = mode === "scene" || (mode === "mix" && Math.random() < 0.5);
    const correct = FEELINGS[Math.floor(Math.random() * FEELINGS.length)];
    answerId = correct.id;
    const clue = $("clue");
    const opts = shuffle([correct, ...shuffle(FEELINGS.filter((f) => f.id !== correct.id)).slice(0, 2)]);

    if (useScene) {
      const scene = correct.scenes[Math.floor(Math.random() * correct.scenes.length)];
      promptText = "How might this person feel?";
      $("prompt").textContent = promptText;
      clue.className = "clue scene";
      clue.textContent = scene;
    } else {
      promptText = "What feeling is this face showing?";
      $("prompt").textContent = promptText;
      clue.className = "clue";
      clue.textContent = correct.emoji;
    }

    const host = $("choices");
    host.innerHTML = "";
    opts.forEach((f) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "choice";
      b.textContent = f.word;
      b.addEventListener("click", () => pick(f));
      host.appendChild(b);
    });
  }

  function pick(f) {
    if (locked) return;
    locked = true;
    const ok = f.id === answerId;
    const right = FEELINGS.find((x) => x.id === answerId);
    if (ok) {
      stars += 1;
      saveStars();
      $("fb-icon").textContent = right.emoji;
      $("fb-title").textContent = "Yes!";
      $("fb-msg").textContent = "That feeling is " + right.word + ".";
    } else {
      $("fb-icon").textContent = "🕵️";
      $("fb-title").textContent = "Keep looking";
      $("fb-msg").textContent = "A good clue points to " + right.word + ".";
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
  $("btn-hear").addEventListener("click", () => {
    const clue = $("clue").textContent;
    speak((promptText || "How do they feel?") + " " + (clue.length < 80 ? clue : clue));
  });

  try {
    if (window.TokenMooseVoice) {
      voice = TokenMooseVoice.create("feelings-detective");
      const slot = document.getElementById("tm-voice-slot");
      if (voice && voice.mountPicker && slot) voice.mountPicker(slot);
    }
  } catch (_) {}
  loadStars();
})();
