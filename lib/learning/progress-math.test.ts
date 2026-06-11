import { describe, expect, it } from "vitest";

import {
  buildLessonProgressRow,
  computeProgressPercent,
} from "@/lib/learning/progress-math";

describe("progress-math", () => {
  it("computes percent from position and total steps", () => {
    expect(computeProgressPercent(0, 10)).toBe(10);
    expect(computeProgressPercent(9, 10)).toBe(100);
  });

  it("marks lesson complete on final step", () => {
    const row = buildLessonProgressRow({
      lessonSlug: "prediction",
      lastPosition: 11,
      totalSteps: 12,
    });

    expect(row.completed).toBe(true);
    expect(row.progress_percent).toBe(100);
  });
});