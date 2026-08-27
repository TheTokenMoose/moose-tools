(function () {
  "use strict";

  const STORE = "token-moose-english-path-v1";
  const lessons = window.ENGLISH_PATH_LESSONS || [];
  const $ = (id) => document.getElementById(id);

  let state = loadState();
  let currentId = null;
  let currentStep = "speaking";
  let voice = null;

  function loadState() {
    try {
      const raw = localStorage.getItem(STORE);
      if (raw) return JSON.parse(raw);
    } catch (_) {}
    return { completed: {}, writing: {}, reading: {}, discussion: {}, lastLesson: 1 };
  }

  function saveState() {
    try {
      localStorage.setItem(STORE, JSON.stringify(state));
    } catch (_) {}
  }

  function speak(text) {
    if (!text) return;
    try {
      if (voice && voice.speak) return void voice.speak(text);
      if (window.speechSynthesis) {
        speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.rate = 0.92;
        speechSynthesis.speak(u);
      }
    } catch (_) {}
  }

  function show(id) {
    ["screen-home", "screen-map", "screen-lesson"].forEach((s) => {
      const el = $(s);
      if (el) el.hidden = s !== id;
    });
  }

  function completedCount() {
    return lessons.filter((l) => state.completed[l.id]).length;
  }

  function updateProgress() {
    const n = completedCount();
    const pct = lessons.length ? Math.round((n / lessons.length) * 100) : 0;
    $("progress-fill").style.width = pct + "%";
    $("progress-label").textContent = n + " of " + lessons.length + " lessons completed";
  }

  function lessonById(id) {
    return lessons.find((l) => l.id === id);
  }

  function nextIncomplete() {
    for (const l of lessons) {
      if (!state.completed[l.id]) return l.id;
    }
    return lessons.length ? lessons[lessons.length - 1].id : 1;
  }

  function renderMap() {
    const grid = $("lesson-grid");
    grid.innerHTML = "";
    lessons.forEach((l) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "lesson-card";
      if (state.completed[l.id]) btn.classList.add("done");
      if (l.milestone) btn.classList.add("milestone");
      const icons = { 1: "💬", 2: "📖", 3: "✍️", 4: "🎓" };
      const ico = icons[l.phase] || "📘";
      btn.setAttribute("data-phase", String(l.phase || 1));
      btn.innerHTML = '<span class="phase-icon">' + ico + '</span><span class="num">' + l.id + '</span><span class="ttl">' + escapeHtml(l.title) + "</span>";
      btn.addEventListener("click", () => openLesson(l.id));
      grid.appendChild(btn);
    });
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function openLesson(id) {
    const lesson = lessonById(id);
    if (!lesson) return;
    currentId = id;
    state.lastLesson = id;
    saveState();
    $("lesson-title").textContent = "Lesson " + lesson.id;
    $("lesson-theme").textContent = lesson.theme;
    $("lesson-obj").textContent = lesson.objective;
    const chips = $("lesson-chips");
    chips.innerHTML = "";
    (lesson.vocabulary || []).slice(0, 8).forEach((v) => {
      const c = document.createElement("span");
      c.className = "chip";
      c.textContent = v;
      chips.appendChild(c);
    });
    if (lesson.grammar) {
      const g = document.createElement("span");
      g.className = "chip";
      g.textContent = lesson.grammar;
      chips.appendChild(g);
    }
    document.querySelectorAll(".step-btn").forEach((b) => {
      const step = b.getAttribute("data-step");
      b.classList.toggle("is-done", !!(state.completed[id] || hasStepWork(id, step)));
    });
    currentStep = "speaking";
    setStep("speaking");
    show("screen-lesson");
  }

  function hasStepWork(id, step) {
    if (step === "writing") return !!(state.writing[id] && state.writing[id].trim());
    if (step === "discussion") return !!(state.discussion[id] && state.discussion[id].trim());
    if (step === "reading") return !!(state.reading[id] && Object.keys(state.reading[id]).length);
    return false;
  }

  function setStep(step) {
    currentStep = step;
    document.querySelectorAll(".step-btn").forEach((b) => {
      b.classList.toggle("is-active", b.getAttribute("data-step") === step);
    });
    renderStepPanel();
  }

  function renderStepPanel() {
    const lesson = lessonById(currentId);
    if (!lesson) return;
    const host = $("step-panels");
    host.innerHTML = "";

    if (currentStep === "speaking") {
      const s = lesson.speaking;
      const panel = document.createElement("div");
      panel.className = "panel";
      panel.innerHTML =
        "<h3>Speaking</h3>" +
        "<p><strong>Your turn:</strong> " +
        escapeHtml(s.prompt) +
        "</p>" +
        '<div class="model-box" id="speak-model">' +
        escapeHtml(s.model) +
        "</div>" +
        "<p><em>Tips:</em> " +
        escapeHtml((s.tips || []).join(" · ")) +
        "</p>" +
        '<div class="opt-row" style="margin-top:0.75rem">' +
        '<button type="button" class="btn small" id="btn-hear-model">🔊 Hear model</button>' +
        '<button type="button" class="btn small" id="btn-hear-prompt">🔊 Hear prompt</button>' +
        "</div>" +
        "<p style=\"margin-top:0.75rem\">Practise out loud. Then tick what you did:</p>" +
        '<label><input type="checkbox" id="chk-full"> I used a full sentence</label><br>' +
        '<label><input type="checkbox" id="chk-detail"> I added a detail or because</label>';
      host.appendChild(panel);
      $("btn-hear-model").addEventListener("click", () => speak(s.model));
      $("btn-hear-prompt").addEventListener("click", () => speak(s.prompt));
      return;
    }

    if (currentStep === "reading") {
      const r = lesson.reading;
      const answers = state.reading[currentId] || {};
      const panel = document.createElement("div");
      panel.className = "panel";
      let html =
        "<h3>Reading: " +
        escapeHtml(r.title) +
        "</h3>" +
        '<button type="button" class="btn small" id="btn-hear-text">🔊 Hear the story</button>' +
        '<div class="reading-text" id="reading-text">' +
        escapeHtml(r.text) +
        "</div>";
      r.questions.forEach((item, i) => {
        html += '<div class="q-block" data-qi="' + i + '">';
        html += '<div class="q-text">' + (i + 1) + ". " + escapeHtml(item.q) + "</div>";
        html += '<div class="opt-row">';
        (item.options || []).forEach((opt) => {
          const selected = answers[i] === opt;
          const checked = answers[i] != null;
          let cls = "opt-btn";
          if (checked && opt === item.a) cls += " is-right";
          else if (selected && opt !== item.a) cls += " is-wrong";
          html +=
            '<button type="button" class="' +
            cls +
            '" data-qi="' +
            i +
            '" data-opt="' +
            escapeHtml(opt) +
            '">' +
            escapeHtml(opt) +
            "</button>";
        });
        html += "</div></div>";
      });
      panel.innerHTML = html;
      host.appendChild(panel);
      $("btn-hear-text").addEventListener("click", () => speak(r.text));
      panel.querySelectorAll(".opt-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const qi = Number(btn.getAttribute("data-qi"));
          const opt = btn.getAttribute("data-opt");
          if (!state.reading[currentId]) state.reading[currentId] = {};
          state.reading[currentId][qi] = opt;
          saveState();
          renderStepPanel();
        });
      });
      return;
    }

    if (currentStep === "discussion") {
      const d = lesson.discussion;
      const saved = state.discussion[currentId] || "";
      const panel = document.createElement("div");
      panel.className = "panel";
      panel.innerHTML =
        "<h3>Talk & think</h3>" +
        "<p>Answer in your head or write short notes. Full sentences are best.</p>" +
        "<ol>" +
        (d.prompts || []).map((p) => "<li>" + escapeHtml(p) + "</li>").join("") +
        "</ol>" +
        '<button type="button" class="btn small" id="btn-hear-disc">🔊 Hear prompts</button>' +
        '<label for="disc-notes" style="display:block;margin-top:0.75rem;font-weight:800">My notes</label>' +
        '<textarea id="disc-notes" placeholder="Write your ideas here…">' +
        escapeHtml(saved) +
        "</textarea>" +
        '<button type="button" class="btn primary small" id="btn-save-disc" style="margin-top:0.5rem">Save notes</button>' +
        '<p class="feedback" id="disc-fb"></p>';
      host.appendChild(panel);
      $("btn-hear-disc").addEventListener("click", () => speak((d.prompts || []).join(". ")));
      $("btn-save-disc").addEventListener("click", () => {
        state.discussion[currentId] = $("disc-notes").value;
        saveState();
        $("disc-fb").textContent = "Saved on this device.";
        $("disc-fb").className = "feedback good";
      });
      return;
    }

    if (currentStep === "writing") {
      const w = lesson.writing;
      const saved = state.writing[currentId] || "";
      const panel = document.createElement("div");
      panel.className = "panel";
      panel.innerHTML =
        "<h3>Writing</h3>" +
        "<p>" +
        escapeHtml(w.prompt) +
        "</p>" +
        '<div class="frame-hint">' +
        escapeHtml(w.frame || "") +
        "</div>" +
        '<button type="button" class="btn small" id="btn-hear-write">🔊 Hear prompt</button>' +
        '<label for="write-area" style="display:block;margin-top:0.75rem;font-weight:800">My writing</label>' +
        '<textarea id="write-area" placeholder="Write here…">' +
        escapeHtml(saved) +
        "</textarea>" +
        '<button type="button" class="btn primary small" id="btn-save-write" style="margin-top:0.5rem">Save writing</button>' +
        '<p class="feedback" id="write-fb"></p>';
      host.appendChild(panel);
      $("btn-hear-write").addEventListener("click", () => speak(w.prompt + " " + (w.frame || "")));
      $("btn-save-write").addEventListener("click", () => {
        const text = $("write-area").value.trim();
        state.writing[currentId] = text;
        saveState();
        const lines = text.split(/[.!?]+/).filter((x) => x.trim().length > 2);
        const min = w.minSentences || 1;
        if (lines.length >= min) {
          $("write-fb").textContent = "Saved! Looks like about " + lines.length + " sentence(s).";
          $("write-fb").className = "feedback good";
        } else {
          $("write-fb").textContent =
            "Saved. Try to write at least " + min + " full sentence(s) when you can.";
          $("write-fb").className = "feedback bad";
        }
      });
    }
  }

  // Events
  $("btn-continue").addEventListener("click", () => openLesson(state.lastLesson || nextIncomplete()));
  $("btn-map").addEventListener("click", () => {
    renderMap();
    show("screen-map");
  });
  $("btn-map-home").addEventListener("click", () => {
    updateProgress();
    show("screen-home");
  });
  $("btn-about").addEventListener("click", () => {
    $("about-panel").hidden = !$("about-panel").hidden;
  });
  $("btn-about-close").addEventListener("click", () => {
    $("about-panel").hidden = true;
  });
  $("btn-lesson-map").addEventListener("click", () => {
    renderMap();
    show("screen-map");
  });
  $("btn-hear-obj").addEventListener("click", () => {
    const l = lessonById(currentId);
    if (l) speak(l.title + ". " + l.objective);
  });
  document.querySelectorAll(".step-btn").forEach((b) => {
    b.addEventListener("click", () => setStep(b.getAttribute("data-step")));
  });
  $("btn-complete-lesson").addEventListener("click", () => {
    if (!currentId) return;
    state.completed[currentId] = true;
    state.lastLesson = Math.min(20, currentId + 1);
    saveState();
    updateProgress();
    alert("Lesson " + currentId + " marked complete. Great work!");
    renderMap();
    show("screen-map");
  });

  try {
    if (window.TokenMooseVoice) {
      voice = TokenMooseVoice.create("english-path");
      const slot = document.getElementById("tm-voice-slot");
      if (voice && voice.mountPicker && slot) voice.mountPicker(slot);
    }
  } catch (_) {}

  updateProgress();
  show("screen-home");
})();
