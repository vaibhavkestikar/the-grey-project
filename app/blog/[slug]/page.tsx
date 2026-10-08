import fs from "fs";
import path from "path";
import Image from "next/image";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import SiteNavbar from "@/components/marketing/site-navbar";
import SiteFooter from "@/components/marketing/site-footer";
import BlogWorkshopCta from "@/components/marketing/blog-workshop-cta";
import { blogPosts, getBlogPost } from "@/data/blog-posts";
import { mdxComponents } from "@/components/mdx-components";

const SITE = "https://www.thegreyproject.com";

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
  const post = getBlogPost(slug);

  if (!post) {
    return {};
  }

  const url = `${SITE}/blog/${post.slug}`;

  return {
    title: `${post.title} | The Grey Project`,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [{ url: `${SITE}${post.image}`, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`${SITE}${post.image}`],
    },
    alternates: { canonical: url },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const filePath = path.join(
    process.cwd(),
    "content/blog",
    `${slug}.mdx`
  );

  const source = fs.readFileSync(filePath, "utf8");

  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: `${SITE}${post.image}`,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author,
      url: "https://www.linkedin.com/in/vaibhavkestikar/",
    },
    publisher: {
      "@type": "Organization",
      name: "The Grey Project",
      url: SITE,
    },
    mainEntityOfPage: `${SITE}/blog/${post.slug}`,
  };

  return (
    <main className="site-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteNavbar />

      <article className="pb-20 pt-10 md:pt-14">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="site-badge">
                {post.category}
              </span>
              <time
                dateTime={post.publishedAt}
                className="text-sm text-slate-500"
              >
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>

            <h1 className="mt-6 text-4xl font-black leading-[1.1] tracking-tight text-slate-50 md:text-5xl lg:text-6xl">
              {post.title}
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-slate-400 md:text-xl">
              {post.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm font-medium text-slate-400">
              <span className="font-semibold text-slate-200">
                {post.author}
              </span>
              <span aria-hidden>·</span>
              <span>{post.readTime}</span>
            </div>
          </header>

          <div className="relative overflow-hidden rounded-[2rem] shadow-2xl">
            <Image
              src={post.image}
              alt={post.title}
              width={1200}
              height={630}
              className="h-auto w-full object-cover"
              priority
            />
          </div>

          <div
            className="
              mdx-content
              prose
              prose-invert
              prose-lg
              mt-14
              max-w-none

              prose-headings:font-black
              prose-headings:text-slate-50
              prose-headings:tracking-tight

              prose-h2:mt-14
              prose-h2:mb-4
              prose-h2:text-3xl
              prose-h2:border-b
              prose-h2:border-slate-700
              prose-h2:pb-4

              prose-h3:mt-10
              prose-h3:text-2xl

              prose-p:my-5
              prose-p:text-slate-300
              prose-p:leading-[1.85]

              prose-strong:text-slate-50
              prose-li:text-slate-300
              prose-li:leading-8

              prose-a:text-cyan-400
              prose-a:font-semibold
              hover:prose-a:text-cyan-300

              prose-table:my-8
            "
          >
            {content}
          </div>

          <BlogWorkshopCta />
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}
