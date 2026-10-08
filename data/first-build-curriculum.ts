export const FIRST_BUILD_CURRICULUM_HERO = {
  eyebrow: "Learning path",
  title: "First Build",
  subtitle: "Ship Your First Production Ready AI Feature",
  meta: [
    "8 Interactive Chapters",
    "Scenario Based Role Play",
    "Browser Sandboxes",
    "Build + Polish Loops",
    "Grey Points & Badges",
  ],
};

export const FIRST_BUILD_VALUE_PROPS = [
  {
    label: "Who this is for",
    accent: "amber",
    text: "Developers, builders, PMs, and founders who are ready to move beyond demos and ship their first real AI feature that survives real usage, stakeholders, and production realities.",
  },
  {
    label: "Why this exists",
    accent: "orange",
    text: "Most people can build an impressive AI demo. Very few can scope a valuable problem, build it reliably, evaluate it properly, and ship something that works on Tuesday morning. This path closes that gap through immersive, real world practice.",
  },
  {
    label: "What changes after",
    accent: "fuchsia",
    text: "You will have shipped a working AI feature end to end, developed stronger prompt and coding skills through deliberate practice, and gained the confidence to navigate real organizational constraints, trade offs, and production challenges.",
  },
] as const;

export const FIRST_BUILD_HOW_IT_WORKS = {
  title: "Learn by Shipping",
  items: [
    {
      icon: "🎭",
      label: "Immersive role play",
      detail:
        "Join Lumina Co. as an AI Engineer building LuminaAssist, an AI powered support ticket triage and smart response system. Every decision affects stakeholder trust.",
    },
    {
      icon: "📖",
      label: "Persistent narrative",
      detail:
        "A continuous story with recurring stakeholders (CEO, Head of CS, Support Lead) that threads through all chapters.",
    },
    {
      icon: "🔄",
      label: "Build + Polish Loops",
      detail:
        "Build → Measure → Refine → Measure again with clear metrics (accuracy, groundedness, latency, cost). Improvement is tracked and rewarded.",
    },
    {
      icon: "🐍",
      label: "Interactive sandboxes",
      detail:
        "Write and iterate on real code and prompts directly in the browser. No setup required.",
    },
    {
      icon: "🏆",
      label: "Grey Points & progression",
      detail:
        "Earn points for correct decisions, measurable improvements, and completed polish loops. Redeem for exclusive templates and playbooks.",
    },
    {
      icon: "🚀",
      label: "Working model at the end",
      detail:
        "By the final chapter, you will have a functional, evaluated, and monitored version of LuminaAssist that you can export and showcase.",
    },
  ],
  flow: "Narrative trigger & role play → Build first version in sandbox → Polish Loop (measure & improve) → Apply in story context → Checkpoint & reflection.",
};

export const FIRST_BUILD_OUTCOMES = [
  "Scope a high impact, achievable AI feature by identifying real business pain and avoiding common scope creep traps.",
  "Align stakeholders on clear success metrics, trade offs, and what good looks like for a first version.",
  "Audit and prepare real world data and knowledge sources, recognizing quality and coverage gaps early.",
  "Make pragmatic architecture decisions between rules, simple models, RAG, and agentic approaches with clear reasoning.",
  "Build and iteratively improve a classification and triage system using structured prompting and code refactoring.",
  "Design and refine grounded response generation (RAG) with measurable improvements in accuracy and hallucination reduction.",
  "Implement guardrails, multi dimensional evaluation, and basic observability patterns suitable for production.",
  "Ship a v1 feature, set up basic monitoring, handle simulated production incidents, and communicate results to stakeholders.",
];

export type FirstBuildChapter = {
  order: number;
  title: string;
  time: string;
  focus: string;
  polishLoops: "Low" | "Medium" | "High" | "Very High";
  access: "Free" | "Account Required";
  summary: string;
  explore: string[];
  applyBlock: string;
};

export const FIRST_BUILD_CHAPTERS: FirstBuildChapter[] = [
  {
    order: 1,
    title: "The Urgent Ticket Crisis",
    time: "90–110 min",
    focus: "Discovery & Problem Framing",
    polishLoops: "Low",
    access: "Free",
    summary:
      "You join Lumina Co. on day one and immediately face a real crisis: the Customer Success team is overwhelmed and CSAT is dropping. Your first task is to understand the actual problem before jumping to solutions.",
    explore: [
      "Exploring real ticket data and volume patterns in an interactive dashboard",
      "Role play meetings with the Head of CS to uncover root causes",
      "Identifying repetitive vs. complex tickets and high impact opportunities",
      "Structured problem framing using a professional canvas",
      "Early risk identification (data quality, scope, integration)",
    ],
    applyBlock:
      "Complete a scoped problem statement and success metrics for LuminaAssist v1.",
  },
  {
    order: 2,
    title: "Aligning on Success",
    time: "70–90 min",
    focus: "Stakeholder Alignment & Metrics",
    polishLoops: "Low",
    access: "Account Required",
    summary:
      "With the problem framed, you must now align leadership and the support team on what success looks like, and what you are explicitly not building in v1.",
    explore: [
      "Role play negotiation with CEO and Head of CS on scope and priorities",
      "Defining measurable success metrics (business + technical)",
      "Setting realistic guardrails and constraints early",
      "Trade off discussions (speed vs. reliability vs. scope)",
    ],
    applyBlock:
      "Finalized v1 spec and stakeholder aligned success criteria.",
  },
  {
    order: 3,
    title: "Knowledge Foundation",
    time: "80–100 min",
    focus: "Data Audit & Preparation",
    polishLoops: "Medium",
    access: "Account Required",
    summary:
      "You audit Lumina Co.'s scattered knowledge sources and discover the messy reality of production data.",
    explore: [
      "Interactive audit of the knowledge base and past tickets",
      "Identifying coverage gaps and quality issues",
      "Chunking and preparation strategies for retrieval",
      "Communicating data limitations to stakeholders",
    ],
    applyBlock:
      "Prepared knowledge subset + documented risks and mitigations.",
  },
  {
    order: 4,
    title: "Architecture Decisions",
    time: "70–90 min",
    focus: "Choosing the Right Approach",
    polishLoops: "Medium",
    access: "Account Required",
    summary:
      'Faced with pressure to "build an autonomous agent," you must make a pragmatic architecture choice.',
    explore: [
      "Decision framework: rules vs. ML vs. RAG vs. agents",
      "Trade offs in cost, latency, maintainability, and reliability",
      "Role play defense of your recommendation to leadership",
    ],
    applyBlock:
      "Documented architecture decision with clear rationale.",
  },
  {
    order: 5,
    title: "Triage Engine",
    time: "120–150 min",
    focus: "Build + Polish Classification",
    polishLoops: "Very High",
    access: "Account Required",
    summary:
      "You build the core ticket classification and routing system, then deliberately improve it.",
    explore: [
      "Building an initial classifier in the sandbox",
      "Polish Loop 1: Prompt improvement with structured outputs and few shot examples",
      "Polish Loop 2: Code refactoring for clarity and maintainability",
      "Measuring accuracy before and after each iteration",
      "Demoing the improved version inside the story",
    ],
    applyBlock:
      "Improved triage component with before/after metrics and Improvement Log entry.",
  },
  {
    order: 6,
    title: "Grounded Responses",
    time: "120–150 min",
    focus: "Build + Polish RAG",
    polishLoops: "Very High",
    access: "Account Required",
    summary:
      "You add the ability to generate helpful, grounded responses using the company's knowledge.",
    explore: [
      "Building a baseline RAG pipeline",
      "Polish Loop 1: Advanced retrieval and prompting techniques for grounding",
      "Polish Loop 2: Adding verification and citation patterns",
      "Measuring groundedness and hallucination reduction",
      "Integrating feedback from support agents in the narrative",
    ],
    applyBlock:
      "Refined grounded response system with measurable improvement and logged learnings.",
  },
  {
    order: 7,
    title: "Production Hardening",
    time: "110–140 min",
    focus: "Guardrails, Evals & Observability",
    polishLoops: "Very High",
    access: "Account Required",
    summary:
      "Before shipping, you harden the system against real production risks.",
    explore: [
      "Implementing guardrails (policy, tone, safety)",
      "Building multi dimensional evaluation (accuracy, groundedness, latency, cost)",
      "Adding basic tracing and logging",
      "Polish Loop: Improving eval coverage and observability",
      "Simulating failure modes and mitigation",
    ],
    applyBlock:
      "Hardened system with guardrails active and evaluation dashboard.",
  },
  {
    order: 8,
    title: "Ship & Survive Week 2",
    time: "100–130 min",
    focus: "Integration, Monitoring & Iteration",
    polishLoops: "High",
    access: "Account Required",
    summary:
      'You integrate everything, "ship" v1, and then handle the reality of production.',
    explore: [
      "Full end to end integration in the sandbox",
      "Setting up basic monitoring and alerting",
      "Handling simulated Week 2 incidents (drift, cost spike, quality issues)",
      "Final role play demo to leadership and support team",
      "Post ship reflection and iteration planning",
    ],
    applyBlock:
      "Shipped working LuminaAssist v1 + monitoring setup + Improvement Log + exportable artifact.",
  },
];

export const FIRST_BUILD_ASSESSMENT = {
  formative:
    "Interactive checkpoints and sandbox evaluations provide immediate feedback. Incorrect answers or lower eval scores trigger insights and guidance. Grey Points are awarded for both completion and measurable improvement in polish loops.",
  summative:
    "Complete all chapters, including every Build + Polish Loop and the final shipped model with Improvement Log.",
  certificate:
    "Upon completion you receive a shareable PDF certificate from The Grey Project, your exported working LuminaAssist model + Improvement Log (strong portfolio piece), and badges for key achievements (e.g., Scoped MVP, Polish Master, Week 2 Survivor).",
  note: "This is a practical, project based micro credential focused on shipping real AI features. It emphasizes decision making, iterative improvement, and production awareness alongside technical skills.",
};
