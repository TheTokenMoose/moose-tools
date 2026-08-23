(function () {
  const KEY = "token-moose-time-traveller-stars";
  const $ = (id) => document.getElementById(id);
  let mode = "oclock";
  let stars = 0;
  let answerLabel = "";
  let locked = false;
  let voice = null;
  let hour = 3;
  let minute = 0;

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

  function labelTime(h, m) {
    const name = h === 0 ? 12 : h;
    if (m === 0) return name + " o'clock";
    return "half past " + name;
  }

  function drawClock(h, m) {
    const c = $("clock");
    const ctx = c.getContext("2d");
    const w = c.width;
    const cx = w / 2;
    const cy = w / 2;
    const r = w * 0.42;
    ctx.clearRect(0, 0, w, w);
    // face
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = "#fffef7";
    ctx.fill();
    ctx.lineWidth = 6;
    ctx.strokeStyle = "#9f1239";
    ctx.stroke();
    // ticks
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
      const x1 = cx + Math.cos(a) * (r * 0.82);
      const y1 = cy + Math.sin(a) * (r * 0.82);
      const x2 = cx + Math.cos(a) * (r * 0.92);
      const y2 = cy + Math.sin(a) * (r * 0.92);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineWidth = i % 3 === 0 ? 4 : 2;
      ctx.strokeStyle = "#334155";
      ctx.stroke();
    }
    // numbers
    ctx.fillStyle = "#0f172a";
    ctx.font = "bold 18px system-ui,sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (let n = 1; n <= 12; n++) {
      const a = (n / 12) * Math.PI * 2 - Math.PI / 2;
      ctx.fillText(String(n), cx + Math.cos(a) * (r * 0.7), cy + Math.sin(a) * (r * 0.7));
    }
    // hands — hour moves with minutes
    const minAngle = (m / 60) * Math.PI * 2 - Math.PI / 2;
    const hourAngle = ((h % 12) / 12) * Math.PI * 2 + (m / 60) * (Math.PI * 2 / 12) - Math.PI / 2;
    // hour
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(hourAngle) * r * 0.45, cy + Math.sin(hourAngle) * r * 0.45);
    ctx.lineWidth = 7;
    ctx.strokeStyle = "#0f172a";
    ctx.lineCap = "round";
    ctx.stroke();
    // minute
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(minAngle) * r * 0.65, cy + Math.sin(minAngle) * r * 0.65);
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#be123c";
    ctx.stroke();
    // centre
    ctx.beginPath();
    ctx.arc(cx, cy, 6, 0, Math.PI * 2);
    ctx.fillStyle = "#be123c";
    ctx.fill();
  }

  function nextRound() {
    locked = false;
    hour = 1 + Math.floor(Math.random() * 12);
    minute = mode === "oclock" ? 0 : Math.random() < 0.5 ? 0 : 30;
    // for half past, hour hand at half
    answerLabel = labelTime(hour, minute);
    drawClock(hour, minute);

    const opts = new Set([answerLabel]);
    while (opts.size < 3) {
      const h = 1 + Math.floor(Math.random() * 12);
      const m = mode === "oclock" ? 0 : Math.random() < 0.5 ? 0 : 30;
      opts.add(labelTime(h, m));
    }
    const list = [...opts].sort(() => Math.random() - 0.5);
    const host = $("choices");
    host.innerHTML = "";
    list.forEach((lab) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "choice";
      b.textContent = lab;
      b.addEventListener("click", () => pick(lab));
      host.appendChild(b);
    });
  }

  function pick(lab) {
    if (locked) return;
    locked = true;
    const ok = lab === answerLabel;
    if (ok) {
      stars += 1;
      saveStars();
      $("fb-icon").textContent = "⭐";
      $("fb-title").textContent = "Yes!";
      $("fb-msg").textContent = answerLabel;
    } else {
      $("fb-icon").textContent = "🕰️";
      $("fb-title").textContent = "Almost";
      $("fb-msg").textContent = "It was " + answerLabel;
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
  $("btn-hear").addEventListener("click", () => speak("What time is it?"));

  try {
    if (window.TokenMooseVoice) {
      voice = TokenMooseVoice.create("time-traveller");
      const slot = document.getElementById("tm-voice-slot");
      if (voice && voice.mountPicker && slot) voice.mountPicker(slot);
    }
  } catch (_) {}
  loadStars();
})();
