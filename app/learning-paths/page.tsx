'use client'

import { useState, useEffect } from 'react'
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle2,
  Clock,
  BookOpen,
  Award,
  Rocket,
  Sparkles,
  Shield,
  Bot,
  MessageSquare
} from "lucide-react"
import Link from "next/link"
import {
  getUserProgress,
  getCompletedQuestsCount,
  getAdventureTimeFormatted,
  calculateLearningPathProgress,
  saveLearningPathProgress
} from '@/lib/local-storage'
import { getUnlockedBadges } from '@/lib/local-storage'
import { learningPaths, recommendedModules } from '@/data/learning-paths'

export default function LearningPathsPage() {
  const [progress, setProgress] = useState<any>(null)
  const [completedQuests, setCompletedQuests] = useState(0)
  const [adventureTime, setAdventureTime] = useState('')
  const [badgesCount, setBadgesCount] = useState(0)
  const [pathsProgress, setPathsProgress] = useState<Record<string, number>>({})
  const [isLoading, setIsLoading] = useState(true)

  // Load progress from local storage
  useEffect(() => {
    // Get user progress
    const userProgress = getUserProgress()
    setProgress(userProgress)

    // Get completed quests
    const quests = getCompletedQuestsCount()
    setCompletedQuests(quests)

    // Get adventure time
    const time = getAdventureTimeFormatted()
    setAdventureTime(time)

    // Get badges count
    const badges = getUnlockedBadges()
    setBadgesCount(badges.length)

    // Calculate progress for each learning path
    const pathProgress: Record<string, number> = {}
    learningPaths.forEach(path => {
      const progress = calculateLearningPathProgress(
        path.id,
        path.relatedGames,
        path.relatedQuizzes
      )
      pathProgress[path.id] = progress

      // Initialize or update learning path progress in localStorage
      if (progress > 0 && !userProgress.learningPaths[path.id]) {
        saveLearningPathProgress({
          id: path.id,
          started: true,
          completed: progress === 100,
          completedModules: Math.round((path.modules * progress) / 100),
          lastAccessed: new Date().toISOString()
        })
      }
    })
    setPathsProgress(pathProgress)

    setIsLoading(false)
  }, [])

  // Get icon component by name
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Rocket':
        return Rocket
      case 'Sparkles':
        return Sparkles
      case 'Shield':
        return Shield
      case 'MessageSquare':
        return MessageSquare
      case 'BookOpen':
        return BookOpen
      case 'Bot':
        return Bot
      default:
        return Rocket
    }
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Learning Adventures</h1>
          <p className="text-muted-foreground mt-2">
            Choose your adventure path and earn special badges along the way!
          </p>
        </div>

        <div className="grid gap-6">
          <Card className="overflow-hidden">
            <div className="h-2 w-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
            <CardHeader>
              <CardTitle>Your Adventure Dashboard</CardTitle>
              <CardDescription>Track your progress and continue your exciting journey!</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border p-3 transition-all duration-300 hover:shadow-md">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <div className="font-medium">Completed Quests</div>
                  </div>
                  <div className="mt-1 text-2xl font-bold">{completedQuests}</div>
                </div>
                <div className="rounded-lg border p-3 transition-all duration-300 hover:shadow-md">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <div className="font-medium">Adventure Time</div>
                  </div>
                  <div className="mt-1 text-2xl font-bold">{adventureTime}</div>
                </div>
                <div className="rounded-lg border p-3 transition-all duration-300 hover:shadow-md">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-amber-500" />
                    <div className="font-medium">Badges Earned</div>
                  </div>
                  <div className="mt-1 text-2xl font-bold">{badgesCount}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-semibold mt-6">Your Adventure Paths</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {learningPaths.map((path) => {
              const pathProgress = pathsProgress[path.id] || 0
              const Icon = getIconComponent(path.icon)
              const userPathProgress = progress.learningPaths[path.id] || {
                completedModules: Math.round((path.modules * pathProgress) / 100)
              }

              return (
                <Card key={path.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <div className={`h-3 w-full bg-gradient-to-r ${path.color}`}></div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div className={`rounded-full bg-gradient-to-r ${path.color} p-2`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <CardTitle>{path.title}</CardTitle>
                      </div>
                      <Badge
                        variant={pathProgress > 0 ? "default" : "outline"}
                        className={
                          pathProgress > 0
                            ? "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                            : ""
                        }
                      >
                        {pathProgress > 0 ? "In Progress" : "New Adventure"}
                      </Badge>
                    </div>
                    <CardDescription className="mt-1">{path.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <div>Progress: {pathProgress}%</div>
                          <div>
                            {userPathProgress.completedModules}/{path.modules} quests
                          </div>
                        </div>
                        <Progress value={pathProgress} className="h-2" />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-4 w-4" />
                          {path.estimatedTime}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <BookOpen className="mr-1 h-4 w-4" />
                          {path.level}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {path.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                    >
                      <Link href={`/learning-paths/${path.id}`}>
                        {pathProgress > 0 ? "Continue Adventure" : "Start Adventure"}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>

          <h2 className="text-2xl font-semibold mt-6">Recommended Quests</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {recommendedModules.map((module) => {
              const Icon = getIconComponent(module.icon)
              return (
                <Card key={module.title} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <div className={`rounded-full p-2 ${module.color.replace("text-", "bg-")}/10 ${module.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        {module.time}
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="mr-1 h-4 w-4" />
                        {module.level}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="w-full hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-950/20 dark:hover:to-purple-950/20"
                    >
                      <Link href={`/quests/${module.path}/${module.title.toLowerCase().replace(/\s+/g, "-")}`}>
                        Start Quest
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
