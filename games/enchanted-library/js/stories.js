window.ENCHANTED_STORIES = {
  "title": "The Enchanted Library",
  "subtitle": "A choose-your-own-adventure book",
  "levels": {
    "easy": {
      "id": "easy",
      "label": "Picture Path",
      "blurb": "Short sentences \u00b7 big choices \u00b7 ages ~5\u20137",
      "worlds": [
        {
          "id": "forest",
          "title": "Forest Path",
          "start": "easy_forest_root",
          "endings": 7
        },
        {
          "id": "castle",
          "title": "Castle Door",
          "start": "easy_castle_root",
          "endings": 7
        },
        {
          "id": "sea",
          "title": "Sea Shell",
          "start": "easy_sea_root",
          "endings": 7
        },
        {
          "id": "stars",
          "title": "Star Ladder",
          "start": "easy_stars_root",
          "endings": 7
        }
      ]
    },
    "medium": {
      "id": "medium",
      "label": "Story Path",
      "blurb": "Richer sentences \u00b7 more branches \u00b7 ages ~7\u20139",
      "worlds": [
        {
          "id": "forest",
          "title": "Forest Path",
          "start": "medium_forest_root",
          "endings": 9
        },
        {
          "id": "castle",
          "title": "Castle Door",
          "start": "medium_castle_root",
          "endings": 9
        },
        {
          "id": "sea",
          "title": "Sea Shell",
          "start": "medium_sea_root",
          "endings": 9
        },
        {
          "id": "stars",
          "title": "Star Ladder",
          "start": "medium_stars_root",
          "endings": 9
        }
      ]
    },
    "hard": {
      "id": "hard",
      "label": "Chapter Path",
      "blurb": "Longer text \u00b7 deeper choices \u00b7 ages ~9\u201311",
      "worlds": [
        {
          "id": "forest",
          "title": "Forest Path",
          "start": "hard_forest_root",
          "endings": 9
        },
        {
          "id": "castle",
          "title": "Castle Door",
          "start": "hard_castle_root",
          "endings": 9
        },
        {
          "id": "sea",
          "title": "Sea Shell",
          "start": "hard_sea_root",
          "endings": 9
        },
        {
          "id": "stars",
          "title": "Star Ladder",
          "start": "hard_stars_root",
          "endings": 9
        }
      ]
    }
  },
  "hubs": {
    "easy": "You open a big magic book. Four glowing doors appear. Which door do you choose?",
    "medium": "The enchanted volume sighs open. Four doorways shimmer between the pages\u2014each a different adventure.",
    "hard": "Leather warm as sunlight, the tome unfolds into a foyer of stories. Four thresholds await your judgment."
  },
  "nodes": {
    "easy_forest_e4": {
      "text": "You make a new friend named Pip. You promise to meet again. The magical book glows once, then rests.",
      "ending": true,
      "scene": "treasure",
      "title": "A Happy Find"
    },
    "easy_forest_e5": {
      "text": "You open a chest and find story coins. You share it with everyone. You hear soft applause from the shelves.",
      "ending": true,
      "scene": "dragon_friend",
      "title": "Dragon Cookies"
    },
    "easy_forest_d3_ra0a0a0_3": {
      "text": "The path grows quieter. You hear a soft rustle.",
      "choices": [
        {
          "text": "Pick a red berry path",
          "next": "easy_forest_e4"
        },
        {
          "text": "Pick a blue flower path",
          "next": "easy_forest_e5"
        }
      ]
    },
    "easy_forest_e7": {
      "text": "You find a cozy path home. Soft rain taps the windows. A bookmark slips into place: THE END.",
      "ending": true,
      "scene": "castle",
      "title": "Magic Seed"
    },
    "easy_forest_e8": {
      "text": "A spark of magic grants you a kind word. You say thank you. Dust motes sparkle like tiny stars.",
      "ending": true,
      "scene": "forest_home",
      "title": "Glowing Path"
    },
    "easy_forest_d3_ra0a0b1_6": {
      "text": "The path grows quieter. You hear a soft rustle.",
      "choices": [
        {
          "text": "Pick a red berry path",
          "next": "easy_forest_e7"
        },
        {
          "text": "Pick a blue flower path",
          "next": "easy_forest_e8"
        }
      ]
    },
    "easy_forest_d2_ra0a0_2": {
      "text": "You find a wooden sign with arrows that wiggle.",
      "choices": [
        {
          "text": "Pick a red berry path",
          "next": "easy_forest_d3_ra0a0a0_3"
        },
        {
          "text": "Pick a blue flower path",
          "next": "easy_forest_d3_ra0a0b1_6"
        }
      ]
    },
    "easy_forest_e11": {
      "text": "You help a baby phoenix. They give you a smile and a seed packet. Somewhere, a page turns by itself\u2014happily.",
      "ending": true,
      "scene": "star_ship",
      "title": "Golden Feather"
    },
    "easy_forest_e12": {
      "text": "You learn that sharing makes joy grow. That is the real treasure. The magical book glows once, then rests.",
      "ending": true,
      "scene": "ocean_boat",
      "title": "Kitten Rescue"
    },
    "easy_forest_d3_ra0b1a0_10": {
      "text": "The path grows quieter. You hear a soft rustle.",
      "choices": [
        {
          "text": "Pick a red berry path",
          "next": "easy_forest_e11"
        },
        {
          "text": "Pick a blue flower path",
          "next": "easy_forest_e12"
        }
      ]
    },
    "easy_forest_e14": {
      "text": "You were brave when the cave was dark. The story remembers you. You hear soft applause from the shelves.",
      "ending": true,
      "scene": "library_return",
      "title": "Dancing Books"
    },
    "easy_forest_d3_ra0b1b1_13": {
      "text": "The path grows quieter. You hear a soft rustle.",
      "choices": [
        {
          "text": "Pick a red berry path",
          "next": "easy_forest_e14"
        }
      ]
    },
    "easy_forest_d2_ra0b1_9": {
      "text": "You find a wooden sign with arrows that wiggle.",
      "choices": [
        {
          "text": "Pick a red berry path",
          "next": "easy_forest_d3_ra0b1a0_10"
        },
        {
          "text": "Pick a blue flower path",
          "next": "easy_forest_d3_ra0b1b1_13"
        }
      ]
    },
    "easy_forest_d1_ra0_1": {
      "text": "Sunlight spots dance on the ground.",
      "choices": [
        {
          "text": "Climb a log",
          "next": "easy_forest_d2_ra0a0_2"
        },
        {
          "text": "Cross a stream",
          "next": "easy_forest_d2_ra0b1_9"
        }
      ]
    },
    "easy_forest_root": {
      "text": "You step onto a soft forest path. Birds chirp. A split in the trail appears.",
      "choices": [
        {
          "text": "Follow the rabbits",
          "next": "easy_forest_d1_ra0_1"
        }
      ]
    },
    "easy_castle_e4": {
      "text": "You create a new song. It becomes part of the library forever. A bookmark slips into place: THE END.",
      "ending": true,
      "scene": "feast",
      "title": "Shared Snack"
    },
    "easy_castle_e5": {
      "text": "You return to the library with a postcard from the stars. The book closes gently. Dust motes sparkle like tiny stars.",
      "ending": true,
      "scene": "crown",
      "title": "Picnic Map"
    },
    "easy_castle_d3_ra0a0a0_3": {
      "text": "Your footsteps echo. Someone has left a warm lantern.",
      "choices": [
        {
          "text": "Talk to a knight",
          "next": "easy_castle_e4"
        },
        {
          "text": "Talk to a cook",
          "next": "easy_castle_e5"
        }
      ]
    },
    "easy_castle_e7": {
      "text": "The adventure ends in peace. Pages flutter like wings. Somewhere, a page turns by itself\u2014happily.",
      "ending": true,
      "scene": "map",
      "title": "Fallen Star"
    },
    "easy_castle_e8": {
      "text": "You make a new friend named Pip. You promise to meet again. The magical book glows once, then rests.",
      "ending": true,
      "scene": "phoenix",
      "title": "Ant Helper"
    },
    "easy_castle_d3_ra0a0b1_6": {
      "text": "Your footsteps echo. Someone has left a warm lantern.",
      "choices": [
        {
          "text": "Talk to a knight",
          "next": "easy_castle_e7"
        },
        {
          "text": "Talk to a cook",
          "next": "easy_castle_e8"
        }
      ]
    },
    "easy_castle_d2_ra0a0_2": {
      "text": "You pass a painting that seems to wink.",
      "choices": [
        {
          "text": "Talk to a knight",
          "next": "easy_castle_d3_ra0a0a0_3"
        },
        {
          "text": "Talk to a cook",
          "next": "easy_castle_d3_ra0a0b1_6"
        }
      ]
    },
    "easy_castle_e11": {
      "text": "You open a chest and find story coins. You share it with everyone. You hear soft applause from the shelves.",
      "ending": true,
      "scene": "unicorn",
      "title": "Quiet Nook"
    },
    "easy_castle_e12": {
      "text": "You find a cozy path home. Soft rain taps the windows. A bookmark slips into place: THE END.",
      "ending": true,
      "scene": "wizard",
      "title": "Rainbow Cocoa"
    },
    "easy_castle_d3_ra0b1a0_10": {
      "text": "Your footsteps echo. Someone has left a warm lantern.",
      "choices": [
        {
          "text": "Talk to a knight",
          "next": "easy_castle_e11"
        },
        {
          "text": "Talk to a cook",
          "next": "easy_castle_e12"
        }
      ]
    },
    "easy_castle_e14": {
      "text": "A spark of magic grants you a kind word. You say thank you. Dust motes sparkle like tiny stars.",
      "ending": true,
      "scene": "garden",
      "title": "Returned Book"
    },
    "easy_castle_d3_ra0b1b1_13": {
      "text": "Your footsteps echo. Someone has left a warm lantern.",
      "choices": [
        {
          "text": "Talk to a knight",
          "next": "easy_castle_e14"
        }
      ]
    },
    "easy_castle_d2_ra0b1_9": {
      "text": "You pass a painting that seems to wink.",
      "choices": [
        {
          "text": "Talk to a knight",
          "next": "easy_castle_d3_ra0b1a0_10"
        },
        {
          "text": "Talk to a cook",
          "next": "easy_castle_d3_ra0b1b1_13"
        }
      ]
    },
    "easy_castle_d1_ra0_1": {
      "text": "A cat watches from a windowsill.",
      "choices": [
        {
          "text": "Open a big door",
          "next": "easy_castle_d2_ra0a0_2"
        },
        {
          "text": "Open a small door",
          "next": "easy_castle_d2_ra0b1_9"
        }
      ]
    },
    "easy_castle_root": {
      "text": "A little castle door opens. Inside it is bright. You see two hallways.",
      "choices": [
        {
          "text": "Go left",
          "next": "easy_castle_d1_ra0_1"
        }
      ]
    },
    "easy_sea_e4": {
      "text": "You help a baby phoenix. They give you a smile and a seed packet. Somewhere, a page turns by itself\u2014happily.",
      "ending": true,
      "scene": "mountain",
      "title": "Pillow Fort"
    },
    "easy_sea_e5": {
      "text": "You learn that sharing makes joy grow. That is the real treasure. The magical book glows once, then rests.",
      "ending": true,
      "scene": "cave_light",
      "title": "Joke Plane"
    },
    "easy_sea_d3_ra0a0a0_3": {
      "text": "Water sparkles. Something shiny moves below.",
      "choices": [
        {
          "text": "Follow a seagull",
          "next": "easy_sea_e4"
        },
        {
          "text": "Follow a crab",
          "next": "easy_sea_e5"
        }
      ]
    },
    "easy_sea_e7": {
      "text": "You were brave when the cave was dark. The story remembers you. You hear soft applause from the shelves.",
      "ending": true,
      "scene": "bridge",
      "title": "Bubble Boat"
    },
    "easy_sea_e8": {
      "text": "You create a new song. It becomes part of the library forever. A bookmark slips into place: THE END.",
      "ending": true,
      "scene": "village",
      "title": "Kindness Riddle"
    },
    "easy_sea_d3_ra0a0b1_6": {
      "text": "Water sparkles. Something shiny moves below.",
      "choices": [
        {
          "text": "Follow a seagull",
          "next": "easy_sea_e7"
        },
        {
          "text": "Follow a crab",
          "next": "easy_sea_e8"
        }
      ]
    },
    "easy_sea_d2_ra0a0_2": {
      "text": "A bottle floats by with a blank note\u2014waiting for you.",
      "choices": [
        {
          "text": "Follow a seagull",
          "next": "easy_sea_d3_ra0a0a0_3"
        },
        {
          "text": "Follow a crab",
          "next": "easy_sea_d3_ra0a0b1_6"
        }
      ]
    },
    "easy_sea_e11": {
      "text": "You return to the library with a postcard from the stars. The book closes gently. Dust motes sparkle like tiny stars.",
      "ending": true,
      "scene": "moon",
      "title": "Lucky Sock"
    },
    "easy_sea_e12": {
      "text": "The adventure ends in peace. Pages flutter like wings. Somewhere, a page turns by itself\u2014happily.",
      "ending": true,
      "scene": "sun",
      "title": "Squirrel High-Five"
    },
    "easy_sea_d3_ra0b1a0_10": {
      "text": "Water sparkles. Something shiny moves below.",
      "choices": [
        {
          "text": "Follow a seagull",
          "next": "easy_sea_e11"
        },
        {
          "text": "Follow a crab",
          "next": "easy_sea_e12"
        }
      ]
    },
    "easy_sea_e14": {
      "text": "You make a new friend named Pip. You promise to meet again. The magical book glows once, then rests.",
      "ending": true,
      "scene": "treasure",
      "title": "Butterfly Door"
    },
    "easy_sea_d3_ra0b1b1_13": {
      "text": "Water sparkles. Something shiny moves below.",
      "choices": [
        {
          "text": "Follow a seagull",
          "next": "easy_sea_e14"
        }
      ]
    },
    "easy_sea_d2_ra0b1_9": {
      "text": "A bottle floats by with a blank note\u2014waiting for you.",
      "choices": [
        {
          "text": "Follow a seagull",
          "next": "easy_sea_d3_ra0b1a0_10"
        },
        {
          "text": "Follow a crab",
          "next": "easy_sea_d3_ra0b1b1_13"
        }
      ]
    },
    "easy_sea_d1_ra0_1": {
      "text": "The air smells like salt and adventure.",
      "choices": [
        {
          "text": "Wave to a dolphin",
          "next": "easy_sea_d2_ra0a0_2"
        },
        {
          "text": "Collect shells",
          "next": "easy_sea_d2_ra0b1_9"
        }
      ]
    },
    "easy_sea_root": {
      "text": "You stand on warm sand. Waves say hello. A boat and a cave wait.",
      "choices": [
        {
          "text": "Take the boat",
          "next": "easy_sea_d1_ra0_1"
        }
      ]
    },
    "easy_stars_e4": {
      "text": "You open a chest and find story coins. You share it with everyone. You hear soft applause from the shelves.",
      "ending": true,
      "scene": "dragon_friend",
      "title": "Heart Bloom"
    },
    "easy_stars_e5": {
      "text": "You find a cozy path home. Soft rain taps the windows. A bookmark slips into place: THE END.",
      "ending": true,
      "scene": "castle",
      "title": "Wind Secret"
    },
    "easy_stars_d3_ra0a0a0_3": {
      "text": "The air feels light, as if gravity is telling jokes.",
      "choices": [
        {
          "text": "Visit a tiny planet",
          "next": "easy_stars_e4"
        },
        {
          "text": "Ride a soft cloud",
          "next": "easy_stars_e5"
        }
      ]
    },
    "easy_stars_e7": {
      "text": "A spark of magic grants you a kind word. You say thank you. Dust motes sparkle like tiny stars.",
      "ending": true,
      "scene": "forest_home",
      "title": "Soft Blanket"
    },
    "easy_stars_e8": {
      "text": "You help a baby phoenix. They give you a smile and a seed packet. Somewhere, a page turns by itself\u2014happily.",
      "ending": true,
      "scene": "star_ship",
      "title": "Confetti Noon"
    },
    "easy_stars_d3_ra0a0b1_6": {
      "text": "The air feels light, as if gravity is telling jokes.",
      "choices": [
        {
          "text": "Visit a tiny planet",
          "next": "easy_stars_e7"
        },
        {
          "text": "Ride a soft cloud",
          "next": "easy_stars_e8"
        }
      ]
    },
    "easy_stars_d2_ra0a0_2": {
      "text": "You hear the faint tick of a cosmic clock.",
      "choices": [
        {
          "text": "Visit a tiny planet",
          "next": "easy_stars_d3_ra0a0a0_3"
        },
        {
          "text": "Ride a soft cloud",
          "next": "easy_stars_d3_ra0a0b1_6"
        }
      ]
    },
    "easy_stars_e11": {
      "text": "You learn that sharing makes joy grow. That is the real treasure. The magical book glows once, then rests.",
      "ending": true,
      "scene": "ocean_boat",
      "title": "New Friend"
    },
    "easy_stars_e12": {
      "text": "You were brave when the cave was dark. The story remembers you. You hear soft applause from the shelves.",
      "ending": true,
      "scene": "library_return",
      "title": "Shared Treasure"
    },
    "easy_stars_d3_ra0b1a0_10": {
      "text": "The air feels light, as if gravity is telling jokes.",
      "choices": [
        {
          "text": "Visit a tiny planet",
          "next": "easy_stars_e11"
        },
        {
          "text": "Ride a soft cloud",
          "next": "easy_stars_e12"
        }
      ]
    },
    "easy_stars_e14": {
      "text": "You create a new song. It becomes part of the library forever. A bookmark slips into place: THE END.",
      "ending": true,
      "scene": "feast",
      "title": "Cozy Home"
    },
    "easy_stars_d3_ra0b1b1_13": {
      "text": "The air feels light, as if gravity is telling jokes.",
      "choices": [
        {
          "text": "Visit a tiny planet",
          "next": "easy_stars_e14"
        }
      ]
    },
    "easy_stars_d2_ra0b1_9": {
      "text": "You hear the faint tick of a cosmic clock.",
      "choices": [
        {
          "text": "Visit a tiny planet",
          "next": "easy_stars_d3_ra0b1a0_10"
        },
        {
          "text": "Ride a soft cloud",
          "next": "easy_stars_d3_ra0b1b1_13"
        }
      ]
    },
    "easy_stars_d1_ra0_1": {
      "text": "A constellation rearranges into a smile.",
      "choices": [
        {
          "text": "Count the stars",
          "next": "easy_stars_d2_ra0a0_2"
        },
        {
          "text": "Catch a spark",
          "next": "easy_stars_d2_ra0b1_9"
        }
      ]
    },
    "easy_stars_root": {
      "text": "A ladder of light climbs into the night. Planets wink. Two floating paths appear.",
      "choices": [
        {
          "text": "Path of the moon",
          "next": "easy_stars_d1_ra0_1"
        }
      ]
    },
    "medium_forest_e4": {
      "text": "You return to the library with a postcard from the stars. The book closes gently. Dust motes sparkle like tiny stars.",
      "ending": true,
      "scene": "crown",
      "title": "Spark Gift"
    },
    "medium_forest_e5": {
      "text": "The adventure ends in peace. Pages flutter like wings. Somewhere, a page turns by itself\u2014happily.",
      "ending": true,
      "scene": "map",
      "title": "Helping Hand"
    },
    "medium_forest_d3_ra0a0a0_3": {
      "text": "The path grows quieter. You hear a soft rustle.",
      "choices": [
        {
          "text": "Share your lunch with a fox",
          "next": "medium_forest_e4"
        },
        {
          "text": "Keep walking quietly",
          "next": "medium_forest_e5"
        }
      ]
    },
    "medium_forest_e7": {
      "text": "You make a new friend named Pip. You promise to meet again. The magical book glows once, then rests.",
      "ending": true,
      "scene": "phoenix",
      "title": "True Lesson"
    },
    "medium_forest_e8": {
      "text": "You open a chest and find story coins. You share it with everyone. You hear soft applause from the shelves.",
      "ending": true,
      "scene": "unicorn",
      "title": "Brave Memory"
    },
    "medium_forest_d3_ra0a0b1_6": {
      "text": "The path grows quieter. You hear a soft rustle.",
      "choices": [
        {
          "text": "Share your lunch with a fox",
          "next": "medium_forest_e7"
        },
        {
          "text": "Keep walking quietly",
          "next": "medium_forest_e8"
        }
      ]
    },
    "medium_forest_d2_ra0a0_2": {
      "text": "You find a wooden sign with arrows that wiggle.",
      "choices": [
        {
          "text": "Share your lunch with a fox",
          "next": "medium_forest_d3_ra0a0a0_3"
        },
        {
          "text": "Keep walking quietly",
          "next": "medium_forest_d3_ra0a0b1_6"
        }
      ]
    },
    "medium_forest_e11": {
      "text": "You find a cozy path home. Soft rain taps the windows. A bookmark slips into place: THE END.",
      "ending": true,
      "scene": "wizard",
      "title": "Library Art"
    },
    "medium_forest_e12": {
      "text": "A spark of magic grants you a kind word. You say thank you. Dust motes sparkle like tiny stars.",
      "ending": true,
      "scene": "garden",
      "title": "Gentle Close"
    },
    "medium_forest_d3_ra0b1a0_10": {
      "text": "The path grows quieter. You hear a soft rustle.",
      "choices": [
        {
          "text": "Share your lunch with a fox",
          "next": "medium_forest_e11"
        },
        {
          "text": "Keep walking quietly",
          "next": "medium_forest_e12"
        }
      ]
    },
    "medium_forest_e14": {
      "text": "You help a baby phoenix. They give you a smile and a seed packet. Somewhere, a page turns by itself\u2014happily.",
      "ending": true,
      "scene": "mountain",
      "title": "Peaceful End"
    },
    "medium_forest_e15": {
      "text": "You learn that sharing makes joy grow. That is the real treasure. The magical book glows once, then rests.",
      "ending": true,
      "scene": "cave_light",
      "title": "A Happy Find"
    },
    "medium_forest_d3_ra0b1b1_13": {
      "text": "The path grows quieter. You hear a soft rustle.",
      "choices": [
        {
          "text": "Share your lunch with a fox",
          "next": "medium_forest_e14"
        },
        {
          "text": "Keep walking quietly",
          "next": "medium_forest_e15"
        }
      ]
    },
    "medium_forest_d2_ra0b1_9": {
      "text": "You find a wooden sign with arrows that wiggle.",
      "choices": [
        {
          "text": "Share your lunch with a fox",
          "next": "medium_forest_d3_ra0b1a0_10"
        },
        {
          "text": "Keep walking quietly",
          "next": "medium_forest_d3_ra0b1b1_13"
        }
      ]
    },
    "medium_forest_d1_ra0_1": {
      "text": "Sunlight spots dance on the ground.",
      "choices": [
        {
          "text": "Ask the woodpecker for advice",
          "next": "medium_forest_d2_ra0a0_2"
        },
        {
          "text": "Check the hollow tree",
          "next": "medium_forest_d2_ra0b1_9"
        }
      ]
    },
    "medium_forest_e18": {
      "text": "You were brave when the cave was dark. The story remembers you. You hear soft applause from the shelves.",
      "ending": true,
      "scene": "bridge",
      "title": "Dragon Cookies"
    },
    "medium_forest_d2_rb1a0_17": {
      "text": "You find a wooden sign with arrows that wiggle.",
      "choices": [
        {
          "text": "Share your lunch with a fox",
          "next": "medium_forest_e18"
        }
      ]
    },
    "medium_forest_d1_rb1_16": {
      "text": "Sunlight spots dance on the ground.",
      "choices": [
        {
          "text": "Ask the woodpecker for advice",
          "next": "medium_forest_d2_rb1a0_17"
        }
      ]
    },
    "medium_forest_root": {
      "text": "Moss cushions your steps as you enter the Whispering Woods. Two trails wind between the oaks.",
      "choices": [
        {
          "text": "Take the sunlit trail",
          "next": "medium_forest_d1_ra0_1"
        },
        {
          "text": "Take the shaded trail",
          "next": "medium_forest_d1_rb1_16"
        }
      ]
    },
    "medium_castle_e4": {
      "text": "You create a new song. It becomes part of the library forever. A bookmark slips into place: THE END.",
      "ending": true,
      "scene": "village",
      "title": "Magic Seed"
    },
    "medium_castle_e5": {
      "text": "You return to the library with a postcard from the stars. The book closes gently. Dust motes sparkle like tiny stars.",
      "ending": true,
      "scene": "moon",
      "title": "Glowing Path"
    },
    "medium_castle_d3_ra0a0a0_3": {
      "text": "Your footsteps echo. Someone has left a warm lantern.",
      "choices": [
        {
          "text": "Accept a quest from the page",
          "next": "medium_castle_e4"
        },
        {
          "text": "Offer to help the steward",
          "next": "medium_castle_e5"
        }
      ]
    },
    "medium_castle_e7": {
      "text": "The adventure ends in peace. Pages flutter like wings. Somewhere, a page turns by itself\u2014happily.",
      "ending": true,
      "scene": "sun",
      "title": "Golden Feather"
    },
    "medium_castle_e8": {
      "text": "You make a new friend named Pip. You promise to meet again. The magical book glows once, then rests.",
      "ending": true,
      "scene": "treasure",
      "title": "Kitten Rescue"
    },
    "medium_castle_d3_ra0a0b1_6": {
      "text": "Your footsteps echo. Someone has left a warm lantern.",
      "choices": [
        {
          "text": "Accept a quest from the page",
          "next": "medium_castle_e7"
        },
        {
          "text": "Offer to help the steward",
          "next": "medium_castle_e8"
        }
      ]
    },
    "medium_castle_d2_ra0a0_2": {
      "text": "You pass a painting that seems to wink.",
      "choices": [
        {
          "text": "Accept a quest from the page",
          "next": "medium_castle_d3_ra0a0a0_3"
        },
        {
          "text": "Offer to help the steward",
          "next": "medium_castle_d3_ra0a0b1_6"
        }
      ]
    },
    "medium_castle_e11": {
      "text": "You open a chest and find story coins. You share it with everyone. You hear soft applause from the shelves.",
      "ending": true,
      "scene": "dragon_friend",
      "title": "Dancing Books"
    },
    "medium_castle_e12": {
      "text": "You find a cozy path home. Soft rain taps the windows. A bookmark slips into place: THE END.",
      "ending": true,
      "scene": "castle",
      "title": "Shared Snack"
    },
    "medium_castle_d3_ra0b1a0_10": {
      "text": "Your footsteps echo. Someone has left a warm lantern.",
      "choices": [
        {
          "text": "Accept a quest from the page",
          "next": "medium_castle_e11"
        },
        {
          "text": "Offer to help the steward",
          "next": "medium_castle_e12"
        }
      ]
    },
    "medium_castle_e14": {
      "text": "A spark of magic grants you a kind word. You say thank you. Dust motes sparkle like tiny stars.",
      "ending": true,
      "scene": "forest_home",
      "title": "Picnic Map"
    },
    "medium_castle_e15": {
      "text": "You help a baby phoenix. They give you a smile and a seed packet. Somewhere, a page turns by itself\u2014happily.",
      "ending": true,
      "scene": "star_ship",
      "title": "Fallen Star"
    },
    "medium_castle_d3_ra0b1b1_13": {
      "text": "Your footsteps echo. Someone has left a warm lantern.",
      "choices": [
        {
          "text": "Accept a quest from the page",
          "next": "medium_castle_e14"
        },
        {
          "text": "Offer to help the steward",
          "next": "medium_castle_e15"
        }
      ]
    },
    "medium_castle_d2_ra0b1_9": {
      "text": "You pass a painting that seems to wink.",
      "choices": [
        {
          "text": "Accept a quest from the page",
          "next": "medium_castle_d3_ra0b1a0_10"
        },
        {
          "text": "Offer to help the steward",
          "next": "medium_castle_d3_ra0b1b1_13"
        }
      ]
    },
    "medium_castle_d1_ra0_1": {
      "text": "A cat watches from a windowsill.",
      "choices": [
        {
          "text": "Read a wall tapestry",
          "next": "medium_castle_d2_ra0a0_2"
        },
        {
          "text": "Polish a dusty shield",
          "next": "medium_castle_d2_ra0b1_9"
        }
      ]
    },
    "medium_castle_e18": {
      "text": "You learn that sharing makes joy grow. That is the real treasure. The magical book glows once, then rests.",
      "ending": true,
      "scene": "ocean_boat",
      "title": "Ant Helper"
    },
    "medium_castle_d2_rb1a0_17": {
      "text": "You pass a painting that seems to wink.",
      "choices": [
        {
          "text": "Accept a quest from the page",
          "next": "medium_castle_e18"
        }
      ]
    },
    "medium_castle_d1_rb1_16": {
      "text": "A cat watches from a windowsill.",
      "choices": [
        {
          "text": "Read a wall tapestry",
          "next": "medium_castle_d2_rb1a0_17"
        }
      ]
    },
    "medium_castle_root": {
      "text": "Torchlight flickers on stone walls. The castle hall splits left and right.",
      "choices": [
        {
          "text": "Climb the tower stairs",
          "next": "medium_castle_d1_ra0_1"
        },
        {
          "text": "Visit the great hall",
          "next": "medium_castle_d1_rb1_16"
        }
      ]
    },
    "medium_sea_e4": {
      "text": "You were brave when the cave was dark. The story remembers you. You hear soft applause from the shelves.",
      "ending": true,
      "scene": "library_return",
      "title": "Quiet Nook"
    },
    "medium_sea_e5": {
      "text": "You create a new song. It becomes part of the library forever. A bookmark slips into place: THE END.",
      "ending": true,
      "scene": "feast",
      "title": "Rainbow Cocoa"
    },
    "medium_sea_d3_ra0a0a0_3": {
      "text": "Water sparkles. Something shiny moves below.",
      "choices": [
        {
          "text": "Trade with a fisher",
          "next": "medium_sea_e4"
        },
        {
          "text": "Repair a net",
          "next": "medium_sea_e5"
        }
      ]
    },
    "medium_sea_e7": {
      "text": "You return to the library with a postcard from the stars. The book closes gently. Dust motes sparkle like tiny stars.",
      "ending": true,
      "scene": "crown",
      "title": "Returned Book"
    },
    "medium_sea_e8": {
      "text": "The adventure ends in peace. Pages flutter like wings. Somewhere, a page turns by itself\u2014happily.",
      "ending": true,
      "scene": "map",
      "title": "Pillow Fort"
    },
    "medium_sea_d3_ra0a0b1_6": {
      "text": "Water sparkles. Something shiny moves below.",
      "choices": [
        {
          "text": "Trade with a fisher",
          "next": "medium_sea_e7"
        },
        {
          "text": "Repair a net",
          "next": "medium_sea_e8"
        }
      ]
    },
    "medium_sea_d2_ra0a0_2": {
      "text": "A bottle floats by with a blank note\u2014waiting for you.",
      "choices": [
        {
          "text": "Trade with a fisher",
          "next": "medium_sea_d3_ra0a0a0_3"
        },
        {
          "text": "Repair a net",
          "next": "medium_sea_d3_ra0a0b1_6"
        }
      ]
    },
    "medium_sea_e11": {
      "text": "You make a new friend named Pip. You promise to meet again. The magical book glows once, then rests.",
      "ending": true,
      "scene": "phoenix",
      "title": "Joke Plane"
    },
    "medium_sea_e12": {
      "text": "You open a chest and find story coins. You share it with everyone. You hear soft applause from the shelves.",
      "ending": true,
      "scene": "unicorn",
      "title": "Bubble Boat"
    },
    "medium_sea_d3_ra0b1a0_10": {
      "text": "Water sparkles. Something shiny moves below.",
      "choices": [
        {
          "text": "Trade with a fisher",
          "next": "medium_sea_e11"
        },
        {
          "text": "Repair a net",
          "next": "medium_sea_e12"
        }
      ]
    },
    "medium_sea_e14": {
      "text": "You find a cozy path home. Soft rain taps the windows. A bookmark slips into place: THE END.",
      "ending": true,
      "scene": "wizard",
      "title": "Kindness Riddle"
    },
    "medium_sea_e15": {
      "text": "A spark of magic grants you a kind word. You say thank you. Dust motes sparkle like tiny stars.",
      "ending": true,
      "scene": "garden",
      "title": "Lucky Sock"
    },
    "medium_sea_d3_ra0b1b1_13": {
      "text": "Water sparkles. Something shiny moves below.",
      "choices": [
        {
          "text": "Trade with a fisher",
          "next": "medium_sea_e14"
        },
        {
          "text": "Repair a net",
          "next": "medium_sea_e15"
        }
      ]
    },
    "medium_sea_d2_ra0b1_9": {
      "text": "A bottle floats by with a blank note\u2014waiting for you.",
      "choices": [
        {
          "text": "Trade with a fisher",
          "next": "medium_sea_d3_ra0b1a0_10"
        },
        {
          "text": "Repair a net",
          "next": "medium_sea_d3_ra0b1b1_13"
        }
      ]
    },
    "medium_sea_d1_ra0_1": {
      "text": "The air smells like salt and adventure.",
      "choices": [
        {
          "text": "Dive for a glimmer",
          "next": "medium_sea_d2_ra0a0_2"
        },
        {
          "text": "Stay on the surface",
          "next": "medium_sea_d2_ra0b1_9"
        }
      ]
    },
    "medium_sea_e18": {
      "text": "You help a baby phoenix. They give you a smile and a seed packet. Somewhere, a page turns by itself\u2014happily.",
      "ending": true,
      "scene": "mountain",
      "title": "Squirrel High-Five"
    },
    "medium_sea_d2_rb1a0_17": {
      "text": "A bottle floats by with a blank note\u2014waiting for you.",
      "choices": [
        {
          "text": "Trade with a fisher",
          "next": "medium_sea_e18"
        }
      ]
    },
    "medium_sea_d1_rb1_16": {
      "text": "The air smells like salt and adventure.",
      "choices": [
        {
          "text": "Dive for a glimmer",
          "next": "medium_sea_d2_rb1a0_17"
        }
      ]
    },
    "medium_sea_root": {
      "text": "Salt air tangles your hair. A pier points to open water; a tide pool glints nearby.",
      "choices": [
        {
          "text": "Row toward the island",
          "next": "medium_sea_d1_ra0_1"
        },
        {
          "text": "Study the tide pool",
          "next": "medium_sea_d1_rb1_16"
        }
      ]
    },
    "medium_stars_e4": {
      "text": "You learn that sharing makes joy grow. That is the real treasure. The magical book glows once, then rests.",
      "ending": true,
      "scene": "cave_light",
      "title": "Butterfly Door"
    },
    "medium_stars_e5": {
      "text": "You were brave when the cave was dark. The story remembers you. You hear soft applause from the shelves.",
      "ending": true,
      "scene": "bridge",
      "title": "Heart Bloom"
    },
    "medium_stars_d3_ra0a0a0_3": {
      "text": "The air feels light, as if gravity is telling jokes.",
      "choices": [
        {
          "text": "Share tea with an astronaut owl",
          "next": "medium_stars_e4"
        },
        {
          "text": "Repair a satellite with stickers",
          "next": "medium_stars_e5"
        }
      ]
    },
    "medium_stars_e7": {
      "text": "You create a new song. It becomes part of the library forever. A bookmark slips into place: THE END.",
      "ending": true,
      "scene": "village",
      "title": "Wind Secret"
    },
    "medium_stars_e8": {
      "text": "You return to the library with a postcard from the stars. The book closes gently. Dust motes sparkle like tiny stars.",
      "ending": true,
      "scene": "moon",
      "title": "Soft Blanket"
    },
    "medium_stars_d3_ra0a0b1_6": {
      "text": "The air feels light, as if gravity is telling jokes.",
      "choices": [
        {
          "text": "Share tea with an astronaut owl",
          "next": "medium_stars_e7"
        },
        {
          "text": "Repair a satellite with stickers",
          "next": "medium_stars_e8"
        }
      ]
    },
    "medium_stars_d2_ra0a0_2": {
      "text": "You hear the faint tick of a cosmic clock.",
      "choices": [
        {
          "text": "Share tea with an astronaut owl",
          "next": "medium_stars_d3_ra0a0a0_3"
        },
        {
          "text": "Repair a satellite with stickers",
          "next": "medium_stars_d3_ra0a0b1_6"
        }
      ]
    },
    "medium_stars_e11": {
      "text": "The adventure ends in peace. Pages flutter like wings. Somewhere, a page turns by itself\u2014happily.",
      "ending": true,
      "scene": "sun",
      "title": "Confetti Noon"
    },
    "medium_stars_e12": {
      "text": "You make a new friend named Pip. You promise to meet again. The magical book glows once, then rests.",
      "ending": true,
      "scene": "treasure",
      "title": "New Friend"
    },
    "medium_stars_d3_ra0b1a0_10": {
      "text": "The air feels light, as if gravity is telling jokes.",
      "choices": [
        {
          "text": "Share tea with an astronaut owl",
          "next": "medium_stars_e11"
        },
        {
          "text": "Repair a satellite with stickers",
          "next": "medium_stars_e12"
        }
      ]
    },
    "medium_stars_e14": {
      "text": "You open a chest and find story coins. You share it with everyone. You hear soft applause from the shelves.",
      "ending": true,
      "scene": "dragon_friend",
      "title": "Shared Treasure"
    },
    "medium_stars_e15": {
      "text": "You find a cozy path home. Soft rain taps the windows. A bookmark slips into place: THE END.",
      "ending": true,
      "scene": "castle",
      "title": "Cozy Home"
    },
    "medium_stars_d3_ra0b1b1_13": {
      "text": "The air feels light, as if gravity is telling jokes.",
      "choices": [
        {
          "text": "Share tea with an astronaut owl",
          "next": "medium_stars_e14"
        },
        {
          "text": "Repair a satellite with stickers",
          "next": "medium_stars_e15"
        }
      ]
    },
    "medium_stars_d2_ra0b1_9": {
      "text": "You hear the faint tick of a cosmic clock.",
      "choices": [
        {
          "text": "Share tea with an astronaut owl",
          "next": "medium_stars_d3_ra0b1a0_10"
        },
        {
          "text": "Repair a satellite with stickers",
          "next": "medium_stars_d3_ra0b1b1_13"
        }
      ]
    },
    "medium_stars_d1_ra0_1": {
      "text": "A constellation rearranges into a smile.",
      "choices": [
        {
          "text": "Name a new constellation",
          "next": "medium_stars_d2_ra0a0_2"
        },
        {
          "text": "Listen to radio static from space",
          "next": "medium_stars_d2_ra0b1_9"
        }
      ]
    },
    "medium_stars_e18": {
      "text": "A spark of magic grants you a kind word. You say thank you. Dust motes sparkle like tiny stars.",
      "ending": true,
      "scene": "forest_home",
      "title": "Spark Gift"
    },
    "medium_stars_d2_rb1a0_17": {
      "text": "You hear the faint tick of a cosmic clock.",
      "choices": [
        {
          "text": "Share tea with an astronaut owl",
          "next": "medium_stars_e18"
        }
      ]
    },
    "medium_stars_d1_rb1_16": {
      "text": "A constellation rearranges into a smile.",
      "choices": [
        {
          "text": "Name a new constellation",
          "next": "medium_stars_d2_rb1a0_17"
        }
      ]
    },
    "medium_stars_root": {
      "text": "Constellations rearrange into arrows. One points to a moon bridge; one to a comet trail.",
      "choices": [
        {
          "text": "Cross the moon bridge",
          "next": "medium_stars_d1_ra0_1"
        },
        {
          "text": "Chase the comet trail",
          "next": "medium_stars_d1_rb1_16"
        }
      ]
    },
    "hard_forest_e4": {
      "text": "You help a baby phoenix. They give you a smile and a seed packet. Somewhere, a page turns by itself\u2014happily.",
      "ending": true,
      "scene": "star_ship",
      "title": "Helping Hand"
    },
    "hard_forest_e5": {
      "text": "You learn that sharing makes joy grow. That is the real treasure. The magical book glows once, then rests.",
      "ending": true,
      "scene": "ocean_boat",
      "title": "True Lesson"
    },
    "hard_forest_d3_ra0a0a0_3": {
      "text": "The path grows quieter. You hear a soft rustle.",
      "choices": [
        {
          "text": "Trust the northern birds",
          "next": "hard_forest_e4"
        },
        {
          "text": "Trust your own map sketch",
          "next": "hard_forest_e5"
        }
      ]
    },
    "hard_forest_e7": {
      "text": "You were brave when the cave was dark. The story remembers you. You hear soft applause from the shelves.",
      "ending": true,
      "scene": "library_return",
      "title": "Brave Memory"
    },
    "hard_forest_e8": {
      "text": "You create a new song. It becomes part of the library forever. A bookmark slips into place: THE END.",
      "ending": true,
      "scene": "feast",
      "title": "Library Art"
    },
    "hard_forest_d3_ra0a0b1_6": {
      "text": "The path grows quieter. You hear a soft rustle.",
      "choices": [
        {
          "text": "Trust the northern birds",
          "next": "hard_forest_e7"
        },
        {
          "text": "Trust your own map sketch",
          "next": "hard_forest_e8"
        }
      ]
    },
    "hard_forest_e10": {
      "text": "You return to the library with a postcard from the stars. The book closes gently. Dust motes sparkle like tiny stars.",
      "ending": true,
      "scene": "crown",
      "title": "Gentle Close"
    },
    "hard_forest_e11": {
      "text": "The adventure ends in peace. Pages flutter like wings. Somewhere, a page turns by itself\u2014happily.",
      "ending": true,
      "scene": "map",
      "title": "Peaceful End"
    },
    "hard_forest_d3_ra0a0c2_9": {
      "text": "The path grows quieter. You hear a soft rustle.",
      "choices": [
        {
          "text": "Trust the northern birds",
          "next": "hard_forest_e10"
        },
        {
          "text": "Trust your own map sketch",
          "next": "hard_forest_e11"
        }
      ]
    },
    "hard_forest_d2_ra0a0_2": {
      "text": "You find a wooden sign with arrows that wiggle.",
      "choices": [
        {
          "text": "Trust the northern birds",
          "next": "hard_forest_d3_ra0a0a0_3"
        },
        {
          "text": "Trust your own map sketch",
          "next": "hard_forest_d3_ra0a0b1_6"
        },
        {
          "text": "Wait for the wind\u2019s hint",
          "next": "hard_forest_d3_ra0a0c2_9"
        }
      ]
    },
    "hard_forest_e14": {
      "text": "You make a new friend named Pip. You promise to meet again. The magical book glows once, then rests.",
      "ending": true,
      "scene": "phoenix",
      "title": "A Happy Find"
    },
    "hard_forest_e15": {
      "text": "You open a chest and find story coins. You share it with everyone. You hear soft applause from the shelves.",
      "ending": true,
      "scene": "unicorn",
      "title": "Dragon Cookies"
    },
    "hard_forest_d3_ra0b1a0_13": {
      "text": "The path grows quieter. You hear a soft rustle.",
      "choices": [
        {
          "text": "Trust the northern birds",
          "next": "hard_forest_e14"
        },
        {
          "text": "Trust your own map sketch",
          "next": "hard_forest_e15"
        }
      ]
    },
    "hard_forest_e17": {
      "text": "You find a cozy path home. Soft rain taps the windows. A bookmark slips into place: THE END.",
      "ending": true,
      "scene": "wizard",
      "title": "Magic Seed"
    },
    "hard_forest_d3_ra0b1b1_16": {
      "text": "The path grows quieter. You hear a soft rustle.",
      "choices": [
        {
          "text": "Trust the northern birds",
          "next": "hard_forest_e17"
        }
      ]
    },
    "hard_forest_d2_ra0b1_12": {
      "text": "You find a wooden sign with arrows that wiggle.",
      "choices": [
        {
          "text": "Trust the northern birds",
          "next": "hard_forest_d3_ra0b1a0_13"
        },
        {
          "text": "Trust your own map sketch",
          "next": "hard_forest_d3_ra0b1b1_16"
        }
      ]
    },
    "hard_forest_d1_ra0_1": {
      "text": "Sunlight spots dance on the ground.",
      "choices": [
        {
          "text": "Bargain with a dryad",
          "next": "hard_forest_d2_ra0a0_2"
        },
        {
          "text": "Leave an offering of stories",
          "next": "hard_forest_d2_ra0b1_12"
        }
      ]
    },
    "hard_forest_root": {
      "text": "Ancient trees lean together like old scholars. The Whispering Woods offer three routes, each humming a different secret.",
      "choices": [
        {
          "text": "Decode the bark runes",
          "next": "hard_forest_d1_ra0_1"
        }
      ]
    },
    "hard_castle_e4": {
      "text": "A spark of magic grants you a kind word. You say thank you. Dust motes sparkle like tiny stars.",
      "ending": true,
      "scene": "garden",
      "title": "Glowing Path"
    },
    "hard_castle_e5": {
      "text": "You help a baby phoenix. They give you a smile and a seed packet. Somewhere, a page turns by itself\u2014happily.",
      "ending": true,
      "scene": "mountain",
      "title": "Golden Feather"
    },
    "hard_castle_d3_ra0a0a0_3": {
      "text": "Your footsteps echo. Someone has left a warm lantern.",
      "choices": [
        {
          "text": "Restore a torn banner",
          "next": "hard_castle_e4"
        },
        {
          "text": "Return a lost signet",
          "next": "hard_castle_e5"
        }
      ]
    },
    "hard_castle_e7": {
      "text": "You learn that sharing makes joy grow. That is the real treasure. The magical book glows once, then rests.",
      "ending": true,
      "scene": "cave_light",
      "title": "Kitten Rescue"
    },
    "hard_castle_e8": {
      "text": "You were brave when the cave was dark. The story remembers you. You hear soft applause from the shelves.",
      "ending": true,
      "scene": "bridge",
      "title": "Dancing Books"
    },
    "hard_castle_d3_ra0a0b1_6": {
      "text": "Your footsteps echo. Someone has left a warm lantern.",
      "choices": [
        {
          "text": "Restore a torn banner",
          "next": "hard_castle_e7"
        },
        {
          "text": "Return a lost signet",
          "next": "hard_castle_e8"
        }
      ]
    },
    "hard_castle_e10": {
      "text": "You create a new song. It becomes part of the library forever. A bookmark slips into place: THE END.",
      "ending": true,
      "scene": "village",
      "title": "Shared Snack"
    },
    "hard_castle_e11": {
      "text": "You return to the library with a postcard from the stars. The book closes gently. Dust motes sparkle like tiny stars.",
      "ending": true,
      "scene": "moon",
      "title": "Picnic Map"
    },
    "hard_castle_d3_ra0a0c2_9": {
      "text": "Your footsteps echo. Someone has left a warm lantern.",
      "choices": [
        {
          "text": "Restore a torn banner",
          "next": "hard_castle_e10"
        },
        {
          "text": "Return a lost signet",
          "next": "hard_castle_e11"
        }
      ]
    },
    "hard_castle_d2_ra0a0_2": {
      "text": "You pass a painting that seems to wink.",
      "choices": [
        {
          "text": "Restore a torn banner",
          "next": "hard_castle_d3_ra0a0a0_3"
        },
        {
          "text": "Return a lost signet",
          "next": "hard_castle_d3_ra0a0b1_6"
        },
        {
          "text": "Light the beacon early",
          "next": "hard_castle_d3_ra0a0c2_9"
        }
      ]
    },
    "hard_castle_e14": {
      "text": "The adventure ends in peace. Pages flutter like wings. Somewhere, a page turns by itself\u2014happily.",
      "ending": true,
      "scene": "sun",
      "title": "Fallen Star"
    },
    "hard_castle_e15": {
      "text": "You make a new friend named Pip. You promise to meet again. The magical book glows once, then rests.",
      "ending": true,
      "scene": "treasure",
      "title": "Ant Helper"
    },
    "hard_castle_d3_ra0b1a0_13": {
      "text": "Your footsteps echo. Someone has left a warm lantern.",
      "choices": [
        {
          "text": "Restore a torn banner",
          "next": "hard_castle_e14"
        },
        {
          "text": "Return a lost signet",
          "next": "hard_castle_e15"
        }
      ]
    },
    "hard_castle_e17": {
      "text": "You open a chest and find story coins. You share it with everyone. You hear soft applause from the shelves.",
      "ending": true,
      "scene": "dragon_friend",
      "title": "Quiet Nook"
    },
    "hard_castle_d3_ra0b1b1_16": {
      "text": "Your footsteps echo. Someone has left a warm lantern.",
      "choices": [
        {
          "text": "Restore a torn banner",
          "next": "hard_castle_e17"
        }
      ]
    },
    "hard_castle_d2_ra0b1_12": {
      "text": "You pass a painting that seems to wink.",
      "choices": [
        {
          "text": "Restore a torn banner",
          "next": "hard_castle_d3_ra0b1a0_13"
        },
        {
          "text": "Return a lost signet",
          "next": "hard_castle_d3_ra0b1b1_16"
        }
      ]
    },
    "hard_castle_d1_ra0_1": {
      "text": "A cat watches from a windowsill.",
      "choices": [
        {
          "text": "Challenge the riddle guard",
          "next": "hard_castle_d2_ra0a0_2"
        },
        {
          "text": "Slip through the musicians\u2019 gallery",
          "next": "hard_castle_d2_ra0b1_12"
        }
      ]
    },
    "hard_castle_root": {
      "text": "Banners ripple in a draft from deep within the keep. Corridors branch toward the tower, the kitchen, and the library wing.",
      "choices": [
        {
          "text": "Investigate the sealed tower",
          "next": "hard_castle_d1_ra0_1"
        }
      ]
    },
    "hard_sea_e4": {
      "text": "You find a cozy path home. Soft rain taps the windows. A bookmark slips into place: THE END.",
      "ending": true,
      "scene": "castle",
      "title": "Rainbow Cocoa"
    },
    "hard_sea_e5": {
      "text": "A spark of magic grants you a kind word. You say thank you. Dust motes sparkle like tiny stars.",
      "ending": true,
      "scene": "forest_home",
      "title": "Returned Book"
    },
    "hard_sea_d3_ra0a0a0_3": {
      "text": "Water sparkles. Something shiny moves below.",
      "choices": [
        {
          "text": "Plant coral fragments",
          "next": "hard_sea_e4"
        },
        {
          "text": "Log the strange current",
          "next": "hard_sea_e5"
        }
      ]
    },
    "hard_sea_e7": {
      "text": "You help a baby phoenix. They give you a smile and a seed packet. Somewhere, a page turns by itself\u2014happily.",
      "ending": true,
      "scene": "star_ship",
      "title": "Pillow Fort"
    },
    "hard_sea_e8": {
      "text": "You learn that sharing makes joy grow. That is the real treasure. The magical book glows once, then rests.",
      "ending": true,
      "scene": "ocean_boat",
      "title": "Joke Plane"
    },
    "hard_sea_d3_ra0a0b1_6": {
      "text": "Water sparkles. Something shiny moves below.",
      "choices": [
        {
          "text": "Plant coral fragments",
          "next": "hard_sea_e7"
        },
        {
          "text": "Log the strange current",
          "next": "hard_sea_e8"
        }
      ]
    },
    "hard_sea_e10": {
      "text": "You were brave when the cave was dark. The story remembers you. You hear soft applause from the shelves.",
      "ending": true,
      "scene": "library_return",
      "title": "Bubble Boat"
    },
    "hard_sea_e11": {
      "text": "You create a new song. It becomes part of the library forever. A bookmark slips into place: THE END.",
      "ending": true,
      "scene": "feast",
      "title": "Kindness Riddle"
    },
    "hard_sea_d3_ra0a0c2_9": {
      "text": "Water sparkles. Something shiny moves below.",
      "choices": [
        {
          "text": "Plant coral fragments",
          "next": "hard_sea_e10"
        },
        {
          "text": "Log the strange current",
          "next": "hard_sea_e11"
        }
      ]
    },
    "hard_sea_d2_ra0a0_2": {
      "text": "A bottle floats by with a blank note\u2014waiting for you.",
      "choices": [
        {
          "text": "Plant coral fragments",
          "next": "hard_sea_d3_ra0a0a0_3"
        },
        {
          "text": "Log the strange current",
          "next": "hard_sea_d3_ra0a0b1_6"
        },
        {
          "text": "Signal the harbor",
          "next": "hard_sea_d3_ra0a0c2_9"
        }
      ]
    },
    "hard_sea_e14": {
      "text": "You return to the library with a postcard from the stars. The book closes gently. Dust motes sparkle like tiny stars.",
      "ending": true,
      "scene": "crown",
      "title": "Lucky Sock"
    },
    "hard_sea_e15": {
      "text": "The adventure ends in peace. Pages flutter like wings. Somewhere, a page turns by itself\u2014happily.",
      "ending": true,
      "scene": "map",
      "title": "Squirrel High-Five"
    },
    "hard_sea_d3_ra0b1a0_13": {
      "text": "Water sparkles. Something shiny moves below.",
      "choices": [
        {
          "text": "Plant coral fragments",
          "next": "hard_sea_e14"
        },
        {
          "text": "Log the strange current",
          "next": "hard_sea_e15"
        }
      ]
    },
    "hard_sea_e17": {
      "text": "You make a new friend named Pip. You promise to meet again. The magical book glows once, then rests.",
      "ending": true,
      "scene": "phoenix",
      "title": "Butterfly Door"
    },
    "hard_sea_d3_ra0b1b1_16": {
      "text": "Water sparkles. Something shiny moves below.",
      "choices": [
        {
          "text": "Plant coral fragments",
          "next": "hard_sea_e17"
        }
      ]
    },
    "hard_sea_d2_ra0b1_12": {
      "text": "A bottle floats by with a blank note\u2014waiting for you.",
      "choices": [
        {
          "text": "Plant coral fragments",
          "next": "hard_sea_d3_ra0b1a0_13"
        },
        {
          "text": "Log the strange current",
          "next": "hard_sea_d3_ra0b1b1_16"
        }
      ]
    },
    "hard_sea_d1_ra0_1": {
      "text": "The air smells like salt and adventure.",
      "choices": [
        {
          "text": "Negotiate with the tide spirit",
          "next": "hard_sea_d2_ra0a0_2"
        },
        {
          "text": "Rescue a tangled sea turtle",
          "next": "hard_sea_d2_ra0b1_12"
        }
      ]
    },
    "hard_sea_root": {
      "text": "The tide has drawn strange symbols in the sand. A skiff, a lighthouse path, and a coral arch all invite you.",
      "choices": [
        {
          "text": "Chart a course by shells",
          "next": "hard_sea_d1_ra0_1"
        }
      ]
    },
    "hard_stars_e4": {
      "text": "You open a chest and find story coins. You share it with everyone. You hear soft applause from the shelves.",
      "ending": true,
      "scene": "unicorn",
      "title": "Heart Bloom"
    },
    "hard_stars_e5": {
      "text": "You find a cozy path home. Soft rain taps the windows. A bookmark slips into place: THE END.",
      "ending": true,
      "scene": "wizard",
      "title": "Wind Secret"
    },
    "hard_stars_d3_ra0a0a0_3": {
      "text": "The air feels light, as if gravity is telling jokes.",
      "choices": [
        {
          "text": "Archive a new sky map",
          "next": "hard_stars_e4"
        },
        {
          "text": "Return a fallen star to its place",
          "next": "hard_stars_e5"
        }
      ]
    },
    "hard_stars_e7": {
      "text": "A spark of magic grants you a kind word. You say thank you. Dust motes sparkle like tiny stars.",
      "ending": true,
      "scene": "garden",
      "title": "Soft Blanket"
    },
    "hard_stars_e8": {
      "text": "You help a baby phoenix. They give you a smile and a seed packet. Somewhere, a page turns by itself\u2014happily.",
      "ending": true,
      "scene": "mountain",
      "title": "Confetti Noon"
    },
    "hard_stars_d3_ra0a0b1_6": {
      "text": "The air feels light, as if gravity is telling jokes.",
      "choices": [
        {
          "text": "Archive a new sky map",
          "next": "hard_stars_e7"
        },
        {
          "text": "Return a fallen star to its place",
          "next": "hard_stars_e8"
        }
      ]
    },
    "hard_stars_e10": {
      "text": "You learn that sharing makes joy grow. That is the real treasure. The magical book glows once, then rests.",
      "ending": true,
      "scene": "cave_light",
      "title": "New Friend"
    },
    "hard_stars_e11": {
      "text": "You were brave when the cave was dark. The story remembers you. You hear soft applause from the shelves.",
      "ending": true,
      "scene": "bridge",
      "title": "Shared Treasure"
    },
    "hard_stars_d3_ra0a0c2_9": {
      "text": "The air feels light, as if gravity is telling jokes.",
      "choices": [
        {
          "text": "Archive a new sky map",
          "next": "hard_stars_e10"
        },
        {
          "text": "Return a fallen star to its place",
          "next": "hard_stars_e11"
        }
      ]
    },
    "hard_stars_d2_ra0a0_2": {
      "text": "You hear the faint tick of a cosmic clock.",
      "choices": [
        {
          "text": "Archive a new sky map",
          "next": "hard_stars_d3_ra0a0a0_3"
        },
        {
          "text": "Return a fallen star to its place",
          "next": "hard_stars_d3_ra0a0b1_6"
        },
        {
          "text": "Compose a gravity poem",
          "next": "hard_stars_d3_ra0a0c2_9"
        }
      ]
    },
    "hard_stars_e14": {
      "text": "You create a new song. It becomes part of the library forever. A bookmark slips into place: THE END.",
      "ending": true,
      "scene": "village",
      "title": "Cozy Home"
    },
    "hard_stars_e15": {
      "text": "You return to the library with a postcard from the stars. The book closes gently. Dust motes sparkle like tiny stars.",
      "ending": true,
      "scene": "moon",
      "title": "Spark Gift"
    },
    "hard_stars_d3_ra0b1a0_13": {
      "text": "The air feels light, as if gravity is telling jokes.",
      "choices": [
        {
          "text": "Archive a new sky map",
          "next": "hard_stars_e14"
        },
        {
          "text": "Return a fallen star to its place",
          "next": "hard_stars_e15"
        }
      ]
    },
    "hard_stars_e17": {
      "text": "The adventure ends in peace. Pages flutter like wings. Somewhere, a page turns by itself\u2014happily.",
      "ending": true,
      "scene": "sun",
      "title": "Helping Hand"
    },
    "hard_stars_d3_ra0b1b1_16": {
      "text": "The air feels light, as if gravity is telling jokes.",
      "choices": [
        {
          "text": "Archive a new sky map",
          "next": "hard_stars_e17"
        }
      ]
    },
    "hard_stars_d2_ra0b1_12": {
      "text": "You hear the faint tick of a cosmic clock.",
      "choices": [
        {
          "text": "Archive a new sky map",
          "next": "hard_stars_d3_ra0b1a0_13"
        },
        {
          "text": "Return a fallen star to its place",
          "next": "hard_stars_d3_ra0b1b1_16"
        }
      ]
    },
    "hard_stars_d1_ra0_1": {
      "text": "A constellation rearranges into a smile.",
      "choices": [
        {
          "text": "Calibrate the observatory lens",
          "next": "hard_stars_d2_ra0a0_2"
        },
        {
          "text": "Negotiate with a polite alien archivist",
          "next": "hard_stars_d2_ra0b1_12"
        }
      ]
    },
    "hard_stars_root": {
      "text": "The Star Library orbits slowly. You may board a comet, step onto a moon bridge, or follow a constellation code.",
      "choices": [
        {
          "text": "Board the comet ferry",
          "next": "hard_stars_d1_ra0_1"
        }
      ]
    }
  }
};
