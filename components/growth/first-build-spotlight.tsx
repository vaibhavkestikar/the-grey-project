"use client";

import { useState } from "react";
import { toast } from "sonner";

import CountdownTimer from "@/components/growth/countdown-timer";
import SimplePathCard, {
  PathCardExpandable,
} from "@/components/learning/simple-path-card";
import { track } from "@/services/analytics/track";
import {
  FIRST_BUILD_LAUNCH_DATE,
  FIRST_BUILD_LIMITED_SPOTS,
  FREE_LESSON_COUNT,
  getPathById,
} from "@/types/paths";

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
      toast.error(data.error ?? "Something broke. Try again.");
      return;
    }
    track("waitlist_joined", { path: "first-build" });
    toast.success("You're in! We'll ping you before launch.");
    setJoined(true);
    setEmail("");
  }

  const waitlistCta = joined ? (
    <p className="rounded-2xl bg-brand-success/10 py-4 text-center text-base font-semibold text-brand-success">
      You&apos;re on the list. We&apos;ll email you before launch.
    </p>
  ) : alreadyJoined ? (
    <p className="rounded-2xl bg-amber-50 py-4 text-center text-base font-semibold text-amber-800">
      This email is already on the waitlist.
    </p>
  ) : open ? (
    <form onSubmit={submit} className="space-y-3">
      <input
        type="email"
        autoFocus
        required
        placeholder="you@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="auth-input"
      />
      <button type="submit" disabled={loading} className="btn-cta w-full">
        {loading ? "Saving your spot..." : "Join Waitlist"}
      </button>
    </form>
  ) : (
    <button type="button" onClick={() => setOpen(true)} className="btn-cta w-full">
      Join Waitlist
    </button>
  );

  return (
    <SimplePathCard
      theme="amber"
      pathNumber={2}
      hookRibbon="Launching soon"
      icon="🚀"
      title={path.title}
      description={
        path.tagline ??
        "Ship your first real AI feature with modern tools and hands on sandboxes."
      }
      statusLabel={`Only ${FIRST_BUILD_LIMITED_SPOTS} early seats`}
      statusTone="urgent"
      tags={[
        { label: "Scenario based", className: "border-fuchsia-300/60 bg-fuchsia-500/35" },
        { label: "Role play", className: "border-sky-300/60 bg-sky-500/35" },
        `First ${FREE_LESSON_COUNT} lessons free`,
        "Certificate",
        "Interactive sandboxes",
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
      cta={waitlistCta}
      footer={
        path.features && path.features.length > 0 ? (
          <PathCardExpandable theme="amber" label="What's included">
            <ul className="aligned-bullet-list list-none space-y-2 px-2 pb-2">
              {path.features.map((feature) => (
                <li
                  key={feature}
                  className="text-sm leading-relaxed text-ink-muted"
                >
                  <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
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
