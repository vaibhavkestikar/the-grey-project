import { CURIOUS_BUILDERS_LESSONS, PATH_ID } from "@/data/curious-builders-path";

/** Path id → free lesson slugs. Extend when new paths ship free previews. */
const FREE_LESSON_SLUGS_BY_PATH: Record<string, readonly string[]> = {
  [PATH_ID]: CURIOUS_BUILDERS_LESSONS.filter((l) => l.free).map((l) => l.slug),
};

export function isFreeLesson(pathId: string, lessonSlug: string): boolean {
  return FREE_LESSON_SLUGS_BY_PATH[pathId]?.includes(lessonSlug) ?? false;
}

export function getFreeLessonSlugs(pathId: string): string[] {
  return [...(FREE_LESSON_SLUGS_BY_PATH[pathId] ?? [])];
}
