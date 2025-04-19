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
import { Brain, CheckCircle, XCircle, AlertTriangle, Trophy, Info } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

// Quiz questions
const quizQuestions = [
  {
    id: 1,
    question: "Which of the following is the MOST reliable source for scientific information?",
    options: [
      "A viral social media post with lots of shares",
      "A peer-reviewed scientific journal article",
      "A blog post by someone who says they're an expert",
      "A website with a professional design and lots of ads",
    ],
    correctAnswer: 1,
    explanation:
      "Peer-reviewed scientific journal articles are the most reliable sources for scientific information because they've been evaluated by other experts in the field before publication. This review process helps ensure the information is accurate and the research methods are sound.",
    difficulty: "easy",
  },
  {
    id: 2,
    question: "What is 'confirmation bias' and why is it important to be aware of when evaluating information?",
    options: [
      "The tendency to search for information that confirms what you already believe",
      "The process of checking multiple sources to confirm facts",
      "A website feature that confirms your identity",
      "A computer algorithm that confirms search results are accurate",
    ],
    correctAnswer: 0,
    explanation:
      "Confirmation bias is our natural tendency to favor information that confirms our existing beliefs and ignore information that contradicts them. Being aware of this bias is crucial when evaluating information because it can lead us to accept false information that aligns with our views and reject true information that challenges them.",
    difficulty: "medium",
  },
  {
    id: 3,
    question: "Which of these is a warning sign that a news article might contain misinformation?",
    options: [
      "It includes quotes from multiple experts with different viewpoints",
      "It has a publication date and author name listed",
      "It uses emotional language and makes dramatic claims",
      "It links to original sources and research",
    ],
    correctAnswer: 2,
    explanation:
      "Emotional language and dramatic claims are warning signs of potential misinformation. Reliable news sources typically use neutral language, present facts without sensationalism, and avoid making dramatic claims without substantial evidence.",
    difficulty: "easy",
  },
  {
    id: 4,
    question: "What does it mean to 'triangulate' information?",
    options: [
      "To arrange information in groups of three",
      "To verify information by checking at least three different reliable sources",
      "To organize information in a triangle-shaped diagram",
      "To delete information from three different devices",
    ],
    correctAnswer: 1,
    explanation:
      "Triangulating information means verifying it by checking multiple reliable sources. This is an important information literacy skill because it helps ensure the information is accurate. If multiple trustworthy sources report the same information, it's more likely to be true.",
    difficulty: "medium",
  },
  {
    id: 5,
    question: "What is 'lateral reading' and why is it useful for fact-checking?",
    options: [
      "Reading multiple articles side by side on your screen",
      "Reading quickly by scanning text from left to right",
      "Opening new tabs to check other sources about a claim or website",
      "Reading between the lines to find hidden meanings",
    ],
    correctAnswer: 2,
    explanation:
      "Lateral reading involves opening new tabs to check other sources about a claim or website instead of staying on the original site. This technique is used by professional fact-checkers because it helps you quickly determine if a source is trustworthy by seeing what other reliable sources say about it.",
    difficulty: "hard",
  },
  {
    id: 6,
    question:
      "Which of these domain extensions generally indicates the MOST trustworthy source for academic information?",
    options: [".com", ".org", ".edu", ".net"],
    correctAnswer: 2,
    explanation:
      ".edu domains are generally restricted to educational institutions like colleges and universities, making them more reliable for academic information. However, it's important to remember that domain extensions alone don't guarantee reliability - you should still evaluate the specific source.",
    difficulty: "easy",
  },
  {
    id: 7,
    question: "What is 'cherry-picking' in the context of information literacy?",
    options: [
      "Selecting the most interesting facts from an article",
      "Choosing only the data or evidence that supports a particular argument while ignoring contradictory evidence",
      "Highlighting important information with a red pen",
      "Selecting the most recent information on a topic",
    ],
    correctAnswer: 1,
    explanation:
      "Cherry-picking is selecting only the data or evidence that supports a particular argument while ignoring contradictory evidence. This creates a misleading impression that there is more support for a position than there actually is. Being able to identify cherry-picking is an important information literacy skill.",
    difficulty: "medium",
  },
  {
    id: 8,
    question: "What is the BEST approach when you encounter information that contradicts your existing beliefs?",
    options: [
      "Immediately reject it since it's probably wrong",
      "Evaluate it critically, checking the source's reliability and looking for supporting evidence",
      "Only accept it if it comes from your preferred news source",
      "Share it on social media to see what others think",
    ],
    correctAnswer: 1,
    explanation:
      "The best approach is to evaluate the information critically, regardless of whether it aligns with your existing beliefs. Check the source's reliability, look for supporting evidence, and consider multiple perspectives. This helps overcome confirmation bias and leads to a more accurate understanding.",
    difficulty: "medium",
  },
  {
    id: 9,
    question: "Which of these is NOT a good strategy for determining if a website is trustworthy?",
    options: [
      "Checking if the website has an 'About Us' page with transparent information",
      "Looking at how recently the content was updated",
      "Seeing if the website has a professional design with lots of images",
      "Checking if the website cites its sources",
    ],
    correctAnswer: 2,
    explanation:
      "A professional design with lots of images is not a reliable indicator of trustworthiness. Many misleading websites have professional designs to appear credible. Instead, focus on substance: transparent information about who runs the site, recent updates, cited sources, and the quality of the content itself.",
    difficulty: "medium",
  },
  {
    id: 10,
    question: "What is 'clickbait' and why should you be cautious of it?",
    options: [
      "Headlines designed to attract attention and encourage clicks, often by exaggerating or misleading",
      "A computer virus that infects your device when you click on certain links",
      "A website feature that counts how many people have clicked on an article",
      "A type of online advertisement that appears when you click on a website",
    ],
    correctAnswer: 0,
    explanation:
      "Clickbait refers to headlines designed to attract attention and encourage clicks, often by exaggerating or misleading. You should be cautious of clickbait because the content often doesn't deliver on the headline's promise and may contain low-quality or false information designed to generate ad revenue rather than inform.",
    difficulty: "easy",
  },
]

export default function InformationLiteracyQuiz() {
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
        return "bg-blue-500/10 text-blue-500"
    }
  }

  const getScoreBadge = () => {
    const percentage = Math.round((score / quizQuestions.length) * 100)
    if (percentage >= 90) return "Information Detective Master"
    if (percentage >= 70) return "Information Detective Pro"
    if (percentage >= 50) return "Information Detective Apprentice"
    return "Information Detective Rookie"
  }

  const getScoreMessage = () => {
    const percentage = Math.round((score / quizQuestions.length) * 100)
    if (percentage >= 90) return "Amazing! You have excellent information literacy skills!"
    if (percentage >= 70) return "Great job! You have good information literacy skills with some room for improvement."
    if (percentage >= 50) return "Good effort! You're on your way to developing strong information literacy skills."
    return "Keep learning! Information literacy is a skill that improves with practice."
  }

  return (
    <DashboardLayout>
      {!quizCompleted ? (
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Brain className="h-8 w-8 text-blue-500" />
              Information Detective Quiz
            </h1>
            <p className="text-muted-foreground mt-2">
              Test your skills at finding clues and solving the mystery of real vs. fake information!
            </p>
          </div>

          <Card className="overflow-hidden">
            <div className="h-2 w-full bg-gradient-to-r from-blue-500 to-indigo-500"></div>
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
                          : "hover:border-blue-200 dark:hover:border-blue-800",
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
                <div className="rounded-lg border p-4 bg-blue-50 dark:bg-blue-950/20">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <Info className="h-5 w-5 text-blue-500" />
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
                className="w-40 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
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
            <div className="h-2 w-full bg-gradient-to-r from-blue-500 to-indigo-500"></div>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-blue-500/10 p-2">
                  <Trophy className="h-5 w-5 text-blue-500" />
                </div>
                <CardTitle>Quiz Completed!</CardTitle>
              </div>
              <CardDescription>You've completed the Information Detective Quiz!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-4">
                <div className="text-5xl font-bold mb-2">{Math.round((score / quizQuestions.length) * 100)}%</div>
                <p className="text-muted-foreground">
                  You answered {score} out of {quizQuestions.length} questions correctly.
                </p>
                <div className="mt-4">
                  <Badge variant="outline" className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                    {getScoreBadge()}
                  </Badge>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="font-medium mb-2">Your Information Literacy Skills</h3>
                <p className="text-sm text-muted-foreground mb-4">{getScoreMessage()}</p>
                <h4 className="font-medium text-sm mb-1">Key Information Literacy Skills:</h4>
                <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                  <li>Evaluating source credibility</li>
                  <li>Recognizing bias in information</li>
                  <li>Cross-checking facts with multiple sources</li>
                  <li>Identifying misleading content</li>
                  <li>Understanding the difference between facts and opinions</li>
                </ul>
              </div>

              <div className="rounded-lg border p-4 bg-blue-50 dark:bg-blue-950/20">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-blue-500" />
                  Why Information Literacy Matters
                </h3>
                <p className="text-sm">
                  In today's digital world, we're surrounded by information from many sources. Being able to evaluate
                  this information critically helps you make better decisions, avoid spreading misinformation, and
                  become a more informed digital citizen. The skills you're developing in this quiz will help you
                  navigate the complex information landscape both online and offline.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-2">
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <Link href="/assessment">Back to Quizzes</Link>
              </Button>
              <Button
                asChild
                className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
              >
                <Link href="/learning-paths/information-literacy">Continue Learning</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </DashboardLayout>
  )
}

