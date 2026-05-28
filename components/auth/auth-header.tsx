import Link from "next/link";

export default function AuthHeader() {

  return (

    <header className="absolute left-0 top-0 z-50 w-full">

      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6">

        {/* LEFT */}

        <Link
          href="/"
          className="flex flex-col transition hover:opacity-90"
        >

          <h1 className="text-3xl font-black tracking-tight text-violet-600">
            The Grey Project
          </h1>

          <p className="mt-1 text-[11px] uppercase tracking-[0.35em] text-slate-500">
            UNCOVERING THE GREY IN AI
          </p>

        </Link>

        {/* RIGHT */}

        <div className="flex items-center gap-4">

          <Link
            href="/"
            className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 font-medium text-slate-700 shadow-sm transition hover:border-violet-300 hover:text-violet-600"
          >
            Home
          </Link>

          <Link
            href="/learning"
            className="rounded-xl bg-violet-600 px-5 py-2.5 font-medium text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700"
          >
            Learning
          </Link>

        </div>

      </div>

    </header>

  );
}