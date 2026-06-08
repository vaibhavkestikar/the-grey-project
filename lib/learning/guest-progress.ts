import { buildGreyEventKey } from "@/lib/grey/event-key";
import type { GreyAwardEvent } from "@/lib/grey/config";
import { isFreeLesson } from "@/lib/learning/free-lessons";
import type { LessonProgress } from "@/lib/learning/progress";

const STORAGE_KEY = "tgf:guest-learning:v2";
const BACKUP_KEY = "tgf:guest-learning-backup:v2";

export type GuestGreyEvent = {
  eventType: GreyAwardEvent;
  pathId: string;
  lessonSlug?: string;
  stepIndex?: number;
  firstTry?: boolean;
  metadata?: Record<string, unknown>;
};

export type GuestLessonRecord = {
  pathId: string;
  lessonSlug: string;
  /** True only after the guest finishes the sample and taps Create free account. */
  completed: boolean;
  progress_percent: number;
  last_position: number;
  pendingEvents: GuestGreyEvent[];
  updatedAt: string;
};

type GuestStore = {
  lessons: Record<string, GuestLessonRecord>;
};

function lessonKey(pathId: string, lessonSlug: string) {
  return `${pathId}:${lessonSlug}`;
}

function readRawStore(key: string): GuestStore {
  if (typeof window === "undefined") return { lessons: {} };

  try {
    const raw = localStorage.getItem(key);
    if (!raw) return { lessons: {} };
    return JSON.parse(raw) as GuestStore;
  } catch {
    return { lessons: {} };
  }
}

function readBackupStore(): GuestStore {
  if (typeof window === "undefined") return { lessons: {} };

  try {
    const raw = sessionStorage.getItem(BACKUP_KEY);
    if (!raw) return { lessons: {} };
    return JSON.parse(raw) as GuestStore;
  } catch {
    return { lessons: {} };
  }
}

function readStore(): GuestStore {
  return readRawStore(STORAGE_KEY);
}

function backupStore(store: GuestStore) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(BACKUP_KEY, JSON.stringify(store));
}

function writeStore(store: GuestStore) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  backupStore(store);
}

function toLessonProgress(record: GuestLessonRecord): LessonProgress {
  return {
    lesson_slug: record.lessonSlug,
    completed: record.completed,
    progress_percent: record.progress_percent,
    last_position: record.last_position,
  };
}

/** Raw guest progress for lesson resume + signup merge. */
export function getGuestLessonProgress(
  pathId: string,
  lessonSlug: string
): LessonProgress | null {
  const record = readStore().lessons[lessonKey(pathId, lessonSlug)];
  return record ? toLessonProgress(record) : null;
}

export function getGuestProgressMap(pathId: string): Map<string, LessonProgress> {
  const map = new Map<string, LessonProgress>();
  for (const record of Object.values(readStore().lessons)) {
    if (record.pathId !== pathId) continue;
    map.set(record.lessonSlug, toLessonProgress(record));
  }
  return map;
}

/** Anonymous path lists never show a completed badge — only in-progress. */
export function getGuestProgressMapForDisplay(
  pathId: string
): Map<string, LessonProgress> {
  const map = new Map<string, LessonProgress>();
  for (const record of Object.values(readStore().lessons)) {
    if (record.pathId !== pathId) continue;
    map.set(record.lessonSlug, {
      lesson_slug: record.lessonSlug,
      completed: false,
      progress_percent: record.progress_percent,
      last_position: record.last_position,
    });
  }
  return map;
}

export function getAllGuestLessonRecords(): GuestLessonRecord[] {
  const primary = readStore();
  if (Object.keys(primary.lessons).length > 0) {
    return Object.values(primary.lessons);
  }

  return Object.values(readBackupStore().lessons);
}

export function saveGuestLessonProgress(opts: {
  pathId: string;
  lessonSlug: string;
  step: number;
  totalSteps: number;
  markComplete?: boolean;
}): void {
  if (!isFreeLesson(opts.pathId, opts.lessonSlug)) return;

  const { pathId, lessonSlug, step, totalSteps, markComplete } = opts;
  const key = lessonKey(pathId, lessonSlug);
  const store = readStore();
  const existing = store.lessons[key];
  const progressPercent = Math.round(((step + 1) / totalSteps) * 100);
  const completed = existing?.completed === true || markComplete === true;

  store.lessons[key] = {
    pathId,
    lessonSlug,
    completed,
    progress_percent: completed
      ? 100
      : Math.max(existing?.progress_percent ?? 0, progressPercent),
    last_position: completed ? totalSteps - 1 : step,
    pendingEvents: existing?.pendingEvents ?? [],
    updatedAt: new Date().toISOString(),
  };

  writeStore(store);
}

export function recordGuestGreyEvent(event: GuestGreyEvent): void {
  if (!event.lessonSlug || !isFreeLesson(event.pathId, event.lessonSlug)) return;

  const key = lessonKey(event.pathId, event.lessonSlug);
  const store = readStore();
  const existing = store.lessons[key] ?? {
    pathId: event.pathId,
    lessonSlug: event.lessonSlug,
    completed: false,
    progress_percent: 0,
    last_position: 0,
    pendingEvents: [],
    updatedAt: new Date().toISOString(),
  };

  const eventKey = buildGreyEventKey(event);
  const alreadyQueued = existing.pendingEvents.some(
    (queued) => buildGreyEventKey(queued) === eventKey
  );
  if (alreadyQueued) return;

  existing.pendingEvents.push(event);
  existing.updatedAt = new Date().toISOString();
  store.lessons[key] = existing;
  writeStore(store);
}

/** Mark a free guest lesson complete before signup navigation. */
export function finalizeGuestFreeLesson(opts: {
  pathId: string;
  lessonSlug: string;
  totalSteps: number;
}): void {
  if (!isFreeLesson(opts.pathId, opts.lessonSlug)) return;

  saveGuestLessonProgress({
    pathId: opts.pathId,
    lessonSlug: opts.lessonSlug,
    step: opts.totalSteps - 1,
    totalSteps: opts.totalSteps,
    markComplete: true,
  });

  recordGuestGreyEvent({
    eventType: "lesson_completed",
    pathId: opts.pathId,
    lessonSlug: opts.lessonSlug,
  });
}

export function clearGuestProgress(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  sessionStorage.removeItem(BACKUP_KEY);
  localStorage.removeItem("tgf:guest-learning");
  sessionStorage.removeItem("tgf:guest-learning-backup");
}
