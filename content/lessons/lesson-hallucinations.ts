import type { StructuredLesson } from "@/types/lesson";

export const lessonHallucinations: StructuredLesson = {
  id: "hallucinations",
  slug: "hallucinations",
  title: "Why AI Makes Things Up",
  hook: "Models do not lie. They predict fluent text, and fluent is not the same as true.",
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
      body: "People assume a confident model is a correct model. It is not. A language model is trained to produce text that sounds right, not text that is verified. When it has no real answer, it does the only thing it knows how to do. It predicts the most plausible sounding words and presents them with full confidence. We call that a hallucination.",
      visual: {
        kind: "callout",
        text: "A language model can be 95% confident and 100% wrong. Stated confidence and verified truth are not the same thing.",
        color: "amber",
      },
    },
    {
      type: "play",
      title: "Catch a hallucination in the act",
      body: "Ask the model something it cannot possibly know. Watch it answer with high confidence, then switch grounding on and see the honest reply.",
      playgroundId: "hallucination-lab",
    },
    {
      type: "checkpoint",
      title: "Read the confidence",
      question: "In the lab, when was the model most confident?",
      options: [
        "When it admitted it did not know",
        "When it invented a detailed but false answer",
        "It was never confident",
        "Only when it had a real source",
      ],
      correctIndex: 1,
      insight:
        "Stated confidence and truth are not the same thing. A raw model can sound most certain exactly when it is making something up.",
    },
    {
      type: "build",
      title: "Why this happens, not just that it happens",
      icon: "🎓",
      body: "During training the model is rewarded for fluent, plausible continuations. It is almost never rewarded for saying I do not know. So when the pattern is missing, guessing scores better than admitting a gap. The behaviour is not a bug bolted on. It is a direct result of how the thing was trained.",
      highlights: [
        "The model was trained to produce fluent, plausible text, not verified text.",
        "It was almost never rewarded for saying 'I do not know'.",
        "Hallucination is not a bug. It is a direct result of how the model was trained.",
      ],
    },
    {
      type: "build",
      title: "Fix one: grounding",
      icon: "⚓",
      body: "Give the model real sources at answer time and tell it to use only those. This is called retrieval. Instead of dredging the answer from fuzzy memory, it reads the documents you provide and quotes them. Most serious AI products are really a search system feeding a language model, precisely to stop it from inventing facts.",
      highlights: [
        "Retrieve real source documents and tell the model to use only those.",
        "Most serious AI products are a search system feeding a language model.",
        "Grounding anchors answers in real text instead of fuzzy memory.",
      ],
    },
    {
      type: "checkpoint",
      title: "Pick the grounded design",
      question:
        "You build a support bot that must not invent policies. Best approach?",
      options: [
        "Let the model answer from memory alone",
        "Retrieve the real policy docs and have it answer only from them",
        "Tell it to be more confident",
        "Use a bigger model and hope",
      ],
      correctIndex: 1,
      insight:
        "Retrieval grounds the answer in real text. The model summarises sources rather than imagining policies that do not exist.",
    },
    {
      type: "build",
      title: "Fix two: let it say I do not know",
      icon: "🚦",
      body: "A grounded system still needs permission to refuse. If the sources do not contain the answer, the safest output is an honest gap, not a confident guess. Good products reward that refusal in their instructions and their testing, which is the opposite of how the base model was trained.",
      highlights: [
        "A grounded system still needs explicit permission to refuse.",
        "If sources do not contain the answer, honest refusal is safer than a confident guess.",
        "Good products reward refusal in their instructions, opposite to base model training.",
      ],
      visual: {
        kind: "comparison",
        leftLabel: "Raw generation is fine when",
        leftPoints: [
          "Errors are low stakes (brainstorming, drafting, ideation)",
          "Users will review and verify the output themselves",
          "Creative quality matters more than factual precision",
          "There is no authoritative source to retrieve from",
        ],
        rightLabel: "Grounding is essential when",
        rightPoints: [
          "Answers cite policies, legal terms, or prices",
          "Users will act on the output without checking",
          "Errors erode trust or create liability",
          "You have a defined corpus of authoritative documents",
        ],
      },
    },
    {
      type: "checkpoint",
      title: "Your new default",
      question: "What is the healthiest way to treat a confident model answer?",
      options: [
        "Trust it completely because it sounds sure",
        "Verify important claims, especially names, numbers, and quotes",
        "Assume everything is wrong",
        "Only trust short answers",
      ],
      correctIndex: 1,
      insight:
        "Confidence is not evidence. Verify the facts that matter. This single habit separates people who use AI well from people it misleads.",
    },
    {
      type: "apply",
      title: "Audit and design for honesty",
      body: "The question 'where does this answer come from?' is the most important one you can ask about any AI feature. Ask it before you ship. Ask it again after.",
      roles: [
        {
          role: "Product Manager",
          action: "Audit every AI feature in your product with one question: is it answering from retrieved sources or from model memory? For anything involving facts, policies, prices, or legal content, if the answer is memory, that is a hallucination risk on your roadmap.",
        },
        {
          role: "Founder",
          action: "Before shipping any AI feature, define the honest gap policy in writing: what should the model say when it does not know? 'I do not have enough information to answer that' is a feature, not a failure. Write it into your system prompt.",
        },
        {
          role: "Builder",
          action: "Test your AI feature with a question whose answer is NOT in your data or context. Does it hallucinate confidently or refuse honestly? If it hallucates, add explicit refusal instructions to your system prompt and test again.",
        },
      ],
      microAction:
        "Open Claude or your AI tool of choice. Ask it a very specific question about your own company, product, or a recent internal decision. Watch what happens. Is it grounded in what you told it, or is it making plausible-sounding things up? That gap is what you are designing around.",
    },
    {
      type: "reflect",
      title: "You now see the seams",
      body: "Hallucination is fluent prediction with no anchor to truth, and grounding plus honest refusal are the cures. You can now judge any AI feature by one question: where does its answer actually come from? Last stop, the full workflow that turns a model into a product that survives the real world.",
      learned: [
        "Hallucination = fluent prediction with no anchor to truth.",
        "Confident does not mean correct. Always verify important claims.",
        "Grounding: retrieve real sources and limit answers to what they contain.",
        "Let it say 'I do not know'. Reward honest refusal in your instructions.",
      ],
    },
  ],
};
