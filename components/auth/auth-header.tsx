import Link from "next/link";

export default function AuthHeader() {

  return (

    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-xl">

      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-3 sm:px-6">

        {/* LEFT */}

        <Link
          href="/"
          className="flex min-w-0 flex-col"
        >

          <h1 className="whitespace-nowrap text-[1.45rem] font-black leading-none tracking-tight text-violet-600 sm:text-4xl">

            The Grey Project

          </h1>

          <p className="mt-1 whitespace-nowrap text-[6px] uppercase tracking-[0.22em] text-slate-500 sm:text-[10px] sm:tracking-[0.4em]">

            UNCOVERING THE GREY IN AI

          </p>

        </Link>

        {/* RIGHT */}

        <div className="flex shrink-0 items-center gap-2">

          <Link
            href="/"
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-violet-300 hover:text-violet-600 sm:px-5 sm:text-sm"
          >
            Home
          </Link>

          <Link
            href="/learning"
            className="rounded-xl bg-violet-600 px-3 py-2 text-xs font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700 sm:px-5 sm:text-sm"
          >
            Learning
          </Link>

        </div>

      </div>

    </header>

  );
}