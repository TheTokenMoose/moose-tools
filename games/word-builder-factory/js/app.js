/**
 * Word Builder Factory — assemble picture words with letter tiles
 */
(function () {
  "use strict";

  const STAR_KEY = "token-moose-wbf-stars";
  let levelIdx = 0;
  let entry = null;
  let built = [];
  let tray = [];
  let stars = loadStars();
  let sessionStars = 0;
  let voice = null;
  let usedIdx = new Set();

  const VOWELS = new Set("AEIOU");
  const DIGRAPHS = ["SH", "CH", "TH", "WH"];

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
        u.rate = 0.92;
        speechSynthesis.cancel();
        speechSynthesis.speak(u);
      }
    } catch (_) {}
  }

  function shuffle(a) {
    const x = a.slice();
    for (let i = x.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [x[i], x[j]] = [x[j], x[i]];
    }
    return x;
  }

  function pickWord(level) {
    const pool = level.words;
    // prefer unused
    const free = pool.filter((_, i) => !usedIdx.has(level.id + ":" + i));
    const list = free.length ? free : pool;
    const entry = list[Math.floor(Math.random() * list.length)];
    const idx = pool.indexOf(entry);
    usedIdx.add(level.id + ":" + idx);
    return entry;
  }

  /** Tiles: digraph as one tile when level is digraph; else single letters */
  function makeTiles(word, level) {
    const w = word.toUpperCase();
    const tiles = [];
    if (level.highlight === "digraph") {
      let i = 0;
      while (i < w.length) {
        const two = w.slice(i, i + 2);
        if (DIGRAPHS.includes(two)) {
          tiles.push(two);
          i += 2;
        } else {
          tiles.push(w[i]);
          i += 1;
        }
      }
    } else {
      for (const ch of w) tiles.push(ch);
    }
    // 1–2 decoy letters at higher levels
    if (levelIdx >= 2) {
      const alphabet = "BCDFGHJKLMNPQRSTVWXYZ";
      const decoy = alphabet[Math.floor(Math.random() * alphabet.length)];
      if (!tiles.includes(decoy)) tiles.push(decoy);
    }
    if (levelIdx >= 4) {
      const alphabet = "AEIOU";
      const decoy = alphabet[Math.floor(Math.random() * alphabet.length)];
      tiles.push(decoy);
    }
    return shuffle(tiles);
  }

  function startLevel(idx) {
    levelIdx = idx;
    usedIdx = new Set();
    sessionStars = 0;
    nextRound();
  }

  function nextRound() {
    const level = WBF_LEVELS[levelIdx];
    entry = pickWord(level);
    built = [];
    tray = makeTiles(entry.word, level);
    $("play-level").textContent = level.name;
    $("play-stars").textContent = "⭐ " + sessionStars;
    $("pic-emoji").textContent = entry.emoji;
    $("pic-hint").textContent = level.blurb;
    show("screen-play");
    render();
    // press Hear word — no auto-speak
  }

  function render() {
    const belt = $("belt");
    belt.innerHTML = "";
    const targetLen = entry.word.length;
    // show slots
    const slots = Math.max(targetLen, built.join("").length);
    built.forEach((t, i) => {
      const el = document.createElement("button");
      el.type = "button";
      el.className = "tile on-belt" + (t.length > 1 ? " digraph" : "") + tileClass(t);
      el.textContent = t;
      el.addEventListener("click", () => {
        // return to tray
        tray.push(t);
        built.splice(i, 1);
        render();
      });
      belt.appendChild(el);
    });
    // empty slots guide
    const need = entry.word.toUpperCase().length;
    // approximate slots for digraph level by tile count of answer
    const level = WBF_LEVELS[levelIdx];
    const answerTiles = makeTiles(entry.word, level).filter((t) => {
      // rebuild without decoys for length
      return true;
    });
    // simpler: empty markers until built string length matches word
    while (belt.children.length < Math.min(8, Math.max(3, entry.word.length))) {
      const slot = document.createElement("div");
      slot.className = "slot";
      belt.appendChild(slot);
    }

    const trayEl = $("tray");
    trayEl.innerHTML = "";
    tray.forEach((t, i) => {
      const el = document.createElement("button");
      el.type = "button";
      el.className = "tile" + (t.length > 1 ? " digraph" : "") + tileClass(t);
      el.textContent = t;
      el.draggable = true;
      el.addEventListener("click", () => {
        built.push(t);
        tray.splice(i, 1);
        render();
      });
      el.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", String(i));
      });
      trayEl.appendChild(el);
    });

    // highlight target pattern under picture
    const hi = $("highlight");
    hi.textContent = highlightText(entry.word, level);
  }

  function tileClass(t) {
    if (t.length > 1) return " digraph";
    if (VOWELS.has(t)) return " vowel";
    return " consonant";
  }

  function highlightText(word, level) {
    const w = word.toLowerCase();
    if (level.highlight === "digraph") {
      for (const d of ["sh", "ch", "th", "wh"]) {
        if (w.includes(d)) return "Listen for " + d.toUpperCase();
      }
    }
    if (level.highlight === "silent-e") return "Magic e at the end";
    if (level.highlight === "blend") return "Blend the first sounds";
    if (level.highlight === "end") return "Listen to the ending";
    return "Build the word";
  }

  function check() {
    const got = built.join("").toLowerCase();
    const want = entry.word.toLowerCase();
    if (got === want) {
      sessionStars += 1;
      stars += 1;
      saveStars();
      $("fb-icon").textContent = "🏭✨";
      $("fb-title").textContent = "Word built!";
      $("fb-msg").textContent = entry.emoji + "  " + entry.word;
      $("machine").classList.add("run");
      setTimeout(() => $("machine").classList.remove("run"), 800);
      show("screen-feedback");
      speak(entry.word + "! Great job!");
    } else {
      $("fb-icon").textContent = "🔧";
      $("fb-title").textContent = "Keep building";
      $("fb-msg").textContent = "Not quite. Try again!";
      show("screen-feedback");
      speak("Try again");
    }
  }

  function clearBuilt() {
    tray = tray.concat(built);
    built = [];
    render();
  }

  document.addEventListener("DOMContentLoaded", () => {
    const grid = $("level-grid");
    WBF_LEVELS.forEach((lv, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "level-card";
      b.innerHTML =
        "<strong>" + lv.name + "</strong><span>" + lv.blurb + "</span>";
      b.addEventListener("click", () => startLevel(i));
      grid.appendChild(b);
    });
    $("home-stars").textContent = "⭐ " + stars + " total";

    if (window.TokenMooseVoice) {
      voice = TokenMooseVoice.create("word-builder-factory");
    // Voice picker via app-chrome only
    }

    $("btn-home").addEventListener("click", () => {
      show("screen-home");
      $("home-stars").textContent = "⭐ " + stars + " total";
    });
    $("btn-check").addEventListener("click", check);
    $("btn-clear").addEventListener("click", clearBuilt);
    $("btn-hear-word").addEventListener("click", () => {
      /* no auto-speak */
    });
    $("btn-fb-next").addEventListener("click", () => {
      if ($("fb-title").textContent === "Word built!") nextRound();
      else {
        show("screen-play");
        render();
      }
    });
    $("btn-fb-home").addEventListener("click", () => {
      show("screen-home");
      $("home-stars").textContent = "⭐ " + stars + " total";
    });

    // keyboard: type letters
    document.addEventListener("keydown", (e) => {
      if ($("screen-play").hidden) return;
      const k = e.key.toUpperCase();
      if (k === "BACKSPACE") {
        if (built.length) {
          tray.push(built.pop());
          render();
        }
        return;
      }
      if (k === "ENTER") {
        check();
        return;
      }
      // try digraph first
      if (k.length === 1 && /[A-Z]/.test(k)) {
        // match digraph tile if next keys — skip for simplicity; single letter only
        const idx = tray.findIndex((t) => t === k);
        if (idx >= 0) {
          built.push(tray[idx]);
          tray.splice(idx, 1);
          render();
        }
      }
    });

    // drop on belt
    $("belt").addEventListener("dragover", (e) => e.preventDefault());
    $("belt").addEventListener("drop", (e) => {
      e.preventDefault();
      const i = Number(e.dataTransfer.getData("text/plain"));
      if (!Number.isNaN(i) && tray[i]) {
        built.push(tray[i]);
        tray.splice(i, 1);
        render();
      }
    });
  });
})();
