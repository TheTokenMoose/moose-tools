/**
 * The Token Moose - Project Data
 * Add new games and tools here. Keep IDs stable and unique.
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
  {
    id: "sentence-forge",
    title: "Sentence Forge",
    type: "game",
    description: "Build sentences from word tiles, then practice fluency with guided highlighting. Forge, Fluency, and Challenge modes across three levels.",
    category: "Education",
    screenshot: "assets/screenshots/sentence-forge.png",
    playUrl: "games/sentence-forge/",
    installable: true,
    featured: true
  },
  {
    id: "reading-rally",
    title: "Reading Rally",
    type: "game",
    description: "Hot-seat board game for 2–4 players. Race the trail, read words, rhyme, and hit IB PYP Learner Profile language moments.",
    category: "Education",
    screenshot: "assets/screenshots/reading-rally.png",
    playUrl: "games/reading-rally/",
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
  },
  {
    id: "classroom-timer",
    title: "Classroom Timer",
    type: "tool",
    description: "Goal-based visual timers: Focus, Pair work, Clean up, Transition, Write time — plus Bomb Time with a burning fuse.",
    category: "Classroom",
    screenshot: "assets/screenshots/classroom-timer.png",
    playUrl: "tools/classroom-timer/",
    installable: true,
    featured: true
  },
  {
    id: "ib-pyp-guide",
    title: "IB PYP Pocket Guide",
    type: "tool",
    description: "Quick teacher reference for transdisciplinary themes, ATLs, Learner Profile, key concepts, inquiry, agency, and action.",
    category: "Classroom",
    screenshot: "assets/screenshots/ib-pyp-guide.png",
    playUrl: "tools/ib-pyp-guide/",
    installable: true,
    featured: true
  },
  {
    id: "exit-ticket-maker",
    title: "Exit Ticket Maker",
    type: "tool",
    description: "Create exit tickets from templates, project a live classroom display, or print student copies (1–6 per page).",
    category: "Classroom",
    screenshot: "assets/screenshots/exit-ticket-maker.png",
    playUrl: "tools/exit-ticket-maker/",
    installable: true,
    featured: true
  },
  {
    id: "story-sequence",
    title: "Story Sequence Board",
    type: "game",
    description: "20 public-domain classics: sort story panels, then sentences. Build sequence skills with fables and folk tales.",
    category: "Education",
    screenshot: "assets/screenshots/story-sequence.png",
    playUrl: "games/story-sequence/",
    installable: true,
    featured: true
  },
  {
    id: "twenty-questions",
    title: "20 Questions Wizard",
    type: "game",
    description: "Think of an animal, food, object, or place — a fortune-telling wizard asks yes/no questions and tries to guess within twenty.",
    category: "Education",
    screenshot: "assets/screenshots/twenty-questions.png",
    playUrl: "games/twenty-questions/",
    installable: true,
    featured: true
  },
  {
    id: "i-spy-spelling",
    title: "I Spy Spelling",
    type: "game",
    description: "Pretty scene packs: spot the object from an I Spy clue, then spell the word with letter tiles. Garden, beach, classroom, and space.",
    category: "Education",
    screenshot: "assets/screenshots/i-spy-spelling.png",
    playUrl: "games/i-spy-spelling/",
    installable: true,
    featured: true
  }
];

// Helper accessors used by app.js
function getAllProjects() {
  return PROJECTS;
}

function getProjectById(id) {
  return PROJECTS.find((p) => p.id === id);
}

function getFeaturedProjects() {
  return PROJECTS.filter((p) => p.featured);
}
