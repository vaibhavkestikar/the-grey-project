"use client";

import { useState } from "react";
import { toast } from "sonner";

import { track } from "@/services/analytics/track";
import LearningPathPill from "@/components/learning/learning-path-pill";

type Props = {
  title: string;
  description: string;
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
  description,
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
    <article className="flex h-full flex-col rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:border-violet-200 hover:shadow-md">
      <LearningPathPill variant="muted" />
      <div className="mt-3 flex items-center justify-between gap-2">
        <h3 className="text-xl font-bold text-slate-900">{title}</h3>
        <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase text-slate-600">
          Cooking
        </span>
      </div>
      <p className="mt-3 flex-1 text-slate-600">{description}</p>

      {joined ? (
        <p className="mt-6 rounded-xl bg-emerald-50 py-3 text-center text-sm font-semibold text-emerald-700">
          ✓ You&apos;re in. We&apos;ll ping you at launch.
        </p>
      ) : alreadyJoined ? (
        <p className="mt-6 rounded-xl bg-amber-50 py-3 text-center text-sm font-semibold text-amber-800">
          ✓ This email is already on the waitlist for this path.
        </p>
      ) : open ? (
        <form onSubmit={submit} className="mt-6 space-y-2">
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
            {loading ? "Joining..." : "Notify me when it's live"}
          </button>
        </form>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-6 rounded-xl border border-slate-200 py-3 font-semibold text-slate-700 transition hover:border-violet-300 hover:text-violet-700"
        >
          Join waitlist
        </button>
      )}
    </article>
  );
}
