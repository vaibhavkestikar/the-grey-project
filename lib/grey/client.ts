import type { GreyAwardEvent, GreyBadge } from "@/lib/grey/config";

type AwardInput = {
  eventType: GreyAwardEvent;
  pathId: string;
  lessonSlug?: string;
  stepIndex?: number;
  firstTry?: boolean;
  metadata?: Record<string, unknown>;
};

export type GreyAwardResponse = {
  pointsAwarded: number;
  totalPoints: number;
  availablePoints: number;
  badgesAwarded: GreyBadge[];
  currentStreak: number;
};

export async function awardGreyPoints(input: AwardInput) {
  const res = await fetch("/api/grey/award", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!res.ok) return null;
  return (await res.json()) as GreyAwardResponse;
}
