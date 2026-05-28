import Link from "next/link";

const courses = [
  {
    title: "Foundations of AI",

    description:
      "Understand AI deeply from first principles.",

    status: "Available",

    href: "/learning/foundations-of-ai",
  },

  {
    title: "Generative AI Engineering",

    description:
      "Build production-grade GenAI systems and workflows.",

    status: "Coming Soon",
  },

  {
    title: "Agentic AI Systems",

    description:
      "Understand autonomous AI agents and orchestration.",

    status: "Coming Soon",
  },

  {
    title: "LLMOps & AI Infrastructure",

    description:
      "Deploy, scale, and optimize modern AI systems.",

    status: "Coming Soon",
  },

  {
    title: "AI Product Engineering",

    description:
      "Design AI-first applications with real-world impact.",

    status: "Coming Soon",
  },

  {
    title: "Multi-Agent Architectures",

    description:
      "Learn collaborative AI systems and agent networks.",

    status: "Coming Soon",
  },
];

export default function LearningGrid() {
  return (
    <section className="pb-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-12">

          <h2 className="text-4xl font-black text-slate-900">
            Learning Paths
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            Deep AI learning journeys designed for developers and builders.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {courses.map((course) => {

            const CardContent = (
              <div className="group h-full rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-2xl">

                <div
                  className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                    course.status === "Available"
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {course.status}
                </div>

                <h3 className="mt-8 text-3xl font-black text-slate-900">
                  {course.title}
                </h3>

                <p className="mt-5 text-lg leading-relaxed text-slate-600">
                  {course.description}
                </p>

                <div className="mt-10">

                  {course.status === "Available" ? (
                    <span className="font-semibold text-violet-600">
                      Start Learning →
                    </span>
                  ) : (
                    <span className="font-semibold text-slate-500">
                      Coming Soon
                    </span>
                  )}

                </div>

              </div>
            );

            return course.href ? (
              <Link key={course.title} href={course.href}>
                {CardContent}
              </Link>
            ) : (
              <div key={course.title}>
                {CardContent}
              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}