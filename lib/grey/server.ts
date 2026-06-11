import type { SupabaseClient, User } from "@supabase/supabase-js";

import {
  GREY_BADGES,
  GREY_POINT_VALUES,
  GREY_STORE_ITEMS,
  type GreyAwardEvent,
  type GreyBadge,
  getBadgeById,
  getPathLessonSlugs,
  getStoreItemById,
} from "@/lib/grey/config";
import { getLessonBlockCount } from "@/data/curious-builders-path";
import { buildGreyEventKey } from "@/lib/grey/event-key";
import { CERTIFICATE_PATHS } from "@/lib/learning/certificate";
import { isLessonProgressComplete } from "@/lib/learning/progress";

type GreyProfileRow = {
  total_points: number;
  spent_points: number;
  current_streak: number;
  longest_streak: number;
  last_activity_date: string | null;
};

export type GreyAwardInput = {
  eventType: GreyAwardEvent;
  pathId: string;
  lessonSlug?: string;
  stepIndex?: number;
  firstTry?: boolean;
  metadata?: Record<string, unknown>;
};

export type GreyAwardResult = {
  pointsAwarded: number;
  totalPoints: number;
  availablePoints: number;
  badgesAwarded: GreyBadge[];
  currentStreak: number;
};

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayIsoDate(today: string) {
  const date = new Date(`${today}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() - 1);
  return date.toISOString().slice(0, 10);
}

function pointsFor(input: GreyAwardInput) {
  if (input.eventType === "step_completed") return GREY_POINT_VALUES.stepCompleted;
  if (input.eventType === "deep_dive_opened") return GREY_POINT_VALUES.deepDiveOpened;
  if (input.eventType === "lesson_completed") return GREY_POINT_VALUES.lessonCompleted;
  if (input.eventType === "path_completed") return GREY_POINT_VALUES.pathCompleted;
  if (input.eventType === "checkpoint_correct") {
    return (
      GREY_POINT_VALUES.checkpointCorrect +
      (input.firstTry ? GREY_POINT_VALUES.checkpointFirstTryBonus : 0)
    );
  }
  return 0;
}

async function getOrCreateProfile(
  supabase: SupabaseClient,
  userId: string
): Promise<GreyProfileRow> {
  const { data } = await supabase
    .from("grey_profiles")
    .select("total_points, spent_points, current_streak, longest_streak, last_activity_date")
    .eq("user_id", userId)
    .maybeSingle();

  if (data) return data as GreyProfileRow;

  const fresh = {
    user_id: userId,
    total_points: 0,
    spent_points: 0,
    current_streak: 0,
    longest_streak: 0,
    last_activity_date: null,
  };

  await supabase.from("grey_profiles").insert(fresh);
  return fresh;
}

async function updateProfileAfterAward(
  supabase: SupabaseClient,
  userId: string,
  points: number
) {
  const profile = await getOrCreateProfile(supabase, userId);
  const today = todayIsoDate();
  const yesterday = yesterdayIsoDate(today);

  const currentStreak =
    profile.last_activity_date === today
      ? profile.current_streak
      : profile.last_activity_date === yesterday
        ? profile.current_streak + 1
        : 1;

  const totalPoints = profile.total_points + points;
  const longestStreak = Math.max(profile.longest_streak, currentStreak);

  await supabase
    .from("grey_profiles")
    .upsert(
      {
        user_id: userId,
        total_points: totalPoints,
        spent_points: profile.spent_points,
        current_streak: currentStreak,
        longest_streak: longestStreak,
        last_activity_date: today,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    );

  return {
    totalPoints,
    availablePoints: totalPoints - profile.spent_points,
    currentStreak,
  };
}

async function awardBadge(
  supabase: SupabaseClient,
  userId: string,
  badgeId: string,
  metadata: Record<string, unknown> = {}
) {
  const badge = getBadgeById(badgeId);
  if (!badge) return null;

  const { error } = await supabase.from("grey_badges").insert({
    user_id: userId,
    badge_id: badge.id,
    path_id: badge.pathId,
    lesson_slug: badge.lessonSlug ?? null,
    metadata,
  });

  if (error) return null;
  return badge;
}

async function isPathCompleteInProgress(
  supabase: SupabaseClient,
  userId: string,
  pathId: string
) {
  const lessonSlugs = getPathLessonSlugs(pathId);
  if (lessonSlugs.length === 0) return false;

  const { data } = await supabase
    .from("lesson_progress")
    .select("lesson_slug, completed, progress_percent, last_position")
    .eq("user_id", userId)
    .eq("course_slug", pathId);

  const progressBySlug = new Map((data ?? []).map((row) => [row.lesson_slug, row]));

  return lessonSlugs.every((slug) => {
    const progress = progressBySlug.get(slug);
    if (!progress) return false;
    return isLessonProgressComplete(
      {
        lesson_slug: slug,
        completed: Boolean(progress.completed),
        progress_percent: progress.progress_percent ?? 0,
        last_position: progress.last_position ?? 0,
      },
      getLessonBlockCount(slug)
    );
  });
}

async function maybeAwardPathCompletion(
  supabase: SupabaseClient,
  userId: string,
  pathId: string
) {
  const lessonSlugs = getPathLessonSlugs(pathId);
  if (lessonSlugs.length === 0) return { points: 0, badge: null as GreyBadge | null };

  const pathComplete = await isPathCompleteInProgress(supabase, userId, pathId);
  if (!pathComplete) return { points: 0, badge: null };

  const pathEvent: GreyAwardInput = { eventType: "path_completed", pathId };
  const key = buildGreyEventKey(pathEvent);
  const { data: existing } = await supabase
    .from("grey_points_ledger")
    .select("id")
    .eq("user_id", userId)
    .eq("event_key", key)
    .maybeSingle();

  if (existing) return { points: 0, badge: null };

  const points = pointsFor(pathEvent);
  const { error } = await supabase.from("grey_points_ledger").insert({
    user_id: userId,
    event_key: key,
    event_type: pathEvent.eventType,
    path_id: pathId,
    points,
    metadata: {},
  });

  if (error) return { points: 0, badge: null };

  const badge = await awardBadge(supabase, userId, "curious-builder", {
    reason: "path_completed",
  });

  return { points, badge };
}

async function evaluateBadges(
  supabase: SupabaseClient,
  userId: string,
  input: GreyAwardInput
) {
  const awarded: GreyBadge[] = [];

  if (input.eventType === "lesson_completed" && input.lessonSlug) {
    const lessonBadge = GREY_BADGES.find(
      (badge) => badge.pathId === input.pathId && badge.lessonSlug === input.lessonSlug
    );
    if (lessonBadge) {
      const badge = await awardBadge(supabase, userId, lessonBadge.id, {
        lessonSlug: input.lessonSlug,
      });
      if (badge) awarded.push(badge);
    }
  }

  if (input.eventType === "deep_dive_opened") {
    const { count } = await supabase
      .from("grey_points_ledger")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("path_id", input.pathId)
      .eq("event_type", "deep_dive_opened");

    if ((count ?? 0) >= 5) {
      const badge = await awardBadge(supabase, userId, "nerd-section-regular", {
        deepDiveCount: count ?? 0,
      });
      if (badge) awarded.push(badge);
    }
  }

  if (input.eventType === "lesson_completed") {
    const pathAward = await maybeAwardPathCompletion(supabase, userId, input.pathId);
    if (pathAward.badge) awarded.push(pathAward.badge);
    return { badges: awarded, extraPoints: pathAward.points };
  }

  return { badges: awarded, extraPoints: 0 };
}

async function validateGreyAwardInput(
  supabase: SupabaseClient,
  userId: string,
  input: GreyAwardInput
): Promise<boolean> {
  if (input.eventType === "path_completed") return false;

  if (!input.lessonSlug) return false;

  const blockCount = getLessonBlockCount(input.lessonSlug);
  if (!blockCount) return false;

  const { data: progress } = await supabase
    .from("lesson_progress")
    .select("completed, progress_percent, last_position")
    .eq("user_id", userId)
    .eq("course_slug", input.pathId)
    .eq("lesson_slug", input.lessonSlug)
    .maybeSingle();

  const lastPosition = progress?.last_position ?? -1;

  if (input.eventType === "lesson_completed") {
    if (!progress) return false;
    return isLessonProgressComplete(
      {
        lesson_slug: input.lessonSlug,
        completed: Boolean(progress.completed),
        progress_percent: progress.progress_percent ?? 0,
        last_position: progress.last_position ?? 0,
      },
      blockCount
    );
  }

  if (
    input.eventType === "step_completed" ||
    input.eventType === "checkpoint_correct" ||
    input.eventType === "deep_dive_opened"
  ) {
    if (input.stepIndex === undefined) return false;
    if (input.stepIndex < 0 || input.stepIndex >= blockCount) return false;
    return input.stepIndex <= lastPosition + 1;
  }

  return false;
}

export async function awardGreyPoints(
  supabase: SupabaseClient,
  user: User,
  input: GreyAwardInput
): Promise<GreyAwardResult> {
  const isValid = await validateGreyAwardInput(supabase, user.id, input);
  if (!isValid) {
    const summary = await getGreySummary(supabase, user.id);
    return {
      pointsAwarded: 0,
      totalPoints: summary.profile.totalPoints,
      availablePoints: summary.profile.availablePoints,
      badgesAwarded: [],
      currentStreak: summary.profile.currentStreak,
    };
  }

  const points = pointsFor(input);
  const key = buildGreyEventKey(input);

  const { data: existing } = await supabase
    .from("grey_points_ledger")
    .select("id")
    .eq("user_id", user.id)
    .eq("event_key", key)
    .maybeSingle();

  if (existing) {
    const summary = await getGreySummary(supabase, user.id);
    return {
      pointsAwarded: 0,
      totalPoints: summary.profile.totalPoints,
      availablePoints: summary.profile.availablePoints,
      badgesAwarded: [],
      currentStreak: summary.profile.currentStreak,
    };
  }

  const { error } = await supabase.from("grey_points_ledger").insert({
    user_id: user.id,
    event_key: key,
    event_type: input.eventType,
    path_id: input.pathId,
    lesson_slug: input.lessonSlug ?? null,
    step_index: input.stepIndex ?? null,
    points,
    metadata: {
      ...(input.metadata ?? {}),
      firstTry: input.firstTry ?? null,
    },
  });

  if (error) {
    const summary = await getGreySummary(supabase, user.id);
    return {
      pointsAwarded: 0,
      totalPoints: summary.profile.totalPoints,
      availablePoints: summary.profile.availablePoints,
      badgesAwarded: [],
      currentStreak: summary.profile.currentStreak,
    };
  }

  const badgeResult = await evaluateBadges(supabase, user.id, input);
  const profile = await updateProfileAfterAward(
    supabase,
    user.id,
    points + badgeResult.extraPoints
  );

  return {
    pointsAwarded: points + badgeResult.extraPoints,
    totalPoints: profile.totalPoints,
    availablePoints: profile.availablePoints,
    badgesAwarded: badgeResult.badges,
    currentStreak: profile.currentStreak,
  };
}

export async function getGreySummary(supabase: SupabaseClient, userId: string) {
  const profile = await getOrCreateProfile(supabase, userId);

  const [{ data: badges }, { data: redemptions }, { data: ledger }, { data: progress }] = await Promise.all([
    supabase
      .from("grey_badges")
      .select("badge_id, earned_at")
      .eq("user_id", userId)
      .order("earned_at", { ascending: false }),
    supabase.from("grey_store_redemptions").select("item_id").eq("user_id", userId),
    supabase
      .from("grey_points_ledger")
      .select("event_type, points, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(8),
    supabase
      .from("lesson_progress")
      .select("course_slug, lesson_slug, completed")
      .eq("user_id", userId),
  ]);

  const earnedBadges = (badges ?? [])
    .map((row) => {
      const badge = getBadgeById(row.badge_id);
      return badge ? { ...badge, earnedAt: row.earned_at } : null;
    })
    .filter(Boolean);

  const redeemed = new Set((redemptions ?? []).map((row) => row.item_id));
  const totalPoints = profile.total_points;
  const spentPoints = profile.spent_points;
  const progressRows = progress ?? [];
  const pathProgress = Object.values(CERTIFICATE_PATHS).map((path) => {
    const completedLessons = path.lessonSlugs.filter((slug) =>
      progressRows.some(
        (row) =>
          row.course_slug === path.id &&
          row.lesson_slug === slug &&
          row.completed === true
      )
    ).length;

    return {
      pathId: path.id,
      title: path.title,
      completedLessons,
      totalLessons: path.lessonSlugs.length,
      percent:
        path.lessonSlugs.length > 0
          ? Math.round((completedLessons / path.lessonSlugs.length) * 100)
          : 0,
    };
  });

  return {
    profile: {
      totalPoints,
      spentPoints,
      availablePoints: totalPoints - spentPoints,
      currentStreak: profile.current_streak,
      longestStreak: profile.longest_streak,
      lastActivityDate: profile.last_activity_date,
    },
    pathProgress,
    badges: earnedBadges,
    store: GREY_STORE_ITEMS.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      cost: item.cost,
      redeemed: redeemed.has(item.id),
      filename: item.filename,
    })),
    recentEvents: ledger ?? [],
  };
}

export async function redeemGreyStoreItem(
  supabase: SupabaseClient,
  userId: string,
  itemId: string
) {
  const item = getStoreItemById(itemId);
  if (!item) {
    return { ok: false as const, error: "Unknown Grey Store item." };
  }

  const summary = await getGreySummary(supabase, userId);
  const storeItem = summary.store.find((entry) => entry.id === itemId);
  if (storeItem?.redeemed) {
    return { ok: true as const, item, alreadyRedeemed: true };
  }

  if (summary.profile.availablePoints < item.cost) {
    return { ok: false as const, error: "Not enough Grey Points yet." };
  }

  const { error } = await supabase.from("grey_store_redemptions").insert({
    user_id: userId,
    item_id: itemId,
    points_spent: item.cost,
  });

  if (error) {
    return { ok: false as const, error: error.message };
  }

  await supabase
    .from("grey_profiles")
    .update({
      spent_points: summary.profile.spentPoints + item.cost,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId);

  return { ok: true as const, item, alreadyRedeemed: false };
}
