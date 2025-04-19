import { Quiz } from '@/lib/quiz-system'

export const privacyProtectorQuiz: Quiz = {
  id: 'privacy-protector-quiz',
  title: 'Privacy Protector Quiz',
  description: 'Test your knowledge about protecting your privacy online!',
  category: 'Online Safety',
  color: 'from-purple-500 to-pink-500',
  icon: 'Shield',
  questions: [
    {
      id: 1,
      question: 'What is "personal information"?',
      options: [
        'Information that only you know',
        'Information that can be used to identify you, like your name or address',
        'Information about your favorite things',
        'Information that you share with friends'
      ],
      correctAnswer: 1,
      explanation: 'Personal information is any information that can be used to identify you as an individual, such as your full name, address, phone number, email address, or social security number.',
      difficulty: 'easy'
    },
    {
      id: 2,
      question: 'Which of these is safe to share publicly online?',
      options: [
        'Your home address',
        'Your full name and birth date',
        'Your opinions about a popular movie',
        'Your school schedule'
      ],
      correctAnswer: 2,
      explanation: 'Your opinions about things like movies, books, or games are generally safe to share online. Personal details like your address, full name, birth date, or schedule should be kept private to protect your safety and identity.',
      difficulty: 'easy'
    },
    {
      id: 3,
      question: 'What are "privacy settings"?',
      options: [
        'Settings that make your device run faster',
        'Controls that let you decide who can see what you share online',
        'Settings that block all websites',
        'Controls that make your screen brighter'
      ],
      correctAnswer: 1,
      explanation: 'Privacy settings are controls provided by apps, websites, and devices that let you decide who can see the information you share, how your information is used, and what information is collected about you.',
      difficulty: 'easy'
    },
    {
      id: 4,
      question: 'Why should you check app permissions before installing?',
      options: [
        'To see if the app is free',
        'To see if the app is popular',
        'To see what information and device features the app will access',
        'To see if the app has good reviews'
      ],
      correctAnswer: 2,
      explanation: 'You should check app permissions before installing to see what information and device features (like your camera, microphone, or location) the app will be able to access. Only install apps that request permissions they actually need to function.',
      difficulty: 'medium'
    },
    {
      id: 5,
      question: 'What is a "digital footprint"?',
      options: [
        'The size of your computer',
        'The trace of your activities and information you leave online',
        'A type of computer virus',
        'A measurement of how fast you type'
      ],
      correctAnswer: 1,
      explanation: 'Your digital footprint is the trace of all your activities and information you leave behind when using the internet. This includes posts on social media, websites you visit, online purchases, and more.',
      difficulty: 'medium'
    },
    {
      id: 6,
      question: 'What does "incognito mode" or "private browsing" do?',
      options: [
        'Makes you completely anonymous online',
        'Prevents websites from collecting any data about you',
        'Doesn\'t save your browsing history on your device',
        'Blocks all advertisements'
      ],
      correctAnswer: 2,
      explanation: 'Incognito or private browsing mode prevents your browser from saving your browsing history, cookies, and site data on your device. However, it doesn\'t make you anonymous online - websites, your internet service provider, and network administrators can still see your activity.',
      difficulty: 'medium'
    },
    {
      id: 7,
      question: 'Which of these is a good privacy practice for social media?',
      options: [
        'Accepting friend requests from everyone',
        'Posting your location in real-time',
        'Using the same password for all your accounts',
        'Regularly reviewing and updating your privacy settings'
      ],
      correctAnswer: 3,
      explanation: 'Regularly reviewing and updating your privacy settings is a good practice for social media. Social media platforms often change their privacy policies and settings, so it\'s important to check them periodically to ensure your information is protected as you intend.',
      difficulty: 'easy'
    },
    {
      id: 8,
      question: 'What are "cookies" in the context of web browsing?',
      options: [
        'Snacks to eat while using the internet',
        'Small files that websites store on your device to remember information about you',
        'Viruses that damage your computer',
        'Rewards for visiting websites frequently'
      ],
      correctAnswer: 1,
      explanation: 'Cookies are small text files that websites store on your device to remember information about you and your visit. They can be useful (like remembering your login status) but can also be used to track your browsing habits across different sites.',
      difficulty: 'medium'
    },
    {
      id: 9,
      question: 'Why might you want to turn off location services for some apps?',
      options: [
        'To save battery life',
        'To prevent apps from knowing and sharing your physical location',
        'To make your device run faster',
        'To use less mobile data'
      ],
      correctAnswer: 1,
      explanation: 'You might want to turn off location services for some apps to prevent them from knowing and potentially sharing your physical location. While location services can be useful for maps or weather apps, not all apps need to know where you are.',
      difficulty: 'easy'
    },
    {
      id: 10,
      question: 'What is "data minimization"?',
      options: [
        'Using as little mobile data as possible',
        'Deleting all your files',
        'Only sharing the minimum amount of personal information necessary',
        'Making your files smaller to save space'
      ],
      correctAnswer: 2,
      explanation: 'Data minimization is the practice of only sharing the minimum amount of personal information necessary. This reduces your digital footprint and limits the personal data that could be exposed in a data breach.',
      difficulty: 'hard'
    }
  ]
}
