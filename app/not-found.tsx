import Link from "next/link";

export default function NotFound() {
  return (
    <main className="site-page flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-black text-slate-950">Page not found</h1>
      <p className="mt-4 max-w-md text-slate-600">
        That route does not exist. Try the learning hub or head home.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/learning"
          className="rounded-2xl bg-violet-600 px-8 py-4 font-semibold text-white"
        >
          Learning hub
        </Link>
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