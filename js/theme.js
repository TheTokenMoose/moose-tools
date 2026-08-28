/**
 * Theme switcher — self-contained control (ball + optional "Themes" label + menu).
 * Shell pages: ball + Themes label in header.
 * App/game pages (body[data-app-id]): ball only, fixed bottom-left.
 * Includes Projector Mode toggle.
 */
(function () {
  const KEY = "token-moose-theme";
  const PROJECTOR_KEY = "token-moose-projector";
  const THEMES = {
    night: { label: "Night City", blurb: "Soft neon · default", meta: "#0a0b1a" },
    day: { label: "Daylight", blurb: "Bright · airy · calm", meta: "#e8eef8" },
    playful: { label: "Preschool Playful", blurb: "Warm · candy · energetic", meta: "#ffedd5" },
    forest: { label: "Forest Grove", blurb: "Moss · canopy · calm green", meta: "#0c1f14" },
    ocean: { label: "Ocean Breeze", blurb: "Deep sea · soft cyan · calm", meta: "#071526" },
  };

  function isAppPage() {
    return !!(document.body && document.body.getAttribute("data-app-id"));
  }

  function getTheme() {
    try {
      const t = localStorage.getItem(KEY);
      if (t && THEMES[t]) return t;
    } catch (_) {}
    return "night";
  }

  function getProjector() {
    try {
      return localStorage.getItem(PROJECTOR_KEY) === "on";
    } catch (_) {
      return false;
    }
  }

  function applyProjector(on) {
    document.documentElement.setAttribute("data-projector", on ? "on" : "off");
    try {
      localStorage.setItem(PROJECTOR_KEY, on ? "on" : "off");
    } catch (_) {}
    const btn = document.getElementById("projector-toggle");
    if (btn) {
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-checked", on ? "true" : "false");
      const small = btn.querySelector("small");
      if (small) small.textContent = on ? "On · larger text & contrast" : "Off · normal classroom view";
    }
  }

  function applyTheme(id) {
    if (!THEMES[id]) id = "night";
    document.documentElement.setAttribute("data-theme", id);
    try {
      localStorage.setItem(KEY, id);
    } catch (_) {}
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta && THEMES[id]) meta.setAttribute("content", THEMES[id].meta);
    document.querySelectorAll(".theme-option[data-theme]").forEach((btn) => {
      const on = btn.getAttribute("data-theme") === id;
      btn.setAttribute("aria-checked", on ? "true" : "false");
      btn.classList.toggle("is-active", on);
    });
  }

  function closeMenu() {
    const menu = document.getElementById("theme-menu");
    if (menu) menu.hidden = true;
    document.querySelectorAll("#theme-ball, #theme-label-btn").forEach((el) => {
      if (el) el.setAttribute("aria-expanded", "false");
    });
  }

  function toggleMenu(e) {
    if (e) e.stopPropagation();
    const menu = document.getElementById("theme-menu");
    if (!menu) return;
    const open = menu.hidden;
    menu.hidden = !open;
    document.querySelectorAll("#theme-ball, #theme-label-btn").forEach((el) => {
      if (el) el.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  function ensureMarkup() {
    const app = isAppPage();
    let root = document.getElementById("tm-app-theme-switcher");
    if (app) {
      if (!root) {
        root = document.createElement("div");
        root.id = "tm-app-theme-switcher";
        root.className = "theme-switcher theme-switcher--app";
        document.body.appendChild(root);
      }
    } else {
      root = document.querySelector(".site-header .theme-switcher") || document.querySelector(".theme-switcher");
      if (!root) {
        const host =
          document.querySelector(".site-header .header-inner") ||
          document.querySelector(".site-header") ||
          document.querySelector("header");
        if (!host) return null;
        root = document.createElement("div");
        root.className = "theme-switcher";
        host.appendChild(root);
      }
    }

    // Keep existing controls so click listeners survive a second theme.js load
    if (root.querySelector("#theme-ball") && root.querySelector("#theme-menu")) {
      return root;
    }

    const labelBtn = app
      ? ""
      : `<button type="button" class="theme-label-btn" id="theme-label-btn"
          aria-haspopup="listbox" aria-expanded="false" aria-controls="theme-menu">Themes</button>`;

    root.innerHTML = `
      <div class="theme-trigger" role="group" aria-label="Theme">
        <button type="button" class="theme-ball" id="theme-ball"
          aria-haspopup="listbox" aria-expanded="false" aria-controls="theme-menu"
          title="Change theme"></button>
        ${labelBtn}
      </div>
      <div class="theme-menu" id="theme-menu" role="listbox" aria-label="Site theme" hidden>
        <button type="button" class="theme-option" role="option" data-theme="night" aria-checked="false">
          <span class="theme-swatch night" aria-hidden="true"></span>
          <span class="theme-option-text">Night City<small>Soft neon · default</small></span>
        </button>
        <button type="button" class="theme-option" role="option" data-theme="day" aria-checked="false">
          <span class="theme-swatch day" aria-hidden="true"></span>
          <span class="theme-option-text">Daylight<small>Bright · airy · calm</small></span>
        </button>
        <button type="button" class="theme-option" role="option" data-theme="playful" aria-checked="false">
          <span class="theme-swatch playful" aria-hidden="true"></span>
          <span class="theme-option-text">Preschool Playful<small>Warm · candy · energetic</small></span>
        </button>
        <button type="button" class="theme-option" role="option" data-theme="forest" aria-checked="false">
          <span class="theme-swatch forest" aria-hidden="true"></span>
          <span class="theme-option-text">Forest Grove<small>Moss · canopy · calm green</small></span>
        </button>
        <button type="button" class="theme-option" role="option" data-theme="ocean" aria-checked="false">
          <span class="theme-swatch ocean" aria-hidden="true"></span>
          <span class="theme-option-text">Ocean Breeze<small>Deep sea · soft cyan · calm</small></span>
        </button>
        <button type="button" class="theme-option projector-toggle" id="projector-toggle"
          role="option" aria-checked="false">
          <span class="theme-swatch projector" aria-hidden="true"></span>
          <span class="theme-option-text">Projector Mode<small>Off · normal classroom view</small></span>
        </button>
      </div>
    `;
    return root;
  }

  function bindControls(root) {
    const ball = document.getElementById("theme-ball");
    const labelBtn = document.getElementById("theme-label-btn");
    const menu = document.getElementById("theme-menu");
    if (!menu) return;

    [ball, labelBtn].forEach((el) => {
      if (!el || el.dataset.tmBound === "1") return;
      el.dataset.tmBound = "1";
      el.addEventListener("click", toggleMenu);
    });

    menu.querySelectorAll(".theme-option[data-theme]").forEach((btn) => {
      if (btn.dataset.tmBound === "1") return;
      btn.dataset.tmBound = "1";
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        applyTheme(btn.getAttribute("data-theme"));
        closeMenu();
      });
    });

    const proj = document.getElementById("projector-toggle");
    if (proj && proj.dataset.tmBound !== "1") {
      proj.dataset.tmBound = "1";
      proj.addEventListener("click", (e) => {
        e.stopPropagation();
        applyProjector(!getProjector());
      });
    }

    if (!window.__tmThemeDocBound) {
      window.__tmThemeDocBound = true;
      document.addEventListener("click", (e) => {
        const m = document.getElementById("theme-menu");
        const r = document.getElementById("tm-app-theme-switcher") ||
          document.querySelector(".site-header .theme-switcher") ||
          document.querySelector(".theme-switcher");
        if (!m || m.hidden) return;
        if (r && r.contains(e.target)) return;
        closeMenu();
      });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeMenu();
      });
    }
  }

  function init() {
    // Script may load twice (page + app-chrome inject). Never wipe live controls.
    window.__tmThemeLoaded = true;
    const root = ensureMarkup();
    applyTheme(getTheme());
    applyProjector(getProjector());
    if (!root) return;
    bindControls(root);
    window.__tmThemeInited = true;
  }

  try {
    document.documentElement.setAttribute("data-theme", getTheme());
    document.documentElement.setAttribute("data-projector", getProjector() ? "on" : "off");
  } catch (_) {}

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
