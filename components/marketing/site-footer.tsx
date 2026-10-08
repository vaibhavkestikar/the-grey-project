import Link from "next/link";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-800 px-4 py-10 text-center text-sm text-slate-500">
      <p>© {year} The Grey Project. Live AI workshops for engineering colleges.</p>
      <nav className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-slate-400">
        <Link href="/workshops" className="hover:text-cyan-300">
          Workshops
        </Link>
        <Link href="/for-colleges" className="hover:text-cyan-300">
          For Colleges
        </Link>
        <Link href="/about" className="hover:text-cyan-300">
          About
        </Link>
        <Link href="/blog" className="hover:text-cyan-300">
          Blog
        </Link>
        <Link href="/feedback" className="hover:text-cyan-300">
          Feedback
        </Link>
      </nav>
    </footer>
  );
}
