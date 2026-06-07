import type { StructuredLesson } from "@/types/lesson";

export const lessonHallucinations: StructuredLesson = {
  id: "hallucinations",
  slug: "hallucinations",
  title: "Why AI Makes Things Up",
  hook: "Models do not lie. They predict fluent text — and fluent is not the same as true.",
  concept: "hallucination and grounding",
  durationMinutes: 16,
  pathId: "curious-builders",
  free: false,
  order: 6,
  relatedBlogSlugs: [],
  blocks: [
    {
      type: "hook",
      title: "The most expensive misunderstanding in AI",
      icon: "⚠️",
      body: "I watched a VP present AI research to a board meeting. Two of the three cited papers were hallucinated. Authors, journals, page numbers, volume numbers — all invented. All wrong. The model generated them with complete confidence. No disclaimer. No flag. Just convincing, plausible, utterly false information. This is not a rare edge case. It is the default behaviour of a system trained to produce fluent text, not verified text. Understanding why it happens is what separates people who deploy AI safely from people who get burned by it.",
      visual: {
        kind: "callout",
        text: "A language model can be 95% confident and 100% wrong. Stated confidence and verified truth are not the same thing.",
        color: "amber",
      },
    },
    {
      type: "play",
      title: "Catch a hallucination in the act",
      body: "Ask the model something it cannot possibly know. Watch it answer with full confidence. Then switch grounding on and see the honest reply. The model itself does not change — only what it has access to.",
      playgroundId: "hallucination-lab",
    },
    {
      type: "checkpoint",
      title: "Read the confidence",
      question: "In the playground, when did the model sound most certain?",
      options: [
        "When it admitted it did not have enough information",
        "When it invented a detailed, authoritative-sounding but false answer",
        "It was never confident — it always hedged",
        "Only when it had a real retrieved source to reference",
      ],
      correctIndex: 1,
      insight:
        "Stated confidence and truth are not the same thing. A raw model can sound most certain exactly when it is making something up — because it is completing a pattern, not verifying a fact.",
    },
    {
      type: "build",
      title: "Why this happens — not just that it happens",
      icon: "🎓",
      body: "During training the model is rewarded for producing fluent, plausible continuations of text. It is almost never rewarded for saying 'I do not know.' So when the answer is not in its training patterns, guessing confidently scores better than admitting a gap. The behaviour is not a bug bolted on later. It is a direct result of how the thing was trained — and it is the thing to design around, not to be surprised by.",
      highlights: [
        "The model was trained to produce fluent, plausible text — not verified text.",
        "It was almost never rewarded for saying 'I do not know.'",
        "Hallucination is not a bug. It is a direct result of the training objective.",
      ],
    },
    {
      type: "play",
      title: "Simulate grounding versus raw generation",
      body: "Run this to see the difference between a model answering from memory and a model restricted to retrieved sources. The confidence numbers at the end are the thing to study.",
      playgroundId: "python-sandbox",
      playgroundVariant: "confidence-vs-truth",
    },
    {
      type: "build",
      title: "Fix one: grounding",
      icon: "⚓",
      body: "Give the model real source documents at answer time and tell it to use only those. This is called retrieval. Instead of dredging an answer from fuzzy memory, it reads the documents you provide and summarises them. Most serious AI products are a search system feeding a language model — precisely to stop it from inventing facts. The technical name is retrieval-augmented generation (RAG). You saw it working in the Python sandbox.",
      highlights: [
        "Retrieve real source documents and instruct the model to answer only from them.",
        "Most serious AI products are a search system feeding a language model.",
        "Grounding anchors answers in real text instead of fuzzy pattern-completion.",
      ],
    },
    {
      type: "checkpoint",
      title: "Pick the grounded design",
      question:
        "You are building a support bot that must never invent company policies. Best approach?",
      options: [
        "Let the model answer from its training memory alone — it knows a lot",
        "Retrieve the real policy documents and restrict answers to what they contain",
        "Tell the model to be more confident and it will be more accurate",
        "Use the largest available model and hope it has seen your policies",
      ],
      correctIndex: 1,
      insight:
        "Retrieval grounds the answer in real, auditable text. The model summarises sources rather than imagining policies that may not exist. This is the standard architecture for any AI feature where accuracy matters.",
    },
    {
      type: "build",
      title: "Fix two: let it say 'I do not know'",
      icon: "🚦",
      body: "A grounded system still needs explicit permission to refuse. If the retrieved sources do not contain the answer, the safest output is an honest gap — not a confident guess generated from memory. Good products reward that refusal in their system prompt and in their evaluation. This is the opposite of how the base model was trained, which is why you have to engineer it deliberately.",
      highlights: [
        "A grounded system still needs explicit permission to refuse.",
        "If sources lack the answer, honest refusal is safer than a confident guess.",
        "Reward refusal in your system prompt. The base model was trained to avoid it.",
      ],
      visual: {
        kind: "comparison",
        leftLabel: "Raw generation is fine when",
        leftPoints: [
          "Errors are low-stakes (brainstorming, drafting, ideation)",
          "Users will review and verify the output themselves",
          "Creative quality matters more than factual precision",
          "There is no authoritative source to retrieve from",
        ],
        rightLabel: "Grounding is essential when",
        rightPoints: [
          "Answers cite policies, legal terms, prices, or medical information",
          "Users will act on the output without verifying it",
          "Errors erode trust or create legal liability",
          "You have a defined corpus of authoritative documents",
        ],
      },
    },
    {
      type: "checkpoint",
      title: "Your new default",
      question: "What is the most useful habit when working with a confident model answer?",
      options: [
        "Trust it completely — it sounds authoritative so it must be right",
        "Verify important claims independently, especially names, numbers, dates, and quotes",
        "Assume everything is wrong and never use the output",
        "Only trust answers shorter than two sentences",
      ],
      correctIndex: 1,
      insight:
        "Confidence is not evidence. Verify the facts that matter. This single habit separates people who use AI well from people it regularly misleads — and it costs nothing to build.",
    },
    {
      type: "apply",
      title: "Audit and design for honesty",
      body: "The question 'where does this answer come from?' is the most important one you can ask about any AI feature. Ask it before you ship. Ask it again after you ship. Ask it whenever something breaks.",
      roles: [
        {
          role: "Product Manager",
          action:
            "Audit every AI feature in your product with one question: is it answering from retrieved sources or from model memory? For anything involving facts, policies, prices, or legal content — if the answer is memory, that is a live hallucination risk on your roadmap.",
        },
        {
          role: "Founder",
          action:
            "Before shipping any AI feature, define the honest-gap policy in writing: what should the model say when it does not know? 'I do not have enough information to answer that' is a feature, not a failure. Write it into your system prompt and test it before launch.",
        },
        {
          role: "Builder",
          action:
            "Test your AI feature with a question whose answer is not in your data or context. Does it hallucinate confidently or refuse honestly? If it hallucates, add explicit refusal instructions to your system prompt — and test again. Do not ship until refusal works.",
        },
        {
          role: "Analyst",
          action:
            "When using AI to summarise or analyse reports, always include the source text in the prompt and tell the model to answer only from it. Then spot-check three outputs per session against the original. Fluent does not mean accurate.",
        },
      ],
      microAction:
        "Open Claude or your AI tool. Ask it a very specific question about your own company, product, or a recent internal decision it could not possibly know. Watch what happens. Is it grounded in what you told it, or is it generating plausible-sounding information? That gap is exactly what you are now designing around.",
    },
    {
      type: "reflect",
      title: "You now see the seams",
      body: "Hallucination is fluent prediction with no anchor to truth. Grounding and honest refusal are the cures. You can now judge any AI feature by one question: where does its answer actually come from? Final lesson: the full workflow that turns a raw model into a product that survives the real world.",
      learned: [
        "Hallucination = fluent pattern-completion with no anchor to verified truth.",
        "Confident does not mean correct. Always verify facts that matter.",
        "Grounding: retrieve real sources and restrict answers to what they contain (RAG).",
        "Design honest refusal explicitly — the base model was trained away from it.",
        "The question to ask about every AI feature: where does this answer actually come from?",
      ],
    },
  ],
};
