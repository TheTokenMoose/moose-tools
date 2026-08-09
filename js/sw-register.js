/**
 * The Token Moose - Service Worker registration
 */

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // Use a path relative to the site root. For GitHub Pages project sites
    // this works when the SW is at the repository root.
    const swPath = "sw.js";
    navigator.serviceWorker
      .register(swPath)
      .then((registration) => {
        console.log("Service Worker registered:", registration.scope);
      })
      .catch((err) => {
        console.warn("Service Worker registration failed:", err);
      });
  });
}
