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
      title: "Two ways to make a computer decide",
      icon: "⚖️",
      body: "For decades software worked one way. A human thought hard, wrote down every rule, and the computer followed them. Machine learning flips this. Instead of writing rules, you show examples and let the machine find the rules itself. Knowing which approach fits a problem is one of the most useful instincts you can build.",
      visual: {
        kind: "comparison",
        leftLabel: "Classical programming",
        leftPoints: [
          "You write every rule by hand",
          "Brittle when edge cases appear",
          "Great for fixed, predictable logic",
        ],
        rightLabel: "Machine learning",
        rightPoints: [
          "Data writes the rules",
          "Adapts when you add new examples",
          "Great for fuzzy, real world patterns",
        ],
      },
    },
    {
      type: "build",
      title: "The rules approach, in plain terms",
      icon: "📋",
      body: "Imagine writing a spam filter by hand. Block anything that says free money. Block anything with too many capital letters. It works for a week. Then spammers write free m0ney, then they change again. You are now trapped writing rules forever, always one step behind. This is the wall classical programming hits with messy real world data.",
      highlights: [
        "You write every rule by hand, and rewrite them when the world changes.",
        "Spammers adapt; your rulebook cannot keep up.",
        "Classical programming hits a wall with messy, constantly changing data.",
      ],
    },
    {
      type: "play",
      title: "Decide it yourself",
      body: "Here are real tasks. For each one, choose whether a human writing rules would win, or whether learning from examples would win. Trust your gut, then check.",
      playgroundId: "rules-vs-ml-sorter",
    },
    {
      type: "checkpoint",
      title: "Spot the pattern",
      question: "Which kind of problem is a poor fit for hand written rules?",
      options: [
        "Calculating sales tax at a fixed percentage",
        "Recognising a cat in any photo, in any lighting",
        "Converting kilometres to miles",
        "Sorting a list of numbers",
      ],
      correctIndex: 1,
      insight:
        "Recognising a cat has no clean rulebook. Fur, angle, and lighting vary endlessly. Examples beat rules whenever the pattern is fuzzy and huge.",
    },
    {
      type: "build",
      title: "The learning approach, in plain terms",
      icon: "🤖",
      body: "With machine learning you collect thousands of labelled examples. This is spam, this is not. The model adjusts itself until its predictions match the labels. Now when spammers change their tricks, you do not rewrite rules. You just add fresh examples and let it adapt. The work shifts from writing logic to collecting good data.",
      highlights: [
        "Collect labelled examples. The model tunes itself to match them.",
        "When reality changes, add fresh examples. No rules to rewrite.",
        "The work shifts from writing logic to curating good data.",
      ],
    },
    {
      type: "play",
      title: "Watch a learned decision form",
      body: "This neuron has learned a churn pattern from data. Move the sliders to see how a learned model weighs evidence, instead of following a rule a person typed.",
      playgroundId: "neuron-sandbox",
      playgroundVariant: "churn",
    },
    {
      type: "checkpoint",
      title: "Where did the logic come from?",
      question: "In machine learning, who decides how much each input matters?",
      options: [
        "A developer types the exact weights by hand",
        "The model learns the weights from labelled examples",
        "The weights are always random",
        "The user sets them every time",
      ],
      correctIndex: 1,
      insight:
        "Training tunes the weights automatically so predictions match reality. You curate the examples. The model finds the rule hidden inside them.",
    },
    {
      type: "build",
      title: "The honest trade off",
      icon: "🎯",
      body: "Rules are predictable, easy to explain, and need no data. Learning handles messiness and scale but needs many examples and can fail in surprising ways. Great engineers do not pick a side. They match the tool to the problem, and often combine both.",
      highlights: [
        "Rules: predictable, explainable, and need zero data.",
        "Learning: handles messiness at scale, but needs many labelled examples.",
        "Great engineers match the tool to the problem, often combining both.",
      ],
      visual: {
        kind: "comparison",
        leftLabel: "Reach for rules when",
        leftPoints: [
          "Logic is fixed (tax rate, currency conversion)",
          "You need full auditability and zero surprises",
          "You have fewer than a few hundred examples",
          "The rules rarely change",
        ],
        rightLabel: "Reach for ML when",
        rightPoints: [
          "Inputs are messy and varied (text, images, user behaviour)",
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
        "Your team must flag toxic comments across millions of posts daily. Best first choice?",
      options: [
        "Hand write a banned word list and stop there",
        "Learn from labelled examples, since language is endlessly varied",
        "Ask a human to read every post",
        "Ignore it, rules are enough",
      ],
      correctIndex: 1,
      insight:
        "Banned word lists are brittle and easy to dodge. Learning from examples scales to the messy, ever changing way people actually write.",
    },
    {
      type: "apply",
      title: "Make the call in your own product",
      body: "This decision comes up every time you spec a feature that touches user input, content moderation, classification, or recommendations. Now you have a framework for it.",
      roles: [
        {
          role: "Product Manager",
          action: "Review your backlog. For every feature that filters, categorises, or ranks content, ask: is this rule-based or learned? Flag the ones where rules are doing ML's job badly — those are your quick wins.",
        },
        {
          role: "Founder",
          action: "When your first filter breaks (and it will), avoid the instinct to write more rules. That is the rules trap. Instead, start collecting labelled examples immediately so you can switch to learning when the data is ready.",
        },
        {
          role: "Builder",
          action: "Next time a stakeholder asks you to 'just add a rule for that', use the comparison table: is the pattern fixed or fuzzy? If fuzzy, push for examples and a model. Saving that conversation now saves weeks later.",
        },
      ],
      microAction:
        "Pick one feature you are building or using that involves filtering or ranking. Ask Claude: 'Should I use rules or ML for [describe it]? What are the trade-offs?' Use the comparison from this lesson to evaluate its answer.",
    },
    {
      type: "reflect",
      title: "A new lens on every product",
      body: "You now have a question you can ask about any feature you use. Is this rules or is this learned? Most modern products quietly use both. Next you will learn to talk to a learned system on purpose, through prompting.",
      learned: [
        "Rules work when you can enumerate every case explicitly.",
        "Machine learning works when the pattern is fuzzy and data is abundant.",
        "Both approaches coexist in most modern products.",
        "The question to ask: is this rules based or is this learned?",
      ],
    },
  ],
};
