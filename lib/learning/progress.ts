import { createClient } from "@/lib/supabase/client";
import { PATH_ID } from "@/data/curious-builders-path";
import {
  getCertificatePath,
  hasCertificateIssued,
  isPathFullyComplete,
} from "@/lib/learning/certificate";
import {
  getGuestLessonProgress,
  getGuestProgressMapForDisplay,
  saveGuestLessonProgress,
} from "@/lib/learning/guest-progress";

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

  if (!user) {
    const progressMap = getGuestProgressMapForDisplay(pathId);
    const completedLessons = 0;
    const rows = [...progressMap.values()].map((row) => ({
      lesson_slug: row.lesson_slug,
      completed: false,
    }));

    return {
      progressMap,
      pathComplete: false,
      certificateIssued: false,
      completedLessons,
      totalLessons,
    };
  }

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

export async function fetchLessonProgressMap(
  pathId: string = PATH_ID
): Promise<Map<string, LessonProgress>> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return getGuestProgressMapForDisplay(pathId);

  const { data } = await supabase
    .from("lesson_progress")
    .select("lesson_slug, completed, progress_percent, last_position")
    .eq("user_id", user.id)
    .eq("course_slug", pathId);

  const map = new Map<string, LessonProgress>();
  for (const row of data ?? []) {
    map.set(row.lesson_slug, row);
  }
  return map;
}

export async function fetchLessonProgress(
  lessonSlug: string,
  pathId: string = PATH_ID,
  authenticatedUserId?: string | null
): Promise<LessonProgress | null> {
  const hasKnownAuth = authenticatedUserId !== undefined;
  let userId = authenticatedUserId;

  if (!hasKnownAuth) {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    userId = user?.id ?? null;
  }

  if (!userId) return getGuestLessonProgress(pathId, lessonSlug);

  const supabase = createClient();
  const { data } = await supabase
    .from("lesson_progress")
    .select("lesson_slug, completed, progress_percent, last_position")
    .eq("user_id", userId)
    .eq("course_slug", pathId)
    .eq("lesson_slug", lessonSlug)
    .maybeSingle();

  return data;
}

export async function saveLessonProgress(
  opts: {
    pathId?: string;
    lessonSlug: string;
    step: number;
    totalSteps: number;
    markComplete?: boolean;
  },
  authenticatedUserId?: string | null
): Promise<void> {
  const pathId = opts.pathId ?? PATH_ID;
  const hasKnownAuth = authenticatedUserId !== undefined;
  let userId = authenticatedUserId;

  if (!hasKnownAuth) {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    userId = user?.id ?? null;
  }

  if (!userId) {
    saveGuestLessonProgress({
      pathId,
      lessonSlug: opts.lessonSlug,
      step: opts.step,
      totalSteps: opts.totalSteps,
      markComplete: opts.markComplete,
    });
    return;
  }

  const { lessonSlug, step, totalSteps, markComplete } = opts;
  const progressPercent = Math.round(((step + 1) / totalSteps) * 100);

  const supabase = createClient();
  const { data: existing } = await supabase
    .from("lesson_progress")
    .select("id, completed, progress_percent, last_position")
    .eq("user_id", userId)
    .eq("course_slug", pathId)
    .eq("lesson_slug", lessonSlug)
    .maybeSingle();

  if (existing?.completed && !markComplete) {
    return;
  }

  const completed = markComplete === true || progressPercent >= 100;
  const row = {
    user_id: userId,
    course_slug: pathId,
    module_slug: pathId,
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
      .eq("user_id", userId)
      .eq("lesson_slug", lessonSlug);
  }
}
