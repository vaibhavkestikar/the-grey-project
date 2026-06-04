import type { StructuredLesson } from "@/types/lesson";

export const lessonTokensEmbeddings: StructuredLesson = {
  id: "tokens-embeddings",
  slug: "tokens-embeddings",
  title: "How AI Reads: Tokens And Meaning",
  hook: "A model never sees your words. It sees numbers. Here is the translation.",
  concept: "tokens and embeddings",
  durationMinutes: 17,
  pathId: "curious-builders",
  free: false,
  order: 4,
  relatedBlogSlugs: [],
  blocks: [
    {
      type: "hook",
      title: "The secret first step",
      body: "Before a model can predict anything, it has to convert your text into numbers, because maths is all it can do. This happens in two moves. First it chops your text into tokens. Then it turns each token into a list of numbers that captures meaning. Understand these two moves and a lot of mysterious model behaviour suddenly makes sense.",
    },
    {
      type: "play",
      title: "Watch your words become tokens",
      body: "Type anything and see how the model slices it. Notice that common words stay whole while rare or long words shatter into pieces.",
      playgroundId: "tokenizer",
    },
    {
      type: "checkpoint",
      title: "What is a token?",
      question: "Based on the playground, a token is best described as",
      options: [
        "Always exactly one word",
        "A chunk of text, often a word or part of a word",
        "A single letter, always",
        "A full sentence",
      ],
      correctIndex: 1,
      insight:
        "A token is a chunk of text. Frequent words are usually one token, while rare words split into several. On average a token is about four characters of English.",
    },
    {
      type: "build",
      title: "Why tokens matter to you",
      body: "Tokens are the unit of everything that costs money or time with a model. Context limits are counted in tokens, billing is per token, and speed depends on how many tokens must be produced. This is also why a model can struggle to spell or count letters. It never saw letters in the first place, only these chunks.",
    },
    {
      type: "build",
      title: "From tokens to meaning",
      body: "A token id like 5012 means nothing on its own. So the model gives every token a long list of numbers called an embedding. Think of it as coordinates on a giant map of meaning. Words used in similar ways end up near each other on that map, even though no one ever told the model what they mean.",
    },
    {
      type: "play",
      title: "Explore the map of meaning",
      body: "Tap a word and watch its nearest neighbours light up. The model placed these points purely by reading how words are used together.",
      playgroundId: "embedding-explorer",
    },
    {
      type: "checkpoint",
      title: "Read the map",
      question: "Why do king and queen sit close together on the map?",
      options: [
        "A human manually typed their coordinates",
        "They appear in similar contexts, so the model learned similar embeddings",
        "They start with the same letter",
        "They are the same length",
      ],
      correctIndex: 1,
      insight:
        "Meaning comes from usage. Words that show up in similar sentences get similar embeddings, so they land near each other on the map.",
    },
    {
      type: "build",
      title: "The famous word maths",
      body: "Because meaning is now geometry, you can do arithmetic with it. The classic result is king minus man plus woman lands very close to queen. The model captured the idea of royalty and the idea of gender as directions in space. This is the quiet magic that powers search, recommendations, and the way chatbots grasp what you mean.",
    },
    {
      type: "checkpoint",
      title: "Connect it to search",
      question: "How does meaning based search beat plain keyword search?",
      options: [
        "It only matches the exact words you typed",
        "It finds results that are close in meaning, even with different words",
        "It ignores meaning entirely",
        "It is slower and less accurate by design",
      ],
      correctIndex: 1,
      insight:
        "Embeddings let a system match by meaning, so a search for affordable laptop can surface a cheap notebook even with no shared words.",
    },
    {
      type: "reflect",
      title: "You can see what the model sees",
      body: "Text becomes tokens, tokens become points on a map of meaning, and prediction happens in that space. Next we look at the unit doing the predicting itself, the neuron, and how stacking them creates deep learning.",
    },
  ],
};
