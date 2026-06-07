import { createClient } from "@/lib/supabase/client";
import { PATH_ID } from "@/data/curious-builders-path";
import {
  getCertificatePath,
  hasCertificateIssued,
  isPathFullyComplete,
} from "@/lib/learning/certificate";

export type LessonProgress = {
  lesson_slug: string;
  completed: boolean;
  progress_percent: number;
  last_position: number;
};

export type PathProgressSnapshot = {
  progressMap: Map<string, LessonProgress>;
  pathComplete: boolean;
  certificateIssued: boolean;
  completedLessons: number;
  totalLessons: number;
};

export async function fetchPathProgressSnapshot(
  pathId: string
): Promise<PathProgressSnapshot> {
  const config = getCertificatePath(pathId);
  const totalLessons = config?.lessonSlugs.length ?? 0;
  const empty: PathProgressSnapshot = {
    progressMap: new Map(),
    pathComplete: false,
    certificateIssued: false,
    completedLessons: 0,
    totalLessons,
  };

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return empty;

  const { data } = await supabase
    .from("lesson_progress")
    .select(
      "lesson_slug, completed, progress_percent, last_position, certificate_issued"
    )
    .eq("user_id", user.id)
    .eq("course_slug", pathId);

  const rows = data ?? [];
  const progressMap = new Map<string, LessonProgress>();
  for (const row of rows) {
    progressMap.set(row.lesson_slug, row);
  }

  const completedLessons = config
    ? config.lessonSlugs.filter(
        (slug) => progressMap.get(slug)?.completed === true
      ).length
    : 0;

  return {
    progressMap,
    pathComplete: isPathFullyComplete(pathId, rows),
    certificateIssued: hasCertificateIssued(pathId, rows),
    completedLessons,
    totalLessons,
  };
}

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
