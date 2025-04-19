'use client'

import { useState, useEffect } from 'react'
import { use } from 'react'
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  CheckCircle,
  Clock,
  Award,
  Rocket,
  ArrowLeft,
  Video,
  FileText,
  MousePointer,
  HelpCircle,
  Brain,
  Bot,
  MessageSquare,
  Search,
  Shield,
  Lock
} from "lucide-react"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import {
  getUserProgress,
  updateCourseProgress,
  updateModuleCompletion,
  updateAdventureTime
} from '@/lib/local-storage'
import { getCourseById } from '@/data/courses'
import { getQuizById } from '@/data/quizzes'
import { motion } from 'framer-motion'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { YouTubeEmbed } from "@/components/youtube-embed"

export default function CourseContent({ courseId }: { courseId: string }) {
  const router = useRouter()
  const [course, setCourse] = useState<any>(null)
  const [progress, setProgress] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeModule, setActiveModule] = useState<string | null>(null)
  const [startTime] = useState(Date.now())
  const [relatedQuizzes, setRelatedQuizzes] = useState<any[]>([])

  // Load course and progress
  useEffect(() => {
    const courseData = getCourseById(courseId)
    if (!courseData) {
      router.push('/courses')
      return
    }

    setCourse(courseData)

    // Get related quizzes
    if (courseData.relatedQuizzes && courseData.relatedQuizzes.length > 0) {
      const quizzes = courseData.relatedQuizzes.map(quizId => getQuizById(quizId)).filter(Boolean)
      setRelatedQuizzes(quizzes)
    }

    const userProgress = getUserProgress()
    setProgress(userProgress)

    // Set active module to first incomplete module or first module
    if (userProgress?.courses?.[courseId]?.modules) {
      const moduleProgress = userProgress.courses[courseId].modules
      const firstIncompleteModule = courseData.modules.find(
        (module: any) => !moduleProgress[module.id]?.completed
      )

      if (firstIncompleteModule) {
        setActiveModule(firstIncompleteModule.id)
      } else {
        setActiveModule(courseData.modules[0].id)
      }
    } else {
      setActiveModule(courseData.modules[0].id)
    }

    setIsLoading(false)
  }, [courseId, router])

  // Track time spent on page
  useEffect(() => {
    return () => {
      const timeSpentMinutes = Math.round((Date.now() - startTime) / 60000)
      if (timeSpentMinutes > 0) {
        updateAdventureTime(timeSpentMinutes)
      }
    }
  }, [startTime])

  // Mark module as completed
  const completeModule = (moduleId: string) => {
    updateModuleCompletion(course.id, moduleId, true)

    // Calculate new course progress
    const totalModules = course.modules.length
    const completedModules = progress?.courses?.[course.id]?.modules
      ? Object.values(progress.courses[course.id].modules).filter((m: any) => m.completed).length + 1
      : 1

    const newProgress = Math.round((completedModules / totalModules) * 100)
    updateCourseProgress(course.id, newProgress, completedModules === totalModules)

    // Update local state
    const userProgress = getUserProgress()
    setProgress(userProgress)

    // Move to next module if available
    const currentIndex = course.modules.findIndex((m: any) => m.id === moduleId)
    if (currentIndex < course.modules.length - 1) {
      setActiveModule(course.modules[currentIndex + 1].id)
    }
  }

  // Get module type icon
  const getModuleTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />
      case 'text': return <FileText className="h-4 w-4" />
      case 'interactive': return <MousePointer className="h-4 w-4" />
      case 'quiz': return <HelpCircle className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  // Get icon component by name
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen': return BookOpen
      case 'Rocket': return Rocket
      case 'Shield': return Shield
      case 'Bot': return Bot
      case 'MessageSquare': return MessageSquare
      case 'Brain': return Brain
      case 'Search': return Search
      case 'Lock': return Lock
      default: return BookOpen
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

  if (!course) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <BookOpen className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-1">Course not found</h3>
          <p className="text-muted-foreground mb-4">
            The course you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link href="/courses">Back to Courses</Link>
          </Button>
        </div>
      </DashboardLayout>
    )
  }

  const Icon = getIconComponent(course.icon)
  const courseProgress = progress?.courses?.[course.id] || { completed: false, progress: 0 }
  const activeModuleData = course.modules.find((m: any) => m.id === activeModule)
  const isModuleCompleted = (moduleId: string) =>
    progress?.courses?.[course.id]?.modules?.[moduleId]?.completed || false

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Button variant="outline" size="sm" asChild className="w-fit">
            <Link href="/courses">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Courses
            </Link>
          </Button>

          <div className="flex items-center gap-2">
            <div className="text-sm text-muted-foreground">Course Progress:</div>
            <div className="w-48 flex items-center gap-2">
              <Progress value={courseProgress.progress || 0} className="h-2" />
              <span className="text-sm font-medium">{courseProgress.progress || 0}%</span>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Course info */}
          <div className="md:col-span-1 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`rounded-full p-2 ${course.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle>{course.title}</CardTitle>
                </div>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>

              <CardContent className="pb-2">
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{course.category}</Badge>
                    <Badge
                      variant="secondary"
                      className={
                        course.level === "beginner"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                          : course.level === "intermediate"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                      }
                    >
                      {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{course.duration}</span>
                    <span className="mx-1">•</span>
                    <span>{course.modules.length} modules</span>
                  </div>

                  <div className="pt-2 border-t">
                    <h4 className="text-sm font-medium mb-2">Course Tags</h4>
                    <div className="flex flex-wrap gap-1">
                      {course.tags.map((tag: string) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related quizzes */}
            {relatedQuizzes.length > 0 && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Related Quizzes</CardTitle>
                  <CardDescription>Test your knowledge with these quizzes</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3">
                    {relatedQuizzes.map((quiz) => (
                      <div key={quiz.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`rounded-full p-1.5 bg-gradient-to-r ${quiz.color} bg-opacity-10`}>
                            <HelpCircle className="h-4 w-4 text-white" />
                          </div>
                          <div className="text-sm font-medium">{quiz.title}</div>
                        </div>
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/quizzes/${quiz.id}`}>Take Quiz</Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Course content */}
          <div className="md:col-span-2 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Course Content</CardTitle>
                <CardDescription>
                  {courseProgress.completed
                    ? "You've completed this course! Review any modules below."
                    : "Select a module to start learning"}
                </CardDescription>
              </CardHeader>

              <CardContent className="pb-2">
                <div className="grid grid-cols-1 gap-2">
                  {course.modules.map((module: any, index: number) => {
                    const isCompleted = isModuleCompleted(module.id)
                    const isActive = activeModule === module.id

                    return (
                      <div
                        key={module.id}
                        className={`p-3 rounded-md cursor-pointer transition-all ${
                          isActive
                            ? "bg-primary/10 border border-primary/20"
                            : isCompleted
                              ? "bg-green-500/10 border border-green-500/20"
                              : "bg-muted/40 border border-border hover:bg-muted"
                        }`}
                        onClick={() => setActiveModule(module.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-xs font-medium">
                              {index + 1}
                            </div>
                            <div className="font-medium">{module.title}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              {getModuleTypeIcon(module.type)}
                              <span className="capitalize">{module.type}</span>
                            </div>
                            <div className="text-xs text-muted-foreground">{module.duration}</div>
                            {isCompleted && (
                              <div className="rounded-full bg-green-500 p-1">
                                <CheckCircle className="h-3 w-3 text-white" />
                              </div>
                            )}
                          </div>
                        </div>
                        {isActive && (
                          <div className="mt-1 text-sm text-muted-foreground">
                            {module.description}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Active module content */}
            {activeModuleData && (
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>{activeModuleData.title}</CardTitle>
                    <Badge variant="outline" className="capitalize">
                      {activeModuleData.type}
                    </Badge>
                  </div>
                  <CardDescription>{activeModuleData.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="prose dark:prose-invert max-w-none">
                    {activeModuleData.type === 'video' && (
                      <div className="mb-4">
                        {activeModuleData.videoId ? (
                          <YouTubeEmbed videoId={activeModuleData.videoId} title={activeModuleData.title} />
                        ) : (
                          <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                            <Video className="h-12 w-12 text-muted-foreground" />
                            <span className="ml-2 text-muted-foreground">Video content would appear here</span>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="whitespace-pre-line">
                      {activeModuleData.content}
                    </div>

                    {activeModuleData.type === 'interactive' && (
                      <Alert className="mt-4">
                        <MousePointer className="h-4 w-4" />
                        <AlertTitle>Interactive Content</AlertTitle>
                        <AlertDescription>
                          This module contains interactive elements that would be displayed here.
                        </AlertDescription>
                      </Alert>
                    )}

                    {activeModuleData.type === 'quiz' && (
                      <Alert className="mt-4">
                        <HelpCircle className="h-4 w-4" />
                        <AlertTitle>Quiz Module</AlertTitle>
                        <AlertDescription>
                          This module contains a quiz to test your knowledge. Take the related quiz from the sidebar.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="border-t p-4">
                  <div className="w-full flex justify-between items-center">
                    <Button
                      variant="outline"
                      onClick={() => {
                        const currentIndex = course.modules.findIndex((m: any) => m.id === activeModule)
                        if (currentIndex > 0) {
                          setActiveModule(course.modules[currentIndex - 1].id)
                        }
                      }}
                      disabled={course.modules.findIndex((m: any) => m.id === activeModule) === 0}
                    >
                      Previous Module
                    </Button>

                    {isModuleCompleted(activeModuleData.id) ? (
                      <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Completed
                      </Badge>
                    ) : (
                      <Button onClick={() => completeModule(activeModuleData.id)}>
                        Mark as Completed
                      </Button>
                    )}

                    <Button
                      variant="outline"
                      onClick={() => {
                        const currentIndex = course.modules.findIndex((m: any) => m.id === activeModule)
                        if (currentIndex < course.modules.length - 1) {
                          setActiveModule(course.modules[currentIndex + 1].id)
                        }
                      }}
                      disabled={course.modules.findIndex((m: any) => m.id === activeModule) === course.modules.length - 1}
                    >
                      Next Module
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
