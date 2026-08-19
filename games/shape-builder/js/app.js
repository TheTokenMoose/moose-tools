/**
 * Shape Builder — interactive geometry for K / early primary
 */
(function () {
  "use strict";

  const STAR_KEY = "token-moose-shape-builder-stars";
  let mode = null;
  let stars = loadStars();
  let sessionStars = 0;
  let voice = null;
  let identifyTarget = null;
  let matchPairs = [];
  let matchLeft = null;
  let countTarget = null;
  let dimTarget = null;
  let challenge = null;
  let buildPieces = [];
  let rotateAngle = 0;
  let rotateTarget = null;

  const MODES = [
    { id: "identify", icon: "👁️", name: "Identify", blurb: "Name the shape" },
    { id: "match", icon: "🔗", name: "Match", blurb: "Find the pair" },
    { id: "rotate", icon: "🔄", name: "Rotate", blurb: "Turn to match" },
    { id: "build", icon: "🏠", name: "Build", blurb: "Picture challenges" },
    { id: "count", icon: "🔢", name: "Count", blurb: "Sides & corners" },
    { id: "dim", icon: "📦", name: "2D or 3D", blurb: "Flat or solid" },
    { id: "free", icon: "🎨", name: "Free build", blurb: "Sandbox" },
  ];

  const $ = (id) => document.getElementById(id);

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

  function show(home) {
    $("view-home").hidden = !home;
    $("view-play").hidden = home;
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

  function award() {
    sessionStars += 1;
    stars += 1;
    saveStars();
    $("play-stars").textContent = "⭐ " + sessionStars;
  }

  function feedback(ok, msg) {
    const el = $("feedback");
    el.textContent = msg;
    el.className = "feedback " + (ok ? "ok" : "no");
    if (ok) speak(msg);
    else speak(msg);
  }

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function shapeSvg(s, size, rot) {
    const c = s.color;
    const r = rot || 0;
    const wrap =
      '<div class="shape-visual" style="width:' +
      size +
      "px;height:" +
      size +
      "px;transform:rotate(" +
      r +
      'deg)" data-id="' +
      s.id +
      '">';
    if (s.id === "circle" || s.id === "sphere") {
      return (
        wrap +
        '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" fill="' +
        c +
        '" stroke="#fff" stroke-width="4"/></svg></div>'
      );
    }
    if (s.id === "oval") {
      return (
        wrap +
        '<svg viewBox="0 0 100 100"><ellipse cx="50" cy="50" rx="44" ry="28" fill="' +
        c +
        '" stroke="#fff" stroke-width="4"/></svg></div>'
      );
    }
    if (s.id === "square" || s.id === "cube") {
      return (
        wrap +
        '<svg viewBox="0 0 100 100"><rect x="18" y="18" width="64" height="64" rx="4" fill="' +
        c +
        '" stroke="#fff" stroke-width="4"/></svg></div>'
      );
    }
    if (s.id === "rectangle" || s.id === "cuboid") {
      return (
        wrap +
        '<svg viewBox="0 0 100 100"><rect x="10" y="28" width="80" height="44" rx="4" fill="' +
        c +
        '" stroke="#fff" stroke-width="4"/></svg></div>'
      );
    }
    if (s.id === "triangle" || s.id === "cone") {
      return (
        wrap +
        '<svg viewBox="0 0 100 100"><polygon points="50,12 90,88 10,88" fill="' +
        c +
        '" stroke="#fff" stroke-width="4"/></svg></div>'
      );
    }
    if (s.id === "hexagon") {
      return (
        wrap +
        '<svg viewBox="0 0 100 100"><polygon points="50,8 88,30 88,70 50,92 12,70 12,30" fill="' +
        c +
        '" stroke="#fff" stroke-width="4"/></svg></div>'
      );
    }
    if (s.id === "cylinder") {
      return (
        wrap +
        '<svg viewBox="0 0 100 100"><ellipse cx="50" cy="22" rx="28" ry="12" fill="' +
        c +
        '" stroke="#fff" stroke-width="3"/><rect x="22" y="22" width="56" height="56" fill="' +
        c +
        '"/><ellipse cx="50" cy="78" rx="28" ry="12" fill="' +
        c +
        '" stroke="#fff" stroke-width="3"/></svg></div>'
      );
    }
    return wrap + "<span style='font-size:2rem'>" + s.emoji + "</span></div>";
  }

  /* ---- MODES ---- */
  function startMode(id) {
    mode = id;
    sessionStars = 0;
    const m = MODES.find((x) => x.id === id);
    $("play-title").textContent = m ? m.icon + " " + m.name : id;
    $("play-stars").textContent = "⭐ 0";
    $("feedback").textContent = "";
    $("feedback").className = "feedback";
    show(false);
    nextRound();
  }

  function nextRound() {
    const stage = $("stage");
    stage.innerHTML = "";
    $("toolbar").innerHTML = "";
    if (mode === "identify") roundIdentify(stage);
    else if (mode === "match") roundMatch(stage);
    else if (mode === "rotate") roundRotate(stage);
    else if (mode === "build") roundBuild(stage);
    else if (mode === "count") roundCount(stage);
    else if (mode === "dim") roundDim(stage);
    else if (mode === "free") roundFree(stage);
  }

  function roundIdentify(stage) {
    identifyTarget = pick(ALL_SHAPES);
    stage.innerHTML =
      '<p class="prompt">What shape is this?</p>' +
      '<div class="center">' +
      shapeSvg(identifyTarget, 140, 0) +
      "</div>" +
      '<div class="choices" id="choices"></div>';
    speak("What shape is this?");
    const options = shuffleUnique(
      [identifyTarget].concat(
        shuffle(ALL_SHAPES.filter((s) => s.id !== identifyTarget.id)).slice(0, 3)
      )
    );
    const box = $("choices");
    options.forEach((s) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "choice";
      b.textContent = s.name;
      b.onclick = () => {
        if (s.id === identifyTarget.id) {
          award();
          feedback(true, "Yes! It is a " + s.name + ".");
          setTimeout(nextRound, 900);
        } else {
          feedback(false, "Not a " + s.name + ". Try again!");
        }
      };
      box.appendChild(b);
    });
  }

  function roundMatch(stage) {
    const pool = shuffle(SHAPES_2D.slice()).slice(0, 4);
    matchPairs = pool;
    matchLeft = null;
    stage.innerHTML =
      '<p class="prompt">Match the same shapes</p>' +
      '<div class="match-grid" id="match-a"></div>' +
      '<div class="match-grid" id="match-b"></div>';
    speak("Match the shapes");
    const a = $("match-a");
    const b = $("match-b");
    shuffle(pool).forEach((s) => a.appendChild(matchCard(s, "a")));
    shuffle(pool).forEach((s) => b.appendChild(matchCard(s, "b")));
  }

  function matchCard(s, side) {
    const el = document.createElement("button");
    el.type = "button";
    el.className = "match-card";
    el.dataset.id = s.id;
    el.dataset.side = side;
    el.innerHTML = shapeSvg(s, 64, 0);
    el.onclick = () => {
      if (el.classList.contains("done")) return;
      if (!matchLeft) {
        matchLeft = el;
        el.classList.add("picked");
        return;
      }
      if (matchLeft === el) {
        el.classList.remove("picked");
        matchLeft = null;
        return;
      }
      if (matchLeft.dataset.side === side) {
        matchLeft.classList.remove("picked");
        matchLeft = el;
        el.classList.add("picked");
        return;
      }
      if (matchLeft.dataset.id === s.id) {
        matchLeft.classList.add("done");
        el.classList.add("done");
        matchLeft.classList.remove("picked");
        matchLeft = null;
        award();
        feedback(true, "Match!");
        if (document.querySelectorAll(".match-card:not(.done)").length === 0) {
          setTimeout(nextRound, 800);
        }
      } else {
        feedback(false, "Not the same shape");
        matchLeft.classList.remove("picked");
        matchLeft = null;
      }
    };
    return el;
  }

  function roundRotate(stage) {
    rotateTarget = pick(SHAPES_2D.filter((s) => s.id !== "circle" && s.id !== "oval"));
    rotateAngle = [90, 180, 270][Math.floor(Math.random() * 3)];
    let userAngle = 0;
    stage.innerHTML =
      '<p class="prompt">Rotate the shape to match the ghost</p>' +
      '<div class="rotate-row">' +
      '<div class="ghost">' +
      shapeSvg(rotateTarget, 100, 0) +
      "</div>" +
      '<div id="rot-shape">' +
      shapeSvg(rotateTarget, 100, rotateAngle) +
      "</div></div>";
    speak("Turn the shape to match");
    const tb = $("toolbar");
    tb.innerHTML =
      '<button type="button" class="btn btn-primary" id="btn-rot-left">↺ 90°</button>' +
      '<button type="button" class="btn btn-primary" id="btn-rot-right">↻ 90°</button>' +
      '<button type="button" class="btn btn-ghost" id="btn-rot-check">Check</button>';
    $("btn-rot-left").onclick = () => {
      userAngle = (userAngle - 90 + 360) % 360;
      paint();
    };
    $("btn-rot-right").onclick = () => {
      userAngle = (userAngle + 90) % 360;
      paint();
    };
    function paint() {
      $("rot-shape").innerHTML = shapeSvg(rotateTarget, 100, rotateAngle + userAngle);
    }
    $("btn-rot-check").onclick = () => {
      const final = (rotateAngle + userAngle) % 360;
      // square/rect/hex look same every 90 or 180 depending
      let ok = final === 0;
      if (rotateTarget.id === "square" || rotateTarget.id === "hexagon") {
        ok = final % 90 === 0; // all 90 look similar for square — require upright 0 for teaching
        ok = final === 0;
      }
      if (ok) {
        award();
        feedback(true, "Perfect match!");
        setTimeout(nextRound, 900);
      } else {
        feedback(false, "Keep turning!");
      }
    };
  }

  function roundBuild(stage) {
    challenge = pick(BUILD_CHALLENGES);
    buildPieces = [];
    stage.innerHTML =
      '<p class="prompt">' +
      challenge.text +
      "</p>" +
      '<div class="build-canvas" id="build-canvas"></div>' +
      '<div class="palette" id="palette"></div>';
    speak(challenge.text);
    const palette = $("palette");
    SHAPES_2D.forEach((s) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "pal-btn";
      b.innerHTML = shapeSvg(s, 44, 0) + "<span>" + s.name + "</span>";
      b.onclick = () => addPiece(s);
      palette.appendChild(b);
    });
    const tb = $("toolbar");
    tb.innerHTML =
      '<button type="button" class="btn btn-ghost" id="btn-build-clear">Clear</button>' +
      '<button type="button" class="btn btn-primary" id="btn-build-check">Check build</button>';
    $("btn-build-clear").onclick = () => {
      buildPieces = [];
      $("build-canvas").innerHTML = "";
    };
    $("btn-build-check").onclick = checkBuild;
  }

  function addPiece(s) {
    const canvas = $("build-canvas");
    const id = "p" + Date.now() + Math.random();
    buildPieces.push({ id, shape: s.id });
    const el = document.createElement("div");
    el.className = "piece";
    el.dataset.pid = id;
    el.innerHTML = shapeSvg(s, 56, 0);
    el.style.left = 20 + Math.random() * 60 + "%";
    el.style.top = 20 + Math.random() * 50 + "%";
    makeDraggable(el);
    // double-tap remove
    el.addEventListener("dblclick", () => {
      buildPieces = buildPieces.filter((p) => p.id !== id);
      el.remove();
    });
    canvas.appendChild(el);
  }

  function makeDraggable(el) {
    let ox = 0,
      oy = 0,
      on = false;
    el.addEventListener("pointerdown", (e) => {
      on = true;
      el.setPointerCapture(e.pointerId);
      const r = el.getBoundingClientRect();
      ox = e.clientX - r.left;
      oy = e.clientY - r.top;
      el.style.zIndex = 10;
    });
    el.addEventListener("pointermove", (e) => {
      if (!on) return;
      const parent = el.parentElement.getBoundingClientRect();
      let x = e.clientX - parent.left - ox;
      let y = e.clientY - parent.top - oy;
      x = Math.max(0, Math.min(parent.width - 60, x));
      y = Math.max(0, Math.min(parent.height - 60, y));
      el.style.left = x + "px";
      el.style.top = y + "px";
      el.style.transform = "none";
    });
    el.addEventListener("pointerup", () => {
      on = false;
      el.style.zIndex = 1;
    });
  }

  function checkBuild() {
    const counts = {};
    buildPieces.forEach((p) => {
      counts[p.shape] = (counts[p.shape] || 0) + 1;
    });
    let ok = true;
    Object.keys(challenge.need).forEach((k) => {
      if ((counts[k] || 0) < challenge.need[k]) ok = false;
    });
    if (buildPieces.length < challenge.minPieces) ok = false;
    if (ok) {
      award();
      feedback(true, "Great construction!");
      setTimeout(nextRound, 1000);
    } else {
      feedback(false, "Check the pieces you need. Keep building!");
    }
  }

  function roundCount(stage) {
    // only shapes with meaningful sides/corners
    countTarget = pick(SHAPES_2D.filter((s) => s.sides > 0));
    const askCorners = Math.random() > 0.5;
    const answer = askCorners ? countTarget.corners : countTarget.sides;
    stage.innerHTML =
      '<p class="prompt">How many ' +
      (askCorners ? "corners" : "sides") +
      " does this " +
      countTarget.name +
      " have?</p>" +
      '<div class="center">' +
      shapeSvg(countTarget, 120, 0) +
      "</div>" +
      '<div class="choices" id="choices"></div>';
    speak(
      "How many " +
        (askCorners ? "corners" : "sides") +
        " does this " +
        countTarget.name +
        " have?"
    );
    const opts = shuffle(
      Array.from(new Set([answer, answer + 1, Math.max(0, answer - 1), answer + 2]))
    ).slice(0, 4);
    const box = $("choices");
    opts.forEach((n) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "choice";
      b.textContent = String(n);
      b.onclick = () => {
        if (n === answer) {
          award();
          feedback(
            true,
            "Yes! A " +
              countTarget.name +
              " has " +
              answer +
              " " +
              (askCorners ? "corners" : "sides") +
              "."
          );
          setTimeout(nextRound, 1000);
        } else {
          feedback(false, "Not " + n + ". Count again!");
        }
      };
      box.appendChild(b);
    });
  }

  function roundDim(stage) {
    dimTarget = pick(ALL_SHAPES);
    stage.innerHTML =
      '<p class="prompt">Is this shape 2D (flat) or 3D (solid)?</p>' +
      '<div class="center">' +
      shapeSvg(dimTarget, 130, 0) +
      '<p class="shape-name">' +
      dimTarget.name +
      "</p></div>" +
      '<div class="choices">' +
      '<button type="button" class="choice" id="btn-2d">2D · flat</button>' +
      '<button type="button" class="choice" id="btn-3d">3D · solid</button></div>';
    speak("Is a " + dimTarget.name + " two D or three D?");
    $("btn-2d").onclick = () => gradeDim("2D");
    $("btn-3d").onclick = () => gradeDim("3D");
  }

  function gradeDim(ans) {
    if (ans === dimTarget.dim) {
      award();
      feedback(
        true,
        "Yes! A " +
          dimTarget.name +
          " is " +
          dimTarget.dim +
          (dimTarget.dim === "2D" ? " — flat." : " — solid.")
      );
      setTimeout(nextRound, 900);
    } else {
      feedback(false, "Think: can you hold it like a solid object?");
    }
  }

  function roundFree(stage) {
    stage.innerHTML =
      '<p class="prompt">Free build — drag shapes. Double-tap a piece to remove.</p>' +
      '<div class="build-canvas free" id="build-canvas"></div>' +
      '<div class="palette" id="palette"></div>';
    speak("Build anything you like");
    const palette = $("palette");
    ALL_SHAPES.forEach((s) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "pal-btn";
      b.innerHTML = shapeSvg(s, 40, 0) + "<span>" + s.name + "</span>";
      b.onclick = () => {
        buildPieces.push({ id: "x", shape: s.id });
        addPiece(s);
      };
      palette.appendChild(b);
    });
    $("toolbar").innerHTML =
      '<button type="button" class="btn btn-ghost" id="btn-build-clear">Clear all</button>';
    $("btn-build-clear").onclick = () => {
      buildPieces = [];
      $("build-canvas").innerHTML = "";
    };
  }

  function shuffle(a) {
    const x = a.slice();
    for (let i = x.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [x[i], x[j]] = [x[j], x[i]];
    }
    return x;
  }
  function shuffleUnique(a) {
    return shuffle(a);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const grid = $("mode-grid");
    MODES.forEach((m) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "mode-card";
      b.innerHTML =
        '<span class="m-icon">' +
        m.icon +
        '</span><span class="m-name">' +
        m.name +
        '</span><span class="m-blurb">' +
        m.blurb +
        "</span>";
      b.onclick = () => startMode(m.id);
      grid.appendChild(b);
    });
    $("home-stars").textContent = "⭐ " + stars + " total";

    if (window.TokenMooseVoice) {
      voice = TokenMooseVoice.create("shape-builder");
      const slot = $("voice-slot");
      if (slot) voice.mountPicker(slot);
    }

    $("btn-home").onclick = () => {
      show(true);
      $("home-stars").textContent = "⭐ " + stars + " total";
    };
    $("btn-next").onclick = nextRound;
  });
})();
