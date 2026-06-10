"use client";

import Link from "next/link";

import PathLessonList from "@/components/learning/path-lesson-list";
import SimplePathCard, {
  PathCardExpandable,
} from "@/components/learning/simple-path-card";
import {
  CURIOUS_BUILDERS_LESSONS,
  CURIOUS_BUILDERS_PATH,
} from "@/data/curious-builders-path";
import { getPathById } from "@/types/paths";

type Props = {
  collapsible?: boolean;
  compact?: boolean;
};

export default function LivePathCard({ collapsible = true, compact = false }: Props) {
  const pathMeta = getPathById("curious-builders");

  if (!pathMeta) return null;

  const description =
    CURIOUS_BUILDERS_PATH.cardSummary ??
    "Interactive lessons with browser Python and a completion certificate.";

  const lessonList = (
    <PathLessonList
      lessons={CURIOUS_BUILDERS_LESSONS}
      baseHref="/learning/curious-builders"
      pathId={CURIOUS_BUILDERS_PATH.id}
      showCertificate
      scrollable={compact}
      maxVisibleLessons={2}
      compact={compact}
    />
  );

  return (
    <SimplePathCard
      theme="violet"
      pathNumber={1}
      hookRibbon="Completely Free"
      icon="🧠"
      title={CURIOUS_BUILDERS_PATH.title}
      description={description}
      statusLabel="Live now"
      statusTone="live"
      tags={[
        "Free",
        `${CURIOUS_BUILDERS_PATH.lessonCount} lessons`,
        "Certificate",
        `~${CURIOUS_BUILDERS_PATH.totalMinutes} min`,
      ]}
      who={pathMeta.who}
      why={pathMeta.why}
      outcomes={pathMeta.outcomes}
      cta={
        <Link href="/try/prediction" className="btn-cta w-full text-center">
          Start Learning
        </Link>
      }
      footer={
        compact ? (
          <div>
            <p className="mb-3 text-sm font-bold text-violet-800">
              {CURIOUS_BUILDERS_PATH.lessonCount} lessons + certificate
            </p>
            {lessonList}
          </div>
        ) : (
          <PathCardExpandable
            theme="violet"
            label={`View ${CURIOUS_BUILDERS_PATH.lessonCount} lessons + certificate`}
            defaultOpen={!collapsible}
          >
            {lessonList}
          </PathCardExpandable>
        )
      }
    />
  );
}
