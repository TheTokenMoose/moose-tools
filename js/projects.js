/**
 * The Token Moose - Project Data
 * Add new games and tools here. Keep IDs stable and unique.
 *
 * Games currently listed (ports pending):
 *   - Alphabet Hunt
 *   - One Button Hero
 *   - Phonics Pairing Quest
 *   - IB Little Explorers
 *
 * Screenshots and playUrl paths will be updated as each game is ported to web/PWA.
 */

const PROJECTS = [
  // ── Games ──────────────────────────────────────────────────────────────
  {
    id: "alphabet-hunt",
    title: "Alphabet Hunt",
    type: "game",
    description: "Find letters, learn words, and watch out for bookworms! Adventure, Quick Play, and Challenge modes. Touch-friendly for the classroom.",
    category: "Education",
    screenshot: "assets/screenshots/alphabet-hunt.png",
    playUrl: "games/alphabet-hunt/",
    installable: true,
    featured: true
  },
  {
    id: "one-button-hero",
    title: "One Button Hero",
    type: "game",
    description: "The Duckening! Auto-run platformer — tap to jump, hold for super jump. 10 levels, stomps, combos, power-ups, and S-ranks.",
    category: "Action",
    screenshot: "assets/screenshots/one-button-hero.png",
    playUrl: "games/one-button-hero/",
    installable: true,
    featured: true
  },
  {
    id: "phonics-pairing-quest",
    title: "Phonics Pairing Quest",
    type: "game",
    description: "Match phonics sounds to pictures! Easy through Super Phonics levels, streaks, timed challenges, and hear-the-sound support.",
    category: "Education",
    screenshot: "assets/screenshots/phonics-pairing-quest.png",
    playUrl: "games/phonics-pairing-quest/",
    installable: true,
    featured: true
  },
  {
    id: "ib-little-explorers",
    title: "IB Little Explorers",
    type: "game",
    description: "Match classroom situations to IB Learner Profile traits. Explore, Quest, and timed Challenge modes for kindergarten ESL.",
    category: "Education",
    screenshot: "assets/screenshots/ib-little-explorers.png",
    playUrl: "games/ib-little-explorers/",
    installable: true,
    featured: true
  },

  // ── Tools ──────────────────────────────────────────────────────────────
  {
    id: "china-expat-salary-planner",
    title: "China Expat Salary Planner",
    type: "tool",
    description: "Estimate take-home pay in China: cumulative tax, contract timeline, bonuses, benefits, and social insurance. Quick or full planner modes.",
    category: "Finance",
    screenshot: "assets/screenshots/china-expat-salary-planner.png",
    playUrl: "tools/china-expat-salary-planner/",
    installable: true,
    featured: true
  },
  {
    id: "name-spin-wheel",
    title: "Name Spin Wheel",
    type: "tool",
    description: "Circus-themed classroom name picker. Paste comma-separated names, spin the wheel — standard or spin-and-remove so everyone gets a turn.",
    category: "Classroom",
    screenshot: "assets/screenshots/name-spin-wheel.png",
    playUrl: "tools/name-spin-wheel/",
    installable: true,
    featured: true
  },
  {
    id: "partner-picker",
    title: "Partner Picker",
    type: "tool",
    description: "Split a class into fruit-coloured tables (2–20). Auto-assign, then drag students between groups. Save layouts per class name.",
    category: "Classroom",
    screenshot: "assets/screenshots/partner-picker.png",
    playUrl: "tools/partner-picker/",
    installable: true,
    featured: true
      featured: true
  },
  {
    id: "the-quiet-game",
    title: "The Quiet Game",
    type: "tool",
    description: "Stay quiet or the gorilla steals the banana! Mic noise meter, sensitivity control, and teacher-set timers.",
    category: "Classroom",
    screenshot: "assets/screenshots/the-quiet-game.png",
    playUrl: "tools/the-quiet-game/",
    installable: true,
    featured: true
  }
];