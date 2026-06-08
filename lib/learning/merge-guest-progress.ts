import { awardGreyPoints } from "@/lib/grey/client";
import {
  clearGuestProgress,
  getAllGuestLessonRecords,
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
    .eq("lesson_slug", guest.lessonSlug)
    .maybeSingle();

  const completed = existing?.completed || guest.completed;
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
    const { error } = await supabase
      .from("lesson_progress")
      .update(row)
      .eq("user_id", userId)
      .eq("lesson_slug", guest.lessonSlug);
    if (error) return false;
  }

  for (const event of guest.pendingEvents) {
    await awardGreyPoints(event);
  }

  return true;
}

let mergeInFlight: Promise<boolean> | null = null;

/** Merge anonymous free-lesson progress and Grey Points after sign-in. */
export async function mergeGuestProgressOnSignIn(): Promise<boolean> {
  if (mergeInFlight) return mergeInFlight;

  mergeInFlight = (async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return false;

    const guestLessons = getAllGuestLessonRecords();
    if (guestLessons.length === 0) return true;

    for (const guest of guestLessons) {
      const merged = await mergeGuestLessonRecord(user.id, guest);
      if (!merged) return false;
    }

    clearGuestProgress();
    return true;
  })();

  try {
    return await mergeInFlight;
  } finally {
    mergeInFlight = null;
  }
}
