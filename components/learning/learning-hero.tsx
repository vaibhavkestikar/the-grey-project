export default function LearningHero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-violet-50 to-white py-28">

      <div className="hero-glow left-1/2 top-0 -translate-x-1/2" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">

        <div className="mb-6 inline-flex rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
          AI Learning Paths
        </div>

        <h1 className="text-5xl font-black leading-tight tracking-tight text-slate-900 md:text-7xl">
          Learn AI
          <br />

          <span className="gradient-text">
            From First Principles
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed text-slate-600">
          Master Artificial Intelligence deeply with visual explanations,
          intuitive mental models, quizzes, and real-world understanding.
        </p>

      </div>

    </section>
  );
}