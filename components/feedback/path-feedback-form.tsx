"use client";

import { useState } from "react";
import { toast } from "sonner";

import NpsInput from "@/components/feedback/nps-input";
import RatingInput from "@/components/feedback/rating-input";
import { useAuth } from "@/components/providers/auth-provider";
import { track } from "@/services/analytics/track";

type Props = {
  pathId: string;
  pathTitle: string;
  onSubmitted?: () => void;
  onSkip?: () => void;
};

export default function PathFeedbackForm({
  pathId,
  pathTitle,
  onSubmitted,
  onSkip,
}: Props) {
  const { user } = useAuth();
  const [nps, setNps] = useState<number | null>(null);
  const [intuition, setIntuition] = useState<number | null>(null);
  const [interactivity, setInteractivity] = useState<number | null>(null);
  const [favoritePart, setFavoritePart] = useState("");
  const [missingPart, setMissingPart] = useState("");
  const [wouldReturn, setWouldReturn] = useState<boolean | null>(null);
  const [openFeedback, setOpenFeedback] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (
      nps === null ||
      intuition === null ||
      interactivity === null ||
      wouldReturn === null
    ) {
      toast.error("Almost there. Fill in the ratings and the return question.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/feedback/path", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path_id: pathId,
        path_title: pathTitle,
        nps_score: nps,
        intuition_rating: intuition,
        interactivity_rating: interactivity,
        favorite_part: favoritePart,
        missing_part: missingPart,
        would_return: wouldReturn,
        open_feedback: openFeedback,
        email: user?.email ?? email,
      }),
    });
    setLoading(false);

    const data = await res.json().catch(() => ({}));
    if (!res.ok && !data.duplicate) {
      toast.error(data.error ?? "Could not save feedback.");
      return;
    }

    track("feedback_submitted", { type: "path", pathId, nps });
    toast.success("Path feedback saved. You are officially helpful.");
    onSubmitted?.();
  }

  return (
    <form onSubmit={submit} className="premium-card space-y-8 p-6 md:p-10">
      <div>
        <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
          You finished a whole learning path
        </p>
        <h2 className="mt-2 text-2xl font-black text-slate-950 md:text-3xl">
          How was {pathTitle}?
        </h2>
        <p className="mt-3 text-slate-600">
          Honest answers only. It is still one person building this from a room. Your notes literally
          decide what gets built next.
        </p>
      </div>

      {!user && (
        <div>
          <label className="text-sm font-bold text-slate-900" htmlFor="path-feedback-email">
            Email (optional but lovely)
          </label>
          <input
            id="path-feedback-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="mt-2 w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-violet-500"
          />
        </div>
      )}

      <fieldset>
        <legend className="text-base font-black text-slate-950">
          Would you recommend this path to someone starting with AI?
        </legend>
        <div className="mt-3">
          <NpsInput value={nps} onChange={setNps} />
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-base font-black text-slate-950">
          Do you actually feel smarter about AI now?
        </legend>
        <p className="mt-1 text-sm text-slate-500">Or did we just waste your time? Be kind.</p>
        <div className="mt-3">
          <RatingInput
            value={intuition}
            onChange={setIntuition}
            labels={["Nope", "A bit", "Somewhat", "Yes", "Mind blown"]}
          />
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-base font-black text-slate-950">
          Were the play bits useful?
        </legend>
        <p className="mt-1 text-sm text-slate-500">Useful learning or glorified button clicking?</p>
        <div className="mt-3">
          <RatingInput
            value={interactivity}
            onChange={setInteractivity}
            labels={["Nope", "Meh", "Okay", "Helpful", "Essential"]}
          />
        </div>
      </fieldset>

      <div>
        <label className="text-base font-black text-slate-950" htmlFor="favorite-part">
          Which lesson or moment stuck with you most?
        </label>
        <input
          id="favorite-part"
          type="text"
          value={favoritePart}
          onChange={(e) => setFavoritePart(e.target.value)}
          placeholder="Prediction? The neuron sandbox? That one checkpoint you aced?"
          className="mt-2 w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-violet-500"
        />
      </div>

      <div>
        <label className="text-base font-black text-slate-950" htmlFor="missing-part">
          What felt missing?
        </label>
        <input
          id="missing-part"
          type="text"
          value={missingPart}
          onChange={(e) => setMissingPart(e.target.value)}
          placeholder="More depth? More jokes? Actual coffee delivery?"
          className="mt-2 w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-violet-500"
        />
      </div>

      <fieldset>
        <legend className="text-base font-black text-slate-950">
          Would you come back when the next path drops?
        </legend>
        <div className="mt-3 flex gap-3">
          <button
            type="button"
            onClick={() => setWouldReturn(true)}
            className={`flex-1 rounded-2xl py-3 font-semibold ${
              wouldReturn === true
                ? "bg-emerald-600 text-white"
                : "border border-slate-200 text-slate-700"
            }`}
          >
            Yes, notify me
          </button>
          <button
            type="button"
            onClick={() => setWouldReturn(false)}
            className={`flex-1 rounded-2xl py-3 font-semibold ${
              wouldReturn === false
                ? "bg-slate-800 text-white"
                : "border border-slate-200 text-slate-700"
            }`}
          >
            Probably not
          </button>
        </div>
      </fieldset>

      <div>
        <label className="text-base font-black text-slate-950" htmlFor="path-open">
          Anything else? Roast us gently.
        </label>
        <textarea
          id="path-open"
          rows={3}
          value={openFeedback}
          onChange={(e) => setOpenFeedback(e.target.value)}
          className="mt-2 w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-violet-500"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 rounded-2xl bg-violet-600 py-4 font-semibold text-white disabled:opacity-50"
        >
          {loading ? "Sending..." : "Submit path feedback"}
        </button>
        {onSkip && (
          <button
            type="button"
            onClick={onSkip}
            className="rounded-2xl border border-slate-200 px-6 py-4 font-semibold text-slate-600"
          >
            Skip for now
          </button>
        )}
      </div>
    </form>
  );
}
