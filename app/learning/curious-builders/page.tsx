import Link from "next/link";

import SiteNavbar from "@/components/marketing/site-navbar";
import PathLessonList from "@/components/learning/path-lesson-list";
import {
  ASSESSMENT_SECTION,
  CURRICULUM_HERO,
  CURRICULUM_LESSONS,
  CURRICULUM_VALUE_PROPS,
  HOW_IT_WORKS,
  INTENDED_OUTCOMES,
} from "@/data/curious-builders-curriculum";
import {
  CURIOUS_BUILDERS_LESSONS,
  CURIOUS_BUILDERS_PATH,
} from "@/data/curious-builders-path";

const accentStyles = {
  cyan: {
    card: "border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-slate-900/80",
    label: "text-cyan-300",
  },
  violet: {
    card: "border-violet-500/30 bg-gradient-to-br from-violet-500/10 to-slate-900/80",
    label: "text-violet-300",
  },
  amber: {
    card: "border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-slate-900/80",
    label: "text-amber-300",
  },
} as const;

const lessonAccents = [
  "border-l-cyan-400",
  "border-l-violet-400",
  "border-l-fuchsia-400",
  "border-l-blue-400",
  "border-l-emerald-400",
  "border-l-amber-400",
  "border-l-rose-400",
];

export default function CuriousBuildersPathPage() {
  const totalCoreMinutes = CURIOUS_BUILDERS_LESSONS.reduce(
    (sum, lesson) => sum + lesson.durationMinutes,
    0
  );

  return (
    <main className="site-page">
      <SiteNavbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-800 px-4 py-12 md:px-6 md:py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,0.12),transparent_40%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(167,139,250,0.14),transparent_42%)]" />
        <div className="relative mx-auto max-w-4xl">
          <Link
            href="/learning"
            className="text-sm font-medium text-slate-400 hover:text-cyan-400"
          >
            ← All learning paths
          </Link>

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.28em] text-cyan-400">
            {CURRICULUM_HERO.eyebrow}
          </p>
          <h1 className="mt-3 text-3xl font-black leading-tight text-slate-50 sm:text-4xl md:text-5xl">
            {CURRICULUM_HERO.title}
          </h1>
          {CURRICULUM_HERO.subtitle ? (
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl">
              {CURRICULUM_HERO.subtitle}
            </p>
          ) : null}

          <div className="mt-5 flex flex-wrap gap-2">
            {CURRICULUM_HERO.meta.map((item) => (
              <span
                key={item}
                className="rounded-full border border-cyan-500/25 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-200"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-10 md:px-6 md:py-14">
        {/* Who / Why / What */}
        <div className="grid gap-4 sm:grid-cols-3">
          {CURRICULUM_VALUE_PROPS.map(({ label, accent, text }) => {
            const styles = accentStyles[accent];
            return (
              <div
                key={label}
                className={`rounded-2xl border p-5 shadow-[0_0_24px_rgba(34,211,238,0.06)] ${styles.card}`}
              >
                <p className={`text-xs font-bold uppercase tracking-widest ${styles.label}`}>
                  {label}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{text}</p>
              </div>
            );
          })}
        </div>

        {/* How it works */}
        <section className="home-panel mt-10 overflow-hidden p-6 md:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-violet-300">
            How This Path Works
          </p>
          <h2 className="mt-2 text-2xl font-black text-slate-50 md:text-3xl">
            {HOW_IT_WORKS.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-400 md:text-base">
            {HOW_IT_WORKS.intro}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {HOW_IT_WORKS.items.map((item) => (
              <div
                key={item.label}
                className="home-card rounded-2xl p-4"
              >
                <p className="text-xl leading-none" aria-hidden="true">
                  {item.icon}
                </p>
                <p className="mt-3 text-sm font-bold text-slate-100">{item.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 px-4 py-3 text-sm leading-relaxed text-slate-300">
            <span className="font-semibold text-cyan-200">One lesson flow: </span>
            {HOW_IT_WORKS.flow}
          </p>
        </section>

        {/* Intended outcomes */}
        <section className="mt-10 rounded-[1.75rem] border border-violet-500/25 bg-gradient-to-br from-violet-500/10 via-slate-900/80 to-fuchsia-500/10 p-6 md:p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-violet-300">
            Intended Learning Outcomes
          </p>
          <p className="mt-2 text-sm text-slate-400">
            Upon successful completion of all seven lessons, participants will be able to:
          </p>
          <ol className="mt-5 space-y-4">
            {INTENDED_OUTCOMES.map((outcome, index) => (
              <li key={outcome} className="flex gap-3 text-sm leading-relaxed text-slate-300">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-xs font-black text-violet-200 ring-1 ring-violet-400/30">
                  {index + 1}
                </span>
                <span className="pt-0.5">{outcome}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Curriculum table */}
        <section className="mt-10">
          <h2 className="text-xl font-black text-slate-50 md:text-2xl">
            Curriculum Structure at a Glance
          </h2>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-700/60">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-700/60 bg-slate-900/80">
                  <th className="px-4 py-3 font-bold text-cyan-300">#</th>
                  <th className="px-4 py-3 font-bold text-slate-200">Lesson Title</th>
                  <th className="px-4 py-3 font-bold text-slate-200">Est. Time</th>
                  <th className="px-4 py-3 font-bold text-slate-200">Steps</th>
                  <th className="px-4 py-3 font-bold text-slate-200">Access</th>
                </tr>
              </thead>
              <tbody>
                {CURRICULUM_LESSONS.map((lesson) => (
                  <tr
                    key={lesson.slug}
                    className="border-b border-slate-800/80 bg-slate-900/40 even:bg-slate-900/60"
                  >
                    <td className="px-4 py-3 font-bold text-cyan-300">{lesson.order}</td>
                    <td className="px-4 py-3 font-semibold text-slate-100">{lesson.title}</td>
                    <td className="px-4 py-3 text-slate-400">{lesson.minutes} min</td>
                    <td className="px-4 py-3 text-slate-400">{lesson.steps}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                          lesson.access === "Free Preview"
                            ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30"
                            : "bg-amber-500/15 text-amber-200 ring-1 ring-amber-400/30"
                        }`}
                      >
                        {lesson.access}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            Total core content: ~{totalCoreMinutes} minutes. Realistic completion time with
            interaction and reflection: 2.5 to 4 hours self paced.
          </p>
        </section>

        {/* Detailed lessons */}
        <section className="mt-12">
          <h2 className="text-xl font-black text-slate-50 md:text-2xl">
            Detailed Lesson Descriptions
          </h2>
          <div className="mt-6 space-y-5">
            {CURRICULUM_LESSONS.map((lesson, index) => (
              <article
                key={lesson.slug}
                className={`home-card overflow-hidden border-l-4 ${lessonAccents[index % lessonAccents.length]} p-5 md:p-6`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                      Lesson {lesson.order}
                    </p>
                    <h3 className="mt-1 text-lg font-black text-slate-50 md:text-xl">
                      {lesson.title}
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-slate-400">
                      {lesson.minutes} min · {lesson.steps} steps
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
                      lesson.access === "Free Preview"
                        ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30"
                        : "bg-violet-500/15 text-violet-200 ring-1 ring-violet-400/30"
                    }`}
                  >
                    {lesson.access}
                  </span>
                </div>

                <p className="mt-4 text-sm font-semibold italic text-cyan-200/90">
                  {lesson.hook}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  {lesson.summary}
                </p>

                <div className="mt-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-violet-300">
                    You&apos;ll explore
                  </p>
                  <ul className="mt-2 space-y-2">
                    {lesson.explore.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm leading-relaxed text-slate-400"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 rounded-xl border border-violet-500/20 bg-violet-500/5 px-4 py-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-violet-300">
                    Apply Block
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-300">
                    {lesson.applyBlock}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Assessment */}
        <section className="mt-12 rounded-[1.75rem] border border-cyan-500/20 bg-gradient-to-br from-slate-900/90 to-cyan-950/30 p-6 md:p-8">
          <h2 className="text-xl font-black text-slate-50 md:text-2xl">
            Assessment &amp; Certification
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-slate-300">
            <p>
              <span className="font-bold text-cyan-200">Formative assessment (within lessons): </span>
              {ASSESSMENT_SECTION.formative}
            </p>
            <p>
              <span className="font-bold text-cyan-200">Summative requirement: </span>
              {ASSESSMENT_SECTION.summative}
            </p>
            <p>
              <span className="font-bold text-cyan-200">Certificate: </span>
              {ASSESSMENT_SECTION.certificate}
            </p>
            <p className="rounded-xl border border-slate-700/50 bg-slate-900/50 px-4 py-3 text-slate-400">
              <span className="font-semibold text-slate-300">Note: </span>
              {ASSESSMENT_SECTION.note}
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 text-center">
          <h2 className="text-2xl font-black text-slate-50 md:text-3xl">
            Ready to build real intuition?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-400">
            Start with the free preview lesson: AI Is Prediction. No account required to begin.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/try/prediction" className="btn-home-cta px-8 py-4">
              Start free preview
            </Link>
            <Link href="/learning" className="btn-home-secondary px-8 py-4">
              All learning paths
            </Link>
          </div>
        </section>

        {/* Interactive lesson list */}
        <details className="home-card mt-12 overflow-hidden p-5 group md:p-6">
          <summary className="cursor-pointer list-none font-bold text-slate-100 marker:content-none">
            <span className="group-open:hidden">
              Jump into lessons ({CURIOUS_BUILDERS_PATH.lessonCount} lessons + certificate)
            </span>
            <span className="hidden group-open:inline">
              Hide lesson list ({CURIOUS_BUILDERS_PATH.lessonCount} lessons + certificate)
            </span>
          </summary>
          <div className="mt-5">
            <PathLessonList
              lessons={CURIOUS_BUILDERS_LESSONS}
              baseHref="/learning/curious-builders"
              pathId={CURIOUS_BUILDERS_PATH.id}
              showCertificate
            />
          </div>
        </details>
      </div>
    </main>
  );
}
