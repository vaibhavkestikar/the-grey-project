"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
          <h1 className="text-3xl font-black text-slate-950">Something went wrong</h1>
          <p className="mt-4 text-slate-600">Please try again.</p>
          <button
            type="button"
            onClick={reset}
            className="mt-8 rounded-2xl bg-violet-600 px-8 py-4 font-semibold text-white"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}