import type { StructuredLesson } from "@/types/lesson";

export const lessonPrediction: StructuredLesson = {
  id: "prediction",
  slug: "prediction",
  title: "AI Is Prediction",
  hook: "One sentence explains every AI product ever built. Here it is.",
  concept: "prediction",
  durationMinutes: 16,
  pathId: "curious-builders",
  free: true,
  order: 1,
  relatedBlogSlugs: [],
  blocks: [
    {
      type: "hook",
      title: "The sentence that changed how I ship AI",
      icon: "🎯",
      body: "I have debugged a model that was 99% accurate and still broken in production. I have watched founders bet six months on an AI feature that confused the task with the capability. Every single case traced back to one misunderstanding. Strip the hype and one mechanism is left: AI learns patterns from examples and predicts what is most likely next. Nothing more. Own that sentence and the rest of this path builds on solid ground.",
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
      title: "Before I explain anything — play this",
      body: "Do not read ahead. Pick the word you think comes next. Then look at the probabilities. Your brain and the model are running the same process.",
      playgroundId: "predict-next",
      playgroundVariant: "sentence",
    },
    {
      type: "checkpoint",
      title: "Name what you just did",
      question: "When you guessed the next word — what were you actually doing?",
      options: [
        "Recalling a memorised dictionary definition",
        "Predicting from patterns you have absorbed over a lifetime of reading",
        "Searching an internal database of grammar rules",
        "Guessing randomly with no prior knowledge",
      ],
      correctIndex: 1,
      insight:
        "Prediction from absorbed patterns. You did not look it up. Neither does the model. The intelligence lives in the patterns — not in any rulebook someone wrote by hand.",
    },
    {
      type: "build",
      title: "Why this breaks the old mental model",
      icon: "⚡",
      body: "Old mental model: someone writes rules, the computer follows them. Reality: you show the system thousands of examples, it finds the patterns, it predicts. No one writes 'spam usually has words like urgent and winner' — you feed it 10,000 labelled emails and let it figure it out. The rules emerge from data.",
      highlights: [
        "No explicit rules. Patterns emerge automatically from examples.",
        "More data → sharper patterns → more accurate predictions.",
        "The intelligence lives in the data, not in code any human typed.",
      ],
      visual: {
        kind: "flow",
        steps: [
          { label: "Examples", detail: "labelled data" },
          { label: "Pattern learning", detail: "the training step" },
          { label: "Prediction", detail: "the output" },
          { label: "Decision", detail: "your product acting on it" },
        ],
      },
    },
    {
      type: "play",
      title: "Run the math inside every AI neuron",
      body: "Every single neuron in GPT-4, Gemini, and whatever ships next month runs this exact function. It takes a raw score and squashes it into a probability. This is not a diagram. Click Run and see the actual arithmetic. Then change x and run it again.",
      playgroundId: "python-sandbox",
      playgroundVariant: "sigmoid-explorer",
    },
    {
      type: "play",
      title: "Hold one prediction unit in your hands",
      body: "You just saw the math. Now drag the sliders and feel it move. This is a single neuron deciding whether an email is spam. Watch how changing the strength of evidence shifts the probability — and notice how nothing about this feels mysterious anymore.",
      playgroundId: "neuron-sandbox",
      playgroundVariant: "spam",
    },
    {
      type: "checkpoint",
      title: "Read the output honestly",
      question: "The neuron outputs 0.9. What is it actually telling you?",
      options: [
        "The email is definitely spam — the model is certain",
        "Based on the patterns seen in training, this email has a 90% chance of being spam",
        "The input signals were ignored during this calculation",
        "A human reviewed it and labelled it spam",
      ],
      correctIndex: 1,
      insight:
        "Probability, not certainty. The model is confident, not infallible. Real systems miscall edge cases every day — that is expected and engineered for. Knowing this makes you better at building and evaluating AI features than 90% of people in any product meeting.",
    },
    {
      type: "build",
      title: "It is prediction all the way down",
      icon: "🌐",
      body: "Swap the domain. Keep the engine. The mechanism never changes — only the inputs and the label you are predicting.",
      highlights: [
        "Spam filter: input = email text → prediction = spam probability",
        "Fraud detector: input = transaction metadata → prediction = fraud probability",
        "Language model: input = all previous tokens → prediction = next token probability",
        "Recommender: input = your watch history → prediction = click probability on each title",
      ],
      visual: {
        kind: "callout",
        text: "Different surface. Identical core. Inputs go in, probabilities come out.",
        color: "blue",
      },
    },
    {
      type: "play",
      title: "Your first language model in 8 lines",
      body: "GPT-4 has 175 billion parameters and was trained on trillions of tokens. This has 4 words and 4 probabilities. The mechanism is identical. Run it. Add a word to the dictionary. Change the probabilities. Break it. This is exactly what is happening inside every AI chat interface — at scale.",
      playgroundId: "python-sandbox",
      playgroundVariant: "prediction-dict",
    },
    {
      type: "checkpoint",
      title: "Training versus inference",
      question: "When you send a message to ChatGPT right now, which process is running?",
      options: [
        "The model retrains itself on your message before responding",
        "The model predicts the next token using weights it already learned during training",
        "It queries a database of pre-written answers ranked by relevance",
        "A human reads the message and selects the best auto-complete option",
      ],
      correctIndex: 1,
      insight:
        "That is inference. Training already happened — weeks or months on billions of examples, with enormous compute and cost. When you chat, you are using a frozen prediction machine. It is not learning from you. Knowing the difference is essential before you build anything on top of it.",
    },
    {
      type: "apply",
      title: "Prediction in your work, today",
      body: "Every AI tool you already use is doing this. Knowing the mechanism changes how you evaluate, prompt, and trust them — and how you catch failures before they reach your users.",
      roles: [
        {
          role: "Product Manager",
          action:
            "Before writing an AI feature spec, write one sentence: 'This model predicts X from Y.' If you cannot write it clearly, the spec is not ready. Your engineering team will thank you and your stakeholders will stop asking why the AI is 'doing something weird.'",
        },
        {
          role: "Founder",
          action:
            "When a vendor says their AI is accurate, ask: accurate at predicting what, trained on what data? Mismatched training tasks are the number one reason AI features disappoint in production. Ask this question before signing any contract.",
        },
        {
          role: "Builder",
          action:
            "Next time a model gives a bad answer, do not just retry the prompt. Ask: what pattern was it probably following, and why did that pattern break here? Prediction errors have root causes. Find them and you fix the real problem.",
        },
        {
          role: "Analyst",
          action:
            "Your next forecast or classification model is doing exactly what GPT does — learning patterns from historical data to predict the next value. The maths are the same. The evaluation principles are the same. You already know more about AI than you think.",
        },
      ],
      microAction:
        "Open Claude or any AI tool. Type: 'Complete this sentence: Our users mainly want to...' — notice it predicts the most statistically likely continuation from patterns in its training data. The gap between that prediction and your actual users? That gap is what this entire path teaches you to see and close.",
    },
    {
      type: "reflect",
      title: "You now own this",
      body: "One sentence now explains every AI product you will ever encounter. Next you will learn exactly when to stop writing rules yourself and let data do the work — and when writing rules is still the smarter call.",
      learned: [
        "AI learns patterns from examples and predicts what is most likely next.",
        "The same prediction mechanism powers spam filters, recommenders, and language models.",
        "High output means high predicted probability — not certainty. Models miscall edge cases.",
        "Chatting with a model is inference. The learning already happened during training.",
        "Mismatched training tasks are the number one reason AI features disappoint in production.",
      ],
    },
  ],
};
