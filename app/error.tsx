"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="site-page flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-black text-slate-950">Something went wrong</h1>
      <p className="mt-4 max-w-md text-slate-600">
        The page hit an unexpected error. You can try again or head back home.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={reset}
          className="rounded-2xl bg-violet-600 px-8 py-4 font-semibold text-white"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-2xl border border-slate-200 px-8 py-4 font-semibold text-slate-800"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}