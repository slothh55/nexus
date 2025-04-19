'use client'

import { useState, useEffect } from 'react'
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  Award, 
  Brain, 
  CheckCircle, 
  Clock, 
  Shield, 
  Sparkles, 
  Trophy, 
  GamepadIcon,
  BookOpen,
  BarChart
} from "lucide-react"
import Link from "next/link"
import { getUserProgress, getOverallProgress } from '@/lib/local-storage'
import { getQuizSummary } from '@/lib/quiz-system'
import { badges } from '@/lib/badge-system'

export default function ProgressPage() {
  const [progress, setProgress] = useState<any>(null)
  const [overallProgress, setOverallProgress] = useState(0)
  const [quizSummary, setQuizSummary] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  // Load progress from local storage
  useEffect(() => {
    const userProgress = getUserProgress()
    setProgress(userProgress)
    
    const overall = getOverallProgress()
    setOverallProgress(overall)
    
    const summary = getQuizSummary()
    setQuizSummary(summary)
    
    setIsLoading(false)
  }, [])
  
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </DashboardLayout>
    )
  }
  
  // Count completed games
  const completedGames = Object.values(progress.games).filter((game: any) => game.completed).length
  const totalGames = 4 // We have 4 games
  
  // Count unlocked badges
  const unlockedBadges = Object.values(progress.badges).filter((badge: any) => badge.unlocked).length
  const totalBadges = badges.length
  
  // Count completed quizzes
  const completedQuizzes = Object.values(progress.quizzes).filter((quiz: any) => quiz.completed).length
  const totalQuizzes = 4 // We have 4 quizzes
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Learning Progress</h1>
          <p className="text-muted-foreground mt-2">Track your digital literacy journey and achievements!</p>
        </div>
        
        <Card className="overflow-hidden">
          <div className="h-2 w-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 p-2">
                <BarChart className="h-5 w-5 text-white" />
              </div>
              <CardTitle>Overall Progress</CardTitle>
            </div>
            <CardDescription>Your journey to becoming a Digital Champion!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <div>Digital Champion Progress</div>
                  <div>{overallProgress}% Complete</div>
                </div>
                <Progress value={overallProgress} className="h-3" />
              </div>
              
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-2 border-blue-200 dark:border-blue-800">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-blue-500/10 p-2">
                        <GamepadIcon className="h-5 w-5 text-blue-500" />
                      </div>
                      <CardTitle className="text-base">Games</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{completedGames}/{totalGames}</div>
                    <Progress value={(completedGames / totalGames) * 100} className="h-1.5 mt-2" />
                  </CardContent>
                </Card>
                
                <Card className="border-2 border-purple-200 dark:border-purple-800">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-purple-500/10 p-2">
                        <BookOpen className="h-5 w-5 text-purple-500" />
                      </div>
                      <CardTitle className="text-base">Quizzes</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{completedQuizzes}/{totalQuizzes}</div>
                    <Progress value={(completedQuizzes / totalQuizzes) * 100} className="h-1.5 mt-2" />
                  </CardContent>
                </Card>
                
                <Card className="border-2 border-amber-200 dark:border-amber-800">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-amber-500/10 p-2">
                        <Award className="h-5 w-5 text-amber-500" />
                      </div>
                      <CardTitle className="text-base">Badges</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{unlockedBadges}/{totalBadges}</div>
                    <Progress value={(unlockedBadges / totalBadges) * 100} className="h-1.5 mt-2" />
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-blue-500/10 p-2">
                  <GamepadIcon className="h-5 w-5 text-blue-500" />
                </div>
                <CardTitle>Game Progress</CardTitle>
              </div>
              <CardDescription>Track your progress in the digital literacy games</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-red-500" />
                      <span>Phishing Defender</span>
                    </div>
                    <Badge variant={progress.games['phishing-defender']?.completed ? 'default' : 'outline'}>
                      {progress.games['phishing-defender']?.completed ? 'Completed' : 'In Progress'}
                    </Badge>
                  </div>
                  <Progress 
                    value={progress.games['phishing-defender']?.completed ? 100 : (progress.games['phishing-defender']?.score || 0)} 
                    className="h-1.5" 
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Brain className="h-4 w-4 text-blue-500" />
                      <span>Fact Checker Challenge</span>
                    </div>
                    <Badge variant={progress.games['fact-checker']?.completed ? 'default' : 'outline'}>
                      {progress.games['fact-checker']?.completed ? 'Completed' : 'In Progress'}
                    </Badge>
                  </div>
                  <Progress 
                    value={progress.games['fact-checker']?.completed ? 100 : (progress.games['fact-checker']?.score || 0)} 
                    className="h-1.5" 
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span>Password Hero</span>
                    </div>
                    <Badge variant={progress.games['password-hero']?.completed ? 'default' : 'outline'}>
                      {progress.games['password-hero']?.completed ? 'Completed' : 'In Progress'}
                    </Badge>
                  </div>
                  <Progress 
                    value={progress.games['password-hero']?.completed ? 100 : (progress.games['password-hero']?.score || 0)} 
                    className="h-1.5" 
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-purple-500" />
                      <span>Privacy Protector</span>
                    </div>
                    <Badge variant={progress.games['privacy-protector']?.completed ? 'default' : 'outline'}>
                      {progress.games['privacy-protector']?.completed ? 'Completed' : 'In Progress'}
                    </Badge>
                  </div>
                  <Progress 
                    value={progress.games['privacy-protector']?.completed ? 100 : (progress.games['privacy-protector']?.score || 0)} 
                    className="h-1.5" 
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <Button asChild className="w-full">
                  <Link href="/simulator">Play Games</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-purple-500/10 p-2">
                  <BookOpen className="h-5 w-5 text-purple-500" />
                </div>
                <CardTitle>Quiz Progress</CardTitle>
              </div>
              <CardDescription>Track your progress in the digital literacy quizzes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border p-3">
                    <div className="text-sm text-muted-foreground">Quizzes Completed</div>
                    <div className="text-2xl font-bold mt-1">{quizSummary?.completedQuizzes || 0}/{quizSummary?.totalQuizzes || 0}</div>
                  </div>
                  
                  <div className="rounded-lg border p-3">
                    <div className="text-sm text-muted-foreground">Average Score</div>
                    <div className="text-2xl font-bold mt-1">{quizSummary?.averageScore ? Math.round(quizSummary.averageScore) : 0}%</div>
                  </div>
                </div>
                
                <div className="rounded-lg border p-3">
                  <div className="text-sm text-muted-foreground mb-2">Correct Answers</div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{quizSummary?.totalCorrectAnswers || 0} of {quizSummary?.totalQuestions || 0}</span>
                    <span>{quizSummary?.totalQuestions ? Math.round((quizSummary.totalCorrectAnswers / quizSummary.totalQuestions) * 100) : 0}%</span>
                  </div>
                  <Progress 
                    value={quizSummary?.totalQuestions ? (quizSummary.totalCorrectAnswers / quizSummary.totalQuestions) * 100 : 0} 
                    className="h-1.5" 
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <Button asChild className="w-full">
                  <Link href="/quizzes">Take Quizzes</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="overflow-hidden bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200 dark:from-indigo-950/20 dark:to-purple-950/20 dark:border-indigo-800">
          <div className="h-2 w-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 p-2">
                <Trophy className="h-5 w-5 text-white" />
              </div>
              <CardTitle>Your Digital Champion Journey</CardTitle>
            </div>
            <CardDescription>
              Complete all games and quizzes to become a certified Digital Champion!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Your journey to becoming a Digital Champion is {overallProgress}% complete! Continue playing games, taking quizzes, 
              and earning badges to complete your digital literacy training.
            </p>
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <div>Overall Progress</div>
                <div>{overallProgress}%</div>
              </div>
              <Progress value={overallProgress} className="h-2" />
            </div>
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
