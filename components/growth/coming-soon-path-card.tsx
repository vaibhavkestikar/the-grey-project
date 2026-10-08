"use client";

import { useState } from "react";
import { toast } from "sonner";

import SimplePathCard from "@/components/learning/simple-path-card";
import { track } from "@/services/analytics/track";
import { FREE_LESSON_COUNT } from "@/types/paths";

const PATH_ICONS: Record<string, string> = {
  "reliable-ai": "🛡️",
  "agentic-systems": "🤖",
  "ai-strategy": "🧭",
};

const PATH_THEMES: Record<string, "indigo" | "emerald" | "rose"> = {
  "reliable-ai": "indigo",
  "agentic-systems": "emerald",
  "ai-strategy": "rose",
};

type Props = {
  title: string;
  tagline?: string;
  description: string;
  who: string;
  why: string;
  outcomes: string;
  waitlistKey?: string;
  pathNumber?: number;
};

async function parseWaitlistResponse(res: Response) {
  return res.json().catch(() => ({})) as Promise<{
    already_joined?: boolean;
    error?: string;
  }>;
}

function shortDescription(tagline: string | undefined, description: string): string {
  if (tagline) return tagline;
  const firstSentence = description.split(/(?<=[.!?])\s+/)[0];
  return firstSentence.length > 140
    ? `${firstSentence.slice(0, 137)}...`
    : firstSentence;
}

export default function ComingSoonPathCard({
  title,
  tagline,
  description,
  who,
  why,
  outcomes,
  waitlistKey,
  pathNumber,
}: Props) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [joined, setJoined] = useState(false);
  const [alreadyJoined, setAlreadyJoined] = useState(false);

  const icon = (waitlistKey && PATH_ICONS[waitlistKey]) || "✦";
  const theme =
    (waitlistKey && PATH_THEMES[waitlistKey]) || "indigo";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("We need an email to notify you.");
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
    toast.success("You're on the list. We'll notify you at launch.");
    setJoined(true);
    setEmail("");
  }

  const waitlistCta = joined ? (
    <p className="rounded-2xl bg-brand-success/10 py-4 text-center text-base font-semibold text-brand-success">
      You&apos;re on the list.
    </p>
  ) : alreadyJoined ? (
    <p className="rounded-2xl bg-amber-50 py-4 text-center text-base font-semibold text-amber-800">
      Already on the waitlist for this path.
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
        {loading ? "Joining..." : "Join Waitlist"}
      </button>
    </form>
  ) : (
    <button type="button" onClick={() => setOpen(true)} className="btn-secondary w-full">
      Join Waitlist
    </button>
  );

  return (
    <SimplePathCard
      theme={theme}
      pathNumber={pathNumber}
      icon={icon}
      title={title}
      description={shortDescription(tagline, description)}
      statusLabel="Coming soon"
      statusTone="soon"
      tags={[`First ${FREE_LESSON_COUNT} lessons free`, "Certificate"]}
      who={who}
      why={why}
      outcomes={outcomes}
      cta={waitlistCta}
    />
  );
}
