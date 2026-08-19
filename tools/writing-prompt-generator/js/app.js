/**
 * Writing Prompt Generator — teacher activity cards
 */
(function () {
  "use strict";

  const FAV_KEY = "token-moose-wpg-favs";

  let genre = "narrative";
  let level = "k";
  let topic = "animals";
  let customTopic = "";
  let card = null;
  let favs = loadFavs();

  const $ = (id) => document.getElementById(id);

  function loadFavs() {
    try {
      const a = JSON.parse(localStorage.getItem(FAV_KEY) || "[]");
      return Array.isArray(a) ? a : [];
    } catch (_) {
      return [];
    }
  }
  function saveFavs() {
    try {
      localStorage.setItem(FAV_KEY, JSON.stringify(favs.slice(0, 40)));
    } catch (_) {}
  }

  function pick(arr) {
    if (!arr || !arr.length) return "";
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function topicKey() {
    return topic === "custom" ? "animals" : topic; // fallback bank; custom injected in prompt text
  }

  function getBank(section) {
    const root = WPG[section];
    if (!root || !root[genre]) return [];
    const byTopic = root[genre][topicKey()];
    if (!byTopic) return [];
    return byTopic[level] || byTopic.k || [];
  }

  function buildCard(keepPrompt) {
    let prompt = keepPrompt && card ? card.prompt : pick(getBank("prompts"));
    if (topic === "custom" && customTopic) {
      if (!keepPrompt) {
        prompt =
          pick([
            "Write about " + customTopic + ".",
            "What can you say about " + customTopic + "?",
            "Tell a story that includes " + customTopic + ".",
            "Explain something important about " + customTopic + ".",
            "Describe " + customTopic + " so a friend can picture it.",
          ]);
      }
    }
    const starters = shuffle(getBank("starters").slice()).slice(0, 5);
    let vocab = shuffle(getBank("vocab").slice()).slice(0, 8);
    if (topic === "custom" && customTopic) {
      vocab = [customTopic].concat(vocab).slice(0, 8);
    }
    const challenge = pick(getBank("challenges")) || "Add one more detail.";
    const draw = pick(getBank("draw")) || "Draw a picture for your writing.";
    card = {
      genre,
      level,
      topic: topic === "custom" ? customTopic || "custom" : topic,
      prompt,
      starters,
      vocab,
      challenge,
      draw,
      ts: Date.now(),
    };
    renderCard();
  }

  function shuffle(a) {
    const x = a.slice();
    for (let i = x.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [x[i], x[j]] = [x[j], x[i]];
    }
    return x;
  }

  function labelOf(list, id) {
    const f = list.find((x) => x.id === id);
    return f ? f.label : id;
  }

  function renderCard() {
    if (!card) return;
    $("out-meta").textContent =
      labelOf(WPG.genres, card.genre) +
      " · " +
      labelOf(WPG.levels, card.level) +
      " · " +
      (card.topic || "");
    $("out-prompt").textContent = card.prompt;
    $("out-starters").innerHTML = card.starters
      .map((s) => "<li>" + escapeHtml(s) + "</li>")
      .join("");
    $("out-vocab").innerHTML = card.vocab
      .map((w) => '<span class="chip">' + escapeHtml(w) + "</span>")
      .join("");
    $("out-challenge").textContent = card.challenge;
    $("out-draw").textContent = card.draw;
    $("card").hidden = false;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function cardText() {
    if (!card) return "";
    return (
      "WRITING PROMPT\n" +
      card.prompt +
      "\n\nSentence starters:\n" +
      card.starters.map((s) => "• " + s).join("\n") +
      "\n\nVocabulary: " +
      card.vocab.join(", ") +
      "\n\nChallenge: " +
      card.challenge +
      "\n\nDrawing: " +
      card.draw +
      "\n\n(" +
      labelOf(WPG.genres, card.genre) +
      " · " +
      labelOf(WPG.levels, card.level) +
      " · " +
      card.topic +
      ")"
    );
  }

  function renderFavs() {
    const el = $("fav-list");
    el.innerHTML = "";
    if (!favs.length) {
      el.innerHTML = '<p class="muted">No favourites yet.</p>';
      return;
    }
    favs.forEach((f, i) => {
      const row = document.createElement("div");
      row.className = "fav-row";
      row.innerHTML =
        "<span>" +
        escapeHtml(f.prompt.slice(0, 80)) +
        (f.prompt.length > 80 ? "…" : "") +
        '</span><button type="button" data-i="' +
        i +
        '" class="btn-tiny">Load</button><button type="button" data-del="' +
        i +
        '" class="btn-tiny danger">×</button>';
      el.appendChild(row);
    });
    el.querySelectorAll("[data-i]").forEach((b) => {
      b.onclick = () => {
        card = favs[Number(b.dataset.i)];
        genre = card.genre;
        level = card.level;
        topic = WPG.topics.some((t) => t.id === card.topic) ? card.topic : "custom";
        if (topic === "custom") {
          customTopic = card.topic;
          $("custom-topic").value = customTopic;
        }
        syncSelects();
        renderCard();
      };
    });
    el.querySelectorAll("[data-del]").forEach((b) => {
      b.onclick = () => {
        favs.splice(Number(b.dataset.del), 1);
        saveFavs();
        renderFavs();
      };
    });
  }

  function syncSelects() {
    $("sel-genre").value = genre;
    $("sel-level").value = level;
    $("sel-topic").value = topic;
    $("custom-wrap").hidden = topic !== "custom";
  }

  document.addEventListener("DOMContentLoaded", () => {
    WPG.genres.forEach((g) => {
      $("sel-genre").innerHTML +=
        '<option value="' + g.id + '">' + g.label + "</option>";
    });
    WPG.levels.forEach((g) => {
      $("sel-level").innerHTML +=
        '<option value="' + g.id + '">' + g.label + "</option>";
    });
    WPG.topics.forEach((g) => {
      $("sel-topic").innerHTML +=
        '<option value="' + g.id + '">' + g.label + "</option>";
    });

    $("sel-genre").onchange = (e) => {
      genre = e.target.value;
    };
    $("sel-level").onchange = (e) => {
      level = e.target.value;
    };
    $("sel-topic").onchange = (e) => {
      topic = e.target.value;
      $("custom-wrap").hidden = topic !== "custom";
    };
    $("custom-topic").oninput = (e) => {
      customTopic = e.target.value.trim();
    };

    $("btn-generate").onclick = () => buildCard(false);
    $("btn-regen-prompt").onclick = () => buildCard(false);
    $("btn-regen-starters").onclick = () => {
      if (!card) return;
      card.starters = shuffle(getBank("starters").slice()).slice(0, 5);
      renderCard();
    };
    $("btn-regen-vocab").onclick = () => {
      if (!card) return;
      card.vocab = shuffle(getBank("vocab").slice()).slice(0, 8);
      if (topic === "custom" && customTopic) {
        card.vocab = [customTopic].concat(card.vocab).slice(0, 8);
      }
      renderCard();
    };
    $("btn-regen-challenge").onclick = () => {
      if (!card) return;
      card.challenge = pick(getBank("challenges")) || card.challenge;
      card.draw = pick(getBank("draw")) || card.draw;
      renderCard();
    };
    $("btn-copy").onclick = () => {
      const t = cardText();
      if (navigator.clipboard) navigator.clipboard.writeText(t);
      else {
        const ta = document.createElement("textarea");
        ta.value = t;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
      }
      $("status").textContent = "Copied!";
      setTimeout(() => ($("status").textContent = ""), 1200);
    };
    $("btn-print").onclick = () => window.print();
    $("btn-fav").onclick = () => {
      if (!card) return;
      favs.unshift(JSON.parse(JSON.stringify(card)));
      saveFavs();
      renderFavs();
      $("status").textContent = "Saved to favourites";
      setTimeout(() => ($("status").textContent = ""), 1200);
    };

    renderFavs();
  });
})();
