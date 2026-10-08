import { createClient } from "@/lib/supabase/client";
import { getLessonBlockCount, PATH_ID } from "@/data/curious-builders-path";
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

function lessonTotalSteps(lessonSlug: string): number | undefined {
  return getLessonBlockCount(lessonSlug);
}

/** True when the learner finished, even if the DB flag was never set. */
export function isLessonProgressComplete(
  progress: LessonProgress | null | undefined,
  totalSteps?: number
): boolean {
  if (!progress) return false;
  if (progress.completed === true) return true;
  if (progress.progress_percent >= 100) return true;
  const steps = totalSteps ?? lessonTotalSteps(progress.lesson_slug);
  if (steps && progress.last_position >= steps - 1) return true;
  return false;
}

export function normalizeLessonProgress(
  progress: LessonProgress,
  totalSteps?: number
): LessonProgress {
  const steps = totalSteps ?? lessonTotalSteps(progress.lesson_slug);
  if (!isLessonProgressComplete(progress, steps)) return progress;

  return {
    ...progress,
    completed: true,
    progress_percent: 100,
    last_position: steps ? steps - 1 : progress.last_position,
  };
}

async function resolveProgressUserId(userId?: string): Promise<string | null> {
  if (userId) return userId;

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user?.id ?? null;
}

async function repairIncompleteCompletion(
  userId: string,
  pathId: string,
  progress: LessonProgress,
  totalSteps: number
): Promise<void> {
  if (progress.completed || !isLessonProgressComplete(progress, totalSteps)) {
    return;
  }

  await saveLessonProgress(
    {
      pathId,
      lessonSlug: progress.lesson_slug,
      step: totalSteps - 1,
      totalSteps,
      markComplete: true,
    },
    userId
  );
}

export async function fetchPathProgressSnapshot(
  pathId: string
): Promise<PathProgressSnapshot> {
  const config = getCertificatePath(pathId);
  const totalLessons = config?.lessonSlugs.length ?? 0;

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      progressMap: getGuestProgressMapForDisplay(pathId),
      pathComplete: false,
      certificateIssued: false,
      completedLessons: 0,
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
    const normalized = normalizeLessonProgress(row);
    progressMap.set(row.lesson_slug, normalized);

    const steps = lessonTotalSteps(row.lesson_slug);
    if (steps) {
      void repairIncompleteCompletion(user.id, pathId, row, steps);
    }
  }

  const normalizedRows = [...progressMap.values()];
  const completedLessons = config
    ? config.lessonSlugs.filter((slug) =>
        isLessonProgressComplete(progressMap.get(slug))
      ).length
    : 0;

  return {
    progressMap,
    pathComplete: isPathFullyComplete(pathId, normalizedRows),
    certificateIssued: hasCertificateIssued(pathId, rows),
    completedLessons,
    totalLessons,
  };
}

export async function fetchLessonProgressMap(
  pathId: string = PATH_ID
): Promise<Map<string, LessonProgress>> {
  const snapshot = await fetchPathProgressSnapshot(pathId);
  return snapshot.progressMap;
}

export async function fetchLessonProgress(
  lessonSlug: string,
  pathId: string = PATH_ID,
  authenticatedUserId?: string
): Promise<LessonProgress | null> {
  const userId = await resolveProgressUserId(authenticatedUserId);

  if (!userId) {
    const guest = getGuestLessonProgress(pathId, lessonSlug);
    return guest ? normalizeLessonProgress(guest) : null;
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("lesson_progress")
    .select("lesson_slug, completed, progress_percent, last_position")
    .eq("user_id", userId)
    .eq("course_slug", pathId)
    .eq("lesson_slug", lessonSlug)
    .maybeSingle();

  if (error || !data) return null;

  const totalSteps = lessonTotalSteps(lessonSlug);
  const normalized = normalizeLessonProgress(
    data,
    totalSteps
  );

  if (totalSteps) {
    void repairIncompleteCompletion(userId, pathId, data, totalSteps);
  }

  return normalized;
}

export async function saveLessonProgress(
  opts: {
    pathId?: string;
    lessonSlug: string;
    step: number;
    totalSteps: number;
    markComplete?: boolean;
  },
  authenticatedUserId?: string
): Promise<boolean> {
  const pathId = opts.pathId ?? PATH_ID;
  const userId = await resolveProgressUserId(authenticatedUserId);

  if (!userId) {
    saveGuestLessonProgress({
      pathId,
      lessonSlug: opts.lessonSlug,
      step: opts.step,
      totalSteps: opts.totalSteps,
      markComplete: opts.markComplete,
    });
    return true;
  }

  const { lessonSlug, step, totalSteps, markComplete } = opts;
  const progressPercent = Math.round(((step + 1) / totalSteps) * 100);

  const supabase = createClient();
  const { data: existing, error: readError } = await supabase
    .from("lesson_progress")
    .select("id, completed, progress_percent, last_position")
    .eq("user_id", userId)
    .eq("course_slug", pathId)
    .eq("lesson_slug", lessonSlug)
    .maybeSingle();

  if (readError) return false;

  if (existing?.completed && !markComplete) {
    return true;
  }

  const completed =
    existing?.completed === true ||
    markComplete === true ||
    progressPercent >= 100;

  const row = {
    user_id: userId,
    course_slug: pathId,
    module_slug: pathId,
    lesson_slug: lessonSlug,
    progress_percent: completed
      ? 100
      : Math.max(existing?.progress_percent ?? 0, progressPercent),
    completed,
    last_position: completed
      ? totalSteps - 1
      : Math.max(existing?.last_position ?? 0, step),
    updated_at: new Date().toISOString(),
  };

  const { error: upsertError } = await supabase.from("lesson_progress").upsert(row, {
    onConflict: "user_id,course_slug,lesson_slug",
  });

  if (!upsertError) return true;

  if (!existing) {
    const { error: insertError } = await supabase.from("lesson_progress").insert(row);
    return !insertError;
  }

  const { error: updateError } = await supabase
    .from("lesson_progress")
    .update(row)
    .eq("user_id", userId)
    .eq("course_slug", pathId)
    .eq("lesson_slug", lessonSlug);

  return !updateError;
}
