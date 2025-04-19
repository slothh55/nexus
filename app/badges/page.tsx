'use client'

import { useEffect, useState } from 'react'
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Award, Shield, Brain, Lock, MessageSquare, Sparkles } from "lucide-react"
import Link from "next/link"
import { BadgeCard } from '@/components/badges/BadgeCard'
import { badges, updateAllBadgeProgress } from '@/lib/badge-system'
import { getAllBadges, getOverallProgress, getUserProgress } from '@/lib/local-storage'
import { BadgeProgress } from '@/lib/local-storage'

export default function BadgesPage() {
  // State for badge progress
  const [badgeProgress, setBadgeProgress] = useState<Record<string, BadgeProgress>>({})
  const [overallProgress, setOverallProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  
  // Load badge progress from local storage
  useEffect(() => {
    // Update all badge progress
    updateAllBadgeProgress()
    
    // Get badge progress
    const progress = getAllBadges()
    setBadgeProgress(progress)
    
    // Get overall progress
    const overall = getOverallProgress()
    setOverallProgress(overall)
    
    setIsLoading(false)
  }, [])
  
  // Group badges by category
  const badgesByCategory = badges.reduce(
    (acc, badge) => {
      if (!acc[badge.category]) {
        acc[badge.category] = []
      }
      acc[badge.category].push(badge)
      return acc
    },
    {} as Record<string, typeof badges>,
  )
  
  // Count badges by category
  const countBadgesByCategory = (category: string) => {
    return badges.filter(badge => badge.category === category).length
  }
  
  // Count unlocked badges by category
  const countUnlockedBadgesByCategory = (category: string) => {
    return Object.values(badgeProgress)
      .filter(progress => progress.category === category && progress.unlocked)
      .length
  }
  
  // Count total badges
  const totalBadges = badges.length
  
  // Count unlocked badges
  const unlockedBadges = Object.values(badgeProgress).filter(progress => progress.unlocked).length
  
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
          <h1 className="text-3xl font-bold tracking-tight">Your Achievement Badges</h1>
          <p className="text-muted-foreground mt-2">Collect badges by completing courses, quizzes, and games!</p>
        </div>

        <Card className="overflow-hidden">
          <div className="h-2 w-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 p-2">
                <Award className="h-5 w-5 text-white" />
              </div>
              <CardTitle>Badge Collection Progress</CardTitle>
            </div>
            <CardDescription>Track your progress towards earning all achievement badges!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <div>Overall Progress</div>
                  <div>
                    {unlockedBadges} of {totalBadges} badges earned
                  </div>
                </div>
                <Progress value={overallProgress} className="h-2" />
              </div>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="rounded-lg border p-3 transition-all duration-300 hover:shadow-md">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-blue-500/10 p-1">
                      <Brain className="h-4 w-4 text-blue-500" />
                    </div>
                    <div className="font-medium">Information</div>
                  </div>
                  <div className="mt-1 text-2xl font-bold">
                    {countUnlockedBadgesByCategory("Information Literacy")}/
                    {countBadgesByCategory("Information Literacy")}
                  </div>
                </div>
                <div className="rounded-lg border p-3 transition-all duration-300 hover:shadow-md">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-green-500/10 p-1">
                      <Shield className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="font-medium">Safety</div>
                  </div>
                  <div className="mt-1 text-2xl font-bold">
                    {countUnlockedBadgesByCategory("Online Safety")}/
                    {countBadgesByCategory("Online Safety")}
                  </div>
                </div>
                <div className="rounded-lg border p-3 transition-all duration-300 hover:shadow-md">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-purple-500/10 p-1">
                      <MessageSquare className="h-4 w-4 text-purple-500" />
                    </div>
                    <div className="font-medium">Communication</div>
                  </div>
                  <div className="mt-1 text-2xl font-bold">
                    {countUnlockedBadgesByCategory("Digital Communication")}/
                    {countBadgesByCategory("Digital Communication")}
                  </div>
                </div>
                <div className="rounded-lg border p-3 transition-all duration-300 hover:shadow-md">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-amber-500/10 p-1">
                      <Award className="h-4 w-4 text-amber-500" />
                    </div>
                    <div className="font-medium">Special</div>
                  </div>
                  <div className="mt-1 text-2xl font-bold">
                    {countUnlockedBadgesByCategory("Special Achievement")}/
                    {countBadgesByCategory("Special Achievement")}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Display badges by category */}
        {Object.entries(badgesByCategory).map(([category, categoryBadges]) => (
          <div key={category} className="space-y-4">
            <h2 className="text-2xl font-semibold">{category} Badges</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {categoryBadges.map((badge) => (
                <BadgeCard 
                  key={badge.id} 
                  badge={badge} 
                  progress={badgeProgress[badge.id] || {
                    id: badge.id,
                    unlocked: false,
                    progress: 0,
                    dateUnlocked: null,
                    category: badge.category
                  }} 
                />
              ))}
            </div>
          </div>
        ))}

        <Card className="overflow-hidden bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200 dark:from-indigo-950/20 dark:to-purple-950/20 dark:border-indigo-800">
          <div className="h-2 w-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 p-2">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <CardTitle>Special Achievement: Digital Champion</CardTitle>
            </div>
            <CardDescription>
              Complete all courses, quizzes, and games to become a certified Digital Champion!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              The Digital Champion badge is the ultimate achievement in your digital literacy journey! Earn this special
              badge by completing all courses, quizzes, and games. Show off your digital skills and become a role model
              for others!
            </p>
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <div>Progress to Digital Champion</div>
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
              <Link href="/simulator">Play Games</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  )
}
