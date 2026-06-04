export type AudiencePath = {
  id: string;
  title: string;
  description: string;
  status: "live" | "coming_soon";
  href?: string;
  waitlistKey?: string;
};

export const AUDIENCE_PATHS: AudiencePath[] = [
  {
    id: "curious-builders",
    title: "Curious Builders",
    description:
      "You use ChatGPT daily. You want to understand what's actually happening under the hood.",
    status: "live",
    href: "/try/prediction",
  },
  {
    id: "freshers",
    title: "Freshers",
    description: "Starting your AI career with strong intuition, not buzzwords.",
    status: "coming_soon",
    waitlistKey: "freshers",
  },
  {
    id: "junior-ds",
    title: "Junior Data Scientists",
    description: "Bridge the gap between notebooks and production ML systems.",
    status: "coming_soon",
    waitlistKey: "junior-ds",
  },
  {
    id: "software-engineers",
    title: "Software Engineers",
    description: "Integrate AI into products with engineering clarity.",
    status: "coming_soon",
    waitlistKey: "software-engineers",
  },
  {
    id: "senior-ai",
    title: "Senior AI Engineers",
    description: "Deep systems thinking for LLMs, agents, and scale.",
    status: "coming_soon",
    waitlistKey: "senior-ai",
  },
  {
    id: "creators",
    title: "Content Creators",
    description: "Explain AI accurately to your audience.",
    status: "coming_soon",
    waitlistKey: "creators",
  },
];

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
