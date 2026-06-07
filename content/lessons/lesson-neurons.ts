import type { StructuredLesson } from "@/types/lesson";

export const lessonNeurons: StructuredLesson = {
  id: "neurons",
  slug: "neurons",
  title: "Neurons And Deep Learning",
  hook: "A neural network is stacked prediction units — not a digital brain. Here is what is actually inside.",
  concept: "neural networks",
  durationMinutes: 20,
  pathId: "curious-builders",
  free: false,
  order: 5,
  relatedBlogSlugs: [],
  blocks: [
    {
      type: "hook",
      title: "Every 10x engineer I know says the same thing",
      icon: "🧠",
      body: "The word neural makes people picture a glowing digital brain. Every sharp engineer I know who looks at a neural network for the first time says the same thing: 'That's it?' Yes. That is it. A network is layers of tiny units. Each one multiplies its inputs by learned weights, adds a bias, squashes the result, and passes it on. The wonder is what happens when you stack enough of them with enough data. The machine stops following rules and starts understanding structure.",
      visual: {
        kind: "stats",
        items: [
          { value: "×", label: "multiply inputs by weights" },
          { value: "+", label: "add a bias" },
          { value: "∿", label: "squash and pass on" },
        ],
      },
    },
    {
      type: "play",
      title: "Meet one neuron",
      body: "Switch between scenarios. Watch how the weight amplifies a signal and the bias shifts the starting point before any evidence arrives. This is the entire computation. Get comfortable with it before we stack them.",
      playgroundId: "neuron-sandbox",
      playgroundVariant: "movie",
    },
    {
      type: "checkpoint",
      title: "What does the weight do?",
      question: "In the neuron, raising the weight on an input means",
      options: [
        "the model completely ignores that input from now on",
        "that input has more influence on the final prediction",
        "the input becomes randomised",
        "the bias resets to zero",
      ],
      correctIndex: 1,
      insight:
        "Weight is how much the model listens to an input. Big weight, big influence. Training is the search for the exact weight values that make predictions match reality.",
    },
    {
      type: "build",
      title: "Why the squash function matters",
      icon: "〰️",
      body: "Each neuron ends with a nonlinear squash — like the sigmoid function you ran in lesson one — that flattens any number into a value between zero and one. Without it, stacking a hundred layers would mathematically collapse into a single straight line and gain you nothing. That little bend at the end is the entire reason deep networks can learn curves, corners, and complex decision boundaries at all.",
      highlights: [
        "Without a nonlinear squash, stacking 100 layers collapses to one straight line.",
        "The squash lets a network learn curves and complex decision shapes.",
        "You have already run this function: sigmoid(x) = 1 / (1 + e^−x).",
      ],
    },
    {
      type: "play",
      title: "Run a 2-layer network yourself",
      body: "No libraries. Just arithmetic. This is what 'running a model' actually means: multiply inputs by weights, add bias, squash — repeated across every layer until a prediction emerges. Run it. Change the inputs. Watch both layers shift.",
      playgroundId: "python-sandbox",
      playgroundVariant: "network-forward-pass",
    },
    {
      type: "build",
      title: "Depth builds understanding in layers",
      icon: "📚",
      body: "Early layers learn the simplest pieces — an edge in an image, a hint of tone in a sentence. The next layers combine those into shapes or phrases. Deeper layers combine those into faces or full ideas. Nobody programs this hierarchy. It emerges because each layer can build on the layer below it. The architecture gives the network room to develop its own internal representations.",
      highlights: [
        "Early layers: simple features — edges, tones, frequent word pairs.",
        "Middle layers: shapes, phrases, and combinations of simple features.",
        "Deep layers: faces, concepts, and full ideas — built entirely from the layers below.",
      ],
      visual: {
        kind: "flow",
        steps: [
          { label: "Input", detail: "Raw data" },
          { label: "Layer 1", detail: "Simple features" },
          { label: "Layer 2", detail: "Combinations" },
          { label: "Layer N", detail: "Complex ideas" },
          { label: "Output", detail: "Prediction" },
        ],
      },
    },
    {
      type: "checkpoint",
      title: "Why depth is powerful",
      question: "Deep networks are powerful mainly because",
      options: [
        "they replicate human neurons with biological accuracy",
        "stacked layers compose simple features into progressively complex representations",
        "more layers eliminate the need for training data",
        "they train in a single pass and never need updating",
      ],
      correctIndex: 1,
      insight:
        "The power is in the hierarchy of representations — not biological realism. Simple features combine layer by layer into rich understanding. GPT-4 has hundreds of these layers stacked, each building on the one below.",
    },
    {
      type: "play",
      title: "Find the decision boundary",
      body: "Nudge the sliders until the spam probability crosses 50%. That flip is the model changing its mind. The same idea runs in every large language model — just across billions of dimensions instead of three.",
      playgroundId: "neuron-sandbox",
      playgroundVariant: "spam",
    },
    {
      type: "build",
      title: "How a network learns — the plain picture",
      icon: "🔄",
      body: "It makes a guess, measures how wrong it was, and nudges every weight a tiny amount in the direction that would have reduced the error. Repeat across millions of examples and the weights settle into values that predict well. That feedback nudge is called backpropagation. You need the picture, not the calculus. The picture is: guess → measure → nudge → repeat.",
      highlights: [
        "Make a guess → measure how wrong → nudge weights to reduce the error.",
        "Repeat across millions of examples until weights settle into good values.",
        "That nudge is backpropagation. You need the picture, not the calculus.",
      ],
    },
    {
      type: "checkpoint",
      title: "Under the hood of a language model",
      question: "While you chat with a language model, it is mostly",
      options: [
        "looking up exact answers stored in a database",
        "running learned weights forward to predict the next token probability",
        "rewriting all of its weights after every token it generates",
        "executing grammar rules a human typed into its code",
      ],
      correctIndex: 1,
      insight:
        "It runs the learned network forward to predict the next token, samples one, feeds it back in, and repeats. Training happened earlier. Chatting is inference — prediction at scale with frozen weights.",
    },
    {
      type: "apply",
      title: "What this means when you are choosing or evaluating models",
      body: "You do not need to understand backpropagation to make better decisions. But knowing what depth actually buys you changes how you evaluate model claims and pick tools for your product.",
      roles: [
        {
          role: "Product Manager",
          action:
            "When an engineer says 'we need a bigger model', ask: is our task complex enough to justify more layers, or do we have a data or prompting problem? Bigger models cost more and run slower — make sure the complexity is actually the bottleneck before paying for it.",
        },
        {
          role: "Founder",
          action:
            "Small, focused models often outperform large general ones on specific tasks. Before paying for the biggest model, test a smaller one fine-tuned on your domain. The hierarchy of representations means a model trained on your specific data can beat a general giant.",
        },
        {
          role: "Builder",
          action:
            "When a model underperforms, run this experiment first: keep the model, improve your prompt and input quality, and re-evaluate. Most underperformance is a data or framing problem. Model size is the last thing to change, not the first.",
        },
        {
          role: "Analyst",
          action:
            "Deep learning models learn features automatically — they do not need you to engineer input variables manually. If you are building a model on tabular data, consider whether raw embeddings of text fields could replace carefully hand-crafted features.",
        },
      ],
      microAction:
        "Ask Claude to explain a hard decision step by step, out loud. Watch it build the answer in layers — simple observations first, then combinations, then a conclusion. That layered reasoning is the hierarchy of representations you just learned, running in real time.",
    },
    {
      type: "reflect",
      title: "You have seen the machine",
      body: "Prediction units, weights, bias, the nonlinear squash, depth, and a feedback nudge to learn. That is deep learning without the mystique. Next we face the most important limitation of all — the reason these confident, capable systems sometimes confidently make things up.",
      learned: [
        "A neuron multiplies inputs by weights, adds a bias, and squashes the result.",
        "The nonlinear squash is what lets stacked layers learn complex patterns — without it, depth buys nothing.",
        "Depth = a hierarchy of representations, each layer building on the one below.",
        "Learning = make guesses, measure error, nudge weights. Repeat across millions of examples.",
        "Chatting is inference with frozen weights. Training already happened.",
      ],
    },
  ],
};
