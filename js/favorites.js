/**
 * The Token Moose - Favorites (localStorage)
 * Favorites are stored by stable project ID and stay on this device/browser only.
 */

const FAVORITES_KEY = "token-moose-favorites";

function getFavorites() {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.warn("Could not read favorites:", e);
    return [];
  }
}

function saveFavorites(ids) {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
  } catch (e) {
    console.warn("Could not save favorites:", e);
  }
}

function isFavorite(id) {
  return getFavorites().includes(id);
}

function toggleFavorite(id) {
  const current = getFavorites();
  const index = current.indexOf(id);
  if (index === -1) {
    current.push(id);
  } else {
    current.splice(index, 1);
  }
  saveFavorites(current);
  return current.includes(id);
}

function addFavorite(id) {
  const current = getFavorites();
  if (!current.includes(id)) {
    current.push(id);
    saveFavorites(current);
  }
}

function removeFavorite(id) {
  const current = getFavorites().filter(fid => fid !== id);
  saveFavorites(current);
}

function getFavoriteProjects() {
  const ids = getFavorites();
  return ids
    .map(id => getProjectById(id))
    .filter(Boolean);
}
