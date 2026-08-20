/**
 * The Token Moose - Main application logic
 */

// Base path helper for GitHub Pages project sites.
// If the site is served from /repo-name/, links and assets stay correct.
function getBasePath() {
  // Detect if we are under a project path (e.g. /the-token-moose/)
  const path = window.location.pathname;
  // Simple heuristic: if path has more than one segment before the page, use it
  // For root domain or user/org pages it will be "/"
  const segments = path.split("/").filter(Boolean);
  if (segments.length === 0) return "";
  // If the last segment looks like an HTML file, drop it
  if (segments[segments.length - 1].includes(".")) {
    segments.pop();
  }
  // For multi-page static sites we keep only the repo root if present
  // Common pattern: /repo-name/index.html → base = /repo-name
  // We assume the first segment is the repo when not at domain root.
  // Safer approach used throughout: all asset and page links are relative.
  return "";
}

function createCard(project) {
  const isFav = isFavorite(project.id);
  const typeLabel = project.type === "game" ? "Game" : "Tool";
  const actionLabel = project.type === "game" ? "Play" : "Launch";
  const actionAria = project.type === "game" ? `Play ${project.title}` : `Launch ${project.title}`;

  const card = document.createElement("article");
  card.className = `project-card ${project.type}-card`;
  card.dataset.id = project.id;
  card.dataset.type = project.type;

  card.innerHTML = `
    <a href="${project.playUrl}" class="card-image-link" aria-label="${actionAria}">
      <div class="card-image-wrap">
        <img 
          src="${project.screenshot}" 
          alt=""
          class="card-image"
          loading="lazy"
          width="400"
          height="225"
        >
        <span class="card-badge ${project.type}">${typeLabel}</span>
      </div>
    </a>
    <div class="card-body">
      <h3 class="card-title">${escapeHtml(project.title)}</h3>
      <p class="card-category">${escapeHtml(project.subject || project.category)}${project.type === "game" && project.category ? ` · ${escapeHtml(project.category)}` : ""}</p>
      <p class="card-desc">${escapeHtml(project.description)}</p>
      ${Array.isArray(project.skills) && project.skills.length
        ? `<ul class="card-skills">${project.skills.map((s) => `<li>${escapeHtml(s)}</li>`).join("")}</ul>`
        : ""}
      <div class="card-actions">
        <a href="${project.playUrl}" class="btn btn-primary" aria-label="${actionAria}">
          ${actionLabel}
        </a>
        ${project.installable ? `
          <button type="button" class="btn btn-secondary" data-install-btn data-project-id="${project.id}" aria-label="Install ${escapeHtml(project.title)} as app">
            Install
          </button>
        ` : `
          <button type="button" class="btn btn-secondary" disabled aria-label="Installation not available for ${escapeHtml(project.title)}">
            Install
          </button>
        `}
        <button 
          type="button" 
          class="btn btn-fav ${isFav ? "is-favorite" : ""}" 
          data-fav-btn 
          data-project-id="${project.id}"
          aria-label="${isFav ? `Remove ${escapeHtml(project.title)} from favorites` : `Add ${escapeHtml(project.title)} to favorites`}"
          aria-pressed="${isFav}"
        >
          <span class="heart" aria-hidden="true">${isFav ? "♥" : "♡"}</span>
        </button>
      </div>
    </div>
  `;

  return card;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function renderProjects(projects, container) {
  if (!container) return;
  container.innerHTML = "";

  if (!projects || projects.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p class="empty-title">Nothing here yet</p>
        <p class="empty-desc">Try a different filter or search term.</p>
      </div>
    `;
    return;
  }

  const fragment = document.createDocumentFragment();
  projects.forEach((p) => {
    fragment.appendChild(createCard(p));
  });
  container.appendChild(fragment);

  // Re-attach install button state
  if (typeof updateInstallButtons === "function") {
    updateInstallButtons();
  }
}

function setupFavoriteButtons(container) {
  if (!container) return;
  container.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-fav-btn]");
    if (!btn) return;

    const id = btn.dataset.projectId;
    const nowFavorite = toggleFavorite(id);
    const heart = btn.querySelector(".heart");
    const title = getProjectById(id)?.title || "this project";

    btn.classList.toggle("is-favorite", nowFavorite);
    btn.setAttribute("aria-pressed", nowFavorite);
    btn.setAttribute(
      "aria-label",
      nowFavorite ? `Remove ${title} from favorites` : `Add ${title} to favorites`
    );
    if (heart) heart.textContent = nowFavorite ? "♥" : "♡";

    // Subtle animation
    btn.classList.add("just-toggled");
    setTimeout(() => btn.classList.remove("just-toggled"), 300);

    // If we are on the Favorites page, refresh the list
    if (document.body.dataset.page === "favorites") {
      const list = document.getElementById("project-grid");
      renderProjects(getFavoriteProjects(), list);
      updateFavoritesEmptyState();
    }
  });
}

function setupInstallButtons(container) {
  if (!container) return;
  container.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-install-btn]");
    if (!btn || btn.disabled) return;

    // Each game/tool is its own PWA. Navigate into that app so the browser
    // can install *that* scope (not the whole library site).
    const id = btn.getAttribute("data-project-id");
    const project = typeof getProjectById === "function" ? getProjectById(id) : null;
    if (project && project.playUrl) {
      const url = project.playUrl.replace(/\/?$/, "/") + "index.html?install=1";
      window.location.href = url;
      return;
    }

    const existing = document.querySelector(".install-toast");
    if (existing) existing.remove();
    const toast = document.createElement("div");
    toast.className = "install-toast";
    toast.setAttribute("role", "status");
    toast.textContent = "Open the game or tool first, then use Install when the prompt appears.";
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add("show"), 10);
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  });
}


function setupSearchAndFilter(options = {}) {
  const searchInput = document.getElementById("search-input");
  const filterButtons = document.querySelectorAll("[data-filter]");
  const grid = document.getElementById("project-grid");
  if (!grid) return;

  let currentFilter = options.defaultFilter || "all";
  let currentQuery = "";

  function apply() {
    let list = getAllProjects();

    // Type / favorites filter
    if (currentFilter === "games") {
      list = list.filter((p) => p.type === "game");
    } else if (currentFilter === "tools") {
      list = list.filter((p) => p.type === "tool");
    } else if (currentFilter === "favorites") {
      const favIds = getFavorites();
      list = list.filter((p) => favIds.includes(p.id));
    }

    // Search
    if (currentQuery.trim()) {
      const q = currentQuery.trim().toLowerCase();
      list = list.filter((p) => {
        const skills = Array.isArray(p.skills) ? p.skills.join(" ").toLowerCase() : "";
        const subject = (p.subject || "").toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.type.toLowerCase().includes(q) ||
          subject.includes(q) ||
          skills.includes(q)
        );
      });
    }

    renderProjects(list, grid);
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      currentQuery = searchInput.value;
      apply();
    });
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => {
        b.classList.remove("is-active");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-pressed", "true");
      currentFilter = btn.dataset.filter;
      apply();
    });
  });

  // Initial render
  apply();
}

function updateFavoritesEmptyState() {
  const empty = document.getElementById("favorites-empty");
  const grid = document.getElementById("project-grid");
  if (!empty || !grid) return;

  const hasFavs = getFavorites().length > 0;
  empty.hidden = hasFavs;
  grid.hidden = !hasFavs;
}

function setupMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open);
    document.body.classList.toggle("nav-open", open);
  });

  // Close on link click (mobile)
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
    });
  });
}

function initPage() {
  setupMobileNav();

  const page = document.body.dataset.page;
  const grid = document.getElementById("project-grid");

  if (grid) {
    setupFavoriteButtons(grid);
    setupInstallButtons(grid);
  }

  if (page === "home") {
    // Featured + mixed preview
    const featured = getFeaturedProjects();
    renderProjects(featured, grid);
    setupSearchAndFilter({ defaultFilter: "all" });
  } else if (page === "games") {
    setupSearchAndFilter({ defaultFilter: "games" });
  } else if (page === "tools") {
    setupSearchAndFilter({ defaultFilter: "tools" });
  } else if (page === "favorites") {
    const favs = getFavoriteProjects();
    renderProjects(favs, grid);
    updateFavoritesEmptyState();
    // Still allow search on favorites page
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
      searchInput.addEventListener("input", () => {
        const q = searchInput.value.trim().toLowerCase();
        let list = getFavoriteProjects();
        if (q) {
          list = list.filter((p) => {
            const skills = Array.isArray(p.skills) ? p.skills.join(" ").toLowerCase() : "";
            const subject = (p.subject || "").toLowerCase();
            return (
              p.title.toLowerCase().includes(q) ||
              p.description.toLowerCase().includes(q) ||
              p.category.toLowerCase().includes(q) ||
              subject.includes(q) ||
              skills.includes(q)
            );
          });
        }
        renderProjects(list, grid);
        // Keep empty state accurate only when no search
        if (!q) updateFavoritesEmptyState();
        else {
          const empty = document.getElementById("favorites-empty");
          if (empty) empty.hidden = true;
          grid.hidden = false;
        }
      });
    }
  }

  // Global install button updates
  if (typeof updateInstallButtons === "function") {
    updateInstallButtons();
  }
}

if (document.readyState === "loading") {
  
  // Skill tags visibility (library cards)
  const TAGS_KEY = "token-moose-show-tags";
  function applyTagsVisibility() {
    let show = true;
    try {
      const v = localStorage.getItem(TAGS_KEY);
      if (v === "0") show = false;
    } catch (_) {}
    document.body.classList.toggle("hide-card-skills", !show);
    document.querySelectorAll("[data-tags-toggle]").forEach((btn) => {
      btn.setAttribute("aria-pressed", show ? "true" : "false");
      btn.classList.toggle("is-active", show);
      btn.textContent = show ? "Tags on" : "Tags off";
    });
  }
  function setupTagsToggle() {
    applyTagsVisibility();
    document.querySelectorAll("[data-tags-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const show = document.body.classList.contains("hide-card-skills");
        try {
          localStorage.setItem(TAGS_KEY, show ? "1" : "0");
        } catch (_) {}
        applyTagsVisibility();
      });
    });
  }

  document.addEventListener("DOMContentLoaded", initPage);
} else {
  initPage();
}
