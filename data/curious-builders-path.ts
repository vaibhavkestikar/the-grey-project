import type { StructuredLesson } from "@/types/lesson";

import { lessonClassicalVsMl } from "@/content/lessons/lesson-classical-vs-ml";
import { lessonHallucinations } from "@/content/lessons/lesson-hallucinations";
import { lessonMlWorkflow } from "@/content/lessons/lesson-ml-workflow";
import { lessonNeurons } from "@/content/lessons/lesson-neurons";
import { lessonPrediction } from "@/content/lessons/lesson-prediction";
import { lessonPrompting } from "@/content/lessons/lesson-prompting";
import { lessonTokensEmbeddings } from "@/content/lessons/lesson-tokens-embeddings";

export const PATH_ID = "curious-builders";

export const CURIOUS_BUILDERS_LESSONS: StructuredLesson[] = [
  lessonPrediction,
  lessonClassicalVsMl,
  lessonPrompting,
  lessonTokensEmbeddings,
  lessonNeurons,
  lessonHallucinations,
  lessonMlWorkflow,
];

export const CURIOUS_BUILDERS_PATH = {
  id: PATH_ID,
  title: "Curious Builders",
  subtitle: "Learn AI. Never Forget.",
  description:
    "Interactive, first principles lessons for people who use AI tools daily and want to know what is actually happening, not just that it works.",
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

export function getLessonBySlug(slug: string): StructuredLesson | undefined {
  return CURIOUS_BUILDERS_LESSONS.find((l) => l.slug === slug);
}

export function getFreeLessons(): StructuredLesson[] {
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
