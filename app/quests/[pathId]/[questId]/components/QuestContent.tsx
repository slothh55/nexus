'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Award, 
  Rocket, 
  Sparkles, 
  Shield, 
  Bot, 
  MessageSquare,
  Search,
  Brain,
  Lock,
  ArrowLeft,
  Trophy
} from "lucide-react"
import Link from "next/link"
import { 
  getUserProgress, 
  updateAdventureTime,
  updateQuestCompletion
} from '@/lib/local-storage'
import { learningPaths, recommendedModules } from '@/data/learning-paths'
import { motion } from 'framer-motion'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { YouTubeEmbed } from "@/components/youtube-embed"

// Quest content data
const questContent = {
  // Digital Explorer Path
  "finding-digital-clues": {
    title: "Finding Digital Clues",
    description: "Learn how to find and evaluate information online like a detective!",
    path: "digital-explorer",
    pathName: "Digital Explorer Path",
    color: "from-blue-500 to-green-500",
    icon: "BookOpen",
    videoId: "AJ-JQhAh940", // TED-Ed video with CC license
    content: `
# Finding Digital Clues: Information Detective Training

Welcome, young detective! In this quest, you'll learn how to find and evaluate information online. The internet is full of information, but not all of it is reliable. As a digital detective, your job is to find the clues that help you determine what's true and what's not.

## Your Mission

1. Learn how to search for information effectively
2. Discover how to evaluate sources for reliability
3. Practice identifying trustworthy information
4. Complete the detective challenge

## Detective Skills

### Skill #1: Strategic Searching
Good detectives know how to search for the right clues. When searching online:
- Use specific keywords instead of full questions
- Try different search terms if you don't find what you need
- Look beyond the first few results

### Skill #2: Source Evaluation
Not all sources are equally reliable. Check for these clues:
- Who created the information? Are they experts?
- When was it published? Is it up-to-date?
- Why was it created? Is it trying to inform, persuade, or sell something?
- Does it provide evidence for its claims?

### Skill #3: Cross-Checking
Great detectives always verify their clues with multiple sources:
- Check if other reliable sources say the same thing
- Look for information that confirms or contradicts what you found
- Be suspicious if you can only find one source making a claim

## Detective Challenge

Now it's your turn! Think about the last time you needed to find information online. How did you search? Did you check if the source was reliable? What could you do differently next time?

Remember: Being a good information detective takes practice. The more you use these skills, the better you'll get at finding reliable information online!
    `,
    quiz: [
      {
        question: "What should you do if you're not sure if information is reliable?",
        options: [
          "Believe it anyway if it sounds interesting",
          "Check if other reliable sources say the same thing",
          "Only trust information from social media",
          "Ask your friends if they think it's true"
        ],
        correctAnswer: 1
      },
      {
        question: "Which of these is the MOST important when evaluating a source?",
        options: [
          "It has lots of pictures",
          "It was published recently",
          "It was created by experts on the topic",
          "It has a nice website design"
        ],
        correctAnswer: 2
      },
      {
        question: "What's a good way to search for information online?",
        options: [
          "Always use full questions in your search",
          "Only look at the first result",
          "Use specific keywords related to your topic",
          "Only use social media for research"
        ],
        correctAnswer: 2
      }
    ]
  },
  
  // AI Adventurer Path
  "ai-robot-friends": {
    title: "AI Robot Friends",
    description: "Discover how AI works and how it can be a helpful tool in your digital adventures!",
    path: "ai-adventurer",
    pathName: "AI Adventurer Path",
    color: "from-amber-500 to-purple-500",
    icon: "Bot",
    videoId: "mJeNghZXtMo", // Khan Academy video with CC license
    content: `
# AI Robot Friends: Understanding Artificial Intelligence

Hello, future AI expert! In this quest, you'll learn about artificial intelligence (AI) and how it works. AI is like having robot friends that can help us with many tasks, from answering questions to creating art and solving problems.

## Your Mission

1. Learn what artificial intelligence is
2. Discover how AI learns from data
3. Explore different types of AI you might encounter
4. Complete the AI challenge

## AI Basics

### What is AI?
Artificial Intelligence is technology that can perform tasks that normally require human intelligence. Unlike regular computer programs that follow specific instructions, AI can learn and improve over time.

Think of it like this:
- Regular computer program: "If this happens, do that" (follows exact instructions)
- AI program: "Here's what happened before, so this is probably what should happen now" (learns from examples)

### How AI Learns
AI learns from data - lots and lots of data! This is called "machine learning." Here's how it works:

1. AI is given examples (training data)
2. It looks for patterns in those examples
3. It creates a model based on those patterns
4. It uses that model to make predictions or decisions about new information

It's like how you learn to recognize dogs. After seeing many dogs, you learn what makes a dog a dog, and you can recognize new dogs you've never seen before!

### Types of AI You Might Know
- **Virtual Assistants**: Like Siri or Alexa that can answer questions and follow commands
- **Recommendation Systems**: Suggest videos, music, or products you might like
- **Image Recognition**: Can identify objects, people, or animals in photos
- **Game AI**: Controls characters in video games

## AI Challenge

Think about how you might use AI tools in your daily life. What tasks could an AI helper assist you with? How might AI tools help you learn new things or be creative?

Remember: AI is a tool created by humans to help us. It's not magic - it has limitations and can make mistakes. The best approach is to use AI as a helpful assistant while still using your own judgment and creativity!
    `,
    quiz: [
      {
        question: "How is AI different from regular computer programs?",
        options: [
          "AI is always connected to the internet",
          "AI can learn and improve over time",
          "AI is only used in robots",
          "AI always gives perfect answers"
        ],
        correctAnswer: 1
      },
      {
        question: "What does AI need to learn?",
        options: [
          "Special computer chips",
          "Internet connection",
          "Lots of data",
          "Human supervision at all times"
        ],
        correctAnswer: 2
      },
      {
        question: "Which of these is an example of AI?",
        options: [
          "A calculator app",
          "A video game controller",
          "A recommendation system that suggests videos you might like",
          "A computer monitor"
        ],
        correctAnswer: 2
      }
    ]
  },
  
  // Safety Ranger Path
  "password-power-up": {
    title: "Password Power-Up",
    description: "Learn how to create super-strong passwords to protect your digital world!",
    path: "safety-ranger",
    pathName: "Safety Ranger Path",
    color: "from-green-500 to-teal-500",
    icon: "Shield",
    videoId: "aEmF3Iylvr4", // Khan Academy video with CC license
    content: `
# Password Power-Up: Creating Super-Strong Passwords

Welcome, Safety Ranger! In this quest, you'll learn how to create and manage super-strong passwords that will help protect your digital accounts from hackers and other online threats.

## Your Mission

1. Learn why passwords are important
2. Discover what makes a password strong or weak
3. Learn techniques for creating strong passwords
4. Complete the password challenge

## Password Basics

### Why Passwords Matter
Passwords are like the keys to your digital life. They protect your personal information, messages, photos, games, and more. If someone gets your password, they could:
- Pretend to be you online
- Access your personal information
- Use your accounts without permission

That's why having strong passwords is so important!

### Weak vs. Strong Passwords
Weak passwords are:
- Short (less than 8 characters)
- Common words or phrases (like "password" or "12345")
- Personal information (like your name or birthday)
- Used for multiple accounts

Strong passwords are:
- Long (at least 12 characters)
- A mix of uppercase letters, lowercase letters, numbers, and symbols
- Not common words or phrases
- Different for each account

### Password Power-Up Techniques

#### Technique #1: Passphrase Method
Create a sentence or phrase, then use the first letter of each word, along with numbers and symbols.

Example:
Phrase: "My dog Spot has 2 toys and loves to play fetch!"
Password: "MdSh2t&l2pf!"

#### Technique #2: Word Combination Method
Combine random words with numbers and symbols between them.

Example:
Words: Banana, Robot, Mountain
Password: "Banana_Robot_Mountain_42!"

## Password Challenge

Now it's your turn! Think of a strong password using one of the techniques above. (Don't share your actual password - just practice the technique!)

Remember: Never share your passwords with anyone except a parent or guardian. And never use the same password for multiple important accounts!
    `,
    quiz: [
      {
        question: "Which of these is the strongest password?",
        options: [
          "password123",
          "myname2010",
          "H7_j$Kl2@pQ9",
          "qwerty"
        ],
        correctAnswer: 2
      },
      {
        question: "Why should you use different passwords for different accounts?",
        options: [
          "To practice typing different passwords",
          "So if one account is hacked, your other accounts stay safe",
          "Because it's required by law",
          "To make your accounts load faster"
        ],
        correctAnswer: 1
      },
      {
        question: "What makes a password strong?",
        options: [
          "Using your name and birthday",
          "Using the same password for all accounts",
          "Using a short, simple word",
          "Using a mix of letters, numbers, and symbols"
        ],
        correctAnswer: 3
      }
    ]
  },
  
  // Communication Hero Path
  "team-talk-champions": {
    title: "Team Talk Champions",
    description: "Master the art of digital communication and become a champion communicator!",
    path: "communication-hero",
    pathName: "Communication Hero Path",
    color: "from-purple-500 to-pink-500",
    icon: "MessageSquare",
    videoId: "F9GujgK0y2M", // TED-Ed video with CC license
    content: `
# Team Talk Champions: Mastering Digital Communication

Hello, Communication Hero! In this quest, you'll learn how to communicate effectively online, whether you're chatting with friends, working on a school project, or participating in online communities.

## Your Mission

1. Learn the basics of good digital communication
2. Discover how to express yourself clearly online
3. Explore how to be a respectful digital citizen
4. Complete the communication challenge

## Communication Basics

### The Digital Communication Challenge
When we communicate face-to-face, we use facial expressions, tone of voice, and body language to help convey our meaning. Online, these cues are missing, which can lead to misunderstandings.

That's why it's important to be extra clear and thoughtful when communicating online!

### Being Clear and Kind

#### Clarity Tips:
- Be specific and direct about what you mean
- Use complete sentences when needed
- Check your message before sending to make sure it makes sense
- Use emojis or punctuation to help convey tone (but don't overdo it!)

#### Kindness Tips:
- Remember there's a real person reading your message
- Ask yourself: "Would I say this to someone face-to-face?"
- Give people the benefit of the doubt if something seems unclear
- Take a break if you feel upset before responding

### Team Communication

When working with others online:
- Respond to messages in a timely manner
- Be clear about what you're working on and when you'll finish
- Ask questions if you don't understand something
- Give positive feedback along with constructive criticism
- Thank people for their contributions

## Communication Challenge

Think about a time when there was a misunderstanding in online communication. What happened? How could clearer communication have helped? What will you do differently next time?

Remember: Good communication is a skill that takes practice. The more you work at it, the better you'll get at expressing yourself clearly and kindly online!
    `,
    quiz: [
      {
        question: "What's missing in online communication that we have in face-to-face conversations?",
        options: [
          "Words and language",
          "The ability to share ideas",
          "Facial expressions and tone of voice",
          "The ability to ask questions"
        ],
        correctAnswer: 2
      },
      {
        question: "What should you do before sending an important message?",
        options: [
          "Use as many emojis as possible",
          "Make it as short as possible",
          "Check it to make sure it's clear and makes sense",
          "Add lots of exclamation points"
        ],
        correctAnswer: 2
      },
      {
        question: "When working on a team project online, what's important to do?",
        options: [
          "Do all the work yourself so it's done right",
          "Respond to messages and be clear about what you're working on",
          "Only check messages once a week",
          "Use slang and abbreviations to save time"
        ],
        correctAnswer: 1
      }
    ]
  }
}

export default function QuestContent({ pathId, questId }: { pathId: string, questId: string }) {
  const router = useRouter()
  const questKey = questId.replace(/-/g, '-')
  const quest = questContent[questKey as keyof typeof questContent]
  
  const [progress, setProgress] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [startTime] = useState(Date.now())
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [score, setScore] = useState(0)
  
  // Load progress from local storage
  useEffect(() => {
    const userProgress = getUserProgress()
    setProgress(userProgress)
    setIsLoading(false)
  }, [])
  
  // Track time spent on page
  useEffect(() => {
    return () => {
      const timeSpentMinutes = Math.round((Date.now() - startTime) / 60000)
      if (timeSpentMinutes > 0) {
        updateAdventureTime(timeSpentMinutes)
      }
    }
  }, [startTime])
  
  // Handle answer selection
  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    const isCorrect = answerIndex === quest.quiz[currentQuizQuestion].correctAnswer
    setIsAnswerCorrect(isCorrect)
    
    if (isCorrect) {
      setScore(score + 1)
    }
  }
  
  // Handle next question
  const handleNextQuestion = () => {
    if (currentQuizQuestion < quest.quiz.length - 1) {
      setCurrentQuizQuestion(currentQuizQuestion + 1)
      setSelectedAnswer(null)
      setIsAnswerCorrect(null)
    } else {
      setQuizCompleted(true)
      
      // Update quest completion in local storage
      const passingScore = Math.ceil(quest.quiz.length / 2)
      const passed = score >= passingScore
      updateQuestCompletion(pathId, questId, passed)
      
      // Refresh progress data
      const userProgress = getUserProgress()
      setProgress(userProgress)
    }
  }
  
  // Get icon component by name
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen': return BookOpen
      case 'Shield': return Shield
      case 'Bot': return Bot
      case 'MessageSquare': return MessageSquare
      case 'Search': return Search
      case 'Brain': return Brain
      default: return BookOpen
    }
  }
  
  if (isLoading || !quest) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </DashboardLayout>
    )
  }
  
  const Icon = getIconComponent(quest.icon)
  const isQuestCompleted = progress?.paths?.[pathId]?.quests?.[questId]?.completed || false
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Button variant="outline" size="sm" asChild className="w-fit">
            <Link href={`/learning-paths/${pathId}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to {quest.pathName}
            </Link>
          </Button>
          
          {isQuestCompleted && (
            <Badge className="bg-green-500 hover:bg-green-600">
              <CheckCircle className="h-3 w-3 mr-1" />
              Quest Completed
            </Badge>
          )}
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          {/* Quest info */}
          <div className="md:col-span-1 space-y-4">
            <Card>
              <div className="h-2 w-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`rounded-full p-2 bg-gradient-to-r ${quest.color}`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle>{quest.title}</CardTitle>
                </div>
                <CardDescription>{quest.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="pb-2">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant="outline">{quest.pathName}</Badge>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>15-20 minutes</span>
                  </div>
                  
                  {isQuestCompleted ? (
                    <div className="flex items-center gap-2 text-sm text-green-500">
                      <Trophy className="h-4 w-4" />
                      <span>You've completed this quest!</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-amber-500">
                      <Sparkles className="h-4 w-4" />
                      <span>Complete the quiz to earn your badge</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Recommended next steps */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">What's Next?</CardTitle>
                <CardDescription>
                  Continue your learning journey with these recommendations
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  {recommendedModules[pathId as keyof typeof recommendedModules]?.map((module, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`rounded-full p-1.5 bg-gradient-to-r ${module.color} bg-opacity-10`}>
                          {getIconComponent(module.icon) && getIconComponent(module.icon)({ className: "h-4 w-4 text-white" })}
                        </div>
                        <div className="text-sm font-medium">{module.title}</div>
                      </div>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={module.link}>Explore</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Quest content */}
          <div className="md:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{quest.title}</CardTitle>
                <CardDescription>{quest.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {quest.videoId && (
                  <div className="mb-4">
                    <YouTubeEmbed videoId={quest.videoId} title={quest.title} />
                  </div>
                )}
                
                <div className="prose dark:prose-invert max-w-none">
                  <div className="whitespace-pre-line">
                    {quest.content}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Quiz section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-indigo-500" />
                  Quest Challenge
                </CardTitle>
                <CardDescription>
                  Test your knowledge to complete this quest
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {quizCompleted ? (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-4">
                      <Trophy className="h-8 w-8 text-green-500" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Quest Completed!</h3>
                    <p className="text-muted-foreground mb-4">
                      You scored {score} out of {quest.quiz.length}
                    </p>
                    <div className="flex justify-center">
                      <Button asChild>
                        <Link href={`/learning-paths/${pathId}`}>
                          Continue Your Journey
                        </Link>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-4">
                        Question {currentQuizQuestion + 1} of {quest.quiz.length}:
                      </h3>
                      <p className="text-lg mb-4">{quest.quiz[currentQuizQuestion].question}</p>
                      
                      <div className="space-y-3">
                        {quest.quiz[currentQuizQuestion].options.map((option, index) => (
                          <div
                            key={index}
                            className={`p-3 border rounded-lg cursor-pointer transition-all ${
                              selectedAnswer === index
                                ? isAnswerCorrect
                                  ? "bg-green-100 border-green-500 dark:bg-green-900/30 dark:border-green-500"
                                  : "bg-red-100 border-red-500 dark:bg-red-900/30 dark:border-red-500"
                                : "hover:bg-muted"
                            }`}
                            onClick={() => selectedAnswer === null && handleAnswerSelect(index)}
                          >
                            <div className="flex items-center">
                              <div className={`flex items-center justify-center w-6 h-6 rounded-full mr-2 ${
                                selectedAnswer === index
                                  ? isAnswerCorrect
                                    ? "bg-green-500 text-white"
                                    : "bg-red-500 text-white"
                                  : "bg-muted text-foreground"
                              }`}>
                                {String.fromCharCode(65 + index)}
                              </div>
                              <span>{option}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {selectedAnswer !== null && (
                      <div className={`p-4 rounded-lg ${
                        isAnswerCorrect
                          ? "bg-green-100 dark:bg-green-900/30"
                          : "bg-red-100 dark:bg-red-900/30"
                      }`}>
                        <div className="flex items-start gap-2">
                          {isAnswerCorrect ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          ) : (
                            <div className="rounded-full bg-red-500 p-1 mt-0.5">
                              <span className="text-white text-xs font-bold">✕</span>
                            </div>
                          )}
                          <div>
                            <p className="font-medium">
                              {isAnswerCorrect ? "Correct!" : "Not quite right"}
                            </p>
                            <p className="text-sm">
                              {isAnswerCorrect
                                ? "Great job! You got it right."
                                : `The correct answer is: ${quest.quiz[currentQuizQuestion].options[quest.quiz[currentQuizQuestion].correctAnswer]}`
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-end">
                      <Button
                        onClick={handleNextQuestion}
                        disabled={selectedAnswer === null}
                      >
                        {currentQuizQuestion < quest.quiz.length - 1 ? "Next Question" : "Complete Quest"}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
