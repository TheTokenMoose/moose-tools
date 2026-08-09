/**
 * The Token Moose - PWA Install handling
 */

let deferredPrompt = null;
let installAvailable = false;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installAvailable = true;
  document.dispatchEvent(new CustomEvent("pwa-install-available"));
});

window.addEventListener("appinstalled", () => {
  deferredPrompt = null;
  installAvailable = false;
  document.dispatchEvent(new CustomEvent("pwa-installed"));
});

function canInstallPWA() {
  return installAvailable && deferredPrompt !== null;
}

async function promptInstall() {
  if (!deferredPrompt) {
    return { outcome: "unavailable" };
  }
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  deferredPrompt = null;
  installAvailable = false;
  return { outcome };
}

function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );
}

/**
 * Update install buttons across the page based on current support.
 * Buttons should have data-install-btn attribute.
 */
function updateInstallButtons() {
  const buttons = document.querySelectorAll("[data-install-btn]");
  const standalone = isStandalone();

  buttons.forEach((btn) => {
    if (standalone) {
      btn.disabled = true;
      btn.textContent = "Installed";
      btn.setAttribute("aria-label", "App is already installed");
      btn.classList.add("is-installed");
    } else if (canInstallPWA()) {
      btn.disabled = false;
      btn.textContent = "Install";
      btn.setAttribute("aria-label", "Install as app");
      btn.classList.remove("is-installed");
    } else {
      // Browser may not support install, or prompt not yet available
      btn.disabled = false;
      btn.textContent = "Install";
      btn.setAttribute("aria-label", "Install as app (if supported by your browser)");
      btn.classList.remove("is-installed");
    }
  });
}

// Listen for availability changes
document.addEventListener("pwa-install-available", updateInstallButtons);
document.addEventListener("pwa-installed", updateInstallButtons);

// Initial update after load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", updateInstallButtons);
} else {
  updateInstallButtons();
}
