"use client";

import { useState } from "react";
import { toast } from "sonner";

import type { CertificateData } from "@/components/learning/completion-certificate";

type Props = {
  pathId: string;
  defaultFirstName?: string;
  defaultLastName?: string;
  onIssued: (certificate: CertificateData) => void;
};

export default function CertificateNameForm({
  pathId,
  defaultFirstName = "",
  defaultLastName = "",
  onIssued,
}: Props) {
  const [firstName, setFirstName] = useState(defaultFirstName);
  const [lastName, setLastName] = useState(defaultLastName);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim()) {
      toast.error("Please enter your first and last name.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/certificate/issue", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path_id: pathId,
        first_name: firstName.trim(),
        last_name: lastName.trim(),
      }),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok) {
      toast.error(data.error ?? "Could not generate certificate.");
      return;
    }

    onIssued({
      recipientName: data.recipientName,
      pathTitle: data.pathTitle,
      pathDescription: data.pathDescription,
      completedAt: data.completedAt,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <p className="text-sm text-slate-600">
        Enter your name exactly as you want it on your certificate.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-slate-700">
          First name
          <input
            type="text"
            required
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-violet-500"
            placeholder="First name"
          />
        </label>
        <label className="block text-sm font-semibold text-slate-700">
          Last name
          <input
            type="text"
            required
            autoComplete="family-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-violet-500"
            placeholder="Last name"
          />
        </label>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="rounded-2xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:opacity-50"
      >
        {loading ? "Generating certificate..." : "Generate certificate"}
      </button>
    </form>
  );
}
