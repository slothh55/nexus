import { Course } from "../courses";

export const aiBasicsCourse: Course = {
  id: "ai-basics",
  title: "AI Basics: Understanding Artificial Intelligence",
  description: "Explore the fascinating world of artificial intelligence and learn how it works in a fun and engaging way!",
  category: "Artificial Intelligence",
  level: "beginner",
  duration: "2 hours",
  tags: ["AI", "Technology", "Machine Learning", "Digital Literacy"],
  icon: "Bot",
  color: "bg-amber-500/10 text-amber-500",
  learningPathId: "ai-adventurer",
  relatedQuizzes: ["ai-basics-quiz"],
  modules: [
    {
      id: "what-is-ai",
      title: "What is Artificial Intelligence?",
      description: "Learn the basics of AI and how it's different from regular computer programs.",
      duration: "20 minutes",
      type: "text",
      content: `# What is Artificial Intelligence?

Artificial Intelligence (AI) is like teaching computers to think and learn in ways that are similar to how humans think and learn. But instead of a brain, AI uses math, data, and special instructions called algorithms.

## Understanding AI: The Basics

Imagine you're teaching a friend how to identify dogs. You might show them pictures of different dogs and point out things like "dogs have four legs," "dogs have tails," and "dogs bark." After seeing enough examples, your friend can recognize a dog even if they've never seen that specific dog before.

AI works in a similar way! We "teach" computers by giving them:
- Lots of examples (data)
- Rules for learning from those examples (algorithms)
- Ways to make decisions based on what they've learned (models)

## How is AI Different from Regular Computer Programs?

Regular computer programs follow exact instructions. They do exactly what they're told to do, step by step, like following a recipe.

AI programs are different because they can:
- Learn from examples
- Make predictions about new situations
- Improve over time without being explicitly reprogrammed
- Handle situations they weren't specifically programmed for

## Types of AI You Might Already Know

You probably use AI every day without realizing it! Here are some examples:

- **Virtual Assistants**: Siri, Alexa, and Google Assistant use AI to understand your questions and give helpful answers.
- **Recommendations**: When Netflix suggests shows you might like or Spotify creates a playlist for you, that's AI at work!
- **Games**: Many video games use AI to control characters that aren't played by humans.
- **Social Media**: AI helps decide which posts show up in your feed and filters out inappropriate content.
- **Smart Home Devices**: AI helps your smart thermostat learn when to adjust the temperature based on your habits.

## Activity: AI or Not AI?

For each of the following, think about whether it uses AI or if it's just a regular computer program:

1. A calculator app
2. A chess game that adapts to your skill level
3. A timer that counts down from 10 minutes
4. A photo app that automatically identifies and groups pictures of your friends
5. A weather app that shows the forecast

Answers:
1. Not AI - follows fixed rules for calculations
2. AI - learns and adapts to your playing style
3. Not AI - follows a simple countdown procedure
4. AI - learns to recognize faces and patterns
5. Depends! If it just displays data from a weather service, it's not AI. If it learns patterns to make its own predictions, it could be using AI.

## Understanding Level Check

- Can you explain in your own words what makes AI different from regular computer programs?
- Can you think of three examples of AI that you might use in your daily life?
- Why do you think AI needs lots of examples (data) to learn?`
    },
    {
      id: "how-ai-learns",
      title: "How AI Learns: Training and Data",
      description: "Discover how AI systems learn from data and get trained to perform tasks.",
      duration: "25 minutes",
      type: "interactive",
      content: `# How AI Learns: Training and Data

Just like you learn from experience, AI learns from data. Let's explore how this works!

## The Importance of Data

Data is the foundation of AI learning. Think of data as the "experiences" that help AI learn:

- **More Data = Better Learning**: Generally, the more examples an AI system sees, the better it gets at its task.
- **Quality Matters**: Good, accurate data leads to better AI. Messy or biased data can teach AI the wrong lessons.
- **Diverse Data**: AI needs to see many different examples to learn well. Limited examples lead to limited understanding.

## How AI Training Works

AI training is like teaching a student through examples and feedback:

1. **Gathering Data**: First, we collect lots of examples related to what we want the AI to learn.
2. **Preparing the Data**: We organize and clean the data to make it useful for learning.
3. **Training**: The AI looks at the examples and tries to find patterns.
4. **Testing**: We check if the AI has learned correctly by giving it new examples it hasn't seen before.
5. **Refinement**: We make adjustments to help the AI learn better and fix mistakes.

## Types of AI Learning

AI can learn in different ways:

- **Supervised Learning**: We give the AI examples with correct answers. Like a teacher showing flashcards with the answers on the back.
- **Unsupervised Learning**: The AI looks for patterns on its own without being told the "right answers."
- **Reinforcement Learning**: The AI learns by trial and error, getting "rewards" for good decisions and "penalties" for mistakes.

## Interactive Example: Teaching AI to Recognize Fruits

Imagine we're training an AI to identify fruits in pictures:

1. **Data Collection**: We gather thousands of pictures of different fruits (apples, bananas, oranges, etc.).
2. **Labeling**: We label each picture ("this is an apple," "this is a banana").
3. **Training**: The AI analyzes the pictures, learning what makes an apple look like an apple and a banana look like a banana.
4. **Testing**: We show the AI new fruit pictures it hasn't seen before to see if it can identify them correctly.
5. **Improvement**: If the AI confuses oranges with grapefruits, we give it more examples of each to help it learn the differences.

## Why AI Sometimes Makes Mistakes

AI systems aren't perfect. They can make mistakes for several reasons:

- **Limited Data**: If the AI hasn't seen enough examples, it might not recognize unusual cases.
- **Biased Data**: If the training data is biased, the AI will learn those same biases.
- **Overfitting**: Sometimes AI gets too focused on the specific examples it was trained on and doesn't generalize well to new situations.
- **Changing Environments**: The world changes, but AI only knows what it was trained on.

## Activity: Design Your Own AI Training

Imagine you want to create an AI that can tell the difference between dogs and cats:

1. What kind of data would you need to collect?
2. How many examples do you think would be necessary?
3. What features might the AI learn to look at to tell dogs and cats apart?
4. What mistakes might your AI make if you only showed it pictures of large dogs and small cats?

## Apply Level Check

- Can you explain the basic steps of how AI systems are trained?
- Why is diverse data important for training AI?
- What might happen if an AI system is trained only on a limited set of examples?`
    },
    {
      id: "ai-in-everyday-life",
      title: "AI in Everyday Life",
      description: "Explore how AI is used in the world around you, from smartphones to smart cities.",
      duration: "30 minutes",
      type: "text",
      content: `# AI in Everyday Life

Artificial Intelligence is all around us, even when we don't notice it! Let's explore how AI is part of our daily lives and how it helps solve problems.

## AI in Your Pocket: Smartphones

Your smartphone is packed with AI features:

- **Voice Assistants**: Siri, Google Assistant, and others use natural language processing (a type of AI) to understand your questions and commands.
- **Cameras**: AI enhances your photos, recognizes faces, and applies special effects.
- **Predictive Text**: AI predicts what you're going to type next, making messaging faster.
- **Maps and Navigation**: AI helps calculate the fastest routes and estimates arrival times based on traffic patterns.
- **Health Apps**: AI can track your activity, sleep patterns, and even detect unusual health patterns.

## AI at Home

Smart homes use AI in many ways:

- **Smart Speakers**: Devices like Amazon Echo and Google Home use AI to understand your voice commands.
- **Thermostats**: Smart thermostats learn your preferences and adjust temperatures automatically.
- **Security Systems**: AI-powered cameras can recognize familiar faces and alert you to strangers.
- **Robot Vacuums**: These use AI to navigate your home and learn its layout.
- **Smart Appliances**: From refrigerators that track food inventory to washing machines that optimize water usage.

## AI in School and Learning

Education is being transformed by AI:

- **Personalized Learning**: AI can adapt lessons to your learning style and pace.
- **Tutoring Systems**: AI tutors can provide extra help in subjects you find challenging.
- **Grading and Feedback**: Some systems use AI to grade assignments and provide feedback.
- **Language Learning**: Apps like Duolingo use AI to customize language lessons.
- **Research Tools**: AI helps summarize information and find relevant sources.

## AI in Entertainment

Your favorite entertainment often involves AI:

- **Streaming Services**: Netflix, Spotify, and others use AI to recommend movies, shows, and music.
- **Video Games**: AI controls non-player characters and adapts game difficulty.
- **Social Media**: AI curates your feed, suggests friends, and filters content.
- **Content Creation**: AI helps create special effects in movies and can even generate music.
- **Sports**: AI analyzes player performance and helps with training strategies.

## AI in Healthcare

AI is making healthcare better:

- **Diagnosis**: AI can help doctors identify diseases from medical images.
- **Drug Discovery**: AI speeds up the process of developing new medicines.
- **Patient Monitoring**: AI systems can track patient vital signs and alert doctors to changes.
- **Personalized Medicine**: AI helps determine which treatments might work best for specific patients.
- **Mental Health**: AI chatbots provide support and resources for mental health concerns.

## AI in Transportation

Getting around is changing thanks to AI:

- **Navigation Apps**: AI predicts traffic patterns and suggests faster routes.
- **Ride-Sharing**: Companies like Uber use AI to match drivers with riders and optimize routes.
- **Self-Driving Vehicles**: Cars, buses, and delivery vehicles are beginning to use AI to navigate.
- **Traffic Management**: Smart cities use AI to control traffic lights and reduce congestion.
- **Public Transportation**: AI helps schedule buses and trains more efficiently.

## Activity: AI Scavenger Hunt

Over the next day, try to identify at least 5 examples of AI that you interact with. For each one:
1. What does it do?
2. How does it use AI?
3. How does it make your life easier or better?
4. Could there be any downsides to this AI application?

## Create Level Check

- Can you identify at least three ways AI is used in your daily life?
- How might AI be used in your school or home in the future?
- What's one problem in your community that AI might help solve?`
    },
    {
      id: "generative-ai-intro",
      title: "Introduction to Generative AI",
      description: "Learn about AI that can create text, images, music, and more.",
      duration: "25 minutes",
      type: "video",
      videoId: "OVA3Vb5Org8", // "What is Generative AI?" by Simplilearn (educational content)
      content: `# Introduction to Generative AI

Generative AI is a special type of artificial intelligence that can create new content like text, images, music, and videos. It's one of the most exciting and rapidly developing areas of AI technology!

## What Makes Generative AI Special?

Most AI systems we've discussed so far are designed to analyze or classify existing information. Generative AI is different because it can create brand new content that didn't exist before.

Think of it this way:
- Regular AI might look at a photo and tell you "This is a cat."
- Generative AI can create a brand new image of a cat based on what it's learned about what cats look like.

## Popular Types of Generative AI

Generative AI comes in many forms:

- **Text Generators**: Systems like ChatGPT can write stories, answer questions, create poems, and even help with homework.
- **Image Generators**: Tools like DALL-E, Midjourney, and Stable Diffusion can create images based on text descriptions.
- **Music Creators**: AI can compose new songs in different styles and even mimic famous musicians.
- **Video Generators**: Emerging technologies can create short videos or animations from text prompts.
- **Code Writers**: Some AI can write computer code based on descriptions of what the program should do.

## How Generative AI Works

Generative AI works by learning patterns from massive amounts of existing content:

1. **Training**: The AI studies millions of examples (like books, articles, images, or songs).
2. **Pattern Recognition**: It learns the patterns, styles, and structures in that content.
3. **Generation**: When given a prompt or starting point, it creates new content following those learned patterns.

Generative AI uses special models called "large language models" (for text) or "diffusion models" (for images) that are trained on enormous datasets.

## Responsible Use of Generative AI

With great power comes great responsibility! Generative AI raises important ethical considerations:

- **Copyright and Ownership**: Who owns AI-generated content? The person who prompted it, the AI creators, or the artists whose work trained the AI?
- **Misinformation**: Generative AI can create convincing fake news, images, or videos.
- **Bias and Representation**: AI can reflect or amplify biases present in its training data.
- **Authenticity**: As AI-generated content becomes more common, how do we know what's made by humans vs. AI?
- **Creative Jobs**: How will generative AI affect artists, writers, musicians, and other creative professionals?

## Guidelines for Using Generative AI

When using generative AI, remember these important guidelines:

1. **Be honest**: Always disclose when content is AI-generated.
2. **Verify information**: Don't trust AI-generated content without fact-checking.
3. **Respect copyright**: Understand the terms of service for AI tools you use.
4. **Use human judgment**: AI is a tool to enhance human creativity, not replace it.
5. **Consider impact**: Think about how your use of AI might affect others.

## Activity: Exploring Generative AI Responsibly

In this video, you'll see examples of generative AI in action. As you watch:
1. Notice the different types of content AI can generate
2. Think about how you can tell if something was created by AI
3. Consider both the benefits and potential concerns of this technology

After watching, reflect on:
- What surprised you most about generative AI?
- What's one way you might use generative AI responsibly?
- What's one concern you have about this technology?

## Understanding Level Check

- Can you explain what makes generative AI different from other types of AI?
- What are two ethical considerations when using generative AI?
- Why is it important to disclose when content is AI-generated?`
    },
    {
      id: "ai-ethics-intro",
      title: "Introduction to AI Ethics",
      description: "Explore the ethical considerations of AI technology and why responsible use matters.",
      duration: "30 minutes",
      type: "interactive",
      content: `# Introduction to AI Ethics

As AI becomes more powerful and common in our lives, it's important to think about how to use it responsibly. AI ethics helps us understand the right and wrong ways to create and use AI technology.

## Why AI Ethics Matters

AI systems can affect people's lives in significant ways:

- They can determine who gets a loan or job interview
- They can influence what information we see online
- They can make decisions about healthcare or education
- They can create or spread information that might not be true

Because AI has such important impacts, we need to make sure it's designed and used in ways that are fair, helpful, and respectful of human rights.

## Key Ethical Principles for AI

Here are some important principles for responsible AI:

### 1. Fairness and Non-discrimination
AI should treat all people fairly and not discriminate based on race, gender, age, or other characteristics. This means:
- Training data should represent diverse groups
- AI systems should be tested for bias
- Results should be checked to ensure they're fair for everyone

### 2. Transparency and Explainability
People should understand when they're interacting with AI and how it makes decisions:
- It should be clear when AI is being used
- The way AI makes decisions should be explainable
- People should know what data is being used

### 3. Privacy and Data Protection
AI often uses personal data, which must be protected:
- Only necessary data should be collected
- Data should be stored securely
- People should have control over their personal information

### 4. Safety and Security
AI systems should be safe and secure:
- They should be thoroughly tested before release
- They should have safeguards against misuse
- They should be regularly monitored for problems

### 5. Human Oversight and Control
Humans should maintain appropriate control over AI systems:
- Important decisions should have human oversight
- People should be able to appeal AI decisions
- AI should enhance human capabilities, not replace human judgment

### 6. Accountability
Those who create and deploy AI should be responsible for its impacts:
- Clear responsibility for AI systems should be established
- There should be ways to address problems when they occur
- Harmful impacts should be prevented or minimized

## Ethical Dilemmas in AI

Sometimes there are difficult ethical questions without easy answers:

**Scenario 1: AI in Schools**
An AI system can predict which students might struggle academically. This could help teachers provide extra support, but it might also label students unfairly or limit their opportunities.

**Scenario 2: AI Content Filters**
An AI content filter can block harmful material online, protecting users. But who decides what content should be blocked? The filter might also accidentally block important educational content.

**Scenario 3: AI Healthcare Decisions**
An AI system can help doctors diagnose diseases, potentially saving lives. But what if the AI makes a mistake? Who is responsible - the doctor, the AI developers, or someone else?

## Activity: Ethical Decision-Making

For each scenario below, think about the ethical principles involved and what you would recommend:

1. Your school wants to use AI to monitor students' social media to prevent bullying.
   - What ethical principles are involved?
   - What benefits and concerns do you see?
   - What guidelines would you recommend?

2. A company creates an AI that can perfectly mimic anyone's voice after hearing them speak for just one minute.
   - What positive uses might this technology have?
   - What potential misuses concern you?
   - Should this technology be restricted? How?

3. An AI system helps decide which students get accepted to a special program, but it's noticed that certain groups of students are rarely selected.
   - What might be causing this problem?
   - How could the system be improved?
   - Who should be responsible for fixing the issue?

## Apply Level Check

- Can you identify at least three ethical principles that should guide AI development?
- Why is diverse training data important for creating fair AI systems?
- What questions would you ask before using an AI tool to make sure you're using it responsibly?`
    },
    {
      id: "ai-basics-quiz",
      title: "AI Basics Quiz",
      description: "Test your knowledge of AI fundamentals and ethics.",
      duration: "15 minutes",
      type: "quiz",
      content: `# AI Basics Quiz

Test your understanding of artificial intelligence concepts and ethics with this quiz!

## Questions

1. **What makes AI different from traditional computer programs?**
   - A) AI runs faster than traditional programs
   - B) AI can learn from data and improve over time
   - C) AI only works on special computers
   - D) AI always requires internet connection

   *Answer: B) AI can learn from data and improve over time*

2. **Which of these is an example of AI in everyday life?**
   - A) A calculator app that adds numbers
   - B) A website that displays the same content for all users
   - C) A music streaming service that recommends songs based on your listening history
   - D) A digital clock that shows the current time

   *Answer: C) A music streaming service that recommends songs based on your listening history*

3. **What is "training data" in the context of AI?**
   - A) Instructions that programmers write for the AI
   - B) Examples that help the AI learn patterns and make predictions
   - C) The final output that the AI produces
   - D) The hardware that runs the AI program

   *Answer: B) Examples that help the AI learn patterns and make predictions*

4. **What is generative AI?**
   - A) AI that can create new content like text, images, or music
   - B) AI that only works on generating electricity
   - C) AI that can only identify objects in images
   - D) AI that generates money through stock market predictions

   *Answer: A) AI that can create new content like text, images, or music*

5. **Why is diverse training data important for AI systems?**
   - A) It makes the AI run faster
   - B) It helps the AI work in different countries
   - C) It helps ensure the AI works fairly for different groups of people
   - D) It makes the AI more expensive to develop

   *Answer: C) It helps ensure the AI works fairly for different groups of people*

6. **Which of these is an ethical concern related to AI?**
   - A) AI systems use too much electricity
   - B) AI might reflect or amplify biases present in training data
   - C) AI is too difficult for most people to use
   - D) AI software is too expensive for schools

   *Answer: B) AI might reflect or amplify biases present in training data*

7. **What does "transparency" mean in AI ethics?**
   - A) AI systems should be invisible to users
   - B) AI should be clear about when it's being used and how it makes decisions
   - C) AI code should be available to everyone
   - D) AI should only use public data

   *Answer: B) AI should be clear about when it's being used and how it makes decisions*

8. **Which type of AI learning involves giving the AI examples with correct answers?**
   - A) Unsupervised learning
   - B) Reinforcement learning
   - C) Supervised learning
   - D) Independent learning

   *Answer: C) Supervised learning*

9. **When using generative AI tools, what's an important guideline to follow?**
   - A) Always claim the output as your own original work
   - B) Only use them for entertainment, never for education
   - C) Be honest and disclose when content is AI-generated
   - D) Keep your use of AI tools secret from others

   *Answer: C) Be honest and disclose when content is AI-generated*

10. **What role should humans have in AI systems that make important decisions?**
    - A) Humans should be completely replaced by AI for better efficiency
    - B) Humans should maintain oversight and be able to review AI decisions
    - C) Humans should only be involved if the AI makes a mistake
    - D) Humans should only design the AI but never interfere with its operation

    *Answer: B) Humans should maintain oversight and be able to review AI decisions*

## How did you do?

- **8-10 correct**: Excellent! You have a strong understanding of AI basics and ethics.
- **5-7 correct**: Good job! You understand the fundamentals but might want to review some concepts.
- **0-4 correct**: You're just getting started with AI concepts. Try reviewing the modules again!`
    }
  ]
};
