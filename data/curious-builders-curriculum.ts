export const CURRICULUM_HERO = {
  eyebrow: "Curious Builders",
  title: "AI Fundamentals for Founders, Product Managers & Analysts",
  meta: [
    "7 Interactive Lessons",
    "Python in Your Browser",
    "100% Free",
    "No Setup Required",
  ],
};

export const CURRICULUM_VALUE_PROPS = [
  {
    label: "Who this is for",
    accent: "cyan",
    text: "Founders, PMs, analysts, and curious builders who use AI tools daily and want clear intuition, not hype.",
  },
  {
    label: "Why this exists",
    accent: "violet",
    text: "Most people can use AI tools. Very few can explain, evaluate, or improve them. This path closes that gap with hands on understanding.",
  },
  {
    label: "What changes after",
    accent: "amber",
    text: "You make clearer AI product decisions, write better prompts, and catch hallucination risks before they ship.",
  },
] as const;

export const HOW_IT_WORKS = {
  title: "Learn by Doing",
  intro:
    "Each lesson is a sequence of concepts, live interactions, checkpoints, and Python sandboxes, not videos or walls of text.",
  items: [
    {
      icon: "✦",
      label: "Interactive every step",
      detail:
        "Concepts, interactions, checkpoints, and sandboxes in every lesson.",
    },
    {
      icon: "🐍",
      label: "Python runs in your browser",
      detail:
        "Write and run real code: spam filters, data leakage simulations, sigmoid neurons, tokenizers, instantly editable.",
    },
    {
      icon: "✓",
      label: "Checkpoints that teach",
      detail:
        "Wrong answers show exactly why you were wrong and deliver the insight that makes it stick.",
    },
    {
      icon: "⚡",
      label: "Apply block in every lesson",
      detail:
        "Role specific actions for PMs, founders, builders, and analysts you can use today.",
    },
  ],
  flow: "Read for ~90 seconds → run actual Python in the browser → drag a slider or edit code → answer checkpoint → apply to your work today.",
};

export const INTENDED_OUTCOMES = [
  "Explain AI as prediction and map that single idea to every product feature you will ever evaluate, from recommendations to agents.",
  "Choose rules versus learning with clear, defensible trade offs in maintainability, data requirements, explainability, and performance, not gut feel.",
  "Write prompts that are structured, testable, and versionable, dramatically more reliable than ad hoc prompting.",
  "Understand token economics and their direct, measurable effects on cost, latency, context limits, and model behavior.",
  "Explain embedding based search and why it fundamentally outperforms keyword matching for semantic retrieval use cases.",
  "Recognize hallucinations as a design problem, not a bug to be patched, and implement grounding, verification, and honest refusal patterns.",
  "Walk the full ML workflow (frame → data → train → evaluate → deploy → monitor) and identify the dominant failure modes and mitigation strategies at each stage.",
];

export type CurriculumLessonRow = {
  order: number;
  title: string;
  slug: string;
  minutes: number;
  steps: number;
  access: "Free Preview" | "Account Required";
  hook: string;
  summary: string;
  explore: string[];
  applyBlock: string;
};

export const CURRICULUM_LESSONS: CurriculumLessonRow[] = [
  {
    order: 1,
    title: "AI Is Prediction",
    slug: "prediction",
    minutes: 16,
    steps: 12,
    access: "Free Preview",
    hook: "One sentence explains every AI product ever built. Here it is.",
    summary:
      "This foundational lesson establishes the single most powerful mental model in modern AI: almost every capability we call artificial intelligence is, at its core, a sophisticated prediction system. Understanding this reframes how you evaluate features, set expectations, and spot opportunities.",
    explore: [
      "The prediction paradigm and why it unifies chat, recommendations, vision, agents, and more",
      "Live Python demonstrations showing prediction in action",
      "Immediate mapping of this lens to real product decisions",
    ],
    applyBlock:
      "Role specific questions and exercises for Founders, PMs, Analysts, and Builders to apply the prediction lens to their current work.",
  },
  {
    order: 2,
    title: "Rules Versus Learning",
    slug: "classical-vs-ml",
    minutes: 16,
    steps: 12,
    access: "Account Required",
    hook: "I have saved three projects from the rules trap. Here is how to spot it before it costs you.",
    summary:
      "Not every problem needs machine learning. Many are better solved faster, cheaper, and more reliably with explicit rules or heuristics. This lesson teaches you to diagnose the right approach before you over engineer or under engineer.",
    explore: [
      "Clear decision criteria: when rules win vs. when learning wins",
      "Trade offs in maintainability, data hunger, explainability, and adaptability",
      "Real world project rescue stories and anti patterns to avoid",
    ],
    applyBlock:
      "Decision framework you can use in your next scoping meeting or architecture discussion.",
  },
  {
    order: 3,
    title: "Talking to AI: Prompting",
    slug: "prompting",
    minutes: 16,
    steps: 12,
    access: "Account Required",
    hook: "The prompt is the program. Write it badly, get bad software.",
    summary:
      "Prompting is software engineering for probabilistic systems. This lesson treats prompts as code: structure, modularity, testing, iteration, and version control. Move from artisanal prompting to reliable, repeatable results.",
    explore: [
      "Structural patterns: system prompts, few shot, chain of thought, self consistency",
      "How to test and measure prompt quality systematically",
      "Common failure modes and how to debug them like a developer",
    ],
    applyBlock:
      "Prompt templates and testing checklist tailored to your role and use cases.",
  },
  {
    order: 4,
    title: "How AI Reads: Tokens and Meaning",
    slug: "tokens-embeddings",
    minutes: 16,
    steps: 12,
    access: "Account Required",
    hook: "Every weird model failure you have ever seen traces back to this. Here is what is actually happening.",
    summary:
      "Tokenization is the hidden foundation of how language models perceive the world. Misunderstandings here explain many surprising failures in long context reasoning, cost explosions, and strange output artifacts.",
    explore: [
      "How tokenizers actually work (subword units, BPE, etc.)",
      "The relationship between tokens, context windows, and economics",
      "Why certain inputs cause models to forget or behave erratically",
    ],
    applyBlock:
      "Practical guidelines for context management, cost estimation, and prompt length optimization in production features.",
  },
  {
    order: 5,
    title: "Neurons and Deep Learning",
    slug: "neurons",
    minutes: 18,
    steps: 12,
    access: "Account Required",
    hook: "Every 10x engineer I know says the same thing: once you see how it works, the magic goes away, and the leverage arrives.",
    summary:
      "Demystify the black box. This lesson gives you an intuitive, code first understanding of neural networks, from single neurons to deep stacks, so you can reason about capabilities, limitations, and scaling without needing a PhD.",
    explore: [
      "The perceptron and activation functions (including sigmoid) in live code",
      "How layers compose to create complex decision boundaries",
      "Why depth and scale produce emergent abilities and where they still fail",
    ],
    applyBlock:
      "Mental models and conversation frameworks for discussing model size, fine tuning vs. prompting, and capability claims with technical teams.",
  },
  {
    order: 6,
    title: "Why AI Makes Things Up",
    slug: "hallucinations",
    minutes: 15,
    steps: 11,
    access: "Account Required",
    hook: "It is not a bug. It is not going to be patched. Here is what it actually is, and how to design around it.",
    summary:
      "Hallucinations are an inherent property of how generative models complete statistical patterns. This lesson explains the mechanism and gives you concrete design patterns to reduce risk in production AI features.",
    explore: [
      "The statistical roots of hallucination in autoregressive generation",
      "Grounding techniques, retrieval augmented generation (RAG) basics, and verification loops",
      "Designing for appropriate refusal and uncertainty communication",
    ],
    applyBlock:
      "Risk assessment checklist and mitigation patterns you can apply to any generative AI feature before it ships.",
  },
  {
    order: 7,
    title: "The Real ML Workflow",
    slug: "ml-workflow",
    minutes: 18,
    steps: 11,
    access: "Account Required",
    hook: "The model is 20% of the work. Here is what the other 80% looks like, and why most teams never talk about it.",
    summary:
      "Building and shipping reliable AI systems is mostly not about training models. This lesson maps the full lifecycle most teams under invest in: problem framing, data quality, evaluation beyond accuracy, deployment realities, monitoring, and feedback loops.",
    explore: [
      "The six stage ML lifecycle and dominant failure modes at each stage",
      "Why just call the API is rarely the hard part in production",
      "What good evaluation, monitoring, and iteration actually look like in practice",
    ],
    applyBlock:
      "Lifecycle audit questions and red flags to raise in planning, vendor selection, or internal AI initiative reviews.",
  },
];

export const ASSESSMENT_SECTION = {
  formative:
    "Every lesson includes multiple interactive checkpoints designed for learning, not testing. Incorrect answers trigger immediate explanatory feedback that addresses the exact misconception. No penalties, no frustrating try again loops, just insight.",
  summative:
    "Complete all seven lessons, including every checkpoint and step. Progress is tracked automatically. You can revisit any lesson at any time.",
  certificate:
    "Upon full completion you receive a shareable PDF certificate from The Grey Project validating your foundational AI literacy and practical decision making skills. The certificate includes lesson titles and total learning hours.",
  note: "This is a competency based micro credential focused on practical AI intuition for decision makers. It is not a replacement for deep technical ML engineering training, but an excellent on ramp or complement for non technical leaders and cross functional teams.",
};
