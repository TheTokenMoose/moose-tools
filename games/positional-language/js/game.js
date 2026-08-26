(function () {
  const KEY = "token-moose-positional-language-stars";
  const PREPS = [
    { id: "on", label: "on the table", place: { bottom: "50%", left: "44%" } },
    { id: "under", label: "under the table", place: { bottom: "6%", left: "44%" } },
    { id: "next", label: "next to the box", place: { bottom: "42%", left: "62%" } },
    { id: "in", label: "in the box", place: { bottom: "44%", left: "20%" } },
    { id: "between", label: "between the box and the edge", place: { bottom: "42%", left: "48%" } },
  ];

  const $ = (id) => document.getElementById(id);
  let stars = 0;
  let answer = null;
  let promptText = "";
  let locked = false;
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

  function renderScene(prep) {
    const scene = $("scene");
    scene.innerHTML = "";
    const table = document.createElement("div");
    table.className = "table";
    scene.appendChild(table);
    const box = document.createElement("div");
    box.className = "box";
    box.style.bottom = "38%";
    box.style.left = "16%";
    box.textContent = "📦";
    scene.appendChild(box);
    const cat = document.createElement("div");
    cat.className = "cat";
    cat.textContent = "🐱";
    cat.style.bottom = prep.place.bottom;
    cat.style.left = prep.place.left;
    scene.appendChild(cat);
  }

  function nextRound() {
    locked = false;
    const correct = PREPS[Math.floor(Math.random() * PREPS.length)];
    answer = correct.id;
    promptText = "Where is the cat?";
    $("prompt").textContent = promptText;
    renderScene(correct);
    const opts = [correct];
    const others = PREPS.filter((p) => p.id !== correct.id);
    while (opts.length < 3 && others.length) {
      opts.push(others.splice(Math.floor(Math.random() * others.length), 1)[0]);
    }
    opts.sort(() => Math.random() - 0.5);
    const host = $("choices");
    host.innerHTML = "";
    opts.forEach((p) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "choice";
      b.textContent = p.label;
      b.addEventListener("click", () => pick(p.id));
      host.appendChild(b);
    });
  }

  function pick(id) {
    if (locked) return;
    locked = true;
    const ok = id === answer;
    if (ok) {
      stars += 1;
      saveStars();
      $("fb-icon").textContent = "⭐";
      $("fb-title").textContent = "Yes!";
      $("fb-msg").textContent = PREPS.find((p) => p.id === answer).label;
    } else {
      $("fb-icon").textContent = "🗺️";
      $("fb-title").textContent = "Almost";
      $("fb-msg").textContent = "It was " + PREPS.find((p) => p.id === answer).label;
    }
    show("fb");
  }

  $("btn-start").addEventListener("click", () => { show("play"); nextRound(); });
  $("btn-home").addEventListener("click", () => show("home"));
  $("btn-again").addEventListener("click", () => show("home"));
  $("btn-next").addEventListener("click", () => { show("play"); nextRound(); });
  $("btn-hear").addEventListener("click", () => speak(promptText));

  try {
    if (window.TokenMooseVoice) {
      voice = TokenMooseVoice.create("positional-language");
      const slot = document.getElementById("tm-voice-slot");
      if (voice && voice.mountPicker && slot) voice.mountPicker(slot);
    }
  } catch (_) {}
  loadStars();
})();
