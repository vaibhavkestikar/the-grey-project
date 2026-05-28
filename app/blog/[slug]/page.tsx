import fs from "fs";

import path from "path";

import { notFound } from "next/navigation";

import { compileMDX } from "next-mdx-remote/rsc";

import Navbar from "@/components/layout/navbar";

import { blogPosts } from "@/data/blog-posts";

import { mdxComponents } from "@/components/mdx-components";

export async function generateStaticParams() {

  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const { slug } = await params;

  const post = blogPosts.find(
    (p) => p.slug === slug
  );

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const { slug } = await params;

  const post = blogPosts.find(
    (p) => p.slug === slug
  );

  if (!post) {
    notFound();
  }

  const filePath = path.join(
    process.cwd(),
    "content/blog",
    `${slug}.mdx`
  );

  const source =
    fs.readFileSync(
      filePath,
      "utf8"
    );

  const { content } =
    await compileMDX({
      source,
      components:
        mdxComponents,
      options: {
        parseFrontmatter:
          true,
      },
    });

  return (

    <main className="min-h-screen bg-[#f8fafc]">

      <Navbar />

      <article className="py-20">

        <div className="mx-auto max-w-4xl px-6">

          {/* HEADER */}

          <div className="mb-10">

            <div className="inline-flex rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
              AI RESEARCH BREAKDOWN
            </div>

            <h1 className="mt-8 text-5xl font-black leading-tight tracking-tight text-slate-950 md:text-7xl">
              {post.title}
            </h1>

            <div className="mt-8 flex flex-wrap items-center gap-4 text-slate-600">

              <span>{post.author}</span>

              <span>•</span>

              <span>{post.readTime}</span>

              <span>•</span>

              <span>{post.publishedAt}</span>

            </div>

          </div>

          {/* HERO */}

          <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-violet-600 via-purple-600 to-blue-500 p-20 shadow-2xl">

            <h2 className="text-5xl font-black leading-tight text-white md:text-6xl">
              Attention
              <br />
              Changed AI Forever.
            </h2>

          </div>

          {/* CONTENT */}

          <div
            className="
              mdx-content
              prose
              prose-xl
              mt-16
              max-w-none

              prose-headings:font-black
              prose-headings:text-slate-950

              prose-h1:text-5xl
              prose-h1:leading-tight

              prose-h2:mt-16
              prose-h2:text-3xl

              prose-p:my-6
              prose-p:text-slate-700
              prose-p:leading-9

              prose-strong:text-slate-950

              prose-li:my-2
              prose-li:text-slate-700
              prose-li:leading-8

              prose-ul:my-8
              prose-ul:list-disc
              prose-ul:pl-6

              prose-blockquote:border-violet-500
              prose-blockquote:bg-violet-50
              prose-blockquote:px-6
              prose-blockquote:py-3
              prose-blockquote:rounded-2xl
              prose-blockquote:text-slate-800
              prose-blockquote:font-medium

              prose-a:text-violet-600
              prose-a:font-semibold
              prose-a:no-underline
              hover:prose-a:text-violet-800

              prose-hr:my-14
            "
          >

            {content}

          </div>

        </div>

      </article>

    </main>

  );
}