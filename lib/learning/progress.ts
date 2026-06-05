import { createClient } from "@/lib/supabase/client";
import { PATH_ID } from "@/data/curious-builders-path";

export type LessonProgress = {
  lesson_slug: string;
  completed: boolean;
  progress_percent: number;
  last_position: number;
};

export async function fetchLessonProgressMap(): Promise<
  Map<string, LessonProgress>
> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return new Map();

  const { data } = await supabase
    .from("lesson_progress")
    .select("lesson_slug, completed, progress_percent, last_position")
    .eq("user_id", user.id)
    .eq("course_slug", PATH_ID);

  const map = new Map<string, LessonProgress>();
  for (const row of data ?? []) {
    map.set(row.lesson_slug, row);
  }
  return map;
}

export async function fetchLessonProgress(
  lessonSlug: string
): Promise<LessonProgress | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data } = await supabase
    .from("lesson_progress")
    .select("lesson_slug, completed, progress_percent, last_position")
    .eq("user_id", user.id)
    .eq("lesson_slug", lessonSlug)
    .maybeSingle();

  return data;
}

export async function saveLessonProgress(opts: {
  lessonSlug: string;
  step: number;
  totalSteps: number;
  markComplete?: boolean;
}): Promise<void> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { lessonSlug, step, totalSteps, markComplete } = opts;
  const progressPercent = Math.round(((step + 1) / totalSteps) * 100);

  const { data: existing } = await supabase
    .from("lesson_progress")
    .select("id, completed, progress_percent")
    .eq("user_id", user.id)
    .eq("lesson_slug", lessonSlug)
    .maybeSingle();

  const completed =
    existing?.completed || markComplete || progressPercent >= 100;
  const row = {
    user_id: user.id,
    course_slug: PATH_ID,
    module_slug: PATH_ID,
    lesson_slug: lessonSlug,
    progress_percent: completed
      ? 100
      : Math.max(existing?.progress_percent ?? 0, progressPercent),
    completed,
    last_position: completed ? totalSteps - 1 : step,
    updated_at: new Date().toISOString(),
  };

  if (!existing) {
    await supabase.from("lesson_progress").insert(row);
  } else {
    await supabase
      .from("lesson_progress")
      .update(row)
      .eq("user_id", user.id)
      .eq("lesson_slug", lessonSlug);
  }
}
