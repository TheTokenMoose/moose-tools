/**
 * IB PYP Pocket Guide — teacher reference
 * Themes, ATLs, Learner Profile, Key Concepts, extras
 */

const DATA = [
  // ── Transdisciplinary Themes ───────────────────────────────────────────
  {
    section: "themes",
    badge: "Theme",
    badgeClass: "theme",
    emoji: "👤",
    title: "Who we are",
    sub: "Identity, beliefs, health, relationships, what it means to be human",
    body: `
      <p>An inquiry into the nature of the self; beliefs and values; personal, physical, mental, social and spiritual health; human relationships including families, friends, communities and cultures; rights and responsibilities; what it means to be human.</p>
      <div class="prompt"><strong>Classroom prompt:</strong> Who am I as a learner and as a member of my community?</div>
    `,
    tags: "identity self health relationships culture beliefs values",
  },
  {
    section: "themes",
    badge: "Theme",
    badgeClass: "theme",
    emoji: "🌍",
    title: "Where we are in place and time",
    sub: "Orientation in place and time; personal histories; journeys; the discoveries",
    body: `
      <p>An inquiry into orientation in place and time; personal histories; homes and journeys; the discoveries, explorations and migrations of humankind; the relationships between and the interconnectedness of individuals and civilizations, from local and global perspectives.</p>
      <div class="prompt"><strong>Classroom prompt:</strong> How do stories of the past connect to our lives today?</div>
    `,
    tags: "history place time journeys migration discovery orientation",
  },
  {
    section: "themes",
    badge: "Theme",
    badgeClass: "theme",
    emoji: "🎨",
    title: "How we express ourselves",
    sub: "Ways we discover and express ideas, feelings, culture, creativity",
    body: `
      <p>An inquiry into the ways in which we discover and express ideas, feelings, nature, culture, beliefs and values; the ways in which we reflect on, extend and enjoy our creativity; our appreciation of the aesthetic.</p>
      <div class="prompt"><strong>Classroom prompt:</strong> How can we show our ideas so others understand them?</div>
    `,
    tags: "expression art creativity culture feelings communication aesthetic",
  },
  {
    section: "themes",
    badge: "Theme",
    badgeClass: "theme",
    emoji: "🔬",
    title: "How the world works",
    sub: "Natural world, laws of nature, scientific principles, interaction with environment",
    body: `
      <p>An inquiry into the natural world and its laws; the interaction between the natural world (physical and biological) and human societies; how humans use their understanding of scientific principles; the impact of scientific and technological advances on society and on the environment.</p>
      <div class="prompt"><strong>Classroom prompt:</strong> What patterns and forces shape the world around us?</div>
    `,
    tags: "science nature technology environment laws physics biology",
  },
  {
    section: "themes",
    badge: "Theme",
    badgeClass: "theme",
    emoji: "🏙️",
    title: "How we organize ourselves",
    sub: "Systems, communities, work, interconnectedness of human systems",
    body: `
      <p>An inquiry into the interconnectedness of human-made systems and communities; the structure and function of organizations; societal decision-making; economic activities and their impact on humankind and the environment.</p>
      <div class="prompt"><strong>Classroom prompt:</strong> How do communities make decisions and get things done?</div>
    `,
    tags: "systems community organization economy decision-making structure",
  },
  {
    section: "themes",
    badge: "Theme",
    badgeClass: "theme",
    emoji: "🌱",
    title: "Sharing the planet",
    sub: "Resources, relationships with other species, peace, conflict, equal access",
    body: `
      <p>An inquiry into rights and responsibilities in the struggle to share finite resources with other people and with other living things; communities and the relationships within and between them; access to equal opportunities; peace and conflict resolution.</p>
      <div class="prompt"><strong>Classroom prompt:</strong> How can we share resources fairly and care for living things?</div>
    `,
    tags: "resources environment peace conflict equality sustainability responsibility",
  },

  // ── Approaches to Learning ─────────────────────────────────────────────
  {
    section: "atl",
    badge: "ATL",
    badgeClass: "atl",
    emoji: "🧠",
    title: "Thinking skills",
    sub: "Critical, creative, transfer, reflection",
    body: `
      <p>Help students analyse and evaluate issues, generate new ideas, and transfer learning to new contexts.</p>
      <ul>
        <li><strong>Critical thinking</strong> — analyse, evaluate, form arguments</li>
        <li><strong>Creative thinking</strong> — generate ideas, innovate, consider alternatives</li>
        <li><strong>Transfer</strong> — use skills and knowledge in new situations</li>
        <li><strong>Reflection & metacognition</strong> — think about how we learn</li>
      </ul>
      <div class="prompt"><strong>Try:</strong> “What evidence supports this?” · “How else could we solve it?” · “Where else can we use this skill?”</div>
    `,
    tags: "thinking critical creative transfer reflection metacognition analyse",
  },
  {
    section: "atl",
    badge: "ATL",
    badgeClass: "atl",
    emoji: "🔍",
    title: "Research skills",
    sub: "Information literacy, media literacy, ethical use",
    body: `
      <p>Help students find, interpret, evaluate, and use information responsibly.</p>
      <ul>
        <li><strong>Information literacy</strong> — formulate questions, gather & record data, evaluate sources</li>
        <li><strong>Media literacy</strong> — interact with media to analyse and communicate</li>
        <li><strong>Ethical use</strong> — cite sources, respect intellectual property, use tech responsibly</li>
      </ul>
      <div class="prompt"><strong>Try:</strong> “What question are we really asking?” · “Is this source reliable?” · “How do we give credit?”</div>
    `,
    tags: "research information media literacy sources cite ethical questions",
  },
  {
    section: "atl",
    badge: "ATL",
    badgeClass: "atl",
    emoji: "💬",
    title: "Communication skills",
    sub: "Exchanging information, literacy, ICT",
    body: `
      <p>Help students exchange ideas clearly through many modes and languages.</p>
      <ul>
        <li><strong>Exchanging information</strong> — listening, interpreting, speaking, presenting</li>
        <li><strong>Literacy</strong> — reading, writing, viewing across genres</li>
        <li><strong>ICT</strong> — communicate and collaborate using digital tools appropriately</li>
      </ul>
      <div class="prompt"><strong>Try:</strong> “Explain it to a partner in your own words.” · “How will your audience understand this?”</div>
    `,
    tags: "communication listening speaking reading writing presenting literacy",
  },
  {
    section: "atl",
    badge: "ATL",
    badgeClass: "atl",
    emoji: "🤝",
    title: "Social skills",
    sub: "Interpersonal relationships, collaboration, social awareness",
    body: `
      <p>Help students develop positive relationships and work effectively with others.</p>
      <ul>
        <li><strong>Interpersonal relationships</strong> — respect, empathy, resolving conflict</li>
        <li><strong>Social and emotional awareness</strong> — recognise feelings in self and others</li>
        <li><strong>Collaboration</strong> — share responsibility, take on roles, support the group</li>
      </ul>
      <div class="prompt"><strong>Try:</strong> “How can we make sure every voice is heard?” · “What does a supportive teammate do?”</div>
    `,
    tags: "social collaboration teamwork empathy relationships conflict emotional",
  },
  {
    section: "atl",
    badge: "ATL",
    badgeClass: "atl",
    emoji: "🎯",
    title: "Self-management skills",
    sub: "Organisation, states of mind, mindfulness",
    body: `
      <p>Help students manage time, tasks, emotions, and wellbeing so learning can thrive.</p>
      <ul>
        <li><strong>Organisation</strong> — goal-setting, time management, managing materials</li>
        <li><strong>States of mind</strong> — perseverance, resilience, emotional regulation</li>
        <li><strong>Mindfulness</strong> — focus, calm attention, managing distractions</li>
      </ul>
      <div class="prompt"><strong>Try:</strong> “What is your plan for the next 10 minutes?” · “What strategy helps you refocus?”</div>
    `,
    tags: "self-management organisation time goals perseverance resilience mindfulness focus",
  },

  // ── Learner Profile ────────────────────────────────────────────────────
  {
    section: "profile",
    badge: "Profile",
    badgeClass: "profile",
    emoji: "🔎",
    title: "Inquirers",
    sub: "Curiosity, research skills, love of learning",
    body: `
      <p>We nurture our curiosity, developing skills for inquiry and research. We know how to learn independently and with others. We learn with enthusiasm and sustain our love of learning throughout life.</p>
      <div class="prompt"><strong>Look-fors:</strong> Asking questions · Exploring resources · Sticking with a wonder</div>
    `,
    tags: "inquirers curiosity questions research lifelong learning",
  },
  {
    section: "profile",
    badge: "Profile",
    badgeClass: "profile",
    emoji: "📚",
    title: "Knowledgeable",
    sub: "Explore knowledge across disciplines and local/global issues",
    body: `
      <p>We develop and use conceptual understanding, exploring knowledge across a range of disciplines. We engage with issues and ideas that have local and global significance.</p>
      <div class="prompt"><strong>Look-fors:</strong> Connecting facts to big ideas · Applying learning to real issues</div>
    `,
    tags: "knowledgeable concepts disciplines local global understanding",
  },
  {
    section: "profile",
    badge: "Profile",
    badgeClass: "profile",
    emoji: "💡",
    title: "Thinkers",
    sub: "Critical and creative thinking; ethical decisions",
    body: `
      <p>We use critical and creative thinking skills to analyse and take responsible action on complex problems. We exercise initiative in making reasoned, ethical decisions.</p>
      <div class="prompt"><strong>Look-fors:</strong> Justifying ideas · Considering alternatives · Ethical reasoning</div>
    `,
    tags: "thinkers critical creative problem-solving ethical decisions",
  },
  {
    section: "profile",
    badge: "Profile",
    badgeClass: "profile",
    emoji: "🗣️",
    title: "Communicators",
    sub: "Express confidently in many modes and languages",
    body: `
      <p>We express ourselves confidently and creatively in more than one language and in many ways. We collaborate effectively, listening carefully to the perspectives of other individuals and groups.</p>
      <div class="prompt"><strong>Look-fors:</strong> Clear expression · Active listening · Multimodal sharing</div>
    `,
    tags: "communicators language express collaborate listen perspectives",
  },
  {
    section: "profile",
    badge: "Profile",
    badgeClass: "profile",
    emoji: "⚖️",
    title: "Principled",
    sub: "Integrity, honesty, fairness, justice, respect",
    body: `
      <p>We act with integrity and honesty, with a strong sense of fairness and justice, and with respect for the dignity and rights of people everywhere. We take responsibility for our actions and their consequences.</p>
      <div class="prompt"><strong>Look-fors:</strong> Honesty · Fair play · Owning mistakes</div>
    `,
    tags: "principled integrity honesty fairness justice responsibility respect",
  },
  {
    section: "profile",
    badge: "Profile",
    badgeClass: "profile",
    emoji: "🌐",
    title: "Open-minded",
    sub: "Appreciate cultures and personal histories; willing to grow",
    body: `
      <p>We critically appreciate our own cultures and personal histories, as well as the values and traditions of others. We seek and evaluate a range of points of view, and we are willing to grow from the experience.</p>
      <div class="prompt"><strong>Look-fors:</strong> Considering other viewpoints · Valuing diversity · Revising thinking</div>
    `,
    tags: "open-minded culture perspectives diversity values traditions",
  },
  {
    section: "profile",
    badge: "Profile",
    badgeClass: "profile",
    emoji: "💚",
    title: "Caring",
    sub: "Empathy, compassion, service, difference-making",
    body: `
      <p>We show empathy, compassion and respect. We have a commitment to service, and we act to make a positive difference in the lives of others and in the world around us.</p>
      <div class="prompt"><strong>Look-fors:</strong> Kind actions · Supporting peers · Service-minded choices</div>
    `,
    tags: "caring empathy compassion respect service kindness",
  },
  {
    section: "profile",
    badge: "Profile",
    badgeClass: "profile",
    emoji: "🦸",
    title: "Risk-takers",
    sub: "Courage, uncertainty, defending beliefs thoughtfully",
    body: `
      <p>We approach uncertainty with forethought and determination; we work independently and cooperatively to explore new ideas and innovative strategies. We are resourceful and resilient in the face of challenges and change.</p>
      <div class="prompt"><strong>Look-fors:</strong> Trying new strategies · Speaking up respectfully · Bouncing back</div>
    `,
    tags: "risk-takers courage resilience innovation uncertainty determination",
  },
  {
    section: "profile",
    badge: "Profile",
    badgeClass: "profile",
    emoji: "☯️",
    title: "Balanced",
    sub: "Different aspects of life — intellectual, physical, emotional",
    body: `
      <p>We understand the importance of balancing different aspects of our lives — intellectual, physical, and emotional — to achieve well-being for ourselves and others. We recognize our interdependence with other people and with the world in which we live.</p>
      <div class="prompt"><strong>Look-fors:</strong> Work–rest balance · Managing emotions · Caring for body and mind</div>
    `,
    tags: "balanced wellbeing physical emotional intellectual interdependence",
  },
  {
    section: "profile",
    badge: "Profile",
    badgeClass: "profile",
    emoji: "🪞",
    title: "Reflective",
    sub: "Thoughtful consideration of learning and experience",
    body: `
      <p>We thoughtfully consider the world and our own ideas and experience. We work to understand our strengths and weaknesses in order to support our learning and personal development.</p>
      <div class="prompt"><strong>Look-fors:</strong> Self-assessment · Goal setting · Learning from feedback</div>
    `,
    tags: "reflective strengths weaknesses feedback goals self-assessment",
  },

  // ── Key Concepts ───────────────────────────────────────────────────────
  {
    section: "concepts",
    badge: "Concept",
    badgeClass: "concept",
    emoji: "📐",
    title: "Form",
    sub: "What is it like?",
    body: `
      <p>The understanding that everything has a form with observable characteristics that can be used to identify, describe, and categorize it.</p>
      <div class="prompt"><strong>Questions:</strong> What is it like? · What are its features?</div>
    `,
    tags: "form characteristics describe identify features",
  },
  {
    section: "concepts",
    badge: "Concept",
    badgeClass: "concept",
    emoji: "⚙️",
    title: "Function",
    sub: "How does it work?",
    body: `
      <p>The understanding that everything has a purpose, a role, or a way of behaving that can be investigated.</p>
      <div class="prompt"><strong>Questions:</strong> How does it work? · What is its purpose?</div>
    `,
    tags: "function purpose role how it works behaviour",
  },
  {
    section: "concepts",
    badge: "Concept",
    badgeClass: "concept",
    emoji: "🔗",
    title: "Causation",
    sub: "Why is it like this?",
    body: `
      <p>The understanding that things do not just happen; there are causal relationships, and actions have consequences.</p>
      <div class="prompt"><strong>Questions:</strong> Why is it like this? · What causes this? · What are the consequences?</div>
    `,
    tags: "causation cause effect why consequences relationships",
  },
  {
    section: "concepts",
    badge: "Concept",
    badgeClass: "concept",
    emoji: "🔄",
    title: "Change",
    sub: "How is it transforming?",
    body: `
      <p>The understanding that change is the process of movement from one state to another. Change is universal and inevitable.</p>
      <div class="prompt"><strong>Questions:</strong> How is it changing? · How has it changed over time?</div>
    `,
    tags: "change transformation process time movement",
  },
  {
    section: "concepts",
    badge: "Concept",
    badgeClass: "concept",
    emoji: "🕸️",
    title: "Connection",
    sub: "How is it linked to other things?",
    body: `
      <p>The understanding that we live in a world of interacting systems in which the actions of any individual element affect others.</p>
      <div class="prompt"><strong>Questions:</strong> How is it connected to other things? · What systems are involved?</div>
    `,
    tags: "connection systems links relationships interdependent",
  },
  {
    section: "concepts",
    badge: "Concept",
    badgeClass: "concept",
    emoji: "👁️",
    title: "Perspective",
    sub: "What are the points of view?",
    body: `
      <p>The understanding that knowledge is moderated by different points of view which lead to different interpretations, understandings, and findings. Perspectives may be individual, group, cultural, or subject-specific.</p>
      <div class="prompt"><strong>Questions:</strong> What are the points of view? · How might someone else see this?</div>
    `,
    tags: "perspective viewpoints interpretation culture opinion",
  },
  {
    section: "concepts",
    badge: "Concept",
    badgeClass: "concept",
    emoji: "🛡️",
    title: "Responsibility",
    sub: "What is our responsibility?",
    body: `
      <p>The understanding that people make choices based on their understandings, beliefs, and values, and the actions they take as a result do make a difference.</p>
      <div class="prompt"><strong>Questions:</strong> What is our responsibility? · How can we act thoughtfully?</div>
    `,
    tags: "responsibility choices actions values difference care",
  },
  {
    section: "concepts",
    badge: "Concept",
    badgeClass: "concept",
    emoji: "💭",
    title: "Reflection",
    sub: "How do we know?",
    body: `
      <p>The understanding that there are different ways of knowing, and that it is important to reflect on our conclusions, to consider our methods of reasoning, and the quality and reliability of the evidence we have considered.</p>
      <div class="prompt"><strong>Questions:</strong> How do we know? · How reliable is our evidence?</div>
    `,
    tags: "reflection knowing evidence reasoning reliability metacognition",
  },

  // ── More useful PYP framing ────────────────────────────────────────────
  {
    section: "more",
    badge: "More",
    badgeClass: "more",
    emoji: "🔄",
    title: "Inquiry cycle (classroom-friendly)",
    sub: "A flexible flow for units — not a rigid checklist",
    body: `
      <ul>
        <li><strong>Tuning in</strong> — prior knowledge, wonderings, engagement</li>
        <li><strong>Finding out</strong> — research, experiences, data gathering</li>
        <li><strong>Sorting out</strong> — organise, analyse, make meaning</li>
        <li><strong>Going further</strong> — dig deeper, personal pathways</li>
        <li><strong>Making conclusions</strong> — synthesise big ideas</li>
        <li><strong>Taking action</strong> — authentic application / service / sharing</li>
        <li><strong>Reflecting</strong> — throughout, not only at the end</li>
      </ul>
      <div class="prompt"><strong>Note:</strong> Schools may use slightly different cycle language — match your POI and team agreements.</div>
    `,
    tags: "inquiry cycle tuning finding sorting action reflection unit planning",
  },
  {
    section: "more",
    badge: "More",
    badgeClass: "more",
    emoji: "🚀",
    title: "Action in the PYP",
    sub: "Participation, advocacy, social justice, social entrepreneurship, lifestyle choices",
    body: `
      <p>Action can be small and authentic. It often grows from agency and reflection.</p>
      <ul>
        <li>Participation — joining in, contributing</li>
        <li>Advocacy — speaking up for a cause or person</li>
        <li>Social justice — fairness and equity-focused action</li>
        <li>Social entrepreneurship — creative solutions that help others</li>
        <li>Lifestyle choices — everyday habits that reflect values</li>
      </ul>
      <div class="prompt"><strong>Teacher tip:</strong> Celebrate process and intent, not only big public projects.</div>
    `,
    tags: "action agency advocacy service justice participation lifestyle",
  },
  {
    section: "more",
    badge: "More",
    badgeClass: "more",
    emoji: "🧭",
    title: "Agency",
    sub: "Voice, choice, and ownership of learning",
    body: `
      <p>Learner agency is when students have voice, choice, and ownership — supported by teachers as partners in learning.</p>
      <ul>
        <li><strong>Voice</strong> — ideas and opinions are valued</li>
        <li><strong>Choice</strong> — meaningful options in how/what to learn when appropriate</li>
        <li><strong>Ownership</strong> — responsibility for learning goals and next steps</li>
      </ul>
      <div class="prompt"><strong>Try:</strong> Co-construct success criteria · Offer pathway choices · Student-led reflection</div>
    `,
    tags: "agency voice choice ownership student-led partnership",
  },
  {
    section: "more",
    badge: "More",
    badgeClass: "more",
    emoji: "📖",
    title: "Programme of Inquiry (POI)",
    sub: "School-wide map of transdisciplinary units",
    body: `
      <p>Each PYP school designs a Programme of Inquiry — a coherent, school-specific map of units under the six transdisciplinary themes across year levels.</p>
      <ul>
        <li>Units are concept-driven and inquiry-based</li>
        <li>Central ideas frame the unit’s enduring understanding</li>
        <li>Lines of inquiry, key concepts, and ATLs guide learning</li>
        <li>Vertical & horizontal collaboration keeps the POI balanced</li>
      </ul>
      <div class="prompt"><strong>Teacher tip:</strong> Keep this guide beside your school’s POI document — local central ideas always win.</div>
    `,
    tags: "poi programme of inquiry central idea lines of inquiry unit planning collaboration",
  },
  {
    section: "more",
    badge: "More",
    badgeClass: "more",
    emoji: "🧩",
    title: "Central idea & lines of inquiry",
    sub: "Unit spine for planning and assessment",
    body: `
      <ul>
        <li><strong>Central idea</strong> — a conceptual understanding statement (not a topic label)</li>
        <li><strong>Lines of inquiry</strong> — 3–4 supporting strands that unpack the central idea</li>
        <li><strong>Teacher questions / student questions</strong> — drive authentic inquiry</li>
        <li><strong>Assessment</strong> — evidence of understanding of the central idea, not only activities completed</li>
      </ul>
      <div class="prompt"><strong>Check:</strong> Could students still understand the central idea if the “topic wrapper” changed?</div>
    `,
    tags: "central idea lines of inquiry assessment conceptual understanding questions",
  },
];

const SECTION_ORDER = ["themes", "atl", "profile", "concepts", "more"];
const SECTION_TITLES = {
  themes: "Transdisciplinary themes",
  atl: "Approaches to Learning (ATLs)",
  profile: "Learner Profile",
  concepts: "Key concepts",
  more: "Planning extras",
};
const SECTION_TITLES_ZH = {
  themes: "超学科主题",
  atl: "学习方法 (ATLs)",
  profile: "学习者培养目标",
  concepts: "关键概念",
  more: "规划补充",
};

/** Full Chinese pack: title, sub, badge, body HTML for every card */
const ZH = {
  "Who we are": {
    badge: "主题",
    title: "我们是谁",
    sub: "身份、信念、健康、人际关系，以及作为人意味着什么",
    body: `<p>探究自我的本质；信念与价值观；个人的身体、心理、社会与精神健康；人际关系（包括家庭、朋友、社区与文化）；权利与责任；作为人意味着什么。</p><div class="prompt"><strong>课堂引导：</strong>作为学习者和社区成员，我是谁？</div>`,
  },
  "Where we are in place and time": {
    badge: "主题",
    title: "我们身处什么时空",
    sub: "方位与时间、个人历史、旅程与发现",
    body: `<p>探究方位与时间；个人历史；家园与旅程；人类的发现、探索与迁徙；从地方与全球视角看个人与文明之间的相互联系。</p><div class="prompt"><strong>课堂引导：</strong>过去的故事如何与我们今天的生活相连？</div>`,
  },
  "How we express ourselves": {
    badge: "主题",
    title: "我们如何表达自己",
    sub: "发现并表达想法、情感、文化与创造力的方式",
    body: `<p>探究我们发现并表达想法、情感、自然、文化、信念与价值观的方式；我们如何反思、拓展并享受创造力；我们对美的欣赏。</p><div class="prompt"><strong>课堂引导：</strong>我们怎样展示想法，让别人也能理解？</div>`,
  },
  "How the world works": {
    badge: "主题",
    title: "世界如何运作",
    sub: "自然世界、自然规律、科学原理与环境互动",
    body: `<p>探究自然世界及其规律；自然界（物理与生物）与人类社会的互动；人类如何运用对科学原理的理解；科技进步对社会与环境的影响。</p><div class="prompt"><strong>课堂引导：</strong>哪些规律与力量塑造了我们周围的世界？</div>`,
  },
  "How we organize ourselves": {
    badge: "主题",
    title: "我们如何组织自己",
    sub: "系统、社区、工作，以及人类系统的相互联系",
    body: `<p>探究人造系统与社区的相互联系；组织的结构与功能；社会决策；经济活动及其对人类与环境的影响。</p><div class="prompt"><strong>课堂引导：</strong>社区如何做决定并完成事情？</div>`,
  },
  "Sharing the planet": {
    badge: "主题",
    title: "共享地球",
    sub: "资源、与其他物种的关系、和平、冲突与平等机会",
    body: `<p>探究在与他人及其他生物分享有限资源时的权利与责任；社区内部及社区之间的关系；平等机会；和平与冲突解决。</p><div class="prompt"><strong>课堂引导：</strong>我们如何公平分享资源并关爱生命？</div>`,
  },
  "Thinking skills": {
    badge: "学习方法",
    title: "思考技能",
    sub: "批判性思考、创造性思考、迁移与反思",
    body: `<p>帮助学生分析与评价问题，产生新想法，并把学习迁移到新情境。</p><ul><li><strong>批判性思考</strong> — 分析、评价、形成论证</li><li><strong>创造性思考</strong> — 产生想法、创新、考虑替代方案</li><li><strong>迁移</strong> — 在新情境中运用技能与知识</li><li><strong>反思与元认知</strong> — 思考我们如何学习</li></ul><div class="prompt"><strong>试试：</strong>“有什么证据支持这一点？”·“还有别的解决办法吗？”·“这个技能还能用在哪里？”</div>`,
  },
  "Research skills": {
    badge: "学习方法",
    title: "研究技能",
    sub: "信息素养、媒介素养与合乎伦理的使用",
    body: `<p>帮助学生负责任地查找、解释、评价并使用信息。</p><ul><li><strong>信息素养</strong> — 提出问题、收集与记录数据、评价来源</li><li><strong>媒介素养</strong> — 与媒介互动以分析与交流</li><li><strong>合乎伦理的使用</strong> — 引用、尊重知识产权、负责任地使用技术</li></ul><div class="prompt"><strong>试试：</strong>“我们真正在问什么问题？”·“这个来源可靠吗？”·“我们如何注明出处？”</div>`,
  },
  "Communication skills": {
    badge: "学习方法",
    title: "交流技能",
    sub: "信息交换、读写素养与信息通信技术",
    body: `<p>帮助学生通过多种方式与语言清晰地交换想法。</p><ul><li><strong>信息交换</strong> — 倾听、理解、说话、呈现</li><li><strong>读写素养</strong> — 跨体裁阅读、写作与观看</li><li><strong>信息通信技术</strong> — 恰当使用数字工具进行交流与协作</li></ul><div class="prompt"><strong>试试：</strong>“用自己的话向同伴解释。”·“听众怎样才能理解？”</div>`,
  },
  "Social skills": {
    badge: "学习方法",
    title: "社交技能",
    sub: "人际关系、协作与社会意识",
    body: `<p>帮助学生建立积极关系并与他人有效合作。</p><ul><li><strong>人际关系</strong> — 尊重、同理、解决冲突</li><li><strong>社会与情感意识</strong> — 觉察自己与他人的感受</li><li><strong>协作</strong> — 分担责任、承担角色、支持团队</li></ul><div class="prompt"><strong>试试：</strong>“怎样让每个人的声音都被听见？”·“支持同伴的人会做什么？”</div>`,
  },
  "Self-management skills": {
    badge: "学习方法",
    title: "自我管理技能",
    sub: "组织能力、心理状态与正念",
    body: `<p>帮助学生管理时间、任务、情绪与福祉，让学习更有效。</p><ul><li><strong>组织</strong> — 设定目标、时间管理、整理材料</li><li><strong>心理状态</strong> — 坚持、韧性、情绪调节</li><li><strong>正念</strong> — 专注、平静注意、管理干扰</li></ul><div class="prompt"><strong>试试：</strong>“接下来十分钟你的计划是什么？”·“什么方法帮你重新专注？”</div>`,
  },
  Inquirers: {
    badge: "培养目标",
    title: "探究者",
    sub: "好奇心、研究技能与热爱学习",
    body: `<p>我们培养好奇心，发展探究与研究技能。我们知道如何独立学习，也知道如何与他人一起学习。我们热情学习，并终生保持对学习的热爱。</p><div class="prompt"><strong>观察点：</strong>提出问题 · 探索资源 · 坚持探究</div>`,
  },
  Knowledgeable: {
    badge: "培养目标",
    title: "知识渊博的人",
    sub: "跨学科探索知识以及地方与全球议题",
    body: `<p>我们发展并运用概念性理解，在多种学科中探索知识。我们参与具有地方与全球意义的议题与思想。</p><div class="prompt"><strong>观察点：</strong>把事实连接到大概念 · 把学习应用到真实问题</div>`,
  },
  Thinkers: {
    badge: "培养目标",
    title: "思考者",
    sub: "批判性与创造性思考；合乎伦理的决策",
    body: `<p>我们运用批判性与创造性思考技能，分析复杂问题并采取负责任的行动。我们主动做出有理有据、合乎伦理的决定。</p><div class="prompt"><strong>观察点：</strong>论证想法 · 考虑替代方案 · 伦理推理</div>`,
  },
  Communicators: {
    badge: "培养目标",
    title: "交流者",
    sub: "用多种方式与语言自信表达",
    body: `<p>我们自信而有创意地用一种以上的语言、以多种方式表达自己。我们有效协作，认真倾听他人与群体的观点。</p><div class="prompt"><strong>观察点：</strong>清晰表达 · 积极倾听 · 多模态分享</div>`,
  },
  Principled: {
    badge: "培养目标",
    title: "有原则的人",
    sub: "正直、诚实、公平、正义与尊重",
    body: `<p>我们以正直与诚实行事，具有强烈的公平与正义感，并尊重各地人们的尊严与权利。我们对自己的行为及其后果负责。</p><div class="prompt"><strong>观察点：</strong>诚实 · 公平竞争 · 勇于承担错误</div>`,
  },
  "Open-minded": {
    badge: "培养目标",
    title: "胸襟开阔的人",
    sub: "欣赏文化与个人历史；愿意成长",
    body: `<p>我们批判性地欣赏自己的文化与个人历史，以及他人的价值观与传统。我们寻求并评价多种观点，并愿意从经验中成长。</p><div class="prompt"><strong>观察点：</strong>考虑其他观点 · 珍视多样性 · 修正想法</div>`,
  },
  Caring: {
    badge: "培养目标",
    title: "富有同情心的人",
    sub: "同理心、Compassion、服务与带来改变".replace("Compassion", "慈悲"),
    body: `<p>我们展现同理心、Compassion与尊重。我们致力于服务，并采取行动为他人的生活和周围世界带来积极改变。</p><div class="prompt"><strong>观察点：</strong>善意行动 · 支持同伴 · 服务意识</div>`.replace(/Compassion/g, "慈悲"),
  },
  "Risk-takers": {
    badge: "培养目标",
    title: "敢于冒风险的人",
    sub: "勇气、面对不确定、有思考地坚持信念",
    body: `<p>我们以深思与决心面对不确定；我们独立或合作地探索新想法与创新策略。面对挑战与变化，我们足智多谋、坚韧不拔。</p><div class="prompt"><strong>观察点：</strong>尝试新策略 · 有礼貌地发声 · 从挫折中恢复</div>`,
  },
  Balanced: {
    badge: "培养目标",
    title: "全面发展的人",
    sub: "兼顾生活的不同方面——智力、身体与情感",
    body: `<p>我们理解平衡生活不同方面——智力、身体与情感——对自身与他人福祉的重要性。我们认识自己与他人以及所处世界的相互依存。</p><div class="prompt"><strong>观察点：</strong>劳逸结合 · 管理情绪 · 关爱身心</div>`,
  },
  Reflective: {
    badge: "培养目标",
    title: "反思的人",
    sub: "对学习与经验进行深思",
    body: `<p>我们认真思考世界以及自己的想法与经验。我们努力了解自己的优势与不足，以支持学习与个人发展。</p><div class="prompt"><strong>观察点：</strong>自我评估 · 设定目标 · 从反馈中学习</div>`,
  },
  Form: {
    badge: "概念",
    title: "形式",
    sub: "它是什么样的？",
    body: `<p>理解任何事物都有形式，具有可观察的特征，可用于识别、描述与分类。</p><div class="prompt"><strong>问题：</strong>它是什么样的？· 它有哪些特征？</div>`,
  },
  Function: {
    badge: "概念",
    title: "功能",
    sub: "它如何运作？",
    body: `<p>理解任何事物都有目的、角色或可被研究的行为方式。</p><div class="prompt"><strong>问题：</strong>它如何运作？· 它的目的是什么？</div>`,
  },
  Causation: {
    badge: "概念",
    title: "因果关系",
    sub: "为什么会是这样？",
    body: `<p>理解事物不会凭空发生；存在因果关系，行动会带来后果。</p><div class="prompt"><strong>问题：</strong>为什么会是这样？· 原因是什么？· 会有什么后果？</div>`,
  },
  Change: {
    badge: "概念",
    title: "变化",
    sub: "它如何转变？",
    body: `<p>理解变化是从一种状态到另一种状态的过程。变化普遍存在且不可避免。</p><div class="prompt"><strong>问题：</strong>它如何在变化？· 它随时间如何改变？</div>`,
  },
  Connection: {
    badge: "概念",
    title: "联系",
    sub: "它与其他事物如何关联？",
    body: `<p>理解我们生活在相互作用的系统中，任何个体要素的行动都会影响其他要素。</p><div class="prompt"><strong>问题：</strong>它与其他事物如何关联？· 涉及哪些系统？</div>`,
  },
  Perspective: {
    badge: "概念",
    title: "观点",
    sub: "有哪些不同看法？",
    body: `<p>理解知识会受到不同观点的调节，从而产生不同的解释、理解与发现。观点可以是个人的、群体的、文化的或学科特定的。</p><div class="prompt"><strong>问题：</strong>有哪些观点？· 别人可能会怎样看？</div>`,
  },
  Responsibility: {
    badge: "概念",
    title: "责任",
    sub: "我们的责任是什么？",
    body: `<p>理解人们基于理解、信念与价值观做出选择，并因此采取的行动会产生影响。</p><div class="prompt"><strong>问题：</strong>我们的责任是什么？· 我们如何有思考地行动？</div>`,
  },
  Reflection: {
    badge: "概念",
    title: "反思",
    sub: "我们如何知道？",
    body: `<p>理解认识世界有不同方式，反思结论、推理方法以及证据的质量与可靠性很重要。</p><div class="prompt"><strong>问题：</strong>我们如何知道？· 证据有多可靠？</div>`,
  },
  "Inquiry cycle (classroom-friendly)": {
    badge: "更多",
    title: "探究循环（课堂友好）",
    sub: "单元的灵活流程——不是死板清单",
    body: `<ul><li><strong>调适进入</strong> — 已有知识、疑问、投入</li><li><strong>发现了解</strong> — 研究、体验、收集数据</li><li><strong>整理分析</strong> — 组织、分析、建构意义</li><li><strong>深入拓展</strong> — 深入挖掘、个性化路径</li><li><strong>形成结论</strong> — 综合大概念</li><li><strong>采取行动</strong> — 真实应用 / 服务 / 分享</li><li><strong>反思</strong> — 贯穿始终，不只在结尾</li></ul><div class="prompt"><strong>说明：</strong>各校探究循环用语可能略有不同——请对齐本校课程探究计划与团队约定。</div>`,
  },
  "Action in the PYP": {
    badge: "更多",
    title: "PYP 中的行动",
    sub: "参与、倡导、社会正义、社会创业与生活方式选择",
    body: `<p>行动可以小而真实，往往源于主体性与反思。</p><ul><li>参与 — 加入、贡献</li><li>倡导 — 为事业或他人发声</li><li>社会正义 — 关注公平与平等的行动</li><li>社会创业 — 帮助他人的创意方案</li><li>生活方式选择 — 体现价值观的日常习惯</li></ul><div class="prompt"><strong>教师提示：</strong>既肯定过程与意图，也肯定大型公开项目。</div>`,
  },
  Agency: {
    badge: "更多",
    title: "主体性",
    sub: "学习中的声音、选择与自主权",
    body: `<p>当学生拥有声音、选择与自主权，并在教师作为学习伙伴的支持下学习时，就体现了学习者主体性。</p><ul><li><strong>声音</strong> — 想法与意见被重视</li><li><strong>选择</strong> — 在合适时对学什么、怎么学有有意义的选项</li><li><strong>自主权</strong> — 对学习目标与下一步负责</li></ul><div class="prompt"><strong>试试：</strong>共同建构成功标准 · 提供路径选择 · 学生主导反思</div>`,
  },
  "Programme of Inquiry (POI)": {
    badge: "更多",
    title: "探究课程计划（POI）",
    sub: "全校超学科单元地图",
    body: `<p>每所 PYP 学校都会设计探究课程计划——一份连贯的、校本的、按六个超学科主题与年级编排的单元地图。</p><ul><li>单元以概念为驱动、以探究为基础</li><li>中心思想框定单元持久理解</li><li>探究线索、关键概念与学习方法引导学习</li><li>纵向与横向协作保持计划平衡</li></ul><div class="prompt"><strong>教师提示：</strong>把本指南与本校 POI 文件放在一起用——本地中心思想优先。</div>`,
  },
  "Central idea & lines of inquiry": {
    badge: "更多",
    title: "中心思想与探究线索",
    sub: "规划与评估的单元主轴",
    body: `<ul><li><strong>中心思想</strong> — 概念性理解陈述（不是话题标签）</li><li><strong>探究线索</strong> — 3–4 条支撑中心思想的线索</li><li><strong>教师问题 / 学生问题</strong> — 推动真实探究</li><li><strong>评估</strong> — 关注对中心思想的理解证据，而不仅是完成活动</li></ul><div class="prompt"><strong>检查：</strong>如果“话题外壳”变了，学生是否仍能理解中心思想？</div>`,
  },
};

const UI = {
  en: {
    h1: "IB PYP Pocket Guide",
    tagline: "Themes · ATLs · Learner Profile · Key concepts — quick classroom reference",
    search: "Search themes, skills, attributes…",
    tabs: {
      all: "All",
      themes: "Themes",
      atl: "ATLs",
      profile: "Learner Profile",
      concepts: "Key concepts",
      more: "More",
    },
    footer:
      "Unofficial classroom aid for teachers. Align planning with your school’s Programme of Inquiry and the latest IB PYP documentation. Not affiliated with or endorsed by the International Baccalaureate Organization.",
    empty: "No matches. Try another keyword.",
    langBtn: "中文",
  },
  zh: {
    h1: "IB PYP 口袋指南",
    tagline: "超学科主题 · 学习方法 · 学习者培养目标 · 关键概念 — 课堂速查",
    search: "搜索主题、技能、特质…",
    tabs: {
      all: "全部",
      themes: "主题",
      atl: "学习方法",
      profile: "培养目标",
      concepts: "关键概念",
      more: "更多",
    },
    footer:
      "教师课堂非官方参考。请结合本校探究课程计划与最新 IB PYP 文件进行规划。本工具与国际文凭组织无关联，亦未获其认可。",
    empty: "无匹配结果，请换个关键词试试。",
    langBtn: "English",
  },
};

let uiLang = localStorage.getItem("token-moose-ib-lang") || "en";

function tSection(key) {
  if (uiLang === "zh") return SECTION_TITLES_ZH[key] || SECTION_TITLES[key] || key;
  return SECTION_TITLES[key] || key;
}

function cardView(d) {
  if (uiLang === "zh" && ZH[d.title]) {
    const z = ZH[d.title];
    return {
      title: z.title,
      sub: z.sub,
      badge: z.badge,
      body: z.body,
    };
  }
  return {
    title: d.title,
    sub: d.sub,
    badge: d.badge,
    body: d.body,
  };
}

function applyChrome() {
  const u = UI[uiLang] || UI.en;
  const h1 = document.querySelector(".hero h1");
  const tag = document.querySelector(".hero .tagline");
  const search = document.getElementById("search");
  const footer = document.querySelector("footer.note p");
  const langBtn = document.getElementById("btn-lang");
  if (h1) h1.textContent = u.h1;
  if (tag) tag.textContent = u.tagline;
  if (search) search.placeholder = u.search;
  if (footer) footer.textContent = u.footer;
  if (langBtn) {
    langBtn.textContent = u.langBtn;
    langBtn.setAttribute("data-lang", uiLang);
  }
  document.querySelectorAll(".tab").forEach((btn) => {
    const key = btn.getAttribute("data-section");
    if (key && u.tabs[key]) btn.textContent = u.tabs[key];
  });
  document.documentElement.setAttribute("lang", uiLang === "zh" ? "zh-CN" : "en");
}

function render() {
  applyChrome();
  const q = (document.getElementById("search").value || "").trim().toLowerCase();
  const section = document.querySelector(".tab.is-active")?.dataset.section || "all";
  const root = document.getElementById("content");
  root.innerHTML = "";

  let items = DATA.filter((d) => {
    if (section !== "all" && d.section !== section) return false;
    if (!q) return true;
    const v = cardView(d);
    const hay = `${d.title} ${d.sub} ${d.tags} ${d.body} ${v.title} ${v.sub} ${v.body}`.toLowerCase();
    return hay.includes(q);
  });

  if (!items.length) {
    root.innerHTML = `<p class="empty">${(UI[uiLang] || UI.en).empty}</p>`;
    return;
  }

  let lastSection = null;
  items.forEach((d) => {
    if (section === "all" && d.section !== lastSection) {
      lastSection = d.section;
      const lab = document.createElement("div");
      lab.className = "section-label";
      lab.textContent = tSection(d.section);
      root.appendChild(lab);
    }

    const v = cardView(d);
    const card = document.createElement("article");
    card.className = "card";
    card.dataset.section = d.section;
    card.innerHTML = `
      <button type="button" class="card-head" aria-expanded="false">
        <span class="card-emoji" aria-hidden="true">${d.emoji}</span>
        <span class="card-titles">
          <h2 class="card-title">${escapeHtml(v.title)}</h2>
          <p class="card-sub">${escapeHtml(v.sub)}</p>
        </span>
        <span class="badge ${d.badgeClass}">${escapeHtml(v.badge)}</span>
        <span class="chevron" aria-hidden="true">▼</span>
      </button>
      <div class="card-body">${v.body}</div>
    `;
    const head = card.querySelector(".card-head");
    head.addEventListener("click", () => {
      const open = card.classList.toggle("is-open");
      head.setAttribute("aria-expanded", open ? "true" : "false");
    });
    root.appendChild(card);
  });
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("search").addEventListener("input", render);
  document.getElementById("tabs").addEventListener("click", (e) => {
    const btn = e.target.closest(".tab");
    if (!btn) return;
    document.querySelectorAll(".tab").forEach((t) => t.classList.remove("is-active"));
    btn.classList.add("is-active");
    render();
  });
  const langBtn = document.getElementById("btn-lang");
  if (langBtn) {
    langBtn.addEventListener("click", () => {
      uiLang = uiLang === "en" ? "zh" : "en";
      try {
        localStorage.setItem("token-moose-ib-lang", uiLang);
      } catch (_) {}
      render();
    });
  }
  render();
});
