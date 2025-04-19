import { Quiz } from '@/lib/quiz-system'

export const digitalCommunicationQuiz: Quiz = {
  id: 'digital-communication-quiz',
  title: 'Digital Communication Quiz',
  description: 'Test your knowledge about effective and responsible online communication!',
  category: 'Digital Communication',
  color: 'from-blue-500 to-indigo-500',
  icon: 'MessageSquare',
  questions: [
    {
      id: 1,
      question: 'What is "netiquette"?',
      options: [
        'A type of internet connection',
        'A website for sharing photos',
        'Rules and guidelines for polite behavior online',
        'A computer virus'
      ],
      correctAnswer: 2,
      explanation: 'Netiquette refers to the rules and guidelines for polite, respectful behavior when communicating online. Just like in-person etiquette, netiquette helps ensure positive interactions in digital spaces.',
      difficulty: 'easy'
    },
    {
      id: 2,
      question: 'Why can online messages sometimes be misunderstood?',
      options: [
        'Because people don\'t read carefully online',
        'Because online messages lack tone of voice and facial expressions',
        'Because the internet is too slow',
        'Because online messages are always too short'
      ],
      correctAnswer: 1,
      explanation: 'Online messages can be misunderstood because they lack the tone of voice, facial expressions, and body language that help convey meaning in face-to-face conversations. This makes it harder to detect sarcasm, humor, or emotions.',
      difficulty: 'easy'
    },
    {
      id: 3,
      question: 'What does typing in ALL CAPITAL LETTERS usually mean in online communication?',
      options: [
        'You\'re whispering',
        'You\'re being extra polite',
        'You\'re SHOUTING or expressing strong emotion',
        'Your keyboard is broken'
      ],
      correctAnswer: 2,
      explanation: 'In online communication, typing in ALL CAPITAL LETTERS is generally interpreted as shouting or expressing strong emotion. It\'s usually considered impolite unless used briefly for emphasis.',
      difficulty: 'easy'
    },
    {
      id: 4,
      question: 'What is a good way to clarify the tone of your message online?',
      options: [
        'Always use formal language',
        'Use emojis, GIFs, or clear statements about your feelings',
        'Type everything in capital letters',
        'Use as few words as possible'
      ],
      correctAnswer: 1,
      explanation: 'Using emojis, GIFs, or clearly stating your feelings can help clarify the tone of your message online. These tools help replace the facial expressions and tone of voice that are missing in text-based communication.',
      difficulty: 'medium'
    },
    {
      id: 5,
      question: 'What should you do before sharing someone else\'s message or content in a different context?',
      options: [
        'Change a few words so it looks different',
        'Ask for their permission first',
        'Share it as quickly as possible',
        'Add your name to it'
      ],
      correctAnswer: 1,
      explanation: 'Before sharing someone else\'s message or content in a different context, you should ask for their permission. This shows respect for their privacy and gives them control over where their words or content appear.',
      difficulty: 'medium'
    },
    {
      id: 6,
      question: 'What is "flaming" in online communication?',
      options: [
        'Sending messages with lots of compliments',
        'Using too many emojis',
        'Posting hostile or insulting messages',
        'Writing messages that are too long'
      ],
      correctAnswer: 2,
      explanation: 'Flaming refers to posting hostile, insulting, or extremely critical messages in online discussions. Flaming often escalates conflicts and creates a negative environment for everyone.',
      difficulty: 'medium'
    },
    {
      id: 7,
      question: 'What is a good practice when participating in a video call?',
      options: [
        'Leave your microphone on at all times',
        'Multitask and do other activities during the call',
        'Mute your microphone when not speaking and find a quiet space',
        'Join the call as late as possible'
      ],
      correctAnswer: 2,
      explanation: 'When participating in a video call, it\'s good practice to mute your microphone when not speaking and find a quiet space. This reduces background noise and distractions for everyone on the call.',
      difficulty: 'medium'
    },
    {
      id: 8,
      question: 'What is "think before you post" referring to?',
      options: [
        'Taking time to use proper spelling and grammar',
        'Considering the potential consequences and impact of your online posts',
        'Planning your social media schedule',
        'Making sure your post has enough hashtags'
      ],
      correctAnswer: 1,
      explanation: '"Think before you post" refers to taking time to consider the potential consequences and impact of your online posts before sharing them. This includes thinking about how your words might affect others and your own digital reputation.',
      difficulty: 'hard'
    },
    {
      id: 9,
      question: 'What should you do if you receive a message that upsets you?',
      options: [
        'Immediately respond with an angry message',
        'Share the message with everyone you know',
        'Take time to calm down before responding, or talk to a trusted adult',
        'Send lots of confusing messages back'
      ],
      correctAnswer: 2,
      explanation: 'If you receive a message that upsets you, it\'s best to take time to calm down before responding. This helps prevent saying things you might regret later. If the message is concerning or hurtful, talking to a trusted adult is also a good idea.',
      difficulty: 'hard'
    },
    {
      id: 10,
      question: 'What is "digital empathy"?',
      options: [
        'Using lots of emojis in messages',
        'Understanding and respecting the feelings of others in online interactions',
        'Being able to type very quickly',
        'Having the latest digital devices'
      ],
      correctAnswer: 1,
      explanation: 'Digital empathy refers to understanding and respecting the feelings of others in online interactions. It involves remembering that real people with real feelings are behind digital messages and treating them with the same care you would in person.',
      difficulty: 'hard'
    }
  ]
}
