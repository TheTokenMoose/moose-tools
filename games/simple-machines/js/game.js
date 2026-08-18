/**
 * Simple Machines Lab — IB-friendly physics sandbox
 * Six classic simple machines · Matter.js (MIT) · touch-first
 */
(function () {
  const { Engine, Render, Runner, Bodies, Body, Composite, Constraint, Events, Mouse, MouseConstraint, Query } = Matter;

  const MACHINES = [
    {
      id: "lever",
      icon: "⚖️",
      name: "Lever",
      blurb: "A rigid bar that pivots on a fulcrum",
      goal: "Lift the heavy crate by pressing the long end of the lever.",
      hint: "Try moving the fulcrum. A longer effort arm makes lifting easier.",
    },
    {
      id: "wheel",
      icon: "🎡",
      name: "Wheel & Axle",
      blurb: "A wheel turns a smaller axle to move a load",
      goal: "Spin the big wheel to raise the hanging load.",
      hint: "A larger wheel needs less force at the rim for the same torque.",
    },
    {
      id: "pulley",
      icon: "🪝",
      name: "Pulley",
      blurb: "A wheel and rope that change force direction",
      goal: "Pull the free rope end downward to lift the crate.",
      hint: "Pulling down lifts up — direction of force changes.",
    },
    {
      id: "plane",
      icon: "📐",
      name: "Inclined Plane",
      blurb: "A ramp that trades distance for less force",
      goal: "Push the crate up the ramp into the glowing zone.",
      hint: "Gentler slopes need less push but a longer path.",
    },
    {
      id: "wedge",
      icon: "🪓",
      name: "Wedge",
      blurb: "Two inclined planes that split or lift",
      goal: "Drive the wedge under the block to lift it apart from the floor.",
      hint: "A sharper wedge slides under more easily with a firm push.",
    },
    {
      id: "screw",
      icon: "🔩",
      name: "Screw",
      blurb: "An inclined plane wrapped around a cylinder",
      goal: "Turn the screw head to raise the platform.",
      hint: "Each turn converts rotation into steady upward motion.",
    },
  ];

  let engine, render, runner, mouseConstraint;
  let currentId = null;
  let winArmed = true;
  let audioCtx = null;

  const els = {};

  function $(id) {
    return document.getElementById(id);
  }

  function toast(msg, fail) {
    const t = els.toast;
    if (!t) return;
    t.textContent = msg;
    t.hidden = false;
    t.classList.toggle("is-fail", !!fail);
    clearTimeout(toast._t);
    toast._t = setTimeout(() => {
      t.hidden = true;
    }, 2600);
  }

  function beep(ok) {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.type = ok ? "triangle" : "square";
      o.frequency.value = ok ? 520 : 180;
      g.gain.value = 0.04;
      o.connect(g);
      g.connect(audioCtx.destination);
      o.start();
      g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
      o.stop(audioCtx.currentTime + 0.22);
    } catch (_) {}
  }

  function clearWorld() {
    if (!engine) return;
    Composite.clear(engine.world, false);
    Events.off(engine);
  }

  function stopEngine() {
    if (runner) {
      Runner.stop(runner);
      runner = null;
    }
    if (render) {
      Render.stop(render);
      if (render.canvas && render.canvas.parentNode) {
        // keep canvas element; Matter will reuse
      }
      render = null;
    }
    if (engine) {
      clearWorld();
      engine = null;
    }
    mouseConstraint = null;
  }

  function worldSize() {
    const wrap = els.canvasWrap;
    const w = Math.min(wrap.clientWidth || 800, 1000);
    const h = Math.min(Math.max(Math.round(w * 0.55), 320), 520);
    return { w, h };
  }

  function startEngine(setupFn) {
    stopEngine();
    winArmed = true;
    const { w, h } = worldSize();
    const canvas = els.canvas;
    canvas.width = w;
    canvas.height = h;

    engine = Engine.create({ gravity: { x: 0, y: 1.05 } });
    render = Render.create({
      canvas: canvas,
      engine: engine,
      options: {
        width: w,
        height: h,
        wireframes: false,
        background: "transparent",
        pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      },
    });

    const mouse = Mouse.create(canvas);
    mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    });
    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    // Touch: prevent page scroll while dragging
    canvas.addEventListener(
      "touchmove",
      (e) => {
        if (e.touches.length === 1) e.preventDefault();
      },
      { passive: false }
    );

    setupFn(engine.world, w, h);

    Render.run(render);
    runner = Runner.create();
    Runner.run(runner, engine);

    Events.on(engine, "afterUpdate", () => {
      if (!winArmed || !currentId) return;
      checkWin(currentId, w, h);
    });
  }

  function ground(w, h) {
    return Bodies.rectangle(w / 2, h - 12, w + 40, 40, {
      isStatic: true,
      friction: 0.9,
      render: { fillStyle: "#2a3f5f", strokeStyle: "#5ec8ff", lineWidth: 2 },
      label: "ground",
    });
  }

  function walls(w, h) {
    return [
      Bodies.rectangle(-20, h / 2, 40, h * 2, { isStatic: true, render: { visible: false } }),
      Bodies.rectangle(w + 20, h / 2, 40, h * 2, { isStatic: true, render: { visible: false } }),
      Bodies.rectangle(w / 2, -30, w, 40, { isStatic: true, render: { visible: false } }),
    ];
  }

  /* ---------- Machine setups ---------- */

  let leverState = {};
  function setupLever(world, w, h) {
    leverState = {};
    const g = ground(w, h);
    const beamLen = Math.min(w * 0.7, 420);
    const fulcrumX = w * 0.42;
    const fulcrumY = h - 70;
    const fulcrum = Bodies.circle(fulcrumX, fulcrumY, 16, {
      isStatic: true,
      render: { fillStyle: "#ffc857" },
      label: "fulcrum",
    });
    const beam = Bodies.rectangle(fulcrumX, fulcrumY - 8, beamLen, 18, {
      density: 0.002,
      friction: 0.4,
      render: { fillStyle: "#c4a574" },
      label: "beam",
    });
    const pivot = Constraint.create({
      bodyA: fulcrum,
      bodyB: beam,
      pointA: { x: 0, y: 0 },
      pointB: { x: 0, y: 0 },
      length: 0,
      stiffness: 1,
      render: { visible: false },
    });
    const crate = Bodies.rectangle(fulcrumX - beamLen * 0.32, fulcrumY - 50, 50, 50, {
      density: 0.01,
      friction: 0.5,
      render: { fillStyle: "#ff6b7a" },
      label: "load",
    });
    leverState.crate = crate;
    leverState.beam = beam;
    leverState.fulcrumY = fulcrumY;
    Composite.add(world, [g, ...walls(w, h), fulcrum, beam, pivot, crate]);
  }

  let wheelState = {};
  function setupWheel(world, w, h) {
    wheelState = {};
    const g = ground(w, h);
    const cx = w * 0.38;
    const cy = h * 0.55;
    const wheel = Bodies.circle(cx, cy, 70, {
      density: 0.002,
      friction: 0.05,
      render: { fillStyle: "#5ec8ff", strokeStyle: "#e8f1ff", lineWidth: 3 },
      label: "wheel",
    });
    const axle = Bodies.circle(cx, cy, 14, {
      isStatic: true,
      render: { fillStyle: "#ffc857" },
      label: "axle",
    });
    const axlePin = Constraint.create({
      bodyA: axle,
      bodyB: wheel,
      length: 0,
      stiffness: 1,
      render: { visible: false },
    });
    const load = Bodies.rectangle(cx + 130, cy + 40, 44, 44, {
      density: 0.008,
      render: { fillStyle: "#ff6b7a" },
      label: "load",
    });
    // Rope from wheel rim-ish to load
    const rope = Constraint.create({
      bodyA: wheel,
      pointA: { x: 0, y: -70 },
      bodyB: load,
      pointB: { x: 0, y: -22 },
      length: 100,
      stiffness: 0.9,
      damping: 0.05,
      render: { strokeStyle: "#9bb0d0", lineWidth: 2 },
    });
    wheelState.wheel = wheel;
    wheelState.load = load;
    wheelState.baseY = cy + 40;
    Composite.add(world, [g, ...walls(w, h), axle, wheel, axlePin, load, rope]);
  }

  let pulleyState = {};
  function setupPulley(world, w, h) {
    pulleyState = {};
    const g = ground(w, h);
    const px = w * 0.5;
    const py = 70;
    const pulley = Bodies.circle(px, py, 28, {
      isStatic: true,
      render: { fillStyle: "#5ec8ff", strokeStyle: "#fff", lineWidth: 2 },
      label: "pulley",
    });
    const load = Bodies.rectangle(px - 90, h - 100, 48, 48, {
      density: 0.008,
      render: { fillStyle: "#ff6b7a" },
      label: "load",
    });
    const handle = Bodies.circle(px + 100, h - 120, 22, {
      density: 0.003,
      render: { fillStyle: "#ffc857" },
      label: "handle",
    });
    // Two rope segments via constraints (simple model)
    const rope1 = Constraint.create({
      bodyA: pulley,
      pointA: { x: -20, y: 0 },
      bodyB: load,
      pointB: { x: 0, y: -24 },
      stiffness: 1,
      length: h - 180,
      render: { strokeStyle: "#cfd9ea", lineWidth: 2 },
    });
    const rope2 = Constraint.create({
      bodyA: pulley,
      pointA: { x: 20, y: 0 },
      bodyB: handle,
      pointB: { x: 0, y: 0 },
      stiffness: 1,
      length: h - 200,
      render: { strokeStyle: "#cfd9ea", lineWidth: 2 },
    });
    // Keep total rope roughly constant when handle moves
    Events.on(engine, "beforeUpdate", () => {
      if (!pulleyState.active) return;
      const hy = handle.position.y;
      const targetLoadY = h - 80 - (h - 120 - hy) * 0.95;
      // soft pull via constraint length adjust
      rope1.length = Math.max(40, targetLoadY - py);
    });
    pulleyState.load = load;
    pulleyState.handle = handle;
    pulleyState.active = true;
    Composite.add(world, [g, ...walls(w, h), pulley, load, handle, rope1, rope2]);
  }

  let planeState = {};
  function setupPlane(world, w, h) {
    planeState = {};
    const g = ground(w, h);
    const angle = planeState.angle || 0.35;
    const rampW = Math.min(w * 0.75, 480);
    const ramp = Bodies.rectangle(w * 0.48, h - 90, rampW, 22, {
      isStatic: true,
      angle: -angle,
      friction: 0.35,
      render: { fillStyle: "#6b8caf" },
      label: "ramp",
    });
    const crate = Bodies.rectangle(w * 0.22, h - 160, 46, 46, {
      density: 0.006,
      friction: 0.25,
      render: { fillStyle: "#ff6b7a" },
      label: "load",
    });
    const goal = Bodies.rectangle(w * 0.78, h - 200, 70, 20, {
      isStatic: true,
      isSensor: true,
      render: { fillStyle: "rgba(61, 214, 140, 0.45)", strokeStyle: "#3dd68c", lineWidth: 2 },
      label: "goal",
    });
    planeState.crate = crate;
    planeState.goal = goal;
    planeState.ramp = ramp;
    planeState.w = w;
    planeState.h = h;
    Composite.add(world, [g, ...walls(w, h), ramp, crate, goal]);
  }

  let wedgeState = {};
  function setupWedge(world, w, h) {
    wedgeState = {};
    const g = ground(w, h);
    const block = Bodies.rectangle(w * 0.55, h - 70, 100, 50, {
      density: 0.01,
      friction: 0.4,
      render: { fillStyle: "#8b9dc3" },
      label: "block",
    });
    const wedge = Bodies.polygon(w * 0.28, h - 55, 3, 42, {
      density: 0.004,
      friction: 0.15,
      angle: Math.PI / 2,
      render: { fillStyle: "#ffc857" },
      label: "wedge",
    });
    wedgeState.block = block;
    wedgeState.wedge = wedge;
    wedgeState.base = h - 45;
    Composite.add(world, [g, ...walls(w, h), block, wedge]);
  }

  let screwState = {};
  function setupScrew(world, w, h) {
    screwState = {};
    const g = ground(w, h);
    const post = Bodies.rectangle(w * 0.5, h * 0.45, 24, h * 0.55, {
      isStatic: true,
      render: { fillStyle: "#4a5f7a" },
      label: "post",
    });
    const platform = Bodies.rectangle(w * 0.5, h - 80, 120, 16, {
      isStatic: true,
      render: { fillStyle: "#5ec8ff" },
      label: "platform",
    });
    const load = Bodies.rectangle(w * 0.5, h - 115, 50, 40, {
      density: 0.005,
      render: { fillStyle: "#ff6b7a" },
      label: "load",
    });
    const head = Bodies.circle(w * 0.5, h * 0.18, 36, {
      isStatic: true,
      render: { fillStyle: "#ffc857", strokeStyle: "#fff", lineWidth: 2 },
      label: "screwhead",
    });
    screwState.platform = platform;
    screwState.load = load;
    screwState.head = head;
    screwState.turns = 0;
    screwState.baseY = h - 80;
    Composite.add(world, [g, ...walls(w, h), post, platform, load, head]);
  }

  function checkWin(id, w, h) {
    if (id === "lever" && leverState.crate) {
      if (leverState.crate.position.y < leverState.fulcrumY - 90) win("Lever lift success!");
    } else if (id === "wheel" && wheelState.load) {
      if (wheelState.load.position.y < wheelState.baseY - 70) win("Wheel & axle raised the load!");
    } else if (id === "pulley" && pulleyState.load) {
      if (pulleyState.load.position.y < h * 0.45) win("Pulley lift success!");
    } else if (id === "plane" && planeState.crate && planeState.goal) {
      const c = planeState.crate.position;
      const g = planeState.goal.position;
      if (Math.abs(c.x - g.x) < 50 && Math.abs(c.y - g.y) < 55) win("Up the inclined plane!");
    } else if (id === "wedge" && wedgeState.block) {
      if (wedgeState.block.position.y < wedgeState.base - 35) win("Wedge lifted the block!");
    } else if (id === "screw" && screwState.platform) {
      if (screwState.platform.position.y < screwState.baseY - 55) win("Screw raised the platform!");
    }
  }

  function win(msg) {
    if (!winArmed) return;
    winArmed = false;
    beep(true);
    toast(msg, false);
  }

  function openLab(id) {
    currentId = id;
    const m = MACHINES.find((x) => x.id === id);
    els.hub.classList.add("is-hidden");
    els.stage.classList.add("is-active");
    els.goal.innerHTML = "<strong>Goal:</strong> " + (m ? m.goal : "");
    els.hint.textContent = m ? m.hint : "";
    els.stageTitle.textContent = (m ? m.icon + " " + m.name : "Lab");

    // Controls visibility
    $all(".ctrl").forEach((el) => {
      el.hidden = el.dataset.for !== id && el.dataset.for !== "all";
    });

    const setup = {
      lever: setupLever,
      wheel: setupWheel,
      pulley: setupPulley,
      plane: setupPlane,
      wedge: setupWedge,
      screw: setupScrew,
    }[id];
    if (setup) startEngine(setup);
  }

  function closeLab() {
    if (pulleyState) pulleyState.active = false;
    stopEngine();
    currentId = null;
    els.stage.classList.remove("is-active");
    els.hub.classList.remove("is-hidden");
  }

  function $all(sel) {
    return Array.from(document.querySelectorAll(sel));
  }

  function applyPlaneAngle(v) {
    planeState.angle = Number(v);
    if (currentId === "plane") openLab("plane");
  }

  function turnScrew(dir) {
    if (!screwState.platform || currentId !== "screw") return;
    screwState.turns += dir;
    const y = screwState.baseY - screwState.turns * 8;
    Body.setPosition(screwState.platform, {
      x: screwState.platform.position.x,
      y: Math.max(90, Math.min(screwState.baseY, y)),
    });
    Body.setAngle(screwState.head, screwState.head.angle + dir * 0.45);
    // nudge load with platform
    if (screwState.load) {
      Body.setPosition(screwState.load, {
        x: screwState.load.position.x,
        y: screwState.platform.position.y - 35,
      });
      Body.setVelocity(screwState.load, { x: 0, y: 0 });
    }
  }

  function spinWheel() {
    if (!wheelState.wheel) return;
    Body.setAngularVelocity(wheelState.wheel, -0.35);
  }

  function resetLab() {
    if (currentId) openLab(currentId);
  }

  function buildHub() {
    const grid = els.hubGrid;
    grid.innerHTML = "";
    MACHINES.forEach((m) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "machine-card";
      b.innerHTML =
        '<span class="icon" aria-hidden="true">' +
        m.icon +
        '</span><span class="name">' +
        m.name +
        '</span><span class="blurb">' +
        m.blurb +
        "</span>";
      b.addEventListener("click", () => openLab(m.id));
      grid.appendChild(b);
    });
  }

  function bind() {
    els.btnBack.addEventListener("click", closeLab);
    els.btnReset.addEventListener("click", resetLab);
    const angle = $("ctrl-plane-angle");
    if (angle) {
      angle.addEventListener("input", () => {
        $("val-plane-angle").textContent = Number(angle.value).toFixed(2);
      });
      angle.addEventListener("change", () => applyPlaneAngle(angle.value));
    }
    const spin = $("btn-spin-wheel");
    if (spin) spin.addEventListener("click", spinWheel);
    const scw = $("btn-screw-cw");
    const scc = $("btn-screw-ccw");
    if (scw) scw.addEventListener("click", () => turnScrew(1));
    if (scc) scc.addEventListener("click", () => turnScrew(-1));

    window.addEventListener("resize", () => {
      if (currentId) {
        clearTimeout(bind._rz);
        bind._rz = setTimeout(() => openLab(currentId), 200);
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    els.hub = $("hub");
    els.hubGrid = $("hub-grid");
    els.stage = $("lab-stage");
    els.canvas = $("world");
    els.canvasWrap = $("canvas-wrap");
    els.goal = $("goal-banner");
    els.hint = $("hint");
    els.stageTitle = $("stage-title");
    els.btnBack = $("btn-back-hub");
    els.btnReset = $("btn-reset");
    els.toast = $("toast");
    if (typeof Matter === "undefined") {
      toast("Physics library failed to load", true);
      return;
    }
    buildHub();
    bind();
  });
})();
