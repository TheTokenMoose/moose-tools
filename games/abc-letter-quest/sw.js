const CACHE = "abc-letter-quest-v1";
const ASSETS = [
  "./", "./index.html", "./css/game.css", "./js/app.js", "./js/letters.js",
  "./manifest.webmanifest", "./sw.js",
  "./icons/icon-192.png", "./icons/icon-512.png", "./icons/icon.svg",
  "./pwa-install.js", "./pwa-install.css",
  "../../js/app-chrome.js", "../../js/voice.js", "../../js/theme.js",
  "../../css/themes.css", "../../css/theme-app.css"
];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS).catch(() => {})).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("message", (e) => { if (e.data && e.data.type === "SKIP_WAITING") self.skipWaiting(); });
async function networkFirst(req) {
  const cache = await caches.open(CACHE);
  try {
    const fresh = await fetch(req);
    if (fresh && fresh.ok) cache.put(req, fresh.clone()).catch(() => {});
    return fresh;
  } catch (_) {
    const cached = await cache.match(req);
    if (cached) return cached;
    if (req.mode === "navigate") {
      const f = await cache.match("./index.html");
      if (f) return f;
    }
    return new Response("Offline", { status: 503 });
  }
}
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;
  e.respondWith(networkFirst(e.request));
});
