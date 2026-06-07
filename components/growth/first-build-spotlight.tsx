"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

import CountdownTimer from "@/components/growth/countdown-timer";
import LearningPathPill from "@/components/learning/learning-path-pill";
import PathHookRibbon from "@/components/learning/path-hook-ribbon";
import PathValueAccordion from "@/components/learning/path-value-accordion";
import PathMetaPills from "@/components/learning/path-meta-pills";
import PathValueGrid from "@/components/learning/path-value-grid";
import { track } from "@/services/analytics/track";
import {
  FIRST_BUILD_LAUNCH_DATE,
  FIRST_BUILD_LIMITED_SPOTS,
  FREE_LESSON_COUNT,
  getPathById,
} from "@/types/paths";

const FEATURE_ICONS = ["💡", "🧭", "🔧", "🚀", "⚡", "🏅"];

export default function FirstBuildSpotlight() {
  const path = getPathById("first-build");
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [joined, setJoined] = useState(false);
  const [alreadyJoined, setAlreadyJoined] = useState(false);

  if (!path) return null;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Drop your email. We'll handle the rest.");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.trim(),
        module_name: path!.waitlistKey ?? "first-build",
      }),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);

    if (res.status === 409 || data.already_joined) {
      setAlreadyJoined(true);
      setOpen(false);
      toast.info("This email is already on the First Build waitlist.");
      return;
    }

    if (!res.ok) {
      toast.error(data.error ?? "Something broke. Try again. Seats won't wait.");
      return;
    }
    track("waitlist_joined", { path: "first-build" });
    toast.success("You're in! We'll ping you before launch.");
    setJoined(true);
    setEmail("");
  }

  return (
    <article className="relative overflow-hidden rounded-[2rem] border-2 border-amber-300/60 bg-gradient-to-br from-amber-500 via-orange-500 to-rose-600 shadow-2xl shadow-orange-200">
      <PathHookRibbon label="Launching soon" className="top-6 rotate-3" />
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -bottom-16 -left-10 h-48 w-48 rounded-full bg-white/5" />

      <div className="relative p-6 md:p-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white backdrop-blur">
            Next to launch
          </span>
          <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white animate-pulse">
            Only {FIRST_BUILD_LIMITED_SPOTS} early seats
          </span>
        </div>

        <LearningPathPill variant="light" className="mt-5" />
        <h3 className="mt-3 text-3xl font-black text-white md:text-5xl">
          {path.title}
        </h3>
        {path.tagline && (
          <p className="mt-2 text-xl font-bold text-amber-100 md:text-2xl">
            {path.tagline}
          </p>
        )}
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-orange-50 md:text-lg">
          {path.description}
        </p>

        <PathValueAccordion
          who={path.who}
          why={path.why}
          outcomes={path.outcomes}
          variant="warm"
          className="mt-6 md:hidden"
        />
        <PathValueGrid
          who={path.who}
          why={path.why}
          outcomes={path.outcomes}
          variant="warm"
          className="mt-6 hidden md:grid"
        />

        <PathMetaPills
          variant="warm"
          className="mt-5"
          labels={[
            `First ${FREE_LESSON_COUNT} lessons free`,
            "Completion certificate",
            "Hands on sandboxes",
          ]}
        />

        <div className="mt-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-amber-200">
            Launch countdown
          </p>
          <CountdownTimer targetDate={FIRST_BUILD_LAUNCH_DATE} />
        </div>

        {path.features && (
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {path.features.map((feature, i) => (
              <li
                key={feature}
                className="flex items-start gap-3 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur"
              >
                <span className="text-xl" aria-hidden="true">
                  {FEATURE_ICONS[i] ?? "✦"}
                </span>
                <p className="text-sm font-medium leading-snug text-white">
                  {feature}
                </p>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8 rounded-2xl border border-white/30 bg-black/20 p-5 backdrop-blur md:p-6">
          <p className="text-center text-sm font-bold uppercase tracking-widest text-amber-200">
            Do not miss out
          </p>
          <p className="mt-2 text-center text-base text-white md:text-lg">
            We can only support{" "}
            <strong className="text-amber-200">{FIRST_BUILD_LIMITED_SPOTS} accounts</strong>{" "}
            in the first cohort. First {FREE_LESSON_COUNT} lessons free, completion
            certificate included, and the waitlist fills faster than free pizza at a
            hackathon.
          </p>

          {joined ? (
            <motion.p
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mt-6 rounded-2xl bg-emerald-500/30 py-4 text-center text-lg font-bold text-white"
            >
              ✓ You&apos;re on the list. We&apos;ll email you before anyone else.
            </motion.p>
          ) : alreadyJoined ? (
            <motion.p
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mt-6 rounded-2xl bg-amber-400/30 py-4 text-center text-lg font-bold text-white"
            >
              ✓ This email is already on the waitlist for First Build.
            </motion.p>
          ) : open ? (
            <form onSubmit={submit} className="mt-6 space-y-3">
              <input
                type="email"
                autoFocus
                required
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border-0 bg-white px-5 py-4 text-slate-900 outline-none ring-2 ring-transparent focus:ring-amber-300"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-white py-4 text-lg font-black text-orange-600 shadow-xl transition hover:bg-amber-50 disabled:opacity-50"
              >
                {loading ? "Saving your spot..." : "Notify Me. Don't Miss Out →"}
              </button>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="mt-6 w-full rounded-2xl bg-white py-4 text-lg font-black text-orange-600 shadow-xl transition hover:scale-[1.02] hover:bg-amber-50 active:scale-[0.98]"
            >
              Notify Me. Limited Seats →
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
