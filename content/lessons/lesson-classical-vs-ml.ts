import type { StructuredLesson } from "@/types/lesson";

export const lessonClassicalVsMl: StructuredLesson = {
  id: "classical-vs-ml",
  slug: "classical-vs-ml",
  title: "Rules Versus Learning",
  hook: "When should a human write the rules, and when should the data write them?",
  concept: "machine learning",
  durationMinutes: 15,
  pathId: "curious-builders",
  free: true,
  order: 2,
  relatedBlogSlugs: [],
  blocks: [
    {
      type: "hook",
      title: "I have saved three projects from the rules trap",
      icon: "⚖️",
      body: "The symptom is always the same: a developer who keeps writing one more rule at 11pm while the world changes underneath them. Two approaches exist for making a computer decide things. One ages badly. Knowing which to reach for — and when to switch — is one of the most useful instincts you can build before touching any AI system.",
      visual: {
        kind: "comparison",
        leftLabel: "Classical: you write rules",
        leftPoints: [
          "You think of every case in advance",
          "Brittle when the world changes",
          "Great for fixed, predictable logic",
        ],
        rightLabel: "ML: data writes the rules",
        rightPoints: [
          "Patterns emerge from examples",
          "Adapts when you add fresh data",
          "Great for fuzzy, real-world patterns",
        ],
      },
    },
    {
      type: "build",
      title: "The rules approach — and the wall it hits",
      icon: "📋",
      body: "Imagine writing a spam filter by hand. Block anything that says free money. Block anything with too many capital letters. It works for a week. Then spammers write fr33 m0ney, then they change again. You are now trapped writing rules forever, always one step behind. This is the rules trap. Classical programming hits this wall with every problem that is messy and constantly changing.",
      highlights: [
        "You write every rule by hand, and rewrite them when the world changes.",
        "Spammers, bad actors, and evolving language adapt faster than any rulebook.",
        "The trap: the more rules you write, the more edge cases you discover.",
      ],
    },
    {
      type: "play",
      title: "Write the rules yourself. Watch them break.",
      body: "This is a hand-written spam filter with rules a real engineer typed. Run it. See what it catches. Look carefully at what slips through — then think about how long before the spammer figures it out.",
      playgroundId: "python-sandbox",
      playgroundVariant: "rules-trap",
    },
    {
      type: "play",
      title: "Now decide: rules or learning?",
      body: "Here are real product decisions. For each one, choose whether hand-written rules win or learning from examples wins. Trust your gut first, then check. The pattern will become obvious.",
      playgroundId: "rules-vs-ml-sorter",
    },
    {
      type: "checkpoint",
      title: "Spot the pattern",
      question: "Which kind of problem is the worst fit for hand-written rules?",
      options: [
        "Calculating sales tax at a fixed government-set percentage",
        "Recognising a cat in any photo across any lighting condition",
        "Converting kilometres to miles",
        "Sorting a list of numbers alphabetically",
      ],
      correctIndex: 1,
      insight:
        "Recognising a cat has no clean rulebook. Fur, angle, lighting, and pose vary endlessly. When the pattern is fuzzy and vast, examples beat rules — every time.",
    },
    {
      type: "build",
      title: "The learning approach — how it actually works",
      icon: "🤖",
      body: "With machine learning you collect thousands of labelled examples: this email is spam, this one is not. The model adjusts itself until its predictions match the labels. When spammers change their tricks, you do not rewrite rules. You add fresh labelled examples and let it adapt. The work shifts from writing logic to curating good data.",
      highlights: [
        "Collect labelled examples. The model tunes itself to match them.",
        "When reality changes, add fresh examples. No rules to rewrite.",
        "The work shifts from writing logic to curating good, representative data.",
      ],
    },
    {
      type: "play",
      title: "Watch a learned decision form",
      body: "This neuron has learned a churn pattern from data — no human wrote those weights. Move the sliders. See how a learned model weighs evidence versus following a rule someone typed.",
      playgroundId: "neuron-sandbox",
      playgroundVariant: "churn",
    },
    {
      type: "checkpoint",
      title: "Where did the logic come from?",
      question: "In machine learning, who decides how much each input matters?",
      options: [
        "A developer types the exact weights by hand before training",
        "The model learns the weights automatically from labelled examples",
        "The weights are always random and never change",
        "The end user configures them at runtime",
      ],
      correctIndex: 1,
      insight:
        "Training tunes the weights automatically until predictions match reality. You curate the examples. The model finds the rule hidden inside them. No human types the decision boundary.",
    },
    {
      type: "build",
      title: "The honest trade-off",
      icon: "🎯",
      body: "Rules are predictable, auditable, and need no data. Learning handles messiness and scale but needs many examples and can fail in surprising ways. Great engineers do not pick a side. They match the tool to the problem, and often combine both in the same product.",
      highlights: [
        "Rules: predictable, fully explainable, need zero training data.",
        "Learning: handles messy inputs at scale, but needs labelled examples.",
        "Most mature products quietly use both — rules for fixed logic, ML for fuzzy patterns.",
      ],
      visual: {
        kind: "comparison",
        leftLabel: "Reach for rules when",
        leftPoints: [
          "Logic is fixed (tax rate, currency conversion)",
          "You need full auditability and zero surprises",
          "You have fewer than a few hundred examples",
          "The pattern almost never changes",
        ],
        rightLabel: "Reach for ML when",
        rightPoints: [
          "Inputs are messy and varied (text, images, behaviour)",
          "Edge cases are endless and keep evolving",
          "You have thousands of labelled examples",
          "The pattern shifts over time",
        ],
      },
    },
    {
      type: "checkpoint",
      title: "Make the call",
      question:
        "Your team must flag toxic comments across millions of posts per day. Best first choice?",
      options: [
        "Hand-write a banned word list and call it done",
        "Learn from labelled examples, since language is endlessly varied and evolving",
        "Hire a human to read every post",
        "Rules are enough — it is just text",
      ],
      correctIndex: 1,
      insight:
        "Banned word lists are brittle and trivially bypassed. Learning from labelled examples scales to the messy, ever-changing way people actually write. You can always add a rules layer on top for the easy cases.",
    },
    {
      type: "apply",
      title: "Make the call in your own product",
      body: "This decision shows up every time you spec a feature that touches user input, content, classification, or recommendations. You now have a framework for it.",
      roles: [
        {
          role: "Product Manager",
          action:
            "Scan your backlog. For every feature that filters, categorises, or ranks something, ask: is this rules-based or learned? Flag the ones where a hard-coded rule is doing ML's job badly — those are your fastest wins.",
        },
        {
          role: "Founder",
          action:
            "When your first filter breaks — and it will — resist the instinct to write more rules. That is the trap. Start collecting labelled examples immediately so you can switch to learning when the data is ready.",
        },
        {
          role: "Builder",
          action:
            "Next time a stakeholder asks to 'just add a rule for that', use the comparison: is the pattern fixed or fuzzy? If fuzzy, push for examples and a model. That 5-minute conversation saves weeks of brittle rule maintenance.",
        },
        {
          role: "Analyst",
          action:
            "Before building any classification or scoring model, write one sentence: 'The label is X and the inputs are Y.' If you cannot write it clearly, the problem is not ready to be learned from. Do the rules first.",
        },
      ],
      microAction:
        "Pick one feature you are building or using that involves filtering or ranking. Ask Claude: 'Should I use rules or ML for [describe it]? What are the trade-offs?' Use the comparison table from this lesson to evaluate its answer. Notice whether it hedges or gives you a clear recommendation.",
    },
    {
      type: "reflect",
      title: "A new lens on every product decision",
      body: "You now have a question you can ask about any AI feature: is this rules-based or is this learned? Most modern products use both quietly. Next you will learn to talk to a learned system deliberately — through prompting.",
      learned: [
        "Rules work when you can enumerate every case and the logic is fixed.",
        "Machine learning works when the pattern is fuzzy and you have abundant labelled data.",
        "Most production products use both — rules for fixed logic, ML for fuzzy patterns.",
        "The work in ML shifts from writing logic to curating good, representative data.",
        "Ask about any feature: is this rules-based or learned? If rules are doing ML's job, that is a risk.",
      ],
    },
  ],
};
