import type { StructuredLesson } from "@/types/lesson";

export const lessonMlWorkflow: StructuredLesson = {
  id: "ml-workflow",
  slug: "ml-workflow",
  title: "The Real ML Workflow",
  hook: "The model is twenty percent of the job. The loop around it is the other eighty.",
  concept: "ml operations intuition",
  durationMinutes: 18,
  pathId: "curious-builders",
  free: false,
  order: 7,
  relatedBlogSlugs: [],
  blocks: [
    {
      type: "hook",
      title: "I have shipped six ML systems. The model is the easy part.",
      icon: "🔄",
      body: "Fraud detection. Churn prediction. Production LLM features. Across all of them, the model itself was maybe twenty percent of the work. The other eighty was the loop around it: framing the problem precisely, cleaning the data, defining what good actually means, deploying without breaking things, and monitoring what happens after. Tutorials end the moment a model hits high accuracy on a clean spreadsheet. Real products begin there — and most of them die quietly in production while everyone wonders what went wrong.",
      visual: {
        kind: "flow",
        steps: [
          { label: "Frame" },
          { label: "Data" },
          { label: "Train" },
          { label: "Evaluate" },
          { label: "Deploy" },
          { label: "Monitor" },
        ],
      },
    },
    {
      type: "play",
      title: "Walk the full loop",
      body: "Step through every stage of a real machine learning project. Pay attention to the specific failure mode that quietly kills teams at each stage. These are not hypothetical — every one of them has killed a real project.",
      playgroundId: "pipeline-stepper",
    },
    {
      type: "checkpoint",
      title: "Spot the silent killer",
      question: "After launch, the most dangerous failure mode is usually",
      options: [
        "A user interface element with a small font",
        "Silent decay as live data drifts away from what the model was trained on",
        "Too many software packages in the dependency tree",
        "Users actually reading the product documentation",
      ],
      correctIndex: 1,
      insight:
        "The world changes after you ship. Without monitoring and retraining, a model slowly rots while still appearing healthy on old metrics. You only notice when a customer complains — or when business outcomes quietly decline.",
    },
    {
      type: "build",
      title: "Framing is where projects are won or lost",
      icon: "🎯",
      body: "Before any code, you turn a fuzzy business wish into a precise prediction task. What exactly is the input, and what label are you trying to predict? 'Reduce churn' is useless to a model. 'Predict whether this customer cancels in the next thirty days, given their usage and support history' is something it can actually learn. Bad framing wastes months that no clever model can recover — and the framing error is almost never discovered until late.",
      highlights: [
        "Turn 'reduce churn' into 'predict cancellation probability in the next 30 days'.",
        "A precise prediction task is something a model can actually optimise for.",
        "Bad framing wastes months that no amount of clever modelling can recover.",
      ],
    },
    {
      type: "build",
      title: "Data discipline beats model hype",
      icon: "🗂️",
      body: "The fastest way to fool yourself is data leakage — where a clue about the answer secretly slips into your training inputs. Your offline accuracy looks incredible. Then the live system collapses because that clue does not exist in the real world. I have seen a team spend three weeks celebrating a leaky model before someone noticed the cancellation date was in the training features.",
      highlights: [
        "Data leakage: a clue about the answer slips into the inputs during training.",
        "Offline accuracy looks amazing. Live accuracy collapses. The team celebrates a lie.",
        "Clean, representative, leak-free data beats a fancier model almost every time.",
      ],
    },
    {
      type: "play",
      title: "Simulate data leakage — the silent project killer",
      body: "Run this to see exactly how leakage works: one column that should not be in the training features makes offline accuracy look incredible, then vanishes in production. This is not theoretical. Run both versions. Spot the number that lies.",
      playgroundId: "python-sandbox",
      playgroundVariant: "data-leakage",
    },
    {
      type: "play",
      title: "Feel how fragile a single unit is",
      body: "Shift one input a little and watch the prediction swing. Now imagine thousands of these chained in production. This is why guardrails, evaluation, and monitoring exist — the model is always one distribution shift away from breaking.",
      playgroundId: "neuron-sandbox",
      playgroundVariant: "churn",
    },
    {
      type: "checkpoint",
      title: "Offline is not online",
      question: "Why is a great offline accuracy score not enough to declare success?",
      options: [
        "Offline accuracy always matches live performance exactly — so it does not matter",
        "Real user traffic differs from test data, so live impact must be measured independently",
        "Accuracy is the only metric that ever matters in any context",
        "Users behave exactly like the training set does",
      ],
      correctIndex: 1,
      insight:
        "Offline tests are a rehearsal, not the show. Real users, real traffic, and a live test on actual business outcomes are the only true verdict. Most projects skip this step and regret it.",
    },
    {
      type: "checkpoint",
      title: "The same loop for language models",
      question:
        "For a product built on a language model, the equivalent of monitoring is",
      options: [
        "Never checking outputs after launch — if it works, it works",
        "Running ongoing evaluations and periodic human review on real production prompts",
        "Only counting token usage and cost per day",
        "Switching to a bigger model when users complain",
      ],
      correctIndex: 1,
      insight:
        "Evaluations plus a human review loop on real prompts are what production-grade LLM engineering actually looks like. The prompts, the model, and the users all change over time. The monitoring loop never ends.",
    },
    {
      type: "apply",
      title: "Your AI feature checklist",
      body: "The six-stage loop is not just for ML engineers. It is the right frame for any AI feature you are building or evaluating — including features built on top of existing models like Claude, GPT, or Gemini.",
      roles: [
        {
          role: "Product Manager",
          action:
            "Use the six stages as a PRD template for every AI feature: What are we predicting (Frame)? What data do we have and is it clean (Data)? How do we define quality (Evaluate)? How do we know it is working in production (Monitor)? If any stage has no answer, the spec is incomplete.",
        },
        {
          role: "Founder",
          action:
            "Before investing in custom model training, verify that prompt engineering plus retrieval cannot solve the problem first. Most early-stage AI products do not need training. They need better framing, better data, and tighter evaluation. Train only after you have validated the loop.",
        },
        {
          role: "Builder",
          action:
            "Set up a minimal evaluation harness before launch, not after. Ten representative test cases, a clear rubric for what 'good' looks like, and a habit of running them before every prompt or code change. This is the difference between iterating deliberately and just guessing.",
        },
        {
          role: "Analyst",
          action:
            "Before building any ML model on your data, audit every column for leakage. Ask: 'Would I have this column at prediction time?' If the answer is no or maybe, drop it. Then separate train and test data before touching the model. These two steps catch 80% of the problems I have seen in production.",
        },
      ],
      microAction:
        "Map your current or next AI feature to the six stages. Write one sentence per stage. The stage with the vaguest or missing answer is your highest risk. Focus there first — not on choosing a model or a bigger context window.",
    },
    {
      type: "reflect",
      title: "You think like a builder now",
      body: "You see AI as living systems, not slide decks. Frame. Collect data. Train. Evaluate. Deploy. Monitor. That loop is the operating system you now carry into every AI conversation. Keep one question close: where does the answer come from, and how would I know if it broke?",
      learned: [
        "AI products are living systems: frame, collect data, train, evaluate, deploy, monitor.",
        "The model is 20% of the work. The loop around it is the other 80%.",
        "Data quality beats model size. Clean and representative before you scale.",
        "Data leakage is a silent killer — audit every training column before you train.",
        "Offline scores are a rehearsal. Live metrics on real traffic are the only true verdict.",
        "The loop never ends: monitor, evaluate, and retrain as the world changes.",
      ],
    },
  ],
};
