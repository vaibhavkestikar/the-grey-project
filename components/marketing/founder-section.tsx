import Image from "next/image";
import Link from "next/link";

export default function FounderSection() {
  return (
    <section className="border-t border-slate-200 px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div className="relative mx-auto max-w-sm">
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-violet-300 to-blue-300 opacity-40 blur-2xl" />
          <Image
            src="/founder.png"
            alt="Vaibhav Kestikar"
            width={400}
            height={480}
            className="relative rounded-[2rem] border border-white object-cover shadow-2xl"
          />
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
            The human behind the grey
          </p>
          <h2 className="mt-4 text-3xl font-black text-slate-950 md:text-5xl">
            Vaibhav Kestikar
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Senior Data Scientist. I got tired of explaining AI to smart people
            who&apos;d been lied to by LinkedIn posts.             So I built The Grey Project: depth, visuals, and zero hype. The way I wish someone had taught me.
          </p>
          <p className="mt-4 text-base text-slate-500">
            If you&apos;ve ever nodded along in a meeting while secretly Googling
            &ldquo;what is a transformer model&rdquo;? This is for you.
          </p>
          <a
            href="https://www.linkedin.com/in/vaibhavkestikar/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex rounded-2xl border border-slate-200 px-8 py-4 font-semibold text-slate-800 transition hover:border-violet-400 hover:text-violet-700"
          >
            Connect on LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
