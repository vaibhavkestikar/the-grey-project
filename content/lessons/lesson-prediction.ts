import type { StructuredLesson } from "@/types/lesson";

export const lessonPrediction: StructuredLesson = {
  id: "prediction",
  slug: "prediction",
  title: "AI Is Prediction",
  hook: "One idea explains language models, Netflix, fraud alerts, and self driving cars.",
  concept: "prediction",
  durationMinutes: 16,
  pathId: "curious-builders",
  free: true,
  order: 1,
  relatedBlogSlugs: [],
  blocks: [
    {
      type: "hook",
      title: "Forget the science fiction",
      icon: "🎯",
      body: "AI is not a brain in a box. Strip away the hype and one mechanism is left. It looks at patterns it has seen before and predicts what is most likely to come next. Master that single sentence and the rest of this path becomes easy.",
      visual: {
        kind: "stats",
        items: [
          { value: "1", label: "core mechanism" },
          { value: "∞", label: "applications" },
          { value: "0", label: "magic required" },
        ],
      },
    },
    {
      type: "play",
      title: "You already think like a model",
      body: "Do not read this one. Play it. Guess the next word, then reveal the probabilities a model would assign. You will feel your own brain doing prediction.",
      playgroundId: "predict-next",
      playgroundVariant: "sentence",
    },
    {
      type: "checkpoint",
      title: "Name what you just did",
      question: "When you guessed the next word, what were you actually doing?",
      options: [
        "Recalling a memorised dictionary",
        "Predicting the most likely option from patterns",
        "Searching the internet",
        "Following one fixed rule",
      ],
      correctIndex: 1,
      insight:
        "Prediction from patterns. That is the entire game, from your brain to a language model. Nothing was looked up.",
    },
    {
      type: "build",
      title: "Why prediction is so powerful",
      icon: "⚡",
      body: "A predictor does not need to be told every rule. It only needs examples. Show it enough emails and it learns what spam looks like. Show it enough sentences and it learns how language flows. The intelligence lives in the patterns, not in a rulebook someone wrote by hand.",
      highlights: [
        "No explicit rules needed. The system learns patterns from thousands of examples.",
        "Intelligence lives in the patterns, not in any code a human typed.",
        "More examples → better patterns → better predictions.",
      ],
    },
    {
      type: "play",
      title: "Same engine, brand new data",
      body: "Swap words for watch history. A recommender predicts your next click in exactly the same way a language model predicts your next word.",
      playgroundId: "predict-next",
      playgroundVariant: "movie",
    },
    {
      type: "build",
      title: "It is prediction all the way down",
      icon: "🌐",
      body: "Spam filters predict spam or not spam. Banks predict the probability that a charge is fraud. Cameras predict where an object begins and ends. Language models predict the next token. Different surface, identical core. Inputs go in, a probability comes out.",
      highlights: [
        "Spam filter: Is this email spam or not spam?",
        "Fraud detector: Is this transaction genuine or fraudulent?",
        "Language model: What is the most likely next token?",
      ],
      visual: {
        kind: "callout",
        text: "Different domains. Identical core. Inputs go in, a probability comes out.",
        color: "blue",
      },
    },
    {
      type: "play",
      title: "Hold a single prediction unit in your hands",
      body: "This is one tiny spam filter neuron. Drag the sliders and watch the decision move. You are deciding how strongly evidence should flip the answer.",
      playgroundId: "neuron-sandbox",
      playgroundVariant: "spam",
    },
    {
      type: "checkpoint",
      title: "Read the output honestly",
      question: "The neuron outputs a value near 0.9. What is it really saying?",
      options: [
        "It is 100 percent certain and cannot be wrong",
        "The pattern strongly suggests the positive class, like spam",
        "The input was ignored",
        "The weight is zero",
      ],
      correctIndex: 1,
      insight:
        "A high output means high predicted probability. It is confidence, not a guarantee. Real systems are wrong sometimes, and that is expected.",
    },
    {
      type: "build",
      title: "From one neuron to a language model",
      icon: "🔗",
      body: "A large language model is billions of these little units predicting one token at a time, then feeding that token back in to predict the next. Scale and data change what it can do. The core idea never changes.",
      highlights: [
        "Large language models are billions of prediction units working in sequence.",
        "Each unit predicts one token, then feeds it back in to predict the next.",
        "Scale and data change what it can do. The core idea never changes.",
      ],
    },
    {
      type: "checkpoint",
      title: "Training versus using",
      question: "When you chat with a language model, which one is happening?",
      options: [
        "It retrains itself on every message you send",
        "It predicts tokens using frozen weights it already learned",
        "It searches Google for each answer",
        "It runs grammar rules a human wrote",
      ],
      correctIndex: 1,
      insight:
        "Chatting is inference. The learning already happened during training. The model is simply applying what it knows.",
    },
    {
      type: "reflect",
      title: "Your mental model is locked",
      body: "You can now explain AI in one line. It learns patterns from examples and predicts what is likely next. Next you will learn the exact moment when you should stop writing rules yourself and let data write them for you.",
      learned: [
        "AI learns patterns from examples and predicts what comes next.",
        "The same prediction mechanism powers spam filters, recommenders, and language models.",
        "High output means high predicted probability, not certainty.",
        "Chatting with a model is inference, not training.",
      ],
    },
  ],
};
