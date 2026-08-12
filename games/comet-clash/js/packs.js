/**
 * Comet Clash — classroom question packs
 * Each item: { q, a, choices? }  — if choices omitted, treated as open (teacher judges)
 * Prefer multiple-choice for whole-class speed.
 */
window.COMET_PACKS = [
  {
    id: "sight-a",
    title: "Sight Words Blitz",
    blurb: "High-frequency words for early readers",
    emoji: "📖",
    color: "#60a5fa",
    items: [
      { q: "Which word means the opposite of 'stop'?", choices: ["go", "sit", "look", "the"], a: "go" },
      { q: "Find the word: a baby cat is a ___", choices: ["kitten", "puppy", "cub", "calf"], a: "kitten" },
      { q: "Which word is a colour?", choices: ["blue", "run", "happy", "under"], a: "blue" },
      { q: "Complete: I ___ a book yesterday.", choices: ["read", "reads", "reading", "reader"], a: "read" },
      { q: "Which word is a number word?", choices: ["three", "tree", "they", "there"], a: "three" },
      { q: "What is the opposite of 'big'?", choices: ["small", "tall", "fast", "loud"], a: "small" },
      { q: "Which word can start a sentence about you?", choices: ["I", "am", "is", "the"], a: "I" },
      { q: "Pick the animal word:", choices: ["dog", "door", "down", "day"], a: "dog" },
      { q: "Which word means more than one?", choices: ["cats", "cat", "a cat", "the cat"], a: "cats" },
      { q: "Complete: We ___ to school.", choices: ["go", "goes", "going", "gone"], a: "go" },
      { q: "Which is a question word?", choices: ["where", "were", "wear", "ware"], a: "where" },
      { q: "Find the food word:", choices: ["apple", "April", "open", "after"], a: "apple" },
    ],
  },
  {
    id: "phonics",
    title: "Phonics Fuse",
    blurb: "Sounds, blends, and decoding",
    emoji: "🔤",
    color: "#34d399",
    items: [
      { q: "Which word starts with the /sh/ sound?", choices: ["ship", "chip", "sip", "tip"], a: "ship" },
      { q: "What sound do 'c' and 'h' make together in 'chair'?", choices: ["/ch/", "/sh/", "/k/", "/h/"], a: "/ch/" },
      { q: "Which word rhymes with 'cat'?", choices: ["hat", "cut", "cot", "kite"], a: "hat" },
      { q: "How many syllables in 'elephant'?", choices: ["3", "2", "4", "1"], a: "3" },
      { q: "Which word has a long 'a' sound?", choices: ["cake", "cat", "car", "can"], a: "cake" },
      { q: "Pick the word with a silent 'e':", choices: ["bike", "big", "bit", "bin"], a: "bike" },
      { q: "Which blend starts 'green'?", choices: ["gr", "gl", "cr", "br"], a: "gr" },
      { q: "What is the last sound in 'dog'?", choices: ["/g/", "/d/", "/o/", "/t/"], a: "/g/" },
      { q: "Which word ends with /ing/?", choices: ["running", "run", "ran", "runner"], a: "running" },
      { q: "Pick the digraph:", choices: ["th", "st", "pl", "tr"], a: "th" },
      { q: "Which word has a short 'i'?", choices: ["sit", "site", "sight", "side"], a: "sit" },
      { q: "Rhymes with 'light':", choices: ["night", "lit", "lot", "net"], a: "night" },
    ],
  },
  {
    id: "ib-profile",
    title: "IB Learner Profile",
    blurb: "Traits in action — great for PYP",
    emoji: "🌍",
    color: "#a78bfa",
    items: [
      { q: "You share your toys and take turns. You are being…", choices: ["Caring", "Risk-taker", "Reflective", "Knowledgeable"], a: "Caring" },
      { q: "You try a hard puzzle even when it is scary. You are a…", choices: ["Risk-taker", "Balanced", "Principled", "Thinker"], a: "Risk-taker" },
      { q: "You listen to friends from other countries. You are…", choices: ["Open-minded", "Communicator", "Inquirer", "Caring"], a: "Open-minded" },
      { q: "You ask 'why?' and dig deeper. You are an…", choices: ["Inquirer", "Thinker", "Balanced", "Principled"], a: "Inquirer" },
      { q: "You tell the truth even when it is hard. You are…", choices: ["Principled", "Caring", "Reflective", "Knowledgeable"], a: "Principled" },
      { q: "You play sport AND read books — body and mind. You are…", choices: ["Balanced", "Risk-taker", "Thinker", "Communicator"], a: "Balanced" },
      { q: "You explain your idea clearly to the class. You are a…", choices: ["Communicator", "Inquirer", "Caring", "Reflective"], a: "Communicator" },
      { q: "You think about what went well after a project. You are…", choices: ["Reflective", "Knowledgeable", "Open-minded", "Balanced"], a: "Reflective" },
      { q: "You use what you learned in science in real life. You are…", choices: ["Knowledgeable", "Risk-taker", "Caring", "Principled"], a: "Knowledgeable" },
      { q: "You solve a problem in a new way. You are a…", choices: ["Thinker", "Communicator", "Balanced", "Inquirer"], a: "Thinker" },
      { q: "Which trait is about fairness and honesty?", choices: ["Principled", "Open-minded", "Balanced", "Inquirer"], a: "Principled" },
      { q: "Which trait is about empathy and kindness?", choices: ["Caring", "Thinker", "Knowledgeable", "Risk-taker"], a: "Caring" },
    ],
  },
  {
    id: "vocab",
    title: "Word Power",
    blurb: "Classroom vocabulary stretch",
    emoji: "⚡",
    color: "#fbbf24",
    items: [
      { q: "Synonym of 'happy':", choices: ["glad", "angry", "tired", "loud"], a: "glad" },
      { q: "Antonym of 'ancient':", choices: ["modern", "old", "dusty", "historic"], a: "modern" },
      { q: "'Enormous' means…", choices: ["very big", "very small", "very fast", "very quiet"], a: "very big" },
      { q: "A person who writes books is an…", choices: ["author", "actor", "artist", "athlete"], a: "author" },
      { q: "Which word means 'to look carefully'?", choices: ["observe", "ignore", "rush", "hide"], a: "observe" },
      { q: "'Brave' is closest to…", choices: ["courageous", "careful", "curious", "calm"], a: "courageous" },
      { q: "The place where you borrow books:", choices: ["library", "cafeteria", "gym", "office"], a: "library" },
      { q: "Which is a verb (action word)?", choices: ["jump", "happy", "blue", "quickly"], a: "jump" },
      { q: "Which is an adjective (describing word)?", choices: ["shiny", "run", "slowly", "and"], a: "shiny" },
      { q: "'Beneath' means…", choices: ["under", "above", "beside", "inside"], a: "under" },
      { q: "Plural of 'child':", choices: ["children", "childs", "childes", "childrens"], a: "children" },
      { q: "Past tense of 'go':", choices: ["went", "goed", "goes", "going"], a: "went" },
    ],
  },
  {
    id: "math",
    title: "Lightning Maths",
    blurb: "Mental maths for warm-ups",
    emoji: "🧮",
    color: "#f472b6",
    items: [
      { q: "7 + 8 = ?", choices: ["15", "14", "16", "13"], a: "15" },
      { q: "12 − 5 = ?", choices: ["7", "6", "8", "17"], a: "7" },
      { q: "6 × 4 = ?", choices: ["24", "20", "28", "18"], a: "24" },
      { q: "Half of 18 is…", choices: ["9", "8", "10", "6"], a: "9" },
      { q: "What is 100 − 37?", choices: ["63", "73", "67", "53"], a: "63" },
      { q: "3 × 9 = ?", choices: ["27", "21", "24", "30"], a: "27" },
      { q: "How many sides does a hexagon have?", choices: ["6", "5", "8", "7"], a: "6" },
      { q: "15 ÷ 3 = ?", choices: ["5", "4", "6", "3"], a: "5" },
      { q: "Which is even?", choices: ["14", "13", "15", "17"], a: "14" },
      { q: "9 + 9 + 9 = ?", choices: ["27", "18", "36", "24"], a: "27" },
      { q: "A right angle measures…", choices: ["90°", "45°", "180°", "60°"], a: "90°" },
      { q: "Double 25 is…", choices: ["50", "40", "45", "55"], a: "50" },
    ],
  },
  {
    id: "science",
    title: "Science Spark",
    blurb: "Simple science for curious minds",
    emoji: "🔬",
    color: "#2dd4bf",
    items: [
      { q: "What do plants need to make food?", choices: ["sunlight", "music", "plastic", "sand only"], a: "sunlight" },
      { q: "Water freezing becomes…", choices: ["ice", "steam", "cloud", "salt"], a: "ice" },
      { q: "Which planet do we live on?", choices: ["Earth", "Mars", "Venus", "Jupiter"], a: "Earth" },
      { q: "Insects usually have how many legs?", choices: ["6", "4", "8", "2"], a: "6" },
      { q: "The heart’s job is to pump…", choices: ["blood", "air only", "food", "water"], a: "blood" },
      { q: "What force pulls us toward Earth?", choices: ["gravity", "magnetism", "friction", "wind"], a: "gravity" },
      { q: "Caterpillars can become…", choices: ["butterflies", "frogs", "birds", "fish"], a: "butterflies" },
      { q: "Which is a solid?", choices: ["rock", "milk", "air", "steam"], a: "rock" },
      { q: "Day and night are caused by Earth…", choices: ["rotating", "melting", "shrinking", "stopping"], a: "rotating" },
      { q: "We breathe in…", choices: ["oxygen", "only carbon dioxide", "helium", "smoke"], a: "oxygen" },
      { q: "A magnet attracts…", choices: ["iron", "wood", "paper", "plastic"], a: "iron" },
      { q: "The Moon orbits the…", choices: ["Earth", "Sun only", "Mars", "stars"], a: "Earth" },
    ],
  },
  {
    id: "mix",
    title: "Cosmic Mix",
    blurb: "A little of everything — ultimate warm-up",
    emoji: "☄️",
    color: "#fb7185",
    items: [], // filled at runtime from other packs
  },
];

// Build mix pack from others
(function () {
  const mix = window.COMET_PACKS.find((p) => p.id === "mix");
  if (!mix) return;
  const pool = [];
  window.COMET_PACKS.forEach((p) => {
    if (p.id === "mix") return;
    p.items.forEach((it) => pool.push({ ...it, _from: p.title }));
  });
  // shuffle copy
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  mix.items = pool.slice(0, 24);
})();
