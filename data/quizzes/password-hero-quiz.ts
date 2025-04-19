import { Quiz } from '@/lib/quiz-system'

export const passwordHeroQuiz: Quiz = {
  id: 'password-hero-quiz',
  title: 'Password Hero Quiz',
  description: 'Test your knowledge about creating and managing strong passwords!',
  category: 'Online Safety',
  color: 'from-green-500 to-emerald-500',
  icon: 'Lock',
  questions: [
    {
      id: 1,
      question: 'Which of these passwords is the strongest?',
      options: [
        'password123',
        'fluffy',
        'MyDog!2010',
        'qwerty'
      ],
      correctAnswer: 2,
      explanation: 'MyDog!2010 is the strongest password in this list because it combines uppercase and lowercase letters, a number, a special character, and is longer than the other options.',
      difficulty: 'easy'
    },
    {
      id: 2,
      question: 'What makes a password strong?',
      options: [
        'Using your name and birthday',
        'Using the same password for all your accounts',
        'Using a combination of letters, numbers, and special characters',
        'Using a short, simple word'
      ],
      correctAnswer: 2,
      explanation: 'Strong passwords use a combination of uppercase and lowercase letters, numbers, and special characters. They should also be long (at least 12 characters) and not contain easily guessable information like your name or birthday.',
      difficulty: 'easy'
    },
    {
      id: 3,
      question: 'Why should you use different passwords for different accounts?',
      options: [
        'To make your accounts more colorful',
        'So if one password is stolen, not all your accounts are at risk',
        'Because it\'s more fun to have many passwords',
        'To make your computer run faster'
      ],
      correctAnswer: 1,
      explanation: 'Using different passwords for different accounts is important because if one password is stolen or compromised, the attacker won\'t have access to all your other accounts. This limits the damage they can do.',
      difficulty: 'easy'
    },
    {
      id: 4,
      question: 'What is a "password manager"?',
      options: [
        'A person who manages passwords for a company',
        'A tool that helps you create, store, and manage strong passwords',
        'A book where you write down all your passwords',
        'A website that collects passwords'
      ],
      correctAnswer: 1,
      explanation: 'A password manager is a secure tool that helps you create, store, and manage strong, unique passwords for all your accounts. It encrypts your passwords and you only need to remember one master password to access them all.',
      difficulty: 'medium'
    },
    {
      id: 5,
      question: 'Which of these is a good way to remember a strong password?',
      options: [
        'Write it on a sticky note attached to your computer',
        'Use a password manager',
        'Share it with a friend so they can remind you',
        'Use the same password for everything so it\'s easy to remember'
      ],
      correctAnswer: 1,
      explanation: 'Using a password manager is the best way to remember strong passwords. It securely stores all your passwords, so you only need to remember one master password. Never write passwords on sticky notes or share them with others.',
      difficulty: 'medium'
    },
    {
      id: 6,
      question: 'What is "two-factor authentication" (2FA)?',
      options: [
        'Having two different passwords for one account',
        'Needing both a password and a second verification method to log in',
        'Changing your password twice a year',
        'Having two people approve every login'
      ],
      correctAnswer: 1,
      explanation: 'Two-factor authentication (2FA) adds an extra layer of security by requiring both something you know (your password) and something you have (like your phone) to log in. This makes your account much more secure, even if someone knows your password.',
      difficulty: 'medium'
    },
    {
      id: 7,
      question: 'Which of these would make a good password?',
      options: [
        'The name of your pet',
        'Your birthday',
        'A random phrase like "BlueElephant$Jump75!"',
        'The word "password"'
      ],
      correctAnswer: 2,
      explanation: 'A random phrase with a mix of uppercase and lowercase letters, numbers, and special characters makes a good password. Personal information like pet names or birthdays should be avoided as they\'re easier to guess.',
      difficulty: 'easy'
    },
    {
      id: 8,
      question: 'How often should you change your passwords?',
      options: [
        'Never, if it\'s a strong password',
        'Every day',
        'When there\'s a reason to, like a data breach or suspicious activity',
        'Only when you forget them'
      ],
      correctAnswer: 2,
      explanation: 'You should change your passwords when there\'s a reason to, such as after a data breach, if you notice suspicious activity, or if you\'ve shared the password. Constantly changing passwords can lead to weaker passwords or writing them down.',
      difficulty: 'medium'
    },
    {
      id: 9,
      question: 'What is a "passphrase"?',
      options: [
        'A short, simple password',
        'A long password made up of multiple words or a sentence',
        'A password that expires after one use',
        'A password shared between friends'
      ],
      correctAnswer: 1,
      explanation: 'A passphrase is a type of password that uses a sequence of words or a sentence. Passphrases are often longer than traditional passwords, making them more secure while still being easier to remember.',
      difficulty: 'medium'
    },
    {
      id: 10,
      question: 'If a website gets hacked, what should you do with your password for that site?',
      options: [
        'Nothing, it\'s the website\'s problem',
        'Change it immediately',
        'Use it for other websites too',
        'Tell everyone your password so they can check if it was stolen'
      ],
      correctAnswer: 1,
      explanation: 'If a website you use gets hacked, you should change your password for that site immediately. If you\'ve used the same password on other sites, change those too. This helps protect your accounts from hackers who might try to use your stolen password.',
      difficulty: 'easy'
    }
  ]
}
