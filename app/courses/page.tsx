'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
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
  Lock
} from "lucide-react"
import Link from "next/link"
import {
  getUserProgress,
  updateAdventureTime
} from '@/lib/local-storage'
import { courses, getIconByName } from '@/data/courses'
import { learningPaths } from '@/data/learning-paths'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from 'framer-motion'

export default function CoursesPage() {
  const searchParams = useSearchParams()
  const pathParam = searchParams.get('path')

  const [progress, setProgress] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState(pathParam || 'all')
  const [searchQuery, setSearchQuery] = useState('')
  const [startTime] = useState(Date.now())

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

  // Filter courses based on active tab and search query
  const filteredCourses = courses.filter(course => {
    // Filter by tab
    if (activeTab !== 'all' && course.learningPathId !== activeTab) {
      return false
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query) ||
        course.category.toLowerCase().includes(query) ||
        course.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    return true
  })

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
          <h1 className="text-3xl font-bold tracking-tight">Digital Literacy Courses</h1>
          <p className="text-muted-foreground mt-2">Explore our courses to build your digital skills and knowledge!</p>
        </div>

        {/* Search and filter */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full bg-background pl-8 h-9 rounded-md border border-input px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
            <TabsList>
              <TabsTrigger value="all">All Paths</TabsTrigger>
              {learningPaths.map(path => (
                <TabsTrigger key={path.id} value={path.id} className="hidden md:flex">
                  {path.title.split(' ')[0]}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Courses grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => {
            const Icon = getIconComponent(course.icon)
            const courseProgress = progress?.courses?.[course.id] || { completed: false, progress: 0 }
            const learningPath = learningPaths.find(path => path.id === course.learningPathId)

            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <div className={`h-2 w-full ${course.color.includes("bg-") ? course.color : `bg-${course.color.split(" ")[1]}`}`}></div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`rounded-full p-2 ${course.color}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                      </div>
                      {courseProgress.completed && (
                        <div className="rounded-full bg-green-500 p-1">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                    <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="pb-2 flex-grow">
                    <div className="flex flex-wrap gap-2 mb-3">
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

                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                      <span className="mx-1">•</span>
                      <span>{course.modules.length} modules</span>
                    </div>

                    {learningPath && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Rocket className="h-4 w-4 text-purple-500" />
                        <span>Part of: {learningPath.title}</span>
                      </div>
                    )}

                    <div className="space-y-1 mt-auto">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{courseProgress.progress || 0}%</span>
                      </div>
                      <Progress value={courseProgress.progress || 0} className="h-1.5" />
                    </div>
                  </CardContent>

                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href={`/courses/${course.id}`}>
                        {courseProgress.progress > 0 ? "Continue Course" : "Start Course"}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <BookOpen className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-1">No courses found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery
                ? `No courses match "${searchQuery}". Try a different search term.`
                : "No courses available for the selected filter."}
            </p>
            {searchQuery && (
              <Button variant="outline" onClick={() => setSearchQuery('')}>
                Clear Search
              </Button>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
