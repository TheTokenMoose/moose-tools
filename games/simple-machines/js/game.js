/**
 * Simple Machines Lab — aggressive second-pass
 * Intro → Challenge → Interact → Result → Feedback → Next
 * Controlled DOM/pointer toys — no physics engine
 */
(function () {
  "use strict";

  const STORAGE = "token-moose-simple-machines-done";

  const MACHINES = {
    lever: {
      icon: "⚖️",
      name: "Lever",
      intro: "A lever helps us lift or move things.",
      challenge: "Lift the box! Drag the big handle down.",
      success: "You lifted it! A lever helps us move heavy things.",
      order: 0,
    },
    pulley: {
      icon: "🪝",
      name: "Pulley",
      intro: "A pulley helps us lift things.",
      challenge: "Pull the rope down! Drag the gold handle down.",
      success: "Great pulling! A pulley helps us lift things.",
      order: 1,
    },
    plane: {
      icon: "📐",
      name: "Inclined Plane",
      intro: "A ramp helps us move things up.",
      challenge: "Push the box to the top of the ramp!",
      success: "You did it! A ramp helps us move things up.",
      order: 2,
    },
    wheel: {
      icon: "🎡",
      name: "Wheel & Axle",
      intro: "A wheel helps things move.",
      challenge: "Turn the big wheel! Drag around it.",
      success: "The wheel helped the cart move!",
      order: 3,
    },
    wedge: {
      icon: "🪓",
      name: "Wedge",
      intro: "A wedge helps us split or cut.",
      challenge: "Push the wedge into the log!",
      success: "You did it! A wedge can split things apart.",
      order: 4,
    },
    screw: {
      icon: "🔩",
      name: "Screw",
      intro: "A screw helps join things together.",
      challenge: "Turn the screw! Tap Raise or drag the handle.",
      success: "Great turning! A screw helps join things together.",
      order: 5,
    },
  };

  const ORDER = ["lever", "pulley", "plane", "wheel", "wedge", "screw"];

  const state = {
    current: null,
    completed: loadSet(),
    done: false,
    raf: null,
    drag: null,
  };

  const $ = (id) => document.getElementById(id);

  function loadSet() {
    try {
      const a = JSON.parse(localStorage.getItem(STORAGE) || "[]");
      return new Set(Array.isArray(a) ? a : []);
    } catch (_) {
      return new Set();
    }
  }
  function saveSet() {
    try {
      localStorage.setItem(STORAGE, JSON.stringify([...state.completed]));
    } catch (_) {}
  }

  function show(id) {
    ["view-lab", "view-play", "view-success", "view-expert"].forEach((v) => {
      const el = $(v);
      if (el) el.hidden = v !== id;
    });
  }

  function cancelDrag() {
    state.drag = null;
  }
  function cancelRaf() {
    if (state.raf) {
      cancelAnimationFrame(state.raf);
      state.raf = null;
    }
  }
  function hardResetInteraction() {
    cancelDrag();
    cancelRaf();
    state.done = false;
  }

  function progressLabel() {
    return state.completed.size + " / 6 machines complete";
  }

  function speak(text) {
    try {
      if (window.MooseTTS && typeof window.MooseTTS.speak === "function") {
        window.MooseTTS.speak(text);
        return;
      }
      if (window.TokenMooseVoice) {
        /* optional legacy */
      }
      if (window.speechSynthesis) {
        const u = new SpeechSynthesisUtterance(text);
        u.rate = 0.95;
        speechSynthesis.cancel();
        speechSynthesis.speak(u);
      }
    } catch (_) {}
  }

  function beep(ok) {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = ok ? "sine" : "triangle";
      o.frequency.value = ok ? 680 : 220;
      g.gain.value = 0.05;
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
      o.stop(ctx.currentTime + 0.2);
    } catch (_) {}
  }

  function burstStars(host) {
    if (!host) return;
    for (let i = 0; i < 12; i++) {
      const s = document.createElement("span");
      s.className = "star-burst";
      s.textContent = "⭐";
      s.style.left = 20 + Math.random() * 60 + "%";
      s.style.top = 20 + Math.random() * 40 + "%";
      s.style.animationDelay = Math.random() * 0.25 + "s";
      host.appendChild(s);
      setTimeout(() => s.remove(), 1200);
    }
  }

  /* ---------- LAB ---------- */
  function renderLab() {
    const grid = $("station-grid");
    grid.innerHTML = "";
    ORDER.forEach((id) => {
      const m = MACHINES[id];
      const card = document.createElement("button");
      card.type = "button";
      card.className = "station" + (state.completed.has(id) ? " is-done" : "");
      card.innerHTML =
        '<span class="st-icon">' +
        m.icon +
        '</span><span class="st-name">' +
        m.name +
        "</span>" +
        (state.completed.has(id)
          ? '<span class="st-check">✓</span>'
          : '<span class="st-go">Try it</span>');
      card.addEventListener("click", () => enterMachine(id));
      grid.appendChild(card);
    });
    $("lab-progress").textContent = progressLabel();
    $("btn-expert").hidden = state.completed.size < 6;
  }

  /* ---------- ENTER / EXIT ---------- */
  function enterMachine(id) {
    hardResetInteraction();
    state.current = id;
    const m = MACHINES[id];
    $("play-icon").textContent = m.icon;
    $("play-name").textContent = m.name;
    $("play-intro").textContent = m.intro;
    $("play-challenge").textContent = m.challenge;
    $("play-stage").innerHTML = "";
    $("play-stage").className = "play-stage";
    show("view-play");
    speak(m.intro + " " + m.challenge);
    buildScene(id);
  }

  function exitToLab() {
    hardResetInteraction();
    state.current = null;
    try {
      speechSynthesis && speechSynthesis.cancel();
    } catch (_) {}
    renderLab();
    show("view-lab");
  }

  function resetMachine() {
    if (!state.current) return;
    enterMachine(state.current);
  }

  function completeMachine() {
    if (state.done || !state.current) return;
    state.done = true;
    cancelDrag();
    const m = MACHINES[state.current];
    state.completed.add(state.current);
    saveSet();
    beep(true);
    burstStars($("play-stage"));
    $("success-icon").textContent = m.icon;
    $("success-title").textContent = "Great job!";
    $("success-msg").textContent = m.success;
    $("success-progress").textContent = progressLabel();
    speak(m.success);
    // short delay so kids see the motion finish
    setTimeout(() => show("view-success"), 450);
  }

  function nextMachine() {
    const i = ORDER.indexOf(state.current);
    const next = ORDER[(i + 1) % ORDER.length];
    enterMachine(next);
  }

  function showExpert() {
    $("expert-list").innerHTML = ORDER.map((id) => {
      const m = MACHINES[id];
      const ok = state.completed.has(id);
      return (
        "<li class='" +
        (ok ? "ok" : "") +
        "'>" +
        m.icon +
        " " +
        m.name +
        (ok ? " ✓" : "") +
        "</li>"
      );
    }).join("");
    show("view-expert");
  }

  /* ---------- POINTER ENGINE ---------- */
  function bindDrag(el, handlers) {
    const onDown = (e) => {
      if (state.done) return;
      el.classList.add("is-grabbed");
      try {
        el.setPointerCapture(e.pointerId);
      } catch (_) {}
      state.drag = { id: e.pointerId, el };
      handlers.down && handlers.down(e);
      e.preventDefault();
    };
    const onMove = (e) => {
      if (!state.drag || state.drag.id !== e.pointerId) return;
      handlers.move && handlers.move(e);
      e.preventDefault();
    };
    const onUp = (e) => {
      if (!state.drag || state.drag.id !== e.pointerId) return;
      el.classList.remove("is-grabbed");
      try {
        el.releasePointerCapture(e.pointerId);
      } catch (_) {}
      state.drag = null;
      handlers.up && handlers.up(e);
    };
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
  }

  /* ---------- SCENES ---------- */
  function buildScene(id) {
    const stage = $("play-stage");
    if (id === "lever") sceneLever(stage);
    else if (id === "pulley") scenePulley(stage);
    else if (id === "plane") scenePlane(stage);
    else if (id === "wheel") sceneWheel(stage);
    else if (id === "wedge") sceneWedge(stage);
    else if (id === "screw") sceneScrew(stage);
  }

  function sceneLever(stage) {
    stage.innerHTML =
      '<div class="scene lever-scene">' +
      '<div class="box" id="lv-box">📦</div>' +
      '<div class="beam-hit" id="lv-hit">' +
      '<div class="beam" id="lv-beam"></div>' +
      '<div class="handle" id="lv-handle">⬇ PUSH</div>' +
      "</div>" +
      '<div class="fulcrum">▲</div>' +
      '<div class="floor"></div>' +
      "</div>";
    let angle = 0;
    const beam = $("lv-beam");
    const box = $("lv-box");
    const hit = $("lv-hit");
    const apply = () => {
      beam.style.transform = "rotate(" + angle + "deg)";
      const lift = Math.max(0, -angle * 3.5);
      box.style.transform = "translateY(" + -lift + "px) scale(" + (1 + lift / 200) + ")";
      if (angle <= -16) completeMachine();
    };
    bindDrag(hit, {
      move: (e) => {
        const r = stage.getBoundingClientRect();
        const y = (e.clientY - r.top) / r.height;
        angle = Math.max(-26, Math.min(8, (y - 0.55) * 50));
        apply();
      },
    });
  }

  function scenePulley(stage) {
    stage.innerHTML =
      '<div class="scene pulley-scene">' +
      '<div class="pulley-wheel" id="pu-wheel">⚙️</div>' +
      '<div class="rope-l" id="pu-rl"></div>' +
      '<div class="rope-r" id="pu-rr"></div>' +
      '<div class="box" id="pu-box">📦</div>' +
      '<div class="handle-hit" id="pu-hit"><div class="handle">⬇ PULL</div></div>' +
      "</div>";
    let pull = 0;
    const hit = $("pu-hit");
    const box = $("pu-box");
    const rl = $("pu-rl");
    const rr = $("pu-rr");
    const wheel = $("pu-wheel");
    bindDrag(hit, {
      move: (e) => {
        const r = stage.getBoundingClientRect();
        const y = (e.clientY - r.top) / r.height;
        pull = Math.max(0, Math.min(1, (y - 0.28) / 0.5));
        hit.style.transform = "translateY(" + pull * 110 + "px)";
        box.style.transform = "translateY(" + -pull * 100 + "px)";
        rr.style.height = 50 + pull * 100 + "px";
        rl.style.height = Math.max(30, 130 - pull * 90) + "px";
        wheel.style.transform = "rotate(" + pull * 180 + "deg)";
        if (pull >= 0.72) completeMachine();
      },
    });
  }

  function scenePlane(stage) {
    stage.innerHTML =
      '<div class="scene plane-scene">' +
      '<div class="ramp"></div>' +
      '<div class="goal">⭐</div>' +
      '<div class="box-hit" id="pl-hit"><div class="box">📦</div></div>' +
      "</div>";
    let t = 0;
    const hit = $("pl-hit");
    const place = () => {
      hit.style.left = 6 + t * 70 + "%";
      hit.style.top = 62 - t * 42 + "%";
      if (t >= 0.85) completeMachine();
    };
    place();
    bindDrag(hit, {
      move: (e) => {
        const r = stage.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        t = Math.max(0, Math.min(1, (x - 0.06) / 0.7));
        place();
      },
    });
  }

  function sceneWheel(stage) {
    stage.innerHTML =
      '<div class="scene wheel-scene">' +
      '<div class="wheel-hit" id="wh-hit"><div class="wheel" id="wh-disc">⟳</div></div>' +
      '<div class="axle"></div>' +
      '<div class="cart" id="wh-cart">🛒</div>' +
      '<div class="finish">🏁</div>' +
      "</div>";
    let rot = 0;
    let lastX = null;
    const hit = $("wh-hit");
    const disc = $("wh-disc");
    const cart = $("wh-cart");
    bindDrag(hit, {
      down: (e) => {
        lastX = e.clientX;
      },
      move: (e) => {
        if (lastX == null) lastX = e.clientX;
        rot += (e.clientX - lastX) * 0.9;
        lastX = e.clientX;
        disc.style.transform = "rotate(" + rot + "deg)";
        const d = Math.min(1, Math.max(0, Math.abs(rot) / 280));
        cart.style.transform = "translateX(" + d * 160 + "px)";
        if (d >= 0.85) completeMachine();
      },
      up: () => {
        lastX = null;
      },
    });
    // also allow simple taps to nudge
    hit.addEventListener("click", () => {
      if (state.done) return;
      rot += 40;
      disc.style.transform = "rotate(" + rot + "deg)";
      const d = Math.min(1, Math.abs(rot) / 280);
      cart.style.transform = "translateX(" + d * 160 + "px)";
      if (d >= 0.85) completeMachine();
    });
  }

  function sceneWedge(stage) {
    stage.innerHTML =
      '<div class="scene wedge-scene">' +
      '<div class="log" id="wg-log">🪵</div>' +
      '<div class="wedge-hit" id="wg-hit"><div class="wedge">▶</div></div>' +
      '<button type="button" class="btn btn-big" id="wg-btn">Push wedge →</button>' +
      "</div>";
    let x = 0;
    const hit = $("wg-hit");
    const log = $("wg-log");
    const apply = () => {
      hit.style.left = 5 + x * 50 + "%";
      if (x >= 0.55) log.classList.add("split");
      else log.classList.remove("split");
      if (x >= 0.75) completeMachine();
    };
    apply();
    bindDrag(hit, {
      move: (e) => {
        const r = stage.getBoundingClientRect();
        x = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width / 0.7));
        apply();
      },
    });
    $("wg-btn").addEventListener("click", () => {
      if (state.done) return;
      const step = () => {
        if (state.done || x >= 0.8) {
          apply();
          return;
        }
        x += 0.04;
        apply();
        state.raf = requestAnimationFrame(step);
      };
      cancelRaf();
      step();
    });
  }

  function sceneScrew(stage) {
    stage.innerHTML =
      '<div class="scene screw-scene">' +
      '<div class="screw-hit" id="sc-hit">' +
      '<div class="head" id="sc-head">🔧</div>' +
      '<div class="shaft" id="sc-shaft"></div>' +
      "</div>" +
      '<div class="wood">🧱</div>' +
      '<div class="btn-row">' +
      '<button type="button" class="btn btn-big" id="sc-raise">Turn ↻</button>' +
      '<button type="button" class="btn btn-ghost" id="sc-lower">↺</button>' +
      "</div>" +
      "</div>";
    let turns = 0;
    let lastA = null;
    const head = $("sc-head");
    const shaft = $("sc-shaft");
    const hit = $("sc-hit");
    const apply = () => {
      head.style.transform = "rotate(" + turns * 90 + "deg)";
      shaft.style.height = 16 + turns * 14 + "px";
      if (turns >= 5) completeMachine();
    };
    $("sc-raise").addEventListener("click", () => {
      if (state.done) return;
      turns = Math.min(8, turns + 1);
      apply();
      beep(true);
    });
    $("sc-lower").addEventListener("click", () => {
      if (state.done) return;
      turns = Math.max(0, turns - 1);
      apply();
    });
    // drag around head to turn
    bindDrag(hit, {
      down: (e) => {
        const r = hit.getBoundingClientRect();
        lastA = Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2));
      },
      move: (e) => {
        const r = hit.getBoundingClientRect();
        const a = Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2));
        if (lastA != null) {
          let d = a - lastA;
          if (d > Math.PI) d -= Math.PI * 2;
          if (d < -Math.PI) d += Math.PI * 2;
          if (Math.abs(d) > 0.25) {
            turns = Math.max(0, Math.min(8, turns + (d > 0 ? 1 : -1) * 0.35));
            lastA = a;
            apply();
          }
        }
      },
      up: () => {
        lastA = null;
      },
    });
  }

  /* ---------- BOOT ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    renderLab();
    show("view-lab");
    $("btn-back").addEventListener("click", exitToLab);
    $("btn-reset").addEventListener("click", resetMachine);
    $("btn-again").addEventListener("click", resetMachine);
    $("btn-next").addEventListener("click", nextMachine);
    $("btn-to-lab").addEventListener("click", exitToLab);
    $("btn-expert").addEventListener("click", showExpert);
    $("btn-expert-lab").addEventListener("click", exitToLab);
    // safety: pointer up anywhere clears drag if capture lost
    window.addEventListener("pointerup", () => {
      if (state.drag) {
        state.drag.el && state.drag.el.classList.remove("is-grabbed");
        state.drag = null;
      }
    });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) cancelDrag();
    });
  });
})();
