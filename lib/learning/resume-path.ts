import type { LessonSummary } from "@/data/curious-builders-path";

import {
  isLessonProgressComplete,
  type LessonProgress,
} from "@/lib/learning/progress";

export function getNextIncompleteLesson(
  lessons: LessonSummary[],
  progressMap: Map<string, LessonProgress>
): LessonSummary | undefined {
  return lessons.find(
    (lesson) =>
      !isLessonProgressComplete(
        progressMap.get(lesson.slug),
        lesson.blockCount
      )
  );
}

export function getPathContinueHref(
  pathId: string,
  lessons: LessonSummary[],
  progressMap: Map<string, LessonProgress>
): string {
  const nextLesson = getNextIncompleteLesson(lessons, progressMap);
  return nextLesson
    ? `/learning/${pathId}/${nextLesson.slug}`
    : `/learning/${pathId}`;
}