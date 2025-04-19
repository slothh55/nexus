'use client'

import React, { useState, useEffect } from 'react'
import { GameCanvas } from '../shared/GameCanvas'
import { LoadingScreen } from '../shared/LoadingScreen'
import { useGameState, useGameTimer, formatTime } from '@/lib/game-utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Shield, Mail, AlertTriangle, CheckCircle, XCircle, Trophy, Clock } from 'lucide-react'
import { PhishingGameScene } from './PhishingGameScene'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'

// Game state type
interface GameState {
  started: boolean
  over: boolean
  score: number
  lives: number
  level: number
  currentEmail: number
  emailsPlayed: number[]
  showFeedback: boolean
  lastAnswerCorrect: boolean
  showInstructions: boolean
  showGameOver: boolean
  selectedElements: string[]
}

// Email data type
export interface PhishingEmail {
  id: number
  sender: string
  subject: string
  content: string
  phishingElements: {
    id: string
    type: 'sender' | 'subject' | 'link' | 'attachment' | 'urgency' | 'grammar'
    description: string
  }[]
  isPhishing: boolean
  explanation: string
}

// Sample emails data
const phishingEmails: PhishingEmail[] = [
  {
    id: 1,
    sender: "amazonsupport@amazn-secure.com",
    subject: "URGENT: Your Amazon account has been locked!",
    content: "Dear Customer, We have detected suspicious activity on your account. Your account has been locked for security reasons. Click here to verify your information and unlock your account immediately: [Secure-Link]",
    phishingElements: [
      { id: "sender1", type: "sender", description: "The sender email is not from an official Amazon domain" },
      { id: "urgency1", type: "urgency", description: "Creates false urgency to make you act quickly without thinking" },
      { id: "link1", type: "link", description: "The link is suspicious and not an official Amazon URL" }
    ],
    isPhishing: true,
    explanation: "This is a phishing email trying to trick you into giving away your Amazon login information. Real companies don't use urgency tactics like this, and the sender email is suspicious."
  },
  {
    id: 2,
    sender: "support@netflix.com",
    subject: "Your Netflix subscription has been renewed",
    content: "Hello, This email confirms that your Netflix subscription has been renewed for another month. Your next billing date will be May 15, 2023. If you have any questions about your account, please visit netflix.com/help. Thank you for being a Netflix member!",
    phishingElements: [],
    isPhishing: false,
    explanation: "This is a legitimate email from Netflix. It comes from an official Netflix email address, doesn't ask you to click any links, and doesn't create false urgency."
  },
  {
    id: 3,
    sender: "bankofamerica@secure-banking.com",
    subject: "Action Required: Unusual Activity Detected",
    content: "Dear Valued Customer, We have detected unusual activity on your Bank of America account. To prevent unauthorized access, please verify your identity by clicking the link below and entering your account details: [Secure-Verification-Link]. Failure to verify within 24 hours will result in account suspension.",
    phishingElements: [
      { id: "sender3", type: "sender", description: "The sender email is not from an official Bank of America domain" },
      { id: "urgency3", type: "urgency", description: "Creates false urgency with a threat of account suspension" },
      { id: "link3", type: "link", description: "The link is suspicious and asking for your account details" }
    ],
    isPhishing: true,
    explanation: "This is a phishing email. Bank of America would never send emails from a domain like 'secure-banking.com'. Also, legitimate banks don't threaten to suspend your account if you don't click a link in an email."
  },
  {
    id: 4,
    sender: "no-reply@google.com",
    subject: "Security alert for your Google Account",
    content: "A new sign-in on Windows. We noticed a new sign-in to your Google Account on a Windows device. If this was you, you don't need to do anything. If not, we'll help you secure your account.",
    phishingElements: [],
    isPhishing: false,
    explanation: "This is a legitimate security alert from Google. It comes from an official Google email address, doesn't ask you to click any suspicious links, and is informational rather than creating panic."
  },
  {
    id: 5,
    sender: "appleid@apple-support.net",
    subject: "Your Apple ID has been locked for security reasons",
    content: "Dear Customer, Your Apple ID has been locked due to too many failed login attempts. To unlock your account, please confirm your payment details here: [Secure-Link]. Failure to verify will result in permanent account deletion.",
    phishingElements: [
      { id: "sender5", type: "sender", description: "The sender email is not from an official Apple domain" },
      { id: "urgency5", type: "urgency", description: "Creates false urgency with a threat of account deletion" },
      { id: "link5", type: "link", description: "Asking for payment details is suspicious" }
    ],
    isPhishing: true,
    explanation: "This is a phishing email. Apple never sends emails from domains like 'apple-support.net'. Also, Apple would never ask for payment details via email to unlock your account."
  }
];

export function PhishingGame() {
  // Game state
  const [state, updateState] = useGameState<GameState>({
    started: false,
    over: false,
    score: 0,
    lives: 3,
    level: 1,
    currentEmail: 0,
    emailsPlayed: [],
    showFeedback: false,
    lastAnswerCorrect: false,
    showInstructions: true,
    showGameOver: false,
    selectedElements: []
  });

  // Timer
  const { timeLeft, startTimer, pauseTimer, resetTimer } = useGameTimer(45, () => {
    handleTimeUp();
  });

  // Loading state
  const [loading, setLoading] = useState(true);

  // Simulate asset loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Current email
  const currentEmail = phishingEmails[state.currentEmail];

  // Start game
  const startGame = () => {
    // Get a random email that hasn't been played yet
    const availableEmails = phishingEmails.filter(email => !state.emailsPlayed.includes(email.id));
    const randomIndex = Math.floor(Math.random() * availableEmails.length);
    const newEmailIndex = phishingEmails.findIndex(email => email.id === availableEmails[randomIndex].id);

    updateState({
      started: true,
      over: false,
      score: 0,
      lives: 3,
      level: 1,
      currentEmail: newEmailIndex,
      emailsPlayed: [availableEmails[randomIndex].id],
      showFeedback: false,
      lastAnswerCorrect: false,
      showInstructions: false,
      showGameOver: false,
      selectedElements: []
    });

    resetTimer();
    startTimer();
  };

  // Handle element selection
  const handleElementSelect = (elementId: string) => {
    if (state.showFeedback) return;

    const newSelectedElements = [...state.selectedElements];
    const index = newSelectedElements.indexOf(elementId);

    if (index === -1) {
      newSelectedElements.push(elementId);
    } else {
      newSelectedElements.splice(index, 1);
    }

    updateState({ selectedElements: newSelectedElements });
  };

  // Handle email verification
  const handleVerifyEmail = (isPhishing: boolean) => {
    pauseTimer();

    const isCorrect = currentEmail.isPhishing === isPhishing;

    // Check if all phishing elements were found (if it's a phishing email)
    let allElementsFound = true;
    if (currentEmail.isPhishing) {
      const requiredElements = currentEmail.phishingElements.map(el => el.id);
      allElementsFound = requiredElements.every(id => state.selectedElements.includes(id));
    }

    // Calculate score
    let scoreIncrease = 0;
    if (isCorrect) {
      scoreIncrease = 10; // Base score for correct classification

      if (currentEmail.isPhishing && allElementsFound) {
        scoreIncrease += 5; // Bonus for finding all elements
      }

      // Time bonus (more time left = more points)
      scoreIncrease += Math.floor(timeLeft / 5);
    }

    // Update state
    updateState({
      score: state.score + scoreIncrease,
      lives: isCorrect ? state.lives : state.lives - 1,
      showFeedback: true,
      lastAnswerCorrect: isCorrect
    });

    // Check if game over
    if (!isCorrect && state.lives <= 1) {
      updateState({
        over: true,
        showGameOver: true
      });
    }
  };

  // Handle time up
  const handleTimeUp = () => {
    updateState({
      lives: state.lives - 1,
      showFeedback: true,
      lastAnswerCorrect: false
    });

    // Check if game over
    if (state.lives <= 1) {
      updateState({
        over: true,
        showGameOver: true
      });
    }
  };

  // Next email
  const nextEmail = () => {
    // Get a random email that hasn't been played yet
    const availableEmails = phishingEmails.filter(email => !state.emailsPlayed.includes(email.id));

    // If all emails have been played, reset the played list
    if (availableEmails.length === 0) {
      updateState({
        emailsPlayed: [],
        level: state.level + 1
      });
      return nextEmail();
    }

    const randomIndex = Math.floor(Math.random() * availableEmails.length);
    const newEmailIndex = phishingEmails.findIndex(email => email.id === availableEmails[randomIndex].id);

    updateState({
      currentEmail: newEmailIndex,
      emailsPlayed: [...state.emailsPlayed, availableEmails[randomIndex].id],
      showFeedback: false,
      selectedElements: []
    });

    resetTimer();
    startTimer();
  };

  if (loading) {
    return <LoadingScreen progress={75} message="Loading Phishing Defender..." />;
  }

  return (
    <div className="space-y-4">
      {/* Game header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Shield className="h-8 w-8 text-red-500" />
            Phishing Defender
          </h1>
          <p className="text-muted-foreground mt-2">
            Protect your inbox! Identify phishing emails and their suspicious elements.
          </p>
        </div>

        {state.started && !state.over && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              <span className="text-xl font-bold">{state.score}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <span className="text-xl font-bold">{formatTime(timeLeft)}</span>
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: state.lives }).map((_, i) => (
                <Shield key={i} className="h-5 w-5 text-red-500 fill-red-500" />
              ))}
              {Array.from({ length: 3 - state.lives }).map((_, i) => (
                <Shield key={i + state.lives} className="h-5 w-5 text-gray-300" />
              ))}
            </div>
            <Badge variant="outline" className="bg-gradient-to-r from-red-500 to-orange-500 text-white">
              Level {state.level}
            </Badge>
          </div>
        )}
      </div>

      {/* Game content */}
      {!state.started ? (
        <Card className="overflow-hidden">
          <div className="h-2 w-full bg-gradient-to-r from-red-500 to-orange-500"></div>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-red-500/10 p-2">
                <Shield className="h-5 w-5 text-red-500" />
              </div>
              <CardTitle>Phishing Defender</CardTitle>
            </div>
            <CardDescription>
              Help protect your friends from dangerous phishing emails! Learn to spot the warning signs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-lg overflow-hidden bg-muted/30 aspect-video">
                <GameCanvas controls={false} background="#f8fafc">
                  <PhishingGameScene
                    demoMode={true}
                    currentEmail={phishingEmails[0]}
                    selectedElements={[]}
                    onElementSelect={() => {}}
                  />
                </GameCanvas>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">How to Play:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-blue-500" />
                    Examine emails in your inbox
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    Click on suspicious elements to identify them
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-red-500" />
                    Decide if an email is safe or phishing
                  </li>
                  <li className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-amber-500" />
                    Earn points for correct answers and finding all suspicious elements
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
      ) : (
        <Card className="overflow-hidden">
          <div className="h-2 w-full bg-gradient-to-r from-red-500 to-orange-500"></div>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Game Scene */}
              <div className="rounded-lg overflow-hidden bg-muted/30 aspect-video lg:aspect-auto">
                <GameCanvas controls={false} background="#f8fafc">
                  <PhishingGameScene
                    currentEmail={currentEmail}
                    selectedElements={state.selectedElements}
                    onElementSelect={handleElementSelect}
                  />
                </GameCanvas>
              </div>

              {/* Email Details */}
              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg border p-4 space-y-3">
                  <div className="flex justify-between">
                    <div>
                      <div className="text-sm text-muted-foreground">From:</div>
                      <div className="font-medium">{currentEmail.sender}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Subject:</div>
                      <div className="font-medium">{currentEmail.subject}</div>
                    </div>
                  </div>
                  <div className="border-t pt-3">
                    <div className="text-sm">{currentEmail.content}</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 border-green-500 text-green-500 hover:bg-green-50 hover:text-green-600"
                    onClick={() => handleVerifyEmail(false)}
                    disabled={state.showFeedback}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Safe Email
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
                    onClick={() => handleVerifyEmail(true)}
                    disabled={state.showFeedback}
                  >
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Phishing Email
                  </Button>
                </div>

                {/* Selected Elements */}
                {currentEmail.phishingElements.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium mb-2">Suspicious Elements Found:</h3>
                    <div className="flex flex-wrap gap-2">
                      {currentEmail.phishingElements.map(element => (
                        <Badge
                          key={element.id}
                          variant={state.selectedElements.includes(element.id) ? "default" : "outline"}
                          className={state.selectedElements.includes(element.id) ? "bg-amber-500" : ""}
                        >
                          {element.type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Feedback */}
                {state.showFeedback && (
                  <div className={`rounded-lg p-4 ${state.lastAnswerCorrect ? 'bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-800' : 'bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800'}`}>
                    <div className="flex items-start">
                      {state.lastAnswerCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                      )}
                      <div>
                        <h3 className={`font-medium ${state.lastAnswerCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                          {state.lastAnswerCorrect ? 'Correct!' : 'Oops! That\'s not right.'}
                        </h3>
                        <p className="text-sm mt-1">{currentEmail.explanation}</p>
                        <Button
                          className={`mt-3 ${state.lastAnswerCorrect ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
                          onClick={nextEmail}
                        >
                          Next Email
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Game Over Dialog */}
      <Dialog open={state.showGameOver} onOpenChange={(open) => updateState({ showGameOver: open })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              Game Over!
            </DialogTitle>
            <DialogDescription>
              You've completed the Phishing Defender challenge!
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="text-center py-4">
              <div className="text-5xl font-bold text-amber-500 mb-2">{state.score}</div>
              <div className="text-muted-foreground">Final Score</div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-muted/30 rounded-lg p-3">
                <div className="text-2xl font-bold">{state.level}</div>
                <div className="text-sm text-muted-foreground">Level Reached</div>
              </div>
              <div className="bg-muted/30 rounded-lg p-3">
                <div className="text-2xl font-bold">{state.emailsPlayed.length}</div>
                <div className="text-sm text-muted-foreground">Emails Analyzed</div>
              </div>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="flex-1" onClick={() => updateState({ showGameOver: false })}>
              Close
            </Button>
            <Button className="flex-1 bg-gradient-to-r from-red-500 to-orange-500" onClick={startGame}>
              Play Again
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
