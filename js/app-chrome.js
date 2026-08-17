/**
 * Shared top chrome for every game/tool:
 *  - Top-left: Back to library
 *  - Top-right: Favorite heart (same localStorage key as the library)
 *
 * Usage: set <body data-app-id="candy-math" data-app-title="Candy Math Trail">
 *        and <script src="../../js/app-chrome.js"></script>
 */
(function () {
  const FAVORITES_KEY = "token-moose-favorites";
  const HOME = "../../index.html";

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

  function injectStyles() {
    if (document.getElementById("tm-app-chrome-style")) return;
    const style = document.createElement("style");
    style.id = "tm-app-chrome-style";
    style.textContent = `
      .tm-app-chrome {
        position: fixed;
        top: 0; left: 0; right: 0;
        z-index: 10050;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.75rem;
        padding: 0.65rem 0.85rem;
        pointer-events: none;
        font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
      }
      .tm-app-chrome > * { pointer-events: auto; }
      .tm-app-chrome .tm-back,
      .tm-app-chrome .tm-fav {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.35rem;
        min-height: 2.4rem;
        padding: 0.45rem 0.95rem;
        border-radius: 999px;
        border: 2px solid rgba(255,255,255,0.28);
        background: rgba(12, 14, 28, 0.82);
        color: #fff !important;
        font: inherit;
        font-weight: 800;
        font-size: 0.88rem;
        line-height: 1;
        text-decoration: none !important;
        cursor: pointer;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        box-shadow: 0 4px 16px rgba(0,0,0,0.3);
        transition: transform 0.15s ease, background 0.15s ease;
      }
      .tm-app-chrome .tm-back:hover,
      .tm-app-chrome .tm-fav:hover {
        transform: translateY(-1px);
        background: rgba(28, 32, 60, 0.95);
        color: #fff !important;
      }
      .tm-app-chrome .tm-back:focus-visible,
      .tm-app-chrome .tm-fav:focus-visible {
        outline: 2px solid #22d3ee;
        outline-offset: 2px;
      }
      .tm-app-chrome .tm-fav {
        min-width: 2.6rem;
        padding: 0.45rem 0.75rem;
        font-size: 1.15rem;
      }
      .tm-app-chrome .tm-fav.is-favorite {
        border-color: rgba(249, 168, 212, 0.65);
        background: rgba(120, 30, 70, 0.85);
        color: #fda4af !important;
      }
      .tm-app-chrome .tm-fav .tm-fav-label {
        font-size: 0.78rem;
        font-weight: 800;
        letter-spacing: 0.02em;
      }
      /* Keep page content from sitting under the fixed chrome */
      body.tm-has-app-chrome { padding-top: 3.4rem !important; }
      /* Hide legacy library-back rows so we don't double up */
      body.tm-has-app-chrome .library-back { display: none !important; }
      @media print {
        .tm-app-chrome { display: none !important; }
        body.tm-has-app-chrome { padding-top: 0 !important; }
      }
    `;
    document.head.appendChild(style);
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

    injectStyles();
    body.classList.add("tm-has-app-chrome");

    // Remove prior chrome if hot-reloaded
    document.querySelectorAll(".tm-app-chrome").forEach((n) => n.remove());

    const bar = document.createElement("div");
    bar.className = "tm-app-chrome";
    bar.setAttribute("role", "navigation");
    bar.setAttribute("aria-label", "App navigation");

    const back = document.createElement("a");
    back.className = "tm-back";
    back.href = HOME;
    back.textContent = "← Back to The Token Moose";

    const fav = document.createElement("button");
    fav.type = "button";
    fav.className = "tm-fav";
    fav.setAttribute("data-app-id", appId);

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
    } else {
      fav.hidden = true;
    }

    bar.appendChild(back);
    bar.appendChild(fav);
    body.insertBefore(bar, body.firstChild);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
