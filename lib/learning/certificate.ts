import {
  CURIOUS_BUILDERS_LESSONS,
  CURIOUS_BUILDERS_PATH,
  PATH_ID,
} from "@/data/curious-builders-path";

export type CertificatePathConfig = {
  id: string;
  title: string;
  description: string;
  lessonSlugs: string[];
  lastLessonSlug: string;
};

export const PATH_CERTIFICATE_SLUG = "certificate";

export const CERTIFICATE_PATHS: Record<string, CertificatePathConfig> = {
  [PATH_ID]: {
    id: PATH_ID,
    title: CURIOUS_BUILDERS_PATH.title,
    description: CURIOUS_BUILDERS_PATH.description,
    lessonSlugs: CURIOUS_BUILDERS_LESSONS.map((l) => l.slug),
    lastLessonSlug:
      CURIOUS_BUILDERS_LESSONS[CURIOUS_BUILDERS_LESSONS.length - 1].slug,
  },
};

export function getCertificatePath(pathId: string): CertificatePathConfig | undefined {
  return CERTIFICATE_PATHS[pathId];
}

export type LessonProgressRow = {
  lesson_slug: string;
  completed: boolean;
  certificate_issued?: boolean;
  updated_at?: string;
};

export function isPathFullyComplete(
  pathId: string,
  progressRows: LessonProgressRow[]
): boolean {
  const config = getCertificatePath(pathId);
  if (!config) return false;

  const bySlug = new Map(progressRows.map((r) => [r.lesson_slug, r]));
  return config.lessonSlugs.every((slug) => bySlug.get(slug)?.completed === true);
}

export function hasCertificateIssued(
  pathId: string,
  progressRows: LessonProgressRow[]
): boolean {
  const config = getCertificatePath(pathId);
  if (!config) return false;

  return progressRows.some(
    (row) =>
      row.lesson_slug === config.lastLessonSlug && row.certificate_issued === true
  );
}
