export type AudiencePath = {
  id: string;
  title: string;
  description: string;
  tagline?: string;
  status: "live" | "coming_soon";
  href?: string;
  waitlistKey?: string;
  featured?: boolean;
  launchDate?: string;
  limitedSpots?: number;
  features?: string[];
};

export const FRESHERS_LAUNCH_DATE = "2026-07-12T00:00:00+05:30";
export const FRESHERS_LIMITED_SPOTS = 200;

export const AUDIENCE_PATHS: AudiencePath[] = [
  {
    id: "curious-builders",
    title: "Curious Builders",
    description:
      "For founders, PMs, analysts, creators, and builders who use AI tools daily and want to make better product decisions with clear AI intuition.",
    status: "live",
    href: "/try/prediction",
  },
  {
    id: "freshers",
    title: "Freshers",
    tagline: "Zero experience. Zero panic.",
    description:
      "Starting your AI career with real intuition, not the kind you fake in your first standup.",
    status: "coming_soon",
    waitlistKey: "freshers",
    featured: true,
    launchDate: FRESHERS_LAUNCH_DATE,
    limitedSpots: FRESHERS_LIMITED_SPOTS,
    features: [
      "Interactive chapters you'll actually remember (not death by slide PDFs)",
      "Role play scenarios. Be the intern, the PM, or the confused stakeholder.",
      "Scenario based lessons built around real \"oh no\" moments at work",
      "Live code sandboxes. Write, break, fix, repeat. No setup required.",
      "Completion certificate you can add to your profile and portfolio",
      "100% free. We said it twice because people don't believe us the first time.",
    ],
  },
  {
    id: "junior-ds",
    title: "Junior Data Scientists",
    description:
      "Your notebook works. Production doesn't. Let's fix that before your manager asks why.",
    status: "coming_soon",
    waitlistKey: "junior-ds",
  },
  {
    id: "software-engineers",
    title: "Software Engineers",
    description:
      "Integrate AI into products without copy pasting Stack Overflow and praying.",
    status: "coming_soon",
    waitlistKey: "software-engineers",
  },
  {
    id: "senior-ai",
    title: "Senior AI Engineers",
    description:
      "LLMs, agents, and scale. For people who've seen things in prod and lived to tell.",
    status: "coming_soon",
    waitlistKey: "senior-ai",
  },
  {
    id: "creators",
    title: "Content Creators",
    description:
      "Explain AI accurately to your audience. No \"AI will replace everyone by Tuesday\" takes.",
    status: "coming_soon",
    waitlistKey: "creators",
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
