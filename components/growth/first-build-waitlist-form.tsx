"use client";

import { useState } from "react";
import { toast } from "sonner";

import { track } from "@/services/analytics/track";

type Props = {
  className?: string;
  buttonClassName?: string;
};

export default function FirstBuildWaitlistForm({
  className = "",
  buttonClassName = "btn-home-cta w-full",
}: Props) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [joined, setJoined] = useState(false);
  const [alreadyJoined, setAlreadyJoined] = useState(false);

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
        module_name: "first-build",
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
    setOpen(false);
  }

  if (joined) {
    return (
      <p
        className={`rounded-2xl border border-emerald-500/30 bg-emerald-500/10 py-4 text-center text-base font-semibold text-emerald-300 ${className}`}
      >
        You&apos;re on the list. We&apos;ll email you before launch.
      </p>
    );
  }

  if (alreadyJoined) {
    return (
      <p
        className={`rounded-2xl border border-amber-500/30 bg-amber-500/10 py-4 text-center text-base font-semibold text-amber-200 ${className}`}
      >
        This email is already on the waitlist.
      </p>
    );
  }

  if (open) {
    return (
      <form onSubmit={submit} className={`space-y-3 ${className}`}>
        <input
          type="email"
          autoFocus
          required
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input"
        />
        <button type="submit" disabled={loading} className={buttonClassName}>
          {loading ? "Saving your spot..." : "Join Waitlist"}
        </button>
      </form>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className={`${buttonClassName} ${className}`}
    >
      Join Waitlist
    </button>
  );
}
