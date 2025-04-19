import { Quiz } from '@/lib/quiz-system'

export const onlineSafetyQuiz: Quiz = {
  id: 'online-safety-quiz',
  title: 'Online Safety Quiz',
  description: 'Test your knowledge about staying safe in the digital world!',
  category: 'Online Safety',
  color: 'from-red-500 to-orange-500',
  icon: 'Shield',
  questions: [
    {
      id: 1,
      question: 'Which of the following is personal information that you should be careful about sharing online?',
      options: [
        'Your favorite color',
        'Your home address',
        'Your opinion about a movie',
        'Your favorite subject in school'
      ],
      correctAnswer: 1,
      explanation: 'Your home address is personal information that should be kept private. Sharing it publicly online could put your safety at risk. Information like favorite colors, movie opinions, or school subjects is generally safe to share.',
      difficulty: 'easy'
    },
    {
      id: 2,
      question: 'What should you do if a stranger online asks to meet you in person?',
      options: [
        'Agree to meet them in a public place',
        'Give them your address so they can come to your home',
        'Tell a trusted adult about the request and never agree to meet',
        'Ask them for more information about themselves first'
      ],
      correctAnswer: 2,
      explanation: 'If a stranger online asks to meet you in person, you should tell a trusted adult about the request and never agree to meet. Meeting people you only know online can be dangerous, even in public places.',
      difficulty: 'easy'
    },
    {
      id: 3,
      question: 'What is a strong password?',
      options: [
        'Your name followed by your birthday',
        'The word "password"',
        'A short word that\'s easy to remember',
        'A long combination of letters, numbers, and symbols that doesn\'t contain personal information'
      ],
      correctAnswer: 3,
      explanation: 'A strong password is a long combination of letters (both uppercase and lowercase), numbers, and symbols that doesn\'t contain easily guessable personal information. Strong passwords help protect your accounts from unauthorized access.',
      difficulty: 'easy'
    },
    {
      id: 4,
      question: 'What should you do if you receive a message or email asking for your password?',
      options: [
        'Reply with your password if it\'s from a company you know',
        'Never share your password and report the message as suspicious',
        'Share your password but change it right after',
        'Only share your password if they explain why they need it'
      ],
      correctAnswer: 1,
      explanation: 'You should never share your password with anyone, even if the message appears to be from a company you know. Legitimate companies will never ask for your password. Report such messages as suspicious or phishing attempts.',
      difficulty: 'medium'
    },
    {
      id: 5,
      question: 'What is "public Wi-Fi"?',
      options: [
        'Wi-Fi that only works outdoors',
        'Wi-Fi networks available for anyone to use in places like cafes, libraries, or airports',
        'Wi-Fi that only works on public holidays',
        'The fastest type of Wi-Fi connection'
      ],
      correctAnswer: 1,
      explanation: 'Public Wi-Fi refers to wireless networks available for anyone to use in public places like cafes, libraries, airports, or hotels. These networks are convenient but can pose security risks because they\'re often unencrypted and shared with strangers.',
      difficulty: 'medium'
    },
    {
      id: 6,
      question: 'Why should you be careful when using public Wi-Fi?',
      options: [
        'Because it costs money to use',
        'Because it\'s always very slow',
        'Because others might be able to see your online activity or steal your information',
        'Because it uses too much battery power'
      ],
      correctAnswer: 2,
      explanation: 'You should be careful when using public Wi-Fi because these networks are often unsecured, meaning others might be able to see your online activity or steal your information. Avoid logging into sensitive accounts or sharing personal information when using public Wi-Fi.',
      difficulty: 'medium'
    },
    {
      id: 7,
      question: 'What is "two-factor authentication" (2FA)?',
      options: [
        'Having two different passwords for one account',
        'An extra security step that requires something you know (password) and something you have (like your phone)',
        'Logging in from two different devices at once',
        'Changing your password twice a year'
      ],
      correctAnswer: 1,
      explanation: 'Two-factor authentication (2FA) is an extra security step that requires both something you know (your password) and something you have (like your phone) to log in. This makes your account more secure because even if someone gets your password, they still can\'t access your account without the second factor.',
      difficulty: 'hard'
    },
    {
      id: 8,
      question: 'What should you do if you think your account has been hacked?',
      options: [
        'Do nothing and hope the hacker goes away',
        'Create a new account and abandon the old one',
        'Change your password immediately, enable two-factor authentication if available, and check for unauthorized activity',
        'Share the news on social media to warn your friends'
      ],
      correctAnswer: 2,
      explanation: 'If you think your account has been hacked, you should change your password immediately, enable two-factor authentication if available, and check for any unauthorized activity. You should also consider notifying the service provider and any contacts who might have received suspicious messages.',
      difficulty: 'hard'
    },
    {
      id: 9,
      question: 'What is a "privacy policy"?',
      options: [
        'A law that prevents websites from collecting any information',
        'A document that explains how a website or app collects, uses, and protects your information',
        'A setting that automatically makes all your posts private',
        'A promise that websites will never share your information'
      ],
      correctAnswer: 1,
      explanation: 'A privacy policy is a document that explains how a website or app collects, uses, shares, and protects your information. Reading privacy policies can help you understand what happens to your data when you use a service.',
      difficulty: 'hard'
    },
    {
      id: 10,
      question: 'What is "digital citizenship"?',
      options: [
        'Having a passport for the internet',
        'Being able to vote online',
        'Using technology and the internet in responsible, ethical ways',
        'Being born after the internet was invented'
      ],
      correctAnswer: 2,
      explanation: 'Digital citizenship refers to using technology and the internet in responsible, ethical, and safe ways. It includes respecting others online, protecting your privacy and security, thinking critically about online information, and contributing positively to digital communities.',
      difficulty: 'hard'
    }
  ]
}
