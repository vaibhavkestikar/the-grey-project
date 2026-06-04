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
      body: "People assume a confident model is a correct model. It is not. A language model is trained to produce text that sounds right, not text that is verified. When it has no real answer, it does the only thing it knows how to do. It predicts the most plausible sounding words and presents them with full confidence. We call that a hallucination.",
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
      body: "During training the model is rewarded for fluent, plausible continuations. It is almost never rewarded for saying I do not know. So when the pattern is missing, guessing scores better than admitting a gap. The behaviour is not a bug bolted on. It is a direct result of how the thing was trained.",
    },
    {
      type: "build",
      title: "The fix number one: grounding",
      body: "Give the model real sources at answer time and tell it to use only those. This is called retrieval. Instead of dredging the answer from fuzzy memory, it reads the documents you provide and quotes them. Most serious AI products are really a search system feeding a language model, precisely to stop it from inventing facts.",
    },
    {
      type: "checkpoint",
      title: "Pick the grounded design",
      question: "You build a support bot that must not invent policies. Best approach?",
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
      title: "The fix number two: let it say I do not know",
      body: "A grounded system still needs permission to refuse. If the sources do not contain the answer, the safest output is an honest gap, not a confident guess. Good products reward that refusal in their instructions and their testing, which is the opposite of how the base model was trained.",
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
      type: "reflect",
      title: "You now see the seams",
      body: "Hallucination is fluent prediction with no anchor to truth, and grounding plus honest refusal are the cures. You can now judge an AI feature by one question. Where does its answer actually come from. Last stop, the full workflow that turns a model into a product that survives the real world.",
    },
  ],
};
