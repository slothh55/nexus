'use client'

import { useState, useEffect } from 'react'
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  CheckCircle,
  Clock,
  GamepadIcon,
  Award,
  Brain,
  Shield,
  MessageSquare,
  Bot,
  Sparkles,
  Rocket,
} from "lucide-react"
import {
  getUserProgress,
  getCompletedQuestsCount,
  getAdventureTimeFormatted,
  calculateLearningPathProgress
} from '@/lib/local-storage'
import { getUnlockedBadges } from '@/lib/local-storage'
import { learningPaths } from '@/data/learning-paths'
import { quizzes } from '@/data/quizzes'

export default function Home() {
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
    })
    setPathsProgress(pathProgress)

    setIsLoading(false)
  }, [])

  // Digital Literacy Courses
  const courses = [
    {
      id: "information-literacy",
      title: "Information Detective",
      description: "Learn to find clues and solve the mystery of real vs. fake information online!",
      level: "Beginner",
      duration: "4 hours",
      modules: 8,
      icon: BookOpen,
      tags: ["Research", "Fact-checking", "Source Evaluation"],
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      id: "digital-communication",
      title: "Communication Superheroes",
      description: "Discover your communication superpowers and learn to use them wisely online!",
      level: "Intermediate",
      duration: "3 hours",
      modules: 6,
      icon: MessageSquare,
      tags: ["Collaboration", "Etiquette", "Teamwork"],
      color: "bg-purple-500/10 text-purple-500",
    },
    {
      id: "online-safety",
      title: "Safety Explorers",
      description: "Join our adventure to discover the secrets of staying safe in the digital world!",
      level: "All Levels",
      duration: "5 hours",
      modules: 10,
      icon: Shield,
      tags: ["Security", "Privacy", "Protection"],
      color: "bg-green-500/10 text-green-500",
    },
    {
      id: "ai-awareness",
      title: "AI Adventurers",
      description: "Embark on an exciting journey to understand the magical world of AI!",
      level: "Intermediate",
      duration: "6 hours",
      modules: 12,
      icon: Bot,
      tags: ["Ethics", "Robots", "Future Technology"],
      color: "bg-amber-500/10 text-amber-500",
    },
  ]

  // Games
  const games = [
    {
      id: "ai-ethics-detective",
      title: "AI Ethics Detective",
      description: "Identify ethical issues in AI-generated content and become an AI Ethics expert!",
      time: "10-15 minutes",
      difficulty: "Intermediate",
      category: "AI Ethics",
      color: "bg-indigo-500/10 text-indigo-500",
    },
    {
      id: "prompt-engineer",
      title: "Prompt Engineering Master",
      description: "Learn to craft effective and ethical prompts for AI systems!",
      time: "10-15 minutes",
      difficulty: "Intermediate",
      category: "AI Ethics",
      color: "bg-purple-500/10 text-purple-500",
    },
    {
      id: "phishing-defender",
      title: "Phishing Defender",
      description: "Save your friends from tricky phishing attacks in this exciting adventure game!",
      time: "10-15 minutes",
      difficulty: "All Levels",
      category: "Online Safety",
      color: "bg-red-500/10 text-red-500",
    },
    {
      id: "fact-checker",
      title: "Fact Checker Challenge",
      description: "Race against time to verify information and become the ultimate Fact Master!",
      time: "5-10 minutes",
      difficulty: "Intermediate",
      category: "Information Literacy",
      color: "bg-blue-500/10 text-blue-500",
    },
  ]

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
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="rounded-lg border bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 shadow-lg">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-white">Welcome to Digital Inclusion Companion</h1>
              <p className="text-xl text-white/90">
                Your magical companion for exploring the digital world safely and responsibly!
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-white/90 hover:text-purple-700">
                  <Rocket className="mr-2 h-5 w-5" />
                  <Link href="/learning-paths">Start Your Adventure</Link>
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  <Award className="mr-2 h-5 w-5" />
                  <Link href="/quizzes">Take a Quiz</Link>
                </Button>
              </div>

              {/* Progress Summary */}
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="rounded-md bg-white/20 p-2 text-center">
                  <div className="text-2xl font-bold text-white">{completedQuests}</div>
                  <div className="text-xs text-white/80">Quests Completed</div>
                </div>
                <div className="rounded-md bg-white/20 p-2 text-center">
                  <div className="text-2xl font-bold text-white">{adventureTime}</div>
                  <div className="text-xs text-white/80">Adventure Time</div>
                </div>
                <div className="rounded-md bg-white/20 p-2 text-center">
                  <div className="text-2xl font-bold text-white">{badgesCount}</div>
                  <div className="text-xs text-white/80">Badges Earned</div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[200px] w-[200px] animate-bounce rounded-full bg-white/20 p-1">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-24 w-24 text-white"
                  >
                    <path d="M12 2a10 10 0 1 0 10 10H12V2Z" />
                    <path d="M12 12 2.1 9.1a10 10 0 0 0 9.8 12.9L12 12Z" />
                    <path d="M12 12 9.1 2.1a10 10 0 0 0 12.9 9.8L12 12Z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Paths Section */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Learning Adventures</h2>
          <p className="text-muted-foreground">Choose your adventure path and earn special badges!</p>

          <div className="grid gap-4 md:grid-cols-2">
            {learningPaths.map((path) => {
              const pathProgress = pathsProgress[path.id] || 0
              const Icon = path.icon === 'Rocket' ? Rocket :
                          path.icon === 'Sparkles' ? Sparkles :
                          path.icon === 'Shield' ? Shield :
                          path.icon === 'MessageSquare' ? MessageSquare : Rocket

              return (
                <Card key={path.id} className="overflow-hidden">
                  <div className={`h-3 w-full bg-gradient-to-r ${path.color}`}></div>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className={`rounded-full bg-gradient-to-r ${path.color} p-2`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">{path.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{path.description}</CardDescription>
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <div>Progress: {pathProgress}%</div>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${path.color}`}
                          style={{ width: `${pathProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                    >
                      <Link href={`/courses?path=${path.id}`}>
                        {pathProgress > 0 ? "Continue Adventure" : "Start Adventure"}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="courses" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="courses" className="text-lg">
              Courses
            </TabsTrigger>
            <TabsTrigger value="quizzes" className="text-lg">
              Quizzes
            </TabsTrigger>
            <TabsTrigger value="games" className="text-lg">
              Games
            </TabsTrigger>
          </TabsList>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Digital Literacy Courses</h2>
              <Button variant="outline" size="sm" asChild>
                <Link href="/courses">View All Courses</Link>
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {courses.map((course) => {
                const Icon = course.icon
                return (
                  <Card
                    key={course.id}
                    className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg"
                  >
                    <div
                      className={`h-2 w-full ${course.color.includes("bg-") ? course.color.replace("text-", "bg-") : `bg-${course.color.split(" ")[1]}`}`}
                    ></div>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <div className={`rounded-full p-2 ${course.color}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                      </div>
                      <CardDescription className="pt-2">{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <BookOpen className="mr-1 h-4 w-4" />
                          {course.modules} modules
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-1 h-4 w-4" />
                          {course.duration}
                        </div>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {course.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        asChild
                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                      >
                        <Link href={`/courses/${course.id}`}>Start Course</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
            <div className="rounded-lg border bg-gradient-to-r from-indigo-50 to-purple-50 p-4 dark:from-indigo-950/20 dark:to-purple-950/20">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-indigo-500" />
                <h3 className="font-medium">Course Completion Rewards</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Complete courses to earn special badges, unlock new adventures, and become a Digital Literacy Champion!
              </p>
            </div>
          </TabsContent>

          {/* Quizzes Tab */}
          <TabsContent value="quizzes" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Digital Literacy Quizzes</h2>
              <Button variant="outline" size="sm" asChild>
                <Link href="/quizzes">View All Quizzes</Link>
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {quizzes.map((quiz) => {
                const quizProgress = progress.quizzes[quiz.id] || { completed: false, score: 0 }
                return (
                  <Card
                    key={quiz.id}
                    className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg"
                  >
                    <div className={`h-2 w-full bg-gradient-to-r ${quiz.color}`}></div>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <div className={`rounded-full bg-gradient-to-r ${quiz.color} p-2`}>
                          <Brain className="h-5 w-5 text-white" />
                        </div>
                        <CardTitle className="text-lg">{quiz.title}</CardTitle>
                      </div>
                      <CardDescription className="pt-2">{quiz.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <CheckCircle className="mr-1 h-4 w-4" />
                          {quiz.questions.length} questions
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-1 h-4 w-4" />
                          {quiz.timeLimit ? `${quiz.timeLimit} seconds` : '10-15 minutes'}
                        </div>
                      </div>
                      <div className="mt-2">
                        <Badge variant="outline" className={`bg-gradient-to-r ${quiz.color} text-white`}>
                          {quiz.category}
                        </Badge>
                        {quizProgress.completed && (
                          <Badge variant="outline" className="ml-2 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                            Completed: {quizProgress.score}%
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        asChild
                        className={`w-full ${quizProgress.completed
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                          : "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"}`}
                      >
                        <Link href={`/quizzes`}>
                          {quizProgress.completed ? "Take Again" : "Take Quiz"}
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
            <div className="rounded-lg border bg-gradient-to-r from-indigo-50 to-purple-50 p-4 dark:from-indigo-950/20 dark:to-purple-950/20">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-indigo-500" />
                <h3 className="font-medium">Why Take Quizzes?</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Test your knowledge, earn special badges, and unlock new adventures! Each quiz helps you become a better
                digital explorer.
              </p>
            </div>
          </TabsContent>

          {/* Games Tab */}
          <TabsContent value="games" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Educational Games</h2>
              <Button variant="outline" size="sm" asChild>
                <Link href="/simulator">View All Games</Link>
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {games.map((game) => {
                const gameProgress = progress.games[game.id] || { completed: false, score: 0 }
                return (
                  <Card
                    key={game.id}
                    className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg"
                  >
                    <div
                      className={`h-2 w-full ${game.color.includes("bg-") ? game.color.replace("text-", "bg-") : `bg-${game.color.split(" ")[1]}`}`}
                    ></div>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <div className={`rounded-full p-2 ${game.color}`}>
                          <GamepadIcon className="h-5 w-5" />
                        </div>
                        <CardTitle className="text-lg">{game.title}</CardTitle>
                      </div>
                      <CardDescription className="pt-2">{game.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="mr-1 h-4 w-4" />
                          {game.time}
                        </div>
                        <div className="flex items-center">
                          <Award className="mr-1 h-4 w-4" />
                          {game.difficulty}
                        </div>
                      </div>
                      <div className="mt-2">
                        <Badge variant="outline" className={game.color}>
                          {game.category}
                        </Badge>
                        {gameProgress.completed && (
                          <Badge variant="outline" className="ml-2 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                            Completed
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        asChild
                        className={`w-full ${gameProgress.completed
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                          : "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"}`}
                      >
                        <Link href={`/simulator/${game.id}`}>
                          {gameProgress.completed ? "Play Again" : "Play Game"}
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
            <div className="rounded-lg border bg-gradient-to-r from-indigo-50 to-purple-50 p-4 dark:from-indigo-950/20 dark:to-purple-950/20">
              <div className="flex items-center gap-2">
                <GamepadIcon className="h-5 w-5 text-indigo-500" />
                <h3 className="font-medium">Learning Through Play</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Games make learning fun! Play these exciting games to practice your digital skills and earn special
                rewards.
              </p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Featured Content */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Your Progress</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 dark:from-blue-950/20 dark:to-blue-900/20 dark:border-blue-800 transition-all duration-300 hover:shadow-lg">
              <div className="h-2 w-full bg-blue-500"></div>
              <CardHeader>
                <CardTitle>Completed Quests</CardTitle>
                <CardDescription>You've completed {completedQuests} quests so far!</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{completedQuests}</div>
              </CardContent>
              <CardFooter>
                <Button variant="default" className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                  <Link href="/progress">View Progress</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 dark:from-purple-950/20 dark:to-purple-900/20 dark:border-purple-800 transition-all duration-300 hover:shadow-lg">
              <div className="h-2 w-full bg-purple-500"></div>
              <CardHeader>
                <CardTitle>Adventure Time</CardTitle>
                <CardDescription>You've spent {adventureTime} on your adventures!</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{adventureTime}</div>
              </CardContent>
              <CardFooter>
                <Button variant="default" className="w-full bg-purple-600 hover:bg-purple-700" asChild>
                  <Link href="/progress">View Details</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 dark:from-amber-950/20 dark:to-amber-900/20 dark:border-amber-800 transition-all duration-300 hover:shadow-lg">
              <div className="h-2 w-full bg-amber-500"></div>
              <CardHeader>
                <CardTitle>Badges Earned</CardTitle>
                <CardDescription>You've earned {badgesCount} badges on your journey!</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{badgesCount}</div>
              </CardContent>
              <CardFooter>
                <Button variant="default" className="w-full bg-amber-600 hover:bg-amber-700" asChild>
                  <Link href="/badges">View Badges</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
