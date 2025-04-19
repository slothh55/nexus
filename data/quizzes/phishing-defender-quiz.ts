import { Quiz } from '@/lib/quiz-system'

export const phishingDefenderQuiz: Quiz = {
  id: 'phishing-defender-quiz',
  title: 'Phishing Defender Quiz',
  description: 'Test your knowledge about phishing and how to stay safe online!',
  category: 'Online Safety',
  color: 'from-red-500 to-orange-500',
  icon: 'Shield',
  questions: [
    {
      id: 1,
      question: 'What is phishing?',
      options: [
        'A type of fishing sport',
        'A trick to steal your personal information',
        'A computer virus that deletes files',
        'A way to make your computer faster'
      ],
      correctAnswer: 1,
      explanation: 'Phishing is a trick where someone tries to steal your personal information like passwords or credit card numbers by pretending to be someone you trust.',
      difficulty: 'easy'
    },
    {
      id: 2,
      question: 'Which of these is a warning sign of a phishing email?',
      options: [
        'The email comes from someone you know',
        'The email has no spelling mistakes',
        'The email asks you to click a link to verify your account urgently',
        'The email has the company\'s correct logo'
      ],
      correctAnswer: 2,
      explanation: 'Phishing emails often create a sense of urgency to make you act quickly without thinking. They might say your account will be closed or something bad will happen if you don\'t click their link right away.',
      difficulty: 'easy'
    },
    {
      id: 3,
      question: 'What should you do if you receive an email asking for your password?',
      options: [
        'Reply with your password',
        'Click the link and enter your password',
        'Forward it to a friend to check',
        'Delete the email - real companies never ask for your password in an email'
      ],
      correctAnswer: 3,
      explanation: 'Legitimate companies will never ask for your password via email. If you receive an email asking for your password, it\'s almost certainly a phishing attempt.',
      difficulty: 'easy'
    },
    {
      id: 4,
      question: 'How can you check if a website link is safe?',
      options: [
        'Click it and see if it looks normal',
        'Hover over the link to see the real web address before clicking',
        'Ask a friend to click it first',
        'Check if the email has a logo'
      ],
      correctAnswer: 1,
      explanation: 'Hovering your mouse over a link (without clicking) will show you the actual web address it will take you to. If this address looks suspicious or different from what you expect, don\'t click it.',
      difficulty: 'medium'
    },
    {
      id: 5,
      question: 'Which of these email addresses is most likely to be a phishing attempt?',
      options: [
        'support@amazon.com',
        'customerservice@netflix.com',
        'apple-support@secure-appleid.com',
        'help@microsoft.com'
      ],
      correctAnswer: 2,
      explanation: 'The email "apple-support@secure-appleid.com" is suspicious because it\'s not using Apple\'s official domain (apple.com). Phishers often use domain names that look similar to real companies but are slightly different.',
      difficulty: 'medium'
    },
    {
      id: 6,
      question: 'What is "spear phishing"?',
      options: [
        'Phishing emails sent to millions of people',
        'Phishing attempts targeted at specific individuals using personal information',
        'Phishing using text messages instead of emails',
        'Phishing that only steals banking information'
      ],
      correctAnswer: 1,
      explanation: 'Spear phishing is a targeted form of phishing where attackers customize their messages using specific information about you, making them more convincing and harder to identify as fake.',
      difficulty: 'hard'
    },
    {
      id: 7,
      question: 'If you think you\'ve fallen for a phishing scam, what should you do FIRST?',
      options: [
        'Delete the email and pretend nothing happened',
        'Click "unsubscribe" in the email',
        'Change your passwords immediately',
        'Share the email with friends to warn them'
      ],
      correctAnswer: 2,
      explanation: 'If you think you\'ve fallen for a phishing scam, the first thing you should do is change your passwords for any accounts that might be affected. Then report the phishing attempt to the company being impersonated.',
      difficulty: 'medium'
    },
    {
      id: 8,
      question: 'Which of these is NOT a common goal of phishing?',
      options: [
        'Stealing passwords',
        'Getting credit card information',
        'Installing malware on your computer',
        'Improving your computer\'s performance'
      ],
      correctAnswer: 3,
      explanation: 'Phishing attempts are never trying to help you or improve your computer. Their goals are always harmful, like stealing your information or installing malware.',
      difficulty: 'easy'
    },
    {
      id: 9,
      question: 'What does "HTTPS" at the beginning of a website address mean?',
      options: [
        'The website is a government website',
        'The website is using a secure connection',
        'The website is a shopping website',
        'The website is free to use'
      ],
      correctAnswer: 1,
      explanation: 'HTTPS (Hypertext Transfer Protocol Secure) means the website is using encryption to protect data that\'s sent between your browser and the website. Look for HTTPS and a padlock icon in the address bar when entering sensitive information.',
      difficulty: 'medium'
    },
    {
      id: 10,
      question: 'Which of these organizations is MOST likely to send you a legitimate email asking you to verify your account?',
      options: [
        'The "International Lottery Commission"',
        'Your school or workplace',
        'The "Federal Financial Department"',
        'The "Worldwide Bank Authority"'
      ],
      correctAnswer: 1,
      explanation: 'Your school or workplace might legitimately need you to verify your account. The other options are fake or suspicious-sounding organizations that phishers might invent to sound official.',
      difficulty: 'medium'
    }
  ]
}
