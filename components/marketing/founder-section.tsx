export default function FounderSection() {
  return (
    <section className="border-t border-slate-200 px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-violet-300 to-blue-300 opacity-40 blur-2xl" />
          <video
            src="/Video/founder.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="relative aspect-[5/6] w-full rounded-[2rem] border border-white bg-slate-900 object-cover shadow-2xl"
            aria-label="Vaibhav Kestikar introduction video"
          >
            Your browser does not support the video tag.
          </video>
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
            who&apos;d been lied to by LinkedIn posts. So I built The Grey Project:
            depth, visuals, and zero hype. The way I wish someone had taught me.
          </p>
          <p className="mt-4 text-base text-slate-500">
            If you&apos;ve ever nodded along in a meeting while secretly Googling
            &ldquo;what is a transformer model&rdquo;? This is for you.
          </p>
          <a
            href="https://www.linkedin.com/in/vaibhavkestikar/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex rounded-2xl border border-slate-200 bg-white px-8 py-4 font-semibold text-slate-800 shadow-lg shadow-slate-200/80 transition hover:border-violet-400 hover:text-violet-700 hover:shadow-xl hover:shadow-violet-200/50"
          >
            Connect on LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
