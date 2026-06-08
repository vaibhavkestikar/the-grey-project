import type { StructuredLesson } from "@/types/lesson";

export const lessonClassicalVsMl: StructuredLesson = {
  id: "classical-vs-ml",
  slug: "classical-vs-ml",
  title: "Rules Versus Learning",
  hook: "I have saved three projects from the rules trap. Here is how to spot it before it costs you.",
  concept: "supervised-learning",
  durationMinutes: 16,
  pathId: "curious-builders",
  free: false,
  order: 2,
  relatedBlogSlugs: [],
  blocks: [
    {
      type: "hook",
      title: "I have saved three projects from the rules trap",
      icon: "🧱",
      body: "Every team building AI for the first time ends up in the same place: a list of if-else rules that is growing faster than it can be maintained, breaking on every edge case their rulebook never imagined. I have been there. The fix is not more rules. It is knowing when to stop writing rules entirely, and when rules are actually the right call. That distinction is what this lesson buys you.",
      visual: {
        kind: "stats",
        items: [
          { value: "1990s", label: "expert systems era" },
          { value: "💀", label: "killed by edge cases" },
          { value: "Data", label: "what changed everything" },
        ],
      },
      deepDive: {
        cta: "The deeper reason rules fail at scale",
        content: "The rules trap has a mathematical name: combinatorial explosion. The number of possible inputs to any real-world system grows exponentially with dimensionality. A spam filter for English email must handle 2^(vocabulary size) possible word combinations: approximately 2^50,000. No rulebook can cover that space. Machine learning sidesteps combinatorial explosion by learning a compressed representation of relevant patterns instead of enumerating every case. This is why ML became dominant once data became abundant enough for the compression to work.",
      },
    },
    {
      type: "build",
      title: "The rules approach and the wall it hits",
      icon: "📋",
      body: "The rules approach feels like engineering. You audit examples, you write conditions, you ship. It is clean. It is auditable. And it breaks spectacularly when the real world sends inputs your rules never imagined, which it always does.",
      highlights: [
        "Rule 1: if subject contains 'FREE MONEY' → spam",
        "Edge case: 'Not spam. You get free money for referrals at your bank.'",
        "Rule 2: add exception for banking context. But now you need rule 3 for payday loan ads…",
        "Six months later: 847 rules, 11% false-positive rate, one exhausted engineer",
      ],
      visual: {
        kind: "callout",
        text: "Rules grow quadratically. Edge cases grow exponentially. The rulebook never wins.",
        color: "red",
      },
      deepDive: {
        cta: "Why this is actually Goodhart's Law in disguise",
        content: "The rules trap is a manifestation of Goodhart's Law: 'When a measure becomes a target, it ceases to be a good measure.' The moment you write 'block free money', spammers optimise around your rule and the rule stops measuring spam. ML helps here because the model targets the underlying pattern distribution rather than a fixed proxy. But ML is not immune: it creates its own Goodhart problem when training labels are proxies for what you actually care about rather than the thing itself.",
      },
    },
    {
      type: "play",
      title: "Write the rules yourself. Watch them break.",
      body: "You are a spam filter. You get to write three rules. Then the adversary sends five emails designed to defeat them. This is not a hypothetical. This is the real game played in production every day between spam filters and spammers. See how long your rules last.",
      playgroundId: "python-sandbox",
      playgroundVariant: "rules-trap",
      deepDive: {
        cta: "Why this is a case study in adversarial ML",
        content: "The spam vs rules dynamic you just ran is the simplest case of an adversarial setting: an agent is actively trying to defeat your classifier. Adversarial ML is a large research area covering spam, deepfake detection, and jailbreaking LLMs. The key insight: ML models are also vulnerable to adversarial inputs: carefully crafted examples that fool the model by exploiting learned statistical regularities. The difference from rules: adversarial ML attacks require gradient information or black-box access to the model, while hand-written rules are trivially inspectable. Both paradigms have distinct adversarial failure modes.",
      },
    },
    {
      type: "play",
      title: "Rules or learning: let the problem decide",
      body: "Drag each example to rules or learning. There is no right answer for all of them, and that is the point. Your intuition here is more important than any formal framework.",
      playgroundId: "neuron-sandbox",
      playgroundVariant: "rules-vs-ml-sorter",
      deepDive: {
        cta: "The case where rules beat ML, it's larger than demos suggest",
        content: "The rules win quadrant is larger than it appears in AI demos. Anywhere safety, auditability, or regulatory compliance is required (medical devices, financial transactions, critical infrastructure), rules are often required by law, not preference. A bank's fraud model must be auditable by a regulator; a black-box ML model may be literally non-compliant in some jurisdictions. The ML industry has oversold the 'rules are always bad' narrative. The honest framework: use the simplest thing that is good enough, starting with rules, and add ML complexity only when you have the data and audit trail to support it.",
      },
    },
    {
      type: "checkpoint",
      title: "Which problem doesn't fit rules?",
      question: "Which of these tasks is hardest to solve with hand-written rules?",
      options: [
        "Blocking a specific known bad IP address",
        "Sorting products by price",
        "Recognising a cat in a photo",
        "Checking that a form field contains a valid email address",
      ],
      correctIndex: 2,
      insight:
        "Cat recognition breaks rules because the input space (every possible photo) is incomprehensibly large. Rules require enumerating conditions. You cannot enumerate what a cat looks like in every lighting condition, angle, and breed. You have to learn it from examples. That is exactly when you reach for ML.",
      deepDive: {
        cta: "The surprisingly deep reason images break rules",
        content: "The reason image classification resists rules is fascinating. Rule-writing would require specifying pixel conditions for every possible image of a cat: including the same cat under different lighting, at different angles, partially occluded. The rule would be astronomically complex. ML solves this by learning invariant representations: internal features that remain consistent across those variations. Learning invariance is one of the most important things deep learning does that explicit rules cannot, and it is why vision AI leapt forward once deep nets were applied.",
      },
    },
    {
      type: "build",
      title: "The learning approach: how it actually works",
      icon: "🧠",
      body: "Instead of writing rules, you collect examples where you already know the answer. You show the learning algorithm thousands of labelled spam and not-spam emails. It finds the statistical patterns that separate them. No one writes the rules. The rules emerge from the data.",
      highlights: [
        "Step 1: collect labelled examples (spam vs. not spam)",
        "Step 2: train. The algorithm finds the statistical separating pattern",
        "Step 3: deploy. The model predicts probability for new, unseen emails",
        "Step 4: retrain when real-world distribution shifts, repeat",
      ],
      visual: {
        kind: "flow",
        steps: [
          { label: "Labelled data", detail: "your training set" },
          { label: "Training", detail: "find patterns" },
          { label: "Model", detail: "frozen weights" },
          { label: "Prediction", detail: "on new inputs" },
        ],
      },
      deepDive: {
        cta: "What 'labelled examples' really costs you",
        content: "The phrase 'collect labelled examples' hides a massive practical challenge. For spam, getting labels is easy: users click 'mark as spam'. For medical diagnosis, you need expert clinicians to review every example. For rare events like fraud on a new payment type, you might have 100 positive examples and 100,000 negatives: severe class imbalance. Weak supervision, semi-supervised learning, and active learning are entire research areas that exist because clean labelled data is expensive and scarce. 'Data is the hard part' refers primarily to labelling cost, not storage.",
      },
    },
    {
      type: "play",
      title: "Train your own churn predictor",
      body: "Adjust the weights. Watch the model learn. When your weights produce a churn prediction, you are doing exactly what a gradient descent algorithm does automatically, just manually, one adjustment at a time. Feel the mechanism before you trust the automation.",
      playgroundId: "neuron-sandbox",
      playgroundVariant: "churn",
      deepDive: {
        cta: "Why churn prediction fails more than people admit",
        content: "Churn prediction is one of the most commonly built and most commonly broken ML features in SaaS. The reason is label definition, when did the customer churn, when they stopped logging in? When they cancelled? When they signed up with a competitor? The same customer behaviour produces different labels depending on the definition used. A model trained on one definition performs poorly with another. This is a framing problem, not a modelling problem. Most churn model failures trace to label ambiguity, not algorithmic weakness.",
      },
    },
    {
      type: "checkpoint",
      title: "Where did the logic come from?",
      question: "In a trained ML model, where did the decision logic come from?",
      options: [
        "An engineer wrote conditional logic based on domain expertise",
        "The algorithm discovered it automatically by finding patterns in labelled training data",
        "The model queries a hand-curated knowledge base at prediction time",
        "A separate expert system generates rules that the model then executes",
      ],
      correctIndex: 1,
      insight:
        "The logic emerged from the data. Nobody wrote it. This is the core shift from classical software to machine learning, and it is why ML systems can generalise to inputs no engineer ever anticipated.",
      deepDive: {
        cta: "The gradient descent story in one paragraph",
        content: "Training learns weights via gradient descent: treat the model's error as a surface in weight space, compute the direction of steepest descent (the gradient), take a small step in that direction, repeat for millions of examples. The gradient is computed via backpropagation: chain rule of calculus applied across layers. The surprise is that this simple local-update rule, applied at massive scale, reliably finds weight configurations that generalise to new, unseen examples. We do not have a complete theoretical explanation for why it works as well as it does.",
      },
    },
    {
      type: "build",
      title: "The honest trade-off",
      icon: "⚖️",
      body: "Machine learning is not better than rules. It is better at specific things. Understanding the trade-off lets you use each where it actually belongs.",
      highlights: [
        "Rules: interpretable, auditable, reliable within their defined scope, fragile at edges",
        "ML: handles vast input spaces and edge cases, opaque, requires labelled data, drifts",
        "In practice: most robust systems use both: rules as the first pass, ML for the grey zone",
        "The question is never rules OR learning. It is where each earns its keep.",
      ],
      visual: {
        kind: "callout",
        text: "The best production systems I have worked on used rules to handle the edges they could define and ML to handle everything else.",
        color: "slate",
      },
      deepDive: {
        cta: "The hybrid approach that most production systems actually use",
        content: "Most mature production systems are hybrid: rules as first pass, ML as second. Email goes through a blocklist (rules) before the ML classifier touches it. Transactions under $1 skip fraud scoring (rules). These pre-filters reduce volume and protect against catastrophic edge cases. The ML model sees only ambiguous cases where it adds value. This is not a compromise: it is how experienced engineers design systems. Pure ML end-to-end is a research setting; production almost always wraps it in rules at the boundaries.",
      },
    },
    {
      type: "checkpoint",
      title: "Make the call",
      question: "A social media platform wants to detect hate speech in user posts. Which approach fits best?",
      options: [
        "Pure rules: block any post containing specific banned words",
        "Pure ML: train on millions of labelled posts and let the model decide",
        "Hybrid: rules for obvious cases, ML for context-dependent grey areas, with human review for high-stakes decisions",
        "No AI needed: manual review of all posts",
      ],
      correctIndex: 2,
      insight:
        "Hybrid is always right here. Pure rules miss context. Pure ML makes confident errors on novel hate speech that does not match training patterns. Human review of high-stakes edge cases is legally and ethically necessary. The architecture mirrors how the best real-world systems are actually built.",
      deepDive: {
        cta: "Why content moderation is the hardest ML problem in industry",
        content: "Content moderation is widely considered the hardest production ML problem, not because of technical complexity, but because 'hate speech' is culturally relative, time-sensitive, context-dependent, and contested. This means training labels are themselves contested, and a model trained on those labels encodes the labellers' biases. Major platforms employ thousands of human reviewers alongside ML models, precisely because the judgement calls are too subtle for pure automation. There is no clean technical solution to a fundamentally contested social question.",
      },
    },
    {
      type: "apply",
      title: "Make the call in your own product",
      body: "Every product decision eventually asks: do I write a rule or train a model? Now you can answer it without guessing.",
      roles: [
        {
          role: "Product Manager",
          action:
            "Before adding an AI feature to your roadmap, write two sentences, what rule-based approach would you use if ML didn't exist, and why is that not good enough? If you cannot answer the second question, you probably don't need ML yet.",
        },
        {
          role: "Founder",
          action:
            "Your first pass at almost any AI feature should be rules or a simple heuristic. Ship it fast, measure it, and only add ML complexity when you can show the simpler approach has a measurable ceiling. Most early-stage teams over-ML.",
        },
        {
          role: "Builder",
          action:
            "Next time you are debating rules vs ML, draw the decision tree: how many edge cases have appeared in the last 30 days? What is the cost of a false positive vs. false negative? The answers usually make the choice obvious without any maths.",
        },
        {
          role: "Analyst",
          action:
            "Your threshold-based alerts (flag if metric > X) are rules. When you notice the threshold keeps needing manual adjustment as patterns change. That is the signal to explore whether an anomaly detection model would serve you better.",
        },
      ],
      microAction:
        "Pick the most annoying rule or threshold in your current product or workflow. Ask, is this failing because the rule is wrong, or because the world is more complex than any rule can capture? That answer tells you whether to fix the rule or replace it with learning.",
      deepDive: {
        cta: "The build vs. buy argument through this lens",
        content: "The rules-vs-ML decision also maps to build-vs-buy. Rules tend to be in-house: your business logic is specific to you. ML models can be bought, you can fine-tune a foundation model for your specific classification task with relatively few labelled examples. This is the fine-tuning use case. A pre-trained model already understands language; you teach it your labelling convention with a small dataset. For most product teams, buying a foundation model and fine-tuning with your labels is dramatically cheaper than training a classifier from scratch.",
      },
    },
    {
      type: "reflect",
      title: "A new lens on every product decision",
      body: "You now have the clearest framework in the room. Next lesson, if your model learns by predicting, what exactly is it learning to predict, and how does the problem framing change everything about what you get out the other end?",
      learned: [
        "Rules work for well-defined, stable, auditable conditions. ML handles scale, complexity, and edge cases.",
        "The rules trap: your rulebook grows quadratically while edge cases grow exponentially.",
        "ML learns logic from labelled examples: nobody writes the rules, they emerge.",
        "Hybrid architectures: rules as first pass, ML for the grey zone, is how robust production systems are actually built.",
        "The choice between rules and learning is a product and engineering decision with measurable consequences, not a philosophical one.",
      ],
      deepDive: {
        cta: "Where this thinking breaks down",
        content: "The rules-vs-ML framing has a blind spot: it implies you must choose one or the other. In practice, many modern systems are ML models trained to produce interpretable rules: decision trees, rule induction algorithms, or ML systems that generate human-readable explanations of their decisions. These exist at the intersection: ML learns the rules from data, but outputs them in auditable rule form. Regulatory and safety contexts increasingly require these white-box approaches. The future of AI in high-stakes domains may be neither pure rules nor pure ML, but ML that produces auditable rules.",
      },
    },
  ],
};
