/**
 * ABC Letter Quest — big bold letter + sound trainer
 * Modes: order, random, backwards, song
 * Uses TokenMooseVoice when available.
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
  let songTimer = null;
  let songIndex = 0;

  const voice = typeof TokenMooseVoice !== "undefined"
    ? TokenMooseVoice.create("abc-letter-quest")
    : null;
  if (voice) voice.setEnabled(true);

  // DOM
  const $ = (id) => document.getElementById(id);
  const home = $("home");
  const practice = $("practice");
  const songScreen = $("song");
  const finalScreen = $("final");

  function showScreen(id) {
    document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
    $(id).classList.add("active");
  }

  function speak(text, rate) {
    if (!soundOn || !text) return;
    if (voice) {
      voice.speak(String(text), { rate: rate != null ? rate : 0.92 });
      return;
    }
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(String(text));
    u.rate = rate != null ? rate : 0.92;
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

  function buildSequence(m) {
    if (m === "order") return LETTERS.slice();
    if (m === "backwards") return LETTERS.slice().reverse();
    return shuffle(LETTERS);
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
    $("letterArt").innerHTML = d.svg;
    $("letterWord").textContent = d.word;
  }

  function updateProgress() {
    const total = sequence.length;
    const cur = Math.min(index + 1, total);
    $("progressText").textContent = cur + " / " + total;
    $("progressFill").style.width = (total ? (index / total) * 100 : 0) + "%";
  }

  function speakCurrent() {
    const d = LETTER_DATA[sequence[index]];
    if (!d) return;
    // Name → sound → word
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
      setTimeout(() => advance(), 700);
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

  function startMode(m) {
    mode = m;
    if (m === "song") {
      startSongScreen();
      return;
    }
    sequence = buildSequence(m);
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

  function finishRun() {
    stopSpeak();
    saveStars(runStars);
    $("finalStars").textContent = String(runStars);
    $("finalTitle").textContent = runStars >= 20 ? "Amazing!" : runStars >= 12 ? "Great job!" : "You did it!";
    $("finalMsg").textContent =
      mode === "backwards"
        ? "You practiced Z to A!"
        : mode === "random"
        ? "Random mix complete!"
        : "A to Z complete!";
    showScreen("final");
  }

  // —— Song mode ——
  function startSongScreen() {
    stopSong();
    showScreen("song");
    const strip = $("songStrip");
    strip.innerHTML = "";
    LETTERS.forEach((L) => {
      const c = document.createElement("span");
      c.className = "song-chip";
      c.textContent = L;
      c.dataset.letter = L;
      strip.appendChild(c);
    });
    showSongLetter("A");
  }

  function showSongLetter(L) {
    const d = LETTER_DATA[L];
    $("songLetter").textContent = L;
    $("songLetter").style.color = d.color;
    $("songLetter").classList.remove("pulse");
    void $("songLetter").offsetWidth;
    $("songLetter").classList.add("pulse");
    $("songArt").innerHTML = d.svg;
    $("songWord").textContent = d.word;
    document.querySelectorAll(".song-chip").forEach((c) => {
      c.classList.toggle("on", c.dataset.letter === L);
      if (c.dataset.letter === L) c.style.background = d.color;
      else c.style.background = "";
    });
  }

  function playSong() {
    stopSong();
    songIndex = 0;
    $("songPlayBtn").classList.add("hidden");
    $("songStopBtn").classList.remove("hidden");
    const tick = () => {
      if (songIndex >= LETTERS.length) {
        stopSong();
        speak("Now I know my ABCs. Next time won't you sing with me?");
        return;
      }
      const L = LETTERS[songIndex];
      showSongLetter(L);
      // Classic-ish pace: letter name only for song flow
      speak(L);
      songIndex += 1;
      songTimer = setTimeout(tick, 650);
    };
    // Intro line then letters
    speak("A B C D E F G");
    songTimer = setTimeout(tick, 1800);
  }

  function stopSong() {
    if (songTimer) {
      clearTimeout(songTimer);
      songTimer = null;
    }
    stopSpeak();
    $("songPlayBtn").classList.remove("hidden");
    $("songStopBtn").classList.add("hidden");
  }

  // —— Events ——
  document.querySelectorAll(".mode-card").forEach((btn) => {
    btn.addEventListener("click", () => startMode(btn.dataset.mode));
  });

  $("homeBtn").addEventListener("click", () => {
    stopSpeak();
    showScreen("home");
    loadStats();
  });
  $("songHomeBtn").addEventListener("click", () => {
    stopSong();
    showScreen("home");
    loadStats();
  });
  $("finalHomeBtn").addEventListener("click", () => {
    showScreen("home");
    loadStats();
  });
  $("againBtn").addEventListener("click", () => startMode(mode === "song" ? "order" : mode));

  $("hearBtn").addEventListener("click", () => speakCurrent());
  $("nextBtn").addEventListener("click", () => {
    if (awaitingQuiz) return;
    // After hearing, go to quick quiz then next
    showQuiz();
  });

  function toggleSound(btn) {
    soundOn = !soundOn;
    btn.textContent = soundOn ? "🔊" : "🔇";
    if (voice) {
      voice.setEnabled(soundOn);
      if (!soundOn) voice.stop();
    } else if (!soundOn) stopSpeak();
  }
  $("soundBtn").addEventListener("click", () => toggleSound($("soundBtn")));
  $("songSoundBtn").addEventListener("click", () => toggleSound($("songSoundBtn")));

  $("songPlayBtn").addEventListener("click", playSong);
  $("songStopBtn").addEventListener("click", stopSong);

  // SW
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    });
  }

  loadStats();
})();
