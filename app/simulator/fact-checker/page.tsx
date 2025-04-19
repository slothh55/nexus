"use client"

import { useState, useEffect, useRef } from 'react'
import { DashboardLayout } from "@/components/dashboard-layout"
import { FactCheckerGame } from "@/components/games/fact-checker/FactCheckerGame"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NextLink from "next/link"
import { cn } from "@/lib/utils"
import {
  Brain,
  Trophy,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Info,
  FileText,
  Search,
  BarChart,
  Sparkles,
  ExternalLink,
  ThumbsUp,
  ThumbsDown
} from "lucide-react"

// Claims data for the game
const claims = [
  {
    id: 1,
    claim: "Bananas grow on trees.",
    isTrue: false,
    explanation:
      "Bananas actually grow on plants, not trees. The banana 'tree' is technically a herb and the banana itself is considered a berry. The trunk of a banana plant is made of tightly wrapped leaves, not wood.",
    evidence: [
      {
        source: "National Geographic",
        url: "https://www.nationalgeographic.com/",
        reliability: 95,
        quote:
          "Bananas grow on plants, not trees. These plants are classified as herbs, and bananas themselves are berries.",
        type: "educational",
      },
      {
        source: "Britannica",
        url: "https://www.britannica.com/",
        reliability: 98,
        quote:
          "The banana plant is a gigantic herb that springs from an underground stem, or rhizome, to form a false trunk 3–6 metres (10–20 feet) high.",
        type: "educational",
      },
    ],
    difficulty: "medium",
    category: "Science",
    relatedTruth: "Bananas grow on large herbaceous plants that can reach heights of up to 20 feet.",
  },
  {
    id: 2,
    claim: "The Great Wall of China is visible from space with the naked eye.",
    isTrue: false,
    explanation:
      "Contrary to popular belief, the Great Wall of China cannot be seen from space with the naked eye. While some human structures are visible from space with the help of cameras and telescopes, the Great Wall is difficult to spot even with these tools due to its color blending with the surrounding landscape.",
    evidence: [
      {
        source: "NASA",
        url: "https://www.nasa.gov/",
        reliability: 99,
        quote:
          "The Great Wall of China, frequently billed as the only man-made object visible from space, isn't visible from low Earth orbit without magnification.",
        type: "scientific",
      },
      {
        source: "Scientific American",
        url: "https://www.scientificamerican.com/",
        reliability: 95,
        quote:
          "Contrary to common belief, the Great Wall of China is not visible from space by the naked eye without aid.",
        type: "scientific",
      },
      {
        source: "China Daily",
        url: "http://www.chinadaily.com.cn/",
        reliability: 70,
        quote: "The Great Wall is one of the greatest wonders in the world and can be seen from space.",
        type: "news",
      },
    ],
    difficulty: "medium",
    category: "Geography",
    relatedTruth:
      "The Great Wall of China spans approximately 13,171 miles (21,196 kilometers) and is a UNESCO World Heritage Site.",
  },
  {
    id: 3,
    claim: "Water conducts electricity well.",
    isTrue: false,
    explanation:
      "Pure water is actually a poor conductor of electricity. It's the impurities in water, such as salts and minerals, that conduct electricity. This is why distilled water (which has had impurities removed) is a poor conductor, while tap water or saltwater conducts electricity well.",
    evidence: [
      {
        source: "American Chemical Society",
        url: "https://www.acs.org/",
        reliability: 97,
        quote:
          "Pure water is actually an insulator. The reason we're warned about water and electricity is because the water we encounter in daily life contains dissolved minerals and salts, which are excellent conductors.",
        type: "scientific",
      },
      {
        source: "Physics Classroom",
        url: "https://www.physicsclassroom.com/",
        reliability: 94,
        quote:
          "Distilled water is a poor conductor of electricity. It is the ions dissolved in water that allows it to conduct electricity.",
        type: "educational",
      },
      {
        source: "ScienceDaily",
        url: "https://www.sciencedaily.com/",
        reliability: 90,
        quote:
          "Pure water is an excellent insulator and does not conduct electricity. It's the impurities in water, such as salt, that enable it to conduct electricity.",
        type: "scientific",
      },
    ],
    difficulty: "hard",
    category: "Science",
    relatedTruth: "Tap water conducts electricity because it contains minerals and ions that act as conductors.",
  },
  {
    id: 4,
    claim: "A day on Venus is longer than a year on Venus.",
    isTrue: true,
    explanation:
      "Venus rotates very slowly on its axis, taking about 243 Earth days to complete one rotation (a day). However, it only takes about 225 Earth days to orbit the Sun (a year). This means that a day on Venus is indeed longer than its year!",
    evidence: [
      {
        source: "NASA",
        url: "https://www.nasa.gov/",
        reliability: 99,
        quote:
          "A day on Venus lasts 243 Earth days, while a year on Venus lasts 225 Earth days. So on Venus, a day is longer than a year!",
        type: "scientific",
      },
      {
        source: "Space.com",
        url: "https://www.space.com/",
        reliability: 92,
        quote:
          "Venus rotates so slowly that it takes the equivalent of 243 Earth days to complete one rotation. The planet completes its orbit around the Sun in 225 Earth days, making a day on Venus longer than its year.",
        type: "scientific",
      },
    ],
    difficulty: "hard",
    category: "Astronomy",
    relatedTruth:
      "Venus rotates in the opposite direction compared to most planets in our solar system, a phenomenon known as retrograde rotation.",
  },
  {
    id: 5,
    claim: "Humans use only 10% of their brains.",
    isTrue: false,
    explanation:
      "This is a common myth. In reality, humans use virtually all parts of their brains, just not all at the same time. Different activities activate different parts of the brain. Brain imaging technologies like fMRI scans show that even simple tasks activate much more than 10% of the brain.",
    evidence: [
      {
        source: "Scientific American",
        url: "https://www.scientificamerican.com/",
        reliability: 95,
        quote:
          "The 10 percent myth has been fodder for movies and inspirational speakers for years. But the truth is that we use virtually all of our brain every day.",
        type: "scientific",
      },
      {
        source: "Neuroscience Journal",
        url: "https://www.jneurosci.org/",
        reliability: 98,
        quote:
          "Modern brain scans show activity throughout the entire brain, even during sleep. No area of the brain is completely inactive.",
        type: "scientific",
      },
      {
        source: "Brain Myths Blog",
        url: "https://www.brainmyths.com/",
        reliability: 40,
        quote:
          "Humans can unlock untapped brain potential through special exercises that activate dormant brain regions.",
        type: "blog",
      },
    ],
    difficulty: "medium",
    category: "Science",
    relatedTruth:
      "The human brain consumes about 20% of the body's energy despite being only about 2% of the body's weight.",
  },
  {
    id: 6,
    claim: "Goldfish have a memory span of only three seconds.",
    isTrue: false,
    explanation:
      "This is a myth. Research has shown that goldfish can remember things for months, not just seconds. They can be trained to respond to certain sounds, recognize people who feed them, and even learn simple tricks. Their memory span is much longer than the commonly believed three seconds.",
    evidence: [
      {
        source: "Animal Cognition Journal",
        url: "https://www.springer.com/journal/10071",
        reliability: 97,
        quote:
          "Studies indicate goldfish can remember learned behaviors for at least three months. They demonstrate the ability to learn and remember complex spatial arrangements.",
        type: "scientific",
      },
      {
        source: "Scientific American",
        url: "https://www.scientificamerican.com/",
        reliability: 95,
        quote:
          "Contrary to popular belief, goldfish have been shown to have memory spans of at least three months, with the ability to learn and respond to particular sounds, colors, and light conditions.",
        type: "scientific",
      },
      {
        source: "Fish Facts Website",
        url: "http://www.fishfacts.example.com/",
        reliability: 55,
        quote:
          "Goldfish memories last only a few moments, which is why they're content in small bowls - they experience their surroundings as new each time they swim around.",
        type: "blog",
      },
    ],
    difficulty: "easy",
    category: "Biology",
    relatedTruth: "Goldfish can recognize and remember humans, and can be trained to respond to certain stimuli.",
  },
]

// Helper function to format reliability scores
const getReliabilityColor = (reliability: number) => {
  if (reliability >= 90) return "text-green-500"
  if (reliability >= 70) return "text-blue-500"
  if (reliability >= 50) return "text-amber-500"
  if (reliability >= 30) return "text-orange-500"
  return "text-red-500"
}

// Get difficulty color
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

// Get source type icon
const getSourceTypeIcon = (type: string) => {
  switch (type) {
    case "scientific":
      return <FileText className="h-4 w-4 text-blue-500" />
    case "educational":
      return <Brain className="h-4 w-4 text-green-500" />
    case "news":
      return <AlertTriangle className="h-4 w-4 text-amber-500" />
    case "blog":
      return <FileText className="h-4 w-4 text-purple-500" />
    default:
      return <FileText className="h-4 w-4 text-gray-500" />
  }
}

export default function FactCheckerGamePage() {
  const [currentClaimIndex, setCurrentClaimIndex] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [showInstructions, setShowInstructions] = useState(true)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [timeLeft, setTimeLeft] = useState(45)
  const [showFeedback, setShowFeedback] = useState(false)
  const [claimsPlayed, setClaimsPlayed] = useState<number[]>([])
  const [userVerdict, setUserVerdict] = useState<boolean | null>(null)
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false)
  const [showGameOver, setShowGameOver] = useState(false)
  const [activeTab, setActiveTab] = useState('claim')
  const [researchPoints, setResearchPoints] = useState(3)
  const [researchedSources, setResearchedSources] = useState<string[]>([])
  const [sourceTrustScores, setSourceTrustScores] = useState<{ [key: string]: number }>({})
  const [notepad, setNotepad] = useState("")
  const [confidenceLevel, setConfidenceLevel] = useState(50)
  const [streak, setStreak] = useState(0)
  const [highestStreak, setHighestStreak] = useState(0)

  const shuffledClaims = useRef([...claims].sort(() => Math.random() - 0.5)).current
  const currentClaim = shuffledClaims[currentClaimIndex]

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (gameStarted && !showFeedback && !gameOver && timeLeft > 0 && activeTab === "claim") {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            handleAnswer(null, true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => clearInterval(timer)
  }, [gameStarted, showFeedback, gameOver, timeLeft, activeTab])

  const startGame = () => {
    setGameStarted(true)
    setShowInstructions(false)
    setGameOver(false)
    setCurrentClaimIndex(0)
    setScore(0)
    setLives(3)
    setTimeLeft(45)
    setShowFeedback(false)
    setClaimsPlayed([])
    setUserVerdict(null)
    setActiveTab("claim")
    setResearchPoints(3)
    setResearchedSources([])
    setSourceTrustScores({})
    setNotepad("")
    setConfidenceLevel(50)
    setStreak(0)
    setHighestStreak(0)
  }

  const handleResearchSource = (source: {
    source: string
    url: string
    reliability: number
    quote: string
    type: string
  }) => {
    if (researchPoints <= 0) return

    // Check if already researched
    if (researchedSources.includes(source.source)) return

    // Add to researched sources
    setResearchedSources([...researchedSources, source.source])

    // Reduce research points
    setResearchPoints(researchPoints - 1)

    // Set trust score - modified by how reliable the source actually is
    const trustScore = Math.floor(Math.random() * 30) + source.reliability - 20
    setSourceTrustScores({ ...sourceTrustScores, [source.source]: Math.min(100, Math.max(0, trustScore)) })
  }

  const handleAnswer = (answer: boolean | null, timeOut = false) => {
    if (timeOut) {
      setUserVerdict(null)
    } else {
      setUserVerdict(answer)
    }

    const isCorrect = timeOut ? false : answer === currentClaim.isTrue

    setLastAnswerCorrect(isCorrect)
    setShowFeedback(true)
    setClaimsPlayed([...claimsPlayed, currentClaim.id])

    if (isCorrect) {
      // Calculate points
      const accuracyPoints = currentClaim.difficulty === "easy" ? 100 : currentClaim.difficulty === "medium" ? 200 : 300

      // Calculate confidence bonus
      const confidenceBonus = Math.abs(confidenceLevel - 50) / 10
      const confidenceMultiplier =
        answer === true
          ? confidenceLevel > 50
            ? 1 + confidenceBonus / 10
            : 1 - confidenceBonus / 10
          : confidenceLevel < 50
            ? 1 + confidenceBonus / 10
            : 1 - confidenceBonus / 10

      // Calculate research bonus - more researched sources = more points
      const researchBonus = researchedSources.length * 10

      // Calculate time bonus
      const timeBonus = Math.round((timeLeft / 45) * 50)

      // Update streak
      const newStreak = streak + 1
      setStreak(newStreak)
      if (newStreak > highestStreak) {
        setHighestStreak(newStreak)
      }

      // Calculate streak bonus
      const streakBonus = Math.min(newStreak * 20, 200)

      const totalPoints = Math.round(accuracyPoints * confidenceMultiplier) + researchBonus + timeBonus + streakBonus
      setScore(score + totalPoints)
    } else {
      setLives(lives - 1)
      setStreak(0)
    }

    // Check if game over
    if (lives <= 1 && !isCorrect) {
      setTimeout(() => {
        setGameOver(true)
        setShowGameOver(true)
      }, 2000)
    }
  }

  const nextClaim = () => {
    if (currentClaimIndex < shuffledClaims.length - 1) {
      setCurrentClaimIndex(currentClaimIndex + 1)
      setTimeLeft(45)
      setShowFeedback(false)
      setUserVerdict(null)
      setActiveTab("claim")
      setResearchPoints(3)
      setResearchedSources([])
      setSourceTrustScores({})
      setNotepad("")
      setConfidenceLevel(50)
    } else {
      setGameOver(true)
      setShowGameOver(true)
    }
  }

  const getScoreMessage = () => {
    if (score >= 2000) return "Amazing job! You're a Fact-Checking Master!"
    if (score >= 1500) return "Great job! You're a Fact-Checking Pro!"
    if (score >= 1000) return "Good job! You're developing strong fact-checking skills!"
    return "Keep practicing! Fact-checking takes practice and critical thinking."
  }

  const getScoreBadge = () => {
    if (score >= 2000) return "Fact Master"
    if (score >= 1500) return "Truth Seeker"
    if (score >= 1000) return "Fact Checker"
    return "Research Apprentice"
  }

  const getConfidenceLevelText = () => {
    if (confidenceLevel >= 90) return "Very Confident"
    if (confidenceLevel >= 70) return "Confident"
    if (confidenceLevel >= 40) return "Uncertain"
    if (confidenceLevel >= 20) return "Doubtful"
    return "Very Doubtful"
  }

  return (
    <DashboardLayout>
      <FactCheckerGame />
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Brain className="h-8 w-8 text-blue-500" />
              Fact Checker Challenge
            </h1>
            <p className="text-muted-foreground mt-2">
              Test your fact-checking skills! Can you tell what's true and what's false?
            </p>
          </div>
          {gameStarted && !gameOver && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-500" />
                <span className="text-xl font-bold">{score}</span>
              </div>
              <div className="flex">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-6 w-6 rounded-full ${i < lives ? "bg-green-500" : "bg-gray-300 dark:bg-gray-700"}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Instructions Dialog */}
        <Dialog open={showInstructions} onOpenChange={setShowInstructions}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-500" />
                How to Play Fact Checker
              </DialogTitle>
              <DialogDescription>
                Become a digital detective and learn to verify information like a pro!
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="rounded-lg border p-3">
                <h3 className="font-medium mb-1">Game Rules:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-blue-500 p-1 mt-0.5">
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                    You'll evaluate claims by researching sources and determining their reliability.
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-blue-500 p-1 mt-0.5">
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                    Use your research points wisely - you only have 3 per claim to investigate sources.
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-blue-500 p-1 mt-0.5">
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                    Set your confidence level to earn bonus points when you're correct.
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-blue-500 p-1 mt-0.5">
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                    You have 45 seconds and 3 lives. Work quickly but carefully!
                  </li>
                </ul>
              </div>
              <div className="rounded-lg border p-3 bg-amber-50 dark:bg-amber-950/20">
                <h3 className="font-medium mb-1 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  Fact-Checking Tips:
                </h3>
                <ul className="space-y-1 text-sm">
                  <li>• Consider the source's credibility and expertise</li>
                  <li>• Look for scientific consensus rather than single opinions</li>
                  <li>• Be wary of claims that sound too surprising or incredible</li>
                  <li>• Check if multiple reliable sources agree on the information</li>
                  <li>• Watch for emotional language that might indicate bias</li>
                </ul>
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={startGame}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
              >
                Start Game
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Game Over Dialog */}
        <Dialog open={showGameOver} onOpenChange={setShowGameOver}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-500" />
                Game Over!
              </DialogTitle>
              <DialogDescription>You've completed the Fact Checker challenge!</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="rounded-lg border p-4 text-center">
                <h3 className="font-medium mb-2">Your Score</h3>
                <div className="text-4xl font-bold text-amber-500 mb-2">{score}</div>
                <Badge variant="outline" className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                  {getScoreBadge()}
                </Badge>
                <p className="mt-4 text-sm">{getScoreMessage()}</p>
                <div className="mt-2 text-sm text-muted-foreground">
                  Highest streak: {highestStreak} correct in a row
                </div>
              </div>
              <div className="rounded-lg border p-3 bg-blue-50 dark:bg-blue-950/20">
                <h3 className="font-medium mb-1 flex items-center gap-2">
                  <Info className="h-4 w-4 text-blue-500" />
                  Remember:
                </h3>
                <p className="text-sm">
                  Fact-checking is an important digital literacy skill. Always verify information before believing or
                  sharing it, especially online. Check multiple reliable sources and be skeptical of claims that seem
                  too surprising or that confirm what you already want to believe.
                </p>
              </div>
            </div>
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button
                onClick={startGame}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
              >
                Play Again
              </Button>
              <Button asChild variant="outline" className="w-full">
                <NextLink href="/simulator">Back to Games</NextLink>
              </Button>
              <Button
                asChild
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
              >
                <NextLink href="/simulator/password-hero">Next Game</NextLink>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {!gameStarted && !gameOver ? (
          <Card className="overflow-hidden">
            <div className="h-2 w-full bg-gradient-to-r from-blue-500 to-indigo-500"></div>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-blue-500/10 p-2">
                  <Brain className="h-5 w-5 text-blue-500" />
                </div>
                <CardTitle>Welcome to Fact Checker Challenge!</CardTitle>
              </div>
              <CardDescription>Test your ability to separate fact from fiction in this exciting game!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-blue-500" />
                  Why Is Fact-Checking Important?
                </h3>
                <p className="text-sm">
                  In today's world, we're surrounded by information from many sources. Not all of this information is
                  accurate or true. Learning to fact-check helps you make better decisions, avoid spreading
                  misinformation, and become a more informed digital citizen.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border p-3">
                  <h3 className="font-medium mb-2">Interactive Features:</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <Brain className="h-4 w-4 text-blue-500" />
                      Evaluate claims for accuracy
                    </li>
                    <li className="flex items-center gap-2">
                      <Search className="h-4 w-4 text-purple-500" />
                      Research sources and evaluate their reliability
                    </li>
                    <li className="flex items-center gap-2">
                      <BarChart className="h-4 w-4 text-amber-500" />
                      Track your confidence level
                    </li>
                    <li className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-green-500" />
                      Take notes during your research
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg border p-3">
                  <h3 className="font-medium mb-2">Game Features:</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-purple-500" />
                      Challenging claims to evaluate
                    </li>
                    <li className="flex items-center gap-2">
                      <Info className="h-4 w-4 text-blue-500" />
                      Learn about different types of sources
                    </li>
                    <li className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-green-500" />
                      Race against the clock
                    </li>
                    <li className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-amber-500" />
                      Earn the Fact Master badge
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={startGame}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
              >
                Start Game
              </Button>
            </CardFooter>
          </Card>
        ) : gameStarted && !gameOver ? (
          <Card className="overflow-hidden">
            <div className="h-2 w-full bg-gradient-to-r from-blue-500 to-indigo-500"></div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-blue-500" />
                    <CardTitle className="text-lg">
                      Claim {currentClaimIndex + 1} of {shuffledClaims.length}
                    </CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <CardDescription>Is this claim true or false?</CardDescription>
                    <Badge variant="outline" className={getDifficultyColor(currentClaim.difficulty)}>
                      {currentClaim.difficulty.charAt(0).toUpperCase() + currentClaim.difficulty.slice(1)}
                    </Badge>
                    <Badge variant="outline" className="bg-purple-500/10 text-purple-500">
                      {currentClaim.category}
                    </Badge>
                  </div>
                </div>
                {activeTab === "claim" && (
                  <div className="text-center">
                    <div className="text-sm font-medium mb-1">Time Left</div>
                    <div className={`text-xl font-bold ${timeLeft <= 10 ? "text-red-500 animate-pulse" : ""}`}>
                      {timeLeft}s
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-2">
                {activeTab === "claim" && <Progress value={(timeLeft / 45) * 100} className="h-2" />}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="claim">
                    <Brain className="h-4 w-4 mr-2" />
                    Claim
                  </TabsTrigger>
                  <TabsTrigger value="research">
                    <Search className="h-4 w-4 mr-2" />
                    Research ({researchPoints})
                  </TabsTrigger>
                  <TabsTrigger value="notes">
                    <FileText className="h-4 w-4 mr-2" />
                    Notes
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="claim" className="space-y-4">
                  <div className="rounded-lg border p-6 bg-card">
                    <div className="text-xl font-medium text-center">{currentClaim.claim}</div>
                  </div>

                  <div className="pt-4">
                    <h3 className="text-sm font-medium mb-2">Your Confidence Level:</h3>
                    <div className="flex flex-col space-y-2">
                      <div className="w-full h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full">
                        <div
                          className={`h-2.5 rounded-full ${
                            confidenceLevel >= 70
                              ? "bg-green-500"
                              : confidenceLevel >= 40
                                ? "bg-amber-500"
                                : "bg-red-500"
                          }`}
                          style={{ width: `${confidenceLevel}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Probably False</span>
                        <span>Uncertain</span>
                        <span>Probably True</span>
                      </div>
                      <div className="flex justify-center">
                        <div
                          className={`mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                            confidenceLevel >= 70
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : confidenceLevel >= 40
                                ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                          }`}
                        >
                          {getConfidenceLevelText()}
                        </div>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={confidenceLevel}
                      onChange={(e) => setConfidenceLevel(Number.parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-4"
                    />
                  </div>

                  {researchedSources.length > 0 && (
                    <div className="pt-2">
                      <h3 className="text-sm font-medium mb-2">Your Research Summary:</h3>
                      <div className="rounded-lg border p-3 text-sm">
                        <ul className="space-y-2">
                          {researchedSources.map((source, index) => {
                            const sourceObj = currentClaim.evidence.find((e) => e.source === source)
                            if (!sourceObj) return null

                            return (
                              <li key={index} className="flex justify-between">
                                <div className="flex items-center">
                                  {getSourceTypeIcon(sourceObj.type)}
                                  <span className="ml-2">{source}</span>
                                </div>
                                <div className={getReliabilityColor(sourceTrustScores[source] || 0)}>
                                  Trust: {sourceTrustScores[source] || 0}%
                                </div>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="research" className="space-y-4">
                  {researchPoints > 0 ? (
                    <>
                      <div className="text-sm text-center mb-2">
                        <span className="font-medium">Research Points Remaining:</span> {researchPoints}
                        <div className="text-xs text-muted-foreground">
                          Each source costs 1 research point to investigate
                        </div>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        {currentClaim.evidence.map((source, index) => (
                          <Card key={index} className="overflow-hidden">
                            <CardHeader className="p-4">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                  {getSourceTypeIcon(source.type)}
                                  <CardTitle className="text-base ml-2">{source.source}</CardTitle>
                                </div>
                                <Badge variant="outline" className="capitalize">
                                  {source.type}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                              {researchedSources.includes(source.source) ? (
                                <div className="space-y-3">
                                  <div className="text-sm italic">"{source.quote}"</div>
                                  <div className="flex justify-between items-center">
                                    <Button variant="outline" size="sm" className="text-xs" asChild>
                                      <div className="flex items-center">
                                        <ExternalLink className="h-3 w-3 mr-1" />
                                        <span>Visit Source</span>
                                      </div>
                                    </Button>
                                    <div
                                      className={`text-xs font-medium ${getReliabilityColor(sourceTrustScores[source.source] || 0)}`}
                                    >
                                      Trust Rating: {sourceTrustScores[source.source] || 0}%
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center py-4">
                                  <Search className="h-8 w-8 text-muted-foreground mb-2" />
                                  <div className="text-center text-sm text-muted-foreground">
                                    Click Research to investigate this source
                                  </div>
                                  <Button onClick={() => handleResearchSource(source)} className="mt-3" size="sm">
                                    Research (1 point)
                                  </Button>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8">
                      <AlertTriangle className="h-10 w-10 text-amber-500 mb-3" />
                      <h3 className="text-lg font-medium">No Research Points Left</h3>
                      <p className="text-center text-muted-foreground mt-2 max-w-md">
                        You've used all your research points for this claim. Review your findings and make your decision
                        based on the sources you've already investigated.
                      </p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="notes" className="space-y-2">
                  <div className="text-sm mb-2">
                    <label htmlFor="notepad" className="font-medium block mb-1">
                      Research Notes:
                    </label>
                    <textarea
                      id="notepad"
                      placeholder="Take notes about this claim here..."
                      className="w-full h-40 p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background"
                      value={notepad}
                      onChange={(e) => setNotepad(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="rounded-lg border p-3 bg-muted/50">
                    <h4 className="text-sm font-medium mb-1">Pro Fact-Checking Tips:</h4>
                    <ul className="text-xs space-y-1 text-muted-foreground">
                      <li>• Look for agreement among multiple reliable sources</li>
                      <li>• Consider the expertise and credentials of the source</li>
                      <li>• Be cautious of claims that sound too surprising</li>
                      <li>• Check for potential biases in the sources</li>
                      <li>• Remember that correlation doesn't equal causation</li>
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>

              {showFeedback && (
                <div
                  className={cn(
                    "rounded-lg border p-4",
                    lastAnswerCorrect
                      ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800"
                      : "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800",
                  )}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {lastAnswerCorrect ? (
                      <>
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <h3 className="font-medium text-green-700 dark:text-green-300">Correct Assessment!</h3>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-5 w-5 text-red-500" />
                        <h3 className="font-medium text-red-700 dark:text-red-300">Incorrect Assessment!</h3>
                      </>
                    )}
                  </div>
                  <p className="text-sm mb-2">
                    This claim is <strong>{currentClaim.isTrue ? "TRUE" : "FALSE"}</strong>.
                  </p>
                  <div className="space-y-2 text-sm">
                    <h4 className="font-medium">Explanation:</h4>
                    <p>{currentClaim.explanation}</p>
                    <div className="mt-3 font-medium">The Truth:</div>
                    <p className="text-blue-800 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
                      {currentClaim.relatedTruth}
                    </p>
                  </div>

                  {lastAnswerCorrect && (
                    <div className="mt-3 p-2 rounded-md bg-amber-50 dark:bg-amber-950/20">
                      <h4 className="font-medium flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-amber-500" />
                        Points Earned:
                      </h4>
                      <div className="grid grid-cols-2 gap-2 mt-1 text-sm">
                        <div>Base Points:</div>
                        <div className="font-medium">
                          {currentClaim.difficulty === "easy" ? 100 : currentClaim.difficulty === "medium" ? 200 : 300}
                        </div>
                        {researchedSources.length > 0 && (
                          <>
                            <div>Research Bonus:</div>
                            <div className="font-medium">{researchedSources.length * 10}</div>
                          </>
                        )}
                        <div>Time Bonus:</div>
                        <div className="font-medium">{Math.round((timeLeft / 45) * 50)}</div>
                        <div>Confidence Bonus:</div>
                        <div className="font-medium">{Math.round(Math.abs(confidenceLevel - 50) / 5)}</div>
                        <div>Streak Bonus ({streak}x):</div>
                        <div className="font-medium">{Math.min(streak * 20, 200)}</div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              {!showFeedback ? (
                <div className="flex w-full gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleAnswer(false)}
                    className="w-1/2 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-950/20"
                  >
                    <ThumbsDown className="mr-2 h-4 w-4 text-red-500" />
                    False
                  </Button>
                  <Button
                    onClick={() => handleAnswer(true)}
                    className="w-1/2 border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-950/20"
                    variant="outline"
                  >
                    <ThumbsUp className="mr-2 h-4 w-4 text-green-500" />
                    True
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={nextClaim}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                >
                  Next Claim
                </Button>
              )}
            </CardFooter>
          </Card>
        ) : (
          <Card className="overflow-hidden">
            <div className="h-2 w-full bg-gradient-to-r from-blue-500 to-indigo-500"></div>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-amber-500/10 p-2">
                  <Trophy className="h-5 w-5 text-amber-500" />
                </div>
                <CardTitle>Game Over!</CardTitle>
              </div>
              <CardDescription>You've completed the Fact Checker challenge!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4 text-center">
                <h3 className="font-medium mb-2">Your Score</h3>
                <div className="text-4xl font-bold text-amber-500 mb-2">{score}</div>
                <Badge variant="outline" className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                  {getScoreBadge()}
                </Badge>
                <p className="mt-4 text-sm">{getScoreMessage()}</p>
                <div className="mt-2 text-sm text-muted-foreground">
                  Highest streak: {highestStreak} correct in a row
                </div>
              </div>
              <div className="rounded-lg border p-3 bg-blue-50 dark:bg-blue-950/20">
                <h3 className="font-medium mb-1 flex items-center gap-2">
                  <Info className="h-4 w-4 text-blue-500" />
                  Fact-Checking Tips:
                </h3>
                <ul className="space-y-1 text-sm">
                  <li>• Always check multiple reliable sources before believing a claim</li>
                  <li>• Be especially careful with surprising or counterintuitive claims</li>
                  <li>• Consider if the source has expertise in the subject matter</li>
                  <li>• Be aware of your own biases - we tend to believe things that confirm what we already think</li>
                  <li>• Remember that "common knowledge" isn't always accurate</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-2">
              <Button
                onClick={startGame}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
              >
                Play Again
              </Button>
              <Button asChild variant="outline" className="w-full">
                <NextLink href="/simulator">Back to Games</NextLink>
              </Button>
              <Button
                asChild
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
              >
                <NextLink href="/simulator/password-hero">Next Game</NextLink>
              </Button>
            </CardFooter>
          </Card>
        )}
    </DashboardLayout>
  )
}

