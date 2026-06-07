import type { StructuredLesson } from "@/types/lesson";

export const lessonPrompting: StructuredLesson = {
  id: "prompting",
  slug: "prompting",
  title: "Talking to AI: Prompting",
  hook: "Same model, same question. A structured prompt gets an answer ten times better. Here is the structure.",
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
      icon: "💬",
      body: "Same model. Same capability. I have watched a one-line prompt return garbage and a well-structured prompt return something better than most junior analysts write. You cannot change the model's weights. What you can change is its input. A prompt is the set of instructions a predicting machine conditions on before it answers. Better input means a sharper, more useful prediction. Prompting is the closest thing to programming a model that everyone can do — and almost nobody does it systematically.",
      visual: {
        kind: "flow",
        steps: [
          { label: "Your prompt", detail: "The full input" },
          { label: "Context", detail: "Role, audience, goal" },
          { label: "Prediction", detail: "Token by token" },
          { label: "Better output", detail: "Better input → better output" },
        ],
      },
    },
    {
      type: "visual",
      title: "Why vague prompts reliably fail",
      body: "Ask 'explain machine learning' and the model has no idea who you are or what you need. It could mean a tweet or a textbook chapter. So it produces the statistically safe average answer that satisfies no one. Specificity removes that ambiguity and points the prediction toward what you actually need.",
      highlights: [
        "A vague prompt leaves the model with too many valid interpretations.",
        "The model defaults to the safe average — the most likely answer in its training data.",
        "Specificity removes guesswork and points the prediction where you need it.",
      ],
      visual: {
        kind: "comparison",
        leftLabel: "Vague prompt",
        leftPoints: [
          "Explain machine learning",
          "Write a summary",
          "Give me ideas",
        ],
        rightLabel: "Specific prompt",
        rightPoints: [
          "Explain ML to a non-technical CEO in 3 bullet points",
          "Summarise in 2 sentences for a board presentation",
          "Give 5 product names for a meditation app for teenagers",
        ],
      },
    },
    {
      type: "play",
      title: "Build a prompt like a production engineer",
      body: "In real products, prompts are code: assembled from parts, versioned, and tested. Run this. Remove a lever. See what disappears from the structure — and imagine what happens to the model's output.",
      playgroundId: "python-sandbox",
      playgroundVariant: "prompt-builder",
    },
    {
      type: "play",
      title: "Build a great prompt live",
      body: "Toggle techniques on and off and watch the quality score climb. Read how the rewritten prompt changes as you add each piece. Start from the worst possible version.",
      playgroundId: "prompt-lab",
    },
    {
      type: "checkpoint",
      title: "Find the biggest lever",
      question: "Which change usually produces the biggest improvement in output quality?",
      options: [
        "Typing the key words in ALL CAPITALS",
        "Adding a role, context, a concrete example, and an output format",
        "Saying please multiple times throughout the prompt",
        "Making the prompt as short and vague as possible",
      ],
      correctIndex: 1,
      insight:
        "Role, context, example, and format are the four reliable levers. Politeness and capitalisation have no measurable effect on output quality. Structure does.",
    },
    {
      type: "build",
      title: "The four levers, and what each one does",
      icon: "🔧",
      body: "Give it a role so it adopts the right voice and expertise. Add context — your audience, your goal, and your constraints. Show one strong example so it can copy the quality bar; this is called few-shot learning. Specify the output format so you get a bullet list or JSON instead of a wall of text. For hard reasoning problems, also ask it to think step by step.",
      highlights: [
        "Role: give the model a persona and it adopts the right voice and expertise level.",
        "Context: add audience, goal, and constraints — it now knows what you actually need.",
        "Example: show one strong output and it copies the format and quality bar.",
        "Format: specify list, table, or JSON and you get exactly that structure reliably.",
      ],
    },
    {
      type: "play",
      title: "Hit excellent with fewer moves",
      body: "Try to reach a high score using the smallest number of techniques. In real products, shorter prompts are cheaper and faster — so efficiency matters as much as quality.",
      playgroundId: "prompt-lab",
    },
    {
      type: "checkpoint",
      title: "Why examples work",
      question: "Showing the model one strong example mainly helps because it",
      options: [
        "permanently retrains the model on your example",
        "anchors the format and quality bar for the model to match",
        "deletes its other knowledge and focuses only on your example",
        "makes the responses random and more creative",
      ],
      correctIndex: 1,
      insight:
        "An example sets the target pattern the model predicts toward. It is the fastest way to communicate a standard without long instructions. The model sees the bar and clears it.",
    },
    {
      type: "build",
      title: "Why step-by-step thinking helps",
      icon: "🧩",
      body: "A model predicts one token at a time. A hard answer crammed into a single leap is easy to get wrong — each token is predicted without enough prior reasoning. Asking it to reason out loud lets each step build on the last, the same way you would solve a hard maths problem on paper instead of in your head. More room to reason often means a more correct result.",
      highlights: [
        "Predicting token by token means hard answers need space to unfold.",
        "Asking it to reason out loud lets each step build on the previous one.",
        "More reasoning room → more correct final answer. Especially for maths and logic.",
      ],
    },
    {
      type: "build",
      title: "Prompting is measurable, not magical",
      icon: "📊",
      body: "Professionals do not trust a prompt because it felt good once. They keep a small set of representative test inputs and compare outputs whenever they change the wording. Prompt engineering without a test set is just hope wearing a lab coat. The teams that ship reliable AI features treat prompts like code: versioned, tested, and reviewed.",
      highlights: [
        "Keep a test set of representative inputs. Compare before and after every prompt change.",
        "Prompt engineering without evaluation is hope wearing a lab coat.",
        "Consistency matters as much as quality for anything you build on top of a model.",
      ],
    },
    {
      type: "checkpoint",
      title: "Apply it: JSON reliability",
      question:
        "You need consistent JSON output from a model for your application to parse. Best approach?",
      options: [
        "Ask nicely and hope the format stays consistent across requests",
        "Specify the exact JSON schema and show one complete example of valid output",
        "Use ALL CAPITALS for the field names so the model notices them",
        "Make the prompt as short and open-ended as possible",
      ],
      correctIndex: 1,
      insight:
        "Stating the format and showing one example is how you get reliable, machine-readable output you can build on. The model treats your example as the pattern to predict toward.",
    },
    {
      type: "apply",
      title: "Prompting as a team discipline",
      body: "Good prompts are reusable, testable, and improvable. The teams that ship reliable AI features treat them exactly like code. This is where you start.",
      roles: [
        {
          role: "Product Manager",
          action:
            "Write a system prompt for your product's AI feature using Role + Context + Format. Share it with your team as the starting spec. A written prompt is a testable spec — it forces decisions about what the model should and should not do, in writing, before engineering starts.",
        },
        {
          role: "Founder",
          action:
            "Identify your team's most-repeated AI task — writing, summarising, categorising. Create one canonical prompt template with role, context, and format locked in. One shared template beats ten slightly-different ones drifting in ten different directions.",
        },
        {
          role: "Builder",
          action:
            "Create a prompt test set now: five representative inputs covering normal cases and known edge cases. Run them every time you change the prompt. If you cannot tell whether a change improved things, you are flying blind.",
        },
        {
          role: "Analyst",
          action:
            "The next time you use an AI tool to summarise or categorise data, write the prompt using all four levers first. Compare the output to your usual one-line prompt. The difference is the gap between using AI and engineering with AI.",
        },
      ],
      microAction:
        "Take a prompt you use regularly in Claude, ChatGPT, or Cursor. Add a role, specify the output format, and include one example of a good output. Compare the result to your old version side by side. The difference is the four levers working — and you just built your first structured prompt.",
    },
    {
      type: "reflect",
      title: "You can now steer any model",
      body: "Role, context, example, format, and step-by-step reasoning. These five habits work on every model you will ever touch. Next we open the box and look at what the model is actually reading when you send it text.",
      learned: [
        "The prompt is the program. Better input is the fastest path to better output.",
        "Role, context, example, and format are the four reliable levers.",
        "Step-by-step reasoning helps the model unpack hard problems correctly.",
        "Test your prompts with consistent examples. Gut feel is not evaluation.",
        "Good prompts are precise and concise — not long, hopeful, and vague.",
      ],
    },
  ],
};
