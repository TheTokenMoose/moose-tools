(function () {
  const KEY = "token-moose-measurement-monster-stars";
  const LENGTHS = [
    { id: "worm", label: "Worm", emoji: "🪱", units: 2 },
    { id: "pencil", label: "Pencil", emoji: "✏️", units: 4 },
    { id: "ruler", label: "Ruler", emoji: "📏", units: 6 },
    { id: "snake", label: "Snake", emoji: "🐍", units: 8 },
    { id: "bus", label: "Bus", emoji: "🚌", units: 10 },
  ];
  const HEIGHTS = [
    { id: "ant", label: "Ant", emoji: "🐜", units: 1 },
    { id: "cat", label: "Cat", emoji: "🐱", units: 3 },
    { id: "child", label: "Child", emoji: "🧒", units: 5 },
    { id: "tree", label: "Tree", emoji: "🌳", units: 8 },
    { id: "giraffe", label: "Giraffe", emoji: "🦒", units: 10 },
  ];
  const WEIGHTS = [
    { id: "feather", label: "Feather", emoji: "🪶", units: 1 },
    { id: "apple", label: "Apple", emoji: "🍎", units: 3 },
    { id: "book", label: "Book", emoji: "📚", units: 5 },
    { id: "rock", label: "Rock", emoji: "🪨", units: 7 },
    { id: "elephant", label: "Elephant", emoji: "🐘", units: 10 },
  ];

  const $ = (id) => document.getElementById(id);
  let mode = "length";
  let stars = 0;
  let answerId = null;
  let locked = false;
  let promptText = "";
  let voice = null;

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
    try { speechSynthesis.cancel(); speechSynthesis.speak(new SpeechSynthesisUtterance(t)); } catch (_) {}
  }
  function show(s) {
    $("home").hidden = s !== "home";
    $("play").hidden = s !== "play";
    $("fb").hidden = s !== "fb";
  }
  function poolFor(m) {
    if (m === "length") return LENGTHS;
    if (m === "height") return HEIGHTS;
    if (m === "weight") return WEIGHTS;
    const all = ["length", "height", "weight"];
    return poolFor(all[Math.floor(Math.random() * all.length)]);
  }
  function askKind(m) {
    if (m === "mix") m = ["length", "height", "weight"][Math.floor(Math.random() * 3)];
    if (m === "length") return Math.random() < 0.5 ? "longer" : "shorter";
    if (m === "height") return Math.random() < 0.5 ? "taller" : "shorter";
    return Math.random() < 0.5 ? "heavier" : "lighter";
  }

  function nextRound() {
    locked = false;
    const effective = mode === "mix" ? ["length", "height", "weight"][Math.floor(Math.random() * 3)] : mode;
    const pool = (effective === "length" ? LENGTHS : effective === "height" ? HEIGHTS : WEIGHTS).slice();
    // pick 2 distinct
    const a = pool.splice(Math.floor(Math.random() * pool.length), 1)[0];
    const b = pool.splice(Math.floor(Math.random() * pool.length), 1)[0];
    const pair = [a, b];
    const kind = askKind(effective);
    let correct;
    if (kind === "longer" || kind === "taller" || kind === "heavier") {
      correct = pair[0].units >= pair[1].units ? pair[0] : pair[1];
    } else {
      correct = pair[0].units <= pair[1].units ? pair[0] : pair[1];
    }
    // avoid ties
    if (pair[0].units === pair[1].units) return nextRound();
    answerId = correct.id;
    promptText = "Which is " + kind + "?";
    $("prompt").textContent = promptText;
    const stage = $("stage");
    stage.innerHTML = "";
    pair.sort(() => Math.random() - 0.5).forEach((item) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "item";
      btn.dataset.id = item.id;
      const vis = document.createElement("div");
      vis.className = "vis";
      if (effective === "weight") {
        const w = document.createElement("div");
        w.className = "weight-vis";
        w.textContent = item.emoji;
        vis.appendChild(w);
      } else {
        const bar = document.createElement("div");
        bar.className = "bar-vis";
        bar.style.height = (18 + item.units * 8) + "px";
        vis.appendChild(bar);
        const em = document.createElement("div");
        em.textContent = item.emoji;
        em.style.fontSize = "1.4rem";
        vis.appendChild(em);
      }
      btn.appendChild(vis);
      const lab = document.createElement("div");
      lab.className = "label";
      lab.textContent = item.label;
      btn.appendChild(lab);
      btn.addEventListener("click", () => pick(item.id));
      stage.appendChild(btn);
    });
  }

  function pick(id) {
    if (locked) return;
    locked = true;
    const ok = id === answerId;
    if (ok) {
      stars += 1;
      saveStars();
      $("fb-icon").textContent = "⭐";
      $("fb-title").textContent = "Yes!";
      $("fb-msg").textContent = "Great comparing!";
    } else {
      $("fb-icon").textContent = "👾";
      $("fb-title").textContent = "Try again next time";
      $("fb-msg").textContent = "Look carefully at the sizes.";
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
  $("btn-next").addEventListener("click", () => { show("play"); nextRound(); });
  $("btn-hear").addEventListener("click", () => speak(promptText || "Which one?"));

  try {
    if (window.TokenMooseVoice) {
      voice = TokenMooseVoice.create("measurement-monster");
      const slot = document.getElementById("tm-voice-slot");
      if (voice && voice.mountPicker && slot) voice.mountPicker(slot);
    }
  } catch (_) {}
  loadStars();
})();
