import type { StructuredLesson } from "@/types/lesson";

import {
  isLessonProgressComplete,
  type LessonProgress,
} from "@/lib/learning/progress";

export function getNextIncompleteLesson(
  lessons: StructuredLesson[],
  progressMap: Map<string, LessonProgress>
): StructuredLesson | undefined {
  return lessons.find(
    (lesson) =>
      !isLessonProgressComplete(
        progressMap.get(lesson.slug),
        lesson.blocks.length
      )
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
