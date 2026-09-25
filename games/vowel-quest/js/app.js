(() => {
  // ============================================================
  // VOWEL DATA
  // ============================================================
  const VOWEL_DATA = {
    A: {
      name: "A",
      color: "#E74C3C",
      colorDark: "#C0392B",
      emoji: "🍎",
      sounds: {
        short: {
          id: "short",
          label: "Short A",
          emoji: "🐱",
          example: "cat · hat · map",
          hint: "A says /ă/  (like in cat)",
          speakHint: "Short A. A says ah, like in cat.",
          words: [
            { emoji: "🐱", word: "CAT", blank: 1 },
            { emoji: "🎩", word: "HAT", blank: 1 },
            { emoji: "🗺️", word: "MAP", blank: 1 },
            { emoji: "🎒", word: "BAG", blank: 1 },
            { emoji: "🏃", word: "RAN", blank: 1 },
            { emoji: "😢", word: "SAD", blank: 1 },
            { emoji: "😠", word: "MAD", blank: 1 },
            { emoji: "🫙", word: "JAM", blank: 1 },
            { emoji: "🪭", word: "FAN", blank: 1 },
            { emoji: "🦇", word: "BAT", blank: 1 },
            { emoji: "🐀", word: "RAT", blank: 1 },
            { emoji: "🥫", word: "CAN", blank: 1 },
            { emoji: "👨", word: "MAN", blank: 1 },
            { emoji: "🍳", word: "PAN", blank: 1 },
            { emoji: "🚐", word: "VAN", blank: 1 },
          ]
        },
        long: {
          id: "long",
          label: "Long A",
          emoji: "🎂",
          example: "cake · name · day",
          hint: "A says its name /ā/  (like in cake)",
          speakHint: "Long A. A says its name, like in cake.",
          words: [
            { emoji: "🎂", word: "CAKE", blank: 1 },
            { emoji: "📛", word: "NAME", blank: 1 },
            { emoji: "🌧️", word: "RAIN", blank: 1 },
            { emoji: "☀️", word: "DAY", blank: 1 },
            { emoji: "🎮", word: "PLAY", blank: 2 },
            { emoji: "🛠️", word: "MAKE", blank: 1 },
            { emoji: "🏞️", word: "LAKE", blank: 1 },
            { emoji: "🚪", word: "GATE", blank: 1 },
            { emoji: "🎲", word: "GAME", blank: 1 },
            { emoji: "🚂", word: "TRAIN", blank: 2 },
            { emoji: "🎨", word: "PAINT", blank: 1 },
            { emoji: "⏳", word: "WAIT", blank: 1 },
            { emoji: "💬", word: "SAY", blank: 1 },
            { emoji: "➡️", word: "WAY", blank: 1 },
            { emoji: "🐍", word: "SNAKE", blank: 2 },
          ]
        },
        ar: {
          id: "ar",
          label: "AR Sound",
          emoji: "🚗",
          example: "car · star · farm",
          hint: "A + R says /ar/  (like in car)",
          speakHint: "The A R sound. Like in car and star.",
          words: [
            { emoji: "🚗", word: "CAR", blank: 1 },
            { emoji: "⭐", word: "STAR", blank: 2 },
            { emoji: "🚜", word: "FARM", blank: 1 },
            { emoji: "💪", word: "HARD", blank: 1 },
            { emoji: "🌳", word: "PARK", blank: 1 },
            { emoji: "🌑", word: "DARK", blank: 1 },
            { emoji: "🏡", word: "YARD", blank: 1 },
            { emoji: "🐕", word: "BARK", blank: 1 },
            { emoji: "🃏", word: "CARD", blank: 1 },
            { emoji: "🫙", word: "JAR", blank: 1 },
            { emoji: "💪", word: "ARM", blank: 0 },
            { emoji: "🎨", word: "ART", blank: 0 },
            { emoji: "🦈", word: "SHARK", blank: 2 },
            { emoji: "🏚️", word: "BARN", blank: 1 },
          ]
        },
        aw: {
          id: "aw",
          label: "AW Sound",
          emoji: "🪚",
          example: "saw · paw · claw",
          hint: "A + W says /aw/  (like in saw)",
          speakHint: "The A W sound. Like in saw and paw.",
          words: [
            { emoji: "🪚", word: "SAW", blank: 1 },
            { emoji: "🐾", word: "PAW", blank: 1 },
            { emoji: "📜", word: "LAW", blank: 1 },
            { emoji: "🦞", word: "CLAW", blank: 2 },
            { emoji: "✏️", word: "DRAW", blank: 2 },
            { emoji: "🥤", word: "STRAW", blank: 3 },
            { emoji: "🥩", word: "RAW", blank: 1 },
            { emoji: "😮", word: "JAW", blank: 1 },
            { emoji: "🦅", word: "HAWK", blank: 1 },
            { emoji: "🥱", word: "YAWN", blank: 1 },
            { emoji: "🧹", word: "LAWN", blank: 1 },
            { emoji: "🌅", word: "DAWN", blank: 1 },
          ]
        }
      }
    },
    E: {
      name: "E",
      color: "#2ECC71",
      colorDark: "#27AE60",
      emoji: "📗",
      sounds: {
        short: {
          id: "short",
          label: "Short E",
          emoji: "🛏️",
          example: "bed · red · hen",
          hint: "E says /ĕ/  (like in bed)",
          speakHint: "Short E. E says eh, like in bed.",
          words: [
            { emoji: "🛏️", word: "BED", blank: 1 },
            { emoji: "🔴", word: "RED", blank: 1 },
            { emoji: "🐔", word: "HEN", blank: 1 },
            { emoji: "🖊️", word: "PEN", blank: 1 },
            { emoji: "🔟", word: "TEN", blank: 1 },
            { emoji: "🥅", word: "NET", blank: 1 },
            { emoji: "🦵", word: "LEG", blank: 1 },
            { emoji: "🐶", word: "PET", blank: 1 },
            { emoji: "🔔", word: "BELL", blank: 1 },
            { emoji: "🥚", word: "EGG", blank: 0 },
            { emoji: "🕸️", word: "WEB", blank: 1 },
            { emoji: "🪑", word: "DESK", blank: 1 },
            { emoji: "🦺", word: "VEST", blank: 1 },
            { emoji: "🥣", word: "MESS", blank: 1 },
            { emoji: "✈️", word: "JET", blank: 1 },
          ]
        },
        long: {
          id: "long",
          label: "Long E",
          emoji: "🌳",
          example: "me · tree · bee · eat",
          hint: "E says its name /ē/  (like in tree)",
          speakHint: "Long E. E says its name, like in tree.",
          words: [
            { emoji: "👤", word: "ME", blank: 1 },
            { emoji: "👩", word: "SHE", blank: 2 },
            { emoji: "🌳", word: "TREE", blank: 2 },
            { emoji: "🐝", word: "BEE", blank: 1 },
            { emoji: "👀", word: "SEE", blank: 1 },
            { emoji: "🍽️", word: "EAT", blank: 0 },
            { emoji: "📖", word: "READ", blank: 1 },
            { emoji: "🍃", word: "LEAF", blank: 1 },
            { emoji: "🔑", word: "KEY", blank: 1 },
            { emoji: "🦭", word: "SEAL", blank: 1 },
            { emoji: "🧹", word: "CLEAN", blank: 2 },
            { emoji: "😴", word: "SLEEP", blank: 2 },
            { emoji: "🟢", word: "GREEN", blank: 2 },
            { emoji: "🦶", word: "FEET", blank: 1 },
            { emoji: "🦷", word: "TEETH", blank: 1 },
          ]
        },
        er: {
          id: "er",
          label: "ER Sound",
          emoji: "🌺",
          example: "her · fern · tiger",
          hint: "E + R says /er/  (like in her)",
          speakHint: "The E R sound. Like in her and fern.",
          words: [
            { emoji: "👩", word: "HER", blank: 1 },
            { emoji: "🌿", word: "FERN", blank: 1 },
            { emoji: "🐅", word: "TIGER", blank: 3 },
            { emoji: "🗣️", word: "VERB", blank: 1 },
            { emoji: "📄", word: "PAPER", blank: 3 },
            { emoji: "💧", word: "WATER", blank: 3 },
            { emoji: "🌸", word: "FLOWER", blank: 3 },
            { emoji: "🦸", word: "HERO", blank: 1 },
            { emoji: "🎤", word: "SINGER", blank: 4 },
            { emoji: "🧊", word: "WINTER", blank: 3 },
            { emoji: "☀️", word: "SUMMER", blank: 4 },
            { emoji: "🦋", word: "BUTTER", blank: 4 },
            { emoji: "🔔", word: "LETTER", blank: 4 },
            { emoji: "👧", word: "SISTER", blank: 4 },
          ]
        }
      }
    },
    I: {
      name: "I",
      color: "#9B59B6",
      colorDark: "#8E44AD",
      emoji: "🔮",
      sounds: {
        short: {
          id: "short",
          label: "Short I",
          emoji: "🐷",
          example: "sit · pig · big",
          hint: "I says /ĭ/  (like in pig)",
          speakHint: "Short I. I says ih, like in pig.",
          words: [
            { emoji: "🐷", word: "PIG", blank: 1 },
            { emoji: "🪑", word: "SIT", blank: 1 },
            { emoji: "🐘", word: "BIG", blank: 1 },
            { emoji: "👊", word: "HIT", blank: 1 },
            { emoji: "👄", word: "LIP", blank: 1 },
            { emoji: "🏆", word: "WIN", blank: 1 },
            { emoji: "🐟", word: "FISH", blank: 1 },
            { emoji: "🥛", word: "MILK", blank: 1 },
            { emoji: "🎁", word: "GIFT", blank: 1 },
            { emoji: "🚢", word: "SHIP", blank: 2 },
            { emoji: "🦶", word: "KICK", blank: 1 },
            { emoji: "🎸", word: "SING", blank: 1 },
            { emoji: "🌧️", word: "DRIP", blank: 2 },
            { emoji: "🏊", word: "SWIM", blank: 2 },
            { emoji: "下巴", word: "CHIN", blank: 2 },
          ]
        },
        long: {
          id: "long",
          label: "Long I",
          emoji: "🚲",
          example: "bike · like · my · night",
          hint: "I says its name /ī/  (like in bike)",
          speakHint: "Long I. I says its name, like in bike.",
          words: [
            { emoji: "🚲", word: "BIKE", blank: 1 },
            { emoji: "❤️", word: "LIKE", blank: 1 },
            { emoji: "⏰", word: "TIME", blank: 1 },
            { emoji: "🙋", word: "MY", blank: 1 },
            { emoji: "🪰", word: "FLY", blank: 2 },
            { emoji: "🌙", word: "NIGHT", blank: 1 },
            { emoji: "💡", word: "LIGHT", blank: 1 },
            { emoji: "😄", word: "SMILE", blank: 2 },
            { emoji: "🪁", word: "KITE", blank: 1 },
            { emoji: "🥧", word: "PIE", blank: 1 },
            { emoji: "🐯", word: "TIGER", blank: 1 },
            { emoji: "🧊", word: "ICE", blank: 0 },
            { emoji: "👁️", word: "EYE", blank: 0 },
            { emoji: "🏎️", word: "RIDE", blank: 1 },
            { emoji: "5️⃣", word: "FIVE", blank: 1 },
          ]
        },
        ir: {
          id: "ir",
          label: "IR Sound",
          emoji: "🐦",
          example: "bird · girl · first",
          hint: "I + R says /er/  (like in bird)",
          speakHint: "The I R sound. Like in bird and girl.",
          words: [
            { emoji: "🐦", word: "BIRD", blank: 1 },
            { emoji: "👧", word: "GIRL", blank: 1 },
            { emoji: "1️⃣", word: "FIRST", blank: 1 },
            { emoji: "👕", word: "SHIRT", blank: 2 },
            { emoji: "🟤", word: "DIRT", blank: 1 },
            { emoji: "🌀", word: "TWIRL", blank: 2 },
            { emoji: "🎂", word: "BIRTH", blank: 1 },
            { emoji: "3️⃣", word: "THIRD", blank: 2 },
            { emoji: "🎪", word: "CIRCUS", blank: 1 },
            { emoji: "🥄", word: "STIR", blank: 2 },
            { emoji: "👗", word: "SKIRT", blank: 2 },
            { emoji: "💪", word: "FIRM", blank: 1 },
          ]
        }
      }
    },
    O: {
      name: "O",
      color: "#FF9F43",
      colorDark: "#EE7A1A",
      emoji: "🟠",
      sounds: {
        short: {
          id: "short",
          label: "Short O",
          emoji: "🐶",
          example: "on · dog · hot",
          hint: "O says /ŏ/  (like “ah” in dog)",
          speakHint: "Short O. O says ah, like in dog.",
          words: [
            { emoji: "🐶", word: "DOG", blank: 1 },
            { emoji: "🦊", word: "FOX", blank: 1 },
            { emoji: "📦", word: "BOX", blank: 1 },
            { emoji: "🧦", word: "SOCK", blank: 1 },
            { emoji: "🪵", word: "LOG", blank: 1 },
            { emoji: "🎩", word: "TOP", blank: 1 },
            { emoji: "🧹", word: "MOP", blank: 1 },
            { emoji: "🍲", word: "POT", blank: 1 },
            { emoji: "🐸", word: "FROG", blank: 2 },
            { emoji: "🕒", word: "CLOCK", blank: 2 },
            { emoji: "🔑", word: "LOCK", blank: 1 },
            { emoji: "🔥", word: "HOT", blank: 1 },
            { emoji: "🦘", word: "HOP", blank: 1 },
            { emoji: "🪨", word: "ROCK", blank: 1 },
            { emoji: "🛑", word: "STOP", blank: 2 },
          ]
        },
        long: {
          id: "long",
          label: "Long O",
          emoji: "🚢",
          example: "go · boat · home",
          hint: "O says its name /ō/  (like “oh” in go)",
          speakHint: "Long O. O says its name, like in go.",
          words: [
            { emoji: "🚢", word: "BOAT", blank: 2 },
            { emoji: "🧥", word: "COAT", blank: 2 },
            { emoji: "🐐", word: "GOAT", blank: 2 },
            { emoji: "👃", word: "NOSE", blank: 1 },
            { emoji: "🌹", word: "ROSE", blank: 1 },
            { emoji: "🏠", word: "HOME", blank: 1 },
            { emoji: "🦴", word: "BONE", blank: 1 },
            { emoji: "📝", word: "NOTE", blank: 1 },
            { emoji: "🪢", word: "ROPE", blank: 1 },
            { emoji: "❄️", word: "SNOW", blank: 2 },
            { emoji: "🦶", word: "TOE", blank: 1 },
            { emoji: "➡️", word: "GO", blank: 1 },
            { emoji: "🚫", word: "NO", blank: 1 },
            { emoji: "🛤️", word: "ROAD", blank: 1 },
            { emoji: "🍞", word: "TOAST", blank: 1 },
          ]
        },
        ow: {
          id: "ow",
          label: "OW Sound",
          emoji: "🐮",
          example: "how · cow · now",
          hint: "O + W says /ow/  (like in how & cow)",
          speakHint: "The O W sound. Like in how and cow.",
          words: [
            { emoji: "🐮", word: "COW", blank: 1 },
            { emoji: "❓", word: "HOW", blank: 1 },
            { emoji: "⏰", word: "NOW", blank: 1 },
            { emoji: "⬇️", word: "DOWN", blank: 1 },
            { emoji: "🦉", word: "OWL", blank: 0 },
            { emoji: "🟤", word: "BROWN", blank: 2 },
            { emoji: "👑", word: "CROWN", blank: 2 },
            { emoji: "🏙️", word: "TOWN", blank: 1 },
            { emoji: "🌸", word: "FLOWER", blank: 2 },
            { emoji: "☁️", word: "CLOUD", blank: 2 },
            { emoji: "🏠", word: "HOUSE", blank: 1 },
            { emoji: "🐭", word: "MOUSE", blank: 1 },
            { emoji: "📢", word: "LOUD", blank: 1 },
            { emoji: "🗣️", word: "SHOUT", blank: 2 },
          ]
        },
        oo: {
          id: "oo",
          label: "OO Sound",
          emoji: "2️⃣",
          example: "do · to · who · two",
          hint: "O says /oo/  (like in do & who)",
          speakHint: "The O O sound. O says oo, like in do and who.",
          words: [
            { emoji: "✅", word: "DO", blank: 1 },
            { emoji: "➡️", word: "TO", blank: 1 },
            { emoji: "2️⃣", word: "TWO", blank: 1 },
            { emoji: "👤", word: "WHO", blank: 2 },
            { emoji: "📦", word: "MOVE", blank: 1 },
            { emoji: "👟", word: "SHOE", blank: 2 },
            { emoji: "🌙", word: "MOON", blank: 1 },
            { emoji: "🍽️", word: "FOOD", blank: 1 },
            { emoji: "🏫", word: "SCHOOL", blank: 2 },
            { emoji: "💙", word: "BLUE", blank: 2 },
          ]
        },
        oasu: {
          id: "oasu",
          label: "O as U",
          emoji: "❤️",
          example: "son · love · come · some",
          hint: "O says /ŭ/  (like short U in love & son)",
          speakHint: "O as U. O says uh, like in love and son.",
          words: [
            { emoji: "👦", word: "SON", blank: 1 },
            { emoji: "❤️", word: "LOVE", blank: 1 },
            { emoji: "👋", word: "COME", blank: 1 },
            { emoji: "1️⃣", word: "SOME", blank: 1 },
            { emoji: "📤", word: "FROM", blank: 2 },
            { emoji: "👩", word: "MOTHER", blank: 1 },
            { emoji: "👨", word: "BROTHER", blank: 2 },
            { emoji: "💰", word: "MONEY", blank: 1 },
            { emoji: "🍯", word: "HONEY", blank: 1 },
            { emoji: "☝️", word: "ONE", blank: 0 },
            { emoji: "👆", word: "DONE", blank: 1 },
            { emoji: "🧤", word: "GLOVE", blank: 2 },
          ]
        },
        rcontrolled: {
          id: "rcontrolled",
          label: "R-Controlled O",
          emoji: "🐴",
          example: "or · for · more · corn",
          hint: "O + R says /or/  (like in for & more)",
          speakHint: "R-controlled O. O R says or, like in for and more.",
          words: [
            { emoji: "🐴", word: "HORSE", blank: 1 },
            { emoji: "🌽", word: "CORN", blank: 1 },
            { emoji: "📯", word: "HORN", blank: 1 },
            { emoji: "🏰", word: "FORT", blank: 1 },
            { emoji: "⚽", word: "SPORT", blank: 2 },
            { emoji: "🩳", word: "SHORT", blank: 2 },
            { emoji: "⛈️", word: "STORM", blank: 2 },
            { emoji: "🧭", word: "NORTH", blank: 1 },
            { emoji: "🛒", word: "STORE", blank: 2 },
            { emoji: "➕", word: "MORE", blank: 1 },
            { emoji: "➡️", word: "FOR", blank: 1 },
            { emoji: "🚪", word: "DOOR", blank: 1 },
            { emoji: "🧹", word: "FLOOR", blank: 2 },
            { emoji: "🍼", word: "BORN", blank: 1 },
            { emoji: "🍴", word: "FORK", blank: 1 },
          ]
        }
      }
    },
    U: {
      name: "U",
      color: "#3498DB",
      colorDark: "#2980B9",
      emoji: "🔵",
      sounds: {
        short: {
          id: "short",
          label: "Short U",
          emoji: "☕",
          example: "cup · bus · sun",
          hint: "U says /ŭ/  (like in cup)",
          speakHint: "Short U. U says uh, like in cup.",
          words: [
            { emoji: "☕", word: "CUP", blank: 1 },
            { emoji: "🚌", word: "BUS", blank: 1 },
            { emoji: "🌞", word: "SUN", blank: 1 },
            { emoji: "🏃", word: "RUN", blank: 1 },
            { emoji: "🎉", word: "FUN", blank: 1 },
            { emoji: "⬆️", word: "UP", blank: 0 },
            { emoji: "🐞", word: "BUG", blank: 1 },
            { emoji: "🦆", word: "DUCK", blank: 1 },
            { emoji: "🚛", word: "TRUCK", blank: 2 },
            { emoji: "🦘", word: "JUMP", blank: 1 },
            { emoji: "🥁", word: "DRUM", blank: 2 },
            { emoji: "🥜", word: "NUT", blank: 1 },
            { emoji: "🟤", word: "MUD", blank: 1 },
            { emoji: "🐶", word: "PUP", blank: 1 },
            { emoji: "✂️", word: "CUT", blank: 1 },
          ]
        },
        long: {
          id: "long",
          label: "Long U",
          emoji: "🦄",
          example: "cute · use · blue · flute",
          hint: "U says its name /ū/  (like in cute or blue)",
          speakHint: "Long U. U says its name, like in cute and blue.",
          words: [
            { emoji: "🦄", word: "CUTE", blank: 1 },
            { emoji: "🛠️", word: "USE", blank: 0 },
            { emoji: "💙", word: "BLUE", blank: 2 },
            { emoji: "🎶", word: "FLUTE", blank: 2 },
            { emoji: "🫏", word: "MULE", blank: 1 },
            { emoji: "🎵", word: "TUNE", blank: 1 },
            { emoji: "🧊", word: "CUBE", blank: 1 },
            { emoji: "🧪", word: "TUBE", blank: 1 },
            { emoji: "🧴", word: "GLUE", blank: 2 },
            { emoji: "✅", word: "TRUE", blank: 2 },
            { emoji: "🌙", word: "MOON", blank: 1 },
            { emoji: "🍽️", word: "FOOD", blank: 1 },
            { emoji: "👟", word: "SHOE", blank: 2 },
            { emoji: "📏", word: "RULE", blank: 1 },
          ]
        },
        ur: {
          id: "ur",
          label: "UR Sound",
          emoji: "🦊",
          example: "fur · turn · burn · nurse",
          hint: "U + R says /er/  (like in fur)",
          speakHint: "The U R sound. Like in fur and turn.",
          words: [
            { emoji: "🦊", word: "FUR", blank: 1 },
            { emoji: "🔄", word: "TURN", blank: 1 },
            { emoji: "🔥", word: "BURN", blank: 1 },
            { emoji: "👩‍⚕️", word: "NURSE", blank: 1 },
            { emoji: "💜", word: "PURPLE", blank: 1 },
            { emoji: "🐢", word: "TURTLE", blank: 1 },
            { emoji: "🏄", word: "SURF", blank: 1 },
            { emoji: "💇", word: "CURL", blank: 1 },
            { emoji: "🤕", word: "HURT", blank: 1 },
            { emoji: "⛪", word: "CHURCH", blank: 2 },
            { emoji: "💥", word: "BURST", blank: 1 },
            { emoji: "👛", word: "PURSE", blank: 1 },
          ]
        }
      }
    }

  };

  // Fix a few emoji that were plain text
  VOWEL_DATA.A.sounds.short.words[7].emoji = "🫙";
  VOWEL_DATA.A.sounds.ar.words[13].emoji = "🏚️";
  VOWEL_DATA.A.sounds.aw.words[8].emoji = "🦅";
  VOWEL_DATA.A.sounds.aw.words[11].emoji = "🌅";

  const distractorsByVowel = {
    A: ["E", "I", "O", "U", "B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "R", "S", "T", "W", "Y"],
    E: ["A", "I", "O", "U", "B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "R", "S", "T", "W", "Y"],
    I: ["A", "E", "O", "U", "B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "R", "S", "T", "W", "Y"],
    O: ["A", "E", "I", "U", "B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "R", "S", "T", "W", "Y"],
    U: ["A", "E", "I", "O", "B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "R", "S", "T", "W", "Y"]
  };

  const noVowelWords = {
    A: [
      { emoji: "🐶", word: "DOG" }, { emoji: "🐦", word: "BIRD" }, { emoji: "🐟", word: "FISH" },
      { emoji: "🌳", word: "TREE" }, { emoji: "🌞", word: "SUN" }, { emoji: "🐝", word: "BEE" },
      { emoji: "🍕", word: "PIZZA" }, { emoji: "🔑", word: "KEY" }, { emoji: "📘", word: "BOOK" }
    ],
    E: [
      { emoji: "🐱", word: "CAT" }, { emoji: "🐶", word: "DOG" }, { emoji: "🐟", word: "FISH" },
      { emoji: "🍎", word: "APPLE" }, { emoji: "🌞", word: "SUN" }, { emoji: "🚗", word: "CAR" },
      { emoji: "📘", word: "BOOK" }, { emoji: "🌙", word: "MOON" }, { emoji: "⭐", word: "STAR" }
    ],
    I: [
      { emoji: "🐱", word: "CAT" }, { emoji: "🐶", word: "DOG" }, { emoji: "🍎", word: "APPLE" },
      { emoji: "🌞", word: "SUN" }, { emoji: "🚗", word: "CAR" }, { emoji: "🐝", word: "BEE" },
      { emoji: "📘", word: "BOOK" }, { emoji: "🌙", word: "MOON" }, { emoji: "🌳", word: "TREE" }
    ],
    O: [
      { emoji: "🐱", word: "CAT" }, { emoji: "🐦", word: "BIRD" }, { emoji: "🐟", word: "FISH" },
      { emoji: "🍎", word: "APPLE" }, { emoji: "🌳", word: "TREE" }, { emoji: "🌞", word: "SUN" },
      { emoji: "⭐", word: "STAR" }, { emoji: "🚗", word: "CAR" }, { emoji: "🐝", word: "BEE" }
    ],
    U: [
      { emoji: "🐱", word: "CAT" }, { emoji: "🐶", word: "DOG" }, { emoji: "🍎", word: "APPLE" },
      { emoji: "🌳", word: "TREE" }, { emoji: "🐦", word: "BIRD" }, { emoji: "🐝", word: "BEE" },
      { emoji: "⭐", word: "STAR" }, { emoji: "🚗", word: "CAR" }, { emoji: "🐟", word: "FISH" }
    ]
  };

  // ============================================================
  // STATE
  // ============================================================
  let score = 0, level = 1, soundOn = true;
  let highScore = parseInt(localStorage.getItem("vqHigh") || "0", 10);
  let currentVowel = "O";
  let currentSoundId = null;
  let playAllMode = false, advancedMode = false;
  let playAllQueue = [], playAllIndex = 0;
  let roundsPerSound = 3, totalRounds = 0;
  let foundCount = 0, targetCount = 0;
  let mixedWordPool = [];

  // ============================================================
  // DOM
  // ============================================================
  const activityArea = document.getElementById("activity-area");
  const scoreEl = document.getElementById("score");
  const levelEl = document.getElementById("level");
  const progressEl = document.getElementById("progress");
  const celebration = document.getElementById("celebration");
  const celebTitle = document.getElementById("celeb-title");
  const celebMsg = document.getElementById("celeb-msg");
  const celebPoints = document.getElementById("celeb-points");
  const highScoreEl = document.getElementById("highScore");
  const soundBadge = document.getElementById("soundBadge");
  const soundCardsEl = document.getElementById("soundGrid");
  const vowelGrid = document.getElementById("vowelGrid");
  const selectVowelBadge = document.getElementById("selectVowelBadge");

  highScoreEl.textContent = highScore;

  // ============================================================
  // THEME
  // ============================================================
  function applyTheme(vowel) {
    const c = VOWEL_DATA[vowel].color;
    const d = VOWEL_DATA[vowel].colorDark;
    document.documentElement.style.setProperty("--accent", c);
    document.documentElement.style.setProperty("--accent-dark", d);
    document.querySelector('meta[name="theme-color"]').content = c;
  }

  // ============================================================
  // AUDIO
  // ============================================================
  // Shared TokenMooseVoice (system voices + optional Piper; per-app voice picker)
  const vqVoice = (typeof TokenMooseVoice !== "undefined")
    ? TokenMooseVoice.create("vowel-quest")
    : null;
  if (vqVoice) {
    vqVoice.setEnabled(soundOn);
  }

  function speak(text, rate = 0.9) {
    if (!soundOn || !text) return;
    if (vqVoice) {
      vqVoice.speak(String(text), { rate: rate });
      return;
    }
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(String(text));
    u.rate = rate;
    u.pitch = 1.1;
    u.lang = "en-US";
    window.speechSynthesis.speak(u);
  }
  function playTone(freq = 520, duration = 0.12) {
    if (!soundOn) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator(), gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.value = freq; osc.type = "sine";
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.start(); osc.stop(ctx.currentTime + duration);
    } catch (e) {}
  }

  // ============================================================
  // HELPERS
  // ============================================================
  function showScreen(id) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
  }
  function updateScore(pts) {
    score += pts; if (score < 0) score = 0;
    scoreEl.textContent = score;
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("vqHigh", highScore);
      highScoreEl.textContent = highScore;
    }
  }
  function updateProgress() {
    progressEl.style.width = (totalRounds <= 0 ? 0 : Math.min(100, ((level - 1) / totalRounds) * 100)) + "%";
  }
  function getCurrentSound() {
    if (advancedMode) {
      return {
        id: "advanced", label: "Advanced Mix", emoji: "🌈",
        example: "all sounds mixed", hint: "Any sound of this vowel!",
        speakHint: "Advanced mix. Watch for every kind of sound.",
        words: mixedWordPool
      };
    }
    return VOWEL_DATA[currentVowel].sounds[currentSoundId];
  }
  function getCurrentWords() { return getCurrentSound().words; }
  function getLetter() { return currentVowel; }
  function getDistractors() { return distractorsByVowel[currentVowel]; }
  function getNoVowelWords() { return noVowelWords[currentVowel]; }

  function buildMixedPool() {
    const all = [];
    Object.values(VOWEL_DATA[currentVowel].sounds).forEach(s => all.push(...s.words));
    const seen = new Set();
    mixedWordPool = shuffle(all).filter(w => {
      if (seen.has(w.word)) return false;
      seen.add(w.word); return true;
    });
  }
  function showCelebration(title, msg, points, onNext) {
    celebTitle.textContent = title; celebMsg.textContent = msg; celebPoints.textContent = points;
    celebration.classList.remove("hidden");
    document.getElementById("nextBtn").onclick = () => { celebration.classList.add("hidden"); onNext(); };
  }
  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // ============================================================
  // BUILD VOWEL GRID (HOME)
  // ============================================================
  function buildVowelGrid() {
    vowelGrid.innerHTML = "";
    Object.keys(VOWEL_DATA).forEach(v => {
      const data = VOWEL_DATA[v];
      const btn = document.createElement("button");
      btn.className = "vowel-card";
      btn.style.setProperty("--v-color", data.color);
      btn.style.setProperty("--v-dark", data.colorDark);
      btn.innerHTML = `
        <span class="vowel-letter">${v}</span>
        <span class="vowel-emoji">${data.emoji}</span>
      `;
      btn.addEventListener("click", () => openVowel(v));
      vowelGrid.appendChild(btn);
    });
  }

  function openVowel(v) {
    currentVowel = v;
    applyTheme(v);
    selectVowelBadge.textContent = v;
    selectVowelBadge.style.background = VOWEL_DATA[v].color;
    buildSoundCards();
    showScreen("select");
  }

  // ============================================================
  // BUILD SOUND CARDS
  // ============================================================
  function buildSoundCards() {
    const sounds = VOWEL_DATA[currentVowel].sounds;
    soundCardsEl.innerHTML = "";
    Object.values(sounds).forEach(s => {
      const btn = document.createElement("button");
      btn.className = "sound-card";
      btn.innerHTML = `
        <span class="card-emoji">${s.emoji}</span>
        <div class="card-info">
          <span class="card-label">${s.label}</span>
          <div class="card-example">${s.example}</div>
          <div class="card-hint">${s.hint}</div>
        </div>
      `;
      btn.addEventListener("click", () => startSingleSound(s.id));
      soundCardsEl.appendChild(btn);
    });

  }

  // ============================================================
  // ACTIVITIES (letter-aware)
  // ============================================================
  function startHunt() {
    foundCount = 0;
    const letter = getLetter();
    const totalLetters = 15;
    const numTargets = 5 + Math.min(3, Math.floor(level / 2));
    targetCount = numTargets;
    const letters = [];
    for (let i = 0; i < numTargets; i++) letters.push(letter);
    const dist = getDistractors();
    while (letters.length < totalLetters) letters.push(dist[Math.floor(Math.random() * dist.length)]);
    const shuffled = shuffle(letters);
    const sound = getCurrentSound();
    activityArea.innerHTML = `
      <h2 class="hunt-title">Find all the <span class="accent-text">${letter}</span>'s!</h2>
      <p class="hunt-sub">${sound.hint}</p>
      <div class="letter-grid" id="letterGrid"></div>
    `;
    const grid = document.getElementById("letterGrid");
    shuffled.forEach(L => {
      const cell = document.createElement("button");
      cell.className = "letter-cell" + (L === letter ? " target" : "");
      cell.textContent = L;
      cell.dataset.isTarget = L === letter ? "1" : "0";
      cell.addEventListener("click", () => handleHuntClick(cell));
      grid.appendChild(cell);
    });
    speak(`Find all the letter ${letter}'s!`);
  }
  function handleHuntClick(cell) {
    if (cell.classList.contains("correct") || cell.classList.contains("wrong")) return;
    if (cell.dataset.isTarget === "1") {
      cell.classList.add("correct"); foundCount++;
      playTone(660, 0.1); updateScore(5);
      if (foundCount >= targetCount) {
        setTimeout(() => showCelebration("Great job!", `You found every ${getLetter()}!`, foundCount * 5, nextRound), 400);
      }
    } else {
      cell.classList.add("wrong"); playTone(220, 0.15);
      setTimeout(() => cell.classList.remove("wrong"), 450); updateScore(-2);
    }
  }

  function startFill() {
    const words = getCurrentWords();
    const item = words[Math.floor(Math.random() * words.length)];
    const letters = item.word.split("");
    const blankIdx = Math.min(item.blank, letters.length - 1);
    const letter = getLetter();
    let displayHTML = "";
    letters.forEach((ch, i) => {
      displayHTML += i === blankIdx
        ? `<span class="blank" id="blankSpot">_</span>`
        : `<span>${ch}</span>`;
    });
    const choices = [letter];
    const dist = getDistractors();
    while (choices.length < 4) {
      const d = dist[Math.floor(Math.random() * dist.length)];
      if (!choices.includes(d)) choices.push(d);
    }
    const sound = getCurrentSound();
    activityArea.innerHTML = `
      <h2 class="fill-title">What letter is missing?</h2>
      <p class="fill-sub">${sound.hint}</p>
      <div class="word-card">
        <span class="word-emoji">${item.emoji}</span>
        <div class="word-display">${displayHTML}</div>
      </div>
      <div class="choices" id="choices"></div>
    `;
    const choicesEl = document.getElementById("choices");
    shuffle(choices).forEach(ch => {
      const btn = document.createElement("button");
      btn.className = "choice-btn" + (ch === letter ? " target-choice" : "");
      btn.textContent = ch;
      btn.addEventListener("click", () => handleFillClick(btn, ch, item, letter));
      choicesEl.appendChild(btn);
    });
    speak(`What letter is missing in ${item.word.toLowerCase()}?`);
  }
  function handleFillClick(btn, chosen, item, letter) {
    if (btn.classList.contains("correct") || btn.classList.contains("wrong")) return;
    if (chosen === letter) {
      btn.classList.add("correct"); playTone(720, 0.15);
      const blank = document.getElementById("blankSpot");
      if (blank) { blank.textContent = letter; blank.classList.remove("blank"); blank.classList.add("filled"); }
      updateScore(15); speak(item.word.toLowerCase());
      setTimeout(() => showCelebration("Perfect!", `${item.word} has the letter ${letter}!`, 15, nextRound), 700);
    } else {
      btn.classList.add("wrong"); playTone(200, 0.2);
      setTimeout(() => btn.classList.remove("wrong"), 450); updateScore(-3);
    }
  }

  function startMatch() {
    const words = getCurrentWords();
    const correct = words[Math.floor(Math.random() * words.length)];
    const options = [correct];
    const noList = getNoVowelWords();
    while (options.length < 4) {
      const d = noList[Math.floor(Math.random() * noList.length)];
      if (!options.find(o => o.word === d.word)) options.push(d);
    }
    const letter = getLetter();
    const sound = getCurrentSound();
    activityArea.innerHTML = `
      <h2 class="match-title">Which word has the letter <span class="accent-text">${letter}</span>?</h2>
      <p class="match-sub">${sound.hint}</p>
      <div class="sound-prompt">
        <div class="big-letter accent-text">${letter}</div>
        <p>${sound.label}</p>
      </div>
      <div class="word-options" id="wordOptions"></div>
    `;
    const optsEl = document.getElementById("wordOptions");
    shuffle(options).forEach(opt => {
      const btn = document.createElement("button");
      btn.className = "word-opt";
      btn.innerHTML = `<span class="opt-emoji">${opt.emoji}</span><span>${opt.word}</span>`;
      btn.addEventListener("click", () => handleMatchClick(btn, opt, correct, letter));
      optsEl.appendChild(btn);
    });
    speak(`Which word has the letter ${letter}?`);
  }
  function handleMatchClick(btn, opt, correct, letter) {
    if (btn.classList.contains("correct") || btn.classList.contains("wrong")) return;
    if (opt.word === correct.word) {
      btn.classList.add("correct"); playTone(700, 0.15); updateScore(12);
      speak(correct.word.toLowerCase());
      setTimeout(() => showCelebration("Yes!", `${correct.word} has an ${letter}!`, 12, nextRound), 600);
    } else {
      btn.classList.add("wrong"); playTone(200, 0.2);
      setTimeout(() => btn.classList.remove("wrong"), 450); updateScore(-2);
    }
  }

  const activityFns = [startHunt, startFill, startMatch, startFill];

  // ============================================================
  // FLOW
  // ============================================================
  function setSoundBadge() {
    const s = getCurrentSound();
    soundBadge.textContent = s.label + "  " + s.emoji;
  }
  function startSingleSound(soundId) {
    playAllMode = false; advancedMode = false;
    currentSoundId = soundId;
    totalRounds = roundsPerSound * 2;
    beginGame();
  }
  function startPlayAll() {
    playAllMode = true; advancedMode = false;
    playAllQueue = Object.keys(VOWEL_DATA[currentVowel].sounds);
    playAllIndex = 0;
    currentSoundId = playAllQueue[0];
    totalRounds = playAllQueue.length * roundsPerSound;
    beginGame();
  }
  function startAdvanced() {
    playAllMode = false; advancedMode = true;
    currentSoundId = "advanced";
    buildMixedPool();
    totalRounds = 10;
    beginGame();
  }
  function beginGame() {
    score = 0; level = 1;
    scoreEl.textContent = "0"; levelEl.textContent = "1";
    progressEl.style.width = "0%";
    setSoundBadge();
    showScreen("game");
    speak(getCurrentSound().speakHint);
    setTimeout(() => activityFns[0](), 1300);
  }
  function nextRound() {
    level++; levelEl.textContent = level; updateProgress();
    if (level > totalRounds) { endGame(); return; }
    if (playAllMode) {
      const newIndex = Math.floor((level - 1) / roundsPerSound);
      if (newIndex !== playAllIndex && newIndex < playAllQueue.length) {
        playAllIndex = newIndex;
        currentSoundId = playAllQueue[playAllIndex];
        setSoundBadge();
        const s = getCurrentSound();
        speak("Now the " + s.label + " sound. " + s.speakHint);
      }
    }
    activityFns[(level - 1) % activityFns.length]();
  }
  function endGame() {
    document.getElementById("finalScore").textContent = score;
    let msg;
    if (advancedMode) msg = `You conquered every ${currentVowel} sound! 🌈🏆`;
    else if (playAllMode) msg = `You practiced every ${currentVowel} sound! 🧡`;
    else msg = `You're a ${getCurrentSound().label} expert!`;
    document.getElementById("finalMsg").textContent = msg;
    showScreen("final");
    speak(`You did it! Great work with the letter ${currentVowel}.`);
  }

  // ============================================================
  // EVENTS
  // ============================================================
  document.getElementById("backHomeBtn").addEventListener("click", () => showScreen("home"));
  document.getElementById("playAllBtn").addEventListener("click", startPlayAll);
  const advBtn = document.getElementById("advancedBtn");
  if (advBtn) advBtn.addEventListener("click", startAdvanced);
  document.getElementById("homeBtn").addEventListener("click", () => {
    window.speechSynthesis?.cancel(); showScreen("home");
  });
  document.getElementById("playAgainBtn").addEventListener("click", () => {
    if (advancedMode) startAdvanced();
    else if (playAllMode) startPlayAll();
    else startSingleSound(currentSoundId);
  });
  document.getElementById("homeFromFinal").addEventListener("click", () => showScreen("home"));
  document.getElementById("soundBtn").addEventListener("click", () => {
    soundOn = !soundOn;
    document.getElementById("soundBtn").textContent = soundOn ? "🔊" : "🔇";
    if (vqVoice) {
      vqVoice.setEnabled(soundOn);
      if (!soundOn) vqVoice.stop();
    } else if (!soundOn && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  });

  // Init
  buildVowelGrid();
  applyTheme("O");

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
  }
})();
