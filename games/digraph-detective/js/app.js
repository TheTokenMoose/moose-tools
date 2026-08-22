/**
 * Digraph Detective — SH CH TH WH phonics lab
 * Hear It · Find It · Match It · Build It · Read It
 */
(function () {
  "use strict";

  const STAR_KEY = "token-moose-digraph-stars";
  const MODES = [
    { id: "hear", icon: "👂", name: "Hear It", blurb: "Listen for the digraph" },
    { id: "find", icon: "🔍", name: "Find It", blurb: "Spot the digraph word" },
    { id: "match", icon: "🧩", name: "Match It", blurb: "Match digraph to word" },
    { id: "build", icon: "🧱", name: "Build It", blurb: "Build with letter tiles" },
    { id: "read", icon: "📖", name: "Read It", blurb: "Read the clue" },
  ];

  let mode = null;
  let level = 1;
  let stars = loadStars();
  let sessionStars = 0;
  let challenge = null;
  let voice = null;
  let buildTiles = [];

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

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  function shuffle(a) {
    const x = a.slice();
    for (let i = x.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [x[i], x[j]] = [x[j], x[i]];
    }
    return x;
  }
  function allEntries() {
    const out = [];
    DIGRAPH_LIST.forEach((d) => {
      DIGRAPH_BANK[d].forEach((e) => out.push({ digraph: d, ...e }));
    });
    return out;
  }
  function digraphsInPlay() {
    // progressive: start with 2, then 3, then all 4
    const all = DIGRAPH_LIST.slice();
    if (level <= 1) return all.slice(0, 2);
    if (level <= 3) return all.slice(0, 3);
    return all;
  }

  /* ---------- generators ---------- */
  function genHear() {
    const ds = digraphsInPlay();
    const d = pick(ds);
    const entry = pick(DIGRAPH_BANK[d]);
    const options = shuffle(ds);
    return {
      type: "hear",
      digraph: d,
      entry,
      options,
      prompt: "Which digraph do you hear?",
    };
  }

  function genFind() {
    const ds = digraphsInPlay();
    const target = pick(ds);
    const correct = pick(DIGRAPH_BANK[target]);
    // distractors from other digraphs
    const others = allEntries().filter((e) => e.digraph !== target);
    const distractors = shuffle(others).slice(0, 3);
    const choices = shuffle([{ ...correct, digraph: target, ok: true }, ...distractors.map((e) => ({ ...e, ok: false }))]);
    return {
      type: "find",
      digraph: target,
      prompt: "Find the " + target + " word",
      choices,
      answer: correct.word,
    };
  }

  function genMatch() {
    const ds = digraphsInPlay();
    const d = pick(ds);
    const entry = pick(DIGRAPH_BANK[d]);
    // show digraph options or word options
    if (Math.random() < 0.5) {
      return {
        type: "match",
        variant: "to-digraph",
        entry,
        digraph: d,
        options: shuffle(ds),
        prompt: "Which digraph is in this word?",
      };
    }
    // match digraph to one of four words
    const correct = entry;
    const distractors = shuffle(allEntries().filter((e) => e.digraph !== d)).slice(0, 3);
    return {
      type: "match",
      variant: "to-word",
      digraph: d,
      entry: correct,
      choices: shuffle([correct, ...distractors]),
      prompt: "Which word has " + d + "?",
    };
  }

  function genBuild() {
    const ds = digraphsInPlay();
    const d = pick(ds);
    const entry = pick(DIGRAPH_BANK[d]);
    // tiles: digraph as one tile + remaining letters
    const rest = entry.word.toLowerCase().replace(d.toLowerCase(), "");
    // find digraph position
    const w = entry.word.toLowerCase();
    const idx = w.indexOf(d.toLowerCase());
    const before = w.slice(0, idx).split("");
    const after = w.slice(idx + 2).split("");
    const tiles = shuffle([d.toUpperCase(), ...before.map((c) => c.toUpperCase()), ...after.map((c) => c.toUpperCase())]);
    // extra decoy letter sometimes at higher levels
    if (level >= 3) {
      const decoys = "BDFGJKLMPQRVZ".split("");
      tiles.push(pick(decoys));
    }
    return {
      type: "build",
      digraph: d,
      entry,
      tiles: shuffle(tiles),
      answer: entry.word.toLowerCase(),
      prompt: "Build: " + entry.emoji + "  (" + d + ")",
    };
  }

  function genRead() {
    const ds = digraphsInPlay();
    const d = pick(ds);
    const entry = pick(DIGRAPH_BANK[d]);
    const useSentence = level >= 3;
    return {
      type: "read",
      digraph: d,
      entry,
      text: useSentence ? entry.sentence : entry.word,
      prompt: useSentence ? "Read the sentence. Tap the digraph you see." : "Read the word. Tap the digraph.",
      options: shuffle(ds),
    };
  }

  function nextChallenge() {
    const gens = { hear: genHear, find: genFind, match: genMatch, build: genBuild, read: genRead };
    challenge = gens[mode]();
    buildTiles = [];
    renderChallenge();
  }

  /* ---------- render ---------- */
  function renderChallenge() {
    $("play-prompt").textContent = challenge.prompt;
    $("play-level").textContent = "Level " + level;
    $("play-stars").textContent = "⭐ " + sessionStars;
    $("badge-digraph").textContent = challenge.digraph || "??";
    const stage = $("play-stage");
    stage.innerHTML = "";

    if (challenge.type === "hear") renderHear(stage);
    else if (challenge.type === "find") renderFind(stage);
    else if (challenge.type === "match") renderMatch(stage);
    else if (challenge.type === "build") renderBuild(stage);
    else if (challenge.type === "read") renderRead(stage);
  }

  function digraphButtons(options, onPick) {
    const row = document.createElement("div");
    row.className = "digraph-row";
    options.forEach((d) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "digraph-btn";
      b.textContent = d;
      b.addEventListener("click", () => onPick(d));
      row.appendChild(b);
    });
    return row;
  }

  function renderHear(stage) {
    const card = document.createElement("div");
    card.className = "clue-card";
    card.innerHTML = '<div class="emoji-big">🔇</div><p class="clue-label">Mystery word</p>';
    const playBtn = document.createElement("button");
    playBtn.type = "button";
    playBtn.className = "btn btn-primary";
    playBtn.textContent = "▶ Hear the word";
    playBtn.addEventListener("click", () => speak(challenge.entry.word));
    card.appendChild(playBtn);
    stage.appendChild(card);
    stage.appendChild(
      digraphButtons(challenge.options, (d) => {
        if (d === challenge.digraph) success("You heard " + d + " in “" + challenge.entry.word + "”!");
        else fail("The word was “" + challenge.entry.word + "”. That has " + challenge.digraph + ".");
      })
    );
    // auto-play once after short delay
    /* no auto-speak */
  }

  function renderFind(stage) {
    const grid = document.createElement("div");
    grid.className = "word-grid";
    challenge.choices.forEach((c) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "word-card";
      b.innerHTML = '<span class="emoji">' + c.emoji + '</span><span class="w">' + c.word + "</span>";
      b.addEventListener("click", () => {
        if (c.ok || c.word === challenge.answer) success("Yes! “" + c.word + "” has " + challenge.digraph + ".");
        else fail("“" + c.word + "” has " + c.digraph + ". Look for " + challenge.digraph + ".");
      });
      grid.appendChild(b);
    });
    stage.appendChild(grid);
  }

  function renderMatch(stage) {
    if (challenge.variant === "to-digraph") {
      const card = document.createElement("div");
      card.className = "clue-card";
      card.innerHTML =
        '<div class="emoji-big">' +
        challenge.entry.emoji +
        '</div><div class="word-big">' +
        challenge.entry.word +
        "</div>";
      stage.appendChild(card);
      const hear = document.createElement("button");
      hear.type = "button";
      hear.className = "btn btn-ghost";
      hear.textContent = "🔊 Hear word";
      hear.addEventListener("click", () => speak(challenge.entry.word));
      stage.appendChild(hear);
      stage.appendChild(
        digraphButtons(challenge.options, (d) => {
          if (d === challenge.digraph) success("“" + challenge.entry.word + "” has " + d + "!");
          else fail("“" + challenge.entry.word + "” has " + challenge.digraph + ".");
        })
      );
    } else {
      const head = document.createElement("div");
      head.className = "target-digraph";
      head.textContent = challenge.digraph;
      stage.appendChild(head);
      const grid = document.createElement("div");
      grid.className = "word-grid";
      challenge.choices.forEach((c) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "word-card";
        b.innerHTML = '<span class="emoji">' + c.emoji + '</span><span class="w">' + c.word + "</span>";
        b.addEventListener("click", () => {
          if (c.word === challenge.entry.word) success("“" + c.word + "” has " + challenge.digraph + "!");
          else fail("“" + c.word + "” has " + c.digraph + ".");
        });
        grid.appendChild(b);
      });
      stage.appendChild(grid);
    }
  }

  function renderBuild(stage) {
    const card = document.createElement("div");
    card.className = "clue-card";
    card.innerHTML =
      '<div class="emoji-big">' +
      challenge.entry.emoji +
      '</div><button type="button" class="btn btn-ghost" id="build-hear">🔊 Hear word</button>';
    stage.appendChild(card);
    $("build-hear").onclick = () => speak(challenge.entry.word);

    const built = document.createElement("div");
    built.className = "built-row";
    built.id = "built-row";
    stage.appendChild(built);

    const tray = document.createElement("div");
    tray.className = "tile-tray";
    challenge.tiles.forEach((t, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "letter-tile" + (t.length > 1 ? " digraph-tile" : "");
      b.textContent = t;
      b.dataset.tile = t;
      b.dataset.idx = String(i);
      b.addEventListener("click", () => {
        if (b.disabled) return;
        buildTiles.push(t);
        b.disabled = true;
        b.classList.add("used");
        paintBuilt();
      });
      tray.appendChild(b);
    });
    stage.appendChild(tray);

    function paintBuilt() {
      built.innerHTML = buildTiles
        .map((t) => '<span class="built-tile">' + t + "</span>")
        .join("");
    }

    const row = document.createElement("div");
    row.className = "btn-row";
    const clear = document.createElement("button");
    clear.type = "button";
    clear.className = "btn btn-ghost";
    clear.textContent = "Clear";
    clear.addEventListener("click", () => {
      buildTiles = [];
      tray.querySelectorAll(".letter-tile").forEach((b) => {
        b.disabled = false;
        b.classList.remove("used");
      });
      paintBuilt();
    });
    const check = document.createElement("button");
    check.type = "button";
    check.className = "btn btn-primary";
    check.textContent = "Check";
    check.addEventListener("click", () => {
      const got = buildTiles.join("").toLowerCase();
      if (got === challenge.answer) success("You built “" + challenge.entry.word + "”!");
      else fail("The word is “" + challenge.entry.word + "”. It has " + challenge.digraph + ".");
    });
    row.appendChild(clear);
    row.appendChild(check);
    stage.appendChild(row);
  }

  function renderRead(stage) {
    const card = document.createElement("div");
    card.className = "clue-card";
    card.innerHTML =
      '<div class="emoji-big">' +
      challenge.entry.emoji +
      '</div><div class="read-text">' +
      highlightDigraph(challenge.text, challenge.digraph) +
      "</div>";
    stage.appendChild(card);
    const hear = document.createElement("button");
    hear.type = "button";
    hear.className = "btn btn-ghost";
    hear.textContent = "🔊 Read aloud";
    hear.addEventListener("click", () => speak(challenge.text));
    stage.appendChild(hear);
    stage.appendChild(
      digraphButtons(challenge.options, (d) => {
        if (d === challenge.digraph) success("You found " + d + "!");
        else fail("Look for " + challenge.digraph + " in “" + challenge.entry.word + "”.");
      })
    );
  }

  function highlightDigraph(text, d) {
    const re = new RegExp("(" + d + ")", "ig");
    return text.replace(re, '<mark>$1</mark>');
  }

  function success(msg) {
    sessionStars += 1;
    stars += 1;
    saveStars();
    if (sessionStars % 4 === 0) level = Math.min(5, level + 1);
    $("fb-icon").textContent = "🏅";
    $("fb-title").textContent = "Case closed!";
    $("fb-msg").textContent = msg;
    show("screen-feedback");
    speak("Case closed! " + msg);
  }

  function fail(msg) {
    $("fb-icon").textContent = "🔎";
    $("fb-title").textContent = "Keep looking";
    $("fb-msg").textContent = msg;
    show("screen-feedback");
    speak(msg);
  }

  function openMode(id) {
    mode = id;
    level = 1;
    sessionStars = 0;
    const m = MODES.find((x) => x.id === id);
    $("play-name").textContent = m ? m.icon + " " + m.name : "";
    show("screen-play");
    nextChallenge();
  }

  document.addEventListener("DOMContentLoaded", () => {
    const grid = $("mode-grid");
    MODES.forEach((m) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "mode-card";
      b.innerHTML =
        '<span class="mode-icon">' +
        m.icon +
        '</span><span class="mode-name">' +
        m.name +
        '</span><span class="mode-blurb">' +
        m.blurb +
        "</span>";
      b.addEventListener("click", () => openMode(m.id));
      grid.appendChild(b);
    });
    $("home-stars").textContent = "⭐ " + stars + " total";

    if (window.TokenMooseVoice) {
      voice = TokenMooseVoice.create("digraph-detective");
    // Voice picker via app-chrome only
    }

    $("btn-hear").addEventListener("click", () => {
      if (!challenge) return;
      /* no auto-speak — use Hear controls */
    });
    $("btn-back-home").addEventListener("click", () => {
      show("screen-home");
      $("home-stars").textContent = "⭐ " + stars + " total";
    });
    $("btn-fb-next").addEventListener("click", () => {
      show("screen-play");
      nextChallenge();
    });
    $("btn-fb-retry").addEventListener("click", () => {
      show("screen-play");
      if ($("fb-title").textContent === "Case closed!") nextChallenge();
      else {
        buildTiles = [];
        renderChallenge();
      }
    });
    $("btn-fb-home").addEventListener("click", () => {
      show("screen-home");
      $("home-stars").textContent = "⭐ " + stars + " total";
    });
  });
})();
