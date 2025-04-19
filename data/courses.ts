// Course data structure
export interface Course {
  id: string
  title: string
  description: string
  category: string
  level: 'beginner' | 'intermediate' | 'advanced'
  duration: string // e.g., "2 hours"
  modules: CourseModule[]
  tags: string[]
  icon: string
  color: string
  learningPathId: string
  relatedQuizzes: string[]
}

export interface CourseModule {
  id: string
  title: string
  description: string
  duration: string // e.g., "20 minutes"
  content: string
  type: 'video' | 'text' | 'interactive' | 'quiz'
  videoId?: string // YouTube video ID for video type modules
  completed?: boolean
}

// Define courses
export const courses: Course[] = [
  // Digital Explorer Path Courses
  {
    id: "information-literacy",
    title: "Information Detective",
    description: "Learn to find clues and solve the mystery of real vs. fake information online!",
    category: "Information Literacy",
    level: "beginner",
    duration: "4 hours",
    tags: ["Research", "Fact-checking", "Source Evaluation"],
    icon: "BookOpen",
    color: "bg-blue-500/10 text-blue-500",
    learningPathId: "digital-explorer",
    relatedQuizzes: ["fact-checker-quiz", "information-literacy-quiz"],
    modules: [
      {
        id: "info-literacy-intro",
        title: "Introduction to Information Literacy",
        description: "Learn why it's important to evaluate information you find online.",
        duration: "15 minutes",
        type: "video",
        videoId: "AJ-JQhAh940", // TED-Ed: Why you should define your fears instead of your goals (CC BY-NC-ND 4.0)
        content: "In this module, you'll learn about information literacy and why it's important in today's digital world. We'll discuss how to identify reliable sources and why critical thinking is essential when consuming online content."
      },
      {
        id: "evaluating-sources",
        title: "Evaluating Online Sources",
        description: "Learn how to tell if a website or article is trustworthy.",
        duration: "30 minutes",
        type: "text",
        content: `This module covers the CRAAP test (Currency, Relevance, Authority, Accuracy, Purpose) for evaluating sources. You'll learn how to check when information was published, who created it, and whether it's accurate and unbiased.

## The CRAAP Test: Your Detective Tool for Online Information

### Currency: Is the information up-to-date?
- When was the information published or last updated?
- Has newer information made this source outdated?
- For topics like science, technology, or current events, recent information is usually more valuable.

### Relevance: Does the information fit your needs?
- Does this information answer your questions?
- Is it at the right level (not too simple or too complicated)?
- Would you feel confident using this source for a school project?

### Authority: Who created this information?
- Who is the author, publisher, or organization behind the information?
- What are their credentials or expertise in this area?
- Is there contact information available?
- Look for clues like .edu (education), .gov (government), or .org (organization) in website addresses.

### Accuracy: Is the information correct and verifiable?
- Are sources cited for facts and statistics?
- Can you verify the information in other reliable sources?
- Is the information free from spelling and grammar errors?
- Does the site look professional and well-maintained?

### Purpose: Why was this information created?
- Is the purpose to inform, teach, sell, entertain, or persuade?
- Is the information fact, opinion, or propaganda?
- Does the author or organization have any biases or conflicts of interest?
- Is the tone objective or emotional?

## Practice Activity
Try applying the CRAAP test to a website about a topic you're interested in. Make a checklist and see how the site scores on each element of the test. Would you consider it a reliable source? Why or why not?`
      },
      {
        id: "spotting-fake-news",
        title: "Spotting Fake News",
        description: "Learn the tricks used to spread misinformation and how to spot them.",
        duration: "45 minutes",
        type: "interactive",
        content: "In this interactive module, you'll learn about common tactics used in fake news, such as clickbait headlines, manipulated images, and emotional language. You'll practice identifying these tactics in real examples."
      },
      {
        id: "fact-checking-tools",
        title: "Fact-Checking Tools",
        description: "Discover tools and websites that can help you verify information.",
        duration: "30 minutes",
        type: "text",
        content: `This module introduces you to fact-checking websites and tools that can help you verify claims, images, and videos. You'll learn how to use reverse image search, fact-checking websites, and other verification tools.

## Your Digital Detective Toolkit

### Fact-Checking Websites
These websites are dedicated to investigating claims and determining their accuracy:

- **Snopes**: One of the oldest fact-checking websites, covering viral stories, urban legends, and political claims.
- **FactCheck.org**: Focuses on checking claims made by politicians and in political ads.
- **PolitiFact**: Uses a "Truth-O-Meter" rating system to evaluate political statements.
- **MediaBiasFactCheck**: Helps you understand the political bias and factual accuracy of news sources.

### Image Verification Tools
Images can be manipulated or used out of context. These tools help verify images:

- **Google Reverse Image Search**: Find where an image appears online and if it has been altered.
  1. Go to Google Images
  2. Click the camera icon
  3. Upload an image or paste an image URL
  4. Review the results to see where else the image appears

- **TinEye**: Another reverse image search tool that can find the earliest use of an image online.

### Video Verification
- **InVID**: A tool designed to help verify videos and detect manipulated footage.

### General Research Tools
- **Wikipedia**: While not perfect, Wikipedia often includes citations you can check.
- **Google Scholar**: For finding academic research on a topic.
- **Internet Archive's Wayback Machine**: See how websites looked in the past, useful for checking if content has been changed.

## How to Use These Tools Effectively

1. **Cross-check information** using multiple tools and sources
2. **Look for original sources** rather than relying on summaries
3. **Check dates** to ensure you're seeing the most current information
4. **Consider context** - sometimes images or quotes are real but used in misleading ways

## Practice Activity
Find a viral image or claim online and use at least two of these tools to verify its accuracy. What did you discover? Was the information accurate, misleading, or false?`
      },
      {
        id: "research-strategies",
        title: "Research Strategies",
        description: "Learn effective strategies for finding reliable information online.",
        duration: "45 minutes",
        type: "interactive",
        content: "This module covers advanced search techniques, how to use academic databases, and strategies for finding primary sources. You'll practice using these techniques to find reliable information on various topics."
      },
      {
        id: "information-literacy-quiz",
        title: "Information Literacy Quiz",
        description: "Test your knowledge about evaluating online information.",
        duration: "15 minutes",
        type: "quiz",
        content: `Take this quiz to test your understanding of information literacy concepts and fact-checking techniques.

## Information Literacy Quiz

1. **Which of the following is the MOST reliable source for scientific information?**
   - A) A viral social media post with lots of shares
   - B) A peer-reviewed scientific journal article
   - C) A blog post by someone who says they're an expert
   - D) A website with a professional design and lots of ads

   *Answer: B) A peer-reviewed scientific journal article*

2. **What does the 'A' in the CRAAP test stand for?**
   - A) Accessibility
   - B) Authority
   - C) Availability
   - D) Accuracy

   *Answer: B) Authority*

3. **You find an article with no author listed, no citations for its claims, and several spelling errors. Based on these observations, what can you conclude?**
   - A) The information is likely reliable because it's written in simple language
   - B) The information might be reliable, but you should be cautious
   - C) The information shows several red flags and should not be trusted without verification
   - D) The information must be from a government source

   *Answer: C) The information shows several red flags and should not be trusted without verification*

4. **What is the purpose of a reverse image search?**
   - A) To find similar images for an art project
   - B) To verify where an image came from and if it has been altered
   - C) To improve the quality of an image
   - D) To translate text in an image

   *Answer: B) To verify where an image came from and if it has been altered*

5. **Which of these is NOT part of the 'Currency' evaluation in the CRAAP test?**
   - A) When the information was published
   - B) Whether the information has been updated
   - C) Whether newer information exists
   - D) Whether the author is well-known

   *Answer: D) Whether the author is well-known*

6. **What should you do if you find conflicting information from multiple sources?**
   - A) Always trust the source with the most recent date
   - B) Always trust the source with the most professional-looking website
   - C) Evaluate the reliability of each source and look for additional sources
   - D) Trust the source that appears first in search results

   *Answer: C) Evaluate the reliability of each source and look for additional sources*

7. **Why is it important to consider the purpose of information when evaluating it?**
   - A) Because information created to sell something might be biased
   - B) Because the purpose determines how long the information will be available
   - C) Because purpose is the only factor that matters in evaluation
   - D) Because older purposes are always more reliable

   *Answer: A) Because information created to sell something might be biased*

8. **What is a primary source?**
   - A) The first website that appears in search results
   - B) Original materials created at the time of an event (like diaries, photos, or research data)
   - C) A source that is easy to understand
   - D) A source that summarizes other sources

   *Answer: B) Original materials created at the time of an event (like diaries, photos, or research data)*

9. **Which domain extension generally indicates an educational institution?**
   - A) .com
   - B) .org
   - C) .edu
   - D) .net

   *Answer: C) .edu*

10. **What is the best approach when researching a topic online?**
    - A) Use only one trusted source
    - B) Use multiple sources and cross-check information
    - C) Use only sources that confirm what you already believe
    - D) Use only the most recent sources

    *Answer: B) Use multiple sources and cross-check information*

How did you do? Each correct answer shows your growing skills as an information detective!`
      }
    ]
  },
  {
    id: "digital-research",
    title: "Digital Research Explorer",
    description: "Master the art of finding reliable information online for school projects and personal learning!",
    category: "Information Literacy",
    level: "intermediate",
    duration: "3 hours",
    tags: ["Research", "Academic", "Search Skills"],
    icon: "Search",
    color: "bg-green-500/10 text-green-500",
    learningPathId: "digital-explorer",
    relatedQuizzes: ["information-literacy-quiz"],
    modules: [
      {
        id: "search-engine-mastery",
        title: "Search Engine Mastery",
        description: "Learn advanced search techniques to find exactly what you need.",
        duration: "30 minutes",
        type: "interactive",
        content: "This module covers advanced search operators, filters, and techniques to make your searches more effective. You'll learn how to use quotation marks, site: operator, filetype: operator, and other advanced search features."
      },
      {
        id: "academic-resources",
        title: "Finding Academic Resources",
        description: "Discover reliable academic sources for school projects.",
        duration: "45 minutes",
        type: "text",
        content: `This module introduces you to academic databases, open educational resources, and other reliable sources for school projects. You'll learn how to access and use these resources effectively.

## Finding Treasure: Academic Resources for Students

### Why Use Academic Resources?
Academic resources are like treasure chests of reliable information that has been reviewed by experts. Using these resources for your school projects will:
- Make your work more accurate and trustworthy
- Impress your teachers with high-quality information
- Help you learn from the best sources in each subject

### Types of Academic Resources

#### 1. Online Encyclopedias
- **Encyclopedia Britannica**: More reliable than general web searches
- **World Book Online**: Written specifically for students
- **Wikipedia**: A good starting point, but always check the citations at the bottom of articles for more reliable sources

#### 2. Open Educational Resources (OER)
These are free learning materials created specifically for students:
- **Khan Academy**: Videos and practice exercises on many subjects
- **CK-12**: Free textbooks and learning materials
- **OER Commons**: A digital library of educational resources

#### 3. Digital Libraries
- **Library of Congress Digital Collections**: Historical documents, photos, and more
- **Digital Public Library of America**: Millions of free digital items
- **Your school library's online resources**: Many school libraries subscribe to special databases just for students

#### 4. Academic Databases for Older Students
- **JSTOR**: Collection of academic journals (some schools provide access)
- **Google Scholar**: Search engine for academic papers
- **ERIC**: Education Resources Information Center for education-related research

### How to Access These Resources
1. **Start with your school library**: Many provide access to subscription databases
2. **Check your public library**: They often offer free access to many resources with your library card
3. **Look for free resources**: Many educational websites offer free content for students

### Tips for Using Academic Resources
- **Use the search filters**: Narrow results by date, subject, or reading level
- **Look for 'student' or 'kids' versions**: Many resources have simplified versions for younger researchers
- **Save your sources**: Keep track of where you found information for your bibliography
- **Ask for help**: Librarians are research experts who can help you find exactly what you need

## Practice Activity
Choose a topic you're interested in and try finding information about it using at least two different academic resources. Compare what you find with what appears in a regular internet search. What differences do you notice in the quality or type of information?`
      },
      {
        id: "note-taking",
        title: "Digital Note-Taking",
        description: "Learn effective strategies for organizing research findings.",
        duration: "30 minutes",
        type: "video",
        videoId: "JwqGmCAixHI", // Khan Academy: Taking notes (CC BY-NC-SA)
        content: `This module covers digital note-taking tools and techniques to help you organize your research findings. You'll learn about concept mapping, annotation tools, and citation management.

We'll explore different note-taking methods including:

1. **The Cornell Method**: Dividing your notes into sections for main ideas, details, and summaries
2. **Mind Mapping**: Creating visual diagrams that connect related ideas
3. **Outline Method**: Organizing information in a hierarchical structure
4. **Digital Tools**: Using apps like OneNote, Notion, or Google Keep to organize your research

You'll also learn how to effectively tag and categorize your notes, create connections between different pieces of information, and review your notes to reinforce learning.`
      },
      {
        id: "citing-sources",
        title: "Citing Sources Properly",
        description: "Learn how to give credit to your sources and avoid plagiarism.",
        duration: "45 minutes",
        type: "interactive",
        content: "This module covers different citation styles (MLA, APA, Chicago) and tools that can help you create proper citations. You'll practice creating citations for various types of sources."
      },
      {
        id: "research-project",
        title: "Mini Research Project",
        description: "Apply your research skills to a small project.",
        duration: "60 minutes",
        type: "interactive",
        content: "In this module, you'll apply the research skills you've learned to a mini research project. You'll choose a topic, find reliable sources, take notes, and create a short report with proper citations."
      }
    ]
  },

  // AI Adventurer Path Courses
  {
    id: "ai-basics",
    title: "AI Basics for Kids",
    description: "Discover what AI is, how it works, and how it's used in everyday life!",
    category: "AI Education",
    level: "beginner",
    duration: "2 hours",
    tags: ["AI", "Machine Learning", "Technology"],
    icon: "Bot",
    color: "bg-purple-500/10 text-purple-500",
    learningPathId: "ai-adventurer",
    relatedQuizzes: ["ai-ethics-quiz"],
    modules: [
      {
        id: "what-is-ai",
        title: "What is Artificial Intelligence?",
        description: "Learn what AI is and how it's different from regular computer programs.",
        duration: "20 minutes",
        type: "video",
        videoId: "mJeNghZXtMo", // Khan Academy: What is artificial intelligence? (CC BY-NC-SA)
        content: "This module introduces the concept of artificial intelligence in kid-friendly terms. You'll learn what makes AI special, how it's different from regular computer programs, and some examples of AI you might encounter in everyday life."
      },
      {
        id: "how-ai-learns",
        title: "How AI Learns",
        description: "Discover how AI systems learn from data and examples.",
        duration: "30 minutes",
        type: "interactive",
        content: "This interactive module explains how AI systems learn from data, using simple examples like teaching a computer to recognize animals or play games. You'll participate in activities that demonstrate machine learning concepts."
      },
      {
        id: "ai-in-everyday-life",
        title: "AI in Everyday Life",
        description: "Explore how AI is used in games, phones, homes, and more.",
        duration: "25 minutes",
        type: "text",
        content: "This module shows you how AI is already part of your everyday life, from voice assistants and recommendation systems to games and smart devices. You'll learn to recognize AI in action and understand how it helps people."
      },
      {
        id: "creating-with-ai",
        title: "Creating with AI",
        description: "Learn how kids can use AI tools to create art, music, and stories.",
        duration: "45 minutes",
        type: "interactive",
        content: "This fun module introduces kid-friendly AI creation tools that can help you make art, music, and stories. You'll try out some simple AI tools and see how they can enhance your creativity."
      },
      {
        id: "ai-basics-quiz",
        title: "AI Basics Quiz",
        description: "Test your knowledge about artificial intelligence.",
        duration: "15 minutes",
        type: "quiz",
        content: `Take this quiz to test your understanding of AI concepts and applications.

## AI Basics Quiz

1. **What is artificial intelligence (AI)?**
   - A) A robot that looks like a human
   - B) Technology that can perform tasks that normally require human intelligence
   - C) A computer program that can only follow specific instructions
   - D) A type of video game character

   *Answer: B) Technology that can perform tasks that normally require human intelligence*

2. **How is AI different from regular computer programs?**
   - A) AI uses electricity, regular programs don't
   - B) AI can learn and improve over time, while regular programs only follow fixed instructions
   - C) AI is always connected to the internet
   - D) AI is always more expensive

   *Answer: B) AI can learn and improve over time, while regular programs only follow fixed instructions*

3. **What does AI need to learn?**
   - A) Books and articles
   - B) Human supervision at all times
   - C) Lots of data
   - D) Special computer chips

   *Answer: C) Lots of data*

4. **Which of these is an example of AI that you might use in everyday life?**
   - A) A calculator app
   - B) A voice assistant like Siri or Alexa
   - C) A flashlight app
   - D) A regular alarm clock

   *Answer: B) A voice assistant like Siri or Alexa*

5. **What is machine learning?**
   - A) When robots learn to use machines
   - B) When computers are programmed to learn from data without being explicitly programmed
   - C) When humans learn to use computers
   - D) When computers teach humans

   *Answer: B) When computers are programmed to learn from data without being explicitly programmed*

6. **Which of these tasks would be MOST difficult for current AI systems?**
   - A) Recognizing faces in photos
   - B) Translating text from one language to another
   - C) Understanding the emotional context of a complex social situation
   - D) Playing chess

   *Answer: C) Understanding the emotional context of a complex social situation*

7. **How might AI help students with their homework?**
   - A) By doing all their homework for them (which would be cheating)
   - B) By providing explanations and examples to help students understand concepts
   - C) By making homework unnecessary
   - D) By replacing teachers

   *Answer: B) By providing explanations and examples to help students understand concepts*

8. **What is NOT a concern about AI?**
   - A) Privacy issues related to data collection
   - B) Potential bias in AI systems
   - C) AI becoming self-aware and taking over the world like in movies
   - D) Job displacement as AI automates certain tasks

   *Answer: C) AI becoming self-aware and taking over the world like in movies*

9. **Which field does NOT commonly use AI?**
   - A) Healthcare
   - B) Transportation
   - C) Entertainment
   - D) There is no field that doesn't use AI in some way today

   *Answer: D) There is no field that doesn't use AI in some way today*

10. **What's the best way to think about AI?**
    - A) As a magical solution to all problems
    - B) As a tool created by humans to help with specific tasks
    - C) As a replacement for human thinking
    - D) As something only computer scientists need to understand

    *Answer: B) As a tool created by humans to help with specific tasks*

How did you do? Remember, AI is a fascinating field that's constantly evolving, and understanding the basics helps you use AI tools more effectively and responsibly!`
      }
    ]
  },
  {
    id: "ai-ethics-kids",
    title: "AI Ethics for Young Explorers",
    description: "Learn about the importance of fairness, privacy, and responsibility in AI!",
    category: "AI Ethics",
    level: "intermediate",
    duration: "2.5 hours",
    tags: ["Ethics", "AI", "Digital Citizenship"],
    icon: "Brain",
    color: "bg-amber-500/10 text-amber-500",
    learningPathId: "ai-adventurer",
    relatedQuizzes: ["ai-ethics-quiz"],
    modules: [
      {
        id: "ai-fairness",
        title: "AI and Fairness",
        description: "Learn why it's important for AI to treat everyone fairly.",
        duration: "30 minutes",
        type: "video",
        videoId: "gV0_raKR2UQ", // TED-Ed: The ethical dilemma of self-driving cars (CC BY-NC-ND 4.0)
        content: "This module explains the concept of fairness in AI systems using kid-friendly examples. You'll learn why AI systems might treat people differently and why it's important to make sure AI is fair to everyone."
      },
      {
        id: "ai-privacy",
        title: "AI and Privacy",
        description: "Discover how AI uses data and why protecting your information matters.",
        duration: "25 minutes",
        type: "text",
        content: "This module covers privacy considerations when using AI tools and services. You'll learn what kinds of information AI systems might collect, how they use it, and how you can protect your privacy."
      },
      {
        id: "responsible-ai-use",
        title: "Using AI Responsibly",
        description: "Learn how to use AI tools in responsible and helpful ways.",
        duration: "35 minutes",
        type: "interactive",
        content: "This interactive module teaches you how to use AI tools responsibly. You'll learn about giving proper credit when using AI-generated content, being honest about AI assistance, and using AI to help rather than harm."
      },
      {
        id: "ai-decision-making",
        title: "AI Decision-Making",
        description: "Explore how AI makes decisions and why human oversight is important.",
        duration: "40 minutes",
        type: "video",
        videoId: "ixIoDYVfKA0", // Khan Academy: How computers learn (CC BY-NC-SA)
        content: `This module explains how AI systems make decisions and why human oversight is still important. You'll learn about the limitations of AI and why humans need to stay involved in important decisions.

We'll explore:

1. **How AI Makes Decisions**: Understanding algorithms, data patterns, and probability
2. **AI Limitations**: What AI can and cannot do well
3. **The Importance of Human Oversight**: Why humans need to supervise AI systems
4. **Ethical Decision-Making**: How values and ethics play a role in AI decisions

Through examples and scenarios, you'll learn why AI should be a tool that helps humans make better decisions, not a replacement for human judgment in important matters.`
      },
      {
        id: "ai-ethics-scenarios",
        title: "AI Ethics Scenarios",
        description: "Practice identifying ethical issues in real-world AI scenarios.",
        duration: "30 minutes",
        type: "interactive",
        content: "In this module, you'll explore different scenarios involving AI and identify potential ethical issues. You'll practice thinking critically about AI applications and their impacts."
      }
    ]
  },

  // Safety Ranger Path Courses
  {
    id: "online-safety-basics",
    title: "Online Safety Basics",
    description: "Learn essential skills to stay safe while exploring the internet!",
    category: "Online Safety",
    level: "beginner",
    duration: "3 hours",
    tags: ["Safety", "Privacy", "Security"],
    icon: "Shield",
    color: "bg-red-500/10 text-red-500",
    learningPathId: "safety-ranger",
    relatedQuizzes: ["online-safety-quiz", "phishing-defender-quiz"],
    modules: [
      {
        id: "personal-information",
        title: "Protecting Personal Information",
        description: "Learn what information to keep private online.",
        duration: "30 minutes",
        type: "video",
        videoId: "yiKeLOKc1tw", // Khan Academy: Internet safety: Protecting your identity (CC BY-NC-SA)
        content: "This module teaches you what personal information is and why it's important to protect it online. You'll learn what's safe to share and what should be kept private when using websites, apps, and games."
      },
      {
        id: "strong-passwords",
        title: "Creating Strong Passwords",
        description: "Learn how to create and remember strong passwords.",
        duration: "25 minutes",
        type: "interactive",
        content: "This interactive module shows you how to create strong, unique passwords that are hard for others to guess but easy for you to remember. You'll practice creating secure passwords and learn about password managers."
      },
      {
        id: "recognizing-scams",
        title: "Recognizing Online Scams",
        description: "Learn to spot common online scams and tricks.",
        duration: "40 minutes",
        type: "text",
        content: "This module introduces common online scams and tricks that target kids and families. You'll learn the warning signs of scams, phishing attempts, and other deceptive practices, and how to avoid them."
      },
      {
        id: "safe-searching",
        title: "Safe Searching and Browsing",
        description: "Learn how to search and browse the internet safely.",
        duration: "35 minutes",
        type: "interactive",
        content: "This module covers safe search practices, how to evaluate websites before clicking, and tools that can help keep your browsing experience safe and appropriate for your age."
      },
      {
        id: "asking-for-help",
        title: "When and How to Ask for Help",
        description: "Learn when and how to ask a trusted adult for help online.",
        duration: "20 minutes",
        type: "video",
        videoId: "-nMUbHuffO8", // Khan Academy: Internet safety: Cyberbullying (CC BY-NC-SA)
        content: `This module explains situations where you should ask for help from a trusted adult, such as if something makes you uncomfortable, confused, or scared online. You'll learn how to talk to adults about online experiences.

We'll cover:

1. **Warning Signs**: Recognizing situations that require adult help
2. **Who to Ask**: Identifying trusted adults in your life
3. **How to Start the Conversation**: Tips for talking to adults about online problems
4. **What Information to Share**: Details that will help adults understand the situation

Remember: Asking for help is not a sign of weakness—it's a sign of wisdom! Adults have experience and resources to help solve problems that might be too big for you to handle alone.`
      },
      {
        id: "online-safety-quiz",
        title: "Online Safety Quiz",
        description: "Test your knowledge about staying safe online.",
        duration: "15 minutes",
        type: "quiz",
        content: `Take this quiz to test your understanding of online safety concepts and practices.

## Online Safety Quiz

1. **What personal information should you NEVER share online without a parent's permission?**
   - A) Your favorite color
   - B) Your home address
   - C) Your opinion about a movie
   - D) The name of your pet

   *Answer: B) Your home address*

2. **What makes a password strong?**
   - A) Using your name and birthday
   - B) Using the same password for all your accounts
   - C) Using a mix of letters, numbers, and symbols
   - D) Using a simple word that's easy to remember

   *Answer: C) Using a mix of letters, numbers, and symbols*

3. **What should you do if a stranger online asks to meet you in person?**
   - A) Agree to meet them in a public place
   - B) Tell them where you live
   - C) Never agree to meet and tell a trusted adult immediately
   - D) Ask them for more information about themselves first

   *Answer: C) Never agree to meet and tell a trusted adult immediately*

4. **What is phishing?**
   - A) A fun online fishing game
   - B) A type of social media platform
   - C) A trick to steal your personal information
   - D) A way to make friends online

   *Answer: C) A trick to steal your personal information*

5. **What should you do if you receive a message or email asking for your password?**
   - A) Reply with your password if it's from a company you know
   - B) Never share your password and report the message
   - C) Share your password but change it later
   - D) Ignore the message but don't report it

   *Answer: B) Never share your password and report the message*

6. **What is a good practice when using public Wi-Fi?**
   - A) Doing online banking and shopping
   - B) Logging into all your accounts
   - C) Avoiding sensitive activities like banking or entering passwords
   - D) Sharing the Wi-Fi password with others

   *Answer: C) Avoiding sensitive activities like banking or entering passwords*

7. **What should you do if you see cyberbullying happening online?**
   - A) Join in so you don't become a target
   - B) Ignore it completely
   - C) Support the person being bullied and tell a trusted adult
   - D) Privately message the bully to stop

   *Answer: C) Support the person being bullied and tell a trusted adult*

8. **Why is it important to think before posting photos online?**
   - A) Because only certain types of cameras work for online photos
   - B) Because photos can reveal personal information and can be shared beyond your control
   - C) Because photos take up too much storage space
   - D) Because photos are always public

   *Answer: B) Because photos can reveal personal information and can be shared beyond your control*

9. **What should you do if a website or app asks for permission to use your location?**
   - A) Always allow it
   - B) Never allow it
   - C) Ask a trusted adult before allowing it
   - D) Allow it only if the website looks professional

   *Answer: C) Ask a trusted adult before allowing it*

10. **What is the best thing to do if something online makes you feel uncomfortable or scared?**
    - A) Keep browsing and hope the feeling goes away
    - B) Tell a trusted adult right away
    - C) Try to solve the problem yourself
    - D) Turn off your device and never use it again

    *Answer: B) Tell a trusted adult right away*

How did you do? Remember, staying safe online is about making smart choices and knowing when to ask for help!`
      }
    ]
  },
  {
    id: "password-security",
    title: "Password Security Master",
    description: "Become a password security expert and protect your digital accounts!",
    category: "Cybersecurity",
    level: "intermediate",
    duration: "2 hours",
    tags: ["Passwords", "Security", "Protection"],
    icon: "Lock",
    color: "bg-green-500/10 text-green-500",
    learningPathId: "safety-ranger",
    relatedQuizzes: ["password-hero-quiz"],
    modules: [
      {
        id: "password-importance",
        title: "Why Passwords Matter",
        description: "Learn why strong passwords are your first line of defense online.",
        duration: "20 minutes",
        type: "video",
        videoId: "aEmF3Iylvr4", // Khan Academy: Internet safety: Strong passwords (CC BY-NC-SA)
        content: "This module explains why passwords are important and what can happen if your passwords are weak or compromised. You'll learn about the role passwords play in protecting your digital life."
      },
      {
        id: "password-strength",
        title: "Creating Unbreakable Passwords",
        description: "Learn advanced techniques for creating strong, unique passwords.",
        duration: "30 minutes",
        type: "interactive",
        content: "This interactive module teaches you advanced techniques for creating strong passwords, including passphrases, random generation, and memory tricks. You'll practice creating passwords that are both secure and memorable."
      },
      {
        id: "password-managers",
        title: "Using Password Managers",
        description: "Discover tools that can help you manage all your passwords securely.",
        duration: "25 minutes",
        type: "text",
        content: "This module introduces password managers, which are tools that can help you create, store, and use strong, unique passwords for all your accounts. You'll learn how password managers work and why they're useful."
      },
      {
        id: "two-factor-authentication",
        title: "Two-Factor Authentication",
        description: "Learn how to add an extra layer of security to your accounts.",
        duration: "30 minutes",
        type: "interactive",
        content: "This module explains two-factor authentication (2FA) and how it provides an extra layer of security beyond passwords. You'll learn how to set up 2FA on common accounts and why it's important."
      },
      {
        id: "password-security-quiz",
        title: "Password Security Quiz",
        description: "Test your knowledge about password security.",
        duration: "15 minutes",
        type: "quiz",
        content: "Take this quiz to test your understanding of password security concepts and best practices."
      }
    ]
  },

  // Communication Hero Path Courses
  {
    id: "digital-communication",
    title: "Communication Superheroes",
    description: "Discover your communication superpowers and learn to use them wisely online!",
    category: "Digital Communication",
    level: "beginner",
    duration: "3 hours",
    tags: ["Communication", "Etiquette", "Teamwork"],
    icon: "MessageSquare",
    color: "bg-purple-500/10 text-purple-500",
    learningPathId: "communication-hero",
    relatedQuizzes: ["digital-communication-quiz"],
    modules: [
      {
        id: "communication-basics",
        title: "Digital Communication Basics",
        description: "Learn the different ways people communicate online.",
        duration: "25 minutes",
        type: "video",
        videoId: "F9GujgK0y2M", // TED-Ed: How to write the perfect email (CC BY-NC-ND 4.0)
        content: "This module introduces different forms of digital communication, including email, messaging, video calls, and social media. You'll learn the basic features and purposes of each communication method."
      },
      {
        id: "digital-etiquette",
        title: "Digital Etiquette",
        description: "Learn the do's and don'ts of communicating online.",
        duration: "30 minutes",
        type: "text",
        content: "This module covers digital etiquette (or 'netiquette'), which is the set of polite behaviors for online communication. You'll learn how to communicate respectfully and effectively in different digital contexts."
      },
      {
        id: "emoji-and-tone",
        title: "Emojis, Tone, and Clarity",
        description: "Learn how to express yourself clearly and kindly online.",
        duration: "35 minutes",
        type: "interactive",
        content: "This interactive module explores how to express tone in digital communication, where facial expressions and voice tone are missing. You'll learn how emojis, punctuation, and word choice affect how your messages are received."
      },
      {
        id: "online-collaboration",
        title: "Online Collaboration",
        description: "Learn how to work together effectively using digital tools.",
        duration: "40 minutes",
        type: "video",
        videoId: "SEBDvLQmWMU", // TED-Ed: How to turn a group of strangers into a team (CC BY-NC-ND 4.0)
        content: `This module covers tools and strategies for effective online collaboration, such as shared documents, virtual whiteboards, and video conferencing. You'll learn how to contribute to group projects in digital spaces.

We'll explore:

1. **Collaboration Tools**: Google Docs, Slides, Jamboard, Miro, Zoom, and more
2. **Roles and Responsibilities**: How to divide work and stay accountable
3. **Communication Strategies**: Keeping everyone informed and engaged
4. **Problem-Solving Together**: Approaches for resolving challenges as a team

You'll learn practical skills for being a great team member in online projects, including how to give and receive feedback, how to manage your time, and how to make sure everyone's voice is heard.`
      },
      {
        id: "handling-conflicts",
        title: "Handling Online Conflicts",
        description: "Learn strategies for resolving misunderstandings and conflicts online.",
        duration: "30 minutes",
        type: "interactive",
        content: "This module provides strategies for preventing and resolving conflicts that arise in digital communication. You'll learn how to clarify misunderstandings, apologize effectively, and seek help when needed."
      },
      {
        id: "communication-quiz",
        title: "Digital Communication Quiz",
        description: "Test your knowledge about effective online communication.",
        duration: "15 minutes",
        type: "quiz",
        content: `Take this quiz to test your understanding of digital communication concepts and best practices.

## Digital Communication Quiz

1. **What's missing in online communication that we have in face-to-face conversations?**
   - A) Words and language
   - B) The ability to share ideas
   - C) Facial expressions and tone of voice
   - D) The ability to ask questions

   *Answer: C) Facial expressions and tone of voice*

2. **What is digital etiquette (or "netiquette")?**
   - A) A type of internet connection
   - B) The set of polite behaviors for online communication
   - C) A way to decorate your online profile
   - D) A type of emoji

   *Answer: B) The set of polite behaviors for online communication*

3. **Why might using ALL CAPITAL LETTERS in a message be problematic?**
   - A) It uses too much data
   - B) It's harder to read
   - C) It can come across as SHOUTING
   - D) It's against the rules on most platforms

   *Answer: C) It can come across as SHOUTING*

4. **What should you do before sending an important message?**
   - A) Use as many emojis as possible
   - B) Make it as short as possible
   - C) Check it to make sure it's clear and makes sense
   - D) Add lots of exclamation points

   *Answer: C) Check it to make sure it's clear and makes sense*

5. **When working on a team project online, what's important to do?**
   - A) Do all the work yourself so it's done right
   - B) Respond to messages and be clear about what you're working on
   - C) Only check messages once a week
   - D) Use slang and abbreviations to save time

   *Answer: B) Respond to messages and be clear about what you're working on*

6. **What's a good way to handle a misunderstanding in online communication?**
   - A) Ignore it and hope it goes away
   - B) Get angry and use strong language
   - C) Clarify what you meant in a calm, clear way
   - D) Stop communicating with that person

   *Answer: C) Clarify what you meant in a calm, clear way*

7. **How can emojis be helpful in digital communication?**
   - A) They make your message longer
   - B) They help convey tone and emotion that might be missing in text
   - C) They replace the need for proper spelling
   - D) They're required on most platforms

   *Answer: B) They help convey tone and emotion that might be missing in text*

8. **What's the best approach when you disagree with someone online?**
   - A) Respond immediately with your strongest arguments
   - B) Use sarcasm to show they're wrong
   - C) Express your disagreement respectfully and consider their perspective
   - D) Tag other people to join the argument on your side

   *Answer: C) Express your disagreement respectfully and consider their perspective*

9. **What does it mean to "think before you post"?**
   - A) Consider how your message might be interpreted and whether it could hurt someone
   - B) Make sure your grammar is perfect
   - C) Think about how many likes you'll get
   - D) Consider whether your post is long enough

   *Answer: A) Consider how your message might be interpreted and whether it could hurt someone*

10. **What's a good practice when communicating in a group chat for school?**
    - A) Send messages at any time, day or night
    - B) Stay on topic and be respectful of everyone's time
    - C) Use lots of inside jokes that only some people understand
    - D) Tag everyone in every message

    *Answer: B) Stay on topic and be respectful of everyone's time*

How did you do? Remember, good digital communication skills help you build positive relationships and avoid misunderstandings online!`
      }
    ]
  },
  {
    id: "social-media-literacy",
    title: "Social Media Literacy",
    description: "Navigate social media wisely and build positive digital relationships!",
    category: "Digital Communication",
    level: "intermediate",
    duration: "3.5 hours",
    tags: ["Social Media", "Digital Citizenship", "Online Relationships"],
    icon: "Share2",
    color: "bg-blue-500/10 text-blue-500",
    learningPathId: "communication-hero",
    relatedQuizzes: ["digital-communication-quiz"],
    modules: [
      {
        id: "social-media-landscape",
        title: "Understanding Social Media",
        description: "Learn about different social media platforms and how they work.",
        duration: "30 minutes",
        type: "video",
        videoId: "GltnBrn1fMA", // TED-Ed: Is social media hurting your mental health? (CC BY-NC-ND 4.0)
        content: "This module provides an overview of popular social media platforms, their features, and their purposes. You'll learn how different platforms are designed for different types of content and interactions."
      },
      {
        id: "digital-footprint",
        title: "Your Digital Footprint",
        description: "Discover how your online actions create a lasting impression.",
        duration: "35 minutes",
        type: "interactive",
        content: "This interactive module explains the concept of a digital footprint and how your online activities can affect your reputation and opportunities. You'll learn strategies for creating a positive digital footprint."
      },
      {
        id: "social-media-privacy",
        title: "Social Media Privacy",
        description: "Learn how to control who sees your content and information.",
        duration: "40 minutes",
        type: "text",
        content: "This module covers privacy settings and features on social media platforms. You'll learn how to control who can see your posts, contact you, and access your personal information on different platforms."
      },
      {
        id: "healthy-relationships",
        title: "Building Healthy Online Relationships",
        description: "Learn how to form and maintain positive relationships online.",
        duration: "45 minutes",
        type: "video",
        videoId: "WbBOQPkxFnU", // TED-Ed: The secret to giving great feedback (CC BY-NC-ND 4.0)
        content: `This module explores how to build and maintain healthy relationships in digital spaces. You'll learn strategies for meaningful communication, setting boundaries, and recognizing unhealthy relationship patterns online.

We'll cover:

1. **Quality Communication**: Moving beyond likes and emojis to meaningful exchanges
2. **Digital Boundaries**: How to set and respect limits in online relationships
3. **Recognizing Red Flags**: Warning signs of unhealthy online relationships
4. **Conflict Resolution**: Handling disagreements respectfully in digital spaces
5. **Supporting Friends Online**: Being there for others in digital environments

Through examples and scenarios, you'll develop skills for creating and maintaining positive, supportive relationships in all your online interactions.`
      },
      {
        id: "critical-consumption",
        title: "Critical Consumption of Social Media",
        description: "Learn to think critically about the content you see on social media.",
        duration: "35 minutes",
        type: "interactive",
        content: "This module teaches critical thinking skills for social media consumption. You'll learn to recognize advertising, sponsored content, and potential biases, and to evaluate the credibility of information you encounter."
      },
      {
        id: "social-media-quiz",
        title: "Social Media Literacy Quiz",
        description: "Test your knowledge about navigating social media wisely.",
        duration: "15 minutes",
        type: "quiz",
        content: "Take this quiz to test your understanding of social media literacy concepts and best practices."
      }
    ]
  }
];

// Helper functions
export function getCourseById(id: string): Course | undefined {
  return courses.find(course => course.id === id);
}

export function getCoursesByLearningPath(pathId: string): Course[] {
  return courses.filter(course => course.learningPathId === pathId);
}

export function getAllCourses(): Course[] {
  return courses;
}

// Get icon component by name
export function getIconByName(iconName: string): any {
  // This function will be implemented in the component that uses it
  return null;
}
