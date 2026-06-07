import type { StructuredLesson } from "@/types/lesson";

export const lessonTokensEmbeddings: StructuredLesson = {
  id: "tokens-embeddings",
  slug: "tokens-embeddings",
  title: "How AI Reads: Tokens And Meaning",
  hook: "A model never sees your words. It sees numbers. Here is the translation — and why it explains half of all weird model behaviour.",
  concept: "tokens and embeddings",
  durationMinutes: 17,
  pathId: "curious-builders",
  free: false,
  order: 4,
  relatedBlogSlugs: [],
  blocks: [
    {
      type: "hook",
      title: "Every weird model failure has the same root cause",
      icon: "🔢",
      body: "Wrong letter counts. Strange pricing. Hallucinated URLs that look almost right. I have debugged all of these. Every single one traced back to the same misunderstanding: the model never saw your words. It saw chunks of numbers. Before a model can predict anything, it converts your text into numbers in two steps. First it chops your text into tokens. Then it maps each token to a list of numbers that captures meaning. Understand these two moves and a lot of mysterious model behaviour suddenly makes sense.",
      visual: {
        kind: "flow",
        steps: [
          { label: "Your text", detail: "Raw words" },
          { label: "Tokens", detail: "Chunks" },
          { label: "Token IDs", detail: "Numbers" },
          { label: "Embeddings", detail: "Meaning vectors" },
          { label: "Prediction", detail: "Next token" },
        ],
      },
    },
    {
      type: "play",
      title: "Watch your words become tokens",
      body: "Type anything and watch the model slice it. Notice that common words stay whole while rare or long words shatter into pieces. Type a misspelling. Type a number. See what the tokenizer actually sees.",
      playgroundId: "tokenizer",
    },
    {
      type: "checkpoint",
      title: "What is a token?",
      question: "Based on the playground, a token is best described as",
      options: [
        "Always exactly one full word",
        "A chunk of text — often a word, part of a word, or punctuation",
        "Always a single character",
        "Always a complete sentence",
      ],
      correctIndex: 1,
      insight:
        "A token is a chunk of text. Frequent words are usually one token, while rare or long words split into several. On average, one token is about four characters of English — which is why misspellings and rare terms cost more tokens and behave differently.",
    },
    {
      type: "build",
      title: "Why tokens matter — cost, speed, and failures",
      icon: "💰",
      body: "Tokens are the unit of everything. Context limits are counted in tokens, billing is per token, and response speed depends on how many tokens the model must generate. This is also why a model can struggle to count letters or spell backwards — it never sees individual characters, only these pre-computed chunks. When you ask 'how many Rs in strawberry?' you are asking a numbers system to reason about characters it does not have.",
      highlights: [
        "Context limits, API billing, and response latency are all measured in tokens.",
        "A model cannot count letters because it never sees individual characters — only chunks.",
        "On average, one token is roughly four characters of English text.",
      ],
    },
    {
      type: "play",
      title: "Count tokens. Count cost.",
      body: "This estimator approximates real tokenizer output. Run it, adjust the scale numbers, and watch a system-prompt length decision turn into a budget number. This is not theoretical — change the numbers to match your product.",
      playgroundId: "python-sandbox",
      playgroundVariant: "token-counter",
    },
    {
      type: "build",
      title: "From tokens to meaning",
      icon: "🗺️",
      body: "A token ID like 5012 means nothing on its own. So the model gives every token a long list of numbers called an embedding. Think of it as coordinates on a giant map of meaning. Words used in similar ways end up near each other on that map — even though no human ever told the model what any word means. Meaning emerges entirely from usage patterns across trillions of tokens.",
      highlights: [
        "Every token maps to a list of numbers called an embedding.",
        "Think of it as coordinates on a giant map of meaning.",
        "Words used in similar contexts end up near each other — automatically.",
      ],
      visual: {
        kind: "callout",
        text: "No one told the model what words mean. It discovered meaning from usage alone.",
        color: "violet",
      },
    },
    {
      type: "play",
      title: "Explore the map of meaning",
      body: "Tap a word and watch its nearest neighbours light up. The model placed every point on this map purely by reading how words appear together in text. It has never been told any definitions.",
      playgroundId: "embedding-explorer",
    },
    {
      type: "checkpoint",
      title: "Read the map",
      question: "Why do 'king' and 'queen' sit close together on the embedding map?",
      options: [
        "A human manually programmed their coordinates into the model",
        "They appear in similar contexts in text, so the model learned similar embeddings",
        "They both start with similar letters",
        "They are both the same number of characters",
      ],
      correctIndex: 1,
      insight:
        "Meaning comes from usage. Words that appear in similar sentences get similar embeddings — so they land near each other on the map. No dictionary was consulted. The model read and learned.",
    },
    {
      type: "build",
      title: "The word arithmetic that makes this real",
      icon: "➕",
      body: "Because meaning is now geometry, you can do arithmetic with it. The classic result: king minus man plus woman lands very close to queen. The model captured royalty and gender as directions in space. This is the quiet mechanism that powers semantic search, document recommendations, and the way chatbots grasp what you actually mean even when you phrase it differently.",
      highlights: [
        "king − man + woman ≈ queen. The model learned royalty and gender as directions.",
        "Meaning is geometry. You can add and subtract concepts as vectors.",
        "This powers semantic search, recommendations, and natural language understanding.",
      ],
    },
    {
      type: "checkpoint",
      title: "Meaning-based search versus keywords",
      question: "How does semantic search outperform plain keyword matching?",
      options: [
        "It only matches documents containing the exact words you typed",
        "It finds results that are close in meaning even when different words are used",
        "It ignores meaning and matches by file size",
        "It is slower and less accurate than keyword search by design",
      ],
      correctIndex: 1,
      insight:
        "Embeddings let a system match by meaning, so a search for 'affordable laptop' can surface 'cheap notebook' with no shared words. This is why search that uses embeddings finds what users mean, not just what they typed.",
    },
    {
      type: "apply",
      title: "Token economics and embedding opportunities in your product",
      body: "Token counts affect cost, speed, and quality of every AI feature you ship. Embeddings unlock a class of features — semantic search, document similarity, recommendations — that keyword matching cannot touch.",
      roles: [
        {
          role: "Product Manager",
          action:
            "For any AI feature in your roadmap, estimate the token cost per user interaction. Token counts drive API costs directly. A 5,000-token system prompt sent to millions of users is a budget decision hiding inside your engineering spec.",
        },
        {
          role: "Founder",
          action:
            "If your product has search, ask: is it keyword or semantic? Keyword search misses results because words differ. Semantic search finds what users mean. The gap between the two is often where retention hides.",
        },
        {
          role: "Builder",
          action:
            "Paste your current system prompt into a tokenizer. Count the tokens. Trim anything that does not contribute to the output — every token you remove is latency and cost you give back to users. Then consider: could any filtering in your app use embeddings instead of keyword rules?",
        },
        {
          role: "Analyst",
          action:
            "If you are running text analysis — tagging, clustering, or categorising documents — embeddings let you group by meaning rather than exact words. Consider replacing keyword filters with a nearest-neighbour search on embeddings for any classification task with lots of variation.",
        },
      ],
      microAction:
        "Go to platform.openai.com/tokenizer (free, no account). Paste your longest system prompt or a typical user message from your product. See the token count. Now look at your context window limit — how much room is left for the actual conversation? If less than 30%, your prompt is eating your context.",
    },
    {
      type: "reflect",
      title: "You can now see what the model sees",
      body: "Text becomes tokens. Tokens become coordinates on a map of meaning. Prediction happens in that space. Next we look at the unit doing the actual predicting — the neuron — and what happens when you stack billions of them.",
      learned: [
        "Text → tokens → embeddings → prediction. The model works in number space, not word space.",
        "Tokens are the billing and context unit: costs and limits are counted in tokens, not words.",
        "Embeddings let models match by meaning, not just exact words.",
        "Word arithmetic is possible because meaning is geometry in the embedding space.",
        "Token economics are a product decision: system prompt length directly affects API cost and latency.",
      ],
    },
  ],
};
