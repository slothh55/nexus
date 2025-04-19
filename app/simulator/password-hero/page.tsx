"use client"

import { useState, useEffect, useRef } from 'react'
import { DashboardLayout } from "@/components/dashboard-layout"
import { PasswordGame2D } from "@/components/games/password-hero/PasswordGame2D"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import Link from "next/link"
import {
  Lock,
  Trophy,
  CheckCircle,
  AlertTriangle,
  Info,
  Key,
  Eye,
  EyeOff,
  Shield,
  Sparkles,
  XCircle
} from "lucide-react"
import { useGameTimer } from '@/lib/game-utils'

// Password challenges
const passwordChallenges = [
  {
    id: 1,
    title: "Basic Password",
    description: "Create a password with at least 8 characters",
    requirements: [{ id: "length", description: "At least 8 characters", check: (pwd: string) => pwd.length >= 8 }],
    tips: ["Longer passwords are harder to crack", "Even simple passwords should be at least 8 characters"],
    points: 100,
  },
  {
    id: 2,
    title: "Mixed Case Password",
    description: "Create a password with uppercase and lowercase letters",
    requirements: [
      { id: "length", description: "At least 8 characters", check: (pwd: string) => pwd.length >= 8 },
      { id: "uppercase", description: "At least 1 uppercase letter", check: (pwd: string) => /[A-Z]/.test(pwd) },
      { id: "lowercase", description: "At least 1 lowercase letter", check: (pwd: string) => /[a-z]/.test(pwd) },
    ],
    tips: [
      "Using both uppercase and lowercase letters makes your password stronger",
      "Try capitalizing letters in the middle of words, not just at the beginning",
    ],
    points: 200,
  },
  {
    id: 3,
    title: "Numbers & Letters",
    description: "Create a password with letters and numbers",
    requirements: [
      { id: "length", description: "At least 8 characters", check: (pwd: string) => pwd.length >= 8 },
      { id: "letters", description: "At least 1 letter", check: (pwd: string) => /[a-zA-Z]/.test(pwd) },
      { id: "numbers", description: "At least 1 number", check: (pwd: string) => /[0-9]/.test(pwd) },
    ],
    tips: [
      "Don't just add '123' at the end - mix numbers throughout your password",
      "Avoid using obvious numbers like your birth year",
    ],
    points: 200,
  },
  {
    id: 4,
    title: "Special Character",
    description: "Create a password with letters, numbers, and special characters",
    requirements: [
      { id: "length", description: "At least 8 characters", check: (pwd: string) => pwd.length >= 8 },
      { id: "letters", description: "At least 1 letter", check: (pwd: string) => /[a-zA-Z]/.test(pwd) },
      { id: "numbers", description: "At least 1 number", check: (pwd: string) => /[0-9]/.test(pwd) },
      {
        id: "special",
        description: "At least 1 special character",
        check: (pwd: string) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pwd),
      },
    ],
    tips: [
      "Special characters like !@#$% make your password much stronger",
      "Try replacing letters with similar-looking special characters (e.g., 'a' with '@')",
    ],
    points: 300,
  },
  {
    id: 5,
    title: "Strong Password",
    description: "Create a strong password that meets all security requirements",
    requirements: [
      { id: "length", description: "At least 12 characters", check: (pwd: string) => pwd.length >= 12 },
      { id: "uppercase", description: "At least 1 uppercase letter", check: (pwd: string) => /[A-Z]/.test(pwd) },
      { id: "lowercase", description: "At least 1 lowercase letter", check: (pwd: string) => /[a-z]/.test(pwd) },
      { id: "numbers", description: "At least 1 number", check: (pwd: string) => /[0-9]/.test(pwd) },
      {
        id: "special",
        description: "At least 1 special character",
        check: (pwd: string) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pwd),
      },
      {
        id: "nocommon",
        description: "Not a common pattern",
        check: (pwd: string) => !/(password|123456|qwerty|abc123)/i.test(pwd),
      },
    ],
    tips: [
      "Consider using a passphrase - a series of random words with special characters and numbers mixed in",
      "Avoid using personal information like names or birthdays",
      "The longer and more complex your password, the harder it is to crack",
    ],
    points: 400,
  },
]

// Password strength estimator
const estimatePasswordStrength = (password: string): number => {
  if (!password) return 0

  let strength = 0

  // Length contribution (up to 40%)
  strength += Math.min(password.length * 3, 40)

  // Character variety contribution (up to 60%)
  if (/[a-z]/.test(password)) strength += 10 // lowercase
  if (/[A-Z]/.test(password)) strength += 10 // uppercase
  if (/[0-9]/.test(password)) strength += 10 // numbers
  if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) strength += 15 // special chars

  // Variety of character types
  const charTypes = [/[a-z]/, /[A-Z]/, /[0-9]/, /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/].filter((regex) =>
    regex.test(password),
  ).length
  strength += charTypes * 5

  // Penalize common patterns
  if (/(password|123456|qwerty|abc123)/i.test(password)) strength -= 30
  if (/(.)\1{2,}/.test(password)) strength -= 10 // Repeated characters

  return Math.max(0, Math.min(100, strength))
}

// Get strength label
const getStrengthLabel = (strength: number): { label: string; color: string } => {
  if (strength >= 80) return { label: "Very Strong", color: "text-green-500" }
  if (strength >= 60) return { label: "Strong", color: "text-blue-500" }
  if (strength >= 40) return { label: "Medium", color: "text-amber-500" }
  if (strength >= 20) return { label: "Weak", color: "text-orange-500" }
  return { label: "Very Weak", color: "text-red-500" }
}

// Get strength color for progress bar
const getStrengthColor = (strength: number): string => {
  if (strength >= 80) return "bg-green-500"
  if (strength >= 60) return "bg-blue-500"
  if (strength >= 40) return "bg-amber-500"
  if (strength >= 20) return "bg-orange-500"
  return "bg-red-500"
}

export default function PasswordHeroGamePage() {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [showInstructions, setShowInstructions] = useState(true)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [password, setPassword] = useState('')
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([])
  const [challengeCompleted, setChallengeCompleted] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [showGameOver, setShowGameOver] = useState(false)
  const [userScore, setUserScore] = useState(0)

  // Timer hook for password-hero (initialized after showGameOver and gameOver)
  const { timeLeft, isRunning, startTimer, pauseTimer, resetTimer } = useGameTimer(60, () => {
    setGameOver(true)
    setShowGameOver(true)
  })

  const [generatedPassword, setGeneratedPassword] = useState("")
  const [showPasswordGenerator, setShowPasswordGenerator] = useState(false)
  const [passwordLength, setPasswordLength] = useState([12])
  const [useUppercase, setUseUppercase] = useState(true)
  const [useLowercase, setUseLowercase] = useState(true)
  const [useNumbers, setUseNumbers] = useState(true)
  const [useSpecial, setUseSpecial] = useState(true)

  const currentChallenge = passwordChallenges[currentChallengeIndex]

  useEffect(() => {
    setPasswordStrength(estimatePasswordStrength(password))

    // Check if all requirements are met
    if (currentChallenge) {
      const allRequirementsMet = currentChallenge.requirements.every((req) => req.check(password))
      setChallengeCompleted(allRequirementsMet)
    }
  }, [password, currentChallenge])

  useEffect(() => {
    generateRandomPassword()
  }, [passwordLength, useUppercase, useLowercase, useNumbers, useSpecial])

  const startGame = () => {
    setGameStarted(true)
    setShowInstructions(false)
    setGameOver(false)
    setCurrentChallengeIndex(0)
    setScore(0)
    setPassword("")
    setShowFeedback(false)
    setCompletedChallenges([])
    // reset and start timer
    resetTimer()
    startTimer()
    setUserScore(0) // Reset game score on start
  }

  // Reset game and timer
  const resetGame = () => {
    setGameStarted(false)
    setShowInstructions(true)
    setGameOver(false)
    setCurrentChallengeIndex(0)
    setScore(0)
    setPassword('')
    setShowFeedback(false)
    setCompletedChallenges([])
    resetTimer()
    setUserScore(0) // Reset game score
  }

  const handleSubmit = () => {
    if (challengeCompleted) {
      setShowFeedback(true)
      setCompletedChallenges([...completedChallenges, currentChallenge.id])
      setScore(score + currentChallenge.points)
    }
  }

  const nextChallenge = () => {
    if (currentChallengeIndex < passwordChallenges.length - 1) {
      setCurrentChallengeIndex(currentChallengeIndex + 1)
      setPassword("")
      setShowFeedback(false)
      setChallengeCompleted(false)
    } else {
      setGameOver(true)
      setShowGameOver(true)
    }
  }

  const generateRandomPassword = () => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const lowercase = "abcdefghijklmnopqrstuvwxyz"
    const numbers = "0123456789"
    const special = "!@#$%^&*()_+-=[]{}|;:,.<>?"

    let chars = ""
    if (useUppercase) chars += uppercase
    if (useLowercase) chars += lowercase
    if (useNumbers) chars += numbers
    if (useSpecial) chars += special

    if (chars.length === 0) chars = lowercase // Fallback

    let result = ""
    const length = passwordLength[0]

    // Ensure at least one character from each selected type
    if (useUppercase) result += uppercase.charAt(Math.floor(Math.random() * uppercase.length))
    if (useLowercase) result += lowercase.charAt(Math.floor(Math.random() * lowercase.length))
    if (useNumbers) result += numbers.charAt(Math.floor(Math.random() * numbers.length))
    if (useSpecial) result += special.charAt(Math.floor(Math.random() * special.length))

    // Fill the rest randomly
    while (result.length < length) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }

    // Shuffle the result
    result = result
      .split("")
      .sort(() => 0.5 - Math.random())
      .join("")

    setGeneratedPassword(result)
  }

  const useGeneratedPassword = () => {
    setPassword(generatedPassword)
    setShowPasswordGenerator(false)
  }

  const getScoreMessage = () => {
    if (score >= 1000) return "Amazing job! You're a Password Security Expert!"
    if (score >= 700) return "Great job! You're a Password Security Pro!"
    if (score >= 500) return "Good job! You've learned important password security skills!"
    return "Keep practicing! Creating strong passwords is an important skill."
  }

  const getScoreBadge = () => {
    if (score >= 1000) return "Password Master"
    if (score >= 700) return "Security Pro"
    if (score >= 500) return "Password Hero"
    return "Security Apprentice"
  }

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Lock className="h-8 w-8 text-green-500" />
            Password Hero
          </h1>
          <p className="text-muted-foreground mt-2">
            Create super-strong passwords and defeat the Password Monsters!
          </p>
        </div>
        {gameStarted && !gameOver && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              <span className="text-xl font-bold">{score}</span>
            </div>
            <Badge variant="outline" className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
              Level {currentChallengeIndex + 1}
            </Badge>
          </div>
        )}
      </div>

      {/* Instructions Dialog */}
      <Dialog open={showInstructions} onOpenChange={setShowInstructions}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-green-500" />
              How to Play Password Hero
            </DialogTitle>
            <DialogDescription>Learn to create strong passwords that keep your accounts safe!</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="rounded-lg border p-3">
              <h3 className="font-medium mb-1">Game Rules:</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-green-500 p-1 mt-0.5">
                    <CheckCircle className="h-3 w-3 text-white" />
                  </div>
                  You'll face a series of password challenges, each with different requirements.
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-green-500 p-1 mt-0.5">
                    <CheckCircle className="h-3 w-3 text-white" />
                  </div>
                  Create passwords that meet all the requirements for each challenge.
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-green-500 p-1 mt-0.5">
                    <CheckCircle className="h-3 w-3 text-white" />
                  </div>
                  The password strength meter will show you how strong your password is.
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-green-500 p-1 mt-0.5">
                    <CheckCircle className="h-3 w-3 text-white" />
                  </div>
                  If you're stuck, you can use the password generator for ideas!
                </li>
              </ul>
            </div>
            <div className="rounded-lg border p-3 bg-amber-50 dark:bg-amber-950/20">
              <h3 className="font-medium mb-1 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                Password Tips:
              </h3>
              <ul className="space-y-1 text-sm">
                <li>• Longer passwords are stronger</li>
                <li>• Mix uppercase and lowercase letters</li>
                <li>• Include numbers and special characters</li>
                <li>• Avoid common words and patterns</li>
                <li>• Don't use personal information</li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={startGame}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
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
              Game Complete!
            </DialogTitle>
            <DialogDescription>You've completed all the Password Hero challenges!</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="rounded-lg border p-4 text-center">
              <h3 className="font-medium mb-2">Your Score</h3>
              <div className="text-4xl font-bold text-amber-500 mb-2">{score}</div>
              <Badge variant="outline" className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                {getScoreBadge()}
              </Badge>
              <p className="mt-4 text-sm">{getScoreMessage()}</p>
            </div>
            <div className="rounded-lg border p-3 bg-blue-50 dark:bg-blue-950/20">
              <h3 className="font-medium mb-1 flex items-center gap-2">
                <Info className="h-4 w-4 text-blue-500" />
                Remember:
              </h3>
              <p className="text-sm">
                Use different passwords for different accounts, and consider using a password manager to help you
                create and remember strong, unique passwords for all your accounts.
              </p>
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={startGame}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
            >
              Play Again
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/simulator">Back to Games</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Password Generator Dialog */}
      <Dialog open={showPasswordGenerator} onOpenChange={setShowPasswordGenerator}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Key className="h-5 w-5 text-green-500" />
              Password Generator
            </DialogTitle>
            <DialogDescription>Create a strong random password</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Input
                value={generatedPassword}
                readOnly
                className="font-mono"
                type={passwordVisible ? "text" : "password"}
              />
              <Button variant="outline" size="icon" onClick={() => setPasswordVisible(!passwordVisible)}>
                {passwordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Password Length: {passwordLength[0]}</Label>
                </div>
                <Slider value={passwordLength} onValueChange={setPasswordLength} min={8} max={30} step={1} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="uppercase"
                    checked={useUppercase}
                    onChange={(e) => setUseUppercase(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label htmlFor="uppercase">Uppercase (A-Z)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="lowercase"
                    checked={useLowercase}
                    onChange={(e) => setUseLowercase(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label htmlFor="lowercase">Lowercase (a-z)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="numbers"
                    checked={useNumbers}
                    onChange={(e) => setUseNumbers(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label htmlFor="numbers">Numbers (0-9)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="special"
                    checked={useSpecial}
                    onChange={(e) => setUseSpecial(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label htmlFor="special">Special (!@#$%)</Label>
                </div>
              </div>

              <Button onClick={generateRandomPassword} variant="outline" className="w-full">
                Generate New Password
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={useGeneratedPassword}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
            >
              Use This Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Game Visualization Column */}
        <div>
          <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-lg overflow-hidden">
            <PasswordGame2D 
              passwordStrength={passwordStrength}
              challengeCompleted={challengeCompleted}
              timeLeft={timeLeft}
              gameOver={gameOver}
              onGameOver={() => {
                setGameOver(true);
                setShowGameOver(true);
              }}
              onPlayAgain={() => {
                resetGame();
                startGame();
              }}
              onScoreUpdate={(score) => setUserScore(score)}
              onReturnHome={() => {}}
              onReturnGames={() => {}}
            />
          </div>
        </div>

        {/* Password Input Column */}
        <div>
          {!gameStarted && !gameOver ? (
            <Card className="overflow-hidden h-full">
              <div className="h-2 w-full bg-gradient-to-r from-green-500 to-emerald-500"></div>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-green-500/10 p-2">
                    <Lock className="h-5 w-5 text-green-500" />
                  </div>
                  <CardTitle>Welcome to Password Hero!</CardTitle>
                </div>
                <CardDescription>
                  Learn to create super-strong passwords and keep your accounts safe from hackers!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-green-500" />
                    Why Are Strong Passwords Important?
                  </h3>
                  <p className="text-sm">
                    Strong passwords are your first line of defense against hackers! They protect your personal
                    information, photos, messages, and accounts from being stolen or misused. Learning to create strong
                    passwords is an essential digital skill.
                  </p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium mb-2">How to Play:</h3>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center gap-2">
                        <Lock className="h-4 w-4 text-green-500" />
                        Complete password challenges
                      </li>
                      <li className="flex items-center gap-2">
                        <Key className="h-4 w-4 text-blue-500" />
                        Create passwords that meet requirements
                      </li>
                      <li className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-amber-500" />
                        Learn password security skills
                      </li>
                      <li className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-amber-500" />
                        Earn points and badges
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium mb-2">Game Features:</h3>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-purple-500" />5 exciting password challenges
                      </li>
                      <li className="flex items-center gap-2">
                        <Info className="h-4 w-4 text-blue-500" />
                        Helpful password tips
                      </li>
                      <li className="flex items-center gap-2">
                        <Key className="h-4 w-4 text-green-500" />
                        Password generator tool
                      </li>
                      <li className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-amber-500" />
                        Earn the Password Hero badge
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={startGame}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                >
                  Start Game
                </Button>
              </CardFooter>
            </Card>
          ) : gameStarted && !gameOver ? (
            <Card className="overflow-hidden h-full">
              <div className="h-2 w-full bg-gradient-to-r from-green-500 to-emerald-500"></div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-green-500/10 p-2">
                        <Lock className="h-5 w-5 text-green-500" />
                      </div>
                      <CardTitle>
                        Challenge {currentChallengeIndex + 1}: {currentChallenge.title}
                      </CardTitle>
                    </div>
                    <CardDescription>{currentChallenge.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Create Your Password:</Label>
                  <div className="flex">
                    <div className="relative flex-1">
                      <Input
                        id="password"
                        type={passwordVisible ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pr-10"
                        placeholder="Enter your password here"
                      />
                      <button
                        type="button"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      >
                        {passwordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    <Button variant="outline" className="ml-2" onClick={() => setShowPasswordGenerator(true)}>
                      <Key className="h-4 w-4 mr-2" />
                      Generate
                    </Button>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <div>Password Strength:</div>
                    <div className={getStrengthLabel(passwordStrength).color}>
                      {getStrengthLabel(passwordStrength).label}
                    </div>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className={`h-2 rounded-full ${getStrengthColor(passwordStrength)}`}
                      style={{ width: `${passwordStrength}%` }}
                    />
                  </div>
                </div>

                <div className="rounded-lg border p-3">
                  <h3 className="font-medium mb-2">Requirements:</h3>
                  <ul className="space-y-2">
                    {currentChallenge.requirements.map((req) => {
                      const isMet = req.check(password)
                      return (
                        <li key={req.id} className="flex items-start gap-2">
                          <div
                            className={`rounded-full p-1 mt-0.5 ${isMet ? "bg-green-500/20" : "bg-gray-200 dark:bg-gray-700"}`}
                          >
                            {isMet ? (
                              <CheckCircle className="h-3 w-3 text-green-500" />
                            ) : (
                              <XCircle className="h-3 w-3 text-gray-400 dark:text-gray-500" />
                            )}
                          </div>
                          <span className={isMet ? "text-green-700 dark:text-green-300" : ""}>{req.description}</span>
                        </li>
                      )
                    })}
                  </ul>
                </div>

                {showFeedback ? (
                  <div className="rounded-lg border p-4 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <h3 className="font-medium text-green-700 dark:text-green-300">Challenge Completed!</h3>
                    </div>
                    <p className="text-sm mb-3">Great job! You've created a password that meets all the requirements.</p>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Password Tips:</h4>
                      <ul className="space-y-1 text-sm">
                        {currentChallenge.tips.map((tip, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="rounded-full bg-green-500/20 p-1 mt-0.5 flex-shrink-0">
                              <Info className="h-3 w-3 text-green-500" />
                            </div>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg border p-3 bg-amber-50 dark:bg-amber-950/20">
                    <h3 className="font-medium mb-1 flex items-center gap-2">
                      <Info className="h-4 w-4 text-amber-500" />
                      Password Tips:
                    </h3>
                    <ul className="space-y-1 text-sm">
                      {currentChallenge.tips.map((tip, index) => (
                        <li key={index}>• {tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                {!showFeedback ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={!challengeCompleted}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  >
                    Submit Password
                  </Button>
                ) : (
                  <Button
                    onClick={nextChallenge}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                  >
                    Next Challenge
                  </Button>
                )}
              </CardFooter>
            </Card>
          ) : (
            <Card className="overflow-hidden h-full">
              <div className="h-2 w-full bg-gradient-to-r from-green-500 to-emerald-500"></div>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-amber-500/10 p-2">
                    <Trophy className="h-5 w-5 text-amber-500" />
                  </div>
                  <CardTitle>Game Complete!</CardTitle>
                </div>
                <CardDescription>You've completed all the Password Hero challenges!</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border p-4 text-center">
                  <h3 className="font-medium mb-2">Your Score</h3>
                  <div className="text-4xl font-bold text-amber-500 mb-2">{score}</div>
                  <Badge variant="outline" className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                    {getScoreBadge()}
                  </Badge>
                  <p className="mt-4 text-sm">{getScoreMessage()}</p>
                </div>
                <div className="rounded-lg border p-3 bg-blue-50 dark:bg-blue-950/20">
                  <h3 className="font-medium mb-1 flex items-center gap-2">
                    <Info className="h-4 w-4 text-blue-500" />
                    Password Security Tips:
                  </h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Use a different password for each important account</li>
                    <li>• Consider using a password manager to store your passwords securely</li>
                    <li>• Enable two-factor authentication when available</li>
                    <li>• Change your passwords regularly, especially for important accounts</li>
                    <li>• Never share your passwords with others</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-2">
                <Button
                  onClick={startGame}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                >
                  Play Again
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/simulator">Back to Games</Link>
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

