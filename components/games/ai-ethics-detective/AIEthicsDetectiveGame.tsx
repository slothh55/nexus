'use client'

import React, { useState, useEffect } from 'react'
import { GameCanvas } from '../shared/GameCanvas'
import { LoadingScreen } from '../shared/LoadingScreen'
import { useGameState, useGameTimer, formatTime } from '@/lib/game-utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Sparkles, Search, CheckCircle, XCircle, Trophy, Clock, AlertTriangle, Eye } from 'lucide-react'
import { AIEthicsDetectiveScene } from './AIEthicsDetectiveScene'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { aiEthicsScenarios } from '@/data/ai-ethics-scenarios'
import { playSound } from '@/lib/sound-system'

interface GameState {
  started: boolean
  over: boolean
  score: number
  lives: number
  level: number
  currentScenarioIndex: number
  scenariosPlayed: number[]
  showFeedback: boolean
  lastAnswerCorrect: boolean
  showInstructions: boolean
  showGameOver: boolean
  foundIssues: string[]
  showIssueDetails: boolean
  currentIssueId: string | null
}

export function AIEthicsDetectiveGame() {
  // Game state
  const [state, updateState] = useGameState<GameState>({
    started: false,
    over: false,
    score: 0,
    lives: 3,
    level: 1,
    currentScenarioIndex: 0,
    scenariosPlayed: [],
    showFeedback: false,
    lastAnswerCorrect: false,
    showInstructions: true,
    showGameOver: false,
    foundIssues: [],
    showIssueDetails: false,
    currentIssueId: null
  });
  
  // Timer
  const { timeLeft, startTimer, pauseTimer, resetTimer } = useGameTimer(120, () => {
    handleTimeUp();
  });
  
  // Loading state
  const [loading, setLoading] = useState(true);
  
  // Simulate asset loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Current scenario
  const currentScenario = aiEthicsScenarios[state.currentScenarioIndex];
  
  // Start game
  const startGame = () => {
    // Get a random scenario that hasn't been played yet
    const availableScenarios = aiEthicsScenarios.filter(scenario => !state.scenariosPlayed.includes(scenario.id));
    const randomIndex = Math.floor(Math.random() * availableScenarios.length);
    const newScenarioIndex = aiEthicsScenarios.findIndex(scenario => scenario.id === availableScenarios[randomIndex].id);
    
    updateState({
      started: true,
      over: false,
      score: 0,
      lives: 3,
      level: 1,
      currentScenarioIndex: newScenarioIndex,
      scenariosPlayed: [availableScenarios[randomIndex].id],
      showFeedback: false,
      lastAnswerCorrect: false,
      showInstructions: false,
      showGameOver: false,
      foundIssues: [],
      showIssueDetails: false,
      currentIssueId: null
    });
    
    resetTimer();
    startTimer();
    playSound('success');
  };
  
  // Handle time up
  const handleTimeUp = () => {
    updateState({
      over: true,
      showGameOver: true
    });
    playSound('error');
  };
  
  // Handle issue click
  const handleIssueClick = (issueId: string) => {
    // If issue already found, show details
    if (state.foundIssues.includes(issueId)) {
      updateState({
        showIssueDetails: true,
        currentIssueId: issueId
      });
      return;
    }
    
    // Add to found issues
    updateState({
      foundIssues: [...state.foundIssues, issueId],
      showIssueDetails: true,
      currentIssueId: issueId
    });
    
    // Calculate score
    const issueScore = calculateIssueScore(issueId);
    updateState({
      score: state.score + issueScore
    });
    
    // Play sound
    playSound('click');
    
    // Check if all issues found
    if (state.foundIssues.length + 1 === currentScenario.issues.length) {
      // Bonus for finding all issues
      const bonusScore = Math.floor(timeLeft / 2);
      updateState({
        score: state.score + issueScore + bonusScore,
        showFeedback: true,
        lastAnswerCorrect: true
      });
      playSound('achievement');
    }
  };
  
  // Calculate score for finding an issue
  const calculateIssueScore = (issueId: string) => {
    const issue = currentScenario.issues.find(i => i.id === issueId);
    if (!issue) return 0;
    
    // Base score based on difficulty
    let baseScore = 0;
    switch (currentScenario.difficulty) {
      case 'easy':
        baseScore = 10;
        break;
      case 'medium':
        baseScore = 20;
        break;
      case 'hard':
        baseScore = 30;
        break;
    }
    
    // Time bonus
    const timeBonus = Math.floor(timeLeft / 10);
    
    return baseScore + timeBonus;
  };
  
  // Close issue details
  const closeIssueDetails = () => {
    updateState({
      showIssueDetails: false,
      currentIssueId: null
    });
  };
  
  // Next scenario
  const nextScenario = () => {
    // Get a random scenario that hasn't been played yet
    const availableScenarios = aiEthicsScenarios.filter(scenario => !state.scenariosPlayed.includes(scenario.id));
    
    // If all scenarios have been played, reset the played list
    if (availableScenarios.length === 0) {
      updateState({
        scenariosPlayed: [],
        level: state.level + 1
      });
      return nextScenario();
    }
    
    const randomIndex = Math.floor(Math.random() * availableScenarios.length);
    const newScenarioIndex = aiEthicsScenarios.findIndex(scenario => scenario.id === availableScenarios[randomIndex].id);
    
    updateState({
      currentScenarioIndex: newScenarioIndex,
      scenariosPlayed: [...state.scenariosPlayed, availableScenarios[randomIndex].id],
      showFeedback: false,
      foundIssues: [],
      showIssueDetails: false,
      currentIssueId: null
    });
    
    resetTimer();
    startTimer();
  };
  
  // Get current issue details
  const getCurrentIssueDetails = () => {
    if (!state.currentIssueId) return null;
    return currentScenario.issues.find(issue => issue.id === state.currentIssueId);
  };
  
  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'bias':
        return 'text-red-500';
      case 'privacy':
        return 'text-purple-500';
      case 'copyright':
        return 'text-amber-500';
      case 'misinformation':
        return 'text-blue-500';
      case 'transparency':
        return 'text-emerald-500';
      default:
        return 'text-gray-500';
    }
  };
  
  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'bias':
        return <AlertTriangle className="h-4 w-4" />;
      case 'privacy':
        return <Eye className="h-4 w-4" />;
      case 'copyright':
        return <XCircle className="h-4 w-4" />;
      case 'misinformation':
        return <XCircle className="h-4 w-4" />;
      case 'transparency':
        return <Search className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };
  
  if (loading) {
    return <LoadingScreen progress={75} message="Loading AI Ethics Detective..." />;
  }
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Sparkles className="h-8 w-8 text-indigo-500" />
          AI Ethics Detective
        </h1>
        {state.started && !state.over && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              <span className="text-xl font-bold">{state.score}</span>
            </div>
            <div className="flex">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-6 h-6 rounded-full border-2 ${
                    i < state.lives ? 'bg-green-500 border-green-500' : 'bg-gray-200 border-gray-300 dark:bg-gray-700 dark:border-gray-600'
                  } ${i === state.lives ? 'animate-pulse' : ''}`}
                ></div>
              ))}
            </div>
            <Badge variant="outline" className={`${timeLeft < 30 ? 'bg-red-500 text-white animate-pulse' : 'bg-indigo-500 text-white'}`}>
              <Clock className="mr-1 h-3 w-3" /> {formatTime(timeLeft)}
            </Badge>
          </div>
        )}
      </div>
      
      {/* Game content */}
      {!state.started ? (
        <Card className="overflow-hidden">
          <div className="h-2 w-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-indigo-500/10 p-2">
                <Sparkles className="h-5 w-5 text-indigo-500" />
              </div>
              <CardTitle>AI Ethics Detective</CardTitle>
            </div>
            <CardDescription>
              Identify ethical issues in AI-generated content and become an AI Ethics expert!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-lg overflow-hidden bg-muted/30 aspect-video">
                <GameCanvas controls={false} background="#1e1e2e">
                  <AIEthicsDetectiveScene 
                    demoMode={true}
                    scenario={aiEthicsScenarios[0]}
                    foundIssues={[]}
                    onIssueClick={() => {}}
                  />
                </GameCanvas>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">How to Play:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-indigo-500" />
                    Examine AI-generated content for ethical issues
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    Click on problematic areas to identify issues
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Learn about different categories of AI ethics concerns
                  </li>
                  <li className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-amber-500" />
                    Earn points for finding issues and completing scenarios
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={startGame}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
            >
              Start Game
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <div className="h-2 w-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Game Scene */}
              <div className="rounded-lg overflow-hidden bg-muted/30 aspect-video lg:aspect-auto">
                <GameCanvas controls={false} background="#1e1e2e">
                  <AIEthicsDetectiveScene 
                    scenario={currentScenario}
                    foundIssues={state.foundIssues}
                    onIssueClick={handleIssueClick}
                  />
                </GameCanvas>
              </div>
              
              {/* Scenario Details */}
              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg border p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-medium">{currentScenario.title}</h3>
                      <p className="text-muted-foreground">Find ethical issues in this AI-generated content</p>
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {currentScenario.difficulty}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium mb-1">Progress</h4>
                      <div className="flex items-center gap-2">
                        <Progress value={(state.foundIssues.length / currentScenario.issues.length) * 100} className="h-2" />
                        <span className="text-sm text-muted-foreground">
                          {state.foundIssues.length} / {currentScenario.issues.length}
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-1">Issues Found</h4>
                      {state.foundIssues.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No issues found yet. Click on problematic areas in the content.</p>
                      ) : (
                        <div className="grid grid-cols-1 gap-2">
                          {state.foundIssues.map(issueId => {
                            const issue = currentScenario.issues.find(i => i.id === issueId);
                            if (!issue) return null;
                            return (
                              <div 
                                key={issue.id} 
                                className="flex items-center gap-2 p-2 rounded-md bg-gray-100 dark:bg-gray-700 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
                                onClick={() => handleIssueClick(issue.id)}
                              >
                                <div className={`rounded-full p-1 ${getCategoryColor(issue.category).replace('text-', 'bg-').replace('500', '500/10')}`}>
                                  {getCategoryIcon(issue.category)}
                                </div>
                                <div className="flex-1 truncate">
                                  <span className={`text-xs font-medium ${getCategoryColor(issue.category)}`}>
                                    {issue.category}
                                  </span>
                                  <p className="text-sm truncate">{issue.description}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {state.showFeedback && (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <h3 className="font-medium">Great job!</h3>
                    </div>
                    <p className="text-sm mb-3">
                      You've found all the ethical issues in this content. Ready for the next challenge?
                    </p>
                    <Button onClick={nextScenario} className="w-full bg-green-500 hover:bg-green-600 text-white">
                      Next Scenario
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
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
              </ul>
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
