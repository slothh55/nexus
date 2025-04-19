'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useGameState } from '@/hooks/use-game-state'
import { useAchievements } from '@/hooks/use-achievements'
import { useConfetti } from '@/hooks/use-confetti'
import { AlertCircle, AlertTriangle, CheckCircle, Clock, Eye, FileText, Lock, Mail, Shield, ShieldAlert, ThumbsDown, ThumbsUp, Trophy } from "lucide-react"

// Define the phishing email scenarios
const phishingScenarios = [
  {
    id: 'bank-urgent',
    subject: 'URGENT: Your Bank Account Has Been Compromised',
    sender: 'security@bankofamerica-secure.com',
    date: 'Today, 9:15 AM',
    content: `
Dear Valued Customer,

We have detected suspicious activity on your Bank of America account. Your account has been temporarily limited until you verify your information.

Please click the link below to verify your identity and restore full access to your account:
[Verify Account Now]

This is urgent and requires your immediate attention to prevent unauthorized transactions.

If you do not verify your account within 24 hours, your account will be suspended.

Regards,
Bank of America Security Team
    `,
    isPhishing: true,
    phishingType: 'urgency',
    redFlags: [
      { id: 'bank-1', text: 'Suspicious sender email (bankofamerica-secure.com instead of bankofamerica.com)', type: 'sender' },
      { id: 'bank-2', text: 'Creates false urgency with threats of account suspension', type: 'urgency' },
      { id: 'bank-3', text: 'Generic greeting ("Valued Customer") instead of your name', type: 'greeting' },
      { id: 'bank-4', text: 'Asks you to click a suspicious link', type: 'link' }
    ],
    explanation: 'This is a classic phishing attempt using urgency and fear to manipulate you into clicking a malicious link. Legitimate banks will never ask you to verify account information through email links. They typically ask you to log in directly to their official website or call their official customer service number.'
  },
  {
    id: 'package-delivery',
    subject: 'Your Package Delivery Status: Action Required',
    sender: 'delivery-notification@fedex-delivery.net',
    date: 'Yesterday, 3:42 PM',
    content: `
Tracking Number: FDX-7829145036

Dear Customer,

We attempted to deliver your package today but were unable to complete the delivery due to an address issue.

To reschedule your delivery, please download and complete the attached form: [delivery_form.doc]

If we don't receive your updated information within 3 business days, your package will be returned to the sender.

Thank you for choosing FedEx.

FedEx Customer Support
    `,
    isPhishing: true,
    phishingType: 'attachment',
    redFlags: [
      { id: 'package-1', text: 'Suspicious sender domain (fedex-delivery.net instead of fedex.com)', type: 'sender' },
      { id: 'package-2', text: 'Asks you to download and open a suspicious attachment', type: 'attachment' },
      { id: 'package-3', text: 'Generic greeting without specific package information', type: 'greeting' },
      { id: 'package-4', text: 'Creates urgency with a tight deadline', type: 'urgency' }
    ],
    explanation: 'This phishing email tries to trick you into downloading malware through a fake delivery notification. Legitimate delivery services typically don\'t send attachments for rescheduling. Instead, they provide a tracking number and direct you to their official website.'
  },
  {
    id: 'tech-support',
    subject: 'Your Microsoft Account: Unusual Sign-In Activity',
    sender: 'security-noreply@microsoft-support.com',
    date: 'April 15, 2:18 PM',
    content: `
Microsoft Security Alert

We detected unusual sign-in activity on your Microsoft account from the following location:

Location: Kiev, Ukraine
IP Address: 93.178.xx.xx
Date: April 15, 2023

If this wasn't you, your account may have been compromised. Please call our security department immediately at 1-844-230-5831 to secure your account.

Do not ignore this message. Your account will be locked if no action is taken.

Microsoft Security Team
    `,
    isPhishing: true,
    phishingType: 'phone',
    redFlags: [
      { id: 'tech-1', text: 'Suspicious sender domain (microsoft-support.com instead of microsoft.com)', type: 'sender' },
      { id: 'tech-2', text: 'Asks you to call a suspicious phone number', type: 'phone' },
      { id: 'tech-3', text: 'Creates urgency with threats of account lockout', type: 'urgency' },
      { id: 'tech-4', text: 'Lacks specific information about which Microsoft service was accessed', type: 'vague' }
    ],
    explanation: 'This is a tech support scam that tries to get you to call a fake support number. The scammers will try to convince you that your computer is infected and needs immediate technical support, often requesting remote access to your computer or payment for unnecessary services. Microsoft never provides support phone numbers in security alert emails.'
  },
  {
    id: 'prize-winner',
    subject: 'CONGRATULATIONS! You\'ve Won a $1,000 Amazon Gift Card!',
    sender: 'prize-notification@amazon-rewards.org',
    date: 'April 12, 11:05 AM',
    content: `
CONGRATULATIONS!!!

You have been selected as one of our lucky winners in the Amazon Customer Appreciation Sweepstakes!

Your prize: $1,000 Amazon Gift Card

To claim your prize, please provide the following information within 48 hours:

1. Full Name
2. Phone Number
3. Home Address
4. Date of Birth
5. Amazon Account Email

Reply directly to this email with your information to claim your prize!

Amazon Customer Rewards Team
    `,
    isPhishing: true,
    phishingType: 'prize',
    redFlags: [
      { id: 'prize-1', text: 'Suspicious sender domain (amazon-rewards.org instead of amazon.com)', type: 'sender' },
      { id: 'prize-2', text: 'Offering a prize you never entered to win', type: 'prize' },
      { id: 'prize-3', text: 'Requesting excessive personal information', type: 'information' },
      { id: 'prize-4', text: 'Poor formatting and excessive punctuation', type: 'formatting' },
      { id: 'prize-5', text: 'Creates urgency with a tight deadline', type: 'urgency' }
    ],
    explanation: 'This is a classic prize scam. Legitimate companies don\'t request personal information via email to deliver prizes, especially information like your date of birth. Additionally, you can\'t win contests you didn\'t enter. The scammers are trying to collect your personal information for identity theft.'
  },
  {
    id: 'invoice',
    subject: 'Your Invoice #INV-29471 from Apple',
    sender: 'billing@apple.billing-services.com',
    date: 'April 10, 8:22 AM',
    content: `
Apple Invoice #INV-29471

Dear Customer,

Thank you for your recent purchase. Your account has been charged $499.99 for Apple iPhone 13 Pro.

Order Details:
- Product: iPhone 13 Pro
- Amount: $499.99
- Date: April 10, 2023

If you did not authorize this transaction, please call our billing department immediately at 1-888-476-3982 or click here to dispute the charge: [Dispute Charge]

Apple Billing Department
    `,
    isPhishing: true,
    phishingType: 'invoice',
    redFlags: [
      { id: 'invoice-1', text: 'Suspicious sender domain (apple.billing-services.com instead of apple.com)', type: 'sender' },
      { id: 'invoice-2', text: 'Invoice for a purchase you didn\'t make', type: 'invoice' },
      { id: 'invoice-3', text: 'Suspicious phone number not matching official Apple support', type: 'phone' },
      { id: 'invoice-4', text: 'Suspicious link to "dispute" the charge', type: 'link' }
    ],
    explanation: 'This is a fake invoice scam. The scammers hope you\'ll panic about being charged for something you didn\'t buy and click their malicious link or call their fake support number. Legitimate companies like Apple send receipts from consistent domains and provide multiple ways to verify purchases through their official app or website.'
  },
  {
    id: 'account-update',
    subject: 'Action Required: Update Your PayPal Information',
    sender: 'service@paypal-accounts.com',
    date: 'April 8, 5:37 PM',
    content: `
PayPal Account Notice

Dear PayPal User,

We are updating our security measures to better protect our customers. To continue using your PayPal account without interruption, you need to verify your information.

Please click the link below to update your account:
[Update Account Information]

Failure to update your information within 72 hours may result in account limitations.

Thank you for your cooperation.

PayPal Customer Service
    `,
    isPhishing: true,
    phishingType: 'account',
    redFlags: [
      { id: 'account-1', text: 'Suspicious sender domain (paypal-accounts.com instead of paypal.com)', type: 'sender' },
      { id: 'account-2', text: 'Generic greeting without your name', type: 'greeting' },
      { id: 'account-3', text: 'Creates urgency with threats of account limitations', type: 'urgency' },
      { id: 'account-4', text: 'Asks you to click a suspicious link', type: 'link' }
    ],
    explanation: 'This is an account update phishing scam. PayPal and other legitimate financial services will address you by name in important emails and will ask you to log in directly to their website (not through an email link) to update account information. They typically don\'t threaten immediate account limitations.'
  },
  {
    id: 'job-offer',
    subject: 'Work From Home Opportunity - $35/hr Part Time',
    sender: 'hr@flexible-careers.com',
    date: 'April 5, 1:14 PM',
    content: `
Work From Home Opportunity

Hi there,

I found your profile online and think you would be perfect for a remote position with our company. The role offers:

- $35/hour
- Flexible schedule (10-20 hours/week)
- No experience required
- Weekly payments

To apply, simply reply to this email with your name and phone number. We have positions starting immediately!

Best regards,
James Wilson
HR Department
    `,
    isPhishing: true,
    phishingType: 'job',
    redFlags: [
      { id: 'job-1', text: 'Suspicious sender domain (flexible-careers.com)', type: 'sender' },
      { id: 'job-2', text: 'Offering high pay for unspecified work with no experience required', type: 'too-good' },
      { id: 'job-3', text: 'Vague about the company name and actual job duties', type: 'vague' },
      { id: 'job-4', text: 'Requesting personal information via email', type: 'information' }
    ],
    explanation: 'This is a job scam. Legitimate employers don\'t send unsolicited job offers with high pay and no experience requirements. These scams often lead to requests for personal information, fake check scams, or "reshipping" schemes that involve handling stolen goods.'
  },
  {
    id: 'password-reset',
    subject: 'Your Google Account Password Reset',
    sender: 'no-reply@accounts-google.com',
    date: 'April 3, 10:51 AM',
    content: `
Google Account Security Alert

Someone requested a password reset for your Google Account.

Time: April 3, 2023, 10:45 AM
Browser: Chrome
Location: Boston, MA

If this was you, click here to reset your password: [Reset Password]

If this wasn't you, click here to secure your account: [Secure Account]

Google Security Team
    `,
    isPhishing: true,
    phishingType: 'password',
    redFlags: [
      { id: 'password-1', text: 'Suspicious sender domain (accounts-google.com instead of google.com)', type: 'sender' },
      { id: 'password-2', text: 'Suspicious links for password reset', type: 'link' },
      { id: 'password-3', text: 'No mention of which specific Google account (email address)', type: 'vague' },
      { id: 'password-4', text: 'Attempting to create urgency around account security', type: 'urgency' }
    ],
    explanation: 'This is a password reset phishing scam. Google and other legitimate services will specify which account (usually by showing part of your email address) when sending security alerts. They also send these notifications from consistent, official domains. The links in this email would likely lead to a fake Google login page designed to steal your credentials.'
  },
  {
    id: 'order-confirmation',
    subject: 'Your Amazon Order #A28937B has shipped',
    sender: 'orders@amazon.com',
    date: 'April 1, 3:27 PM',
    content: `
Hello John,

Your Amazon order #A28937B has shipped and is on its way!

Order Details:
- Wireless Earbuds with Charging Case
- Estimated delivery: April 3, 2023

Track your package: [Track Package]

If you need to make changes to this order, please visit Your Orders on Amazon.com.

Thank you for shopping with us!

Amazon Customer Service
    `,
    isPhishing: false,
    redFlags: [],
    explanation: 'This appears to be a legitimate order confirmation email. It comes from an official Amazon domain (amazon.com), addresses you by name, includes specific order details, and doesn\'t ask for personal information or create false urgency. The tracking link would likely go to Amazon\'s official website.'
  },
  {
    id: 'subscription-renewal',
    subject: 'Your Netflix Subscription Renewal',
    sender: 'info@netflix.com',
    date: 'March 28, 7:19 PM',
    content: `
Hi John,

Your Netflix subscription will renew automatically on April 28, 2023.

Subscription Plan: Standard (HD)
Monthly Charge: $15.49
Payment Method: Visa ending in 4872

No action is required to continue your subscription. If you wish to make changes to your plan or payment method, please sign in to your account at Netflix.com.

Thank you for being a Netflix member!

The Netflix Team
    `,
    isPhishing: false,
    redFlags: [],
    explanation: 'This appears to be a legitimate subscription renewal notice. It comes from an official Netflix domain (netflix.com), addresses you by name, includes specific subscription details including your partial card number, and directs you to the official Netflix website rather than providing suspicious links. It also doesn\'t create false urgency or request personal information.'
  }
]

// Define the phishing types and their descriptions
const phishingTypes = {
  urgency: {
    title: 'Urgency & Fear Tactics',
    description: 'Creates a false sense of urgency to pressure you into acting quickly without thinking',
    icon: <Clock className="h-4 w-4" />,
    color: 'text-red-500'
  },
  sender: {
    title: 'Suspicious Sender',
    description: 'Email address that mimics a legitimate company but with slight differences',
    icon: <Mail className="h-4 w-4" />,
    color: 'text-amber-500'
  },
  link: {
    title: 'Suspicious Links',
    description: 'Links that lead to fake websites designed to steal your information',
    icon: <AlertTriangle className="h-4 w-4" />,
    color: 'text-orange-500'
  },
  attachment: {
    title: 'Dangerous Attachments',
    description: 'Files that may contain malware or viruses',
    icon: <FileText className="h-4 w-4" />,
    color: 'text-purple-500'
  },
  greeting: {
    title: 'Generic Greeting',
    description: 'Lacks personalization that legitimate companies typically include',
    icon: <AlertCircle className="h-4 w-4" />,
    color: 'text-blue-500'
  },
  information: {
    title: 'Requests Personal Information',
    description: 'Asks for sensitive data that legitimate companies wouldn\'t request via email',
    icon: <Eye className="h-4 w-4" />,
    color: 'text-indigo-500'
  },
  prize: {
    title: 'Prize Scams',
    description: 'Offers prizes or rewards you never signed up for',
    icon: <Trophy className="h-4 w-4" />,
    color: 'text-yellow-500'
  },
  "too-good": {
    title: 'Too Good To Be True',
    description: 'Offers that seem unrealistically generous or easy',
    icon: <AlertTriangle className="h-4 w-4" />,
    color: 'text-lime-500'
  },
  phone: {
    title: 'Suspicious Phone Numbers',
    description: 'Asks you to call unknown numbers for "support" or verification',
    icon: <AlertCircle className="h-4 w-4" />,
    color: 'text-cyan-500'
  },
  vague: {
    title: 'Vague Details',
    description: 'Lacks specific information that legitimate companies would include',
    icon: <AlertCircle className="h-4 w-4" />,
    color: 'text-pink-500'
  },
  invoice: {
    title: 'Fake Invoices',
    description: 'Bills for products or services you never purchased',
    icon: <FileText className="h-4 w-4" />,
    color: 'text-rose-500'
  },
  account: {
    title: 'Account Updates',
    description: 'Claims your account needs updating or verification',
    icon: <ShieldAlert className="h-4 w-4" />,
    color: 'text-emerald-500'
  },
  password: {
    title: 'Password Reset Scams',
    description: 'Claims your password needs to be reset when you didn\'t request it',
    icon: <Lock className="h-4 w-4" />,
    color: 'text-violet-500'
  },
  job: {
    title: 'Job Scams',
    description: 'Offers unrealistic job opportunities with high pay and little work',
    icon: <AlertTriangle className="h-4 w-4" />,
    color: 'text-fuchsia-500'
  },
  formatting: {
    title: 'Poor Formatting',
    description: 'Contains grammatical errors, excessive punctuation, or unusual formatting',
    icon: <AlertCircle className="h-4 w-4" />,
    color: 'text-slate-500'
  }
}

// Define the achievements
const achievements = [
  {
    id: 'first-catch',
    title: 'First Catch',
    description: 'Correctly identify your first phishing email',
    icon: <Shield className="h-5 w-5" />
  },
  {
    id: 'perfect-score',
    title: 'Perfect Defender',
    description: 'Score 100% on a round with at least 5 emails',
    icon: <ShieldAlert className="h-5 w-5" />
  },
  {
    id: 'speed-reader',
    title: 'Speed Reader',
    description: 'Correctly identify 3 emails in under 60 seconds',
    icon: <Clock className="h-5 w-5" />
  },
  {
    id: 'red-flag-expert',
    title: 'Red Flag Expert',
    description: 'Identify all red flags in 3 different phishing emails',
    icon: <AlertTriangle className="h-5 w-5" />
  },
  {
    id: 'master-defender',
    title: 'Master Defender',
    description: 'Complete all difficulty levels with at least 80% accuracy',
    icon: <Trophy className="h-5 w-5" />
  }
]

// Define difficulty levels
const difficultyLevels = [
  {
    id: 'beginner',
    name: 'Beginner',
    description: 'Start with obvious phishing emails',
    timeLimit: 60, // seconds per email
    emailCount: 5
  },
  {
    id: 'intermediate',
    name: 'Intermediate',
    description: 'More subtle phishing attempts',
    timeLimit: 45, // seconds per email
    emailCount: 7
  },
  {
    id: 'expert',
    name: 'Expert',
    description: 'Highly sophisticated phishing emails',
    timeLimit: 30, // seconds per email
    emailCount: 10
  }
]

// Game scene visualization component
export function PhishingGameScene({ gameState }) {
  return (
    <div className="w-full max-w-3xl h-40 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
      {gameState.status === 'playing' && (
        <div className="text-center">
          <div className="text-lg font-semibold">Analyzing Email...</div>
          <div className="text-sm text-gray-500">Look for suspicious elements</div>
        </div>
      )}
      {gameState.status === 'complete' && (
        <div className="text-center">
          <div className="text-lg font-semibold">Challenge Complete!</div>
          <div className="text-sm text-gray-500">
            Score: {gameState.score}/{gameState.emails.length}
          </div>
        </div>
      )}
      {gameState.status === 'intro' && (
        <div className="text-center">
          <div className="text-lg font-semibold">Ready to start?</div>
          <div className="text-sm text-gray-500">Test your phishing detection skills</div>
        </div>
      )}
    </div>
  )
}

// Main game component
export function PhishingGame() {
  // Game state
  const [gameState, setGameState] = useGameState({
    status: 'intro', // intro, playing, review, complete
    difficulty: 'beginner',
    currentEmailIndex: 0,
    emails: [],
    answers: [],
    score: 0,
    redFlagsFound: [],
    startTime: null,
    endTime: null
  })

  // Achievements
  const { achievements: earnedAchievements, addAchievement } = useAchievements('phishing-defender')
  const { triggerConfetti } = useConfetti()

  // Dialogs
  const [showInstructions, setShowInstructions] = useState(false)
  const [showAchievements, setShowAchievements] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackEmail, setFeedbackEmail] = useState(null)

  // Get current difficulty settings
  const currentDifficulty = difficultyLevels.find(d => d.id === gameState.difficulty)

  // Initialize game with random emails based on difficulty
  const startGame = () => {
    // Select random emails, ensuring some phishing and some legitimate
    const phishingEmails = phishingScenarios.filter(e => e.isPhishing)
    const legitimateEmails = phishingScenarios.filter(e => !e.isPhishing)
    
    // Shuffle and select based on difficulty
    const shuffledPhishing = [...phishingEmails].sort(() => Math.random() - 0.5)
    const shuffledLegitimate = [...legitimateEmails].sort(() => Math.random() - 0.5)
    
    // Ensure at least 1 legitimate email
    const selectedLegitimate = shuffledLegitimate.slice(0, Math.max(1, Math.floor(currentDifficulty.emailCount * 0.2)))
    const selectedPhishing = shuffledPhishing.slice(0, currentDifficulty.emailCount - selectedLegitimate.length)
    
    // Combine and shuffle again
    const selectedEmails = [...selectedPhishing, ...selectedLegitimate].sort(() => Math.random() - 0.5)
    
    setGameState({
      status: 'playing',
      emails: selectedEmails,
      answers: Array(selectedEmails.length).fill(null),
      redFlagsFound: Array(selectedEmails.length).fill([]),
      currentEmailIndex: 0,
      score: 0,
      startTime: Date.now()
    })
  }

  // Handle user's answer (phishing or legitimate)
  const handleAnswer = (isPhishing) => {
    const { currentEmailIndex, emails, answers } = gameState
    const currentEmail = emails[currentEmailIndex]
    
    // Record answer
    const newAnswers = [...answers]
    newAnswers[currentEmailIndex] = isPhishing
    
    // Check if answer is correct
    const isCorrect = isPhishing === currentEmail.isPhishing
    
    // Update score
    let newScore = gameState.score
    if (isCorrect) newScore += 1
    
    // Check for achievements
    checkAchievements(isCorrect)
    
    // Move to next email or end game
    if (currentEmailIndex < emails.length - 1) {
      setGameState({
        answers: newAnswers,
        currentEmailIndex: currentEmailIndex + 1,
        score: newScore
      })
    } else {
      // Game complete
      setGameState({
        status: 'complete',
        answers: newAnswers,
        score: newScore,
        endTime: Date.now()
      })
      
      // Check for perfect score achievement
      if (newScore === emails.length && emails.length >= 5) {
        const achieved = addAchievement('perfect-score')
        if (achieved) triggerConfetti()
      }
      
      // Check for master defender achievement
      const accuracy = newScore / emails.length
      if (accuracy >= 0.8) {
        // Track completed difficulties in localStorage
        const completedDifficulties = JSON.parse(localStorage.getItem('phishing-completed-difficulties') || '[]')
        if (!completedDifficulties.includes(gameState.difficulty)) {
          completedDifficulties.push(gameState.difficulty)
          localStorage.setItem('phishing-completed-difficulties', JSON.stringify(completedDifficulties))
          
          // If all difficulties completed with 80%+ accuracy
          if (completedDifficulties.length === difficultyLevels.length) {
            const achieved = addAchievement('master-defender')
            if (achieved) triggerConfetti()
          }
        }
      }
    }
  }

  // Handle identifying red flags
  const handleFlagIdentified = (flagId) => {
    const { currentEmailIndex, redFlagsFound } = gameState
    
    // Add flag to identified list if not already there
    if (!redFlagsFound[currentEmailIndex].includes(flagId)) {
      const newRedFlagsFound = [...redFlagsFound]
      newRedFlagsFound[currentEmailIndex] = [...newRedFlagsFound[currentEmailIndex], flagId]
      setGameState({ redFlagsFound: newRedFlagsFound })
      
      // Check for red flag expert achievement
      const emailsWithAllFlags = newRedFlagsFound.filter((flags, index) => {
        const email = gameState.emails[index]
        return email.isPhishing && flags.length === email.redFlags.length
      })
      
      if (emailsWithAllFlags.length >= 3) {
        const achieved = addAchievement('red-flag-expert')
        if (achieved) triggerConfetti()
      }
    }
  }

  // Check for achievements based on gameplay
  const checkAchievements = (isCorrect) => {
    if (isCorrect) {
      // First catch achievement
      const achieved = addAchievement('first-catch')
      if (achieved) triggerConfetti()
      
      // Speed reader achievement
      const correctAnswers = gameState.answers.filter((answer, index) => 
        answer === gameState.emails[index].isPhishing
      ).length
      
      if (correctAnswers >= 2) { // This will be 3 with the current correct answer
        const timeElapsed = (Date.now() - gameState.startTime) / 1000
        if (timeElapsed < 60) {
          const achieved = addAchievement('speed-reader')
          if (achieved) triggerConfetti()
        }
      }
    }
  }

  // Reset game
  const resetGame = () => {
    setGameState({
      status: 'intro',
      difficulty: gameState.difficulty,
      currentEmailIndex: 0,
      emails: [],
      answers: [],
      score: 0,
      redFlagsFound: [],
      startTime: null,
      endTime: null
    })
  }

  // Show feedback for a specific email
  const showEmailFeedback = (index) => {
    setFeedbackEmail(gameState.emails[index])
    setShowFeedback(true)
  }

  // Calculate accuracy percentage
  const calculateAccuracy = () => {
    const { answers, emails } = gameState
    const correctAnswers = answers.filter((answer, index) => answer === emails[index].isPhishing).length
    return Math.round((correctAnswers / emails.length) * 100)
  }

  // Calculate time taken
  const calculateTimeTaken = () => {
    const { startTime, endTime } = gameState
    if (!startTime || !endTime) return 0
    return Math.round((endTime - startTime) / 1000)
  }

  // Render current email content
  const renderEmailContent = () => {
    if (gameState.status !== 'playing' || gameState.emails.length === 0) return null
    
    const currentEmail = gameState.emails[gameState.currentEmailIndex]
    
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{currentEmail.subject}</CardTitle>
              <CardDescription>From: {currentEmail.sender}</CardDescription>
              <CardDescription>Date: {currentEmail.date}</CardDescription>
            </div>
            <Badge variant="outline">{gameState.currentEmailIndex + 1}/{gameState.emails.length}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="whitespace-pre-line bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
            {currentEmail.content}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="w-full flex justify-between">
            <Button 
              variant="destructive" 
              onClick={() => handleAnswer(true)}
              className="flex items-center gap-2"
            >
              <ShieldAlert className="h-4 w-4" />
              Phishing
            </Button>
            <Button 
              variant="default" 
              onClick={() => handleAnswer(false)}
              className="flex items-center gap-2"
            >
              <Shield className="h-4 w-4" />
              Legitimate
            </Button>
          </div>
        </CardFooter>
      </Card>
    )
  }

  // Render game results
  const renderResults = () => {
    if (gameState.status !== 'complete') return null
    
    const accuracy = calculateAccuracy()
    const timeTaken = calculateTimeTaken()
    
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Game Results</CardTitle>
          <CardDescription>
            Difficulty: {currentDifficulty.name} | Time: {timeTaken} seconds
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-4xl font-bold">{accuracy}%</div>
            <div className="text-sm text-gray-500">Accuracy</div>
          </div>
          
          <Progress value={accuracy} className="h-2" />
          
          <div className="text-center">
            <div className="text-2xl font-bold">{gameState.score}/{gameState.emails.length}</div>
            <div className="text-sm text-gray-500">Correct Answers</div>
          </div>
          
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Email Review:</h3>
            <div className="space-y-2">
              {gameState.emails.map((email, index) => {
                const userAnswer = gameState.answers[index]
                const isCorrect = userAnswer === email.isPhishing
                
                return (
                  <div 
                    key={index} 
                    className={`p-3 rounded-md flex justify-between items-center ${
                      isCorrect ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {isCorrect ? 
                        <CheckCircle className="h-5 w-5 text-green-500" /> : 
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      }
                      <div className="truncate max-w-md">
                        <div className="font-medium truncate">{email.subject}</div>
                        <div className="text-sm text-gray-500 truncate">
                          {email.isPhishing ? 'Phishing' : 'Legitimate'}
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => showEmailFeedback(index)}
                    >
                      Details
                    </Button>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={resetGame}>
            New Game
          </Button>
          <Button onClick={() => setShowAchievements(true)}>
            View Achievements
          </Button>
        </CardFooter>
      </Card>
    )
  }

  // Render game introduction
  const renderIntro = () => {
    if (gameState.status !== 'intro') return null
    
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Phishing Defender Challenge</CardTitle>
          <CardDescription>
            Test your ability to identify phishing emails and protect yourself online
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            In this challenge, you'll review a series of emails and determine which ones are legitimate 
            and which are phishing attempts designed to steal your information.
          </p>
          
          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-md">
            <h3 className="font-semibold flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              What is phishing?
            </h3>
            <p className="text-sm mt-1">
              Phishing is a type of online scam where criminals send emails that appear to be from 
              legitimate companies to steal your personal information or install malware.
            </p>
          </div>
          
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Select Difficulty:</h3>
            <Tabs 
              defaultValue={gameState.difficulty}
              onValueChange={(value) => setGameState({ difficulty: value })}
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 mb-4">
                {difficultyLevels.map(level => (
                  <TabsTrigger key={level.id} value={level.id}>
                    {level.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {difficultyLevels.map(level => (
                <TabsContent key={level.id} value={level.id} className="space-y-2">
                  <div className="text-sm">
                    <p>{level.description}</p>
                    <ul className="mt-2 space-y-1">
                      <li>• {level.emailCount} emails to review</li>
                      <li>• {level.timeLimit} seconds per email</li>
                    </ul>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setShowInstructions(true)}>
            How to Play
          </Button>
          <Button onClick={startGame}>
            Start Challenge
          </Button>
        </CardFooter>
      </Card>
    )
  }

  // Render instructions dialog
  const renderInstructionsDialog = () => {
    return (
      <Dialog open={showInstructions} onOpenChange={setShowInstructions}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>How to Identify Phishing Emails</DialogTitle>
            <DialogDescription>
              Look for these common red flags in suspicious emails
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {Object.entries(phishingTypes).slice(0, 8).map(([key, type]) => (
              <Alert key={key} variant="outline">
                <div className={`${type.color} mr-2`}>
                  {type.icon}
                </div>
                <AlertTitle>{type.title}</AlertTitle>
                <AlertDescription>
                  {type.description}
                </AlertDescription>
              </Alert>
            ))}
          </div>
          
          <DialogFooter className="mt-4">
            <Button onClick={() => setShowInstructions(false)}>
              Got it
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  // Render achievements dialog
  const renderAchievementsDialog = () => {
    return (
      <Dialog open={showAchievements} onOpenChange={setShowAchievements}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Your Achievements</DialogTitle>
            <DialogDescription>
              Track your progress as a phishing defender
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            {achievements.map(achievement => {
              const isEarned = earnedAchievements.includes(achievement.id)
              
              return (
                <div 
                  key={achievement.id}
                  className={`p-3 rounded-md border ${
                    isEarned ? 'border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-900' : 
                    'border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`${isEarned ? 'text-green-500' : 'text-gray-400'}`}>
                      {achievement.icon}
                    </div>
                    <div>
                      <div className="font-medium">{achievement.title}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {achievement.description}
                      </div>
                    </div>
                    {isEarned && (
                      <CheckCircle className="h-5 w-5 text-green-500 ml-auto" />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
          
          <DialogFooter className="mt-4">
            <Button onClick={() => setShowAchievements(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  // Render email feedback dialog
  const renderFeedbackDialog = () => {
    if (!feedbackEmail) return null
    
    return (
      <Dialog open={showFeedback} onOpenChange={setShowFeedback}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {feedbackEmail.isPhishing ? (
                <span className="flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-red-500" />
                  Phishing Email Detected
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  Legitimate Email
                </span>
              )}
            </DialogTitle>
            <DialogDescription>
              {feedbackEmail.subject}
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4 space-y-4">
            {feedbackEmail.isPhishing ? (
              <>
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-md">
                  <h3 className="font-semibold">Why this is a phishing attempt:</h3>
                  <p className="mt-1">{feedbackEmail.explanation}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Red Flags:</h3>
                  <div className="space-y-2">
                    {feedbackEmail.redFlags.map(flag => {
                      const flagType = phishingTypes[flag.type]
                      
                      return (
                        <div key={flag.id} className="flex items-start gap-2">
                          <div className={`${flagType.color} mt-0.5`}>
                            {flagType.icon}
                          </div>
                          <div>
                            <div className="font-medium">{flagType.title}</div>
                            <div className="text-sm">{flag.text}</div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md">
                <h3 className="font-semibold">Why this is legitimate:</h3>
                <p className="mt-1">{feedbackEmail.explanation}</p>
              </div>
            )}
          </div>
          
          <DialogFooter className="mt-4">
            <Button onClick={() => setShowFeedback(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  // Main render
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col items-center space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Phishing Defender</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Learn to identify and avoid phishing attempts
          </p>
        </div>
        
        {/* Game scene visualization */}
        <PhishingGameScene gameState={gameState} />
        
        {/* Game content based on state */}
        {renderIntro()}
        {renderEmailContent()}
        {renderResults()}
        
        {/* Dialogs */}
        {renderInstructionsDialog()}
        {renderAchievementsDialog()}
        {renderFeedbackDialog()}
      </div>
    </div>
  )
}
