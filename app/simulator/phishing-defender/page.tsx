"use client"

import { useState, useEffect, useRef } from 'react'
import { DashboardLayout } from "@/components/dashboard-layout"
import { PhishingGame } from "@/components/games/phishing-defender/PhishingGame"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import NextLink from "next/link"
import { cn } from "@/lib/utils"
import {
  Shield,
  Trophy,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Info,
  Mail,
  Link,
  Eye
} from "lucide-react"

// Email data for the game
const emails = [
  {
    id: 1,
    sender: "Amazon Customer Service <customer-service@amazon-support.net>",
    senderEmail: "customer-service@amazon-support.net",
    senderName: "Amazon Customer Service",
    subject: "Action Required: Your Amazon Account Has Been Suspended",
    date: "May 15, 2025 10:32 AM",
    content: `Dear Valued Customer,

We regret to inform you that your Amazon account has been temporarily suspended due to suspicious activity. To restore your account, please click the button below and verify your information.

If you do not verify your account within 24 hours, your account will be permanently deactivated.

Thank you,
Amazon Customer Service Team`,
    buttonText: "Verify Account Now",
    buttonUrl: "https://amazon-account-verify.net/restore-account?id=29581",
    links: [
      {
        text: "Verify Account Now",
        url: "https://amazon-account-verify.net/restore-account?id=29581",
        isSuspicious: true,
        reason: "The URL domain 'amazon-account-verify.net' is not an official Amazon domain.",
      },
    ],
    attachments: [],
    isPhishing: true,
    securityScore: 20,
    redFlags: [
      {
        type: "sender",
        element: "email domain",
        description: "The sender's email domain is 'amazon-support.net', not the official 'amazon.com'",
      },
      {
        type: "content",
        element: "urgency",
        description: "Creates urgency with threats of account deactivation",
      },
      {
        type: "content",
        element: "generic greeting",
        description: "Uses 'Dear Valued Customer' instead of your actual name",
      },
      {
        type: "link",
        element: "URL",
        description: "Links to 'amazon-account-verify.net' instead of amazon.com",
      },
    ],
  },
  {
    id: 2,
    sender: "Netflix <info@netflix.com>",
    senderEmail: "info@netflix.com",
    senderName: "Netflix",
    subject: "Your monthly Netflix subscription",
    date: "May 14, 2025 3:45 PM",
    content: `Hi there,

We're processing your monthly subscription payment for Netflix. Your next billing date is June 15, 2025.

If you have any questions about your subscription, please visit netflix.com/account or contact our customer service team.

Enjoy your streaming!
The Netflix Team`,
    buttonText: "View Account Details",
    buttonUrl: "https://netflix.com/account",
    links: [
      {
        text: "netflix.com/account",
        url: "https://netflix.com/account",
        isSuspicious: false,
        reason: "This is the official Netflix domain.",
      },
    ],
    attachments: [],
    isPhishing: false,
    securityScore: 90,
    redFlags: [],
  },
  {
    id: 3,
    sender: "PayPal Security <security-alert@paypal-secure.com>",
    senderEmail: "security-alert@paypal-secure.com",
    senderName: "PayPal Security",
    subject: "URGENT: Unauthorized Access to Your PayPal Account",
    date: "May 13, 2025 11:27 AM",
    content: `Dear PayPal User,

We have detected unauthorized access to your PayPal account from an unknown device. Your account has been limited until we can verify your identity.

To remove the limitation, please verify your account by clicking the button below. You will need to provide your full credit card information and social security number for verification purposes.

This is urgent! If you don't verify within 2 hours, your account will be permanently closed.

PayPal Security Team`,
    buttonText: "Verify Account Now",
    buttonUrl: "https://paypal-secure.com/verify?id=user29571",
    links: [
      {
        text: "Verify Account Now",
        url: "https://paypal-secure.com/verify?id=user29571",
        isSuspicious: true,
        reason: "The URL domain 'paypal-secure.com' is not an official PayPal domain.",
      },
    ],
    attachments: [],
    isPhishing: true,
    securityScore: 10,
    redFlags: [
      {
        type: "sender",
        element: "email domain",
        description: "The sender's email domain is 'paypal-secure.com', not the official 'paypal.com'",
      },
      {
        type: "content",
        element: "extreme urgency",
        description: "Creates extreme urgency with a 2-hour deadline",
      },
      {
        type: "content",
        element: "sensitive information request",
        description: "Asks for highly sensitive information like full credit card details and SSN",
      },
      {
        type: "content",
        element: "threatening language",
        description: "Threatens immediate account closure",
      },
      {
        type: "link",
        element: "URL",
        description: "Links to 'paypal-secure.com' instead of paypal.com",
      },
    ],
  },
  {
    id: 4,
    sender: "Google Calendar <calendar-noreply@google.com>",
    senderEmail: "calendar-noreply@google.com",
    senderName: "Google Calendar",
    subject: "Calendar Reminder: Team Meeting Tomorrow",
    date: "May 14, 2025 4:15 PM",
    content: `This is a reminder about your upcoming event:

Team Weekly Meeting
Date: June 15, 2025
Time: 10:00 AM - 11:00 AM
Location: Conference Room A or Google Meet

You can view the full details or make changes to this event in your Google Calendar.`,
    buttonText: "View in Calendar",
    buttonUrl: "https://calendar.google.com/event?eid=12345",
    links: [
      {
        text: "View in Calendar",
        url: "https://calendar.google.com/event?eid=12345",
        isSuspicious: false,
        reason: "This is the official Google Calendar domain.",
      },
    ],
    attachments: [
      {
        name: "meeting_details.ics",
        type: "calendar",
        isSuspicious: false,
      },
    ],
    isPhishing: false,
    securityScore: 95,
    redFlags: [],
  },
  {
    id: 5,
    sender: "Bank of America <secure@bankofamerica-secure.com>",
    senderEmail: "secure@bankofamerica-secure.com",
    senderName: "Bank of America",
    subject: "⚠️ Your account access has been limited ⚠️",
    date: "May 15, 2025 8:12 AM",
    content: `IMPORTANT NOTICE:

Your Bank of America account access has been limited due to failed verification attempts.

To restore full access to your account, you must verify your identity immediately by clicking the button below. You will need to provide your:
- Full account number
- Online banking password
- PIN number
- Mother's maiden name

URGENT: Complete verification within 24 hours to avoid account closure.

Security Department
Bank of America`,
    buttonText: "Verify Account Now",
    buttonUrl: "https://bankofamerica-secure.com/verify-identity",
    links: [
      {
        text: "Verify Account Now",
        url: "https://bankofamerica-secure.com/verify-identity",
        isSuspicious: true,
        reason: "The URL domain 'bankofamerica-secure.com' is not an official Bank of America domain.",
      },
    ],
    attachments: [
      {
        name: "Verification_Form.exe",
        type: "executable",
        isSuspicious: true,
      },
    ],
    isPhishing: true,
    securityScore: 5,
    redFlags: [
      {
        type: "sender",
        element: "email domain",
        description: "The sender's email domain is 'bankofamerica-secure.com', not the official 'bankofamerica.com'",
      },
      {
        type: "content",
        element: "warning symbols",
        description: "Uses excessive warning symbols (⚠️) in the subject line",
      },
      {
        type: "content",
        element: "sensitive information request",
        description: "Asks for highly sensitive information including your password and PIN",
      },
      {
        type: "attachment",
        element: "executable file",
        description: "Contains a suspicious executable file attachment",
      },
      {
        type: "content",
        element: "urgency",
        description: "Creates urgency with a 24-hour deadline",
      },
    ],
  },
  {
    id: 6,
    sender: "Spotify <no-reply@spotify.com>",
    senderEmail: "no-reply@spotify.com",
    senderName: "Spotify",
    subject: "Your Spotify Premium subscription receipt",
    date: "May 15, 2025 12:01 AM",
    content: `Hi there,

Thanks for being a Spotify Premium member!

This email confirms your payment of $9.99 for your monthly Spotify Premium subscription. Your next payment will be processed on July 15, 2025.

You can view your payment history and manage your subscription at any time by visiting your account page.

Happy listening!
The Spotify Team`,
    buttonText: "Manage Subscription",
    buttonUrl: "https://spotify.com/account/subscription",
    links: [
      {
        text: "Manage Subscription",
        url: "https://spotify.com/account/subscription",
        isSuspicious: false,
        reason: "This is the official Spotify domain.",
      },
    ],
    attachments: [
      {
        name: "Spotify_Receipt_May2025.pdf",
        type: "pdf",
        isSuspicious: false,
      },
    ],
    isPhishing: false,
    securityScore: 90,
    redFlags: [],
  },
  {
    id: 7,
    sender: "Microsoft 365 Team <security@microsoft-365-support.net>",
    senderEmail: "security@microsoft-365-support.net",
    senderName: "Microsoft 365 Team",
    subject: "Your Microsoft 365 account will be suspended today",
    date: "May 15, 2025 7:49 AM",
    content: `ATTENTION MICROSOFT 365 USER:

Your Microsoft 365 account will be suspended today due to suspicious login attempts.

To prevent account suspension, please verify your identity immediately by clicking the button below. You will need to re-enter your Microsoft password and update your security information.

This is your FINAL notice. Failure to verify will result in immediate account suspension.

Microsoft 365 Security Team`,
    buttonText: "Prevent Account Suspension",
    buttonUrl: "https://microsoft-365-support.net/verify-identity?user=2957194",
    links: [
      {
        text: "Prevent Account Suspension",
        url: "https://microsoft-365-support.net/verify-identity?user=2957194",
        isSuspicious: true,
        reason: "The URL domain 'microsoft-365-support.net' is not an official Microsoft domain.",
      },
    ],
    attachments: [],
    isPhishing: true,
    securityScore: 15,
    redFlags: [
      {
        type: "sender",
        element: "email domain",
        description: "The sender's email domain is 'microsoft-365-support.net', not an official Microsoft domain",
      },
      {
        type: "content",
        element: "urgency",
        description: "Creates extreme urgency with 'today' and 'FINAL notice' language",
      },
      {
        type: "content",
        element: "password request",
        description: "Asks you to enter your Microsoft password",
      },
      {
        type: "content",
        element: "threatening language",
        description: "Uses threatening language about account suspension",
      },
      {
        type: "content",
        element: "capitalization",
        description: "Uses all caps for 'ATTENTION' and 'FINAL' to create alarm",
      },
    ],
  },
  {
    id: 8,
    sender: "Apple <appleid@apple.com>",
    senderEmail: "appleid@apple.com",
    senderName: "Apple",
    subject: "Your App Store receipt",
    date: "May 14, 2025 8:32 PM",
    content: `Dear Customer,

Your App Store purchase was successful.

Item: Minecraft
Price: $6.99
Date: June 14, 2025

If you did not make this purchase, please view your purchase history in your Apple ID account settings.

Thank you for using the App Store.
Apple Inc.`,
    buttonText: "View Purchase History",
    buttonUrl: "https://appleid.apple.com/account/purchase-history",
    links: [
      {
        text: "View Purchase History",
        url: "https://appleid.apple.com/account/purchase-history",
        isSuspicious: false,
        reason: "This is the official Apple domain.",
      },
    ],
    attachments: [],
    isPhishing: false,
    securityScore: 95,
    redFlags: [],
  },
]

// Helper function to extract domain from URL
const extractDomain = (url: string) => {
  try {
    const domain = new URL(url).hostname
    return domain
  } catch (e) {
    return url
  }
}

// Get security rating color
const getSecurityRatingColor = (score: number) => {
  if (score >= 80) return "text-green-500"
  if (score >= 60) return "text-blue-500"
  if (score >= 40) return "text-amber-500"
  if (score >= 20) return "text-orange-500"
  return "text-red-500"
}

// Get security rating background color
const getSecurityRatingBgColor = (score: number) => {
  if (score >= 80) return "bg-green-500"
  if (score >= 60) return "bg-blue-500"
  if (score >= 40) return "bg-amber-500"
  if (score >= 20) return "bg-orange-500"
  return "bg-red-500"
}

export default function PhishingDefenderGame() {
  const [hoveredURL, setHoveredURL] = useState<string | null>(null)
  const [emailAnalyzed, setEmailAnalyzed] = useState(false)
  const [securityRating, setSecurityRating] = useState<number | null>(null)
  const [headerExpanded, setHeaderExpanded] = useState(false)
  const [showAttachmentWarning, setShowAttachmentWarning] = useState(false)
  const [currentAttachment, setCurrentAttachment] = useState<{
    name: string
    type: string
    isSuspicious: boolean
  } | null>(null)

  const [currentEmailIndex, setCurrentEmailIndex] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [showInstructions, setShowInstructions] = useState(true)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [timeLeft, setTimeLeft] = useState(45)
  const [showFeedback, setShowFeedback] = useState(false)
  const [emailsPlayed, setEmailsPlayed] = useState<number[]>([])
  const [selectedElements, setSelectedElements] = useState<string[]>([])
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false)
  const [showGameOver, setShowGameOver] = useState(false)

  const shuffledEmails = useRef([...emails].sort(() => Math.random() - 0.5)).current
  const currentEmail = shuffledEmails[currentEmailIndex]

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (gameStarted && !showFeedback && !gameOver && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            handleJudgment()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => clearInterval(timer)
  }, [gameStarted, showFeedback, gameOver, timeLeft])

  const startGame = () => {
    setGameStarted(true)
    setShowInstructions(false)
    setGameOver(false)
    setCurrentEmailIndex(0)
    setScore(0)
    setLives(3)
    setTimeLeft(45)
    setShowFeedback(false)
    setEmailsPlayed([])
    setSelectedElements([])
    setHoveredURL(null)
    setEmailAnalyzed(false)
    setSecurityRating(null)
    setHeaderExpanded(false)
  }

  const handleElementSelect = (elementType: string) => {
    if (selectedElements.includes(elementType)) {
      setSelectedElements(selectedElements.filter((el) => el !== elementType))
    } else {
      setSelectedElements([...selectedElements, elementType])
    }
  }

  const isRedFlagFound = (flagType: string) => {
    return selectedElements.includes(flagType)
  }

  const getRedFlagCount = () => {
    return currentEmail.redFlags.length
  }

  const getFoundRedFlagCount = () => {
    return currentEmail.redFlags.filter((flag) => selectedElements.includes(`${flag.type}-${flag.element}`)).length
  }

  const getRatingBasedOnFlags = () => {
    const totalFlags = getRedFlagCount()
    if (totalFlags === 0) return 95 // Legitimate email

    const foundFlags = getFoundRedFlagCount()
    const percentage = (foundFlags / totalFlags) * 100

    // For phishing emails, the security rating is low
    if (currentEmail.isPhishing) {
      return Math.min(40, currentEmail.securityScore + percentage / 5)
    }

    // For legitimate emails
    return currentEmail.securityScore
  }

  const analyzeEmail = () => {
    setEmailAnalyzed(true)
    const calculatedRating = getRatingBasedOnFlags()
    setSecurityRating(calculatedRating)
  }

  // This is a simplified version of the handleJudgment function below
  const checkJudgment = () => {
    setShowFeedback(true)

    // Record this email as played
    setEmailsPlayed([...emailsPlayed, currentEmailIndex])

    // Check if the judgment was correct
    const isPhishing = currentEmail.isPhishing
    const calculatedRating = getRatingBasedOnFlags()
    const userJudgment = calculatedRating < 50

    if (userJudgment === isPhishing) {
      // Correct judgment
      setScore(score + 100)
    } else {
      // Incorrect judgment
      setLives(lives - 1)
    }
  }

  const handleAttachmentClick = (attachment: { name: string; type: string; isSuspicious: boolean }) => {
    setCurrentAttachment(attachment)
    setShowAttachmentWarning(true)
  }

  const handleJudgment = () => {
    if (!emailAnalyzed) {
      analyzeEmail()
    }

    // Determine if user made the right call based on security rating
    const correctJudgment =
      (securityRating !== null && securityRating < 50 && currentEmail.isPhishing) ||
      (securityRating !== null && securityRating >= 50 && !currentEmail.isPhishing)

    setLastAnswerCorrect(correctJudgment)
    setShowFeedback(true)
    setEmailsPlayed([...emailsPlayed, currentEmail.id])

    if (correctJudgment) {
      // Points calculation based on accuracy
      const foundFlagPercentage =
        currentEmail.redFlags.length > 0 ? (getFoundRedFlagCount() / getRedFlagCount()) * 100 : 100

      const timeBonus = Math.round((timeLeft / 45) * 50)
      const accuracyBonus = Math.round(foundFlagPercentage)

      const totalPoints = 100 + timeBonus + accuracyBonus
      setScore(score + totalPoints)
    } else {
      setLives(lives - 1)
    }

    // Check if game over
    if (lives <= 1 && !correctJudgment) {
      setTimeout(() => {
        setGameOver(true)
        setShowGameOver(true)
      }, 2000)
    }
  }

  const markAsPhishing = () => {
    if (securityRating === null) {
      analyzeEmail()
    }

    const isCorrect = currentEmail.isPhishing
    setLastAnswerCorrect(isCorrect)
    setShowFeedback(true)
    setEmailsPlayed([...emailsPlayed, currentEmail.id])

    if (isCorrect) {
      // Points calculation
      const foundFlagPercentage = getRedFlagCount() > 0 ? (getFoundRedFlagCount() / getRedFlagCount()) * 100 : 100

      const timeBonus = Math.round((timeLeft / 45) * 50)
      const accuracyBonus = Math.round(foundFlagPercentage)

      const totalPoints = 100 + timeBonus + accuracyBonus
      setScore(score + totalPoints)
    } else {
      setLives(lives - 1)

      // Check if game over
      if (lives <= 1) {
        setTimeout(() => {
          setGameOver(true)
          setShowGameOver(true)
        }, 2000)
      }
    }
  }

  const markAsLegitimate = () => {
    if (securityRating === null) {
      analyzeEmail()
    }

    const isCorrect = !currentEmail.isPhishing
    setLastAnswerCorrect(isCorrect)
    setShowFeedback(true)
    setEmailsPlayed([...emailsPlayed, currentEmail.id])

    if (isCorrect) {
      // Simple scoring for correct legitimate email identification
      const timeBonus = Math.round((timeLeft / 45) * 50)
      const totalPoints = 100 + timeBonus
      setScore(score + totalPoints)
    } else {
      setLives(lives - 1)

      // Check if game over
      if (lives <= 1) {
        setTimeout(() => {
          setGameOver(true)
          setShowGameOver(true)
        }, 2000)
      }
    }
  }

  const nextEmail = () => {
    if (currentEmailIndex < shuffledEmails.length - 1) {
      setCurrentEmailIndex(currentEmailIndex + 1)
      setTimeLeft(45)
      setShowFeedback(false)
      setSelectedElements([])
      setHoveredURL(null)
      setEmailAnalyzed(false)
      setSecurityRating(null)
      setHeaderExpanded(false)
    } else {
      setGameOver(true)
      setShowGameOver(true)
    }
  }

  const getScoreMessage = () => {
    if (score >= 700) return "Amazing job! You're a Phishing Defense Expert!"
    if (score >= 500) return "Great job! You're a Phishing Defense Pro!"
    if (score >= 300) return "Good job! You're learning to spot phishing attempts!"
    return "Keep practicing! Spotting phishing attempts takes practice."
  }

  const getScoreBadge = () => {
    if (score >= 700) return "Expert Defender"
    if (score >= 500) return "Security Pro"
    if (score >= 300) return "Safety Ranger"
    return "Rookie Defender"
  }

  return (
    <DashboardLayout>
      <PhishingGame />
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Shield className="h-8 w-8 text-red-500" />
              Phishing Defender
            </h1>
            <p className="text-muted-foreground mt-2">
              Can you identify phishing attacks? Analyze these emails and protect your digital identity!
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
                <Shield className="h-5 w-5 text-red-500" />
                How to Play Phishing Defender
              </DialogTitle>
              <DialogDescription>
                Become a digital detective and learn to spot dangerous phishing emails!
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="rounded-lg border p-3">
                <h3 className="font-medium mb-1">Game Rules:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-green-500 p-1 mt-0.5">
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                    Analyze each email by clicking on suspicious elements: sender, links, content, and attachments.
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-green-500 p-1 mt-0.5">
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                    Hover over links to examine the URLs - phishers often use fake domains that look similar to real
                    ones.
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-green-500 p-1 mt-0.5">
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                    Use "Analyze Email" to get a security rating, then decide if it's legitimate or phishing.
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-green-500 p-1 mt-0.5">
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                    You have 45 seconds and 3 lives. Work quickly but carefully!
                  </li>
                </ul>
              </div>
              <div className="rounded-lg border p-3 bg-amber-50 dark:bg-amber-950/20">
                <h3 className="font-medium mb-1 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  Phishing Warning Signs:
                </h3>
                <ul className="space-y-1 text-sm">
                  <li>• Suspicious sender email addresses (not from official domains)</li>
                  <li>• Urgent language and threats to create pressure</li>
                  <li>• Links that don't go to official websites</li>
                  <li>• Requests for personal information or passwords</li>
                  <li>• Suspicious attachments or download requests</li>
                  <li>• Poor grammar, spelling errors, or generic greetings</li>
                </ul>
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={startGame}
                className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
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
              <DialogDescription>You've completed the Phishing Defender challenge!</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="rounded-lg border p-4 text-center">
                <h3 className="font-medium mb-2">Your Score</h3>
                <div className="text-4xl font-bold text-amber-500 mb-2">{score}</div>
                <Badge variant="outline" className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
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
                  In real life, never click on suspicious links or provide personal information in response to
                  unexpected emails. When in doubt, contact the company directly using their official website or phone
                  number.
                </p>
              </div>
            </div>
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button
                onClick={startGame}
                className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
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
                <NextLink href="/simulator/fact-checker">Next Game</NextLink>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Attachment Warning Dialog */}
        <Dialog open={showAttachmentWarning} onOpenChange={setShowAttachmentWarning}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Suspicious Attachment Warning
              </DialogTitle>
              <DialogDescription>This attachment could be dangerous!</DialogDescription>
            </DialogHeader>
            {currentAttachment && (
              <div className="space-y-4">
                <div
                  className={cn(
                    "rounded-lg border p-4",
                    currentAttachment.isSuspicious
                      ? "bg-red-50 dark:bg-red-950/20"
                      : "bg-green-50 dark:bg-green-950/20",
                  )}
                >
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    {currentAttachment.isSuspicious ? (
                      <>
                        <XCircle className="h-5 w-5 text-red-500" />
                        <span className="text-red-700 dark:text-red-400">Potentially Malicious Attachment!</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-green-700 dark:text-green-400">Safe Attachment</span>
                      </>
                    )}
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">File name:</span> {currentAttachment.name}
                    </div>
                    <div>
                      <span className="font-medium">File type:</span> {currentAttachment.type.toUpperCase()}
                    </div>
                    {currentAttachment.isSuspicious && (
                      <p className="text-sm mt-2 text-red-600 dark:text-red-400">
                        This attachment is potentially dangerous. Executable files (.exe) often contain malware that can
                        infect your computer. Never open unexpected attachments, especially executable files.
                      </p>
                    )}
                    {!currentAttachment.isSuspicious && (
                      <p className="text-sm mt-2 text-green-600 dark:text-green-400">
                        This appears to be a legitimate attachment. However, always be cautious with unexpected files,
                        even if they seem safe.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button
                onClick={() => {
                  setShowAttachmentWarning(false)
                  if (currentAttachment?.isSuspicious) {
                    handleElementSelect("attachment-executable")
                  }
                }}
                className="w-full"
              >
                Close Warning
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {!gameStarted && !gameOver ? (
          <Card className="overflow-hidden">
            <div className="h-2 w-full bg-gradient-to-r from-red-500 to-orange-500"></div>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-red-500/10 p-2">
                  <Shield className="h-5 w-5 text-red-500" />
                </div>
                <CardTitle>Welcome to Phishing Defender!</CardTitle>
              </div>
              <CardDescription>
                Test your skills at spotting dangerous phishing emails and protect your digital identity!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  What is Phishing?
                </h3>
                <p className="text-sm">
                  Phishing is when cybercriminals send fake emails, texts, or websites that look like they're from
                  legitimate companies or people you trust. Their goal is to trick you into sharing personal information
                  like passwords, account numbers, or credit card details.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border p-3">
                  <h3 className="font-medium mb-2">Interactive Features:</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-blue-500" />
                      Analyze real-looking emails
                    </li>
                    <li className="flex items-center gap-2">
                      <Link className="h-4 w-4 text-amber-500" />
                      Inspect suspicious links
                    </li>
                    <li className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-green-500" />
                      Identify red flags
                    </li>
                    <li className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-red-500" />
                      Make security decisions
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg border p-3">
                  <h3 className="font-medium mb-2">Game Features:</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-red-500" />8 challenging emails to analyze
                    </li>
                    <li className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-500" />
                      Race against the clock
                    </li>
                    <li className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-amber-500" />
                      Earn points and badges
                    </li>
                    <li className="flex items-center gap-2">
                      <Info className="h-4 w-4 text-green-500" />
                      Learn real-world protection skills
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={startGame}
                className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
              >
                Start Game
              </Button>
            </CardFooter>
          </Card>
        ) : gameStarted && !gameOver ? (
          <Card className="overflow-hidden">
            <div className="h-2 w-full bg-gradient-to-r from-red-500 to-orange-500"></div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-blue-500" />
                    <CardTitle className="text-lg">
                      Email {currentEmailIndex + 1} of {shuffledEmails.length}
                    </CardTitle>
                  </div>
                  <CardDescription>Analyze this email and decide if it's legitimate or phishing</CardDescription>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium mb-1">Time Left</div>
                  <div className={`text-xl font-bold ${timeLeft <= 10 ? "text-red-500 animate-pulse" : ""}`}>
                    {timeLeft}s
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <Progress value={(timeLeft / 45) * 100} className="h-2" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4 bg-card">
                <div className="space-y-3">
                  {/* Email Header */}
                  <div>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="text-sm font-medium">From: {currentEmail.sender}</div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs text-muted-foreground py-0 h-auto"
                          onClick={() => setHeaderExpanded(!headerExpanded)}
                        >
                          {headerExpanded ? "Hide details" : "Show details"}
                        </Button>
                      </div>
                      <Badge variant="outline" className="h-fit">
                        {currentEmail.date}
                      </Badge>
                    </div>

                    {headerExpanded && (
                      <div className="mt-2 border-t pt-2 text-xs space-y-1 text-muted-foreground">
                        <div>
                          <span className="font-medium">From:</span> {currentEmail.senderName} &lt;
                          {currentEmail.senderEmail}&gt;
                        </div>
                        <div>
                          <span className="font-medium">To:</span> you@example.com
                        </div>
                        <div>
                          <span className="font-medium">Subject:</span> {currentEmail.subject}
                        </div>
                        <div>
                          <span className="font-medium">Date:</span> {currentEmail.date}
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="text-sm font-medium">Subject:</div>
                    <div className="text-base font-medium">{currentEmail.subject}</div>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="whitespace-pre-line text-sm">{currentEmail.content}</div>
                  </div>

                  {/* Buttons and Links */}
                  <div className="pt-4">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full border-dashed border-blue-300 dark:border-blue-800 text-blue-600 dark:text-blue-400"
                            disabled={showFeedback}
                            onMouseEnter={() => setHoveredURL(currentEmail.buttonUrl)}
                            onMouseLeave={() => setHoveredURL(null)}
                            onClick={() => handleElementSelect("link-URL")}
                          >
                            {currentEmail.buttonText}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="max-w-sm">
                          <div className="text-xs">URL: {currentEmail.buttonUrl}</div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    {hoveredURL && (
                      <div className="mt-2 text-xs text-muted-foreground overflow-hidden text-ellipsis">
                        {hoveredURL}
                      </div>
                    )}
                  </div>

                  {/* Attachments */}
                  {currentEmail.attachments && currentEmail.attachments.length > 0 && (
                    <div className="pt-3 border-t">
                      <div className="text-sm font-medium mb-2">Attachments:</div>
                      <div className="flex flex-wrap gap-2">
                        {currentEmail.attachments.map((attachment, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1"
                            onClick={() => handleAttachmentClick(attachment)}
                          >
                            <div className="w-4 h-4 flex-shrink-0 bg-blue-100 dark:bg-blue-900 rounded flex items-center justify-center text-[10px] text-blue-700 dark:text-blue-300 uppercase">
                              {attachment.type.slice(0, 1)}
                            </div>
                            <span className="text-xs truncate max-w-[150px]">{attachment.name}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Email Analysis Tools */}
              <div className="rounded-lg border p-3">
                <h3 className="font-medium mb-2">Email Analysis Tools</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(
                        "flex items-center justify-start text-left h-auto py-2",
                        isRedFlagFound("sender-email domain") &&
                          "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800",
                      )}
                      onClick={() => handleElementSelect("sender-email domain")}
                    >
                      <div className="mr-2 size-4 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        <Mail className="size-3 text-blue-700 dark:text-blue-300" />
                      </div>
                      <div>
                        <div className="text-xs font-medium">Sender</div>
                        <div className="text-[10px] text-muted-foreground">
                          {extractDomain(currentEmail.senderEmail)}
                        </div>
                      </div>
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(
                        "flex items-center justify-start text-left h-auto py-2",
                        (isRedFlagFound("content-urgency") ||
                          isRedFlagFound("content-generic greeting") ||
                          isRedFlagFound("content-sensitive information request") ||
                          isRedFlagFound("content-threatening language") ||
                          isRedFlagFound("content-capitalization") ||
                          isRedFlagFound("content-password request")) &&
                          "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800",
                      )}
                      onClick={() => {
                        // Check content for different red flags
                        if (
                          currentEmail.redFlags.some((flag) => flag.type === "content" && flag.element === "urgency")
                        ) {
                          handleElementSelect("content-urgency")
                        }
                        if (
                          currentEmail.redFlags.some(
                            (flag) => flag.type === "content" && flag.element === "generic greeting",
                          )
                        ) {
                          handleElementSelect("content-generic greeting")
                        }
                        if (
                          currentEmail.redFlags.some(
                            (flag) => flag.type === "content" && flag.element === "sensitive information request",
                          )
                        ) {
                          handleElementSelect("content-sensitive information request")
                        }
                        if (
                          currentEmail.redFlags.some(
                            (flag) => flag.type === "content" && flag.element === "threatening language",
                          )
                        ) {
                          handleElementSelect("content-threatening language")
                        }
                        if (
                          currentEmail.redFlags.some(
                            (flag) => flag.type === "content" && flag.element === "capitalization",
                          )
                        ) {
                          handleElementSelect("content-capitalization")
                        }
                        if (
                          currentEmail.redFlags.some(
                            (flag) => flag.type === "content" && flag.element === "password request",
                          )
                        ) {
                          handleElementSelect("content-password request")
                        }
                      }}
                    >
                      <div className="mr-2 size-4 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                        <AlertTriangle className="size-3 text-amber-700 dark:text-amber-300" />
                      </div>
                      <div>
                        <div className="text-xs font-medium">Content</div>
                        <div className="text-[10px] text-muted-foreground">Check message content</div>
                      </div>
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(
                        "flex items-center justify-start text-left h-auto py-2",
                        isRedFlagFound("link-URL") && "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800",
                      )}
                      onClick={() => handleElementSelect("link-URL")}
                    >
                      <div className="mr-2 size-4 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                        <Link className="size-3 text-green-700 dark:text-green-300" />
                      </div>
                      <div>
                        <div className="text-xs font-medium">Links</div>
                        <div className="text-[10px] text-muted-foreground">Hover to check URLs</div>
                      </div>
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(
                        "flex items-center justify-start text-left h-auto py-2",
                        isRedFlagFound("attachment-executable") &&
                          "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800",
                      )}
                      onClick={() => {
                        if (currentEmail.attachments && currentEmail.attachments.some((a) => a.isSuspicious)) {
                          handleElementSelect("attachment-executable")
                        }
                      }}
                    >
                      <div className="mr-2 size-4 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                        <div className="size-3 text-purple-700 dark:text-purple-300">📎</div>
                      </div>
                      <div>
                        <div className="text-xs font-medium">Attachments</div>
                        <div className="text-[10px] text-muted-foreground">
                          {currentEmail.attachments && currentEmail.attachments.length > 0
                            ? `${currentEmail.attachments.length} found`
                            : "No attachments"}
                        </div>
                      </div>
                    </Button>
                  </div>

                  <div className="pt-2 border-t flex justify-between items-center">
                    <div>
                      <div className="text-xs font-medium">Security Rating:</div>
                      {securityRating !== null ? (
                        <div className="flex items-center gap-2">
                          <div className="text-sm font-bold">{Math.round(securityRating)}%</div>
                          <div className={`text-xs ${getSecurityRatingColor(securityRating)}`}>
                            {securityRating >= 80
                              ? "Very Safe"
                              : securityRating >= 60
                                ? "Probably Safe"
                                : securityRating >= 40
                                  ? "Suspicious"
                                  : securityRating >= 20
                                    ? "Likely Phishing"
                                    : "Dangerous"}
                          </div>
                        </div>
                      ) : (
                        <div className="text-xs text-muted-foreground">Click Analyze Email to check</div>
                      )}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={analyzeEmail}
                      disabled={emailAnalyzed}
                      className={emailAnalyzed ? "bg-blue-50 dark:bg-blue-950/20" : ""}
                    >
                      Analyze Email
                    </Button>
                  </div>

                  {securityRating !== null && (
                    <div className="pt-2 border-t">
                      <div className="text-xs font-medium mb-1">Security Indicator:</div>
                      <div className="w-full h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full">
                        <div
                          className={`h-2.5 rounded-full ${getSecurityRatingBgColor(securityRating)}`}
                          style={{ width: `${securityRating}%` }}
                        ></div>
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        <div className="text-xs">
                          Red flags found: {getFoundRedFlagCount()}/{getRedFlagCount()}
                        </div>
                        <div className="text-xs text-right">
                          {securityRating < 50 ? "Recommendation: Mark as Phishing" : "Recommendation: Likely Safe"}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

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
                  <p className="text-sm mb-3">
                    This email is {currentEmail.isPhishing ? "a phishing attempt" : "a legitimate email"}.
                  </p>

                  {currentEmail.redFlags.length > 0 ? (
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium">Red Flags in this Email:</h4>
                      <ul className="space-y-2 text-sm">
                        {currentEmail.redFlags.map((flag, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="rounded-full bg-red-500/20 p-1 mt-0.5 flex-shrink-0">
                              <AlertTriangle className="h-3 w-3 text-red-500" />
                            </div>
                            <span>{flag.description}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="space-y-2 text-sm">
                      <h4 className="font-medium">Why this is a legitimate email:</h4>
                      <ul className="space-y-1">
                        <li className="flex items-start gap-2">
                          <div className="rounded-full bg-green-500/20 p-1 mt-0.5 flex-shrink-0">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                          </div>
                          <span>
                            The sender's email is from the official domain ({extractDomain(currentEmail.senderEmail)})
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="rounded-full bg-green-500/20 p-1 mt-0.5 flex-shrink-0">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                          </div>
                          <span>The content doesn't create false urgency or use threatening language</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="rounded-full bg-green-500/20 p-1 mt-0.5 flex-shrink-0">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                          </div>
                          <span>It doesn't ask for sensitive personal information</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="rounded-full bg-green-500/20 p-1 mt-0.5 flex-shrink-0">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                          </div>
                          <span>Links point to legitimate domains</span>
                        </li>
                      </ul>
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
                    onClick={markAsLegitimate}
                    className="w-1/2 border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-950/20"
                    disabled={securityRating === null}
                  >
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    Legitimate Email
                  </Button>
                  <Button
                    onClick={markAsPhishing}
                    className="w-1/2 bg-red-500 hover:bg-red-600 text-white"
                    disabled={securityRating === null}
                  >
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Phishing Attempt
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={nextEmail}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                >
                  Next Email
                </Button>
              )}
            </CardFooter>
          </Card>
        ) : (
          <Card className="overflow-hidden">
            <div className="h-2 w-full bg-gradient-to-r from-red-500 to-orange-500"></div>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-amber-500/10 p-2">
                  <Trophy className="h-5 w-5 text-amber-500" />
                </div>
                <CardTitle>Game Over!</CardTitle>
              </div>
              <CardDescription>You've completed the Phishing Defender challenge!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4 text-center">
                <h3 className="font-medium mb-2">Your Score</h3>
                <div className="text-4xl font-bold text-amber-500 mb-2">{score}</div>
                <Badge variant="outline" className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
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
                  In real life, never click on suspicious links or provide personal information in response to
                  unexpected emails. When in doubt, contact the company directly using their official website or phone
                  number.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-2">
              <Button
                onClick={startGame}
                className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
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
                <NextLink href="/simulator/fact-checker">Next Game</NextLink>
              </Button>
            </CardFooter>
          </Card>
        )}
    </DashboardLayout>
  )
}

