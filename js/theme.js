(function () {
  const KEY = "token-moose-theme";
  const THEMES = {
    night: { label: "Night City", meta: "#0a0b1a" },
    day: { label: "Daylight", meta: "#e8eef8" },
    playful: { label: "Preschool Playful", meta: "#ffedd5" },
  };

  function getTheme() {
    try {
      const t = localStorage.getItem(KEY);
      if (t && THEMES[t]) return t;
    } catch (_) {}
    return "night";
  }

  function applyTheme(id) {
    if (!THEMES[id]) id = "night";
    document.documentElement.setAttribute("data-theme", id);
    try { localStorage.setItem(KEY, id); } catch (_) {}
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", THEMES[id].meta);
    document.querySelectorAll(".theme-option").forEach((btn) => {
      const active = btn.getAttribute("data-theme") === id;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-checked", active ? "true" : "false");
    });
    const ball = document.getElementById("theme-ball");
    if (ball) ball.setAttribute("aria-label", "Theme: " + THEMES[id].label + ". Change theme");
  }

  function closeMenu() {
    const menu = document.getElementById("theme-menu");
    const ball = document.getElementById("theme-ball");
    if (menu) menu.hidden = true;
    if (ball) ball.setAttribute("aria-expanded", "false");
  }

  function toggleMenu() {
    const menu = document.getElementById("theme-menu");
    const ball = document.getElementById("theme-ball");
    if (!menu || !ball) return;
    const open = menu.hidden;
    menu.hidden = !open;
    ball.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function init() {
    applyTheme(getTheme());
    const ball = document.getElementById("theme-ball");
    const menu = document.getElementById("theme-menu");
    if (!ball || !menu) return;
    ball.addEventListener("click", (e) => { e.stopPropagation(); toggleMenu(); });
    menu.querySelectorAll(".theme-option").forEach((btn) => {
      btn.addEventListener("click", () => {
        applyTheme(btn.getAttribute("data-theme"));
        closeMenu();
      });
    });
    document.addEventListener("click", (e) => {
      if (!menu.hidden && !menu.contains(e.target) && e.target !== ball) closeMenu();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }

  try { document.documentElement.setAttribute("data-theme", getTheme()); } catch (_) {}
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
