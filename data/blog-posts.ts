export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  author: string;
  readTime: string;
  publishedAt: string;
  /** Path under /public, e.g. /blog/inside-chatgpt.png */
  image: string;
  keywords: string[];
  category: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "llm-brain-rot",
    title: 'LLMs Can Get "Brain Rot": What Junk Twitter Data Does to AI',
    description:
      "A new arXiv study shows continual training on junk Twitter/X text can permanently weaken LLM reasoning, long-context skills, and safety. Here is what the Brain Rot Hypothesis means for builders.",
    author: "Vaibhav Kestikar",
    readTime: "8 min read",
    publishedAt: "2026-07-10",
    image: "/blog/brainrot.png",
    keywords: [
      "LLM Brain Rot",
      "junk training data",
      "Twitter X AI",
      "continual pre-training",
      "LLM reasoning decline",
      "data quality",
      "AI safety",
      "thought-skipping",
    ],
    category: "AI research",
  },
  {
    slug: "attention-is-all-you-need",
    title:
      "Attention Is All You Need: How the Transformer Paper Built Modern AI",
    description:
      "A clear guide to the 2017 Transformer paper, self-attention, and why ChatGPT, Claude, and Gemini all run on the same core architecture.",
    author: "Vaibhav Kestikar",
    readTime: "9 min read",
    publishedAt: "2026-05-29",
    image: "/blog/attention-is-all-you-need.png",
    keywords: [
      "Attention Is All You Need",
      "Transformer architecture",
      "self-attention",
      "large language models",
      "ChatGPT",
      "NLP",
    ],
    category: "AI research",
  },
  {
    slug: "inside-chatgpt",
    title: "What Happens Inside ChatGPT After You Press Enter",
    description:
      "From tokenization to the next predicted word: a step by step look at inference, context windows, sampling, and why answers feel instant but are not magic.",
    author: "Vaibhav Kestikar",
    readTime: "9 min read",
    publishedAt: "2026-06-04",
    image: "/blog/inside-chatgpt.png",
    keywords: [
      "ChatGPT",
      "LLM inference",
      "tokenization",
      "transformer",
      "how ChatGPT works",
      "OpenAI",
    ],
    category: "How AI works",
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
