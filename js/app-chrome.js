/**
 * Shared top chrome: Back (left) · Voice slot (center) · Favorite (right)
 * Colors follow site theme (token-moose-theme / data-theme).
 * Scales up under Projector Mode (data-projector="on").
 */
(function () {
  const FAVORITES_KEY = "token-moose-favorites";
  const THEME_KEY = "token-moose-theme";
  const HOME = "../../index.html";

  const THEME_PALETTES = {
    night: {
      barBg: "rgba(12, 14, 28, 0.88)",
      border: "rgba(168, 85, 247, 0.45)",
      text: "#f1f5f9",
      accent: "#f9a8d4",
      favOnBg: "rgba(120, 30, 70, 0.9)",
      favOnBorder: "rgba(249, 168, 212, 0.7)",
      glow: "0 0 16px rgba(168, 85, 247, 0.25)",
    },
    day: {
      barBg: "rgba(255, 255, 255, 0.92)",
      border: "rgba(14, 165, 233, 0.4)",
      text: "#0f172a",
      accent: "#0284c7",
      favOnBg: "rgba(14, 165, 233, 0.18)",
      favOnBorder: "rgba(2, 132, 199, 0.55)",
      glow: "0 0 14px rgba(14, 165, 233, 0.2)",
    },
    playful: {
      barBg: "rgba(255, 247, 237, 0.94)",
      border: "rgba(249, 115, 22, 0.45)",
      text: "#7c2d12",
      accent: "#ea580c",
      favOnBg: "rgba(244, 63, 94, 0.2)",
      favOnBorder: "rgba(244, 63, 94, 0.55)",
      glow: "0 0 14px rgba(249, 115, 22, 0.25)",
    },
    forest: {
      barBg: "rgba(12, 31, 20, 0.9)",
      border: "rgba(74, 222, 128, 0.45)",
      text: "#ecfdf5",
      accent: "#4ade80",
      favOnBg: "rgba(22, 101, 52, 0.85)",
      favOnBorder: "rgba(134, 239, 172, 0.7)",
      glow: "0 0 16px rgba(74, 222, 128, 0.28)",
    },
    ocean: {
      barBg: "rgba(8, 24, 48, 0.92)",
      border: "rgba(56, 189, 248, 0.45)",
      text: "#e0f2fe",
      accent: "#38bdf8",
      favOnBg: "rgba(12, 74, 110, 0.9)",
      favOnBorder: "rgba(125, 211, 252, 0.7)",
      glow: "0 0 16px rgba(56, 189, 248, 0.28)",
    },
  };

  function getThemeId() {
    try {
      const t = localStorage.getItem(THEME_KEY);
      if (t && THEME_PALETTES[t]) return t;
    } catch (_) {}
    const attr = document.documentElement.getAttribute("data-theme");
    if (attr && THEME_PALETTES[attr]) return attr;
    return "night";
  }

  function isProjector() {
    try {
      if (localStorage.getItem("token-moose-projector") === "on") return true;
    } catch (_) {}
    return document.documentElement.getAttribute("data-projector") === "on";
  }

  function getFavorites() {
    try {
      const raw = localStorage.getItem(FAVORITES_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (_) {
      return [];
    }
  }

  function saveFavorites(ids) {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
    } catch (_) {}
  }

  function isFavorite(id) {
    return getFavorites().includes(id);
  }

  function toggleFavorite(id) {
    const cur = getFavorites();
    const i = cur.indexOf(id);
    if (i === -1) cur.push(id);
    else cur.splice(i, 1);
    saveFavorites(cur);
    return cur.includes(id);
  }

  function goHome() {
    try {
      window.location.assign(HOME);
    } catch (_) {
      window.location.href = HOME;
    }
  }

  function injectStyles() {
    const p = THEME_PALETTES[getThemeId()];
    const proj = isProjector();
    const minH = proj ? "2.85rem" : "2.4rem";
    const fontSz = proj ? "1rem" : "0.88rem";
    const padY = proj ? "0.55rem" : "0.45rem";
    const padX = proj ? "1.15rem" : "0.95rem";
    let style = document.getElementById("tm-app-chrome-style");
    if (!style) {
      style = document.createElement("style");
      style.id = "tm-app-chrome-style";
      document.head.appendChild(style);
    }
    style.textContent = `
      .tm-app-chrome {
        position: fixed;
        top: 0; left: 0; right: 0;
        z-index: 10050;
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        align-items: center;
        gap: 0.5rem;
        padding: ${proj ? "0.8rem" : "0.65rem"} 0.85rem;
        pointer-events: none;
        font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
      }
      .tm-app-chrome > * { pointer-events: auto; }
      .tm-app-chrome .tm-chrome-left { justify-self: start; }
      .tm-app-chrome .tm-chrome-center { justify-self: center; }
      .tm-app-chrome .tm-chrome-right { justify-self: end; }
      .tm-app-chrome .tm-back,
      .tm-app-chrome .tm-fav {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.35rem;
        min-height: ${minH};
        padding: ${padY} ${padX};
        border-radius: 999px;
        border: 2px solid ${p.border};
        background: ${p.barBg};
        color: ${p.text} !important;
        font: inherit;
        font-weight: 800;
        font-size: ${fontSz};
        line-height: 1;
        text-decoration: none !important;
        cursor: pointer;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        box-shadow: 0 4px 16px rgba(0,0,0,0.2), ${p.glow};
        transition: transform 0.15s ease, background 0.15s ease, border-color 0.15s ease;
      }
      .tm-app-chrome .tm-back:hover,
      .tm-app-chrome .tm-fav:hover {
        transform: translateY(-1px);
        border-color: ${p.accent};
        color: ${p.text} !important;
      }
      .tm-app-chrome .tm-back:focus-visible,
      .tm-app-chrome .tm-fav:focus-visible {
        outline: 2px solid ${p.accent};
        outline-offset: 2px;
      }
      .tm-app-chrome .tm-fav {
        min-width: ${proj ? "3rem" : "2.6rem"};
        padding: ${padY} 0.75rem;
        font-size: ${proj ? "1.25rem" : "1.15rem"};
      }
      .tm-app-chrome .tm-fav.is-favorite {
        border-color: ${p.favOnBorder};
        background: ${p.favOnBg};
        color: ${p.accent} !important;
      }
      .tm-app-chrome .tm-fav .tm-fav-label {
        font-size: ${proj ? "0.85rem" : "0.78rem"};
        font-weight: 800;
        letter-spacing: 0.02em;
      }
      #tm-voice-slot {
        min-height: ${minH};
        display: flex;
        align-items: center;
        justify-content: center;
      }
      #tm-voice-slot .tm-voice-picker { z-index: 10060; }
      #tm-voice-slot .tm-voice-btn {
        border: 2px solid ${p.border} !important;
        background: ${p.barBg} !important;
        color: ${p.text} !important;
        box-shadow: 0 4px 16px rgba(0,0,0,0.15), ${p.glow};
        min-height: ${minH} !important;
        font-size: ${fontSz} !important;
      }
      body.tm-has-app-chrome { padding-top: ${proj ? "3.9rem" : "3.4rem"} !important; }
      body.tm-has-app-chrome .library-back { display: none !important; }
      body.tm-has-app-chrome .tm-voice-float { display: none !important; }
      body.tm-has-app-chrome #voice-slot:not(#tm-voice-slot),
      body.tm-has-app-chrome .local-voice-slot,
      body.tm-has-app-chrome .extra-voice-btn {
        display: none !important;
      }
      @media print {
        .tm-app-chrome { display: none !important; }
        body.tm-has-app-chrome { padding-top: 0 !important; }
      }
    `;
  }

  function mount() {
    const body = document.body;
    if (!body) return;
    const appId =
      body.getAttribute("data-app-id") ||
      document.documentElement.getAttribute("data-app-id") ||
      "";
    const appTitle =
      body.getAttribute("data-app-title") ||
      document.title.replace(/\s*[—|-]\s*The Token Moose.*$/i, "").trim() ||
      "this app";

    // Apply theme + projector early for apps that don't load theme.js
    try {
      const t = localStorage.getItem(THEME_KEY);
      if (t) document.documentElement.setAttribute("data-theme", t);
      const pr = localStorage.getItem("token-moose-projector");
      document.documentElement.setAttribute("data-projector", pr === "on" ? "on" : "off");
    } catch (_) {}

    injectStyles();

    // Ensure themes.css + theme-app.css so theme ball styles exist on every app
    (function ensureThemeCss() {
      let cssBase = "../../css/";
      document.querySelectorAll("script[src]").forEach((sc) => {
        const src = sc.getAttribute("src") || "";
        if (src.indexOf("app-chrome.js") !== -1) {
          cssBase = src.replace("js/app-chrome.js", "css/");
        }
      });
      function needLink(hrefPart, fullHref) {
        const has = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).some(
          (l) => (l.getAttribute("href") || "").indexOf(hrefPart) !== -1
        );
        if (has) return;
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = fullHref;
        document.head.appendChild(link);
      }
      needLink("themes.css", cssBase + "themes.css");
      needLink("theme-app.css", cssBase + "theme-app.css");
    })();

    // Theme ball (bottom-left) — load shared theme.js once
    if (!document.querySelector('script[data-tm-theme]') && !window.__tmThemeLoaded) {
      let themeSrc = "../../js/theme.js";
      document.querySelectorAll("script[src]").forEach((sc) => {
        const src = sc.getAttribute("src") || "";
        if (src.indexOf("app-chrome.js") !== -1) {
          themeSrc = src.replace("app-chrome.js", "theme.js");
        }
      });
      const s = document.createElement("script");
      s.src = themeSrc;
      s.dataset.tmTheme = "1";
      window.__tmThemeLoaded = true;
      document.head.appendChild(s);
    }

    body.classList.add("tm-has-app-chrome");
    document.querySelectorAll(".tm-app-chrome").forEach((n) => n.remove());

    const bar = document.createElement("div");
    bar.className = "tm-app-chrome";
    bar.setAttribute("role", "navigation");
    bar.setAttribute("aria-label", "App navigation");

    const left = document.createElement("div");
    left.className = "tm-chrome-left";
    const back = document.createElement("button");
    back.type = "button";
    back.className = "tm-back";
    back.textContent = "← Back to Moose Tools";
    back.addEventListener("click", goHome);
    left.appendChild(back);

    const center = document.createElement("div");
    center.className = "tm-chrome-center";
    const voiceSlot = document.createElement("div");
    voiceSlot.id = "tm-voice-slot";
    center.appendChild(voiceSlot);

    const right = document.createElement("div");
    right.className = "tm-chrome-right";
    const fav = document.createElement("button");
    fav.type = "button";
    fav.className = "tm-fav";

    function paintFav() {
      const on = appId && isFavorite(appId);
      fav.classList.toggle("is-favorite", on);
      fav.innerHTML = on
        ? '<span aria-hidden="true">♥</span><span class="tm-fav-label">Favorited</span>'
        : '<span aria-hidden="true">♡</span><span class="tm-fav-label">Favorite</span>';
      fav.setAttribute(
        "aria-label",
        on ? `Remove ${appTitle} from favorites` : `Add ${appTitle} to favorites`
      );
      fav.setAttribute("aria-pressed", on ? "true" : "false");
    }

    if (appId) {
      paintFav();
      fav.addEventListener("click", () => {
        toggleFavorite(appId);
        paintFav();
      });
      right.appendChild(fav);
    }

    bar.appendChild(left);
    bar.appendChild(center);
    bar.appendChild(right);
    body.insertBefore(bar, body.firstChild);

    try {
      const obs = new MutationObserver(() => injectStyles());
      obs.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme", "data-projector"],
      });
    } catch (_) {}
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
