export const aiBasicsLabs = [
  {
    id: "neural-network-visualization",
    title: "Neural Network Visualization Lab",
    description: "Explore how neural networks learn through an interactive visualization.",
    moduleId: "neural-networks",
    content: `
# Neural Network Visualization Lab

In this lab, you'll interact with a visual representation of a neural network to understand how these systems learn patterns from data.

## Lab Overview

This interactive visualization allows you to:
- Create a simple neural network with customizable layers and neurons
- Train the network on different datasets
- Observe how the network learns and makes predictions
- Experiment with different parameters and see their effects

## Instructions

### Part 1: Setting Up Your Neural Network

1. Launch the interactive visualization tool
2. Create a neural network with the following configuration:
   - Input layer: 2 neurons
   - Hidden layer: 4 neurons
   - Output layer: 1 neuron
3. Select the "XOR problem" dataset from the dropdown menu
4. Observe the initial state of the network before training

### Part 2: Training Your Network

1. Click the "Train" button to start the training process
2. Observe how the network's predictions change as it learns
3. Pay attention to:
   - How the decision boundary evolves
   - Changes in the connection weights (represented by line thickness)
   - The decreasing error rate shown in the graph

### Part 3: Experimentation

Try modifying different parameters and observe their effects:

1. **Network Architecture**:
   - Add another hidden layer
   - Increase or decrease the number of neurons in the hidden layer
   - How does this affect learning speed and accuracy?

2. **Learning Rate**:
   - Try different learning rates (0.01, 0.1, 0.5)
   - What happens with a very small learning rate?
   - What happens with a very large learning rate?

3. **Different Datasets**:
   - Switch to the "Circular" dataset
   - Switch to the "Spiral" dataset
   - Which network configuration works best for each dataset?

### Part 4: Reflection Questions

After completing your experiments, consider these questions:

1. How did the complexity of the dataset affect the network's ability to learn?
2. What happened when you used too few neurons? Too many?
3. How did the learning rate impact training?
4. What patterns did you notice in how neural networks learn?
5. How might these insights apply to real-world AI applications?

## Key Concepts Illustrated

This lab demonstrates several important neural network concepts:

- **Forward Propagation**: How input signals flow through the network
- **Backpropagation**: How the network learns from errors
- **Gradient Descent**: The optimization process that adjusts weights
- **Overfitting vs. Underfitting**: The balance between model complexity and generalization
- **Hidden Layer Representations**: How networks transform data into useful features

## Extension Activities

If you want to explore further:

1. Try creating a network that can recognize handwritten digits using the MNIST dataset option
2. Experiment with different activation functions and observe their effects
3. Implement a simple neural network using TensorFlow or PyTorch using the provided code templates

## Conclusion

This visualization helps build intuition about how neural networks function. While real-world neural networks are much larger and more complex, the fundamental principles you've observed here apply to sophisticated systems like those powering computer vision, natural language processing, and other AI applications.
    `
  },
  {
    id: "prompt-engineering-lab",
    title: "Prompt Engineering Lab",
    description: "Learn effective techniques for communicating with AI language models.",
    moduleId: "generative-ai",
    content: `
# Prompt Engineering Lab

In this lab, you'll learn and practice effective techniques for communicating with AI language models to get better results.

## Lab Overview

Prompt engineering is the process of crafting inputs to AI systems to get desired outputs. This skill is becoming increasingly important as generative AI tools become more prevalent in education, work, and daily life.

## Instructions

### Part 1: Understanding Prompt Components

Effective prompts often include several key components:

1. **Clear Instructions**: Specific directions about what you want
2. **Context**: Background information the AI needs
3. **Examples**: Demonstrations of desired outputs
4. **Format Specification**: How you want the response structured
5. **Constraints**: Limitations or requirements for the response

### Part 2: Basic Prompt Techniques

Try these basic techniques with an AI assistant of your choice:

1. **Zero-shot prompting**:
   - Ask the AI to perform a task without examples
   - Example: "Explain quantum computing to a 10-year-old."

2. **One-shot prompting**:
   - Provide one example of what you want
   - Example: "Translate text from English to French. Example: 'Hello' → 'Bonjour'. Now translate: 'Good morning'"

3. **Few-shot prompting**:
   - Provide multiple examples to establish a pattern
   - Example: "Classify these sentences as positive or negative. 'I love this movie.' → Positive. 'This food tastes terrible.' → Negative. 'The service was excellent.' →"

### Part 3: Advanced Prompt Engineering

Try these more advanced techniques:

1. **Chain-of-thought prompting**:
   - Ask the AI to show its reasoning step by step
   - Example: "Solve this math problem step by step: If a shirt costs $15 and is discounted by 20%, what is the final price?"

2. **Role prompting**:
   - Ask the AI to adopt a specific perspective or expertise
   - Example: "As an experienced chef, provide tips for cooking the perfect steak."

3. **Structured output**:
   - Request responses in specific formats
   - Example: "List three benefits of exercise in JSON format with keys for 'benefit' and 'explanation'."

### Part 4: Prompt Refinement Challenge

1. Start with a basic prompt related to a topic you're interested in
2. Iteratively improve your prompt based on the responses you receive
3. Document each version of your prompt and the corresponding response
4. Identify which changes led to the most significant improvements

Example refinement sequence:
- Initial: "Tell me about climate change."
- Refined: "Explain the three most significant causes of climate change and their impacts."
- Further refined: "As a climate scientist, explain the three most significant causes of climate change, their impacts, and potential solutions. Format your answer with clear headings and bullet points."

### Part 5: Practical Applications

Try creating effective prompts for these real-world scenarios:

1. **Learning aid**: Create a prompt that helps explain a difficult concept in a way that's easy to understand
2. **Creative writing**: Design a prompt that generates an engaging short story with specific elements
3. **Problem solving**: Craft a prompt that helps break down a complex problem into manageable steps
4. **Information synthesis**: Develop a prompt that compares and contrasts different perspectives on a topic

### Part 6: Reflection Questions

After completing the exercises, consider these questions:

1. Which prompt techniques were most effective for different types of tasks?
2. What patterns did you notice in how the AI responds to different prompts?
3. How might you apply these techniques in your studies or work?
4. What ethical considerations should you keep in mind when using AI assistants?

## Key Concepts Illustrated

This lab demonstrates several important concepts:

- **Context sensitivity**: How providing background information improves responses
- **Instruction clarity**: The importance of specific, unambiguous directions
- **Example power**: How examples guide the AI's understanding of your intent
- **Iterative refinement**: The process of improving prompts based on responses

## Conclusion

Prompt engineering is both an art and a science. As you practice these techniques, you'll develop a better intuition for how to effectively communicate with AI systems. This skill will become increasingly valuable as AI tools continue to evolve and integrate into various aspects of education and work.
    `
  },
  {
    id: "ai-ethics-case-study-lab",
    title: "AI Ethics Case Study Lab",
    description: "Analyze real-world ethical dilemmas in AI applications.",
    moduleId: "ai-ethics",
    content: `
# AI Ethics Case Study Lab

In this lab, you'll analyze real-world ethical dilemmas in AI applications and develop frameworks for addressing them.

## Lab Overview

Ethical considerations are crucial in the development and deployment of AI systems. This lab presents several case studies that highlight ethical challenges and asks you to apply ethical reasoning to complex situations.

## Instructions

### Part 1: Understanding Ethical Frameworks

Before analyzing the case studies, familiarize yourself with these ethical frameworks:

1. **Utilitarianism**: Maximizing overall benefit and minimizing harm
2. **Deontology**: Following moral rules and duties regardless of consequences
3. **Virtue Ethics**: Developing and acting from virtuous character traits
4. **Justice and Fairness**: Ensuring equitable distribution of benefits and harms
5. **Autonomy**: Respecting individuals' right to make their own decisions

### Part 2: Case Study Analysis

For each case study:
1. Identify the key stakeholders
2. List the potential benefits and harms
3. Analyze the ethical issues using multiple frameworks
4. Propose solutions that address the ethical concerns
5. Consider how your solution might be implemented in practice

## Case Study 1: Predictive Policing

**Scenario**: A city is implementing an AI system that predicts where crimes are likely to occur based on historical crime data. Police resources will be allocated based on these predictions.

**Ethical Questions**:
- Could this system perpetuate existing biases in policing?
- How might this affect different communities?
- What oversight mechanisms should be in place?
- How should the system's effectiveness be measured?

## Case Study 2: Healthcare Diagnosis

**Scenario**: A hospital is implementing an AI diagnostic system that analyzes medical images to detect diseases. The system performs better than the average radiologist but occasionally misses conditions that human doctors would catch.

**Ethical Questions**:
- Who is responsible if the AI misses a diagnosis?
- How should patients be informed about AI involvement in their care?
- What level of human oversight is appropriate?
- How should the system be tested and validated before deployment?

## Case Study 3: Automated Hiring

**Scenario**: A large company uses an AI system to screen job applicants by analyzing resumes, video interviews, and online assessments. The system was trained on data from previously successful employees.

**Ethical Questions**:
- How might this system affect diversity in hiring?
- What transparency should be provided to applicants?
- How can the company ensure the system doesn't discriminate?
- What appeals process should be available to rejected candidates?

## Case Study 4: Content Moderation

**Scenario**: A social media platform uses AI to automatically detect and remove harmful content, including hate speech, harassment, and misinformation.

**Ethical Questions**:
- How should the platform balance free expression with harm prevention?
- What role should humans play in the moderation process?
- How should the system handle content that's culturally specific or contextual?
- What recourse should users have if their content is incorrectly removed?

### Part 3: Developing Ethical Guidelines

Based on your analysis of the case studies, develop a set of ethical guidelines for AI development and deployment. Your guidelines should:

1. Address key ethical principles (fairness, transparency, accountability, etc.)
2. Provide practical guidance for developers and organizations
3. Include mechanisms for oversight and evaluation
4. Consider diverse stakeholder perspectives

### Part 4: Reflection Questions

After completing the case studies and guidelines, consider these questions:

1. How did different ethical frameworks lead to different conclusions?
2. What tensions or trade-offs did you identify between different ethical principles?
3. How might cultural or contextual factors affect ethical analysis of AI systems?
4. What role should different stakeholders (developers, users, regulators, etc.) play in ensuring ethical AI?

## Key Concepts Illustrated

This lab demonstrates several important concepts:

- **Ethical Complexity**: The multifaceted nature of ethical dilemmas in AI
- **Stakeholder Analysis**: Identifying who is affected by AI systems
- **Trade-off Evaluation**: Balancing competing values and priorities
- **Practical Ethics**: Moving from abstract principles to concrete guidelines

## Conclusion

Ethical analysis is not about finding perfect solutions but about thoughtfully navigating complex issues. As AI becomes more prevalent, the ability to identify and address ethical concerns will be crucial for developing systems that benefit humanity while minimizing harm.
    `
  },
  {
    id: "ai-application-design-lab",
    title: "AI Application Design Lab",
    description: "Design an AI solution for a real-world problem.",
    moduleId: "ai-applications",
    content: `
# AI Application Design Lab

In this lab, you'll design an AI solution for a real-world problem, considering technical requirements, ethical implications, and practical constraints.

## Lab Overview

Designing effective AI applications requires balancing technical capabilities with human needs and ethical considerations. This lab will guide you through the process of conceptualizing and planning an AI solution.

## Instructions

### Part 1: Problem Identification

1. Choose a problem domain from the list below or propose your own:
   - Education: Improving personalized learning
   - Healthcare: Enhancing early disease detection
   - Environment: Reducing energy consumption
   - Accessibility: Assisting people with disabilities
   - Transportation: Optimizing traffic flow
   - Agriculture: Improving crop yields while reducing resource use

2. Define the specific problem:
   - Who is affected by this problem?
   - What are the current approaches to addressing it?
   - Why might AI be helpful in this context?
   - What are the key challenges or constraints?

### Part 2: Solution Conceptualization

Design an AI solution that addresses your chosen problem:

1. **Core Functionality**:
   - What will your AI system do?
   - What type of AI approach would be most appropriate (e.g., machine learning, computer vision, NLP)?
   - What inputs will the system need?
   - What outputs will it produce?

2. **User Experience**:
   - Who will use your system?
   - How will users interact with it?
   - What interface would be most appropriate?
   - How will you ensure the system is accessible and user-friendly?

3. **Technical Requirements**:
   - What data would you need to train or operate the system?
   - What computing resources would be required?
   - How would the system integrate with existing technologies or workflows?
   - What technical challenges do you anticipate?

### Part 3: Ethical Analysis

Conduct an ethical analysis of your proposed solution:

1. **Stakeholder Impact**:
   - Who will be affected by this system, directly or indirectly?
   - How might different groups be impacted differently?
   - Are there potential unintended consequences?

2. **Ethical Principles**:
   - Fairness: Could the system create or reinforce inequities?
   - Transparency: How will users understand what the system is doing?
   - Privacy: What data will be collected and how will it be protected?
   - Autonomy: How will human agency and decision-making be preserved?
   - Accountability: Who is responsible if something goes wrong?

3. **Mitigation Strategies**:
   - How will you address the ethical concerns you've identified?
   - What safeguards or oversight mechanisms will you implement?
   - How will you evaluate the system's impact over time?

### Part 4: Implementation Planning

Create a high-level plan for developing and deploying your solution:

1. **Development Phases**:
   - What are the key milestones in building this system?
   - How would you test and validate the system?
   - What expertise would be needed on the development team?

2. **Deployment Strategy**:
   - How would you introduce the system to users?
   - What training or support would users need?
   - How would you monitor and evaluate the system's performance?

3. **Sustainability Plan**:
   - How would the system be maintained and updated over time?
   - What ongoing resources would be required?
   - How would you ensure the system remains effective as conditions change?

### Part 5: Presentation

Create a presentation of your AI solution design that includes:

1. Problem statement and background
2. Solution overview and key features
3. Technical approach and requirements
4. Ethical considerations and safeguards
5. Implementation and deployment plan
6. Expected benefits and potential challenges

### Part 6: Peer Review

If working in a group or class setting:
1. Share your design with peers
2. Provide constructive feedback on others' designs
3. Incorporate feedback to improve your own design

### Part 7: Reflection Questions

After completing your design, consider these questions:

1. How did considering ethical implications influence your technical design choices?
2. What trade-offs did you identify between different design goals (e.g., accuracy vs. explainability)?
3. What aspects of your design would be most challenging to implement?
4. How might your solution evolve as AI capabilities advance?

## Key Concepts Illustrated

This lab demonstrates several important concepts:

- **Human-Centered Design**: Focusing on human needs and experiences
- **Ethical Integration**: Building ethical considerations into the design process
- **Technical Feasibility**: Balancing ambition with practical constraints
- **Systems Thinking**: Considering how AI solutions fit into broader contexts

## Conclusion

Designing effective AI applications requires more than technical expertise—it demands careful consideration of human factors, ethical implications, and practical constraints. By practicing this holistic design approach, you'll be better prepared to create AI solutions that are not only technically sound but also beneficial, fair, and responsible.
    `
  },
  {
    id: "ai-evaluation-lab",
    title: "AI System Evaluation Lab",
    description: "Learn how to systematically evaluate AI tools and systems.",
    moduleId: "evaluating-ai",
    content: `
# AI System Evaluation Lab

In this lab, you'll learn how to systematically evaluate AI tools and systems using structured frameworks and criteria.

## Lab Overview

As AI systems become more prevalent, the ability to critically evaluate them becomes increasingly important. This lab provides frameworks and practical experience in assessing AI tools across multiple dimensions.

## Instructions

### Part 1: Evaluation Framework

Familiarize yourself with this comprehensive AI evaluation framework:

1. **Performance and Accuracy**
   - How well does the system perform its intended function?
   - What is its error rate and what types of errors does it make?
   - How consistent is its performance across different inputs?

2. **Fairness and Bias**
   - Does the system perform equally well for different demographic groups?
   - Are there patterns in its errors that disproportionately affect certain groups?
   - Has it been tested across diverse scenarios and populations?

3. **Transparency and Explainability**
   - Can the system explain its decisions or outputs?
   - Is documentation available about how the system works?
   - Are limitations clearly communicated?

4. **Privacy and Security**
   - How is user data collected, stored, and used?
   - What security measures protect the system and its data?
   - Can users control their data and how it's used?

5. **User Experience and Accessibility**
   - How intuitive and usable is the system?
   - Is it accessible to people with different abilities?
   - Does it meet users' needs effectively?

6. **Resource Requirements**
   - What computational resources does the system require?
   - What is its environmental impact?
   - What are the financial costs of using and maintaining it?

### Part 2: Hands-on Evaluation

Choose one AI system from each category to evaluate:

**Category A: Language Models**
- ChatGPT
- Claude
- Bard/Gemini
- Llama

**Category B: Image Generation**
- DALL-E
- Midjourney
- Stable Diffusion
- Adobe Firefly

**Category C: Productivity Tools**
- Grammarly
- Otter.ai
- Notion AI
- GitHub Copilot

For each system you choose:

1. Spend at least 30 minutes using the system for its intended purpose
2. Document your observations using the evaluation framework
3. Assign ratings (1-5) for each criterion in the framework
4. Note specific examples that support your assessment

### Part 3: Comparative Analysis

After evaluating systems from each category:

1. Create a comparison table showing the strengths and weaknesses of each system
2. Identify patterns in what makes certain AI systems more effective than others
3. Consider how different use cases might prioritize different evaluation criteria
4. Recommend which system would be best for specific scenarios

### Part 4: Ethical Audit

For one of the systems you evaluated:

1. Conduct a deeper ethical audit considering:
   - Potential for misuse or harm
   - Accessibility and equity concerns
   - Environmental impact
   - Privacy implications
   - Transparency of development and operation
   - Accountability mechanisms

2. Document:
   - Ethical strengths of the system
   - Ethical concerns or risks
   - Recommendations for improvement

### Part 5: User Testing Design

Design a user testing protocol for one of your evaluated systems:

1. Define 3-5 specific tasks that would test the system's capabilities
2. Create a diverse set of test cases that might reveal limitations or biases
3. Develop metrics to measure performance across different dimensions
4. Design a feedback collection method for qualitative assessment

### Part 6: Reflection Questions

After completing the evaluations, consider these questions:

1. What patterns did you notice across different AI systems?
2. How did your expectations compare to your actual experience?
3. What evaluation criteria seemed most important for different types of AI systems?
4. How might evaluation frameworks need to evolve as AI systems become more advanced?
5. What role should different stakeholders (developers, users, regulators) play in AI evaluation?

## Key Concepts Illustrated

This lab demonstrates several important concepts:

- **Multi-dimensional Evaluation**: Assessing AI beyond just technical performance
- **Comparative Analysis**: Understanding relative strengths and weaknesses
- **Ethical Auditing**: Systematically examining ethical implications
- **User-Centered Assessment**: Considering the human experience of AI systems

## Conclusion

Effective evaluation of AI systems requires a structured approach that considers multiple dimensions. By practicing systematic evaluation, you'll be better equipped to make informed decisions about which AI tools to use, how to use them responsibly, and how they might be improved.
    `
  }
];
