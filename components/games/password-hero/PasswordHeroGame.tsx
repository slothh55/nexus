'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { useGameState } from '@/hooks/use-game-state'
import { useAchievements } from '@/hooks/use-achievements'
import { useConfetti } from '@/hooks/use-confetti'
import { AlertCircle, Check, CheckCircle, Clock, Eye, Info, Key, Lock, Shield, ThumbsUp, Trophy, X } from "lucide-react"

// Define the password challenges
const passwordChallenges = [
  {
    id: 'basic',
    title: 'Basic Password',
    description: 'Create a password that meets basic security requirements',
    requirements: [
      { id: 'length', description: 'At least 8 characters long', check: (pwd: string) => pwd.length >= 8 },
      { id: 'uppercase', description: 'Contains at least one uppercase letter', check: (pwd: string) => /[A-Z]/.test(pwd) },
      { id: 'lowercase', description: 'Contains at least one lowercase letter', check: (pwd: string) => /[a-z]/.test(pwd) },
      { id: 'number', description: 'Contains at least one number', check: (pwd: string) => /[0-9]/.test(pwd) }
    ],
    tips: [
      'Use a mix of uppercase and lowercase letters',
      'Include numbers in your password',
      'Avoid using common words or phrases',
      'Don\'t use personal information like your name or birthdate'
    ],
    timeLimit: 60,
    points: 50
  },
  {
    id: 'intermediate',
    title: 'Intermediate Password',
    description: 'Create a stronger password with additional security features',
    requirements: [
      { id: 'length', description: 'At least 10 characters long', check: (pwd: string) => pwd.length >= 10 },
      { id: 'uppercase', description: 'Contains at least one uppercase letter', check: (pwd: string) => /[A-Z]/.test(pwd) },
      { id: 'lowercase', description: 'Contains at least one lowercase letter', check: (pwd: string) => /[a-z]/.test(pwd) },
      { id: 'number', description: 'Contains at least one number', check: (pwd: string) => /[0-9]/.test(pwd) },
      { id: 'special', description: 'Contains at least one special character', check: (pwd: string) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd) },
      { id: 'no-common', description: 'Not a common password', check: (pwd: string) => !commonPasswords.includes(pwd.toLowerCase()) }
    ],
    tips: [
      'Add special characters like !@#$%^&*',
      'Avoid using common patterns like "123456" or "qwerty"',
      'Consider using a passphrase (multiple words combined)',
      'Don\'t reuse passwords across different accounts'
    ],
    timeLimit: 90,
    points: 100
  },
  {
    id: 'advanced',
    title: 'Advanced Password',
    description: 'Create a highly secure password that would be difficult to crack',
    requirements: [
      { id: 'length', description: 'At least 12 characters long', check: (pwd: string) => pwd.length >= 12 },
      { id: 'uppercase', description: 'Contains at least one uppercase letter', check: (pwd: string) => /[A-Z]/.test(pwd) },
      { id: 'lowercase', description: 'Contains at least one lowercase letter', check: (pwd: string) => /[a-z]/.test(pwd) },
      { id: 'number', description: 'Contains at least one number', check: (pwd: string) => /[0-9]/.test(pwd) },
      { id: 'special', description: 'Contains at least one special character', check: (pwd: string) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd) },
      { id: 'no-common', description: 'Not a common password', check: (pwd: string) => !commonPasswords.includes(pwd.toLowerCase()) },
      { id: 'no-repeat', description: 'No more than 2 identical characters in a row', check: (pwd: string) => !/(.)\1\1/.test(pwd) },
      { id: 'variety', description: 'Contains at least 3 different types of characters', 
        check: (pwd: string) => {
          let types = 0
          if (/[a-z]/.test(pwd)) types++
          if (/[A-Z]/.test(pwd)) types++
          if (/[0-9]/.test(pwd)) types++
          if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd)) types++
          return types >= 3
        }
      }
    ],
    tips: [
      'Use a combination of words with special characters and numbers',
      'Consider using a password manager to generate and store complex passwords',
      'Avoid using sequential keyboard patterns (e.g., "qwerty")',
      'Create a system for generating passwords that you can remember but others can\'t guess'
    ],
    timeLimit: 120,
    points: 150
  },
  {
    id: 'memorable',
    title: 'Memorable Password',
    description: 'Create a password that is both secure and easy to remember',
    requirements: [
      { id: 'length', description: 'At least 12 characters long', check: (pwd: string) => pwd.length >= 12 },
      { id: 'uppercase', description: 'Contains at least one uppercase letter', check: (pwd: string) => /[A-Z]/.test(pwd) },
      { id: 'lowercase', description: 'Contains at least one lowercase letter', check: (pwd: string) => /[a-z]/.test(pwd) },
      { id: 'number', description: 'Contains at least one number', check: (pwd: string) => /[0-9]/.test(pwd) },
      { id: 'special', description: 'Contains at least one special character', check: (pwd: string) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd) },
      { id: 'no-common', description: 'Not a common password', check: (pwd: string) => !commonPasswords.includes(pwd.toLowerCase()) },
      { id: 'memorable', description: 'Contains recognizable words or patterns', 
        check: (pwd: string) => {
          // This is a simplified check - in a real app, you might use more sophisticated methods
          const words = ['cat', 'dog', 'house', 'tree', 'blue', 'red', 'green', 'happy', 'sad', 'book', 'music', 'dance', 'sing', 'play', 'work', 'love', 'hate', 'friend', 'family', 'school', 'office', 'computer', 'phone', 'table', 'chair', 'window', 'door', 'car', 'bike', 'train', 'plane', 'boat', 'river', 'mountain', 'ocean', 'forest', 'city', 'country', 'world', 'universe']
          return words.some(word => pwd.toLowerCase().includes(word))
        }
      }
    ],
    tips: [
      'Use a passphrase (multiple words combined with special characters)',
      'Replace letters with similar-looking numbers or symbols (e.g., "a" with "@")',
      'Create an acronym from a memorable sentence',
      'Use a pattern on your keyboard that creates a shape or pattern you can remember'
    ],
    timeLimit: 120,
    points: 150
  },
  {
    id: 'passphrase',
    title: 'Passphrase',
    description: 'Create a secure passphrase using multiple words and special characters',
    requirements: [
      { id: 'length', description: 'At least 16 characters long', check: (pwd: string) => pwd.length >= 16 },
      { id: 'words', description: 'Contains at least 3 recognizable words', 
        check: (pwd: string) => {
          const words = ['cat', 'dog', 'house', 'tree', 'blue', 'red', 'green', 'happy', 'sad', 'book', 'music', 'dance', 'sing', 'play', 'work', 'love', 'hate', 'friend', 'family', 'school', 'office', 'computer', 'phone', 'table', 'chair', 'window', 'door', 'car', 'bike', 'train', 'plane', 'boat', 'river', 'mountain', 'ocean', 'forest', 'city', 'country', 'world', 'universe']
          let wordCount = 0
          words.forEach(word => {
            if (pwd.toLowerCase().includes(word)) wordCount++
          })
          return wordCount >= 3
        }
      },
      { id: 'separator', description: 'Uses separators between words', 
        check: (pwd: string) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd) 
      },
      { id: 'number', description: 'Contains at least one number', check: (pwd: string) => /[0-9]/.test(pwd) },
      { id: 'no-common', description: 'Not a common password', check: (pwd: string) => !commonPasswords.includes(pwd.toLowerCase()) }
    ],
    tips: [
      'Choose random words that don\'t form a common phrase',
      'Use different separators between words (e.g., "word1-word2!word3")',
      'Include numbers by replacing letters or adding them between words',
      'Consider using words from different languages or made-up words'
    ],
    timeLimit: 150,
    points: 200
  }
]

// List of common passwords to check against
const commonPasswords = [
  'password', '123456', '12345678', 'qwerty', 'abc123', 'monkey', '1234567', 'letmein',
  'trustno1', 'dragon', 'baseball', '111111', 'iloveyou', 'master', 'sunshine', 'ashley',
  'bailey', 'passw0rd', 'shadow', '123123', 'football', 'michael', 'password1', 'superman'
]

// Define the game achievements
const achievements = [
  { id: 'first-password', title: 'Security Initiate', description: 'Create your first strong password', icon: <Lock className="h-4 w-4" />, xp: 50 },
  { id: 'password-master', title: 'Password Master', description: 'Create a password with perfect security score', icon: <Lock className="h-4 w-4" />, xp: 100 },
  { id: 'speed-creator', title: 'Quick Creator', description: 'Create a strong password in under 30 seconds', icon: <Clock className="h-4 w-4" />, xp: 75 },
  { id: 'security-expert', title: 'Security Expert', description: 'Complete all password challenges', icon: <Shield className="h-4 w-4" />, xp: 200 },
  { id: 'memory-master', title: 'Memory Master', description: 'Create a memorable but secure password', icon: <Key className="h-4 w-4" />, xp: 150 }
]

// Password strength estimator
const estimatePasswordStrength = (password: string): number => {
  if (!password) return 0
  
  let score = 0
  
  // Length
  score += Math.min(10, password.length) * 4
  
  // Character variety
  if (/[A-Z]/.test(password)) score += 5
  if (/[a-z]/.test(password)) score += 5
  if (/[0-9]/.test(password)) score += 5
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score += 10
  
  // Complexity
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
  
  const variety = [hasUppercase, hasLowercase, hasNumber, hasSpecial].filter(Boolean).length
  score += variety * 10
  
  // Penalize common patterns
  if (/(.)\1\1/.test(password)) score -= 10 // Repeated characters
  if (/^[a-zA-Z]+$/.test(password)) score -= 10 // Letters only
  if (/^[0-9]+$/.test(password)) score -= 10 // Numbers only
  if (/^[a-zA-Z0-9]+$/.test(password)) score -= 5 // Alphanumeric only
  
  // Check against common passwords
  if (commonPasswords.includes(password.toLowerCase())) score -= 30
  
  // Normalize score to 0-100 range
  return Math.max(0, Math.min(100, score))
}

// Password crack time estimator (simplified)
const estimateCrackTime = (password: string): string => {
  if (!password) return 'Instantly'
  
  const strength = estimatePasswordStrength(password)
  
  if (strength < 20) return 'Instantly'
  if (strength < 40) return 'A few seconds to minutes'
  if (strength < 60) return 'A few hours to days'
  if (strength < 80) return 'A few weeks to months'
  return 'Many years'
}

export function PasswordHeroGame() {
  // Game state
  const [state, setState] = useState({
    currentChallenge: 0,
    score: 0,
    timeRemaining: 60,
    showIntro: true,
    showPasswordCreator: false,
    showResults: false,
    showGameOver: false,
    gameActive: false,
    password: '',
    passwordStrength: 0,
    metRequirements: [] as string[],
    completedChallenges: [] as string[],
    difficulty: 'beginner' as 'beginner' | 'intermediate' | 'expert',
    startTime: 0,
    fastestTime: Infinity
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
      endChallenge(false)
    }
    
    return () => {
      if (timer) clearInterval(timer)
    }
  }, [state.gameActive, state.timeRemaining])

  // Password strength effect
  useEffect(() => {
    if (state.password) {
      const strength = estimatePasswordStrength(state.password)
      const challenge = passwordChallenges[state.currentChallenge]
      const metReqs = challenge.requirements
        .filter(req => req.check(state.password))
        .map(req => req.id)
      
      setState(prev => ({
        ...prev,
        passwordStrength: strength,
        metRequirements: metReqs
      }))
    } else {
      setState(prev => ({
        ...prev,
        passwordStrength: 0,
        metRequirements: []
      }))
    }
  }, [state.password, state.currentChallenge])

  // Achievements and confetti hooks
  const { addAchievement, achievements: earnedAchievements } = useAchievements('password-hero')
  const { triggerConfetti } = useConfetti()

  // Update state helper
  const updateState = (newState: Partial<typeof state>) => {
    setState(prev => ({ ...prev, ...newState }))
  }

  // Get current challenge
  const getCurrentChallenge = () => {
    return passwordChallenges[state.currentChallenge]
  }

  // Start the game
  const startGame = () => {
    updateState({
      currentChallenge: 0,
      score: 0,
      timeRemaining: passwordChallenges[0].timeLimit,
      showIntro: false,
      showPasswordCreator: true,
      showResults: false,
      showGameOver: false,
      gameActive: true,
      password: '',
      passwordStrength: 0,
      metRequirements: [],
      completedChallenges: [],
      startTime: Date.now()
    })
  }

  // End the challenge
  const endChallenge = (success: boolean) => {
    updateState({
      gameActive: false,
      showPasswordCreator: false,
      showResults: true
    })
    
    if (success) {
      const challenge = getCurrentChallenge()
      const timeTaken = (Date.now() - state.startTime) / 1000
      const timeBonus = Math.max(0, challenge.timeLimit - timeTaken)
      const totalPoints = challenge.points + Math.floor(timeBonus)
      
      updateState({
        score: state.score + totalPoints,
        completedChallenges: [...state.completedChallenges, challenge.id],
        fastestTime: Math.min(state.fastestTime, timeTaken)
      })
      
      // Check for achievements
      if (state.completedChallenges.length === 0) {
        addAchievement('first-password')
      }
      
      if (state.passwordStrength >= 95) {
        addAchievement('password-master')
        triggerConfetti()
      }
      
      if (timeTaken < 30) {
        addAchievement('speed-creator')
      }
      
      if (challenge.id === 'memorable' && success) {
        addAchievement('memory-master')
      }
      
      if (state.completedChallenges.length === passwordChallenges.length - 1) {
        addAchievement('security-expert')
        triggerConfetti()
      }
    }
  }

  // Submit password
  const submitPassword = () => {
    const challenge = getCurrentChallenge()
    const allRequirementsMet = challenge.requirements.every(req => req.check(state.password))
    
    endChallenge(allRequirementsMet)
  }

  // Continue to next challenge
  const continueToNext = () => {
    // Check if all challenges are completed
    if (state.completedChallenges.length >= passwordChallenges.length) {
      updateState({
        showResults: false,
        showGameOver: true
      })
      return
    }
    
    // Find next uncompleted challenge
    let nextIndex = state.currentChallenge
    do {
      nextIndex = (nextIndex + 1) % passwordChallenges.length
    } while (state.completedChallenges.includes(passwordChallenges[nextIndex].id) && 
             state.completedChallenges.length < passwordChallenges.length)
    
    // Start next challenge
    updateState({
      currentChallenge: nextIndex,
      timeRemaining: passwordChallenges[nextIndex].timeLimit,
      showResults: false,
      showPasswordCreator: true,
      gameActive: true,
      password: '',
      passwordStrength: 0,
      metRequirements: [],
      startTime: Date.now()
    })
  }

  // Set difficulty level
  const setDifficulty = (level: 'beginner' | 'intermediate' | 'expert') => {
    updateState({ difficulty: level })
  }

  // Handle password input change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateState({ password: e.target.value })
  }

  // Get strength color
  const getStrengthColor = (strength: number) => {
    if (strength < 30) return 'text-red-500'
    if (strength < 60) return 'text-amber-500'
    if (strength < 80) return 'text-green-500'
    return 'text-emerald-500'
  }

  // Get strength label
  const getStrengthLabel = (strength: number) => {
    if (strength < 30) return 'Weak'
    if (strength < 60) return 'Moderate'
    if (strength < 80) return 'Strong'
    return 'Very Strong'
  }

  return (
    <div className="space-y-6">
      {/* Intro Dialog */}
      <Dialog open={state.showIntro} onOpenChange={(open) => !open && updateState({ showIntro: false })}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Password Hero</DialogTitle>
            <DialogDescription>
              Create and manage strong, secure passwords
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <p>
              As a Password Hero, your mission is to create strong, secure passwords that meet specific security requirements.
            </p>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md">
              <h4 className="font-medium flex items-center gap-2 text-amber-800 dark:text-amber-300">
                <AlertCircle className="h-4 w-4" />
                Why Strong Passwords Matter:
              </h4>
              <ul className="mt-2 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-amber-500" />
                  <span>Weak passwords can be cracked in seconds by modern computers</span>
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-amber-500" />
                  <span>Strong passwords are your first line of defense against hackers</span>
                </li>
                <li className="flex items-center gap-2">
                  <Key className="h-4 w-4 text-amber-500" />
                  <span>Each account should have a unique password to prevent multiple breaches</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">How to play:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Read the password challenge requirements</li>
                <li>Create a password that meets all the requirements</li>
                <li>Submit your password before time runs out</li>
                <li>Learn from feedback to improve your password creation skills</li>
                <li>Complete all challenges to become a Password Hero</li>
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
              <p className="text-xs text-muted-foreground mt-2">
                {state.difficulty === 'beginner' && 'Beginner: More time to complete challenges and more hints.'}
                {state.difficulty === 'intermediate' && 'Intermediate: Less time and fewer hints.'}
                {state.difficulty === 'expert' && 'Expert: Very limited time and minimal hints.'}
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={startGame} className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
              Start Game
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Password Creator */}
      {state.showPasswordCreator && (
        <div className="space-y-4">
          {/* Game Header */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">Password Hero</h2>
              <p className="text-muted-foreground">Create strong, secure passwords</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-500" />
                <span className="text-xl font-bold">{state.score}</span>
              </div>
              <div>
                <Badge variant={state.timeRemaining > 30 ? "outline" : "destructive"}>
                  {state.timeRemaining}s
                </Badge>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <Progress 
            value={(state.timeRemaining / getCurrentChallenge().timeLimit) * 100} 
            className="h-2" 
          />
          
          {/* Challenge Card */}
          <Card>
            <CardHeader>
              <CardTitle>{getCurrentChallenge().title}</CardTitle>
              <CardDescription>{getCurrentChallenge().description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Create Your Password:
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type="text"
                    placeholder="Enter your password here..."
                    value={state.password}
                    onChange={handlePasswordChange}
                    className="pr-24"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <Badge 
                      variant="outline" 
                      className={`${getStrengthColor(state.passwordStrength)}`}
                    >
                      {getStrengthLabel(state.passwordStrength)}
                    </Badge>
                  </div>
                </div>
              </div>
              
              {/* Strength Meter */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Weak</span>
                  <span>Strong</span>
                </div>
                <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${
                      state.passwordStrength < 30 ? 'bg-red-500' :
                      state.passwordStrength < 60 ? 'bg-amber-500' :
                      state.passwordStrength < 80 ? 'bg-green-500' :
                      'bg-emerald-500'
                    }`}
                    style={{ width: `${state.passwordStrength}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span>Crack time: {estimateCrackTime(state.password)}</span>
                </div>
              </div>
              
              {/* Requirements */}
              <div>
                <h3 className="text-sm font-medium mb-2">Requirements:</h3>
                <div className="space-y-2">
                  {getCurrentChallenge().requirements.map((req) => (
                    <div 
                      key={req.id} 
                      className={`p-2 border rounded-lg flex items-center ${
                        state.metRequirements.includes(req.id) 
                          ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                          : 'bg-gray-50 dark:bg-gray-800'
                      }`}
                    >
                      {state.metRequirements.includes(req.id) ? (
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-gray-400 mr-2" />
                      )}
                      <span className="text-sm">{req.description}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Tips */}
              {state.difficulty !== 'expert' && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                  <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Info className="h-4 w-4 text-blue-500" />
                    Password Tips:
                  </h3>
                  <ul className="space-y-1 text-sm">
                    {getCurrentChallenge().tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="mt-0.5">•</div>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                onClick={submitPassword} 
                disabled={!state.password}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
              >
                Submit Password
              </Button>
            </CardFooter>
          </Card>
          
          {/* Beginner Hint */}
          {state.difficulty === 'beginner' && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Hint</AlertTitle>
              <AlertDescription>
                Try combining words with numbers and special characters. For example, "Blue42!Sky" is much stronger than "password123".
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}
      
      {/* Results View */}
      {state.showResults && (
        <div className="space-y-4">
          {/* Results Header */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">Password Analysis</h2>
              <p className="text-muted-foreground">Learn how to create better passwords</p>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              <span className="text-xl font-bold">{state.score}</span>
            </div>
          </div>
          
          {/* Result Card */}
          <Card>
            <CardHeader className={`${
              state.completedChallenges.includes(getCurrentChallenge().id) 
                ? 'bg-green-50 dark:bg-green-900/20' 
                : 'bg-red-50 dark:bg-red-900/20'
            }`}>
              <div className="flex items-center gap-3">
                {state.completedChallenges.includes(getCurrentChallenge().id) ? (
                  <div className="bg-green-100 dark:bg-green-800 p-2 rounded-full">
                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-300" />
                  </div>
                ) : (
                  <div className="bg-red-100 dark:bg-red-800 p-2 rounded-full">
                    <X className="h-6 w-6 text-red-600 dark:text-red-300" />
                  </div>
                )}
                <div>
                  <CardTitle>
                    {state.completedChallenges.includes(getCurrentChallenge().id) ? 'Challenge Completed!' : 'Challenge Failed'}
                  </CardTitle>
                  <CardDescription>
                    {state.completedChallenges.includes(getCurrentChallenge().id) ? (
                      <span className="text-green-600 dark:text-green-400 font-medium">
                        Your password meets all the requirements!
                      </span>
                    ) : (
                      <span className="text-red-600 dark:text-red-400 font-medium">
                        Your password doesn't meet all the requirements.
                      </span>
                    )}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              {/* Password Analysis */}
              <div>
                <h3 className="text-sm font-medium mb-2">Your Password:</h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg font-mono">
                  {state.password || '[No password submitted]'}
                </div>
                
                <div className="mt-4 space-y-2">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Strength Score:</span>
                      <span className={getStrengthColor(state.passwordStrength)}>
                        {state.passwordStrength}/100 ({getStrengthLabel(state.passwordStrength)})
                      </span>
                    </div>
                    <Progress value={state.passwordStrength} className="h-2" />
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>Estimated crack time:</span>
                    <span>{estimateCrackTime(state.password)}</span>
                  </div>
                </div>
              </div>
              
              {/* Requirements Check */}
              <div>
                <h3 className="text-sm font-medium mb-2">Requirements Check:</h3>
                <div className="space-y-2">
                  {getCurrentChallenge().requirements.map((req) => (
                    <div 
                      key={req.id} 
                      className={`p-2 border rounded-lg flex items-center ${
                        state.metRequirements.includes(req.id) 
                          ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                          : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                      }`}
                    >
                      {state.metRequirements.includes(req.id) ? (
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                      ) : (
                        <X className="h-4 w-4 text-red-500 mr-2" />
                      )}
                      <span className="text-sm">{req.description}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Password Improvement Tips */}
              {!state.completedChallenges.includes(getCurrentChallenge().id) && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h3 className="text-sm font-medium mb-2">How to Improve:</h3>
                  <ul className="space-y-1 text-sm">
                    {getCurrentChallenge().requirements
                      .filter(req => !state.metRequirements.includes(req.id))
                      .map((req, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="mt-0.5">•</div>
                          <span>Add {req.description.toLowerCase()}</span>
                        </li>
                      ))
                    }
                  </ul>
                </div>
              )}
              
              {/* Password Security Tips */}
              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                <h3 className="text-sm font-medium mb-2">Password Security Tips:</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Never reuse passwords across different accounts</li>
                  <li>• Consider using a password manager to generate and store complex passwords</li>
                  <li>• Enable two-factor authentication whenever possible</li>
                  <li>• Change your passwords regularly, especially for important accounts</li>
                  <li>• Never share your passwords with others, even if they claim to be from tech support</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={continueToNext} 
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
              >
                {state.completedChallenges.length >= passwordChallenges.length ? 'Finish Game' : 'Next Challenge'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
      
      {/* Game Over Dialog */}
      <Dialog open={state.showGameOver} onOpenChange={(open) => !open && updateState({ showGameOver: false })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Game Complete!</DialogTitle>
            <DialogDescription>
              You've completed the Password Hero challenge!
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="rounded-full bg-indigo-500/10 p-4">
                <Shield className="h-8 w-8 text-indigo-500" />
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-bold">Your Score: {state.score}</h3>
              <p className="text-muted-foreground">
                {state.score >= 500 ? "Amazing! You're a Password Security Expert!" :
                 state.score >= 300 ? "Great job! You've mastered the art of creating strong passwords!" :
                 "Good effort! Keep practicing to improve your password creation skills."}
              </p>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <h4 className="font-medium mb-2">What you've learned:</h4>
              <ul className="text-sm space-y-1">
                <li>• How to create strong, secure passwords</li>
                <li>• The importance of using different character types</li>
                <li>• How to balance security with memorability</li>
                <li>• Why passphrases can be more secure and easier to remember</li>
                <li>• How to avoid common password pitfalls</li>
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
            
            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4">
              <h4 className="font-medium mb-2">Password Manager Recommendation:</h4>
              <p className="text-sm">
                For maximum security, consider using a password manager. These tools can generate unique, complex passwords for each of your accounts and store them securely, so you only need to remember one master password.
              </p>
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
