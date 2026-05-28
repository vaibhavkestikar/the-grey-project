export default function LessonContent() {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm">

      <div className="mb-6 inline-flex rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
        MODULE 1
      </div>

      <h1 className="text-5xl font-black leading-tight text-slate-900">
        What AI Really Is
      </h1>

      <p className="mt-8 text-xl leading-relaxed text-slate-600">
        Most people think AI is magic.
      </p>

      <p className="mt-6 text-lg leading-relaxed text-slate-700">
        It isn’t.
      </p>

      <p className="mt-6 text-lg leading-relaxed text-slate-700">
        AI is fundamentally a prediction machine.
      </p>

      <div className="mt-10 rounded-[2rem] bg-gradient-to-r from-violet-600 to-blue-600 p-10 text-white">

        <h2 className="text-3xl font-black">
          The Core Mental Model
        </h2>

        <p className="mt-6 text-xl leading-relaxed text-violet-100">
          AI looks at massive amounts of patterns and becomes extremely good at
          predicting what comes next.
        </p>

      </div>

      <div className="mt-12 space-y-8">

        <div>

          <h2 className="text-3xl font-black text-slate-900">
            Think Like Netflix
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-slate-700">
            Netflix doesn’t “understand” movies emotionally.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-slate-700">
            It predicts what you’ll probably watch next based on patterns from
            millions of users.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-slate-700">
            AI systems work similarly — but at much larger scales.
          </p>

        </div>

        <div>

          <h2 className="text-3xl font-black text-slate-900">
            Why This Removes Fear
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-slate-700">
            AI is not a mysterious super-being hiding in a black box.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-slate-700">
            Underneath the hype, it’s mathematics, probabilities, data, and
            optimization.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-slate-700">
            Once you understand the mental models underneath AI, the fear
            disappears and curiosity takes over.
          </p>

        </div>

      </div>

    </div>
  );
}