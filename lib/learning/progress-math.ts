import type { LessonProgress } from "@/lib/learning/progress";

export function computeProgressPercent(
  lastPosition: number,
  totalSteps: number
): number {
  if (totalSteps <= 0) return 0;
  return Math.min(100, Math.round(((lastPosition + 1) / totalSteps) * 100));
}

export function buildLessonProgressRow(opts: {
  lessonSlug: string;
  lastPosition: number;
  totalSteps: number;
  completed?: boolean;
}): LessonProgress {
  const completed =
    opts.completed ??
    (opts.totalSteps > 0 && opts.lastPosition >= opts.totalSteps - 1);

  return {
    lesson_slug: opts.lessonSlug,
    completed,
    progress_percent: completed
      ? 100
      : computeProgressPercent(opts.lastPosition, opts.totalSteps),
    last_position: opts.lastPosition,
  };
}