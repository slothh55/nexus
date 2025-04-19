'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useGameState } from '@/hooks/use-game-state'
import { useAchievements } from '@/hooks/use-achievements'
import { useConfetti } from '@/hooks/use-confetti'
import { AlertCircle, Check, CheckCircle, Clock, Eye, EyeOff, Info, Lock, Settings, Shield, ShieldAlert, Smartphone, ThumbsUp, Trophy, User, X } from "lucide-react"

// Define the privacy scenarios
const privacyScenarios = [
  {
    id: 'social-media',
    title: 'Social Media Privacy',
    description: 'Configure privacy settings for your social media account',
    context: 'You just created a new social media account. Configure your privacy settings to protect your personal information while still being able to connect with friends.',
    settings: [
      {
        id: 'profile-visibility',
        title: 'Profile Visibility',
        description: 'Who can see your profile information?',
        options: [
          { id: 'public', label: 'Public (Everyone)', privacy: 'low' },
          { id: 'friends', label: 'Friends Only', privacy: 'medium' },
          { id: 'private', label: 'Private (Only Me)', privacy: 'high' }
        ],
        recommended: 'friends',
        explanation: 'Setting your profile to "Friends Only" balances privacy with usability. Public profiles expose your personal information to everyone, while completely private profiles may limit your ability to connect with others.'
      },
      {
        id: 'post-visibility',
        title: 'Post Visibility',
        description: 'Who can see your posts by default?',
        options: [
          { id: 'public', label: 'Public (Everyone)', privacy: 'low' },
          { id: 'friends', label: 'Friends Only', privacy: 'medium' },
          { id: 'custom', label: 'Custom (Selected Friends)', privacy: 'high' }
        ],
        recommended: 'friends',
        explanation: 'Setting posts to "Friends Only" ensures only people you know can see what you share. Public posts can be viewed by anyone, including potential employers or malicious actors.'
      },
      {
        id: 'friend-requests',
        title: 'Friend Requests',
        description: 'Who can send you friend requests?',
        options: [
          { id: 'everyone', label: 'Everyone', privacy: 'low' },
          { id: 'friends-of-friends', label: 'Friends of Friends', privacy: 'medium' },
          { id: 'nobody', label: 'Nobody (I\'ll send requests)', privacy: 'high' }
        ],
        recommended: 'friends-of-friends',
        explanation: 'Limiting friend requests to "Friends of Friends" reduces unwanted connections while still allowing your network to grow. This setting helps prevent spam accounts and strangers from connecting with you.'
      },
      {
        id: 'tagging',
        title: 'Photo Tagging',
        description: 'Who can tag you in photos?',
        options: [
          { id: 'everyone', label: 'Everyone', privacy: 'low' },
          { id: 'friends', label: 'Friends Only', privacy: 'medium' },
          { id: 'approval', label: 'Require My Approval', privacy: 'high' }
        ],
        recommended: 'approval',
        explanation: 'Requiring approval for tags gives you control over what photos you appear in on the platform. This prevents unwanted or embarrassing photos from being linked to your profile without your consent.'
      },
      {
        id: 'location',
        title: 'Location Sharing',
        description: 'When should your location be shared?',
        options: [
          { id: 'always', label: 'Always', privacy: 'low' },
          { id: 'while-using', label: 'Only While Using App', privacy: 'medium' },
          { id: 'never', label: 'Never', privacy: 'high' }
        ],
        recommended: 'never',
        explanation: 'Setting location sharing to "Never" provides the best privacy. Your physical location is sensitive information that could be used to track your movements or habits. If you need to share your location for a specific feature, enable it temporarily.'
      }
    ],
    tips: [
      'Regularly review your privacy settings as platforms often update their options',
      'Be cautious about sharing personal identifiable information like your address or phone number',
      'Consider using a profile picture that doesn\'t clearly show your face',
      'Remember that even with strict privacy settings, information you share can be screenshot and shared elsewhere'
    ]
  },
  {
    id: 'smartphone',
    title: 'Smartphone Privacy',
    description: 'Configure privacy settings for your new smartphone',
    context: 'You just got a new smartphone. Configure the privacy settings to protect your personal information while still being able to use the features you need.',
    settings: [
      {
        id: 'app-permissions',
        title: 'App Permissions',
        description: 'How should apps access your phone\'s features?',
        options: [
          { id: 'all', label: 'Allow All Permissions', privacy: 'low' },
          { id: 'selective', label: 'Review Each Permission', privacy: 'medium' },
          { id: 'minimal', label: 'Minimal Permissions Only', privacy: 'high' }
        ],
        recommended: 'selective',
        explanation: 'Reviewing each permission allows you to make informed decisions about what data apps can access. For example, a flashlight app doesn\'t need access to your contacts or location. Be especially cautious with camera, microphone, location, and contact permissions.'
      },
      {
        id: 'location-services',
        title: 'Location Services',
        description: 'When should apps access your location?',
        options: [
          { id: 'always', label: 'Always Allow', privacy: 'low' },
          { id: 'while-using', label: 'While Using App Only', privacy: 'medium' },
          { id: 'never', label: 'Never Allow', privacy: 'high' }
        ],
        recommended: 'while-using',
        explanation: 'Setting location access to "While Using App Only" ensures apps can\'t track your location in the background. This balances functionality (maps, weather apps) with privacy protection.'
      },
      {
        id: 'ad-tracking',
        title: 'Ad Tracking',
        description: 'Should apps track your activity for personalized ads?',
        options: [
          { id: 'allow', label: 'Allow Tracking', privacy: 'low' },
          { id: 'limit', label: 'Limit Tracking', privacy: 'medium' },
          { id: 'disable', label: 'Disable Tracking', privacy: 'high' }
        ],
        recommended: 'disable',
        explanation: 'Disabling ad tracking prevents apps from building a profile of your interests and behaviors. This reduces targeted advertising and limits how much of your personal data is collected and shared with third parties.'
      },
      {
        id: 'biometrics',
        title: 'Biometric Authentication',
        description: 'How should biometric data (fingerprint, face) be used?',
        options: [
          { id: 'all', label: 'For All Apps and Payments', privacy: 'low' },
          { id: 'system-only', label: 'For System Authentication Only', privacy: 'medium' },
          { id: 'disabled', label: 'Disabled (Use Passcode)', privacy: 'high' }
        ],
        recommended: 'system-only',
        explanation: 'Using biometrics for system authentication only provides convenience while limiting exposure of your biometric data. Third-party apps may not have the same security standards as your device\'s operating system.'
      },
      {
        id: 'backup',
        title: 'Cloud Backup',
        description: 'How should your data be backed up?',
        options: [
          { id: 'everything', label: 'Back Up Everything', privacy: 'low' },
          { id: 'selective', label: 'Selective Backup', privacy: 'medium' },
          { id: 'local-only', label: 'Local Backup Only', privacy: 'high' }
        ],
        recommended: 'selective',
        explanation: 'Selective backup allows you to choose what data is stored in the cloud. This balances the convenience of cloud backup with privacy concerns. Consider keeping sensitive photos, documents, or messages in local backup only.'
      }
    ],
    tips: [
      'Regularly review which apps have access to sensitive permissions like location, camera, and microphone',
      'Use a strong passcode or password in addition to biometric authentication',
      'Consider using a VPN when connecting to public Wi-Fi networks',
      'Regularly update your operating system to get the latest security patches'
    ]
  },
  {
    id: 'browser',
    title: 'Web Browser Privacy',
    description: 'Configure privacy settings for your web browser',
    context: 'You want to enhance your privacy while browsing the web. Configure your browser settings to protect your personal information while maintaining a good browsing experience.',
    settings: [
      {
        id: 'cookies',
        title: 'Cookie Settings',
        description: 'How should websites store cookies on your device?',
        options: [
          { id: 'allow-all', label: 'Allow All Cookies', privacy: 'low' },
          { id: 'block-third-party', label: 'Block Third-Party Cookies', privacy: 'medium' },
          { id: 'block-all', label: 'Block All Cookies', privacy: 'high' }
        ],
        recommended: 'block-third-party',
        explanation: 'Blocking third-party cookies prevents tracking across different websites while still allowing basic website functionality. Third-party cookies are primarily used for advertising and tracking your browsing habits across the web.'
      },
      {
        id: 'tracking',
        title: 'Tracking Prevention',
        description: 'How should your browser handle tracking attempts?',
        options: [
          { id: 'basic', label: 'Basic Protection', privacy: 'low' },
          { id: 'balanced', label: 'Balanced Protection', privacy: 'medium' },
          { id: 'strict', label: 'Strict Protection', privacy: 'high' }
        ],
        recommended: 'balanced',
        explanation: 'Balanced tracking protection blocks most trackers while minimizing website breakage. Strict protection offers the most privacy but may cause some websites to function incorrectly.'
      },
      {
        id: 'history',
        title: 'Browsing History',
        description: 'How should your browsing history be handled?',
        options: [
          { id: 'keep', label: 'Keep History', privacy: 'low' },
          { id: 'clear-exit', label: 'Clear on Exit', privacy: 'medium' },
          { id: 'never-save', label: 'Never Save History', privacy: 'high' }
        ],
        recommended: 'clear-exit',
        explanation: 'Clearing history on exit balances convenience with privacy. Your browsing activity is available during your session but removed when you close the browser, preventing others who use your device from seeing your activity.'
      },
      {
        id: 'search',
        title: 'Search Engine',
        description: 'Which search engine should be your default?',
        options: [
          { id: 'standard', label: 'Standard Search Engine', privacy: 'low' },
          { id: 'privacy-basic', label: 'Basic Privacy Search Engine', privacy: 'medium' },
          { id: 'privacy-focused', label: 'Privacy-Focused Search Engine', privacy: 'high' }
        ],
        recommended: 'privacy-focused',
        explanation: 'Privacy-focused search engines don\'t track your searches or build a profile of your interests. They provide search results without collecting or storing your personal information or search history.'
      },
      {
        id: 'autofill',
        title: 'Form Autofill',
        description: 'How should your browser handle form data?',
        options: [
          { id: 'all', label: 'Save All Form Data', privacy: 'low' },
          { id: 'selective', label: 'Save Non-Sensitive Data Only', privacy: 'medium' },
          { id: 'disabled', label: 'Don\'t Save Form Data', privacy: 'high' }
        ],
        recommended: 'selective',
        explanation: 'Saving only non-sensitive data balances convenience with privacy. Your browser will remember usernames but not passwords or payment information, reducing the risk if someone gains access to your device.'
      }
    ],
    tips: [
      'Consider using private/incognito mode for sensitive browsing',
      'Install a reputable ad blocker to reduce tracking and malicious ads',
      'Regularly clear your cookies and browsing data',
      'Be cautious about browser extensions - they can access everything you do in your browser'
    ]
  },
  {
    id: 'online-shopping',
    title: 'Online Shopping Privacy',
    description: 'Configure privacy settings for online shopping accounts',
    context: 'You\'re setting up an account on an online shopping platform. Configure your privacy and data settings to protect your personal and financial information.',
    settings: [
      {
        id: 'account-visibility',
        title: 'Account Visibility',
        description: 'Who can see your reviews and activity?',
        options: [
          { id: 'public', label: 'Public (Everyone)', privacy: 'low' },
          { id: 'registered', label: 'Registered Users Only', privacy: 'medium' },
          { id: 'private', label: 'Private (Only Me)', privacy: 'high' }
        ],
        recommended: 'private',
        explanation: 'Keeping your shopping activity private prevents others from seeing what products you\'re interested in or have purchased. This protects your privacy and prevents targeted marketing based on your shopping habits.'
      },
      {
        id: 'payment-info',
        title: 'Payment Information Storage',
        description: 'How should your payment details be stored?',
        options: [
          { id: 'save-all', label: 'Save All Payment Methods', privacy: 'low' },
          { id: 'save-partial', label: 'Save Partial Information', privacy: 'medium' },
          { id: 'never-save', label: 'Never Save Payment Info', privacy: 'high' }
        ],
        recommended: 'never-save',
        explanation: 'Never saving payment information is the most secure option. While less convenient, it ensures your financial data isn\'t stored in the merchant\'s database where it could be exposed in a data breach.'
      },
      {
        id: 'purchase-history',
        title: 'Purchase History',
        description: 'How long should your purchase history be retained?',
        options: [
          { id: 'indefinite', label: 'Indefinitely', privacy: 'low' },
          { id: 'one-year', label: 'One Year', privacy: 'medium' },
          { id: 'minimal', label: 'Minimal Period (30 days)', privacy: 'high' }
        ],
        recommended: 'one-year',
        explanation: 'Keeping purchase history for one year balances privacy with practicality. You\'ll have records for returns and warranties, but your long-term shopping habits won\'t be permanently stored.'
      },
      {
        id: 'marketing',
        title: 'Marketing Communications',
        description: 'What marketing communications should you receive?',
        options: [
          { id: 'all', label: 'All Marketing and Recommendations', privacy: 'low' },
          { id: 'limited', label: 'Order Updates Only', privacy: 'medium' },
          { id: 'none', label: 'Essential Communications Only', privacy: 'high' }
        ],
        recommended: 'none',
        explanation: 'Opting for essential communications only prevents the company from sending marketing emails and reduces how much they profile your interests. You\'ll still receive important information about your orders and account.'
      },
      {
        id: 'data-sharing',
        title: 'Data Sharing with Partners',
        description: 'How should your data be shared with third parties?',
        options: [
          { id: 'allow', label: 'Allow All Sharing', privacy: 'low' },
          { id: 'limited', label: 'Limited Sharing', privacy: 'medium' },
          { id: 'none', label: 'No Data Sharing', privacy: 'high' }
        ],
        recommended: 'none',
        explanation: 'Preventing data sharing with third parties keeps your personal information and shopping habits from being sold or shared with other companies for marketing purposes. This significantly reduces your digital footprint.'
      }
    ],
    tips: [
      'Consider using a dedicated email address for online shopping',
      'Use a credit card rather than a debit card for better fraud protection',
      'Check if the website has HTTPS (secure connection) before entering payment information',
      'Be wary of requests for excessive personal information that isn\'t necessary for your purchase'
    ]
  },
  {
    id: 'smart-home',
    title: 'Smart Home Privacy',
    description: 'Configure privacy settings for your smart home devices',
    context: 'You\'ve purchased several smart home devices (speakers, cameras, thermostats). Configure their privacy settings to protect your home privacy while maintaining functionality.',
    settings: [
      {
        id: 'voice-recording',
        title: 'Voice Recordings',
        description: 'How should voice assistant recordings be handled?',
        options: [
          { id: 'save', label: 'Save All Recordings', privacy: 'low' },
          { id: 'anonymous', label: 'Save Anonymously', privacy: 'medium' },
          { id: 'disable', label: 'Don\'t Save Recordings', privacy: 'high' }
        ],
        recommended: 'disable',
        explanation: 'Disabling voice recording storage prevents your conversations from being saved or reviewed. This ensures private conversations in your home remain private, though it may slightly reduce voice recognition accuracy over time.'
      },
      {
        id: 'camera-access',
        title: 'Camera Access',
        description: 'When should smart cameras be active?',
        options: [
          { id: 'always', label: 'Always On', privacy: 'low' },
          { id: 'scheduled', label: 'Scheduled Times Only', privacy: 'medium' },
          { id: 'manual', label: 'Manual Activation Only', privacy: 'high' }
        ],
        recommended: 'scheduled',
        explanation: 'Setting cameras to scheduled times (like when you\'re away from home) balances security with privacy. This prevents continuous recording of your activities while still providing security when needed.'
      },
      {
        id: 'data-collection',
        title: 'Usage Data Collection',
        description: 'What usage data should be collected?',
        options: [
          { id: 'full', label: 'Full Data Collection', privacy: 'low' },
          { id: 'basic', label: 'Basic Usage Statistics', privacy: 'medium' },
          { id: 'minimal', label: 'Minimal/Essential Only', privacy: 'high' }
        ],
        recommended: 'minimal',
        explanation: 'Limiting data collection to essential information reduces how much of your behavior and habits are tracked. Smart devices can still function with minimal data collection, though you may lose some personalization features.'
      },
      {
        id: 'third-party',
        title: 'Third-Party Integration',
        description: 'How should your devices interact with other services?',
        options: [
          { id: 'all', label: 'Allow All Integrations', privacy: 'low' },
          { id: 'selective', label: 'Selective Integrations', privacy: 'medium' },
          { id: 'none', label: 'Essential Integrations Only', privacy: 'high' }
        ],
        recommended: 'selective',
        explanation: 'Allowing only selective integrations gives you control over which third-party services can access your smart home data. This prevents unnecessary data sharing while maintaining the functionality you need.'
      },
      {
        id: 'location',
        title: 'Location-Based Features',
        description: 'How should location data be used?',
        options: [
          { id: 'precise', label: 'Precise Location Always', privacy: 'low' },
          { id: 'approximate', label: 'Approximate Location', privacy: 'medium' },
          { id: 'disabled', label: 'Disabled', privacy: 'high' }
        ],
        recommended: 'approximate',
        explanation: 'Using approximate location provides enough information for features like weather updates or home/away status without precisely tracking your movements. This balances functionality with privacy protection.'
      }
    ],
    tips: [
      'Regularly review and delete stored recordings or history from your smart devices',
      'Consider placing cameras only in entry areas, not in private spaces like bedrooms',
      'Be aware of which devices have microphones and their listening settings',
      'Create a separate Wi-Fi network for smart home devices to isolate them from your main network'
    ]
  }
]

// Define the game achievements
const achievements = [
  { id: 'first-protection', title: 'Privacy Novice', description: 'Complete your first privacy protection task', icon: <ShieldAlert className="h-4 w-4" />, xp: 50 },
  { id: 'all-settings', title: 'Settings Master', description: 'Configure all privacy settings correctly', icon: <Settings className="h-4 w-4" />, xp: 100 },
  { id: 'data-minimizer', title: 'Data Minimizer', description: 'Minimize data sharing in all scenarios', icon: <EyeOff className="h-4 w-4" />, xp: 150 },
  { id: 'privacy-expert', title: 'Privacy Expert', description: 'Complete all privacy protection challenges', icon: <Shield className="h-4 w-4" />, xp: 200 },
  { id: 'quick-protector', title: 'Quick Protector', description: 'Complete a challenge in under 60 seconds', icon: <Clock className="h-4 w-4" />, xp: 75 }
]

export function PrivacyProtectorGame() {
  // Game state
  const [state, setState] = useState({
    currentScenario: 0,
    score: 0,
    timeRemaining: 180,
    showIntro: true,
    showSettings: false,
    showResults: false,
    showGameOver: false,
    gameActive: false,
    selectedOptions: {} as Record<string, string>,
    completedScenarios: [] as string[],
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
      endScenario()
    }
    
    return () => {
      if (timer) clearInterval(timer)
    }
  }, [state.gameActive, state.timeRemaining])

  // Achievements and confetti hooks
  const { addAchievement, achievements: earnedAchievements } = useAchievements('privacy-protector')
  const { triggerConfetti } = useConfetti()

  // Update state helper
  const updateState = (newState: Partial<typeof state>) => {
    setState(prev => ({ ...prev, ...newState }))
  }

  // Get current scenario
  const getCurrentScenario = () => {
    return privacyScenarios[state.currentScenario]
  }

  // Start the game
  const startGame = () => {
    // Set difficulty parameters
    let timeLimit = 180
    if (state.difficulty === 'intermediate') timeLimit = 120
    if (state.difficulty === 'expert') timeLimit = 90
    
    updateState({
      currentScenario: 0,
      score: 0,
      timeRemaining: timeLimit,
      showIntro: false,
      showSettings: true,
      showResults: false,
      showGameOver: false,
      gameActive: true,
      selectedOptions: {},
      completedScenarios: [],
      startTime: Date.now()
    })
  }

  // End the scenario
  const endScenario = () => {
    updateState({
      gameActive: false,
      showSettings: false,
      showResults: true
    })
    
    // Calculate score
    const scenario = getCurrentScenario()
    const timeTaken = (Date.now() - state.startTime) / 1000
    
    let scenarioScore = 0
    let optimalChoices = 0
    let highPrivacyChoices = 0
    
    // Check each setting
    scenario.settings.forEach(setting => {
      const selectedOption = state.selectedOptions[setting.id]
      if (!selectedOption) return
      
      const option = setting.options.find(opt => opt.id === selectedOption)
      if (!option) return
      
      // Points for recommended choices
      if (selectedOption === setting.recommended) {
        scenarioScore += 20
        optimalChoices++
      }
      
      // Points for high privacy choices
      if (option.privacy === 'high') {
        scenarioScore += 10
        highPrivacyChoices++
      } else if (option.privacy === 'medium') {
        scenarioScore += 5
      }
    })
    
    // Bonus for completing all settings
    const allSettingsConfigured = scenario.settings.every(setting => 
      state.selectedOptions[setting.id] !== undefined
    )
    
    if (allSettingsConfigured) {
      scenarioScore += 25
    }
    
    // Time bonus
    const timeBonus = Math.max(0, Math.floor((state.difficulty === 'beginner' ? 180 : state.difficulty === 'intermediate' ? 120 : 90) - timeTaken) / 3)
    scenarioScore += timeBonus
    
    // Update state with new score
    updateState({
      score: state.score + scenarioScore,
      completedScenarios: [...state.completedScenarios, scenario.id],
      fastestTime: Math.min(state.fastestTime, timeTaken)
    })
    
    // Check for achievements
    if (state.completedScenarios.length === 0) {
      addAchievement('first-protection')
    }
    
    if (optimalChoices === scenario.settings.length) {
      if (!earnedAchievements.includes('all-settings')) {
        addAchievement('all-settings')
      }
    }
    
    if (highPrivacyChoices === scenario.settings.length) {
      if (!earnedAchievements.includes('data-minimizer')) {
        addAchievement('data-minimizer')
        triggerConfetti()
      }
    }
    
    if (timeTaken < 60) {
      if (!earnedAchievements.includes('quick-protector')) {
        addAchievement('quick-protector')
      }
    }
    
    if (state.completedScenarios.length === privacyScenarios.length - 1) {
      if (!earnedAchievements.includes('privacy-expert')) {
        addAchievement('privacy-expert')
        triggerConfetti()
      }
    }
  }

  // Handle option selection
  const selectOption = (settingId: string, optionId: string) => {
    updateState({
      selectedOptions: {
        ...state.selectedOptions,
        [settingId]: optionId
      }
    })
  }

  // Submit settings
  const submitSettings = () => {
    endScenario()
  }

  // Continue to next scenario
  const continueToNext = () => {
    // Check if all scenarios are completed
    if (state.completedScenarios.length >= privacyScenarios.length) {
      updateState({
        showResults: false,
        showGameOver: true
      })
      return
    }
    
    // Find next uncompleted scenario
    let nextIndex = state.currentScenario
    do {
      nextIndex = (nextIndex + 1) % privacyScenarios.length
    } while (state.completedScenarios.includes(privacyScenarios[nextIndex].id) && 
             state.completedScenarios.length < privacyScenarios.length)
    
    // Set difficulty parameters
    let timeLimit = 180
    if (state.difficulty === 'intermediate') timeLimit = 120
    if (state.difficulty === 'expert') timeLimit = 90
    
    // Start next scenario
    updateState({
      currentScenario: nextIndex,
      timeRemaining: timeLimit,
      showResults: false,
      showSettings: true,
      gameActive: true,
      selectedOptions: {},
      startTime: Date.now()
    })
  }

  // Set difficulty level
  const setDifficulty = (level: 'beginner' | 'intermediate' | 'expert') => {
    updateState({ difficulty: level })
  }

  // Get privacy level icon
  const getPrivacyLevelIcon = (level: string) => {
    switch (level) {
      case 'low':
        return <Eye className="h-4 w-4 text-red-500" />
      case 'medium':
        return <Shield className="h-4 w-4 text-amber-500" />
      case 'high':
        return <EyeOff className="h-4 w-4 text-green-500" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  // Get privacy level label
  const getPrivacyLevelLabel = (level: string) => {
    switch (level) {
      case 'low':
        return 'Low Privacy'
      case 'medium':
        return 'Medium Privacy'
      case 'high':
        return 'High Privacy'
      default:
        return 'Unknown'
    }
  }

  // Get scenario icon
  const getScenarioIcon = (scenarioId: string) => {
    switch (scenarioId) {
      case 'social-media':
        return <User className="h-6 w-6" />
      case 'smartphone':
        return <Smartphone className="h-6 w-6" />
      case 'browser':
        return <Globe className="h-6 w-6" />
      case 'online-shopping':
        return <ShoppingCart className="h-6 w-6" />
      case 'smart-home':
        return <Home className="h-6 w-6" />
      default:
        return <Shield className="h-6 w-6" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Intro Dialog */}
      <Dialog open={state.showIntro} onOpenChange={(open) => !open && updateState({ showIntro: false })}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Privacy Protector</DialogTitle>
            <DialogDescription>
              Learn to protect your personal information online
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <p>
              As a Privacy Protector, your mission is to configure privacy settings for various online services and devices to protect your personal information.
            </p>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md">
              <h4 className="font-medium flex items-center gap-2 text-amber-800 dark:text-amber-300">
                <AlertCircle className="h-4 w-4" />
                Why Privacy Matters:
              </h4>
              <ul className="mt-2 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-amber-500" />
                  <span>Your personal data can be used to build detailed profiles about you</span>
                </li>
                <li className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-amber-500" />
                  <span>Privacy settings help you control who can access your information</span>
                </li>
                <li className="flex items-center gap-2">
                  <EyeOff className="h-4 w-4 text-amber-500" />
                  <span>Default settings often prioritize data collection over privacy</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">How to play:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Review the privacy scenario and context</li>
                <li>Configure each privacy setting based on your preferences</li>
                <li>Balance privacy with functionality based on your needs</li>
                <li>Submit your settings before time runs out</li>
                <li>Learn from feedback to improve your privacy protection skills</li>
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
                {state.difficulty === 'beginner' && 'Beginner: More time (180 seconds) and detailed explanations.'}
                {state.difficulty === 'intermediate' && 'Intermediate: Less time (120 seconds) and fewer explanations.'}
                {state.difficulty === 'expert' && 'Expert: Very limited time (90 seconds) and minimal guidance.'}
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
      
      {/* Settings View */}
      {state.showSettings && (
        <div className="space-y-4">
          {/* Game Header */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">Privacy Protector</h2>
              <p className="text-muted-foreground">Configure privacy settings to protect your information</p>
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
            value={(state.timeRemaining / (state.difficulty === 'beginner' ? 180 : state.difficulty === 'intermediate' ? 120 : 90)) * 100} 
            className="h-2" 
          />
          
          {/* Scenario Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-indigo-100 dark:bg-indigo-800 p-2 rounded-full">
                  {getScenarioIcon(getCurrentScenario().id)}
                </div>
                <div>
                  <CardTitle>{getCurrentScenario().title}</CardTitle>
                  <CardDescription>{getCurrentScenario().description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Scenario Context */}
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Scenario:</h3>
                <p>{getCurrentScenario().context}</p>
              </div>
              
              {/* Privacy Settings */}
              <div className="space-y-6">
                {getCurrentScenario().settings.map((setting) => (
                  <div key={setting.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">{setting.title}</h3>
                      {state.selectedOptions[setting.id] && (
                        <Badge variant="outline" className="flex items-center gap-1">
                          {getPrivacyLevelIcon(setting.options.find(opt => opt.id === state.selectedOptions[setting.id])?.privacy || 'medium')}
                          <span>{getPrivacyLevelLabel(setting.options.find(opt => opt.id === state.selectedOptions[setting.id])?.privacy || 'medium')}</span>
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{setting.description}</p>
                    
                    <RadioGroup 
                      value={state.selectedOptions[setting.id] || ''} 
                      onValueChange={(value) => selectOption(setting.id, value)}
                      className="mt-2"
                    >
                      {setting.options.map((option) => (
                        <div key={option.id} className="flex items-center space-x-2 mb-2">
                          <RadioGroupItem value={option.id} id={`${setting.id}-${option.id}`} />
                          <Label 
                            htmlFor={`${setting.id}-${option.id}`}
                            className="flex items-center gap-2"
                          >
                            {getPrivacyLevelIcon(option.privacy)}
                            <span>{option.label}</span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                    
                    {state.difficulty === 'beginner' && state.selectedOptions[setting.id] && (
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg mt-2">
                        <p className="text-xs flex items-start gap-2">
                          <Info className="h-4 w-4 text-blue-500 mt-0.5" />
                          <span>
                            {setting.options.find(opt => opt.id === state.selectedOptions[setting.id])?.privacy === 'high' 
                              ? 'High privacy choice: This maximizes your privacy but may limit some functionality.' 
                              : setting.options.find(opt => opt.id === state.selectedOptions[setting.id])?.privacy === 'medium'
                                ? 'Medium privacy choice: This balances privacy with functionality.' 
                                : 'Low privacy choice: This prioritizes functionality over privacy protection.'}
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Tips */}
              {state.difficulty === 'beginner' && (
                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                  <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Info className="h-4 w-4 text-amber-500" />
                    Privacy Tips:
                  </h3>
                  <ul className="space-y-1 text-sm">
                    {getCurrentScenario().tips.map((tip, index) => (
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
                onClick={submitSettings} 
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
              >
                Submit Settings
              </Button>
            </CardFooter>
          </Card>
          
          {/* Settings Progress */}
          <div className="flex justify-between items-center text-sm">
            <span>Settings configured: {Object.keys(state.selectedOptions).length}/{getCurrentScenario().settings.length}</span>
            {Object.keys(state.selectedOptions).length === getCurrentScenario().settings.length && (
              <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                All settings configured
              </Badge>
            )}
          </div>
        </div>
      )}
      
      {/* Results View */}
      {state.showResults && (
        <div className="space-y-4">
          {/* Results Header */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">Privacy Analysis</h2>
              <p className="text-muted-foreground">Review your privacy settings</p>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              <span className="text-xl font-bold">{state.score}</span>
            </div>
          </div>
          
          {/* Result Card */}
          <Card>
            <CardHeader className="bg-indigo-50 dark:bg-indigo-900/20">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-100 dark:bg-indigo-800 p-2 rounded-full">
                  {getScenarioIcon(getCurrentScenario().id)}
                </div>
                <div>
                  <CardTitle>{getCurrentScenario().title}</CardTitle>
                  <CardDescription>
                    <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                      Privacy configuration completed
                    </span>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              {/* Privacy Score */}
              <div>
                <h3 className="text-sm font-medium mb-2">Your Privacy Score:</h3>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/50">
                    <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                      {(() => {
                        // Calculate privacy score
                        const scenario = getCurrentScenario()
                        let highPrivacyCount = 0
                        let mediumPrivacyCount = 0
                        let configuredCount = 0
                        
                        scenario.settings.forEach(setting => {
                          const selectedOption = state.selectedOptions[setting.id]
                          if (!selectedOption) return
                          
                          configuredCount++
                          const option = setting.options.find(opt => opt.id === selectedOption)
                          if (!option) return
                          
                          if (option.privacy === 'high') highPrivacyCount++
                          if (option.privacy === 'medium') mediumPrivacyCount++
                        })
                        
                        if (configuredCount === 0) return 0
                        
                        return Math.round(((highPrivacyCount * 100) + (mediumPrivacyCount * 50)) / (configuredCount * 100) * 100)
                      })()}%
                    </span>
                  </div>
                  <div>
                    <p className="text-sm">
                      {(() => {
                        const score = (() => {
                          // Calculate privacy score
                          const scenario = getCurrentScenario()
                          let highPrivacyCount = 0
                          let mediumPrivacyCount = 0
                          let configuredCount = 0
                          
                          scenario.settings.forEach(setting => {
                            const selectedOption = state.selectedOptions[setting.id]
                            if (!selectedOption) return
                            
                            configuredCount++
                            const option = setting.options.find(opt => opt.id === selectedOption)
                            if (!option) return
                            
                            if (option.privacy === 'high') highPrivacyCount++
                            if (option.privacy === 'medium') mediumPrivacyCount++
                          })
                          
                          if (configuredCount === 0) return 0
                          
                          return Math.round(((highPrivacyCount * 100) + (mediumPrivacyCount * 50)) / (configuredCount * 100) * 100)
                        })()
                        
                        if (score >= 80) return 'Excellent! You prioritized privacy in most settings.'
                        if (score >= 60) return 'Good balance between privacy and functionality.'
                        if (score >= 40) return 'Moderate privacy protection with focus on functionality.'
                        return 'Your settings prioritize functionality over privacy.'
                      })()}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Based on the privacy level of your selected options
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Settings Review */}
              <div>
                <h3 className="text-sm font-medium mb-2">Your Settings:</h3>
                <div className="space-y-3">
                  {getCurrentScenario().settings.map((setting) => {
                    const selectedOption = setting.options.find(opt => opt.id === state.selectedOptions[setting.id])
                    const recommendedOption = setting.options.find(opt => opt.id === setting.recommended)
                    
                    return (
                      <div key={setting.id} className="border rounded-lg overflow-hidden">
                        <div className="bg-muted/30 p-3">
                          <h4 className="font-medium">{setting.title}</h4>
                        </div>
                        <div className="p-3 space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Your choice:</span>
                            <Badge variant="outline" className="flex items-center gap-1">
                              {selectedOption 
                                ? <>
                                    {getPrivacyLevelIcon(selectedOption.privacy)}
                                    <span>{selectedOption.label}</span>
                                  </>
                                : 'Not configured'
                              }
                            </Badge>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-sm">Recommended:</span>
                            <Badge variant="outline" className="flex items-center gap-1 bg-blue-50 dark:bg-blue-900/20">
                              {recommendedOption && (
                                <>
                                  {getPrivacyLevelIcon(recommendedOption.privacy)}
                                  <span>{recommendedOption.label}</span>
                                </>
                              )}
                            </Badge>
                          </div>
                          
                          {selectedOption && recommendedOption && selectedOption.id === recommendedOption.id && (
                            <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-lg flex items-center gap-2 text-xs">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span>Optimal choice for balancing privacy and functionality</span>
                            </div>
                          )}
                        </div>
                        <div className="border-t p-3 bg-blue-50 dark:bg-blue-900/20">
                          <p className="text-xs">{setting.explanation}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              
              {/* Privacy Impact */}
              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                <h3 className="text-sm font-medium mb-2">Privacy Impact:</h3>
                <p className="text-sm">
                  {(() => {
                    // Calculate privacy score
                    const scenario = getCurrentScenario()
                    let highPrivacyCount = 0
                    let lowPrivacyCount = 0
                    let configuredCount = 0
                    
                    scenario.settings.forEach(setting => {
                      const selectedOption = state.selectedOptions[setting.id]
                      if (!selectedOption) return
                      
                      configuredCount++
                      const option = setting.options.find(opt => opt.id === selectedOption)
                      if (!option) return
                      
                      if (option.privacy === 'high') highPrivacyCount++
                      if (option.privacy === 'low') lowPrivacyCount++
                    })
                    
                    if (highPrivacyCount >= scenario.settings.length * 0.7) {
                      return 'Your settings provide strong privacy protection. Your personal information is well-protected, though you may experience some limitations in functionality or convenience.'
                    } else if (lowPrivacyCount >= scenario.settings.length * 0.7) {
                      return 'Your settings prioritize functionality over privacy. While you\'ll have full access to features, your personal information may be more widely shared and collected.'
                    } else {
                      return 'Your settings strike a balance between privacy and functionality. You\'ve protected some sensitive information while allowing access where it enhances your experience.'
                    }
                  })()}
                </p>
              </div>
              
              {/* Key Takeaways */}
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
                <h3 className="text-sm font-medium mb-2">Key Takeaways:</h3>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5">•</div>
                    <span>Privacy is a personal choice - balance protection with the functionality you need</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5">•</div>
                    <span>Regularly review privacy settings as services update their options</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5">•</div>
                    <span>Default settings often prioritize data collection over privacy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5">•</div>
                    <span>Consider the sensitivity of different types of personal information</span>
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={continueToNext} 
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
              >
                {state.completedScenarios.length >= privacyScenarios.length ? 'Finish Game' : 'Next Scenario'}
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
              You've completed the Privacy Protector challenge!
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
                {state.score >= 500 ? "Amazing! You're a Privacy Protection Expert!" :
                 state.score >= 300 ? "Great job! You've mastered the art of protecting your personal information!" :
                 "Good effort! Keep practicing to improve your privacy protection skills."}
              </p>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <h4 className="font-medium mb-2">What you've learned:</h4>
              <ul className="text-sm space-y-1">
                <li>• How to configure privacy settings across different platforms</li>
                <li>• The importance of balancing privacy with functionality</li>
                <li>• How to identify and protect sensitive personal information</li>
                <li>• Why default settings often need to be changed</li>
                <li>• How to take control of your digital footprint</li>
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
              <h4 className="font-medium mb-2">Privacy Audit Recommendation:</h4>
              <p className="text-sm">
                Consider performing a privacy audit every few months. Review the privacy settings on your accounts, delete unused apps and services, and check what information is publicly available about you online.
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

// Missing icon components
function Globe(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

function ShoppingCart(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  )
}

function Home(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

function Info(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  )
}
