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
      deepDive: {
        cta: "Still here? You're one of us.",
        content: "The word 'patterns' is doing heavy lifting in that sentence. Mathematically, a pattern is a statistical regularity: a correlation that holds above chance across enough examples. The model does not 'know' that cats have fur; it knows the word 'cat' appears near 'fur' and 'whiskers' in training data. Everything it appears to understand is a deep compression of co-occurrence statistics. The wonder is that deep enough compression starts to look like comprehension, and we don't fully understand why.",
      },
    },
    {
      type: "play",
      title: "Before I explain anything: play this",
      body: "Do not read ahead. Pick the word you think comes next. Then look at the probabilities. Your brain and the model are running the same process.",
      playgroundId: "predict-next",
      playgroundVariant: "sentence",
      deepDive: {
        cta: "What's actually happening in your brain right now?",
        content: "Your brain runs something structurally similar to transformer attention. When you read 'The cat sat on the ___', you automatically weighted 'cat' and 'sat' as highly relevant and discounted 'The' and 'on'. Transformers formalise this as scaled dot-product attention: each token scores its relevance to every other token in the sequence. The 2017 paper 'Attention Is All You Need' turned this insight into the architecture behind every modern LLM. The name is not a metaphor.",
      },
    },
    {
      type: "checkpoint",
      title: "Name what you just did",
      question: "When you guessed the next word, what were you actually doing?",
      options: [
        "Recalling a memorised dictionary definition",
        "Predicting from patterns you have absorbed over a lifetime of reading",
        "Searching an internal database of grammar rules",
        "Guessing randomly with no prior knowledge",
      ],
      correctIndex: 1,
      insight:
        "Prediction from absorbed patterns. You did not look it up. Neither does the model. The intelligence lives in the patterns, not in any rulebook someone wrote by hand.",
      deepDive: {
        cta: "Why this matters way beyond this quiz",
        content: "The equivalence between human prediction and LLM prediction is not just pedagogically convenient, it's why language models work so well. Human text is produced by human brains doing prediction. A model trained to predict human text must therefore model how human brains predict. The failure modes are symmetric: both humans and models are overconfident on plausible-sounding completions, and both rely on prior pattern exposure rather than first-principles reasoning.",
      },
    },
    {
      type: "build",
      title: "Why this breaks the old mental model",
      icon: "⚡",
      body: "Old mental model: someone writes rules, the computer follows them. Reality: you show the system thousands of examples, it finds the patterns, it predicts. No one writes 'spam usually has words like urgent and winner'. You feed it 10,000 labelled emails and let it figure it out. The rules emerge from data.",
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
      deepDive: {
        cta: "The part that surprises even ML engineers",
        content: "The transition from rules to learning produces something nobody explicitly designed: emergent capabilities. Train a model to predict text well enough and it spontaneously develops abilities nobody specifically rewarded: logical reasoning, translation, code generation. These capabilities were never in the training objective. They emerged because predicting text accurately enough requires understanding the underlying structure that generates it. This is what researchers mean by 'scale produces emergence', and it is still not fully theoretically explained.",
      },
    },
    {
      type: "play",
      title: "Run the math inside every AI neuron",
      body: "Every single neuron in GPT-4, Gemini, and whatever ships next month runs this exact function. It takes a raw score and squashes it into a probability. This is not a diagram. Click Run and see the actual arithmetic. Then change x and run it again.",
      playgroundId: "python-sandbox",
      playgroundVariant: "sigmoid-explorer",
      deepDive: {
        cta: "Black box feeling too black?",
        content: "The sigmoid function was dominant until around 2012, when researchers found it caused 'vanishing gradients' in deep networks: near 0 and 1, its gradient approaches zero, so deep layers stop learning. Modern networks use ReLU (max(0, x)) or GeLU instead. GPT-4 uses GeLU throughout. The sigmoid still appears in exactly one place in modern systems, the output of binary classifiers, just as you used it here. Everything you ran is still production code: we just deploy it more selectively now.",
      },
    },
    {
      type: "play",
      title: "Hold one prediction unit in your hands",
      body: "You just saw the math. Now drag the sliders and feel it move. This is a single neuron deciding whether an email is spam. Watch how changing the strength of evidence shifts the probability, and notice how nothing about this feels mysterious anymore.",
      playgroundId: "neuron-sandbox",
      playgroundVariant: "spam",
      deepDive: {
        cta: "Nerd mode (responsibly)",
        content: "What you just interacted with is mathematically equivalent to logistic regression: one of the most deployed statistical models in history, predating neural networks by decades. Credit scoring, medical diagnosis, churn prediction: much of the world's consequential AI is still this single neuron, not GPT. The reason: interpretability. You can audit exactly which input drove the decision and by how much. A 175-billion-parameter LLM cannot give you that. In regulated industries, a neuron that passes a compliance audit beats a black-box model that doesn't.",
      },
    },
    {
      type: "checkpoint",
      title: "Read the output honestly",
      question: "The neuron outputs 0.9. What is it actually telling you?",
      options: [
        "The email is definitely spam, the model is certain",
        "Based on the patterns seen in training, this email has a 90% chance of being spam",
        "The input signals were ignored during this calculation",
        "A human reviewed it and labelled it spam",
      ],
      correctIndex: 1,
      insight:
        "Probability, not certainty. The model is confident, not infallible. Real systems miscall edge cases every day. That is expected and engineered for. Knowing this makes you better at building and evaluating AI features than 90% of people in any product meeting.",
      deepDive: {
        cta: "The uncomfortable calibration problem",
        content: "Accuracy and calibration are different properties. A model can be 95% accurate on average but systematically overconfident: saying '99% confident' when reality is '80% confident'. This matters when consequences are asymmetric. Medical AI that overconfidently flags healthy patients has different costs from spam detection that blocks real emails. The field of ML calibration studies how to make probability outputs reflect reality, not just be large when the prediction is positive. Most deployed models are poorly calibrated, and almost nobody measures it.",
      },
    },
    {
      type: "build",
      title: "It is prediction all the way down",
      icon: "🌐",
      body: "Swap the domain. Keep the engine. The mechanism never changes, only the inputs and the label you are predicting.",
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
      deepDive: {
        cta: "Pull this thread: everything unifies",
        content: "The prediction framing unifies far more than most people realise. Image generation, audio synthesis, video prediction, and protein structure prediction are all, formally, prediction tasks. Even reinforcement learning (how game-playing AI works) can be framed as predicting which action leads to the highest future reward. This is not philosophical: it is practical. Architectures designed for text prediction (transformers) now work on images, audio, and scientific data with minimal modification, precisely because the underlying task is structurally isomorphic.",
      },
    },
    {
      type: "play",
      title: "Your first language model in 8 lines",
      body: "GPT-4 has 175 billion parameters and was trained on trillions of tokens. This has 4 words and 4 probabilities. The mechanism is identical. Run it. Add a word to the dictionary. Change the probabilities. Break it. This is exactly what is happening inside every AI chat interface: at scale.",
      playgroundId: "python-sandbox",
      playgroundVariant: "prediction-dict",
      deepDive: {
        cta: "Go deeper, the scale jump is weirder than you think",
        content: "What you built is a unigram language model: each prediction is independent of history. Real LLMs are n-gram models where n is effectively the full context window (128,000 tokens for GPT-4o). The transformer's attention mechanism is what enables this: every token can directly attend to every prior token regardless of distance. The jump from your 4-word dict to GPT-4 is the same idea with n going from 1 to 128,000, and 50,000 words instead of 4. Same mechanism. Incomprehensible scale.",
      },
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
        "That is inference. Training already happened: weeks or months on billions of examples, with enormous compute and cost. When you chat, you are using a frozen prediction machine. It is not learning from you. Knowing the difference is essential before you build anything on top of it.",
      deepDive: {
        cta: "Read this before your next vendor meeting",
        content: "Training and inference have very different cost structures, which creates interesting business dynamics. Training GPT-4 cost an estimated $60-100M in compute. A single inference costs fractions of a cent. At scale this asymmetry means inference costs dominate total spend. This is also why fine-tuning is so valuable, you inherit all the expensive representation learning from pretraining and only pay to adapt the final layer of knowledge to your specific task. Understanding this asymmetry changes every 'train our own model' vs 'use an API' decision.",
      },
    },
    {
      type: "apply",
      title: "Prediction in your work, today",
      body: "Every AI tool you already use is doing this. Knowing the mechanism changes how you evaluate, prompt, and trust them, and how you catch failures before they reach your users.",
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
            "Next time a model gives a bad answer, do not just retry the prompt. Ask, what pattern was it probably following, and why did that pattern break here? Prediction errors have root causes. Find them and you fix the real problem.",
        },
        {
          role: "Analyst",
          action:
            "Your next forecast or classification model is doing exactly what GPT does: learning patterns from historical data to predict the next value. The maths are the same. The evaluation principles are the same. You already know more about AI than you think.",
        },
      ],
      microAction:
        "Open Claude or any AI tool. Type: 'Complete this sentence: Our users mainly want to...'. Notice it predicts the most statistically likely continuation from patterns in its training data. The gap between that prediction and your actual users? That gap is what this entire path teaches you to see and close.",
      deepDive: {
        cta: "Why this breaks in production (a different way)",
        content: "There is a failure mode that prediction framing reveals clearly, the model optimises for what it was trained to predict, not what your product actually needs. A model trained with human feedback (RLHF) optimises for responses that humans rate highly, but humans often rate confident, eloquent responses more highly than accurate, uncertain ones. This is reward hacking, the model learns that sounding correct gets better ratings than being correct. Your system prompt should explicitly reward uncertainty acknowledgement to counteract this training-time bias.",
      },
    },
    {
      type: "reflect",
      title: "You now own this",
      body: "One sentence now explains every AI product you will ever encounter. Next you will learn exactly when to stop writing rules yourself and let data do the work, and when writing rules is still the smarter call.",
      learned: [
        "AI learns patterns from examples and predicts what is most likely next.",
        "The same prediction mechanism powers spam filters, recommenders, and language models.",
        "High output means high predicted probability, not certainty. Models miscall edge cases.",
        "Chatting with a model is inference. The learning already happened during training.",
        "Mismatched training tasks are the number one reason AI features disappoint in production.",
      ],
      deepDive: {
        cta: "The full picture is stranger and better",
        content: "Here is the thing nobody says clearly: we do not fully understand why prediction at scale produces apparent understanding. The dominant hypothesis is the 'compression equals understanding' argument: a model that predicts text well must implicitly represent the world that generates text. But this is largely empirical rather than theoretically derived. The field of mechanistic interpretability is actively trying to map what these models actually represent internally. The fact that prediction produces what looks like reasoning is one of the most surprising empirical results of the past decade, and it is still not fully explained.",
      },
    },
  ],
};
