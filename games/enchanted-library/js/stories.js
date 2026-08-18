window.ENCHANTED_STORIES = {
  "title": "The Enchanted Library",
  "subtitle": "A choose-your-own-adventure book",
  "levels": {
    "easy": {
      "id": "easy",
      "label": "Picture Path",
      "blurb": "Short sentences · clear choices · ages ~5–7",
      "worlds": [
        {
          "id": "forest",
          "title": "Forest Path",
          "start": "easy_forest_root",
          "endings": 8
        },
        {
          "id": "castle",
          "title": "Castle Door",
          "start": "easy_castle_root",
          "endings": 8
        },
        {
          "id": "sea",
          "title": "Sea Shell",
          "start": "easy_sea_root",
          "endings": 8
        },
        {
          "id": "stars",
          "title": "Star Ladder",
          "start": "easy_stars_root",
          "endings": 8
        }
      ]
    },
    "medium": {
      "id": "medium",
      "label": "Story Path",
      "blurb": "Richer sentences · branching paths · ages ~7–9",
      "worlds": [
        {
          "id": "forest",
          "title": "Forest Path",
          "start": "medium_forest_root",
          "endings": 8
        },
        {
          "id": "castle",
          "title": "Castle Door",
          "start": "medium_castle_root",
          "endings": 8
        },
        {
          "id": "sea",
          "title": "Sea Shell",
          "start": "medium_sea_root",
          "endings": 8
        },
        {
          "id": "stars",
          "title": "Star Ladder",
          "start": "medium_stars_root",
          "endings": 8
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
          "endings": 16
        },
        {
          "id": "castle",
          "title": "Castle Door",
          "start": "hard_castle_root",
          "endings": 16
        },
        {
          "id": "sea",
          "title": "Sea Shell",
          "start": "hard_sea_root",
          "endings": 16
        },
        {
          "id": "stars",
          "title": "Star Ladder",
          "start": "hard_stars_root",
          "endings": 16
        }
      ]
    }
  },
  "nodes": {
    "easy_forest_root": {
      "text": "You open a book and step into a green forest. Soft light falls through the leaves. A path goes left. A bridge goes right.",
      "choices": [
        {
          "text": "Take the path",
          "next": "easy_forest_path"
        },
        {
          "text": "Cross the bridge",
          "next": "easy_forest_bridge"
        }
      ]
    },
    "easy_forest_path": {
      "text": "The path leads to a friendly fox. The fox holds a small golden key.",
      "choices": [
        {
          "text": "Talk to the fox",
          "next": "easy_forest_fox"
        },
        {
          "text": "Look for the keyhole",
          "next": "easy_forest_keyhole"
        }
      ]
    },
    "easy_forest_bridge": {
      "text": "The bridge creaks. Below you see a sparkling stream and a shiny pebble.",
      "choices": [
        {
          "text": "Pick up the pebble",
          "next": "easy_forest_pebble"
        },
        {
          "text": "Finish crossing",
          "next": "easy_forest_other_side"
        }
      ]
    },
    "easy_forest_fox": {
      "text": "The fox says, “This key opens the story tree. Will you help me find it?”",
      "choices": [
        {
          "text": "Help the fox",
          "next": "easy_forest_e_help"
        },
        {
          "text": "Keep the key yourself",
          "next": "easy_forest_e_key"
        }
      ]
    },
    "easy_forest_keyhole": {
      "text": "You find a tiny door in an old oak. The keyhole is just the right size.",
      "choices": [
        {
          "text": "Open the door",
          "next": "easy_forest_e_door"
        },
        {
          "text": "Knock first",
          "next": "easy_forest_e_knock"
        }
      ]
    },
    "easy_forest_pebble": {
      "text": "The pebble glows warm in your hand. A fish pops up and smiles.",
      "choices": [
        {
          "text": "Show the pebble to the fish",
          "next": "easy_forest_e_fish"
        },
        {
          "text": "Put the pebble in your pocket",
          "next": "easy_forest_e_pocket"
        }
      ]
    },
    "easy_forest_other_side": {
      "text": "On the other side you meet a baby owl who has lost its way home.",
      "choices": [
        {
          "text": "Help the owl",
          "next": "easy_forest_e_owl"
        },
        {
          "text": "Wave and walk on",
          "next": "easy_forest_e_wave"
        }
      ]
    },
    "easy_forest_e_help": {
      "ending": true,
      "title": "Forest Friends",
      "scene": "forest_home",
      "text": "You and the fox find the story tree together. The forest fills with soft light. You have made a true friend."
    },
    "easy_forest_e_key": {
      "ending": true,
      "title": "Keeper of the Key",
      "scene": "treasure",
      "text": "You keep the golden key. One day it will open a door only you can find. The forest whispers your name."
    },
    "easy_forest_e_door": {
      "ending": true,
      "title": "Inside the Oak",
      "scene": "cave_light",
      "text": "Inside the oak is a room full of picture books. You read until the stars come out. The forest keeps you safe."
    },
    "easy_forest_e_knock": {
      "ending": true,
      "title": "The Tree’s Welcome",
      "scene": "forest_home",
      "text": "A kind voice invites you in. The tree gives you a leaf that never fades. You feel brave and calm."
    },
    "easy_forest_e_fish": {
      "ending": true,
      "title": "Stream Secret",
      "scene": "ocean_boat",
      "text": "The fish leads you to a hidden pool of starlight. You make a wish. The forest remembers it."
    },
    "easy_forest_e_pocket": {
      "ending": true,
      "title": "Lucky Pebble",
      "scene": "treasure",
      "text": "Your glowing pebble lights the way home. You leave the forest with a pocket full of luck."
    },
    "easy_forest_e_owl": {
      "ending": true,
      "title": "Owl Guide",
      "scene": "moon",
      "text": "You help the baby owl find its nest. The mother owl gives you a feather. It shines in the dark."
    },
    "easy_forest_e_wave": {
      "ending": true,
      "title": "Quiet Path",
      "scene": "forest_home",
      "text": "You walk on through the quiet trees. The forest is peaceful. You close the book feeling rested."
    },
    "easy_castle_root": {
      "text": "You push open a heavy castle door. Torches glow along the hall. Stairs go up. A garden door is open to the side.",
      "choices": [
        {
          "text": "Climb the stairs",
          "next": "easy_castle_stairs"
        },
        {
          "text": "Go to the garden",
          "next": "easy_castle_garden"
        }
      ]
    },
    "easy_castle_stairs": {
      "text": "At the top you find a crown on a cushion and a friendly dragon the size of a cat.",
      "choices": [
        {
          "text": "Say hello to the dragon",
          "next": "easy_castle_dragon"
        },
        {
          "text": "Look at the crown",
          "next": "easy_castle_crown"
        }
      ]
    },
    "easy_castle_garden": {
      "text": "Roses climb the walls. A small knight is watering the flowers.",
      "choices": [
        {
          "text": "Help water the roses",
          "next": "easy_castle_roses"
        },
        {
          "text": "Ask about the castle",
          "next": "easy_castle_ask"
        }
      ]
    },
    "easy_castle_dragon": {
      "text": "The dragon purrs. “I guard kindness, not gold,” it says.",
      "choices": [
        {
          "text": "Offer a snack from your bag",
          "next": "easy_castle_e_snack"
        },
        {
          "text": "Ask to be friends",
          "next": "easy_castle_e_friend"
        }
      ]
    },
    "easy_castle_crown": {
      "text": "The crown is made of paper stars. A note says: For the bravest helper.",
      "choices": [
        {
          "text": "Try on the crown",
          "next": "easy_castle_e_crown"
        },
        {
          "text": "Leave it for someone else",
          "next": "easy_castle_e_leave"
        }
      ]
    },
    "easy_castle_roses": {
      "text": "You water the roses. They bloom in every colour. The knight cheers.",
      "choices": [
        {
          "text": "Pick one rose to keep",
          "next": "easy_castle_e_rose"
        },
        {
          "text": "Plant a new seed",
          "next": "easy_castle_e_seed"
        }
      ]
    },
    "easy_castle_ask": {
      "text": "The knight says the castle belongs to anyone who is kind.",
      "choices": [
        {
          "text": "Promise to be kind",
          "next": "easy_castle_e_kind"
        },
        {
          "text": "Explore one more room",
          "next": "easy_castle_e_room"
        }
      ]
    },
    "easy_castle_e_snack": {
      "ending": true,
      "title": "Dragon Guest",
      "scene": "dragon_friend",
      "text": "The little dragon shares a biscuit with you. You are welcome in the castle whenever you return."
    },
    "easy_castle_e_friend": {
      "ending": true,
      "title": "Dragon Friend",
      "scene": "dragon_friend",
      "text": "You and the dragon become friends. It flies you once around the tower before you say goodbye."
    },
    "easy_castle_e_crown": {
      "ending": true,
      "title": "Star Crown",
      "scene": "crown",
      "text": "The paper crown fits perfectly. You feel proud—not of gold, but of trying your best."
    },
    "easy_castle_e_leave": {
      "ending": true,
      "title": "Thoughtful Heart",
      "scene": "castle",
      "text": "You leave the crown for another child. The castle glows a little warmer. Kindness is its own reward."
    },
    "easy_castle_e_rose": {
      "ending": true,
      "title": "Garden Gift",
      "scene": "garden",
      "text": "Your rose smells like summer. You press it in the book so you can keep the memory."
    },
    "easy_castle_e_seed": {
      "ending": true,
      "title": "New Bloom",
      "scene": "garden",
      "text": "Your seed grows into a tiny tree. The knight names it after you. The garden will remember."
    },
    "easy_castle_e_kind": {
      "ending": true,
      "title": "Castle Promise",
      "scene": "castle",
      "text": "Your promise echoes in the hall. The castle doors will always open for a kind heart."
    },
    "easy_castle_e_room": {
      "ending": true,
      "title": "Secret Window",
      "scene": "castle",
      "text": "You find a window that shows your own classroom. You smile, close the book, and feel ready for the day."
    },
    "easy_sea_root": {
      "text": "You hear waves. You stand on warm sand. A boat rocks nearby. Shells shine at the water’s edge.",
      "choices": [
        {
          "text": "Climb into the boat",
          "next": "easy_sea_boat"
        },
        {
          "text": "Collect shells",
          "next": "easy_sea_shells"
        }
      ]
    },
    "easy_sea_boat": {
      "text": "The boat drifts to a small island. A lighthouse blinks a friendly light.",
      "choices": [
        {
          "text": "Visit the lighthouse",
          "next": "easy_sea_light"
        },
        {
          "text": "Search the beach",
          "next": "easy_sea_beach"
        }
      ]
    },
    "easy_sea_shells": {
      "text": "You find a shell that whispers when you hold it to your ear.",
      "choices": [
        {
          "text": "Listen carefully",
          "next": "easy_sea_listen"
        },
        {
          "text": "Give the shell to the waves",
          "next": "easy_sea_give"
        }
      ]
    },
    "easy_sea_light": {
      "text": "The lighthouse keeper is a cheerful seal with a yellow scarf.",
      "choices": [
        {
          "text": "Help polish the lamp",
          "next": "easy_sea_e_lamp"
        },
        {
          "text": "Share a story",
          "next": "easy_sea_e_story"
        }
      ]
    },
    "easy_sea_beach": {
      "text": "You find a bottle with a map drawn in crayon.",
      "choices": [
        {
          "text": "Follow the map",
          "next": "easy_sea_e_map"
        },
        {
          "text": "Draw your own map",
          "next": "easy_sea_e_draw"
        }
      ]
    },
    "easy_sea_listen": {
      "text": "The shell says, “Be brave. The sea loves curious children.”",
      "choices": [
        {
          "text": "Thank the shell",
          "next": "easy_sea_e_thank"
        },
        {
          "text": "Ask one more question",
          "next": "easy_sea_e_ask"
        }
      ]
    },
    "easy_sea_give": {
      "text": "You return the shell. The water sparkles as if saying thank you.",
      "choices": [
        {
          "text": "Paddle at the shore",
          "next": "easy_sea_e_paddle"
        },
        {
          "text": "Watch the sunset",
          "next": "easy_sea_e_sunset"
        }
      ]
    },
    "easy_sea_e_lamp": {
      "ending": true,
      "title": "Bright Keeper",
      "scene": "ocean_boat",
      "text": "The lamp shines farther than ever. Ships far away see your light. You helped the whole sea."
    },
    "easy_sea_e_story": {
      "ending": true,
      "title": "Seal’s Tale",
      "scene": "ocean_boat",
      "text": "The seal tells a silly story about dancing crabs. You laugh until your sides hurt."
    },
    "easy_sea_e_map": {
      "ending": true,
      "title": "Island Treasure",
      "scene": "treasure",
      "text": "The map leads to a chest of smooth sea glass. You take one piece and leave the rest for others."
    },
    "easy_sea_e_draw": {
      "ending": true,
      "title": "Cartographer",
      "scene": "map",
      "text": "Your crayon map becomes part of the book. Future readers will follow your lines."
    },
    "easy_sea_e_thank": {
      "ending": true,
      "title": "Shell Blessing",
      "scene": "ocean_boat",
      "text": "The shell grows quiet and warm. You keep it as a reminder to be brave."
    },
    "easy_sea_e_ask": {
      "ending": true,
      "title": "Sea Answer",
      "scene": "ocean_boat",
      "text": "The shell answers, “Home is wherever you are kind.” You understand."
    },
    "easy_sea_e_paddle": {
      "ending": true,
      "title": "Tide Play",
      "scene": "ocean_boat",
      "text": "Cool water tickles your toes. You play until the tide says it is time to go."
    },
    "easy_sea_e_sunset": {
      "ending": true,
      "title": "Golden Sky",
      "scene": "sun",
      "text": "The sky turns gold and pink. You close the book with the sound of waves still in your ears."
    },
    "easy_stars_root": {
      "text": "A ladder of starlight climbs into the night sky. Planets float like lanterns.",
      "choices": [
        {
          "text": "Climb the ladder",
          "next": "easy_stars_climb"
        },
        {
          "text": "Ride a small comet",
          "next": "easy_stars_comet"
        }
      ]
    },
    "easy_stars_climb": {
      "text": "At the top sits a moon rabbit with a teacup.",
      "choices": [
        {
          "text": "Share tea",
          "next": "easy_stars_tea"
        },
        {
          "text": "Ask about the stars",
          "next": "easy_stars_ask"
        }
      ]
    },
    "easy_stars_comet": {
      "text": "The comet zooms past colourful clouds. You feel weightless and free.",
      "choices": [
        {
          "text": "Hold on tight",
          "next": "easy_stars_hold"
        },
        {
          "text": "Wave at a planet",
          "next": "easy_stars_wave"
        }
      ]
    },
    "easy_stars_tea": {
      "text": "The tea tastes like peppermint and night air.",
      "choices": [
        {
          "text": "Stay for a story",
          "next": "easy_stars_e_story"
        },
        {
          "text": "Thank the rabbit and climb down",
          "next": "easy_stars_e_down"
        }
      ]
    },
    "easy_stars_ask": {
      "text": "The rabbit says each star is a wish someone kept.",
      "choices": [
        {
          "text": "Make a quiet wish",
          "next": "easy_stars_e_wish"
        },
        {
          "text": "Promise to be a good friend",
          "next": "easy_stars_e_promise"
        }
      ]
    },
    "easy_stars_hold": {
      "text": "The comet slows beside a soft cloud bed.",
      "choices": [
        {
          "text": "Rest on the cloud",
          "next": "easy_stars_e_rest"
        },
        {
          "text": "Ask the comet to go home",
          "next": "easy_stars_e_home"
        }
      ]
    },
    "easy_stars_wave": {
      "text": "A planet waves back with a swirl of clouds.",
      "choices": [
        {
          "text": "Visit the planet",
          "next": "easy_stars_e_visit"
        },
        {
          "text": "Keep flying",
          "next": "easy_stars_e_fly"
        }
      ]
    },
    "easy_stars_e_story": {
      "ending": true,
      "title": "Moon Tale",
      "scene": "moon",
      "text": "The rabbit’s story is about a child just like you. You feel seen among the stars."
    },
    "easy_stars_e_down": {
      "ending": true,
      "title": "Safe Return",
      "scene": "star_ship",
      "text": "You climb down carefully. The ladder fades, but the memory of tea stays warm."
    },
    "easy_stars_e_wish": {
      "ending": true,
      "title": "Star Wish",
      "scene": "stars",
      "text": "Your wish glows and settles into the sky. Somewhere, it begins to come true slowly."
    },
    "easy_stars_e_promise": {
      "ending": true,
      "title": "Promise Light",
      "scene": "stars",
      "text": "Your promise shines. The stars seem closer, as if they heard you."
    },
    "easy_stars_e_rest": {
      "ending": true,
      "title": "Cloud Nap",
      "scene": "moon",
      "text": "You rest on the cloud and dream of kindness. You wake ready for a new adventure."
    },
    "easy_stars_e_home": {
      "ending": true,
      "title": "Comet Ride Home",
      "scene": "star_ship",
      "text": "The comet carries you gently back to the library. What a ride!"
    },
    "easy_stars_e_visit": {
      "ending": true,
      "title": "Planet Hello",
      "scene": "star_ship",
      "text": "The planet’s people greet you with music. You dance once, then wave goodbye."
    },
    "easy_stars_e_fly": {
      "ending": true,
      "title": "Sky Path",
      "scene": "stars",
      "text": "You fly until the first morning light. The stars whisper, “Come back soon.”"
    },
    "medium_forest_root": {
      "text": "Mist curls between the trunks. You hear distant singing and the creak of something wooden deeper in the woods.",
      "choices": [
        {
          "text": "Follow the singing",
          "next": "medium_forest_a"
        },
        {
          "text": "Follow the wooden creak",
          "next": "medium_forest_b"
        }
      ]
    },
    "medium_forest_a": {
      "text": "The song leads you to a circle of mushrooms where fireflies spell words in the air.",
      "choices": [
        {
          "text": "Read the firefly words",
          "next": "medium_forest_a1"
        },
        {
          "text": "Step into the mushroom circle",
          "next": "medium_forest_a2"
        }
      ]
    },
    "medium_forest_b": {
      "text": "You find a wagon stuck in mud. A tired storyteller sits on the step.",
      "choices": [
        {
          "text": "Help push the wagon",
          "next": "medium_forest_b1"
        },
        {
          "text": "Ask for a tale",
          "next": "medium_forest_b2"
        }
      ]
    },
    "medium_forest_a1": {
      "text": "The words say: “Courage is sharing your light.” A path of glow opens ahead.",
      "choices": [
        {
          "text": "Walk the glow path",
          "next": "medium_forest_e_a1x"
        },
        {
          "text": "Copy the words into your notebook",
          "next": "medium_forest_e_a1y"
        }
      ]
    },
    "medium_forest_a2": {
      "text": "The forest tilts gently. You stand in a clearing where lost toys wait to be found.",
      "choices": [
        {
          "text": "Return a lost toy to the shelf",
          "next": "medium_forest_e_a2x"
        },
        {
          "text": "Sit and play for a while",
          "next": "medium_forest_e_a2y"
        }
      ]
    },
    "medium_forest_b1": {
      "text": "Together you free the wagon. The storyteller’s eyes brighten.",
      "choices": [
        {
          "text": "Ride along for a chapter",
          "next": "medium_forest_e_b1x"
        },
        {
          "text": "Wave them safely on",
          "next": "medium_forest_e_b1y"
        }
      ]
    },
    "medium_forest_b2": {
      "text": "The storyteller begins a story about a child who listened to trees.",
      "choices": [
        {
          "text": "Listen to the ending",
          "next": "medium_forest_e_b2x"
        },
        {
          "text": "Tell a tale of your own",
          "next": "medium_forest_e_b2y"
        }
      ]
    },
    "medium_forest_e_a1x": {
      "ending": true,
      "title": "Path of Light",
      "scene": "forest_home",
      "text": "The glow path ends at a quiet grove. You leave a little of your own courage shining there for the next reader."
    },
    "medium_forest_e_a1y": {
      "ending": true,
      "title": "Words Kept",
      "scene": "map",
      "text": "You write the firefly message carefully. When you reread it later, you feel braver already."
    },
    "medium_forest_e_a2x": {
      "ending": true,
      "title": "Toy’s Home",
      "scene": "village",
      "text": "A stuffed rabbit sighs with relief. The clearing thanks you with a soft rain of petals."
    },
    "medium_forest_e_a2y": {
      "ending": true,
      "title": "Play Clearing",
      "scene": "garden",
      "text": "You play until the toys clap their soft hands. Joy is a kind of magic too."
    },
    "medium_forest_e_b1x": {
      "ending": true,
      "title": "Wagon Chapter",
      "scene": "map",
      "text": "You travel a short way with the storyteller. Your names become part of each other’s stories."
    },
    "medium_forest_e_b1y": {
      "ending": true,
      "title": "Road Kindness",
      "scene": "bridge",
      "text": "The wagon rolls free. The storyteller leaves you a bookmark that always finds your page."
    },
    "medium_forest_e_b2x": {
      "ending": true,
      "title": "Tree Listener",
      "scene": "forest_home",
      "text": "In the tale, the child who listened grew wise. You decide to listen more in your own life."
    },
    "medium_forest_e_b2y": {
      "ending": true,
      "title": "Young Storyteller",
      "scene": "forest_home",
      "text": "Your story makes the storyteller laugh and cry. You discover you have a voice worth sharing."
    },
    "medium_castle_root": {
      "text": "Banners stir in a draft. The castle feels half-asleep, waiting for someone curious enough to wake its kinder rooms.",
      "choices": [
        {
          "text": "Enter the library wing",
          "next": "medium_castle_a"
        },
        {
          "text": "Follow the smell of baking",
          "next": "medium_castle_b"
        }
      ]
    },
    "medium_castle_a": {
      "text": "Shelves lean together like old friends. A ladder on wheels rolls toward you as if it knows your height.",
      "choices": [
        {
          "text": "Climb the ladder",
          "next": "medium_castle_a1"
        },
        {
          "text": "Read at a low table",
          "next": "medium_castle_a2"
        }
      ]
    },
    "medium_castle_b": {
      "text": "You find a warm kitchen. A cook shaped like a teapot hums while stirring soup.",
      "choices": [
        {
          "text": "Offer to help cook",
          "next": "medium_castle_b1"
        },
        {
          "text": "Ask who the soup is for",
          "next": "medium_castle_b2"
        }
      ]
    },
    "medium_castle_a1": {
      "text": "High up you find a book locked with a riddle: “What grows when you give it away?”",
      "choices": [
        {
          "text": "Answer “kindness”",
          "next": "medium_castle_e_a1x"
        },
        {
          "text": "Answer “a smile”",
          "next": "medium_castle_e_a1y"
        }
      ]
    },
    "medium_castle_a2": {
      "text": "A picture book shows this very castle—and a blank space where a hero’s face should be.",
      "choices": [
        {
          "text": "Draw your own face in the blank",
          "next": "medium_castle_e_a2x"
        },
        {
          "text": "Leave the blank for someone else",
          "next": "medium_castle_e_a2y"
        }
      ]
    },
    "medium_castle_b1": {
      "text": "You chop polite carrots that say “thank you” in tiny voices.",
      "choices": [
        {
          "text": "Taste the soup",
          "next": "medium_castle_e_b1x"
        },
        {
          "text": "Serve a bowl to a guest",
          "next": "medium_castle_e_b1y"
        }
      ]
    },
    "medium_castle_b2": {
      "text": "“For anyone who arrives hungry—in body or heart,” says the teapot cook.",
      "choices": [
        {
          "text": "Sit and rest with a bowl",
          "next": "medium_castle_e_b2x"
        },
        {
          "text": "Invite the cook to tell castle secrets",
          "next": "medium_castle_e_b2y"
        }
      ]
    },
    "medium_castle_e_a1x": {
      "ending": true,
      "title": "Riddle Book",
      "scene": "treasure",
      "text": "The lock opens. Inside is a story that changes slightly for every kind reader. Today it is yours."
    },
    "medium_castle_e_a1y": {
      "ending": true,
      "title": "Smile Key",
      "scene": "castle",
      "text": "The book opens to a page of jokes. You leave the wing lighter than you entered."
    },
    "medium_castle_e_a2x": {
      "ending": true,
      "title": "Hero’s Page",
      "scene": "crown",
      "text": "The book accepts your drawing. In this castle, heroes look like children who try."
    },
    "medium_castle_e_a2y": {
      "ending": true,
      "title": "Open Page",
      "scene": "castle",
      "text": "You close the book gently. Somewhere, another child will see themselves here too."
    },
    "medium_castle_e_b1x": {
      "ending": true,
      "title": "Kitchen Magic",
      "scene": "feast",
      "text": "The soup tastes like rainy-day comfort. Strength returns to your bones and your mood."
    },
    "medium_castle_e_b1y": {
      "ending": true,
      "title": "Shared Table",
      "scene": "feast",
      "text": "A shy mouse knight accepts the bowl. Sharing the meal doubles its warmth."
    },
    "medium_castle_e_b2x": {
      "ending": true,
      "title": "Heart Supper",
      "scene": "feast",
      "text": "You eat slowly. The castle’s silence becomes companionable rather than lonely."
    },
    "medium_castle_e_b2y": {
      "ending": true,
      "title": "Kitchen Lore",
      "scene": "castle",
      "text": "You learn the castle was built from promises kept. You add a small promise of your own to its walls."
    },
    "medium_sea_root": {
      "text": "Wind tastes of salt. Gulls argue overhead. Something bright flashes once beneath the green water.",
      "choices": [
        {
          "text": "Wade toward the flash",
          "next": "medium_sea_a"
        },
        {
          "text": "Explore a tide pool",
          "next": "medium_sea_b"
        }
      ]
    },
    "medium_sea_a": {
      "text": "A sea turtle rises with a compass on its shell. The needle spins, then points to your heart.",
      "choices": [
        {
          "text": "Ask the turtle for guidance",
          "next": "medium_sea_a1"
        },
        {
          "text": "Dive for a closer look",
          "next": "medium_sea_a2"
        }
      ]
    },
    "medium_sea_b": {
      "text": "Tiny crabs arrange pebbles into letters. They are trying to spell a message.",
      "choices": [
        {
          "text": "Help finish the word",
          "next": "medium_sea_b1"
        },
        {
          "text": "Offer the crabs a new pebble",
          "next": "medium_sea_b2"
        }
      ]
    },
    "medium_sea_a1": {
      "text": "“Direction is choosing what matters,” the turtle says slowly.",
      "choices": [
        {
          "text": "Choose “home” as what matters",
          "next": "medium_sea_e_a1x"
        },
        {
          "text": "Choose “friends” as what matters",
          "next": "medium_sea_e_a1y"
        }
      ]
    },
    "medium_sea_a2": {
      "text": "Underwater, a garden of coral forms a maze with two clear openings.",
      "choices": [
        {
          "text": "Take the left opening",
          "next": "medium_sea_e_a2x"
        },
        {
          "text": "Take the right opening",
          "next": "medium_sea_e_a2y"
        }
      ]
    },
    "medium_sea_b1": {
      "text": "Together you spell HELP—then the crabs rearrange it to HELLO.",
      "choices": [
        {
          "text": "Laugh with the crabs",
          "next": "medium_sea_e_b1x"
        },
        {
          "text": "Wave goodbye politely",
          "next": "medium_sea_e_b1y"
        }
      ]
    },
    "medium_sea_b2": {
      "text": "They accept it like treasure and bow with comic seriousness.",
      "choices": [
        {
          "text": "Stay to build a pebble castle",
          "next": "medium_sea_e_b2x"
        },
        {
          "text": "Thank them and walk the shore",
          "next": "medium_sea_e_b2y"
        }
      ]
    },
    "medium_sea_e_a1x": {
      "ending": true,
      "title": "Compass Home",
      "scene": "ocean_boat",
      "text": "The needle steadies. You feel sure of your next step—even beyond the book."
    },
    "medium_sea_e_a1y": {
      "ending": true,
      "title": "Compass Friends",
      "scene": "ocean_boat",
      "text": "The turtle smiles in a turtle way. Friendship becomes your true north for a while."
    },
    "medium_sea_e_a2x": {
      "ending": true,
      "title": "Coral Hall",
      "scene": "cave_light",
      "text": "You surface in a grotto filled with singing water. The song stays in your head like a gift."
    },
    "medium_sea_e_a2y": {
      "ending": true,
      "title": "Pearl Pocket",
      "scene": "treasure",
      "text": "You find a single soft pearl that glows when you are honest. You tuck it away carefully."
    },
    "medium_sea_e_b1x": {
      "ending": true,
      "title": "Tide Hello",
      "scene": "ocean_boat",
      "text": "Laughter bubbles up. The tide pool feels like a party you were meant to find."
    },
    "medium_sea_e_b1y": {
      "ending": true,
      "title": "Polite Tide",
      "scene": "ocean_boat",
      "text": "The crabs salute. Manners, it seems, work underwater too."
    },
    "medium_sea_e_b2x": {
      "ending": true,
      "title": "Pebble Castle",
      "scene": "castle",
      "text": "Your tiny castle lasts until the next tide—and that is long enough to matter."
    },
    "medium_sea_e_b2y": {
      "ending": true,
      "title": "Shore Walk",
      "scene": "ocean_boat",
      "text": "Wet sand cools your feet. You collect no shells; the walk itself is enough."
    },
    "medium_stars_root": {
      "text": "Night unfolds like a theatre curtain. A narrow bridge of light stretches toward a silver observatory.",
      "choices": [
        {
          "text": "Cross the light bridge",
          "next": "medium_stars_a"
        },
        {
          "text": "Enter the observatory",
          "next": "medium_stars_b"
        }
      ]
    },
    "medium_stars_a": {
      "text": "Halfway across, a constellation sits down beside you shaped like a question mark.",
      "choices": [
        {
          "text": "Answer the question mark",
          "next": "medium_stars_a1"
        },
        {
          "text": "Sit quietly together",
          "next": "medium_stars_a2"
        }
      ]
    },
    "medium_stars_b": {
      "text": "Telescopes point every way at once. A note reads: Look for what you hope to become.",
      "choices": [
        {
          "text": "Look through the nearest telescope",
          "next": "medium_stars_b1"
        },
        {
          "text": "Adjust a telescope toward a dark patch",
          "next": "medium_stars_b2"
        }
      ]
    },
    "medium_stars_a1": {
      "text": "You speak a hope aloud. The constellation rearranges into a clearer shape.",
      "choices": [
        {
          "text": "Name the new shape after a friend",
          "next": "medium_stars_e_a1x"
        },
        {
          "text": "Name it after your hope",
          "next": "medium_stars_e_a1y"
        }
      ]
    },
    "medium_stars_a2": {
      "text": "Silence turns friendly. Stars seem less far away.",
      "choices": [
        {
          "text": "Share a secret with the stars",
          "next": "medium_stars_e_a2x"
        },
        {
          "text": "Listen for a star’s reply",
          "next": "medium_stars_e_a2y"
        }
      ]
    },
    "medium_stars_b1": {
      "text": "You see your town from above, small and glowing with ordinary magic.",
      "choices": [
        {
          "text": "Focus on your school",
          "next": "medium_stars_e_b1x"
        },
        {
          "text": "Focus on your own window",
          "next": "medium_stars_e_b1y"
        }
      ]
    },
    "medium_stars_b2": {
      "text": "A hidden nebula blooms—colours you have no names for yet.",
      "choices": [
        {
          "text": "Sketch the nebula",
          "next": "medium_stars_e_b2x"
        },
        {
          "text": "Simply stare in wonder",
          "next": "medium_stars_e_b2y"
        }
      ]
    },
    "medium_stars_e_a1x": {
      "ending": true,
      "title": "Named Stars",
      "scene": "stars",
      "text": "The sky accepts the name. Friendship, written in light, feels permanent for a moment."
    },
    "medium_stars_e_a1y": {
      "ending": true,
      "title": "Hope Constellation",
      "scene": "stars",
      "text": "Whenever you doubt yourself later, you can remember this pattern."
    },
    "medium_stars_e_a2x": {
      "ending": true,
      "title": "Star Secret",
      "scene": "moon",
      "text": "The secret is held safely. You feel lighter without having to explain it to anyone else."
    },
    "medium_stars_e_a2y": {
      "ending": true,
      "title": "Star Reply",
      "scene": "stars",
      "text": "A soft chime answers. You do not understand the words, but you understand the care."
    },
    "medium_stars_e_b1x": {
      "ending": true,
      "title": "Town Glow",
      "scene": "village",
      "text": "Seeing familiar places from so high makes problems look solvable again."
    },
    "medium_stars_e_b1y": {
      "ending": true,
      "title": "Window Light",
      "scene": "moon",
      "text": "A lamp burns in your imagined window. You promise to be gentle with the person who lives there—you."
    },
    "medium_stars_e_b2x": {
      "ending": true,
      "title": "Colour Study",
      "scene": "map",
      "text": "Your sketch is messy and wonderful. Art does not need perfect names."
    },
    "medium_stars_e_b2y": {
      "ending": true,
      "title": "Wonder Enough",
      "scene": "stars",
      "text": "Wonder fills you to the brim. You close the book before it spills."
    },
    "hard_forest_root": {
      "text": "The forest does not pretend to be simple. Roots braid across the path like handwriting, and every shadow could be a doorway. You feel the book waiting to see what kind of traveller you are.",
      "choices": [
        {
          "text": "Follow the root-writing deeper",
          "next": "hard_forest_a"
        },
        {
          "text": "Climb toward the canopy",
          "next": "hard_forest_b"
        }
      ]
    },
    "hard_forest_a": {
      "text": "The roots form words underfoot: SEEK, SHARE, STAY. Three directions pull at once, but only two feel honest today.",
      "choices": [
        {
          "text": "Choose SEEK",
          "next": "hard_forest_a1"
        },
        {
          "text": "Choose SHARE",
          "next": "hard_forest_a2"
        }
      ]
    },
    "hard_forest_b": {
      "text": "Up in the branches, platforms of woven vine hold lanterns. A watchful lynx studies you without fear or threat.",
      "choices": [
        {
          "text": "Speak to the lynx",
          "next": "hard_forest_b1"
        },
        {
          "text": "Light a dim lantern",
          "next": "hard_forest_b2"
        }
      ]
    },
    "hard_forest_a1": {
      "text": "Seeking leads you to a hollow where an old mirror shows not your face, but a moment you regret.",
      "choices": [
        {
          "text": "Face the memory",
          "next": "hard_forest_a1p"
        },
        {
          "text": "Cover the mirror and walk away",
          "next": "hard_forest_a1q"
        }
      ]
    },
    "hard_forest_a2": {
      "text": "Sharing leads you to a camp of travellers swapping stories for bread. They make space for you without question.",
      "choices": [
        {
          "text": "Trade a true story for bread",
          "next": "hard_forest_a2p"
        },
        {
          "text": "Offer to wash dishes instead of speaking",
          "next": "hard_forest_a2q"
        }
      ]
    },
    "hard_forest_b1": {
      "text": "The lynx says, “Most people climb to escape. A few climb to see. Which are you?”",
      "choices": [
        {
          "text": "Admit you climbed to escape",
          "next": "hard_forest_b1p"
        },
        {
          "text": "Say you climbed to see",
          "next": "hard_forest_b1q"
        }
      ]
    },
    "hard_forest_b2": {
      "text": "Your lantern reveals carvings: names of children who kept promises here long ago.",
      "choices": [
        {
          "text": "Add your name for a promise you will keep",
          "next": "hard_forest_b2p"
        },
        {
          "text": "Read the oldest name aloud",
          "next": "hard_forest_b2q"
        }
      ]
    },
    "hard_forest_a1p": {
      "text": "You name the regret aloud. The mirror softens and shows a second image: you trying again.",
      "choices": [
        {
          "text": "Promise to repair what you can",
          "next": "hard_forest_e_a1p1"
        },
        {
          "text": "Forgive yourself and move on",
          "next": "hard_forest_e_a1p2"
        }
      ]
    },
    "hard_forest_e_a1p1": {
      "ending": true,
      "title": "Repair Path",
      "scene": "bridge",
      "text": "The forest grants you a small token of unfinished business—not as punishment, but as a map. You leave ready to make something right."
    },
    "hard_forest_e_a1p2": {
      "ending": true,
      "title": "Forgiven Clearing",
      "scene": "forest_home",
      "text": "Self-forgiveness is harder than it sounds. The trees lean in, as if proud. You walk out lighter."
    },
    "hard_forest_a1q": {
      "text": "You respect your own limits. Not every wound must be opened on command.",
      "choices": [
        {
          "text": "Ask the forest for patience",
          "next": "hard_forest_e_a1q1"
        },
        {
          "text": "Focus on someone else who needs help",
          "next": "hard_forest_e_a1q2"
        }
      ]
    },
    "hard_forest_e_a1q1": {
      "ending": true,
      "title": "Patient Roots",
      "scene": "forest_home",
      "text": "Patience settles over you like moss. You will return to the memory when you are ready—and that is strength too."
    },
    "hard_forest_e_a1q2": {
      "ending": true,
      "title": "Outward Kindness",
      "scene": "village",
      "text": "Helping another traveller becomes your answer. The mirror’s lesson waits; living well is also a reply."
    },
    "hard_forest_a2p": {
      "text": "You tell something real. The travellers listen as if stories are food too.",
      "choices": [
        {
          "text": "Accept their blessing for the road",
          "next": "hard_forest_e_a2p1"
        },
        {
          "text": "Invite a shy listener to speak next",
          "next": "hard_forest_e_a2p2"
        }
      ]
    },
    "hard_forest_e_a2p1": {
      "ending": true,
      "title": "Travellers’ Blessing",
      "scene": "map",
      "text": "Bread and belonging fill you. You carry their laughter like a lantern into ordinary days."
    },
    "hard_forest_e_a2p2": {
      "ending": true,
      "title": "Circle Widened",
      "scene": "village",
      "text": "The shy child speaks, trembling, then glowing. You learn that leadership can be quiet."
    },
    "hard_forest_a2q": {
      "text": "Service becomes your story. Warm water, clean plates, easy talk.",
      "choices": [
        {
          "text": "Stay until the camp sleeps",
          "next": "hard_forest_e_a2q1"
        },
        {
          "text": "Leave a kind note and continue",
          "next": "hard_forest_e_a2q2"
        }
      ]
    },
    "hard_forest_e_a2q1": {
      "ending": true,
      "title": "Night Watch",
      "scene": "moon",
      "text": "You keep a gentle watch. Trust is built in ordinary hours, not only in dramatic choices."
    },
    "hard_forest_e_a2q2": {
      "ending": true,
      "title": "Note on the Table",
      "scene": "forest_home",
      "text": "Your note says only: Thank you for the space. Sometimes that is the whole tale."
    },
    "hard_forest_b1p": {
      "text": "Honesty does not shock the lynx. “Then rest,” it says. “Escape can be wise if you return.”",
      "choices": [
        {
          "text": "Rest, then climb down stronger",
          "next": "hard_forest_e_b1p1"
        },
        {
          "text": "Ask the lynx how to return well",
          "next": "hard_forest_e_b1p2"
        }
      ]
    },
    "hard_forest_e_b1p1": {
      "ending": true,
      "title": "Rest Then Return",
      "scene": "forest_home",
      "text": "You rest without shame. When you go back to your life, you take a piece of canopy quiet with you."
    },
    "hard_forest_e_b1p2": {
      "ending": true,
      "title": "Lynx Counsel",
      "scene": "mountain",
      "text": "The lynx speaks of small brave acts. You descend with a plan measured in kindness, not perfection."
    },
    "hard_forest_b1q": {
      "text": "“Then look,” the lynx replies, and the whole forest spreads beneath you like a living map.",
      "choices": [
        {
          "text": "Search for someone who might be lost",
          "next": "hard_forest_e_b1q1"
        },
        {
          "text": "Memorise the beauty only",
          "next": "hard_forest_e_b1q2"
        }
      ]
    },
    "hard_forest_e_b1q1": {
      "ending": true,
      "title": "High Lookout",
      "scene": "mountain",
      "text": "You spot a lost hiker’s scarf and call until help connects. Sight becomes responsibility."
    },
    "hard_forest_e_b1q2": {
      "ending": true,
      "title": "Seen Beauty",
      "scene": "forest_home",
      "text": "You take no trophy but memory. Beauty, carefully noticed, changes how you treat smaller things."
    },
    "hard_forest_b2p": {
      "text": "You carve carefully. The wood smells of sap and seriousness.",
      "choices": [
        {
          "text": "Promise to practice patience",
          "next": "hard_forest_e_b2p1"
        },
        {
          "text": "Promise to defend someone smaller",
          "next": "hard_forest_e_b2p2"
        }
      ]
    },
    "hard_forest_e_b2p1": {
      "ending": true,
      "title": "Carved Patience",
      "scene": "cave_light",
      "text": "The lantern flares once. Your promise is recorded where only the honest can read it."
    },
    "hard_forest_e_b2p2": {
      "ending": true,
      "title": "Carved Courage",
      "scene": "bridge",
      "text": "The names around yours seem to lean closer. Courage likes company."
    },
    "hard_forest_b2q": {
      "text": "The oldest name belongs to a child who grew up and came back as a teacher.",
      "choices": [
        {
          "text": "Imagine your future self returning",
          "next": "hard_forest_e_b2q1"
        },
        {
          "text": "Thank the unknown teacher",
          "next": "hard_forest_e_b2q2"
        }
      ]
    },
    "hard_forest_e_b2q1": {
      "ending": true,
      "title": "Future Return",
      "scene": "library_return",
      "text": "You picture yourself older, still curious. The forest seems to nod: growth is allowed."
    },
    "hard_forest_e_b2q2": {
      "ending": true,
      "title": "Thanks Across Time",
      "scene": "library_return",
      "text": "Gratitude toward strangers who shaped the path is a quiet kind of wisdom. You climb down changed."
    },
    "hard_castle_root": {
      "text": "This castle has been rewritten by every child who entered. Some rooms remember fear; others remember games. Tonight the stones feel undecided, waiting on your next choice.",
      "choices": [
        {
          "text": "Open the door marked “Trials”",
          "next": "hard_castle_a"
        },
        {
          "text": "Open the door marked “Feasts”",
          "next": "hard_castle_b"
        }
      ]
    },
    "hard_castle_a": {
      "text": "Inside is not a monster, but a series of small challenges: a locked puzzle-box, a apology left unfinished, a mirror that asks for one true sentence.",
      "choices": [
        {
          "text": "Work on the puzzle-box",
          "next": "hard_castle_a1"
        },
        {
          "text": "Finish the unfinished apology",
          "next": "hard_castle_a2"
        }
      ]
    },
    "hard_castle_b": {
      "text": "A long table is set for guests who have not arrived. Place cards show titles like Listener, Mender, and Brave Beginner.",
      "choices": [
        {
          "text": "Sit as Listener",
          "next": "hard_castle_b1"
        },
        {
          "text": "Sit as Mender",
          "next": "hard_castle_b2"
        }
      ]
    },
    "hard_castle_a1": {
      "text": "The box opens when you stop forcing it and notice a pattern in the quiet.",
      "choices": [
        {
          "text": "Take the note inside the box",
          "next": "hard_castle_a1p"
        },
        {
          "text": "Leave the box open for the next child",
          "next": "hard_castle_a1q"
        }
      ]
    },
    "hard_castle_a2": {
      "text": "You speak words someone else once needed. The room warms by a degree.",
      "choices": [
        {
          "text": "Make the apology specific",
          "next": "hard_castle_a2p"
        },
        {
          "text": "Make the apology simple and sincere",
          "next": "hard_castle_a2q"
        }
      ]
    },
    "hard_castle_b1": {
      "text": "An empty chair across from you fills with a soft outline—someone who needs to be heard.",
      "choices": [
        {
          "text": "Listen without fixing",
          "next": "hard_castle_b1p"
        },
        {
          "text": "Share a struggle of your own",
          "next": "hard_castle_b1q"
        }
      ]
    },
    "hard_castle_b2": {
      "text": "Broken cups slide toward you. Repairing them is fiddly, almost meditative.",
      "choices": [
        {
          "text": "Repair one cup perfectly",
          "next": "hard_castle_b2p"
        },
        {
          "text": "Repair several cups “good enough”",
          "next": "hard_castle_b2q"
        }
      ]
    },
    "hard_castle_a1p": {
      "text": "The note says: Patience is a skill, not a personality.",
      "choices": [
        {
          "text": "Practice patience on your next hard task",
          "next": "hard_castle_e_a1p1"
        },
        {
          "text": "Teach the lesson to a friend later",
          "next": "hard_castle_e_a1p2"
        }
      ]
    },
    "hard_castle_e_a1p1": {
      "ending": true,
      "title": "Box Lesson",
      "scene": "treasure",
      "text": "You leave with a strategy, not a slogan. The castle approves of practical magic."
    },
    "hard_castle_e_a1p2": {
      "ending": true,
      "title": "Lesson Shared",
      "scene": "village",
      "text": "Knowledge multiplies when shared. You already plan the conversation."
    },
    "hard_castle_a1q": {
      "text": "Generosity can mean not taking everything you solve.",
      "choices": [
        {
          "text": "Add a hint of your own",
          "next": "hard_castle_e_a1q1"
        },
        {
          "text": "Simply smile and go",
          "next": "hard_castle_e_a1q2"
        }
      ]
    },
    "hard_castle_e_a1q1": {
      "ending": true,
      "title": "Kind Hint",
      "scene": "castle",
      "text": "Your hint is gentle, not a spoiler. Future readers will feel accompanied."
    },
    "hard_castle_e_a1q2": {
      "ending": true,
      "title": "Open Secret",
      "scene": "castle",
      "text": "Not every good deed needs a signature. The open box is enough."
    },
    "hard_castle_a2p": {
      "text": "Specific apologies hurt more and heal more. You choose honesty.",
      "choices": [
        {
          "text": "Imagine giving it to a real person",
          "next": "hard_castle_e_a2p1"
        },
        {
          "text": "Write it and burn it for release",
          "next": "hard_castle_e_a2p2"
        }
      ]
    },
    "hard_castle_e_a2p1": {
      "ending": true,
      "title": "True Apology",
      "scene": "bridge",
      "text": "You step back into your world with clearer words ready. Bravery can be verbal."
    },
    "hard_castle_e_a2p2": {
      "ending": true,
      "title": "Released Words",
      "scene": "phoenix",
      "text": "Ash lifts like a punctuation mark. Some apologies free the speaker first."
    },
    "hard_castle_a2q": {
      "text": "You keep it short. Sincerity does not require a speech.",
      "choices": [
        {
          "text": "Carry that tone into real life",
          "next": "hard_castle_e_a2q1"
        },
        {
          "text": "Forgive a past version of yourself too",
          "next": "hard_castle_e_a2q2"
        }
      ]
    },
    "hard_castle_e_a2q1": {
      "ending": true,
      "title": "Sincere Tone",
      "scene": "castle",
      "text": "You practice saying enough, not everything. Relationships breathe easier."
    },
    "hard_castle_e_a2q2": {
      "ending": true,
      "title": "Two Forgivenesses",
      "scene": "garden",
      "text": "The castle’s garden door opens on its own. Growth likes company."
    },
    "hard_castle_b1p": {
      "text": "You resist the urge to solve. The outline grows more solid, more trusted.",
      "choices": [
        {
          "text": "Learn that presence is help",
          "next": "hard_castle_e_b1p1"
        },
        {
          "text": "Ask one careful question only",
          "next": "hard_castle_e_b1p2"
        }
      ]
    },
    "hard_castle_e_b1p1": {
      "ending": true,
      "title": "Present Listener",
      "scene": "castle",
      "text": "You leave understanding that attention is a gift with weight and worth."
    },
    "hard_castle_e_b1p2": {
      "ending": true,
      "title": "Careful Question",
      "scene": "village",
      "text": "The question opens a door without breaking it. Skill increases with care."
    },
    "hard_castle_b1q": {
      "text": "Mutual honesty balances the table. The outline nods.",
      "choices": [
        {
          "text": "Accept that you need listeners too",
          "next": "hard_castle_e_b1q1"
        },
        {
          "text": "End with gratitude",
          "next": "hard_castle_e_b1q2"
        }
      ]
    },
    "hard_castle_e_b1q1": {
      "ending": true,
      "title": "Two Chairs",
      "scene": "feast",
      "text": "Strength includes asking. The feast room feels less lonely for everyone."
    },
    "hard_castle_e_b1q2": {
      "ending": true,
      "title": "Grateful Table",
      "scene": "feast",
      "text": "Thanks seals the exchange. You both rise lighter."
    },
    "hard_castle_b2p": {
      "text": "Gold seam, slow work. Beauty in the break.",
      "choices": [
        {
          "text": "Keep the cup as a reminder",
          "next": "hard_castle_e_b2p1"
        },
        {
          "text": "Return it to the table for guests",
          "next": "hard_castle_e_b2p2"
        }
      ]
    },
    "hard_castle_e_b2p1": {
      "ending": true,
      "title": "Kintsugi Cup",
      "scene": "treasure",
      "text": "Broken-and-mended becomes your metaphor for hard weeks ahead."
    },
    "hard_castle_e_b2p2": {
      "ending": true,
      "title": "Table Ready",
      "scene": "feast",
      "text": "Someone else will drink from your patience. That pleases you more than owning it."
    },
    "hard_castle_b2q": {
      "text": "Speed and care trade places. More guests can be served.",
      "choices": [
        {
          "text": "Value progress over perfection",
          "next": "hard_castle_e_b2q1"
        },
        {
          "text": "Invite help with the remaining cups",
          "next": "hard_castle_e_b2q2"
        }
      ]
    },
    "hard_castle_e_b2q1": {
      "ending": true,
      "title": "Good Enough Craft",
      "scene": "village",
      "text": "The castle teaches a modern lesson in an old room: done kindly beats perfect delayed."
    },
    "hard_castle_e_b2q2": {
      "ending": true,
      "title": "Many Hands",
      "scene": "feast",
      "text": "Others join. Repair becomes a party. You learn to share the work."
    },
    "hard_sea_root": {
      "text": "The tide is turning. You can smell rain that has not arrived yet. Choices out here feel larger because the horizon refuses to give easy edges.",
      "choices": [
        {
          "text": "Board a pilot boat heading out",
          "next": "hard_sea_a"
        },
        {
          "text": "Stay on the spit of land",
          "next": "hard_sea_b"
        }
      ]
    },
    "hard_sea_a": {
      "text": "The captain is a teenager with old eyes. “We ferry people past their doubts,” they say. “Not around them.”",
      "choices": [
        {
          "text": "Ask to help with the ferry",
          "next": "hard_sea_a1"
        },
        {
          "text": "Admit you are full of doubts",
          "next": "hard_sea_a2"
        }
      ]
    },
    "hard_sea_b": {
      "text": "A research tent flaps in the wind. Charts of currents cover a table beside a kettle.",
      "choices": [
        {
          "text": "Study the current charts",
          "next": "hard_sea_b1"
        },
        {
          "text": "Make tea for the researcher",
          "next": "hard_sea_b2"
        }
      ]
    },
    "hard_sea_a1": {
      "text": "Helping means holding a rope, watching the waves, and not pretending you are fearless.",
      "choices": [
        {
          "text": "Take a turn at the tiller",
          "next": "hard_sea_a1p"
        },
        {
          "text": "Keep rope duty and observe",
          "next": "hard_sea_a1q"
        }
      ]
    },
    "hard_sea_a2": {
      "text": "The captain nods. “Good. Liars sink faster.”",
      "choices": [
        {
          "text": "Name one doubt out loud",
          "next": "hard_sea_a2p"
        },
        {
          "text": "Ask the captain about their doubts",
          "next": "hard_sea_a2q"
        }
      ]
    },
    "hard_sea_b1": {
      "text": "You see how water remembers where it has been. Patterns appear that panic had hidden.",
      "choices": [
        {
          "text": "Trace a safe route on the chart",
          "next": "hard_sea_b1p"
        },
        {
          "text": "Look for where the charts are wrong",
          "next": "hard_sea_b1q"
        }
      ]
    },
    "hard_sea_b2": {
      "text": "Steam fogs the tent. Conversation becomes easier than expertise.",
      "choices": [
        {
          "text": "Ask what the researcher fears",
          "next": "hard_sea_b2p"
        },
        {
          "text": "Ask what the researcher loves",
          "next": "hard_sea_b2q"
        }
      ]
    },
    "hard_sea_a1p": {
      "text": "The boat answers your hands slowly. Leadership feels heavy and possible.",
      "choices": [
        {
          "text": "Steer toward a safe harbour",
          "next": "hard_sea_e_a1p1"
        },
        {
          "text": "Steer toward someone signalling for help",
          "next": "hard_sea_e_a1p2"
        }
      ]
    },
    "hard_sea_e_a1p1": {
      "ending": true,
      "title": "Harbour Hands",
      "scene": "ocean_boat",
      "text": "You learn the shape of responsibility: not control, but care in motion."
    },
    "hard_sea_e_a1p2": {
      "ending": true,
      "title": "Signal Answered",
      "scene": "bridge",
      "text": "A small craft is in trouble. Your detour becomes the whole point of the trip."
    },
    "hard_sea_a1q": {
      "text": "Observation is active. You notice a fray before it fails.",
      "choices": [
        {
          "text": "Speak up about the fray",
          "next": "hard_sea_e_a1q1"
        },
        {
          "text": "Fix it yourself carefully",
          "next": "hard_sea_e_a1q2"
        }
      ]
    },
    "hard_sea_e_a1q1": {
      "ending": true,
      "title": "Quiet Alert",
      "scene": "ocean_boat",
      "text": "Speaking up prevents harm. Courage does not always look like the tiller."
    },
    "hard_sea_e_a1q2": {
      "ending": true,
      "title": "Quiet Fix",
      "scene": "ocean_boat",
      "text": "Your hands know more than you bragged about. Competence grows in the unnoticed jobs."
    },
    "hard_sea_a2p": {
      "text": "The sea does not laugh. Naming reduces the doubt’s teeth.",
      "choices": [
        {
          "text": "Make a plan for that one doubt",
          "next": "hard_sea_e_a2p1"
        },
        {
          "text": "Accept the doubt and act anyway",
          "next": "hard_sea_e_a2p2"
        }
      ]
    },
    "hard_sea_e_a2p1": {
      "ending": true,
      "title": "One Doubt Plan",
      "scene": "map",
      "text": "Plans are life jackets. You paddle back toward shore with a next step."
    },
    "hard_sea_e_a2p2": {
      "ending": true,
      "title": "Act Anyway",
      "scene": "ocean_boat",
      "text": "Bravery includes trembling. You act, and the boat holds."
    },
    "hard_sea_a2q": {
      "text": "They share one. The sky feels less like a test and more like weather.",
      "choices": [
        {
          "text": "Trade encouragement",
          "next": "hard_sea_e_a2q1"
        },
        {
          "text": "Sit in companionable silence",
          "next": "hard_sea_e_a2q2"
        }
      ]
    },
    "hard_sea_e_a2q1": {
      "ending": true,
      "title": "Traded Courage",
      "scene": "ocean_boat",
      "text": "Encouragement is not fake cheer; it is accurate hope. You both stand taller."
    },
    "hard_sea_e_a2q2": {
      "ending": true,
      "title": "Shared Horizon",
      "scene": "sun",
      "text": "Silence can be solidarity. The horizon softens."
    },
    "hard_sea_b1p": {
      "text": "Pencil lines become confidence. Knowledge turns wild water into readable motion.",
      "choices": [
        {
          "text": "Leave the route for others",
          "next": "hard_sea_e_b1p1"
        },
        {
          "text": "Follow the route yourself now",
          "next": "hard_sea_e_b1p2"
        }
      ]
    },
    "hard_sea_e_b1p1": {
      "ending": true,
      "title": "Chart Legacy",
      "scene": "map",
      "text": "Your lines may guide a stranger tomorrow. Useful knowledge likes to travel."
    },
    "hard_sea_e_b1p2": {
      "ending": true,
      "title": "Chart Tested",
      "scene": "ocean_boat",
      "text": "Theory meets tide. You adjust, learn, and respect the sea more, not less."
    },
    "hard_sea_b1q": {
      "text": "Finding errors is a kind of respect for truth.",
      "choices": [
        {
          "text": "Correct the chart carefully",
          "next": "hard_sea_e_b1q1"
        },
        {
          "text": "Report the error to the researcher",
          "next": "hard_sea_e_b1q2"
        }
      ]
    },
    "hard_sea_e_b1q1": {
      "ending": true,
      "title": "True Correction",
      "scene": "map",
      "text": "Accuracy is kindness to the next sailor. Your eraser is a tool of care."
    },
    "hard_sea_e_b1q2": {
      "ending": true,
      "title": "Reported Truth",
      "scene": "village",
      "text": "Teamwork beats lone genius. The researcher is grateful, not defensive."
    },
    "hard_sea_b2p": {
      "text": "They fear storms, and also being wrong in public.",
      "choices": [
        {
          "text": "Share a fear of your own",
          "next": "hard_sea_e_b2p1"
        },
        {
          "text": "Help them prepare for the storm",
          "next": "hard_sea_e_b2p2"
        }
      ]
    },
    "hard_sea_e_b2p1": {
      "ending": true,
      "title": "Fear for Fear",
      "scene": "ocean_boat",
      "text": "Mutual fear, spoken, becomes less isolating. The kettle clicks like applause."
    },
    "hard_sea_e_b2p2": {
      "ending": true,
      "title": "Storm Ready",
      "scene": "ocean_boat",
      "text": "Preparation is love in practical clothes. You tie what needs tying."
    },
    "hard_sea_b2q": {
      "text": "They love the moment a pattern appears. Wonder is their fuel.",
      "choices": [
        {
          "text": "Watch the water for patterns together",
          "next": "hard_sea_e_b2q1"
        },
        {
          "text": "Write a few notes of your own",
          "next": "hard_sea_e_b2q2"
        }
      ]
    },
    "hard_sea_e_b2q1": {
      "ending": true,
      "title": "Pattern Watch",
      "scene": "ocean_boat",
      "text": "You catch a rhythm in the waves. Discovery does not require a degree—only attention."
    },
    "hard_sea_e_b2q2": {
      "ending": true,
      "title": "Field Notes",
      "scene": "map",
      "text": "Your notes are imperfect and alive. Curiosity records itself through you."
    },
    "hard_stars_root": {
      "text": "Silence up here is not empty; it is full of distance. A research skiff drifts on solar wind, its hull scratched with initials of previous explorers.",
      "choices": [
        {
          "text": "Board the skiff",
          "next": "hard_stars_a"
        },
        {
          "text": "Drift outside on a tether line",
          "next": "hard_stars_b"
        }
      ]
    },
    "hard_stars_a": {
      "text": "Controls glow softly. An onboard log asks: What are you hoping to measure?",
      "choices": [
        {
          "text": "Answer “courage”",
          "next": "hard_stars_a1"
        },
        {
          "text": "Answer “belonging”",
          "next": "hard_stars_a2"
        }
      ]
    },
    "hard_stars_b": {
      "text": "Earth hangs like a marble you could almost protect with two hands.",
      "choices": [
        {
          "text": "Focus on Earth’s night side",
          "next": "hard_stars_b1"
        },
        {
          "text": "Focus on deep space",
          "next": "hard_stars_b2"
        }
      ]
    },
    "hard_stars_a1": {
      "text": "The skiff plots a course toward a storm of particles. Instruments hum.",
      "choices": [
        {
          "text": "Enter the particle storm carefully",
          "next": "hard_stars_a1p"
        },
        {
          "text": "Observe from a safe distance",
          "next": "hard_stars_a1q"
        }
      ]
    },
    "hard_stars_a2": {
      "text": "The course shifts toward a cluster of stations where signals chatter like a kitchen at dawn.",
      "choices": [
        {
          "text": "Hail the nearest station",
          "next": "hard_stars_a2p"
        },
        {
          "text": "Send a message to someone on Earth first",
          "next": "hard_stars_a2q"
        }
      ]
    },
    "hard_stars_b1": {
      "text": "Cities bloom in chains of light. You think of one window that matters.",
      "choices": [
        {
          "text": "Find your city’s glow",
          "next": "hard_stars_b1p"
        },
        {
          "text": "Look for dark regions between cities",
          "next": "hard_stars_b1q"
        }
      ]
    },
    "hard_stars_b2": {
      "text": "Darkness between stars feels honest. Questions get bigger and kinder somehow.",
      "choices": [
        {
          "text": "Ask a question into the dark",
          "next": "hard_stars_b2p"
        },
        {
          "text": "Count stars until you feel small in a good way",
          "next": "hard_stars_b2q"
        }
      ]
    },
    "hard_stars_a1p": {
      "text": "Warnings flash. You proceed with respect, not bravado.",
      "choices": [
        {
          "text": "Collect data and withdraw",
          "next": "hard_stars_e_a1p1"
        },
        {
          "text": "Hold steady through the worst minute",
          "next": "hard_stars_e_a1p2"
        }
      ]
    },
    "hard_stars_e_a1p1": {
      "ending": true,
      "title": "Measured Courage",
      "scene": "star_ship",
      "text": "Courage includes retreat when the goal is learning, not proving. You return with useful readings."
    },
    "hard_stars_e_a1p2": {
      "ending": true,
      "title": "Steady Minute",
      "scene": "star_ship",
      "text": "One minute of steadiness changes how you see every future panic. You have a new memory of yourself."
    },
    "hard_stars_a1q": {
      "text": "Distance can be wisdom. You still learn the storm’s shape.",
      "choices": [
        {
          "text": "Record what others might need",
          "next": "hard_stars_e_a1q1"
        },
        {
          "text": "Admit this limit without shame",
          "next": "hard_stars_e_a1q2"
        }
      ]
    },
    "hard_stars_e_a1q1": {
      "ending": true,
      "title": "Warning Log",
      "scene": "map",
      "text": "Your log may keep a stranger safer. Knowledge as caretaking."
    },
    "hard_stars_e_a1q2": {
      "ending": true,
      "title": "Honest Limit",
      "scene": "stars",
      "text": "Limits are part of skill. The skiff seems to respect your judgment."
    },
    "hard_stars_a2p": {
      "text": "Voices answer—tired, glad, human. Belonging sounds like static and names.",
      "choices": [
        {
          "text": "Offer help with a small task",
          "next": "hard_stars_e_a2p1"
        },
        {
          "text": "Ask to listen to their stories",
          "next": "hard_stars_e_a2p2"
        }
      ]
    },
    "hard_stars_e_a2p1": {
      "ending": true,
      "title": "Station Hand",
      "scene": "star_ship",
      "text": "You tighten a bolt, pass a tool, listen. Belonging is built from useful minutes."
    },
    "hard_stars_e_a2p2": {
      "ending": true,
      "title": "Signal Stories",
      "scene": "stars",
      "text": "Stories cross the gap. You feel less like a tourist and more like a neighbour."
    },
    "hard_stars_a2q": {
      "text": "You write carefully. Distance makes words count.",
      "choices": [
        {
          "text": "Send encouragement",
          "next": "hard_stars_e_a2q1"
        },
        {
          "text": "Send an honest “I miss you”",
          "next": "hard_stars_e_a2q2"
        }
      ]
    },
    "hard_stars_e_a2q1": {
      "ending": true,
      "title": "Uplink Kindness",
      "scene": "moon",
      "text": "Somewhere, a device lights up. You may never see the smile. It still matters."
    },
    "hard_stars_e_a2q2": {
      "ending": true,
      "title": "Honest Distance",
      "scene": "moon",
      "text": "Missing is a form of love. The stars do not mind the softness."
    },
    "hard_stars_b1p": {
      "text": "It takes patience. Then—there. A familiar sprawl.",
      "choices": [
        {
          "text": "Promise to be gentler at home",
          "next": "hard_stars_e_b1p1"
        },
        {
          "text": "Promise to notice overlooked people",
          "next": "hard_stars_e_b1p2"
        }
      ]
    },
    "hard_stars_e_b1p1": {
      "ending": true,
      "title": "From Orbit Home",
      "scene": "village",
      "text": "Perspective is a teacher with no classroom. You intend to use it."
    },
    "hard_stars_e_b1p2": {
      "ending": true,
      "title": "Noticed Lives",
      "scene": "village",
      "text": "From high up, every light is a life. You vow to treat them that way at street level."
    },
    "hard_stars_b1q": {
      "text": "Fields, forests, water. Quiet that feeds the lights.",
      "choices": [
        {
          "text": "Value the quiet places",
          "next": "hard_stars_e_b1q1"
        },
        {
          "text": "Wonder who lives without glare",
          "next": "hard_stars_e_b1q2"
        }
      ]
    },
    "hard_stars_e_b1q1": {
      "ending": true,
      "title": "Dark Earth",
      "scene": "forest_home",
      "text": "You remember that rest and wildness sustain the bright zones. Balance becomes a goal."
    },
    "hard_stars_e_b1q2": {
      "ending": true,
      "title": "Unlit Lives",
      "scene": "moon",
      "text": "Curiosity about other ways of living keeps judgment soft. You drift on, thinking."
    },
    "hard_stars_b2p": {
      "text": "No voice answers, but your own thinking deepens.",
      "choices": [
        {
          "text": "Write the question in the skiff log",
          "next": "hard_stars_e_b2p1"
        },
        {
          "text": "Carry the question home unanswered",
          "next": "hard_stars_e_b2p2"
        }
      ]
    },
    "hard_stars_e_b2p1": {
      "ending": true,
      "title": "Logged Question",
      "scene": "map",
      "text": "Good questions outlive quick answers. You seed the future with inquiry."
    },
    "hard_stars_e_b2p2": {
      "ending": true,
      "title": "Open Question",
      "scene": "library_return",
      "text": "You return to the library comfortable with not knowing everything. That comfort is maturity."
    },
    "hard_stars_b2q": {
      "text": "Smallness becomes relief, not insult.",
      "choices": [
        {
          "text": "Let awe replace worry for a while",
          "next": "hard_stars_e_b2q1"
        },
        {
          "text": "Thank the universe without needing a reply",
          "next": "hard_stars_e_b2q2"
        }
      ]
    },
    "hard_stars_e_b2q1": {
      "ending": true,
      "title": "Awe Break",
      "scene": "stars",
      "text": "Worry will return, but awe has left a door open. You know the way back."
    },
    "hard_stars_e_b2q2": {
      "ending": true,
      "title": "Quiet Thanks",
      "scene": "stars",
      "text": "Gratitude without audience is still real. You reel yourself in and close the book gently."
    }
  }
};
