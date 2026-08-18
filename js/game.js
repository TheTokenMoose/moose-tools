/**
 * Simple Machines Lab — reliable educational toys (no physics engine)
 * Choose → Interact → Observe → Learn → Continue
 */
(function () {
  const STORAGE_KEY = "token-moose-simple-machines-done";

  const MACHINES = [
    {
      id: "lever",
      icon: "⚖️",
      name: "Lever",
      blurb: "A bar that turns on a fulcrum",
      lesson: "A lever helps us lift or move things.",
    },
    {
      id: "wheel",
      icon: "🎡",
      name: "Wheel & Axle",
      blurb: "A big wheel turns a small axle",
      lesson: "A wheel helps things move and turn.",
    },
    {
      id: "pulley",
      icon: "🪝",
      name: "Pulley",
      blurb: "Pull down to lift up",
      lesson: "A pulley helps us lift things.",
    },
    {
      id: "plane",
      icon: "📐",
      name: "Inclined Plane",
      blurb: "A ramp makes lifting easier",
      lesson: "A ramp helps us move things up.",
    },
    {
      id: "wedge",
      icon: "🪓",
      name: "Wedge",
      blurb: "A sharp shape that splits things",
      lesson: "A wedge helps us split or cut.",
    },
    {
      id: "screw",
      icon: "🔩",
      name: "Screw",
      blurb: "A spiral that holds things",
      lesson: "A screw joins things together.",
    },
  ];

  const state = {
    current: null,
    completed: loadCompleted(),
    experimentDone: false,
  };

  const $ = (id) => document.getElementById(id);

  function loadCompleted() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      return new Set(Array.isArray(arr) ? arr : []);
    } catch (_) {
      return new Set();
    }
  }

  function saveCompleted() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...state.completed]));
    } catch (_) {}
  }

  function show(view) {
    ["view-lab", "view-experiment", "view-success", "view-expert"].forEach((id) => {
      const el = $(id);
      if (el) el.hidden = id !== view;
    });
  }

  function progressText() {
    return "Machines explored: " + state.completed.size + " / 6";
  }

  function updateProgressUI() {
    const p = $("lab-progress");
    if (p) p.textContent = progressText();
    document.querySelectorAll(".station").forEach((btn) => {
      const id = btn.dataset.id;
      btn.classList.toggle("is-done", state.completed.has(id));
    });
  }

  function buildLab() {
    const grid = $("station-grid");
    grid.innerHTML = "";
    MACHINES.forEach((m) => {
      const card = document.createElement("article");
      card.className = "station" + (state.completed.has(m.id) ? " is-done" : "");
      card.dataset.id = m.id;
      card.innerHTML =
        '<div class="station-icon" aria-hidden="true">' +
        m.icon +
        "</div>" +
        "<h2>" +
        m.name +
        "</h2>" +
        "<p>" +
        m.blurb +
        "</p>" +
        '<button type="button" class="btn btn-primary try-btn">Try it</button>' +
        (state.completed.has(m.id)
          ? '<span class="done-badge">✓ Explored</span>'
          : "");
      card.querySelector(".try-btn").addEventListener("click", () => openMachine(m.id));
      grid.appendChild(card);
    });
    updateProgressUI();
  }

  function openMachine(id) {
    const m = MACHINES.find((x) => x.id === id);
    if (!m) return;
    state.current = id;
    state.experimentDone = false;
    $("exp-title").textContent = m.icon + " " + m.name;
    $("exp-lesson").textContent = "";
    $("exp-stage").innerHTML = "";
    $("exp-hint").textContent = "";
    show("view-experiment");
    buildExperiment(id);
  }

  function markSuccess() {
    if (state.experimentDone) return;
    state.experimentDone = true;
    const m = MACHINES.find((x) => x.id === state.current);
    if (m) {
      state.completed.add(m.id);
      saveCompleted();
    }
    beep(true);
    $("success-title").textContent = (m ? m.icon + " " + m.name : "Nice!") + " — done!";
    $("success-lesson").textContent = m ? m.lesson : "";
    $("success-progress").textContent = progressText();
    show("view-success");
    const eb = document.getElementById("btn-show-expert");
    if (eb) eb.hidden = state.completed.size < 6;
  }

  function nextMachine() {
    const ids = MACHINES.map((m) => m.id);
    const i = ids.indexOf(state.current);
    const next = ids[(i + 1) % ids.length];
    openMachine(next);
  }

  function backToLab() {
    state.current = null;
    buildLab();
    show("view-lab");
    if (state.completed.size >= 6) {
      // optional banner
    }
  }

  function resetExperiment() {
    if (state.current) openMachine(state.current);
  }

  /* ---------- Experiments (DOM + pointer, no physics engine) ---------- */

  function buildExperiment(id) {
    const stage = $("exp-stage");
    const hint = $("exp-hint");
    stage.innerHTML = "";

    if (id === "lever") {
      hint.textContent = "Drag the LEFT handle down. Watch the load go UP.";
      stage.innerHTML =
        '<div class="toy lever-toy" id="lever-toy">' +
        '<div class="label load-label">LOAD</div>' +
        '<div class="crate" id="lever-crate">📦</div>' +
        '<div class="beam" id="lever-beam">' +
        '<div class="handle left" id="lever-handle">▼ PUSH</div>' +
        '<div class="handle right"></div>' +
        "</div>" +
        '<div class="fulcrum">▲ FULCRUM</div>' +
        '<div class="fulcrum-slider-wrap"><label>Move fulcrum <input type="range" id="lever-fulcrum" min="30" max="70" value="45"></label></div>' +
        "</div>";
      initLever();
    } else if (id === "wheel") {
      hint.textContent = "Drag around the big wheel — the bucket rises.";
      stage.innerHTML =
        '<div class="toy wheel-toy" id="wheel-toy">' +
        '<div class="wheel-disc" id="wheel-disc"><span>⟳</span></div>' +
        '<div class="axle-dot"></div>' +
        '<div class="rope" id="wheel-rope"></div>' +
        '<div class="bucket" id="wheel-bucket">🪣</div>' +
        '<p class="toy-caption">Turn the wheel → axle lifts the load</p>' +
        "</div>";
      initWheel();
    } else if (id === "pulley") {
      hint.textContent = "Drag the gold handle DOWN. The crate goes UP.";
      stage.innerHTML =
        '<div class="toy pulley-toy" id="pulley-toy">' +
        '<div class="pulley-wheel">◯</div>' +
        '<div class="rope-left" id="pulley-rope-l"></div>' +
        '<div class="rope-right" id="pulley-rope-r"></div>' +
        '<div class="crate" id="pulley-crate">📦</div>' +
        '<div class="handle" id="pulley-handle">✋ PULL</div>' +
        "</div>";
      initPulley();
    } else if (id === "plane") {
      hint.textContent = "Drag the box UP the ramp into the star zone.";
      stage.innerHTML =
        '<div class="toy plane-toy" id="plane-toy">' +
        '<div class="ramp" id="plane-ramp"></div>' +
        '<div class="box" id="plane-box">📦</div>' +
        '<div class="goal-star" id="plane-goal">⭐</div>' +
        '<p class="toy-caption">Ramp = less force, longer path</p>' +
        "</div>";
      initPlane();
    } else if (id === "wedge") {
      hint.textContent = "Drag the wedge under the log — or tap Drive.";
      stage.innerHTML =
        '<div class="toy wedge-toy" id="wedge-toy">' +
        '<div class="log" id="wedge-log">🪵</div>' +
        '<div class="wedge" id="wedge-blade">▶</div>' +
        '<button type="button" class="btn btn-primary" id="wedge-drive">Drive wedge →</button>' +
        "</div>";
      initWedge();
    } else if (id === "screw") {
      hint.textContent = "Tap Raise to turn the screw into the block.";
      stage.innerHTML =
        '<div class="toy screw-toy" id="screw-toy">' +
        '<div class="screw-head" id="screw-head">🔧</div>' +
        '<div class="screw-shaft" id="screw-shaft"></div>' +
        '<div class="block" id="screw-block">🧱</div>' +
        '<div class="btn-row">' +
        '<button type="button" class="btn btn-primary" id="screw-raise">Raise / Turn ↻</button>' +
        '<button type="button" class="btn btn-ghost" id="screw-lower">Lower ↺</button>' +
        "</div>" +
        '<p class="toy-caption">Turning moves the screw in or out</p>' +
        "</div>";
      initScrew();
    }
  }

  /* Pointer helpers */
  function onDrag(el, { onStart, onMove, onEnd }) {
    let active = false;
    const down = (e) => {
      active = true;
      el.setPointerCapture?.(e.pointerId);
      onStart && onStart(e);
      e.preventDefault();
    };
    const move = (e) => {
      if (!active) return;
      onMove && onMove(e);
      e.preventDefault();
    };
    const up = (e) => {
      if (!active) return;
      active = false;
      try {
        el.releasePointerCapture?.(e.pointerId);
      } catch (_) {}
      onEnd && onEnd(e);
    };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
  }

  function initLever() {
    const beam = $("lever-beam");
    const crate = $("lever-crate");
    const handle = $("lever-handle");
    const slider = $("lever-fulcrum");
    let angle = 0;
    const apply = () => {
      beam.style.transform = "rotate(" + angle + "deg)";
      const lift = Math.max(0, -angle * 2.2);
      crate.style.transform = "translateY(" + -lift + "px)";
      if (angle <= -18) markSuccess();
    };
    slider.addEventListener("input", () => {
      const pct = slider.value;
      beam.style.setProperty("--fulcrum", pct + "%");
      document.querySelector(".fulcrum").style.left = pct + "%";
    });
    onDrag(handle, {
      onMove: (e) => {
        const rect = beam.parentElement.getBoundingClientRect();
        const y = e.clientY - rect.top;
        const mid = rect.height * 0.55;
        angle = Math.max(-28, Math.min(12, (y - mid) / 6));
        apply();
      },
    });
    // also allow dragging beam
    onDrag(beam, {
      onMove: (e) => {
        const rect = beam.parentElement.getBoundingClientRect();
        const y = e.clientY - rect.top;
        const mid = rect.height * 0.55;
        angle = Math.max(-28, Math.min(12, (y - mid) / 6));
        apply();
      },
    });
  }

  function initWheel() {
    const disc = $("wheel-disc");
    const bucket = $("wheel-bucket");
    const rope = $("wheel-rope");
    let rot = 0;
    let lastX = null;
    onDrag(disc, {
      onStart: (e) => {
        lastX = e.clientX;
      },
      onMove: (e) => {
        if (lastX == null) lastX = e.clientX;
        const dx = e.clientX - lastX;
        lastX = e.clientX;
        rot += dx * 0.8;
        disc.style.transform = "rotate(" + rot + "deg)";
        const lift = Math.min(120, Math.max(0, rot / 3));
        bucket.style.transform = "translateY(" + -lift + "px)";
        rope.style.height = 80 + lift * 0.3 + "px";
        if (lift >= 90) markSuccess();
      },
      onEnd: () => {
        lastX = null;
      },
    });
  }

  function initPulley() {
    const handle = $("pulley-handle");
    const crate = $("pulley-crate");
    const ropeL = $("pulley-rope-l");
    const ropeR = $("pulley-rope-r");
    const toy = $("pulley-toy");
    let pull = 0;
    onDrag(handle, {
      onMove: (e) => {
        const rect = toy.getBoundingClientRect();
        const y = e.clientY - rect.top;
        const start = rect.height * 0.35;
        pull = Math.max(0, Math.min(140, y - start));
        handle.style.transform = "translateY(" + pull + "px)";
        crate.style.transform = "translateY(" + -pull * 0.85 + "px)";
        ropeR.style.height = 60 + pull + "px";
        ropeL.style.height = Math.max(20, 140 - pull * 0.85) + "px";
        if (pull >= 100) markSuccess();
      },
    });
  }

  function initPlane() {
    const box = $("plane-box");
    const toy = $("plane-toy");
    let t = 0; // 0 bottom → 1 top
    const place = () => {
      // along ramp
      const x = 8 + t * 72;
      const y = 68 - t * 48;
      box.style.left = x + "%";
      box.style.top = y + "%";
      if (t >= 0.88) markSuccess();
    };
    place();
    onDrag(box, {
      onMove: (e) => {
        const rect = toy.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        t = Math.max(0, Math.min(1, (x - 0.08) / 0.72));
        place();
      },
    });
  }

  function initWedge() {
    const blade = $("wedge-blade");
    const log = $("wedge-log");
    const toy = $("wedge-toy");
    let x = 8;
    const apply = () => {
      blade.style.left = x + "%";
      if (x >= 42) {
        log.classList.add("split");
        if (x >= 52) markSuccess();
      } else {
        log.classList.remove("split");
      }
    };
    apply();
    onDrag(blade, {
      onMove: (e) => {
        const rect = toy.getBoundingClientRect();
        x = Math.max(5, Math.min(60, ((e.clientX - rect.left) / rect.width) * 100));
        apply();
      },
    });
    $("wedge-drive").addEventListener("click", () => {
      const step = () => {
        if (x >= 55) {
          apply();
          return;
        }
        x += 3;
        apply();
        requestAnimationFrame(step);
      };
      step();
    });
  }

  function initScrew() {
    let turns = 0;
    const head = $("screw-head");
    const shaft = $("screw-shaft");
    const apply = () => {
      head.style.transform = "rotate(" + turns * 90 + "deg)";
      shaft.style.height = 20 + turns * 12 + "px";
      if (turns >= 5) markSuccess();
    };
    $("screw-raise").addEventListener("click", () => {
      turns = Math.min(8, turns + 1);
      apply();
      beep(true);
    });
    $("screw-lower").addEventListener("click", () => {
      turns = Math.max(0, turns - 1);
      apply();
    });
  }

  function beep(ok) {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = ok ? "sine" : "square";
      o.frequency.value = ok ? 660 : 180;
      g.gain.value = 0.05;
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      o.stop(ctx.currentTime + 0.16);
    } catch (_) {}
  }

  function showExpert() {
    $("expert-list").innerHTML = MACHINES.map(
      (m) =>
        "<li class='" +
        (state.completed.has(m.id) ? "done" : "") +
        "'>" +
        m.icon +
        " " +
        m.name +
        (state.completed.has(m.id) ? " ✓" : "") +
        "</li>"
    ).join("");
    show("view-expert");
  }

  document.addEventListener("DOMContentLoaded", () => {
    buildLab();
    show("view-lab");
    const eb = $("btn-show-expert");
    if (eb) eb.hidden = state.completed.size < 6;
    $("btn-back-lab").addEventListener("click", backToLab);
    $("btn-reset-exp").addEventListener("click", resetExperiment);
    $("btn-success-again").addEventListener("click", resetExperiment);
    $("btn-success-next").addEventListener("click", nextMachine);
    $("btn-success-lab").addEventListener("click", backToLab);
    $("btn-expert-lab").addEventListener("click", backToLab);
    $("btn-show-expert").addEventListener("click", showExpert);
  });
})();
