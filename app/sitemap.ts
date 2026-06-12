import type { MetadataRoute } from "next";

import { blogPosts } from "@/data/blog-posts";

const BASE = "https://www.thegreyproject.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/try",
    "/try/prediction",
    "/try/classical-vs-ml",
    "/learning",
    "/learning/curious-builders",
    "/learning/first-build",
    "/blog",
    "/about",
    "/feedback",
    "/register",
    "/login",
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
