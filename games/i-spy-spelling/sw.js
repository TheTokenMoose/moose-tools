/**
 * Per-app service worker — network-first so updates appear without clearing storage.
 * Offline: falls back to cache.
 */
const CACHE="i-spy-spelling-v6";
const ASSETS=["./index.html","./css/game.css","./js/game.js","./js/scenes.js","./manifest.webmanifest","./pwa-install.js","./pwa-install.css","./sw.js","./icons/icon-192.png","./icons/icon-512.png","./assets/twemoji/alien.png","./assets/twemoji/ant.png","./assets/twemoji/apple.png","./assets/twemoji/ball.png","./assets/twemoji/bee.png","./assets/twemoji/boat.png","./assets/twemoji/book.png","./assets/twemoji/clock.png","./assets/twemoji/cloud.png","./assets/twemoji/comet.png","./assets/twemoji/crab.png","./assets/twemoji/fish.png","./assets/twemoji/frog.png","./assets/twemoji/glue.png","./assets/twemoji/map.png","./assets/twemoji/moon.png","./assets/twemoji/pen.png","./assets/twemoji/planet.png","./assets/twemoji/rocket.png","./assets/twemoji/rose.png","./assets/twemoji/shell.png","./assets/twemoji/star.png","./assets/twemoji/sun.png","./assets/twemoji/sunplain.png","./assets/twemoji/tractor.png","./assets/twemoji/tree.png","./assets/twemoji/tree2.png","./assets/twemoji/wave.png","./assets/twemoji/window.png","../../js/app-chrome.js","../../js/voice.js","../../js/tts/moose-tts.js","../../js/tts/voice-catalog.js","../../assets/tts/runtime/piper-tts-web.js","../../assets/tts/runtime/piper-o91UDS6e.js","../../assets/tts/runtime/voices_static-D_OtJDHM.js","../../assets/tts/runtime/ort.wasm.min.mjs"];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS).catch(() => {})).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("message", e => {
  if (e.data && e.data.type === "SKIP_WAITING") self.skipWaiting();
});

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

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.endsWith("sw.js")) {
    e.respondWith(fetch(e.request));
    return;
  }
  e.respondWith(networkFirst(e.request));
});
