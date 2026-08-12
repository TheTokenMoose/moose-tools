/**
 * The Token Moose - Service Worker registration + auto-update
 *
 * - Checks for a new SW on every page load
 * - Activates the new worker immediately
 * - Reloads once when the new worker takes control
 */

(function () {
  if (!("serviceWorker" in navigator)) return;

  const RELOAD_FLAG = "tm-sw-reloading";

  function register() {
    const swPath = "sw.js";

    navigator.serviceWorker
      .register(swPath)
      .then((registration) => {
        console.log("Service Worker registered:", registration.scope);

        registration.update().catch(() => {});

        document.addEventListener("visibilitychange", () => {
          if (document.visibilityState === "visible") {
            registration.update().catch(() => {});
          }
        });

        setInterval(() => {
          registration.update().catch(() => {});
        }, 5 * 60 * 1000);

        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (!newWorker) return;

          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              newWorker.postMessage({ type: "SKIP_WAITING" });
            }
          });
        });
      })
      .catch((err) => {
        console.warn("Service Worker registration failed:", err);
      });

    let refreshing = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (refreshing) return;
      if (sessionStorage.getItem(RELOAD_FLAG)) {
        sessionStorage.removeItem(RELOAD_FLAG);
        return;
      }
      refreshing = true;
      sessionStorage.setItem(RELOAD_FLAG, "1");
      window.location.reload();
    });
  }

  if (document.readyState === "complete") {
    register();
  } else {
    window.addEventListener("load", register);
  }
})();
