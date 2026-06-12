import Link from "next/link";

import FirstBuildWaitlistForm from "@/components/growth/first-build-waitlist-form";
import CountdownTimer from "@/components/growth/countdown-timer";
import SiteNavbar from "@/components/marketing/site-navbar";
import type { FirstBuildChapter } from "@/data/first-build-curriculum";
import {
  FIRST_BUILD_ASSESSMENT,
  FIRST_BUILD_CHAPTERS,
  FIRST_BUILD_CURRICULUM_HERO,
  FIRST_BUILD_HOW_IT_WORKS,
  FIRST_BUILD_OUTCOMES,
  FIRST_BUILD_VALUE_PROPS,
} from "@/data/first-build-curriculum";
import { FIRST_BUILD_LAUNCH_DATE } from "@/types/paths";

const accentStyles = {
  amber: {
    card: "border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-slate-900/80",
    label: "text-amber-300",
  },
  orange: {
    card: "border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-slate-900/80",
    label: "text-orange-300",
  },
  fuchsia: {
    card: "border-fuchsia-500/30 bg-gradient-to-br from-fuchsia-500/10 to-slate-900/80",
    label: "text-fuchsia-300",
  },
} as const;

const chapterAccents = [
  "border-l-amber-400",
  "border-l-orange-400",
  "border-l-fuchsia-400",
  "border-l-rose-400",
  "border-l-yellow-400",
  "border-l-orange-500",
  "border-l-amber-500",
  "border-l-red-400",
];

const polishLoopStyles: Record<
  FirstBuildChapter["polishLoops"],
  string
> = {
  Low: "bg-slate-500/15 text-slate-300 ring-1 ring-slate-500/30",
  Medium: "bg-blue-500/15 text-blue-200 ring-1 ring-blue-400/30",
  High: "bg-violet-500/15 text-violet-200 ring-1 ring-violet-400/30",
  "Very High": "bg-fuchsia-500/15 text-fuchsia-200 ring-1 ring-fuchsia-400/30",
};

export const metadata = {
  title: "First Build Curriculum | The Grey Project",
  description:
    "Ship your first production ready AI feature. 8 immersive chapters with role play, sandboxes, and Build + Polish Loops.",
};

export default function FirstBuildCurriculumPage() {
  return (
    <main className="site-page">
      <SiteNavbar />

      <section className="relative overflow-hidden border-b border-slate-800 px-4 py-12 md:px-6 md:py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(251,191,36,0.14),transparent_40%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(244,114,182,0.12),transparent_42%)]" />
        <div className="relative mx-auto max-w-4xl">
          <Link
            href="/learning"
            className="text-sm font-medium text-slate-400 hover:text-amber-300"
          >
            ← All learning paths
          </Link>

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.28em] text-amber-400">
            {FIRST_BUILD_CURRICULUM_HERO.eyebrow}
          </p>
          <h1 className="mt-3 text-3xl font-black leading-tight text-slate-50 sm:text-4xl md:text-5xl">
            {FIRST_BUILD_CURRICULUM_HERO.title}
          </h1>
          {FIRST_BUILD_CURRICULUM_HERO.subtitle ? (
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl">
              {FIRST_BUILD_CURRICULUM_HERO.subtitle}
            </p>
          ) : null}

          <div className="mt-5 flex flex-wrap gap-2">
            {FIRST_BUILD_CURRICULUM_HERO.meta.map((item) => (
              <span
                key={item}
                className="rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-200"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="homepage-countdown mt-8 max-w-md">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-amber-300/90">
              Launch countdown
            </p>
            <CountdownTimer targetDate={FIRST_BUILD_LAUNCH_DATE} />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-10 md:px-6 md:py-14">
        <div className="grid gap-4 sm:grid-cols-3">
          {FIRST_BUILD_VALUE_PROPS.map(({ label, accent, text }) => {
            const styles = accentStyles[accent];
            return (
              <div
                key={label}
                className={`rounded-2xl border p-5 shadow-[0_0_24px_rgba(251,191,36,0.06)] ${styles.card}`}
              >
                <p className={`text-xs font-bold uppercase tracking-widest ${styles.label}`}>
                  {label}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{text}</p>
              </div>
            );
          })}
        </div>

        <section className="mt-10 overflow-hidden rounded-[1.75rem] border border-amber-500/20 bg-gradient-to-br from-slate-900/90 via-amber-950/30 to-orange-950/20 p-6 md:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-300">
            How This Path Works
          </p>
          <h2 className="mt-2 text-2xl font-black text-slate-50 md:text-3xl">
            {FIRST_BUILD_HOW_IT_WORKS.title}
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {FIRST_BUILD_HOW_IT_WORKS.items.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-amber-500/15 bg-slate-900/50 p-4"
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

          <p className="mt-6 rounded-2xl border border-orange-500/20 bg-orange-500/5 px-4 py-3 text-sm leading-relaxed text-slate-300">
            <span className="font-semibold text-amber-200">One chapter flow: </span>
            {FIRST_BUILD_HOW_IT_WORKS.flow}
          </p>
        </section>

        <section className="mt-10 rounded-[1.75rem] border border-fuchsia-500/25 bg-gradient-to-br from-fuchsia-500/10 via-slate-900/80 to-amber-500/10 p-6 md:p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-fuchsia-300">
            Intended Learning Outcomes
          </p>
          <p className="mt-2 text-sm text-slate-400">
            Upon successful completion of all eight chapters, participants will be able to:
          </p>
          <ol className="mt-5 space-y-4">
            {FIRST_BUILD_OUTCOMES.map((outcome, index) => (
              <li key={outcome} className="flex gap-3 text-sm leading-relaxed text-slate-300">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-xs font-black text-amber-200 ring-1 ring-amber-400/30">
                  {index + 1}
                </span>
                <span className="pt-0.5">{outcome}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-black text-slate-50 md:text-2xl">
            Curriculum Structure at a Glance
          </h2>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-700/60">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-700/60 bg-slate-900/80">
                  <th className="px-4 py-3 font-bold text-amber-300">#</th>
                  <th className="px-4 py-3 font-bold text-slate-200">Chapter Title</th>
                  <th className="px-4 py-3 font-bold text-slate-200">Est. Time</th>
                  <th className="px-4 py-3 font-bold text-slate-200">Focus</th>
                  <th className="px-4 py-3 font-bold text-slate-200">Polish Loops</th>
                  <th className="px-4 py-3 font-bold text-slate-200">Access</th>
                </tr>
              </thead>
              <tbody>
                {FIRST_BUILD_CHAPTERS.map((chapter) => (
                  <tr
                    key={chapter.order}
                    className="border-b border-slate-800/80 bg-slate-900/40 even:bg-slate-900/60"
                  >
                    <td className="px-4 py-3 font-bold text-amber-300">{chapter.order}</td>
                    <td className="px-4 py-3 font-semibold text-slate-100">{chapter.title}</td>
                    <td className="px-4 py-3 text-slate-400">{chapter.time}</td>
                    <td className="px-4 py-3 text-slate-400">{chapter.focus}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${polishLoopStyles[chapter.polishLoops]}`}
                      >
                        {chapter.polishLoops}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                          chapter.access === "Free"
                            ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30"
                            : "bg-amber-500/15 text-amber-200 ring-1 ring-amber-400/30"
                        }`}
                      >
                        {chapter.access}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            Total core content: ~13 to 16 hours self paced (including polish loops and reflection).
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-black text-slate-50 md:text-2xl">
            Detailed Chapter Descriptions
          </h2>
          <div className="mt-6 space-y-5">
            {FIRST_BUILD_CHAPTERS.map((chapter, index) => (
              <article
                key={chapter.order}
                className={`home-card overflow-hidden border-l-4 ${chapterAccents[index % chapterAccents.length]} p-5 md:p-6`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                      Chapter {chapter.order}
                    </p>
                    <h3 className="mt-1 text-lg font-black text-slate-50 md:text-xl">
                      {chapter.title}
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-slate-400">
                      {chapter.time} · {chapter.focus}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${polishLoopStyles[chapter.polishLoops]}`}
                    >
                      {chapter.polishLoops} polish
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        chapter.access === "Free"
                          ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30"
                          : "bg-violet-500/15 text-violet-200 ring-1 ring-violet-400/30"
                      }`}
                    >
                      {chapter.access}
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-slate-300">{chapter.summary}</p>

                <div className="mt-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-amber-300">
                    You&apos;ll explore
                  </p>
                  <ul className="mt-2 space-y-2">
                    {chapter.explore.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm leading-relaxed text-slate-400"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 rounded-xl border border-orange-500/20 bg-orange-500/5 px-4 py-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-orange-300">
                    Apply Block
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-300">
                    {chapter.applyBlock}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-[1.75rem] border border-amber-500/20 bg-gradient-to-br from-slate-900/90 to-amber-950/30 p-6 md:p-8">
          <h2 className="text-xl font-black text-slate-50 md:text-2xl">
            Assessment &amp; Certification
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-slate-300">
            <p>
              <span className="font-bold text-amber-200">Formative assessment (within chapters): </span>
              {FIRST_BUILD_ASSESSMENT.formative}
            </p>
            <p>
              <span className="font-bold text-amber-200">Summative requirements: </span>
              {FIRST_BUILD_ASSESSMENT.summative}
            </p>
            <p>
              <span className="font-bold text-amber-200">Certificate &amp; artifact: </span>
              {FIRST_BUILD_ASSESSMENT.certificate}
            </p>
            <p className="rounded-xl border border-slate-700/50 bg-slate-900/50 px-4 py-3 text-slate-400">
              <span className="font-semibold text-slate-300">Note: </span>
              {FIRST_BUILD_ASSESSMENT.note}
            </p>
          </div>
        </section>

        <section
          id="join-waitlist"
          className="mt-12 rounded-[1.75rem] border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-slate-900/90 to-fuchsia-500/10 p-8 text-center md:p-12"
        >
          <h2 className="text-2xl font-black text-slate-50 md:text-3xl">
            Ready to ship your first real AI feature?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-400">
            Start with the free chapter: The Urgent Ticket Crisis. Join the waitlist to get early
            access when First Build launches.
          </p>
          <p className="mt-2 text-sm font-medium text-amber-200/90">
            From idea to a working feature that survives Tuesday morning.
          </p>
          <div className="mx-auto mt-6 max-w-md">
            <FirstBuildWaitlistForm buttonClassName="btn-home-cta w-full px-8 py-4" />
          </div>
          <Link
            href="/learning"
            className="btn-home-secondary mt-4 inline-flex px-8 py-3"
          >
            All learning paths
          </Link>
        </section>
      </div>
    </main>
  );
}
