"use client";

import { useState } from "react";
import { toast } from "sonner";

import { track } from "@/services/analytics/track";

type Props = {
  title: string;
  description: string;
  waitlistKey?: string;
};

export default function ComingSoonPathCard({
  title,
  description,
  waitlistKey,
}: Props) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [joined, setJoined] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Enter your email to join the waitlist.");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, module_name: waitlistKey ?? title }),
    });
    setLoading(false);
    if (!res.ok) {
      toast.error("Could not join. Try again.");
      return;
    }
    track("waitlist_joined", { path: waitlistKey ?? title });
    toast.success("You're on the list!");
    setJoined(true);
    setEmail("");
  }

  return (
    <article className="flex h-full flex-col rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-xl font-bold text-slate-900">{title}</h3>
        <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase text-slate-600">
          Coming soon
        </span>
      </div>
      <p className="mt-3 flex-1 text-slate-600">{description}</p>

      {joined ? (
        <p className="mt-6 rounded-xl bg-emerald-50 py-3 text-center text-sm font-semibold text-emerald-700">
          ✓ We&apos;ll email you when it launches
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
            {loading ? "Joining..." : "Notify me"}
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
