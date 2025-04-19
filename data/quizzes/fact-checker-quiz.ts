import { Quiz } from '@/lib/quiz-system'

export const factCheckerQuiz: Quiz = {
  id: 'fact-checker-quiz',
  title: 'Fact Checker Quiz',
  description: 'Test your fact-checking skills and learn to spot reliable information!',
  category: 'Information Literacy',
  color: 'from-blue-500 to-purple-500',
  icon: 'Brain',
  questions: [
    {
      id: 1,
      question: 'Which of these is the MOST reliable source for scientific information?',
      options: [
        'A post from a friend on social media',
        'A news article that doesn\'t cite any sources',
        'A peer-reviewed scientific journal',
        'A website with lots of advertisements'
      ],
      correctAnswer: 2,
      explanation: 'Peer-reviewed scientific journals are the most reliable sources for scientific information because experts in the field review the research before it\'s published to make sure it\'s accurate and well-conducted.',
      difficulty: 'easy'
    },
    {
      id: 2,
      question: 'What does it mean to "fact-check" something?',
      options: [
        'To believe information because it sounds true',
        'To verify information by checking reliable sources',
        'To share information with friends to see if they agree',
        'To only trust information from social media'
      ],
      correctAnswer: 1,
      explanation: 'Fact-checking means verifying information by consulting reliable sources to determine if the information is accurate, rather than just believing something because it sounds true or matches what you already believe.',
      difficulty: 'easy'
    },
    {
      id: 3,
      question: 'Why is it important to check multiple sources?',
      options: [
        'Because one source is never enough to get the full picture',
        'Because it takes more time and makes you look smarter',
        'Because all sources always agree with each other',
        'Because your teacher said so'
      ],
      correctAnswer: 0,
      explanation: 'Checking multiple reliable sources is important because one source might be biased, incomplete, or incorrect. Multiple sources help you get a more complete and accurate understanding of a topic.',
      difficulty: 'easy'
    },
    {
      id: 4,
      question: 'What is "confirmation bias"?',
      options: [
        'When you only believe information from your friends',
        'When you only trust information from the government',
        'When you tend to believe information that confirms what you already think',
        'When you check multiple sources to verify information'
      ],
      correctAnswer: 2,
      explanation: 'Confirmation bias is the tendency to search for, interpret, and remember information that confirms what you already believe. It\'s important to be aware of this bias and try to consider information that challenges your existing beliefs.',
      difficulty: 'medium'
    },
    {
      id: 5,
      question: 'Which of these is a warning sign that information might NOT be reliable?',
      options: [
        'The information comes from an expert in the field',
        'The information includes specific dates and statistics',
        'The information uses a lot of emotional language and ALL CAPS',
        'The information cites multiple sources'
      ],
      correctAnswer: 2,
      explanation: 'Emotional language, ALL CAPS, and sensational claims are warning signs of unreliable information. Reliable sources typically present information in a calm, balanced way with evidence to support their claims.',
      difficulty: 'medium'
    },
    {
      id: 6,
      question: 'What is a "primary source"?',
      options: [
        'Any information found on the internet',
        'Original materials from the time period being studied',
        'A textbook that summarizes information',
        'A news article about an event'
      ],
      correctAnswer: 1,
      explanation: 'Primary sources are original materials from the time period being studied, like diaries, letters, original research papers, or eyewitness accounts. They provide firsthand evidence about a topic or event.',
      difficulty: 'medium'
    },
    {
      id: 7,
      question: 'If a website URL ends with .edu, what does that usually mean?',
      options: [
        'It\'s an entertainment website',
        'It\'s a government website',
        'It\'s an educational institution like a university',
        'It\'s a commercial business'
      ],
      correctAnswer: 2,
      explanation: 'A website URL ending with .edu indicates it belongs to an educational institution like a university or college. These sites are generally more reliable for academic information, though you should still evaluate the specific content.',
      difficulty: 'medium'
    },
    {
      id: 8,
      question: 'What does "correlation does not imply causation" mean?',
      options: [
        'Two things happening together doesn\'t necessarily mean one caused the other',
        'If two things happen together, one definitely caused the other',
        'Scientific studies are never reliable',
        'Statistics are always misleading'
      ],
      correctAnswer: 0,
      explanation: '"Correlation does not imply causation" means that just because two things happen together or are related, it doesn\'t necessarily mean that one caused the other. There could be other factors involved or it could be coincidence.',
      difficulty: 'hard'
    },
    {
      id: 9,
      question: 'Why is it important to check when information was published?',
      options: [
        'Because newer information is always more interesting',
        'Because information can become outdated as new discoveries are made',
        'Because older information is always more reliable',
        'Because the date tells you who wrote it'
      ],
      correctAnswer: 1,
      explanation: 'It\'s important to check when information was published because knowledge evolves over time as new discoveries are made. In many fields, especially science and technology, information can quickly become outdated.',
      difficulty: 'easy'
    },
    {
      id: 10,
      question: 'What is "clickbait"?',
      options: [
        'A type of fishing lure',
        'A reliable news source',
        'Misleading titles or thumbnails designed to get you to click on content',
        'A computer virus'
      ],
      correctAnswer: 2,
      explanation: 'Clickbait refers to sensational or misleading titles, headlines, or thumbnails designed primarily to attract attention and get you to click on the content, rather than to provide accurate information.',
      difficulty: 'easy'
    }
  ]
}
