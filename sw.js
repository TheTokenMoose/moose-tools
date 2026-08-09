/**
 * The Token Moose - Service Worker
 * Caches core site assets for offline use.
 * Expand CACHE_URLS when new games/tools are added.
 */

const CACHE_NAME = "token-moose-v8";





const CACHE_URLS = [
  "./",
  "./index.html",
  "./games.html",
  "./tools.html",
  "./favorites.html",
  "./about.html",
  "./css/main.css",
  "./css/components.css",
  "./css/responsive.css",
  "./js/projects.js",
  "./js/favorites.js",
  "./js/install.js",
  "./js/app.js",
  "./js/sw-register.js",
  "./manifest.webmanifest",
  "./assets/icons/icon-192.svg",
  "./assets/icons/icon-512.svg",
  "./assets/icons/logo-avatar.png",
  "./assets/icons/favicon.ico",
  "./assets/icons/favicon-16.png",
  "./assets/icons/favicon-32.png",
  "./assets/icons/favicon-180.png",
  "./assets/icons/favicon-192.png",
  "./assets/icons/favicon-512.png",

  "./assets/placeholders/game-placeholder.svg",
  "./assets/placeholders/tool-placeholder.svg",
  "./assets/screenshots/alphabet-hunt.png",
  "./assets/screenshots/one-button-hero.png",
  "./assets/screenshots/phonics-pairing-quest.png",
  "./assets/screenshots/ib-little-explorers.png",
  "./assets/screenshots/china-expat-salary-planner.png",
  "./games/placeholder-game/",
  "./games/placeholder-game/index.html",
  "./games/alphabet-hunt/",
  "./games/alphabet-hunt/index.html",
  "./games/alphabet-hunt/css/game.css",
  "./games/alphabet-hunt/js/game.js",
  "./games/one-button-hero/",
  "./games/one-button-hero/index.html",
  "./games/one-button-hero/css/game.css",
  "./games/one-button-hero/js/game.js",
  "./games/phonics-pairing-quest/",
  "./games/phonics-pairing-quest/index.html",
  "./games/phonics-pairing-quest/css/game.css",
  "./games/phonics-pairing-quest/js/game.js",
  "./games/ib-little-explorers/",
  "./games/ib-little-explorers/index.html",
  "./games/ib-little-explorers/css/game.css",
  "./games/ib-little-explorers/js/game.js",
  "./tools/placeholder-tool/",
  "./tools/placeholder-tool/index.html",
  "./tools/china-expat-salary-planner/",
  "./tools/china-expat-salary-planner/index.html",
  "./tools/china-expat-salary-planner/style.css",
  "./tools/china-expat-salary-planner/app.js"
];




self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CACHE_URLS).catch((err) => {
        console.warn("Some assets failed to cache during install:", err);
      });
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;

      return fetch(request)
        .then((response) => {
          // Cache successful same-origin responses for future offline use
          if (
            response &&
            response.status === 200 &&
            response.type === "basic"
          ) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, clone);
            });
          }
          return response;
        })
        .catch(() => {
          // Offline fallback for navigation requests
          if (request.mode === "navigate") {
            return caches.match("./index.html");
          }
          return new Response("Offline", {
            status: 503,
            statusText: "Service Unavailable"
          });
        });
    })
  );
});
