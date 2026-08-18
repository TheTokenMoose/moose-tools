/**
 * Simple Machines Lab v2 — playable physics toys
 * Matter.js · touch-first · velocity-clamped · real controls
 */
(function () {
  const M = window.Matter;
  if (!M) {
    console.error("Matter.js missing");
    return;
  }
  const {
    Engine, Render, Runner, Bodies, Body, Composite, Constraint,
    Events, Mouse, MouseConstraint, Vector
  } = M;

  const MACHINES = [
    { id: "lever", icon: "⚖️", name: "Lever", blurb: "Push one end — the other end lifts", goal: "Press the LEFT side of the plank so the RIGHT side lifts the red crate above the line.", hint: "Move the fulcrum with the slider. Longer effort arm = easier lift." },
    { id: "wheel", icon: "🎡", name: "Wheel & Axle", blurb: "Big wheel turns a small axle", goal: "Hold SPIN so the wheel winds the rope and lifts the crate into the green zone.", hint: "You apply force on the big wheel; the axle does the lifting work." },
    { id: "pulley", icon: "🪝", name: "Pulley", blurb: "Pull down to lift up", goal: "Drag the gold handle DOWN to lift the red crate UP into the green zone.", hint: "A single fixed pulley changes direction of force — pull down, load goes up." },
    { id: "plane", icon: "📐", name: "Inclined Plane", blurb: "Ramps trade force for distance", goal: "Let the ball roll down, or push the crate UP into the top zone. Try angle & friction.", hint: "Steeper = faster roll down, harder push up. More friction = stickier." },
    { id: "wedge", icon: "🪓", name: "Wedge", blurb: "A moving ramp that splits or lifts", goal: "Drag the gold wedge under the grey block, or tap DRIVE WEDGE, until the block rises.", hint: "The wedge turns a sideways push into an upward lift." },
    { id: "screw", icon: "🔩", name: "Screw", blurb: "A ramp wrapped around a post", goal: "Tap RAISE several times to climb the platform into the green zone. LOWER goes back down.", hint: "Each turn of a screw is a small step up an invisible ramp." },
  ];

  let engine, render, runner, mouseConstraint;
  let currentId = null;
  let winArmed = true;
  let audioCtx = null;
  let tickHook = null;
  let state = {};

  const els = {};
  const $ = (id) => document.getElementById(id);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  function toast(msg, fail) {
    const t = els.toast;
    if (!t) return;
    t.textContent = msg;
    t.hidden = false;
    t.classList.toggle("is-fail", !!fail);
    clearTimeout(toast._t);
    toast._t = setTimeout(() => { t.hidden = true; }, 2800);
  }

  function beep(ok) {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.type = ok ? "sine" : "square";
      o.frequency.value = ok ? 660 : 160;
      g.gain.value = 0.05;
      o.connect(g); g.connect(audioCtx.destination);
      o.start();
      g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.18);
      o.stop(audioCtx.currentTime + 0.2);
    } catch (_) {}
  }

  function worldSize() {
    const wrap = els.canvasWrap;
    const w = Math.max(320, Math.min(wrap.clientWidth || 800, 1000));
    const h = Math.min(Math.max(Math.round(w * 0.58), 340), 540);
    return { w, h };
  }

  function stopLab() {
    if (tickHook) {
      try { Events.off(engine, "beforeUpdate", tickHook); } catch (_) {}
      tickHook = null;
    }
    if (runner) { Runner.stop(runner); runner = null; }
    if (render) { Render.stop(render); render = null; }
    if (engine) {
      Composite.clear(engine.world, false);
      Engine.clear(engine);
      engine = null;
    }
    mouseConstraint = null;
    state = {};
  }

  function clampVelocities() {
    if (!engine) return;
    const bodies = Composite.allBodies(engine.world);
    for (let i = 0; i < bodies.length; i++) {
      const b = bodies[i];
      if (b.isStatic) continue;
      const vx = b.velocity.x, vy = b.velocity.y;
      const speed = Math.hypot(vx, vy);
      if (speed > 18) {
        Body.setVelocity(b, { x: (vx / speed) * 18, y: (vy / speed) * 18 });
      }
      if (b.angularVelocity > 0.4) Body.setAngularVelocity(b, 0.4);
      if (b.angularVelocity < -0.4) Body.setAngularVelocity(b, -0.4);
      // soft walls: bounce back if near edges
      const { w, h } = state.dim || { w: 800, h: 440 };
      if (b.position.x < 20) Body.setPosition(b, { x: 20, y: b.position.y });
      if (b.position.x > w - 20) Body.setPosition(b, { x: w - 20, y: b.position.y });
      if (b.position.y > h + 80) {
        Body.setPosition(b, { x: Math.min(w - 40, Math.max(40, b.position.x)), y: h - 60 });
        Body.setVelocity(b, { x: 0, y: 0 });
      }
      if (b.position.y < -40) {
        Body.setPosition(b, { x: b.position.x, y: 40 });
        Body.setVelocity(b, { x: 0, y: 0 });
      }
    }
  }

  function bounds(w, h) {
    const thick = 60;
    const opts = { isStatic: true, friction: 0.9, render: { fillStyle: "#243552" } };
    return [
      Bodies.rectangle(w / 2, h + thick / 2 - 8, w + 100, thick, { ...opts, label: "floor" }),
      Bodies.rectangle(-thick / 2, h / 2, thick, h * 2, { ...opts, render: { visible: false } }),
      Bodies.rectangle(w + thick / 2, h / 2, thick, h * 2, { ...opts, render: { visible: false } }),
      Bodies.rectangle(w / 2, -thick / 2, w + 100, thick, { ...opts, render: { visible: false } }),
    ];
  }

  function goalZone(x, y, w, h) {
    return Bodies.rectangle(x, y, w, h, {
      isStatic: true,
      isSensor: true,
      render: { fillStyle: "rgba(61,214,140,0.28)", strokeStyle: "#3dd68c", lineWidth: 2 },
      label: "goal",
    });
  }

  function startEngine(setup) {
    stopLab();
    winArmed = true;
    const { w, h } = worldSize();
    state.dim = { w, h };
    const canvas = els.canvas;
    canvas.width = w;
    canvas.height = h;

    engine = Engine.create({
      gravity: { x: 0, y: 1 },
      constraintIterations: 4,
      positionIterations: 8,
      velocityIterations: 6,
    });

    render = Render.create({
      canvas,
      engine,
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
      mouse,
      constraint: { stiffness: 0.35, damping: 0.1, render: { visible: false } },
    });
    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    canvas.addEventListener("touchmove", (e) => {
      if (e.touches.length) e.preventDefault();
    }, { passive: false });

    setup(w, h);

    tickHook = () => {
      clampVelocities();
      if (state.onTick) state.onTick();
      if (winArmed && state.checkWin) {
        if (state.checkWin()) {
          winArmed = false;
          beep(true);
          toast(state.winMsg || "Success!", false);
        }
      }
    };
    Events.on(engine, "beforeUpdate", tickHook);

    Render.run(render);
    runner = Runner.create({ isFixed: true });
    Runner.run(runner, engine);
  }

  /* ========== LEVER ========== */
  function setupLever(w, h) {
    const floorY = h - 20;
    const fulcrumX = w * (state.fulcrumRatio != null ? state.fulcrumRatio : 0.45);
    const fulcrumY = floorY - 50;
    const beamLen = Math.min(w * 0.72, 460);
    const beamH = 20;

    const fulcrum = Bodies.trapezoid(fulcrumX, fulcrumY + 18, 50, 36, 0.4, {
      isStatic: true,
      render: { fillStyle: "#ffc857" },
      label: "fulcrum",
    });

    // Beam pivoted at fulcrum — high friction top so crate sits
    const beam = Bodies.rectangle(fulcrumX, fulcrumY - beamH / 2, beamLen, beamH, {
      friction: 1,
      frictionStatic: 1,
      restitution: 0.05,
      density: 0.0015,
      render: { fillStyle: "#d2b48c", strokeStyle: "#8b6914", lineWidth: 1 },
      label: "beam",
    });
    const pin = Constraint.create({
      bodyA: fulcrum,
      pointA: { x: 0, y: -18 },
      bodyB: beam,
      pointB: { x: 0, y: 0 },
      length: 0,
      stiffness: 1,
      render: { visible: false },
    });

    // Crate sits on RIGHT end of beam — slightly glued via short soft constraint so it doesn't fly
    const loadX = fulcrumX + beamLen * 0.28;
    const crate = Bodies.rectangle(loadX, fulcrumY - beamH - 28, 48, 48, {
      density: 0.004,
      friction: 1,
      frictionStatic: 1,
      restitution: 0.05,
      render: { fillStyle: "#ff6b7a" },
      label: "crate",
    });
    // soft keep-on-beam (breaks feel if too stiff — use low stiffness)
    const seat = Constraint.create({
      bodyA: beam,
      pointA: { x: beamLen * 0.28, y: -beamH / 2 },
      bodyB: crate,
      pointB: { x: 0, y: 24 },
      length: 6,
      stiffness: 0.4,
      damping: 0.1,
      render: { visible: false },
    });

    // Target height marker (visual static)
    const line = Bodies.rectangle(loadX, fulcrumY - 110, 70, 6, {
      isStatic: true,
      isSensor: true,
      render: { fillStyle: "#3dd68c" },
      label: "target",
    });

    // Left pad hint — sensor
    const pad = Bodies.rectangle(fulcrumX - beamLen * 0.32, fulcrumY - 40, 70, 8, {
      isStatic: true,
      isSensor: true,
      render: { fillStyle: "rgba(94,200,255,0.35)" },
      label: "press-here",
    });

    Composite.add(engine.world, [...bounds(w, h), fulcrum, beam, pin, crate, seat, line, pad]);

    state.crate = crate;
    state.beam = beam;
    state.targetY = fulcrumY - 100;
    state.winMsg = "Lever win! You lifted the load.";
    state.checkWin = () => crate.position.y < state.targetY;
  }

  /* ========== WHEEL & AXLE ========== */
  function setupWheel(w, h) {
    const cx = w * 0.36;
    const cy = h * 0.52;
    const R = Math.min(78, w * 0.12);

    const axle = Bodies.circle(cx, cy, 12, {
      isStatic: true,
      render: { fillStyle: "#ffc857" },
      label: "axle",
    });
    const wheel = Bodies.circle(cx, cy, R, {
      density: 0.002,
      friction: 0.02,
      restitution: 0.1,
      render: { fillStyle: "#3d8fd4", strokeStyle: "#e8f1ff", lineWidth: 4 },
      label: "wheel",
    });
    // spokes look via inner static? just pin
    const pin = Constraint.create({
      bodyA: axle,
      bodyB: wheel,
      length: 0,
      stiffness: 1,
      render: { visible: false },
    });

    const load = Bodies.rectangle(cx + R + 90, cy + R * 0.2, 44, 44, {
      density: 0.0035,
      friction: 0.4,
      render: { fillStyle: "#ff6b7a" },
      label: "crate",
    });

    // Rope from wheel edge to crate — length shortens when spinning via onTick
    const rope = Constraint.create({
      bodyA: wheel,
      pointA: { x: 0, y: -R },
      bodyB: load,
      pointB: { x: 0, y: -22 },
      length: R + 70,
      stiffness: 0.95,
      damping: 0.05,
      render: { strokeStyle: "#cfd9ea", lineWidth: 3 },
    });

    const zone = goalZone(cx + R + 90, cy - R * 0.9, 80, 36);

    Composite.add(engine.world, [...bounds(w, h), axle, wheel, pin, load, rope, zone]);

    state.wheel = wheel;
    state.rope = rope;
    state.load = load;
    state.spinning = false;
    state.ropeMin = 40;
    state.ropeMax = R + 90;
    state.winMsg = "Wheel & axle lifted the load!";
    state.checkWin = () => load.position.y < cy - R * 0.5;
    state.onTick = () => {
      if (state.spinning && state.wheel) {
        Body.setAngularVelocity(state.wheel, -0.28);
        // wind rope: shorten constraint
        if (state.rope && state.rope.length > state.ropeMin) {
          state.rope.length = Math.max(state.ropeMin, state.rope.length - 0.55);
        }
      }
    };
  }

  /* ========== PULLEY ========== */
  function setupPulley(w, h) {
    const px = w * 0.5;
    const py = 56;
    const pulley = Bodies.circle(px, py, 26, {
      isStatic: true,
      render: { fillStyle: "#5ec8ff", strokeStyle: "#fff", lineWidth: 3 },
      label: "pulley",
    });

    const crate = Bodies.rectangle(px - 110, h - 120, 50, 50, {
      density: 0.004,
      friction: 0.3,
      render: { fillStyle: "#ff6b7a" },
      label: "crate",
    });
    const handle = Bodies.circle(px + 110, h - 140, 26, {
      density: 0.002,
      friction: 0.2,
      render: { fillStyle: "#ffc857", strokeStyle: "#fff", lineWidth: 2 },
      label: "handle",
    });

    // Fixed total rope length model
    const totalRope = (h - 140 - py) + (h - 120 - py);
    state.totalRope = totalRope;
    state.pulleyY = py;

    const ropeL = Constraint.create({
      bodyA: pulley,
      pointA: { x: -22, y: 8 },
      bodyB: crate,
      pointB: { x: 0, y: -25 },
      length: h - 120 - py,
      stiffness: 1,
      render: { strokeStyle: "#e8f1ff", lineWidth: 3 },
    });
    const ropeR = Constraint.create({
      bodyA: pulley,
      pointA: { x: 22, y: 8 },
      bodyB: handle,
      pointB: { x: 0, y: 0 },
      length: h - 140 - py,
      stiffness: 1,
      render: { strokeStyle: "#e8f1ff", lineWidth: 3 },
    });

    const zone = goalZone(px - 110, h * 0.38, 70, 40);

    Composite.add(engine.world, [...bounds(w, h), pulley, crate, handle, ropeL, ropeR, zone]);

    state.crate = crate;
    state.handle = handle;
    state.ropeL = ropeL;
    state.ropeR = ropeR;
    state.winMsg = "Pulley success — down became up!";
    state.checkWin = () => crate.position.y < h * 0.42;
    state.onTick = () => {
      // Enforce constant total rope: when handle goes down, left shortens
      if (!state.handle || !state.ropeL || !state.ropeR) return;
      const rightLen = Math.max(30, state.handle.position.y - state.pulleyY);
      const leftLen = Math.max(30, state.totalRope - rightLen);
      state.ropeR.length = rightLen;
      state.ropeL.length = leftLen;
    };
  }

  /* ========== INCLINED PLANE ========== */
  function setupPlane(w, h) {
    const angle = state.planeAngle != null ? state.planeAngle : 0.32;
    const friction = state.planeFriction != null ? state.planeFriction : 0.15;
    const mode = state.planeMode || "ball-down"; // ball-down | crate-up

    const rampLen = Math.min(w * 0.78, 520);
    const ramp = Bodies.rectangle(w * 0.5, h - 100, rampLen, 24, {
      isStatic: true,
      angle: -angle,
      friction: friction,
      frictionStatic: friction + 0.1,
      render: { fillStyle: "#6b8caf", strokeStyle: "#9bb0d0", lineWidth: 2 },
      label: "ramp",
    });

    // supports
    const foot = Bodies.rectangle(w * 0.82, h - 40, 80, 50, {
      isStatic: true,
      render: { fillStyle: "#2a3f5f" },
    });

    let body;
    if (mode === "ball-down") {
      // start near top of ramp
      const topX = w * 0.5 - Math.cos(angle) * rampLen * 0.35;
      const topY = h - 100 - Math.sin(angle) * rampLen * 0.35 - 40;
      body = Bodies.circle(topX, topY, 24, {
        density: 0.003,
        friction: friction * 0.5,
        restitution: 0.15,
        render: { fillStyle: "#5ec8ff", strokeStyle: "#fff", lineWidth: 2 },
        label: "ball",
      });
      const zone = goalZone(w * 0.18, h - 55, 90, 30);
      Composite.add(engine.world, [...bounds(w, h), ramp, foot, body, zone]);
      state.checkWin = () => body.position.x < w * 0.22 && body.position.y > h - 90;
      state.winMsg = "Ball rolled down the plane!";
    } else {
      const bottomX = w * 0.5 + Math.cos(angle) * rampLen * 0.28;
      const bottomY = h - 100 + Math.sin(angle) * rampLen * 0.05 - 50;
      body = Bodies.rectangle(bottomX, bottomY, 46, 46, {
        density: 0.004,
        friction: friction,
        frictionStatic: friction + 0.15,
        render: { fillStyle: "#ff6b7a" },
        label: "crate",
      });
      const zone = goalZone(w * 0.72, h - 220, 80, 36);
      Composite.add(engine.world, [...bounds(w, h), ramp, foot, body, zone]);
      state.checkWin = () => body.position.y < h - 200 && body.position.x > w * 0.62;
      state.winMsg = "Crate reached the top!";
    }

    state.body = body;
    state.ramp = ramp;
  }

  /* ========== WEDGE ========== */
  function setupWedge(w, h) {
    const floorY = h - 30;
    // Two blocks side by side with a gap — wedge splits/lifts left block
    const left = Bodies.rectangle(w * 0.55, floorY - 40, 70, 70, {
      density: 0.005,
      friction: 0.35,
      render: { fillStyle: "#8b9dc3" },
      label: "block",
    });
    const right = Bodies.rectangle(w * 0.72, floorY - 40, 70, 70, {
      density: 0.005,
      friction: 0.35,
      render: { fillStyle: "#6b7c9b" },
      label: "block2",
    });

    // Triangle wedge (point to the right)
    const wedge = Bodies.polygon(w * 0.28, floorY - 28, 3, 38, {
      density: 0.006,
      friction: 0.08,
      frictionStatic: 0.1,
      restitution: 0.05,
      angle: Math.PI, // point rightward
      render: { fillStyle: "#ffc857", strokeStyle: "#fff", lineWidth: 1 },
      label: "wedge",
    });

    const zone = goalZone(w * 0.55, floorY - 120, 90, 24);

    Composite.add(engine.world, [...bounds(w, h), left, right, wedge, zone]);

    state.block = left;
    state.wedge = wedge;
    state.baseY = floorY - 40;
    state.winMsg = "Wedge lifted the block!";
    state.checkWin = () => left.position.y < state.baseY - 40;
  }

  function driveWedge() {
    if (!state.wedge || currentId !== "wedge") return;
    Body.applyForce(state.wedge, state.wedge.position, { x: 0.05, y: -0.002 });
    Body.setVelocity(state.wedge, {
      x: Math.min(8, state.wedge.velocity.x + 3.2),
      y: state.wedge.velocity.y - 0.5,
    });
  }

  /* ========== SCREW ========== */
  function setupScrew(w, h) {
    const cx = w * 0.5;
    const baseY = h - 70;
    const post = Bodies.rectangle(cx, h * 0.42, 28, h * 0.5, {
      isStatic: true,
      render: { fillStyle: "#3d4f6a", strokeStyle: "#5ec8ff", lineWidth: 2 },
      label: "post",
    });
    const platform = Bodies.rectangle(cx, baseY, 130, 18, {
      isStatic: true,
      render: { fillStyle: "#5ec8ff", strokeStyle: "#fff", lineWidth: 2 },
      label: "platform",
    });
    const load = Bodies.rectangle(cx, baseY - 38, 52, 44, {
      density: 0.003,
      friction: 0.8,
      render: { fillStyle: "#ff6b7a" },
      label: "crate",
    });
    const head = Bodies.circle(cx, 70, 40, {
      isStatic: true,
      render: { fillStyle: "#ffc857", strokeStyle: "#fff", lineWidth: 3 },
      label: "head",
    });
    // decorative “thread” markers
    const threads = [];
    for (let i = 0; i < 5; i++) {
      threads.push(
        Bodies.rectangle(cx, 120 + i * 36, 40, 4, {
          isStatic: true,
          isSensor: true,
          render: { fillStyle: "rgba(255,200,87,0.5)" },
        })
      );
    }
    const zone = goalZone(cx, h * 0.32, 100, 28);

    Composite.add(engine.world, [...bounds(w, h), post, platform, load, head, zone, ...threads]);

    state.platform = platform;
    state.load = load;
    state.head = head;
    state.screwLevel = 0; // 0..10
    state.baseY = baseY;
    state.winMsg = "Screw raised the platform!";
    state.checkWin = () => platform.position.y < h * 0.38;
  }

  function turnScrew(dir) {
    if (currentId !== "screw" || !state.platform) return;
    state.screwLevel = Math.max(0, Math.min(12, state.screwLevel + dir));
    const y = state.baseY - state.screwLevel * 14;
    Body.setPosition(state.platform, { x: state.platform.position.x, y });
    Body.setAngle(state.head, state.screwLevel * 0.7);
    if (state.load) {
      Body.setPosition(state.load, {
        x: state.load.position.x,
        y: y - 38,
      });
      Body.setVelocity(state.load, { x: 0, y: 0 });
    }
    beep(dir > 0);
  }

  /* ========== UI ========== */
  function openLab(id) {
    currentId = id;
    const m = MACHINES.find((x) => x.id === id);
    els.hub.classList.add("is-hidden");
    els.stage.classList.add("is-active");
    els.goal.innerHTML = "<strong>Goal:</strong> " + (m ? m.goal : "");
    els.hint.textContent = m ? m.hint : "";
    els.stageTitle.textContent = m ? m.icon + " " + m.name : "Lab";

    $$(".ctrl").forEach((el) => {
      const f = el.getAttribute("data-for") || "";
      el.hidden = !(f === id || f === "all" || f.split(" ").includes(id));
    });

    // read controls into state before setup
    if (id === "lever") {
      const s = $("ctrl-fulcrum");
      state.fulcrumRatio = s ? Number(s.value) : 0.45;
    }
    if (id === "plane") {
      const a = $("ctrl-plane-angle");
      const f = $("ctrl-plane-friction");
      const mode = document.querySelector('input[name="plane-mode"]:checked');
      state.planeAngle = a ? Number(a.value) : 0.32;
      state.planeFriction = f ? Number(f.value) : 0.15;
      state.planeMode = mode ? mode.value : "ball-down";
    }

    const map = {
      lever: setupLever,
      wheel: setupWheel,
      pulley: setupPulley,
      plane: setupPlane,
      wedge: setupWedge,
      screw: setupScrew,
    };
    if (map[id]) startEngine(map[id]);
  }

  function closeLab() {
    state.spinning = false;
    stopLab();
    currentId = null;
    els.stage.classList.remove("is-active");
    els.hub.classList.remove("is-hidden");
  }

  function resetLab() {
    if (currentId) openLab(currentId);
  }

  function buildHub() {
    els.hubGrid.innerHTML = "";
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
      els.hubGrid.appendChild(b);
    });
  }

  function bind() {
    els.btnBack.addEventListener("click", closeLab);
    els.btnReset.addEventListener("click", resetLab);

    const fulcrum = $("ctrl-fulcrum");
    if (fulcrum) {
      fulcrum.addEventListener("input", () => {
        $("val-fulcrum").textContent = Math.round(Number(fulcrum.value) * 100) + "%";
      });
      fulcrum.addEventListener("change", () => {
        if (currentId === "lever") openLab("lever");
      });
    }

    const angle = $("ctrl-plane-angle");
    if (angle) {
      angle.addEventListener("input", () => {
        $("val-plane-angle").textContent = Math.round((Number(angle.value) * 180) / Math.PI) + "°";
      });
      angle.addEventListener("change", () => {
        if (currentId === "plane") openLab("plane");
      });
    }
    const fr = $("ctrl-plane-friction");
    if (fr) {
      fr.addEventListener("input", () => {
        $("val-plane-friction").textContent = Number(fr.value).toFixed(2);
      });
      fr.addEventListener("change", () => {
        if (currentId === "plane") openLab("plane");
      });
    }
    $$('input[name="plane-mode"]').forEach((r) => {
      r.addEventListener("change", () => {
        if (currentId === "plane") openLab("plane");
      });
    });

    const spin = $("btn-spin-wheel");
    if (spin) {
      const start = () => { state.spinning = true; };
      const stop = () => { state.spinning = false; };
      spin.addEventListener("mousedown", start);
      spin.addEventListener("mouseup", stop);
      spin.addEventListener("mouseleave", stop);
      spin.addEventListener("touchstart", (e) => { e.preventDefault(); start(); }, { passive: false });
      spin.addEventListener("touchend", stop);
    }

    const drive = $("btn-drive-wedge");
    if (drive) drive.addEventListener("click", driveWedge);

    const scw = $("btn-screw-cw");
    const scc = $("btn-screw-ccw");
    if (scw) scw.addEventListener("click", () => turnScrew(1));
    if (scc) scc.addEventListener("click", () => turnScrew(-1));

    window.addEventListener("resize", () => {
      if (!currentId) return;
      clearTimeout(bind._rz);
      bind._rz = setTimeout(() => openLab(currentId), 180);
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
    buildHub();
    bind();
  });
})();
