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

  function triggers() {
    return [
      document.getElementById("theme-ball"),
      document.getElementById("theme-label-btn"),
    ].filter(Boolean);
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
    const label = document.getElementById("theme-label-btn");
    if (label) label.setAttribute("aria-label", "Theme: " + THEMES[id].label + ". Change theme");
  }

  function setExpanded(open) {
    triggers().forEach((el) => el.setAttribute("aria-expanded", open ? "true" : "false"));
  }

  function closeMenu() {
    const menu = document.getElementById("theme-menu");
    if (menu) menu.hidden = true;
    setExpanded(false);
  }

  function toggleMenu() {
    const menu = document.getElementById("theme-menu");
    if (!menu) return;
    const open = menu.hidden;
    menu.hidden = !open;
    setExpanded(open);
  }

  function init() {
    applyTheme(getTheme());
    const menu = document.getElementById("theme-menu");
    const balls = triggers();
    if (!menu || !balls.length) return;
    balls.forEach((el) => {
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleMenu();
      });
    });
    menu.querySelectorAll(".theme-option").forEach((btn) => {
      btn.addEventListener("click", () => {
        applyTheme(btn.getAttribute("data-theme"));
        closeMenu();
      });
    });
    document.addEventListener("click", (e) => {
      if (menu.hidden) return;
      if (menu.contains(e.target)) return;
      if (balls.some((b) => b === e.target || b.contains(e.target))) return;
      closeMenu();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }

  try { document.documentElement.setAttribute("data-theme", getTheme()); } catch (_) {}
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
