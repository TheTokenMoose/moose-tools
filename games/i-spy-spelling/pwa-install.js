/**
 * Per-app install helper (used by games & tools)
 * Shows install bar when available; auto-hides after a short timer.
 */
(function () {
  let deferredPrompt = null;
  let autoHideTimer = null;
  const AUTO_HIDE_MS = 8000;

  const bar = document.getElementById("pwa-install-bar");
  const btn = document.getElementById("pwa-install-btn");
  const dismiss = document.getElementById("pwa-install-dismiss");

  function isStandalone() {
    return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
  }

  function clearAutoHide() {
    if (autoHideTimer) {
      clearTimeout(autoHideTimer);
      autoHideTimer = null;
    }
  }

  function showBar() {
    if (!bar || isStandalone()) return;
    bar.hidden = false;
    requestAnimationFrame(() => bar.classList.add("show"));
    clearAutoHide();
    autoHideTimer = setTimeout(() => {
      hideBar();
    }, AUTO_HIDE_MS);
  }

  function hideBar() {
    clearAutoHide();
    if (!bar) return;
    bar.classList.remove("show");
    setTimeout(() => {
      bar.hidden = true;
    }, 250);
  }

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showBar();
  });

  window.addEventListener("appinstalled", () => {
    deferredPrompt = null;
    hideBar();
  });

  if (btn) {
    btn.addEventListener("click", async () => {
      clearAutoHide();
      if (!deferredPrompt) {
        btn.textContent = "Use browser Install menu";
        return;
      }
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      deferredPrompt = null;
      if (outcome === "accepted") hideBar();
      else {
        btn.textContent = "Install";
        // Give another brief chance, then hide
        autoHideTimer = setTimeout(hideBar, 4000);
      }
    });
  }
  if (dismiss) dismiss.addEventListener("click", hideBar);

  // Pause auto-hide while hovering the bar (desktop)
  if (bar) {
    bar.addEventListener("mouseenter", clearAutoHide);
    bar.addEventListener("mouseleave", () => {
      if (!bar.hidden) {
        clearAutoHide();
        autoHideTimer = setTimeout(hideBar, 3000);
      }
    });
  }

    // Service workers require http(s) — skip on file:// standalone opens
  if ("serviceWorker" in navigator && (location.protocol === "http:" || location.protocol === "https:")) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch((err) => {
        console.warn("SW register failed", err);
      });
    });
  }

  if (isStandalone() && bar) bar.hidden = true;
})();
