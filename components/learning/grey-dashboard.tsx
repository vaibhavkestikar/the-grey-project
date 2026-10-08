"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  isGreyPointsSoundEnabled,
  setGreyPointsSoundEnabled,
  subscribeToGreyPointsSound,
} from "@/lib/grey/sound";

type Badge = {
  id: string;
  name: string;
  description: string;
  tone: "violet" | "blue" | "emerald" | "amber" | "red" | "slate";
  earnedAt: string;
};

type StoreItem = {
  id: string;
  title: string;
  description: string;
  cost: number;
  redeemed: boolean;
  filename: string;
};

type GreySummary = {
  profile: {
    totalPoints: number;
    spentPoints: number;
    availablePoints: number;
    currentStreak: number;
    longestStreak: number;
    lastActivityDate: string | null;
  };
  pathProgress: Array<{
    pathId: string;
    title: string;
    completedLessons: number;
    totalLessons: number;
    percent: number;
  }>;
  badges: Badge[];
  store: StoreItem[];
  pointValues: Record<string, number>;
};

const toneClasses: Record<Badge["tone"], string> = {
  violet: "border-violet-500/30 from-violet-500/15 to-fuchsia-500/15 text-violet-200",
  blue: "border-cyan-500/30 from-cyan-500/15 to-blue-500/15 text-cyan-200",
  emerald: "border-emerald-500/30 from-emerald-500/15 to-teal-500/15 text-emerald-200",
  amber: "border-amber-500/30 from-amber-500/15 to-orange-500/15 text-amber-200",
  red: "border-red-500/30 from-red-500/15 to-rose-500/15 text-red-200",
  slate: "border-slate-600/40 from-slate-800/80 to-violet-500/10 text-slate-200",
};

const badgeMedallionClasses: Record<Badge["tone"], string> = {
  violet: "from-violet-500 to-fuchsia-500 shadow-violet-200",
  blue: "from-blue-500 to-cyan-500 shadow-blue-200",
  emerald: "from-emerald-500 to-teal-500 shadow-emerald-200",
  amber: "from-amber-400 to-orange-500 shadow-amber-200",
  red: "from-red-500 to-rose-500 shadow-red-200",
  slate: "from-slate-700 to-violet-700 shadow-slate-200",
};

function labelForPointRule(key: string) {
  const labels: Record<string, string> = {
    stepCompleted: "Complete a step",
    checkpointCorrect: "Correct checkpoint",
    checkpointFirstTryBonus: "First try bonus",
    deepDiveOpened: "Open Nerd section",
    lessonCompleted: "Complete a lesson",
    pathCompleted: "Complete a path",
  };
  return labels[key] ?? key;
}

export default function GreyDashboard() {
  const [summary, setSummary] = useState<GreySummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [redeeming, setRedeeming] = useState<string | null>(null);
  const [soundOn, setSoundOn] = useState(true);

  async function loadSummary() {
    const res = await fetch("/api/grey/summary");
    const data = await res.json().catch(() => null);
    if (res.ok && data) setSummary(data);
    setLoading(false);
  }

  useEffect(() => {
    void loadSummary();
    setSoundOn(isGreyPointsSoundEnabled());
    return subscribeToGreyPointsSound(setSoundOn);
  }, []);

  function toggleSound() {
    const next = !isGreyPointsSoundEnabled();
    setGreyPointsSoundEnabled(next);
    setSoundOn(next);
    toast.success(next ? "Grey Points sound on." : "Grey Points sound off.");
  }

  async function redeem(itemId: string) {
    try {
      setRedeeming(itemId);
      const res = await fetch("/api/grey/store/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(data.error ?? "Could not redeem this item.");
        return;
      }
      toast.success("Grey Store item unlocked.", {
        description: "The PDF is now available in your dashboard.",
      });
      await loadSummary();
    } finally {
      setRedeeming(null);
    }
  }

  if (loading) {
    return (
      <section className="premium-card mt-8 p-6 md:p-8">
        <h2 className="text-xl font-bold text-slate-50">Grey Points</h2>
        <p className="mt-3 text-sm text-slate-400">Loading your evidence trail...</p>
      </section>
    );
  }

  if (!summary) return null;

  const { profile } = summary;

  return (
    <section className="premium-card mt-8 overflow-hidden p-0">
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-violet-950 p-6 text-white md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-200">
              Grey Points
            </p>
            <h2 className="mt-2 text-2xl font-black md:text-3xl">
              Proof you did the work
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300">
              Points are awarded for understanding signals: completed steps,
              correct checkpoints, Nerd section reads, and finished lessons.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={toggleSound}
              className={`rounded-full border px-4 py-2 text-sm font-bold shadow-sm transition ${
                soundOn
                  ? "border-cyan-400/40 bg-cyan-500/15 text-cyan-200 hover:bg-cyan-500/25"
                  : "border-red-400/40 bg-red-500/15 text-red-300 hover:bg-red-500/25"
              }`}
            >
              {soundOn ? "Sound on" : "Sound off"}
            </button>
            <a
              href="#grey-store"
              className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-violet-100 transition hover:bg-white/10"
            >
              Grey Store
            </a>
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-4">
          {[
            { label: "Total earned", value: profile.totalPoints },
            { label: "Available", value: profile.availablePoints },
            { label: "Current streak", value: `${profile.currentStreak}d` },
            { label: "Badges", value: summary.badges.length },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-white/10 bg-white/10 p-4">
              <p className="text-xs font-semibold text-slate-300">{item.label}</p>
              <p className="mt-2 text-3xl font-black text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 p-6 md:grid-cols-[1.1fr_0.9fr] md:p-8">
        <div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h3 className="text-lg font-black text-slate-50">Badges earned</h3>
              <p className="mt-1 text-sm text-slate-400">
                Skill markers tied to real outcomes. Still allowed to look good.
              </p>
            </div>
          </div>

          {summary.badges.length > 0 ? (
            <div className="mt-5 max-h-[28rem] space-y-3 overflow-y-auto pr-2 [scrollbar-width:thin]">
              {summary.badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`rounded-2xl border bg-gradient-to-br p-4 shadow-sm ${toneClasses[badge.tone]}`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br text-[11px] font-black text-white shadow-md ${badgeMedallionClasses[badge.tone]}`}
                    >
                      GP
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-black">{badge.name}</p>
                        <span className="rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-slate-200">
                          Earned
                        </span>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed opacity-80">
                        {badge.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-2xl border border-dashed border-slate-600 bg-slate-900/50 p-5">
              <p className="text-sm text-slate-400">
                No badges yet. Complete lessons and checkpoints to start building
                your evidence trail.
              </p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-5">
            <h3 className="font-black text-slate-50">Path progress</h3>
            <div className="mt-4 space-y-4">
              {summary.pathProgress.map((path) => (
                <div key={path.pathId}>
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="font-semibold text-slate-200">{path.title}</span>
                    <span className="text-slate-400">
                      {path.completedLessons}/{path.totalLessons}
                    </span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-600"
                      style={{ width: `${path.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-5">
            <h3 className="font-black text-slate-50">Point values</h3>
            <p className="mt-1 text-sm text-slate-400">
              Transparent by design. No casino math.
            </p>
            <div className="mt-4 space-y-2">
              {Object.entries(summary.pointValues).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between rounded-xl border border-slate-700/50 bg-slate-800/80 px-3 py-2 text-sm"
                >
                  <span className="font-medium text-slate-300">
                    {labelForPointRule(key)}
                  </span>
                  <span className="font-black text-cyan-300">+{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div id="grey-store" className="border-t border-slate-700/60 p-6 md:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Grey Store
            </p>
            <h3 className="mt-1 text-xl font-black text-slate-50">
              Redeem practical assets
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
              Spend Grey Points on professional resources that help you apply
              the lessons at work.
            </p>
          </div>
          <p className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-bold text-cyan-200">
            {profile.availablePoints} GP available
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {summary.store.map((item) => {
            const locked = profile.availablePoints < item.cost && !item.redeemed;
            return (
              <article
                key={item.id}
                className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-900/90 to-slate-950 p-5 shadow-[0_0_24px_rgba(34,211,238,0.06)]"
              >
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-violet-500/10" />
                <div className="flex items-start justify-between gap-3">
                  <div className="relative">
                    <h4 className="font-black text-slate-50">{item.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
                      {item.description}
                    </p>
                  </div>
                  <span className="relative shrink-0 rounded-full border border-violet-500/30 bg-violet-500/15 px-3 py-1 text-xs font-bold text-violet-200">
                    {item.cost} GP
                  </span>
                </div>

                {item.redeemed ? (
                  <a
                    href={`/api/grey/store/${item.id}/download`}
                    className="btn-home-secondary mt-5 inline-flex px-5 py-3 text-sm"
                  >
                    Download PDF
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled={locked || redeeming === item.id}
                    onClick={() => void redeem(item.id)}
                    className="btn-home-cta mt-5 px-5 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {redeeming === item.id
                      ? "Redeeming..."
                      : locked
                        ? "Earn more points"
                        : "Redeem"}
                  </button>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
