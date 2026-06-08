import type { StructuredLesson } from "@/types/lesson";

export const lessonPrompting: StructuredLesson = {
  id: "prompting",
  slug: "prompting",
  title: "Talking to AI: Prompting",
  hook: "The prompt is the program. Write it badly, get bad software.",
  concept: "prompting",
  durationMinutes: 16,
  pathId: "curious-builders",
  free: false,
  order: 3,
  relatedBlogSlugs: [],
  blocks: [
    {
      type: "hook",
      title: "The prompt is the program",
      icon: "✍️",
      body: "I watch senior engineers write prompts the same way they would text a friend: vague, context-free, and then confused when they get a mediocre response. A prompt is not a search query. It is a specification. The model produces the most statistically likely completion of the text you give it. If your text is vague, the completion is the average of all vague inputs, which means average output. This lesson teaches you to write prompts like you mean it.",
      visual: {
        kind: "stats",
        items: [
          { value: "60%", label: "of AI feature failures trace to bad prompts" },
          { value: "4", label: "levers every prompt has" },
          { value: "1", label: "minute to change any of them" },
        ],
      },
      deepDive: {
        cta: "The formal version of this, because you can handle it",
        content: "Formally, a prompt is the conditioning context for a conditional probability distribution: P(output | prompt). The model's behaviour is entirely determined by the distribution shift caused by your prompt. This is why jailbreaks work, they shift the distribution into regions the model would normally avoid. When you write a system prompt, you are engineering a probability distribution, not issuing commands. Some teams have started treating prompt engineering as a form of software engineering, with version control, test suites, and code review.",
      },
    },
    {
      type: "visual",
      title: "Why vague prompts fail",
      body: "Both prompts ask the same question. One gets a useful response. The gap is not the model: it is the information density of the input.",
      items: [
        {
          label: "Vague",
          content: "Tell me about user research",
          note: "Distribution is too wide. 10,000 plausible responses. Model picks the average.",
        },
        {
          label: "Specific",
          content:
            "You are a senior product manager at a B2B SaaS company. Summarise the 3 most common mistakes teams make when running user interviews for a new feature. Format as a numbered list with one line of explanation per mistake.",
          note: "Distribution is narrow. The most likely completion is close to what you actually want.",
        },
      ],
      deepDive: {
        cta: "The information theory explanation",
        content: "The vague prompt failure has a precise information-theoretic cause. A vague prompt is low-information, leaving high uncertainty about what output is desired. The model resolves that uncertainty by sampling from the centre of the distribution, the average of all plausible completions. The average is often wrong for any specific use case. Adding specificity is literally adding information: reducing entropy about what output is desired, narrowing the distribution toward what you actually want. Role, context, example, and format each add distinct dimensions of constraint.",
      },
    },
    {
      type: "play",
      title: "Build a prompt like a production engineer",
      body: "Assemble a prompt from components. Each variable is a lever. Change one, run it, observe what shifts. This is how a real prompt is built, not typed once, but composed and iterated.",
      playgroundId: "python-sandbox",
      playgroundVariant: "prompt-builder",
      deepDive: {
        cta: "What a prompt DSL could look like",
        content: "What you just built: variable prompt construction, is a step toward prompt programming languages. LMQL, Guidance, and DSPy are systems that treat prompts as programs with typed variables, constraints, and structured outputs. DSPy (from Stanford) goes further, instead of writing prompts manually, you specify desired input-output behaviour and the system optimises prompt phrasing automatically using gradient-based search. Prompt engineering may eventually be partially automated, but understanding the levers, as you do now, is the prerequisite for evaluating automated systems.",
      },
    },
    {
      type: "play",
      title: "Break the prompt. Then fix it.",
      body: "Interact with the prompt lab. Change one element at a time and observe how the output shifts. You are not guessing, you are running a controlled experiment on a conditional probability distribution.",
      playgroundId: "neuron-sandbox",
      playgroundVariant: "prompt-lab",
      deepDive: {
        cta: "What happens at the token level when you add a role",
        content: "When you add 'You are a senior product manager', you are prepending those tokens to the sequence. The model has seen this pattern thousands of times in training data: role descriptions followed by relevant professional writing. The role tokens activate a cluster of learned behaviours associated with that professional context. This is why the same factual question gets different register and depth depending on the role. The model is not 'becoming' a PM. The token pattern 'senior product manager' statistically predicts different subsequent tokens than no context.",
      },
    },
    {
      type: "checkpoint",
      title: "Find the biggest lever",
      question: "A customer service bot keeps giving generic responses. Which change will have the most immediate impact?",
      options: [
        "Add a specific role and company context to the system prompt",
        "Use a different LLM provider",
        "Increase the max token limit",
        "Add more whitespace in the prompt",
      ],
      correctIndex: 0,
      insight:
        "Role and context together define what kind of output is most likely. Generic responses come from a generic distribution. The moment you specify who the model is and what context it is operating in, you narrow the distribution to something useful.",
      deepDive: {
        cta: "Why these four levers work technically",
        content: "Each prompt lever works by narrowing the conditional probability distribution in a different dimension. Role narrows the style and expertise distribution. Context narrows the topic and goal distribution. Examples provide a direct sample from your desired output distribution, the model tries to produce something with similar probability to the example. Format specifies structural constraints, eliminating distributions that don't match. Together they apply four independent constraints to the same distribution, making the likely output much closer to what you want.",
      },
    },
    {
      type: "build",
      title: "The four levers",
      icon: "🎛️",
      body: "Every prompt has four levers. Most prompts only use one or two. Using all four costs you 30 seconds. The improvement is rarely proportional: it is usually enormous.",
      highlights: [
        "Role: 'You are a senior product manager at a SaaS company'",
        "Context: 'We have 500 monthly active users, mostly SMBs in logistics'",
        "Example: 'Here is a response that hit the mark: [example]'",
        "Format: 'Reply in 3 bullet points. No jargon. Under 80 words.'",
      ],
      visual: {
        kind: "callout",
        text: "Role + Context + Example + Format. If your prompt is missing any of these and the output is wrong. That is why.",
        color: "violet",
      },
      deepDive: {
        cta: "The meta-skill: how to discover new levers",
        content: "The four classic levers are not exhaustive. Other effective levers include: constraints ('do not mention competitors'), negative examples ('here is a bad output and why it failed'), persona anchoring ('respond as if talking to a senior engineer with no time'), and meta-instructions about reasoning ('think step by step before answering'). You discover new levers by noticing failure modes. When the output is wrong in a systematic way. That is a signal there is a lever you have not set. Prompt engineering is fundamentally failure-driven.",
      },
    },
    {
      type: "play",
      title: "One prompt, two budgets",
      body: "Write the richest prompt you can for this task. Then rewrite it to use half the tokens without losing quality. This constraint is real: in production, every token in your system prompt is billed on every request. Compression is engineering.",
      playgroundId: "neuron-sandbox",
      playgroundVariant: "prompt-lab",
      deepDive: {
        cta: "The efficiency vs. quality tradeoff in production",
        content: "Long system prompts have real economics. At scale, a 1,000-token system prompt costs around $0.002 per request on most providers. At 10M requests per day. That is $20,000 per day in system prompt alone. Many teams have prompt-compression projects specifically to reduce token count without quality loss. Techniques include removing explanatory text the model does not need, using abbreviations for repeated concepts, and restructuring prompts to be information-dense rather than conversational. Your prompt should say as much as possible in as few tokens as possible.",
      },
    },
    {
      type: "checkpoint",
      title: "Why examples work",
      question: "You add one example of a good response to your prompt. Why does this improve output quality?",
      options: [
        "It tells the model to copy the example verbatim",
        "It shifts the probability distribution toward outputs similar to the example",
        "It reduces the model's compute requirements",
        "It teaches the model new facts it didn't know before",
      ],
      correctIndex: 1,
      insight:
        "Examples shift the distribution. You are providing a direct sample from the output space you want, the model tries to produce completions that are statistically similar to it. This is called few-shot prompting and it is the most reliable prompt improvement available to you right now.",
      deepDive: {
        cta: "The few-shot learning story: why 1 example is so powerful",
        content: "Few-shot learning is one of the most surprising capabilities to emerge from large-scale pretraining. The model does not update its weights when you provide an example, the example is just context tokens. But by seeing an input-output pair, the model often generalises to new inputs with similar structure. The hypothesis is that the model learned to learn from examples during pretraining, because human text is full of demonstrations followed by their outcomes. This in-context learning is distinct from fine-tuning: no weights change, yet performance improves dramatically.",
      },
    },
    {
      type: "build",
      title: "Why step-by-step thinking helps",
      icon: "🧩",
      body: "Chain-of-thought is not a trick. It is architecture-aware prompting. The model generates one token at a time, and each token becomes context for the next. When you ask it to reason step-by-step, it is building up the correct answer in its own context window before committing to the final answer.",
      highlights: [
        "Without CoT: model predicts the answer token directly: one shot, high error rate on multi-step problems",
        "With CoT: model generates intermediate steps: each step is context that makes the next step more likely to be correct",
        "'Let's think step by step' alone improved GSM8K accuracy from 18% to 78% in the original paper",
        "The scratchpad effect, the model uses its own output as working memory",
      ],
      visual: {
        kind: "flow",
        steps: [
          { label: "Question", detail: "input tokens" },
          { label: "Reasoning steps", detail: "intermediate tokens" },
          { label: "Answer", detail: "final token conditioned on steps" },
        ],
      },
      deepDive: {
        cta: "The chain-of-thought research that changed prompting",
        content: "Chain-of-thought prompting was formalised in a 2022 Google Brain paper. The key finding: simply adding 'Let's think step by step' dramatically improved performance on multi-step reasoning tasks with no other changes. The explanation: intermediate reasoning tokens create context for subsequent tokens, making each step easier to predict correctly. The model is using its own output as a scratchpad. This works because the model was pretrained on text that includes human reasoning steps: textbooks, worked examples, forum discussions. It has seen the pattern before.",
      },
    },
    {
      type: "build",
      title: "Prompting is measurable, not magical",
      icon: "📊",
      body: "If you cannot measure the impact of your prompt change, you do not know if it helped. The teams that ship reliable AI features treat prompts like code: every change gets tested against a representative set of inputs before deployment.",
      highlights: [
        "Create a test set: 20 representative inputs where you know the correct output",
        "Run baseline: how does the current prompt score against it?",
        "Change one thing: one lever at a time",
        "Measure: did the score go up? Ship. Did it go down? Revert.",
      ],
      visual: {
        kind: "callout",
        text: "Prompt engineering without evaluation is just vibes. Vibes do not scale.",
        color: "amber",
      },
      deepDive: {
        cta: "What a real prompt evaluation harness looks like",
        content: "Production prompt evaluation systems go beyond 'does it look good'. Many teams run automatic evaluators: often another LLM prompted to score outputs on a rubric. This 'LLM-as-judge' pattern allows scaling evaluation to thousands of test cases without human review. The catch, the evaluator has its own biases, especially preferring longer and more confident responses. Good evaluation combines automatic scoring with periodic human review of samples to keep the automatic scorer calibrated against ground truth.",
      },
    },
    {
      type: "apply",
      title: "Prompting as a team discipline",
      body: "The prompt is the product. Treat it like one.",
      roles: [
        {
          role: "Product Manager",
          action:
            "Write a one-sentence 'prompt spec' for every AI feature in your backlog: who is the model, what context does it have, what format should it return? If you cannot write this before grooming, the story is not ready to build.",
        },
        {
          role: "Founder",
          action:
            "The single highest-leverage hour in your AI product development is writing a great system prompt, then building a 20-case test set, then measuring systematically. Do this before you consider fine-tuning or model switching.",
        },
        {
          role: "Builder",
          action:
            "Add your system prompts to source control alongside your code. Run them through your test set in CI so prompt regressions are caught before deployment, not after a user reports a bad response.",
        },
        {
          role: "Analyst",
          action:
            "If you are using AI to generate summaries or analysis, the prompt is as important as the data. Build a small eval harness: 10 example inputs with expected outputs. Test every prompt change against it before sending it to your stakeholders.",
        },
      ],
      microAction:
        "Take any AI feature you own or use. Find its system prompt (or write what you think it is). Apply the four levers test: does it have role, context, example, and format? Add whichever are missing. Run it against three edge cases. You will see a difference.",
      deepDive: {
        cta: "The technical debt that accumulates in prompts",
        content: "Prompt technical debt is a real, underappreciated problem. Unlike code, prompts are often not version-controlled, have no linter, have no formal test suite, and frequently live in a database rather than source control. Teams accumulate dozens of prompt variants across features, some of which interact with model updates in unexpected ways. When the model provider updates the underlying model, all prompts may behave differently with no warning. Best practice: treat prompts as first-class software artifacts, version them with code, and run your evaluation harness on every model update.",
      },
    },
    {
      type: "reflect",
      title: "You can now steer any model",
      body: "The model is the same for everyone. The prompt determines what you get from it. Everyone else is guessing. You are not. Next lesson: how the model reads your prompt, the mechanics of tokenisation and why 'strawberry' breaks spell-checking AI.",
      learned: [
        "A prompt is a specification, not a search query. Vague inputs produce average outputs.",
        "The four levers: role, context, example, and format. Use all four, every time.",
        "Few-shot examples shift the distribution, they are the most reliable improvement available.",
        "Chain-of-thought forces intermediate reasoning, which dramatically improves multi-step accuracy.",
        "Measure every prompt change against a representative test set. Vibes do not scale.",
      ],
      deepDive: {
        cta: "Where prompting reaches its limits",
        content: "Prompting has fundamental limits worth knowing before you hit them. You cannot prompt a model to reliably know things it was not trained on: a system prompt saying 'you are very good at arithmetic' does not fix arithmetic errors. You cannot prompt away harmful capabilities that are deeply embedded in the model. You cannot prompt a model to reliably follow format constraints on very long outputs. These are the limits where fine-tuning, retrieval augmentation, and architectural changes become necessary. Knowing what prompting can and cannot fix is as important as knowing how to write a great prompt.",
      },
    },
  ],
};
