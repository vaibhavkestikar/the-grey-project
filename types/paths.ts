export type AudiencePath = {
  id: string;
  title: string;
  description: string;
  tagline?: string;
  who: string;
  why: string;
  outcomes: string;
  status: "live" | "coming_soon";
  href?: string;
  waitlistKey?: string;
  featured?: boolean;
  launchDate?: string;
  limitedSpots?: number;
  features?: string[];
};

export const FIRST_BUILD_LAUNCH_DATE = "2026-07-12T00:00:00+05:30";
export const FIRST_BUILD_LIMITED_SPOTS = 200;
export const FREE_LESSON_COUNT = 3;

export const CURIOUS_BUILDERS_PILLS = [
  "Completely free",
  "Completion certificate",
  "Interactive sandboxes",
] as const;

export const PAID_PATH_TRIAL_PILLS = [
  `First ${FREE_LESSON_COUNT} lessons free`,
  "Completion certificate",
] as const;

export const AUDIENCE_PATHS: AudiencePath[] = [
  {
    id: "curious-builders",
    title: "Curious Builders",
    description:
      "For founders, PMs, analysts, creators, and builders who use AI tools daily and want to make better product decisions with clear AI intuition.",
    who: "Founders, PMs, analysts, creators, and builders using AI daily.",
    why: "Bridge the gap between AI hype and product decisions you can defend.",
    outcomes:
      "Better prompts, clearer trade offs, safer AI features, and a completion certificate you can share.",
    status: "live",
    href: "/try/prediction",
  },
  {
    id: "first-build",
    title: "First Build",
    tagline: "From Idea to Working AI Feature",
    description:
      "You have the idea. You have the tabs open. Now actually ship something. Pick the right approach, build with modern tools, and walk away with a working AI powered feature, not a slide deck that ghosts you in week three.",
    who: "Developers, builders, PMs, and founders ready to ship their first real AI feature.",
    why: "Ideas are easy. A working feature that survives week two is the hard part.",
    outcomes:
      "A shipped AI powered workflow, clearer tool choices, and a certificate when you finish.",
    status: "coming_soon",
    waitlistKey: "first-build",
    featured: true,
    launchDate: FIRST_BUILD_LAUNCH_DATE,
    limitedSpots: FIRST_BUILD_LIMITED_SPOTS,
    features: [
      "Find a real problem worth solving (not \"ChatGPT but for cats\")",
      "Choose your approach without a 47 tab research spiral",
      "Build in sandboxes. Break on purpose. Fix like an adult.",
      "Ship something that survives demo day AND Tuesday morning",
      "Modern tools. Zero \"install Docker and pray\" energy.",
      "First 3 lessons free. Completion certificate when you finish the path.",
    ],
  },
  {
    id: "reliable-ai",
    title: "Reliable AI",
    tagline: "Grounding, Evals & Production",
    description:
      "Your demo wowed the room. Production laughed. Learn grounding, evals, guardrails, and how to tame hallucinations before they tame your roadmap.",
    who: "Engineers and PMs moving AI from demo to production.",
    why: "Impressive prototypes and embarrassed on call logs should not be the same project.",
    outcomes:
      "Grounded features, eval frameworks, guardrails, and fewer hallucination surprises.",
    status: "coming_soon",
    waitlistKey: "reliable-ai",
  },
  {
    id: "agentic-systems",
    title: "Agentic Systems",
    tagline: "Building Reliable Autonomous Workflows",
    description:
      "Multi step agents that do real work, not theatrical loops that burn tokens and confidence. Design workflows that still make sense when nobody is watching.",
    who: "Builders designing multi step AI workflows and autonomous agents.",
    why: "Agents that loop forever look smart in demos and expensive in prod.",
    outcomes:
      "Reliable agent design, workflow orchestration, and systems you can operate calmly.",
    status: "coming_soon",
    waitlistKey: "agentic-systems",
  },
  {
    id: "ai-strategy",
    title: "AI Strategy",
    tagline: "Decisions & Precision Communication",
    description:
      "Know when AI is the answer, when it is not, and how to explain both without sounding like a keynote or a doomer. Trade offs you can defend in the meeting.",
    who: "Leaders, PMs, and communicators deciding when and how to use AI.",
    why: "Bad AI strategy wastes budgets. Bad AI communication wastes trust.",
    outcomes:
      "Clear trade off decisions, accurate AI communication, and a certificate to prove it.",
    status: "coming_soon",
    waitlistKey: "ai-strategy",
  },
];

export function getPathById(id: string): AudiencePath | undefined {
  return AUDIENCE_PATHS.find((p) => p.id === id);
}

export const KNOWLEDGE_GRAPH_NODES = [
  "Prediction",
  "ML",
  "Optimization",
  "Neural Networks",
  "Embeddings",
  "Transformers",
  "Agents",
  "Production",
] as const;
