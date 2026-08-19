const CACHE = "little-science-lab-v1";
const ASSETS = [
  "./", "./index.html", "./css/game.css", "./js/app.js",
  "./manifest.webmanifest", "./pwa-install.js", "./pwa-install.css",
  "./icons/icon-192.png", "./icons/icon-512.png",
  "../../js/app-chrome.js", "../../js/voice.js"
];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS).catch(() => {})).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("message", (e) => { if (e.data && e.data.type === "SKIP_WAITING") self.skipWaiting(); });
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    try {
      const fresh = await fetch(e.request);
      if (fresh && fresh.ok) cache.put(e.request, fresh.clone()).catch(() => {});
      return fresh;
    } catch (_) {
      return (await cache.match(e.request)) || (await cache.match("./index.html")) || new Response("Offline", { status: 503 });
    }
  })());
});
