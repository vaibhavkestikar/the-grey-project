import fs from "fs";
import path from "path";

import matter from "gray-matter";

const lessonsDirectory = path.join(
  process.cwd(),
  "content/courses/foundations-of-ai"
);

export function getLessonSlugs() {
  return fs.readdirSync(lessonsDirectory);
}

export function getLessonBySlug(slug: string) {

  const realSlug = slug.replace(/\.mdx$/, "");

  const fullPath = path.join(
    lessonsDirectory,
    `${realSlug}.mdx`
  );

  const fileContents =
    fs.readFileSync(fullPath, "utf8");

  const { data, content } =
    matter(fileContents);

  return {
    slug: realSlug,
    metadata: data,
    content,
  };
}