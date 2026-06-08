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
      className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-gradient-to-r from-violet-50 to-blue-50 px-3 py-1.5 text-xs font-black text-violet-700 shadow-sm transition hover:border-violet-300 hover:from-violet-100 hover:to-blue-100"
      title="Available Grey Points"
    >
      <span className="h-2 w-2 rounded-full bg-emerald-500" />
      {points} GP
    </Link>
  );
}
