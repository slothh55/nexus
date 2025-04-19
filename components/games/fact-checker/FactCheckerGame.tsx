'use client'

import React, { useState, useEffect } from 'react'
import { GameCanvas } from '../shared/GameCanvas'
import { LoadingScreen } from '../shared/LoadingScreen'
import { useGameState, useGameTimer, formatTime } from '@/lib/game-utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Brain, Search, CheckCircle, XCircle, Trophy, Clock, ThumbsUp, ThumbsDown, Sparkles } from 'lucide-react'
import { FactCheckerScene } from './FactCheckerScene'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Game state type
interface GameState {
  started: boolean
  over: boolean
  score: number
  lives: number
  level: number
  currentClaimIndex: number
  claimsPlayed: number[]
  showFeedback: boolean
  lastAnswerCorrect: boolean
  showInstructions: boolean
  showGameOver: boolean
  userVerdict: boolean | null
  activeTab: string
}

// Claim data type
export interface FactClaim {
  id: number
  claim: string
  isTrue: boolean
  explanation: string
  evidence: {
    source: string
    url: string
    reliability: number
    quote: string
    type: 'scientific' | 'educational' | 'news' | 'blog' | 'social'
  }[]
  difficulty: 'easy' | 'medium' | 'hard'
  category: string
  relatedTruth: string
}

// Sample claims data
const factClaims: FactClaim[] = [
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
        source: "Banana Facts Website",
        url: "https://www.bananafacts.org/",
        reliability: 85,
        quote: "The banana plant is the largest herbaceous flowering plant in the world, not a tree.",
        type: "educational",
      },
      {
        source: "Fruit Blog",
        url: "https://fruitblog.example.com/",
        reliability: 60,
        quote: "Bananas are delicious tropical fruits that grow on tall banana trees in warm climates.",
        type: "blog",
      },
    ],
    difficulty: "easy",
    category: "Botany",
    relatedTruth: "Bananas grow on large herbaceous plants that can reach up to 25 feet tall.",
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
    claim: "A dog's mouth is cleaner than a human's mouth.",
    isTrue: false,
    explanation:
      "This is a common misconception. Dogs' mouths contain different types of bacteria than human mouths, but they are not cleaner. In fact, dogs' mouths can harbor bacteria that can be harmful to humans. Both human and dog mouths contain hundreds of different bacterial species.",
    evidence: [
      {
        source: "American Kennel Club",
        url: "https://www.akc.org/",
        reliability: 90,
        quote:
          "The bacteria in a dog's mouth are different from the bacteria in a human's mouth. Dogs' mouths aren't necessarily cleaner than human mouths.",
        type: "educational",
      },
      {
        source: "Journal of Oral Microbiology",
        url: "https://www.tandfonline.com/toc/zjom20/current",
        reliability: 98,
        quote:
          "Studies have shown that dogs carry specific types of bacteria in their mouths that humans don't typically have, and vice versa. Neither can be considered 'cleaner' in absolute terms.",
        type: "scientific",
      },
      {
        source: "Pet Health Blog",
        url: "https://pethealthblog.example.com/",
        reliability: 65,
        quote:
          "Dogs' mouths are much cleaner than humans', which is why they can lick their wounds without getting infections.",
        type: "blog",
      },
    ],
    difficulty: "medium",
    category: "Biology",
    relatedTruth:
      "Both dog and human mouths contain hundreds of bacterial species, many of which are specific to each species.",
  },
  {
    id: 4,
    claim: "Water conducts electricity.",
    isTrue: false,
    explanation:
      "Pure water (H2O) is actually an insulator and does not conduct electricity well. What conducts electricity is the impurities in water, such as dissolved salts and minerals. These impurities break down into ions that can carry an electric current through the water.",
    evidence: [
      {
        source: "American Chemical Society",
        url: "https://www.acs.org/",
        reliability: 98,
        quote:
          "Pure water is not a good conductor of electricity. It's the impurities in water, such as dissolved salts, that conduct electricity.",
        type: "scientific",
      },
      {
        source: "Khan Academy",
        url: "https://www.khanacademy.org/",
        reliability: 95,
        quote:
          "Distilled water is a poor conductor of electricity because it doesn't contain dissolved ions. Tap water conducts electricity due to dissolved minerals and salts.",
        type: "educational",
      },
      {
        source: "Science Facts",
        url: "https://sciencefacts.example.com/",
        reliability: 75,
        quote: "Water is a good conductor of electricity, which is why you should never use electrical appliances near water.",
        type: "blog",
      },
    ],
    difficulty: "hard",
    category: "Physics",
    relatedTruth:
      "Pure water is a poor conductor of electricity, but tap water and seawater conduct electricity well due to dissolved minerals and salts.",
  },
  {
    id: 5,
    claim: "Humans only use 10% of their brains.",
    isTrue: false,
    explanation:
      "This is a persistent myth with no scientific basis. Modern brain scans have shown that all parts of the brain have active functions, and while not all neurons fire simultaneously, over the course of a day, a person uses virtually all of their brain. Different activities activate different parts of the brain, but there is no 'unused' 90%.",
    evidence: [
      {
        source: "Scientific American",
        url: "https://www.scientificamerican.com/",
        reliability: 95,
        quote:
          "The 10% myth is demonstrably false. Brain scans clearly show activity throughout the entire brain, even during sleep.",
        type: "scientific",
      },
      {
        source: "Neurological Society of America",
        url: "https://www.example-neurology.org/",
        reliability: 97,
        quote:
          "Functional MRI studies demonstrate that even simple tasks activate multiple brain regions, and no area of the brain is completely inactive during normal consciousness.",
        type: "scientific",
      },
      {
        source: "Mind Power Blog",
        url: "https://mindpower.example.com/",
        reliability: 40,
        quote:
          "Humans only use 10% of their brain capacity. Imagine what we could achieve if we unlocked the other 90%!",
        type: "blog",
      },
    ],
    difficulty: "medium",
    category: "Neuroscience",
    relatedTruth:
      "Humans use all parts of their brain, though not all at the same time. Different activities activate different regions of the brain.",
  }
];

export function FactCheckerGame() {
  // Game state
  const [state, updateState] = useGameState<GameState>({
    started: false,
    over: false,
    score: 0,
    lives: 3,
    level: 1,
    currentClaimIndex: 0,
    claimsPlayed: [],
    showFeedback: false,
    lastAnswerCorrect: false,
    showInstructions: true,
    showGameOver: false,
    userVerdict: null,
    activeTab: 'claim'
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

  // Current claim
  const currentClaim = factClaims[state.currentClaimIndex];

  // Start game
  const startGame = () => {
    // Get a random claim that hasn't been played yet
    const availableClaims = factClaims.filter(claim => !state.claimsPlayed.includes(claim.id));
    const randomIndex = Math.floor(Math.random() * availableClaims.length);
    const newClaimIndex = factClaims.findIndex(claim => claim.id === availableClaims[randomIndex].id);

    updateState({
      started: true,
      over: false,
      score: 0,
      lives: 3,
      level: 1,
      currentClaimIndex: newClaimIndex,
      claimsPlayed: [availableClaims[randomIndex].id],
      showFeedback: false,
      lastAnswerCorrect: false,
      showInstructions: false,
      showGameOver: false,
      userVerdict: null,
      activeTab: 'claim'
    });

    resetTimer();
    startTimer();
  };

  // Handle verdict selection
  const handleVerdict = (verdict: boolean) => {
    pauseTimer();

    const isCorrect = currentClaim.isTrue === verdict;

    // Calculate score
    let scoreIncrease = 0;
    if (isCorrect) {
      scoreIncrease = 10; // Base score for correct classification

      // Time bonus (more time left = more points)
      scoreIncrease += Math.floor(timeLeft / 5);

      // Difficulty bonus
      if (currentClaim.difficulty === 'medium') scoreIncrease += 5;
      if (currentClaim.difficulty === 'hard') scoreIncrease += 10;
    }

    // Update state
    updateState({
      score: state.score + scoreIncrease,
      lives: isCorrect ? state.lives : state.lives - 1,
      showFeedback: true,
      lastAnswerCorrect: isCorrect,
      userVerdict: verdict
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
      lastAnswerCorrect: false,
      userVerdict: null
    });

    // Check if game over
    if (state.lives <= 1) {
      updateState({
        over: true,
        showGameOver: true
      });
    }
  };

  // Next claim
  const nextClaim = () => {
    // Get a random claim that hasn't been played yet
    const availableClaims = factClaims.filter(claim => !state.claimsPlayed.includes(claim.id));

    // If all claims have been played, reset the played list
    if (availableClaims.length === 0) {
      updateState({
        claimsPlayed: [],
        level: state.level + 1
      });
      return nextClaim();
    }

    const randomIndex = Math.floor(Math.random() * availableClaims.length);
    const newClaimIndex = factClaims.findIndex(claim => claim.id === availableClaims[randomIndex].id);

    updateState({
      currentClaimIndex: newClaimIndex,
      claimsPlayed: [...state.claimsPlayed, availableClaims[randomIndex].id],
      showFeedback: false,
      userVerdict: null,
      activeTab: 'claim'
    });

    resetTimer();
    startTimer();
  };

  // Handle tab change
  const handleTabChange = (value: string) => {
    updateState({ activeTab: value });
  };

  if (loading) {
    return <LoadingScreen progress={75} message="Loading Fact Checker Challenge..." />;
  }

  return (
    <div className="space-y-4">
      {/* Game header */}
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
                <Brain key={i} className="h-5 w-5 text-blue-500 fill-blue-500" />
              ))}
              {Array.from({ length: 3 - state.lives }).map((_, i) => (
                <Brain key={i + state.lives} className="h-5 w-5 text-gray-300" />
              ))}
            </div>
            <Badge variant="outline" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              Level {state.level}
            </Badge>
          </div>
        )}
      </div>

      {/* Game content */}
      {!state.started ? (
        <Card className="overflow-hidden">
          <div className="h-2 w-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-blue-500/10 p-2">
                <Brain className="h-5 w-5 text-blue-500" />
              </div>
              <CardTitle>Fact Checker Challenge</CardTitle>
            </div>
            <CardDescription>
              Test your fact-checking skills in this exciting game! Can you tell what's true and what's false?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-lg overflow-hidden bg-muted/30 aspect-video">
                <GameCanvas controls={false} background="#f8fafc">
                  <FactCheckerScene
                    demoMode={true}
                    currentClaim={factClaims[0]}
                    userVerdict={null}
                    onVerdictSelect={() => {}}
                  />
                </GameCanvas>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">How to Play:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Brain className="h-4 w-4 text-blue-500" />
                    Examine claims in the magical library
                  </li>
                  <li className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-purple-500" />
                    Research the evidence using magical tools
                  </li>
                  <li className="flex items-center gap-2">
                    <ThumbsUp className="h-4 w-4 text-green-500" />
                    Decide if a claim is true or false
                  </li>
                  <li className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-amber-500" />
                    Earn points for correct answers
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={startGame}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              Start Game
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <div className="h-2 w-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Game Scene */}
              <div className="rounded-lg overflow-hidden bg-muted/30 aspect-video lg:aspect-auto">
                <GameCanvas controls={false} background="#f8fafc">
                  <FactCheckerScene
                    currentClaim={currentClaim}
                    userVerdict={state.userVerdict}
                    onVerdictSelect={handleVerdict}
                  />
                </GameCanvas>
              </div>

              {/* Claim Details */}
              <div className="space-y-4">
                <Tabs value={state.activeTab} onValueChange={handleTabChange} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="claim">Claim</TabsTrigger>
                    <TabsTrigger value="evidence">Evidence</TabsTrigger>
                  </TabsList>

                  <TabsContent value="claim" className="space-y-4 mt-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg border p-4">
                      <h3 className="font-medium text-lg mb-2">The Claim:</h3>
                      <p className="text-lg">{currentClaim.claim}</p>
                      <div className="mt-4 flex items-center gap-1">
                        <Badge variant="outline">{currentClaim.category}</Badge>
                        <Badge variant="outline" className={
                          currentClaim.difficulty === 'easy' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
                          currentClaim.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300' :
                          'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                        }>
                          {currentClaim.difficulty.charAt(0).toUpperCase() + currentClaim.difficulty.slice(1)}
                        </Badge>
                      </div>
                    </div>

                    {/* Actions */}
                    {!state.showFeedback && (
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          className="flex-1 border-green-500 text-green-500 hover:bg-green-50 hover:text-green-600"
                          onClick={() => handleVerdict(true)}
                        >
                          <ThumbsUp className="mr-2 h-4 w-4" />
                          True
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1 border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
                          onClick={() => handleVerdict(false)}
                        >
                          <ThumbsDown className="mr-2 h-4 w-4" />
                          False
                        </Button>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="evidence" className="space-y-4 mt-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg border p-4">
                      <h3 className="font-medium text-lg mb-3">Research Sources:</h3>
                      <div className="space-y-3">
                        {currentClaim.evidence.map((evidence, index) => (
                          <div key={index} className={`p-3 rounded-lg border ${
                            evidence.reliability >= 90 ? 'bg-green-50 border-green-200 dark:bg-green-900/10 dark:border-green-800' :
                            evidence.reliability >= 70 ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/10 dark:border-yellow-800' :
                            'bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-800'
                          }`}>
                            <div className="flex justify-between items-start mb-1">
                              <div className="font-medium">{evidence.source}</div>
                              <Badge variant="outline" className={
                                evidence.reliability >= 90 ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
                                evidence.reliability >= 70 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300' :
                                'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                              }>
                                Reliability: {evidence.reliability}%
                              </Badge>
                            </div>
                            <p className="text-sm italic">"{evidence.quote}"</p>
                            <div className="text-xs text-muted-foreground mt-1">Source type: {evidence.type}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

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
                        <p className="text-sm mt-1">
                          This claim is <strong>{currentClaim.isTrue ? 'TRUE' : 'FALSE'}</strong>. {currentClaim.explanation}
                        </p>
                        <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
                          <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Related Fact:</p>
                          <p className="text-sm">{currentClaim.relatedTruth}</p>
                        </div>
                        <Button
                          className={`mt-3 ${state.lastAnswerCorrect ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
                          onClick={nextClaim}
                        >
                          Next Claim
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
              You've completed the Fact Checker Challenge!
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
                <div className="text-2xl font-bold">{state.claimsPlayed.length}</div>
                <div className="text-sm text-muted-foreground">Claims Analyzed</div>
              </div>
            </div>

            <div className="rounded-lg border p-3 bg-blue-50 dark:bg-blue-950/20">
              <h3 className="font-medium mb-1 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-blue-500" />
                Fact Checking Tips:
              </h3>
              <ul className="text-sm space-y-1">
                <li>• Always check multiple reliable sources</li>
                <li>• Consider the expertise and credibility of the source</li>
                <li>• Look for scientific consensus on scientific claims</li>
                <li>• Be aware of your own biases when evaluating information</li>
                <li>• Remember that popular beliefs aren't always factual</li>
              </ul>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="flex-1" onClick={() => updateState({ showGameOver: false })}>
              Close
            </Button>
            <Button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500" onClick={startGame}>
              Play Again
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
