import type { GreyAwardEvent } from "@/lib/grey/config";

export type GreyEventKeyInput = {
  eventType: GreyAwardEvent;
  pathId: string;
  lessonSlug?: string;
  stepIndex?: number;
};

export function buildGreyEventKey(input: GreyEventKeyInput): string {
  return [
    input.eventType,
    input.pathId,
    input.lessonSlug ?? "path",
    input.stepIndex ?? "all",
  ].join(":");
}
