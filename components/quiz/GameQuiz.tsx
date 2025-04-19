'use client'

import { useState, useEffect } from 'react'
import { Quiz, QuizQuestion, QuizResult, calculateQuizScore, saveQuizResult } from '@/lib/quiz-system'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { playSound } from '@/lib/sound-system'
import {
  CheckCircle,
  XCircle,
  Clock,
  Trophy,
  Brain,
  Award,
  Sparkles,
  ArrowRight,
  RotateCcw
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

interface GameQuizProps {
  quiz: Quiz
  onComplete: (result: QuizResult) => void
  onCancel: () => void
}

export function GameQuiz({ quiz, onComplete, onCancel }: GameQuizProps) {
  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [answers, setAnswers] = useState<number[]>(Array(quiz.questions.length).fill(-1))
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit || 60)
  const [startTime] = useState(Date.now())
  const [result, setResult] = useState<QuizResult | null>(null)
  const [awardedBadges, setAwardedBadges] = useState<string[]>([])

  // Current question
  const currentQuestion = quiz.questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100

  // Timer
  useEffect(() => {
    if (quizCompleted || showExplanation) return

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          if (!showExplanation && selectedAnswer === null) {
            // Auto-select wrong answer if time runs out
            handleAnswerSelect(
              currentQuestion.options.findIndex(
                (_, i) => i !== currentQuestion.correctAnswer
              ).toString()
            )
            setShowExplanation(true)
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [quizCompleted, showExplanation, currentQuestion, selectedAnswer])

  // Handle answer selection
  const handleAnswerSelect = (value: string) => {
    if (showExplanation) return
    setSelectedAnswer(Number(value))
  }

  // Handle checking answer
  const handleCheckAnswer = () => {
    if (selectedAnswer === null) return

    // Update answers array
    const newAnswers = [...answers]
    newAnswers[currentQuestionIndex] = selectedAnswer
    setAnswers(newAnswers)

    // Show explanation
    setShowExplanation(true)

    // Play sound effect
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer
    playSoundEffect(isCorrect ? 'correct' : 'incorrect')
  }

  // Handle next question
  const handleNextQuestion = () => {
    // Reset state for next question
    setSelectedAnswer(null)
    setShowExplanation(false)

    // Move to next question or complete quiz
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      completeQuiz()
    }
  }

  // Complete quiz
  const completeQuiz = () => {
    // Calculate time taken
    const timeTaken = Math.round((Date.now() - startTime) / 1000)

    // Calculate time bonus (more time left = more points)
    const timeBonus = Math.round((timeLeft / (quiz.timeLimit || 60)) * 20)

    // Calculate final result
    const quizResult = calculateQuizScore(answers, quiz.questions, timeBonus)
    quizResult.quizId = quiz.id
    quizResult.timeTaken = timeTaken

    // Save result and check for badges
    const badges = saveQuizResult(quizResult)
    setAwardedBadges(badges)

    // Update state
    setResult(quizResult)
    setQuizCompleted(true)
    setShowResults(true)

    // Trigger confetti if score is good
    if (quizResult.score >= 70) {
      triggerConfetti()
    }

    // Call onComplete callback
    onComplete(quizResult)
  }

  // Restart quiz
  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setAnswers(Array(quiz.questions.length).fill(-1))
    setQuizCompleted(false)
    setShowResults(false)
    setTimeLeft(quiz.timeLimit || 60)
  }

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Play sound effect using the sound system
  const playSoundEffect = (type: 'correct' | 'incorrect') => {
    playSound(type)
  }

  // Trigger confetti
  const triggerConfetti = () => {
    try {
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        })
      } else {
        console.log('Confetti library not available')
      }
    } catch (error) {
      console.error('Failed to trigger confetti:', error)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <AnimatePresence mode="wait">
        {!showResults ? (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="shadow-lg">
              <CardHeader className={`bg-gradient-to-r ${quiz.color} text-white`}>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">{quiz.title}</CardTitle>
                  <Badge variant="outline" className="bg-white/20 text-white">
                    <Clock className="mr-1 h-3 w-3" /> {formatTime(timeLeft)}
                  </Badge>
                </div>
                <CardDescription className="text-white/90">{quiz.description}</CardDescription>
                <div className="mt-2">
                  <div className="flex justify-between text-sm mb-1 text-white/90">
                    <div>
                      Question {currentQuestionIndex + 1} of {quiz.questions.length}
                    </div>
                    <div>{Math.round(progress)}% complete</div>
                  </div>
                  <Progress value={progress} className="h-2 bg-white/30" />
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="text-lg font-medium">{currentQuestion.question}</div>

                  <RadioGroup
                    value={selectedAnswer?.toString()}
                    onValueChange={handleAnswerSelect}
                    className="space-y-3"
                    disabled={showExplanation}
                  >
                    {currentQuestion.options.map((option, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.1 }}
                      >
                        <div
                          className={`flex items-center space-x-2 rounded-md border p-3 cursor-pointer transition-all ${
                            showExplanation && index === currentQuestion.correctAnswer
                              ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                              : showExplanation && index === selectedAnswer
                                ? index !== currentQuestion.correctAnswer
                                  ? "border-red-500 bg-red-50 dark:bg-red-950/20"
                                  : ""
                                : selectedAnswer === index
                                  ? "border-primary bg-primary/5"
                                  : "hover:bg-muted/50"
                          }`}
                          onClick={() => !showExplanation && handleAnswerSelect(index.toString())}
                        >
                          <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                          <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                            {option}
                          </Label>
                          {showExplanation && index === currentQuestion.correctAnswer && (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          )}
                          {showExplanation && index === selectedAnswer && index !== currentQuestion.correctAnswer && (
                            <XCircle className="h-5 w-5 text-red-500" />
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </RadioGroup>

                  {showExplanation && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="rounded-md bg-muted p-4 text-sm"
                    >
                      <div className="font-medium mb-1">Explanation:</div>
                      <div>{currentQuestion.explanation}</div>
                    </motion.div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t p-4">
                <Button variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
                {showExplanation ? (
                  <Button onClick={handleNextQuestion}>
                    {currentQuestionIndex < quiz.questions.length - 1 ? (
                      <>Next Question <ArrowRight className="ml-2 h-4 w-4" /></>
                    ) : (
                      <>Complete Quiz <Trophy className="ml-2 h-4 w-4" /></>
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={handleCheckAnswer}
                    disabled={selectedAnswer === null}
                    className={selectedAnswer !== null ? 'bg-primary' : ''}
                  >
                    Check Answer
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="shadow-lg overflow-hidden">
              <div className="h-2 w-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-amber-500" />
                  Quiz Completed!
                </CardTitle>
                <CardDescription>
                  You've completed the {quiz.title}. Here's how you did:
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center py-4">
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                      className="text-5xl font-bold text-amber-500 mb-2"
                    >
                      {result?.score}%
                    </motion.div>
                    <div className="text-muted-foreground">Your Score</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-muted/30 rounded-lg p-3">
                      <div className="text-2xl font-bold">{result?.correctAnswers}</div>
                      <div className="text-sm text-muted-foreground">Correct Answers</div>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-3">
                      <div className="text-2xl font-bold">{formatTime(result?.timeTaken || 0)}</div>
                      <div className="text-sm text-muted-foreground">Time Taken</div>
                    </div>
                  </div>

                  {awardedBadges.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="rounded-lg border p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20"
                    >
                      <h3 className="font-medium mb-2 flex items-center gap-2">
                        <Award className="h-4 w-4 text-indigo-500" />
                        Badges Earned:
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {awardedBadges.map((badgeId) => (
                          <Badge
                            key={badgeId}
                            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                          >
                            <Sparkles className="mr-1 h-3 w-3" /> {badgeId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                          </Badge>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <div className="rounded-lg border p-3 bg-blue-50 dark:bg-blue-950/20">
                    <h3 className="font-medium mb-1 flex items-center gap-2">
                      <Brain className="h-4 w-4 text-blue-500" />
                      Learning Tips:
                    </h3>
                    <ul className="text-sm space-y-1">
                      <li>• Review the explanations for questions you got wrong</li>
                      <li>• Try the quiz again to improve your score</li>
                      <li>• Apply what you've learned in the games</li>
                      <li>• Share what you've learned with friends and family</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t p-4">
                <Button variant="outline" onClick={handleRestartQuiz}>
                  <RotateCcw className="mr-2 h-4 w-4" /> Try Again
                </Button>
                <Button onClick={onCancel} className="bg-gradient-to-r from-indigo-500 to-purple-500">
                  Continue
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
