/**
 * The Token Moose - Project Data
 * Add new games and tools here. Keep IDs stable and unique.
 *
 * CONVENTION FOR GAMES (apply to all future games):
 * - description  → teacher-facing: what it is, how it runs in class, who it's for
 * - subject      → curriculum subject (e.g. Math, Literacy, Phonics, Inquiry)
 * - skills       → array of learning-skill tags teachers can scan quickly
 * - category     → broad library category (Education, Action, Classroom, …)
 */

const PROJECTS = [
  {
    id: "candy-math",
    title: "Candy Math Trail",
    type: "game",
    description:
      "Independent or station maths practice in a Candyland setting. Ten difficulty steps move from simple addition through subtraction and into multiplication. Teachers can use Sprint for quick fluency or Sugar Rush timed rounds; high scores stay on this device for classroom competition.",
    subject: "Math",
    skills: ["Addition", "Subtraction", "Multiplication", "Fluency", "Timed practice"],
    category: "Education",
    screenshot: "assets/screenshots/candy-math.jpg",
    playUrl: "games/candy-math/",
    installable: true,
    featured: true
  },
  {
    id: "enchanted-library",
    title: "The Enchanted Library",
    type: "game",
    description:
      "Guided reading / independent reading choice board. Students open a magical book, pick a reading level (Picture / Story / Chapter Path), choose a world, and progress by tapping story choices. Supports branching comprehension, motivation to keep reading, and optional Hear-the-page read-aloud for accessibility or ESL support.",
    subject: "Literacy",
    skills: ["Reading comprehension", "Choice & consequence", "Vocabulary in context", "Listening (TTS)", "Differentiated levels"],
    category: "Education",
    screenshot: "assets/screenshots/enchanted-library.jpg",
    playUrl: "games/enchanted-library/",
    installable: true,
    featured: true
  },
  {
    id: "build-a-snowman",
    title: "Build a Snowman",
    type: "game",
    description:
      "Spelling and word-recognition practice without hangman imagery. Auto mode draws from a large classroom word list; hot-seat mode lets a classmate set a secret word. Each wrong guess builds a friendly snowman. Suits literacy rotations, morning work, or partner challenge.",
    subject: "Literacy",
    skills: ["Spelling", "Word recognition", "Letter patterns", "Partner / hot-seat", "Vocabulary"],
    category: "Education",
    screenshot: "assets/screenshots/build-a-snowman.jpg",
    playUrl: "games/build-a-snowman/",
    installable: true,
    featured: true
  },
  {
    id: "comet-clash",
    title: "Comet Clash",
    type: "game",
    description:
      "Whole-class projector review game. Choose a grade band (Kindergarten, Grades 1–2, or 3–4), form teams, and run curriculum-style question packs with timers, streaks, and flashy feedback. Designed for carpet/circle time or end-of-unit recap when you want high energy and clear turn structure.",
    subject: "Mixed review",
    skills: ["Whole-class review", "Oral response", "Team collaboration", "Listening", "Grade-banded content"],
    category: "Education",
    screenshot: "assets/screenshots/comet-clash.jpg",
    playUrl: "games/comet-clash/",
    installable: true,
    featured: true
  },
  {
    id: "alphabet-hunt",
    title: "Alphabet Hunt",
    type: "game",
    description:
      "Early-years letter identification and letter–sound awareness. Students hunt for target letters on screen in Adventure, Quick Play, or Challenge modes. Touch-friendly for kindergarten carpet stations, phonics warm-ups, or independent tablet time.",
    subject: "Phonics / Literacy",
    skills: ["Letter recognition", "Alphabet knowledge", "Visual scanning", "Early phonics", "Fine motor / touch"],
    category: "Education",
    screenshot: "assets/screenshots/alphabet-hunt.jpg",
    playUrl: "games/alphabet-hunt/",
    installable: true,
    featured: true
  },
  {
    id: "one-button-hero",
    title: "One Button Hero",
    type: "game",
    description:
      "Simple one-input platformer for brain breaks, reward time, or computing familiarity. Tap to jump, hold for a stronger jump, clear short levels, and chase better ranks. Low language load so it works well as a quick engagement tool between lessons.",
    subject: "Physical / Computing play",
    skills: ["Timing", "Cause & effect", "Hand–eye coordination", "Persistence", "One-button accessibility"],
    category: "Action",
    screenshot: "assets/screenshots/one-button-hero.jpg",
    playUrl: "games/one-button-hero/",
    installable: true,
    featured: false
  },
  {
    id: "phonics-pairing-quest",
    title: "Phonics Pairing Quest",
    type: "game",
    description:
      "Explicit phonics matching: link sounds to pictures across Easy → Super Phonics levels. Includes hear-the-sound support, streaks, and timed options. Fits small-group phonics, intervention, or ESL letter–sound practice.",
    subject: "Phonics",
    skills: ["Letter–sound correspondence", "Phonemic awareness", "Listening", "Visual discrimination", "Stamina / timed practice"],
    category: "Education",
    screenshot: "assets/screenshots/phonics-pairing-quest.jpg",
    playUrl: "games/phonics-pairing-quest/",
    installable: true,
    featured: true
  },
  {
    id: "ib-little-explorers",
    title: "IB Little Explorers",
    type: "game",
    description:
      "IB PYP Learner Profile practice for young learners and ESL kindergarten. Students match everyday classroom situations to profile traits (Caring, Thinker, Risk-taker, and more). Use Explore for discussion, Quest for structured rounds, or Challenge for a timed check.",
    subject: "IB PYP / SEL",
    skills: ["Learner Profile", "Social awareness", "Vocabulary (traits)", "Decision making", "ESL oral language"],
    category: "Education",
    screenshot: "assets/screenshots/ib-little-explorers.jpg",
    playUrl: "games/ib-little-explorers/",
    installable: true,
    featured: true
  },
  {
    id: "sentence-forge",
    title: "Sentence Forge",
    type: "game",
    description:
      "Sentence construction and reading fluency. Students arrange word tiles into complete sentences (Forge), then reread with guided highlighting (Fluency). Challenge mode raises the demand. Useful for writing warm-ups, grammar in context, and ESL sentence frames.",
    subject: "Literacy / Writing",
    skills: ["Sentence structure", "Word order", "Reading fluency", "Grammar in context", "ESL frames"],
    category: "Education",
    screenshot: "assets/screenshots/sentence-forge.jpg",
    playUrl: "games/sentence-forge/",
    installable: true,
    featured: true
  },
  {
    id: "reading-rally",
    title: "Reading Rally",
    type: "game",
    description:
      "Hot-seat literacy board game for 2–4 players. Learners move along a trail, read words, rhyme, and hit IB PYP language moments. Designed for small-group table work or guided reading follow-up when you want turn-taking and talk.",
    subject: "Literacy",
    skills: ["Oral reading", "Rhyming", "Turn-taking", "IB language", "Small-group collaboration"],
    category: "Education",
    screenshot: "assets/screenshots/reading-rally.jpg",
    playUrl: "games/reading-rally/",
    installable: true,
    featured: true
  },
  {
    id: "story-sequence",
    title: "Story Sequence Board",
    type: "game",
    description:
      "Narrative sequencing with twenty public-domain short classics. Students first sort illustrated story panels into order, then sort key sentences. Builds beginning–middle–end awareness and retell skills; works in literacy centres or as a whole-class model on the board.",
    subject: "Literacy",
    skills: ["Story sequencing", "Retelling", "Reading order", "Listening to stories", "Logical order"],
    category: "Education",
    screenshot: "assets/screenshots/story-sequence.jpg",
    playUrl: "games/story-sequence/",
    installable: true,
    featured: true
  },
  {
    id: "twenty-questions",
    title: "20 Questions Wizard",
    type: "game",
    description:
      "Deductive yes/no questioning game. A student (or the class) thinks of something; the wizard asks up to twenty questions to guess it. Strengthens categorising, careful listening, and strategic questioning—strong fit for inquiry warm-ups or language groups.",
    subject: "Inquiry / Oral language",
    skills: ["Questioning", "Deduction", "Categories", "Yes/no language", "Listening"],
    category: "Education",
    screenshot: "assets/screenshots/twenty-questions.jpg",
    playUrl: "games/twenty-questions/",
    installable: true,
    featured: true
  },
  {
    id: "i-spy-spelling",
    title: "I Spy Spelling",
    type: "game",
    description:
      "Visual search plus encoding. Students find the object that matches an I Spy clue in scene packs (garden, beach, classroom, space), then spell the word with letter tiles. Combines attention, vocabulary, and spelling for centres or early-finisher work.",
    subject: "Literacy / Spelling",
    skills: ["Spelling", "Visual discrimination", "Vocabulary", "Encoding", "Attention"],
    category: "Education",
    screenshot: "assets/screenshots/i-spy-spelling.jpg",
    playUrl: "games/i-spy-spelling/",
    installable: true,
    featured: true
  },

  // ── Tools ──────────────────────────────────────────────────────────────
  {
    id: "writing-workshop-spark",
    title: "Writing Workshop Spark",
    type: "tool",
    description:
      "TCRWP-style writing workshop companion for elementary classrooms. Three boards: Fantasy narrative (Who / What / Where story sparks), How-to procedural writing (topics + sequence step frames), and Opinion/Persuasive (claim, audience, reasons, evidence stems). Use during mini-lessons, independent writing, or share. Soft pastel visuals with emoji reading cues. Not affiliated with Teachers College.",
    category: "Classroom",
    screenshot: "assets/screenshots/writing-workshop-spark.jpg",
    playUrl: "tools/writing-workshop-spark/",
    installable: true,
    featured: true
  },
  {
    id: "china-expat-salary-planner",
    title: "China Expat Salary Planner",
    type: "tool",
    description: "Estimate take-home pay and costs for teaching in China. Local-only calculations for planning conversations.",
    category: "Planning",
    screenshot: "assets/screenshots/china-expat-salary-planner.jpg",
    playUrl: "tools/china-expat-salary-planner/",
    installable: true,
    featured: false
  },
  {
    id: "name-spin-wheel",
    title: "Name Spin Wheel",
    type: "tool",
    description: "Paste a class list and spin to pick a student. Standard spin or spin-and-remove so everyone gets a turn.",
    category: "Classroom",
    screenshot: "assets/screenshots/name-spin-wheel.jpg",
    playUrl: "tools/name-spin-wheel/",
    installable: true,
    featured: true
  },
  {
    id: "partner-picker",
    title: "Partner Picker",
    type: "tool",
    description: "Split a class list into fruit-coloured groups, then drag-and-drop to fine-tune partnerships or table groups.",
    category: "Classroom",
    screenshot: "assets/screenshots/partner-picker.jpg",
    playUrl: "tools/partner-picker/",
    installable: true,
    featured: true
  },
  {
    id: "the-quiet-game",
    title: "The Quiet Game",
    type: "tool",
    description: "Noise-meter calm-down game: stay quiet or the gorilla steals the banana. Mic sensitivity and teacher-set timers.",
    category: "Classroom",
    screenshot: "assets/screenshots/the-quiet-game.jpg",
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
    screenshot: "assets/screenshots/classroom-timer.jpg",
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
    screenshot: "assets/screenshots/ib-pyp-guide.jpg",
    playUrl: "tools/ib-pyp-guide/",
    installable: true,
    featured: true
  },
  {
    id: "simple-machines",
    title: "Simple Machines Lab",
    type: "game",
    description: "IB-friendly physics sandbox for the six simple machines. Students drag, adjust, and test levers, wheels, pulleys, ramps, wedges, and screws on touch screens.",
    category: "Science",
    subject: "Science",
    skills: ["simple machines", "forces", "inquiry", "design thinking", "IB PYP"],
    screenshot: "assets/screenshots/simple-machines.jpg",
    playUrl: "games/simple-machines/",
    installable: true,
    featured: true
  },
  {
    id: "story-workshop",
    title: "Story Workshop",
    type: "tool",
    description: "Build class choose-your-own-adventure paths that appear inside The Enchanted Library. Block-by-block pages, choices, local save, JSON backup.",
    category: "Literacy",
    subject: "Literacy",
    skills: ["story writing", "branching narrative", "author craft"],
    screenshot: "assets/screenshots/story-workshop.jpg",
    playUrl: "tools/story-workshop/",
    installable: true,
    featured: true
  },
  {
    id: "exit-ticket-maker",
    title: "Exit Ticket Maker",
    type: "tool",
    description: "Create exit tickets from templates, project a live classroom display, or print student copies (1–6 per page).",
    category: "Classroom",
    screenshot: "assets/screenshots/exit-ticket-maker.jpg",
    playUrl: "tools/exit-ticket-maker/",
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
