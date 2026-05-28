import Link from "next/link";

import Navbar from "@/components/layout/navbar";

import { blogPosts } from "@/data/blog-posts";

export default function BlogPage() {

  return (

    <main className="min-h-screen bg-[#f8fafc]">

      <Navbar />

      {/* HERO */}

      <section className="border-b border-slate-200 bg-gradient-to-b from-violet-50 to-white py-24">

        <div className="mx-auto max-w-6xl px-6 text-center">

          <div className="inline-flex rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
            THE GREY PROJECT BLOG
          </div>

          <h1 className="mt-8 text-6xl font-black tracking-tight text-slate-950 md:text-7xl">
            Understand AI
            <br />

            <span className="gradient-text">
              Beyond The Hype.
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed text-slate-600">
            Deep dives into artificial intelligence, machine learning,
            LLMs, systems design, and the mental models behind modern AI.
          </p>

        </div>

      </section>

      {/* BLOG GRID */}

      <section className="py-24">

        <div className="mx-auto max-w-6xl px-6">

          <div className="grid gap-10 md:grid-cols-2">

            {blogPosts.map((post) => (

              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >

                {/* BLOG IMAGE */}

                <div className="overflow-hidden">

                  <img
                    src={`/blog/${post.slug}.png`}
                    alt={post.title}
                    className="h-72 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />

                </div>

                {/* CONTENT */}

                <div className="p-8">

                  <div className="flex items-center gap-3 text-sm font-medium text-violet-600">

                    <span>{post.readTime}</span>

                    <span>•</span>

                    <span>{post.author}</span>

                  </div>

                  <h2 className="mt-5 text-3xl font-black leading-tight text-slate-950 transition group-hover:text-violet-700">
                    {post.title}
                  </h2>

                  <p className="mt-5 text-lg leading-relaxed text-slate-600">
                    {post.description}
                  </p>

                  <div className="mt-8 inline-flex items-center font-semibold text-violet-600 transition group-hover:translate-x-1">
                    Read Article →
                  </div>

                </div>

              </Link>
            ))}

          </div>

        </div>

      </section>

    </main>

  );
}