import type { StructuredLesson } from "@/types/lesson";

export const lessonMlWorkflow: StructuredLesson = {
  id: "ml-workflow",
  slug: "ml-workflow",
  title: "The Real ML Workflow",
  hook: "The model is 20% of the work. Here is what the other 80% looks like, and why most teams never talk about it.",
  concept: "ml-workflow",
  durationMinutes: 18,
  pathId: "curious-builders",
  free: false,
  order: 7,
  relatedBlogSlugs: [],
  blocks: [
    {
      type: "hook",
      title: "The 80% nobody tells you about",
      icon: "🔧",
      body: "The AI demo looks clean. The production system does not. I have been on teams that spent three months building a perfect model only to discover the data was leaking the answer into the training set. I have seen models degrade silently for six weeks before anyone noticed. The model is the easy part. Framing the problem, cleaning the data, evaluating honestly, and monitoring after deployment. That is where projects survive or die.",
      visual: {
        kind: "stats",
        items: [
          { value: "20%", label: "model development" },
          { value: "80%", label: "everything around it" },
          { value: "0%", label: "of demos show the 80%" },
        ],
      },
      deepDive: {
        cta: "The 80/20 rule in ML: where the 80% actually lives",
        content: "The 80/20 breakdown has been validated empirically across many production ML systems. Google's 'Hidden Technical Debt in Machine Learning Systems' paper (2015) catalogues the production concerns that dwarf modelling work: data dependencies, serving infrastructure, monitoring pipelines, concept drift detection, model versioning, and feedback loops between model outputs and future training data. The core message: building a model is easy; operating a model in production for years is hard. Most ML curricula teach the easy part.",
      },
    },
    {
      type: "play",
      title: "Step through the pipeline before we dissect it",
      body: "Click through each stage of a real ML project. Notice the questions each stage forces you to answer. Some you will recognise. Some will surprise you. All of them will eventually bite you if you skip them.",
      playgroundId: "neuron-sandbox",
      playgroundVariant: "pipeline-stepper",
      deepDive: {
        cta: "The specific thing that kills most ML projects at each stage",
        content: "Based on industry postmortems: Frame: wrong prediction task, optimising for what is measurable rather than what matters. Data: silent label quality degradation as human annotators drift in how they label over time. Train: overfitting to validation set from running too many experiments on the same split. Evaluate: mismatched offline and online metrics. Deploy: model latency incompatible with production constraints. Monitor: no alerting until a user complains. Each stage has a distinct failure signature and a distinct mitigation.",
      },
    },
    {
      type: "checkpoint",
      title: "Spot the silent killer",
      question: "A churn prediction model was trained in January. In June, the model's accuracy looks identical on your test set, but customer success is reporting worse-than-expected retention despite acting on the predictions. What is most likely happening?",
      options: [
        "The model code has a bug that only manifests in production",
        "Concept drift, the relationship between features and churn has changed, but your test set is still from January",
        "The customer success team is not using the predictions correctly",
        "The model was overfit to the validation set during training",
      ],
      correctIndex: 1,
      insight:
        "Concept drift. The test set is a snapshot from January. The world changed: user behaviour, product features, market conditions. The model still looks fine offline because it is evaluated on old data. In production it is making decisions based on outdated patterns. This is why monitoring on live data is non-negotiable.",
      deepDive: {
        cta: "Concept drift in production: concrete examples",
        content: "Concept drift is when the statistical relationship between inputs and labels changes over time without the data distribution necessarily changing. A churn model trained pre-COVID on office software becomes miscalibrated when remote work patterns shift. A fraud detection model trained on desktop transactions underperforms on mobile-first behaviour. A sentiment model trained on 2020 reviews does not understand 2024 internet slang. The model does not know its world model is outdated: it quietly makes worse predictions. This is why models need retraining schedules, not one-time deployment.",
      },
    },
    {
      type: "build",
      title: "Framing is where projects are won or lost",
      icon: "🎯",
      body: "Before you touch data or models, you define the prediction task. This decision shapes everything downstream. Wrong framing means the most accurate model in the world fails to move your business metric.",
      highlights: [
        "Wrong framing: predict which users are 'at risk' (vague: at risk of what, by when?)",
        "Right framing: predict probability that user cancels within next 30 days given the past 7 days of activity",
        "Test of a good frame: can you collect exactly the label you need, with no ambiguity, from historical data?",
        "Most projects that fail in production had a framing problem, not a model problem",
      ],
      visual: {
        kind: "callout",
        text: "One hour of framing saves one month of modelling. I have never seen this rule violated.",
        color: "violet",
      },
      deepDive: {
        cta: "The multiple valid framings problem",
        content: "Most business problems have multiple valid ML framings, and the choice is consequential. 'Reduce churn' could be framed as binary classification (will this customer churn in 30 days?), survival analysis (when will they churn?), or regression (what is their expected lifetime value?). Each framing uses different labels, different models, and optimises for different things. A binary classifier tells you who to target. A survival model tells you urgency. An LTV model tells you how much to spend saving them. Most projects pick the first framing that comes to mind rather than thinking through the tradeoffs.",
      },
    },
    {
      type: "build",
      title: "Data discipline beats model hype",
      icon: "🗃️",
      body: "I have seen teams spend weeks tuning neural architectures when the real problem was a leak in the feature engineering pipeline. Clean data + simple model beats dirty data + complex model, every time, with no exceptions I have personally witnessed.",
      highlights: [
        "Train/test split: test data must never appear in training. Temporal data needs temporal splits.",
        "Label quality: how were the labels collected? Who labelled them? How consistent are they?",
        "Data leakage: any feature that uses information from after the prediction moment = cheat code = broken model",
        "Class imbalance: 1% fraud rate means 99% accuracy by predicting nothing is fraud",
      ],
      visual: {
        kind: "callout",
        text: "Data leakage is the most common reason a model looks great in development and fails in production. Run for it first.",
        color: "red",
      },
      deepDive: {
        cta: "The four types of data leakage, which ones are easy to miss",
        content: "Data leakage has four subtypes: target leakage (using a feature created after the label, as you will simulate shortly); train-test contamination (test examples appear in training data); group leakage (multiple examples from the same entity split across train and test: e.g., the same customer appears in both); and preprocessing leakage (scaling or normalising using statistics from the full dataset including test). Group leakage is the sneakiest: a fraud detection model that has seen prior transactions from the same user in training performs artificially well on test transactions from that user.",
      },
    },
    {
      type: "play",
      title: "Simulate data leakage, and watch a model cheat",
      body: "Two datasets. One clean. One with a leaky feature. Train the same model on both. Compare the metrics. Then ask, which model would you deploy? This is the exact scenario I walked into on a project and had to explain to a team that was celebrating their 99% accuracy.",
      playgroundId: "python-sandbox",
      playgroundVariant: "data-leakage",
      deepDive: {
        cta: "Why leakage is so common, the psychological explanation",
        content: "Data leakage is common not because engineers are careless, but because it requires counterfactual thinking: 'would I have this column at prediction time?' The natural way to explore data is forward-looking, you have the outcome and work backwards to find predictive features. This forward exploration naturally surfaces leaky features that look like excellent predictors, and the correlation is real (just cheating). The leakage does not become visible until you deploy. Temporal validation: always using data from a later time period as your test set, is the single best practice for catching temporal leakage, and it is widely underused.",
      },
    },
    {
      type: "play",
      title: "Feel the threshold decision",
      body: "Your model outputs probabilities. Somewhere between 0 and 1, you have to draw a line and say: above this, I act. Below this, I don't. Move the threshold slider. Watch how precision and recall trade off against each other. Where you draw this line is a business decision, not a technical one.",
      playgroundId: "neuron-sandbox",
      playgroundVariant: "churn",
      deepDive: {
        cta: "Threshold selection, the business decision hiding in your model",
        content: "Every binary classifier produces a probability between 0 and 1. Converting that to a yes/no prediction requires choosing a threshold. The default of 0.5 is rarely optimal. For churn prediction, a false negative (missing a churner) might cost $200 in lost revenue; a false positive (targeting a non-churner with a retention offer) might cost $5. The optimal threshold should reflect this asymmetry: lower threshold catches more churners at the cost of more false positives. The ROC curve shows performance across all thresholds; the business context should determine which point on that curve you operate at.",
      },
    },
    {
      type: "checkpoint",
      title: "Offline is not online",
      question: "Your model achieves 92% accuracy on your test set. You deploy it. After two weeks, business metrics have not improved. What is the most likely explanation?",
      options: [
        "92% accuracy is not good enough, you need to improve the model",
        "The offline test set metric and the live business metric are measuring different things, and the model is not actually improving the outcome you care about",
        "Two weeks is not long enough to see the effect",
        "The engineering deployment had a bug that was since fixed",
      ],
      correctIndex: 1,
      insight:
        "Offline accuracy and live impact are different measurements. This is the most common and expensive disconnect in production ML. Accuracy on a test set measures whether the model predicts labels correctly. Whether those correct predictions translate to business outcomes depends on how they are acted on, what the counterfactual is, and whether the test set represents real production inputs.",
      deepDive: {
        cta: "The A/B test design errors that make this worse",
        content: "Measuring live impact correctly is harder than it looks. Classic errors: using too short a window (long-term behaviour changes take weeks to manifest), using the wrong randomisation unit (user-level vs session-level randomisation creates contamination), and measuring the wrong outcome (optimising for 7-day retention when you care about 30-day retention). The most dangerous error is running an A/B test but reporting on the wrong segment: e.g., reporting overall performance when the model only significantly improves outcomes for a specific user cohort. Statistical significance in the wrong metric hides the true impact.",
      },
    },
    {
      type: "checkpoint",
      title: "Same loop for language models",
      question: "You have deployed an LLM feature that summarises customer feedback. How should you monitor whether it is working in production?",
      options: [
        "Check that the model is returning text (it is not throwing errors)",
        "Sample real output weekly, review for quality, track the hallucination rate, and measure whether the summaries are being acted on downstream",
        "Re-run the same evaluation set you used before deployment",
        "Trust user ratings, if they are not complaining, the model is working",
      ],
      correctIndex: 1,
      insight:
        "Active sampling + quality review + downstream outcome measurement. Error-free output is the minimum bar, not the goal. The same evaluation set ages out quickly: real production inputs will diverge from it. Absence of complaints is not signal: most users do not report bad AI outputs, they just quietly stop using the feature.",
      deepDive: {
        cta: "What LLM evaluation actually looks like at scale",
        content: "Evaluating LLM features in production combines several techniques: reference-based evaluation (comparing outputs to a gold standard on representative inputs), LLM-as-judge (using another model to score outputs on a rubric), human evaluation (periodic sampling of real production outputs for human review), and behavioural probing (systematic testing of known failure modes like hallucination rate and refusal accuracy). Most mature teams combine all four. Human evaluation is expensive but remains the ground truth. The others scale it.",
      },
    },
    {
      type: "apply",
      title: "Apply the workflow to your product",
      body: "The workflow is not a checklist. It is a mindset about where the real work happens, and it is almost never in the model.",
      roles: [
        {
          role: "Product Manager",
          action:
            "Before any AI feature ships, run the six-stage checklist: Is the prediction task framed precisely? Is the training data clean and audited? Is the evaluation honest? Is the deployment scoped? Is monitoring in place? If two or more stages are incomplete, the feature is not ready: regardless of how good the model metrics look.",
        },
        {
          role: "Founder",
          action:
            "The second most important meeting after your roadmap review should be a monthly model health review. What is drifting? What are the hallucination rates? What does the live sample review show? Most AI startup failures are operational failures, not technical ones.",
        },
        {
          role: "Builder",
          action:
            "Every model you deploy should have: a temporal validation strategy, a data leakage audit, a monitoring dashboard with an alert threshold, and a retraining trigger. If any of these are missing at deployment, add them before the next sprint starts.",
        },
        {
          role: "Analyst",
          action:
            "Before you use ML on any dataset, spend one hour answering, what is the label, when is it collected relative to the prediction moment, and is any feature created after the label? That one hour will catch 80% of the data issues that would otherwise corrupt your model.",
        },
      ],
      microAction:
        "Pick one AI feature in your product or workflow. Map it to the six stages. Find the stage where you have the least confidence. That stage is your highest-leverage focus for the next sprint.",
      deepDive: {
        cta: "The postmortem pattern that reveals workflow failures",
        content: "ML project postmortems consistently show the same patterns. Failed projects tend to skip the framing step and start with modelling, use the first available dataset without auditing it for leakage, define 'done' as good offline metrics, and skip a monitoring plan until post-launch. Successful projects spend at least 20% of project time on framing before touching data, treat data auditing as a first-class step, define evaluation metrics before starting experiments, and deploy monitoring alongside the model. Discipline at each stage is more predictive of success than algorithmic sophistication.",
      },
    },
    {
      type: "reflect",
      title: "You now build AI that survives contact with users",
      body: "Frame it right. Clean the data. Evaluate honestly. Monitor like a production engineer, not a researcher. This is not glamorous. This is what separates AI features that compound in value from ones that gradually become liabilities.",
      learned: [
        "The model is 20% of the work. Data, framing, evaluation, and monitoring are the other 80%.",
        "Data leakage is the most common reason a model looks excellent in development and fails in production.",
        "Concept drift, the world changes without telling your model. Retraining schedules are not optional.",
        "Offline accuracy and live business impact are different metrics. Measure both, independently.",
        "An LLM feature needs sampling-based human review as part of its monitoring, not just error rate tracking.",
      ],
      deepDive: {
        cta: "The loop that never ends, and why that's actually good",
        content: "The ML workflow loop never ends for the same reason any good product loop never ends. The world is not static. User behaviour evolves, the product changes, new data arrives that captures new patterns. A model trained once and deployed is a snapshot of a dynamic reality. The teams that operate ML systems well develop a culture of continuous improvement: regular retraining cycles, automated drift detection, clear ownership of model quality. This is operationally harder than 'ship a model', but it is what separates ML features that stay useful from ones that gradually become liabilities.",
      },
    },
  ],
};
