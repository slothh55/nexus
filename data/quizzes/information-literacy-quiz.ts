import { Quiz } from '@/lib/quiz-system'

export const informationLiteracyQuiz: Quiz = {
  id: 'information-literacy-quiz',
  title: 'Information Literacy Quiz',
  description: 'Test your skills in finding, evaluating, and using information responsibly!',
  category: 'Information Literacy',
  color: 'from-green-500 to-teal-500',
  icon: 'BookOpen',
  questions: [
    {
      id: 1,
      question: 'What is "information literacy"?',
      options: [
        'Being able to read very quickly',
        'The ability to find, evaluate, and use information effectively and ethically',
        'Knowing how to use a computer',
        'Being able to remember lots of facts'
      ],
      correctAnswer: 1,
      explanation: 'Information literacy is the ability to find, evaluate, and use information effectively and ethically. It involves knowing when you need information, where to find it, how to evaluate its quality, and how to use it responsibly.',
      difficulty: 'easy'
    },
    {
      id: 2,
      question: 'Which of these is NOT a good way to tell if information is reliable?',
      options: [
        'Checking if it comes from an expert or trusted organization',
        'Seeing if it\'s supported by evidence',
        'Checking if it was published recently (for time-sensitive topics)',
        'Believing it because it has a lot of likes or shares'
      ],
      correctAnswer: 3,
      explanation: 'The number of likes or shares a piece of information has is NOT a good indicator of reliability. Popular content can still be false or misleading. Instead, focus on the source\'s expertise, the evidence provided, and whether the information is current for time-sensitive topics.',
      difficulty: 'easy'
    },
    {
      id: 3,
      question: 'What is a "primary source"?',
      options: [
        'The first website that appears in search results',
        'Original materials created during the time being studied, like diaries, photos, or interviews',
        'A textbook that summarizes information',
        'A website that collects information from many different sources'
      ],
      correctAnswer: 1,
      explanation: 'A primary source is an original material created during the time being studied, such as diaries, letters, photographs, original research, interviews, or firsthand accounts. Primary sources provide direct evidence about a topic or event.',
      difficulty: 'easy'
    },
    {
      id: 4,
      question: 'What does it mean to "cite" a source?',
      options: [
        'To disagree with the information in the source',
        'To summarize the main points of the source',
        'To give credit to the source of information you\'ve used',
        'To publish the source online'
      ],
      correctAnswer: 2,
      explanation: 'Citing a source means giving credit to where you found information by providing details about the author, title, publication date, and other relevant information. This acknowledges others\' work, allows readers to find your sources, and helps avoid plagiarism.',
      difficulty: 'medium'
    },
    {
      id: 5,
      question: 'What is "confirmation bias"?',
      options: [
        'When a website confirms your account by email',
        'The tendency to search for and believe information that supports what you already think',
        'When multiple sources confirm the same fact',
        'When a teacher confirms your research is correct'
      ],
      correctAnswer: 1,
      explanation: 'Confirmation bias is the tendency to search for, interpret, and remember information that confirms what you already believe, while ignoring information that contradicts your beliefs. This can lead to a skewed understanding of a topic.',
      difficulty: 'medium'
    },
    {
      id: 6,
      question: 'Which of these is an example of a scholarly source?',
      options: [
        'A personal blog',
        'A social media post',
        'A peer-reviewed journal article',
        'A popular magazine'
      ],
      correctAnswer: 2,
      explanation: 'A peer-reviewed journal article is an example of a scholarly source. Scholarly sources are written by experts, cite their sources, undergo rigorous review processes, and are published in academic journals or by university presses.',
      difficulty: 'medium'
    },
    {
      id: 7,
      question: 'What is "lateral reading"?',
      options: [
        'Reading multiple books at the same time',
        'Reading from left to right',
        'Opening new tabs to check other sources about a website or claim before trusting it',
        'Reading very quickly by scanning text'
      ],
      correctAnswer: 2,
      explanation: 'Lateral reading is the practice of opening new tabs to check other sources about a website or claim before trusting it. Instead of staying on one website and evaluating it in isolation, lateral reading involves comparing information across multiple sources to verify reliability.',
      difficulty: 'hard'
    },
    {
      id: 8,
      question: 'What is "clickbait"?',
      options: [
        'Links that don\'t work when clicked',
        'Sensational or misleading headlines designed to get clicks, even if the content doesn\'t deliver what was promised',
        'Advertisements that appear when you click on a website',
        'Links that lead to computer viruses'
      ],
      correctAnswer: 1,
      explanation: 'Clickbait refers to sensational or misleading headlines designed to attract clicks, even if the content doesn\'t deliver what was promised. Clickbait often uses exaggerated claims, emotional triggers, or curiosity gaps to entice readers.',
      difficulty: 'hard'
    },
    {
      id: 9,
      question: 'Why is it important to use multiple sources when researching a topic?',
      options: [
        'To make your bibliography longer',
        'Because teachers require a minimum number of sources',
        'To get different perspectives and verify information across sources',
        'Because one source never has enough information'
      ],
      correctAnswer: 2,
      explanation: 'Using multiple sources is important because it allows you to get different perspectives, verify information across sources, and develop a more complete understanding of a topic. No single source provides the full picture, and some sources may contain errors or biases.',
      difficulty: 'hard'
    },
    {
      id: 10,
      question: 'What is "copyright"?',
      options: [
        'The right to copy anything you find online',
        'Legal protection given to the creator of original work, limiting how others can use it',
        'A watermark on photos',
        'Permission to use any information for educational purposes'
      ],
      correctAnswer: 1,
      explanation: 'Copyright is legal protection given to the creator of original work, limiting how others can use it without permission. Understanding copyright helps you use information ethically by respecting creators\' rights and knowing when you need permission to use someone else\'s work.',
      difficulty: 'hard'
    }
  ]
}
