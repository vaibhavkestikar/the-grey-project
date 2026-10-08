"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type GreySummary = {
  profile?: {
    availablePoints?: number;
  };
};

export default function GreyPointsNavPill() {
  const [points, setPoints] = useState<number | null>(null);

  async function loadPoints() {
    const res = await fetch("/api/grey/summary");
    const data = (await res.json().catch(() => null)) as GreySummary | null;
    if (res.ok) {
      setPoints(data?.profile?.availablePoints ?? 0);
    }
  }

  useEffect(() => {
    void loadPoints();

    function handleFocus() {
      void loadPoints();
    }

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  if (points === null) return null;

  return (
    <Link
      href="/account#grey-store"
      className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-gradient-to-r from-cyan-500/15 to-violet-500/15 px-3 py-1.5 text-xs font-black text-cyan-200 shadow-[0_0_12px_rgba(34,211,238,0.15)] transition hover:border-cyan-400/50"
      title="Available Grey Points"
    >
      <span className="h-2 w-2 rounded-full bg-emerald-500" />
      {points} GP
    </Link>
  );
}
