/**
 * Simple Machines Lab — open physics sandboxes (Matter.js)
 * No win conditions. Gravity + mass. Fidget & test.
 */
(function () {
  "use strict";
  const M = window.Matter;
  if (!M) {
    console.error("Matter.js missing");
    return;
  }
  const {
    Engine, Render, Runner, Bodies, Body, Composite, Constraint,
    Mouse, MouseConstraint, Events, Query, Common
  } = M;

  const STATIONS = [
    { id: "lever", icon: "⚖️", name: "Lever", tip: "Place the two yellow pivots. Rest the plank on them. Drop the box or elephant and watch the seesaw." },
    { id: "pulley", icon: "🪝", name: "Pulley", tip: "Three wheels are fixed. Drag the rope ends. Tap a weight, then a hook to attach. Pull an end to lift the other." },
    { id: "plane", icon: "📐", name: "Inclined Plane", tip: "Use Up / Down to tilt the ramp. Drop shapes from the top bar onto the ramp." },
    { id: "wheel", icon: "🎡", name: "Wheel & Axle", tip: "Top view: spin each coloured wheel to nudge the car in that direction. No goal — just drive." },
    { id: "wedge", icon: "🪓", name: "Wedge", tip: "Drag the gold wedge through the sand pile or the string tree. Sand falls; strings snap." },
    { id: "screw", icon: "🔩", name: "Screw", tip: "Drag in a circle on a screw head — or use Turn — to drive it into or out of the wood." },
  ];

  let engine, render, runner, mouseConstraint, currentId = null;
  let voice = null;
  let tipText = "";
  let planeAngle = 0.35;
  let planeBody = null;
  let screwState = {};
  let wheelCars = null;
  let ropeEnds = [];
  let hooks = [];
  let weights = [];
  let pendingAttach = null;

  const $ = (id) => document.getElementById(id);

  function worldSize() {
    const wrap = $("canvas-wrap");
    const w = Math.max(320, Math.min(wrap.clientWidth || 900, 1100));
    const h = Math.min(Math.max(Math.round(w * 0.62), 360), 560);
    return { w, h };
  }

  function stopWorld() {
    if (runner) { Runner.stop(runner); runner = null; }
    if (render) { Render.stop(render); render = null; }
    if (engine) {
      Composite.clear(engine.world, false);
      Engine.clear(engine);
      engine = null;
    }
    mouseConstraint = null;
    planeBody = null;
    ropeEnds = [];
    hooks = [];
    weights = [];
    pendingAttach = null;
    screwState = {};
    wheelCars = null;
  }

  function startWorld(setupFn) {
    stopWorld();
    const { w, h } = worldSize();
    const canvas = $("world");
    canvas.width = w;
    canvas.height = h;

    engine = Engine.create({ gravity: { x: 0, y: 1 } });
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
      constraint: { stiffness: 0.2, damping: 0.1, render: { visible: false } },
    });
    // Do not drag static pivots / fixed pulleys via mouse unless labelled movable
    Events.on(mouseConstraint, "startdrag", (e) => {
      const b = e.body;
      if (b && b.isStatic && !b.plugin?.movable) {
        mouseConstraint.constraint.bodyB = null;
        mouseConstraint.body = null;
      }
    });
    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    canvas.addEventListener("touchmove", (e) => {
      if (e.touches.length) e.preventDefault();
    }, { passive: false });

    setupFn(w, h);

    // Soft bounds recovery
    Events.on(engine, "beforeUpdate", () => {
      Composite.allBodies(engine.world).forEach((b) => {
        if (b.isStatic) return;
        const sp = Math.hypot(b.velocity.x, b.velocity.y);
        if (sp > 25) Body.setVelocity(b, { x: b.velocity.x * 0.5, y: b.velocity.y * 0.5 });
        if (b.position.y > h + 120) {
          Body.setPosition(b, { x: Math.min(w - 40, Math.max(40, b.position.x)), y: 40 });
          Body.setVelocity(b, { x: 0, y: 0 });
        }
      });
      if (currentId === "screw" && screwState.screws) updateScrews();
      if (currentId === "wheel" && wheelCars) updateWheelDrive();
    });

    Render.run(render);
    runner = Runner.create();
    Runner.run(runner, engine);
  }

  function walls(w, h) {
    const o = { isStatic: true, friction: 0.9, render: { fillStyle: "#243552" } };
    return [
      Bodies.rectangle(w / 2, h + 30, w + 80, 80, { ...o, label: "floor" }),
      Bodies.rectangle(-30, h / 2, 60, h * 2, { ...o, render: { visible: false } }),
      Bodies.rectangle(w + 30, h / 2, 60, h * 2, { ...o, render: { visible: false } }),
    ];
  }

  /* ========== LEVER ========== */
  function setupLever(w, h) {
    const floorY = h - 40;
    // Two movable static pivots
    const p1 = Bodies.circle(w * 0.35, floorY - 8, 18, {
      isStatic: true,
      friction: 0.9,
      render: { fillStyle: "#ffc857" },
      label: "pivot",
      plugin: { movable: true },
    });
    const p2 = Bodies.circle(w * 0.55, floorY - 8, 18, {
      isStatic: true,
      friction: 0.9,
      render: { fillStyle: "#ffc857" },
      label: "pivot",
      plugin: { movable: true },
    });
    // Plank — reacts to gravity
    const plank = Bodies.rectangle(w * 0.45, floorY - 50, Math.min(w * 0.7, 420), 16, {
      density: 0.002,
      friction: 0.8,
      frictionStatic: 0.9,
      restitution: 0.05,
      render: { fillStyle: "#c4a574", strokeStyle: "#8b6914", lineWidth: 1 },
      label: "plank",
    });
    // Box — mass
    const box = Bodies.rectangle(w * 0.25, 80, 44, 44, {
      density: 0.004,
      friction: 0.5,
      render: { fillStyle: "#ff6b7a" },
      label: "box",
    });
    // Elephant — heavier
    const elephant = Bodies.circle(w * 0.7, 70, 36, {
      density: 0.012,
      friction: 0.5,
      render: { fillStyle: "#a78bfa" },
      label: "elephant",
    });

    Composite.add(engine.world, [...walls(w, h), p1, p2, plank, box, elephant]);

    // Allow dragging static pivots by converting temporarily
    Events.on(mouseConstraint, "startdrag", (ev) => {
      if (ev.body && ev.body.label === "pivot") {
        Body.setStatic(ev.body, false);
        ev.body._wasPivot = true;
      }
    });
    Events.on(mouseConstraint, "enddrag", (ev) => {
      if (ev.body && ev.body._wasPivot) {
        Body.setStatic(ev.body, true);
        Body.setVelocity(ev.body, { x: 0, y: 0 });
        Body.setAngularVelocity(ev.body, 0);
        ev.body._wasPivot = false;
      }
    });
  }

  /* ========== PULLEY ========== */
  function setupPulley(w, h) {
    const py = 55;
    const xs = [w * 0.25, w * 0.5, w * 0.75];
    const wheels = xs.map((x) =>
      Bodies.circle(x, py, 22, {
        isStatic: true,
        render: { fillStyle: "#5ec8ff", strokeStyle: "#fff", lineWidth: 2 },
        label: "pulley-wheel",
      })
    );

    // Rope as chain of small circles
    const segs = [];
    const n = 28;
    for (let i = 0; i < n; i++) {
      const x = w * 0.2 + (i / (n - 1)) * w * 0.6;
      const y = py + 40 + Math.sin(i * 0.3) * 10;
      const s = Bodies.circle(x, y, 5, {
        density: 0.0008,
        friction: 0.1,
        restitution: 0.05,
        render: { fillStyle: "#cfd9ea" },
        label: "rope",
      });
      segs.push(s);
    }
    const constraints = [];
    for (let i = 0; i < n - 1; i++) {
      constraints.push(
        Constraint.create({
          bodyA: segs[i],
          bodyB: segs[i + 1],
          stiffness: 0.9,
          length: 14,
          render: { strokeStyle: "#9bb0d0", lineWidth: 2 },
        })
      );
    }
    // Hooks at ends
    const hookL = Bodies.circle(segs[0].position.x, segs[0].position.y, 12, {
      density: 0.002,
      render: { fillStyle: "#ffc857" },
      label: "hook",
    });
    const hookR = Bodies.circle(segs[n - 1].position.x, segs[n - 1].position.y, 12, {
      density: 0.002,
      render: { fillStyle: "#ffc857" },
      label: "hook",
    });
    constraints.push(
      Constraint.create({ bodyA: hookL, bodyB: segs[0], length: 8, stiffness: 1, render: { visible: false } }),
      Constraint.create({ bodyA: hookR, bodyB: segs[n - 1], length: 8, stiffness: 1, render: { visible: false } })
    );
    hooks = [hookL, hookR];

    // Weights
    const w1 = Bodies.rectangle(w * 0.15, h - 100, 36, 36, {
      density: 0.003,
      render: { fillStyle: "#ff6b7a" },
      label: "weight",
    });
    const w2 = Bodies.rectangle(w * 0.5, h - 100, 40, 40, {
      density: 0.006,
      render: { fillStyle: "#f472b6" },
      label: "weight",
    });
    const w3 = Bodies.circle(w * 0.85, h - 100, 28, {
      density: 0.01,
      render: { fillStyle: "#a78bfa" },
      label: "weight",
    });
    weights = [w1, w2, w3];

    Composite.add(engine.world, [...walls(w, h), ...wheels, ...segs, ...constraints, hookL, hookR, w1, w2, w3]);

    // Click attach: select weight then hook
    Events.on(mouseConstraint, "mousedown", (ev) => {
      const bodies = Query.point(Composite.allBodies(engine.world), ev.mouse.position);
      const hit = bodies.find((b) => b.label === "weight" || b.label === "hook");
      if (!hit) return;
      if (hit.label === "weight") {
        pendingAttach = hit;
        return;
      }
      if (hit.label === "hook" && pendingAttach) {
        Composite.add(engine.world, Constraint.create({
          bodyA: pendingAttach,
          bodyB: hit,
          length: 28,
          stiffness: 0.9,
          render: { strokeStyle: "#ffc857", lineWidth: 2 },
        }));
        pendingAttach = null;
      }
    });
  }

  /* ========== INCLINED PLANE ========== */
  function setupPlane(w, h) {
    planeAngle = 0.35;
    const rampLen = Math.min(w * 0.78, 500);
    planeBody = Bodies.rectangle(w * 0.48, h - 90, rampLen, 20, {
      isStatic: true,
      angle: -planeAngle,
      friction: 0.25,
      render: { fillStyle: "#6b8caf" },
      label: "ramp",
    });
    // hinge visual at left
    const hinge = Bodies.circle(w * 0.12, h - 50, 10, {
      isStatic: true,
      render: { fillStyle: "#ffc857" },
    });
    Composite.add(engine.world, [...walls(w, h), planeBody, hinge]);
    spawnPlaneShapes(w, h);
  }

  function spawnPlaneShapes(w, h) {
    const shapes = [
      Bodies.rectangle(w * 0.2, 50, 36, 36, { density: 0.003, render: { fillStyle: "#ff6b7a" }, label: "obj" }),
      Bodies.circle(w * 0.35, 50, 20, { density: 0.002, friction: 0.05, render: { fillStyle: "#5ec8ff" }, label: "obj" }),
      Bodies.polygon(w * 0.5, 50, 3, 24, { density: 0.004, render: { fillStyle: "#ffc857" }, label: "obj" }),
      Bodies.rectangle(w * 0.65, 45, 50, 28, { density: 0.008, render: { fillStyle: "#a78bfa" }, label: "obj" }),
      Bodies.circle(w * 0.8, 50, 14, { density: 0.0015, friction: 0.02, render: { fillStyle: "#3dd68c" }, label: "obj" }),
    ];
    Composite.add(engine.world, shapes);
  }

  function tiltPlane(dir) {
    if (!planeBody || currentId !== "plane") return;
    planeAngle = Math.max(0.05, Math.min(0.7, planeAngle + dir * 0.05));
    // Rebuild ramp angle around left hinge approximation
    const { w, h } = worldSize();
    const rampLen = Math.min(w * 0.78, 500);
    const leftX = w * 0.12;
    const leftY = h - 50;
    const cx = leftX + Math.cos(-planeAngle) * (rampLen / 2);
    const cy = leftY + Math.sin(-planeAngle) * (rampLen / 2);
    Body.setPosition(planeBody, { x: cx, y: cy });
    Body.setAngle(planeBody, -planeAngle);
  }

  /* ========== WHEEL (top-down, no gravity on car plane) ========== */
  function setupWheel(w, h) {
    engine.gravity.y = 0;
    engine.gravity.x = 0;
    // Arena
    const border = walls(w, h).map((b) => {
      b.render.fillStyle = "#1a2740";
      return b;
    });
    const car = Bodies.rectangle(w / 2, h / 2, 50, 30, {
      density: 0.01,
      frictionAir: 0.05,
      render: { fillStyle: "#ff6b7a" },
      label: "car",
    });
    // Direction wheels (visual + interactive)
    const dirs = [
      { x: 70, y: 70, color: "#5ec8ff", vx: 0, vy: -1, label: "N" },
      { x: 70, y: h - 70, color: "#3dd68c", vx: 0, vy: 1, label: "S" },
      { x: 70, y: h / 2, color: "#ffc857", vx: -1, vy: 0, label: "W" },
      { x: w - 70, y: h / 2, color: "#f472b6", vx: 1, vy: 0, label: "E" },
      { x: w - 70, y: 70, color: "#a78bfa", vx: 0.7, vy: -0.7, label: "NE" },
      { x: w - 70, y: h - 70, color: "#fb923c", vx: 0.7, vy: 0.7, label: "SE" },
    ];
    const wheels = dirs.map((d) => {
      const wh = Bodies.circle(d.x, d.y, 32, {
        isStatic: true,
        render: { fillStyle: d.color, strokeStyle: "#fff", lineWidth: 3 },
        label: "dir-wheel",
        plugin: { movable: false, drive: d },
      });
      return wh;
    });
    wheelCars = { car, wheels, spinning: null };
    Composite.add(engine.world, [...border, car, ...wheels]);

    Events.on(mouseConstraint, "startdrag", (ev) => {
      if (ev.body && ev.body.label === "dir-wheel") {
        wheelCars.spinning = ev.body;
      }
    });
    Events.on(mouseConstraint, "enddrag", () => {
      if (wheelCars) wheelCars.spinning = null;
    });
  }

  function updateWheelDrive() {
    if (!wheelCars || !wheelCars.spinning) return;
    const d = wheelCars.spinning.plugin.drive;
    const car = wheelCars.car;
    Body.applyForce(car, car.position, { x: d.vx * 0.004, y: d.vy * 0.004 });
    Body.setAngularVelocity(wheelCars.spinning, 0.3);
  }

  /* ========== WEDGE + SAND + STRING TREE ========== */
  function setupWedge(w, h) {
    const sand = [];
    const cols = 14;
    const rows = 8;
    const startX = w * 0.55;
    const startY = h - 80;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols - r; c++) {
        const s = Bodies.circle(startX + c * 12 - (cols - r) * 6, startY - r * 12, 6, {
          density: 0.001,
          friction: 0.4,
          restitution: 0.05,
          render: { fillStyle: r % 2 ? "#e8c07a" : "#d4a574" },
          label: "sand",
        });
        sand.push(s);
      }
    }
    // String tree — vertical constraints that break
    const treeX = w * 0.2;
    const trunk = [];
    for (let i = 0; i < 8; i++) {
      trunk.push(
        Bodies.circle(treeX, h - 60 - i * 22, 6, {
          density: 0.0005,
          render: { fillStyle: "#4ade80" },
          label: "string",
        })
      );
    }
    const treeC = [];
    for (let i = 0; i < trunk.length - 1; i++) {
      treeC.push(
        Constraint.create({
          bodyA: trunk[i],
          bodyB: trunk[i + 1],
          length: 20,
          stiffness: 0.8,
          render: { strokeStyle: "#22c55e", lineWidth: 2 },
          label: "string-link",
        })
      );
    }
    // root static
    const root = Bodies.circle(treeX, h - 40, 8, {
      isStatic: true,
      render: { fillStyle: "#854d0e" },
    });
    treeC.push(
      Constraint.create({
        bodyA: root,
        bodyB: trunk[0],
        length: 16,
        stiffness: 1,
        render: { strokeStyle: "#854d0e", lineWidth: 3 },
      })
    );

    const wedge = Bodies.polygon(w * 0.4, h - 100, 3, 36, {
      density: 0.008,
      friction: 0.1,
      angle: Math.PI,
      render: { fillStyle: "#ffc857", strokeStyle: "#fff", lineWidth: 1 },
      label: "wedge",
    });

    Composite.add(engine.world, [...walls(w, h), ...sand, ...trunk, root, ...treeC, wedge]);

    // Break string constraints on strong wedge contact
    Events.on(engine, "collisionStart", (ev) => {
      ev.pairs.forEach((p) => {
        const a = p.bodyA;
        const b = p.bodyB;
        const isW = (x) => x.label === "wedge";
        const isS = (x) => x.label === "string";
        if ((isW(a) && isS(b)) || (isW(b) && isS(a))) {
          const all = Composite.allConstraints(engine.world);
          all.forEach((c) => {
            if (
              c.bodyA &&
              c.bodyB &&
              (c.bodyA === a || c.bodyA === b || c.bodyB === a || c.bodyB === b)
            ) {
              if (c.label === "string-link" || (c.bodyA.label === "string" || c.bodyB.label === "string")) {
                Composite.remove(engine.world, c);
              }
            }
          });
        }
      });
    });
  }

  /* ========== SCREW ========== */
  function setupScrew(w, h) {
    engine.gravity.y = 0.3;
    const board = Bodies.rectangle(w / 2, h * 0.55, w * 0.75, h * 0.35, {
      isStatic: true,
      render: { fillStyle: "#6b4423", strokeStyle: "#3d2817", lineWidth: 2 },
      label: "board",
    });
    const screws = [];
    const positions = [
      [w * 0.3, h * 0.45],
      [w * 0.5, h * 0.5],
      [w * 0.7, h * 0.45],
      [w * 0.4, h * 0.62],
      [w * 0.6, h * 0.62],
    ];
    positions.forEach(([x, y], i) => {
      const head = Bodies.circle(x, y, 22, {
        isStatic: true,
        render: { fillStyle: "#9ca3af", strokeStyle: "#fff", lineWidth: 2 },
        label: "screw-head",
        plugin: { depth: 0, max: 8, idx: i, baseY: y },
      });
      screws.push(head);
    });
    screwState = { screws, active: null, lastAngle: null };
    Composite.add(engine.world, [...walls(w, h), board, ...screws]);

    Events.on(mouseConstraint, "startdrag", (ev) => {
      if (ev.body && ev.body.label === "screw-head") {
        screwState.active = ev.body;
        const p = mouseConstraint.mouse.position;
        screwState.lastAngle = Math.atan2(p.y - ev.body.position.y, p.x - ev.body.position.x);
        // prevent actually moving the static body
        Body.setStatic(ev.body, true);
      }
    });
    Events.on(mouseConstraint, "enddrag", () => {
      screwState.active = null;
      screwState.lastAngle = null;
    });
  }

  function updateScrews() {
    if (!screwState.active || screwState.lastAngle == null) return;
    const head = screwState.active;
    const p = mouseConstraint.mouse.position;
    const a = Math.atan2(p.y - head.position.y, p.x - head.position.x);
    let d = a - screwState.lastAngle;
    if (d > Math.PI) d -= Math.PI * 2;
    if (d < -Math.PI) d += Math.PI * 2;
    if (Math.abs(d) > 0.2) {
      const dir = d > 0 ? 1 : -1;
      head.plugin.depth = Math.max(0, Math.min(head.plugin.max, head.plugin.depth + dir * 0.4));
      screwState.lastAngle = a;
      const scale = 1 - head.plugin.depth * 0.06;
      // visual: smaller as driven in
      Body.set(head, {
        circleRadius: 22 * scale,
      });
      head.render.fillStyle = head.plugin.depth > 5 ? "#6b7280" : "#9ca3af";
    }
  }

  function turnScrewBtn(dir) {
    if (currentId !== "screw" || !screwState.screws) return;
    // turn the nearest to center or last active
    const head = screwState.active || screwState.screws[0];
    head.plugin.depth = Math.max(0, Math.min(head.plugin.max, head.plugin.depth + dir));
    const scale = 1 - head.plugin.depth * 0.06;
    Body.set(head, { circleRadius: Math.max(8, 22 * scale) });
  }

  /* ========== UI ========== */
  function show(lab) {
    $("view-lab").hidden = !lab;
    $("view-sandbox").hidden = lab;
    $("btn-lab").hidden = lab;
    $("btn-hear").hidden = lab;
  }

  function openStation(id) {
    currentId = id;
    const st = STATIONS.find((s) => s.id === id);
    tipText = st ? st.tip : "";
    $("sb-title").textContent = (st ? st.icon + " " + st.name : "") + " · sandbox";
    $("sb-tip").textContent = tipText;
    const tb = $("sb-toolbar");
    tb.innerHTML = "";

    if (id === "plane") {
      tb.innerHTML =
        '<button type="button" class="btn btn-primary" id="btn-tilt-up">Ramp Up</button>' +
        '<button type="button" class="btn btn-primary" id="btn-tilt-down">Ramp Down</button>' +
        '<button type="button" class="btn btn-ghost" id="btn-drop-shapes">Drop more shapes</button>';
    } else if (id === "screw") {
      tb.innerHTML =
        '<button type="button" class="btn btn-primary" id="btn-screw-in">Turn in ↻</button>' +
        '<button type="button" class="btn btn-ghost" id="btn-screw-out">Turn out ↺</button>';
    } else if (id === "pulley") {
      tb.innerHTML = '<span class="hint-inline">Tap a weight, then a gold hook to attach. Drag rope ends to pull.</span>';
    } else if (id === "lever") {
      tb.innerHTML = '<span class="hint-inline">Yellow circles = pivots (drag them). Brown = plank. Red box & purple elephant have mass.</span>';
    }

    show(false);
    const setups = {
      lever: setupLever,
      pulley: setupPulley,
      plane: setupPlane,
      wheel: setupWheel,
      wedge: setupWedge,
      screw: setupScrew,
    };
    if (setups[id]) startWorld(setups[id]);

    // bind toolbar after inject
    setTimeout(() => {
      const up = $("btn-tilt-up");
      const down = $("btn-tilt-down");
      const more = $("btn-drop-shapes");
      if (up) up.onclick = () => tiltPlane(1);
      if (down) down.onclick = () => tiltPlane(-1);
      if (more) more.onclick = () => {
        const { w, h } = worldSize();
        spawnPlaneShapes(w, h);
      };
      const si = $("btn-screw-in");
      const so = $("btn-screw-out");
      if (si) si.onclick = () => turnScrewBtn(1);
      if (so) so.onclick = () => turnScrewBtn(-1);
    }, 0);
  }

  function buildLab() {
    const grid = $("station-grid");
    grid.innerHTML = "";
    STATIONS.forEach((s) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "station";
      b.innerHTML =
        '<span class="st-icon">' +
        s.icon +
        '</span><span class="st-name">' +
        s.name +
        '</span><span class="st-go">Open sandbox</span>';
      b.addEventListener("click", () => openStation(s.id));
      grid.appendChild(b);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    buildLab();
    show(true);

    if (window.TokenMooseVoice) {
      voice = TokenMooseVoice.create("simple-machines");
      const slot = $("voice-slot");
      if (slot) voice.mountPicker(slot);
    }

    $("btn-lab").addEventListener("click", () => {
      stopWorld();
      currentId = null;
      show(true);
    });
    $("btn-reset").addEventListener("click", () => {
      if (currentId) openStation(currentId);
    });
    $("btn-hear").addEventListener("click", () => {
      if (voice && tipText) voice.speak(tipText);
      else if (tipText && window.speechSynthesis) {
        const u = new SpeechSynthesisUtterance(tipText);
        speechSynthesis.speak(u);
      }
    });

    window.addEventListener("resize", () => {
      if (!currentId) return;
      clearTimeout(window._smR);
      window._smR = setTimeout(() => openStation(currentId), 200);
    });
  });
})();
