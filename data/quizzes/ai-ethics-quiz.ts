import { Quiz } from '@/lib/quiz-system'

export const aiEthicsQuiz: Quiz = {
  id: 'ai-ethics-quiz',
  title: 'AI Ethics Quiz',
  description: 'Test your knowledge about ethical considerations in artificial intelligence!',
  category: 'AI Ethics',
  color: 'from-purple-500 to-pink-500',
  icon: 'Brain',
  questions: [
    {
      id: 1,
      question: 'What does "bias" mean in AI systems?',
      options: [
        'When an AI has a favorite color or food',
        'When an AI treats different groups of people unfairly',
        'When an AI makes a mistake',
        'When an AI is too slow'
      ],
      correctAnswer: 1,
      explanation: 'Bias in AI means the system treats different groups of people unfairly. This can happen when the data used to train the AI doesn\'t represent everyone equally or contains existing biases from society.',
      difficulty: 'easy'
    },
    {
      id: 2,
      question: 'Why is it important for AI to be fair?',
      options: [
        'Because AI should always agree with everyone',
        'Because fairness makes AI systems run faster',
        'Because unfair AI can harm people and reinforce discrimination',
        'Because fair AI costs less money to build'
      ],
      correctAnswer: 2,
      explanation: 'Fair AI is important because unfair systems can harm people by discriminating against certain groups, reinforcing existing biases, or denying opportunities to some people based on characteristics like race, gender, or age.',
      difficulty: 'easy'
    },
    {
      id: 3,
      question: 'What is "transparency" in AI?',
      options: [
        'When AI systems are made of clear glass or plastic',
        'When we can understand how AI makes decisions',
        'When AI can see through walls',
        'When AI works very quickly'
      ],
      correctAnswer: 1,
      explanation: 'Transparency in AI means we can understand how the AI system works and makes decisions. This is important so we can identify problems, ensure the AI is working as intended, and hold people accountable for how AI is used.',
      difficulty: 'medium'
    },
    {
      id: 4,
      question: 'What should you do if an AI tool creates something that looks like someone else\'s work?',
      options: [
        'Claim it as your own original work',
        'Give credit to the AI only',
        'Give credit to both the AI tool and the original creators whose work influenced it',
        'Hide the fact that AI was used'
      ],
      correctAnswer: 2,
      explanation: 'When AI creates something that resembles existing work, it\'s important to give credit to both the AI tool you used and acknowledge that the AI was trained on work by human creators. This is honest and respectful to the original creators.',
      difficulty: 'medium'
    },
    {
      id: 5,
      question: 'Why is privacy important when using AI?',
      options: [
        'Privacy isn\'t important for AI systems',
        'Because AI needs to keep secrets',
        'Because AI systems often use personal data, which should be protected',
        'Because private AI systems work faster'
      ],
      correctAnswer: 2,
      explanation: 'Privacy is important because many AI systems collect and use personal data to function. This data should be protected to respect people\'s privacy rights and prevent misuse of sensitive information.',
      difficulty: 'medium'
    },
    {
      id: 6,
      question: 'What is "human oversight" in AI?',
      options: [
        'When humans watch AI through a telescope',
        'When humans check and control AI systems to ensure they work properly and ethically',
        'When AI watches what humans are doing',
        'When humans compete against AI in games'
      ],
      correctAnswer: 1,
      explanation: 'Human oversight means humans monitor, check, and control AI systems to ensure they function properly and ethically. This is important because AI can make mistakes or have unintended consequences that humans need to catch and correct.',
      difficulty: 'medium'
    },
    {
      id: 7,
      question: 'What should you consider before sharing AI-generated images of real people?',
      options: [
        'Nothing, AI-generated images can be shared freely',
        'Only the quality of the image matters',
        'Whether the person would consent and how the image might affect them',
        'Only whether the image looks realistic'
      ],
      correctAnswer: 2,
      explanation: 'Before sharing AI-generated images of real people, you should consider whether the person would consent to such an image being created and shared, and how the image might affect their reputation or feelings. Creating or sharing realistic fake images of people without permission can be harmful.',
      difficulty: 'hard'
    },
    {
      id: 8,
      question: 'What is "responsible AI"?',
      options: [
        'AI that can take care of pets',
        'AI that is developed and used in ways that are ethical, fair, transparent, and beneficial',
        'AI that costs very little money',
        'AI that works without electricity'
      ],
      correctAnswer: 1,
      explanation: 'Responsible AI refers to developing and using AI in ways that are ethical, fair, transparent, and beneficial to humanity. It involves considering potential harms and benefits, ensuring fairness, respecting privacy, and maintaining human oversight.',
      difficulty: 'hard'
    },
    {
      id: 9,
      question: 'Why should humans make the final decisions on important matters, not AI?',
      options: [
        'Because humans are always smarter than AI',
        'Because AI is too expensive to use for important decisions',
        'Because humans can consider ethical and social factors that AI might miss',
        'Because AI works too slowly for important decisions'
      ],
      correctAnswer: 2,
      explanation: 'Humans should make final decisions on important matters because we can consider ethical, social, and contextual factors that AI might miss. AI lacks human judgment, empathy, and moral reasoning, which are crucial for many important decisions.',
      difficulty: 'hard'
    },
    {
      id: 10,
      question: 'What is an important ethical question to ask before using AI to create content?',
      options: [
        'Will this AI make me famous?',
        'Is this AI the fastest available?',
        'Am I using this AI to help or harm others?',
        'Is this AI the most expensive?'
      ],
      correctAnswer: 2,
      explanation: 'An important ethical question to ask is whether you\'re using AI to help or harm others. AI should be used in ways that benefit people and society, not to deceive, manipulate, or cause harm to others.',
      difficulty: 'hard'
    }
  ]
}
