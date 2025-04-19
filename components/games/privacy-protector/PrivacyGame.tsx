'use client'

import React, { useState, useEffect } from 'react'
import { GameCanvas } from '../shared/GameCanvas'
import { LoadingScreen } from '../shared/LoadingScreen'
import { useGameState, useGameTimer, formatTime } from '@/lib/game-utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Shield, Eye, EyeOff, Settings, Trophy, Clock, Sparkles, Lock } from 'lucide-react'
import { PrivacyGameScene } from './PrivacyGameScene'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

// Game state type
interface GameState {
  started: boolean
  over: boolean
  score: number
  level: number
  currentScenarioIndex: number
  scenariosCompleted: number[]
  showFeedback: boolean
  lastAnswerCorrect: boolean
  showInstructions: boolean
  showGameOver: boolean
  userSettings: Record<string, string>
  activeTab: string
  timeLeft: number
}

// Privacy scenario type
export interface PrivacyScenario {
  id: number
  title: string
  description: string
  context: string
  settings: {
    id: string
    name: string
    options: string[]
    correctOption: string
    explanation: string
  }[]
  points: number
  difficulty: 'easy' | 'medium' | 'hard'
  category: 'social-media' | 'mobile-apps' | 'web-browsing' | 'smart-devices'
  tips: string[]
}

// Sample privacy scenarios
const privacyScenarios: PrivacyScenario[] = [
  {
    id: 1,
    title: "Social Media Privacy",
    description: "Configure your social media privacy settings to protect your personal information.",
    context: "You just created a new social media account. Before you start posting, you should adjust your privacy settings to control who can see your information and posts.",
    settings: [
      {
        id: "profile-visibility",
        name: "Profile Visibility",
        options: ["Public", "Friends Only", "Private"],
        correctOption: "Friends Only",
        explanation: "Setting your profile to 'Friends Only' allows only people you've approved to see your posts and information, giving you better control over your privacy."
      },
      {
        id: "location-sharing",
        name: "Location Sharing",
        options: ["Always On", "While Using", "Never"],
        correctOption: "Never",
        explanation: "Keeping location sharing off prevents others from tracking your whereabouts and protects your physical safety."
      },
      {
        id: "tag-approval",
        name: "Tag Approval",
        options: ["Automatic", "Review First", "Disabled"],
        correctOption: "Review First",
        explanation: "Reviewing tags before they appear on your profile gives you control over what content you're associated with."
      }
    ],
    points: 100,
    difficulty: 'easy',
    category: 'social-media',
    tips: [
      "Regularly review your friends list and remove people you don't know",
      "Be careful about what personal information you share in your profile",
      "Check your privacy settings after each app update as they may change"
    ]
  },
  {
    id: 2,
    title: "Mobile App Permissions",
    description: "Manage app permissions to protect your privacy on your smartphone.",
    context: "You've just downloaded a new game app on your smartphone. Before you start playing, you should review and adjust the permissions the app is requesting.",
    settings: [
      {
        id: "camera-access",
        name: "Camera Access",
        options: ["Allow", "Only While Using", "Deny"],
        correctOption: "Deny",
        explanation: "This game doesn't need camera access to function. Denying unnecessary permissions helps protect your privacy."
      },
      {
        id: "contacts-access",
        name: "Contacts Access",
        options: ["Allow", "Only While Using", "Deny"],
        correctOption: "Deny",
        explanation: "Games rarely need access to your contacts. Denying this permission prevents the app from accessing your personal contact list."
      },
      {
        id: "location-access",
        name: "Location Access",
        options: ["Allow", "Only While Using", "Deny"],
        correctOption: "Deny",
        explanation: "Unless the game has location-based features, it doesn't need to know where you are. Denying location access prevents tracking."
      }
    ],
    points: 150,
    difficulty: 'medium',
    category: 'mobile-apps',
    tips: [
      "Only grant permissions that are necessary for the app to function",
      "Regularly review app permissions in your device settings",
      "Uninstall apps you no longer use to prevent ongoing data collection"
    ]
  },
  {
    id: 3,
    title: "Web Browser Privacy",
    description: "Configure your web browser settings to enhance your online privacy.",
    context: "You're setting up a new web browser on your computer. You want to configure it to protect your privacy while browsing the internet.",
    settings: [
      {
        id: "cookies",
        name: "Cookie Settings",
        options: ["Accept All", "Block Third-Party", "Block All"],
        correctOption: "Block Third-Party",
        explanation: "Blocking third-party cookies prevents tracking across different websites while still allowing websites to function properly."
      },
      {
        id: "tracking",
        name: "Tracking Prevention",
        options: ["Off", "Basic", "Strict"],
        correctOption: "Strict",
        explanation: "Strict tracking prevention blocks most trackers, significantly enhancing your privacy while browsing."
      },
      {
        id: "history",
        name: "Browsing History",
        options: ["Keep Forever", "Clear on Exit", "Don't Save"],
        correctOption: "Clear on Exit",
        explanation: "Clearing history on exit prevents others who use your computer from seeing your browsing activity."
      },
      {
        id: "autofill",
        name: "Password Autofill",
        options: ["Always", "Ask Each Time", "Never"],
        correctOption: "Ask Each Time",
        explanation: "Being prompted before autofilling passwords gives you control and prevents automatic entry on potentially malicious sites."
      }
    ],
    points: 200,
    difficulty: 'medium',
    category: 'web-browsing',
    tips: [
      "Consider using a privacy-focused browser or extensions",
      "Use private/incognito mode when browsing sensitive content",
      "Regularly clear your browsing data including cookies and cache"
    ]
  },
  {
    id: 4,
    title: "Smart Home Privacy",
    description: "Configure your smart home devices to protect your privacy at home.",
    context: "You've just set up a new smart speaker in your home. You want to configure its settings to protect your privacy while still enjoying its features.",
    settings: [
      {
        id: "voice-history",
        name: "Voice Recording History",
        options: ["Save All", "Save Temporarily", "Don't Save"],
        correctOption: "Don't Save",
        explanation: "Preventing the device from saving voice recordings helps protect your privacy by not storing potentially sensitive conversations."
      },
      {
        id: "microphone",
        name: "Microphone Status",
        options: ["Always On", "On When Needed", "Physical Mute Button"],
        correctOption: "Physical Mute Button",
        explanation: "Using a physical mute button when the device isn't in use provides the strongest guarantee that it's not listening."
      },
      {
        id: "data-sharing",
        name: "Data Sharing",
        options: ["Share Everything", "Limited Sharing", "Minimal Sharing"],
        correctOption: "Minimal Sharing",
        explanation: "Limiting data sharing to only what's necessary for the device to function reduces privacy risks."
      },
      {
        id: "third-party",
        name: "Third-Party Integration",
        options: ["Allow All", "Review Each", "Disable"],
        correctOption: "Review Each",
        explanation: "Reviewing each third-party integration gives you control over which services can access your device and data."
      }
    ],
    points: 250,
    difficulty: 'hard',
    category: 'smart-devices',
    tips: [
      "Place smart speakers away from areas where you have private conversations",
      "Regularly review and delete your voice command history",
      "Check for firmware updates that may include security and privacy improvements"
    ]
  }
];

export function PrivacyGame() {
  // Game state
  const [state, updateState] = useGameState<GameState>({
    started: false,
    over: false,
    score: 0,
    level: 1,
    currentScenarioIndex: 0,
    scenariosCompleted: [],
    showFeedback: false,
    lastAnswerCorrect: false,
    showInstructions: true,
    showGameOver: false,
    userSettings: {},
    activeTab: 'context',
    timeLeft: 60
  });
  
  // Timer
  const { timeLeft, startTimer, pauseTimer, resetTimer } = useGameTimer(60, () => {
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
  
  // Current scenario
  const currentScenario = privacyScenarios[state.currentScenarioIndex];
  
  // Start game
  const startGame = () => {
    updateState({
      started: true,
      over: false,
      score: 0,
      level: 1,
      currentScenarioIndex: 0,
      scenariosCompleted: [],
      showFeedback: false,
      lastAnswerCorrect: false,
      showInstructions: false,
      showGameOver: false,
      userSettings: {},
      activeTab: 'context',
      timeLeft: 60
    });
    
    resetTimer();
    startTimer();
  };
  
  // Handle setting change
  const handleSettingChange = (settingId: string, value: string) => {
    updateState({
      userSettings: {
        ...state.userSettings,
        [settingId]: value
      }
    });
  };
  
  // Check if all settings are configured
  const areAllSettingsConfigured = () => {
    return currentScenario.settings.every(setting => state.userSettings[setting.id]);
  };
  
  // Submit settings
  const handleSubmit = () => {
    pauseTimer();
    
    // Check if settings are correct
    const correctSettings = currentScenario.settings.filter(
      setting => state.userSettings[setting.id] === setting.correctOption
    );
    
    const isAllCorrect = correctSettings.length === currentScenario.settings.length;
    
    // Calculate score
    let scoreIncrease = 0;
    if (isAllCorrect) {
      scoreIncrease = currentScenario.points;
      
      // Time bonus (more time left = more points)
      scoreIncrease += Math.floor(timeLeft / 5);
    } else {
      // Partial credit for some correct settings
      const percentCorrect = correctSettings.length / currentScenario.settings.length;
      scoreIncrease = Math.floor(currentScenario.points * percentCorrect * 0.5);
    }
    
    // Update state
    updateState({
      score: state.score + scoreIncrease,
      showFeedback: true,
      lastAnswerCorrect: isAllCorrect,
      scenariosCompleted: [...state.scenariosCompleted, currentScenario.id]
    });
    
    // Check if game over (all scenarios completed)
    if (state.scenariosCompleted.length === privacyScenarios.length - 1) {
      updateState({
        over: true,
        showGameOver: true
      });
    }
  };
  
  // Handle time up
  const handleTimeUp = () => {
    updateState({
      showFeedback: true,
      lastAnswerCorrect: false
    });
  };
  
  // Next scenario
  const nextScenario = () => {
    if (state.currentScenarioIndex < privacyScenarios.length - 1) {
      updateState({
        currentScenarioIndex: state.currentScenarioIndex + 1,
        showFeedback: false,
        userSettings: {},
        activeTab: 'context',
        timeLeft: 60
      });
      
      resetTimer();
      startTimer();
    } else {
      updateState({
        over: true,
        showGameOver: true
      });
    }
  };
  
  // Handle tab change
  const handleTabChange = (value: string) => {
    updateState({ activeTab: value });
  };
  
  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'social-media':
        return <Eye className="h-4 w-4" />;
      case 'mobile-apps':
        return <Shield className="h-4 w-4" />;
      case 'web-browsing':
        return <Lock className="h-4 w-4" />;
      case 'smart-devices':
        return <Settings className="h-4 w-4" />;
      default:
        return <Shield className="h-4 w-4" />;
    }
  };
  
  if (loading) {
    return <LoadingScreen progress={75} message="Loading Privacy Protector..." />;
  }
  
  return (
    <div className="space-y-4">
      {/* Game header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Shield className="h-8 w-8 text-purple-500" />
            Privacy Protector 3D
          </h1>
          <p className="text-muted-foreground mt-2">
            Configure privacy settings to protect your digital life in this interactive 3D game!
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
            <Badge variant="outline" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              Level {state.currentScenarioIndex + 1}
            </Badge>
          </div>
        )}
      </div>
      
      {/* Game content */}
      {!state.started ? (
        <Card className="overflow-hidden">
          <div className="h-2 w-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-purple-500/10 p-2">
                <Shield className="h-5 w-5 text-purple-500" />
              </div>
              <CardTitle>Privacy Protector 3D</CardTitle>
            </div>
            <CardDescription>
              Learn to protect your privacy by configuring the right settings in different digital environments!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-lg overflow-hidden bg-muted/30 aspect-video">
                <GameCanvas controls={false} background="#f8fafc">
                  <PrivacyGameScene 
                    demoMode={true}
                    category="social-media"
                    privacyScore={50}
                    isComplete={false}
                  />
                </GameCanvas>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">How to Play:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-purple-500" />
                    Configure privacy settings in different scenarios
                  </li>
                  <li className="flex items-center gap-2">
                    <Settings className="h-4 w-4 text-blue-500" />
                    Choose the most privacy-protective options
                  </li>
                  <li className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-green-500" />
                    Learn about real-world privacy best practices
                  </li>
                  <li className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-amber-500" />
                    Earn points for making secure choices
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={startGame}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              Start Game
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <div className="h-2 w-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 3D Game Scene */}
              <div className="rounded-lg overflow-hidden bg-muted/30 aspect-video lg:aspect-auto">
                <GameCanvas controls={false} background="#f8fafc">
                  <PrivacyGameScene 
                    category={currentScenario.category}
                    privacyScore={
                      Object.keys(state.userSettings).length > 0
                        ? Math.round(
                            (currentScenario.settings.filter(
                              setting => state.userSettings[setting.id] === setting.correctOption
                            ).length /
                              currentScenario.settings.length) *
                              100
                          )
                        : 0
                    }
                    isComplete={state.showFeedback && state.lastAnswerCorrect}
                  />
                </GameCanvas>
              </div>
              
              {/* Scenario Details */}
              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg border p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-medium">{currentScenario.title}</h3>
                      <p className="text-muted-foreground">{currentScenario.description}</p>
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {currentScenario.category.replace('-', ' ')}
                    </Badge>
                  </div>
                  
                  <Tabs value={state.activeTab} onValueChange={handleTabChange} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="context">Context</TabsTrigger>
                      <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="context" className="mt-4">
                      <div className="p-3 bg-muted/30 rounded-lg">
                        <p>{currentScenario.context}</p>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="settings" className="mt-4 space-y-4">
                      {currentScenario.settings.map((setting) => (
                        <div key={setting.id} className="space-y-2">
                          <Label htmlFor={setting.id}>{setting.name}</Label>
                          <div className="grid grid-cols-1 gap-2">
                            {setting.options.map((option) => (
                              <div
                                key={option}
                                className={`flex items-center justify-between p-2 rounded-md border ${
                                  state.userSettings[setting.id] === option
                                    ? 'bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800'
                                    : ''
                                } ${
                                  state.showFeedback && setting.correctOption === option
                                    ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
                                    : ''
                                }`}
                              >
                                <span>{option}</span>
                                <Switch
                                  id={`${setting.id}-${option}`}
                                  checked={state.userSettings[setting.id] === option}
                                  onCheckedChange={() => handleSettingChange(setting.id, option)}
                                  disabled={state.showFeedback}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                      
                      {!state.showFeedback && (
                        <Button
                          onClick={handleSubmit}
                          disabled={!areAllSettingsConfigured()}
                          className="w-full bg-purple-500 hover:bg-purple-600 mt-4"
                        >
                          Submit Settings
                        </Button>
                      )}
                    </TabsContent>
                  </Tabs>
                </div>
                
                {/* Feedback */}
                {state.showFeedback && (
                  <div className={`rounded-lg p-4 ${state.lastAnswerCorrect ? 'bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-800' : 'bg-amber-50 border border-amber-200 dark:bg-amber-900/20 dark:border-amber-800'}`}>
                    <div className="flex items-start">
                      {state.lastAnswerCorrect ? (
                        <Sparkles className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      ) : (
                        <Shield className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                      )}
                      <div>
                        <h3 className={`font-medium ${state.lastAnswerCorrect ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300'}`}>
                          {state.lastAnswerCorrect ? 'Great job!' : 'Almost there!'}
                        </h3>
                        
                        <div className="mt-2 space-y-2">
                          {currentScenario.settings.map((setting) => (
                            <div key={setting.id} className={`p-2 rounded-md text-sm ${
                              state.userSettings[setting.id] === setting.correctOption
                                ? 'bg-green-50 dark:bg-green-900/10'
                                : 'bg-amber-50 dark:bg-amber-900/10'
                            }`}>
                              <div className="font-medium">{setting.name}</div>
                              <div>Best choice: <span className="font-medium">{setting.correctOption}</span></div>
                              <div>{setting.explanation}</div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
                          <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Privacy Tips:</p>
                          <ul className="text-sm mt-1 space-y-1">
                            {currentScenario.tips.map((tip, index) => (
                              <li key={index}>• {tip}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <Button
                          className="mt-3 bg-purple-500 hover:bg-purple-600"
                          onClick={nextScenario}
                        >
                          Next Scenario
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
              You've completed the Privacy Protector challenge!
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
                <div className="text-2xl font-bold">{state.scenariosCompleted.length}</div>
                <div className="text-sm text-muted-foreground">Scenarios Completed</div>
              </div>
            </div>
            
            <div className="rounded-lg border p-3 bg-blue-50 dark:bg-blue-950/20">
              <h3 className="font-medium mb-1 flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-500" />
                Privacy Protection Tips:
              </h3>
              <ul className="text-sm space-y-1">
                <li>• Regularly review privacy settings on all your accounts and devices</li>
                <li>• Use strong, unique passwords and enable two-factor authentication</li>
                <li>• Be mindful of what personal information you share online</li>
                <li>• Keep your software and apps updated to get the latest security fixes</li>
                <li>• Consider using privacy-focused tools and services</li>
              </ul>
            </div>
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="flex-1" onClick={() => updateState({ showGameOver: false })}>
              Close
            </Button>
            <Button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500" onClick={startGame}>
              Play Again
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
