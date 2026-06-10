import Link from "next/link";

export default function AuthHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="/" className="flex min-w-0 flex-col">
          <span className="gradient-text gradient-text-shine truncate text-lg font-black leading-none tracking-tight sm:text-2xl">
            The Grey Project
          </span>
          <span className="brand-subtitle gradient-text gradient-text-shine opacity-90">
            UNCOVERING THE GREY IN AI
          </span>
        </Link>

        <div className="flex shrink-0 items-center gap-2">
          <Link href="/" className="btn-nav">
            Home
          </Link>
          <Link
            href="/learning"
            className="btn-cta !min-h-[44px] !px-4 !py-2.5 !text-sm"
          >
            Learning
          </Link>
        </div>
      </div>
    </header>
  );
}
