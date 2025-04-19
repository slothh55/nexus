"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, CheckCircle, XCircle, AlertTriangle, Trophy, Info } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

// Quiz questions
const quizQuestions = [
  {
    id: 1,
    question: "What is the BEST approach when sending an important email to a teacher or other adult?",
    options: [
      "Use lots of emojis to show your personality",
      "Write in all capital letters so they notice it",
      "Use a clear subject line and proper greeting",
      "Use text abbreviations (like LOL, BTW) to save time",
    ],
    correctAnswer: 2,
    explanation:
      "When communicating with teachers or other adults, it's important to be professional. A clear subject line helps the recipient understand what the email is about, and a proper greeting (like 'Dear Mr./Ms. [Name]') shows respect. Save emojis and abbreviations for casual conversations with friends.",
    difficulty: "easy",
  },
  {
    id: 2,
    question: "Which of the following is an example of good digital citizenship in a group chat?",
    options: [
      "Sharing a funny but embarrassing photo of someone without asking them",
      "Leaving the chat without saying anything when you're upset",
      "Sending lots of messages in a row to get everyone's attention",
      "Asking if everyone is comfortable before adding a new person to the chat",
    ],
    correctAnswer: 3,
    explanation:
      "Good digital citizenship includes respecting others' privacy and boundaries. Asking before adding someone new to a group chat shows respect for everyone involved. Sharing photos without permission, leaving abruptly, or spamming messages can all create uncomfortable situations for others.",
    difficulty: "easy",
  },
  {
    id: 3,
    question: "What does 'digital footprint' mean?",
    options: [
      "The amount of storage your digital files take up",
      "The record of everything you do online that can be traced back to you",
      "The pattern of websites you visit most frequently",
      "The number of digital devices you own",
    ],
    correctAnswer: 1,
    explanation:
      "Your digital footprint is the trail of data you create while using the internet. It includes your social media posts, photos, comments, websites you visit, and more. Understanding that these activities leave traces is important for managing your online reputation and privacy.",
    difficulty: "medium",
  },
  {
    id: 4,
    question: "When participating in an online class discussion, which approach is MOST appropriate?",
    options: [
      "Wait until the last minute to post so you can see everyone else's ideas first",
      "Write short, quick responses to as many people as possible",
      "Read others' posts carefully and respond thoughtfully, adding new ideas",
      "Focus only on responding to the teacher's questions, not to other students",
    ],
    correctAnswer: 2,
    explanation:
      "Effective online discussion participation involves reading others' contributions carefully and responding thoughtfully with substantive comments that add new perspectives or information. This approach shows respect for others' ideas and contributes meaningfully to the learning community.",
    difficulty: "medium",
  },
  {
    id: 5,
    question: "What is 'netiquette'?",
    options: [
      "A new internet security software",
      "The rules and norms for polite and respectful online communication",
      "A type of internet connection",
      "A website that rates the quality of other websites",
    ],
    correctAnswer: 1,
    explanation:
      "Netiquette refers to the rules and norms for polite and respectful online communication. Just like in-person etiquette, netiquette helps ensure that digital interactions are positive and productive. Examples include using appropriate language, respecting others' opinions, and not typing in ALL CAPS (which is considered shouting).",
    difficulty: "easy",
  },
  {
    id: 6,
    question: "Which of the following is an example of cyberbullying?",
    options: [
      "Politely disagreeing with someone's opinion in a comment",
      "Sending someone a private message asking them to stop a behavior that bothers you",
      "Repeatedly posting mean comments about someone's appearance",
      "Not accepting a friend request from someone you don't know well",
    ],
    correctAnswer: 2,
    explanation:
      "Cyberbullying involves using digital communication to intimidate, harass, or harm others. Repeatedly posting mean comments about someone's appearance is a clear example of cyberbullying. It's important to recognize cyberbullying and know how to respond appropriately, whether you're a target or a bystander.",
    difficulty: "easy",
  },
  {
    id: 7,
    question: "What is the BEST way to respond if you receive a message that makes you angry?",
    options: [
      "Respond immediately to express your feelings",
      "Take time to calm down before responding",
      "Forward the message to other friends to get their opinions",
      "Post a screenshot publicly to show others what happened",
    ],
    correctAnswer: 1,
    explanation:
      "When you receive a message that makes you angry, it's best to take time to calm down before responding. This helps prevent saying things you might regret later. Responding immediately when emotional often escalates conflicts, while sharing private messages with others or posting screenshots publicly can violate privacy and trust.",
    difficulty: "medium",
  },
  {
    id: 8,
    question: "Which of these is MOST important when collaborating on a digital project with classmates?",
    options: [
      "Making sure your name appears first on the project",
      "Doing most of the work yourself to ensure it's done right",
      "Clear communication about roles, deadlines, and expectations",
      "Using the most advanced digital tools available",
    ],
    correctAnswer: 2,
    explanation:
      "Clear communication about roles, deadlines, and expectations is crucial for successful digital collaboration. When everyone understands their responsibilities and timeline, the project is more likely to run smoothly. This approach promotes fairness, efficiency, and better results than focusing on credit, controlling the work, or using specific tools.",
    difficulty: "medium",
  },
  {
    id: 9,
    question: "What does 'think before you post' mean in digital communication?",
    options: [
      "Make sure your post has perfect spelling and grammar",
      "Consider how your post might affect others and your reputation before sharing it",
      "Think about how many likes your post will get",
      "Plan to post at the time when most people will see it",
    ],
    correctAnswer: 1,
    explanation:
      "'Think before you post' means considering the potential impact of your digital communication before sharing it. This includes thinking about how others might interpret your words or images, how they might feel in response, and how the post might affect your reputation now and in the future. This thoughtful approach helps prevent regrets later.",
    difficulty: "easy",
  },
  {
    id: 10,
    question: "Which of the following is the MOST appropriate way to share someone else's work online?",
    options: [
      "Copy and paste it into your own post without mentioning where it came from",
      "Share it and tag your friends but don't mention the creator",
      "Give proper credit to the creator and link to the original source",
      "Slightly modify it so you can claim it as your own work",
    ],
    correctAnswer: 2,
    explanation:
      "Giving proper credit to creators and linking to original sources is the ethical way to share others' work online. This practice respects intellectual property rights, helps others find the original content, and builds a culture of attribution rather than plagiarism. It's also often required by copyright law.",
    difficulty: "easy",
  },
]

export default function DigitalCommunicationQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<number[]>(Array(quizQuestions.length).fill(-1))
  const [quizCompleted, setQuizCompleted] = useState(false)
  const router = useRouter()

  const currentQuestion = quizQuestions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(Number(value))
  }

  const handleNext = () => {
    if (showExplanation) {
      // Update answers array
      const newAnswers = [...answers]
      newAnswers[currentQuestionIndex] = selectedAnswer!
      setAnswers(newAnswers)

      // Update score if answer is correct
      if (selectedAnswer === currentQuestion.correctAnswer) {
        setScore(score + 1)
      }

      // Move to next question or complete quiz
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setSelectedAnswer(null)
        setShowExplanation(false)
      } else {
        setQuizCompleted(true)
      }
    } else {
      setShowExplanation(true)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500/10 text-green-500"
      case "medium":
        return "bg-amber-500/10 text-amber-500"
      case "hard":
        return "bg-red-500/10 text-red-500"
      default:
        return "bg-purple-500/10 text-purple-500"
    }
  }

  const getScoreBadge = () => {
    const percentage = Math.round((score / quizQuestions.length) * 100)
    if (percentage >= 90) return "Communication Superhero"
    if (percentage >= 70) return "Digital Communicator Pro"
    if (percentage >= 50) return "Communication Apprentice"
    return "Communication Rookie"
  }

  const getScoreMessage = () => {
    const percentage = Math.round((score / quizQuestions.length) * 100)
    if (percentage >= 90) return "Amazing! You have excellent digital communication skills!"
    if (percentage >= 70) return "Great job! You have good digital communication skills with some room for improvement."
    if (percentage >= 50) return "Good effort! You're on your way to becoming a Communication Superhero."
    return "Keep learning! Digital communication skills improve with practice."
  }

  return (
    <DashboardLayout>
      {!quizCompleted ? (
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <MessageSquare className="h-8 w-8 text-purple-500" />
              Communication Superheroes Quiz
            </h1>
            <p className="text-muted-foreground mt-2">
              Test your communication superpowers and see if you're ready to join the Superhero Team!
            </p>
          </div>

          <Card className="overflow-hidden">
            <div className="h-2 w-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">
                      Question {currentQuestionIndex + 1} of {quizQuestions.length}
                    </CardTitle>
                    <Badge variant="outline" className={getDifficultyColor(currentQuestion.difficulty)}>
                      {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
                    </Badge>
                  </div>
                  <CardDescription>Choose the best answer</CardDescription>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium mb-1">Progress</div>
                  <div className="text-sm">{Math.round(progress)}%</div>
                </div>
              </div>
              <div className="mt-2">
                <Progress value={progress} className="h-2" />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-lg font-medium">{currentQuestion.question}</div>

              <RadioGroup
                value={selectedAnswer?.toString() || ""}
                onValueChange={handleAnswerSelect}
                className="space-y-3"
                disabled={showExplanation}
              >
                {currentQuestion.options.map((option, index) => (
                  <div
                    key={index}
                    className={cn(
                      "rounded-lg border p-4 transition-all duration-200",
                      showExplanation && index === currentQuestion.correctAnswer
                        ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                        : showExplanation && index === selectedAnswer && index !== currentQuestion.correctAnswer
                          ? "border-red-500 bg-red-50 dark:bg-red-950/20"
                          : "hover:border-purple-200 dark:hover:border-purple-800",
                    )}
                  >
                    <div className="flex items-start space-x-3">
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor={`option-${index}`} className="text-base">
                          {option}
                        </Label>

                        {showExplanation && index === currentQuestion.correctAnswer && (
                          <div className="mt-2 text-sm text-green-600 dark:text-green-400 flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                            <span>Correct answer!</span>
                          </div>
                        )}

                        {showExplanation && index === selectedAnswer && index !== currentQuestion.correctAnswer && (
                          <div className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-start gap-2">
                            <XCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                            <span>Incorrect answer</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </RadioGroup>

              {showExplanation && (
                <div className="rounded-lg border p-4 bg-purple-50 dark:bg-purple-950/20">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <Info className="h-5 w-5 text-purple-500" />
                    Explanation
                  </h3>
                  <p className="text-sm">{currentQuestion.explanation}</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router.push("/assessment")} className="w-24">
                Exit
              </Button>
              <Button
                onClick={handleNext}
                disabled={selectedAnswer === null && !showExplanation}
                className="w-40 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                {showExplanation
                  ? currentQuestionIndex < quizQuestions.length - 1
                    ? "Next Question"
                    : "Complete Quiz"
                  : "Check Answer"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto">
          <Card className="overflow-hidden">
            <div className="h-2 w-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-purple-500/10 p-2">
                  <Trophy className="h-5 w-5 text-purple-500" />
                </div>
                <CardTitle>Quiz Completed!</CardTitle>
              </div>
              <CardDescription>You've completed the Communication Superheroes Quiz!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-4">
                <div className="text-5xl font-bold mb-2">{Math.round((score / quizQuestions.length) * 100)}%</div>
                <p className="text-muted-foreground">
                  You answered {score} out of {quizQuestions.length} questions correctly.
                </p>
                <div className="mt-4">
                  <Badge variant="outline" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    {getScoreBadge()}
                  </Badge>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="font-medium mb-2">Your Digital Communication Skills</h3>
                <p className="text-sm text-muted-foreground mb-4">{getScoreMessage()}</p>
                <h4 className="font-medium text-sm mb-1">Key Communication Skills:</h4>
                <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                  <li>Communicating clearly and respectfully online</li>
                  <li>Understanding appropriate communication for different contexts</li>
                  <li>Managing your digital footprint</li>
                  <li>Collaborating effectively in digital spaces</li>
                  <li>Practicing good digital citizenship</li>
                </ul>
              </div>

              <div className="rounded-lg border p-4 bg-purple-50 dark:bg-purple-950/20">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-purple-500" />
                  Why Digital Communication Matters
                </h3>
                <p className="text-sm">
                  Good digital communication skills help you build positive relationships, work effectively with others,
                  and maintain a positive online reputation. These skills are increasingly important in school, future
                  careers, and personal life as more of our interactions happen in digital spaces.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-2">
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <Link href="/assessment">Back to Quizzes</Link>
              </Button>
              <Button
                asChild
                className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Link href="/learning-paths/digital-communication">Continue Learning</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </DashboardLayout>
  )
}

