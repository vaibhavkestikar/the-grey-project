"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

import NpsInput from "@/components/feedback/nps-input";
import RatingInput from "@/components/feedback/rating-input";
import { useAuth } from "@/components/providers/auth-provider";
import { track } from "@/services/analytics/track";

export default function GeneralFeedbackForm() {
  const { user } = useAuth();
  const [nps, setNps] = useState<number | null>(null);
  const [overall, setOverall] = useState<number | null>(null);
  const [clarity, setClarity] = useState<number | null>(null);
  const [interactivity, setInteractivity] = useState<number | null>(null);
  const [openFeedback, setOpenFeedback] = useState("");
  const [buildNext, setBuildNext] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (nps === null || overall === null || clarity === null || interactivity === null) {
      toast.error("A few taps left. The rating buttons are not decorative.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/feedback/site", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nps_score: nps,
        overall_rating: overall,
        clarity_rating: clarity,
        interactivity_rating: interactivity,
        open_feedback: openFeedback,
        build_next: buildNext,
        email: user?.email ?? email,
      }),
    });
    setLoading(false);

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      toast.error(data.error ?? "Could not send feedback. Try again?");
      return;
    }

    track("feedback_submitted", { type: "site", nps });
    setSubmitted(true);
    toast.success("Received. Genuinely. Thank you.");
  }

  if (submitted) {
    return (
      <div className="premium-card p-8 text-center md:p-12">
        <p className="text-5xl">🙏</p>
        <h2 className="mt-6 text-2xl font-black text-slate-950">You just made my week better</h2>
        <p className="mt-4 text-slate-600">
          I read every response myself. Yes, still just one person in a room. Your notes go straight
          into what we ship next.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-2xl bg-violet-600 px-8 py-4 font-semibold text-white"
        >
          Back home
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="premium-card space-y-10 p-6 md:p-10">
      {!user && (
        <div>
          <label className="text-sm font-bold text-slate-900" htmlFor="feedback-email">
            Your email
          </label>
          <p className="mt-1 text-sm text-slate-500">
            So I can reply if you want. No newsletter ambush. Promise.
          </p>
          <input
            id="feedback-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="mt-3 w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-violet-500"
          />
        </div>
      )}

      <fieldset>
        <legend className="text-lg font-black text-slate-950">
          Would you tell a friend to try The Grey Project?
        </legend>
        <p className="mt-2 text-sm text-slate-600">
          Classic NPS question. 0 means run. 10 means you already did.
        </p>
        <div className="mt-4">
          <NpsInput value={nps} onChange={setNps} />
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-lg font-black text-slate-950">How was your visit overall?</legend>
        <p className="mt-2 text-sm text-slate-600">Gut feel. No wrong answers.</p>
        <div className="mt-4">
          <RatingInput value={overall} onChange={setOverall} />
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-lg font-black text-slate-950">Did the ideas actually make sense?</legend>
        <p className="mt-2 text-sm text-slate-600">
          Clarity check. Did anything click, or was it all confident hand waving?
        </p>
        <div className="mt-4">
          <RatingInput
            value={clarity}
            onChange={setClarity}
            labels={["Confused", "Foggy", "Some bits", "Clear", "Crystal"]}
          />
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-lg font-black text-slate-950">Did the interactive bits help?</legend>
        <p className="mt-2 text-sm text-slate-600">
          Sandboxes, checkpoints, play widgets. Useful or just pretty?
        </p>
        <div className="mt-4">
          <RatingInput
            value={interactivity}
            onChange={setInteractivity}
            labels={["Nope", "Barely", "A little", "Yes", "Chef kiss"]}
          />
        </div>
      </fieldset>

      <div>
        <label className="text-lg font-black text-slate-950" htmlFor="open-feedback">
          What made you smile? What made you rage quit?
        </label>
        <textarea
          id="open-feedback"
          rows={4}
          value={openFeedback}
          onChange={(e) => setOpenFeedback(e.target.value)}
          placeholder="Be gentle. I'm new at this and I bruise easily."
          className="mt-3 w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-violet-500"
        />
      </div>

      <div>
        <label className="text-lg font-black text-slate-950" htmlFor="build-next">
          If you were CEO for a day, what would you build next?
        </label>
        <textarea
          id="build-next"
          rows={3}
          value={buildNext}
          onChange={(e) => setBuildNext(e.target.value)}
          placeholder="More paths? Dark mode? A button that makes coffee?"
          className="mt-3 w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-violet-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-2xl bg-violet-600 py-4 text-lg font-semibold text-white disabled:opacity-50"
      >
        {loading ? "Sending to the one human..." : "Send feedback"}
      </button>
    </form>
  );
}
