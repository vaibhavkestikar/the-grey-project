import type { StructuredLesson } from "@/types/lesson";

export const lessonNeurons: StructuredLesson = {
  id: "neurons",
  slug: "neurons",
  title: "Neurons and Deep Learning",
  hook: "Every 10x engineer I know says the same thing: once you see how it works, the magic goes away, and the leverage arrives.",
  concept: "neural-networks",
  durationMinutes: 18,
  pathId: "curious-builders",
  free: false,
  order: 5,
  relatedBlogSlugs: [],
  blocks: [
    {
      type: "hook",
      title: "Every 10x engineer says the same thing",
      icon: "⚡",
      body: "The phrase 'neural network' makes people assume they need a neuroscience PhD. They do not. The actual mechanism is three operations that a second-year maths student could implement: multiply each input by a weight, add them up, squash the result into a range. Do that millions of times in sequence, with the right objective function, and you get a system that can read, write, see, and reason. The magic is not in any single part. It is in the composition.",
      visual: {
        kind: "stats",
        items: [
          { value: "3", label: "operations per neuron" },
          { value: "96", label: "layers in GPT-4" },
          { value: "175B", label: "parameters (numbers) total" },
        ],
      },
      deepDive: {
        cta: "The biological inspiration, and why it barely matters",
        content: "Neural networks were inspired by biological neurons, but modern artificial neurons share little with their biological counterparts. Real neurons use spike timing, not continuous activation values. Real brains do not use gradient descent. The 'neural' branding is mostly historical. What matters is the mathematical property that made artificial neurons useful, they are differentiable, meaning you can compute how to improve them via calculus. This differentiability is the actual key ingredient, not the biological analogy. Some researchers prefer the term 'differentiable programs' to 'neural networks' for this reason.",
      },
    },
    {
      type: "play",
      title: "Touch one neuron before reading anything else",
      body: "This is the actual mechanism. One input, one weight, one bias, one squash function. Move the sliders. See the output change. Drag the weight slider all the way negative: watch what happens to the decision. This is GPT-4 at the individual unit level.",
      playgroundId: "neuron-sandbox",
      playgroundVariant: "movie",
      deepDive: {
        cta: "Why the bias term matters more than it looks",
        content: "The bias term is often the least understood component. It sets the decision boundary even when all inputs are zero: it is the model's 'default opinion' before any evidence arrives. Without bias, the decision boundary always passes through the origin, which severely limits what patterns a network can learn. Historically, the perceptron (1950s) had no bias and could only classify linearly separable problems. Adding bias was a simple fix that dramatically expanded what a single neuron could represent. The classic XOR problem, which perceptrons couldn't solve, becomes solvable once bias is included.",
      },
    },
    {
      type: "checkpoint",
      title: "What does weight do?",
      question: "You increase the weight on the 'genre: sci-fi' input from 0.3 to 0.8. What changes?",
      options: [
        "The bias term resets to zero",
        "Sci-fi genre becomes more influential in the final prediction, the neuron trusts that signal more",
        "The neuron ignores all other inputs",
        "The output becomes less probabilistic",
      ],
      correctIndex: 1,
      insight:
        "Weight controls signal strength. A higher weight means this input contributes more to the raw score before squashing. The model learned these weights during training: by seeing millions of examples and adjusting until the predictions were accurate. You just changed a weight by hand that a training algorithm would have found automatically.",
      deepDive: {
        cta: "Why learning is really just calibrating importance",
        content: "Training a neural network is, in abstract terms, finding the right importance weights for each input. This is not fundamentally different from how humans update beliefs: new evidence changes how much we weight different signals. The Bayesian view of learning formalises this: initial weights represent prior beliefs, and gradient descent approximates Bayesian updating across millions of examples. The difference is scale: a human updates beliefs over a lifetime; a network updates across billions of examples in hours. The mechanism differs, but the abstract function: calibrating signal importance based on evidence, is the same.",
      },
    },
    {
      type: "build",
      title: "Why the squash function matters",
      icon: "📐",
      body: "Without the squash function, stacking neurons is useless: a chain of linear operations is still just one linear operation. The squash function introduces non-linearity, and non-linearity is what lets the network learn curves, corners, and complex decision boundaries rather than just straight lines.",
      highlights: [
        "No squash: 100 layers of neurons = 1 matrix multiplication. Literally the same as 1 layer.",
        "With squash: each layer can represent curved decision boundaries that the previous layer cannot",
        "Sigmoid (original): smooth, bounded. Causes vanishing gradients in deep networks.",
        "ReLU (modern): max(0, x). Dead simple. Powers almost everything post-2012.",
      ],
      visual: {
        kind: "callout",
        text: "Non-linearity is the reason deep learning can learn 'deep' structure. Remove it and you have a very expensive linear regression.",
        color: "blue",
      },
      deepDive: {
        cta: "The vanishing gradient problem explained clearly",
        content: "The vanishing gradient problem killed neural networks in the 1990s and was the primary reason deep learning stalled before its revival. Sigmoid's gradient is at most 0.25 (at x=0) and approaches zero at the extremes. In a 10-layer network, gradients are multiplied through 10 layers during backpropagation. With sigmoid, after 10 layers, gradients are at most 0.25^10 ≈ 0.0000001. Early layers stop learning entirely. ReLU avoids this because its gradient is exactly 1 for positive inputs. This seemingly minor change enabled training networks with 100+ layers and made 'deep' learning practically possible.",
      },
    },
    {
      type: "play",
      title: "Run a 2-layer network yourself",
      body: "Two layers. Feed-forward. This is the core of every network ever built: transformer, diffusion model, everything. Run the code. Change a weight. See the output change. You are now running inference on a neural network.",
      playgroundId: "python-sandbox",
      playgroundVariant: "network-forward-pass",
      deepDive: {
        cta: "What a 'parameter' actually is",
        content: "When people say GPT-4 has 175 billion parameters, they mean 175 billion numbers like the weights and biases you just ran. Your 2-layer network has: 2×2 weights in layer 1 + 2 biases + 2 weights in layer 2 + 1 bias = 11 parameters total. GPT-4 has 175 billion. The complexity of modern LLMs comes from very many layers (96 for GPT-4), very wide layers (12,288 neurons per layer), and the attention mechanism which adds a different kind of parameter. But each parameter is ultimately a number, just like the ones you edited.",
      },
    },
    {
      type: "build",
      title: "Depth builds understanding in layers",
      icon: "🏗️",
      body: "A single neuron draws one straight line through input space. Two neurons can combine those lines into an angle. Ten neurons can approximate any curve. Stack layers and you get hierarchical feature detection, the first layer learns raw signal, the second learns combinations of signals, the third learns combinations of combinations, and so on.",
      highlights: [
        "Layer 1 in a vision model: detects edges, blobs, oriented lines",
        "Layer 5: detects textures: scales, fur, grid patterns: by combining earlier features",
        "Layer 20: detects parts: eyes, wheels, windows",
        "Layer 96: detects whole concepts: cats, cars, faces: by composing everything below",
      ],
      visual: {
        kind: "flow",
        steps: [
          { label: "Raw pixels", detail: "16M possible values" },
          { label: "Edges", detail: "learned by layer 1" },
          { label: "Parts", detail: "eyes, wheels" },
          { label: "Concept", detail: "'cat' neuron fires" },
        ],
      },
      deepDive: {
        cta: "What the layers actually learn in image models",
        content: "The layer hierarchy in image models has been visualised directly. Early convolutional layers literally detect oriented edges and blobs: exactly the low-level features you would draw by hand if asked to describe what 'image features' look like. Middle layers detect textures and object parts. Later layers detect whole objects and scenes. Nobody programmed this hierarchy; it emerged from supervised training on images with labels. This is the most direct empirical evidence we have that deep networks genuinely learn structured representations, not just memorise training examples.",
      },
    },
    {
      type: "checkpoint",
      title: "Why depth is powerful",
      question: "Why does stacking more layers allow a network to learn more complex patterns?",
      options: [
        "More layers means more random noise which improves generalisation",
        "Each layer can learn increasingly abstract features built on top of previous layers, composing simple patterns into complex ones",
        "Deeper networks have more neurons so they can simply memorise more data",
        "More layers makes gradient descent run faster",
      ],
      correctIndex: 1,
      insight:
        "Composition is the key idea. The network learns a hierarchy: simple features at the bottom, complex abstractions built from them at the top. This is why 'deep' in deep learning refers to the number of layers, and why shallow networks hit a ceiling that deeper ones can climb past.",
      deepDive: {
        cta: "The depth vs. width question that matters in practice",
        content: "More layers (depth) versus more neurons per layer (width) are two different scaling axes with different tradeoffs. Depth allows learning hierarchical representations. Width allows learning more features at each level of abstraction. Empirically, modern scaling laws (the Chinchilla paper) suggest depth and width should scale together in a specific ratio for optimal compute efficiency. For practitioners, if you are fine-tuning an existing model, do not add layers. That breaks the pretrained architecture. If building from scratch, follow established architectural patterns rather than tuning depth and width independently.",
      },
    },
    {
      type: "play",
      title: "See the decision boundary form",
      body: "Move the sliders. Watch where the model draws its line between two classes. Notice that the line is not straight: it is a curve. That curve is what two layers of neurons bought you over one. More neurons, more curves, more complex separation possible.",
      playgroundId: "neuron-sandbox",
      playgroundVariant: "spam",
      deepDive: {
        cta: "What 'decision boundary' looks like in higher dimensions",
        content: "In the 2D case, the decision boundary is a curve in 2D space separating two classes. In a real spam model with hundreds of input features, the decision boundary is a hypersurface in hundreds of dimensions: impossible to visualise but mathematically identical. This is why ML interpretability tools (SHAP, LIME) exist, they provide local linear approximations of the high-dimensional boundary at any specific input point, translated into human-readable feature importance scores. The decision boundary exists and is meaningful whether or not you can draw it.",
      },
    },
    {
      type: "build",
      title: "How a network learns, the plain picture",
      icon: "🎯",
      body: "Training is not complicated in concept. Show examples. Measure the error. Adjust weights in the direction that reduces error. Repeat 10 billion times. The mechanism that adjusts the weights: gradient descent: computes the exact direction to move every weight to reduce error, using calculus. It sounds simple because it is.",
      highlights: [
        "Forward pass: input flows through the network, produces a prediction",
        "Loss: how wrong was that prediction? (mathematically precise measure)",
        "Backward pass: compute which weights, if changed, would most reduce the loss",
        "Update: move every weight a small step in that direction. Repeat.",
      ],
      visual: {
        kind: "callout",
        text: "Gradient descent is the algorithm that turned 'learn from examples' from a nice idea into a working technology.",
        color: "green",
      },
      deepDive: {
        cta: "Why local optima don't kill training the way textbooks suggest",
        content: "Textbooks warn about gradient descent getting stuck in local optima: valleys in the loss landscape that are not the global minimum. In practice, for large networks, local optima are rarely the problem. Research (notably by Goodfellow and Bengio) shows that for sufficiently large networks, most critical points in the loss landscape are saddle points, not local minima, and gradient descent escapes saddle points quickly. The actual difficulty is that the loss landscape is extremely high-dimensional and gradient descent may take an inefficiently long path to a good solution. This is what techniques like the Adam optimiser and learning rate schedules address.",
      },
    },
    {
      type: "checkpoint",
      title: "Under the hood of a language model",
      question: "A language model generates text token by token. Why does an error in an early token affect the quality of the entire response?",
      options: [
        "The model restarts generation from the beginning after each token",
        "Each new token is conditioned on all previous tokens: an early error shifts the distribution for all subsequent tokens",
        "The model checks each token against a database and rejects unlikely ones",
        "Early tokens are always given higher weight regardless of their content",
      ],
      correctIndex: 1,
      insight:
        "Autoregressive generation compounds errors. If token 5 is slightly wrong, tokens 6-100 are conditioned on a slightly wrong context. This is the root cause of hallucination spirals: where the model starts with a plausible-sounding but false premise and confidently elaborates on it. The architecture makes this inevitable, not accidental.",
      deepDive: {
        cta: "The autoregressive generation problem, and its specific failure modes",
        content: "LLMs generate text autoregressively: one token at a time, each conditioned on all previous tokens. This means errors early in a generation compound, if token 3 is slightly wrong, all subsequent tokens are conditioned on a slightly wrong context. This is the root cause of hallucination spirals: where a model starts with a plausible-sounding but false claim and proceeds to elaborate confidently on it. Beam search and other decoding strategies try to mitigate this by exploring multiple completion paths simultaneously, but autoregressive error compounding is a fundamental property of the architecture, not a bug to be fixed.",
      },
    },
    {
      type: "apply",
      title: "What this means when choosing models",
      body: "Model architecture shapes what a model can and cannot do, regardless of how good the prompt is. Knowing the mechanism tells you where the ceiling is.",
      roles: [
        {
          role: "Product Manager",
          action:
            "The next time you evaluate a model, ask your team, what type of tasks does this architecture excel at? A transformer excels at sequential pattern tasks. It struggles at precise arithmetic and exact lookup. Your feature design should work with the architecture, not against it.",
        },
        {
          role: "Founder",
          action:
            "Model size and capability have a nonlinear relationship. A 7B model performs nearly identically to GPT-4 on simple extraction tasks. For complex multi-step reasoning, larger is genuinely better. Know which category your use case is in before paying for capability you don't need.",
        },
        {
          role: "Builder",
          action:
            "When a feature produces hallucinated output, trace it, is it an early-token error that compounds? Is it a knowledge gap? Is it a misspecified prompt? Knowing how autoregressive generation works lets you diagnose before you iterate blindly.",
        },
        {
          role: "Analyst",
          action:
            "If you are building ML models for tabular data (churn, forecasting, classification), the neural network vs. gradient-boosted tree decision matters. Trees still win on structured tabular data in most benchmarks. Neural networks win when the input is unstructured (text, images) or when you need transfer learning.",
        },
      ],
      microAction:
        "Ask GPT-4 to compute something that requires exact multi-step arithmetic without chain-of-thought. Note the failure. Then add 'think step by step' and rerun. The chain-of-thought prompt forces intermediate token generation that reduces autoregressive error compounding, and you will see the quality jump.",
      deepDive: {
        cta: "The practical guide to 'which model size do I actually need?'",
        content: "The relationship between model size and capability is nonlinear. For simple extraction tasks (pull this field from this document), a 7B model is often indistinguishable from GPT-4. For multi-step reasoning and complex instruction following, larger models are meaningfully better. For tasks requiring knowledge of recent events, model size does not help at all, you need retrieval augmentation. The practical heuristic: test the smallest model first. If it achieves your quality bar, stop there. The cost savings compound at scale. Most teams overbuy model capability by benchmarking with hard examples and shipping for average cases.",
      },
    },
    {
      type: "reflect",
      title: "You have seen the machine",
      body: "Neurons, weights, layers, non-linearity, gradient descent. That is the entire mechanism. Everything else in the field is a variation on these five ideas. Next: why the machine lies sometimes, and how to build systems that catch it.",
      learned: [
        "A neuron: multiply inputs by weights, sum, squash. Three operations. That is it.",
        "Non-linearity (ReLU, GeLU) is what makes stacking layers meaningful: without it, depth buys nothing.",
        "Depth creates feature hierarchy: edges → textures → parts → concepts. Nobody designed this hierarchy. It emerged.",
        "Training = gradient descent: measure error, compute which direction reduces it, step that way. Repeat for billions of examples.",
        "Autoregressive generation compounds errors: early mistakes propagate. This is the mechanical cause of hallucination spirals.",
      ],
      deepDive: {
        cta: "The uncomfortable fact about interpretability",
        content: "Despite knowing the architecture in full: weights, layers, attention, gradient descent: we cannot reliably predict what a specific large network will do on a specific input. Mechanistic interpretability is the field trying to change this, by reverse-engineering what individual neurons and circuits have learned. Some progress has been made: researchers have found neurons that respond to specific concepts like 'base64 encoding' or 'the US president'. But for a 175B parameter model, we are nowhere close to a complete picture. We can build these systems, we can use them, but we cannot yet fully explain them. This is the honest state of the art.",
      },
    },
  ],
};
