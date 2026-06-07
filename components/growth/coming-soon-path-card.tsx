"use client";

import { useState } from "react";
import { toast } from "sonner";

import { track } from "@/services/analytics/track";
import LearningPathPill from "@/components/learning/learning-path-pill";
import PathMetaPills from "@/components/learning/path-meta-pills";
import PathValueAccordion from "@/components/learning/path-value-accordion";
import { FREE_LESSON_COUNT, PAID_PATH_TRIAL_PILLS } from "@/types/paths";

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

export default function ComingSoonPathCard({
  title,
  tagline,
  description,
  who,
  why,
  outcomes,
  waitlistKey,
}: Props) {
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
    <article className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:border-violet-200 hover:shadow-md">
      <div className="h-1.5 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-400" />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <LearningPathPill variant="muted" />
          <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-600">
            Coming soon
          </span>
        </div>

        <h3 className="mt-3 text-lg font-bold leading-snug text-slate-900 sm:text-xl">
          {title}
        </h3>
        {tagline && (
          <p className="mt-1.5 text-sm font-semibold text-violet-700">{tagline}</p>
        )}
        <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
          {description}
        </p>

        <PathValueAccordion
          who={who}
          why={why}
          outcomes={outcomes}
          className="mt-3"
        />

        <PathMetaPills
          className="mt-3"
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
              ✓ This email is already on the waitlist for this path.
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
                className="w-full rounded-xl bg-violet-600 py-3 text-sm font-semibold text-white disabled:opacity-50"
              >
                {loading ? "Joining..." : "Ping me when it drops →"}
              </button>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="w-full rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-700 transition hover:border-violet-300 hover:text-violet-700"
            >
              Join waitlist
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
