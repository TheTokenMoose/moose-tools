# The Token Moose (`moose-tools`)

A static website for an open collection of **browser games**, **educational games**, and **small teacher tools**.

**Public identity:** The Token Moose  
**Creator name:** only on the About page (by design)

**Live site:** https://thetokenmoose.github.io/moose-tools/  
**Repository:** https://github.com/TheTokenMoose/moose-tools

Fully static · suitable for **GitHub Pages** · no accounts · no backend · no database.

---

## Features

- Responsive library of games and teacher tools (`js/projects.js` data-driven cards)
- Search and type filters (games / tools / favorites)
- Favorites stored in the browser via `localStorage`
- Home **planner rail**: teacher to-do list + month calendar (China public holidays when online, school-break windows, global teaching dates)
- Per-app **PWA** install (each game/tool can install with its own scope)
- **Network-first** service worker so deploys update without clearing site storage
- Offline fallback for previously visited shell and app assets

---

## Quick start (local)

No build step.

```bash
# From the repository root (the folder that contains index.html)
python3 -m http.server 8080
# or: npx serve .
```

Open `http://localhost:8080`.

> Prefer a local server over `file://` (service workers and some paths need `http(s)`).

---

## Deploy to GitHub Pages

1. Push the **site root** (the folder containing `index.html`) to the `main` branch of `TheTokenMoose/moose-tools`.
2. Settings → **Pages** → Deploy from branch → `main` → `/ (root)`.
3. Site: `https://thetokenmoose.github.io/moose-tools/`

Paths are **relative**, so project Pages under `/moose-tools/` work correctly.

After pushing, visit the site once so the new service worker can activate. Updates should then load on later visits without manually clearing storage.

---

## Project structure (summary)

```text
.
├── index.html, games.html, tools.html, favorites.html, about.html
├── css/                    # site shell styles
├── js/
│   ├── projects.js         # ← register games & tools here
│   ├── app.js, favorites.js, install.js
│   ├── calendar.js, todo.js
│   └── sw-register.js
├── assets/icons/           # favicons / PWA icons
├── assets/screenshots/     # card images
├── games/<name>/           # each game: index.html, css/, js/, sw.js, manifest
├── tools/<name>/           # each tool: same pattern
├── manifest.webmanifest
├── sw.js
├── README.md
└── LICENSE
```

---

## Adding a game or tool

1. Create `games/my-game/` or `tools/my-tool/` with at least `index.html`.
2. Add a screenshot under `assets/screenshots/`.
3. Register it in `js/projects.js`:

```javascript
{
  id: "my-game",
  title: "My Game",
  type: "game",              // or "tool"
  description: "Short card text.",
  category: "Education",
  screenshot: "assets/screenshots/my-game.png",
  playUrl: "games/my-game/",
  installable: true,
  featured: true
}
```

4. For installable PWAs, include `manifest.webmanifest`, `sw.js`, and the shared `pwa-install.js` pattern used by existing apps (network-first SW recommended).
5. Commit and push. GitHub Pages updates automatically.

---

## Local data (no accounts)

| Key | Purpose |
|-----|---------|
| `token-moose-favorites` | Favorite project IDs |
| `token-moose-todos` | Home to-do items |
| `token-moose-todo-hidden` | To-do panel visibility |
| `token-moose-calendar-hidden` | Calendar panel visibility |

Data stays on that browser/device only.

---

## PWA & caching

- **Site shell:** root `sw.js` + `js/sw-register.js` (checks for updates, activates new workers, one reload).
- **Each game/tool:** its own `sw.js` scoped to that folder so “Install” is per app, not only the whole site.
- Strategy: **network-first** for HTML/JS/CSS when online; cache used offline.

---

## License

See [LICENSE](LICENSE) (MIT for the project source unless a folder notes otherwise).

Third-party notes:

- China public holiday **live** data (when available) comes from the public [Nager.Date](https://date.nager.at/) API; offline fallback lists are bundled in `js/calendar.js`.
- Some games may credit open emoji/art sources in-page (e.g. Twemoji). Keep attributions when you copy those folders.

---

## Design

Neon night aesthetic — deep navy, violet/pink/electric accents, glass cards. Original project direction, not tied to any single commercial brand.

---

Have fun. Break things. Make things. Keep learning.
