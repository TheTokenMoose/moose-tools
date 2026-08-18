const CACHE = "writing-workshop-spark-v2";
const ASSETS=["./","./index.html","./css/app.css","./js/data.js","./js/app.js","./manifest.webmanifest","./pwa-install.js","./pwa-install.css","./icons/icon-192.png","./icons/icon-512.png","../../js/app-chrome.js"];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS).catch(() => {})).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});
async function networkFirst(req) {
  const cache = await caches.open(CACHE);
  try {
    const fresh = await fetch(req);
    if (fresh && fresh.ok) cache.put(req, fresh.clone()).catch(() => {});
    return fresh;
  } catch (_) {
    const c = await cache.match(req);
    if (c) return c;
    if (req.mode === "navigate") {
      const f = await cache.match("./index.html");
      if (f) return f;
    }
    return new Response("Offline", { status: 503 });
  }
}
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(networkFirst(e.request));
});
