/**
 * ABC Letter Quest v2
 * - Real clipart images
 * - Clear TTS (no slash phonetics)
 * - Back buttons everywhere
 * - Start-letter picker for order/backwards
 * - Real MP3 ABC song + full alphabet visual
 */
(function () {
  "use strict";

  const STORAGE_STARS = "abc-lq-stars";
  const STORAGE_BEST = "abc-lq-best";

  let soundOn = true;
  let mode = "order";
  let sequence = [];
  let index = 0;
  let runStars = 0;
  let awaitingQuiz = false;
  let pendingMode = null;

  const voice = typeof TokenMooseVoice !== "undefined"
    ? TokenMooseVoice.create("abc-letter-quest")
    : null;
  if (voice) voice.setEnabled(true);

  const $ = (id) => document.getElementById(id);

  function showScreen(id) {
    document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
    $(id).classList.add("active");
  }

  function speak(text, rate) {
    if (!soundOn || !text) return;
    if (voice) {
      voice.speak(String(text), { rate: rate != null ? rate : 0.9 });
      return;
    }
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(String(text));
    u.rate = rate != null ? rate : 0.9;
    u.pitch = 1.05;
    u.lang = "en-US";
    window.speechSynthesis.speak(u);
  }

  function stopSpeak() {
    if (voice) voice.stop();
    else if (window.speechSynthesis) window.speechSynthesis.cancel();
  }

  function loadStats() {
    try {
      $("starsTotal").textContent = localStorage.getItem(STORAGE_STARS) || "0";
      $("bestRun").textContent = localStorage.getItem(STORAGE_BEST) || "0";
    } catch (_) {}
  }

  function saveStars(n) {
    try {
      const prev = parseInt(localStorage.getItem(STORAGE_STARS) || "0", 10);
      localStorage.setItem(STORAGE_STARS, String(prev + n));
      const best = parseInt(localStorage.getItem(STORAGE_BEST) || "0", 10);
      if (n > best) localStorage.setItem(STORAGE_BEST, String(n));
    } catch (_) {}
    loadStats();
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function buildSequence(m, startLetter) {
    let base;
    if (m === "order") base = LETTERS.slice();
    else if (m === "backwards") base = LETTERS.slice().reverse();
    else base = shuffle(LETTERS);

    if (startLetter && (m === "order" || m === "backwards")) {
      const i = base.indexOf(startLetter);
      if (i > 0) base = base.slice(i);
    }
    return base;
  }

  function setCard(letter) {
    const d = LETTER_DATA[letter];
    const card = $("letterCard");
    card.classList.remove("pop");
    void card.offsetWidth;
    card.classList.add("pop");
    card.style.setProperty("--card-accent", d.color);
    $("letterBig").textContent = d.letter;
    $("letterBig").style.color = d.color;
    const img = $("letterArt");
    img.src = d.img;
    img.alt = d.word;
    $("letterWord").textContent = d.word;
  }

  function updateProgress() {
    const total = sequence.length;
    const cur = Math.min(index + 1, total);
    $("progressText").textContent = cur + " / " + total;
    $("progressFill").style.width = (total ? (index / total) * 100 : 0) + "%";
  }

  /** Clear spoken phrases — no slashes or IPA */
  function speakCurrent() {
    const d = LETTER_DATA[sequence[index]];
    if (!d) return;
    // e.g. "A. A says ah. Apple."
    speak(d.speakName + ". " + d.speakSound + ". " + d.speakWord + ".");
  }

  function showQuiz() {
    awaitingQuiz = true;
    $("quizRow").classList.remove("hidden");
    $("actionRow").classList.add("hidden");
    const correct = sequence[index];
    const others = shuffle(LETTERS.filter((l) => l !== correct)).slice(0, 2);
    const choices = shuffle([correct].concat(others));
    $("quizPrompt").textContent = "Tap the letter " + correct;
    const row = $("choiceRow");
    row.innerHTML = "";
    choices.forEach((L) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "choice-btn";
      btn.textContent = L;
      btn.style.color = LETTER_DATA[L].color;
      btn.addEventListener("click", () => onChoice(L, btn));
      row.appendChild(btn);
    });
  }

  function onChoice(L, btn) {
    if (!awaitingQuiz) return;
    const correct = sequence[index];
    if (L === correct) {
      awaitingQuiz = false;
      btn.classList.add("correct");
      runStars += 1;
      speak("Yes! " + LETTER_DATA[L].word);
      setTimeout(() => advance(), 650);
    } else {
      btn.classList.add("wrong");
      speak("Try again");
      setTimeout(() => btn.classList.remove("wrong"), 400);
    }
  }

  function advance() {
    index += 1;
    if (index >= sequence.length) {
      finishRun();
      return;
    }
    $("quizRow").classList.add("hidden");
    $("actionRow").classList.remove("hidden");
    $("choiceRow").innerHTML = "";
    awaitingQuiz = false;
    updateProgress();
    setCard(sequence[index]);
    speakCurrent();
  }

  function openStartPicker(m) {
    pendingMode = m;
    $("pickTitle").textContent = m === "backwards" ? "Start from… (Z → A)" : "Start from… (A → Z)";
    const grid = $("alphaPickGrid");
    grid.innerHTML = "";
    const list = m === "backwards" ? LETTERS.slice().reverse() : LETTERS.slice();
    list.forEach((L) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = L;
      btn.style.color = LETTER_DATA[L].color;
      btn.addEventListener("click", () => startPractice(m, L));
      grid.appendChild(btn);
    });
    showScreen("startPick");
  }

  function startPractice(m, startLetter) {
    mode = m;
    sequence = buildSequence(m, startLetter || null);
    index = 0;
    runStars = 0;
    awaitingQuiz = false;
    $("quizRow").classList.add("hidden");
    $("actionRow").classList.remove("hidden");
    showScreen("practice");
    updateProgress();
    setCard(sequence[0]);
    speakCurrent();
  }

  function startMode(m) {
    stopSong();
    if (m === "song") {
      openSong();
      return;
    }
    if (m === "order" || m === "backwards") {
      openStartPicker(m);
      return;
    }
    // random — no picker
    startPractice(m, null);
  }

  function finishRun() {
    stopSpeak();
    saveStars(runStars);
    $("finalStars").textContent = String(runStars);
    $("finalTitle").textContent = runStars >= 20 ? "Amazing!" : runStars >= 10 ? "Great job!" : "You did it!";
    $("finalMsg").textContent =
      mode === "backwards" ? "Backwards practice complete!" :
      mode === "random" ? "Random mix complete!" : "Letter run complete!";
    showScreen("final");
  }

  // —— Song (real MP3 + full alphabet) ——
  let songRaf = null;
  let songActive = false;

  function openSong() {
    stopSpeak();
    const alpha = $("songAlpha");
    alpha.innerHTML = "";
    LETTERS.forEach((L) => {
      const c = document.createElement("span");
      c.className = "song-chip";
      c.textContent = L;
      c.dataset.letter = L;
      alpha.appendChild(c);
    });
    showSongLetter("A");
    $("songPlayBtn").classList.remove("hidden");
    $("songStopBtn").classList.add("hidden");
    showScreen("song");
  }

  function showSongLetter(L) {
    const d = LETTER_DATA[L];
    const el = $("songLetter");
    el.textContent = L;
    el.style.color = d.color;
    el.classList.remove("pulse");
    void el.offsetWidth;
    el.classList.add("pulse");
    $("songArt").src = d.img;
    $("songArt").alt = d.word;
    $("songWord").textContent = d.word;
    document.querySelectorAll(".song-chip").forEach((c) => {
      const on = c.dataset.letter === L;
      c.classList.toggle("on", on);
      if (on) {
        c.style.background = d.color;
        c.style.borderColor = d.color;
      } else {
        c.style.background = "";
        c.style.borderColor = "";
      }
    });
  }

  /** Map song time → letter index (tune to ~29s track) */
  function letterIndexFromTime(t, duration) {
    // Approximate segments from transcript:
    // 0-8s: A-M, 8-16s: N-X, 16-18s: Y Z, then words
    const n = LETTERS.length;
    if (t < 1) return 0;
    // letters roughly occupy first ~17s
    const letterSpan = Math.min(duration * 0.62, 17.5);
    if (t >= letterSpan) return n - 1;
    return Math.min(n - 1, Math.floor((t / letterSpan) * n));
  }

  function playSong() {
    const audio = $("songAudio");
    if (!audio) return;
    stopSpeak();
    songActive = true;
    $("songPlayBtn").classList.add("hidden");
    $("songStopBtn").classList.remove("hidden");
    document.querySelectorAll(".song-chip").forEach((c) => c.classList.remove("done"));

    audio.currentTime = 0;
    audio.play().catch(() => {});

    const tick = () => {
      if (!songActive) return;
      const t = audio.currentTime || 0;
      const dur = audio.duration || 29;
      if (audio.ended || t >= dur - 0.05) {
        // mark all done
        document.querySelectorAll(".song-chip").forEach((c) => {
          c.classList.add("done");
          c.classList.remove("on");
        });
        stopSong(false);
        return;
      }
      const idx = letterIndexFromTime(t, dur);
      const L = LETTERS[idx];
      showSongLetter(L);
      // mark previous as done
      document.querySelectorAll(".song-chip").forEach((c, i) => {
        if (i < idx) c.classList.add("done");
      });
      songRaf = requestAnimationFrame(tick);
    };
    songRaf = requestAnimationFrame(tick);
  }

  function stopSong(pauseAudio) {
    songActive = false;
    if (songRaf) {
      cancelAnimationFrame(songRaf);
      songRaf = null;
    }
    const audio = $("songAudio");
    if (audio && pauseAudio !== false) {
      audio.pause();
      audio.currentTime = 0;
    }
    $("songPlayBtn").classList.remove("hidden");
    $("songStopBtn").classList.add("hidden");
  }

  // —— Events ——
  document.querySelectorAll(".mode-card").forEach((btn) => {
    btn.addEventListener("click", () => startMode(btn.dataset.mode));
  });

  $("startPickBack").addEventListener("click", () => {
    showScreen("home");
    loadStats();
  });
  $("startFromBeginBtn").addEventListener("click", () => {
    startPractice(pendingMode, null);
  });

  $("pracBackBtn").addEventListener("click", () => {
    stopSpeak();
    showScreen("home");
    loadStats();
  });
  $("songBackBtn").addEventListener("click", () => {
    stopSong();
    showScreen("home");
    loadStats();
  });
  $("finalHomeBtn").addEventListener("click", () => {
    showScreen("home");
    loadStats();
  });
  $("againBtn").addEventListener("click", () => {
    if (mode === "order" || mode === "backwards") openStartPicker(mode);
    else startMode(mode);
  });

  $("hearBtn").addEventListener("click", () => speakCurrent());
  $("nextBtn").addEventListener("click", () => {
    if (awaitingQuiz) return;
    showQuiz();
  });

  function toggleSound(btn) {
    soundOn = !soundOn;
    btn.textContent = soundOn ? "🔊" : "🔇";
    if (voice) {
      voice.setEnabled(soundOn);
      if (!soundOn) voice.stop();
    } else if (!soundOn) stopSpeak();
    const audio = $("songAudio");
    if (audio) audio.muted = !soundOn;
  }
  $("soundBtn").addEventListener("click", () => toggleSound($("soundBtn")));
  $("songSoundBtn").addEventListener("click", () => toggleSound($("songSoundBtn")));

  $("songPlayBtn").addEventListener("click", playSong);
  $("songStopBtn").addEventListener("click", () => stopSong(true));

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    });
  }

  loadStats();
})();
