# The Token Moose

A static website for a personal collection of browser games, educational games, experiments, and small teacher tools.

**Identity:** The Token Moose  
**Creator:** David Templeton (mentioned only on the About page)

Built as a fully static site suitable for **GitHub Pages**. No accounts, no backend, no database.

---

## Features

- Responsive library of games and teacher tools
- Local favorites (stored in the browser via `localStorage`)
- Search and filtering (client-side)
- Progressive Web App (PWA) support: installable where the browser allows it
- Offline caching of site assets via a service worker
- Placeholder project cards ready to be replaced with real games/tools

---

## Quick start (local)

No build step is required.

1. Clone or download this repository.
2. Serve the folder with any static file server.

Examples:

```bash
# Python 3
cd the-token-moose
python -m http.server 8080

# Node (if you have npx)
npx serve .
```

Then open `http://localhost:8080` in your browser.

> Opening `index.html` directly via `file://` can break service workers and some relative paths. Always use a local server.

---

## Deploy to GitHub Pages

1. Create a GitHub repository (for example `the-token-moose`).
2. Push the contents of this project to the repository root (or to a `docs/` folder if you prefer that publishing source).
3. In the repository settings:
   - Go to **Pages**
   - Under **Source**, choose **Deploy from a branch**
   - Select the branch (`main` or `master`) and the folder (`/` root, or `/docs`)
4. Save. After a minute or two the site will be available at:

```text
https://<username>.github.io/<repo-name>/
```

All internal links and asset paths in this project are **relative**, so they work both at the domain root and under a project path like `/the-token-moose/`.

---

## Project structure

```text
the-token-moose/
├── index.html              # Home / library
├── games.html
├── tools.html
├── favorites.html
├── about.html
├── css/
│   ├── main.css
│   ├── components.css
│   └── responsive.css
├── js/
│   ├── projects.js         # ← add new games & tools here
│   ├── favorites.js
│   ├── install.js
│   ├── app.js
│   └── sw-register.js
├── assets/
│   ├── icons/              # PWA icons
│   ├── logo/
│   └── placeholders/       # screenshot placeholders
├── games/
│   └── placeholder-game/   # example game folder
├── tools/
│   └── placeholder-tool/   # example tool folder
├── manifest.webmanifest
├── sw.js                   # service worker
├── README.md
└── LICENSE
```

---

## Adding a new game

1. Create a folder under `games/`, e.g. `games/my-cool-game/`.
2. Put the game’s HTML/CSS/JS (and any assets) inside that folder. Make sure there is an `index.html` (or update the `playUrl` accordingly).
3. Add a screenshot (PNG, JPG, or SVG) under `assets/` (for example `assets/screenshots/my-cool-game.png`).
4. Open `js/projects.js` and add an entry:

```javascript
{
  id: "my-cool-game",           // stable unique id (used by favorites)
  title: "My Cool Game",
  type: "game",
  description: "Short description shown on the card.",
  category: "Arcade",           // or Education, Puzzle, Action, etc.
  screenshot: "assets/screenshots/my-cool-game.png",
  playUrl: "games/my-cool-game/",
  installable: true,            // show Install button
  featured: false               // show in featured/home emphasis if desired
}
```

5. Optionally add the new game’s main files to the `CACHE_URLS` array in `sw.js` so they are available offline after the first visit.
6. Commit and push. GitHub Pages will update automatically.

---

## Adding a new teacher tool

Same process as games, but:

- Place files under `tools/my-tool-name/`
- Set `type: "tool"`
- Use a tool-oriented category (`Classroom`, `Utility`, `Assessment`, …)
- Point `playUrl` to the tool folder

Example:

```javascript
{
  id: "name-picker",
  title: "Name Picker",
  type: "tool",
  description: "Random name picker for the classroom.",
  category: "Classroom",
  screenshot: "assets/screenshots/name-picker.png",
  playUrl: "tools/name-picker/",
  installable: true,
  featured: true
}
```

---

## How Favorites work

- Favorites are stored only in the browser’s `localStorage` under the key `token-moose-favorites`.
- They are a simple array of project IDs.
- No accounts, no sync across devices.
- Clearing site data or using another browser/device will clear or hide those favorites.

---

## How the PWA works

- `manifest.webmanifest` describes the app name, icons, theme colors, and start URL.
- `sw.js` caches core pages, styles, scripts, icons, and placeholder assets.
- On supported browsers (Chrome, Edge, etc.) an install prompt may appear, or the user can install via the browser menu.
- The **Install** buttons on cards use the `beforeinstallprompt` event when available. If the browser does not support install prompts, a short message explains that.
- After installation, the site can be launched as a standalone window and used offline for cached content.

When you add real games, list their critical files in `CACHE_URLS` inside `sw.js` (or implement a more dynamic caching strategy later).

---

## Screenshots & assets

- Put final screenshots in a folder such as `assets/screenshots/`.
- Placeholder images live in `assets/placeholders/`.
- PWA icons live in `assets/icons/`. SVG icons are used for simplicity; you can replace them with PNG if preferred.

---

## License

See [LICENSE](LICENSE).

This repository is intended to be open source. Individual games or third-party assets may carry their own licenses; keep those attributions clear when you add real content.

---

## Design notes

Visual direction: night-time city atmosphere — deep navy backgrounds, soft violet/pink/electric-blue accents, glass-like cards, subtle glows. Inspired by the feeling of a neon city at night, not by any specific copyrighted work.

---

Have fun. Break things. Make things. Keep learning.
