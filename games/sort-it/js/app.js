/**
 * Sort It! — drag/tap objects into category bins
 * Content driven by window.SORT_PACKS
 */
(function () {
  "use strict";

  const STAR_KEY = "token-moose-sort-it-stars";
  let pack = null;
  let pool = []; // unsorted item ids
  let placed = {}; // itemId -> catId
  let selectedId = null;
  let stars = loadStars();
  let sessionStars = 0;
  let voice = null;
  let dragItem = null;

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
    ["screen-home", "screen-play", "screen-done"].forEach((s) => {
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

  function shuffle(a) {
    const x = a.slice();
    for (let i = x.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [x[i], x[j]] = [x[j], x[i]];
    }
    return x;
  }

  function itemById(id) {
    return pack.items.find((i) => i.id === id);
  }

  function openPack(p) {
    pack = p;
    pool = shuffle(p.items.map((i) => i.id));
    placed = {};
    selectedId = null;
    sessionStars = 0;
    $("play-title").textContent = p.title;
    $("play-subject").textContent = p.subject;
    show("screen-play");
    render();
    /* no auto-speak */
  }

  function tryPlace(itemId, catId) {
    const item = itemById(itemId);
    if (!item) return;
    if (item.cat === catId) {
      placed[itemId] = catId;
      pool = pool.filter((id) => id !== itemId);
      selectedId = null;
      sessionStars += 1;
      stars += 1;
      saveStars();
      flashBin(catId, true);
      /* voice optional disabled */;
      render();
      if (!pool.length) complete();
    } else {
      flashBin(catId, false);
      const right = pack.cats.find((c) => c.id === item.cat);
      /* voice optional disabled */;
      // keep item in pool — do not disappear
      selectedId = itemId;
      render();
      const el = document.querySelector('.sort-item[data-id="' + itemId + '"]');
      if (el) {
        el.classList.add("shake");
        setTimeout(() => el.classList.remove("shake"), 400);
      }
    }
  }

  function flashBin(catId, ok) {
    const bin = document.querySelector('.bin[data-cat="' + catId + '"]');
    if (!bin) return;
    bin.classList.add(ok ? "ok" : "no");
    setTimeout(() => bin.classList.remove("ok", "no"), 450);
  }

  function complete() {
    $("done-stars").textContent = "⭐ +" + sessionStars;
    $("done-msg").textContent = "Everything sorted!";
    show("screen-done");
    /* voice optional disabled */;
  }

  function resetRound() {
    if (!pack) return;
    openPack(pack);
  }

  function render() {
    $("play-left").textContent = pool.length + " left";
    $("play-stars").textContent = "⭐ " + sessionStars;

    // bins
    const bins = $("bins");
    bins.innerHTML = "";
    bins.dataset.count = String(pack.cats.length);
    pack.cats.forEach((c) => {
      const bin = document.createElement("div");
      bin.className = "bin";
      bin.dataset.cat = c.id;
      bin.style.setProperty("--bin", c.color);
      bin.innerHTML =
        '<div class="bin-label">' +
        c.label +
        '</div><div class="bin-drop" data-cat="' +
        c.id +
        '"></div>';
      // show already placed in this bin
      const drop = bin.querySelector(".bin-drop");
      Object.keys(placed).forEach((iid) => {
        if (placed[iid] !== c.id) return;
        const it = itemById(iid);
        if (!it) return;
        const chip = document.createElement("span");
        chip.className = "placed-chip";
        chip.textContent = it.emoji;
        chip.title = it.label;
        drop.appendChild(chip);
      });
      // drop targets
      bin.addEventListener("dragover", (e) => {
        e.preventDefault();
        bin.classList.add("over");
      });
      bin.addEventListener("dragleave", () => bin.classList.remove("over"));
      bin.addEventListener("drop", (e) => {
        e.preventDefault();
        bin.classList.remove("over");
        const id = e.dataTransfer.getData("text/plain") || dragItem;
        if (id) tryPlace(id, c.id);
      });
      // tap bin when item selected
      bin.addEventListener("click", () => {
        if (selectedId) tryPlace(selectedId, c.id);
      });
      bins.appendChild(bin);
    });

    // pool
    const tray = $("tray");
    tray.innerHTML = "";
    pool.forEach((id) => {
      const it = itemById(id);
      if (!it) return;
      const el = document.createElement("button");
      el.type = "button";
      el.className = "sort-item" + (selectedId === id ? " selected" : "");
      el.dataset.id = id;
      el.draggable = true;
      el.innerHTML = '<span class="em">' + it.emoji + '</span><span class="lb">' + it.label + "</span>";
      el.addEventListener("dragstart", (e) => {
        dragItem = id;
        e.dataTransfer.setData("text/plain", id);
        el.classList.add("dragging");
      });
      el.addEventListener("dragend", () => {
        el.classList.remove("dragging");
        dragItem = null;
      });
      el.addEventListener("click", () => {
        selectedId = selectedId === id ? null : id;
        render();
      });
      tray.appendChild(el);
    });
  }

  function buildHome() {
    const grid = $("pack-grid");
    grid.innerHTML = "";
    const subjects = {};
    SORT_PACKS.forEach((p) => {
      if (!subjects[p.subject]) subjects[p.subject] = [];
      subjects[p.subject].push(p);
    });
    Object.keys(subjects).forEach((sub) => {
      const h = document.createElement("h2");
      h.className = "sub-head";
      h.textContent = sub;
      grid.appendChild(h);
      const row = document.createElement("div");
      row.className = "pack-row";
      subjects[sub].forEach((p) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "pack-card";
        b.innerHTML =
          "<strong>" +
          p.title +
          "</strong><span>" +
          p.cats.length +
          " groups · " +
          p.items.length +
          " items</span>";
        b.addEventListener("click", () => openPack(p));
        row.appendChild(b);
      });
      grid.appendChild(row);
    });
    $("home-stars").textContent = "⭐ " + stars + " total";
  }

  document.addEventListener("DOMContentLoaded", () => {
    buildHome();
    show("screen-home");

    if (window.TokenMooseVoice) {
      voice = TokenMooseVoice.create("sort-it");
    // Voice picker via app-chrome only
    }

    $("btn-home").addEventListener("click", () => {
      show("screen-home");
      buildHome();
    });
    $("btn-reset").addEventListener("click", resetRound);
    $("btn-done-again").addEventListener("click", resetRound);
    $("btn-done-home").addEventListener("click", () => {
      show("screen-home");
      buildHome();
    });
    $("btn-hear").addEventListener("click", () => {
      /* no auto-speak */
    });
  });
})();
