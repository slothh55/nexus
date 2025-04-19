"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  AlertCircle,
  CheckCircle,
  PlayCircle,
  RefreshCw,
  ThumbsUp,
  GamepadIcon,
  Award,
  Shield,
  Brain,
  Bot,
  Sparkles,
  MessageSquare,
  Palette,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

interface Game {
  id: string
  title: string
  description: string
  category: string
  difficulty: "beginner" | "intermediate" | "advanced"
  icon: any
  color: string
  completed?: boolean
}

interface GameDetail {
  id: string
  title: string
  description: string
  context: string
  question: string
  options: {
    id: string
    text: string
    feedback: string
    isCorrect: boolean
  }[]
  explanation: string
}

export default function GamesPage() {
  const [activeTab, setActiveTab] = useState("browse")
  const [selectedGame, setSelectedGame] = useState<string | null>(null)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [completedGames, setCompletedGames] = useState<string[]>([])

  // Sample games
  const games: Game[] = [
    {
      id: "ai-ethics-detective",
      title: "AI Ethics Detective",
      description: "Identify ethical issues in AI-generated content and become an AI Ethics expert!",
      category: "AI Ethics",
      difficulty: "intermediate",
      icon: Sparkles,
      color: "bg-indigo-500/10 text-indigo-500",
    },
    {
      id: "prompt-engineer",
      title: "Prompt Engineering Master",
      description: "Learn to craft effective and ethical prompts for AI systems!",
      category: "AI Ethics",
      difficulty: "intermediate",
      icon: MessageSquare,
      color: "bg-purple-500/10 text-purple-500",
    },
    {
      id: "phishing-defender",
      title: "Phishing Defender",
      description: "Save your friends from tricky phishing attacks in this exciting adventure game!",
      category: "Online Safety",
      difficulty: "beginner",
      icon: Shield,
      color: "bg-red-500/10 text-red-500",
    },
    {
      id: "fact-checker",
      title: "Fact Checker Challenge",
      description: "Race against time to verify information and become the ultimate Fact Master!",
      category: "Information Literacy",
      difficulty: "intermediate",
      icon: Brain,
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      id: "ai-world-builder",
      title: "AI World Builder",
      description: "Create virtual worlds with AI tools while identifying and addressing ethical considerations.",
      category: "AI Ethics",
      difficulty: "intermediate",
      icon: Palette,
      color: "bg-purple-500/10 text-purple-500",
    },
    {
      id: "digital-escape-room",
      title: "Digital Literacy Escape Room",
      description: "Can you solve all the puzzles to escape the Digital Maze? Put your skills to the test!",
      category: "Mixed",
      difficulty: "intermediate",
      icon: GamepadIcon,
      color: "bg-purple-500/10 text-purple-500",
    },
    {
      id: "password-hero",
      title: "Password Hero",
      description: "Create super-strong passwords and defeat the Password Monsters!",
      category: "Cybersecurity",
      difficulty: "beginner",
      icon: Shield,
      color: "bg-green-500/10 text-green-500",
    },
    {
      id: "robot-builder",
      title: "Friendly Robot Builder",
      description: "Build your own friendly AI robot and teach it to help people!",
      category: "AI Ethics",
      difficulty: "intermediate",
      icon: Bot,
      color: "bg-indigo-500/10 text-indigo-500",
    },
    {
      id: "simple-game",
      title: "Simple 3D Game",
      description: "A simple 3D game with sound effects to demonstrate the sound system.",
      category: "Demo",
      difficulty: "beginner",
      icon: GamepadIcon,
      color: "bg-indigo-500/10 text-indigo-500",
    },
  ]

  // Sample game details
  const gameDetails: Record<string, GameDetail> = {
    "phishing-defender": {
      id: "phishing-defender",
      title: "Phishing Defender",
      description: "Save your friends from tricky phishing attacks in this exciting adventure game!",
      context:
        "Oh no! Your friend just received a strange email saying they won a free tablet! The email asks them to click a link and enter their personal information to claim the prize. Your friend is excited and wants to click the link right away!",
      question: "What should you tell your friend to do?",
      options: [
        {
          id: "option1",
          text: "Tell them to click the link right away before the offer expires!",
          feedback:
            "Oh no! This could be dangerous. Clicking on links in suspicious emails can lead to phishing attacks.",
          isCorrect: false,
        },
        {
          id: "option2",
          text: "Tell them to ignore the email completely and delete it.",
          feedback: "Good thinking! Ignoring suspicious emails is often the safest approach.",
          isCorrect: true,
        },
        {
          id: "option3",
          text: "Tell them to forward the email to all their friends so everyone can get a free tablet.",
          feedback: "That's not a good idea! Sharing suspicious emails can spread phishing attacks to more people.",
          isCorrect: false,
        },
        {
          id: "option4",
          text: "Tell them to reply to the email asking for more information.",
          feedback:
            "That's not safe! Replying to suspicious emails confirms that your email address is active and can lead to more spam.",
          isCorrect: false,
        },
      ],
      explanation:
        "Phishing emails try to trick you into clicking links or sharing personal information. They often create a sense of urgency or excitement with offers that seem too good to be true. The safest approach is to ignore and delete suspicious emails, especially ones that ask for personal information or have unexpected attachments.",
    },
    "fact-checker": {
      id: "fact-checker",
      title: "Fact Checker Challenge",
      description: "Race against time to verify information and become the ultimate Fact Master!",
      context:
        "You're scrolling through social media and see a post claiming that 'Scientists have discovered that chocolate makes you smarter! Eating 3 chocolate bars a day will increase your IQ by 20 points!' The post has thousands of likes and shares. Your friend is excited and wants to start eating more chocolate right away.",
      question: "What's the best way to check if this information is true?",
      options: [
        {
          id: "option1",
          text: "If it has thousands of likes and shares, it must be true!",
          feedback: "Popularity doesn't equal accuracy! Many false claims can go viral and get lots of engagement.",
          isCorrect: false,
        },
        {
          id: "option2",
          text: "Look for scientific studies about chocolate and intelligence from reliable sources.",
          feedback:
            "Great job! Checking reliable sources like scientific journals or reputable news organizations is the best way to verify claims.",
          isCorrect: true,
        },
        {
          id: "option3",
          text: "Try it yourself by eating lots of chocolate for a week and see if you feel smarter.",
          feedback:
            "Personal experiments aren't reliable for testing complex claims like this. Plus, eating too much chocolate isn't healthy!",
          isCorrect: false,
        },
        {
          id: "option4",
          text: "Ask your friends if they think chocolate makes people smarter.",
          feedback:
            "Your friends' opinions aren't a reliable way to verify scientific claims. They might just be guessing!",
          isCorrect: false,
        },
      ],
      explanation:
        "When you see surprising claims online, it's important to check reliable sources before believing or sharing them. Look for information from scientific journals, educational institutions, or reputable news organizations. Be especially careful with claims that sound too good to be true or that promote eating unusual amounts of certain foods.",
    },
  }

  const handleGameSelect = (id: string) => {
    setSelectedGame(id)
    setSelectedOption(null)
    setShowFeedback(false)
    setActiveTab("game")
  }

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId)
  }

  const handleSubmit = () => {
    setShowFeedback(true)
    if (selectedGame && !completedGames.includes(selectedGame)) {
      setCompletedGames([...completedGames, selectedGame])
    }
  }

  const handleReset = () => {
    setSelectedOption(null)
    setShowFeedback(false)
  }

  const getGameDetail = () => {
    return selectedGame ? gameDetails[selectedGame] : null
  }

  const gameDetail = getGameDetail()
  const selectedOptionDetail = gameDetail?.options.find((option) => option.id === selectedOption)
  const isCorrect = selectedOptionDetail?.isCorrect || false

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fun Learning Games</h1>
          <p className="text-muted-foreground mt-2">
            Play exciting games to practice your digital skills and earn special badges!
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="browse" className="text-base">
              Game Library
            </TabsTrigger>
            {selectedGame && (
              <TabsTrigger value="game" className="text-base">
                Current Game
              </TabsTrigger>
            )}
            <TabsTrigger value="progress" className="text-base">
              Your Achievements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-4">
            <Card className="overflow-hidden">
              <div className="h-2 w-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 p-2">
                    <GamepadIcon className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle>Game Adventures</CardTitle>
                </div>
                <CardDescription>
                  Choose a fun game to practice your digital skills and earn special badges!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {games.map((game) => {
                    const Icon = game.icon
                    return (
                      <Card
                        key={game.id}
                        className={`cursor-pointer overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                          completedGames.includes(game.id) ? "border-green-500 dark:border-green-700" : ""
                        }`}
                        onClick={() => handleGameSelect(game.id)}
                      >
                        <div
                          className={`h-2 w-full ${game.color.includes("bg-") ? game.color.replace("text-", "bg-") : `bg-${game.color.split(" ")[1]}`}`}
                        ></div>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2">
                              <div className={`rounded-full p-2 ${game.color}`}>
                                <Icon className="h-5 w-5" />
                              </div>
                              <CardTitle className="text-lg">{game.title}</CardTitle>
                            </div>
                            {completedGames.includes(game.id) && (
                              <div className="rounded-full bg-green-500 p-1">
                                <CheckCircle className="h-4 w-4 text-white" />
                              </div>
                            )}
                          </div>
                          <CardDescription className="pt-2">{game.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline">{game.category}</Badge>
                            <Badge
                              variant="secondary"
                              className={
                                game.difficulty === "beginner"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                  : game.difficulty === "intermediate"
                                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                              }
                            >
                              {game.difficulty.charAt(0).toUpperCase() + game.difficulty.slice(1)}
                            </Badge>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="ghost" className="w-full" size="sm" asChild>
                            <Link href={`/simulator/${game.id}`}>
                              <PlayCircle className="mr-2 h-4 w-4" />
                              Play Game
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="game">
            {gameDetail && (
              <Card className="overflow-hidden">
                <div
                  className={`h-2 w-full ${selectedGame === "phishing-defender" ? "bg-red-500" : selectedGame === "fact-checker" ? "bg-blue-500" : "bg-gradient-to-r from-indigo-500 to-purple-500"}`}
                ></div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div
                        className={`rounded-full p-2 ${selectedGame === "phishing-defender" ? "bg-red-500/10 text-red-500" : selectedGame === "fact-checker" ? "bg-blue-500/10 text-blue-500" : "bg-purple-500/10 text-purple-500"}`}
                      >
                        {selectedGame === "phishing-defender" ? (
                          <Shield className="h-5 w-5" />
                        ) : selectedGame === "fact-checker" ? (
                          <Brain className="h-5 w-5" />
                        ) : (
                          <GamepadIcon className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <CardTitle>{gameDetail.title}</CardTitle>
                        <CardDescription>{gameDetail.description}</CardDescription>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setActiveTab("browse")}>
                      Back to Games
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-lg border bg-card p-4">
                    <h3 className="font-medium mb-2 flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-indigo-500" />
                      Game Scenario
                    </h3>
                    <p>{gameDetail.context}</p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <Brain className="h-4 w-4 text-indigo-500" />
                      {gameDetail.question}
                    </h3>
                    <RadioGroup
                      value={selectedOption || ""}
                      onValueChange={handleOptionSelect}
                      className="space-y-3"
                      disabled={showFeedback}
                    >
                      {gameDetail.options.map((option) => (
                        <div
                          key={option.id}
                          className={`rounded-lg border p-4 transition-all duration-300 hover:border-indigo-200 dark:hover:border-indigo-800 ${
                            showFeedback && option.isCorrect
                              ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                              : showFeedback && option.id === selectedOption && !option.isCorrect
                                ? "border-red-500 bg-red-50 dark:bg-red-950/20"
                                : ""
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                            <div className="flex-1">
                              <Label htmlFor={option.id} className="text-base font-medium">
                                {option.text}
                              </Label>

                              {showFeedback && option.id === selectedOption && (
                                <div
                                  className={`mt-2 text-sm ${
                                    option.isCorrect
                                      ? "text-green-600 dark:text-green-400"
                                      : "text-red-600 dark:text-red-400"
                                  }`}
                                >
                                  <div className="flex items-start gap-2">
                                    {option.isCorrect ? (
                                      <ThumbsUp className="h-5 w-5 mt-0.5" />
                                    ) : (
                                      <AlertCircle className="h-5 w-5 mt-0.5" />
                                    )}
                                    <p>{option.feedback}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {showFeedback && (
                    <div className="rounded-lg border bg-gradient-to-r from-indigo-50 to-purple-50 p-4 space-y-3 dark:from-indigo-950/20 dark:to-purple-950/20">
                      <h3 className="font-medium flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-indigo-500" />
                        Game Lesson
                      </h3>
                      <p>{gameDetail.explanation}</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  {showFeedback ? (
                    <>
                      <Button variant="outline" onClick={handleReset}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Play Again
                      </Button>
                      <Button
                        asChild
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                      >
                        <Link href="/simulator">Next Game</Link>
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      disabled={!selectedOption}
                      className="ml-auto bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                    >
                      Submit Answer
                    </Button>
                  )}
                </CardFooter>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="progress">
            <Card className="overflow-hidden">
              <div className="h-2 w-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 p-2">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle>Your Game Achievements</CardTitle>
                </div>
                <CardDescription>Track your game progress and collect special badges!</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <div>Games Completed</div>
                    <div>
                      {completedGames.length} of {games.length}
                    </div>
                  </div>
                  <Progress value={(completedGames.length / games.length) * 100} className="h-2" />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Completed Games
                    </h3>
                    {completedGames.length > 0 ? (
                      <ul className="space-y-2">
                        {completedGames.map((id) => {
                          const game = games.find((s) => s.id === id)
                          return game ? (
                            <li key={id} className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span>{game.title}</span>
                            </li>
                          ) : null
                        })}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground">
                        You haven't completed any games yet. Start playing to earn badges!
                      </p>
                    )}
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium mb-2 flex items-center gap-2">
                      <Award className="h-4 w-4 text-amber-500" />
                      Skill Badges
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <div>AI Ethics</div>
                          <div>
                            {
                              completedGames.filter((id) => games.find((s) => s.id === id)?.category === "AI Ethics")
                                .length
                            }{" "}
                            of {games.filter((s) => s.category === "AI Ethics").length}
                          </div>
                        </div>
                        <Progress
                          value={
                            (completedGames.filter((id) => games.find((s) => s.id === id)?.category === "AI Ethics")
                              .length /
                              Math.max(1, games.filter((s) => s.category === "AI Ethics").length)) *
                            100
                          }
                          className="h-2"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <div>Online Safety</div>
                          <div>
                            {
                              completedGames.filter(
                                (id) => games.find((s) => s.id === id)?.category === "Online Safety",
                              ).length
                            }{" "}
                            of {games.filter((s) => s.category === "Online Safety").length}
                          </div>
                        </div>
                        <Progress
                          value={
                            (completedGames.filter((id) => games.find((s) => s.id === id)?.category === "Online Safety")
                              .length /
                              Math.max(1, games.filter((s) => s.category === "Online Safety").length)) *
                            100
                          }
                          className="h-2"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <div>Information Literacy</div>
                          <div>
                            {
                              completedGames.filter(
                                (id) => games.find((s) => s.id === id)?.category === "Information Literacy",
                              ).length
                            }{" "}
                            of {games.filter((s) => s.category === "Information Literacy").length}
                          </div>
                        </div>
                        <Progress
                          value={
                            (completedGames.filter(
                              (id) => games.find((s) => s.id === id)?.category === "Information Literacy",
                            ).length /
                              Math.max(1, games.filter((s) => s.category === "Information Literacy").length)) *
                            100
                          }
                          className="h-2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                >
                  <Link href="/simulator">Continue Playing</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

