/**
 * Number Sense Lab — K / early primary visual math lab
 * Ten Frame · Bonds · Number Line · Compare · Place Value
 */
(function () {
  "use strict";

  const HS_KEY = "token-moose-number-sense-stars";
  const ACTIVITIES = [
    { id: "tenframe", icon: "▦", name: "Ten Frame", blurb: "Fill the frame" },
    { id: "bonds", icon: "◎", name: "Number Bonds", blurb: "Split a number" },
    { id: "line", icon: "―", name: "Number Line", blurb: "Hop and find" },
    { id: "compare", icon: "≶", name: "Compare", blurb: "Bigger or smaller?" },
    { id: "place", icon: "▣", name: "Place Value", blurb: "Tens and ones" },
  ];

  let activity = null;
  let level = 1; // 1–5 progressive within activity session
  let stars = loadStars();
  let sessionStars = 0;
  let challenge = null;
  let voice = null;

  const $ = (id) => document.getElementById(id);

  function loadStars() {
    try {
      return Number(localStorage.getItem(HS_KEY)) || 0;
    } catch (_) {
      return 0;
    }
  }
  function saveStars() {
    try {
      localStorage.setItem(HS_KEY, String(stars));
    } catch (_) {}
  }

  function show(id) {
    ["screen-home", "screen-play", "screen-feedback"].forEach((s) => {
      const el = $(s);
      if (el) el.hidden = s !== id;
    });
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

  function rand(a, b) {
    return a + Math.floor(Math.random() * (b - a + 1));
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  /* ---------- CHALLENGE GENERATORS ---------- */
  function genTenFrame() {
    const max = level <= 2 ? 5 : 10;
    const target = rand(1, max);
    const mode = level <= 2 ? "make" : shuffle(["make", "howmany", "more"])[0];
    let prompt, check;
    if (mode === "make") {
      prompt = "Make " + target;
      check = (n) => n === target;
    } else if (mode === "howmany") {
      // prefill some
      const shown = target;
      prompt = "How many counters? Tap Check when ready.";
      check = (n) => n === shown;
      return { type: "tenframe", prompt, target, prefill: shown, check, answer: target };
    } else {
      const have = rand(1, Math.max(1, target - 1));
      prompt = "You have " + have + ". How many more to make " + target + "?";
      check = (n) => n === target - have;
      return { type: "tenframe", prompt, target: target - have, prefill: have, mode: "more", goal: target, check, answer: target - have };
    }
    return { type: "tenframe", prompt, target, prefill: 0, check, answer: target };
  }

  function genBonds() {
    const whole = level <= 2 ? rand(4, 8) : rand(6, 12);
    const a = rand(0, whole);
    const b = whole - a;
    // Accept any pair that sums to whole
    return {
      type: "bonds",
      prompt: "Make bonds for " + whole,
      whole,
      // sample one valid pair for hint after fail
      sample: [a, b],
      check: (x, y) => x + y === whole && x >= 0 && y >= 0,
      answer: whole,
    };
  }

  function genLine() {
    const max = level <= 2 ? 10 : level <= 4 ? 15 : 20;
    const modes = level <= 2 ? ["find", "after"] : ["find", "after", "before", "forward", "back", "greater"];
    const mode = shuffle(modes)[0];
    let prompt, answer, start = null;
    if (mode === "find") {
      answer = rand(0, max);
      prompt = "Find " + answer + " on the number line";
    } else if (mode === "after") {
      const n = rand(0, max - 1);
      answer = n + 1;
      prompt = "What comes after " + n + "?";
    } else if (mode === "before") {
      const n = rand(1, max);
      answer = n - 1;
      prompt = "What comes before " + n + "?";
    } else if (mode === "forward") {
      start = rand(0, max - 3);
      const step = rand(1, 3);
      answer = start + step;
      prompt = "Start at " + start + ". Move forward " + step;
    } else if (mode === "back") {
      start = rand(3, max);
      const step = rand(1, 3);
      answer = Math.max(0, start - step);
      prompt = "Start at " + start + ". Move back " + step;
    } else {
      const a = rand(0, max);
      let b = rand(0, max);
      while (b === a) b = rand(0, max);
      answer = Math.max(a, b);
      prompt = "Which is greater: " + a + " or " + b + "?";
      return { type: "line", prompt, max, answer, mode: "greater", choices: [a, b] };
    }
    return { type: "line", prompt, max, answer, mode, start };
  }

  function genCompare() {
    const max = level <= 2 ? 6 : 12;
    const a = rand(0, max);
    let b = rand(0, max);
    const mode = shuffle(["greater", "smaller", "equal"])[0];
    let prompt, answer;
    if (mode === "equal") {
      b = a;
      prompt = "Are they equal? Tap the correct sign.";
      answer = "=";
    } else if (mode === "greater") {
      prompt = "Which group is greater?";
      answer = a === b ? "=" : a > b ? "L" : "R";
      if (a === b) prompt = "Are they equal?";
    } else {
      prompt = "Which group is smaller?";
      answer = a === b ? "=" : a < b ? "L" : "R";
    }
    return { type: "compare", prompt, a, b, mode, answer };
  }

  function genPlace() {
    const n = level <= 2 ? rand(11, 19) : level <= 4 ? rand(10, 39) : rand(10, 59);
    const tens = Math.floor(n / 10);
    const ones = n % 10;
    return {
      type: "place",
      prompt: "Build " + n,
      target: n,
      tens,
      ones,
      check: (t, o) => t === tens && o === ones,
    };
  }

  function nextChallenge() {
    const gens = {
      tenframe: genTenFrame,
      bonds: genBonds,
      line: genLine,
      compare: genCompare,
      place: genPlace,
    };
    challenge = gens[activity]();
    renderChallenge();
    /* press Hear to listen */
  }

  /* ---------- RENDER ---------- */
  function renderChallenge() {
    $("play-prompt").textContent = challenge.prompt;
    $("play-level").textContent = "Level " + level;
    $("play-stars").textContent = "⭐ " + sessionStars;
    const stage = $("play-stage");
    stage.innerHTML = "";
    stage.className = "play-stage act-" + challenge.type;

    if (challenge.type === "tenframe") renderTenFrame(stage);
    else if (challenge.type === "bonds") renderBonds(stage);
    else if (challenge.type === "line") renderLine(stage);
    else if (challenge.type === "compare") renderCompare(stage);
    else if (challenge.type === "place") renderPlace(stage);
  }

  function renderTenFrame(stage) {
    const cells = 10;
    let count = challenge.prefill || 0;
    const frame = document.createElement("div");
    frame.className = "tenframe";
    const counters = [];
    for (let i = 0; i < cells; i++) {
      const c = document.createElement("button");
      c.type = "button";
      c.className = "tf-cell" + (i < count ? " on" : "");
      c.addEventListener("click", () => {
        if (i < count) {
          // remove from end
          count = i;
        } else {
          count = i + 1;
        }
        for (let j = 0; j < cells; j++) counters[j].classList.toggle("on", j < count);
        val.textContent = String(count);
      });
      counters.push(c);
      frame.appendChild(c);
    }
    const val = document.createElement("div");
    val.className = "big-num";
    val.textContent = String(count);
    const check = document.createElement("button");
    check.type = "button";
    check.className = "btn btn-primary";
    check.textContent = "Check";
    check.addEventListener("click", () => {
      if (challenge.check(count)) success();
      else fail("Try " + challenge.answer + " counters.");
    });
    stage.appendChild(frame);
    stage.appendChild(val);
    stage.appendChild(check);
  }

  function renderBonds(stage) {
    const whole = challenge.whole;
    let left = 0;
    let right = 0;
    const wrap = document.createElement("div");
    wrap.className = "bonds";
    wrap.innerHTML =
      '<div class="bond-whole">' +
      whole +
      "</div>" +
      '<div class="bond-row">' +
      '<div class="bond-part"><button type="button" class="bond-minus" data-side="L">−</button>' +
      '<span class="bond-val" id="bond-l">0</span>' +
      '<button type="button" class="bond-plus" data-side="L">+</button></div>' +
      '<span class="bond-plus-sign">+</span>' +
      '<div class="bond-part"><button type="button" class="bond-minus" data-side="R">−</button>' +
      '<span class="bond-val" id="bond-r">0</span>' +
      '<button type="button" class="bond-plus" data-side="R">+</button></div>' +
      "</div>";
    stage.appendChild(wrap);
    const dotsL = document.createElement("div");
    dotsL.className = "dot-row";
    const dotsR = document.createElement("div");
    dotsR.className = "dot-row";
    stage.appendChild(dotsL);
    stage.appendChild(dotsR);

    function paint() {
      $("bond-l").textContent = String(left);
      $("bond-r").textContent = String(right);
      dotsL.innerHTML = "";
      dotsR.innerHTML = "";
      for (let i = 0; i < left; i++) dotsL.appendChild(Object.assign(document.createElement("span"), { className: "dot" }));
      for (let i = 0; i < right; i++) dotsR.appendChild(Object.assign(document.createElement("span"), { className: "dot alt" }));
    }
    wrap.querySelectorAll(".bond-plus").forEach((b) =>
      b.addEventListener("click", () => {
        if (b.dataset.side === "L") left = Math.min(whole, left + 1);
        else right = Math.min(whole, right + 1);
        paint();
      })
    );
    wrap.querySelectorAll(".bond-minus").forEach((b) =>
      b.addEventListener("click", () => {
        if (b.dataset.side === "L") left = Math.max(0, left - 1);
        else right = Math.max(0, right - 1);
        paint();
      })
    );
    paint();
    const check = document.createElement("button");
    check.type = "button";
    check.className = "btn btn-primary";
    check.textContent = "Check";
    check.addEventListener("click", () => {
      if (challenge.check(left, right)) success();
      else fail("Find two numbers that add to " + whole + ".");
    });
    stage.appendChild(check);
  }

  function renderLine(stage) {
    const max = challenge.max;
    const track = document.createElement("div");
    track.className = "numline";
    let selected = challenge.start != null ? challenge.start : null;
    for (let i = 0; i <= max; i++) {
      const tick = document.createElement("button");
      tick.type = "button";
      tick.className = "nl-tick";
      tick.textContent = String(i);
      tick.addEventListener("click", () => {
        selected = i;
        track.querySelectorAll(".nl-tick").forEach((t) => t.classList.remove("sel"));
        tick.classList.add("sel");
      });
      if (challenge.start != null && i === challenge.start) tick.classList.add("start");
      track.appendChild(tick);
    }
    stage.appendChild(track);

    if (challenge.mode === "greater" && challenge.choices) {
      const row = document.createElement("div");
      row.className = "choice-row";
      challenge.choices.forEach((n) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "btn btn-choice";
        b.textContent = String(n);
        b.addEventListener("click", () => {
          if (n === challenge.answer) success();
          else fail("The greater number is " + challenge.answer + ".");
        });
        row.appendChild(b);
      });
      stage.appendChild(row);
      return;
    }

    const check = document.createElement("button");
    check.type = "button";
    check.className = "btn btn-primary";
    check.textContent = "Check";
    check.addEventListener("click", () => {
      if (selected === challenge.answer) success();
      else fail("The answer is " + challenge.answer + ".");
    });
    stage.appendChild(check);
  }

  function renderCompare(stage) {
    const row = document.createElement("div");
    row.className = "compare-row";
    function group(n, side) {
      const g = document.createElement("button");
      g.type = "button";
      g.className = "compare-group";
      for (let i = 0; i < n; i++) {
        const d = document.createElement("span");
        d.className = "dot" + (side === "R" ? " alt" : "");
        g.appendChild(d);
      }
      const lab = document.createElement("div");
      lab.className = "cmp-num";
      lab.textContent = String(n);
      g.appendChild(lab);
      g.addEventListener("click", () => {
        if (challenge.mode === "equal") return;
        const ans = side;
        if (challenge.answer === ans) success();
        else if (challenge.answer === "=") fail("They are the same!");
        else fail("Look again at the groups.");
      });
      return g;
    }
    row.appendChild(group(challenge.a, "L"));
    const mid = document.createElement("div");
    mid.className = "cmp-signs";
    ["<", "=", ">"].forEach((s) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "btn btn-choice";
      b.textContent = s;
      b.addEventListener("click", () => {
        let ok = false;
        if (s === "=" && challenge.a === challenge.b) ok = true;
        if (s === ">" && challenge.a > challenge.b) ok = true;
        if (s === "<" && challenge.a < challenge.b) ok = true;
        // also map L/R modes
        if (challenge.mode === "greater" || challenge.mode === "smaller") {
          if (challenge.answer === "=" && s === "=") ok = true;
        }
        if (ok) success();
        else fail("Try a different sign.");
      });
      mid.appendChild(b);
    });
    row.appendChild(mid);
    row.appendChild(group(challenge.b, "R"));
    stage.appendChild(row);
  }

  function renderPlace(stage) {
    let tens = 0;
    let ones = 0;
    const wrap = document.createElement("div");
    wrap.className = "place-wrap";
    wrap.innerHTML =
      '<div class="place-col"><h3>Tens</h3><div class="place-stack" id="tens-stack"></div>' +
      '<button type="button" class="btn btn-ghost" id="add-ten">+ Ten</button>' +
      '<button type="button" class="btn btn-ghost" id="rm-ten">−</button></div>' +
      '<div class="place-col"><h3>Ones</h3><div class="place-stack" id="ones-stack"></div>' +
      '<button type="button" class="btn btn-ghost" id="add-one">+ One</button>' +
      '<button type="button" class="btn btn-ghost" id="rm-one">−</button></div>' +
      '<div class="big-num" id="place-total">0</div>';
    stage.appendChild(wrap);

    function paint() {
      const ts = $("tens-stack");
      const os = $("ones-stack");
      ts.innerHTML = "";
      os.innerHTML = "";
      for (let i = 0; i < tens; i++) {
        const b = document.createElement("div");
        b.className = "ten-rod";
        ts.appendChild(b);
      }
      for (let i = 0; i < ones; i++) {
        const b = document.createElement("div");
        b.className = "one-cube";
        os.appendChild(b);
      }
      $("place-total").textContent = String(tens * 10 + ones);
    }
    $("add-ten").onclick = () => {
      tens = Math.min(9, tens + 1);
      paint();
    };
    $("rm-ten").onclick = () => {
      tens = Math.max(0, tens - 1);
      paint();
    };
    $("add-one").onclick = () => {
      ones = Math.min(9, ones + 1);
      paint();
    };
    $("rm-one").onclick = () => {
      ones = Math.max(0, ones - 1);
      paint();
    };
    paint();
    const check = document.createElement("button");
    check.type = "button";
    check.className = "btn btn-primary";
    check.textContent = "Check";
    check.addEventListener("click", () => {
      if (challenge.check(tens, ones)) success();
      else fail("Build " + challenge.target + " with tens and ones.");
    });
    stage.appendChild(check);
  }

  function success() {
    sessionStars += 1;
    stars += 1;
    saveStars();
    if (sessionStars % 3 === 0) level = Math.min(5, level + 1);
    $("fb-icon").textContent = "⭐";
    $("fb-title").textContent = "Great job!";
    $("fb-msg").textContent = "You got it!";
    show("screen-feedback");
    speak("Great job!");
  }

  function fail(msg) {
    $("fb-icon").textContent = "💡";
    $("fb-title").textContent = "Try again";
    $("fb-msg").textContent = msg;
    show("screen-feedback");
    speak(msg);
  }

  function openActivity(id) {
    activity = id;
    level = 1;
    sessionStars = 0;
    const a = ACTIVITIES.find((x) => x.id === id);
    $("play-name").textContent = a ? a.icon + " " + a.name : "";
    show("screen-play");
    nextChallenge();
  }

  document.addEventListener("DOMContentLoaded", () => {
    const grid = $("act-grid");
    ACTIVITIES.forEach((a) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "act-card";
      b.innerHTML =
        '<span class="act-icon">' +
        a.icon +
        '</span><span class="act-name">' +
        a.name +
        '</span><span class="act-blurb">' +
        a.blurb +
        "</span>";
      b.addEventListener("click", () => openActivity(a.id));
      grid.appendChild(b);
    });
    $("home-stars").textContent = "⭐ " + stars + " total";

    if (window.TokenMooseVoice) {
      voice = TokenMooseVoice.create("number-sense-lab");
    // Voice picker via app-chrome only
    }

    $("btn-hear").addEventListener("click", () => {
      if (challenge) /* press Hear to listen */
    });
    $("btn-back-home").addEventListener("click", () => {
      show("screen-home");
      $("home-stars").textContent = "⭐ " + stars + " total";
    });
    $("btn-fb-retry").addEventListener("click", () => {
      show("screen-play");
      // same challenge type new one after fail message was shown - regenerate if success path uses next
      if ($("fb-title").textContent === "Great job!") nextChallenge();
      else renderChallenge();
    });
    $("btn-fb-next").addEventListener("click", () => {
      show("screen-play");
      nextChallenge();
    });
    $("btn-fb-home").addEventListener("click", () => {
      show("screen-home");
      $("home-stars").textContent = "⭐ " + stars + " total";
    });
  });
})();
