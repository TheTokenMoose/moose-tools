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
    "text": "You open a book and step into a green forest. Soft light falls through the leaves. A path goes left. A wooden bridge goes right.",
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
    "text": "The path leads to a friendly fox. The fox holds a small gold key and a shiny red berry.",
    "choices": [
      {
        "text": "Take the key",
        "next": "easy_forest_key"
      },
      {
        "text": "Take the berry",
        "next": "easy_forest_berry"
      }
    ]
  },
  "easy_forest_bridge": {
    "text": "The bridge crosses a clear stream. Under the water you see a silver fish. On the far bank sits a sleepy owl.",
    "choices": [
      {
        "text": "Follow the fish",
        "next": "easy_forest_fish"
      },
      {
        "text": "Talk to the owl",
        "next": "easy_forest_owl"
      }
    ]
  },
  "easy_forest_key": {
    "text": "The key fits a tiny door in an old oak. Inside is a warm room with a map of the forest.",
    "choices": [
      {
        "text": "Read the map",
        "next": "easy_forest_e_map"
      },
      {
        "text": "Rest by the fire",
        "next": "easy_forest_e_rest"
      }
    ]
  },
  "easy_forest_berry": {
    "text": "You share the berry with the fox. The fox shows you a secret garden full of glowing flowers.",
    "choices": [
      {
        "text": "Pick a flower",
        "next": "easy_forest_e_flower"
      },
      {
        "text": "Dance with the fox",
        "next": "easy_forest_e_dance"
      }
    ]
  },
  "easy_forest_fish": {
    "text": "The silver fish leads you to a smooth stone. When you touch it, the stream sings a soft song.",
    "choices": [
      {
        "text": "Sing along",
        "next": "easy_forest_e_song"
      },
      {
        "text": "Thank the fish",
        "next": "easy_forest_e_thanks"
      }
    ]
  },
  "easy_forest_owl": {
    "text": "The owl opens one eye. \"Be kind in this forest,\" it says, \"and the trees will help you home.\"",
    "choices": [
      {
        "text": "Promise to be kind",
        "next": "easy_forest_e_kind"
      },
      {
        "text": "Ask the way home",
        "next": "easy_forest_e_home"
      }
    ]
  },
  "easy_forest_e_map": {
    "ending": true,
    "title": "The Forest Map",
    "scene": "forest",
    "text": "You follow the map and find a sunny clearing. Your adventure ends with a smile and a pocket full of leaves."
  },
  "easy_forest_e_rest": {
    "ending": true,
    "title": "A Warm Rest",
    "scene": "forest",
    "text": "You rest by the fire. When you wake, you are back in the library with pine needles on your shoes."
  },
  "easy_forest_e_flower": {
    "ending": true,
    "title": "The Glowing Flower",
    "scene": "forest",
    "text": "The flower glows in your hand. You return to the library holding a soft light that smells like spring."
  },
  "easy_forest_e_dance": {
    "ending": true,
    "title": "Dance with the Fox",
    "scene": "forest",
    "text": "You dance until the stars come out. The fox waves goodbye as the book closes gently."
  },
  "easy_forest_e_song": {
    "ending": true,
    "title": "Song of the Stream",
    "scene": "forest",
    "text": "Your song joins the stream. Birds answer from the trees. You close the book feeling calm and brave."
  },
  "easy_forest_e_thanks": {
    "ending": true,
    "title": "A Silver Scale",
    "scene": "forest",
    "text": "The fish flicks its tail and gives you a shiny scale. You keep it as a memory of the forest."
  },
  "easy_forest_e_kind": {
    "ending": true,
    "title": "Kindness Path",
    "scene": "forest",
    "text": "The trees lean in and make a soft path home. Kindness was the real key all along."
  },
  "easy_forest_e_home": {
    "ending": true,
    "title": "Home Again",
    "scene": "forest",
    "text": "The owl points with a wing. You walk the path and step back into the library, safe and happy."
  },
  "easy_castle_root": {
    "text": "A tall castle door stands open. Inside, soft music plays. Stairs go up. A garden path goes left.",
    "choices": [
      {
        "text": "Climb the stairs",
        "next": "easy_castle_stairs"
      },
      {
        "text": "Visit the garden",
        "next": "easy_castle_garden"
      }
    ]
  },
  "easy_castle_stairs": {
    "text": "At the top of the stairs you meet a small dragon with kind eyes. It guards a shiny crown and a plate of cookies.",
    "choices": [
      {
        "text": "Ask about the crown",
        "next": "easy_castle_crown"
      },
      {
        "text": "Share the cookies",
        "next": "easy_castle_cookies"
      }
    ]
  },
  "easy_castle_garden": {
    "text": "The garden is full of roses. A friendly knight is watering them. A little mouse peeks from under a leaf.",
    "choices": [
      {
        "text": "Help the knight",
        "next": "easy_castle_help"
      },
      {
        "text": "Follow the mouse",
        "next": "easy_castle_mouse"
      }
    ]
  },
  "easy_castle_crown": {
    "text": "The dragon says the crown is for someone kind. \"Will you try it on, or give it to a friend?\"",
    "choices": [
      {
        "text": "Try it on",
        "next": "easy_castle_e_try"
      },
      {
        "text": "Give it to a friend",
        "next": "easy_castle_e_give"
      }
    ]
  },
  "easy_castle_cookies": {
    "text": "You and the dragon crunch cookies together. Crumbs make you both laugh.",
    "choices": [
      {
        "text": "Tell a joke",
        "next": "easy_castle_e_joke"
      },
      {
        "text": "Ask for a tour",
        "next": "easy_castle_e_tour"
      }
    ]
  },
  "easy_castle_help": {
    "text": "You water the roses. The knight smiles and hands you a single red rose.",
    "choices": [
      {
        "text": "Keep the rose",
        "next": "easy_castle_e_rose"
      },
      {
        "text": "Put it on a statue",
        "next": "easy_castle_e_statue"
      }
    ]
  },
  "easy_castle_mouse": {
    "text": "The mouse leads you to a tiny door. Behind it is a room full of storybooks just your size.",
    "choices": [
      {
        "text": "Read a story",
        "next": "easy_castle_e_read"
      },
      {
        "text": "Wave goodbye",
        "next": "easy_castle_e_wave"
      }
    ]
  },
  "easy_castle_e_try": {
    "ending": true,
    "title": "A Silly Crown",
    "scene": "castle",
    "text": "The crown is too big and slips over your eyes. You and the dragon laugh until the book closes."
  },
  "easy_castle_e_give": {
    "ending": true,
    "title": "A Gift of Kindness",
    "scene": "castle",
    "text": "You give the crown to a shy friend in the hall. They stand taller. You feel proud."
  },
  "easy_castle_e_joke": {
    "ending": true,
    "title": "Cookie Laughter",
    "scene": "castle",
    "text": "Your joke makes the dragon snort little sparks of joy. The castle feels warmer than before."
  },
  "easy_castle_e_tour": {
    "ending": true,
    "title": "Castle Tour",
    "scene": "castle",
    "text": "The dragon shows you every tower. When you leave, you know every secret stair by heart."
  },
  "easy_castle_e_rose": {
    "ending": true,
    "title": "The Red Rose",
    "scene": "castle",
    "text": "You keep the rose. Its scent stays with you when you step back into the library."
  },
  "easy_castle_e_statue": {
    "ending": true,
    "title": "Statue Smile",
    "scene": "castle",
    "text": "The statue seems to smile. A soft wind says thank you as the garden fades into the page."
  },
  "easy_castle_e_read": {
    "ending": true,
    "title": "Tiny Library",
    "scene": "castle",
    "text": "You read until the last page. The mouse curls up happy. You close the big library book softly."
  },
  "easy_castle_e_wave": {
    "ending": true,
    "title": "A Friendly Wave",
    "scene": "castle",
    "text": "You wave to the mouse and walk into the sunlight. The castle door closes with a gentle click."
  },
  "easy_sea_root": {
    "text": "You hold a sea shell to your ear and splash into a bright blue ocean. A boat floats nearby. A coral reef glows below.",
    "choices": [
      {
        "text": "Climb into the boat",
        "next": "easy_sea_boat"
      },
      {
        "text": "Dive to the reef",
        "next": "easy_sea_reef"
      }
    ]
  },
  "easy_sea_boat": {
    "text": "In the boat sits a cheerful seagull with a map. Waves rock you gently.",
    "choices": [
      {
        "text": "Sail to the island",
        "next": "easy_sea_island"
      },
      {
        "text": "Follow the map star",
        "next": "easy_sea_star"
      }
    ]
  },
  "easy_sea_reef": {
    "text": "Colourful fish swim around you. A shy octopus offers a shiny pebble and a smooth shell.",
    "choices": [
      {
        "text": "Take the pebble",
        "next": "easy_sea_pebble"
      },
      {
        "text": "Take the shell",
        "next": "easy_sea_shell"
      }
    ]
  },
  "easy_sea_island": {
    "text": "The island has soft sand and a picnic blanket. Someone left juice and fruit for visitors.",
    "choices": [
      {
        "text": "Have a picnic",
        "next": "easy_sea_e_picnic"
      },
      {
        "text": "Build a sandcastle",
        "next": "easy_sea_e_sand"
      }
    ]
  },
  "easy_sea_star": {
    "text": "The map star leads to a calm bay where dolphins jump in the sunset.",
    "choices": [
      {
        "text": "Wave to the dolphins",
        "next": "easy_sea_e_dolphin"
      },
      {
        "text": "Draw the sunset",
        "next": "easy_sea_e_sunset"
      }
    ]
  },
  "easy_sea_pebble": {
    "text": "The pebble glows blue. The octopus claps its arms. \"You found courage,\" it says.",
    "choices": [
      {
        "text": "Say thank you",
        "next": "easy_sea_e_thanks"
      },
      {
        "text": "Share a smile",
        "next": "easy_sea_e_smile"
      }
    ]
  },
  "easy_sea_shell": {
    "text": "The shell plays a soft ocean song. You feel sleepy and safe in the water.",
    "choices": [
      {
        "text": "Listen longer",
        "next": "easy_sea_e_listen"
      },
      {
        "text": "Swim up for air",
        "next": "easy_sea_e_air"
      }
    ]
  },
  "easy_sea_e_picnic": {
    "ending": true,
    "title": "Island Picnic",
    "scene": "sea",
    "text": "You share the picnic with the seagull. Salt air and sweet fruit end your sea day happily."
  },
  "easy_sea_e_sand": {
    "ending": true,
    "title": "Sandcastle Hero",
    "scene": "sea",
    "text": "Your sandcastle has a tiny flag. A wave bows to it before the story ends."
  },
  "easy_sea_e_dolphin": {
    "ending": true,
    "title": "Dolphin Hello",
    "scene": "sea",
    "text": "A dolphin clicks hello. You ride a gentle wake back toward the library shore."
  },
  "easy_sea_e_sunset": {
    "ending": true,
    "title": "Sunset Picture",
    "scene": "sea",
    "text": "Your drawing of the sunset stays on the page. Orange light fills the library window."
  },
  "easy_sea_e_thanks": {
    "ending": true,
    "title": "Ocean Thanks",
    "scene": "sea",
    "text": "The octopus blushes purple. Friendship is the treasure you carry home."
  },
  "easy_sea_e_smile": {
    "ending": true,
    "title": "Reef Smiles",
    "scene": "sea",
    "text": "You smile so wide the fish smile back. The reef sparkles one last time."
  },
  "easy_sea_e_listen": {
    "ending": true,
    "title": "Shell Lullaby",
    "scene": "sea",
    "text": "The shell song becomes a lullaby. You wake in the library, calm as a quiet tide."
  },
  "easy_sea_e_air": {
    "ending": true,
    "title": "Fresh Air",
    "scene": "sea",
    "text": "You break the surface and laugh. Fresh air and blue sky close the chapter."
  },
  "easy_stars_root": {
    "text": "A silver ladder reaches into the night sky. Stars blink like friendly eyes. You can climb up or follow a comet trail.",
    "choices": [
      {
        "text": "Climb the ladder",
        "next": "easy_stars_ladder"
      },
      {
        "text": "Follow the comet",
        "next": "easy_stars_comet"
      }
    ]
  },
  "easy_stars_ladder": {
    "text": "At the top of the ladder is a moon platform. A kind star offers you a telescope and a blanket.",
    "choices": [
      {
        "text": "Use the telescope",
        "next": "easy_stars_scope"
      },
      {
        "text": "Wrap the blanket",
        "next": "easy_stars_blanket"
      }
    ]
  },
  "easy_stars_comet": {
    "text": "The comet trail sparkles under your feet. You meet a quiet astronaut planting a tiny flag.",
    "choices": [
      {
        "text": "Help plant the flag",
        "next": "easy_stars_flag"
      },
      {
        "text": "Ask about Earth",
        "next": "easy_stars_earth"
      }
    ]
  },
  "easy_stars_scope": {
    "text": "Through the telescope you see your town, tiny and glowing. Home feels close even among the stars.",
    "choices": [
      {
        "text": "Wave to home",
        "next": "easy_stars_e_wave"
      },
      {
        "text": "Count the lights",
        "next": "easy_stars_e_count"
      }
    ]
  },
  "easy_stars_blanket": {
    "text": "The blanket is warm. The star tells stories of brave night travellers.",
    "choices": [
      {
        "text": "Listen to a story",
        "next": "easy_stars_e_story"
      },
      {
        "text": "Share your own story",
        "next": "easy_stars_e_share"
      }
    ]
  },
  "easy_stars_flag": {
    "text": "Together you push the flag into soft star-dust. It shines with your name.",
    "choices": [
      {
        "text": "Cheer",
        "next": "easy_stars_e_cheer"
      },
      {
        "text": "Take a photo",
        "next": "easy_stars_e_photo"
      }
    ]
  },
  "easy_stars_earth": {
    "text": "The astronaut points to a blue marble in the dark. \"That is where kindness begins,\" they say.",
    "choices": [
      {
        "text": "Promise to be kind",
        "next": "easy_stars_e_kind"
      },
      {
        "text": "Head home",
        "next": "easy_stars_e_home"
      }
    ]
  },
  "easy_stars_e_wave": {
    "ending": true,
    "title": "Wave to Home",
    "scene": "stars",
    "text": "You wave at the tiny lights. Somewhere, someone waves back in a dream."
  },
  "easy_stars_e_count": {
    "ending": true,
    "title": "Counting Lights",
    "scene": "stars",
    "text": "You count to twenty lights and stop, happy. Numbers and stars mix in your mind."
  },
  "easy_stars_e_story": {
    "ending": true,
    "title": "Star Story",
    "scene": "stars",
    "text": "The star story ends with a hug of light. You drift back to the library yawning."
  },
  "easy_stars_e_share": {
    "ending": true,
    "title": "Your Story",
    "scene": "stars",
    "text": "You tell a story about your classroom. The star laughs like a tiny bell."
  },
  "easy_stars_e_cheer": {
    "ending": true,
    "title": "Star Cheer",
    "scene": "stars",
    "text": "Your cheer echoes across the quiet dark. Bravery sounds like joy up here."
  },
  "easy_stars_e_photo": {
    "ending": true,
    "title": "Space Photo",
    "scene": "stars",
    "text": "The photo shows you and the astronaut grinning. A perfect end to a sky walk."
  },
  "easy_stars_e_kind": {
    "ending": true,
    "title": "Kindness Promise",
    "scene": "stars",
    "text": "You promise kindness. The ladder appears again, leading gently home."
  },
  "easy_stars_e_home": {
    "ending": true,
    "title": "Back from the Stars",
    "scene": "stars",
    "text": "You step down the ladder into the library. Night still sparkles behind your eyes."
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
