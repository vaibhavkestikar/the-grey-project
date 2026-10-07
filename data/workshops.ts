export const WORKSHOP_INQUIRY_HREF = "/for-colleges#inquiry";

export type WorkshopSession = {
  slug: "theory" | "agentic-project";
  href: string;
  eyebrow: string;
  title: string;
  summary: string;
  who: string[];
  covered: string[];
  outcome: string;
  orderLabel: string;
};

export const WORKSHOP_SESSIONS: WorkshopSession[] = [
  {
    slug: "theory",
    href: "/workshops/theory",
    eyebrow: "Session 1",
    title: "Theory & Industry Landscape",
    summary:
      "What AI actually looks like in Indian industry: real roles, real skills, and what is automatable versus not — grounded, not hype. This session runs first.",
    who: [
      "Engineering students who want a clear picture of AI work before they specialize",
      "Placement cells and faculty who need industry-credible framing, not a trends talk",
    ],
    covered: [
      "How AI shows up in product and analytics teams — not as a single job title",
      "Skills that still require human judgment versus work that is increasingly automated",
      "How to read industry claims: what to trust, what to ignore",
      "A shared vocabulary so the project session is not guesswork",
    ],
    outcome:
      "Students leave with a realistic map of AI work and a certificate of completion they can add to a resume or LinkedIn — issued after the workshop, not as a game unlock.",
    orderLabel: "Credibility session · runs first",
  },
  {
    slug: "agentic-project",
    href: "/workshops/agentic-project",
    eyebrow: "Session 2",
    title: "Agentic AI Project Build",
    summary:
      "Hands-on session. Students ship an end-to-end software project with agentic AI coding, stay in control of what the agent writes, and walk away with a portfolio piece.",
    who: [
      "Students who want a resume project, including those with little or no prior coding",
      "Colleges that want a tangible deliverable, not another lecture recording",
    ],
    covered: [
      "Build end-to-end software projects on your own using agentic AI coding, even with zero prior coding experience",
      "Learn the best practices for making AI agents work for you, streamlining your software development workflow",
      "Read and understand what an agent generates, using Claude Skills, so you stay fully in control of your project",
    ],
    outcome:
      "A project you can show, plus a certificate of completion for resume and LinkedIn.",
    orderLabel: "Hands-on session · portfolio deliverable",
  },
];

export function getWorkshopBySlug(slug: WorkshopSession["slug"]) {
  return WORKSHOP_SESSIONS.find((s) => s.slug === slug);
}
