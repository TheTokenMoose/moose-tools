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
    description: "K2/K3 Writing Workshop idea cards in the spirit of Lucy Calkins Units of Study. Grade selector shifts the palette (K2 blue/cyan, K3 pink). Units include How to Draw, Show and Tell, Fantasy, and more — short joyful prompts with clipart to spark drawing and writing.",
    category: "Classroom",
    subject: "Writing / Literacy",
    skills: ["Writing workshop", "Idea cards", "K2", "K3", "Drawing as writing", "ESL", "Lucy Calkins"],
    screenshot: "assets/screenshots/writing-workshop-spark.jpg",
    playUrl: "tools/writing-workshop-spark/",
    installable: true,
    featured: true
  },
  {
    id: "china-expat-salary-planner",
    title: "China Expat Salary Planner",
    type: "tool",
    description: "Plan take-home pay for teaching jobs in China. Enter package details, benefits, and costs to compare offers and estimate monthly budget. Built for international teachers — runs fully offline in the browser.",
    category: "Planning",
    subject: "Finance / Expat",
    skills: ["Salary planning", "China", "Budget", "Expat teachers", "Job offers"],
    screenshot: "assets/screenshots/china-expat-salary-planner.jpg",
    playUrl: "tools/china-expat-salary-planner/",
    installable: true,
    featured: false
  },
  {
    id: "name-spin-wheel",
    title: "Name Spin Wheel",
    type: "tool",
    description: "Paste a class list and spin a fair name wheel. Standard mode picks a student; remove mode drops names after each spin so everyone gets a turn. Optional circus music with mute. Perfect for cold-calling and equity of voice.",
    category: "Classroom",
    subject: "Classroom management",
    skills: ["Random picker", "Names", "Turn-taking", "Equity", "Classroom"],
    screenshot: "assets/screenshots/name-spin-wheel.jpg",
    playUrl: "tools/name-spin-wheel/",
    installable: true,
    featured: true
  },
  {
    id: "writing-prompt-generator",
    title: "Writing Prompt Generator",
    type: "tool",
    description: "Pick genre, level (K–3+), and topic to generate a full writing activity: main prompt, sentence starters, vocabulary, challenge, and drawing idea. Regenerate sections independently. Favourites, copy, and print.",
    category: "Writing",
    subject: "Writing / ESL",
    skills: ["Writing prompts", "Scaffolds", "Vocabulary", "Sentence starters", "Differentiation"],
    screenshot: "assets/screenshots/writing-prompt-generator.jpg",
    playUrl: "tools/writing-prompt-generator/",
    installable: true,
    featured: true
  },
  {
    id: "team-maker",
    title: "Team Maker",
    type: "tool",
    description: "Paste a class list and form random teams by number of teams or students per group. Animal team names, optional custom labels, mix history to reduce repeat pairings, copy and print results.",
    category: "Classroom",
    subject: "Classroom management",
    skills: ["Grouping", "Teams", "Randomise", "Print", "Classroom"],
    screenshot: "assets/screenshots/team-maker.jpg",
    playUrl: "tools/team-maker/",
    installable: true,
    featured: true
  },
  {
    id: "classroom-seating-planner",
    title: "Classroom Seating Planner",
    type: "tool",
    description: "Build seating charts from a comma-separated name list. Rows, pairs, groups, carpet, or custom grids. Drag to swap, keep-apart constraints, randomise, save on device, print-friendly chart.",
    category: "Classroom",
    subject: "Classroom management",
    skills: ["Seating", "Grouping", "Classroom management", "Print", "Constraints"],
    screenshot: "assets/screenshots/classroom-seating-planner.jpg",
    playUrl: "tools/classroom-seating-planner/",
    installable: true,
    featured: true
  },
  {
    id: "partner-picker",
    title: "Partner Picker",
    type: "tool",
    description: "Paste student names, choose how many groups, and auto-assign partners or table teams with fruit-themed colours. Drag and drop to fine-tune seating after the random sort. Saves time every term.",
    category: "Classroom",
    subject: "Classroom management",
    skills: ["Grouping", "Partners", "Random teams", "Drag and drop", "Collaboration"],
    screenshot: "assets/screenshots/partner-picker.jpg",
    playUrl: "tools/partner-picker/",
    installable: true,
    featured: true
  },
  {
    id: "the-quiet-game",
    title: "The Quiet Game",
    type: "tool",
    description: "Whole-class volume game: keep the room quiet so the gorilla does not steal the banana. Mic sensitivity controls, teacher timer, win/lose end screens. No music — designed for calm focus challenges.",
    category: "Classroom",
    subject: "Classroom management / SEL",
    skills: ["Volume awareness", "Self-regulation", "Quiet signal", "Classroom game", "Timer"],
    screenshot: "assets/screenshots/the-quiet-game.jpg",
    playUrl: "tools/the-quiet-game/",
    installable: true,
    featured: true
  },
  {
    id: "classroom-timer",
    title: "Classroom Timer",
    type: "tool",
    description: "Visual classroom timer with goal modes (focus, pair work, clean-up, and more) plus Bomb Time with a burning fuse. Animated character on a timeline, pause/restart/stop, optional lofi audio. Scales to full-screen projector use.",
    category: "Classroom",
    subject: "Classroom management",
    skills: ["Timer", "Transitions", "Focus", "Visual timer", "Projector"],
    screenshot: "assets/screenshots/classroom-timer.jpg",
    playUrl: "tools/classroom-timer/",
    installable: true,
    featured: true
  },
  {
    id: "ib-pyp-guide",
    title: "IB PYP Pocket Guide",
    type: "tool",
    description: "Quick classroom reference for IB PYP: transdisciplinary themes, Learner Profile attributes, Approaches to Learning, and related language. Browse and refresh key vocabulary without leaving the projector or laptop.",
    category: "Classroom",
    subject: "IB PYP",
    skills: ["IB PYP", "Learner Profile", "ATLs", "Themes", "Reference"],
    screenshot: "assets/screenshots/ib-pyp-guide.jpg",
    playUrl: "tools/ib-pyp-guide/",
    installable: true,
    featured: true
  },
  {
    id: "shape-builder",
    title: "Shape Builder",
    type: "game",
    description: "Geometry lab for early primary: identify 2D/3D shapes, match pairs, rotate to match, count sides and corners (accurate — spheres have no corners), build picture challenges (house, rocket, tree), and free-build sandbox. Drag pieces, TTS, stars.",
    category: "Maths",
    subject: "Maths / Geometry",
    skills: ["2D shapes", "3D shapes", "sides", "corners", "spatial reasoning", "construction"],
    screenshot: "assets/screenshots/shape-builder.jpg",
    playUrl: "games/shape-builder/",
    installable: true,
    featured: true
  },
  {
    id: "speaking-spinner",
    title: "Speaking Spinner",
    type: "game",
    description: "Teacher projector tool: spin a colourful wheel for ESL speaking prompts. Categories include animals, personal, story, vocabulary, describe, sentences, reasoning, and would-you-rather. Easy/medium/hard, custom prompts, optional student names, TTS, large text.",
    category: "Speaking",
    subject: "ESL / Oral language",
    skills: ["speaking", "oral language", "prompts", "discussion", "classroom"],
    screenshot: "assets/screenshots/speaking-spinner.jpg",
    playUrl: "games/speaking-spinner/",
    installable: true,
    featured: true
  },
  {
    id: "little-science-lab",
    title: "Little Science Lab",
    type: "game",
    description: "Six hands-on experiments: sink or float, magnets, shadows, states of matter (ice/water/steam), plant needs, and sound vibrations. Cause-and-effect interactions, simple explanations, stars, TTS.",
    category: "Science",
    subject: "Science",
    skills: ["inquiry", "observation", "cause and effect", "properties of materials", "ESL"],
    screenshot: "assets/screenshots/little-science-lab.jpg",
    playUrl: "games/little-science-lab/",
    installable: true,
    featured: true
  },
  {
    id: "word-builder-factory",
    title: "Word Builder Factory",
    type: "game",
    description: "Build real words from picture cues with letter tiles. Levels: CVC → CCVC → CVCC → digraphs → blends → silent e. Drag or tap tiles, hear the word, factory reward on success. Validated word bank only.",
    category: "Phonics",
    subject: "Phonics",
    skills: ["encoding", "CVC", "blends", "digraphs", "silent e", "ESL"],
    screenshot: "assets/screenshots/word-builder-factory.jpg",
    playUrl: "games/word-builder-factory/",
    installable: true,
    featured: true
  },
  {
    id: "sort-it",
    title: "Sort It!",
    type: "game",
    description: "Drag or tap objects into the right bins. Science (living/non-living, animals/plants, land/water), maths (2D/3D, shapes, greater/smaller), vocabulary (animals, food, transport), and phonics (beginning sounds, short vowels, digraphs). Data-driven packs, stars, TTS.",
    category: "Mixed",
    subject: "Science / Maths / Phonics",
    skills: ["classification", "sorting", "categories", "vocabulary", "phonics", "ESL"],
    screenshot: "assets/screenshots/sort-it.jpg",
    playUrl: "games/sort-it/",
    installable: true,
    featured: true
  },
  {
    id: "digraph-detective",
    title: "Digraph Detective",
    type: "game",
    description: "Phonics detective cases for SH, CH, TH, and WH. Modes: Hear It, Find It, Match It, Build It, Read It. Clear answers, gentle corrections, progressive digraph sets, stars, and TTS.",
    category: "Phonics",
    subject: "Phonics",
    skills: ["digraphs", "SH CH TH WH", "phonemic awareness", "decoding", "encoding", "ESL"],
    screenshot: "assets/screenshots/digraph-detective.jpg",
    playUrl: "games/digraph-detective/",
    installable: true,
    featured: true
  },
  {
    id: "number-sense-lab",
    title: "Number Sense Lab",
    type: "game",
    description: "Visual math lab for kindergarten and early primary: ten frames, number bonds (multiple valid pairs), number line, compare quantities, and place-value blocks. Progressive levels, gentle feedback, stars.",
    category: "Math",
    subject: "Math",
    skills: ["number sense", "ten frames", "number bonds", "number line", "compare", "place value", "ESL"],
    screenshot: "assets/screenshots/number-sense-lab.jpg",
    playUrl: "games/number-sense-lab/",
    installable: true,
    featured: true
  },
  {
    id: "cvc-word-rush",
    title: "CVC Word Rush",
    type: "game",
    description: "Bright kindergarten word-building: CVC and Silent-e tiers. Time Rush and Dash modes, vowel/consonant banks, real-word check with big miss feedback, local high scores.",
    category: "Literacy",
    subject: "Literacy",
    skills: ["CVC", "silent e", "phonics", "encoding", "fluency"],
    screenshot: "assets/screenshots/cvc-word-rush.jpg",
    playUrl: "games/cvc-word-rush/",
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
    description: "Author branching stories for Enchanted Library. Write pages, link choices, edit page names, export JSON backups, and generate image prompts for each page. Stories appear in Enchanted Library on this device.",
    category: "Literacy",
    subject: "Literacy / Writing",
    skills: ["Story writing", "Branching narrative", "CYOA", "Authoring", "Export"],
    screenshot: "assets/screenshots/story-workshop.jpg",
    playUrl: "tools/story-workshop/",
    installable: true,
    featured: true
  },
  {
    id: "exit-ticket-maker",
    title: "Exit Ticket Maker",
    type: "tool",
    description: "Build exit tickets for live display or print. Choose prompts, show responses on screen for discussion, or generate a clean printable sheet. Includes short how-to guidance for teachers new to exit tickets.",
    category: "Classroom",
    subject: "Assessment",
    skills: ["Exit tickets", "Formative assessment", "Reflection", "Print", "Classroom"],
    screenshot: "assets/screenshots/exit-ticket-maker.jpg",
    playUrl: "tools/exit-ticket-maker/",
    installable: true,
    featured: true
  },
  {
    id: "subitising-safari",
    title: "Subitising Safari",
    type: "game",
    description: "Animals flash on screen for a moment — students tap how many they saw. Builds subitising (seeing quantities without counting one-by-one). Easy/medium/hard flash speeds, stars, press-to-hear.",
    category: "Math",
    subject: "Math",
    skills: ["subitising", "number sense", "counting", "attention", "ESL"],
    screenshot: "assets/screenshots/subitising-safari.jpg",
    playUrl: "games/subitising-safari/",
    installable: true,
    featured: true
  },
  {
    id: "pattern-factory",
    title: "Pattern Factory",
    type: "game",
    description: "Complete the pattern: AB, AAB, ABB, ABC, or mixed. Visual sequences with clear choices, gentle feedback, stars, and optional TTS. Early years maths for kindergarten and Grade 1.",
    category: "Math",
    subject: "Math",
    skills: ["patterns", "sequencing", "algebraic thinking", "visual discrimination", "ESL"],
    screenshot: "assets/screenshots/pattern-factory.jpg",
    playUrl: "games/pattern-factory/",
    installable: true,
    featured: true
  },
  {
    id: "visual-schedule-builder",
    title: "Visual Schedule Builder",
    type: "tool",
    description: "Build a visual daily schedule from ready-made routine blocks (or custom labels). Drag to reorder, save on this device, and present full-screen for the class. Ideal for kindergarten routines.",
    category: "Classroom",
    subject: "Classroom management",
    skills: ["visual schedule", "routines", "classroom", "projector", "kindergarten"],
    screenshot: "assets/screenshots/visual-schedule-builder.jpg",
    playUrl: "tools/visual-schedule-builder/",
    installable: true,
    featured: true
  },
  {
    id: "classroom-randomizer",
    title: "Classroom Randomizer",
    type: "tool",
    description: "Fair random picks: student names (with remove-after so everyone gets a turn), number ranges, letters A–Z, Yes/No, or a custom comma-separated list. Large result display for projector use.",
    category: "Classroom",
    subject: "Classroom management",
    skills: ["Randomise", "Names", "Fair turns", "Projector", "Classroom"],
    screenshot: "assets/screenshots/classroom-randomizer.jpg",
    playUrl: "tools/classroom-randomizer/",
    installable: true,
    featured: true
  },
  {
    id: "bingo-maker",
    title: "Bingo Maker",
    type: "tool",
    description: "Paste words or prompts, generate unique 5×5 bingo boards with optional FREE centre, print for the class, and run Caller mode to draw items one by one.",
    category: "Classroom",
    subject: "Classroom management",
    skills: ["Bingo", "Print", "Vocabulary", "Listening", "Games"],
    screenshot: "assets/screenshots/bingo-maker.jpg",
    playUrl: "tools/bingo-maker/",
    installable: true,
    featured: true
  },
  {
    id: "number-bonds-bakery",
    title: "Number Bonds Bakery",
    type: "game",
    description: "Bakery-themed number bonds: tap two cookie numbers that add up to the tray total. Trays for 5, 10, and 20. Stars, clear/retry, press-to-hear. Kindergarten number sense.",
    category: "Math",
    subject: "Math",
    skills: ["number bonds", "addition", "number sense", "part–whole", "ESL"],
    screenshot: "assets/screenshots/number-bonds-bakery.jpg",
    playUrl: "games/number-bonds-bakery/",
    installable: true,
    featured: true
  },
  {
    id: "measurement-monster",
    title: "Measurement Monster",
    type: "game",
    description: "Compare length, height, and weight: longer/shorter, taller, heavier/lighter. Visual bars and friendly items, stars, press-to-hear. Kindergarten measurement language.",
    category: "Math",
    subject: "Math",
    skills: ["measurement", "compare", "length", "height", "weight", "ESL"],
    screenshot: "assets/screenshots/measurement-monster.jpg",
    playUrl: "games/measurement-monster/",
    installable: true,
    featured: true
  },
  {
    id: "positional-language",
    title: "Positional Language",
    type: "game",
    description: "Where is the cat? under, on, in, next to, between. Simple scene + multiple choice for ESL kindergarten positional language.",
    category: "Literacy",
    subject: "ESL / Literacy",
    skills: ["positional language", "prepositions", "listening", "vocabulary", "ESL"],
    screenshot: "assets/screenshots/positional-language.jpg",
    playUrl: "games/positional-language/",
    installable: true,
    featured: true
  },
  {
    id: "time-traveller",
    title: "Time Traveller",
    type: "game",
    description: "Read analogue clocks: o'clock only, or o'clock and half past. Clear clock face, three choices, stars, press-to-hear.",
    category: "Math",
    subject: "Math",
    skills: ["time", "analogue clock", "o'clock", "half past", "ESL"],
    screenshot: "assets/screenshots/time-traveller.jpg",
    playUrl: "games/time-traveller/",
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
