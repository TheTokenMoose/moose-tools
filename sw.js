/**
 * The Token Moose - Service Worker
 *
 * Strategy (so deploys show up without clearing site data):
 * - HTML / CSS / JS / manifests → network-first (fresh when online)
 * - Images & other static assets → stale-while-revalidate
 * - Offline → fall back to cache
 *
 * Bump CACHE_NAME when you change this file or want a hard cache wipe.
 */

// Voice .onnx models: same-origin assets; copied to OPFS on first use — not SW precache.
const CACHE_NAME = "token-moose-v69";

const PRECACHE_URLS = [
  "./",
  "./index.html",
  "./games.html",
  "./tools.html",
  "./favorites.html",
  "./about.html",
  "./voice-settings.html",
  "./404.html",
  "./error.html",
  "./css/theme-app.css",
  "./assets/images/moose-404.jpg",
  "./manifest.webmanifest",
  "./css/main.css",
  "./css/components.css",
  "./css/responsive.css",
  "./css/themes.css",
  "./css/tts-settings.css",
  "./js/projects.js",
  "./js/favorites.js",
  "./js/install.js",
  "./js/app.js",
  "./js/app-chrome.js",
  "./js/sw-register.js",
  "./js/theme.js",
  "./js/calendar.js",
  "./js/todo.js",
  "./js/voice.js",
  "./js/tts/moose-tts.js",
  "./js/tts/voice-catalog.js",
  "./js/tts/tts-settings.js",
  "./assets/tts/runtime/piper-tts-web.js",
  "./assets/tts/runtime/piper-o91UDS6e.js",
  "./assets/tts/runtime/voices_static-D_OtJDHM.js",
  "./assets/tts/runtime/ort.wasm.min.mjs",
  "./assets/icons/favicon-192.png",
  "./assets/icons/favicon-512.png",
  "./assets/icons/favicon.ico",
];

function isSameOrigin(url) {
  return url.origin === self.location.origin;
}

function isAppShell(url) {
  const p = url.pathname;
  return (
    p.endsWith(".html") ||
    p.endsWith(".js") ||
    p.endsWith(".css") ||
    p.endsWith(".webmanifest") ||
    p.endsWith("/") ||
    p.endsWith("/moose-tools") ||
    p.endsWith("/moose-tools/")
  );
}

function isTtsRuntime(url) {
  return url.pathname.includes("/assets/tts/runtime/");
}

function isImage(url) {
  return /\.(png|jpg|jpeg|gif|webp|svg|ico|woff2?)$/i.test(url.pathname);
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) =>
        cache.addAll(PRECACHE_URLS).catch((err) => {
          console.warn("[SW] precache partial failure:", err);
        })
      )
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const fresh = await fetch(request);
    if (fresh && fresh.ok) {
      cache.put(request, fresh.clone()).catch(() => {});
    }
    return fresh;
  } catch (err) {
    const cached = await cache.match(request);
    if (cached) return cached;
    if (request.mode === "navigate") {
      const fallback = await cache.match("./index.html");
      if (fallback) return fallback;
    }
    return new Response("Offline", { status: 503, statusText: "Service Unavailable" });
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  const networkPromise = fetch(request)
    .then((response) => {
      if (response && response.ok) {
        cache.put(request, response.clone()).catch(() => {});
      }
      return response;
    })
    .catch(() => null);

  if (cached) {
    networkPromise.catch(() => {});
    return cached;
  }
  const fresh = await networkPromise;
  if (fresh) return fresh;
  return new Response("Offline", { status: 503, statusText: "Service Unavailable" });
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  let url;
  try {
    url = new URL(request.url);
  } catch (_) {
    return;
  }

  if (!isSameOrigin(url)) return;

  if (url.pathname.endsWith("/sw.js") || url.pathname.endsWith("sw.js")) {
    event.respondWith(fetch(request));
    return;
  }

  if (isAppShell(url) || request.mode === "navigate") {
    event.respondWith(networkFirst(request));
    return;
  }

  if (isTtsRuntime(url) || isImage(url)) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  event.respondWith(networkFirst(request));
});
