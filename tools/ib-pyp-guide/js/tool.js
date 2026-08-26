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
const TITLE_ZH = {
  "Who we are": "我们是谁",
  "Where we are in place and time": "我们身处什么时空",
  "How we express ourselves": "我们如何表达自己",
  "How the world works": "世界如何运作",
  "How we organize ourselves": "我们如何组织自己",
  "Sharing the planet": "共享地球",
  "Inquirers": "探究者",
  "Knowledgeable": "知识渊博的人",
  "Thinkers": "思考者",
  "Communicators": "交流者",
  "Principled": "有原则的人",
  "Open-minded": "胸襟开阔的人",
  "Caring": "富有同情心的人",
  "Risk-takers": "敢于冒风险的人",
  "Balanced": "全面发展的人",
  "Reflective": "反思的人",
  "Form": "形式",
  "Function": "功能",
  "Causation": "因果关系",
  "Change": "变化",
  "Connection": "联系",
  "Perspective": "观点",
  "Responsibility": "责任",
};

let uiLang = localStorage.getItem("token-moose-ib-lang") || "en";

function tSection(key) {
  if (uiLang === "zh") return SECTION_TITLES_ZH[key] || SECTION_TITLES[key] || key;
  return SECTION_TITLES[key] || key;
}
function tTitle(en) {
  if (uiLang === "zh" && TITLE_ZH[en]) return TITLE_ZH[en];
  return en;
}

function render() {
  const q = (document.getElementById("search").value || "").trim().toLowerCase();
  const section = document.querySelector(".tab.is-active")?.dataset.section || "all";
  const root = document.getElementById("content");
  root.innerHTML = "";

  let items = DATA.filter((d) => {
    if (section !== "all" && d.section !== section) return false;
    if (!q) return true;
    const hay = `${d.title} ${d.sub} ${d.tags} ${d.body}`.toLowerCase();
    return hay.includes(q);
  });

  if (!items.length) {
    root.innerHTML = `<p class="empty">${uiLang === "zh" ? "无匹配结果" : "No matches. Try another keyword."}</p>`;
    return;
  }

  let lastSection = null;
  items.forEach((d, i) => {
    if (section === "all" && d.section !== lastSection) {
      lastSection = d.section;
      const lab = document.createElement("div");
      lab.className = "section-label";
      lab.textContent = tSection(d.section);
      root.appendChild(lab);
    }

    const card = document.createElement("article");
    card.className = "card";
    card.dataset.section = d.section;
    card.innerHTML = `
      <button type="button" class="card-head" aria-expanded="false">
        <span class="card-emoji" aria-hidden="true">${d.emoji}</span>
        <span class="card-titles">
          <h2 class="card-title">${escapeHtml(tTitle(d.title))}</h2>
          <p class="card-sub">${escapeHtml(d.sub)}</p>
        </span>
        <span class="badge ${d.badgeClass}">${escapeHtml(d.badge)}</span>
        <span class="chevron" aria-hidden="true">▼</span>
      </button>
      <div class="card-body">${d.body}</div>
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
    const syncLabel = () => {
      langBtn.textContent = uiLang === "en" ? "中文" : "English";
      langBtn.setAttribute("data-lang", uiLang);
    };
    syncLabel();
    langBtn.addEventListener("click", () => {
      uiLang = uiLang === "en" ? "zh" : "en";
      try {
        localStorage.setItem("token-moose-ib-lang", uiLang);
      } catch (_) {}
      syncLabel();
      render();
    });
  }
  render();
});
