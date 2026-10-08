import { awardGreyPoints } from "@/lib/grey/client";
import {
  clearGuestProgress,
  getAllGuestLessonRecords,
  isGuestSampleFinished,
  type GuestLessonRecord,
} from "@/lib/learning/guest-progress";
import { isFreeLesson } from "@/lib/learning/free-lessons";
import { createClient } from "@/lib/supabase/client";

async function mergeGuestLessonRecord(
  userId: string,
  guest: GuestLessonRecord
): Promise<boolean> {
  if (!isFreeLesson(guest.pathId, guest.lessonSlug)) return true;

  const supabase = createClient();
  const { data: existing } = await supabase
    .from("lesson_progress")
    .select("id, completed, progress_percent, last_position")
    .eq("user_id", userId)
    .eq("course_slug", guest.pathId)
    .eq("lesson_slug", guest.lessonSlug)
    .maybeSingle();

  const guestComplete = isGuestSampleFinished(guest);
  const completed = existing?.completed === true || guestComplete;
  const progressPercent = completed
    ? 100
    : Math.max(existing?.progress_percent ?? 0, guest.progress_percent);
  const lastPosition = completed
    ? Math.max(existing?.last_position ?? 0, guest.last_position)
    : Math.max(existing?.last_position ?? 0, guest.last_position);

  const row = {
    user_id: userId,
    course_slug: guest.pathId,
    module_slug: guest.pathId,
    lesson_slug: guest.lessonSlug,
    progress_percent: progressPercent,
    completed,
    last_position: lastPosition,
    updated_at: new Date().toISOString(),
  };

  if (!existing) {
    const { error } = await supabase.from("lesson_progress").insert(row);
    if (error) return false;
  } else if (
    completed !== existing.completed ||
    progressPercent > (existing.progress_percent ?? 0) ||
    lastPosition > (existing.last_position ?? 0)
  ) {
    const { error: updateError } = await supabase
      .from("lesson_progress")
      .update(row)
      .eq("user_id", userId)
      .eq("course_slug", guest.pathId)
      .eq("lesson_slug", guest.lessonSlug);
    if (updateError) {
      const { error: upsertError } = await supabase.from("lesson_progress").upsert(row, {
        onConflict: "user_id,course_slug,lesson_slug",
      });
      if (upsertError) return false;
    }
  }

  for (const event of guest.pendingEvents) {
    await awardGreyPoints(event);
  }

  return true;
}

let mergeInFlight: Promise<boolean> | null = null;

function mergedSessionKey(userId: string) {
  return `tgf:guest-merged:${userId}`;
}

export function isGuestProgressMerged(userId: string): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(mergedSessionKey(userId)) === "1";
}

/** Merge anonymous free-lesson progress and Grey Points after sign-in. */
export async function mergeGuestProgressOnSignIn(): Promise<boolean> {
  if (mergeInFlight) return mergeInFlight;

  mergeInFlight = (async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return false;

    if (isGuestProgressMerged(user.id)) {
      return true;
    }

    const guestLessons = getAllGuestLessonRecords();
    if (guestLessons.length === 0) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem(mergedSessionKey(user.id), "1");
      }
      return true;
    }

    const results = await Promise.all(
      guestLessons.map((guest) => mergeGuestLessonRecord(user.id, guest))
    );
    if (results.some((merged) => !merged)) return false;

    clearGuestProgress();
    if (typeof window !== "undefined") {
      sessionStorage.setItem(mergedSessionKey(user.id), "1");
    }
    return true;
  })();

  try {
    return await mergeInFlight;
  } finally {
    mergeInFlight = null;
  }
}
