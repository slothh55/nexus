export interface AssessmentQuestion {
  id: string;
  courseId: string;
  competencyArea: string;
  competencyLevel: 'understand' | 'apply' | 'create';
  question: string;
  answers: {
    id: string;
    text: string;
  }[];
  correctAnswer: string;
  explanation: string;
}

export const aiLiteracyAssessment: AssessmentQuestion[] = [
  // AI Basics Course - Understanding Level Questions
  {
    id: 'ai-basics-u1',
    courseId: 'ai-basics',
    competencyArea: 'AI Fundamentals',
    competencyLevel: 'understand',
    question: 'What is artificial intelligence (AI)?',
    answers: [
      { id: 'a', text: 'A robot that looks and acts exactly like a human' },
      { id: 'b', text: 'Computer systems designed to perform tasks that typically require human intelligence' },
      { id: 'c', text: 'Any computer program that can solve math problems' },
      { id: 'd', text: 'A science fiction concept that doesn\'t exist in real life' }
    ],
    correctAnswer: 'b',
    explanation: 'Artificial Intelligence (AI) refers to computer systems designed to perform tasks that typically require human intelligence, such as visual perception, speech recognition, decision-making, and language translation. AI doesn\'t necessarily mean robots that look like humans, and it goes beyond simple computer programs that solve specific problems.'
  },
  {
    id: 'ai-basics-u2',
    courseId: 'ai-basics',
    competencyArea: 'Machine Learning',
    competencyLevel: 'understand',
    question: 'How do AI systems learn?',
    answers: [
      { id: 'a', text: 'They are programmed with every possible answer to every possible question' },
      { id: 'b', text: 'They learn by studying human brains directly' },
      { id: 'c', text: 'They learn from data, finding patterns and improving with experience' },
      { id: 'd', text: 'They download information from the internet whenever they need it' }
    ],
    correctAnswer: 'c',
    explanation: 'AI systems primarily learn from data through a process called machine learning. They analyze large amounts of data to identify patterns, make predictions, and improve their performance over time with more experience. They aren\'t programmed with every possible answer, don\'t study human brains directly, and don\'t simply download information as needed.'
  },
  {
    id: 'ai-basics-u3',
    courseId: 'ai-basics',
    competencyArea: 'AI in Everyday Life',
    competencyLevel: 'understand',
    question: 'Which of the following is NOT an example of AI in everyday life?',
    answers: [
      { id: 'a', text: 'A voice assistant recommending songs based on your listening history' },
      { id: 'b', text: 'A calculator performing mathematical operations' },
      { id: 'c', text: 'A photo app that automatically recognizes and tags your friends' },
      { id: 'd', text: 'A video game character that adapts to your playing style' }
    ],
    correctAnswer: 'b',
    explanation: 'A calculator performing mathematical operations is NOT an example of AI. Calculators follow fixed, predetermined rules to solve equations without learning or adapting. The other examples involve AI because they learn from data (listening history), recognize patterns (faces in photos), or adapt to user behavior (game character adjusting to playing style).'
  },
  
  // AI Basics Course - Application Level Questions
  {
    id: 'ai-basics-a1',
    courseId: 'ai-basics',
    competencyArea: 'Generative AI',
    competencyLevel: 'apply',
    question: 'Your friend wants to use an AI art generator to create images for a school project. What advice would you give them?',
    answers: [
      { id: 'a', text: 'Don\'t use AI art generators because they always steal from real artists' },
      { id: 'b', text: 'Use the AI art generator but claim all the images as your own original artwork' },
      { id: 'c', text: 'Use the AI art generator but acknowledge that the images were created with AI assistance' },
      { id: 'd', text: 'Use the AI art generator and sell the images online for extra money' }
    ],
    correctAnswer: 'c',
    explanation: 'The best advice is to use the AI art generator but acknowledge that the images were created with AI assistance. This demonstrates ethical use of AI tools by being transparent about how the content was created. It\'s not accurate to say all AI art generators steal from artists, and claiming AI-generated work as entirely your own original creation or selling it without disclosure would be misleading.'
  },
  {
    id: 'ai-basics-a2',
    courseId: 'ai-basics',
    competencyArea: 'AI Limitations',
    competencyLevel: 'apply',
    question: 'You\'re using an AI chatbot to help with homework research. The AI gives you information about a historical event that sounds incorrect. What should you do?',
    answers: [
      { id: 'a', text: 'Trust the AI because AI systems know more than humans' },
      { id: 'b', text: 'Verify the information using reliable sources like textbooks or educational websites' },
      { id: 'c', text: 'Ignore the information and make up your own facts instead' },
      { id: 'd', text: 'Use the information anyway because your teacher won\'t know the difference' }
    ],
    correctAnswer: 'b',
    explanation: 'You should verify the information using reliable sources. AI systems can make mistakes, present outdated information, or sometimes generate incorrect facts (hallucinate). Critical thinking is important when using AI tools - always cross-check important information with trusted sources like textbooks, educational websites, or by asking teachers or librarians.'
  },
  {
    id: 'ai-basics-a3',
    courseId: 'ai-basics',
    competencyArea: 'AI Ethics',
    competencyLevel: 'apply',
    question: 'Your school is considering using an AI system that predicts which students might need extra help based on their past grades. What is a potential concern with this approach?',
    answers: [
      { id: 'a', text: 'The AI might be too accurate and identify too many students who need help' },
      { id: 'b', text: 'The AI might be biased based on the data it was trained on and treat some groups unfairly' },
      { id: 'c', text: 'The AI might work too slowly to be useful for teachers' },
      { id: 'd', text: 'The AI might be too expensive compared to hiring more teachers' }
    ],
    correctAnswer: 'b',
    explanation: 'A key ethical concern with predictive AI systems is potential bias. If the AI was trained on data that contains historical biases or inequalities, it might perpetuate those biases in its predictions. For example, if certain groups of students historically received less support or faced more challenges, the AI might incorrectly assume those students are less capable rather than recognizing systemic factors.'
  },
  
  // AI Basics Course - Creation Level Questions
  {
    id: 'ai-basics-c1',
    courseId: 'ai-basics',
    competencyArea: 'Responsible AI Design',
    competencyLevel: 'create',
    question: 'You\'re designing an AI system to recommend books to students in your school library. Which approach would be most inclusive and ethical?',
    answers: [
      { id: 'a', text: 'Recommend only bestsellers because those are the books most people like' },
      { id: 'b', text: 'Recommend books based solely on a student\'s past reading history' },
      { id: 'c', text: 'Design the system to recommend diverse books while considering student interests and reading level' },
      { id: 'd', text: 'Have the AI decide which books are best for each student without any human oversight' }
    ],
    correctAnswer: 'c',
    explanation: 'The most inclusive and ethical approach is to design the system to recommend diverse books while considering student interests and reading level. This balances personalization with exposure to diverse perspectives, authors, and cultures. Recommending only bestsellers limits exposure to diverse voices, relying solely on past reading history can create a "filter bubble," and removing human oversight eliminates important ethical judgment and context.'
  },
  {
    id: 'ai-basics-c2',
    courseId: 'ai-basics',
    competencyArea: 'AI Problem Solving',
    competencyLevel: 'create',
    question: 'Your community is concerned about traffic safety near your school. How could AI be used ethically to help address this problem?',
    answers: [
      { id: 'a', text: 'Use AI cameras to automatically issue tickets to anyone who drives over the speed limit' },
      { id: 'b', text: 'Use AI to analyze traffic patterns and identify safety improvements, with community input on the final decisions' },
      { id: 'c', text: 'Use AI to track and publicly identify "bad drivers" in the neighborhood' },
      { id: 'd', text: 'Replace all human crossing guards with AI robots' }
    ],
    correctAnswer: 'b',
    explanation: 'Using AI to analyze traffic patterns and identify safety improvements, while including community input on final decisions, represents an ethical application of AI. This approach uses AI\'s data analysis capabilities while respecting privacy, maintaining human oversight for important decisions, and including community stakeholders. The other options raise serious privacy concerns, remove necessary human judgment, or could create unfair outcomes without proper oversight.'
  },
  {
    id: 'ai-basics-c3',
    courseId: 'ai-basics',
    competencyArea: 'Future of AI',
    competencyLevel: 'create',
    question: 'As AI becomes more advanced, what is the most important consideration for ensuring it benefits society?',
    answers: [
      { id: 'a', text: 'Making AI systems as powerful as possible' },
      { id: 'b', text: 'Keeping AI development secret to prevent misuse' },
      { id: 'c', text: 'Ensuring AI is developed with diverse input and focused on human wellbeing' },
      { id: 'd', text: 'Letting AI systems make all important decisions without human interference' }
    ],
    correctAnswer: 'c',
    explanation: 'The most important consideration for beneficial AI is ensuring it\'s developed with diverse input and focused on human wellbeing. This approach helps prevent bias, ensures AI serves diverse needs, and keeps human values at the center of development. Simply maximizing power without ethical guidelines, keeping development secret, or removing human oversight could lead to harmful outcomes or AI systems that don\'t serve society\'s broader needs.'
  },
  
  // AI Ethics for Kids Course - Understanding Level Questions
  {
    id: 'ai-ethics-kids-u1',
    courseId: 'ai-ethics-kids',
    competencyArea: 'AI Ethics Fundamentals',
    competencyLevel: 'understand',
    question: 'What does "AI ethics" mean?',
    answers: [
      { id: 'a', text: 'Rules about which websites AI is allowed to visit' },
      { id: 'b', text: 'Guidelines and principles for creating and using AI in ways that are fair and beneficial' },
      { id: 'c', text: 'Laws that prevent AI from becoming too intelligent' },
      { id: 'd', text: 'Instructions that teach AI how to make people happy' }
    ],
    correctAnswer: 'b',
    explanation: 'AI ethics refers to guidelines and principles for creating and using AI in ways that are fair and beneficial to humanity. These principles help ensure AI systems are designed and used responsibly, with consideration for potential impacts on individuals and society. AI ethics addresses issues like fairness, transparency, privacy, and accountability in AI systems.'
  },
  {
    id: 'ai-ethics-kids-u2',
    courseId: 'ai-ethics-kids',
    competencyArea: 'Bias in AI',
    competencyLevel: 'understand',
    question: 'Why might an AI system treat some groups of people unfairly?',
    answers: [
      { id: 'a', text: 'Because AI systems naturally prefer certain types of people' },
      { id: 'b', text: 'Because AI systems are programmed to be unfair on purpose' },
      { id: 'c', text: 'Because AI systems learn from data that might contain human biases or not represent everyone equally' },
      { id: 'd', text: 'Because AI systems randomly choose which groups to favor' }
    ],
    correctAnswer: 'c',
    explanation: 'AI systems can treat some groups unfairly because they learn from data that might contain human biases or not represent everyone equally. If an AI is trained on biased data (for example, data that shows certain jobs associated primarily with one gender), it will learn and potentially amplify those biases. AI systems don\'t naturally prefer certain people, aren\'t typically programmed to be unfair on purpose, and don\'t make random choices about which groups to favor.'
  },
  {
    id: 'ai-ethics-kids-u3',
    courseId: 'ai-ethics-kids',
    competencyArea: 'Digital Inclusion',
    competencyLevel: 'understand',
    question: 'What does "digital inclusion" mean in relation to AI?',
    answers: [
      { id: 'a', text: 'Making sure AI only works on digital devices, not in the physical world' },
      { id: 'b', text: 'Ensuring everyone has equal access to and can benefit from AI and digital technologies' },
      { id: 'c', text: 'Teaching AI systems to include digital art in their creations' },
      { id: 'd', text: 'Digitizing all information so AI can access it' }
    ],
    correctAnswer: 'b',
    explanation: 'Digital inclusion means ensuring everyone has equal access to and can benefit from AI and digital technologies, regardless of factors like ability, age, location, or economic status. This includes making AI systems accessible to people with disabilities, available in multiple languages, usable without expensive equipment, and designed with diverse users in mind. Digital inclusion is about making sure no one is left behind in the digital age.'
  },
  
  // AI Ethics for Kids Course - Application Level Questions
  {
    id: 'ai-ethics-kids-a1',
    courseId: 'ai-ethics-kids',
    competencyArea: 'Privacy and AI',
    competencyLevel: 'apply',
    question: 'Your friend wants to use a free AI app that creates avatars from your photos but requires access to all your phone\'s pictures and contacts. What would you advise?',
    answers: [
      { id: 'a', text: 'Use the app - all apps need this kind of access to work properly' },
      { id: 'b', text: 'Be cautious - consider if the app really needs all that data and look for alternatives with better privacy practices' },
      { id: 'c', text: 'Use the app but delete it immediately afterward' },
      { id: 'd', text: 'Never use any AI apps because they all violate privacy' }
    ],
    correctAnswer: 'b',
    explanation: 'The best advice is to be cautious and consider whether the app really needs access to all photos and contacts. This shows critical thinking about data privacy. Many apps request more data than they need, which could be used for advertising or other purposes beyond the app\'s main function. Looking for alternatives with better privacy practices is a smart approach. Not all AI apps violate privacy, but it\'s important to evaluate each one\'s data practices.'
  },
  {
    id: 'ai-ethics-kids-a2',
    courseId: 'ai-ethics-kids',
    competencyArea: 'Responsible AI Use',
    competencyLevel: 'apply',
    question: 'You\'re using an AI writing assistant for a school assignment. What is the most responsible approach?',
    answers: [
      { id: 'a', text: 'Have the AI write the entire assignment and submit it as your own work' },
      { id: 'b', text: 'Use the AI to generate ideas and improve your writing, but do the main work yourself and acknowledge the AI assistance' },
      { id: 'c', text: 'Don\'t use AI tools at all because they\'re always considered cheating' },
      { id: 'd', text: 'Use the AI but don\'t tell anyone because teachers don\'t understand technology' }
    ],
    correctAnswer: 'b',
    explanation: 'The most responsible approach is to use the AI to generate ideas and improve your writing, while doing the main work yourself and acknowledging the AI assistance. This uses AI as a tool to enhance learning rather than replace it, maintains academic integrity through transparency, and helps you develop your own skills. Having AI write the entire assignment would be considered cheating in most schools, while avoiding AI tools altogether isn\'t necessary if they\'re used appropriately.'
  },
  {
    id: 'ai-ethics-kids-a3',
    courseId: 'ai-ethics-kids',
    competencyArea: 'AI and Misinformation',
    competencyLevel: 'apply',
    question: 'You see a realistic-looking video online of a famous person saying something shocking. What should you consider before sharing it?',
    answers: [
      { id: 'a', text: 'If it has a lot of likes and shares, it must be real' },
      { id: 'b', text: 'Whether it might be created or altered using AI, and check reliable sources to verify' },
      { id: 'c', text: 'If it\'s shocking, it\'s probably fake' },
      { id: 'd', text: 'If the video quality is high, it must be authentic' }
    ],
    correctAnswer: 'b',
    explanation: 'You should consider whether the video might be created or altered using AI, and check reliable sources to verify its authenticity. AI tools like deepfakes can create very realistic fake videos of people saying or doing things they never did. Before sharing potentially misleading content, it\'s important to verify with trusted news sources or official accounts. The number of likes, how shocking the content is, or video quality aren\'t reliable indicators of authenticity.'
  },
  
  // AI Ethics for Kids Course - Creation Level Questions
  {
    id: 'ai-ethics-kids-c1',
    courseId: 'ai-ethics-kids',
    competencyArea: 'Inclusive AI Design',
    competencyLevel: 'create',
    question: 'You\'re helping design an AI voice assistant for your school. Which approach would make it most inclusive?',
    answers: [
      { id: 'a', text: 'Give it one neutral voice that works for everyone' },
      { id: 'b', text: 'Design it with multiple voice options, languages, and accessibility features for different needs' },
      { id: 'c', text: 'Make it sound like a popular celebrity so everyone will like it' },
      { id: 'd', text: 'Focus on making it work perfectly for the majority of students' }
    ],
    correctAnswer: 'b',
    explanation: 'The most inclusive approach is to design the AI with multiple voice options, languages, and accessibility features for different needs. This ensures the assistant is usable and welcoming for students with different preferences, language backgrounds, and abilities. A single voice won\'t work equally well for everyone, a celebrity voice might not be appropriate or accessible for all, and focusing only on the majority would exclude students with different needs.'
  },
  {
    id: 'ai-ethics-kids-c2',
    courseId: 'ai-ethics-kids',
    competencyArea: 'Digital Citizenship',
    competencyLevel: 'create',
    question: 'Your class is creating guidelines for responsible AI use at school. Which guideline best promotes digital citizenship?',
    answers: [
      { id: 'a', text: 'Students should use AI to complete assignments as quickly as possible' },
      { id: 'b', text: 'Only the best students should be allowed to use AI tools' },
      { id: 'c', text: 'Students should use AI tools to enhance learning while being transparent about AI assistance' },
      { id: 'd', text: 'Teachers should use AI to monitor everything students do online' }
    ],
    correctAnswer: 'c',
    explanation: 'The guideline that best promotes digital citizenship is for students to use AI tools to enhance learning while being transparent about AI assistance. This approach encourages responsible use of technology, honesty, and using AI as a tool for learning rather than a shortcut. It balances the benefits of AI with ethical considerations like academic integrity and appropriate use. The other options either promote misuse of AI, create unfair access, or raise privacy concerns.'
  },
  {
    id: 'ai-ethics-kids-c3',
    courseId: 'ai-ethics-kids',
    competencyArea: 'AI for Social Good',
    competencyLevel: 'create',
    question: 'Your school wants to use AI to help solve a community problem. Which approach best demonstrates using AI for social good?',
    answers: [
      { id: 'a', text: 'Use AI to identify which students are likely to get in trouble and watch them more closely' },
      { id: 'b', text: 'Use AI to analyze school waste and develop a more effective recycling program with student input' },
      { id: 'c', text: 'Use AI to replace school counselors to save money' },
      { id: 'd', text: 'Use AI to rank students from best to worst so teachers know who to help' }
    ],
    correctAnswer: 'b',
    explanation: 'Using AI to analyze school waste and develop a more effective recycling program with student input best demonstrates AI for social good. This approach addresses an environmental challenge, includes stakeholder input (students), and uses AI for analysis while keeping humans involved in decision-making. The other options raise serious ethical concerns about privacy, profiling, replacing human support roles, or creating potentially harmful ranking systems that could negatively impact students.'
  }
];
