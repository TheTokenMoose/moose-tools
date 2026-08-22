/**
 * Writing Prompt Generator — level-aware banks
 * K prompts: short, concrete. Higher grades: more structure.
 */
window.WPG = {
  genres: [
    { id: "narrative", label: "Narrative" },
    { id: "informational", label: "Informational" },
    { id: "opinion", label: "Opinion" },
    { id: "howto", label: "How-to" },
    { id: "descriptive", label: "Descriptive" },
  ],
  levels: [
    { id: "k", label: "Kindergarten" },
    { id: "g1", label: "Grade 1" },
    { id: "g2", label: "Grade 2" },
    { id: "g3", label: "Grade 3+" },
  ],
  topics: [
    { id: "animals", label: "Animals" },
    { id: "space", label: "Space" },
    { id: "school", label: "School" },
    { id: "ocean", label: "Ocean" },
    { id: "weather", label: "Weather" },
    { id: "friendship", label: "Friendship" },
    { id: "custom", label: "Custom" },
  ],

  /** prompts[genre][topic][level] = string[] */
  prompts: {},
  starters: {},
  vocab: {},
  challenges: {},
  draw: {},
};

(function build() {
  const P = WPG.prompts;
  const S = WPG.starters;
  const V = WPG.vocab;
  const C = WPG.challenges;
  const D = WPG.draw;

  function set(genre, topic, level, prompts, starters, vocab, challenge, draw) {
    P[genre] = P[genre] || {};
    P[genre][topic] = P[genre][topic] || {};
    P[genre][topic][level] = prompts;
    S[genre] = S[genre] || {};
    S[genre][topic] = S[genre][topic] || {};
    S[genre][topic][level] = starters;
    V[genre] = V[genre] || {};
    V[genre][topic] = V[genre][topic] || {};
    V[genre][topic][level] = vocab;
    C[genre] = C[genre] || {};
    C[genre][topic] = C[genre][topic] || {};
    C[genre][topic][level] = challenge;
    D[genre] = D[genre] || {};
    D[genre][topic] = D[genre][topic] || {};
    D[genre][topic][level] = draw;
  }

  // —— NARRATIVE · ANIMALS ——
  set("narrative", "animals", "k",
    ["A cat finds a big box. What is inside?", "A dog goes for a walk. What does the dog see?", "You are a little bird. Where do you fly?"],
    ["I see…", "My animal is…", "Then…", "I like…"],
    ["cat", "dog", "bird", "big", "little", "happy", "run", "fly"],
    ["Add one sound your animal makes."],
    ["Draw your animal and the box or place."]
  );
  set("narrative", "animals", "g1",
    ["A rabbit finds a map in the garden. Where does it go?", "You wake up as a lion for one day. What happens?", "A penguin visits your classroom. Tell the story."],
    ["First…", "Next…", "Suddenly…", "At the end…", "I felt…"],
    ["rabbit", "map", "garden", "lion", "roar", "penguin", "surprise", "friend"],
    ["Write what your animal learns."],
    ["Draw the most exciting moment."]
  );
  set("narrative", "animals", "g2",
    ["Two animals who are very different become friends. Tell their story.", "An animal loses something important. How do they find it?", "You and a talking fox go on a short adventure."],
    ["In the beginning…", "The problem was…", "Then we…", "Finally…", "I learned…"],
    ["adventure", "problem", "together", "brave", "lost", "found", "forest", "clever"],
    ["Add dialogue between the characters."],
    ["Draw a map of the adventure."]
  );
  set("narrative", "animals", "g3",
    ["Write a story where an animal must choose between staying safe and helping a friend.", "A rare animal appears in the city. What happens next?", "Retell a day in the life of an animal from its point of view."],
    ["The day began when…", "However…", "Because of this…", "In the end…", "Looking back…"],
    ["habitat", "decision", "courage", "protect", "journey", "discover", "perspective"],
    ["Include a clear problem and solution."],
    ["Sketch the setting in detail."]
  );

  // NARRATIVE · SPACE
  set("narrative", "space", "k",
    ["You fly to the moon. What do you see?", "A rocket goes up, up, up! Who is inside?", "A star falls near your house. What do you do?"],
    ["I go to…", "I see…", "It is…", "I feel…"],
    ["moon", "star", "rocket", "sky", "night", "bright"],
    ["Name one thing you bring to space."],
    ["Draw your rocket."]
  );
  set("narrative", "space", "g1",
    ["You land on a new planet. Who do you meet?", "An astronaut loses a glove in space. Tell the story.", "A friendly alien visits Earth for one day."],
    ["First we landed…", "Then I met…", "We wanted to…", "At last…"],
    ["planet", "alien", "astronaut", "space", "float", "explore", "helmet"],
    ["Describe how the alien says hello."],
    ["Draw the new planet."]
  );
  set("narrative", "space", "g2",
    ["Your class takes a trip on a spaceship. Something goes wrong — then right.", "You find a message from space. What does it say and what do you do?", "Two friends build a rocket in the backyard that actually works."],
    ["We boarded the ship when…", "Suddenly…", "Our plan was…", "In the end…"],
    ["mission", "message", "galaxy", "crew", "repair", "landing", "signal"],
    ["Add a small problem the crew solves together."],
    ["Draw the spaceship interior."]
  );
  set("narrative", "space", "g3",
    ["Write a story about the first child to live on Mars for a month.", "A satellite picks up a strange signal. Follow the mystery.", "Compare life on Earth and a made-up planet through a short narrative."],
    ["The journey started…", "Unlike Earth…", "The challenge was…", "What mattered most was…"],
    ["colony", "signal", "oxygen", "research", "adapt", "mystery", "horizon"],
    ["Use sensory details for the planet environment."],
    ["Design a postcard from space."]
  );

  // NARRATIVE · SCHOOL / OCEAN / WEATHER / FRIENDSHIP — compact but real
  set("narrative", "school", "k", ["Something funny happens at school. What is it?", "You share your favourite toy at school. What happens?"], ["At school…", "My friend…", "We…", "I like…"], ["school", "friend", "play", "share", "happy"], ["Say who helped you."], ["Draw your classroom."]);
  set("narrative", "school", "g1", ["The classroom pet escapes for a little while. Tell the story.", "You are the teacher for one lesson. What do you do?"], ["In the morning…", "Then…", "Everyone…", "At the end of the day…"], ["classroom", "pet", "lesson", "laugh", "help", "recess"], ["Add what you learned."], ["Draw the funny moment."]);
  set("narrative", "school", "g2", ["A new student joins your class. Tell how you help them feel welcome.", "The school has a mystery day. What do you discover?"], ["When the new student arrived…", "I decided to…", "Together we…", "By the end…"], ["welcome", "mystery", "discover", "together", "kind", "curious"], ["Include how someone felt."], ["Draw a welcome poster."]);
  set("narrative", "school", "g3", ["Write about a school event that does not go as planned — and how students fix it.", "A student finds a locked box in the library."], ["Everything seemed normal until…", "Our idea was…", "After several tries…", "We realised…"], ["event", "unexpected", "cooperate", "library", "clue", "solution"], ["Show character change."], ["Map the school mystery."]);

  set("narrative", "ocean", "k", ["You swim with a fish. What do you see?", "A crab finds a shiny shell."], ["In the water…", "I see…", "The fish…", "I like…"], ["fish", "crab", "shell", "blue", "swim", "wave"], ["Name a sea animal."], ["Draw the ocean."]);
  set("narrative", "ocean", "g1", ["A boat is lost in the fog. Who helps?", "You find a message in a bottle on the beach."], ["On the beach…", "Inside the bottle…", "We tried to…", "Finally…"], ["boat", "fog", "bottle", "message", "beach", "help"], ["What does the message say?"], ["Draw the bottle."]);
  set("narrative", "ocean", "g2", ["A dolphin needs help. Tell how you and a friend respond.", "Explore an underwater cave — carefully!"], ["Deep under the water…", "We noticed…", "The problem was…", "Safe on shore…"], ["dolphin", "cave", "coral", "careful", "rescue", "current"], ["Add one ocean fact in your story."], ["Draw the underwater cave."]);
  set("narrative", "ocean", "g3", ["Write from the point of view of a sea turtle on a long journey.", "A storm hits the coast. How does a community help?"], ["My journey began…", "Along the way…", "When the storm came…", "What I will always remember…"], ["journey", "current", "community", "shelter", "protect", "coast"], ["Blend story with real ocean knowledge."], ["Illustrate the journey path."]);

  set("narrative", "weather", "k", ["It rains and you jump in puddles. What happens?", "The wind blows your hat away!"], ["It is…", "I go…", "My hat…", "I feel…"], ["rain", "puddle", "wind", "hat", "cold", "fun"], ["Say if you got wet."], ["Draw the weather."]);
  set("narrative", "weather", "g1", ["A big storm comes while you are at a picnic.", "Snow day! What do you build?"], ["The sky turned…", "We hurried…", "I built…", "When it was over…"], ["storm", "picnic", "snow", "build", "cloud", "safe"], ["Describe the sound of the weather."], ["Draw your snow creation."]);
  set("narrative", "weather", "g2", ["Your town has the hottest day of the year. Tell a small adventure.", "Fog makes everything look different on the way to school."], ["Nobody expected…", "Because of the weather…", "We solved it by…", "Looking back…"], ["temperature", "fog", "adventure", "prepare", "unusual"], ["Explain one way people stay safe."], ["Draw the foggy street."]);
  set("narrative", "weather", "g3", ["Write a story where the weather changes the characters’ plans in an important way.", "A weather reporter is stuck in the story they are covering."], ["Our plan depended on…", "As conditions changed…", "We had to adapt…", "The real story was…"], ["forecast", "adapt", "conditions", "reporter", "impact"], ["Show cause and effect clearly."], ["Design a weather map for the story."]);

  set("narrative", "friendship", "k", ["You and a friend share a snack. Tell about it.", "Someone is sad. How do you help?"], ["My friend…", "We share…", "I help…", "We feel…"], ["friend", "share", "kind", "sad", "happy", "help"], ["Say a kind word you used."], ["Draw you and your friend."]);
  set("narrative", "friendship", "g1", ["You make a new friend at the park.", "Friends disagree about a game. How do you fix it?"], ["At the park…", "We both wanted…", "So we…", "After that…"], ["park", "new", "disagree", "listen", "fair", "play"], ["Show how you listened."], ["Draw the park scene."]);
  set("narrative", "friendship", "g2", ["A friend moves away. Write about staying connected.", "You and a friend work as a team to finish a hard job."], ["When I heard the news…", "We decided…", "Working together…", "I am glad because…"], ["move", "letter", "team", "effort", "support", "proud"], ["Include a feeling and an action."], ["Draw a memory with your friend."]);
  set("narrative", "friendship", "g3", ["Write about a time friendship required honesty.", "Two friends with different interests learn from each other."], ["At first I thought…", "Being honest meant…", "What surprised me…", "Our friendship grew because…"], ["honesty", "trust", "difference", "respect", "grow"], ["Show both sides of the friendship."], ["Create a symbol of your friendship."]
  );

  // —— OPINION (sample topics expanded similarly) ——
  set("opinion", "animals", "k", ["What is the best pet? Tell why.", "Do you like cats or dogs more?"], ["I like…", "Because…", "My pet…", "It is best…"], ["pet", "cat", "dog", "best", "love", "soft"], ["Name one thing your pet can do."], ["Draw your favourite pet."]);
  set("opinion", "animals", "g1", ["Should every child have a pet? Why or why not?", "Zoos are good for animals — yes or no? Explain."], ["I think…", "One reason is…", "Also…", "That is why…"], ["zoo", "care", "home", "reason", "think", "because"], ["Give two reasons."], ["Draw the animal you talked about."]);
  set("opinion", "animals", "g2", ["Is it better to watch animals in the wild or at a zoo?", "Should people keep wild animals as pets?"], ["In my opinion…", "First…", "Second…", "For these reasons…"], ["wild", "habitat", "opinion", "protect", "responsible"], ["Address one opposite idea."], ["Poster: your opinion in one picture."]);
  set("opinion", "animals", "g3", ["Argue whether animals should perform in shows.", "Should endangered animals be kept in special parks?"], ["I firmly believe…", "Evidence suggests…", "Others may say…", "Nevertheless…"], ["endangered", "welfare", "evidence", "ethical", "conserve"], ["Include a counterargument."], ["Design an opinion campaign poster."]);

  set("opinion", "school", "k", ["What is the best part of school?", "Is recess the best time? Why?"], ["The best is…", "I like…", "Because…"], ["recess", "play", "learn", "best", "fun"], ["Name one friend at school."], ["Draw recess."]);
  set("opinion", "school", "g1", ["Should homework be shorter? Explain.", "Is reading or maths more fun for you?"], ["I believe…", "My reason…", "For example…", "So I think…"], ["homework", "reading", "maths", "example", "fun"], ["Give a classroom example."], ["Draw your favourite subject."]);
  set("opinion", "school", "g2", ["Should students help make classroom rules?", "Is group work better than working alone?"], ["Students should…", "One benefit is…", "On the other hand…", "Overall…"], ["rules", "group", "benefit", "alone", "fair"], ["List two benefits."], ["Draw your ideal classroom."]);
  set("opinion", "school", "g3", ["Should schools start later in the morning?", "Is technology in class always helpful?"], ["The stronger argument is…", "Research and experience show…", "Critics claim…", "Therefore…"], ["schedule", "technology", "focus", "balance", "policy"], ["Use a clear thesis sentence."], ["Infographic of your main points."]);

  // Fill remaining opinion topics with solid short banks
  ["space","ocean","weather","friendship"].forEach(function(topic) {
    set("opinion", topic, "k",
      ["What do you like about " + topic + "?", "Tell one thing you love and why."],
      ["I like…", "Because…", "It is…"],
      ["like", "love", "best", "fun", topic],
      ["Say one more reason."],
      ["Draw what you like."]
    );
    set("opinion", topic, "g1",
      ["Is " + topic + " interesting? Explain why.", "What is the best thing about " + topic + "?"],
      ["I think…", "One reason…", "Also…", "That is why…"],
      ["interesting", "reason", "because", "best", topic],
      ["Give two reasons."],
      ["Draw your idea."]
    );
    set("opinion", topic, "g2",
      ["Should people learn more about " + topic + "? Why?", "What is more important about " + topic + " — fun or learning?"],
      ["In my opinion…", "First…", "Second…", "For these reasons…"],
      ["important", "learn", "opinion", "reason", topic],
      ["Address another view briefly."],
      ["Poster of your opinion."]
    );
    set("opinion", topic, "g3",
      ["Write a persuasive paragraph about why " + topic + " matters.", "Take a side on a debate related to " + topic + "."],
      ["I argue that…", "Supporting this…", "Although some disagree…", "In conclusion…"],
      ["persuade", "support", "disagree", "conclusion", topic],
      ["Include a counterargument."],
      ["Design a persuasive visual."]
    );
  });

  // —— INFORMATIONAL ——
  function infoFill(topic, kFacts, g1, g2, g3) {
    set("informational", topic, "k", kFacts.p, kFacts.s, kFacts.v, kFacts.c, kFacts.d);
    set("informational", topic, "g1", g1.p, g1.s, g1.v, g1.c, g1.d);
    set("informational", topic, "g2", g2.p, g2.s, g2.v, g2.c, g2.d);
    set("informational", topic, "g3", g3.p, g3.s, g3.v, g3.c, g3.d);
  }
  infoFill("animals",
    { p: ["Tell three facts about cats.", "What do fish need?"], s: ["Cats can…", "Fish need…", "They live…"], v: ["fact", "need", "live", "eat", "animal"], c: ["Add one more fact."], d: ["Draw the animal."] },
    { p: ["Write facts about your favourite animal.", "How do birds stay safe?"], s: ["One fact is…", "Also…", "They need…", "In the wild…"], v: ["habitat", "feathers", "safe", "prey", "diet"], c: ["Include where it lives."], d: ["Label a diagram."] },
    { p: ["Explain how an animal is adapted to its home.", "Compare two animals."], s: ["This animal lives…", "It is adapted because…", "Unlike…", "In summary…"], v: ["adapt", "compare", "feature", "survive"], c: ["Use a because sentence."], d: ["Venn diagram of two animals."] },
    { p: ["Research-style paragraph: life cycle of an animal you choose.", "Explain a food chain with your animal in it."], s: ["The life cycle begins…", "Next…", "In the food chain…", "This shows that…"], v: ["life cycle", "food chain", "predator", "ecosystem"], c: ["Cite one real fact you know."], d: ["Life cycle diagram."] }
  );
  infoFill("space",
    { p: ["Name things in the sky at night.", "What is the sun?"], s: ["I see…", "The sun is…", "Stars are…"], v: ["sun", "moon", "star", "night", "sky"], c: ["Add the moon."], d: ["Draw night sky."] },
    { p: ["Write facts about the moon.", "What does an astronaut need?"], s: ["The moon…", "Astronauts need…", "In space…"], v: ["astronaut", "helmet", "planet", "orbit"], c: ["One tool astronauts use."], d: ["Label a spacesuit."] },
    { p: ["Explain day and night.", "Describe the planets you know."], s: ["Day happens when…", "Night happens when…", "Planets…", "Interesting fact…"], v: ["rotate", "planet", "solar system", "orbit"], c: ["Use the word orbit."], d: ["Solar system sketch."] },
    { p: ["Explain gravity in simple terms with an example.", "Compare Earth and another planet."], s: ["Gravity is…", "For example…", "Compared to Earth…", "Overall…"], v: ["gravity", "atmosphere", "distance", "compare"], c: ["Include a real measurement if you know one."], d: ["Comparison chart."] }
  );
  infoFill("school",
    { p: ["What do we do at school?", "Who helps at school?"], s: ["At school we…", "Teachers…", "I learn…"], v: ["teacher", "learn", "book", "friend"], c: ["Name one helper."], d: ["Draw school."] },
    { p: ["Explain how to be a good classmate.", "What is a library for?"], s: ["A good classmate…", "The library is…", "We should…"], v: ["classmate", "library", "share", "quiet"], c: ["One rule you follow."], d: ["Map of the school."] },
    { p: ["Describe a school day from morning to afternoon.", "Explain why rules help."], s: ["In the morning…", "Later…", "Rules help because…", "At the end…"], v: ["schedule", "rule", "respect", "routine"], c: ["Sequence three parts of the day."], d: ["Timeline of the day."] },
    { p: ["Explain how schools support learning in different subjects.", "Describe the job of a principal."], s: ["Schools support learning by…", "In different subjects…", "A principal…", "This matters because…"], v: ["support", "subject", "principal", "community"], c: ["Connect to your own school."], d: ["Org chart of school helpers."] }
  );
  infoFill("ocean",
    { p: ["What lives in the ocean?", "Is the ocean big or small?"], s: ["In the ocean…", "Fish…", "The ocean is…"], v: ["ocean", "fish", "big", "water", "wave"], c: ["Name two sea animals."], d: ["Draw the ocean."] },
    { p: ["Write facts about sharks or dolphins.", "What is a shell?"], s: ["Sharks…", "Dolphins…", "A shell is…", "They need…"], v: ["shark", "dolphin", "shell", "swim", "fin"], c: ["One safety fact."], d: ["Label a fish."] },
    { p: ["Explain why the ocean is important.", "Describe a coral reef."], s: ["The ocean is important because…", "Coral reefs…", "Animals depend on…", "People should…"], v: ["coral", "reef", "important", "protect"], c: ["One way to protect oceans."], d: ["Reef scene."] },
    { p: ["Explain tides or currents in simple language.", "Describe human impact on oceans."], s: ["Tides happen…", "Currents…", "Human activity…", "We can help by…"], v: ["tide", "current", "pollution", "conservation"], c: ["Suggest one action."], d: ["Before/after ocean picture."] }
  );
  infoFill("weather",
    { p: ["What is rain?", "What do you wear when it is cold?"], s: ["Rain is…", "When it is cold…", "I wear…"], v: ["rain", "cold", "hot", "coat", "sun"], c: ["Name today’s weather."], d: ["Draw today’s weather."] },
    { p: ["Explain sunny, rainy, and windy days.", "How does weather change what we do?"], s: ["On a sunny day…", "When it rains…", "Wind can…", "We change plans when…"], v: ["sunny", "windy", "change", "umbrella"], c: ["One safety tip."], d: ["Weather chart."] },
    { p: ["Describe the water cycle in simple steps.", "Explain how to read a simple forecast."], s: ["First water…", "Then…", "A forecast tells…", "This helps people…"], v: ["evaporate", "cloud", "forecast", "temperature"], c: ["Order the water cycle."], d: ["Water cycle arrows."] },
    { p: ["Explain how weather affects communities.", "Compare two climates."], s: ["Weather affects…", "For example…", "In contrast…", "Communities prepare by…"], v: ["climate", "prepare", "impact", "region"], c: ["Use compare language."], d: ["Climate comparison."] }
  );
  infoFill("friendship",
    { p: ["What makes a good friend?", "How do friends play?"], s: ["A good friend…", "Friends play…", "We…"], v: ["friend", "kind", "play", "share"], c: ["Name a kind act."], d: ["Draw friends."] },
    { p: ["Explain ways to make a new friend.", "What do friends do when someone is upset?"], s: ["To make a friend…", "When someone is upset…", "We can…"], v: ["new", "listen", "help", "kind"], c: ["One listening tip."], d: ["Friendship poster."] },
    { p: ["Describe qualities of a strong friendship.", "Explain how to solve a small friend problem."], s: ["Strong friendships have…", "If there is a problem…", "It helps to…", "Then…"], v: ["trust", "respect", "solve", "honest"], c: ["Steps to solve a problem."], d: ["Problem–solution comic."] },
    { p: ["Explain how friendships can change as we grow.", "Describe healthy vs unhealthy friend behaviours."], s: ["As we grow…", "Healthy friendships…", "Unhealthy signs include…", "It is important to…"], v: ["healthy", "boundary", "support", "change"], c: ["Give a realistic example."], d: ["T-chart healthy/unhealthy."] }
  );

  // —— HOW-TO ——
  ["animals","space","school","ocean","weather","friendship"].forEach(function(topic) {
    set("howto", topic, "k",
      ["How do you care for a pet?", "How do you get ready for school?"].map(function(x){ return topic==="animals"?x: "How do you enjoy " + topic + "? Tell steps."; }),
      ["First…", "Next…", "Then…", "Last…"],
      ["first", "next", "then", "last", "help"],
      ["Use order words."],
      ["Draw the steps."]
    );
    set("howto", topic, "g1",
      ["Write steps to complete a simple task about " + topic + ".", "Teach a friend how to do something related to " + topic + "."],
      ["First…", "Second…", "Next…", "Finally…", "Remember to…"],
      ["steps", "careful", "need", "tools", "safe"],
      ["Number your steps."],
      ["Numbered step pictures."]
    );
    set("howto", topic, "g2",
      ["Explain a process related to " + topic + " with clear materials and steps.", "How to stay safe during " + topic + " activities."],
      ["You will need…", "Begin by…", "After that…", "Be careful to…", "When you finish…"],
      ["materials", "process", "safe", "check", "finish"],
      ["Include a safety tip."],
      ["Materials list + steps."]
    );
    set("howto", topic, "g3",
      ["Write a how-to guide for a more complex task linked to " + topic + ".", "Explain a science or class procedure about " + topic + "."],
      ["Purpose…", "Materials…", "Procedure…", "Tips for success…", "If something goes wrong…"],
      ["procedure", "purpose", "accurate", "troubleshoot"],
      ["Add a troubleshooting tip."],
      ["Flowchart of the process."]
    );
  });

  // —— DESCRIPTIVE ——
  ["animals","space","school","ocean","weather","friendship"].forEach(function(topic) {
    set("descriptive", topic, "k",
      ["Describe a " + (topic === "animals" ? "cat" : topic) + ". What colour is it?", "What does it look like?"],
      ["It is…", "It has…", "I see…", "It looks…"],
      ["colour", "big", "little", "soft", "look"],
      ["Name two colours."],
      ["Draw and colour it."]
    );
    set("descriptive", topic, "g1",
      ["Describe " + topic + " using see, hear, and feel words.", "Paint a picture with words about " + topic + "."],
      ["I can see…", "I can hear…", "It feels…", "It looks like…"],
      ["describe", "colour", "sound", "feel", "like"],
      ["Use three senses."],
      ["Senses drawing."]
    );
    set("descriptive", topic, "g2",
      ["Write a detailed description of a scene about " + topic + ".", "Describe so a reader can picture it clearly."],
      ["In the scene…", "Above…", "Nearby…", "The most interesting detail…"],
      ["detail", "scene", "texture", "bright", "quiet"],
      ["Include size and texture."],
      ["Detailed scene sketch."]
    );
    set("descriptive", topic, "g3",
      ["Write a rich description of " + topic + " using figurative language carefully.", "Describe a moment related to " + topic + " for a reader who was not there."],
      ["At first glance…", "Looking closer…", "It reminds me of…", "Overall the mood is…"],
      ["figurative", "mood", "imagery", "precise"],
      ["Use one simile."],
      ["Mood board collage."]
    );
  });

  // Extra prompt density — more variety for regenerate
  ["animals","space","school","ocean","weather","friendship"].forEach(function (topic) {
    ["narrative","opinion","informational","howto","descriptive"].forEach(function (genre) {
      ["k","g1","g2","g3"].forEach(function (level) {
        try {
          var arr = WPG.prompts[genre][topic][level];
          if (!arr) return;
          var base = arr[0] || ("Write about " + topic + ".");
          arr.push(
            "New idea: " + base.replace(/\.$/, "") + " — add one surprise detail.",
            "Write three sentences about " + topic + " for this " + genre + " task.",
            "Use the word because in a sentence about " + topic + "."
          );
          var st = WPG.starters[genre][topic][level];
          if (st && st.length < 8) {
            st.push("Also…", "In the end…", "For example…");
          }
        } catch (e) {}
      });
    });
  });


  // Extra prompts — polish pass
  set("narrative", "animals", "k",
    (WPG.prompts.narrative?.animals?.k || []).concat([
      "A tiny ant finds a big cookie. What happens?",
      "Your pet can talk for one day. What does it say?",
      "A penguin visits your classroom. Write the story.",
    ]),
    WPG.starters.narrative?.animals?.k || ["First…", "Then…", "I saw…"],
    WPG.vocab.narrative?.animals?.k || ["pet", "happy", "run", "friend"],
    "Add one feeling word.",
    "Draw the animal."
  );
  set("opinion", "school", "k",
    (WPG.prompts.opinion?.school?.k || []).concat([
      "What is the best part of school? Why?",
      "Should we have more outdoor time? Tell why.",
    ]),
    WPG.starters.opinion?.school?.k || ["I think…", "Because…", "My favourite…"],
    WPG.vocab.opinion?.school?.k || ["best", "fun", "learn", "friend"],
    "Give two reasons.",
    "Draw your idea."
  );
  set("howto", "friendship", "g1",
    (WPG.prompts.howto?.friendship?.g1 || []).concat([
      "How do you make a new friend at school?",
      "How can you help a friend who is sad?",
    ]),
    WPG.starters.howto?.friendship?.g1 || ["First…", "Next…", "Finally…"],
    WPG.vocab.howto?.friendship?.g1 || ["share", "listen", "kind", "help"],
    "Use three steps.",
    "Draw one step."
  );

})();