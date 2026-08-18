/**
 * CVC Word Rush — kindergarten CVC / Silent-e builder
 * Time Rush · Dash · vowels vs consonants · real-word check
 */
(function () {
  const VOWELS = ["a", "e", "i", "o", "u"];
  const CONSONANTS = "bcdfghjklmnpqrstvwxyz".split("");
  const SCORE_WORD = 100;
  const SCORE_FAIL = -30;
  const SCORE_FLOOR = 0;

  const HS = {
    rush: (tier, sec) => "token-moose-cvc-rush-" + tier + "-" + sec,
    dash: (tier, target) => "token-moose-cvc-dash-" + tier + "-" + target,
  };

  let tier = "cvc"; // cvc | cvce
  let mode = null; // rush | dash
  let timeLimit = 60;
  let dashTarget = 20;
  let score = 0;
  let wordsMade = 0;
  let fails = 0;
  let slots = [];
  let running = false;
  let endAt = 0;
  let startAt = 0;
  let timerId = null;
  let wordLog = [];
  let audioCtx = null;
  let urgencyTimer = null;
  let lastTickAt = 0;


  const $ = (id) => document.getElementById(id);
  const wordSet = () =>
    tier === "cvce" ? window.CVCE_WORDS : window.CVC_WORDS;

  function slotCount() {
    return tier === "cvce" ? 4 : 3;
  }

  function patternLabel() {
    return tier === "cvce" ? "C V C e" : "C V C";
  }

  function loadHS(key) {
    try {
      const n = Number(localStorage.getItem(key));
      return Number.isFinite(n) ? n : null;
    } catch (_) {
      return null;
    }
  }
  function saveHS(key, val, better) {
    const prev = loadHS(key);
    if (prev == null || better(val, prev)) {
      try {
        localStorage.setItem(key, String(val));
      } catch (_) {}
      return true;
    }
    return false;
  }


  function getAudio() {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === "suspended") audioCtx.resume();
      return audioCtx;
    } catch (_) {
      return null;
    }
  }

  /** Time Rush urgency: faster + louder ticks as time runs out */
  function scheduleUrgency() {
    clearTimeout(urgencyTimer);
    if (!running || mode !== "rush") return;
    const leftMs = Math.max(0, endAt - Date.now());
    const left = leftMs / 1000;
    // interval: calm → frantic (1200ms → 180ms)
    let interval = 1200;
    if (left <= 5) interval = 180;
    else if (left <= 10) interval = 280;
    else if (left <= 20) interval = 450;
    else if (left <= 30) interval = 700;
    else interval = 1100;

    urgencyTimer = setTimeout(function () {
      if (!running || mode !== "rush") return;
      playUrgencyTick(left);
      scheduleUrgency();
    }, interval);
  }

  function playUrgencyTick(leftSec) {
    const ctx = getAudio();
    if (!ctx) return;
    const now = ctx.currentTime;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    // pitch and volume rise as time runs out
    const urgency = Math.max(0, Math.min(1, 1 - leftSec / Math.max(1, timeLimit)));
    o.type = leftSec <= 5 ? "square" : "triangle";
    o.frequency.value = 420 + urgency * 480;
    const vol = 0.03 + urgency * 0.09;
    g.gain.setValueAtTime(vol, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.08 + urgency * 0.06);
    o.connect(g);
    g.connect(ctx.destination);
    o.start(now);
    o.stop(now + 0.12 + urgency * 0.05);

    // final seconds: extra high beep layer
    if (leftSec <= 3) {
      const o2 = ctx.createOscillator();
      const g2 = ctx.createGain();
      o2.type = "sine";
      o2.frequency.value = 880 + (3 - leftSec) * 120;
      g2.gain.setValueAtTime(0.06, now);
      g2.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      o2.connect(g2);
      g2.connect(ctx.destination);
      o2.start(now);
      o2.stop(now + 0.16);
    }
  }

  function stopUrgency() {
    clearTimeout(urgencyTimer);
    urgencyTimer = null;
    const hud = document.querySelector(".hud");
    if (hud) hud.classList.remove("urgent");
  }

  function show(screen) {
    ["screen-home", "screen-setup", "screen-play", "screen-end"].forEach((id) => {
      const el = $(id);
      if (el) el.hidden = id !== screen;
    });
  }

  function buildLetterBanks() {
    const v = $("bank-vowels");
    const c = $("bank-consonants");
    v.innerHTML = "";
    c.innerHTML = "";
    VOWELS.forEach((ch) => v.appendChild(letterBtn(ch, "vowel")));
    CONSONANTS.forEach((ch) => c.appendChild(letterBtn(ch, "consonant")));
  }

  function letterBtn(ch, kind) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "letter-btn " + kind;
    b.textContent = ch.toUpperCase();
    b.dataset.letter = ch;
    b.addEventListener("click", () => placeLetter(ch));
    return b;
  }

  function renderSlots() {
    const row = $("slot-row");
    row.innerHTML = "";
    const n = slotCount();
    while (slots.length < n) slots.push("");
    slots = slots.slice(0, n);
    for (let i = 0; i < n; i++) {
      const s = document.createElement("button");
      s.type = "button";
      s.className = "slot" + (slots[i] ? " filled" : "");
      if (tier === "cvce" && i === 3) s.classList.add("silent-e");
      s.textContent = slots[i] ? slots[i].toUpperCase() : i === 3 && tier === "cvce" ? "e?" : "·";
      s.dataset.index = String(i);
      s.addEventListener("click", () => {
        slots[i] = "";
        renderSlots();
      });
      row.appendChild(s);
    }
  }

  function placeLetter(ch) {
    if (!running) return;
    const n = slotCount();
    // CVCe: last slot only accepts e
    if (tier === "cvce") {
      const empty = slots.findIndex((x) => !x);
      if (empty < 0) return;
      if (empty === 3 && ch !== "e") {
        flashFail("Silent e only in the last box!");
        return;
      }
      if (empty === 1 && VOWELS.indexOf(ch) < 0) {
        flashFail("Middle letter is a vowel!");
        return;
      }
      if ((empty === 0 || empty === 2) && CONSONANTS.indexOf(ch) < 0) {
        flashFail("That box wants a consonant!");
        return;
      }
      slots[empty] = ch;
    } else {
      const empty = slots.findIndex((x) => !x);
      if (empty < 0) return;
      if (empty === 1 && VOWELS.indexOf(ch) < 0) {
        flashFail("Middle letter is a vowel!");
        return;
      }
      if ((empty === 0 || empty === 2) && CONSONANTS.indexOf(ch) < 0) {
        flashFail("That box wants a consonant!");
        return;
      }
      slots[empty] = ch;
    }
    renderSlots();
    if (slots.every(Boolean)) submitWord();
  }

  function flashFail(msg) {
    const x = $("big-x");
    x.hidden = false;
    x.classList.add("pop");
    $("feedback").textContent = msg || "Not a real word!";
    $("feedback").className = "feedback fail";
    setTimeout(() => {
      x.hidden = true;
      x.classList.remove("pop");
    }, 700);
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "square";
      o.frequency.value = 140;
      g.gain.value = 0.04;
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      o.stop(ctx.currentTime + 0.15);
    } catch (_) {}
  }

  function flashOk(word) {
    $("feedback").textContent = "✓ " + word.toUpperCase() + "  +" + SCORE_WORD;
    $("feedback").className = "feedback ok";
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.value = 720;
      g.gain.value = 0.05;
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      o.stop(ctx.currentTime + 0.12);
    } catch (_) {}
  }

  function submitWord() {
    const word = slots.join("").toLowerCase();
    slots = Array(slotCount()).fill("");
    renderSlots();

    const real = wordSet().has(word);
    if (real) {
      if (!wordLog.includes(word)) {
        score = Math.max(SCORE_FLOOR, score + SCORE_WORD);
        wordsMade += 1;
        wordLog.push(word);
        flashOk(word);
      } else {
        $("feedback").textContent = word.toUpperCase() + " already found!";
        $("feedback").className = "feedback muted";
      }
    } else {
      fails += 1;
      score = Math.max(SCORE_FLOOR, score + SCORE_FAIL);
      flashFail("✗ " + word.toUpperCase() + " is not a real word");
    }
    updateHUD();
    renderWordList();

    if (mode === "dash" && wordsMade >= dashTarget) {
      endGame(true);
    }
  }

  function updateHUD() {
    $("hud-score").textContent = String(score);
    $("hud-words").textContent = String(wordsMade);
    if (mode === "rush") {
      const left = Math.max(0, Math.ceil((endAt - Date.now()) / 1000));
      $("hud-timer").textContent = left + "s";
    } else {
      const elapsed = Math.floor((Date.now() - startAt) / 1000);
      $("hud-timer").textContent = elapsed + "s";
      $("hud-target").textContent = wordsMade + " / " + dashTarget;
    }
  }

  function renderWordList() {
    const ul = $("word-log");
    ul.innerHTML = wordLog
      .map((w) => "<li>" + w.toUpperCase() + "</li>")
      .join("");
  }

  function tick() {
    if (!running) return;
    updateHUD();
    if (mode === "rush") {
      const left = Math.max(0, (endAt - Date.now()) / 1000);
      const hud = document.querySelector(".hud");
      if (hud) hud.classList.toggle("urgent", left <= 10);
      if (Date.now() >= endAt) {
        endGame(false);
      }
    }
  }

  function startGame() {
    score = 0;
    wordsMade = 0;
    fails = 0;
    wordLog = [];
    slots = Array(slotCount()).fill("");
    running = true;
    startAt = Date.now();
    if (mode === "rush") endAt = startAt + timeLimit * 1000;

    $("play-title").textContent =
      (tier === "cvce" ? "Silent e · " : "CVC · ") +
      (mode === "rush" ? "Time Rush" : "Dash");
    $("pattern-tag").textContent = patternLabel();
    $("hud-target-wrap").hidden = mode !== "dash";
    buildLetterBanks();
    renderSlots();
    renderWordList();
    updateHUD();
    $("feedback").textContent = "Build a " + patternLabel() + " word!";
    $("feedback").className = "feedback";
    show("screen-play");

    clearInterval(timerId);
    timerId = setInterval(tick, 200);
    stopUrgency();
    if (mode === "rush") {
      getAudio();
      scheduleUrgency();
    }
  }

  function endGame(dashWin) {
    running = false;
    clearInterval(timerId);
    stopUrgency();
    const elapsed = Math.floor((Date.now() - startAt) / 1000);

    let recordMsg = "";
    if (mode === "rush") {
      const key = HS.rush(tier, timeLimit);
      const isNew = saveHS(key, score, (a, b) => a > b);
      const best = loadHS(key);
      recordMsg = isNew
        ? "🏆 New high score: " + score + "!"
        : "Best for this rush: " + (best != null ? best : score);
    } else {
      const key = HS.dash(tier, dashTarget);
      if (wordsMade >= dashTarget) {
        const isNew = saveHS(key, elapsed, (a, b) => a < b);
        const best = loadHS(key);
        recordMsg = isNew
          ? "🏆 New best time: " + elapsed + "s!"
          : "Best time: " + (best != null ? best + "s" : elapsed + "s");
      } else {
        recordMsg = "Target not reached — try again!";
      }
    }

    $("end-score").textContent = String(score);
    $("end-words").textContent = String(wordsMade);
    $("end-fails").textContent = String(fails);
    $("end-time").textContent = elapsed + "s";
    $("end-record").textContent = recordMsg;
    $("end-list").innerHTML = wordLog
      .map((w) => "<li>" + w.toUpperCase() + "</li>")
      .join("");
    show("screen-end");
  }

  function openSetup(m) {
    mode = m;
    $("setup-title").textContent = m === "rush" ? "Time Rush setup" : "Dash setup";
    $("setup-rush").hidden = m !== "rush";
    $("setup-dash").hidden = m !== "dash";
    show("screen-setup");
  }

  document.addEventListener("DOMContentLoaded", () => {
    // Home tier
    $$btn("tier-cvc", () => {
      tier = "cvc";
      $("tier-cvc").classList.add("is-on");
      $("tier-cvce").classList.remove("is-on");
    });
    $$btn("tier-cvce", () => {
      tier = "cvce";
      $("tier-cvce").classList.add("is-on");
      $("tier-cvc").classList.remove("is-on");
    });
    $$btn("mode-rush", () => openSetup("rush"));
    $$btn("mode-dash", () => openSetup("dash"));
    $$btn("btn-back-home", () => show("screen-home"));
    $$btn("btn-start", () => {
      if (mode === "rush") {
        const t = document.querySelector('input[name="rush-time"]:checked');
        timeLimit = t ? Number(t.value) : 60;
      } else {
        const t = document.querySelector('input[name="dash-target"]:checked');
        dashTarget = t ? Number(t.value) : 20;
      }
      startGame();
    });
    $$btn("btn-clear", () => {
      slots = Array(slotCount()).fill("");
      renderSlots();
    });
    $$btn("btn-quit", () => {
      if (running) endGame(false);
      else show("screen-home");
    });
    $$btn("btn-again", () => openSetup(mode));
    $$btn("btn-home", () => show("screen-home"));
  });

  function $$btn(id, fn) {
    const el = $(id);
    if (el) el.addEventListener("click", fn);
  }
})();
