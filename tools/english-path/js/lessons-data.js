/**
 * English Path — 20-lesson K→G1 ESL self-study data
 * Adapted from the 1:1 tutoring course for independent review.
 */
window.ENGLISH_PATH_LESSONS = [
  {
    id: 1,
    title: "Getting to Know You",
    theme: "Me, My Things, My World",
    phase: 1,
    milestone: "benchmark",
    objective: "Show how you speak, read, and write about favourite things.",
    vocabulary: ["favourite", "animal", "toy", "colour", "big", "small", "happy"],
    grammar: "Present simple: I like… / It is… / My favourite is…",
    speaking: {
      prompt: "Tell about your favourite toy or animal. Use a full sentence. Start with “My favourite…”.",
      model: "My favourite toy is a blue car. It is small. I like it because it is fast.",
      tips: ["Say a full sentence.", "Add a colour.", "Add because…"],
      followUps: ["What colour is it?", "Is it big or small?", "Why do you like it?"]
    },
    reading: {
      title: "The Lost Ball",
      text: "Tom has a red ball. He likes his ball very much. One day Tom plays in the park. He throws the ball. The ball goes under a big tree. Tom looks and looks. He is not happy. Then his friend Sam comes. Sam finds the ball. Tom is happy again. He says, “Thank you, Sam!” The two friends play together.",
      questions: [
        { q: "What colour is Tom’s ball?", a: "red", options: ["red", "blue", "green"] },
        { q: "Where does Tom play?", a: "in the park", options: ["in the park", "at home", "at school"] },
        { q: "Where does the ball go?", a: "under a big tree", options: ["under a big tree", "in the bag", "on the table"] },
        { q: "How does Tom feel when he cannot find the ball?", a: "not happy", options: ["happy", "not happy", "sleepy"] },
        { q: "Who helps Tom?", a: "Sam", options: ["Sam", "Tom", "a teacher"] },
        { q: "How does Tom feel at the end?", a: "happy", options: ["sad", "happy", "angry"] }
      ]
    },
    discussion: {
      prompts: [
        "Have you ever lost a toy or a ball?",
        "What happened?",
        "How did you feel?",
        "Who helped you?"
      ]
    },
    writing: {
      prompt: "Draw (imagine) your favourite toy or animal. Write about it.",
      frame: "My favourite is…\nIt is…\nI like it because…",
      minSentences: 1
    }
  },
  {
    id: 2,
    title: "Complete Sentences",
    theme: "Favourite Things",
    phase: 1,
    objective: "Describe favourites in complete sentences with colour, size, and because.",
    vocabulary: ["favourite", "colour", "big", "small", "fun", "soft"],
    grammar: "My favourite ___ is ___. It is ___. I like it because ___.",
    speaking: {
      prompt: "Choose a favourite thing. Describe it in full sentences using colour, size, and because.",
      model: "My favourite is the soft bear. It is brown and small. I like it because it is soft.",
      tips: ["Use the frame.", "Add because."],
      followUps: ["What colour is it?", "Is it big or small?", "Why do you like it?"]
    },
    reading: {
      title: "Sara’s Soft Bear",
      text: "Sara has a favourite toy. It is a small brown bear. The bear is soft. Sara plays with the bear every day. She takes the bear to bed. One day Sara cannot find her bear. She looks under the bed. She looks in the bag. Then she looks behind the door. The bear is there! Sara is happy. She says, “I like my soft bear because it is my best friend.”",
      questions: [
        { q: "What is Sara’s favourite toy?", a: "a small brown bear", options: ["a small brown bear", "a red ball", "a book"] },
        { q: "What colour is the bear?", a: "brown", options: ["brown", "red", "blue"] },
        { q: "Is the bear big or small?", a: "small", options: ["big", "small", "tall"] },
        { q: "Where does Sara look? (one place)", a: "under the bed", options: ["under the bed", "in the park", "at school"] },
        { q: "How does Sara feel when she finds the bear?", a: "happy", options: ["sad", "happy", "angry"] },
        { q: "Why does Sara like her bear?", a: "it is her best friend", options: ["it is her best friend", "it is big", "it is loud"] }
      ]
    },
    discussion: {
      prompts: [
        "Which toy in the story do you like? Why?",
        "Tell about a soft toy or favourite thing at home.",
        "What colour is it? Is it big or small?"
      ]
    },
    writing: {
      prompt: "Write 2–3 full sentences about your favourite thing.",
      frame: "My favourite is…\nIt is… (colour / size)\nI like it because…",
      minSentences: 2
    }
  },
  {
    id: 3,
    title: "Describing Animals",
    theme: "Amazing Animals",
    phase: 1,
    objective: "Use adjectives and “It has…” to describe animals.",
    vocabulary: ["animal", "friendly", "fast", "strong", "long", "short", "tail"],
    grammar: "It is… / It has… / He is… Adjectives.",
    speaking: {
      prompt: "Describe an animal without naming it. Use “It is…” and “It has…”.",
      model: "It is brown. It has a long tail. It is fast.",
      tips: ["Use full sentences.", "Say It has…"],
      followUps: ["What colour is it?", "Is it friendly?", "What can it do?"]
    },
    reading: {
      title: "Max and Lily",
      text: "Max is a friendly dog. He is brown and white. Max has a long tail. He runs fast in the park. Max has a good friend. Her name is Lily. Lily is a small cat. She has short legs. Max and Lily play every day. Max is strong. He can carry a big stick. Lily is quiet. She likes to sit in the sun. The two animals are happy together.",
      questions: [
        { q: "What colour is Max?", a: "brown and white", options: ["brown and white", "black", "all white"] },
        { q: "What does Max have?", a: "a long tail", options: ["a long tail", "short legs", "a hat"] },
        { q: "Is Max fast or slow?", a: "fast", options: ["fast", "slow", "sleepy"] },
        { q: "Who is Max’s friend?", a: "Lily", options: ["Lily", "Tom", "Sam"] },
        { q: "What does Lily like to do?", a: "sit in the sun", options: ["sit in the sun", "run fast", "carry a stick"] },
        { q: "How do Max and Lily feel?", a: "happy", options: ["happy", "sad", "angry"] }
      ]
    },
    discussion: {
      prompts: [
        "Do you know an animal? Tell about it.",
        "What colour is it? Is it big or small?",
        "Is it friendly? What can it do?"
      ]
    },
    writing: {
      prompt: "Choose an animal. Write 2–3 connected sentences.",
      frame: "It is…\nIt has…\nIt can…",
      minSentences: 2
    }
  },
  {
    id: 4,
    title: "What Happened?",
    theme: "Small Adventures",
    phase: 1,
    objective: "Use regular past tense (-ed) to talk and write about past events.",
    vocabulary: ["yesterday", "played", "looked", "found", "helped", "happy", "sad"],
    grammar: "Past simple regular verbs: played, looked, helped, walked.",
    speaking: {
      prompt: "Tell what happened yesterday. Use past tense. Start with “Yesterday…”.",
      model: "Yesterday I played with my toy. I looked for my ball. I found it.",
      tips: ["Use -ed words.", "Tell events in order."],
      followUps: ["What did you do first?", "How did you feel?", "Who helped you?"]
    },
    reading: {
      title: "Kim at the Park",
      text: "Yesterday Kim walked to the park. She played with her red ball. The ball went under a bush. Kim looked and looked. She was sad. Then her friend Ben came. Ben helped Kim. They looked together. Ben found the ball. Kim was happy. She said, “Thank you!” The two friends played until it was time to go home.",
      questions: [
        { q: "Where did Kim walk yesterday?", a: "to the park", options: ["to the park", "to school", "to the shop"] },
        { q: "What did she play with?", a: "her red ball", options: ["her red ball", "a book", "a bike"] },
        { q: "Where did the ball go?", a: "under a bush", options: ["under a bush", "in the bag", "on the roof"] },
        { q: "How did Kim feel when she could not find the ball?", a: "sad", options: ["sad", "happy", "hungry"] },
        { q: "Who helped Kim?", a: "Ben", options: ["Ben", "Max", "Sara"] },
        { q: "What did they do at the end?", a: "played", options: ["played", "slept", "cried"] }
      ]
    },
    discussion: {
      prompts: [
        "Have you ever lost something?",
        "What happened? Who helped you?",
        "How did you feel? What did you do next?"
      ]
    },
    writing: {
      prompt: "Write 3 connected sentences about something that happened yesterday.",
      frame: "Yesterday I…\nI looked…\nI found… / Someone helped…",
      minSentences: 3
    }
  },
  {
    id: 5,
    title: "Milestone Check 1",
    theme: "Helping Friends",
    phase: 1,
    milestone: "m1",
    objective: "Show complete sentences, because, past tense, and 2–4 connected sentences in writing.",
    vocabulary: ["help", "friend", "happy", "found", "played", "kind"],
    grammar: "Complete sentences; present and past; because.",
    speaking: {
      prompt: "Tell about a time you helped a friend or a friend helped you. Use full sentences and because.",
      model: "Yesterday I helped my friend. He lost his pencil. I found it under the table. He was happy because I helped.",
      tips: ["Full sentences.", "Use because.", "Tell what happened and how you felt."],
      followUps: ["Why did you help?", "How did your friend feel?"]
    },
    reading: {
      title: "Mia Helps Sam",
      text: "Yesterday Mia’s friend Sam was sad. He lost his favourite blue pencil. Mia wanted to help. She looked under the table. She looked in the bag. Then she looked behind the door. Mia found the pencil. Sam was happy. He said, “Thank you, Mia. You are a kind friend.” The two friends played together. Mia felt happy because she helped her friend.",
      questions: [
        { q: "Why was Sam sad?", a: "He lost his pencil", options: ["He lost his pencil", "He was hungry", "He was tired"] },
        { q: "What did Mia want to do?", a: "help", options: ["help", "play alone", "go home"] },
        { q: "Where did Mia look? (one place)", a: "under the table", options: ["under the table", "in the park", "at the shop"] },
        { q: "What did Mia find?", a: "the pencil", options: ["the pencil", "a ball", "a book"] },
        { q: "How did Sam feel at the end?", a: "happy", options: ["happy", "sad", "angry"] },
        { q: "Why did Mia feel happy?", a: "she helped her friend", options: ["she helped her friend", "she found a toy", "she went home"] }
      ]
    },
    discussion: {
      prompts: [
        "Is it good to help friends? Why?",
        "Tell about a time you were kind.",
        "How did the other person feel?"
      ]
    },
    writing: {
      prompt: "Write 3–4 connected sentences about helping a friend. Use past tense and because.",
      frame: "Yesterday…\nI looked… / I helped…\n… was happy because…",
      minSentences: 3
    }
  },
  {
    id: 6,
    title: "Main Idea & Details",
    theme: "Busy School Day",
    phase: 2,
    objective: "Find the main idea and important details in a short text.",
    vocabulary: ["main idea", "detail", "school", "learn", "together"],
    grammar: "Present simple; complete answers.",
    speaking: {
      prompt: "Tell about a busy day at school. What is the most important thing that happened?",
      model: "My busy day was at school. We learned about animals. The most important thing was reading a new book.",
      tips: ["Say the main idea first.", "Add one detail."],
      followUps: ["What did you do first?", "What was the most important part?"]
    },
    reading: {
      title: "A Busy Day",
      text: "Today is a busy day at school. First the children sit on the carpet. The teacher reads a story about a brave mouse. Next the children write about their favourite animal. Then they go outside and play. At the end of the day they pack their bags. Everyone feels tired but happy. Learning and playing make a good school day.",
      questions: [
        { q: "What is the main idea?", a: "a busy day at school", options: ["a busy day at school", "a mouse is lost", "children go home early"] },
        { q: "What does the teacher read?", a: "a story about a brave mouse", options: ["a story about a brave mouse", "a math book", "a letter"] },
        { q: "What do the children write about?", a: "their favourite animal", options: ["their favourite animal", "the weather", "their shoes"] },
        { q: "Where do they play?", a: "outside", options: ["outside", "in the library", "at home"] },
        { q: "How do they feel at the end?", a: "tired but happy", options: ["tired but happy", "angry", "hungry only"] },
        { q: "What makes a good school day?", a: "learning and playing", options: ["learning and playing", "only sleeping", "only shouting"] }
      ]
    },
    discussion: {
      prompts: [
        "What is the main idea of the story?",
        "Tell one important detail.",
        "What makes your school day good?"
      ]
    },
    writing: {
      prompt: "Write 3–4 sentences. First say the main idea of your day. Then add details.",
      frame: "My day was…\nFirst…\nThen…\nI felt…",
      minSentences: 3
    }
  },
  {
    id: 7,
    title: "Sequencing",
    theme: "First, Next, Then",
    phase: 2,
    objective: "Order events with first, next, then, finally.",
    vocabulary: ["first", "next", "then", "finally", "sequence"],
    grammar: "Sequence words; past or present.",
    speaking: {
      prompt: "Tell how you get ready for school. Use first, next, then, finally.",
      model: "First I wake up. Next I eat breakfast. Then I put on my shoes. Finally I go to school.",
      tips: ["Use sequence words.", "Keep order clear."],
      followUps: ["What do you do first?", "What do you do last?"]
    },
    reading: {
      title: "Making a Sandwich",
      text: "Lina wants a sandwich. First she washes her hands. Next she takes two pieces of bread. Then she puts cheese and tomato on the bread. After that she puts the bread together. Finally she eats her sandwich. It tastes good. Lina smiles because she made it herself.",
      questions: [
        { q: "What does Lina do first?", a: "washes her hands", options: ["washes her hands", "eats the sandwich", "puts on shoes"] },
        { q: "What does she take next?", a: "two pieces of bread", options: ["two pieces of bread", "a book", "a ball"] },
        { q: "What does she put on the bread?", a: "cheese and tomato", options: ["cheese and tomato", "only water", "toys"] },
        { q: "What does she do finally?", a: "eats her sandwich", options: ["eats her sandwich", "goes to sleep", "runs away"] },
        { q: "Why does Lina smile?", a: "she made it herself", options: ["she made it herself", "she is sad", "she lost it"] },
        { q: "Put in order: eat, wash hands, take bread", a: "wash hands → take bread → eat", options: ["wash hands → take bread → eat", "eat → wash hands → take bread", "take bread → eat → wash hands"] }
      ]
    },
    discussion: {
      prompts: [
        "How do you get ready for bed? Use first, next, then.",
        "Tell the steps to wash your hands.",
        "Why is order important?"
      ]
    },
    writing: {
      prompt: "Write 4 sentences about something you do step by step.",
      frame: "First…\nNext…\nThen…\nFinally…",
      minSentences: 4
    }
  },
  {
    id: 8,
    title: "Prediction",
    theme: "What Happens Next?",
    phase: 2,
    objective: "Predict what happens next and explain why.",
    vocabulary: ["predict", "next", "maybe", "because", "think"],
    grammar: "I think… because…",
    speaking: {
      prompt: "Look at this idea: A boy holds a balloon in the wind. What happens next? Why?",
      model: "I think the balloon will fly away because the wind is strong.",
      tips: ["Say I think…", "Give because."],
      followUps: ["What else could happen?", "Why do you think that?"]
    },
    reading: {
      title: "The Open Window",
      text: "It is a windy afternoon. Mia opens the window in her room. Papers are on her desk. A small toy car sits near the edge. Mia goes to the kitchen for a drink. The wind blows harder and harder. The curtains move fast. Something is about to happen on the desk.",
      questions: [
        { q: "What kind of day is it?", a: "windy", options: ["windy", "snowy", "hot and still"] },
        { q: "What does Mia open?", a: "the window", options: ["the window", "the door", "a book"] },
        { q: "Where are the papers?", a: "on her desk", options: ["on her desk", "under the bed", "outside"] },
        { q: "Where does Mia go?", a: "to the kitchen", options: ["to the kitchen", "to school", "to the park"] },
        { q: "What do you think happens next?", a: "papers fly / toy falls", options: ["papers fly / toy falls", "nothing happens", "it snows inside"] },
        { q: "Why might something fall?", a: "the wind is strong", options: ["the wind is strong", "Mia is hungry", "it is night"] }
      ]
    },
    discussion: {
      prompts: [
        "What do you think happens next in the story?",
        "Why do you think that?",
        "Have you ever left a window open on a windy day?"
      ]
    },
    writing: {
      prompt: "Write what you think happens next and why. Then write a different possible ending.",
      frame: "I think… because…\nMaybe…\nIn the end…",
      minSentences: 3
    }
  },
  {
    id: 9,
    title: "Simple Inference",
    theme: "Clues in the Story",
    phase: 2,
    objective: "Use clues to understand feelings and ideas not said directly.",
    vocabulary: ["clue", "feel", "infer", "because", "show"],
    grammar: "I know… because the text says…",
    speaking: {
      prompt: "A girl looks at a broken toy and is very quiet. How does she feel? What is your clue?",
      model: "I think she feels sad because her toy is broken and she is quiet.",
      tips: ["Use clues.", "Say because."],
      followUps: ["What is another clue?", "What could help her?"]
    },
    reading: {
      title: "Quiet Ken",
      text: "Ken sits alone at lunch. His sandwich is still in the box. He looks at the playground but does not run. His friends call his name. Ken shakes his head. He holds a paper with a low mark. His eyes look wet. After lunch the teacher talks to Ken softly. Ken nods and takes a deep breath.",
      questions: [
        { q: "Where does Ken sit?", a: "alone at lunch", options: ["alone at lunch", "with many friends", "on the bus"] },
        { q: "Does Ken eat his sandwich?", a: "no (still in the box)", options: ["no (still in the box)", "yes, all of it", "he shares it"] },
        { q: "What does Ken hold?", a: "a paper with a low mark", options: ["a paper with a low mark", "a new toy", "a big cake"] },
        { q: "How do you think Ken feels?", a: "sad / upset", options: ["sad / upset", "very happy", "sleepy only"] },
        { q: "What is a clue about his feelings?", a: "eyes look wet / alone / low mark", options: ["eyes look wet / alone / low mark", "he is laughing", "he is singing"] },
        { q: "What does the teacher do?", a: "talks to Ken softly", options: ["talks to Ken softly", "shouts", "leaves"] }
      ]
    },
    discussion: {
      prompts: [
        "How does Ken feel? What clues tell you?",
        "What could a friend do to help?",
        "When have you felt quiet like Ken?"
      ]
    },
    writing: {
      prompt: "Write how Ken feels and two clues from the text. Then write one kind thing a friend could do.",
      frame: "Ken feels… because…\nAnother clue is…\nA friend could…",
      minSentences: 3
    }
  },
  {
    id: 10,
    title: "Milestone Check 2",
    theme: "Story Detectives",
    phase: 2,
    milestone: "m2",
    objective: "Show main idea, details, sequence, prediction, and a short written response.",
    vocabulary: ["main idea", "sequence", "predict", "evidence", "because"],
    grammar: "Expanded answers with evidence.",
    speaking: {
      prompt: "Retell a short story you know. Say the main idea, two details, and what might happen next.",
      model: "The main idea is a boy loses his ball. First he plays. Then the ball goes under a tree. I think a friend will help because friends help.",
      tips: ["Main idea first.", "Use sequence.", "Predict with because."],
      followUps: ["What is your evidence?", "Why do you think that?"]
    },
    reading: {
      title: "The Missing Hat",
      text: "On a cold morning, Jin cannot find his warm hat. First he looks on the hook by the door. The hook is empty. Next he looks under his bed. He finds a sock but no hat. Then his sister points to the dog. The dog is sleeping on something soft and red. Jin laughs. He pulls the hat out carefully. The dog opens one eye. Jin puts on his hat and says thank you to his sister. He feels ready for school.",
      questions: [
        { q: "What is the main idea?", a: "Jin finds his missing hat", options: ["Jin finds his missing hat", "Jin goes swimming", "The dog runs away"] },
        { q: "Where does Jin look first?", a: "on the hook", options: ["on the hook", "at school", "in the fridge"] },
        { q: "What does he find under the bed?", a: "a sock", options: ["a sock", "the hat", "a book"] },
        { q: "Where is the hat?", a: "under the dog", options: ["under the dog", "on the roof", "in the bag"] },
        { q: "Who helps Jin notice the hat?", a: "his sister", options: ["his sister", "a teacher", "a stranger"] },
        { q: "How does Jin feel at the end?", a: "ready / happy", options: ["ready / happy", "angry", "lost"] }
      ]
    },
    discussion: {
      prompts: [
        "Retell the story in order.",
        "What might the dog do next?",
        "Have you ever lost something at home?"
      ]
    },
    writing: {
      prompt: "Write 4–6 sentences: main idea, what happened in order, and how Jin felt.",
      frame: "The main idea is…\nFirst…\nNext…\nThen…\nJin felt… because…",
      minSentences: 4
    }
  },
  {
    id: 11,
    title: "Sentence Combining",
    theme: "Putting Ideas Together",
    phase: 3,
    objective: "Join ideas with and, but, because, so.",
    vocabulary: ["and", "but", "because", "so", "combine"],
    grammar: "Compound ideas with conjunctions.",
    speaking: {
      prompt: "Join two ideas: I was tired. I finished my homework. Use because or but or so.",
      model: "I was tired, but I finished my homework. I finished my homework because I wanted to play.",
      tips: ["Use and / but / because / so.", "Keep full sentences."],
      followUps: ["Can you say it another way?"]
    },
    reading: {
      title: "Rainy Play",
      text: "Ali wanted to play outside, but it was raining. He felt sad because he loved the playground. His mum said they could build a fort inside, so Ali smiled. They used chairs and blankets. The fort was small but cosy. Ali was happy because he still had fun. Rainy days can be good if you have a plan.",
      questions: [
        { q: "Why didn’t Ali play outside?", a: "it was raining", options: ["it was raining", "he was sick", "school was closed"] },
        { q: "Why was Ali sad?", a: "he loved the playground", options: ["he loved the playground", "he lost a toy", "he was hungry"] },
        { q: "What did mum suggest?", a: "build a fort inside", options: ["build a fort inside", "go swimming", "sleep all day"] },
        { q: "What word joins “small” and “cosy”?", a: "but", options: ["but", "because", "so"] },
        { q: "Why was Ali happy in the end?", a: "he still had fun", options: ["he still had fun", "the rain stopped only", "he went out"] },
        { q: "What is a good idea on rainy days?", a: "have a plan inside", options: ["have a plan inside", "be angry", "do nothing"] }
      ]
    },
    discussion: {
      prompts: [
        "Join: I was hungry. I ate an apple. (because / so)",
        "Join: I wanted to run. It was icy. (but)",
        "Tell two ideas about your day using and or but."
      ]
    },
    writing: {
      prompt: "Write 4 sentences. Use and, but, because, or so at least twice.",
      frame: "I wanted… but…\nI felt… because…\n… so I…\nIn the end…",
      minSentences: 4
    }
  },
  {
    id: 12,
    title: "Descriptive Writing",
    theme: "Paint with Words",
    phase: 3,
    objective: "Write descriptions with adjectives and senses.",
    vocabulary: ["describe", "colour", "feel", "sound", "look"],
    grammar: "Adjective + noun; expanded noun phrases.",
    speaking: {
      prompt: "Describe a fruit or snack using colour, size, taste, and how it feels.",
      model: "My apple is bright red and round. It feels smooth. It tastes sweet and juicy.",
      tips: ["Use colour words.", "Say how it feels or tastes."],
      followUps: ["What does it look like?", "How does it taste?"]
    },
    reading: {
      title: "The Market Orange",
      text: "At the market, Yara sees a big orange. The orange is bright like a small sun. Its skin feels bumpy. When Yara peels it, a fresh smell fills the air. The inside is juicy and sweet. Juice runs down her fingers. Yara laughs because it tastes wonderful. She shares a piece with her dad. Descriptive words help us see, smell, and taste the orange in our minds.",
      questions: [
        { q: "What does Yara see?", a: "a big orange", options: ["a big orange", "a green apple", "a cake"] },
        { q: "What is the orange compared to?", a: "a small sun", options: ["a small sun", "a rock", "a book"] },
        { q: "How does the skin feel?", a: "bumpy", options: ["bumpy", "soft like silk", "wet"] },
        { q: "How does it taste?", a: "juicy and sweet", options: ["juicy and sweet", "salty", "bitter only"] },
        { q: "Why does Yara laugh?", a: "it tastes wonderful", options: ["it tastes wonderful", "she falls", "she is scared"] },
        { q: "What do descriptive words help us do?", a: "see, smell, and taste in our minds", options: ["see, smell, and taste in our minds", "run faster", "sleep"] }
      ]
    },
    discussion: {
      prompts: [
        "Describe your favourite food with three detail words.",
        "What does rain sound like?",
        "Describe a pet or soft toy without naming it."
      ]
    },
    writing: {
      prompt: "Describe one object or food in 4–6 sentences. Use colour, size, feel, and taste or sound.",
      frame: "I am looking at…\nIt is… and…\nIt feels…\nIt smells / tastes…\nI like it because…",
      minSentences: 4
    }
  },
  {
    id: 13,
    title: "Narrative Order",
    theme: "My Little Story",
    phase: 3,
    objective: "Write a short narrative with beginning, middle, and end.",
    vocabulary: ["beginning", "middle", "end", "suddenly", "after"],
    grammar: "Past tense narrative; sequence.",
    speaking: {
      prompt: "Tell a short true story with beginning, middle, and end.",
      model: "Yesterday I went to the park. Suddenly I saw a puppy. After I patted it, I felt happy.",
      tips: ["Beginning = where/when.", "Middle = problem or event.", "End = feeling or result."],
      followUps: ["What happened in the middle?", "How did it end?"]
    },
    reading: {
      title: "The Blue Kite",
      text: "One sunny morning, Noah took his blue kite to the hill. At first the wind was soft. Noah ran and the kite stayed low. Suddenly a strong wind lifted the kite high. Noah held the string tightly. The kite danced in the sky. After some time the wind became soft again. Noah brought the kite down carefully. He felt proud because he did not let go. It was a small adventure with a happy ending.",
      questions: [
        { q: "Where does the story begin?", a: "on the hill", options: ["on the hill", "at school", "in a shop"] },
        { q: "What colour is the kite?", a: "blue", options: ["blue", "red", "green"] },
        { q: "What happens suddenly?", a: "strong wind lifts the kite", options: ["strong wind lifts the kite", "it rains food", "Noah sleeps"] },
        { q: "What does Noah do?", a: "holds the string tightly", options: ["holds the string tightly", "lets go", "runs home at once"] },
        { q: "How does the story end?", a: "he brings the kite down / feels proud", options: ["he brings the kite down / feels proud", "the kite is lost forever", "he is angry"] },
        { q: "Why is Noah proud?", a: "he did not let go", options: ["he did not let go", "he broke the kite", "he stayed inside"] }
      ]
    },
    discussion: {
      prompts: [
        "What is the beginning of Noah’s story?",
        "What is the middle event?",
        "Tell your own beginning–middle–end story."
      ]
    },
    writing: {
      prompt: "Write a short story (6–8 sentences) with beginning, middle, and end.",
      frame: "One day…\nAt first…\nSuddenly…\nAfter that…\nIn the end…\nI felt… because…",
      minSentences: 6
    }
  },
  {
    id: 14,
    title: "Opinion Paragraphs",
    theme: "What I Think",
    phase: 3,
    objective: "State an opinion with reasons and a closing idea.",
    vocabulary: ["opinion", "I think", "because", "for example", "important"],
    grammar: "I think… because… For example…",
    speaking: {
      prompt: "Give your opinion: Is it important to help others? Why? Give an example.",
      model: "I think it is important to help others because it makes people happy. For example, I helped my brother with his shoes.",
      tips: ["Start with I think.", "Give because and an example."],
      followUps: ["What is another reason?", "How does helping feel?"]
    },
    reading: {
      title: "Helping Others",
      text: "Helping others is important. When we help, we make people feel happy and we feel good too. For example, last week Sara helped her little brother with his shoes. He was trying for a long time and looked sad. Sara knelt down and showed him how to push his foot in. Her brother smiled and said thank you. Another time Sam helped an old neighbour carry her heavy shopping bags. The neighbour was very grateful. Helping does not always need to be a big action. Even small kind actions matter. That is why many teachers say, “Be kind and help each other every day.”",
      questions: [
        { q: "What is the topic?", a: "helping others", options: ["helping others", "buying shoes", "going shopping only"] },
        { q: "What is one example of helping?", a: "Sara helped with shoes", options: ["Sara helped with shoes", "Sara ran away", "Sam slept"] },
        { q: "How did Sara’s brother feel after?", a: "he smiled", options: ["he smiled", "he cried more", "he left"] },
        { q: "What did Sam do?", a: "helped carry bags", options: ["helped carry bags", "took the bags home alone", "ignored the neighbour"] },
        { q: "Does helping always need to be big?", a: "no", options: ["no", "yes always", "only at school"] },
        { q: "Why is helping important?", a: "people feel happy / we feel good", options: ["people feel happy / we feel good", "it is noisy", "it is fast only"] }
      ]
    },
    discussion: {
      prompts: [
        "Why is it important to help others?",
        "Give an example from your life.",
        "How did the other person feel? How did you feel?"
      ]
    },
    writing: {
      prompt: "Write an organized short paragraph about helping others: topic, 2–3 details, closing.",
      frame: "I think helping is important because…\nFor example…\nAnother time…\nThat is why…",
      minSentences: 5
    }
  },
  {
    id: 15,
    title: "Milestone Check 3",
    theme: "A Surprising Discovery",
    phase: 3,
    milestone: "m3",
    objective: "Write an organized paragraph and explain ideas with details and because.",
    vocabulary: ["surprising", "discovery", "amazing", "detail"],
    grammar: "Organized paragraph; expanded explanations.",
    speaking: {
      prompt: "Tell about a surprising thing you found or saw. Explain what happened, how you felt, and why it was surprising.",
      model: "I found a shiny stone in the garden. I felt excited because I had never seen one like it. It was surprising because it looked like glass.",
      tips: ["What happened?", "How did you feel?", "Why was it surprising?"],
      followUps: ["Give one more detail.", "What did you do next?"]
    },
    reading: {
      title: "Lily’s Discovery",
      text: "One afternoon while walking in the garden, Lily made a surprising discovery. She saw something shiny under a leaf. She knelt down carefully. It was a small, beautiful stone that looked like glass. The stone was blue and green and caught the sunlight. Lily felt excited. She had never seen anything like it. She showed the stone to her brother. He said it might be a special rock from a river. Lily decided to keep it in a little box. She looked at it every day. The discovery made her want to look more carefully when she was outside. She learned that amazing things can be found in ordinary places if you pay attention.",
      questions: [
        { q: "What is the main idea?", a: "Lily finds a surprising stone", options: ["Lily finds a surprising stone", "Lily loses her bag", "Lily stays inside"] },
        { q: "What did Lily find?", a: "a small beautiful stone", options: ["a small beautiful stone", "a toy car", "a letter"] },
        { q: "Where did she find it?", a: "under a leaf", options: ["under a leaf", "on a roof", "in a shop"] },
        { q: "How did she feel?", a: "excited", options: ["excited", "angry", "bored"] },
        { q: "What did her brother say?", a: "it might be from a river", options: ["it might be from a river", "throw it away", "it is plastic"] },
        { q: "What did Lily learn?", a: "amazing things can be found if you pay attention", options: ["amazing things can be found if you pay attention", "never go outside", "stones are boring"] }
      ]
    },
    discussion: {
      prompts: [
        "Have you ever found something surprising?",
        "Why was it surprising?",
        "What did you do with it?"
      ]
    },
    writing: {
      prompt: "Write an organized paragraph (6–8 sentences) about Lily’s discovery or your own. Topic, details, closing. Then fix one capital or full stop.",
      frame: "One day…\nI saw…\nIt was surprising because…\nI felt…\nIn the end…",
      minSentences: 6
    }
  },
  {
    id: 16,
    title: "Unfamiliar Texts",
    theme: "Dinosaur Discoveries",
    phase: 4,
    objective: "Read a longer informational text; give main idea, details, and a short summary.",
    vocabulary: ["dinosaur", "fossil", "discover", "huge", "ancient", "scientist"],
    grammar: "Summary language; The text says…",
    speaking: {
      prompt: "In three or four sentences, tell the main idea and important details about dinosaurs from the text. Then say one interesting thing and why.",
      model: "The main idea is that scientists learn about dinosaurs from fossils. Fossils are remains in rocks. I think long necks are interesting because they are so different.",
      tips: ["Main idea + details.", "Add your interest + because."],
      followUps: ["What is a fossil?", "Why do children like dinosaurs?"]
    },
    reading: {
      title: "Dinosaur Fossils",
      text: "Long ago, huge dinosaurs walked on the Earth. Some dinosaurs ate plants and some ate meat. They lived millions of years ago. Today scientists discover dinosaur fossils in rocks. Fossils are the hard remains of ancient animals. When scientists find a fossil, they study it carefully. The fossils give evidence about how dinosaurs looked and how they lived. Some fossils show long necks or sharp teeth. One famous discovery was a nearly complete skeleton. It helped scientists learn that some dinosaurs stood on two legs. Children often love learning about dinosaurs because they were so big and different from animals today. Museums display the fossils so everyone can see them. Discovering fossils is like solving a mystery from the ancient past.",
      questions: [
        { q: "What is the main idea?", a: "scientists learn about dinosaurs from fossils", options: ["scientists learn about dinosaurs from fossils", "all dinosaurs fly", "dinosaurs live in zoos now"] },
        { q: "What are fossils?", a: "hard remains of ancient animals", options: ["hard remains of ancient animals", "new toys", "plants only"] },
        { q: "What do scientists do with fossils?", a: "study them carefully", options: ["study them carefully", "throw them away", "eat them"] },
        { q: "What can fossils tell us?", a: "how dinosaurs looked and lived", options: ["how dinosaurs looked and lived", "tomorrow’s weather", "school times"] },
        { q: "Why do many children like dinosaurs?", a: "they were big and different", options: ["they were big and different", "they are soft pets", "they are tiny"] },
        { q: "How is finding fossils like a mystery?", a: "each fossil can change what we know", options: ["each fossil can change what we know", "it is always easy", "there are no clues"] }
      ]
    },
    discussion: {
      prompts: [
        "What do you find most interesting about dinosaurs? Why?",
        "Would you like to find a fossil? What would you hope to discover?"
      ]
    },
    writing: {
      prompt: "Write an independent paragraph (7–9 sentences) about dinosaurs or a discovery you would like to make.",
      frame: "Dinosaurs are interesting because…\nThe text says…\nI would like to discover… because…\nIn the end…",
      minSentences: 7
    }
  },
  {
    id: 17,
    title: "Comparing",
    theme: "Two Different Heroes",
    phase: 4,
    objective: "Compare two people using both / but and give an opinion with because.",
    vocabulary: ["hero", "brave", "kind", "different", "similar", "both"],
    grammar: "both… / but…; I think… because…",
    speaking: {
      prompt: "Compare a firefighter and a nurse. How are they the same and different? Which is more important to you and why?",
      model: "Both help people. Both need to be calm. But firefighters work in dangerous places, and nurses work with patients. I think both are important because…",
      tips: ["Use both and but.", "Give your opinion with because."],
      followUps: ["How are they the same?", "How are they different?"]
    },
    reading: {
      title: "Kinds of Heroes",
      text: "There are many kinds of heroes. One hero is a firefighter. Firefighters are brave. They run into burning buildings to save people and animals. They wear special heavy clothes and helmets. Another hero is a nurse. Nurses are kind and careful. They help sick people feel better. They work long hours in hospitals. Both firefighters and nurses help people. Both need to be strong and calm. But their jobs are different. Firefighters often work outside in dangerous places. Nurses usually work inside with patients. Real heroes can be anyone who helps others when it is difficult. Being brave and being kind are both important.",
      questions: [
        { q: "What is one thing firefighters do?", a: "save people from fires", options: ["save people from fires", "bake bread only", "drive buses only"] },
        { q: "What is one thing nurses do?", a: "help sick people", options: ["help sick people", "put out fires", "build houses"] },
        { q: "How are they the same?", a: "both help people", options: ["both help people", "both fly planes", "both stay home"] },
        { q: "How are they different?", a: "place / type of work", options: ["place / type of work", "they never help", "they are the same in every way"] },
        { q: "What makes a real hero according to the text?", a: "helping when it is difficult", options: ["helping when it is difficult", "being famous only", "having a cape"] },
        { q: "Why are both brave and kind important?", a: "heroes need both", options: ["heroes need both", "only speed matters", "only height matters"] }
      ]
    },
    discussion: {
      prompts: [
        "Who is a hero to you? Why?",
        "Compare two people who help others. Use both and but."
      ]
    },
    writing: {
      prompt: "Write a comparison paragraph (7–9 sentences). Use both and but. Give your opinion.",
      frame: "Both… and… help people.\nBoth…\nBut…\nI think… is important because…\nIn the end…",
      minSentences: 7
    }
  },
  {
    id: 18,
    title: "Summarizing",
    theme: "Weather Adventures",
    phase: 4,
    objective: "Summarize a text in 3–4 sentences and write a personal response.",
    vocabulary: ["weather", "storm", "adventure", "exciting", "careful", "summary"],
    grammar: "Summary starters; independent paragraph.",
    speaking: {
      prompt: "Summarize the weather story in three or four sentences. Then connect it to your life.",
      model: "Maya and her father were caught in heavy rain. They waited in a bus shelter. At home they got warm. I also felt excited in a storm once because…",
      tips: ["Only important points.", "Then your connection."],
      followUps: ["What did Maya learn?", "How did she feel?"]
    },
    reading: {
      title: "A Rainy Walk",
      text: "Weather can create unexpected adventures. One windy day the sky turned dark grey. Strong wind blew leaves along the street. Maya and her father were walking home from the shop. Suddenly heavy rain started to fall. They did not have an umbrella. They ran to a bus shelter and waited. The rain made loud sounds on the roof. Maya felt a little scared but also excited. After twenty minutes the rain became lighter. They walked carefully through small puddles. At home they changed into dry clothes and drank warm tea. Maya’s father said sometimes bad weather makes an ordinary walk into a small adventure. Maya learned it is smart to check the weather before going far from home.",
      questions: [
        { q: "What is the main idea?", a: "weather can turn a walk into an adventure", options: ["weather can turn a walk into an adventure", "Maya stays inside always", "tea is bad"] },
        { q: "What happened to the weather?", a: "heavy rain started", options: ["heavy rain started", "it snowed cats", "it became sunny only"] },
        { q: "Where did they wait?", a: "bus shelter", options: ["bus shelter", "school", "beach"] },
        { q: "How did Maya feel?", a: "a little scared but excited", options: ["a little scared but excited", "only angry", "bored"] },
        { q: "What did they do at home?", a: "dry clothes and warm tea", options: ["dry clothes and warm tea", "went out again at once", "slept in wet clothes"] },
        { q: "What did Maya learn?", a: "check the weather before going far", options: ["check the weather before going far", "never walk", "rain is always fun with no care"] }
      ]
    },
    discussion: {
      prompts: [
        "Summarize the story in your own words.",
        "Have you been outside in surprising weather?",
        "What do you like or dislike about storms? Why?"
      ]
    },
    writing: {
      prompt: "Write a 3–4 sentence summary. Then write a 4–6 sentence paragraph about a weather experience.",
      frame: "Summary: …\nMy experience: One day…\nI felt… because…\nI learned…",
      minSentences: 7
    }
  },
  {
    id: 19,
    title: "Problem Solving",
    theme: "Problem-Solving Adventure",
    phase: 4,
    objective: "Explain problem, steps, and why a solution worked.",
    vocabulary: ["problem", "solve", "solution", "careful", "calm"],
    grammar: "Sequence of steps; because.",
    speaking: {
      prompt: "Explain how Ben and his sister solved their problem. Use first, next, then, finally and why it worked.",
      model: "First they looked for marks. Next they listened for the road. Then they walked left. It worked because they stayed calm and used their ears.",
      tips: ["Name the problem.", "List steps.", "Say why it worked."],
      followUps: ["How did Ben feel at first?", "What advice did the sister give?"]
    },
    reading: {
      title: "Two Paths",
      text: "Ben and his sister faced a problem during their walk in the woods. They were following a path but then the path split into two. They did not know which way led back to the car park. Ben felt worried. His sister stayed calm. She said, “Let’s think carefully.” First they looked for familiar trees or marks. They could not see any. Next they listened for the sound of the road. They heard a faint car noise to the left. Then they decided to walk slowly in that direction while staying together. Finally they saw the car park through the trees. They felt relieved and proud. Ben said they solved the problem because they stayed calm and used their ears. His sister added it is wise to tell an adult where you are going.",
      questions: [
        { q: "What problem did they have?", a: "path split / way back unclear", options: ["path split / way back unclear", "they lost a kite", "it was night only"] },
        { q: "How did Ben feel at first?", a: "worried", options: ["worried", "bored", "angry at birds"] },
        { q: "What did they do first?", a: "looked for marks", options: ["looked for marks", "ran different ways", "shouted only"] },
        { q: "What helped them choose a direction?", a: "sound of the road", options: ["sound of the road", "a map on a phone they did not have", "a bird talking"] },
        { q: "How did they feel at the end?", a: "relieved and proud", options: ["relieved and proud", "more lost", "sleepy only"] },
        { q: "Why was the solution successful?", a: "stayed calm and used ears", options: ["stayed calm and used ears", "they guessed randomly", "they split up"] }
      ]
    },
    discussion: {
      prompts: [
        "Have you faced a small problem? What did you do?",
        "What would you do differently next time?",
        "Why is staying calm useful?"
      ]
    },
    writing: {
      prompt: "Write 8–10 sentences about a problem you solved or Ben’s story: problem, steps, why it worked.",
      frame: "The problem was…\nFirst…\nNext…\nThen…\nFinally…\nIt worked because…\nI learned…",
      minSentences: 8
    }
  },
  {
    id: 20,
    title: "Final Assessment",
    theme: "Looking Back and Looking Forward",
    phase: 4,
    milestone: "final",
    objective: "Show growth: extended speaking, deeper reading, independent paragraph.",
    vocabulary: ["progress", "confident", "independent", "summary", "opinion"],
    grammar: "All prior structures; extended independent responses.",
    speaking: {
      prompt: "Tell about something important you learned or a favourite activity. Explain why it is important, give at least two details, and say how you have improved. Use full expanded sentences.",
      model: "I learned to write paragraphs. It is important because I can explain my ideas. I use because and details now. I feel more confident than before.",
      tips: ["Explain why.", "Give two details.", "Say how you improved."],
      followUps: ["How have you changed in English?", "What do you want to practise next?"]
    },
    reading: {
      title: "Omar and the Kitten",
      text: "Last month Omar found a small lost kitten near the school gate. The kitten was grey and thin. It looked scared and hungry. Omar wanted to help. He carefully picked up the kitten and took it to the school office. The teacher gave the kitten some water and called the animal helper. Omar waited. He felt worried but also hopeful. After a short time the animal helper arrived. She thanked Omar and said the kitten would be safe. Omar felt proud because he had helped an animal in need. The next week the teacher told the class that the kitten had found a warm home. Omar smiled. He learned that even small actions can make a big difference. He decided he would always try to help when he saw someone or something that needed care.",
      questions: [
        { q: "What is the main idea?", a: "Omar helps a lost kitten", options: ["Omar helps a lost kitten", "Omar buys a cat", "Omar ignores the gate"] },
        { q: "What did the kitten look like?", a: "grey and thin", options: ["grey and thin", "big and orange", "happy and fat"] },
        { q: "What did Omar do first?", a: "picked up the kitten / took it to the office", options: ["picked up the kitten / took it to the office", "ran away", "shouted only"] },
        { q: "How did Omar feel while waiting?", a: "worried but hopeful", options: ["worried but hopeful", "angry", "bored"] },
        { q: "What happened to the kitten at the end?", a: "found a warm home", options: ["found a warm home", "stayed lost", "went to the park alone"] },
        { q: "Why did Omar feel proud?", a: "he helped an animal in need", options: ["he helped an animal in need", "he won a race", "he slept"] },
        { q: "What did Omar learn?", a: "small actions can make a big difference", options: ["small actions can make a big difference", "never help", "kittens are toys"] }
      ]
    },
    discussion: {
      prompts: [
        "Why is it important to help others or animals?",
        "Tell about a time you helped or were helped.",
        "How have you grown in English since you started?"
      ]
    },
    writing: {
      prompt: "Write an independent organized paragraph (8–10 sentences) about helping or how you improved in English. Topic, details, because, closing.",
      frame: "I have grown in English because…\nFor example…\nI can now…\nI still want to…\nIn the end I feel…",
      minSentences: 8
    }
  }
];
