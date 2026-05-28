"use client";

import { useLessonProgress } from "@/hooks/use-lesson-progress";

type Props = {
  courseSlug: string;
  moduleSlug: string;
  lessonSlug: string;
  progressPercent: number;
};

export default function LessonTracker({
  courseSlug,
  moduleSlug,
  lessonSlug,
  progressPercent,
}: Props) {

  useLessonProgress({

    courseSlug,
    moduleSlug,
    lessonSlug,
    progressPercent,

  });

  return null;

}