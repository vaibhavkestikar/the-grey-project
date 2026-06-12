import type { StructuredLesson } from "@/types/lesson";

export const PATH_ID = "curious-builders";

/** Lightweight lesson metadata for lists and routing (no block content). */
export type LessonSummary = {
  id: string;
  slug: string;
  title: string;
  hook: string;
  concept: string;
  durationMinutes: number;
  pathId: string;
  order: number;
  free?: boolean;
  blockCount: number;
  relatedBlogSlugs?: string[];
};

export const CURIOUS_BUILDERS_LESSONS: LessonSummary[] = [
  {
    id: "prediction",
    slug: "prediction",
    title: "AI Is Prediction",
    hook: "One sentence explains every AI product ever built. Here it is.",
    concept: "prediction",
    durationMinutes: 16,
    pathId: PATH_ID,
    free: true,
    order: 1,
    blockCount: 12,
    relatedBlogSlugs: [],
  },
  {
    id: "classical-vs-ml",
    slug: "classical-vs-ml",
    title: "Rules Versus Learning",
    hook: "I have saved three projects from the rules trap. Here is how to spot it before it costs you.",
    concept: "supervised-learning",
    durationMinutes: 16,
    pathId: PATH_ID,
    free: false,
    order: 2,
    blockCount: 12,
    relatedBlogSlugs: [],
  },
  {
    id: "prompting",
    slug: "prompting",
    title: "Talking to AI: Prompting",
    hook: "The prompt is the program. Write it badly, get bad software.",
    concept: "prompting",
    durationMinutes: 16,
    pathId: PATH_ID,
    free: false,
    order: 3,
    blockCount: 12,
    relatedBlogSlugs: [],
  },
  {
    id: "tokens-embeddings",
    slug: "tokens-embeddings",
    title: "How AI Reads: Tokens and Meaning",
    hook: "Every weird model failure you have ever seen traces back to this. Here is what is actually happening.",
    concept: "tokens-and-embeddings",
    durationMinutes: 16,
    pathId: PATH_ID,
    free: false,
    order: 4,
    blockCount: 12,
    relatedBlogSlugs: [],
  },
  {
    id: "neurons",
    slug: "neurons",
    title: "Neurons and Deep Learning",
    hook: "Every 10x engineer I know says the same thing: once you see how it works, the magic goes away, and the leverage arrives.",
    concept: "neural-networks",
    durationMinutes: 18,
    pathId: PATH_ID,
    free: false,
    order: 5,
    blockCount: 12,
    relatedBlogSlugs: [],
  },
  {
    id: "hallucinations",
    slug: "hallucinations",
    title: "Why AI Makes Things Up",
    hook: "It is not a bug. It is not going to be patched. Here is what it actually is, and how to design around it.",
    concept: "hallucinations",
    durationMinutes: 15,
    pathId: PATH_ID,
    free: false,
    order: 6,
    blockCount: 11,
    relatedBlogSlugs: [],
  },
  {
    id: "ml-workflow",
    slug: "ml-workflow",
    title: "The Real ML Workflow",
    hook: "The model is 20% of the work. Here is what the other 80% looks like, and why most teams never talk about it.",
    concept: "ml-workflow",
    durationMinutes: 18,
    pathId: PATH_ID,
    free: false,
    order: 7,
    blockCount: 11,
    relatedBlogSlugs: [],
  },
];

const LESSON_LOADERS: Record<
  string,
  () => Promise<{ default: StructuredLesson }>
> = {
  prediction: () =>
    import("@/content/lessons/lesson-prediction").then((m) => ({
      default: m.lessonPrediction,
    })),
  "classical-vs-ml": () =>
    import("@/content/lessons/lesson-classical-vs-ml").then((m) => ({
      default: m.lessonClassicalVsMl,
    })),
  prompting: () =>
    import("@/content/lessons/lesson-prompting").then((m) => ({
      default: m.lessonPrompting,
    })),
  "tokens-embeddings": () =>
    import("@/content/lessons/lesson-tokens-embeddings").then((m) => ({
      default: m.lessonTokensEmbeddings,
    })),
  neurons: () =>
    import("@/content/lessons/lesson-neurons").then((m) => ({
      default: m.lessonNeurons,
    })),
  hallucinations: () =>
    import("@/content/lessons/lesson-hallucinations").then((m) => ({
      default: m.lessonHallucinations,
    })),
  "ml-workflow": () =>
    import("@/content/lessons/lesson-ml-workflow").then((m) => ({
      default: m.lessonMlWorkflow,
    })),
};

export const CURIOUS_BUILDERS_PATH = {
  id: PATH_ID,
  title: "Curious Builders",
  subtitle: "AI Fundamentals for Founders, Product Managers & Analysts",
  tagline:
    "7 Interactive Lessons · Python in Your Browser · 100% Free · No Setup Required",
  cardSummary:
    "From prediction to production ML. Interactive steps, browser Python, and a completion certificate.",
  description:
    "Learn how AI actually works, then run the math yourself. Write spam filters, simulate data leakage, and run the sigmoid inside every AI neuron in code you can edit. For founders, PMs, analysts, and builders who are done nodding in meetings and Googling on mute.",
  get totalMinutes() {
    return CURIOUS_BUILDERS_LESSONS.reduce(
      (sum, l) => sum + l.durationMinutes,
      0
    );
  },
  get lessonCount() {
    return CURIOUS_BUILDERS_LESSONS.length;
  },
  get freeCount() {
    return CURIOUS_BUILDERS_LESSONS.filter((l) => l.free).length;
  },
};

export const FREE_LESSON_SLUGS = [
  "prediction",
  "classical-vs-ml",
] as const;

export function getLessonBySlug(slug: string): LessonSummary | undefined {
  return CURIOUS_BUILDERS_LESSONS.find((l) => l.slug === slug);
}

export function getLessonBlockCount(slug: string): number | undefined {
  return getLessonBySlug(slug)?.blockCount;
}

export async function getLessonBySlugAsync(
  slug: string
): Promise<StructuredLesson | undefined> {
  const loader = LESSON_LOADERS[slug];
  if (!loader) return undefined;
  const { default: lesson } = await loader();
  return lesson;
}

export function getFreeLessons(): LessonSummary[] {
  return CURIOUS_BUILDERS_LESSONS.filter((l) => l.free);
}

export function getNextLessonSlug(slug: string): string | null {
  const idx = CURIOUS_BUILDERS_LESSONS.findIndex((l) => l.slug === slug);
  if (idx < 0 || idx >= CURIOUS_BUILDERS_LESSONS.length - 1) return null;
  return CURIOUS_BUILDERS_LESSONS[idx + 1].slug;
}

export function isLastLessonInPath(slug: string): boolean {
  const idx = CURIOUS_BUILDERS_LESSONS.findIndex((l) => l.slug === slug);
  return idx === CURIOUS_BUILDERS_LESSONS.length - 1;
}

/** Legacy MDX lesson slugs → V2 slugs */
export const LEGACY_LESSON_REDIRECT: Record<string, string> = {
  "lesson-1": "prediction",
  "lesson-2": "classical-vs-ml",
  "lesson-3": "ml-workflow",
  "lesson-4": "ml-workflow",
  "lesson-5": "neurons",
  "lesson-6": "neurons",
};