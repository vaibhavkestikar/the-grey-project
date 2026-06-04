import Image from "next/image";
import Link from "next/link";

export default function FounderSection() {
  return (
    <section className="border-t border-slate-200 px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div className="relative mx-auto max-w-sm">
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-violet-300 to-blue-300 blur-2xl opacity-40" />
          <Image
            src="/founder.png"
            alt="Vaibhav Kestikar"
            width={400}
            height={480}
            className="relative rounded-[2rem] border border-white shadow-2xl object-cover"
          />
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
            Founder
          </p>
          <h2 className="mt-4 text-3xl font-black text-slate-950 md:text-5xl">
            Vaibhav Kestikar
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Senior Data Scientist. Built The Grey Project to teach AI the way I wish it had been taught, with depth, visuals, and zero hype.
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
