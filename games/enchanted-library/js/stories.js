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
      "blurb": "Richer sentences · more branches · ages ~7–9",
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
      "blurb": "Longer text · deeper choices · ages ~9–11",
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
    "easy": "You open a big magic book. Four glowing doors appear. Which door will you choose?",
    "medium": "The enchanted book opens across your lap. Four doorways shimmer between the pages, each leading to a different adventure.",
    "hard": "The leather cover warms beneath your hand. The book unfolds into a grand library of possibilities, where four luminous thresholds wait."
  },
  "nodes": {
    "easy_forest_e4": {
      "ending": true,
      "title": "The Lost Book",
      "scene": "library_return",
      "text": "You unlock the tree door and find a storybook that has been missing from the enchanted library. You carry it home, and the shelves glow as it slips into its place."
    },
    "easy_forest_e5": {
      "ending": true,
      "title": "Owl's New Nest",
      "scene": "forest_home",
      "text": "You follow the feathers and help the baby owl find its nest. At sunset, its family settles close together while the forest hums a happy song."
    },
    "easy_forest_d3_ra0a0a0_3": {
      "text": "The key opens a tree door. Inside, a lost storybook is waiting for its reader.",
      "choices": [
        {
          "text": "Open the little door",
          "next": "easy_forest_e4"
        },
        {
          "text": "Help the baby owl",
          "next": "easy_forest_e5"
        }
      ]
    },
    "easy_forest_e7": {
      "ending": true,
      "title": "Berry Picnic",
      "scene": "feast",
      "text": "A friendly fox shows you a hidden berry patch. You share the berries with the animals, then spread a little picnic blanket beneath the trees."
    },
    "easy_forest_e8": {
      "ending": true,
      "title": "The Singing Acorn",
      "scene": "treasure",
      "text": "The wooden key opens a tiny acorn-shaped box. Inside is a golden seed that sings when you hold it, so you plant it beside the trail."
    },
    "easy_forest_d3_ra0a0b1_6": {
      "text": "The feathers lead to a baby owl who cannot find its nest.",
      "choices": [
        {
          "text": "Open the little door",
          "next": "easy_forest_e7"
        },
        {
          "text": "Help the baby owl",
          "next": "easy_forest_e8"
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
        }
      ]
    },
    "easy_forest_e11": {
      "ending": true,
      "title": "Moonlit Shortcut",
      "scene": "moon",
      "text": "The squirrel leads you along a safe trail that glows under the moon. You wave goodbye as the little lantern guides you back to the book."
    },
    "easy_forest_e12": {
      "ending": true,
      "title": "Rainy Treehouse",
      "scene": "forest_home",
      "text": "Rain begins to fall, and you discover a dry treehouse filled with cushions and old picture books. You read until the rain stops."
    },
    "easy_forest_d3_ra0b1a0_10": {
      "text": "The key opens a tree door. Inside, a lost storybook is waiting for its reader.",
      "choices": [
        {
          "text": "Open the little door",
          "next": "easy_forest_e11"
        },
        {
          "text": "Help the baby owl",
          "next": "easy_forest_e12"
        }
      ]
    },
    "easy_forest_e14": {
      "ending": true,
      "title": "Forest Map",
      "scene": "map",
      "text": "The owl gives you a leaf-map showing every safe trail in the woods. You tuck it into the enchanted book so the next reader can explore too."
    },
    "easy_forest_d3_ra0b1b1_13": {
      "text": "The feathers lead to a baby owl who cannot find its nest.",
      "choices": [
        {
          "text": "Open the little door",
          "next": "easy_forest_e14"
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
      "text": "A tiny lantern hangs from a branch. It lights a trail between the trees. You hear a squirrel call. Follow it?",
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
      "scene": "feast",
      "text": "You return the recipe to the baker. The bell rings, and everyone gathers for warm rolls and apple slices. The cat gets the first tiny piece."
    },
    "easy_castle_e5": {
      "ending": true,
      "title": "The Tiny Crown",
      "scene": "crown",
      "text": "You rescue the little crown without climbing too high. The castle king thanks you for solving the problem safely and gives you a royal bow."
    },
    "easy_castle_d3_ra0a0a0_3": {
      "text": "You search the kitchen shelves and find the missing recipe tucked inside a flour tin.",
      "choices": [
        {
          "text": "Take the recipe",
          "next": "easy_castle_e4"
        },
        {
          "text": "Help the cat",
          "next": "easy_castle_e5"
        }
      ]
    },
    "easy_castle_e7": {
      "ending": true,
      "title": "Secret Garden",
      "scene": "garden",
      "text": "The cat leads you through a hidden door behind the kitchen. You find a sunny garden where herbs, flowers, and tiny blue flags grow together."
    },
    "easy_castle_e8": {
      "ending": true,
      "title": "The Recipe Book",
      "scene": "library_return",
      "text": "The missing recipe belongs to an old storybook. You return it to the enchanted library, where its pages smell wonderfully like cinnamon."
    },
    "easy_castle_d3_ra0a0b1_6": {
      "text": "You help the cat pull a soft cushion beneath the shelf so you can reach the little crown.",
      "choices": [
        {
          "text": "Take the recipe",
          "next": "easy_castle_e7"
        },
        {
          "text": "Help the cat",
          "next": "easy_castle_e8"
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
        }
      ]
    },
    "easy_castle_e11": {
      "ending": true,
      "title": "Tower Star",
      "scene": "star_ship",
      "text": "The glittering hall reveals a window shaped like a star. Through it you see a tiny starship sailing past the castle moon."
    },
    "easy_castle_e12": {
      "ending": true,
      "title": "Kind Knight",
      "scene": "castle",
      "text": "A young knight thanks you for helping the castle instead of rushing ahead. The two of you polish the little crown until it shines."
    },
    "easy_castle_d3_ra0b1a0_10": {
      "text": "You search the kitchen shelves and find the missing recipe tucked inside a flour tin.",
      "choices": [
        {
          "text": "Take the recipe",
          "next": "easy_castle_e11"
        },
        {
          "text": "Help the cat",
          "next": "easy_castle_e12"
        }
      ]
    },
    "easy_castle_e14": {
      "ending": true,
      "title": "Castle Treasure",
      "scene": "treasure",
      "text": "The baker gives you a small golden spoon as a thank-you. It is not a royal treasure, but it becomes your favorite souvenir from the castle."
    },
    "easy_castle_d3_ra0b1b1_13": {
      "text": "You help the cat pull a soft cushion beneath the shelf so you can reach the little crown.",
      "choices": [
        {
          "text": "Take the recipe",
          "next": "easy_castle_e14"
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
      "text": "A round castle tower rises from the page. A bell rings once, and a little blue flag points inside. You step through the gate.",
      "choices": [
        {
          "text": "Enter the castle",
          "next": "easy_castle_d1_ra0_1"
        }
      ]
    },
    "easy_sea_e4": {
      "ending": true,
      "title": "The Lighthouse Bell",
      "scene": "village",
      "text": "You find the missing bell beneath a pile of seaweed and return it to the lighthouse. Its bright ring tells every boat that the shore is safe."
    },
    "easy_sea_e5": {
      "ending": true,
      "title": "Pearl Gate",
      "scene": "treasure",
      "text": "The pearl opens a small underwater gate filled with smooth stones that sparkle like stars. You take one little stone as a memory of the sea."
    },
    "easy_sea_d3_ra0a0a0_3": {
      "text": "Inside the bottle is a picture of the lighthouse keeper's missing bell. You search the shore for it.",
      "choices": [
        {
          "text": "Find the lighthouse bell",
          "next": "easy_sea_e4"
        },
        {
          "text": "Explore the sea cave",
          "next": "easy_sea_e5"
        }
      ]
    },
    "easy_sea_e7": {
      "ending": true,
      "title": "Dolphin Ride",
      "scene": "ocean_boat",
      "text": "The dolphin leads you around the island before bringing you safely back to shore. You wave as it disappears beneath a shining wave."
    },
    "easy_sea_e8": {
      "ending": true,
      "title": "Shell Message",
      "scene": "map",
      "text": "The message in the bottle turns into a map of safe places along the coast. You place it in the enchanted book for another explorer."
    },
    "easy_sea_d3_ra0a0b1_6": {
      "text": "The crab drops the pearl into a rock pool. It opens a hidden gate beneath the water.",
      "choices": [
        {
          "text": "Find the lighthouse bell",
          "next": "easy_sea_e7"
        },
        {
          "text": "Explore the sea cave",
          "next": "easy_sea_e8"
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
        }
      ]
    },
    "easy_sea_e11": {
      "ending": true,
      "title": "Lighthouse Garden",
      "scene": "garden",
      "text": "Behind the lighthouse you discover a garden watered by sea mist. Tiny flowers open when you ring the bell."
    },
    "easy_sea_e12": {
      "ending": true,
      "title": "Crab's Treasure",
      "scene": "cave_light",
      "text": "The crab shows you a small sea cave where sunlight makes the walls glow. You thank your new guide and leave the pearl where it belongs."
    },
    "easy_sea_d3_ra0b1a0_10": {
      "text": "Inside the bottle is a picture of the lighthouse keeper's missing bell. You search the shore for it.",
      "choices": [
        {
          "text": "Find the lighthouse bell",
          "next": "easy_sea_e11"
        },
        {
          "text": "Explore the sea cave",
          "next": "easy_sea_e12"
        }
      ]
    },
    "easy_sea_e14": {
      "ending": true,
      "title": "Moon Tide",
      "scene": "moon",
      "text": "The tide rises beneath a silver moon. You and the dolphin watch the water sparkle before the magical book carries you home."
    },
    "easy_sea_d3_ra0b1b1_13": {
      "text": "The crab drops the pearl into a rock pool. It opens a hidden gate beneath the water.",
      "choices": [
        {
          "text": "Find the lighthouse bell",
          "next": "easy_sea_e14"
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
      "text": "Blue waves ripple out from the page. A little boat waits beside a shell path. You climb aboard and hear a dolphin whistle.",
      "choices": [
        {
          "text": "Climb into the boat",
          "next": "easy_sea_d1_ra0_1"
        }
      ]
    },
    "easy_stars_e4": {
      "ending": true,
      "title": "The Comet Garden",
      "scene": "garden",
      "text": "You return the missing seed to the glowing garden. Every flower opens at once, making the tiny planet look like a lantern."
    },
    "easy_stars_e5": {
      "ending": true,
      "title": "Star Pilot's Map",
      "scene": "star_ship",
      "text": "You find the map inside the whale-shaped cloud and return it to the pilot. The little starship gives a cheerful beep before sailing home."
    },
    "easy_stars_d3_ra0a0a0_3": {
      "text": "The comet leads you to the missing seed, hidden under a soft blue stone.",
      "choices": [
        {
          "text": "Find the star map",
          "next": "easy_stars_e4"
        },
        {
          "text": "Guide the ship",
          "next": "easy_stars_e5"
        }
      ]
    },
    "easy_stars_e7": {
      "ending": true,
      "title": "Moon Bridge",
      "scene": "moon",
      "text": "You cross the moon bridge with the friendly comet beside you. At the far end, a silver doorway opens back into the enchanted library."
    },
    "easy_stars_e8": {
      "ending": true,
      "title": "Pocket Constellation",
      "scene": "treasure",
      "text": "A tiny flower gives you one glowing petal. When you place it in the book, it becomes a new constellation drawn just for you."
    },
    "easy_stars_d3_ra0a0b1_6": {
      "text": "The star pilot shows you the last place the map was seen: a quiet cloud shaped like a whale.",
      "choices": [
        {
          "text": "Find the star map",
          "next": "easy_stars_e7"
        },
        {
          "text": "Guide the ship",
          "next": "easy_stars_e8"
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
        }
      ]
    },
    "easy_stars_e11": {
      "ending": true,
      "title": "Cloud Whale",
      "scene": "sun",
      "text": "The cloud whale carries you gently across the sky. When morning light reaches the page, it releases you beside the library ladder."
    },
    "easy_stars_e12": {
      "ending": true,
      "title": "Little Planet",
      "scene": "mountain",
      "text": "You help the garden grow, and the planet's hill fills with glowing flowers. From the top, you can see the whole starry storybook."
    },
    "easy_stars_d3_ra0b1a0_10": {
      "text": "The comet leads you to the missing seed, hidden under a soft blue stone.",
      "choices": [
        {
          "text": "Find the star map",
          "next": "easy_stars_e11"
        },
        {
          "text": "Guide the ship",
          "next": "easy_stars_e12"
        }
      ]
    },
    "easy_stars_e14": {
      "ending": true,
      "title": "Book of Stars",
      "scene": "library_return",
      "text": "The star pilot gives you a blank star map. Back in the library, it fills itself with every place you visited."
    },
    "easy_stars_d3_ra0b1b1_13": {
      "text": "The star pilot shows you the last place the map was seen: a quiet cloud shaped like a whale.",
      "choices": [
        {
          "text": "Find the star map",
          "next": "easy_stars_e14"
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
      "text": "A silver ladder rises from the library floor into a sky full of stars. One bright star blinks three times, as if it wants you to follow.",
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
          "next": "medium_forest_e4"
        },
        {
          "text": "Follow the fox",
          "next": "medium_forest_e5"
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
          "next": "medium_forest_e7"
        },
        {
          "text": "Find the missing page",
          "next": "medium_forest_e8"
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
          "next": "medium_forest_e11"
        },
        {
          "text": "Mark the safe trail",
          "next": "medium_forest_e12"
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
          "next": "medium_forest_e14"
        },
        {
          "text": "Explore the clearing",
          "next": "medium_forest_e15"
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
          "next": "medium_forest_e18"
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
      "text": "Moss cushions your steps as you enter the Whispering Woods. Ahead, a fox carries a red ribbon, while a woodpecker taps a warning beside an old stone bridge.",
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
          "next": "medium_castle_e4"
        },
        {
          "text": "Relight the fire",
          "next": "medium_castle_e5"
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
          "next": "medium_castle_e7"
        },
        {
          "text": "Meet the dragon",
          "next": "medium_castle_e8"
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
          "next": "medium_castle_e11"
        },
        {
          "text": "Open the garden",
          "next": "medium_castle_e12"
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
          "next": "medium_castle_e14"
        },
        {
          "text": "Ring the quiet bell",
          "next": "medium_castle_e15"
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
          "next": "medium_castle_e18"
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
      "text": "Torchlight flickers across the castle walls. Somewhere above you, a bell should be ringing, but the tower is silent. The castle cat waits beside two stairways.",
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
          "next": "medium_sea_e4"
        },
        {
          "text": "Read the journal",
          "next": "medium_sea_e5"
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
          "next": "medium_sea_e7"
        },
        {
          "text": "Build the harbor map",
          "next": "medium_sea_e8"
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
          "next": "medium_sea_e11"
        },
        {
          "text": "Cross the inlet",
          "next": "medium_sea_e12"
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
          "next": "medium_sea_e14"
        },
        {
          "text": "Enter the sea cave",
          "next": "medium_sea_e15"
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
          "next": "medium_sea_e18"
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
      "text": "The tide is rising around a little lighthouse island. A wooden boat waits at the dock, and a seal keeps circling one dark patch of water.",
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
          "next": "medium_stars_e4"
        },
        {
          "text": "Find the star key",
          "next": "medium_stars_e5"
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
          "next": "medium_stars_e7"
        },
        {
          "text": "Grow the comet garden",
          "next": "medium_stars_e8"
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
          "next": "medium_stars_e11"
        },
        {
          "text": "Visit the moon castle",
          "next": "medium_stars_e12"
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
          "next": "medium_stars_e14"
        },
        {
          "text": "Listen to the star choir",
          "next": "medium_stars_e15"
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
          "next": "medium_stars_e18"
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
      "text": "The starway opens above the library like a silver road. A constellation has gone dark, and a small starship waits nearby with its engine humming.",
      "choices": [
        {
          "text": "Follow the starship",
          "next": "medium_stars_d1_ra0_1"
        },
        {
          "text": "Cross the moon bridge",
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
          "next": "hard_forest_e4"
        },
        {
          "text": "Record the trail",
          "next": "hard_forest_e5"
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
          "next": "hard_forest_e7"
        },
        {
          "text": "Test the crossing",
          "next": "hard_forest_e8"
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
          "next": "hard_forest_e10"
        },
        {
          "text": "Leave it untouched",
          "next": "hard_forest_e11"
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
          "next": "hard_forest_e14"
        },
        {
          "text": "Map the safe crossing",
          "next": "hard_forest_e15"
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
          "next": "hard_forest_e17"
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
      "text": "The Whispering Woods are unusually still. A trail of silver leaves leads beneath ancient oaks, where a fox waits beside a stone marked with a half-erased compass.",
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
          "next": "hard_castle_e4"
        },
        {
          "text": "Open the castle gates",
          "next": "hard_castle_e5"
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
          "next": "hard_castle_e7"
        },
        {
          "text": "Help the evening feast",
          "next": "hard_castle_e8"
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
          "next": "hard_castle_e10"
        },
        {
          "text": "Repair the archive",
          "next": "hard_castle_e11"
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
          "next": "hard_castle_e14"
        },
        {
          "text": "Return the key",
          "next": "hard_castle_e15"
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
          "next": "hard_castle_e17"
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
      "text": "The castle's clock has stopped at the same moment on every tower. Servants whisper that the keep is waiting for a missing page from its founding story, and the castle cat carries a ribbon toward the archives.",
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
          "next": "hard_sea_e4"
        },
        {
          "text": "Complete the chart",
          "next": "hard_sea_e5"
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
          "next": "hard_sea_e7"
        },
        {
          "text": "Secure the marker",
          "next": "hard_sea_e8"
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
          "next": "hard_sea_e10"
        },
        {
          "text": "Choose the safer route",
          "next": "hard_sea_e11"
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
          "next": "hard_sea_e14"
        },
        {
          "text": "Recover the markers",
          "next": "hard_sea_e15"
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
          "next": "hard_sea_e17"
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
      "text": "A storm is building beyond the lighthouse, but the harbor itself remains strangely calm. An old chart has washed ashore, marked with a route that disappears beneath the tide.",
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
          "next": "hard_stars_e4"
        },
        {
          "text": "Repair the astrolabe",
          "next": "hard_stars_e5"
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
          "next": "hard_stars_e7"
        },
        {
          "text": "Tell the star-flowers a story",
          "next": "hard_stars_e8"
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
          "next": "hard_stars_e10"
        },
        {
          "text": "Explore the new path",
          "next": "hard_stars_e11"
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
          "next": "hard_stars_e14"
        },
        {
          "text": "Study the star archive",
          "next": "hard_stars_e15"
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
          "next": "hard_stars_e17"
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
      "text": "Beyond the library's highest window, the stars have formed an unfamiliar pattern. A starship waits beside a moon bridge, its navigator convinced that one constellation has been deliberately hidden.",
      "choices": [
        {
          "text": "Study the unfamiliar constellation",
          "next": "hard_stars_d1_ra0_1"
        }
      ]
    }
  }
};
