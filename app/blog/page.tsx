import Link from "next/link";
import Image from "next/image";

import SiteNavbar from "@/components/marketing/site-navbar";
import SiteFooter from "@/components/marketing/site-footer";
import { blogPosts } from "@/data/blog-posts";

export const metadata = {
  title: "AI Blog | The Grey Project",
  description:
    "Deep dives on Transformers, ChatGPT, LLM inference, and the mental models behind modern AI. Written by Vaibhav Kestikar.",
};

export default function BlogPage() {
  return (
    <main className="site-page">
      <SiteNavbar />

      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900/80 to-transparent px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl text-center">
          <div className="site-badge">The Grey Project Blog</div>

          <h1 className="mt-8 text-4xl font-black tracking-tight text-slate-50 md:text-6xl lg:text-7xl">
            Understand AI
            <br />
            <span className="home-gradient-text home-gradient-text-shine">
              beyond the hype
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl">
            Research breakdowns and system explainers on language models,
            Transformers, and how products like ChatGPT actually work.
          </p>
        </div>
      </section>

      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 md:grid-cols-2">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="site-card group flex flex-col overflow-hidden hover:-translate-y-1"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-800">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-cyan-300">
                    <span className="rounded-full border border-cyan-500/25 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-200">
                      {post.category}
                    </span>
                    <span className="text-slate-500">·</span>
                    <span className="text-slate-400">{post.readTime}</span>
                  </div>

                  <h2 className="mt-4 text-2xl font-black leading-tight text-slate-50 transition group-hover:text-cyan-300 md:text-3xl">
                    {post.title}
                  </h2>

                  <p className="mt-3 flex-1 text-base leading-relaxed text-slate-400">
                    {post.description}
                  </p>

                  <p className="mt-5 text-sm font-semibold text-slate-500">
                    {post.author}
                  </p>

                  <span className="mt-6 inline-flex items-center font-semibold text-cyan-400 transition group-hover:translate-x-1">
                    Read article
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
