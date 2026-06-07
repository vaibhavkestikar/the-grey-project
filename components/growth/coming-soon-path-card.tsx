"use client";

import { useState } from "react";
import { toast } from "sonner";

import { track } from "@/services/analytics/track";
import PathMetaPills from "@/components/learning/path-meta-pills";
import PathValueAccordion from "@/components/learning/path-value-accordion";
import { FREE_LESSON_COUNT, PAID_PATH_TRIAL_PILLS } from "@/types/paths";

/* ─── Per-path color & identity ─────────────────────────────────────────── */

type ColorScheme = {
  header: string;        // gradient bg classes
  badge: string;         // pill on the header
  icon: string;          // large emoji
  glow: string;          // decorative circle
  hover: string;         // card border hover
  accent: string;        // tagline color on body
};

const SCHEMES: Record<string, ColorScheme> = {
  "reliable-ai": {
    header:  "from-blue-700 via-sky-600 to-teal-500",
    badge:   "bg-white/20 text-sky-50",
    icon:    "🛡️",
    glow:    "bg-sky-300/20",
    hover:   "hover:border-sky-300 hover:shadow-sky-100",
    accent:  "text-sky-700",
  },
  "agentic-systems": {
    header:  "from-violet-800 via-purple-700 to-fuchsia-600",
    badge:   "bg-white/20 text-fuchsia-50",
    icon:    "🤖",
    glow:    "bg-fuchsia-300/20",
    hover:   "hover:border-violet-300 hover:shadow-violet-100",
    accent:  "text-violet-700",
  },
  "ai-strategy": {
    header:  "from-amber-600 via-orange-500 to-rose-500",
    badge:   "bg-white/20 text-amber-50",
    icon:    "🧭",
    glow:    "bg-orange-300/20",
    hover:   "hover:border-amber-300 hover:shadow-amber-100",
    accent:  "text-amber-700",
  },
};

const DEFAULT_SCHEME: ColorScheme = {
  header:  "from-slate-700 via-slate-600 to-slate-500",
  badge:   "bg-white/20 text-slate-100",
  icon:    "✦",
  glow:    "bg-slate-300/20",
  hover:   "hover:border-slate-300",
  accent:  "text-slate-600",
};

/* ─── Waitlist helpers ───────────────────────────────────────────────────── */

type Props = {
  title: string;
  tagline?: string;
  description: string;
  who: string;
  why: string;
  outcomes: string;
  waitlistKey?: string;
};

async function parseWaitlistResponse(res: Response) {
  return res.json().catch(() => ({})) as Promise<{
    already_joined?: boolean;
    error?: string;
  }>;
}

/* ─── Component ──────────────────────────────────────────────────────────── */

export default function ComingSoonPathCard({
  title,
  tagline,
  description,
  who,
  why,
  outcomes,
  waitlistKey,
}: Props) {
  const scheme = (waitlistKey && SCHEMES[waitlistKey]) ? SCHEMES[waitlistKey] : DEFAULT_SCHEME;

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [joined, setJoined] = useState(false);
  const [alreadyJoined, setAlreadyJoined] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("We need an email. We're not mind readers. Yet.");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.trim(),
        module_name: waitlistKey ?? title,
      }),
    });
    const data = await parseWaitlistResponse(res);
    setLoading(false);

    if (res.status === 409 || data.already_joined) {
      setAlreadyJoined(true);
      setOpen(false);
      toast.info("You already joined the waitlist for this path.");
      return;
    }

    if (!res.ok) {
      toast.error(data.error ?? "That didn't work. Try again.");
      return;
    }

    track("waitlist_joined", { path: waitlistKey ?? title });
    toast.success("You're on the list. We'll holler when it drops.");
    setJoined(true);
    setEmail("");
  }

  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg ${scheme.hover}`}
    >
      {/* ── Colored header ── */}
      <div
        className={`relative overflow-hidden bg-gradient-to-br ${scheme.header} p-5 text-white sm:p-6`}
      >
        {/* Decorative circles */}
        <div
          className={`pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full ${scheme.glow}`}
        />
        <div
          className={`pointer-events-none absolute -bottom-8 -left-6 h-24 w-24 rounded-full ${scheme.glow} opacity-60`}
        />

        <div className="relative">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
              Learning Path
            </span>
            <span
              className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide ${scheme.badge}`}
            >
              Coming soon
            </span>
          </div>

          {/* Icon + title */}
          <div className="mt-4 text-4xl leading-none">{scheme.icon}</div>
          <h3 className="mt-3 text-xl font-black leading-snug text-white sm:text-2xl">
            {title}
          </h3>
          {tagline && (
            <p className="mt-1.5 text-sm font-semibold text-white/80">{tagline}</p>
          )}
        </div>
      </div>

      {/* ── White body ── */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
          {description}
        </p>

        <PathValueAccordion
          who={who}
          why={why}
          outcomes={outcomes}
          className="mt-4"
        />

        <PathMetaPills
          className="mt-4"
          labels={[
            `First ${FREE_LESSON_COUNT} lessons free`,
            PAID_PATH_TRIAL_PILLS[1],
          ]}
        />

        <div className="mt-auto pt-5">
          {joined ? (
            <p className="rounded-xl bg-emerald-50 py-3 text-center text-sm font-semibold text-emerald-700">
              ✓ You&apos;re in. We&apos;ll ping you at launch.
            </p>
          ) : alreadyJoined ? (
            <p className="rounded-xl bg-amber-50 py-3 text-center text-sm font-semibold text-amber-800">
              ✓ Already on the waitlist for this path.
            </p>
          ) : open ? (
            <form onSubmit={submit} className="space-y-2">
              <input
                type="email"
                autoFocus
                required
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-violet-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-slate-950 py-3 text-sm font-semibold text-white disabled:opacity-50"
              >
                {loading ? "Joining..." : "Ping me when it drops →"}
              </button>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="w-full rounded-xl border-2 border-slate-200 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
            >
              Join waitlist
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
