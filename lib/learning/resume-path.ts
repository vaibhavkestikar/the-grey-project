import type { StructuredLesson } from "@/types/lesson";

import type { LessonProgress } from "@/lib/learning/progress";

export function getNextIncompleteLesson(
  lessons: StructuredLesson[],
  progressMap: Map<string, LessonProgress>
): StructuredLesson | undefined {
  return lessons.find(
    (lesson) => progressMap.get(lesson.slug)?.completed !== true
  );
}

export function getPathContinueHref(
  pathId: string,
  lessons: StructuredLesson[],
  progressMap: Map<string, LessonProgress>
): string {
  const nextLesson = getNextIncompleteLesson(lessons, progressMap);
  return nextLesson
    ? `/learning/${pathId}/${nextLesson.slug}`
    : `/learning/${pathId}`;
}
