/**
 * Simple Machines Lab — open sandboxes (Matter.js)
 * Fixes: single voice (app-chrome), stable pulley, plane hinge,
 * wheel car, wedge tree, vertical screws
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
    Mouse, MouseConstraint, Events, Query
  } = M;

  const STATIONS = [
    { id: "lever", icon: "⚖️", name: "Lever", tip: "Place the two yellow pivots. Rest the plank on them. Drop the box or elephant and watch the seesaw." },
    { id: "pulley", icon: "🪝", name: "Pulley", tip: "Three wheels are fixed. Drag a gold hook. Tap a weight, then a hook to attach. Pull to lift." },
    { id: "plane", icon: "📐", name: "Inclined Plane", tip: "Use Up / Down to tilt the ramp. Drop shapes onto the ramp." },
    { id: "wheel", icon: "🎡", name: "Wheel & Axle", tip: "Drag around a coloured wheel to turn it. The car only moves while you turn." },
    { id: "wedge", icon: "🪓", name: "Wedge", tip: "Drag the gold wedge through the tree. Cut branches fall; the rest stays." },
    { id: "screw", icon: "🔩", name: "Screw", tip: "Drag in a circle on a screw head — or use Turn — to drive screws into the wood." },
  ];

  let engine, render, runner, mouseConstraint, currentId = null;
  let voice = null;
  let tipText = "";
  let planeAngle = 0.35;
  let planeBody = null;
  let planeHinge = null;
  let planeLen = 400;
  let screwState = {};
  let wheelCars = null;
  let pendingAttach = null;
  let treeNodes = [];

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
    planeHinge = null;
    pendingAttach = null;
    screwState = {};
    wheelCars = null;
    treeNodes = [];
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
      constraint: { stiffness: 0.2, damping: 0.15, render: { visible: false } },
    });
    Events.on(mouseConstraint, "startdrag", (e) => {
      const b = e.body;
      if (b && b.isStatic && !b.plugin?.movable && b.label !== "screw-head" && b.label !== "dir-wheel") {
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

    Events.on(engine, "beforeUpdate", () => {
      if (!engine) return;
      Composite.allBodies(engine.world).forEach((b) => {
        if (b.isStatic) return;
        const sp = Math.hypot(b.velocity.x, b.velocity.y);
        if (sp > 18) Body.setVelocity(b, { x: b.velocity.x * 0.4, y: b.velocity.y * 0.4 });
        if (b.position.y > h + 100) {
          Body.setPosition(b, { x: Math.min(w - 40, Math.max(40, b.position.x)), y: 50 });
          Body.setVelocity(b, { x: 0, y: 0 });
        }
      });
      if (currentId === "screw" && screwState.screws) updateScrews();
      if (currentId === "wheel" && wheelCars) updateWheelDrive();
      if (currentId === "pulley") dampRope();
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

  function dampRope() {
    Composite.allBodies(engine.world).forEach((b) => {
      if (b.label === "rope" || b.label === "hook") {
        Body.setVelocity(b, { x: b.velocity.x * 0.92, y: b.velocity.y * 0.92 });
        Body.setAngularVelocity(b, b.angularVelocity * 0.9);
      }
    });
  }

  /* ========== LEVER ========== */
  function setupLever(w, h) {
    const floorY = h - 40;
    const p1 = Bodies.circle(w * 0.35, floorY - 8, 18, {
      isStatic: true, friction: 0.9,
      render: { fillStyle: "#ffc857" }, label: "pivot", plugin: { movable: true },
    });
    const p2 = Bodies.circle(w * 0.55, floorY - 8, 18, {
      isStatic: true, friction: 0.9,
      render: { fillStyle: "#ffc857" }, label: "pivot", plugin: { movable: true },
    });
    const plank = Bodies.rectangle(w * 0.45, floorY - 50, Math.min(w * 0.7, 420), 16, {
      density: 0.002, friction: 0.8, frictionStatic: 0.9, restitution: 0.02,
      render: { fillStyle: "#c4a574", strokeStyle: "#8b6914", lineWidth: 1 }, label: "plank",
    });
    const box = Bodies.rectangle(w * 0.25, 80, 44, 44, {
      density: 0.004, friction: 0.5, render: { fillStyle: "#ff6b7a" }, label: "box",
    });
    const elephant = Bodies.circle(w * 0.7, 70, 36, {
      density: 0.012, friction: 0.5, render: { fillStyle: "#a78bfa" }, label: "elephant",
    });
    Composite.add(engine.world, [...walls(w, h), p1, p2, plank, box, elephant]);

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

  /* ========== PULLEY — stable rope (lower stiffness, damping, fewer segs) ========== */
  function setupPulley(w, h) {
    const py = 50;
    const xs = [w * 0.28, w * 0.5, w * 0.72];
    const wheels = xs.map((x) =>
      Bodies.circle(x, py, 20, {
        isStatic: true,
        render: { fillStyle: "#5ec8ff", strokeStyle: "#fff", lineWidth: 2 },
        label: "pulley-wheel",
      })
    );

    // Drape rope under the three wheels with soft constraints
    const segs = [];
    const n = 16;
    const leftX = w * 0.18;
    const rightX = w * 0.82;
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1);
      const x = leftX + t * (rightX - leftX);
      // hang below wheels
      let y = py + 55;
      if (t > 0.2 && t < 0.8) y = py + 35;
      if (t < 0.12 || t > 0.88) y = py + 90;
      const s = Bodies.circle(x, y, 6, {
        density: 0.0004,
        friction: 0.05,
        frictionAir: 0.05,
        restitution: 0,
        collisionFilter: { group: -1 }, // rope segs don't collide with each other
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
          stiffness: 0.55,
          damping: 0.12,
          length: 18,
          render: { strokeStyle: "#9bb0d0", lineWidth: 3 },
        })
      );
    }
    // soft pin near each wheel (not rigid — reduces shake)
    xs.forEach((x, wi) => {
      const nearest = segs.reduce((best, s) =>
        Math.abs(s.position.x - x) < Math.abs(best.position.x - x) ? s : best
      );
      constraints.push(
        Constraint.create({
          pointA: { x, y: py + 18 },
          bodyB: nearest,
          stiffness: 0.15,
          damping: 0.2,
          length: 8,
          render: { visible: false },
        })
      );
    });

    const hookL = Bodies.circle(segs[0].position.x, segs[0].position.y + 10, 14, {
      density: 0.0015, frictionAir: 0.04,
      render: { fillStyle: "#ffc857" }, label: "hook",
    });
    const hookR = Bodies.circle(segs[n - 1].position.x, segs[n - 1].position.y + 10, 14, {
      density: 0.0015, frictionAir: 0.04,
      render: { fillStyle: "#ffc857" }, label: "hook",
    });
    constraints.push(
      Constraint.create({ bodyA: hookL, bodyB: segs[0], length: 10, stiffness: 0.7, damping: 0.1, render: { visible: false } }),
      Constraint.create({ bodyA: hookR, bodyB: segs[n - 1], length: 10, stiffness: 0.7, damping: 0.1, render: { visible: false } })
    );

    const w1 = Bodies.rectangle(w * 0.15, h - 100, 36, 36, {
      density: 0.003, frictionAir: 0.02, render: { fillStyle: "#ff6b7a" }, label: "weight",
    });
    const w2 = Bodies.rectangle(w * 0.5, h - 100, 40, 40, {
      density: 0.006, frictionAir: 0.02, render: { fillStyle: "#f472b6" }, label: "weight",
    });
    const w3 = Bodies.circle(w * 0.85, h - 100, 28, {
      density: 0.01, frictionAir: 0.02, render: { fillStyle: "#a78bfa" }, label: "weight",
    });

    Composite.add(engine.world, [...walls(w, h), ...wheels, ...segs, ...constraints, hookL, hookR, w1, w2, w3]);

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
          length: 30,
          stiffness: 0.85,
          damping: 0.05,
          render: { strokeStyle: "#ffc857", lineWidth: 2 },
        }));
        pendingAttach = null;
      }
    });
  }

  /* ========== PLANE — correct initial hinge position ========== */
  function placeRamp() {
    if (!planeBody || !planeHinge) return;
    const { w } = worldSize();
    const leftX = planeHinge.position.x;
    const leftY = planeHinge.position.y;
    const cx = leftX + Math.cos(-planeAngle) * (planeLen / 2);
    const cy = leftY + Math.sin(-planeAngle) * (planeLen / 2);
    Body.setPosition(planeBody, { x: cx, y: cy });
    Body.setAngle(planeBody, -planeAngle);
  }

  function setupPlane(w, h) {
    planeAngle = 0.35;
    planeLen = Math.min(w * 0.78, 500);
    planeHinge = Bodies.circle(w * 0.12, h - 55, 10, {
      isStatic: true, render: { fillStyle: "#ffc857" },
    });
    planeBody = Bodies.rectangle(0, 0, planeLen, 20, {
      isStatic: true, friction: 0.25,
      render: { fillStyle: "#6b8caf" }, label: "ramp",
    });
    Composite.add(engine.world, [...walls(w, h), planeBody, planeHinge]);
    placeRamp();
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
    placeRamp();
  }

  /* ========== WHEEL — car sprite, only moves while turning, bounds ========== */
  function setupWheel(w, h) {
    engine.gravity.y = 0;
    engine.gravity.x = 0;
    const border = walls(w, h).map((b) => {
      b.render.fillStyle = "#1a2740";
      return b;
    });
    // Car body + visual wheels as compound-ish look
    const carBody = Bodies.rectangle(w / 2, h / 2, 56, 28, {
      density: 0.02, frictionAir: 0.12, friction: 0.2,
      render: { fillStyle: "#ef4444", strokeStyle: "#fff", lineWidth: 2 },
      label: "car",
    });
    const carCab = Bodies.rectangle(w / 2 + 8, h / 2 - 14, 28, 16, {
      density: 0.005, frictionAir: 0.12,
      render: { fillStyle: "#fca5a5", strokeStyle: "#fff", lineWidth: 1 },
      label: "car-cab",
    });
    const car = Body.create({
      parts: [carBody, carCab],
      frictionAir: 0.15,
      label: "car",
    });
    Body.setPosition(car, { x: w / 2, y: h / 2 });

    const dirs = [
      { x: 70, y: 70, color: "#5ec8ff", vx: 0, vy: -1 },
      { x: 70, y: h - 70, color: "#3dd68c", vx: 0, vy: 1 },
      { x: 70, y: h / 2, color: "#ffc857", vx: -1, vy: 0 },
      { x: w - 70, y: h / 2, color: "#f472b6", vx: 1, vy: 0 },
      { x: w - 70, y: 70, color: "#a78bfa", vx: 0.7, vy: -0.7 },
      { x: w - 70, y: h - 70, color: "#fb923c", vx: 0.7, vy: 0.7 },
    ];
    const wheels = dirs.map((d) => {
      const wh = Bodies.circle(d.x, d.y, 34, {
        isStatic: true,
        render: { fillStyle: d.color, strokeStyle: "#fff", lineWidth: 4 },
        label: "dir-wheel",
        plugin: { drive: d, angle: 0, spoke: true },
      });
      return wh;
    });
    wheelCars = { car, wheels, spinning: null, lastMouse: null, bounds: { w, h } };
    Composite.add(engine.world, [...border, car, ...wheels]);

    Events.on(mouseConstraint, "startdrag", (ev) => {
      if (ev.body && ev.body.label === "dir-wheel") {
        wheelCars.spinning = ev.body;
        wheelCars.lastMouse = { ...mouseConstraint.mouse.position };
        // don't actually drag the static wheel body
        mouseConstraint.constraint.bodyB = null;
        mouseConstraint.body = null;
      }
    });
    Events.on(mouseConstraint, "enddrag", () => {
      if (wheelCars) {
        wheelCars.spinning = null;
        wheelCars.lastMouse = null;
      }
    });
    // also track move while pointer down on wheel
    Events.on(mouseConstraint, "mousemove", () => {
      if (!wheelCars || !wheelCars.spinning) return;
      const p = mouseConstraint.mouse.position;
      const last = wheelCars.lastMouse;
      if (!last) {
        wheelCars.lastMouse = { ...p };
        return;
      }
      const dx = p.x - last.x;
      const dy = p.y - last.y;
      const dist = Math.hypot(dx, dy);
      if (dist > 2) {
        const d = wheelCars.spinning.plugin.drive;
        const force = dist * 0.00035;
        Body.applyForce(wheelCars.car, wheelCars.car.position, {
          x: d.vx * force,
          y: d.vy * force,
        });
        wheelCars.spinning.plugin.angle += dist * 0.08;
        // visual spin via render angle on a non-static clone is hard — rotate fill using Body.setAngle on a sensor
        // Use a thin spoke rectangle attached? Simpler: store angle and draw via render.sprite — Matter doesn't support easy.
        // Approximate: change stroke width pulse
        wheelCars.spinning.render.lineWidth = 4 + (wheelCars.spinning.plugin.angle % 10);
        wheelCars.lastMouse = { ...p };
      }
    });
  }

  function updateWheelDrive() {
    if (!wheelCars || !wheelCars.car) return;
    const car = wheelCars.car;
    const { w, h } = wheelCars.bounds;
    // clamp inside play area
    const m = 50;
    let x = car.position.x;
    let y = car.position.y;
    let vx = car.velocity.x;
    let vy = car.velocity.y;
    if (x < m) { x = m; vx = Math.abs(vx) * 0.3; }
    if (x > w - m) { x = w - m; vx = -Math.abs(vx) * 0.3; }
    if (y < m) { y = m; vy = Math.abs(vy) * 0.3; }
    if (y > h - m) { y = h - m; vy = -Math.abs(vy) * 0.3; }
    if (x !== car.position.x || y !== car.position.y) {
      Body.setPosition(car, { x, y });
      Body.setVelocity(car, { x: vx, y: vy });
    }
    // strong air friction when not spinning — stop coasting
    if (!wheelCars.spinning) {
      Body.setVelocity(car, { x: car.velocity.x * 0.85, y: car.velocity.y * 0.85 });
      Body.setAngularVelocity(car, car.angularVelocity * 0.8);
    }
  }

  /* ========== WEDGE — larger tree, static until cut ========== */
  function setupWedge(w, h) {
    const sand = [];
    const cols = 14;
    const rows = 8;
    const startX = w * 0.62;
    const startY = h - 80;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols - r; c++) {
        sand.push(
          Bodies.circle(startX + c * 12 - (cols - r) * 6, startY - r * 12, 6, {
            density: 0.001, friction: 0.4, restitution: 0.05,
            render: { fillStyle: r % 2 ? "#e8c07a" : "#d4a574" }, label: "sand",
          })
        );
      }
    }

    // Tree: root static, trunk + branches start as static (frozen), become dynamic when cut
    const treeX = w * 0.22;
    const root = Bodies.circle(treeX, h - 42, 14, {
      isStatic: true, render: { fillStyle: "#854d0e" }, label: "root",
    });
    const nodes = [];
    // trunk
    for (let i = 0; i < 7; i++) {
      nodes.push(
        Bodies.circle(treeX, h - 70 - i * 28, 10, {
          isStatic: true, // frozen until cut
          density: 0.0008,
          render: { fillStyle: "#16a34a" },
          label: "branch",
          plugin: { frozen: true, idx: i },
        })
      );
    }
    // side branches
    const branchTips = [
      [treeX - 40, h - 120], [treeX + 42, h - 140],
      [treeX - 50, h - 180], [treeX + 48, h - 200],
      [treeX - 35, h - 230], [treeX + 38, h - 250],
      [treeX - 20, h - 280], [treeX + 22, h - 290],
    ];
    branchTips.forEach(([x, y], i) => {
      nodes.push(
        Bodies.circle(x, y, 9, {
          isStatic: true,
          density: 0.0006,
          render: { fillStyle: "#22c55e" },
          label: "branch",
          plugin: { frozen: true, idx: 100 + i },
        })
      );
    });
    treeNodes = nodes;

    const links = [];
    // trunk chain
    for (let i = 0; i < 6; i++) {
      links.push(
        Constraint.create({
          bodyA: nodes[i], bodyB: nodes[i + 1],
          length: 26, stiffness: 0.9,
          render: { strokeStyle: "#15803d", lineWidth: 4 },
          label: "tree-link",
        })
      );
    }
    links.push(
      Constraint.create({
        bodyA: root, bodyB: nodes[0], length: 22, stiffness: 1,
        render: { strokeStyle: "#854d0e", lineWidth: 5 },
        label: "tree-link",
      })
    );
    // connect tips to nearby trunk
    for (let i = 0; i < branchTips.length; i++) {
      const tip = nodes[7 + i];
      const trunkIdx = Math.min(6, Math.floor(i / 2) + 2);
      links.push(
        Constraint.create({
          bodyA: nodes[trunkIdx], bodyB: tip,
          length: 36, stiffness: 0.85,
          render: { strokeStyle: "#16a34a", lineWidth: 3 },
          label: "tree-link",
        })
      );
    }

    const wedge = Bodies.polygon(w * 0.42, h - 120, 3, 42, {
      density: 0.01, friction: 0.05, frictionAir: 0.02,
      angle: Math.PI,
      render: { fillStyle: "#ffc857", strokeStyle: "#fff", lineWidth: 2 },
      label: "wedge",
    });

    Composite.add(engine.world, [...walls(w, h), ...sand, root, ...nodes, ...links, wedge]);

    // Rotate wedge toward grab direction on drag start
    Events.on(mouseConstraint, "startdrag", (ev) => {
      if (ev.body && ev.body.label === "wedge") {
        const p = mouseConstraint.mouse.position;
        const a = Math.atan2(p.y - ev.body.position.y, p.x - ev.body.position.x);
        Body.setAngle(ev.body, a + Math.PI / 2);
      }
    });
    Events.on(mouseConstraint, "mousemove", () => {
      if (!mouseConstraint.body || mouseConstraint.body.label !== "wedge") return;
      const b = mouseConstraint.body;
      const p = mouseConstraint.mouse.position;
      const a = Math.atan2(p.y - b.position.y, p.x - b.position.x);
      Body.setAngle(b, a + Math.PI / 2);
    });

    Events.on(engine, "collisionStart", (ev) => {
      ev.pairs.forEach((p) => {
        const a = p.bodyA;
        const b = p.bodyB;
        const isW = (x) => x.label === "wedge";
        const isBr = (x) => x.label === "branch";
        if (!((isW(a) && isBr(b)) || (isW(b) && isBr(a)))) return;
        const branch = isBr(a) ? a : b;
        // unfreeze this branch and remove links to it
        if (branch.plugin && branch.plugin.frozen) {
          branch.plugin.frozen = false;
          Body.setStatic(branch, false);
          Body.setVelocity(branch, { x: (Math.random() - 0.5) * 2, y: -1 });
        }
        Composite.allConstraints(engine.world).forEach((c) => {
          if (c.label === "tree-link" && (c.bodyA === branch || c.bodyB === branch)) {
            Composite.remove(engine.world, c);
          }
        });
      });
    });
  }

  /* ========== SCREW — vertical board, rotation animation ========== */
  function setupScrew(w, h) {
    engine.gravity.y = 0.2;
    // Vertical wood board (side view)
    const board = Bodies.rectangle(w * 0.55, h * 0.55, w * 0.35, h * 0.7, {
      isStatic: true,
      render: { fillStyle: "#6b4423", strokeStyle: "#3d2817", lineWidth: 2 },
      label: "board",
    });
    const screws = [];
    const positions = [
      [w * 0.35, h * 0.28],
      [w * 0.35, h * 0.42],
      [w * 0.35, h * 0.56],
      [w * 0.35, h * 0.70],
      [w * 0.35, h * 0.84],
    ];
    positions.forEach(([x, y], i) => {
      // shaft visual as thin rect + head circle
      const head = Bodies.circle(x, y, 20, {
        isStatic: true,
        render: { fillStyle: "#9ca3af", strokeStyle: "#fff", lineWidth: 2 },
        label: "screw-head",
        plugin: { depth: 0, max: 10, idx: i, baseX: x, baseY: y, rot: 0 },
      });
      screws.push(head);
    });
    screwState = { screws, active: null, lastAngle: null };
    Composite.add(engine.world, [...walls(w, h), board, ...screws]);

    Events.on(mouseConstraint, "startdrag", (ev) => {
      if (ev.body && ev.body.label === "screw-head") {
        screwState.active = ev.body;
        const p = mouseConstraint.mouse.position;
        screwState.lastAngle = Math.atan2(
          p.y - ev.body.position.y,
          p.x - ev.body.position.x
        );
        mouseConstraint.constraint.bodyB = null;
        mouseConstraint.body = null;
      }
    });
    Events.on(mouseConstraint, "enddrag", () => {
      screwState.active = null;
      screwState.lastAngle = null;
    });
    Events.on(mouseConstraint, "mousemove", () => {
      if (!screwState.active || screwState.lastAngle == null) return;
      applyScrewRotation(screwState.active, mouseConstraint.mouse.position);
    });
  }

  function applyScrewRotation(head, p) {
    const a = Math.atan2(p.y - head.position.y, p.x - head.position.x);
    let d = a - screwState.lastAngle;
    if (d > Math.PI) d -= Math.PI * 2;
    if (d < -Math.PI) d += Math.PI * 2;
    if (Math.abs(d) > 0.15) {
      const dir = d > 0 ? 1 : -1;
      head.plugin.depth = Math.max(0, Math.min(head.plugin.max, head.plugin.depth + dir * 0.35));
      head.plugin.rot += d;
      screwState.lastAngle = a;
      // move right into wood as depth increases
      const inset = head.plugin.depth * 6;
      Body.setPosition(head, {
        x: head.plugin.baseX + inset,
        y: head.plugin.baseY,
      });
      // pulse size slightly with rotation for "spin" feel
      const pulse = 1 + 0.08 * Math.sin(head.plugin.rot * 2);
      const baseR = Math.max(10, 20 - head.plugin.depth * 0.8);
      Body.set(head, { circleRadius: baseR * pulse });
      head.render.fillStyle = head.plugin.depth > 6 ? "#6b7280" : "#c0c4cc";
      head.render.lineWidth = 2 + Math.abs(Math.sin(head.plugin.rot)) * 2;
    }
  }

  function updateScrews() {
    // continuous gentle spin indicator when active
    if (screwState.active && screwState.active.plugin) {
      const h = screwState.active;
      h.render.strokeStyle = "#ffc857";
    } else if (screwState.screws) {
      screwState.screws.forEach((h) => {
        h.render.strokeStyle = "#fff";
      });
    }
  }

  function turnScrewBtn(dir) {
    if (currentId !== "screw" || !screwState.screws) return;
    const head = screwState.active || screwState.screws[0];
    head.plugin.depth = Math.max(0, Math.min(head.plugin.max, head.plugin.depth + dir));
    head.plugin.rot += dir * 0.8;
    const inset = head.plugin.depth * 6;
    Body.setPosition(head, { x: head.plugin.baseX + inset, y: head.plugin.baseY });
    const baseR = Math.max(10, 20 - head.plugin.depth * 0.8);
    Body.set(head, { circleRadius: baseR });
  }

  /* ========== UI ========== */
  function show(lab) {
    $("view-lab").hidden = !lab;
    $("view-sandbox").hidden = lab;
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
      tb.innerHTML = '<span class="hint-inline">Tap a weight, then a gold hook to attach. Drag hooks to pull.</span>';
    } else if (id === "lever") {
      tb.innerHTML = '<span class="hint-inline">Yellow = pivots (drag). Brown = plank. Red box & purple elephant have mass.</span>';
    } else if (id === "wheel") {
      tb.innerHTML = '<span class="hint-inline">Drag around a wheel to turn it — the car moves only while you turn.</span>';
    } else if (id === "wedge") {
      tb.innerHTML = '<span class="hint-inline">Drag the wedge into the tree. Cut pieces fall; uncut branches stay.</span>';
    }

    show(false);
    const setups = {
      lever: setupLever, pulley: setupPulley, plane: setupPlane,
      wheel: setupWheel, wedge: setupWedge, screw: setupScrew,
    };
    if (setups[id]) startWorld(setups[id]);

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
        '<span class="st-icon">' + s.icon +
        '</span><span class="st-name">' + s.name +
        '</span><span class="st-go">Open sandbox</span>';
      b.addEventListener("click", () => openStation(s.id));
      grid.appendChild(b);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    buildLab();
    show(true);

    // Voice: only via app-chrome center slot (no duplicate)
    if (window.TokenMooseVoice) {
      voice = TokenMooseVoice.create("simple-machines");
      const slot = document.getElementById("tm-voice-slot");
      if (slot) voice.mountPicker(slot);
      else {
        // app-chrome may mount later
        setTimeout(() => {
          const s = document.getElementById("tm-voice-slot");
          if (s && voice) voice.mountPicker(s);
        }, 100);
      }
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
        speechSynthesis.speak(new SpeechSynthesisUtterance(tipText));
      }
    });

    window.addEventListener("resize", () => {
      if (!currentId) return;
      clearTimeout(window._smR);
      window._smR = setTimeout(() => openStation(currentId), 200);
    });
  });
})();
