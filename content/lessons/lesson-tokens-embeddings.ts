import type { StructuredLesson } from "@/types/lesson";

export const lessonTokensEmbeddings: StructuredLesson = {
  id: "tokens-embeddings",
  slug: "tokens-embeddings",
  title: "How AI Reads: Tokens and Meaning",
  hook: "Every weird model failure you have ever seen traces back to this. Here is what is actually happening.",
  concept: "tokens-and-embeddings",
  durationMinutes: 16,
  pathId: "curious-builders",
  free: false,
  order: 4,
  relatedBlogSlugs: [],
  blocks: [
    {
      type: "hook",
      title: "Every weird model failure has the same root cause",
      icon: "🔤",
      body: "Why does GPT-4 get the number of Rs in 'strawberry' wrong? Why does it cost more to prompt in some languages than others? Why does the model behave differently when you change a word to its synonym? All of it comes down to one mechanism: tokenisation. The model does not read your words. It reads chunks of characters that its tokeniser defined before training started. Understanding this turns model failures from mysteries into predictable, diagnosable behaviour.",
      visual: {
        kind: "stats",
        items: [
          { value: "50,257", label: "tokens in GPT's vocabulary" },
          { value: "~4", label: "characters per average English token" },
          { value: "2-3x", label: "tokens per word in some other languages" },
        ],
      },
      deepDive: {
        cta: "Why 'words' was always the wrong abstraction",
        content: "The move from words to tokens was a practical engineering decision, not a linguistic one. Words are language-specific, require language detection, and have ambiguous boundaries. Tokens are defined by Byte Pair Encoding (BPE), a compression algorithm that works on raw character sequences and is language-agnostic. BPE finds the most common byte pairs and merges them iteratively until a target vocabulary size is reached. This produces tokens that reflect statistical frequency, not linguistic meaning, which is why URLs, numbers, and code tokenise differently than natural language.",
      },
    },
    {
      type: "play",
      title: "Tokenise this: before reading any explanation",
      body: "Type something into the tokeniser. A sentence. A function name. Something in a different language. Watch how the model actually reads it. The colour blocks are the tokens. More blocks = more cost = more context used.",
      playgroundId: "neuron-sandbox",
      playgroundVariant: "tokenizer",
      deepDive: {
        cta: "The tokenizer that actually powers GPT: explained",
        content: "GPT's tokenizer uses BPE with a vocabulary of around 50,257 tokens. Each token is a sequence of bytes, not characters, which allows handling any Unicode text including emoji and non-Latin scripts. The tokenizer is fixed: it never changes between model versions. A consequence: languages underrepresented in training data have inefficient tokenisation (one word becomes many tokens), making responses in those languages cost more and sometimes be lower quality. This is one structural reason why GPT models are demonstrably stronger in English than in low-resource languages.",
      },
    },
    {
      type: "checkpoint",
      title: "What is a token?",
      question: "Why can GPT-4 make mistakes counting letters in a single word?",
      options: [
        "It is not trained on spelling tasks",
        "It processes tokens, not individual characters, and one word may be multiple tokens that don't preserve character-level structure",
        "The model randomly skips letters when they are common",
        "It only counts the first 5 letters of any word",
      ],
      correctIndex: 1,
      insight:
        "The model never sees 's-t-r-a-w-b-e-r-r-y' as a character sequence. It sees ['st', 'raw', 'berry'] as three tokens. Reasoning about letters requires reconstructing a character sequence from tokens: a derived operation the model does imperfectly, especially for uncommon letter positions.",
      deepDive: {
        cta: "The letter-counting failure in one sentence",
        content: "Here is precisely why models count letters incorrectly: 'strawberry' is tokenised as ['st', 'raw', 'berry'] in many tokenisers, 3 tokens, none of which is a single letter. When asked 'how many Rs in strawberry?', the model must reason about a character sequence it never directly observed. It often says 2 instead of 3 because the token 'berry' obscures the double-r. Newer models with character-aware tokenisers or those fine-tuned on counting tasks do better, but the failure reveals exactly where the tokeniser's abstraction breaks down.",
      },
    },
    {
      type: "build",
      title: "Why tokens matter: cost, speed, and failures",
      icon: "💸",
      body: "Tokens are the unit of measurement for everything. Cost, speed, context window: all measured in tokens. Understanding this changes how you write prompts, how you evaluate API costs at scale, and why some inputs behave unexpectedly.",
      highlights: [
        "Every API call is billed per input token + output token",
        "Context window = max tokens in + out. Fill it and old context is dropped.",
        "Tokenisation is not uniform: code, URLs, numbers, and non-English text tokenise differently",
        "A prompt that looks short may be expensive, and vice versa",
      ],
      visual: {
        kind: "callout",
        text: "At 10M requests per day, saving 50 tokens per prompt saves you $10,000 per day at typical API rates. Tokens are not free.",
        color: "amber",
      },
      deepDive: {
        cta: "The context window crunch, what actually happens when you fill it",
        content: "Context windows are not infinite buffers: standard attention complexity scales quadratically with length (O(n²)). A 128,000-token context requires computing 128,000 × 128,000 = 16 billion attention scores per forward pass. This is why GPT-4 with 128k context is dramatically slower and more expensive than with 8k context. Approximate attention methods reduce this complexity but usually at a quality cost. The 'million token context window' announcements are technically real but practically expensive: filling them is not always the right engineering answer.",
      },
    },
    {
      type: "play",
      title: "Count tokens. Count cost.",
      body: "Paste your actual system prompt. See exactly what it costs. Then compress it. This is a real engineering exercise, not a thought experiment. The number in the corner is money.",
      playgroundId: "python-sandbox",
      playgroundVariant: "token-counter",
      deepDive: {
        cta: "Why tokenizer choice changes your product economics",
        content: "Different models have different tokenisers with different efficiencies. Claude's tokeniser tends to be more efficient on code than GPT's. Chinese text tokenises more efficiently with some tokenisers than others. A prompt that costs 500 tokens on GPT-4o might cost 430 tokens on Claude: a 14% cost difference that compounds at scale. If you route requests between model providers, token count differences affect cost comparisons. Tools like tiktoken (OpenAI's tokeniser library) let you count GPT tokens locally before making API calls.",
      },
    },
    {
      type: "build",
      title: "From tokens to meaning",
      icon: "🗺️",
      body: "After tokenisation, each token gets mapped to a vector: a list of numbers that encodes what the token means and how it relates to everything else. This is the embedding. It is the model's internal representation of the world, expressed as geometry.",
      highlights: [
        "Each token maps to a point in high dimensional space (GPT-4: 12,288 dimensions)",
        "Tokens that are used in similar contexts end up close together in this space",
        "Similar meaning = small distance. Opposite meaning = larger distance.",
        "Embeddings can be extracted and used on their own: for search, clustering, and classification",
      ],
      visual: {
        kind: "callout",
        text: "king − man + woman ≈ queen. Not metaphor. Actual vector arithmetic on the embedding space.",
        color: "violet",
      },
      deepDive: {
        cta: "Why the embedding dimension matters",
        content: "GPT-4's embeddings have 12,288 dimensions: each token maps to a point in a 12,288-dimensional space. The high dimensionality is necessary to represent the enormous variety of semantic relationships in language. Researchers have found that specific directions in this space correspond to specific concepts: the 'plural direction', the 'negative sentiment direction', the 'formal register direction'. You can add the vector for 'plural' to any noun's embedding and get closer to its plural's embedding. The embedding space encodes structured linguistic knowledge, not just statistical frequency.",
      },
    },
    {
      type: "play",
      title: "Explore the geometry of meaning",
      body: "Enter any two words. See how close they are in the embedding space. Then try surprising pairs. A good question to explore: what is further apart, 'king' and 'queen', or 'king' and 'president'? The answer is not obvious until you measure it.",
      playgroundId: "neuron-sandbox",
      playgroundVariant: "embedding-explorer",
      deepDive: {
        cta: "The geometry of semantic space is genuinely surprising",
        content: "The nearest-neighbour structure of embedding space reveals cultural biases encoded in training data. 'Doctor' tends to be closer to male pronouns than female pronouns in older models trained on biased corpora, because historical medical literature skewed male. This is not the model's 'opinion'. It is a statistical reflection of the text it learned from. Word embedding bias is a widely studied problem. Debiasing embeddings (adjusting the directions in space associated with gender) is an active research area, as is the meta-question of whether removing these biases makes the model more helpful or just less honest about existing patterns in language.",
      },
    },
    {
      type: "checkpoint",
      title: "Read the map",
      question: "Two words have embeddings very close together in vector space. What does that mean?",
      options: [
        "They are synonyms and can always be used interchangeably",
        "They appear in similar contexts in the training data and are semantically related",
        "The model has memorised them as a pair",
        "They have the same number of syllables",
      ],
      correctIndex: 1,
      insight:
        "Proximity in embedding space means similar context patterns in training data, not perfect synonymy. 'Cat' and 'dog' will be close because they appear in similar sentences. But 'bank' (river) and 'bank' (finance) will have different embeddings because they appear in very different contexts, the model handles polysemy naturally.",
      deepDive: {
        cta: "Why 'king − man + woman = queen' is both a party trick and a proof",
        content: "The king − man + woman ≈ queen result is famous because it suggests embeddings capture not just similarity but compositional structure. The fact that analogies can be solved by vector arithmetic implies the embedding space has learned an abstract geometry of concepts, not just memorised associations. Research has replicated this across hundreds of analogies: capital cities, verb tenses, comparative adjectives. The model learns the relationship 'occupies a role for females as X does for males' purely from statistical co-occurrence, with no explicit teaching.",
      },
    },
    {
      type: "build",
      title: "The word arithmetic that makes this real",
      icon: "🧮",
      body: "Embeddings enable a new class of operations. You can find similar content without exact keyword matches. You can compare meaning programmatically. You can search your product data by meaning rather than text, which is what every serious AI search feature does under the hood.",
      highlights: [
        "Semantic search: embed query, find nearest document embeddings, return closest matches",
        "Clustering: group documents by meaning without writing categories by hand",
        "Classification: train a simple classifier on embeddings instead of raw text",
        "Retrieval-augmented generation: embed your knowledge base, retrieve relevant chunks, feed to the LLM",
      ],
      visual: {
        kind: "flow",
        steps: [
          { label: "User query", detail: "text input" },
          { label: "Embed query", detail: "becomes a vector" },
          { label: "Nearest neighbour search", detail: "in vector database" },
          { label: "Retrieved chunks", detail: "fed to LLM as context" },
        ],
      },
      deepDive: {
        cta: "What semantic search actually does under the hood",
        content: "Semantic search encodes both the query and each document as embedding vectors, then finds documents whose embeddings are nearest to the query using cosine similarity or dot product. At scale (millions of documents), brute-force nearest-neighbour search is too slow. Systems use approximate nearest-neighbour (ANN) algorithms like FAISS, ScaNN, or HNSW that trade a small accuracy loss for massive speed gains. Common vector databases: Pinecone, Weaviate, Chroma, pgvector. The quality of a RAG system depends equally on retrieval quality and generation quality: both need independent evaluation.",
      },
    },
    {
      type: "checkpoint",
      title: "Meaning-based search",
      question: "A user searches 'cheap accommodation near the beach'. Your product has a listing titled 'Budget oceanfront studio'. A keyword search finds nothing. What would a semantic search find?",
      options: [
        "Nothing, the words are still different",
        "The listing, because the embeddings for 'cheap accommodation near beach' and 'budget oceanfront studio' will be close in semantic space",
        "Every listing with the word 'studio'",
        "Only listings that have been manually tagged with the search term",
      ],
      correctIndex: 1,
      insight:
        "Semantic similarity holds even when keywords differ. 'Cheap', 'budget', 'affordable' all occupy similar regions of embedding space. 'Accommodation', 'studio', 'flat', 'room' are semantically proximate. 'Near the beach' and 'oceanfront' are contextually related. Semantic search handles synonymy and paraphrase that keyword search misses entirely.",
      deepDive: {
        cta: "The failure mode of semantic search (it's not obvious)",
        content: "Semantic search has its own failure mode: it finds semantically similar documents, which sometimes means finding thematically related but factually incorrect documents. If your database contains 'our return policy is 30 days' and a user asks 'can I return after 60 days?', semantic search retrieves the 30-day policy (it's the most relevant document about returns), and the model may misread or interpolate it as a 60-day answer. This is why grounding requires both good retrieval and careful generation instruction. Retrieval quality and generation quality are separate problems requiring separate evaluation.",
      },
    },
    {
      type: "apply",
      title: "Token economics and embedding opportunities",
      body: "You now have two new lenses on every AI system you build or evaluate.",
      roles: [
        {
          role: "Product Manager",
          action:
            "Run your most expensive system prompt through a token counter. If it exceeds 500 tokens, compress it until it doesn't. Then check the total monthly API cost at your current request volume. Most teams have never done this calculation.",
        },
        {
          role: "Founder",
          action:
            "If your product searches documents, code, or support tickets, embeddings are almost certainly the right tool. Evaluate Chroma (open source, free to run locally) against your existing keyword search this week. The quality difference is usually immediately obvious.",
        },
        {
          role: "Builder",
          action:
            "Implement token counting in your logging before you go to production. Log input tokens and output tokens per request. You need this data before you can optimise costs, and you will want to optimise costs eventually.",
        },
        {
          role: "Analyst",
          action:
            "If you have a corpus of documents: support tickets, research notes, customer feedback, you can cluster them by embedding similarity without writing categories. This is one of the highest-leverage AI applications available with minimal engineering lift.",
        },
      ],
      microAction:
        "Go to platform.openai.com/tokenizer. Paste your most-used AI prompt. Count the tokens. Then try compressing it by 30% and check whether the meaning survives. This exercise has saved real teams thousands of dollars per month.",
      deepDive: {
        cta: "The 'lost in the middle' problem: put important context at the edges",
        content: "Research has found that language models do not attend uniformly to long contexts. They pay more attention to content at the beginning and end of the context window, and less to content in the middle, the 'lost in the middle' effect. This has practical implications: in a RAG system, the most important retrieved documents should be placed at the beginning or end of the context, not buried in the middle. Critical instructions in system prompts belong at the top, not buried in a long set of guidelines that the model may effectively ignore.",
      },
    },
    {
      type: "reflect",
      title: "You can now see what the model sees",
      body: "Most people interact with AI as if it reads words. You now know it reads token chunks, maps them to geometry, and operates in that geometric space. Next lesson: how that geometry gets processed through layers of neurons, and why depth creates something that flat models cannot.",
      learned: [
        "Tokens are the model's unit of perception. Words, letters, and meaning all flow through this chunking layer first.",
        "Tokenisation is the root cause of many common AI failures: letter counting, multilingual cost differences, and unusual character handling.",
        "Embeddings map tokens to a geometric space where meaning equals proximity.",
        "Embedding arithmetic works: similarity, analogy, and composition are all distance operations.",
        "Semantic search and RAG are built on embeddings, the highest practical leverage you get from understanding this layer.",
      ],
      deepDive: {
        cta: "Where the text-to-embedding pipeline breaks",
        content: "The entire pipeline: text to tokens to embeddings to prediction: assumes meaning can be fully captured in a sequence of tokens from a fixed vocabulary. This assumption breaks at the boundaries of language: highly technical notation, chemical formulae, musical notation, mathematical expressions, code in unusual languages. Multimodal models (GPT-4V, Claude 3) extend the pipeline by directly embedding images and audio alongside text, bypassing the tokeniser for non-text modalities. The future of the input pipeline is modality-agnostic, not text-first.",
      },
    },
  ],
};
