# Moose Tools

**Public site name:** Moose Tools  
**Brand mark in the header:** The Token Moose (with profile image)  
**Creator name:** only on the About page (by design)

A static, open collection of **browser games**, **educational experiments**, and **small teacher tools** for kindergarten / early primary and ESL classrooms.

**Live site:** https://thetokenmoose.github.io/moose-tools/  
**Repository:** https://github.com/TheTokenMoose/moose-tools

Fully static · GitHub Pages · **no accounts · no backend · no database · no ads · no tracking**

---

## Features

- Responsive library of games and teacher tools (data-driven cards in `js/projects.js`)
- Search, type filters (All / Games / Tools / Favorites), optional **skill tags**
- Favorites stored in the browser via `localStorage`
- Home **planner rail**: teacher to-do + month calendar (China public holidays when online, school-break windows)
- **Themes:** Night City, Daylight, Preschool Playful, Forest Grove, Ocean Breeze + **Projector Mode**
- Theme ball on the shell (header) and on every app (bottom-left)
- Shared app chrome: **Back to Moose Tools**, optional Voice slot, Favorite
- Per-app **PWA** install (each game/tool has its own scope)
- **Network-first** service workers so deploys update without clearing site storage
- Optional classroom speech via system voices and/or bundled Piper UK English models (see `assets/tts/VOICES.md`)

---

## Quick start (local)

No build step.

```bash
# From the repository root (the folder that contains index.html)
python3 -m http.server 8080
# or: npx serve .
```

Open `http://localhost:8080`.

> Prefer a local server over `file://` (service workers and relative paths need `http(s)`).

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
├── index.html, games.html, tools.html, favorites.html, about.html, 404.html
├── css/
│   ├── themes.css          # Night / Day / Playful / Forest / Ocean + projector
│   ├── theme-app.css       # App form controls bridged to theme tokens
│   └── …                   # shell layout styles
├── js/
│   ├── projects.js         # ← register games & tools here
│   ├── app.js, favorites.js, install.js
│   ├── theme.js, app-chrome.js
│   ├── calendar.js, todo.js
│   ├── voice.js, tts/      # speech helpers
│   └── sw-register.js
├── assets/
│   ├── icons/              # favicons / brand
│   ├── screenshots/        # library card art
│   └── tts/                # optional Piper runtime + UK voices
├── games/<name>/           # index.html, css/, js/, sw.js, manifest, pwa-install*
├── tools/<name>/           # same pattern
├── favicon.ico
├── manifest.webmanifest
├── sw.js
├── README.md
└── LICENSE
```

---

## Adding a game or tool

1. Create `games/my-game/` or `tools/my-tool/` with at least `index.html`.
2. Add cover art under `assets/screenshots/` (games especially).
3. Register it in `js/projects.js`:

```javascript
{
  id: "my-game",
  title: "My Game",
  type: "game",              // or "tool"
  description: "Teacher-facing description of what it does and why.",
  subject: "Literacy",       // e.g. Math, Classroom, Science
  skills: ["phonics", "CVC"], // searchable tags
  category: "Education",
  screenshot: "assets/screenshots/my-game.png",
  playUrl: "games/my-game/",
  installable: true,
  featured: false
}
```

4. Include `manifest.webmanifest`, `sw.js`, and the shared `pwa-install.js` / `pwa-install.css` pattern used by existing apps (network-first SW recommended).
5. Load `../../js/app-chrome.js` so Back / Favorite / theme ball work consistently.
6. For speech: load `../../js/voice.js` (and TTS modules if needed), create with a stable app id, mount the picker on `#tm-voice-slot` or a toolbar slot — prefer **press to hear**, not auto-read.
7. Commit and push. GitHub Pages updates automatically.

---

## Local data (no accounts)

| Key | Purpose |
|-----|---------|
| `token-moose-favorites` | Favorite project IDs |
| `token-moose-todos` | Home to-do items |
| `token-moose-todo-hidden` | To-do panel visibility |
| `token-moose-calendar-hidden` | Calendar panel visibility |
| `token-moose-theme` | Active theme id |
| `token-moose-projector` | Projector Mode on/off |
| `token-moose-voice-choice:<appId>` | Per-app voice preference |
| `token-moose-ib-lang` | IB PYP Guide language (en/zh) |

Data stays on that browser/device only.

---

## Themes

| Id | Name | Feel |
|----|------|------|
| `night` | Night City | Soft neon · default |
| `day` | Daylight | Bright · airy · calm |
| `playful` | Preschool Playful | Warm · candy · energetic |
| `forest` | Forest Grove | Moss · canopy · calm green |
| `ocean` | Ocean Breeze | Deep sea · soft cyan · calm |

**Projector Mode** is a toggle (not a separate theme): larger type and higher contrast for classroom display.

---

## PWA & caching

- **Site shell:** root `sw.js` + `js/sw-register.js` (checks for updates, activates new workers).
- **Each game/tool:** its own `sw.js` scoped to that folder so “Install” is per app, not only the whole site.
- Strategy: **network-first** for HTML/JS/CSS when online; cache used offline.

Bump the shell cache name in `sw.js` (`token-moose-vN`) when shared shell assets change.

---

## License

See [LICENSE](LICENSE) (MIT for the project source unless a folder notes otherwise).

Third-party notes:

- China public holiday **live** data (when available) comes from the public [Nager.Date](https://date.nager.at/) API; offline fallback lists are bundled in `js/calendar.js`.
- Optional **Piper / ONNX** TTS assets under `assets/tts/` — see [assets/tts/VOICES.md](assets/tts/VOICES.md) for model and runtime licenses (generally MIT). Browser `speechSynthesis` voices remain under the user’s OS/browser terms.
- Some games may credit open emoji/art sources in-page. Keep attributions when you copy those folders.

---

## Design

Multi-theme shell (neon night default, plus daylight, playful, forest, and ocean). Individual games may keep their own art direction; the theme switcher drives the **shell and shared chrome**.

---

Have fun. Break things. Make things. Keep learning.

## Library index & discoverability

Tools and games live under:

- [`/tools`](tools/) — teacher productivity tools  
- [`/games`](games/) — educational games  

**Structured manifest (preferred for scripts/agents):** [`data/library.json`](data/library.json)  
**Human-readable list:** [`INDEX.md`](INDEX.md)  
**Source of truth in the app:** [`js/projects.js`](js/projects.js)

GitHub’s folder pages (`/tree/main/tools`) are filled in with JavaScript, so plain HTML crawlers will not see file lists. Use `library.json`, `INDEX.md`, or the [GitHub Contents API](https://docs.github.com/en/rest/repos/contents) instead of scraping directory HTML.

When adding a new game or tool: register it in `js/projects.js` **and** regenerate `data/library.json` / `INDEX.md` (or include both in the same patch zip).

### Service worker cache

Shell cache name is `token-moose-vN` in `sw.js`. Bump `N` when shared shell assets change so clients pick up updates without a manual storage clear.
