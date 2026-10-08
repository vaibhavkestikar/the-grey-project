"use client";

import Link from "next/link";

import CountdownTimer from "@/components/growth/countdown-timer";
import FirstBuildWaitlistForm from "@/components/growth/first-build-waitlist-form";
import SimplePathCard, {
  PathCardExpandable,
} from "@/components/learning/simple-path-card";
import {
  FIRST_BUILD_LAUNCH_DATE,
  FIRST_BUILD_LIMITED_SPOTS,
  getPathById,
} from "@/types/paths";

const VIBE_CARDS = [
  {
    icon: "🎭",
    accent: "from-fuchsia-500/20 to-transparent",
    title: "Fake job. Real pressure.",
    detail: "Stakeholders push back. No answer key.",
  },
  {
    icon: "💼",
    accent: "from-sky-500/20 to-transparent",
    title: "Day one energy",
    detail: "Meetings, tickets, quiet panic before ship day.",
  },
  {
    icon: "⏱️",
    accent: "from-amber-500/25 to-transparent",
    title: "People are waiting",
    detail: "Scope, build, demo. Tuesday is the boss.",
  },
  {
    icon: "🔄",
    accent: "from-orange-500/20 to-transparent",
    title: "Polish loops",
    detail: "Build, measure, refine until it actually holds.",
  },
] as const;

function FirstBuildCardDescription() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-[0.9375rem] leading-relaxed text-orange-50/95">
        8 immersive chapters in the browser. Survive polish loops and walk away with something
        that still works when the hype wears off.
      </p>
      <div
        className="grid grid-cols-2 gap-2.5 sm:gap-3"
        role="list"
        aria-label="How First Build feels"
      >
        {VIBE_CARDS.map(({ icon, accent, title, detail }) => (
          <div
            key={title}
            role="listitem"
            className={`flex flex-col rounded-2xl border border-white/15 bg-gradient-to-br ${accent} p-3 sm:p-3.5`}
          >
            <span
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-lg backdrop-blur-sm"
              aria-hidden="true"
            >
              {icon}
            </span>
            <p className="mt-2.5 text-xs font-bold leading-snug text-white sm:text-[0.8125rem]">
              {title}
            </p>
            <p className="mt-1.5 text-[11px] leading-relaxed text-orange-50/75 sm:text-xs">
              {detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FirstBuildSpotlight() {
  const path = getPathById("first-build");

  if (!path) return null;

  return (
    <SimplePathCard
      theme="amber"
      pathNumber={2}
      hookRibbon="Launching soon"
      secondaryHookRibbon="Not another boring AI course"
      icon="🚀"
      title={path.title}
      description={<FirstBuildCardDescription />}
      statusLabel={`Only ${FIRST_BUILD_LIMITED_SPOTS} early seats`}
      statusTone="urgent"
      tags={[
        { label: "Scenario based", className: "border-fuchsia-300/60 bg-fuchsia-500/35" },
        { label: "Role play", className: "border-sky-300/60 bg-sky-500/35" },
        "First chapter free",
        "Certificate",
        "Build + Polish Loops",
      ]}
      who={path.who}
      why={path.why}
      outcomes={path.outcomes}
      highlight={
        <>
          <p className="text-xs font-bold uppercase tracking-wide text-amber-100">
            Launch countdown
          </p>
          <div className="homepage-countdown mt-3">
            <CountdownTimer targetDate={FIRST_BUILD_LAUNCH_DATE} />
          </div>
        </>
      }
      cta={
        <div className="flex flex-col gap-3 sm:flex-row">
          <FirstBuildWaitlistForm className="flex-1" />
          <Link
            href="/learning/first-build"
            className="btn-explore-curriculum btn-explore-curriculum-amber flex flex-1 items-center justify-center text-center"
          >
            Explore Curriculum
          </Link>
        </div>
      }
      footer={
        path.features && path.features.length > 0 ? (
          <PathCardExpandable theme="amber" label="What's included">
            <ul className="aligned-bullet-list list-none space-y-2 px-2 pb-2">
              {path.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-sm leading-relaxed text-slate-400"
                >
                  <span
                    aria-hidden
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400"
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </PathCardExpandable>
        ) : null
      }
    />
  );
}
