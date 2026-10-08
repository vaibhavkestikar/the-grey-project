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
      toast.error("Please complete the ratings before sending.");
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
    toast.success("Received. Thank you.");
  }

  if (submitted) {
    return (
      <div className="premium-card p-8 text-center md:p-12">
        <h2 className="mt-6 text-2xl font-black text-slate-950">Received. Thank you.</h2>
        <p className="mt-4 text-slate-600">
          Notes go into how we run the next campus workshop.
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
            Optional if you want a reply. Not used for a mailing list.
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
          Would you recommend The Grey Project workshop to a college colleague?
        </legend>
        <p className="mt-2 text-sm text-slate-600">
          0 is not at all. 10 is definitely.
        </p>
        <div className="mt-4">
          <NpsInput value={nps} onChange={setNps} />
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-lg font-black text-slate-950">How was this visit overall?</legend>
        <p className="mt-2 text-sm text-slate-600">A quick overall rating.</p>
        <div className="mt-4">
          <RatingInput value={overall} onChange={setOverall} />
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-lg font-black text-slate-950">Was the copy clear?</legend>
        <p className="mt-2 text-sm text-slate-600">
          Could a TPO or student tell what the workshop is?
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
        <legend className="text-lg font-black text-slate-950">Was it easy to inquire or book?</legend>
        <p className="mt-2 text-sm text-slate-600">
          Forms, navigation, and calls to action.
        </p>
        <div className="mt-4">
          <RatingInput
            value={interactivity}
            onChange={setInteractivity}
            labels={["Hard", "Awkward", "OK", "Clear", "Easy"]}
          />
        </div>
      </fieldset>

      <div>
        <label className="text-lg font-black text-slate-950" htmlFor="open-feedback">
          Anything we should change?
        </label>
        <textarea
          id="open-feedback"
          rows={4}
          value={openFeedback}
          onChange={(e) => setOpenFeedback(e.target.value)}
          placeholder="Format, timing, missing details…"
          className="mt-3 w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-violet-500"
        />
      </div>

      <div>
        <label className="text-lg font-black text-slate-950" htmlFor="build-next">
          What would make this easier to book for a college?
        </label>
        <textarea
          id="build-next"
          rows={3}
          value={buildNext}
          onChange={(e) => setBuildNext(e.target.value)}
          placeholder="Dates, batch size, faculty involvement…"
          className="mt-3 w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-violet-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-2xl bg-violet-600 py-4 text-lg font-semibold text-white disabled:opacity-50"
      >
        {loading ? "Sending…" : "Send feedback"}
      </button>
    </form>
  );
}
