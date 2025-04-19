'use client'

import { useState, useEffect } from 'react'
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Award, Brain, CheckCircle, Clock, Shield, Sparkles, Trophy } from "lucide-react"
import Link from "next/link"
import { quizzes } from '@/data/quizzes'
import { getUserProgress } from '@/lib/local-storage'
import { GameQuiz } from '@/components/quiz/GameQuiz'
import { QuizResult } from '@/lib/quiz-system'
import { motion, AnimatePresence } from 'framer-motion'

export default function QuizzesPage() {
  const [activeQuizId, setActiveQuizId] = useState<string | null>(null)
  const [quizProgress, setQuizProgress] = useState<Record<string, any>>({})
  const [isLoading, setIsLoading] = useState(true)
  
  // Load quiz progress from local storage
  useEffect(() => {
    const progress = getUserProgress()
    setQuizProgress(progress.quizzes)
    setIsLoading(false)
  }, [])
  
  // Handle quiz completion
  const handleQuizComplete = (result: QuizResult) => {
    // Update local state
    setQuizProgress(prev => ({
      ...prev,
      [result.quizId]: {
        ...prev[result.quizId],
        completed: result.completed,
        score: result.score,
        correctAnswers: result.correctAnswers,
        totalQuestions: result.totalQuestions
      }
    }))
    
    // Close quiz
    setActiveQuizId(null)
  }
  
  // Get quiz progress
  const getQuizProgressData = (quizId: string) => {
    return quizProgress[quizId] || {
      completed: false,
      score: 0,
      correctAnswers: 0,
      totalQuestions: 0,
      attempts: 0
    }
  }
  
  // Calculate overall quiz progress
  const calculateOverallProgress = () => {
    const totalQuizzes = quizzes.length
    const completedQuizzes = Object.values(quizProgress).filter((q: any) => q.completed).length
    return totalQuizzes > 0 ? Math.round((completedQuizzes / totalQuizzes) * 100) : 0
  }
  
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </DashboardLayout>
    )
  }
  
  // If a quiz is active, show it
  if (activeQuizId) {
    const quiz = quizzes.find(q => q.id === activeQuizId)
    if (!quiz) return null
    
    return (
      <DashboardLayout>
        <div className="mb-6">
          <Button variant="outline" onClick={() => setActiveQuizId(null)}>
            ← Back to Quizzes
          </Button>
        </div>
        
        <GameQuiz 
          quiz={quiz} 
          onComplete={handleQuizComplete} 
          onCancel={() => setActiveQuizId(null)} 
        />
      </DashboardLayout>
    )
  }
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Digital Literacy Quizzes</h1>
          <p className="text-muted-foreground mt-2">Test your knowledge and earn badges by completing these quizzes!</p>
        </div>
        
        <Card className="overflow-hidden">
          <div className="h-2 w-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 p-2">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <CardTitle>Quiz Progress</CardTitle>
            </div>
            <CardDescription>Track your progress on digital literacy quizzes!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <div>Overall Progress</div>
                  <div>
                    {Object.values(quizProgress).filter((q: any) => q.completed).length} of {quizzes.length} quizzes completed
                  </div>
                </div>
                <Progress value={calculateOverallProgress()} className="h-2" />
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border p-3 transition-all duration-300 hover:shadow-md">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-green-500/10 p-1">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="font-medium">Correct Answers</div>
                  </div>
                  <div className="mt-1 text-2xl font-bold">
                    {Object.values(quizProgress).reduce((sum: number, q: any) => sum + (q.correctAnswers || 0), 0)}/
                    {Object.values(quizProgress).reduce((sum: number, q: any) => sum + (q.totalQuestions || 0), 0)}
                  </div>
                </div>
                
                <div className="rounded-lg border p-3 transition-all duration-300 hover:shadow-md">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-amber-500/10 p-1">
                      <Trophy className="h-4 w-4 text-amber-500" />
                    </div>
                    <div className="font-medium">Average Score</div>
                  </div>
                  <div className="mt-1 text-2xl font-bold">
                    {Object.values(quizProgress).length > 0
                      ? Math.round(
                          Object.values(quizProgress).reduce((sum: number, q: any) => sum + (q.score || 0), 0) /
                            Object.values(quizProgress).length
                        )
                      : 0}%
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid gap-6 md:grid-cols-2">
          <AnimatePresence>
            {quizzes.map((quiz) => {
              const progress = getQuizProgressData(quiz.id)
              
              return (
                <motion.div
                  key={quiz.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="overflow-hidden h-full flex flex-col">
                    <div className={`h-2 w-full bg-gradient-to-r ${quiz.color}`}></div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <div className={`rounded-full bg-gradient-to-r ${quiz.color} p-2`}>
                            {quiz.icon === 'Shield' && <Shield className="h-5 w-5 text-white" />}
                            {quiz.icon === 'Brain' && <Brain className="h-5 w-5 text-white" />}
                            {quiz.icon === 'Award' && <Award className="h-5 w-5 text-white" />}
                            {quiz.icon === 'Sparkles' && <Sparkles className="h-5 w-5 text-white" />}
                          </div>
                          <CardTitle className="text-lg">{quiz.title}</CardTitle>
                        </div>
                        {progress.completed && (
                          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                            Completed
                          </Badge>
                        )}
                      </div>
                      <CardDescription>{quiz.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">{quiz.category}</Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{quiz.questions.length} questions</span>
                          </div>
                        </div>
                        
                        {progress.completed && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Your Score</span>
                              <span className="font-medium">{progress.score}%</span>
                            </div>
                            <Progress value={progress.score} className="h-1.5" />
                            <div className="text-xs text-muted-foreground">
                              {progress.correctAnswers} of {progress.totalQuestions} correct answers
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        onClick={() => setActiveQuizId(quiz.id)}
                        className={`w-full ${
                          progress.completed
                            ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                            : `bg-gradient-to-r ${quiz.color}`
                        }`}
                      >
                        {progress.completed ? "Take Quiz Again" : "Start Quiz"}
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
        
        <Card className="overflow-hidden bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200 dark:from-indigo-950/20 dark:to-purple-950/20 dark:border-indigo-800">
          <div className="h-2 w-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 p-2">
                <Award className="h-5 w-5 text-white" />
              </div>
              <CardTitle>Earn Quiz Master Badges</CardTitle>
            </div>
            <CardDescription>
              Complete quizzes with high scores to earn special Quiz Master badges!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Each quiz you complete with a score of 80% or higher will earn you a special Quiz Master badge. Collect all
              Quiz Master badges to unlock the ultimate Digital Champion achievement!
            </p>
          </CardContent>
          <CardFooter>
            <Button
              asChild
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
            >
              <Link href="/badges">View Your Badges</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  )
}
