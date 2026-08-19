/**
 * Little Science Lab — interactive K science experiments
 */
(function () {
  "use strict";

  const DONE_KEY = "token-moose-little-science-done";
  const STAR_KEY = "token-moose-little-science-stars";

  const LABS = [
    { id: "sink", icon: "🛁", name: "Sink or Float", blurb: "Drop objects in water" },
    { id: "magnet", icon: "🧲", name: "Magnet Lab", blurb: "What sticks?" },
    { id: "shadow", icon: "🔦", name: "Shadow Lab", blurb: "Move the light" },
    { id: "matter", icon: "❄️", name: "States of Matter", blurb: "Solid · liquid · gas" },
    { id: "plant", icon: "🌱", name: "Plant Lab", blurb: "Help a plant grow" },
    { id: "sound", icon: "🥁", name: "Sound Lab", blurb: "Make vibrations" },
  ];

  let current = null;
  let done = loadDone();
  let stars = loadStars();
  let voice = null;
  let shadowState = { lightX: 50, objX: 50 };
  let plantState = { water: 0, light: 0, grown: false };
  let matterState = { temp: 1 }; // 0 ice, 1 water, 2 steam

  const $ = (id) => document.getElementById(id);

  function loadDone() {
    try {
      const a = JSON.parse(localStorage.getItem(DONE_KEY) || "[]");
      return new Set(Array.isArray(a) ? a : []);
    } catch (_) {
      return new Set();
    }
  }
  function saveDone() {
    try {
      localStorage.setItem(DONE_KEY, JSON.stringify([...done]));
    } catch (_) {}
  }
  function loadStars() {
    try {
      return Number(localStorage.getItem(STAR_KEY)) || 0;
    } catch (_) {
      return 0;
    }
  }
  function saveStars() {
    try {
      localStorage.setItem(STAR_KEY, String(stars));
    } catch (_) {}
  }

  function show(lab) {
    $("view-hub").hidden = !lab;
    $("view-lab").hidden = lab;
  }

  function speak(t) {
    try {
      if (voice) voice.speak(t);
      else if (window.speechSynthesis) {
        const u = new SpeechSynthesisUtterance(t);
        u.rate = 0.95;
        speechSynthesis.cancel();
        speechSynthesis.speak(u);
      }
    } catch (_) {}
  }

  function complete(id, msg) {
    if (!done.has(id)) {
      done.add(id);
      stars += 1;
      saveDone();
      saveStars();
    }
    $("explain").innerHTML = "<strong>You did it!</strong> " + msg;
    $("badge-done").hidden = false;
    speak(msg);
    buildHub();
  }

  function openLab(id) {
    current = id;
    const meta = LABS.find((l) => l.id === id);
    $("lab-title").textContent = (meta ? meta.icon + " " + meta.name : id);
    $("badge-done").hidden = !done.has(id);
    $("explain").textContent = "";
    show(false);
    const stage = $("stage");
    stage.innerHTML = "";
    stage.className = "stage lab-" + id;
    if (id === "sink") setupSink(stage);
    else if (id === "magnet") setupMagnet(stage);
    else if (id === "shadow") setupShadow(stage);
    else if (id === "matter") setupMatter(stage);
    else if (id === "plant") setupPlant(stage);
    else if (id === "sound") setupSound(stage);
  }

  /* ---- 1 SINK / FLOAT ---- */
  function setupSink(stage) {
    const items = [
      { name: "rock", emoji: "🪨", sinks: true },
      { name: "leaf", emoji: "🍃", sinks: false },
      { name: "key", emoji: "🔑", sinks: true },
      { name: "cork", emoji: "🪵", sinks: false },
      { name: "apple", emoji: "🍎", sinks: false },
      { name: "coin", emoji: "🪙", sinks: true },
    ];
    let tested = new Set();
    stage.innerHTML =
      '<p class="obj">Drag or tap an object into the tank. Does it sink or float?</p>' +
      '<div class="tank"><div class="water"></div><div class="tank-items" id="tank-items"></div></div>' +
      '<div class="item-row" id="item-row"></div>';
    speak("Drop objects in the water. Some sink. Some float.");
    const row = $("item-row");
    items.forEach((it) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "sci-item";
      b.textContent = it.emoji + " " + it.name;
      b.draggable = true;
      const drop = () => {
        const hold = $("tank-items");
        const el = document.createElement("div");
        el.className = "in-tank " + (it.sinks ? "sink" : "float");
        el.textContent = it.emoji;
        hold.appendChild(el);
        tested.add(it.name);
        $("explain").textContent = it.sinks
          ? it.name + " sinks — it is denser than water."
          : it.name + " floats — it is less dense than water.";
        speak($("explain").textContent);
        if (tested.size >= 4) {
          complete("sink", "Heavy things often sink. Light or airy things often float.");
        }
      };
      b.addEventListener("click", drop);
      b.addEventListener("dragstart", (e) => e.dataTransfer.setData("text/plain", it.name));
      row.appendChild(b);
    });
    stage.querySelector(".tank").addEventListener("dragover", (e) => e.preventDefault());
    stage.querySelector(".tank").addEventListener("drop", (e) => {
      e.preventDefault();
      const name = e.dataTransfer.getData("text/plain");
      const it = items.find((x) => x.name === name);
      if (it) {
        const hold = $("tank-items");
        const el = document.createElement("div");
        el.className = "in-tank " + (it.sinks ? "sink" : "float");
        el.textContent = it.emoji;
        hold.appendChild(el);
        tested.add(it.name);
        $("explain").textContent = it.sinks
          ? it.name + " sinks — denser than water."
          : it.name + " floats — less dense than water.";
        if (tested.size >= 4) complete("sink", "You tested sink and float!");
      }
    });
  }

  /* ---- 2 MAGNET ---- */
  function setupMagnet(stage) {
    const objs = [
      { name: "paperclip", emoji: "📎", mag: true },
      { name: "nail", emoji: "钉子", mag: true },
      { name: "key", emoji: "🔑", mag: true },
      { name: "wood", emoji: "🪵", mag: false },
      { name: "plastic", emoji: "🧩", mag: false },
      { name: "coin", emoji: "🪙", mag: false },
      { name: "screw", emoji: "🔩", mag: true },
      { name: "eraser", emoji: "🧹", mag: false },
    ];
    // fix nail emoji
    objs[1].emoji = "🔩";
    let tested = new Set();
    stage.innerHTML =
      '<p class="obj">Drag the magnet near objects. What sticks?</p>' +
      '<div class="mag-area">' +
      '<div class="magnet" id="magnet" draggable="true">🧲</div>' +
      '<div class="mag-grid" id="mag-grid"></div></div>';
    speak("Move the magnet. Metal iron things stick.");
    const grid = $("mag-grid");
    objs.forEach((o) => {
      const cell = document.createElement("div");
      cell.className = "mag-cell";
      cell.dataset.mag = o.mag ? "1" : "0";
      cell.dataset.name = o.name;
      cell.innerHTML = '<span class="em">' + o.emoji + "</span><span>" + o.name + "</span>";
      grid.appendChild(cell);
    });
    const mag = $("magnet");
    let dragging = false;
    function testNear(x, y) {
      document.querySelectorAll(".mag-cell").forEach((cell) => {
        const r = cell.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dist = Math.hypot(x - cx, y - cy);
        if (dist < 70) {
          tested.add(cell.dataset.name);
          if (cell.dataset.mag === "1") {
            cell.classList.add("stuck");
            $("explain").textContent = cell.dataset.name + " is magnetic — it sticks!";
          } else {
            cell.classList.remove("stuck");
            $("explain").textContent = cell.dataset.name + " is not magnetic.";
          }
        }
      });
      if (tested.size >= 5) {
        complete("magnet", "Magnets pull some metals, like iron. Not everything is magnetic.");
      }
    }
    mag.addEventListener("pointerdown", (e) => {
      dragging = true;
      mag.setPointerCapture(e.pointerId);
    });
    mag.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      const area = stage.querySelector(".mag-area").getBoundingClientRect();
      mag.style.position = "absolute";
      mag.style.left = e.clientX - area.left - 28 + "px";
      mag.style.top = e.clientY - area.top - 28 + "px";
      testNear(e.clientX, e.clientY);
    });
    mag.addEventListener("pointerup", () => {
      dragging = false;
    });
    // also tap object
    grid.addEventListener("click", (e) => {
      const cell = e.target.closest(".mag-cell");
      if (!cell) return;
      tested.add(cell.dataset.name);
      if (cell.dataset.mag === "1") {
        cell.classList.add("stuck");
        $("explain").textContent = cell.dataset.name + " is magnetic!";
        speak($("explain").textContent);
      } else {
        $("explain").textContent = cell.dataset.name + " does not stick.";
        speak($("explain").textContent);
      }
      if (tested.size >= 5) complete("magnet", "Magnets attract iron and steel.");
    });
  }

  /* ---- 3 SHADOW ---- */
  function setupShadow(stage) {
    shadowState = { lightX: 20, objX: 50 };
    stage.innerHTML =
      '<p class="obj">Drag the light 🔦 and the toy. Watch the shadow change.</p>' +
      '<div class="shadow-stage" id="shadow-stage">' +
      '<div class="light" id="light">🔦</div>' +
      '<div class="toy" id="toy">🧸</div>' +
      '<div class="shadow-blob" id="shadow-blob"></div>' +
      '<div class="ground"></div></div>' +
      '<p class="shadow-readout" id="shadow-readout"></p>';
    speak("Move the light. The shadow moves and changes size.");
    const stageEl = $("shadow-stage");
    const light = $("light");
    const toy = $("toy");
    const blob = $("shadow-blob");

    function update() {
      const w = stageEl.clientWidth;
      const lightPx = (shadowState.lightX / 100) * w;
      const objPx = (shadowState.objX / 100) * w;
      light.style.left = shadowState.lightX + "%";
      toy.style.left = shadowState.objX + "%";
      // shadow on ground: opposite side from light relative to object
      const dx = objPx - lightPx;
      const dist = Math.abs(dx) + 40;
      const scale = Math.min(2.5, 0.6 + dist / 200);
      const shadowX = shadowState.objX + (dx > 0 ? 1 : -1) * Math.min(25, dist / 15);
      blob.style.left = shadowX + "%";
      blob.style.transform = "translateX(-50%) scaleX(" + scale + ")";
      blob.style.opacity = String(Math.min(0.7, 0.35 + dist / 400));
      $("shadow-readout").textContent =
        "Light farther → bigger shadow. Light moves → shadow moves.";
      if (!shadowState._done && (Math.abs(shadowState.lightX - 20) > 25 || Math.abs(shadowState.objX - 50) > 20)) {
        shadowState._done = true;
        complete("shadow", "Shadows form when light is blocked. Move the light and the shadow changes.");
      }
    }
    function drag(el, key) {
      let on = false;
      el.addEventListener("pointerdown", (e) => {
        on = true;
        el.setPointerCapture(e.pointerId);
      });
      el.addEventListener("pointermove", (e) => {
        if (!on) return;
        const r = stageEl.getBoundingClientRect();
        const pct = ((e.clientX - r.left) / r.width) * 100;
        shadowState[key] = Math.max(5, Math.min(95, pct));
        update();
      });
      el.addEventListener("pointerup", () => {
        on = false;
      });
    }
    drag(light, "lightX");
    drag(toy, "objX");
    update();
  }

  /* ---- 4 STATES OF MATTER ---- */
  function setupMatter(stage) {
    matterState = { temp: 1 };
    stage.innerHTML =
      '<p class="obj">Heat or cool the water. Watch solid, liquid, and gas.</p>' +
      '<div class="matter-box">' +
      '<div class="beaker" id="beaker"><div class="content" id="matter-content"></div></div>' +
      '<div class="temp-label" id="temp-label">Liquid water</div></div>' +
      '<div class="btn-row">' +
      '<button type="button" class="btn btn-primary" id="btn-cool">❄️ Cool</button>' +
      '<button type="button" class="btn btn-primary" id="btn-heat">🔥 Heat</button></div>';
    speak("Cool water to make ice. Heat water to make steam.");
    const paint = () => {
      const c = $("matter-content");
      const lab = $("temp-label");
      c.className = "content t" + matterState.temp;
      if (matterState.temp === 0) {
        c.textContent = "🧊";
        lab.textContent = "Solid — ice";
        $("explain").textContent = "Cold enough: water freezes into solid ice.";
      } else if (matterState.temp === 1) {
        c.textContent = "💧";
        lab.textContent = "Liquid — water";
        $("explain").textContent = "At room warmth, water is a liquid.";
      } else {
        c.textContent = "💨";
        lab.textContent = "Gas — steam";
        $("explain").textContent = "Hot enough: water boils and becomes gas (steam).";
      }
    };
    paint();
    $("btn-cool").onclick = () => {
      matterState.temp = Math.max(0, matterState.temp - 1);
      paint();
      speak($("temp-label").textContent);
      if (matterState.temp === 0) complete("matter", "Water can be solid, liquid, or gas when temperature changes.");
    };
    $("btn-heat").onclick = () => {
      matterState.temp = Math.min(2, matterState.temp + 1);
      paint();
      speak($("temp-label").textContent);
      if (matterState.temp === 2) complete("matter", "Heating and cooling change the state of water.");
    };
  }

  /* ---- 5 PLANT ---- */
  function setupPlant(stage) {
    plantState = { water: 0, light: 0, grown: false };
    stage.innerHTML =
      '<p class="obj">Give the seed water and light. Watch it grow.</p>' +
      '<div class="plant-box">' +
      '<div class="sky" id="sky"></div>' +
      '<div class="plant" id="plant">🌱</div>' +
      '<div class="soil">🟫</div></div>' +
      '<div class="meters"><span>Water: <b id="m-water">0</b></span><span>Light: <b id="m-light">0</b></span></div>' +
      '<div class="btn-row">' +
      '<button type="button" class="btn btn-primary" id="btn-water">💧 Water</button>' +
      '<button type="button" class="btn btn-primary" id="btn-sun">☀️ Sunshine</button></div>';
    speak("Plants need water and light to grow.");
    function paint() {
      $("m-water").textContent = plantState.water;
      $("m-light").textContent = plantState.light;
      const p = $("plant");
      const need = plantState.water + plantState.light;
      if (need >= 6 && plantState.water >= 2 && plantState.light >= 2) {
        p.textContent = "🌳";
        p.style.fontSize = "4rem";
        if (!plantState.grown) {
          plantState.grown = true;
          complete("plant", "Plants need water and light to grow big and strong.");
        }
      } else if (need >= 3) {
        p.textContent = "🌿";
        p.style.fontSize = "2.8rem";
      } else {
        p.textContent = "🌱";
        p.style.fontSize = "2rem";
      }
      $("sky").style.background =
        plantState.light > 0
          ? "linear-gradient(180deg,#7dd3fc,#fef9c3)"
          : "linear-gradient(180deg,#64748b,#94a3b8)";
    }
    $("btn-water").onclick = () => {
      plantState.water = Math.min(5, plantState.water + 1);
      paint();
      speak("Water!");
    };
    $("btn-sun").onclick = () => {
      plantState.light = Math.min(5, plantState.light + 1);
      paint();
      speak("Sunshine!");
    };
    paint();
  }

  /* ---- 6 SOUND ---- */
  function setupSound(stage) {
    stage.innerHTML =
      '<p class="obj">Tap a drum. Watch the waves. Sound is vibration!</p>' +
      '<div class="sound-box">' +
      '<button type="button" class="drum" id="drum">🥁</button>' +
      '<canvas id="wave" width="320" height="80"></canvas></div>' +
      '<div class="btn-row">' +
      '<button type="button" class="btn btn-ghost" id="btn-soft">Soft</button>' +
      '<button type="button" class="btn btn-primary" id="btn-loud">Loud</button></div>';
    speak("Tap the drum. Sound travels in waves.");
    let hits = 0;
    let amp = 1;
    const canvas = $("wave");
    const ctx = canvas.getContext("2d");
    let phase = 0;
    let active = 0;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.strokeStyle = "#0ea5e9";
      ctx.lineWidth = 3;
      for (let x = 0; x < canvas.width; x++) {
        const y =
          canvas.height / 2 +
          Math.sin((x + phase) * 0.08) * 20 * active * amp;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      phase += 4 * amp;
      active *= 0.96;
      if (active > 0.02) requestAnimationFrame(draw);
      else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    function hit(loud) {
      amp = loud ? 1.4 : 0.6;
      active = 1;
      hits++;
      // web audio click
      try {
        const ac = new (window.AudioContext || window.webkitAudioContext)();
        const o = ac.createOscillator();
        const g = ac.createGain();
        o.frequency.value = loud ? 180 : 120;
        o.type = "triangle";
        g.gain.value = loud ? 0.15 : 0.06;
        o.connect(g);
        g.connect(ac.destination);
        o.start();
        g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.3);
        o.stop(ac.currentTime + 0.32);
      } catch (_) {}
      $("drum").classList.add("hit");
      setTimeout(() => $("drum").classList.remove("hit"), 200);
      $("explain").textContent = loud
        ? "Loud hit → bigger vibration waves."
        : "Soft hit → smaller waves.";
      draw();
      if (hits >= 3) complete("sound", "Sound is made by vibrations that travel as waves.");
    }
    $("drum").onclick = () => hit(true);
    $("btn-loud").onclick = () => hit(true);
    $("btn-soft").onclick = () => hit(false);
  }

  function buildHub() {
    const grid = $("lab-grid");
    grid.innerHTML = "";
    LABS.forEach((l) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "lab-card" + (done.has(l.id) ? " is-done" : "");
      b.innerHTML =
        '<span class="lab-icon">' +
        l.icon +
        '</span><span class="lab-name">' +
        l.name +
        '</span><span class="lab-blurb">' +
        l.blurb +
        "</span>" +
        (done.has(l.id) ? '<span class="lab-check">✓</span>' : "");
      b.addEventListener("click", () => openLab(l.id));
      grid.appendChild(b);
    });
    $("hub-stars").textContent = "⭐ " + stars + " · " + done.size + "/6 labs";
  }

  document.addEventListener("DOMContentLoaded", () => {
    buildHub();
    show(true);

    if (window.TokenMooseVoice) {
      voice = TokenMooseVoice.create("little-science-lab");
      const slot = $("voice-slot");
      if (slot) voice.mountPicker(slot);
    }

    $("btn-back").addEventListener("click", () => {
      current = null;
      show(true);
      buildHub();
    });
    $("btn-reset").addEventListener("click", () => {
      if (current) openLab(current);
    });
    $("btn-hear").addEventListener("click", () => {
      const t = $("explain").textContent || $("lab-title").textContent;
      if (t) speak(t);
    });
  });
})();
