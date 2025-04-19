'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AIEthicsDetectiveScene } from './AIEthicsDetectiveScene'
import { useGameState } from '@/hooks/use-game-state'
import { useAchievements } from '@/hooks/use-achievements'
import { useConfetti } from '@/hooks/use-confetti'
import { AlertCircle, AlertTriangle, BadgeInfo, Ban, Brain, Check, CheckCircle, Eye, FileWarning, Info, Lock, ShieldAlert, Trophy, X } from "lucide-react"

// Define the ethical issue categories and their associated icons/colors
const categories = {
  bias: { icon: <AlertTriangle className="h-4 w-4" />, color: 'text-yellow-500' },
  privacy: { icon: <Eye className="h-4 w-4" />, color: 'text-red-500' },
  copyright: { icon: <Lock className="h-4 w-4" />, color: 'text-blue-500' },
  misinformation: { icon: <FileWarning className="h-4 w-4" />, color: 'text-orange-500' },
  transparency: { icon: <BadgeInfo className="h-4 w-4" />, color: 'text-purple-500' },
  fairness: { icon: <ShieldAlert className="h-4 w-4" />, color: 'text-green-500' },
  accountability: { icon: <Brain className="h-4 w-4" />, color: 'text-indigo-500' },
}

// Define the game scenarios with AI-generated content and ethical issues
const scenarios = [
  {
    id: 1,
    title: "News Article Generator",
    description: "An AI system that generates news articles based on trending topics.",
    content: "BREAKING: Scientists at Stanford University have discovered a revolutionary new treatment that cures all forms of cancer with a single pill. The treatment, developed in secret over the past year, has shown 100% effectiveness in preliminary studies. The medical community is shocked by this unexpected breakthrough.",
    issues: [
      { id: 'news-1', category: 'misinformation', description: "This content makes extraordinary medical claims without proper evidence or sources." },
      { id: 'news-2', category: 'transparency', description: "The article doesn't disclose that it was AI-generated, potentially misleading readers." }
    ]
  },
  {
    id: 2,
    title: "Resume Screening Assistant",
    description: "An AI tool that helps companies filter job applications.",
    content: "Candidate Analysis Report: Based on resume patterns from our top performers, we recommend focusing on candidates from Ivy League universities and rejecting applications with gaps in employment history. The system has automatically filtered out 70% of applicants based on these criteria.",
    issues: [
      { id: 'resume-1', category: 'bias', description: "The system shows educational bias by favoring Ivy League universities, potentially discriminating against qualified candidates from other institutions." },
      { id: 'resume-2', category: 'fairness', description: "Automatically rejecting candidates with employment gaps could discriminate against people who took time off for caregiving, health issues, or education." }
    ]
  },
  {
    id: 3,
    title: "Content Creation Assistant",
    description: "An AI tool that helps create blog posts and articles.",
    content: "Here's your requested article on climate change: Climate change remains a highly debated topic among scientists, with no clear consensus on whether human activities are the primary cause. Many experts suggest that natural climate cycles explain most of the observed warming trends.",
    issues: [
      { id: 'content-1', category: 'misinformation', description: "The content falsely claims there's no scientific consensus on human-caused climate change, contradicting overwhelming scientific evidence." }
    ]
  },
  {
    id: 4,
    title: "Customer Service Chatbot",
    description: "An AI chatbot that handles customer inquiries for an online store.",
    content: "Customer: I'd like to return a defective product.\nChatbot: I'd be happy to help with your return, John Smith from 123 Main Street, Chicago. I see from your purchase history that you've returned 3 items in the past month. Please note that frequent returns may affect your customer rating.",
    issues: [
      { id: 'chatbot-1', category: 'privacy', description: "The chatbot unnecessarily displays personal information (full name and address) that could be visible to others." },
      { id: 'chatbot-2', category: 'transparency', description: "The chatbot mentions a 'customer rating' system without explaining how it works or how it affects customers." }
    ]
  },
  {
    id: 5,
    title: "Social Media Content Generator",
    description: "An AI tool that creates engaging social media posts.",
    content: "Check out this amazing artwork I created for my new fantasy novel! #art #illustration #fantasy #originalwork",
    image: "https://example.com/ai-generated-artwork.jpg",
    issues: [
      { id: 'social-1', category: 'copyright', description: "The post claims the AI-generated artwork is original human work, which is misleading." },
      { id: 'social-2', category: 'transparency', description: "The post doesn't disclose that the image was created using AI tools." }
    ]
  },
  {
    id: 6,
    title: "Healthcare Diagnostic Assistant",
    description: "An AI system that helps doctors diagnose medical conditions.",
    content: "Patient Analysis: Based on symptoms and demographic data, the system recommends immediate treatment for heart disease. Recommended treatment plan generated with 92% confidence.",
    issues: [
      { id: 'health-1', category: 'transparency', description: "The system doesn't explain the factors that led to its diagnosis or the limitations of its analysis." },
      { id: 'health-2', category: 'accountability', description: "The system doesn't clarify the role of human medical professionals in verifying the diagnosis and treatment plan." }
    ]
  },
  {
    id: 7,
    title: "Loan Approval System",
    description: "An AI system that evaluates loan applications for a bank.",
    content: "Application Status: DENIED. The AI analysis determined this applicant has a high risk of default based on residence in zip code 10453, despite good credit score and income verification.",
    issues: [
      { id: 'loan-1', category: 'bias', description: "The system appears to be using zip code as a proxy for race or socioeconomic status, which could result in discriminatory lending practices." },
      { id: 'loan-2', category: 'fairness', description: "The system is overriding positive financial indicators (good credit score and income) based on location, which may be unfair to qualified applicants." }
    ]
  },
  {
    id: 8,
    title: "Academic Essay Generator",
    description: "An AI tool that helps students write essays.",
    content: "Here's your completed essay on 'The Impact of World War II on Global Economics.' This 2000-word analysis includes perspectives from major historians and economic theorists, with detailed statistical analysis of post-war recovery patterns.",
    issues: [
      { id: 'essay-1', category: 'transparency', description: "The system doesn't clarify that submitting an AI-generated essay as original work could violate academic integrity policies." },
      { id: 'essay-2', category: 'accountability', description: "The tool doesn't encourage proper citation or acknowledgment of AI assistance in the writing process." }
    ]
  },
  {
    id: 9,
    title: "Criminal Risk Assessment Tool",
    description: "An AI system that predicts recidivism risk for parole decisions.",
    content: "Defendant Risk Score: HIGH (87/100). Recommendation: Deny parole based on demographic factors, neighborhood crime statistics, and family history of incarceration.",
    issues: [
      { id: 'criminal-1', category: 'bias', description: "The system uses factors like family history and neighborhood statistics that can perpetuate systemic biases in the criminal justice system." },
      { id: 'criminal-2', category: 'fairness', description: "The system doesn't appear to adequately consider individual circumstances or rehabilitation efforts." },
      { id: 'criminal-3', category: 'transparency', description: "The system doesn't explain how different factors are weighted in calculating the risk score." }
    ]
  },
  {
    id: 10,
    title: "Virtual Fitness Coach",
    description: "An AI system that provides personalized workout and nutrition plans.",
    content: "Based on your body type analysis, you should follow this 800-calorie daily meal plan and intensive workout regimen to achieve rapid weight loss. Results guaranteed within 30 days or your money back!",
    issues: [
      { id: 'fitness-1', category: 'misinformation', description: "The system recommends an extremely low-calorie diet that could be unhealthy for most adults without medical supervision." },
      { id: 'fitness-2', category: 'accountability', description: "The system makes guarantees about results without acknowledging individual differences or potential health risks." }
    ]
  }
]

// Define the game achievements
const achievements = [
  { id: 'first-issue', title: 'Ethical Observer', description: 'Identify your first ethical issue', icon: <CheckCircle className="h-4 w-4" />, xp: 50 },
  { id: 'all-categories', title: 'Ethics Expert', description: 'Identify issues from all ethical categories', icon: <Trophy className="h-4 w-4" />, xp: 200 },
  { id: 'perfect-round', title: 'Perfect Analysis', description: 'Find all issues in a scenario without mistakes', icon: <Check className="h-4 w-4" />, xp: 100 },
  { id: 'speed-detective', title: 'Quick Thinker', description: 'Complete a scenario in under 30 seconds', icon: <Brain className="h-4 w-4" />, xp: 75 },
  { id: 'master-detective', title: 'Master Detective', description: 'Reach a score of 300 points', icon: <Trophy className="h-4 w-4" />, xp: 250 }
]

// Helper functions
const getCategoryIcon = (category: string) => {
  return categories[category as keyof typeof categories]?.icon || <Info className="h-4 w-4" />
}

const getCategoryColor = (category: string) => {
  return categories[category as keyof typeof categories]?.color || 'text-gray-500'
}

export function AIEthicsDetectiveGame() {
  // Game state
  const [state, setState] = useState({
    currentScenario: 0,
    score: 0,
    timeRemaining: 60,
    foundIssues: [] as string[],
    incorrectAttempts: 0,
    showIntro: true,
    showIssueDetails: false,
    currentIssueId: '',
    showGameOver: false,
    gameActive: false,
    difficulty: 'beginner' as 'beginner' | 'intermediate' | 'expert',
    categoriesFound: new Set<string>(),
    perfectRounds: 0,
    fastestTime: Infinity,
  })

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null
    
    if (state.gameActive && state.timeRemaining > 0) {
      timer = setInterval(() => {
        setState(prev => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1
        }))
      }, 1000)
    } else if (state.timeRemaining === 0 && state.gameActive) {
      endGame()
    }
    
    return () => {
      if (timer) clearInterval(timer)
    }
  }, [state.gameActive, state.timeRemaining])

  // Achievements and confetti hooks
  const { addAchievement, achievements: earnedAchievements } = useAchievements('ai-ethics-detective')
  const { triggerConfetti } = useConfetti()

  // Update state helper
  const updateState = (newState: Partial<typeof state>) => {
    setState(prev => ({ ...prev, ...newState }))
  }

  // Start the game
  const startGame = () => {
    // Set difficulty parameters
    let timeLimit = 60
    if (state.difficulty === 'intermediate') timeLimit = 45
    if (state.difficulty === 'expert') timeLimit = 30
    
    updateState({
      currentScenario: Math.floor(Math.random() * scenarios.length),
      score: 0,
      timeRemaining: timeLimit,
      foundIssues: [],
      incorrectAttempts: 0,
      showIntro: false,
      showGameOver: false,
      gameActive: true,
      categoriesFound: new Set<string>(),
      perfectRounds: 0,
      fastestTime: Infinity,
    })
  }

  // End the game
  const endGame = () => {
    updateState({
      gameActive: false,
      showGameOver: true
    })
    
    // Check for achievements
    if (state.score >= 300) {
      addAchievement('master-detective')
      triggerConfetti()
    }
  }

  // Get current scenario
  const getCurrentScenario = () => {
    return scenarios[state.currentScenario]
  }

  // Get current issue details
  const getCurrentIssueDetails = () => {
    const scenario = getCurrentScenario()
    return scenario.issues.find(issue => issue.id === state.currentIssueId)
  }

  // Handle finding an issue
  const findIssue = (issueId: string) => {
    const scenario = getCurrentScenario()
    const issue = scenario.issues.find(i => i.id === issueId)
    
    if (!issue) return
    
    // Check if already found
    if (state.foundIssues.includes(issueId)) return
    
    // Add to found issues
    const newFoundIssues = [...state.foundIssues, issueId]
    const newCategoriesFound = new Set(state.categoriesFound)
    newCategoriesFound.add(issue.category)
    
    // Calculate points (more points for harder difficulties)
    let points = 10
    if (state.difficulty === 'intermediate') points = 15
    if (state.difficulty === 'expert') points = 20
    
    updateState({
      foundIssues: newFoundIssues,
      score: state.score + points,
      currentIssueId: issueId,
      showIssueDetails: true,
      categoriesFound: newCategoriesFound
    })
    
    // Check for achievements
    if (newFoundIssues.length === 1 && earnedAchievements.length === 0) {
      addAchievement('first-issue')
    }
    
    // Check if all categories have been found
    if (newCategoriesFound.size === Object.keys(categories).length && !earnedAchievements.includes('all-categories')) {
      addAchievement('all-categories')
      triggerConfetti()
    }
    
    // Check if all issues in the scenario have been found
    if (newFoundIssues.length === scenario.issues.length) {
      // Perfect round achievement
      if (state.incorrectAttempts === 0) {
        const newPerfectRounds = state.perfectRounds + 1
        updateState({ perfectRounds: newPerfectRounds })
        
        if (newPerfectRounds === 1 && !earnedAchievements.includes('perfect-round')) {
          addAchievement('perfect-round')
        }
      }
      
      // Move to next scenario after a short delay
      setTimeout(() => {
        nextScenario()
      }, 1500)
    }
  }

  // Handle incorrect attempt
  const incorrectAttempt = () => {
    updateState({
      incorrectAttempts: state.incorrectAttempts + 1,
      score: Math.max(0, state.score - 5) // Penalty for incorrect attempts
    })
  }

  // Close issue details dialog
  const closeIssueDetails = () => {
    updateState({ showIssueDetails: false })
  }

  // Move to next scenario
  const nextScenario = () => {
    // Calculate time taken for this scenario
    const timeLimit = state.difficulty === 'beginner' ? 60 : state.difficulty === 'intermediate' ? 45 : 30
    const timeTaken = timeLimit - state.timeRemaining
    
    // Check for speed achievement
    if (timeTaken < 30 && timeTaken < state.fastestTime) {
      updateState({ fastestTime: timeTaken })
      
      if (!earnedAchievements.includes('speed-detective')) {
        addAchievement('speed-detective')
      }
    }
    
    // Reset for next scenario
    let nextIndex = (state.currentScenario + 1) % scenarios.length
    
    // Add bonus time based on difficulty
    let bonusTime = 10
    if (state.difficulty === 'intermediate') bonusTime = 7
    if (state.difficulty === 'expert') bonusTime = 5
    
    updateState({
      currentScenario: nextIndex,
      foundIssues: [],
      incorrectAttempts: 0,
      timeRemaining: Math.min(state.timeRemaining + bonusTime, timeLimit) // Add bonus time but don't exceed initial limit
    })
  }

  // Set difficulty level
  const setDifficulty = (level: 'beginner' | 'intermediate' | 'expert') => {
    updateState({ difficulty: level })
  }

  return (
    <div className="space-y-6">
      {/* Intro Dialog */}
      <Dialog open={state.showIntro} onOpenChange={(open) => !open && updateState({ showIntro: false })}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>AI Ethics Detective</DialogTitle>
            <DialogDescription>
              Identify ethical issues in AI-generated content
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <p>
              As an AI Ethics Detective, your job is to review AI-generated content and identify potential ethical issues.
            </p>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md">
              <h4 className="font-medium flex items-center gap-2 text-amber-800 dark:text-amber-300">
                <AlertCircle className="h-4 w-4" />
                Look for these ethical issues:
              </h4>
              <ul className="mt-2 space-y-2 text-sm">
                {Object.entries(categories).map(([key, { icon, color }]) => (
                  <li key={key} className="flex items-center gap-2">
                    <div className={`${color}`}>{icon}</div>
                    <span className="capitalize">{key}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">How to play:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Review the AI-generated content in each scenario</li>
                <li>Click on any text that contains ethical issues</li>
                <li>Learn about each issue and why it matters</li>
                <li>Complete as many scenarios as you can before time runs out</li>
              </ol>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">Choose difficulty:</h4>
              <div className="flex space-x-2">
                <Button 
                  onClick={() => setDifficulty('beginner')} 
                  variant={state.difficulty === 'beginner' ? 'default' : 'outline'}
                >
                  Beginner
                </Button>
                <Button 
                  onClick={() => setDifficulty('intermediate')} 
                  variant={state.difficulty === 'intermediate' ? 'default' : 'outline'}
                >
                  Intermediate
                </Button>
                <Button 
                  onClick={() => setDifficulty('expert')} 
                  variant={state.difficulty === 'expert' ? 'default' : 'outline'}
                >
                  Expert
                </Button>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={startGame} className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
              Start Game
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Main Game UI */}
      {!state.showIntro && (
        <div className="space-y-4">
          {/* Game Header */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">{getCurrentScenario()?.title}</h2>
              <p className="text-muted-foreground">{getCurrentScenario()?.description}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-500" />
                <span className="text-xl font-bold">{state.score}</span>
              </div>
              <div>
                <Badge variant={state.timeRemaining > 10 ? "outline" : "destructive"}>
                  {state.timeRemaining}s
                </Badge>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <Progress value={(state.timeRemaining / (state.difficulty === 'beginner' ? 60 : state.difficulty === 'intermediate' ? 45 : 30)) * 100} className="h-2" />
          
          {/* Game Scene */}
          <Card>
            <CardContent className="p-6">
              <AIEthicsDetectiveScene 
                scenario={getCurrentScenario()} 
                foundIssues={state.foundIssues}
                onFindIssue={findIssue}
                onIncorrectAttempt={incorrectAttempt}
              />
            </CardContent>
          </Card>
          
          {/* Issues Found */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Issues Found</CardTitle>
            </CardHeader>
            <CardContent>
              {state.foundIssues.length > 0 ? (
                <div className="space-y-2">
                  {getCurrentScenario()?.issues.filter(issue => state.foundIssues.includes(issue.id)).map(issue => (
                    <div key={issue.id} className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-md">
                      <div className={`${getCategoryColor(issue.category)}`}>
                        {getCategoryIcon(issue.category)}
                      </div>
                      <span className="text-sm">{issue.description}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No issues found yet. Click on problematic content to identify ethical issues.</p>
              )}
            </CardContent>
          </Card>
          
          {/* Hint */}
          {state.incorrectAttempts >= 3 && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Hint</AlertTitle>
              <AlertDescription>
                Look for content that shows bias, privacy concerns, misinformation, copyright issues, or lack of transparency.
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}
      
      {/* Issue Details Dialog */}
      <Dialog open={state.showIssueDetails} onOpenChange={(open) => !open && closeIssueDetails()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ethical Issue Detected</DialogTitle>
            <DialogDescription>
              You've identified an ethical issue in the AI-generated content.
            </DialogDescription>
          </DialogHeader>
          
          {getCurrentIssueDetails() && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className={`rounded-full p-1.5 ${getCategoryColor(getCurrentIssueDetails()!.category).replace('text-', 'bg-').replace('500', '500/10')}`}>
                  {getCategoryIcon(getCurrentIssueDetails()!.category)}
                </div>
                <div>
                  <h4 className={`text-sm font-medium ${getCategoryColor(getCurrentIssueDetails()!.category)}`}>
                    {getCurrentIssueDetails()!.category.charAt(0).toUpperCase() + getCurrentIssueDetails()!.category.slice(1)}
                  </h4>
                </div>
              </div>
              
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                <p className="text-sm">{getCurrentIssueDetails()!.description}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Why this matters:</h4>
                <p className="text-sm text-muted-foreground">
                  {getCurrentIssueDetails()!.category === 'bias' && 
                    "AI systems can perpetuate or amplify biases present in their training data, leading to unfair treatment of certain groups."}
                  {getCurrentIssueDetails()!.category === 'privacy' && 
                    "AI systems should respect user privacy and not collect or expose sensitive information unnecessarily."}
                  {getCurrentIssueDetails()!.category === 'copyright' && 
                    "AI-generated content should respect intellectual property rights and properly attribute sources."}
                  {getCurrentIssueDetails()!.category === 'misinformation' && 
                    "AI systems should not generate or spread false or misleading information that could harm individuals or society."}
                  {getCurrentIssueDetails()!.category === 'transparency' && 
                    "AI systems should be transparent about their capabilities, limitations, and the source of their information."}
                  {getCurrentIssueDetails()!.category === 'fairness' && 
                    "AI systems should treat all individuals fairly and not discriminate based on characteristics like race, gender, or socioeconomic status."}
                  {getCurrentIssueDetails()!.category === 'accountability' && 
                    "There should be clear responsibility and oversight for AI systems, especially when they make important decisions."}
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">How to address this issue:</h4>
                <p className="text-sm text-muted-foreground">
                  {getCurrentIssueDetails()!.category === 'bias' && 
                    "Use diverse and representative training data, regularly audit systems for bias, and implement fairness constraints in AI models."}
                  {getCurrentIssueDetails()!.category === 'privacy' && 
                    "Minimize data collection, implement strong security measures, obtain proper consent, and give users control over their data."}
                  {getCurrentIssueDetails()!.category === 'copyright' && 
                    "Properly attribute sources, respect intellectual property rights, and be transparent about the use of others' content."}
                  {getCurrentIssueDetails()!.category === 'misinformation' && 
                    "Verify information before publishing, provide sources, and implement fact-checking processes for AI-generated content."}
                  {getCurrentIssueDetails()!.category === 'transparency' && 
                    "Clearly disclose when content is AI-generated, explain how AI systems work, and communicate their limitations."}
                  {getCurrentIssueDetails()!.category === 'fairness' && 
                    "Implement fairness metrics, test systems across diverse populations, and ensure equal treatment regardless of personal characteristics."}
                  {getCurrentIssueDetails()!.category === 'accountability' && 
                    "Establish clear oversight mechanisms, maintain human review of important decisions, and create processes for addressing mistakes."}
                </p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button onClick={closeIssueDetails}>Continue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Game Over Dialog */}
      <Dialog open={state.showGameOver} onOpenChange={(open) => !open && updateState({ showGameOver: false })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Game Over</DialogTitle>
            <DialogDescription>
              You've completed the AI Ethics Detective challenge!
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="rounded-full bg-indigo-500/10 p-4">
                <Trophy className="h-8 w-8 text-indigo-500" />
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-bold">Your Score: {state.score}</h3>
              <p className="text-muted-foreground">
                {state.score >= 200 ? "Amazing! You're an AI Ethics Expert!" :
                 state.score >= 100 ? "Great job! You're developing strong ethics detection skills!" :
                 "Good effort! Keep practicing to improve your AI ethics knowledge."}
              </p>
            </div>
            
            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4">
              <h4 className="font-medium mb-2">What you've learned:</h4>
              <ul className="text-sm space-y-1">
                <li>• How to identify ethical issues in AI-generated content</li>
                <li>• The importance of checking AI outputs for bias, privacy concerns, and misinformation</li>
                <li>• Why transparency and proper attribution matter in AI systems</li>
                <li>• How to be a more responsible AI user and creator</li>
                <li>• The importance of fairness and accountability in AI applications</li>
              </ul>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4">
              <h4 className="font-medium mb-2">Achievements Earned:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {achievements.filter(a => earnedAchievements.includes(a.id)).map(achievement => (
                  <div key={achievement.id} className="flex items-center gap-2 text-sm">
                    <div className="text-amber-500">{achievement.icon}</div>
                    <span>{achievement.title}</span>
                  </div>
                ))}
                {earnedAchievements.length === 0 && (
                  <p className="text-sm text-muted-foreground">No achievements earned yet. Keep playing to unlock achievements!</p>
                )}
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={startGame}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
            >
              Play Again
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
