/**
 * Per-app install helper (used by games & tools)
 */
(function () {
  let deferredPrompt = null;

  const bar = document.getElementById("pwa-install-bar");
  const btn = document.getElementById("pwa-install-btn");
  const dismiss = document.getElementById("pwa-install-dismiss");

  function isStandalone() {
    return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
  }

  function showBar() {
    if (!bar || isStandalone()) return;
    bar.hidden = false;
    requestAnimationFrame(() => bar.classList.add("show"));
  }

  function hideBar() {
    if (!bar) return;
    bar.classList.remove("show");
    setTimeout(() => { bar.hidden = true; }, 250);
  }

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    // Show if navigated with ?install=1 or always offer a subtle bar
    const wantsInstall = new URLSearchParams(location.search).has("install");
    if (wantsInstall || true) showBar();
  });

  window.addEventListener("appinstalled", () => {
    deferredPrompt = null;
    hideBar();
  });

  if (btn) {
    btn.addEventListener("click", async () => {
      if (!deferredPrompt) {
        // Fallback tip for browsers without prompt
        btn.textContent = "Use browser Install menu";
        return;
      }
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      deferredPrompt = null;
      if (outcome === "accepted") hideBar();
      else btn.textContent = "Install";
    });
  }
  if (dismiss) dismiss.addEventListener("click", hideBar);

  // Register this app's service worker (scoped to this folder)
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch((err) => {
        console.warn("SW registration failed", err);
      });
    });
  }

  // If already standalone, never show bar
  if (isStandalone() && bar) bar.hidden = true;
})();
