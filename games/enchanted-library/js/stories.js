window.ENCHANTED_STORIES = {
  "title": "The Enchanted Library",
  "subtitle": "A choose-your-own-adventure book",
  "levels": {
    "easy": {
      "id": "easy",
      "label": "Picture Path",
      "blurb": "Short sentences · big choices · ages ~5–7",
      "worlds": [
        {
          "id": "forest",
          "title": "Forest Path",
          "start": "easy_forest_root",
          "endings": 18
        },
        {
          "id": "castle",
          "title": "Castle Door",
          "start": "easy_castle_root",
          "endings": 18
        },
        {
          "id": "sea",
          "title": "Sea Shell",
          "start": "easy_sea_root",
          "endings": 18
        },
        {
          "id": "stars",
          "title": "Star Ladder",
          "start": "easy_stars_root",
          "endings": 18
        }
      ]
    },
    "medium": {
      "id": "medium",
      "label": "Story Path",
      "blurb": "Richer sentences · more branches · ages ~7–9",
      "worlds": [
        {
          "id": "forest",
          "title": "Forest Path",
          "start": "medium_forest_root",
          "endings": 24
        },
        {
          "id": "castle",
          "title": "Castle Door",
          "start": "medium_castle_root",
          "endings": 24
        },
        {
          "id": "sea",
          "title": "Sea Shell",
          "start": "medium_sea_root",
          "endings": 24
        },
        {
          "id": "stars",
          "title": "Star Ladder",
          "start": "medium_stars_root",
          "endings": 24
        }
      ]
    },
    "hard": {
      "id": "hard",
      "label": "Chapter Path",
      "blurb": "Longer text · deeper choices · ages ~9–11",
      "worlds": [
        {
          "id": "forest",
          "title": "Forest Path",
          "start": "hard_forest_root",
          "endings": 22
        },
        {
          "id": "castle",
          "title": "Castle Door",
          "start": "hard_castle_root",
          "endings": 22
        },
        {
          "id": "sea",
          "title": "Sea Shell",
          "start": "hard_sea_root",
          "endings": 22
        },
        {
          "id": "stars",
          "title": "Star Ladder",
          "start": "hard_stars_root",
          "endings": 22
        }
      ]
    }
  },
  "hubs": {
    "easy": "You open a big magic book. Four glowing doors appear. Behind each one is a little adventure with a secret waiting to be found. Which door will you choose?",
    "medium": "The enchanted book opens across your lap. Four doorways shimmer between the pages, each leading to an adventure with a problem to solve, friends to meet, and more than one way home.",
    "hard": "The leather cover warms beneath your hand. The book unfolds into a living library of possibilities: four luminous thresholds, each hiding a longer journey shaped by what you notice, whom you help, and which mystery you choose to follow."
  },
  "nodes": {
    "easy_forest_e4": {
      "ending": true,
      "title": "The Lantern Keeper",
      "scene": "forest",
      "text": "You help the lantern keeper carry their light through the woods. In return, they show you paths only true friends can see, and the lantern glows warm for you forever."
    },
    "easy_forest_e5": {
      "ending": true,
      "title": "The Silent Friend",
      "scene": "forest",
      "text": "Your forest friend doesn't speak, but you understand each other perfectly. This quiet friendship is deeper than words and will warm your heart always."
    },
    "easy_forest_d3_ra0a0a0_3": {
      "text": "The key opens a tree door. Inside, a lost storybook is waiting for its reader.",
      "choices": [
        {
          "text": "Open the little door",
          "next": "easy_forest_choice_001"
        },
        {
          "text": "Help the baby owl",
          "next": "easy_forest_choice_002"
        }
      ]
    },
    "easy_forest_e7": {
      "ending": true,
      "title": "The Mystery Solved",
      "scene": "forest",
      "text": "The forest's mystery unfolds before you like a flower opening to the sun. Knowing the answer feels like discovering a secret the trees have kept since the beginning of time."
    },
    "easy_forest_e8": {
      "ending": true,
      "title": "The Forest Lesson",
      "scene": "forest",
      "text": "The forest teaches you something precious about yourself. You leave wiser than when you arrived, carrying the lesson like seeds ready to grow."
    },
    "easy_forest_d3_ra0a0b1_6": {
      "text": "The feathers lead to a baby owl who cannot find its nest.",
      "choices": [
        {
          "text": "Open the little door",
          "next": "easy_forest_choice_003"
        },
        {
          "text": "Help the baby owl",
          "next": "easy_forest_choice_004"
        }
      ]
    },
    "easy_forest_d2_ra0a0_2": {
      "text": "Under the log you find a little wooden key and a note: FIND WHAT IS LOST.",
      "choices": [
        {
          "text": "Open the tree door",
          "next": "easy_forest_d3_ra0a0a0_3"
        },
        {
          "text": "Follow the silver feathers",
          "next": "easy_forest_d3_ra0a0b1_6"
        },
        {
          "text": "Follow the fireflies",
          "next": "easy_forest_d2_ra0a0_2_side"
        }
      ]
    },
    "easy_forest_e11": {
      "ending": true,
      "title": "The Forest Speaks",
      "scene": "forest",
      "text": "The forest's wisdom speaks directly to your heart, and you understand in a way that goes beyond words. This knowledge is a gift you'll treasure forever."
    },
    "easy_forest_e12": {
      "ending": true,
      "title": "The True Friend",
      "scene": "forest",
      "text": "Your friendship with this forest creature is true and pure. Though you return to the library, the bond remains unbroken across the book's pages."
    },
    "easy_forest_d3_ra0b1a0_10": {
      "text": "The key opens a tree door. Inside, a lost storybook is waiting for its reader.",
      "choices": [
        {
          "text": "Open the little door",
          "next": "easy_forest_choice_005"
        },
        {
          "text": "Help the baby owl",
          "next": "easy_forest_choice_006"
        }
      ]
    },
    "easy_forest_e14": {
      "ending": true,
      "title": "The Forest's Gift",
      "scene": "forest",
      "text": "What you discovered in the forest becomes yours to keep—not as an object, but as a memory that glows and grows more beautiful each time you remember it."
    },
    "easy_forest_d3_ra0b1b1_13": {
      "text": "The feathers lead to a baby owl who cannot find its nest.",
      "choices": [
        {
          "text": "Open the little door",
          "next": "easy_forest_choice_007"
        }
      ]
    },
    "easy_forest_d2_ra0b1_9": {
      "text": "Across the stream, you spot silver feathers caught in the reeds.",
      "choices": [
        {
          "text": "Follow the silver feathers",
          "next": "easy_forest_d3_ra0b1a0_10"
        },
        {
          "text": "Help the owl",
          "next": "easy_forest_d3_ra0b1b1_13"
        },
        {
          "text": "Follow the fireflies",
          "next": "easy_forest_d2_ra0b1_9_side"
        }
      ]
    },
    "easy_forest_d1_ra0_1": {
      "text": "The squirrel leads you to a fallen log beside a bright stream.",
      "choices": [
        {
          "text": "Search under the log",
          "next": "easy_forest_d2_ra0a0_2"
        },
        {
          "text": "Cross the stream",
          "next": "easy_forest_d2_ra0b1_9"
        }
      ]
    },
    "easy_forest_root": {
      "text": "A tiny lantern hangs from a branch and glows warm gold. It lights a trail between the trees. You hear a squirrel call from somewhere deep in the forest, almost like it's calling to you.",
      "choices": [
        {
          "text": "Follow the lantern",
          "next": "easy_forest_d1_ra0_1"
        }
      ]
    },
    "easy_castle_e4": {
      "ending": true,
      "title": "The Baker's Bell",
      "scene": "castle",
      "text": "The baker thanks you with a warm smile and offers you the first fresh bread from the oven. Its warmth and sweetness stay with you when you return to the library, reminding you of kindness."
    },
    "easy_castle_e5": {
      "ending": true,
      "title": "The Tiny Crown",
      "scene": "feast",
      "text": "The queen places a tiny crown on your head—not of gold, but of starlight. Everyone in the castle bows, and you know you've found a true friend in the castle's heart."
    },
    "easy_castle_d3_ra0a0a0_3": {
      "text": "You search the kitchen shelves and find the missing recipe tucked inside a flour tin.",
      "choices": [
        {
          "text": "Take the recipe",
          "next": "easy_castle_choice_008"
        },
        {
          "text": "Help the cat",
          "next": "easy_castle_choice_009"
        }
      ]
    },
    "easy_castle_e7": {
      "ending": true,
      "title": "Secret Garden",
      "scene": "garden",
      "text": "You leave the garden exactly as it was, untouched and perfect. But the garden knows you were there, and it blooms a little brighter when you remember it."
    },
    "easy_castle_e8": {
      "ending": true,
      "title": "The Recipe Book",
      "scene": "castle",
      "text": "The baker's recipe book is now yours forever. You carry it home and promise to bake whenever you want to remember your castle friend."
    },
    "easy_castle_d3_ra0a0b1_6": {
      "text": "You help the cat pull a soft cushion beneath the shelf so you can reach the little crown.",
      "choices": [
        {
          "text": "Take the recipe",
          "next": "easy_castle_choice_010"
        },
        {
          "text": "Help the cat",
          "next": "easy_castle_choice_011"
        }
      ]
    },
    "easy_castle_d2_ra0a0_2": {
      "text": "The bread door opens into the kitchen. A tray of warm rolls is ready, but the baker cannot find the recipe.",
      "choices": [
        {
          "text": "Find the recipe",
          "next": "easy_castle_d3_ra0a0a0_3"
        },
        {
          "text": "Reach the little crown",
          "next": "easy_castle_d3_ra0a0b1_6"
        },
        {
          "text": "Follow the bell",
          "next": "easy_castle_d2_ra0a0_2_side"
        }
      ]
    },
    "easy_castle_e11": {
      "ending": true,
      "title": "Tower Star",
      "scene": "castle",
      "text": "The brightest star from the tower comes home with you, shining softly on your shelf. When you look at it, you remember the castle and all its magic."
    },
    "easy_castle_e12": {
      "ending": true,
      "title": "Kind Knight",
      "scene": "castle",
      "text": "The kind knight rides beside you to the library's edge, ensuring your safe return. True friendship, he teaches you, isn't measured by swords but by kindness."
    },
    "easy_castle_d3_ra0b1a0_10": {
      "text": "You search the kitchen shelves and find the missing recipe tucked inside a flour tin.",
      "choices": [
        {
          "text": "Take the recipe",
          "next": "easy_castle_choice_012"
        },
        {
          "text": "Help the cat",
          "next": "easy_castle_choice_013"
        }
      ]
    },
    "easy_castle_e14": {
      "ending": true,
      "title": "Castle Treasure",
      "scene": "treasure",
      "text": "The castle's greatest treasure turns out to be the friendships you made there. That treasure is priceless and will stay with you forever."
    },
    "easy_castle_d3_ra0b1b1_13": {
      "text": "You help the cat pull a soft cushion beneath the shelf so you can reach the little crown.",
      "choices": [
        {
          "text": "Take the recipe",
          "next": "easy_castle_choice_014"
        }
      ]
    },
    "easy_castle_d2_ra0b1_9": {
      "text": "The glittering door leads to a hall where a small crown is stuck high on a shelf.",
      "choices": [
        {
          "text": "Reach the little crown",
          "next": "easy_castle_d3_ra0b1a0_10"
        },
        {
          "text": "Help the baker",
          "next": "easy_castle_d3_ra0b1b1_13"
        },
        {
          "text": "Follow the bell",
          "next": "easy_castle_d2_ra0b1_9_side"
        }
      ]
    },
    "easy_castle_d1_ra0_1": {
      "text": "A sleepy castle cat pads ahead and stops beside two doors: one smells like bread, and one glitters with light.",
      "choices": [
        {
          "text": "Follow the bread smell",
          "next": "easy_castle_d2_ra0a0_2"
        },
        {
          "text": "Follow the glittering hall",
          "next": "easy_castle_d2_ra0b1_9"
        }
      ]
    },
    "easy_castle_root": {
      "text": "A round castle tower rises from the page. A bell rings once, and a little blue flag points inside. You step through the gate and feel the cool stone beneath your feet.",
      "choices": [
        {
          "text": "Enter the castle",
          "next": "easy_castle_d1_ra0_1"
        }
      ]
    },
    "easy_sea_e4": {
      "ending": true,
      "title": "The Sailor's Way",
      "scene": "sea",
      "text": "You learn the old sailor's way—how to read the water, the wind, and the stars. This knowledge becomes part of you, and the sea will always be your home."
    },
    "easy_sea_e5": {
      "ending": true,
      "title": "The Sea's Secret",
      "scene": "sea",
      "text": "You discover the sea's deepest secret, hidden for centuries beneath the waves. Knowing this secret makes you feel connected to the ocean's ancient magic forever."
    },
    "easy_sea_d3_ra0a0a0_3": {
      "text": "Inside the bottle is a picture of the lighthouse keeper's missing bell. You search the shore for it.",
      "choices": [
        {
          "text": "Find the lighthouse bell",
          "next": "easy_sea_choice_015"
        },
        {
          "text": "Explore the sea cave",
          "next": "easy_sea_choice_016"
        }
      ]
    },
    "easy_sea_e7": {
      "ending": true,
      "title": "The Pearl of Wisdom",
      "scene": "treasure",
      "text": "The treasure you found is a pearl that glows with inner light. It contains the wisdom of all the seas that came before, and it is yours to keep."
    },
    "easy_sea_e8": {
      "ending": true,
      "title": "The Sea Friend",
      "scene": "sea",
      "text": "Your sea friend becomes your guide and companion. Though you must return to the library, this friendship transcends the boundaries of the written world."
    },
    "easy_sea_d3_ra0a0b1_6": {
      "text": "The crab drops the pearl into a rock pool. It opens a hidden gate beneath the water.",
      "choices": [
        {
          "text": "Find the lighthouse bell",
          "next": "easy_sea_choice_017"
        },
        {
          "text": "Explore the sea cave",
          "next": "easy_sea_choice_018"
        }
      ]
    },
    "easy_sea_d2_ra0a0_2": {
      "text": "Near the lighthouse, you find a message in a bottle asking for help.",
      "choices": [
        {
          "text": "Search for the bell",
          "next": "easy_sea_d3_ra0a0a0_3"
        },
        {
          "text": "Follow the crab",
          "next": "easy_sea_d3_ra0a0b1_6"
        },
        {
          "text": "Follow the silver gull",
          "next": "easy_sea_d2_ra0a0_2_side"
        }
      ]
    },
    "easy_sea_e11": {
      "ending": true,
      "title": "The Sea's Beauty",
      "scene": "sea",
      "text": "The sea's beauty is beyond describing—it can only be felt and remembered. You carry that beauty home, and it brightens every day of your life."
    },
    "easy_sea_e12": {
      "ending": true,
      "title": "The Magic Current",
      "scene": "sea",
      "text": "You learn to ride the sea's magical currents, and the sea responds to your presence. The two of you become partners in adventure, forever bound by trust."
    },
    "easy_sea_d3_ra0b1a0_10": {
      "text": "Inside the bottle is a picture of the lighthouse keeper's missing bell. You search the shore for it.",
      "choices": [
        {
          "text": "Find the lighthouse bell",
          "next": "easy_sea_choice_019"
        },
        {
          "text": "Explore the sea cave",
          "next": "easy_sea_choice_020"
        }
      ]
    },
    "easy_sea_e14": {
      "ending": true,
      "title": "The Ocean's Wisdom",
      "scene": "sea",
      "text": "The sea teaches you that all things flow and change, but the magic endures. This wisdom shapes how you see the world from that day forward."
    },
    "easy_sea_d3_ra0b1b1_13": {
      "text": "The crab drops the pearl into a rock pool. It opens a hidden gate beneath the water.",
      "choices": [
        {
          "text": "Find the lighthouse bell",
          "next": "easy_sea_choice_021"
        }
      ]
    },
    "easy_sea_d2_ra0b1_9": {
      "text": "A trail of bright shells leads into a tide pool where a tiny crab is carrying a pearl.",
      "choices": [
        {
          "text": "Follow the crab",
          "next": "easy_sea_d3_ra0b1a0_10"
        },
        {
          "text": "Search the shore",
          "next": "easy_sea_d3_ra0b1b1_13"
        },
        {
          "text": "Follow the silver gull",
          "next": "easy_sea_d2_ra0b1_9_side"
        }
      ]
    },
    "easy_sea_d1_ra0_1": {
      "text": "The dolphin circles the boat and points toward a lighthouse on a small island.",
      "choices": [
        {
          "text": "Follow the dolphin",
          "next": "easy_sea_d2_ra0a0_2"
        },
        {
          "text": "Follow the shells",
          "next": "easy_sea_d2_ra0b1_9"
        }
      ]
    },
    "easy_sea_root": {
      "text": "Blue waves ripple out from the page. A little boat waits beside a shell path, its sail catching an imaginary breeze. You climb aboard and hear a dolphin whistle in the distance.",
      "choices": [
        {
          "text": "Climb into the boat",
          "next": "easy_sea_d1_ra0_1"
        }
      ]
    },
    "easy_stars_e4": {
      "ending": true,
      "title": "The Star's Light",
      "scene": "sun",
      "text": "The star you sought glows with a warm, gentle light that fills you with peace. You bring a piece of that light back home, and it never fades."
    },
    "easy_stars_e5": {
      "ending": true,
      "title": "The Star Friend",
      "scene": "phoenix",
      "text": "Your friendship with this star is written across the night sky itself. No distance can separate you, and every night you can look up and say hello."
    },
    "easy_stars_d3_ra0a0a0_3": {
      "text": "The comet leads you to the missing seed, hidden under a soft blue stone.",
      "choices": [
        {
          "text": "Find the star map",
          "next": "easy_stars_choice_022"
        },
        {
          "text": "Guide the ship",
          "next": "easy_stars_choice_023"
        }
      ]
    },
    "easy_stars_e7": {
      "ending": true,
      "title": "The Cosmic Song",
      "scene": "treasure",
      "text": "The stars' song is forever yours to remember—a melody of creation itself. When you sing it quietly to yourself, the stars join in from their distant homes."
    },
    "easy_stars_e8": {
      "ending": true,
      "title": "The Star's Magic",
      "scene": "wizard",
      "text": "The stars share their magic with you, and you return to the library forever touched by cosmic wonder. Magic now flows through your life in unexpected ways."
    },
    "easy_stars_d3_ra0a0b1_6": {
      "text": "The star pilot shows you the last place the map was seen: a quiet cloud shaped like a whale.",
      "choices": [
        {
          "text": "Find the star map",
          "next": "easy_stars_choice_024"
        },
        {
          "text": "Guide the ship",
          "next": "easy_stars_choice_025"
        }
      ]
    },
    "easy_stars_d2_ra0a0_2": {
      "text": "You follow the comet to a small planet where a garden of glowing flowers needs one missing seed.",
      "choices": [
        {
          "text": "Find the missing seed",
          "next": "easy_stars_d3_ra0a0a0_3"
        },
        {
          "text": "Cross the moon bridge",
          "next": "easy_stars_d3_ra0a0b1_6"
        },
        {
          "text": "Follow the tiny comet",
          "next": "easy_stars_d2_ra0a0_2_side"
        }
      ]
    },
    "easy_stars_e11": {
      "ending": true,
      "title": "The Star Secret",
      "scene": "garden",
      "text": "The secret the stars entrust to you can never be told in words—it can only be understood in your heart. This makes it infinitely precious."
    },
    "easy_stars_e12": {
      "ending": true,
      "title": "The Star's Knowledge",
      "scene": "map",
      "text": "The stars teach you to read the night sky like a book written in light. This knowledge makes every evening an adventure of discovery."
    },
    "easy_stars_d3_ra0b1a0_10": {
      "text": "The comet leads you to the missing seed, hidden under a soft blue stone.",
      "choices": [
        {
          "text": "Find the star map",
          "next": "easy_stars_choice_026"
        },
        {
          "text": "Guide the ship",
          "next": "easy_stars_choice_027"
        }
      ]
    },
    "easy_stars_e14": {
      "ending": true,
      "title": "The Starlight",
      "scene": "garden",
      "text": "You return to the library glowing with starlight that no one else can see—but everyone can feel. Your presence reminds them that magic is real and the sky is full of wonders."
    },
    "easy_stars_d3_ra0b1b1_13": {
      "text": "The star pilot shows you the last place the map was seen: a quiet cloud shaped like a whale.",
      "choices": [
        {
          "text": "Find the star map",
          "next": "easy_stars_choice_028"
        }
      ]
    },
    "easy_stars_d2_ra0b1_9": {
      "text": "You cross the moon bridge and meet a friendly star pilot whose ship has lost its map.",
      "choices": [
        {
          "text": "Cross the moon bridge",
          "next": "easy_stars_d3_ra0b1a0_10"
        },
        {
          "text": "Follow the comet",
          "next": "easy_stars_d3_ra0b1b1_13"
        },
        {
          "text": "Follow the tiny comet",
          "next": "easy_stars_d2_ra0b1_9_side"
        }
      ]
    },
    "easy_stars_d1_ra0_1": {
      "text": "At the top, you find a moon bridge. A tiny comet has landed beside it and looks a little lost.",
      "choices": [
        {
          "text": "Follow the comet",
          "next": "easy_stars_d2_ra0a0_2"
        },
        {
          "text": "Visit the little planet",
          "next": "easy_stars_d2_ra0b1_9"
        }
      ]
    },
    "easy_stars_root": {
      "text": "A silver ladder rises from the library floor into a sky full of stars. One bright star blinks three times, as if it wants you to follow. The ladder feels cool and solid under your hands as you begin to climb.",
      "choices": [
        {
          "text": "Climb the silver ladder",
          "next": "easy_stars_d1_ra0_1"
        }
      ]
    },
    "medium_forest_e4": {
      "ending": true,
      "title": "The Songbird's Return",
      "scene": "forest_home",
      "text": "You follow the ribbon to the songbird and return the missing page. When the bird sings the tune again, the whole clearing joins in, from insects to trees."
    },
    "medium_forest_e5": {
      "ending": true,
      "title": "The Silver Bell",
      "scene": "treasure",
      "text": "You use the bell to find the final missing page hidden beneath a root. The bell gives one clear ring, and the complete song returns to the forest."
    },
    "medium_forest_d3_ra0a0a0_3": {
      "text": "The ribbon leads you to a nest where the songbird is waiting. Its music book has been carried away by the wind.",
      "choices": [
        {
          "text": "Return the song page",
          "next": "medium_forest_choice_029"
        },
        {
          "text": "Follow the fox",
          "next": "medium_forest_choice_030"
        }
      ]
    },
    "medium_forest_e7": {
      "ending": true,
      "title": "Bridge of Ribbons",
      "scene": "bridge",
      "text": "The fox leads you to an old bridge decorated with ribbons left by earlier readers. You add the red ribbon and cross safely into a sunlit meadow."
    },
    "medium_forest_e8": {
      "ending": true,
      "title": "The Listening Garden",
      "scene": "garden",
      "text": "Your humming wakes the silent flowers. They open into a small listening garden where every visitor can hear a different gentle melody."
    },
    "medium_forest_d3_ra0a0b1_6": {
      "text": "The bell rings beside a mossy stump. Under it is a folded page from the missing music book.",
      "choices": [
        {
          "text": "Wake the flowers",
          "next": "medium_forest_choice_031"
        },
        {
          "text": "Find the missing page",
          "next": "medium_forest_choice_032"
        }
      ]
    },
    "medium_forest_d2_ra0a0_2": {
      "text": "The woodpecker points toward a hollow tree. Inside, you discover a tiny silver bell that rings whenever someone tells the truth.",
      "choices": [
        {
          "text": "Follow the ribbon",
          "next": "medium_forest_d3_ra0a0a0_3"
        },
        {
          "text": "Read the silver bell",
          "next": "medium_forest_d3_ra0a0b1_6"
        },
        {
          "text": "Follow the fireflies",
          "next": "medium_forest_d2_ra0a0_2_side"
        }
      ]
    },
    "medium_forest_e11": {
      "ending": true,
      "title": "Fox's Thank-You",
      "scene": "feast",
      "text": "The fox gathers berries, apples, and nuts for a woodland picnic. The songbird sings while you share the feast with your new forest friends."
    },
    "medium_forest_e12": {
      "ending": true,
      "title": "The Lost Page",
      "scene": "library_return",
      "text": "You carry the recovered music page back to the enchanted library. It slips into its book perfectly, and the shelves hum the song together."
    },
    "medium_forest_d3_ra0b1a0_10": {
      "text": "The ribbon leads you to a nest where the songbird is waiting. Its music book has been carried away by the wind.",
      "choices": [
        {
          "text": "Follow the songbird",
          "next": "medium_forest_choice_033"
        },
        {
          "text": "Mark the safe trail",
          "next": "medium_forest_choice_034"
        }
      ]
    },
    "medium_forest_e14": {
      "ending": true,
      "title": "Owl at Dusk",
      "scene": "moon",
      "text": "An owl guides you along the safest trail as evening arrives. From a hilltop, you hear the songbird singing its restored melody below."
    },
    "medium_forest_e15": {
      "ending": true,
      "title": "The Acorn Archive",
      "scene": "map",
      "text": "The silver bell reveals a hidden drawer full of old forest maps. You choose the newest one and leave it on the library's adventure table."
    },
    "medium_forest_d3_ra0b1b1_13": {
      "text": "The bell rings beside a mossy stump. Under it is a folded page from the missing music book.",
      "choices": [
        {
          "text": "Share the recovered song",
          "next": "medium_forest_choice_035"
        },
        {
          "text": "Explore the clearing",
          "next": "medium_forest_choice_036"
        }
      ]
    },
    "medium_forest_d2_ra0b1_9": {
      "text": "Beyond the oak, you find a clearing where the songbird's music should be, but the usual blue flowers are silent.",
      "choices": [
        {
          "text": "Follow the silver bell",
          "next": "medium_forest_d3_ra0b1a0_10"
        },
        {
          "text": "Search the stump",
          "next": "medium_forest_d3_ra0b1b1_13"
        },
        {
          "text": "Follow the fireflies",
          "next": "medium_forest_d2_ra0b1_9_side"
        }
      ]
    },
    "medium_forest_d1_ra0_1": {
      "text": "The fox drops the ribbon at the foot of an oak. Tied to it is a note saying, 'Please return the songbird's lost music.'",
      "choices": [
        {
          "text": "Search the oak",
          "next": "medium_forest_d2_ra0a0_2"
        },
        {
          "text": "Inspect the hollow tree",
          "next": "medium_forest_d2_ra0b1_9"
        }
      ]
    },
    "medium_forest_e18": {
      "ending": true,
      "title": "A Song to Keep",
      "scene": "wizard",
      "text": "The songbird teaches you the melody, and the magical pages remember every note. A tiny painted wizard appears in the book margin to conduct the final chorus."
    },
    "medium_forest_d2_rb1a0_17": {
      "text": "Beyond the oak, you find a clearing where the songbird's music should be, but the usual blue flowers are silent.",
      "choices": [
        {
          "text": "Hum the missing tune",
          "next": "medium_forest_choice_037"
        },
        {
          "text": "Follow the fireflies",
          "next": "medium_forest_d2_rb1a0_17_side"
        }
      ]
    },
    "medium_forest_d1_rb1_16": {
      "text": "The fox drops the ribbon at the foot of an oak. Tied to it is a note saying, 'Please return the songbird's lost music.'",
      "choices": [
        {
          "text": "Search the oak",
          "next": "medium_forest_d2_rb1a0_17"
        }
      ]
    },
    "medium_forest_root": {
      "text": "Moss cushions your steps as you enter the Whispering Woods, deadening all sound. Ahead, a fox carries a red ribbon in its mouth—a ribbon that seems to glow softly in the dimness. A woodpecker taps urgently beside an old stone bridge, as if warning you of something. The forest seems to hold its breath, waiting for your choice.",
      "choices": [
        {
          "text": "Follow the fox",
          "next": "medium_forest_d1_ra0_1"
        },
        {
          "text": "Study the woodpecker's warning",
          "next": "medium_forest_d1_rb1_16"
        }
      ]
    },
    "medium_castle_e4": {
      "ending": true,
      "title": "The Tower Rings",
      "scene": "crown",
      "text": "You set the clock to sunset and fit the missing gear into place. The bell rings across the castle, and the queen thanks you from the tower balcony."
    },
    "medium_castle_e5": {
      "ending": true,
      "title": "The Builder's Map",
      "scene": "map",
      "text": "The old book reveals a map of the castle's hidden passages. You return it to the royal library so future readers can find their way safely."
    },
    "medium_castle_d3_ra0a0a0_3": {
      "text": "The builders' book explains that the gear was designed to fit only after the tower clock is set to sunset.",
      "choices": [
        {
          "text": "Repair the bell",
          "next": "medium_castle_choice_038"
        },
        {
          "text": "Relight the fire",
          "next": "medium_castle_choice_039"
        }
      ]
    },
    "medium_castle_e7": {
      "ending": true,
      "title": "A Feast Restored",
      "scene": "feast",
      "text": "You help the kitchen keeper relight the fire without disturbing the dragon. Soon the hall fills with warm soup, bread, and grateful smiles."
    },
    "medium_castle_e8": {
      "ending": true,
      "title": "The Sleeping Dragon",
      "scene": "dragon_friend",
      "text": "The tiny dragon beneath the ovens wakes just long enough to sneeze a puff of harmless blue smoke. You become friends, then let it return to its cozy nap."
    },
    "medium_castle_d3_ra0a0b1_6": {
      "text": "The kitchen keeper asks you to find a safe way to relight the fire without waking the sleeping dragon beneath the ovens.",
      "choices": [
        {
          "text": "Help the steward",
          "next": "medium_castle_choice_040"
        },
        {
          "text": "Meet the dragon",
          "next": "medium_castle_choice_041"
        }
      ]
    },
    "medium_castle_d2_ra0a0_2": {
      "text": "You enter the great hall and discover that the kitchen fire has gone cold. Without it, the castle's evening feast cannot begin.",
      "choices": [
        {
          "text": "Set the tower clock",
          "next": "medium_castle_d3_ra0a0a0_3"
        },
        {
          "text": "Help the kitchen",
          "next": "medium_castle_d3_ra0a0b1_6"
        },
        {
          "text": "Follow the servant’s candle",
          "next": "medium_castle_d2_ra0a0_2_side"
        }
      ]
    },
    "medium_castle_e11": {
      "ending": true,
      "title": "Cat of the Tower",
      "scene": "castle",
      "text": "The castle cat leads you up a spiral stair to a sunny tower room. From there, you can see every flag in the kingdom."
    },
    "medium_castle_e12": {
      "ending": true,
      "title": "The Brass Matchbox",
      "scene": "treasure",
      "text": "The matchbox contains one golden match that lights without flame. You leave it in the castle kitchen for the next careful helper."
    },
    "medium_castle_d3_ra0b1a0_10": {
      "text": "The builders' book explains that the gear was designed to fit only after the tower clock is set to sunset.",
      "choices": [
        {
          "text": "Repair the clock",
          "next": "medium_castle_choice_042"
        },
        {
          "text": "Open the garden",
          "next": "medium_castle_choice_043"
        }
      ]
    },
    "medium_castle_e14": {
      "ending": true,
      "title": "Sunset Garden",
      "scene": "garden",
      "text": "A hidden door opens beside the kitchen into a garden warmed by the last light of day. The cat settles among the lavender while you explore."
    },
    "medium_castle_e15": {
      "ending": true,
      "title": "Royal Librarian",
      "scene": "library_return",
      "text": "You return the builders' book to its shelf and discover a note thanking brave readers. The enchanted library adds your adventure to its growing collection."
    },
    "medium_castle_d3_ra0b1b1_13": {
      "text": "The kitchen keeper asks you to find a safe way to relight the fire without waking the sleeping dragon beneath the ovens.",
      "choices": [
        {
          "text": "Save the feast",
          "next": "medium_castle_choice_044"
        },
        {
          "text": "Ring the quiet bell",
          "next": "medium_castle_choice_045"
        }
      ]
    },
    "medium_castle_d2_ra0b1_9": {
      "text": "In the royal library, a picture of the missing gear hangs beside a book about the castle's oldest builders.",
      "choices": [
        {
          "text": "Help the kitchen",
          "next": "medium_castle_d3_ra0b1a0_10"
        },
        {
          "text": "Find the missing gear",
          "next": "medium_castle_d3_ra0b1b1_13"
        },
        {
          "text": "Follow the servant’s candle",
          "next": "medium_castle_d2_ra0b1_9_side"
        }
      ]
    },
    "medium_castle_d1_ra0_1": {
      "text": "You climb toward the tower and find a clockwork bell with one gear missing. A note says the gear was last seen near the royal library.",
      "choices": [
        {
          "text": "Read the builders' book",
          "next": "medium_castle_d2_ra0a0_2"
        },
        {
          "text": "Search the royal library",
          "next": "medium_castle_d2_ra0b1_9"
        }
      ]
    },
    "medium_castle_e18": {
      "ending": true,
      "title": "The Quiet Bell",
      "scene": "bridge",
      "text": "Instead of ringing the bell loudly, you repair it so it gives a soft chime. The sound guides the castle's travelers without disturbing anyone."
    },
    "medium_castle_d2_rb1a0_17": {
      "text": "In the royal library, a picture of the missing gear hangs beside a book about the castle's oldest builders.",
      "choices": [
        {
          "text": "Wake the kitchen fire",
          "next": "medium_castle_choice_046"
        },
        {
          "text": "Follow the servant’s candle",
          "next": "medium_castle_d2_rb1a0_17_side"
        }
      ]
    },
    "medium_castle_d1_rb1_16": {
      "text": "You climb toward the tower and find a clockwork bell with one gear missing. A note says the gear was last seen near the royal library.",
      "choices": [
        {
          "text": "Read the builders' book",
          "next": "medium_castle_d2_rb1a0_17"
        }
      ]
    },
    "medium_castle_root": {
      "text": "Torchlight flickers across the castle walls, casting dancing shadows. Somewhere above you in the tower, a bell should be ringing—it always rings at this hour—but the tower is eerily silent. The castle cat sits beside two stairways, watching you with knowing eyes. She seems to be waiting for you to choose.",
      "choices": [
        {
          "text": "Climb the tower",
          "next": "medium_castle_d1_ra0_1"
        },
        {
          "text": "Enter the great hall",
          "next": "medium_castle_d1_rb1_16"
        }
      ]
    },
    "medium_sea_e4": {
      "ending": true,
      "title": "The Harbor Signal",
      "scene": "ocean_boat",
      "text": "You use the colored stones to rebuild the lighthouse signal. Boats in the distance turn toward the safe harbor as the light shines again."
    },
    "medium_sea_e5": {
      "ending": true,
      "title": "Keeper's Journal",
      "scene": "library_return",
      "text": "You return the weather journal to the lighthouse keeper. Its careful notes will help future sailors understand the changing tide."
    },
    "medium_sea_d3_ra0a0a0_3": {
      "text": "The shell arrows lead to a tide pool where colored stones match the missing signal flags.",
      "choices": [
        {
          "text": "Restore the signal",
          "next": "medium_sea_choice_047"
        },
        {
          "text": "Read the journal",
          "next": "medium_sea_choice_048"
        }
      ]
    },
    "medium_sea_e7": {
      "ending": true,
      "title": "The Seal's Secret",
      "scene": "treasure",
      "text": "The seal leads you to a sheltered cove where smooth glass pieces have been polished by the sea. You choose one blue piece to remember the journey."
    },
    "medium_sea_e8": {
      "ending": true,
      "title": "Tide Pool Garden",
      "scene": "garden",
      "text": "The colored stones wake tiny sea flowers in the tide pool. You watch them open as the water rises, then leave them safely in place."
    },
    "medium_sea_d3_ra0a0b1_6": {
      "text": "The seal nudges a loose plank near the dock. Beneath it is the lighthouse keeper's weather journal.",
      "choices": [
        {
          "text": "Follow the seal",
          "next": "medium_sea_choice_049"
        },
        {
          "text": "Build the harbor map",
          "next": "medium_sea_choice_050"
        }
      ]
    },
    "medium_sea_d2_ra0a0_2": {
      "text": "Near the lighthouse steps, you find three shells arranged like arrows toward the tide pools.",
      "choices": [
        {
          "text": "Read the signal note",
          "next": "medium_sea_d3_ra0a0a0_3"
        },
        {
          "text": "Search the tide pool",
          "next": "medium_sea_d3_ra0a0b1_6"
        },
        {
          "text": "Follow the tide song",
          "next": "medium_sea_d2_ra0a0_2_side"
        }
      ]
    },
    "medium_sea_e11": {
      "ending": true,
      "title": "The Signal Flags",
      "scene": "map",
      "text": "You arrange the old flags in the correct order and discover they form a map of the harbor. You tuck a copy into the enchanted book."
    },
    "medium_sea_e12": {
      "ending": true,
      "title": "Moonlit Harbor",
      "scene": "moon",
      "text": "By moonrise, the lighthouse beam sweeps across the calm water. The seal surfaces beside the boat as if to say the harbor is ready."
    },
    "medium_sea_d3_ra0b1a0_10": {
      "text": "The shell arrows lead to a tide pool where colored stones match the missing signal flags.",
      "choices": [
        {
          "text": "Light the harbor",
          "next": "medium_sea_choice_051"
        },
        {
          "text": "Cross the inlet",
          "next": "medium_sea_choice_052"
        }
      ]
    },
    "medium_sea_e14": {
      "ending": true,
      "title": "The Hidden Marker",
      "scene": "bridge",
      "text": "You uncover the old marker stones and reconnect them with a short rope bridge. Travelers can now cross the rocky inlet safely."
    },
    "medium_sea_e15": {
      "ending": true,
      "title": "A Friendly Crew",
      "scene": "village",
      "text": "The lighthouse keeper invites you to the harbor village. Everyone helps carry the rescued supplies, and the evening ends with warm cocoa."
    },
    "medium_sea_d3_ra0b1b1_13": {
      "text": "The seal nudges a loose plank near the dock. Beneath it is the lighthouse keeper's weather journal.",
      "choices": [
        {
          "text": "Protect the garden",
          "next": "medium_sea_choice_053"
        },
        {
          "text": "Enter the sea cave",
          "next": "medium_sea_choice_054"
        }
      ]
    },
    "medium_sea_d2_ra0b1_9": {
      "text": "The crate contains a bundle of old signal flags and a note: 'The harbor light has forgotten its colors.'",
      "choices": [
        {
          "text": "Search the tide pool",
          "next": "medium_sea_d3_ra0b1a0_10"
        },
        {
          "text": "Read the keeper's journal",
          "next": "medium_sea_d3_ra0b1b1_13"
        },
        {
          "text": "Follow the tide song",
          "next": "medium_sea_d2_ra0b1_9_side"
        }
      ]
    },
    "medium_sea_d1_ra0_1": {
      "text": "The seal leads you to a floating crate marked with the lighthouse symbol. Something inside is knocking softly.",
      "choices": [
        {
          "text": "Open the floating crate",
          "next": "medium_sea_d2_ra0a0_2"
        },
        {
          "text": "Follow the shell arrows",
          "next": "medium_sea_d2_ra0b1_9"
        }
      ]
    },
    "medium_sea_e18": {
      "ending": true,
      "title": "The Singing Shell",
      "scene": "cave_light",
      "text": "One shell hums when the tide moves through it. You place it in a small sea cave where its gentle song echoes like a lighthouse bell."
    },
    "medium_sea_d2_rb1a0_17": {
      "text": "The crate contains a bundle of old signal flags and a note: 'The harbor light has forgotten its colors.'",
      "choices": [
        {
          "text": "Check the old marker",
          "next": "medium_sea_choice_055"
        },
        {
          "text": "Follow the tide song",
          "next": "medium_sea_d2_rb1a0_17_side"
        }
      ]
    },
    "medium_sea_d1_rb1_16": {
      "text": "The seal leads you to a floating crate marked with the lighthouse symbol. Something inside is knocking softly.",
      "choices": [
        {
          "text": "Open the floating crate",
          "next": "medium_sea_d2_rb1a0_17"
        }
      ]
    },
    "medium_sea_root": {
      "text": "The tide is rising around a little lighthouse island, growing higher by the minute. A wooden boat waits at the dock, painted in faded blues and greens, its oars ready. A seal keeps circling one dark patch of water, always returning to the same spot, as if protecting—or warning about—something below.",
      "choices": [
        {
          "text": "Follow the seal",
          "next": "medium_sea_d1_ra0_1"
        },
        {
          "text": "Climb the lighthouse steps",
          "next": "medium_sea_d1_rb1_16"
        }
      ]
    },
    "medium_stars_e4": {
      "ending": true,
      "title": "Restore the Constellation",
      "scene": "star_ship",
      "text": "You angle the mirror toward the dark sky. One star after another returns until the lost constellation shines brightly enough to guide the ship home."
    },
    "medium_stars_e5": {
      "ending": true,
      "title": "The Star Key",
      "scene": "treasure",
      "text": "The star-shaped key opens a small observatory drawer containing a new chart of the night sky. You carry the chart back to the enchanted library."
    },
    "medium_stars_d3_ra0a0a0_3": {
      "text": "Through the telescope, you spot a star-shaped key floating inside a cloud of violet dust.",
      "choices": [
        {
          "text": "Restore the constellation",
          "next": "medium_stars_choice_056"
        },
        {
          "text": "Find the star key",
          "next": "medium_stars_choice_057"
        }
      ]
    },
    "medium_stars_e7": {
      "ending": true,
      "title": "Moon Bridge Home",
      "scene": "moon",
      "text": "You guide the pilot across the moon bridge and back toward the library. The bridge glows beneath the ship like a silver ribbon."
    },
    "medium_stars_e8": {
      "ending": true,
      "title": "The Observatory",
      "scene": "wizard",
      "text": "The telescope reveals a tiny wizard living among the pages of the sky atlas. He helps you label the missing constellation before returning to his starry study."
    },
    "medium_stars_d3_ra0a0b1_6": {
      "text": "On the tiny moon, you discover a mirror that can send light back toward the dark constellation.",
      "choices": [
        {
          "text": "Open the moon route",
          "next": "medium_stars_choice_058"
        },
        {
          "text": "Grow the comet garden",
          "next": "medium_stars_choice_059"
        }
      ]
    },
    "medium_stars_d2_ra0a0_2": {
      "text": "A moon bridge leads to a quiet observatory where an old telescope is pointed toward a patch of empty sky.",
      "choices": [
        {
          "text": "Study the telescope",
          "next": "medium_stars_d3_ra0a0a0_3"
        },
        {
          "text": "Search the tiny moon",
          "next": "medium_stars_d3_ra0a0b1_6"
        },
        {
          "text": "Follow the blue signal",
          "next": "medium_stars_d2_ra0a0_2_side"
        }
      ]
    },
    "medium_stars_e11": {
      "ending": true,
      "title": "Comet Garden",
      "scene": "garden",
      "text": "Comet dust falls on a patch of moon soil and grows luminous flowers. The pilot promises to visit the garden whenever the ship passes by."
    },
    "medium_stars_e12": {
      "ending": true,
      "title": "A Safe Route",
      "scene": "map",
      "text": "You combine the telescope view and the pilot's notes into a clear route home. The map becomes a permanent page in the enchanted book."
    },
    "medium_stars_d3_ra0b1a0_10": {
      "text": "Through the telescope, you spot a star-shaped key floating inside a cloud of violet dust.",
      "choices": [
        {
          "text": "Chart the safe route",
          "next": "medium_stars_choice_060"
        },
        {
          "text": "Visit the moon castle",
          "next": "medium_stars_choice_061"
        }
      ]
    },
    "medium_stars_e14": {
      "ending": true,
      "title": "The Night Watch",
      "scene": "castle",
      "text": "The restored constellation reveals a tiny castle floating beyond the moon. Its lantern keepers wave as your ship passes."
    },
    "medium_stars_e15": {
      "ending": true,
      "title": "Sunrise Orbit",
      "scene": "sun",
      "text": "You guide the ship into a gentle orbit until the first golden sunrise appears. The library door opens just as the sky turns bright."
    },
    "medium_stars_d3_ra0b1b1_13": {
      "text": "On the tiny moon, you discover a mirror that can send light back toward the dark constellation.",
      "choices": [
        {
          "text": "Watch the sunrise",
          "next": "medium_stars_choice_062"
        },
        {
          "text": "Listen to the star choir",
          "next": "medium_stars_choice_063"
        }
      ]
    },
    "medium_stars_d2_ra0b1_9": {
      "text": "A trail of comet dust leads to a tiny moon. Something there is reflecting the lost constellation's light.",
      "choices": [
        {
          "text": "Search the tiny moon",
          "next": "medium_stars_d3_ra0b1a0_10"
        },
        {
          "text": "Guide the pilot",
          "next": "medium_stars_d3_ra0b1b1_13"
        },
        {
          "text": "Follow the blue signal",
          "next": "medium_stars_d2_ra0b1_9_side"
        }
      ]
    },
    "medium_stars_d1_ra0_1": {
      "text": "The pilot explains that the missing constellation is the ship's guide. Without it, the crew cannot find the library's return route.",
      "choices": [
        {
          "text": "Repair the observatory",
          "next": "medium_stars_d2_ra0a0_2"
        },
        {
          "text": "Follow the comet dust",
          "next": "medium_stars_d2_ra0b1_9"
        }
      ]
    },
    "medium_stars_e18": {
      "ending": true,
      "title": "The Star Choir",
      "scene": "phoenix",
      "text": "The constellation begins to sing in soft notes, and a phoenix made of starlight joins the melody. The pilot smiles as the whole sky seems to listen."
    },
    "medium_stars_d2_rb1a0_17": {
      "text": "A trail of comet dust leads to a tiny moon. Something there is reflecting the lost constellation's light.",
      "choices": [
        {
          "text": "Search the observatory",
          "next": "medium_stars_choice_064"
        },
        {
          "text": "Follow the blue signal",
          "next": "medium_stars_d2_rb1a0_17_side"
        }
      ]
    },
    "medium_stars_d1_rb1_16": {
      "text": "The pilot explains that the missing constellation is the ship's guide. Without it, the crew cannot find the library's return route.",
      "choices": [
        {
          "text": "Repair the observatory",
          "next": "medium_stars_d2_rb1a0_17"
        }
      ]
    },
    "medium_stars_root": {
      "text": "The starway opens above the library like a silver road stretching to infinity. A constellation has gone dark—simply vanished from its familiar place in the sky, leaving a void. A small starship waits nearby with its engine humming, the pilot watching you expectantly. The stars around the void seem to shimmer and pulse with sadness.",
      "choices": [
        {
          "text": "Board the starship",
          "next": "medium_stars_d1_ra0_1"
        },
        {
          "text": "Walk the moon bridge alone",
          "next": "medium_stars_d1_rb1_16"
        }
      ]
    },
    "hard_forest_e4": {
      "ending": true,
      "title": "Keeper of the Seeds",
      "scene": "forest_home",
      "text": "You return every enchanted seed to the vault and close it securely. When the wind settles, new leaves appear along the correct trails, restoring the forest's natural paths."
    },
    "hard_forest_e5": {
      "ending": true,
      "title": "The Living Bridge",
      "scene": "bridge",
      "text": "You strengthen the vine bridge without cutting its living strands. The animals cross safely, and the bridge curls back into a graceful arch."
    },
    "hard_forest_d3_ra0a0a0_3": {
      "text": "The compass points toward the seed vault. You carefully sort the seeds by the pictures carved on their shells.",
      "choices": [
        {
          "text": "Restore the seed vault",
          "next": "hard_forest_choice_065"
        },
        {
          "text": "Record the trail",
          "next": "hard_forest_choice_066"
        }
      ]
    },
    "hard_forest_e7": {
      "ending": true,
      "title": "Compass of the Woods",
      "scene": "map",
      "text": "The compass stone becomes clear once the wind quiets. You copy its markings into a map and leave the map in the library for future woodland travelers."
    },
    "hard_forest_e8": {
      "ending": true,
      "title": "The Whistle's Rest",
      "scene": "treasure",
      "text": "You find the silver whistle beneath an old stump and choose not to blow it. Instead, you return it to its keeper, who explains that some magic is safest when left quiet."
    },
    "hard_forest_d3_ra0a0b1_6": {
      "text": "You anchor the vine bridge with fallen branches, creating a safe crossing for the animals.",
      "choices": [
        {
          "text": "Strengthen the bridge",
          "next": "hard_forest_choice_067"
        },
        {
          "text": "Test the crossing",
          "next": "hard_forest_choice_068"
        }
      ]
    },
    "hard_forest_e10": {
      "ending": true,
      "title": "Seed Garden",
      "scene": "garden",
      "text": "The scattered seeds are planted in the proper places, and a hidden garden blooms around the vault. Each flower carries the color of a different forest trail."
    },
    "hard_forest_e11": {
      "ending": true,
      "title": "Fox at Twilight",
      "scene": "moon",
      "text": "The fox leads you home by a route that only appears at twilight. From the hilltop, you watch the restored paths glow faintly beneath the moon."
    },
    "hard_forest_d3_ra0a0c2_9": {
      "text": "The fox reveals that the wandering wind follows the sound of a silver whistle hidden somewhere in the woods.",
      "choices": [
        {
          "text": "Find the whistle",
          "next": "hard_forest_choice_069"
        },
        {
          "text": "Leave it untouched",
          "next": "hard_forest_choice_070"
        }
      ]
    },
    "hard_forest_d2_ra0a0_2": {
      "text": "You follow the silver leaves to a clearing where an old seed vault has been opened. Several enchanted seeds are scattered across the moss.",
      "choices": [
        {
          "text": "Sort the enchanted seeds",
          "next": "hard_forest_d3_ra0a0a0_3"
        },
        {
          "text": "Trace the silver whistle",
          "next": "hard_forest_d3_ra0a0b1_6"
        },
        {
          "text": "Study the seed vault",
          "next": "hard_forest_d3_ra0a0c2_9"
        },
        {
          "text": "Read the forest ledger",
          "next": "hard_forest_d2_ra0a0_2_side"
        }
      ]
    },
    "hard_forest_e14": {
      "ending": true,
      "title": "The Woodland Archive",
      "scene": "library_return",
      "text": "You bring the compass rubbing and the seed record back to the enchanted library. The librarian adds them to a new volume about caring for magical places."
    },
    "hard_forest_e15": {
      "ending": true,
      "title": "Wind Lantern",
      "scene": "wizard",
      "text": "The silver leaves become a lantern when gathered gently. A forest wizard teaches you how to hang it where its glow will guide travelers without changing their path."
    },
    "hard_forest_d3_ra0b1a0_13": {
      "text": "The compass points toward the seed vault. You carefully sort the seeds by the pictures carved on their shells.",
      "choices": [
        {
          "text": "Guide the animals",
          "next": "hard_forest_choice_071"
        },
        {
          "text": "Map the safe crossing",
          "next": "hard_forest_choice_072"
        }
      ]
    },
    "hard_forest_e17": {
      "ending": true,
      "title": "A New Trail",
      "scene": "mountain",
      "text": "You discover that the wandering wind has opened a trail toward a distant green mountain. You mark the route carefully, knowing that another adventure will begin there someday."
    },
    "hard_forest_d3_ra0b1b1_16": {
      "text": "You anchor the vine bridge with fallen branches, creating a safe crossing for the animals.",
      "choices": [
        {
          "text": "Follow the twilight trail",
          "next": "hard_forest_choice_073"
        }
      ]
    },
    "hard_forest_d2_ra0b1_12": {
      "text": "The fox guides you toward a stream where the wind has tangled a bridge of living vines. A nest hangs precariously above the water.",
      "choices": [
        {
          "text": "Secure the vine bridge",
          "next": "hard_forest_d3_ra0b1a0_13"
        },
        {
          "text": "Follow the fox",
          "next": "hard_forest_d3_ra0b1b1_16"
        },
        {
          "text": "Read the forest ledger",
          "next": "hard_forest_d2_ra0b1_12_side"
        }
      ]
    },
    "hard_forest_d1_ra0_1": {
      "text": "You examine the compass stone and realize the forest paths are being rearranged by a wandering wind. If the wind continues, the woodland animals may lose their familiar routes.",
      "choices": [
        {
          "text": "Examine the compass stone",
          "next": "hard_forest_d2_ra0a0_2"
        },
        {
          "text": "Follow the stream",
          "next": "hard_forest_d2_ra0b1_12"
        }
      ]
    },
    "hard_forest_root": {
      "text": "The Whispering Woods are unusually still—no birds, no wind in the leaves. A trail of silver leaves leads beneath ancient oaks toward a stone marked with a half-erased compass. The leaves chill slightly when you touch them, as if they've been waiting just for you. A fox watches from the shadows.",
      "choices": [
        {
          "text": "Follow the silver leaves",
          "next": "hard_forest_d1_ra0_1"
        }
      ]
    },
    "hard_castle_e4": {
      "ending": true,
      "title": "The Keeper's Promise",
      "scene": "crown",
      "text": "You restore the founding page and read the old promise aloud. The clocks begin moving together, and the castle welcomes you as an honorary keeper."
    },
    "hard_castle_e5": {
      "ending": true,
      "title": "The Open Castle",
      "scene": "castle",
      "text": "You use the ceremonial key to unlock the castle's gates. The servants cheer as the keep becomes bright and welcoming once more."
    },
    "hard_castle_d3_ra0a0a0_3": {
      "text": "The founding history describes a promise made by the first keeper: the castle would remain open to anyone who came in peace.",
      "choices": [
        {
          "text": "Restore the keeper's promise",
          "next": "hard_castle_choice_074"
        },
        {
          "text": "Open the castle gates",
          "next": "hard_castle_choice_075"
        }
      ]
    },
    "hard_castle_e7": {
      "ending": true,
      "title": "The Archive's Secret",
      "scene": "library_return",
      "text": "You return the correct founding history to the archive and leave the false copies untouched. The librarian thanks you for preserving the story rather than changing it."
    },
    "hard_castle_e8": {
      "ending": true,
      "title": "The Clockwork Dragon",
      "scene": "dragon_friend",
      "text": "The silent clock opens to reveal a tiny mechanical dragon keeping its gears in order. You repair its loose spring, and it bows before returning to its clockwork nest."
    },
    "hard_castle_d3_ra0a0b1_6": {
      "text": "The eastern tower inscription suggests that the clock is not measuring time at all; it is measuring whether the castle still keeps its promise.",
      "choices": [
        {
          "text": "Meet the clockwork dragon",
          "next": "hard_castle_choice_076"
        },
        {
          "text": "Help the evening feast",
          "next": "hard_castle_choice_077"
        }
      ]
    },
    "hard_castle_e10": {
      "ending": true,
      "title": "Feast at Sunset",
      "scene": "feast",
      "text": "The restored clock reaches sunset, and the empty tables fill with food as if the castle has been waiting for that exact moment. Everyone is invited to share the meal."
    },
    "hard_castle_e11": {
      "ending": true,
      "title": "The Brass Key",
      "scene": "treasure",
      "text": "The ceremonial key is placed back in its display case, but the castle gives you a small brass copy for your courage. You carry it home as a reminder of the keeper's promise."
    },
    "hard_castle_d3_ra0a0c2_9": {
      "text": "The ceremonial key is found inside a locked display case beside a portrait of the first keeper.",
      "choices": [
        {
          "text": "Enter the garden",
          "next": "hard_castle_choice_078"
        },
        {
          "text": "Repair the archive",
          "next": "hard_castle_choice_079"
        }
      ]
    },
    "hard_castle_d2_ra0a0_2": {
      "text": "You climb the eastern tower and discover that its gears are moving, but the hands cannot agree on the hour. A brass inscription asks the reader to choose what the castle should remember.",
      "choices": [
        {
          "text": "Find the true history",
          "next": "hard_castle_d3_ra0a0a0_3"
        },
        {
          "text": "Study the clock inscription",
          "next": "hard_castle_d3_ra0a0b1_6"
        },
        {
          "text": "Search the old portrait",
          "next": "hard_castle_d3_ra0a0c2_9"
        },
        {
          "text": "Study the old service passage",
          "next": "hard_castle_d2_ra0a0_2_side"
        }
      ]
    },
    "hard_castle_e14": {
      "ending": true,
      "title": "Tower Garden",
      "scene": "garden",
      "text": "Behind the eastern clock you discover a roof garden planted by the first keeper. Its flowers open whenever the castle acts with kindness."
    },
    "hard_castle_e15": {
      "ending": true,
      "title": "The Castle Map",
      "scene": "map",
      "text": "The archives reveal a detailed map of every tower, hall, and hidden stair. You return it to its proper shelf so future visitors can navigate the keep safely."
    },
    "hard_castle_d3_ra0b1a0_13": {
      "text": "The founding history describes a promise made by the first keeper: the castle would remain open to anyone who came in peace.",
      "choices": [
        {
          "text": "Protect the castle's promise",
          "next": "hard_castle_choice_080"
        },
        {
          "text": "Return the key",
          "next": "hard_castle_choice_081"
        }
      ]
    },
    "hard_castle_e17": {
      "ending": true,
      "title": "The Midnight Bell",
      "scene": "moon",
      "text": "At midnight, every clock gives a single gentle chime. The castle settles into peaceful silence, its promise preserved for another generation."
    },
    "hard_castle_d3_ra0b1b1_16": {
      "text": "The eastern tower inscription suggests that the clock is not measuring time at all; it is measuring whether the castle still keeps its promise.",
      "choices": [
        {
          "text": "Ring the midnight bell",
          "next": "hard_castle_choice_082"
        }
      ]
    },
    "hard_castle_d2_ra0b1_12": {
      "text": "The great hall is prepared for a feast, yet the tables remain empty because the castle's ceremonial key has vanished.",
      "choices": [
        {
          "text": "Repair the tower clock",
          "next": "hard_castle_d3_ra0b1a0_13"
        },
        {
          "text": "Find the ceremonial key",
          "next": "hard_castle_d3_ra0b1b1_16"
        },
        {
          "text": "Study the old service passage",
          "next": "hard_castle_d2_ra0b1_12_side"
        }
      ]
    },
    "hard_castle_d1_ra0_1": {
      "text": "You follow the cat into the archive and find three histories of the castle. Only one contains the symbol engraved on the silent clock.",
      "choices": [
        {
          "text": "Study the founding histories",
          "next": "hard_castle_d2_ra0a0_2"
        },
        {
          "text": "Climb the eastern tower",
          "next": "hard_castle_d2_ra0b1_12"
        }
      ]
    },
    "hard_castle_root": {
      "text": "The castle's clock has stopped at the same moment on every tower—midnight, or perhaps the very moment the magic began. Servants whisper nervously that the keep is waiting for a missing page from its founding story, and the castle cat carries a ribbon toward the archives as if she knows exactly where to look. The air tastes like old parchment and forgotten songs.",
      "choices": [
        {
          "text": "Follow the archive cat",
          "next": "hard_castle_d1_ra0_1"
        }
      ]
    },
    "hard_sea_e4": {
      "ending": true,
      "title": "The Safe Harbor",
      "scene": "ocean_boat",
      "text": "You restore the signal sequence before the storm arrives. Boats follow the lighthouse beam into the protected harbor, where the waves cannot reach them."
    },
    "hard_sea_e5": {
      "ending": true,
      "title": "The Reef Chart",
      "scene": "map",
      "text": "You complete the old chart with the submerged reef markings. The finished map becomes part of the lighthouse archive and the enchanted library."
    },
    "hard_sea_d3_ra0a0a0_3": {
      "text": "The brass markers identify a submerged reef. You place them in a line that reveals the safest channel for boats.",
      "choices": [
        {
          "text": "Mark the safe channel",
          "next": "hard_sea_choice_083"
        },
        {
          "text": "Complete the chart",
          "next": "hard_sea_choice_084"
        }
      ]
    },
    "hard_sea_e7": {
      "ending": true,
      "title": "The Sheltered Cove",
      "scene": "cave_light",
      "text": "The hidden route leads to a cave where the storm sounds distant. Inside, the walls glow with shells left by generations of careful sailors."
    },
    "hard_sea_e8": {
      "ending": true,
      "title": "Keeper of the Light",
      "scene": "village",
      "text": "The lighthouse keeper invites you to the harbor village after the storm passes. The villagers thank you for taking the signal work seriously."
    },
    "hard_sea_d3_ra0a0b1_6": {
      "text": "The old chart becomes readable when the lighthouse beam passes across it. A hidden route appears toward a sheltered cove.",
      "choices": [
        {
          "text": "Explore the sheltered cove",
          "next": "hard_sea_choice_085"
        },
        {
          "text": "Secure the marker",
          "next": "hard_sea_choice_086"
        }
      ]
    },
    "hard_sea_e10": {
      "ending": true,
      "title": "The Brass Markers",
      "scene": "treasure",
      "text": "You recover the brass markers and polish them until their symbols shine. The keeper stores them safely for the next stormy night."
    },
    "hard_sea_e11": {
      "ending": true,
      "title": "Storm Moon",
      "scene": "moon",
      "text": "The clouds break just as the final signal is lit. Under the moon, the sea settles into long silver lines around the quiet harbor."
    },
    "hard_sea_d3_ra0a0c2_9": {
      "text": "The keeper gives you responsibility for one signal: a choice between warning ships away or guiding them toward the protected harbor.",
      "choices": [
        {
          "text": "Restore the harbor signal",
          "next": "hard_sea_choice_087"
        },
        {
          "text": "Choose the safer route",
          "next": "hard_sea_choice_088"
        }
      ]
    },
    "hard_sea_d2_ra0a0_2": {
      "text": "You follow a seal to a tide pool where several brass markers form a pattern. The pattern resembles a warning used by the old harbor keepers.",
      "choices": [
        {
          "text": "Align the brass markers",
          "next": "hard_sea_d3_ra0a0a0_3"
        },
        {
          "text": "Read the hidden chart",
          "next": "hard_sea_d3_ra0a0b1_6"
        },
        {
          "text": "Check the reef warning",
          "next": "hard_sea_d3_ra0a0c2_9"
        },
        {
          "text": "Trace the old current map",
          "next": "hard_sea_d2_ra0a0_2_side"
        }
      ]
    },
    "hard_sea_e14": {
      "ending": true,
      "title": "Garden by the Sea",
      "scene": "garden",
      "text": "Behind the lighthouse, rainwater fills a small garden basin. Salt-tolerant flowers bloom there, and you help the keeper protect them from the wind."
    },
    "hard_sea_e15": {
      "ending": true,
      "title": "The Lighthouse Bridge",
      "scene": "bridge",
      "text": "The old route crosses a narrow rocky inlet. You secure its rope bridge before anyone crosses, turning a dangerous shortcut into a safe passage."
    },
    "hard_sea_d3_ra0b1a0_13": {
      "text": "The brass markers identify a submerged reef. You place them in a line that reveals the safest channel for boats.",
      "choices": [
        {
          "text": "Help the harbor village",
          "next": "hard_sea_choice_089"
        },
        {
          "text": "Recover the markers",
          "next": "hard_sea_choice_090"
        }
      ]
    },
    "hard_sea_e17": {
      "ending": true,
      "title": "The Harbor's Memory",
      "scene": "library_return",
      "text": "You bring a copy of the restored signal code back to the enchanted library. Its pages whisper with the sound of waves whenever another reader opens it."
    },
    "hard_sea_d3_ra0b1b1_16": {
      "text": "The old chart becomes readable when the lighthouse beam passes across it. A hidden route appears toward a sheltered cove.",
      "choices": [
        {
          "text": "Light the moon signal",
          "next": "hard_sea_choice_091"
        }
      ]
    },
    "hard_sea_d2_ra0b1_12": {
      "text": "At the lighthouse, the keeper explains that the storm can be safely guided around the island if the forgotten signal sequence is restored.",
      "choices": [
        {
          "text": "Read the keeper's journal",
          "next": "hard_sea_d3_ra0b1a0_13"
        },
        {
          "text": "Guide the signal",
          "next": "hard_sea_d3_ra0b1b1_16"
        },
        {
          "text": "Trace the old current map",
          "next": "hard_sea_d2_ra0b1_12_side"
        }
      ]
    },
    "hard_sea_d1_ra0_1": {
      "text": "You study the chart and notice that the missing section matches the shape of the lighthouse lens. Perhaps the route was meant to be read through light.",
      "choices": [
        {
          "text": "Follow the lighthouse clue",
          "next": "hard_sea_d2_ra0a0_2"
        },
        {
          "text": "Follow the harbor markers",
          "next": "hard_sea_d2_ra0b1_12"
        }
      ]
    },
    "hard_sea_root": {
      "text": "A storm is building far beyond the lighthouse, clouds roiling like something alive, but the harbor itself remains strangely calm—too calm. An old chart has washed ashore, marked with a route that disappears beneath the tide. The parchment hums softly when you hold it. You can sense the storm's hunger, watching and waiting.",
      "choices": [
        {
          "text": "Study the old chart",
          "next": "hard_sea_d1_ra0_1"
        }
      ]
    },
    "hard_stars_e4": {
      "ending": true,
      "title": "The Hidden Constellation",
      "scene": "star_ship",
      "text": "You unfold the forgotten story and release the hidden constellation into the sky. The starship's route becomes clear, and its navigator charts a new path for curious readers."
    },
    "hard_stars_e5": {
      "ending": true,
      "title": "The Astrolabe",
      "scene": "treasure",
      "text": "You repair the astrolabe without replacing its unusual pieces. Its rings now turn smoothly, revealing that every journey can be measured in more than distance."
    },
    "hard_stars_d3_ra0a0a0_3": {
      "text": "The astrolabe reveals that the hidden constellation is not missing; it has been folded into the pages of a forgotten story.",
      "choices": [
        {
          "text": "Unfold the hidden story",
          "next": "hard_stars_choice_092"
        },
        {
          "text": "Repair the astrolabe",
          "next": "hard_stars_choice_093"
        }
      ]
    },
    "hard_stars_e7": {
      "ending": true,
      "title": "The Moon Bridge",
      "scene": "moon",
      "text": "You restore the bridge one stone at a time. When the final stone glows, a silver road appears between the library and the quiet stars."
    },
    "hard_stars_e8": {
      "ending": true,
      "title": "Garden of True Stories",
      "scene": "garden",
      "text": "You tell the star-flowers a story about a time when asking for help mattered. One by one they bloom, illuminating the silent planet."
    },
    "hard_stars_d3_ra0a0b1_6": {
      "text": "On the silent planet, you discover a garden of sleeping star-flowers that brighten when someone tells a true story.",
      "choices": [
        {
          "text": "Cross the moon bridge",
          "next": "hard_stars_choice_094"
        },
        {
          "text": "Tell the star-flowers a story",
          "next": "hard_stars_choice_095"
        }
      ]
    },
    "hard_stars_e10": {
      "ending": true,
      "title": "The Forgotten Story",
      "scene": "library_return",
      "text": "You return the unfolded story to the enchanted library and give it a new place on the shelf. The librarian leaves the cover blank so another reader may add to it."
    },
    "hard_stars_e11": {
      "ending": true,
      "title": "Dawn Beyond the Clouds",
      "scene": "sun",
      "text": "The starship rises above the cloud layer just as dawn begins. The stars fade, but their route remains written in the ship's memory."
    },
    "hard_stars_d3_ra0a0c2_9": {
      "text": "The moon bridge responds when you place the astrolabe's ring against its first stone.",
      "choices": [
        {
          "text": "Chart the safe routes",
          "next": "hard_stars_choice_096"
        },
        {
          "text": "Explore the new path",
          "next": "hard_stars_choice_097"
        }
      ]
    },
    "hard_stars_d2_ra0a0_2": {
      "text": "You enter the observatory and find a damaged astrolabe. Its final ring points toward a silent planet wrapped in pale clouds.",
      "choices": [
        {
          "text": "Compare the old atlas",
          "next": "hard_stars_d3_ra0a0a0_3"
        },
        {
          "text": "Study the silent planet",
          "next": "hard_stars_d3_ra0a0b1_6"
        },
        {
          "text": "Trace the hidden route",
          "next": "hard_stars_d3_ra0a0c2_9"
        },
        {
          "text": "Decode the silent signal",
          "next": "hard_stars_d2_ra0a0_2_side"
        }
      ]
    },
    "hard_stars_e14": {
      "ending": true,
      "title": "The Star Archive",
      "scene": "map",
      "text": "The repaired astrolabe reveals a vast archive of routes. You copy only the safe ones into the library's map book, leaving the unknown paths for future explorers."
    },
    "hard_stars_e15": {
      "ending": true,
      "title": "Phoenix of Starlight",
      "scene": "phoenix",
      "text": "A phoenix made from scattered starlight emerges from the hidden constellation. It circles the ship once, then settles near the observatory as its new guardian."
    },
    "hard_stars_d3_ra0b1a0_13": {
      "text": "The astrolabe reveals that the hidden constellation is not missing; it has been folded into the pages of a forgotten story.",
      "choices": [
        {
          "text": "Guide the starship",
          "next": "hard_stars_choice_098"
        },
        {
          "text": "Study the star archive",
          "next": "hard_stars_choice_099"
        }
      ]
    },
    "hard_stars_e17": {
      "ending": true,
      "title": "The Quiet Planet",
      "scene": "mountain",
      "text": "You climb a small silver mountain and see the entire constellation reflected in its snowy slopes. The navigator decides to name the peak after the first reader who found it."
    },
    "hard_stars_d3_ra0b1b1_16": {
      "text": "On the silent planet, you discover a garden of sleeping star-flowers that brighten when someone tells a true story.",
      "choices": [
        {
          "text": "Climb the silver mountain",
          "next": "hard_stars_choice_100"
        }
      ]
    },
    "hard_stars_d2_ra0b1_12": {
      "text": "The starship's navigator asks you to inspect the moon bridge, where a trail of blue light disappears before reaching the other side.",
      "choices": [
        {
          "text": "Wake the star-flowers",
          "next": "hard_stars_d3_ra0b1a0_13"
        },
        {
          "text": "Restore the moon bridge",
          "next": "hard_stars_d3_ra0b1b1_16"
        },
        {
          "text": "Decode the silent signal",
          "next": "hard_stars_d2_ra0b1_12_side"
        }
      ]
    },
    "hard_stars_d1_ra0_1": {
      "text": "You compare the sky with an old atlas and notice that the missing constellation marks a route between the library and worlds that have never appeared in the book.",
      "choices": [
        {
          "text": "Repair the astrolabe",
          "next": "hard_stars_d2_ra0a0_2"
        },
        {
          "text": "Cross toward the observatory",
          "next": "hard_stars_d2_ra0b1_12"
        }
      ]
    },
    "hard_stars_root": {
      "text": "Beyond the library's highest window, the stars have formed an unfamiliar pattern—one that shouldn't exist. A starship waits beside a moon bridge, its navigator convinced that one constellation has been deliberately hidden, erased from the sky like a secret. The ship's engine hums with a question that needs answering. Something important is missing.",
      "choices": [
        {
          "text": "Study the unfamiliar constellation",
          "next": "hard_stars_d1_ra0_1"
        }
      ]
    },
    "easy_forest_choice_001": {
      "text": "The moment called “The Lost Book” feels like an ending, but the magic of the book leaves one small door open. A familiar rustle comes from the trees, as if the forest has one last secret to share.",
      "choices": [
        {
          "text": "Return to the library",
          "next": "easy_forest_e4"
        },
        {
          "text": "Explore one more trail",
          "next": "easy_forest_choice_001_alt"
        }
      ]
    },
    "easy_forest_choice_001_alt": {
      "ending": true,
      "title": "The Lost Book: The Longer Trail",
      "scene": "garden",
      "text": "You choose to explore a little longer. The trail leads to a peaceful place where the forest friends you met gather to say goodbye, and you return to the book carrying a new leaf-shaped bookmark."
    },
    "easy_forest_choice_002": {
      "text": "The moment called “Owl's New Nest” feels like an ending, but the magic of the book leaves one small door open. A familiar rustle comes from the trees, as if the forest has one last secret to share.",
      "choices": [
        {
          "text": "Return to the library",
          "next": "easy_forest_e5"
        },
        {
          "text": "Explore one more trail",
          "next": "easy_forest_choice_002_alt"
        }
      ]
    },
    "easy_forest_choice_002_alt": {
      "ending": true,
      "title": "Owl's New Nest: The Longer Trail",
      "scene": "map",
      "text": "You choose to explore a little longer. The trail leads to a peaceful place where the forest friends you met gather to say goodbye, and you return to the book carrying a new leaf-shaped bookmark."
    },
    "easy_forest_choice_003": {
      "text": "The moment called “Berry Picnic” feels like an ending, but the magic of the book leaves one small door open. A familiar rustle comes from the trees, as if the forest has one last secret to share.",
      "choices": [
        {
          "text": "Return to the library",
          "next": "easy_forest_e7"
        },
        {
          "text": "Explore one more trail",
          "next": "easy_forest_choice_003_alt"
        }
      ]
    },
    "easy_forest_choice_003_alt": {
      "ending": true,
      "title": "Berry Picnic: The Longer Trail",
      "scene": "village",
      "text": "You choose to explore a little longer. The trail leads to a peaceful place where the forest friends you met gather to say goodbye, and you return to the book carrying a new leaf-shaped bookmark."
    },
    "easy_forest_choice_004": {
      "text": "The moment called “The Singing Acorn” feels like an ending, but the magic of the book leaves one small door open. A familiar rustle comes from the trees, as if the forest has one last secret to share.",
      "choices": [
        {
          "text": "Return to the library",
          "next": "easy_forest_e8"
        },
        {
          "text": "Explore one more trail",
          "next": "easy_forest_choice_004_alt"
        }
      ]
    },
    "easy_forest_choice_004_alt": {
      "ending": true,
      "title": "The Singing Acorn: The Longer Trail",
      "scene": "forest_home",
      "text": "You choose to explore a little longer. The trail leads to a peaceful place where the forest friends you met gather to say goodbye, and you return to the book carrying a new leaf-shaped bookmark."
    },
    "easy_forest_choice_005": {
      "text": "The moment called “Moonlit Shortcut” feels like an ending, but the magic of the book leaves one small door open. A familiar rustle comes from the trees, as if the forest has one last secret to share.",
      "choices": [
        {
          "text": "Return to the library",
          "next": "easy_forest_e11"
        },
        {
          "text": "Explore one more trail",
          "next": "easy_forest_choice_005_alt"
        }
      ]
    },
    "easy_forest_choice_005_alt": {
      "ending": true,
      "title": "Moonlit Shortcut: The Longer Trail",
      "scene": "garden",
      "text": "You choose to explore a little longer. The trail leads to a peaceful place where the forest friends you met gather to say goodbye, and you return to the book carrying a new leaf-shaped bookmark."
    },
    "easy_forest_choice_006": {
      "text": "The moment called “Rainy Treehouse” feels like an ending, but the magic of the book leaves one small door open. A familiar rustle comes from the trees, as if the forest has one last secret to share.",
      "choices": [
        {
          "text": "Return to the library",
          "next": "easy_forest_e12"
        },
        {
          "text": "Explore one more trail",
          "next": "easy_forest_choice_006_alt"
        }
      ]
    },
    "easy_forest_choice_006_alt": {
      "ending": true,
      "title": "Rainy Treehouse: The Longer Trail",
      "scene": "map",
      "text": "You choose to explore a little longer. The trail leads to a peaceful place where the forest friends you met gather to say goodbye, and you return to the book carrying a new leaf-shaped bookmark."
    },
    "easy_forest_choice_007": {
      "text": "The moment called “Forest Map” feels like an ending, but the magic of the book leaves one small door open. A familiar rustle comes from the trees, as if the forest has one last secret to share.",
      "choices": [
        {
          "text": "Return to the library",
          "next": "easy_forest_e14"
        },
        {
          "text": "Explore one more trail",
          "next": "easy_forest_choice_007_alt"
        }
      ]
    },
    "easy_forest_choice_007_alt": {
      "ending": true,
      "title": "Forest Map: The Longer Trail",
      "scene": "village",
      "text": "You choose to explore a little longer. The trail leads to a peaceful place where the forest friends you met gather to say goodbye, and you return to the book carrying a new leaf-shaped bookmark."
    },
    "easy_castle_choice_008": {
      "text": "You've helped the castle baker, and the magical moment called \"The Baker's Bell\" feels like an ending. But then a quiet bell sounds somewhere above you, and a final stair glows in the castle wall—golden and inviting. The magic of the book leaves one small door open.",
      "choices": [
        {
          "text": "Accept the thanks and return home",
          "next": "easy_castle_e4"
        },
        {
          "text": "Climb one last stair",
          "next": "easy_castle_choice_008_alt"
        }
      ]
    },
    "easy_castle_choice_008_alt": {
      "ending": true,
      "title": "The Baker's Bell: One Last Door",
      "scene": "castle",
      "text": "You climb one last stair and find a sunny room where the castle baker and all your friends are waiting. They show you a tiny window to the library, and you wave goodbye before the book closes gently on this perfect ending."
    },
    "easy_castle_choice_009": {
      "text": "The moment called \"The Tiny Crown\" feels like an ending as the queen bows to you. But then a quiet bell sounds somewhere above you, and a final stair glows in the castle wall—golden and inviting. The magic of the book leaves one small door open for you.",
      "choices": [
        {
          "text": "Accept the queen's gratitude and leave",
          "next": "easy_castle_e5"
        },
        {
          "text": "Climb one last stair",
          "next": "easy_castle_choice_009_alt"
        }
      ]
    },
    "easy_castle_choice_009_alt": {
      "ending": true,
      "title": "The Tiny Crown: One Last Door",
      "scene": "feast",
      "text": "You climb one last stair and find a feast prepared in your honor. The queen and all the castle friends are there, celebrating you. They show you a tiny window to the library, and you wave as the golden light fades and the book closes."
    },
    "easy_castle_choice_010": {
      "text": "You've discovered the secret garden, and the moment feels complete. But then a quiet bell sounds somewhere above you, and a final stair glows in the castle wall—golden and inviting. The magic of the book always leaves one small door open.",
      "choices": [
        {
          "text": "Leave the garden in peace",
          "next": "easy_castle_e7"
        },
        {
          "text": "Climb one last stair",
          "next": "easy_castle_choice_010_alt"
        }
      ]
    },
    "easy_castle_choice_010_alt": {
      "ending": true,
      "title": "Secret Garden: One Last Door",
      "scene": "crown",
      "text": "You climb one last stair and find a sunny room where the castle friends are waiting. They show you a tiny window to the library, and you wave before the book closes, keeping the secret garden safe within its pages forever."
    },
    "easy_castle_choice_011": {
      "text": "The castle baker's recipe book is now yours, and the moment called \"The Recipe Book\" feels like a perfect ending. But then a quiet bell sounds somewhere above you, and a final stair glows in the castle wall—golden and inviting. The magic leaves one more door open.",
      "choices": [
        {
          "text": "Keep the recipes close and return home",
          "next": "easy_castle_e8"
        },
        {
          "text": "Climb one last stair",
          "next": "easy_castle_choice_011_alt"
        }
      ]
    },
    "easy_castle_choice_011_alt": {
      "ending": true,
      "title": "The Recipe Book: One Last Door",
      "scene": "garden",
      "text": "You climb one last stair and find a sunny room where the castle friends are waiting. They show you a tiny window to the library, and you wave before the book closes, knowing you'll always have the recipes to remember them."
    },
    "easy_castle_choice_012": {
      "text": "You've found the tower's brightest star, and the moment called \"Tower Star\" feels like an ending. But then a quiet bell sounds somewhere above you, and a final stair glows in the castle wall—golden and inviting. The magic offers one last choice.",
      "choices": [
        {
          "text": "Descend peacefully with the star's memory",
          "next": "easy_castle_e11"
        },
        {
          "text": "Climb one last stair",
          "next": "easy_castle_choice_012_alt"
        }
      ]
    },
    "easy_castle_choice_012_alt": {
      "ending": true,
      "title": "Tower Star: One Last Door",
      "scene": "castle",
      "text": "You climb one last stair and find a sunny room where the castle friends are waiting. They show you a tiny window to the library, and you wave before the book closes, carrying the star's light with you always."
    },
    "easy_castle_choice_013": {
      "text": "The kind knight bows to you, and the moment called \"Kind Knight\" feels like it should be an ending. But then a quiet bell sounds somewhere above you, and a final stair glows in the castle wall—golden and inviting. The magic isn't quite finished.",
      "choices": [
        {
          "text": "Accept the knight's thanks and leave",
          "next": "easy_castle_e12"
        },
        {
          "text": "Climb one last stair",
          "next": "easy_castle_choice_013_alt"
        }
      ]
    },
    "easy_castle_choice_013_alt": {
      "ending": true,
      "title": "Kind Knight: One Last Door",
      "scene": "feast",
      "text": "You climb one last stair and find a sunny room where the kind knight and all your castle friends are waiting. They show you a tiny window to the library, and you wave before the book closes on this moment of friendship."
    },
    "easy_castle_choice_014": {
      "text": "You've found the castle's greatest treasure, and the moment called \"Castle Treasure\" feels complete. But then a quiet bell sounds somewhere above you, and a final stair glows in the castle wall—golden and inviting. One last door remains open.",
      "choices": [
        {
          "text": "Hold the treasure close and head home",
          "next": "easy_castle_e14"
        },
        {
          "text": "Climb one last stair",
          "next": "easy_castle_choice_014_alt"
        }
      ]
    },
    "easy_castle_choice_014_alt": {
      "ending": true,
      "title": "Castle Treasure: One Last Door",
      "scene": "treasure",
      "text": "You climb one last stair and find a sunny room where the castle friends are waiting. They show you a tiny window to the library, and you wave before the book closes, knowing the treasure will live forever in your memories."
    },
    "easy_sea_choice_015": {
      "text": "The moment called “The Lighthouse Bell” feels like an ending, but the magic of the book leaves one small door open. Far across the water, a lantern flashes twice and then waits for your answer.",
      "choices": [
        {
          "text": "Sail for home",
          "next": "easy_sea_e4"
        },
        {
          "text": "Follow the lantern",
          "next": "easy_sea_choice_015_alt"
        }
      ]
    },
    "easy_sea_choice_015_alt": {
      "ending": true,
      "title": "The Lighthouse Bell: Beyond the Harbor",
      "scene": "bridge",
      "text": "You follow the lantern across the calm water. It leads to a tiny harbor where the sea friends wave, and a warm breeze carries you safely back to the book."
    },
    "easy_sea_choice_016": {
      "text": "The moment called “Pearl Gate” feels like an ending, but the magic of the book leaves one small door open. Far across the water, a lantern flashes twice and then waits for your answer.",
      "choices": [
        {
          "text": "Sail for home",
          "next": "easy_sea_e5"
        },
        {
          "text": "Follow the lantern",
          "next": "easy_sea_choice_016_alt"
        }
      ]
    },
    "easy_sea_choice_016_alt": {
      "ending": true,
      "title": "Pearl Gate: Beyond the Harbor",
      "scene": "ocean_boat",
      "text": "You follow the lantern across the calm water. It leads to a tiny harbor where the sea friends wave, and a warm breeze carries you safely back to the book."
    },
    "easy_sea_choice_017": {
      "text": "The moment called “Dolphin Ride” feels like an ending, but the magic of the book leaves one small door open. Far across the water, a lantern flashes twice and then waits for your answer.",
      "choices": [
        {
          "text": "Sail for home",
          "next": "easy_sea_e7"
        },
        {
          "text": "Follow the lantern",
          "next": "easy_sea_choice_017_alt"
        }
      ]
    },
    "easy_sea_choice_017_alt": {
      "ending": true,
      "title": "Dolphin Ride: Beyond the Harbor",
      "scene": "village",
      "text": "You follow the lantern across the calm water. It leads to a tiny harbor where the sea friends wave, and a warm breeze carries you safely back to the book."
    },
    "easy_sea_choice_018": {
      "text": "The moment called “Shell Message” feels like an ending, but the magic of the book leaves one small door open. Far across the water, a lantern flashes twice and then waits for your answer.",
      "choices": [
        {
          "text": "Sail for home",
          "next": "easy_sea_e8"
        },
        {
          "text": "Follow the lantern",
          "next": "easy_sea_choice_018_alt"
        }
      ]
    },
    "easy_sea_choice_018_alt": {
      "ending": true,
      "title": "Shell Message: Beyond the Harbor",
      "scene": "moon",
      "text": "You follow the lantern across the calm water. It leads to a tiny harbor where the sea friends wave, and a warm breeze carries you safely back to the book."
    },
    "easy_sea_choice_019": {
      "text": "The moment called “Lighthouse Garden” feels like an ending, but the magic of the book leaves one small door open. Far across the water, a lantern flashes twice and then waits for your answer.",
      "choices": [
        {
          "text": "Sail for home",
          "next": "easy_sea_e11"
        },
        {
          "text": "Follow the lantern",
          "next": "easy_sea_choice_019_alt"
        }
      ]
    },
    "easy_sea_choice_019_alt": {
      "ending": true,
      "title": "Lighthouse Garden: Beyond the Harbor",
      "scene": "bridge",
      "text": "You follow the lantern across the calm water. It leads to a tiny harbor where the sea friends wave, and a warm breeze carries you safely back to the book."
    },
    "easy_sea_choice_020": {
      "text": "The moment called “Crab's Treasure” feels like an ending, but the magic of the book leaves one small door open. Far across the water, a lantern flashes twice and then waits for your answer.",
      "choices": [
        {
          "text": "Sail for home",
          "next": "easy_sea_e12"
        },
        {
          "text": "Follow the lantern",
          "next": "easy_sea_choice_020_alt"
        }
      ]
    },
    "easy_sea_choice_020_alt": {
      "ending": true,
      "title": "Crab's Treasure: Beyond the Harbor",
      "scene": "ocean_boat",
      "text": "You follow the lantern across the calm water. It leads to a tiny harbor where the sea friends wave, and a warm breeze carries you safely back to the book."
    },
    "easy_sea_choice_021": {
      "text": "The moment called “Moon Tide” feels like an ending, but the magic of the book leaves one small door open. Far across the water, a lantern flashes twice and then waits for your answer.",
      "choices": [
        {
          "text": "Sail for home",
          "next": "easy_sea_e14"
        },
        {
          "text": "Follow the lantern",
          "next": "easy_sea_choice_021_alt"
        }
      ]
    },
    "easy_sea_choice_021_alt": {
      "ending": true,
      "title": "Moon Tide: Beyond the Harbor",
      "scene": "village",
      "text": "You follow the lantern across the calm water. It leads to a tiny harbor where the sea friends wave, and a warm breeze carries you safely back to the book."
    },
    "easy_stars_choice_022": {
      "text": "The moment called “The Comet Garden” feels like an ending, but the magic of the book leaves one small door open. A new point of light appears beside the path you have already travelled.",
      "choices": [
        {
          "text": "Chart the way home",
          "next": "easy_stars_e4"
        },
        {
          "text": "Follow the bright star",
          "next": "easy_stars_choice_022_alt"
        }
      ]
    },
    "easy_stars_choice_022_alt": {
      "ending": true,
      "title": "The Comet Garden: Beyond the Map",
      "scene": "sun",
      "text": "You follow the bright star and find a tiny moon where a friendly pilot waves from a little ship. Together you draw a new star on the map before sailing home."
    },
    "easy_stars_choice_023": {
      "text": "The moment called “Star Pilot's Map” feels like an ending, but the magic of the book leaves one small door open. A new point of light appears beside the path you have already travelled.",
      "choices": [
        {
          "text": "Chart the way home",
          "next": "easy_stars_e5"
        },
        {
          "text": "Follow the bright star",
          "next": "easy_stars_choice_023_alt"
        }
      ]
    },
    "easy_stars_choice_023_alt": {
      "ending": true,
      "title": "Star Pilot's Map: Beyond the Map",
      "scene": "map",
      "text": "You follow the bright star and find a tiny moon where a friendly pilot waves from a little ship. Together you draw a new star on the map before sailing home."
    },
    "easy_stars_choice_024": {
      "text": "The moment called “Moon Bridge” feels like an ending, but the magic of the book leaves one small door open. A new point of light appears beside the path you have already travelled.",
      "choices": [
        {
          "text": "Chart the way home",
          "next": "easy_stars_e7"
        },
        {
          "text": "Follow the bright star",
          "next": "easy_stars_choice_024_alt"
        }
      ]
    },
    "easy_stars_choice_024_alt": {
      "ending": true,
      "title": "Moon Bridge: Beyond the Map",
      "scene": "star_ship",
      "text": "You follow the bright star and find a tiny moon where a friendly pilot waves from a little ship. Together you draw a new star on the map before sailing home."
    },
    "easy_stars_choice_025": {
      "text": "The moment called “Pocket Constellation” feels like an ending, but the magic of the book leaves one small door open. A new point of light appears beside the path you have already travelled.",
      "choices": [
        {
          "text": "Chart the way home",
          "next": "easy_stars_e8"
        },
        {
          "text": "Follow the bright star",
          "next": "easy_stars_choice_025_alt"
        }
      ]
    },
    "easy_stars_choice_025_alt": {
      "ending": true,
      "title": "Pocket Constellation: Beyond the Map",
      "scene": "moon",
      "text": "You follow the bright star and find a tiny moon where a friendly pilot waves from a little ship. Together you draw a new star on the map before sailing home."
    },
    "easy_stars_choice_026": {
      "text": "The moment called “Cloud Whale” feels like an ending, but the magic of the book leaves one small door open. A new point of light appears beside the path you have already travelled.",
      "choices": [
        {
          "text": "Chart the way home",
          "next": "easy_stars_e11"
        },
        {
          "text": "Follow the bright star",
          "next": "easy_stars_choice_026_alt"
        }
      ]
    },
    "easy_stars_choice_026_alt": {
      "ending": true,
      "title": "Cloud Whale: Beyond the Map",
      "scene": "sun",
      "text": "You follow the bright star and find a tiny moon where a friendly pilot waves from a little ship. Together you draw a new star on the map before sailing home."
    },
    "easy_stars_choice_027": {
      "text": "The moment called “Little Planet” feels like an ending, but the magic of the book leaves one small door open. A new point of light appears beside the path you have already travelled.",
      "choices": [
        {
          "text": "Chart the way home",
          "next": "easy_stars_e12"
        },
        {
          "text": "Follow the bright star",
          "next": "easy_stars_choice_027_alt"
        }
      ]
    },
    "easy_stars_choice_027_alt": {
      "ending": true,
      "title": "Little Planet: Beyond the Map",
      "scene": "map",
      "text": "You follow the bright star and find a tiny moon where a friendly pilot waves from a little ship. Together you draw a new star on the map before sailing home."
    },
    "easy_stars_choice_028": {
      "text": "The moment called “Book of Stars” feels like an ending, but the magic of the book leaves one small door open. A new point of light appears beside the path you have already travelled.",
      "choices": [
        {
          "text": "Chart the way home",
          "next": "easy_stars_e14"
        },
        {
          "text": "Follow the bright star",
          "next": "easy_stars_choice_028_alt"
        }
      ]
    },
    "easy_stars_choice_028_alt": {
      "ending": true,
      "title": "Book of Stars: Beyond the Map",
      "scene": "star_ship",
      "text": "You follow the bright star and find a tiny moon where a friendly pilot waves from a little ship. Together you draw a new star on the map before sailing home."
    },
    "medium_forest_choice_029": {
      "text": "The moment called “The Songbird's Return” feels like an ending, but the magic of the book leaves one small door open. A familiar rustle comes from the trees, as if the forest has one last secret to share.",
      "choices": [
        {
          "text": "Return the discovery",
          "next": "medium_forest_e4"
        },
        {
          "text": "Follow the new trail",
          "next": "medium_forest_choice_029_alt"
        }
      ]
    },
    "medium_forest_choice_029_alt": {
      "ending": true,
      "title": "The Songbird's Return: The Longer Trail",
      "scene": "garden",
      "text": "You follow the new trail beyond the place where “The Songbird's Return” began. It leads to a quiet clearing where the clues from your journey fit together, and you leave a fresh trail marker for the next reader."
    },
    "medium_forest_choice_030": {
      "text": "The moment called “The Silver Bell” feels like an ending, but the magic of the book leaves one small door open. A familiar rustle comes from the trees, as if the forest has one last secret to share.",
      "choices": [
        {
          "text": "Return the discovery",
          "next": "medium_forest_e5"
        },
        {
          "text": "Follow the new trail",
          "next": "medium_forest_choice_030_alt"
        }
      ]
    },
    "medium_forest_choice_030_alt": {
      "ending": true,
      "title": "The Silver Bell: The Longer Trail",
      "scene": "map",
      "text": "You follow the new trail beyond the place where “The Silver Bell” began. It leads to a quiet clearing where the clues from your journey fit together, and you leave a fresh trail marker for the next reader."
    },
    "medium_forest_choice_031": {
      "text": "The moment called “Bridge of Ribbons” feels like an ending, but the magic of the book leaves one small door open. A familiar rustle comes from the trees, as if the forest has one last secret to share.",
      "choices": [
        {
          "text": "Return the discovery",
          "next": "medium_forest_e7"
        },
        {
          "text": "Follow the new trail",
          "next": "medium_forest_choice_031_alt"
        }
      ]
    },
    "medium_forest_choice_031_alt": {
      "ending": true,
      "title": "Bridge of Ribbons: The Longer Trail",
      "scene": "village",
      "text": "You follow the new trail beyond the place where “Bridge of Ribbons” began. It leads to a quiet clearing where the clues from your journey fit together, and you leave a fresh trail marker for the next reader."
    },
    "medium_forest_choice_032": {
      "text": "The moment called “The Listening Garden” feels like an ending, but the magic of the book leaves one small door open. A familiar rustle comes from the trees, as if the forest has one last secret to share.",
      "choices": [
        {
          "text": "Return the discovery",
          "next": "medium_forest_e8"
        },
        {
          "text": "Follow the new trail",
          "next": "medium_forest_choice_032_alt"
        }
      ]
    },
    "medium_forest_choice_032_alt": {
      "ending": true,
      "title": "The Listening Garden: The Longer Trail",
      "scene": "forest_home",
      "text": "You follow the new trail beyond the place where “The Listening Garden” began. It leads to a quiet clearing where the clues from your journey fit together, and you leave a fresh trail marker for the next reader."
    },
    "medium_forest_choice_033": {
      "text": "The moment called “Fox's Thank-You” feels like an ending, but the magic of the book leaves one small door open. A familiar rustle comes from the trees, as if the forest has one last secret to share.",
      "choices": [
        {
          "text": "Return the discovery",
          "next": "medium_forest_e11"
        },
        {
          "text": "Follow the new trail",
          "next": "medium_forest_choice_033_alt"
        }
      ]
    },
    "medium_forest_choice_033_alt": {
      "ending": true,
      "title": "Fox's Thank-You: The Longer Trail",
      "scene": "garden",
      "text": "You follow the new trail beyond the place where “Fox's Thank-You” began. It leads to a quiet clearing where the clues from your journey fit together, and you leave a fresh trail marker for the next reader."
    },
    "medium_forest_choice_034": {
      "text": "The moment called “The Lost Page” feels like an ending, but the magic of the book leaves one small door open. A familiar rustle comes from the trees, as if the forest has one last secret to share.",
      "choices": [
        {
          "text": "Return the discovery",
          "next": "medium_forest_e12"
        },
        {
          "text": "Follow the new trail",
          "next": "medium_forest_choice_034_alt"
        }
      ]
    },
    "medium_forest_choice_034_alt": {
      "ending": true,
      "title": "The Lost Page: The Longer Trail",
      "scene": "map",
      "text": "You follow the new trail beyond the place where “The Lost Page” began. It leads to a quiet clearing where the clues from your journey fit together, and you leave a fresh trail marker for the next reader."
    },
    "medium_forest_choice_035": {
      "text": "The moment called “Owl at Dusk” feels like an ending, but the magic of the book leaves one small door open. A familiar rustle comes from the trees, as if the forest has one last secret to share.",
      "choices": [
        {
          "text": "Return the discovery",
          "next": "medium_forest_e14"
        },
        {
          "text": "Follow the new trail",
          "next": "medium_forest_choice_035_alt"
        }
      ]
    },
    "medium_forest_choice_035_alt": {
      "ending": true,
      "title": "Owl at Dusk: The Longer Trail",
      "scene": "village",
      "text": "You follow the new trail beyond the place where “Owl at Dusk” began. It leads to a quiet clearing where the clues from your journey fit together, and you leave a fresh trail marker for the next reader."
    },
    "medium_forest_choice_036": {
      "text": "The moment called “The Acorn Archive” feels like an ending, but the magic of the book leaves one small door open. A familiar rustle comes from the trees, as if the forest has one last secret to share.",
      "choices": [
        {
          "text": "Return the discovery",
          "next": "medium_forest_e15"
        },
        {
          "text": "Follow the new trail",
          "next": "medium_forest_choice_036_alt"
        }
      ]
    },
    "medium_forest_choice_036_alt": {
      "ending": true,
      "title": "The Acorn Archive: The Longer Trail",
      "scene": "forest_home",
      "text": "You follow the new trail beyond the place where “The Acorn Archive” began. It leads to a quiet clearing where the clues from your journey fit together, and you leave a fresh trail marker for the next reader."
    },
    "medium_forest_choice_037": {
      "text": "The moment called “A Song to Keep” feels like an ending, but the magic of the book leaves one small door open. A familiar rustle comes from the trees, as if the forest has one last secret to share.",
      "choices": [
        {
          "text": "Return the discovery",
          "next": "medium_forest_e18"
        },
        {
          "text": "Follow the new trail",
          "next": "medium_forest_choice_037_alt"
        }
      ]
    },
    "medium_forest_choice_037_alt": {
      "ending": true,
      "title": "A Song to Keep: The Longer Trail",
      "scene": "garden",
      "text": "You follow the new trail beyond the place where “A Song to Keep” began. It leads to a quiet clearing where the clues from your journey fit together, and you leave a fresh trail marker for the next reader."
    },
    "medium_castle_choice_038": {
      "text": "The moment called “The Tower Rings” feels like an ending, but the magic of the book leaves one small door open. A quiet bell sounds somewhere above you, and a final stair glows in the castle wall.",
      "choices": [
        {
          "text": "Help restore the keep",
          "next": "medium_castle_e4"
        },
        {
          "text": "Enter the last tower",
          "next": "medium_castle_choice_038_alt"
        }
      ]
    },
    "medium_castle_choice_038_alt": {
      "ending": true,
      "title": "The Tower Rings: One Last Door",
      "scene": "crown",
      "text": "You climb beyond the place where “The Tower Rings” seemed to finish. The last tower holds a small room of letters from past helpers, and you add your own before returning through the glowing doorway."
    },
    "medium_castle_choice_039": {
      "text": "The moment called “The Builder's Map” feels like an ending, but the magic of the book leaves one small door open. A quiet bell sounds somewhere above you, and a final stair glows in the castle wall.",
      "choices": [
        {
          "text": "Help restore the keep",
          "next": "medium_castle_e5"
        },
        {
          "text": "Enter the last tower",
          "next": "medium_castle_choice_039_alt"
        }
      ]
    },
    "medium_castle_choice_039_alt": {
      "ending": true,
      "title": "The Builder's Map: One Last Door",
      "scene": "garden",
      "text": "You climb beyond the place where “The Builder's Map” seemed to finish. The last tower holds a small room of letters from past helpers, and you add your own before returning through the glowing doorway."
    },
    "medium_castle_choice_040": {
      "text": "The moment called “A Feast Restored” feels like an ending, but the magic of the book leaves one small door open. A quiet bell sounds somewhere above you, and a final stair glows in the castle wall.",
      "choices": [
        {
          "text": "Help restore the keep",
          "next": "medium_castle_e7"
        },
        {
          "text": "Enter the last tower",
          "next": "medium_castle_choice_040_alt"
        }
      ]
    },
    "medium_castle_choice_040_alt": {
      "ending": true,
      "title": "A Feast Restored: One Last Door",
      "scene": "castle",
      "text": "You climb beyond the place where “A Feast Restored” seemed to finish. The last tower holds a small room of letters from past helpers, and you add your own before returning through the glowing doorway."
    },
    "medium_castle_choice_041": {
      "text": "The moment called “The Sleeping Dragon” feels like an ending, but the magic of the book leaves one small door open. A quiet bell sounds somewhere above you, and a final stair glows in the castle wall.",
      "choices": [
        {
          "text": "Help restore the keep",
          "next": "medium_castle_e8"
        },
        {
          "text": "Enter the last tower",
          "next": "medium_castle_choice_041_alt"
        }
      ]
    },
    "medium_castle_choice_041_alt": {
      "ending": true,
      "title": "The Sleeping Dragon: One Last Door",
      "scene": "feast",
      "text": "You climb beyond the place where “The Sleeping Dragon” seemed to finish. The last tower holds a small room of letters from past helpers, and you add your own before returning through the glowing doorway."
    },
    "medium_castle_choice_042": {
      "text": "The moment called “Cat of the Tower” feels like an ending, but the magic of the book leaves one small door open. A quiet bell sounds somewhere above you, and a final stair glows in the castle wall.",
      "choices": [
        {
          "text": "Help restore the keep",
          "next": "medium_castle_e11"
        },
        {
          "text": "Enter the last tower",
          "next": "medium_castle_choice_042_alt"
        }
      ]
    },
    "medium_castle_choice_042_alt": {
      "ending": true,
      "title": "Cat of the Tower: One Last Door",
      "scene": "crown",
      "text": "You climb beyond the place where “Cat of the Tower” seemed to finish. The last tower holds a small room of letters from past helpers, and you add your own before returning through the glowing doorway."
    },
    "medium_castle_choice_043": {
      "text": "The moment called “The Brass Matchbox” feels like an ending, but the magic of the book leaves one small door open. A quiet bell sounds somewhere above you, and a final stair glows in the castle wall.",
      "choices": [
        {
          "text": "Help restore the keep",
          "next": "medium_castle_e12"
        },
        {
          "text": "Enter the last tower",
          "next": "medium_castle_choice_043_alt"
        }
      ]
    },
    "medium_castle_choice_043_alt": {
      "ending": true,
      "title": "The Brass Matchbox: One Last Door",
      "scene": "garden",
      "text": "You climb beyond the place where “The Brass Matchbox” seemed to finish. The last tower holds a small room of letters from past helpers, and you add your own before returning through the glowing doorway."
    },
    "medium_castle_choice_044": {
      "text": "The moment called “Sunset Garden” feels like an ending, but the magic of the book leaves one small door open. A quiet bell sounds somewhere above you, and a final stair glows in the castle wall.",
      "choices": [
        {
          "text": "Help restore the keep",
          "next": "medium_castle_e14"
        },
        {
          "text": "Enter the last tower",
          "next": "medium_castle_choice_044_alt"
        }
      ]
    },
    "medium_castle_choice_044_alt": {
      "ending": true,
      "title": "Sunset Garden: One Last Door",
      "scene": "castle",
      "text": "You climb beyond the place where “Sunset Garden” seemed to finish. The last tower holds a small room of letters from past helpers, and you add your own before returning through the glowing doorway."
    },
    "medium_castle_choice_045": {
      "text": "The moment called “Royal Librarian” feels like an ending, but the magic of the book leaves one small door open. A quiet bell sounds somewhere above you, and a final stair glows in the castle wall.",
      "choices": [
        {
          "text": "Help restore the keep",
          "next": "medium_castle_e15"
        },
        {
          "text": "Enter the last tower",
          "next": "medium_castle_choice_045_alt"
        }
      ]
    },
    "medium_castle_choice_045_alt": {
      "ending": true,
      "title": "Royal Librarian: One Last Door",
      "scene": "feast",
      "text": "You climb beyond the place where “Royal Librarian” seemed to finish. The last tower holds a small room of letters from past helpers, and you add your own before returning through the glowing doorway."
    },
    "medium_castle_choice_046": {
      "text": "The moment called “The Quiet Bell” feels like an ending, but the magic of the book leaves one small door open. A quiet bell sounds somewhere above you, and a final stair glows in the castle wall.",
      "choices": [
        {
          "text": "Help restore the keep",
          "next": "medium_castle_e18"
        },
        {
          "text": "Enter the last tower",
          "next": "medium_castle_choice_046_alt"
        }
      ]
    },
    "medium_castle_choice_046_alt": {
      "ending": true,
      "title": "The Quiet Bell: One Last Door",
      "scene": "crown",
      "text": "You climb beyond the place where “The Quiet Bell” seemed to finish. The last tower holds a small room of letters from past helpers, and you add your own before returning through the glowing doorway."
    },
    "medium_sea_choice_047": {
      "text": "The moment called “The Harbor Signal” feels like an ending, but the magic of the book leaves one small door open. Far across the water, a lantern flashes twice and then waits for your answer.",
      "choices": [
        {
          "text": "Signal the harbor",
          "next": "medium_sea_e4"
        },
        {
          "text": "Follow the turning tide",
          "next": "medium_sea_choice_047_alt"
        }
      ]
    },
    "medium_sea_choice_047_alt": {
      "ending": true,
      "title": "The Harbor Signal: Beyond the Harbor",
      "scene": "bridge",
      "text": "You follow the turning tide beyond the place where “The Harbor Signal” seemed complete. A second cove appears, filled with old signal stones, and you arrange them so future sailors can find the safe way home."
    },
    "medium_sea_choice_048": {
      "text": "The moment called “Keeper's Journal” feels like an ending, but the magic of the book leaves one small door open. Far across the water, a lantern flashes twice and then waits for your answer.",
      "choices": [
        {
          "text": "Signal the harbor",
          "next": "medium_sea_e5"
        },
        {
          "text": "Follow the turning tide",
          "next": "medium_sea_choice_048_alt"
        }
      ]
    },
    "medium_sea_choice_048_alt": {
      "ending": true,
      "title": "Keeper's Journal: Beyond the Harbor",
      "scene": "ocean_boat",
      "text": "You follow the turning tide beyond the place where “Keeper's Journal” seemed complete. A second cove appears, filled with old signal stones, and you arrange them so future sailors can find the safe way home."
    },
    "medium_sea_choice_049": {
      "text": "The moment called “The Seal's Secret” feels like an ending, but the magic of the book leaves one small door open. Far across the water, a lantern flashes twice and then waits for your answer.",
      "choices": [
        {
          "text": "Signal the harbor",
          "next": "medium_sea_e7"
        },
        {
          "text": "Follow the turning tide",
          "next": "medium_sea_choice_049_alt"
        }
      ]
    },
    "medium_sea_choice_049_alt": {
      "ending": true,
      "title": "The Seal's Secret: Beyond the Harbor",
      "scene": "village",
      "text": "You follow the turning tide beyond the place where “The Seal's Secret” seemed complete. A second cove appears, filled with old signal stones, and you arrange them so future sailors can find the safe way home."
    },
    "medium_sea_choice_050": {
      "text": "The moment called “Tide Pool Garden” feels like an ending, but the magic of the book leaves one small door open. Far across the water, a lantern flashes twice and then waits for your answer.",
      "choices": [
        {
          "text": "Signal the harbor",
          "next": "medium_sea_e8"
        },
        {
          "text": "Follow the turning tide",
          "next": "medium_sea_choice_050_alt"
        }
      ]
    },
    "medium_sea_choice_050_alt": {
      "ending": true,
      "title": "Tide Pool Garden: Beyond the Harbor",
      "scene": "moon",
      "text": "You follow the turning tide beyond the place where “Tide Pool Garden” seemed complete. A second cove appears, filled with old signal stones, and you arrange them so future sailors can find the safe way home."
    },
    "medium_sea_choice_051": {
      "text": "The moment called “The Signal Flags” feels like an ending, but the magic of the book leaves one small door open. Far across the water, a lantern flashes twice and then waits for your answer.",
      "choices": [
        {
          "text": "Signal the harbor",
          "next": "medium_sea_e11"
        },
        {
          "text": "Follow the turning tide",
          "next": "medium_sea_choice_051_alt"
        }
      ]
    },
    "medium_sea_choice_051_alt": {
      "ending": true,
      "title": "The Signal Flags: Beyond the Harbor",
      "scene": "bridge",
      "text": "You follow the turning tide beyond the place where “The Signal Flags” seemed complete. A second cove appears, filled with old signal stones, and you arrange them so future sailors can find the safe way home."
    },
    "medium_sea_choice_052": {
      "text": "The moment called “Moonlit Harbor” feels like an ending, but the magic of the book leaves one small door open. Far across the water, a lantern flashes twice and then waits for your answer.",
      "choices": [
        {
          "text": "Signal the harbor",
          "next": "medium_sea_e12"
        },
        {
          "text": "Follow the turning tide",
          "next": "medium_sea_choice_052_alt"
        }
      ]
    },
    "medium_sea_choice_052_alt": {
      "ending": true,
      "title": "Moonlit Harbor: Beyond the Harbor",
      "scene": "ocean_boat",
      "text": "You follow the turning tide beyond the place where “Moonlit Harbor” seemed complete. A second cove appears, filled with old signal stones, and you arrange them so future sailors can find the safe way home."
    },
    "medium_sea_choice_053": {
      "text": "The moment called “The Hidden Marker” feels like an ending, but the magic of the book leaves one small door open. Far across the water, a lantern flashes twice and then waits for your answer.",
      "choices": [
        {
          "text": "Signal the harbor",
          "next": "medium_sea_e14"
        },
        {
          "text": "Follow the turning tide",
          "next": "medium_sea_choice_053_alt"
        }
      ]
    },
    "medium_sea_choice_053_alt": {
      "ending": true,
      "title": "The Hidden Marker: Beyond the Harbor",
      "scene": "village",
      "text": "You follow the turning tide beyond the place where “The Hidden Marker” seemed complete. A second cove appears, filled with old signal stones, and you arrange them so future sailors can find the safe way home."
    },
    "medium_sea_choice_054": {
      "text": "The moment called “A Friendly Crew” feels like an ending, but the magic of the book leaves one small door open. Far across the water, a lantern flashes twice and then waits for your answer.",
      "choices": [
        {
          "text": "Signal the harbor",
          "next": "medium_sea_e15"
        },
        {
          "text": "Follow the turning tide",
          "next": "medium_sea_choice_054_alt"
        }
      ]
    },
    "medium_sea_choice_054_alt": {
      "ending": true,
      "title": "A Friendly Crew: Beyond the Harbor",
      "scene": "moon",
      "text": "You follow the turning tide beyond the place where “A Friendly Crew” seemed complete. A second cove appears, filled with old signal stones, and you arrange them so future sailors can find the safe way home."
    },
    "medium_sea_choice_055": {
      "text": "The moment called “The Singing Shell” feels like an ending, but the magic of the book leaves one small door open. Far across the water, a lantern flashes twice and then waits for your answer.",
      "choices": [
        {
          "text": "Signal the harbor",
          "next": "medium_sea_e18"
        },
        {
          "text": "Follow the turning tide",
          "next": "medium_sea_choice_055_alt"
        }
      ]
    },
    "medium_sea_choice_055_alt": {
      "ending": true,
      "title": "The Singing Shell: Beyond the Harbor",
      "scene": "bridge",
      "text": "You follow the turning tide beyond the place where “The Singing Shell” seemed complete. A second cove appears, filled with old signal stones, and you arrange them so future sailors can find the safe way home."
    },
    "medium_stars_choice_056": {
      "text": "The moment called “Restore the Constellation” feels like an ending, but the magic of the book leaves one small door open. A new point of light appears beside the path you have already travelled.",
      "choices": [
        {
          "text": "Record the route",
          "next": "medium_stars_e4"
        },
        {
          "text": "Follow the new signal",
          "next": "medium_stars_choice_056_alt"
        }
      ]
    },
    "medium_stars_choice_056_alt": {
      "ending": true,
      "title": "Restore the Constellation: Beyond the Map",
      "scene": "star_ship",
      "text": "You follow the new signal beyond the route recorded at “Restore the Constellation.” It leads to a quiet observatory where you can see the adventure from above, and you add the safest new route to the library map."
    },
    "medium_stars_choice_057": {
      "text": "The moment called “The Star Key” feels like an ending, but the magic of the book leaves one small door open. A new point of light appears beside the path you have already travelled.",
      "choices": [
        {
          "text": "Record the route",
          "next": "medium_stars_e5"
        },
        {
          "text": "Follow the new signal",
          "next": "medium_stars_choice_057_alt"
        }
      ]
    },
    "medium_stars_choice_057_alt": {
      "ending": true,
      "title": "The Star Key: Beyond the Map",
      "scene": "moon",
      "text": "You follow the new signal beyond the route recorded at “The Star Key.” It leads to a quiet observatory where you can see the adventure from above, and you add the safest new route to the library map."
    },
    "medium_stars_choice_058": {
      "text": "The moment called “Moon Bridge Home” feels like an ending, but the magic of the book leaves one small door open. A new point of light appears beside the path you have already travelled.",
      "choices": [
        {
          "text": "Record the route",
          "next": "medium_stars_e7"
        },
        {
          "text": "Follow the new signal",
          "next": "medium_stars_choice_058_alt"
        }
      ]
    },
    "medium_stars_choice_058_alt": {
      "ending": true,
      "title": "Moon Bridge Home: Beyond the Map",
      "scene": "sun",
      "text": "You follow the new signal beyond the route recorded at “Moon Bridge Home.” It leads to a quiet observatory where you can see the adventure from above, and you add the safest new route to the library map."
    },
    "medium_stars_choice_059": {
      "text": "The moment called “The Observatory” feels like an ending, but the magic of the book leaves one small door open. A new point of light appears beside the path you have already travelled.",
      "choices": [
        {
          "text": "Record the route",
          "next": "medium_stars_e8"
        },
        {
          "text": "Follow the new signal",
          "next": "medium_stars_choice_059_alt"
        }
      ]
    },
    "medium_stars_choice_059_alt": {
      "ending": true,
      "title": "The Observatory: Beyond the Map",
      "scene": "map",
      "text": "You follow the new signal beyond the route recorded at “The Observatory.” It leads to a quiet observatory where you can see the adventure from above, and you add the safest new route to the library map."
    },
    "medium_stars_choice_060": {
      "text": "The moment called “Comet Garden” feels like an ending, but the magic of the book leaves one small door open. A new point of light appears beside the path you have already travelled.",
      "choices": [
        {
          "text": "Record the route",
          "next": "medium_stars_e11"
        },
        {
          "text": "Follow the new signal",
          "next": "medium_stars_choice_060_alt"
        }
      ]
    },
    "medium_stars_choice_060_alt": {
      "ending": true,
      "title": "Comet Garden: Beyond the Map",
      "scene": "star_ship",
      "text": "You follow the new signal beyond the route recorded at “Comet Garden.” It leads to a quiet observatory where you can see the adventure from above, and you add the safest new route to the library map."
    },
    "medium_stars_choice_061": {
      "text": "The moment called “A Safe Route” feels like an ending, but the magic of the book leaves one small door open. A new point of light appears beside the path you have already travelled.",
      "choices": [
        {
          "text": "Record the route",
          "next": "medium_stars_e12"
        },
        {
          "text": "Follow the new signal",
          "next": "medium_stars_choice_061_alt"
        }
      ]
    },
    "medium_stars_choice_061_alt": {
      "ending": true,
      "title": "A Safe Route: Beyond the Map",
      "scene": "moon",
      "text": "You follow the new signal beyond the route recorded at “A Safe Route.” It leads to a quiet observatory where you can see the adventure from above, and you add the safest new route to the library map."
    },
    "medium_stars_choice_062": {
      "text": "The moment called “The Night Watch” feels like an ending, but the magic of the book leaves one small door open. A new point of light appears beside the path you have already travelled.",
      "choices": [
        {
          "text": "Record the route",
          "next": "medium_stars_e14"
        },
        {
          "text": "Follow the new signal",
          "next": "medium_stars_choice_062_alt"
        }
      ]
    },
    "medium_stars_choice_062_alt": {
      "ending": true,
      "title": "The Night Watch: Beyond the Map",
      "scene": "sun",
      "text": "You follow the new signal beyond the route recorded at “The Night Watch.” It leads to a quiet observatory where you can see the adventure from above, and you add the safest new route to the library map."
    },
    "medium_stars_choice_063": {
      "text": "The moment called “Sunrise Orbit” feels like an ending, but the magic of the book leaves one small door open. A new point of light appears beside the path you have already travelled.",
      "choices": [
        {
          "text": "Record the route",
          "next": "medium_stars_e15"
        },
        {
          "text": "Follow the new signal",
          "next": "medium_stars_choice_063_alt"
        }
      ]
    },
    "medium_stars_choice_063_alt": {
      "ending": true,
      "title": "Sunrise Orbit: Beyond the Map",
      "scene": "map",
      "text": "You follow the new signal beyond the route recorded at “Sunrise Orbit.” It leads to a quiet observatory where you can see the adventure from above, and you add the safest new route to the library map."
    },
    "medium_stars_choice_064": {
      "text": "The moment called “The Star Choir” feels like an ending, but the magic of the book leaves one small door open. A new point of light appears beside the path you have already travelled.",
      "choices": [
        {
          "text": "Record the route",
          "next": "medium_stars_e18"
        },
        {
          "text": "Follow the new signal",
          "next": "medium_stars_choice_064_alt"
        }
      ]
    },
    "medium_stars_choice_064_alt": {
      "ending": true,
      "title": "The Star Choir: Beyond the Map",
      "scene": "star_ship",
      "text": "You follow the new signal beyond the route recorded at “The Star Choir.” It leads to a quiet observatory where you can see the adventure from above, and you add the safest new route to the library map."
    },
    "hard_forest_choice_065": {
      "text": "The moment called “Keeper of the Seeds” feels like an ending, but the magic of the book leaves one small door open. A familiar rustle comes from the trees, as if the forest has one last secret to share.",
      "choices": [
        {
          "text": "Record what you learned",
          "next": "hard_forest_e4"
        },
        {
          "text": "Follow the hidden trail",
          "next": "hard_forest_choice_065_alt"
        }
      ]
    },
    "hard_forest_choice_065_alt": {
      "ending": true,
      "title": "Keeper of the Seeds: The Longer Trail",
      "scene": "garden",
      "text": "Instead of closing the chapter at “Keeper of the Seeds,” you follow the forest’s final invitation. The trail reveals how several small choices were connected all along, and you return to the library with a map that will help another reader travel wisely."
    },
    "hard_forest_choice_066": {
      "text": "The moment called “The Living Bridge” feels like an ending, but the magic of the book leaves one small door open. A familiar rustle comes from the trees, as if the forest has one last secret to share.",
      "choices": [
        {
          "text": "Record what you learned",
          "next": "hard_forest_e5"
        },
        {
          "text": "Follow the hidden trail",
          "next": "hard_forest_choice_066_alt"
        }
      ]
    },
    "hard_forest_choice_066_alt": {
      "ending": true,
      "title": "The Living Bridge: The Longer Trail",
      "scene": "map",
      "text": "Instead of closing the chapter at “The Living Bridge,” you follow the forest’s final invitation. The trail reveals how several small choices were connected all along, and you return to the library with a map that will help another reader travel wisely."
    },
    "hard_forest_choice_067": {
      "text": "The moment called “Compass of the Woods” feels like an ending, but the magic of the book leaves one small door open. A familiar rustle comes from the trees, as if the forest has one last secret to share.",
      "choices": [
        {
          "text": "Record what you learned",
          "next": "hard_forest_e7"
        },
        {
          "text": "Follow the hidden trail",
          "next": "hard_forest_choice_067_alt"
        }
      ]
    },
    "hard_forest_choice_067_alt": {
      "ending": true,
      "title": "Compass of the Woods: The Longer Trail",
      "scene": "village",
      "text": "Instead of closing the chapter at “Compass of the Woods,” you follow the forest’s final invitation. The trail reveals how several small choices were connected all along, and you return to the library with a map that will help another reader travel wisely."
    },
    "hard_forest_choice_068": {
      "text": "The moment called “The Whistle's Rest” feels like an ending, but the magic of the book leaves one small door open. A familiar rustle comes from the trees, as if the forest has one last secret to share.",
      "choices": [
        {
          "text": "Record what you learned",
          "next": "hard_forest_e8"
        },
        {
          "text": "Follow the hidden trail",
          "next": "hard_forest_choice_068_alt"
        }
      ]
    },
    "hard_forest_choice_068_alt": {
      "ending": true,
      "title": "The Whistle's Rest: The Longer Trail",
      "scene": "forest_home",
      "text": "Instead of closing the chapter at “The Whistle's Rest,” you follow the forest’s final invitation. The trail reveals how several small choices were connected all along, and you return to the library with a map that will help another reader travel wisely."
    },
    "hard_forest_choice_069": {
      "text": "The moment called “Seed Garden” feels like an ending, but the magic of the book leaves one small door open. A familiar rustle comes from the trees, as if the forest has one last secret to share.",
      "choices": [
        {
          "text": "Record what you learned",
          "next": "hard_forest_e10"
        },
        {
          "text": "Follow the hidden trail",
          "next": "hard_forest_choice_069_alt"
        }
      ]
    },
    "hard_forest_choice_069_alt": {
      "ending": true,
      "title": "Seed Garden: The Longer Trail",
      "scene": "garden",
      "text": "Instead of closing the chapter at “Seed Garden,” you follow the forest’s final invitation. The trail reveals how several small choices were connected all along, and you return to the library with a map that will help another reader travel wisely."
    },
    "hard_forest_choice_070": {
      "text": "The moment called “Fox at Twilight” feels like an ending, but the magic of the book leaves one small door open. A familiar rustle comes from the trees, as if the forest has one last secret to share.",
      "choices": [
        {
          "text": "Record what you learned",
          "next": "hard_forest_e11"
        },
        {
          "text": "Follow the hidden trail",
          "next": "hard_forest_choice_070_alt"
        }
      ]
    },
    "hard_forest_choice_070_alt": {
      "ending": true,
      "title": "Fox at Twilight: The Longer Trail",
      "scene": "map",
      "text": "Instead of closing the chapter at “Fox at Twilight,” you follow the forest’s final invitation. The trail reveals how several small choices were connected all along, and you return to the library with a map that will help another reader travel wisely."
    },
    "hard_forest_choice_071": {
      "text": "The moment called “The Woodland Archive” feels like an ending, but the magic of the book leaves one small door open. A familiar rustle comes from the trees, as if the forest has one last secret to share.",
      "choices": [
        {
          "text": "Record what you learned",
          "next": "hard_forest_e14"
        },
        {
          "text": "Follow the hidden trail",
          "next": "hard_forest_choice_071_alt"
        }
      ]
    },
    "hard_forest_choice_071_alt": {
      "ending": true,
      "title": "The Woodland Archive: The Longer Trail",
      "scene": "village",
      "text": "Instead of closing the chapter at “The Woodland Archive,” you follow the forest’s final invitation. The trail reveals how several small choices were connected all along, and you return to the library with a map that will help another reader travel wisely."
    },
    "hard_forest_choice_072": {
      "text": "The moment called “Wind Lantern” feels like an ending, but the magic of the book leaves one small door open. A familiar rustle comes from the trees, as if the forest has one last secret to share.",
      "choices": [
        {
          "text": "Record what you learned",
          "next": "hard_forest_e15"
        },
        {
          "text": "Follow the hidden trail",
          "next": "hard_forest_choice_072_alt"
        }
      ]
    },
    "hard_forest_choice_072_alt": {
      "ending": true,
      "title": "Wind Lantern: The Longer Trail",
      "scene": "forest_home",
      "text": "Instead of closing the chapter at “Wind Lantern,” you follow the forest’s final invitation. The trail reveals how several small choices were connected all along, and you return to the library with a map that will help another reader travel wisely."
    },
    "hard_forest_choice_073": {
      "text": "The moment called “A New Trail” feels like an ending, but the magic of the book leaves one small door open. A familiar rustle comes from the trees, as if the forest has one last secret to share.",
      "choices": [
        {
          "text": "Record what you learned",
          "next": "hard_forest_e17"
        },
        {
          "text": "Follow the hidden trail",
          "next": "hard_forest_choice_073_alt"
        }
      ]
    },
    "hard_forest_choice_073_alt": {
      "ending": true,
      "title": "A New Trail: The Longer Trail",
      "scene": "garden",
      "text": "Instead of closing the chapter at “A New Trail,” you follow the forest’s final invitation. The trail reveals how several small choices were connected all along, and you return to the library with a map that will help another reader travel wisely."
    },
    "hard_castle_choice_074": {
      "text": "The moment called “The Keeper's Promise” feels like an ending, but the magic of the book leaves one small door open. A quiet bell sounds somewhere above you, and a final stair glows in the castle wall.",
      "choices": [
        {
          "text": "Seal the castle record",
          "next": "hard_castle_e4"
        },
        {
          "text": "Unlock the final chamber",
          "next": "hard_castle_choice_074_alt"
        }
      ]
    },
    "hard_castle_choice_074_alt": {
      "ending": true,
      "title": "The Keeper's Promise: One Last Door",
      "scene": "crown",
      "text": "You refuse to rush past the final clue in “The Keeper's Promise.” The last chamber contains the castle’s unfinished record, and by reading it carefully you discover that preserving a story can matter just as much as solving its mystery."
    },
    "hard_castle_choice_075": {
      "text": "The moment called “The Open Castle” feels like an ending, but the magic of the book leaves one small door open. A quiet bell sounds somewhere above you, and a final stair glows in the castle wall.",
      "choices": [
        {
          "text": "Seal the castle record",
          "next": "hard_castle_e5"
        },
        {
          "text": "Unlock the final chamber",
          "next": "hard_castle_choice_075_alt"
        }
      ]
    },
    "hard_castle_choice_075_alt": {
      "ending": true,
      "title": "The Open Castle: One Last Door",
      "scene": "garden",
      "text": "You refuse to rush past the final clue in “The Open Castle.” The last chamber contains the castle’s unfinished record, and by reading it carefully you discover that preserving a story can matter just as much as solving its mystery."
    },
    "hard_castle_choice_076": {
      "text": "The moment called “The Archive's Secret” feels like an ending, but the magic of the book leaves one small door open. A quiet bell sounds somewhere above you, and a final stair glows in the castle wall.",
      "choices": [
        {
          "text": "Seal the castle record",
          "next": "hard_castle_e7"
        },
        {
          "text": "Unlock the final chamber",
          "next": "hard_castle_choice_076_alt"
        }
      ]
    },
    "hard_castle_choice_076_alt": {
      "ending": true,
      "title": "The Archive's Secret: One Last Door",
      "scene": "castle",
      "text": "You refuse to rush past the final clue in “The Archive's Secret.” The last chamber contains the castle’s unfinished record, and by reading it carefully you discover that preserving a story can matter just as much as solving its mystery."
    },
    "hard_castle_choice_077": {
      "text": "The moment called “The Clockwork Dragon” feels like an ending, but the magic of the book leaves one small door open. A quiet bell sounds somewhere above you, and a final stair glows in the castle wall.",
      "choices": [
        {
          "text": "Seal the castle record",
          "next": "hard_castle_e8"
        },
        {
          "text": "Unlock the final chamber",
          "next": "hard_castle_choice_077_alt"
        }
      ]
    },
    "hard_castle_choice_077_alt": {
      "ending": true,
      "title": "The Clockwork Dragon: One Last Door",
      "scene": "feast",
      "text": "You refuse to rush past the final clue in “The Clockwork Dragon.” The last chamber contains the castle’s unfinished record, and by reading it carefully you discover that preserving a story can matter just as much as solving its mystery."
    },
    "hard_castle_choice_078": {
      "text": "The moment called “Feast at Sunset” feels like an ending, but the magic of the book leaves one small door open. A quiet bell sounds somewhere above you, and a final stair glows in the castle wall.",
      "choices": [
        {
          "text": "Seal the castle record",
          "next": "hard_castle_e10"
        },
        {
          "text": "Unlock the final chamber",
          "next": "hard_castle_choice_078_alt"
        }
      ]
    },
    "hard_castle_choice_078_alt": {
      "ending": true,
      "title": "Feast at Sunset: One Last Door",
      "scene": "crown",
      "text": "You refuse to rush past the final clue in “Feast at Sunset.” The last chamber contains the castle’s unfinished record, and by reading it carefully you discover that preserving a story can matter just as much as solving its mystery."
    },
    "hard_castle_choice_079": {
      "text": "The moment called “The Brass Key” feels like an ending, but the magic of the book leaves one small door open. A quiet bell sounds somewhere above you, and a final stair glows in the castle wall.",
      "choices": [
        {
          "text": "Seal the castle record",
          "next": "hard_castle_e11"
        },
        {
          "text": "Unlock the final chamber",
          "next": "hard_castle_choice_079_alt"
        }
      ]
    },
    "hard_castle_choice_079_alt": {
      "ending": true,
      "title": "The Brass Key: One Last Door",
      "scene": "garden",
      "text": "You refuse to rush past the final clue in “The Brass Key.” The last chamber contains the castle’s unfinished record, and by reading it carefully you discover that preserving a story can matter just as much as solving its mystery."
    },
    "hard_castle_choice_080": {
      "text": "The moment called “Tower Garden” feels like an ending, but the magic of the book leaves one small door open. A quiet bell sounds somewhere above you, and a final stair glows in the castle wall.",
      "choices": [
        {
          "text": "Seal the castle record",
          "next": "hard_castle_e14"
        },
        {
          "text": "Unlock the final chamber",
          "next": "hard_castle_choice_080_alt"
        }
      ]
    },
    "hard_castle_choice_080_alt": {
      "ending": true,
      "title": "Tower Garden: One Last Door",
      "scene": "castle",
      "text": "You refuse to rush past the final clue in “Tower Garden.” The last chamber contains the castle’s unfinished record, and by reading it carefully you discover that preserving a story can matter just as much as solving its mystery."
    },
    "hard_castle_choice_081": {
      "text": "The moment called “The Castle Map” feels like an ending, but the magic of the book leaves one small door open. A quiet bell sounds somewhere above you, and a final stair glows in the castle wall.",
      "choices": [
        {
          "text": "Seal the castle record",
          "next": "hard_castle_e15"
        },
        {
          "text": "Unlock the final chamber",
          "next": "hard_castle_choice_081_alt"
        }
      ]
    },
    "hard_castle_choice_081_alt": {
      "ending": true,
      "title": "The Castle Map: One Last Door",
      "scene": "feast",
      "text": "You refuse to rush past the final clue in “The Castle Map.” The last chamber contains the castle’s unfinished record, and by reading it carefully you discover that preserving a story can matter just as much as solving its mystery."
    },
    "hard_castle_choice_082": {
      "text": "The moment called “The Midnight Bell” feels like an ending, but the magic of the book leaves one small door open. A quiet bell sounds somewhere above you, and a final stair glows in the castle wall.",
      "choices": [
        {
          "text": "Seal the castle record",
          "next": "hard_castle_e17"
        },
        {
          "text": "Unlock the final chamber",
          "next": "hard_castle_choice_082_alt"
        }
      ]
    },
    "hard_castle_choice_082_alt": {
      "ending": true,
      "title": "The Midnight Bell: One Last Door",
      "scene": "crown",
      "text": "You refuse to rush past the final clue in “The Midnight Bell.” The last chamber contains the castle’s unfinished record, and by reading it carefully you discover that preserving a story can matter just as much as solving its mystery."
    },
    "hard_sea_choice_083": {
      "text": "The moment called “The Safe Harbor” feels like an ending, but the magic of the book leaves one small door open. Far across the water, a lantern flashes twice and then waits for your answer.",
      "choices": [
        {
          "text": "Mark the safe harbor",
          "next": "hard_sea_e4"
        },
        {
          "text": "Follow the distant light",
          "next": "hard_sea_choice_083_alt"
        }
      ]
    },
    "hard_sea_choice_083_alt": {
      "ending": true,
      "title": "The Safe Harbor: Beyond the Harbor",
      "scene": "bridge",
      "text": "You follow the distant light instead of ending the voyage at “The Safe Harbor.” Beyond the familiar water lies an overlooked inlet whose markers complete the harbor map, turning your journey into a lesson about noticing what earlier explorers missed."
    },
    "hard_sea_choice_084": {
      "text": "The moment called “The Reef Chart” feels like an ending, but the magic of the book leaves one small door open. Far across the water, a lantern flashes twice and then waits for your answer.",
      "choices": [
        {
          "text": "Mark the safe harbor",
          "next": "hard_sea_e5"
        },
        {
          "text": "Follow the distant light",
          "next": "hard_sea_choice_084_alt"
        }
      ]
    },
    "hard_sea_choice_084_alt": {
      "ending": true,
      "title": "The Reef Chart: Beyond the Harbor",
      "scene": "ocean_boat",
      "text": "You follow the distant light instead of ending the voyage at “The Reef Chart.” Beyond the familiar water lies an overlooked inlet whose markers complete the harbor map, turning your journey into a lesson about noticing what earlier explorers missed."
    },
    "hard_sea_choice_085": {
      "text": "The moment called “The Sheltered Cove” feels like an ending, but the magic of the book leaves one small door open. Far across the water, a lantern flashes twice and then waits for your answer.",
      "choices": [
        {
          "text": "Mark the safe harbor",
          "next": "hard_sea_e7"
        },
        {
          "text": "Follow the distant light",
          "next": "hard_sea_choice_085_alt"
        }
      ]
    },
    "hard_sea_choice_085_alt": {
      "ending": true,
      "title": "The Sheltered Cove: Beyond the Harbor",
      "scene": "village",
      "text": "You follow the distant light instead of ending the voyage at “The Sheltered Cove.” Beyond the familiar water lies an overlooked inlet whose markers complete the harbor map, turning your journey into a lesson about noticing what earlier explorers missed."
    },
    "hard_sea_choice_086": {
      "text": "The moment called “Keeper of the Light” feels like an ending, but the magic of the book leaves one small door open. Far across the water, a lantern flashes twice and then waits for your answer.",
      "choices": [
        {
          "text": "Mark the safe harbor",
          "next": "hard_sea_e8"
        },
        {
          "text": "Follow the distant light",
          "next": "hard_sea_choice_086_alt"
        }
      ]
    },
    "hard_sea_choice_086_alt": {
      "ending": true,
      "title": "Keeper of the Light: Beyond the Harbor",
      "scene": "moon",
      "text": "You follow the distant light instead of ending the voyage at “Keeper of the Light.” Beyond the familiar water lies an overlooked inlet whose markers complete the harbor map, turning your journey into a lesson about noticing what earlier explorers missed."
    },
    "hard_sea_choice_087": {
      "text": "The moment called “The Brass Markers” feels like an ending, but the magic of the book leaves one small door open. Far across the water, a lantern flashes twice and then waits for your answer.",
      "choices": [
        {
          "text": "Mark the safe harbor",
          "next": "hard_sea_e10"
        },
        {
          "text": "Follow the distant light",
          "next": "hard_sea_choice_087_alt"
        }
      ]
    },
    "hard_sea_choice_087_alt": {
      "ending": true,
      "title": "The Brass Markers: Beyond the Harbor",
      "scene": "bridge",
      "text": "You follow the distant light instead of ending the voyage at “The Brass Markers.” Beyond the familiar water lies an overlooked inlet whose markers complete the harbor map, turning your journey into a lesson about noticing what earlier explorers missed."
    },
    "hard_sea_choice_088": {
      "text": "The moment called “Storm Moon” feels like an ending, but the magic of the book leaves one small door open. Far across the water, a lantern flashes twice and then waits for your answer.",
      "choices": [
        {
          "text": "Mark the safe harbor",
          "next": "hard_sea_e11"
        },
        {
          "text": "Follow the distant light",
          "next": "hard_sea_choice_088_alt"
        }
      ]
    },
    "hard_sea_choice_088_alt": {
      "ending": true,
      "title": "Storm Moon: Beyond the Harbor",
      "scene": "ocean_boat",
      "text": "You follow the distant light instead of ending the voyage at “Storm Moon.” Beyond the familiar water lies an overlooked inlet whose markers complete the harbor map, turning your journey into a lesson about noticing what earlier explorers missed."
    },
    "hard_sea_choice_089": {
      "text": "The moment called “Garden by the Sea” feels like an ending, but the magic of the book leaves one small door open. Far across the water, a lantern flashes twice and then waits for your answer.",
      "choices": [
        {
          "text": "Mark the safe harbor",
          "next": "hard_sea_e14"
        },
        {
          "text": "Follow the distant light",
          "next": "hard_sea_choice_089_alt"
        }
      ]
    },
    "hard_sea_choice_089_alt": {
      "ending": true,
      "title": "Garden by the Sea: Beyond the Harbor",
      "scene": "village",
      "text": "You follow the distant light instead of ending the voyage at “Garden by the Sea.” Beyond the familiar water lies an overlooked inlet whose markers complete the harbor map, turning your journey into a lesson about noticing what earlier explorers missed."
    },
    "hard_sea_choice_090": {
      "text": "The moment called “The Lighthouse Bridge” feels like an ending, but the magic of the book leaves one small door open. Far across the water, a lantern flashes twice and then waits for your answer.",
      "choices": [
        {
          "text": "Mark the safe harbor",
          "next": "hard_sea_e15"
        },
        {
          "text": "Follow the distant light",
          "next": "hard_sea_choice_090_alt"
        }
      ]
    },
    "hard_sea_choice_090_alt": {
      "ending": true,
      "title": "The Lighthouse Bridge: Beyond the Harbor",
      "scene": "moon",
      "text": "You follow the distant light instead of ending the voyage at “The Lighthouse Bridge.” Beyond the familiar water lies an overlooked inlet whose markers complete the harbor map, turning your journey into a lesson about noticing what earlier explorers missed."
    },
    "hard_sea_choice_091": {
      "text": "The moment called “The Harbor's Memory” feels like an ending, but the magic of the book leaves one small door open. Far across the water, a lantern flashes twice and then waits for your answer.",
      "choices": [
        {
          "text": "Mark the safe harbor",
          "next": "hard_sea_e17"
        },
        {
          "text": "Follow the distant light",
          "next": "hard_sea_choice_091_alt"
        }
      ]
    },
    "hard_sea_choice_091_alt": {
      "ending": true,
      "title": "The Harbor's Memory: Beyond the Harbor",
      "scene": "bridge",
      "text": "You follow the distant light instead of ending the voyage at “The Harbor's Memory.” Beyond the familiar water lies an overlooked inlet whose markers complete the harbor map, turning your journey into a lesson about noticing what earlier explorers missed."
    },
    "hard_stars_choice_092": {
      "text": "The moment called “The Hidden Constellation” feels like an ending, but the magic of the book leaves one small door open. A new point of light appears beside the path you have already travelled.",
      "choices": [
        {
          "text": "Archive the discovery",
          "next": "hard_stars_e4"
        },
        {
          "text": "Cross the unknown bridge",
          "next": "hard_stars_choice_092_alt"
        }
      ]
    },
    "hard_stars_choice_092_alt": {
      "ending": true,
      "title": "The Hidden Constellation: Beyond the Map",
      "scene": "star_ship",
      "text": "You cross beyond the boundary marked by “The Hidden Constellation.” The unknown bridge leads to an observatory where the earlier clues form a larger pattern, and you choose to record what is known while leaving the unanswered stars for another reader."
    },
    "hard_stars_choice_093": {
      "text": "The moment called “The Astrolabe” feels like an ending, but the magic of the book leaves one small door open. A new point of light appears beside the path you have already travelled.",
      "choices": [
        {
          "text": "Archive the discovery",
          "next": "hard_stars_e5"
        },
        {
          "text": "Cross the unknown bridge",
          "next": "hard_stars_choice_093_alt"
        }
      ]
    },
    "hard_stars_choice_093_alt": {
      "ending": true,
      "title": "The Astrolabe: Beyond the Map",
      "scene": "moon",
      "text": "You cross beyond the boundary marked by “The Astrolabe.” The unknown bridge leads to an observatory where the earlier clues form a larger pattern, and you choose to record what is known while leaving the unanswered stars for another reader."
    },
    "hard_stars_choice_094": {
      "text": "The moment called “The Moon Bridge” feels like an ending, but the magic of the book leaves one small door open. A new point of light appears beside the path you have already travelled.",
      "choices": [
        {
          "text": "Archive the discovery",
          "next": "hard_stars_e7"
        },
        {
          "text": "Cross the unknown bridge",
          "next": "hard_stars_choice_094_alt"
        }
      ]
    },
    "hard_stars_choice_094_alt": {
      "ending": true,
      "title": "The Moon Bridge: Beyond the Map",
      "scene": "sun",
      "text": "You cross beyond the boundary marked by “The Moon Bridge.” The unknown bridge leads to an observatory where the earlier clues form a larger pattern, and you choose to record what is known while leaving the unanswered stars for another reader."
    },
    "hard_stars_choice_095": {
      "text": "The moment called “Garden of True Stories” feels like an ending, but the magic of the book leaves one small door open. A new point of light appears beside the path you have already travelled.",
      "choices": [
        {
          "text": "Archive the discovery",
          "next": "hard_stars_e8"
        },
        {
          "text": "Cross the unknown bridge",
          "next": "hard_stars_choice_095_alt"
        }
      ]
    },
    "hard_stars_choice_095_alt": {
      "ending": true,
      "title": "Garden of True Stories: Beyond the Map",
      "scene": "map",
      "text": "You cross beyond the boundary marked by “Garden of True Stories.” The unknown bridge leads to an observatory where the earlier clues form a larger pattern, and you choose to record what is known while leaving the unanswered stars for another reader."
    },
    "hard_stars_choice_096": {
      "text": "The moment called “The Forgotten Story” feels like an ending, but the magic of the book leaves one small door open. A new point of light appears beside the path you have already travelled.",
      "choices": [
        {
          "text": "Archive the discovery",
          "next": "hard_stars_e10"
        },
        {
          "text": "Cross the unknown bridge",
          "next": "hard_stars_choice_096_alt"
        }
      ]
    },
    "hard_stars_choice_096_alt": {
      "ending": true,
      "title": "The Forgotten Story: Beyond the Map",
      "scene": "star_ship",
      "text": "You cross beyond the boundary marked by “The Forgotten Story.” The unknown bridge leads to an observatory where the earlier clues form a larger pattern, and you choose to record what is known while leaving the unanswered stars for another reader."
    },
    "hard_stars_choice_097": {
      "text": "The moment called “Dawn Beyond the Clouds” feels like an ending, but the magic of the book leaves one small door open. A new point of light appears beside the path you have already travelled.",
      "choices": [
        {
          "text": "Archive the discovery",
          "next": "hard_stars_e11"
        },
        {
          "text": "Cross the unknown bridge",
          "next": "hard_stars_choice_097_alt"
        }
      ]
    },
    "hard_stars_choice_097_alt": {
      "ending": true,
      "title": "Dawn Beyond the Clouds: Beyond the Map",
      "scene": "moon",
      "text": "You cross beyond the boundary marked by “Dawn Beyond the Clouds.” The unknown bridge leads to an observatory where the earlier clues form a larger pattern, and you choose to record what is known while leaving the unanswered stars for another reader."
    },
    "hard_stars_choice_098": {
      "text": "The moment called “The Star Archive” feels like an ending, but the magic of the book leaves one small door open. A new point of light appears beside the path you have already travelled.",
      "choices": [
        {
          "text": "Archive the discovery",
          "next": "hard_stars_e14"
        },
        {
          "text": "Cross the unknown bridge",
          "next": "hard_stars_choice_098_alt"
        }
      ]
    },
    "hard_stars_choice_098_alt": {
      "ending": true,
      "title": "The Star Archive: Beyond the Map",
      "scene": "sun",
      "text": "You cross beyond the boundary marked by “The Star Archive.” The unknown bridge leads to an observatory where the earlier clues form a larger pattern, and you choose to record what is known while leaving the unanswered stars for another reader."
    },
    "hard_stars_choice_099": {
      "text": "The moment called “Phoenix of Starlight” feels like an ending, but the magic of the book leaves one small door open. A new point of light appears beside the path you have already travelled.",
      "choices": [
        {
          "text": "Archive the discovery",
          "next": "hard_stars_e15"
        },
        {
          "text": "Cross the unknown bridge",
          "next": "hard_stars_choice_099_alt"
        }
      ]
    },
    "hard_stars_choice_099_alt": {
      "ending": true,
      "title": "Phoenix of Starlight: Beyond the Map",
      "scene": "map",
      "text": "You cross beyond the boundary marked by “Phoenix of Starlight.” The unknown bridge leads to an observatory where the earlier clues form a larger pattern, and you choose to record what is known while leaving the unanswered stars for another reader."
    },
    "hard_stars_choice_100": {
      "text": "The moment called “The Quiet Planet” feels like an ending, but the magic of the book leaves one small door open. A new point of light appears beside the path you have already travelled.",
      "choices": [
        {
          "text": "Archive the discovery",
          "next": "hard_stars_e17"
        },
        {
          "text": "Cross the unknown bridge",
          "next": "hard_stars_choice_100_alt"
        }
      ]
    },
    "hard_stars_choice_100_alt": {
      "ending": true,
      "title": "The Quiet Planet: Beyond the Map",
      "scene": "star_ship",
      "text": "You cross beyond the boundary marked by “The Quiet Planet.” The unknown bridge leads to an observatory where the earlier clues form a larger pattern, and you choose to record what is known while leaving the unanswered stars for another reader."
    },
    "easy_forest_d2_ra0a0_2_side": {
      "text": "A line of fireflies gathers beside the trail. They lead you to a tiny clearing where something from the forest has been waiting for a helper.",
      "choices": [
        {
          "text": "Firefly Garden",
          "next": "easy_forest_d2_ra0a0_2_side_a"
        },
        {
          "text": "Lantern Leaf",
          "next": "easy_forest_d2_ra0a0_2_side_b"
        }
      ]
    },
    "easy_forest_d2_ra0a0_2_side_a": {
      "ending": true,
      "title": "Firefly Garden",
      "scene": "garden",
      "text": "The fireflies guide you to a garden of night flowers. You help them find a lost seed, and every flower opens like a little lantern."
    },
    "easy_forest_d2_ra0a0_2_side_b": {
      "ending": true,
      "title": "Lantern Leaf",
      "scene": "forest_home",
      "text": "A golden leaf lights your way back to the main trail. You tuck it into the book, where it glows whenever someone needs courage."
    },
    "easy_forest_d2_ra0b1_9_side": {
      "text": "A line of fireflies gathers beside the trail. They lead you to a tiny clearing where something from the forest has been waiting for a helper.",
      "choices": [
        {
          "text": "Firefly Garden",
          "next": "easy_forest_d2_ra0b1_9_side_a"
        },
        {
          "text": "Lantern Leaf",
          "next": "easy_forest_d2_ra0b1_9_side_b"
        }
      ]
    },
    "easy_forest_d2_ra0b1_9_side_a": {
      "ending": true,
      "title": "Firefly Garden",
      "scene": "garden",
      "text": "The fireflies guide you to a garden of night flowers. You help them find a lost seed, and every flower opens like a little lantern."
    },
    "easy_forest_d2_ra0b1_9_side_b": {
      "ending": true,
      "title": "Lantern Leaf",
      "scene": "forest_home",
      "text": "A golden leaf lights your way back to the main trail. You tuck it into the book, where it glows whenever someone needs courage."
    },
    "easy_castle_d2_ra0a0_2_side": {
      "text": "A small bell rings from somewhere behind the walls. You follow the sound and find a hidden room with two friendly choices waiting.",
      "choices": [
        {
          "text": "The Bell Room",
          "next": "easy_castle_d2_ra0a0_2_side_a"
        },
        {
          "text": "Midnight Feast",
          "next": "easy_castle_d2_ra0a0_2_side_b"
        }
      ]
    },
    "easy_castle_d2_ra0a0_2_side_a": {
      "ending": true,
      "title": "The Bell Room",
      "scene": "castle",
      "text": "You polish the old bell until it shines. When you ring it, the castle lights come on one by one, all the way to the library door."
    },
    "easy_castle_d2_ra0a0_2_side_b": {
      "ending": true,
      "title": "Midnight Feast",
      "scene": "feast",
      "text": "The hidden room is a tiny kitchen prepared for travellers. You share the warm food with the castle helpers before heading home."
    },
    "easy_castle_d2_ra0b1_9_side": {
      "text": "A small bell rings from somewhere behind the walls. You follow the sound and find a hidden room with two friendly choices waiting.",
      "choices": [
        {
          "text": "The Bell Room",
          "next": "easy_castle_d2_ra0b1_9_side_a"
        },
        {
          "text": "Midnight Feast",
          "next": "easy_castle_d2_ra0b1_9_side_b"
        }
      ]
    },
    "easy_castle_d2_ra0b1_9_side_a": {
      "ending": true,
      "title": "The Bell Room",
      "scene": "castle",
      "text": "You polish the old bell until it shines. When you ring it, the castle lights come on one by one, all the way to the library door."
    },
    "easy_castle_d2_ra0b1_9_side_b": {
      "ending": true,
      "title": "Midnight Feast",
      "scene": "feast",
      "text": "The hidden room is a tiny kitchen prepared for travellers. You share the warm food with the castle helpers before heading home."
    },
    "easy_sea_d2_ra0a0_2_side": {
      "text": "A silver gull circles above you three times, then flies toward a quiet strip of shore. Something shiny waits beneath the foam.",
      "choices": [
        {
          "text": "Gull’s Cove",
          "next": "easy_sea_d2_ra0a0_2_side_a"
        },
        {
          "text": "Shell Garden",
          "next": "easy_sea_d2_ra0a0_2_side_b"
        }
      ]
    },
    "easy_sea_d2_ra0a0_2_side_a": {
      "ending": true,
      "title": "Gull’s Cove",
      "scene": "ocean_boat",
      "text": "The shiny object is a little compass that points toward safe water. You thank the gull and leave the compass where another sailor can find it."
    },
    "easy_sea_d2_ra0a0_2_side_b": {
      "ending": true,
      "title": "Shell Garden",
      "scene": "garden",
      "text": "The cove is filled with tiny shells arranged in a spiral. You add one shell of your own and watch the tide turn the pattern into a shining picture."
    },
    "easy_sea_d2_ra0b1_9_side": {
      "text": "A silver gull circles above you three times, then flies toward a quiet strip of shore. Something shiny waits beneath the foam.",
      "choices": [
        {
          "text": "Gull’s Cove",
          "next": "easy_sea_d2_ra0b1_9_side_a"
        },
        {
          "text": "Shell Garden",
          "next": "easy_sea_d2_ra0b1_9_side_b"
        }
      ]
    },
    "easy_sea_d2_ra0b1_9_side_a": {
      "ending": true,
      "title": "Gull’s Cove",
      "scene": "ocean_boat",
      "text": "The shiny object is a little compass that points toward safe water. You thank the gull and leave the compass where another sailor can find it."
    },
    "easy_sea_d2_ra0b1_9_side_b": {
      "ending": true,
      "title": "Shell Garden",
      "scene": "garden",
      "text": "The cove is filled with tiny shells arranged in a spiral. You add one shell of your own and watch the tide turn the pattern into a shining picture."
    },
    "easy_stars_d2_ra0a0_2_side": {
      "text": "A tiny comet zips past your shoulder and leaves a trail of blue sparkles. The sparkles form a little door in the air.",
      "choices": [
        {
          "text": "Comet Door",
          "next": "easy_stars_d2_ra0a0_2_side_a"
        },
        {
          "text": "Cloud Observatory",
          "next": "easy_stars_d2_ra0a0_2_side_b"
        }
      ]
    },
    "easy_stars_d2_ra0a0_2_side_a": {
      "ending": true,
      "title": "Comet Door",
      "scene": "garden",
      "text": "The door opens onto a garden floating beside a moon. You plant one glowing seed, and it becomes a new star-shaped flower."
    },
    "easy_stars_d2_ra0a0_2_side_b": {
      "ending": true,
      "title": "Cloud Observatory",
      "scene": "map",
      "text": "The comet carries you to a soft cloud where you can see the whole storybook below. You wave to the library and mark the view on your map."
    },
    "easy_stars_d2_ra0b1_9_side": {
      "text": "A tiny comet zips past your shoulder and leaves a trail of blue sparkles. The sparkles form a little door in the air.",
      "choices": [
        {
          "text": "Comet Door",
          "next": "easy_stars_d2_ra0b1_9_side_a"
        },
        {
          "text": "Cloud Observatory",
          "next": "easy_stars_d2_ra0b1_9_side_b"
        }
      ]
    },
    "easy_stars_d2_ra0b1_9_side_a": {
      "ending": true,
      "title": "Comet Door",
      "scene": "garden",
      "text": "The door opens onto a garden floating beside a moon. You plant one glowing seed, and it becomes a new star-shaped flower."
    },
    "easy_stars_d2_ra0b1_9_side_b": {
      "ending": true,
      "title": "Cloud Observatory",
      "scene": "map",
      "text": "The comet carries you to a soft cloud where you can see the whole storybook below. You wave to the library and mark the view on your map."
    },
    "medium_forest_d2_ra0a0_2_side": {
      "text": "Three fireflies rise from the grass and form an arrow toward a forgotten grove. Their light grows brighter whenever you move in the right direction.",
      "choices": [
        {
          "text": "The Firefly Grove",
          "next": "medium_forest_d2_ra0a0_2_side_a"
        },
        {
          "text": "The Night Guide",
          "next": "medium_forest_d2_ra0a0_2_side_b"
        }
      ]
    },
    "medium_forest_d2_ra0a0_2_side_a": {
      "ending": true,
      "title": "The Firefly Grove",
      "scene": "garden",
      "text": "The grove is home to young trees that have lost their way around the clearing. You place the fallen trail stones carefully, and the grove becomes easy for future readers to navigate."
    },
    "medium_forest_d2_ra0a0_2_side_b": {
      "ending": true,
      "title": "The Night Guide",
      "scene": "map",
      "text": "One firefly settles on your map and reveals a safer route through the woods. You carry the new map back so another explorer will not have to guess."
    },
    "medium_forest_d2_ra0b1_9_side": {
      "text": "Three fireflies rise from the grass and form an arrow toward a forgotten grove. Their light grows brighter whenever you move in the right direction.",
      "choices": [
        {
          "text": "The Firefly Grove",
          "next": "medium_forest_d2_ra0b1_9_side_a"
        },
        {
          "text": "The Night Guide",
          "next": "medium_forest_d2_ra0b1_9_side_b"
        }
      ]
    },
    "medium_forest_d2_ra0b1_9_side_a": {
      "ending": true,
      "title": "The Firefly Grove",
      "scene": "garden",
      "text": "The grove is home to young trees that have lost their way around the clearing. You place the fallen trail stones carefully, and the grove becomes easy for future readers to navigate."
    },
    "medium_forest_d2_ra0b1_9_side_b": {
      "ending": true,
      "title": "The Night Guide",
      "scene": "map",
      "text": "One firefly settles on your map and reveals a safer route through the woods. You carry the new map back so another explorer will not have to guess."
    },
    "medium_forest_d2_rb1a0_17_side": {
      "text": "Three fireflies rise from the grass and form an arrow toward a forgotten grove. Their light grows brighter whenever you move in the right direction.",
      "choices": [
        {
          "text": "The Firefly Grove",
          "next": "medium_forest_d2_rb1a0_17_side_a"
        },
        {
          "text": "The Night Guide",
          "next": "medium_forest_d2_rb1a0_17_side_b"
        }
      ]
    },
    "medium_forest_d2_rb1a0_17_side_a": {
      "ending": true,
      "title": "The Firefly Grove",
      "scene": "garden",
      "text": "The grove is home to young trees that have lost their way around the clearing. You place the fallen trail stones carefully, and the grove becomes easy for future readers to navigate."
    },
    "medium_forest_d2_rb1a0_17_side_b": {
      "ending": true,
      "title": "The Night Guide",
      "scene": "map",
      "text": "One firefly settles on your map and reveals a safer route through the woods. You carry the new map back so another explorer will not have to guess."
    },
    "medium_castle_d2_ra0a0_2_side": {
      "text": "A candle moves along a side corridor even though nobody seems to be carrying it. You follow it to a forgotten part of the keep.",
      "choices": [
        {
          "text": "The Keeper’s Pantry",
          "next": "medium_castle_d2_ra0a0_2_side_a"
        },
        {
          "text": "The Hidden Stair",
          "next": "medium_castle_d2_ra0a0_2_side_b"
        }
      ]
    },
    "medium_castle_d2_ra0a0_2_side_a": {
      "ending": true,
      "title": "The Keeper’s Pantry",
      "scene": "feast",
      "text": "You discover shelves of supplies labelled for anyone who needs them. You help organise the pantry, and the castle steward thanks you for thinking about the next visitor."
    },
    "medium_castle_d2_ra0a0_2_side_b": {
      "ending": true,
      "title": "The Hidden Stair",
      "scene": "map",
      "text": "The candle stops beside a narrow stair that leads to a balcony above the courtyard. From there, you spot the safest route through the keep and record it on the castle map."
    },
    "medium_castle_d2_ra0b1_9_side": {
      "text": "A candle moves along a side corridor even though nobody seems to be carrying it. You follow it to a forgotten part of the keep.",
      "choices": [
        {
          "text": "The Keeper’s Pantry",
          "next": "medium_castle_d2_ra0b1_9_side_a"
        },
        {
          "text": "The Hidden Stair",
          "next": "medium_castle_d2_ra0b1_9_side_b"
        }
      ]
    },
    "medium_castle_d2_ra0b1_9_side_a": {
      "ending": true,
      "title": "The Keeper’s Pantry",
      "scene": "feast",
      "text": "You discover shelves of supplies labelled for anyone who needs them. You help organise the pantry, and the castle steward thanks you for thinking about the next visitor."
    },
    "medium_castle_d2_ra0b1_9_side_b": {
      "ending": true,
      "title": "The Hidden Stair",
      "scene": "map",
      "text": "The candle stops beside a narrow stair that leads to a balcony above the courtyard. From there, you spot the safest route through the keep and record it on the castle map."
    },
    "medium_castle_d2_rb1a0_17_side": {
      "text": "A candle moves along a side corridor even though nobody seems to be carrying it. You follow it to a forgotten part of the keep.",
      "choices": [
        {
          "text": "The Keeper’s Pantry",
          "next": "medium_castle_d2_rb1a0_17_side_a"
        },
        {
          "text": "The Hidden Stair",
          "next": "medium_castle_d2_rb1a0_17_side_b"
        }
      ]
    },
    "medium_castle_d2_rb1a0_17_side_a": {
      "ending": true,
      "title": "The Keeper’s Pantry",
      "scene": "feast",
      "text": "You discover shelves of supplies labelled for anyone who needs them. You help organise the pantry, and the castle steward thanks you for thinking about the next visitor."
    },
    "medium_castle_d2_rb1a0_17_side_b": {
      "ending": true,
      "title": "The Hidden Stair",
      "scene": "map",
      "text": "The candle stops beside a narrow stair that leads to a balcony above the courtyard. From there, you spot the safest route through the keep and record it on the castle map."
    },
    "medium_sea_d2_ra0a0_2_side": {
      "text": "The waves begin to make a repeating rhythm against the rocks. When you listen closely, the rhythm sounds like a message pointing toward a hidden cove.",
      "choices": [
        {
          "text": "The Tide Garden",
          "next": "medium_sea_d2_ra0a0_2_side_a"
        },
        {
          "text": "The Sailor’s Marker",
          "next": "medium_sea_d2_ra0a0_2_side_b"
        }
      ]
    },
    "medium_sea_d2_ra0a0_2_side_a": {
      "ending": true,
      "title": "The Tide Garden",
      "scene": "garden",
      "text": "The cove is sheltered by tall rocks and filled with sea flowers. You clear a small channel so fresh water can reach them, and the garden begins to bloom."
    },
    "medium_sea_d2_ra0a0_2_side_b": {
      "ending": true,
      "title": "The Sailor’s Marker",
      "scene": "bridge",
      "text": "You find an old marker stone beneath the tide line. You raise it where passing boats can see it, making the safe channel easier to find."
    },
    "medium_sea_d2_ra0b1_9_side": {
      "text": "The waves begin to make a repeating rhythm against the rocks. When you listen closely, the rhythm sounds like a message pointing toward a hidden cove.",
      "choices": [
        {
          "text": "The Tide Garden",
          "next": "medium_sea_d2_ra0b1_9_side_a"
        },
        {
          "text": "The Sailor’s Marker",
          "next": "medium_sea_d2_ra0b1_9_side_b"
        }
      ]
    },
    "medium_sea_d2_ra0b1_9_side_a": {
      "ending": true,
      "title": "The Tide Garden",
      "scene": "garden",
      "text": "The cove is sheltered by tall rocks and filled with sea flowers. You clear a small channel so fresh water can reach them, and the garden begins to bloom."
    },
    "medium_sea_d2_ra0b1_9_side_b": {
      "ending": true,
      "title": "The Sailor’s Marker",
      "scene": "bridge",
      "text": "You find an old marker stone beneath the tide line. You raise it where passing boats can see it, making the safe channel easier to find."
    },
    "medium_sea_d2_rb1a0_17_side": {
      "text": "The waves begin to make a repeating rhythm against the rocks. When you listen closely, the rhythm sounds like a message pointing toward a hidden cove.",
      "choices": [
        {
          "text": "The Tide Garden",
          "next": "medium_sea_d2_rb1a0_17_side_a"
        },
        {
          "text": "The Sailor’s Marker",
          "next": "medium_sea_d2_rb1a0_17_side_b"
        }
      ]
    },
    "medium_sea_d2_rb1a0_17_side_a": {
      "ending": true,
      "title": "The Tide Garden",
      "scene": "garden",
      "text": "The cove is sheltered by tall rocks and filled with sea flowers. You clear a small channel so fresh water can reach them, and the garden begins to bloom."
    },
    "medium_sea_d2_rb1a0_17_side_b": {
      "ending": true,
      "title": "The Sailor’s Marker",
      "scene": "bridge",
      "text": "You find an old marker stone beneath the tide line. You raise it where passing boats can see it, making the safe channel easier to find."
    },
    "medium_stars_d2_ra0a0_2_side": {
      "text": "A blue pulse flashes between two constellations. It repeats in a pattern that looks almost like a message from another reader.",
      "choices": [
        {
          "text": "The Signal Garden",
          "next": "medium_stars_d2_ra0a0_2_side_a"
        },
        {
          "text": "The Orbit Map",
          "next": "medium_stars_d2_ra0a0_2_side_b"
        }
      ]
    },
    "medium_stars_d2_ra0a0_2_side_a": {
      "ending": true,
      "title": "The Signal Garden",
      "scene": "garden",
      "text": "The signal leads to a quiet garden where star-flowers blink in patterns. You copy the pattern carefully and discover it is a welcome message."
    },
    "medium_stars_d2_ra0a0_2_side_b": {
      "ending": true,
      "title": "The Orbit Map",
      "scene": "map",
      "text": "The signal reveals a safe orbit around a small moon. You add the route to the library chart before guiding your way home."
    },
    "medium_stars_d2_ra0b1_9_side": {
      "text": "A blue pulse flashes between two constellations. It repeats in a pattern that looks almost like a message from another reader.",
      "choices": [
        {
          "text": "The Signal Garden",
          "next": "medium_stars_d2_ra0b1_9_side_a"
        },
        {
          "text": "The Orbit Map",
          "next": "medium_stars_d2_ra0b1_9_side_b"
        }
      ]
    },
    "medium_stars_d2_ra0b1_9_side_a": {
      "ending": true,
      "title": "The Signal Garden",
      "scene": "garden",
      "text": "The signal leads to a quiet garden where star-flowers blink in patterns. You copy the pattern carefully and discover it is a welcome message."
    },
    "medium_stars_d2_ra0b1_9_side_b": {
      "ending": true,
      "title": "The Orbit Map",
      "scene": "map",
      "text": "The signal reveals a safe orbit around a small moon. You add the route to the library chart before guiding your way home."
    },
    "medium_stars_d2_rb1a0_17_side": {
      "text": "A blue pulse flashes between two constellations. It repeats in a pattern that looks almost like a message from another reader.",
      "choices": [
        {
          "text": "The Signal Garden",
          "next": "medium_stars_d2_rb1a0_17_side_a"
        },
        {
          "text": "The Orbit Map",
          "next": "medium_stars_d2_rb1a0_17_side_b"
        }
      ]
    },
    "medium_stars_d2_rb1a0_17_side_a": {
      "ending": true,
      "title": "The Signal Garden",
      "scene": "garden",
      "text": "The signal leads to a quiet garden where star-flowers blink in patterns. You copy the pattern carefully and discover it is a welcome message."
    },
    "medium_stars_d2_rb1a0_17_side_b": {
      "ending": true,
      "title": "The Orbit Map",
      "scene": "map",
      "text": "The signal reveals a safe orbit around a small moon. You add the route to the library chart before guiding your way home."
    },
    "hard_forest_d2_ra0a0_2_side": {
      "text": "A narrow strip of bark bears a list of names and dates. It seems to be a record of everyone who has helped the woods, and one empty line waits for your choice.",
      "choices": [
        {
          "text": "The Forest Ledger",
          "next": "hard_forest_d2_ra0a0_2_side_a"
        },
        {
          "text": "The Unmarked Grove",
          "next": "hard_forest_d2_ra0a0_2_side_b"
        }
      ]
    },
    "hard_forest_d2_ra0a0_2_side_a": {
      "ending": true,
      "title": "The Forest Ledger",
      "scene": "library_return",
      "text": "You add the truth about what you discovered rather than taking credit for everything. The ancient trees rustle in approval, and the ledger becomes a little more complete."
    },
    "hard_forest_d2_ra0a0_2_side_b": {
      "ending": true,
      "title": "The Unmarked Grove",
      "scene": "map",
      "text": "The ledger points toward a grove missing from every map. You find it thriving quietly beyond the known trail and leave its location for careful explorers to discover later."
    },
    "hard_forest_d2_ra0b1_12_side": {
      "text": "A narrow strip of bark bears a list of names and dates. It seems to be a record of everyone who has helped the woods, and one empty line waits for your choice.",
      "choices": [
        {
          "text": "The Forest Ledger",
          "next": "hard_forest_d2_ra0b1_12_side_a"
        },
        {
          "text": "The Unmarked Grove",
          "next": "hard_forest_d2_ra0b1_12_side_b"
        }
      ]
    },
    "hard_forest_d2_ra0b1_12_side_a": {
      "ending": true,
      "title": "The Forest Ledger",
      "scene": "library_return",
      "text": "You add the truth about what you discovered rather than taking credit for everything. The ancient trees rustle in approval, and the ledger becomes a little more complete."
    },
    "hard_forest_d2_ra0b1_12_side_b": {
      "ending": true,
      "title": "The Unmarked Grove",
      "scene": "map",
      "text": "The ledger points toward a grove missing from every map. You find it thriving quietly beyond the known trail and leave its location for careful explorers to discover later."
    },
    "hard_castle_d2_ra0a0_2_side": {
      "text": "A draft carries the smell of dust and cedar from a passage used by cooks, messengers, and librarians long ago. Its walls are covered with small notes about the castle’s daily life.",
      "choices": [
        {
          "text": "The Service Chronicle",
          "next": "hard_castle_d2_ra0a0_2_side_a"
        },
        {
          "text": "The Overlook",
          "next": "hard_castle_d2_ra0a0_2_side_b"
        }
      ]
    },
    "hard_castle_d2_ra0a0_2_side_a": {
      "ending": true,
      "title": "The Service Chronicle",
      "scene": "library_return",
      "text": "You piece together the notes and realise the castle was kept running by hundreds of small acts of care. You preserve the record in the library archive."
    },
    "hard_castle_d2_ra0a0_2_side_b": {
      "ending": true,
      "title": "The Overlook",
      "scene": "map",
      "text": "The passage ends at an overlook above the whole keep. From there, you understand why the corridors were built as they were and sketch the design for future readers."
    },
    "hard_castle_d2_ra0b1_12_side": {
      "text": "A draft carries the smell of dust and cedar from a passage used by cooks, messengers, and librarians long ago. Its walls are covered with small notes about the castle’s daily life.",
      "choices": [
        {
          "text": "The Service Chronicle",
          "next": "hard_castle_d2_ra0b1_12_side_a"
        },
        {
          "text": "The Overlook",
          "next": "hard_castle_d2_ra0b1_12_side_b"
        }
      ]
    },
    "hard_castle_d2_ra0b1_12_side_a": {
      "ending": true,
      "title": "The Service Chronicle",
      "scene": "library_return",
      "text": "You piece together the notes and realise the castle was kept running by hundreds of small acts of care. You preserve the record in the library archive."
    },
    "hard_castle_d2_ra0b1_12_side_b": {
      "ending": true,
      "title": "The Overlook",
      "scene": "map",
      "text": "The passage ends at an overlook above the whole keep. From there, you understand why the corridors were built as they were and sketch the design for future readers."
    },
    "hard_sea_d2_ra0a0_2_side": {
      "text": "A faded chart has been scratched into a piece of driftwood. Its currents do not match the modern harbor, suggesting the coastline has changed over time.",
      "choices": [
        {
          "text": "The Changing Coast",
          "next": "hard_sea_d2_ra0a0_2_side_a"
        },
        {
          "text": "The Deepwater Bell",
          "next": "hard_sea_d2_ra0a0_2_side_b"
        }
      ]
    },
    "hard_sea_d2_ra0a0_2_side_a": {
      "ending": true,
      "title": "The Changing Coast",
      "scene": "map",
      "text": "You compare the old chart with what you can see and realise the sea has quietly redrawn the shore. Your careful notes become a valuable addition to the library’s maps."
    },
    "hard_sea_d2_ra0a0_2_side_b": {
      "ending": true,
      "title": "The Deepwater Bell",
      "scene": "ocean_boat",
      "text": "The old current leads you to a bell beneath the surface. Its sound marks a safe channel, and you learn that the best clues are sometimes heard rather than seen."
    },
    "hard_sea_d2_ra0b1_12_side": {
      "text": "A faded chart has been scratched into a piece of driftwood. Its currents do not match the modern harbor, suggesting the coastline has changed over time.",
      "choices": [
        {
          "text": "The Changing Coast",
          "next": "hard_sea_d2_ra0b1_12_side_a"
        },
        {
          "text": "The Deepwater Bell",
          "next": "hard_sea_d2_ra0b1_12_side_b"
        }
      ]
    },
    "hard_sea_d2_ra0b1_12_side_a": {
      "ending": true,
      "title": "The Changing Coast",
      "scene": "map",
      "text": "You compare the old chart with what you can see and realise the sea has quietly redrawn the shore. Your careful notes become a valuable addition to the library’s maps."
    },
    "hard_sea_d2_ra0b1_12_side_b": {
      "ending": true,
      "title": "The Deepwater Bell",
      "scene": "ocean_boat",
      "text": "The old current leads you to a bell beneath the surface. Its sound marks a safe channel, and you learn that the best clues are sometimes heard rather than seen."
    },
    "hard_stars_d2_ra0a0_2_side": {
      "text": "The signal has no sound, yet its rhythm is unmistakable. You compare it with the patterns you have already seen and realise it is describing a route rather than a destination.",
      "choices": [
        {
          "text": "The Patient Observatory",
          "next": "hard_stars_d2_ra0a0_2_side_a"
        },
        {
          "text": "The Unfinished Chart",
          "next": "hard_stars_d2_ra0a0_2_side_b"
        }
      ]
    },
    "hard_stars_d2_ra0a0_2_side_a": {
      "ending": true,
      "title": "The Patient Observatory",
      "scene": "wizard",
      "text": "You follow the route to an observatory that has been waiting for someone willing to look closely. Inside, you learn that some discoveries arrive only after patience."
    },
    "hard_stars_d2_ra0a0_2_side_b": {
      "ending": true,
      "title": "The Unfinished Chart",
      "scene": "map",
      "text": "The signal reveals a map with three missing sections. You resist the urge to invent them, record what is known, and leave the blank spaces for future explorers."
    },
    "hard_stars_d2_ra0b1_12_side": {
      "text": "The signal has no sound, yet its rhythm is unmistakable. You compare it with the patterns you have already seen and realise it is describing a route rather than a destination.",
      "choices": [
        {
          "text": "The Patient Observatory",
          "next": "hard_stars_d2_ra0b1_12_side_a"
        },
        {
          "text": "The Unfinished Chart",
          "next": "hard_stars_d2_ra0b1_12_side_b"
        }
      ]
    },
    "hard_stars_d2_ra0b1_12_side_a": {
      "ending": true,
      "title": "The Patient Observatory",
      "scene": "wizard",
      "text": "You follow the route to an observatory that has been waiting for someone willing to look closely. Inside, you learn that some discoveries arrive only after patience."
    },
    "hard_stars_d2_ra0b1_12_side_b": {
      "ending": true,
      "title": "The Unfinished Chart",
      "scene": "map",
      "text": "The signal reveals a map with three missing sections. You resist the urge to invent them, record what is known, and leave the blank spaces for future explorers."
    },
    "easy_castle_e1": {
      "ending": true,
      "title": "The Bell Ringer",
      "scene": "castle",
      "text": "You climb the tower stairs and ring the bell yourself. The whole castle rings with joy, and the bell's song echoes across the library pages. When you return home, the bell's music still rings in your heart."
    },
    "easy_castle_e2": {
      "ending": true,
      "title": "The Silent Door",
      "scene": "castle",
      "text": "Behind the silent door, you find a room full of the castle's secrets—old letters, forgotten portraits, and a thousand stories waiting to be told. You smile, close the door gently, and keep the secret safe forever."
    },
    "easy_castle_e3": {
      "ending": true,
      "title": "The Golden Key",
      "scene": "treasure",
      "text": "The golden key opens a box filled with the castle's oldest magic. You hold it carefully, knowing you've discovered something precious that only a true friend could find."
    },
    "easy_forest_choice_008": {
      "text": "You've helped the forest friend, and the moment feels special. But then the lantern glows brighter, revealing a path deeper into the woods. One more adventure waits in the whispering forest.",
      "choices": [
        {
          "text": "Accept your thanks and go home",
          "next": "easy_forest_e4"
        },
        {
          "text": "Follow the lantern deeper",
          "next": "easy_forest_choice_008_alt"
        }
      ]
    },
    "easy_forest_choice_008_alt": {
      "ending": true,
      "title": "The Deeper Wood: Beyond the Path",
      "scene": "forest",
      "text": "The lantern leads you to the very heart of the Whispering Woods, where ancient trees dance and silver light pools on the moss. The forest friends wave goodbye as you slip back into the library, forever changed."
    },
    "easy_forest_choice_009": {
      "text": "You've found the forest's secret friend, and the moment feels complete. But then the lantern glows brighter, revealing a path deeper into the woods. One more adventure waits in the whispering forest.",
      "choices": [
        {
          "text": "Leave in peaceful silence",
          "next": "easy_forest_e5"
        },
        {
          "text": "Follow the lantern deeper",
          "next": "easy_forest_choice_009_alt"
        }
      ]
    },
    "easy_forest_choice_009_alt": {
      "ending": true,
      "title": "The Secret Creature: Beyond the Path",
      "scene": "forest",
      "text": "The lantern leads you to a hidden glade where the forest's most magical creature lives in perfect peace. You see it clearly for just one moment before the magic fades, and you carry that memory forever."
    },
    "easy_forest_choice_010": {
      "text": "You've solved the forest mystery, and the moment feels like an ending. But then the lantern glows brighter, revealing a path deeper into the woods. One more adventure waits in the whispering forest.",
      "choices": [
        {
          "text": "Return home with your answer",
          "next": "easy_forest_e7"
        },
        {
          "text": "Follow the lantern deeper",
          "next": "easy_forest_choice_010_alt"
        }
      ]
    },
    "easy_forest_choice_010_alt": {
      "ending": true,
      "title": "The Mystery Deepens: Beyond the Path",
      "scene": "forest",
      "text": "The lantern leads you through layers of mystery, each one deeper and more wonderful than the last. When you finally return home, the forest's secrets shimmer in your memory like morning mist."
    },
    "easy_forest_choice_011": {
      "text": "The forest has taught you something precious, and the moment feels complete. But then the lantern glows brighter, revealing a path deeper into the woods. One more adventure waits in the whispering forest.",
      "choices": [
        {
          "text": "Keep the lesson and go home",
          "next": "easy_forest_e8"
        },
        {
          "text": "Follow the lantern deeper",
          "next": "easy_forest_choice_011_alt"
        }
      ]
    },
    "easy_forest_choice_011_alt": {
      "ending": true,
      "title": "The Deeper Lesson: Beyond the Path",
      "scene": "forest",
      "text": "The lantern leads you to places where the forest teaches directly through experience. You learn things that words could never capture. When you return home, wisdom glows quietly in your heart."
    },
    "easy_forest_choice_012": {
      "text": "You've heard the forest's wisdom, and the moment feels like an ending. But then the lantern glows brighter, revealing a path deeper into the woods. One more adventure waits in the whispering forest.",
      "choices": [
        {
          "text": "Accept the wisdom and return",
          "next": "easy_forest_e11"
        },
        {
          "text": "Follow the lantern deeper",
          "next": "easy_forest_choice_012_alt"
        }
      ]
    },
    "easy_forest_choice_012_alt": {
      "ending": true,
      "title": "The Heart of Wisdom: Beyond the Path",
      "scene": "forest",
      "text": "The lantern leads you to the very root of all forest wisdom, where time moves differently and answers bloom like flowers. You emerge changed, carrying understanding that will guide you always."
    },
    "easy_forest_choice_013": {
      "text": "You've made a forest friend, and the moment feels warm and complete. But then the lantern glows brighter, revealing a path deeper into the woods. One more adventure waits in the whispering forest.",
      "choices": [
        {
          "text": "Say goodbye and go home",
          "next": "easy_forest_e12"
        },
        {
          "text": "Follow the lantern deeper",
          "next": "easy_forest_choice_013_alt"
        }
      ]
    },
    "easy_forest_choice_013_alt": {
      "ending": true,
      "title": "The Friend's Garden: Beyond the Path",
      "scene": "forest",
      "text": "The lantern leads you to where your forest friend was born—a magical place filled with flowers that sing and trees that remember everything. The friendship deepens in ways you never expected."
    },
    "easy_forest_choice_014": {
      "text": "You've found something beautiful in the forest, and the moment feels complete. But then the lantern glows brighter, revealing a path deeper into the woods. One more adventure waits in the whispering forest.",
      "choices": [
        {
          "text": "Treasure what you found and go home",
          "next": "easy_forest_e14"
        },
        {
          "text": "Follow the lantern deeper",
          "next": "easy_forest_choice_014_alt"
        }
      ]
    },
    "easy_forest_choice_014_alt": {
      "ending": true,
      "title": "Beauty's Heart: Beyond the Path",
      "scene": "forest",
      "text": "The lantern leads you to the source of all forest beauty—a place where light and shadow dance in perfect harmony. The beauty you found was just a reflection of this deeper magic."
    },
    "easy_forest_e1": {
      "ending": true,
      "title": "The Wise Fox",
      "scene": "forest",
      "text": "The fox teaches you something the forest has been waiting to share. Its wisdom glows inside you like the lantern's light, and you carry it home forever."
    },
    "easy_forest_e2": {
      "ending": true,
      "title": "The Hidden Bridge",
      "scene": "forest",
      "text": "You cross the hidden bridge and discover that it connects all the forest's secret places. The bridge remembers you, and you will always find your way back to the forest."
    },
    "easy_forest_e3": {
      "ending": true,
      "title": "The Lost Creature",
      "scene": "forest",
      "text": "You find the lost creature, safe and happy in a clearing of silvery moss. Its gratitude is so pure that it becomes part of your heart forever."
    },
    "easy_sea_choice_008": {
      "text": "You've helped the sea creature, and the moment feels perfect. But then the dolphin whistle sounds again, calling from deeper waters. One more adventure waits beyond the horizon.",
      "choices": [
        {
          "text": "Return to the library shore",
          "next": "easy_sea_e4"
        },
        {
          "text": "Sail deeper into the mystery",
          "next": "easy_sea_choice_008_alt"
        }
      ]
    },
    "easy_sea_choice_008_alt": {
      "ending": true,
      "title": "The Sailor's Heart: Beyond the Horizon",
      "scene": "sea",
      "text": "You sail to places where the sea meets the sky and they become one. When you finally return to the library, the horizon glows within your heart forever."
    },
    "easy_sea_choice_009": {
      "text": "You've solved a sea mystery, and the moment feels complete. But then the dolphin whistle sounds again, calling from deeper waters. One more adventure waits beyond the horizon.",
      "choices": [
        {
          "text": "Return with your discovery",
          "next": "easy_sea_e5"
        },
        {
          "text": "Sail deeper into the mystery",
          "next": "easy_sea_choice_009_alt"
        }
      ]
    },
    "easy_sea_choice_009_alt": {
      "ending": true,
      "title": "The Deep Mystery: Beyond the Horizon",
      "scene": "sea",
      "text": "You sail into the deep, where light dances strangely and magic pools in the trenches. Each discovery is more wonderful than the last, and you return transformed."
    },
    "easy_sea_choice_010": {
      "text": "You've found a sea treasure, and the moment feels magical. But then the dolphin whistle sounds again, calling from deeper waters. One more adventure waits beyond the horizon.",
      "choices": [
        {
          "text": "Hold your treasure close and go home",
          "next": "easy_sea_e7"
        },
        {
          "text": "Sail deeper into the mystery",
          "next": "easy_sea_choice_010_alt"
        }
      ]
    },
    "easy_sea_choice_010_alt": {
      "ending": true,
      "title": "The True Treasure: Beyond the Horizon",
      "scene": "sea",
      "text": "You sail deeper and discover that the treasure you found was just a hint of the sea's true riches. The greatest treasure is the magic itself, and it's all around you."
    },
    "easy_sea_choice_011": {
      "text": "You've helped a sea friend, and the moment feels warm. But then the dolphin whistle sounds again, calling from deeper waters. One more adventure waits beyond the horizon.",
      "choices": [
        {
          "text": "Return and rest in the boat",
          "next": "easy_sea_e8"
        },
        {
          "text": "Sail deeper into the mystery",
          "next": "easy_sea_choice_011_alt"
        }
      ]
    },
    "easy_sea_choice_011_alt": {
      "ending": true,
      "title": "The Friend's Home: Beyond the Horizon",
      "scene": "sea",
      "text": "Your sea friend leads you to the most magical place in all the oceans—their home. You're welcomed as family, and when you finally sail home, you carry their warmth in your heart."
    },
    "easy_sea_choice_012": {
      "text": "You've seen the sea's beauty, and the moment feels complete. But then the dolphin whistle sounds again, calling from deeper waters. One more adventure waits beyond the horizon.",
      "choices": [
        {
          "text": "Return to shore peacefully",
          "next": "easy_sea_e11"
        },
        {
          "text": "Sail deeper into the mystery",
          "next": "easy_sea_choice_012_alt"
        }
      ]
    },
    "easy_sea_choice_012_alt": {
      "ending": true,
      "title": "Beauty Eternal: Beyond the Horizon",
      "scene": "sea",
      "text": "You sail to a place where the sea's beauty is so overwhelming it takes your breath away. The colors, the light, the life—all of it seems infinite. This vision stays with you forever."
    },
    "easy_sea_choice_013": {
      "text": "You've felt the sea's magic, and the moment feels right. But then the dolphin whistle sounds again, calling from deeper waters. One more adventure waits beyond the horizon.",
      "choices": [
        {
          "text": "Trust the sea and sail on",
          "next": "easy_sea_e12"
        },
        {
          "text": "Sail deeper into the mystery",
          "next": "easy_sea_choice_013_alt"
        }
      ]
    },
    "easy_sea_choice_013_alt": {
      "ending": true,
      "title": "The Sea's Heart: Beyond the Horizon",
      "scene": "sea",
      "text": "The sea shows you its deepest heart—where all its magic originates and where time flows differently. You emerge understanding that you are part of something far greater than yourself."
    },
    "easy_sea_choice_014": {
      "text": "You've learned something from the sea, and the moment feels complete. But then the dolphin whistle sounds again, calling from deeper waters. One more adventure waits beyond the horizon.",
      "choices": [
        {
          "text": "Learn the lesson and go home",
          "next": "easy_sea_e14"
        },
        {
          "text": "Sail deeper into the mystery",
          "next": "easy_sea_choice_014_alt"
        }
      ]
    },
    "easy_sea_choice_014_alt": {
      "ending": true,
      "title": "The Sea's Teaching: Beyond the Horizon",
      "scene": "sea",
      "text": "The sea teaches you layer after layer of wisdom, each lesson deeper and more profound. You return to the library infinitely richer for what you've learned, carrying the sea's song in your soul."
    },
    "easy_sea_e1": {
      "ending": true,
      "title": "The Dolphin's Gift",
      "scene": "sea",
      "text": "The dolphin gives you something precious—a song that only you can hear, that fills your heart with joy. You carry that song home with you forever."
    },
    "easy_sea_e2": {
      "ending": true,
      "title": "The Safe Harbor",
      "scene": "sea",
      "text": "You find a harbor where the waters are calm and welcoming, where everything is safe and perfect. This place becomes your refuge whenever you need it."
    },
    "easy_sea_e3": {
      "ending": true,
      "title": "The Hidden Lagoon",
      "scene": "sea",
      "text": "You discover a lagoon hidden from the rest of the world, where water is so clear you can see magic itself flowing. The lagoon shares its secret only with those pure of heart."
    },
    "easy_stars_choice_008": {
      "text": "You've reached the star you sought, and the moment feels magical. But then the ladder glows brighter, stretching upward into deeper sky. One more adventure awaits in the stars above.",
      "choices": [
        {
          "text": "Descend safely to the library",
          "next": "easy_stars_e4"
        },
        {
          "text": "Climb higher into the cosmic night",
          "next": "easy_stars_choice_008_alt"
        }
      ]
    },
    "easy_stars_choice_008_alt": {
      "ending": true,
      "title": "The Star's Peak: Higher Still",
      "scene": "star_ship",
      "text": "You climb higher still, reaching a place where stars are born and old stars dance with new ones. The view is so magnificent that your heart expands to hold it all."
    },
    "easy_stars_choice_009": {
      "text": "You've made a star friend, and the moment feels precious. But then the ladder glows brighter, stretching upward into deeper sky. One more adventure awaits in the stars above.",
      "choices": [
        {
          "text": "Wave and descend home",
          "next": "easy_stars_e5"
        },
        {
          "text": "Climb higher into the cosmic night",
          "next": "easy_stars_choice_009_alt"
        }
      ]
    },
    "easy_stars_choice_009_alt": {
      "ending": true,
      "title": "The Star's Kingdom: Higher Still",
      "scene": "castle",
      "text": "You climb with your star friend to their home in the highest reaches of the night sky. The star kingdom welcomes you as a guest of honor, and you experience wonders beyond imagination."
    },
    "easy_stars_choice_010": {
      "text": "You've heard the stars sing, and the moment feels complete. But then the ladder glows brighter, stretching upward into deeper sky. One more adventure awaits in the stars above.",
      "choices": [
        {
          "text": "Listen and descend home",
          "next": "easy_stars_e7"
        },
        {
          "text": "Climb higher into the cosmic night",
          "next": "easy_stars_choice_010_alt"
        }
      ]
    },
    "easy_stars_choice_010_alt": {
      "ending": true,
      "title": "The Cosmic Song: Higher Still",
      "scene": "phoenix",
      "text": "You climb higher to the very source of the stars' singing. The song is so beautiful and pure that it becomes part of your soul forever, and you understand the universe's secret joy."
    },
    "easy_stars_choice_011": {
      "text": "You've felt the stars' magic, and the moment feels right. But then the ladder glows brighter, stretching upward into deeper sky. One more adventure awaits in the stars above.",
      "choices": [
        {
          "text": "Trust the magic and descend",
          "next": "easy_stars_e8"
        },
        {
          "text": "Climb higher into the cosmic night",
          "next": "easy_stars_choice_011_alt"
        }
      ]
    },
    "easy_stars_choice_011_alt": {
      "ending": true,
      "title": "The Magic Source: Higher Still",
      "scene": "wizard",
      "text": "You climb to the very heart of starlight magic, where the first stars were born. There, you're given a gift of cosmic power that will shine within you always."
    },
    "easy_stars_choice_012": {
      "text": "You've discovered a star secret, and the moment feels magical. But then the ladder glows brighter, stretching upward into deeper sky. One more adventure awaits in the stars above.",
      "choices": [
        {
          "text": "Keep the secret and descend",
          "next": "easy_stars_e11"
        },
        {
          "text": "Climb higher into the cosmic night",
          "next": "easy_stars_choice_012_alt"
        }
      ]
    },
    "easy_stars_choice_012_alt": {
      "ending": true,
      "title": "The Deepest Secret: Higher Still",
      "scene": "treasure",
      "text": "You climb to discover that the star secret you found was only the beginning. The deeper you climb, the more layers of cosmic mystery unfold before you, each more beautiful than the last."
    },
    "easy_stars_choice_013": {
      "text": "You've seen the stars clearly, and the moment feels complete. But then the ladder glows brighter, stretching upward into deeper sky. One more adventure awaits in the stars above.",
      "choices": [
        {
          "text": "Descend with the stars' knowledge",
          "next": "easy_stars_e12"
        },
        {
          "text": "Climb higher into the cosmic night",
          "next": "easy_stars_choice_013_alt"
        }
      ]
    },
    "easy_stars_choice_013_alt": {
      "ending": true,
      "title": "The Star's Truth: Higher Still",
      "scene": "moon",
      "text": "You climb to where the true nature of stars is revealed—places where light thinks and stars dream. This understanding transforms your view of the entire cosmos forever."
    },
    "easy_stars_choice_014": {
      "text": "You've touched the stars' light, and the moment feels golden. But then the ladder glows brighter, stretching upward into deeper sky. One more adventure awaits in the stars above.",
      "choices": [
        {
          "text": "Return to the library radiant",
          "next": "easy_stars_e14"
        },
        {
          "text": "Climb higher into the cosmic night",
          "next": "easy_stars_choice_014_alt"
        }
      ]
    },
    "easy_stars_choice_014_alt": {
      "ending": true,
      "title": "The Light Eternal: Higher Still",
      "scene": "sun",
      "text": "You climb so high that you touch the very essence of light itself. The experience is transcendent—you become one with the starlight and understand that you always were."
    },
    "easy_stars_e1": {
      "ending": true,
      "title": "The Bright Star",
      "scene": "castle",
      "text": "The brightest star in all the sky comes to you, shining with all its joy and warmth. It stays with you always, glowing softly in your heart even when you're back in the library."
    },
    "easy_stars_e2": {
      "ending": true,
      "title": "The Star Guide",
      "scene": "star_ship",
      "text": "A wise star guides you safely home, showing you paths through the cosmic night that only guardians know. You are forever grateful for its wisdom and kindness."
    },
    "easy_stars_e3": {
      "ending": true,
      "title": "The Starlight Bridge",
      "scene": "moon",
      "text": "A bridge of pure starlight appears before you, connecting the library to the distant stars. You walk across it, knowing it will always be there when you wish to visit the sky."
    }
  }
};
