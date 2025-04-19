import { LucideIcon, AlertTriangle, Brain, FileText, Lock, MessageSquare, ShieldAlert, Wand2 } from "lucide-react"

export interface Game {
  id: string
  title: string
  description: string
  icon: LucideIcon
  category: 'AI Ethics' | 'Online Safety' | 'Information Literacy'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedTime: string
  status: 'available' | 'coming-soon'
  path: string
  skills: string[]
  achievements: Achievement[]
}

export interface Achievement {
  id: string
  title: string
  description: string
  xp: number
  icon: LucideIcon
}

export const games: Game[] = [
  {
    id: 'ai-ethics-detective',
    title: 'AI Ethics Detective',
    description: 'Identify ethical issues in AI-generated content',
    icon: AlertTriangle,
    category: 'AI Ethics',
    difficulty: 'beginner',
    estimatedTime: '10-15 min',
    status: 'available',
    path: '/simulator/ai-ethics-detective',
    skills: ['Ethical analysis', 'Critical thinking', 'AI literacy'],
    achievements: [
      {
        id: 'first-issue',
        title: 'Ethical Observer',
        description: 'Identify your first ethical issue',
        xp: 50,
        icon: AlertTriangle
      },
      {
        id: 'all-categories',
        title: 'Ethics Expert',
        description: 'Identify issues from all ethical categories',
        xp: 200,
        icon: Brain
      },
      {
        id: 'perfect-round',
        title: 'Perfect Analysis',
        description: 'Find all issues in a scenario without mistakes',
        xp: 100,
        icon: FileText
      },
      {
        id: 'speed-detective',
        title: 'Quick Thinker',
        description: 'Complete a scenario in under 30 seconds',
        xp: 75,
        icon: Brain
      },
      {
        id: 'master-detective',
        title: 'Master Detective',
        description: 'Reach a score of 300 points',
        xp: 250,
        icon: AlertTriangle
      }
    ]
  },
  {
    id: 'ai-world-builder',
    title: 'AI World Builder',
    description: 'Design ethical AI systems for real-world scenarios',
    icon: Brain,
    category: 'AI Ethics',
    difficulty: 'intermediate',
    estimatedTime: '15-20 min',
    status: 'available',
    path: '/simulator/ai-world-builder',
    skills: ['System design', 'Ethical reasoning', 'Stakeholder analysis'],
    achievements: [
      {
        id: 'first-design',
        title: 'Apprentice Designer',
        description: 'Complete your first AI system design',
        xp: 50,
        icon: Brain
      },
      {
        id: 'all-principles',
        title: 'Ethics Expert',
        description: 'Apply all ethical principles in a single design',
        xp: 150,
        icon: AlertTriangle
      },
      {
        id: 'all-stakeholders',
        title: 'Stakeholder Champion',
        description: 'Address the needs of all stakeholders in a design',
        xp: 100,
        icon: Brain
      },
      {
        id: 'master-designer',
        title: 'Master AI Architect',
        description: 'Complete all scenario designs',
        xp: 200,
        icon: Brain
      },
      {
        id: 'perfect-score',
        title: 'Ethical Visionary',
        description: 'Achieve a perfect score on any design',
        xp: 150,
        icon: Brain
      }
    ]
  },
  {
    id: 'prompt-engineer',
    title: 'Prompt Engineer',
    description: 'Master the art of creating effective prompts for AI systems',
    icon: Wand2,
    category: 'AI Ethics',
    difficulty: 'beginner',
    estimatedTime: '10-15 min',
    status: 'available',
    path: '/simulator/prompt-engineer',
    skills: ['Prompt engineering', 'Clear communication', 'AI interaction'],
    achievements: [
      {
        id: 'first-prompt',
        title: 'Prompt Apprentice',
        description: 'Create your first effective prompt',
        xp: 50,
        icon: MessageSquare
      },
      {
        id: 'all-scenarios',
        title: 'Prompt Master',
        description: 'Complete all prompt engineering scenarios',
        xp: 200,
        icon: Wand2
      },
      {
        id: 'perfect-score',
        title: 'Wordsmith',
        description: 'Achieve a perfect score on any prompt',
        xp: 100,
        icon: Wand2
      },
      {
        id: 'key-elements',
        title: 'Detail Detective',
        description: 'Include all key elements in a prompt',
        xp: 75,
        icon: FileText
      },
      {
        id: 'enhancement-expert',
        title: 'Enhancement Expert',
        description: 'Use 5+ enhancement words in a single prompt',
        xp: 125,
        icon: Wand2
      }
    ]
  },
  {
    id: 'phishing-defender',
    title: 'Phishing Defender',
    description: 'Learn to identify and avoid phishing attempts',
    icon: ShieldAlert,
    category: 'Online Safety',
    difficulty: 'beginner',
    estimatedTime: '10-15 min',
    status: 'available',
    path: '/simulator/phishing-defender',
    skills: ['Threat detection', 'Digital literacy', 'Security awareness'],
    achievements: [
      {
        id: 'first-catch',
        title: 'Security Novice',
        description: 'Identify your first phishing attempt',
        xp: 50,
        icon: ShieldAlert
      },
      {
        id: 'perfect-inbox',
        title: 'Inbox Guardian',
        description: 'Correctly identify all emails in a round',
        xp: 100,
        icon: ShieldAlert
      },
      {
        id: 'speed-defender',
        title: 'Quick Responder',
        description: 'Complete a round in under 60 seconds',
        xp: 75,
        icon: ShieldAlert
      },
      {
        id: 'master-defender',
        title: 'Security Expert',
        description: 'Reach a score of 500 points',
        xp: 200,
        icon: ShieldAlert
      },
      {
        id: 'all-types',
        title: 'Threat Analyst',
        description: 'Identify all types of phishing attempts',
        xp: 150,
        icon: ShieldAlert
      }
    ]
  },
  {
    id: 'password-hero',
    title: 'Password Hero',
    description: 'Create and manage strong, secure passwords',
    icon: Lock,
    category: 'Online Safety',
    difficulty: 'beginner',
    estimatedTime: '5-10 min',
    status: 'available',
    path: '/simulator/password-hero',
    skills: ['Password security', 'Digital hygiene', 'Authentication'],
    achievements: [
      {
        id: 'first-password',
        title: 'Security Initiate',
        description: 'Create your first strong password',
        xp: 50,
        icon: Lock
      },
      {
        id: 'password-master',
        title: 'Password Master',
        description: 'Create a password with perfect security score',
        xp: 100,
        icon: Lock
      },
      {
        id: 'speed-creator',
        title: 'Quick Creator',
        description: 'Create a strong password in under 30 seconds',
        xp: 75,
        icon: Lock
      },
      {
        id: 'security-expert',
        title: 'Security Expert',
        description: 'Complete all password challenges',
        xp: 200,
        icon: Lock
      },
      {
        id: 'memory-master',
        title: 'Memory Master',
        description: 'Create a memorable but secure password',
        xp: 150,
        icon: Lock
      }
    ]
  },
  {
    id: 'privacy-protector',
    title: 'Privacy Protector',
    description: 'Learn to protect your personal information online',
    icon: ShieldAlert,
    category: 'Online Safety',
    difficulty: 'intermediate',
    estimatedTime: '10-15 min',
    status: 'available',
    path: '/simulator/privacy-protector',
    skills: ['Privacy management', 'Data protection', 'Digital footprint'],
    achievements: [
      {
        id: 'first-protection',
        title: 'Privacy Novice',
        description: 'Complete your first privacy protection task',
        xp: 50,
        icon: ShieldAlert
      },
      {
        id: 'all-settings',
        title: 'Settings Master',
        description: 'Configure all privacy settings correctly',
        xp: 100,
        icon: ShieldAlert
      },
      {
        id: 'data-minimizer',
        title: 'Data Minimizer',
        description: 'Minimize data sharing in all scenarios',
        xp: 150,
        icon: ShieldAlert
      },
      {
        id: 'privacy-expert',
        title: 'Privacy Expert',
        description: 'Complete all privacy protection challenges',
        xp: 200,
        icon: ShieldAlert
      },
      {
        id: 'quick-protector',
        title: 'Quick Protector',
        description: 'Complete a challenge in under 60 seconds',
        xp: 75,
        icon: ShieldAlert
      }
    ]
  },
  {
    id: 'fact-checker',
    title: 'Fact Checker',
    description: 'Learn to verify information and identify misinformation',
    icon: FileText,
    category: 'Information Literacy',
    difficulty: 'intermediate',
    estimatedTime: '15-20 min',
    status: 'available',
    path: '/simulator/fact-checker',
    skills: ['Critical evaluation', 'Source verification', 'Media literacy'],
    achievements: [
      {
        id: 'first-check',
        title: 'Fact Novice',
        description: 'Complete your first fact check',
        xp: 50,
        icon: FileText
      },
      {
        id: 'source-master',
        title: 'Source Master',
        description: 'Correctly evaluate all sources in a round',
        xp: 100,
        icon: FileText
      },
      {
        id: 'speed-checker',
        title: 'Quick Verifier',
        description: 'Complete a fact-checking round in under 2 minutes',
        xp: 75,
        icon: FileText
      },
      {
        id: 'fact-expert',
        title: 'Fact-Checking Expert',
        description: 'Reach a score of 500 points',
        xp: 200,
        icon: FileText
      },
      {
        id: 'all-types',
        title: 'Misinformation Analyst',
        description: 'Identify all types of misinformation',
        xp: 150,
        icon: FileText
      }
    ]
  },
  {
    id: 'simple-game',
    title: 'Simple Game',
    description: 'A simple demo game with sound effects',
    icon: Brain,
    category: 'AI Ethics',
    difficulty: 'beginner',
    estimatedTime: '2-5 min',
    status: 'available',
    path: '/simulator/simple-game',
    skills: ['Game mechanics', 'Sound interaction'],
    achievements: [
      {
        id: 'first-click',
        title: 'First Click',
        description: 'Click the cube for the first time',
        xp: 10,
        icon: Brain
      },
      {
        id: 'ten-clicks',
        title: 'Dedicated Clicker',
        description: 'Click the cube 10 times',
        xp: 25,
        icon: Brain
      },
      {
        id: 'fifty-clicks',
        title: 'Click Master',
        description: 'Click the cube 50 times',
        xp: 50,
        icon: Brain
      }
    ]
  }
]

export const getGameById = (id: string): Game | undefined => {
  return games.find(game => game.id === id)
}

export const getGamesByCategory = (category: Game['category']): Game[] => {
  return games.filter(game => game.category === category)
}

export const getAchievementsByGame = (gameId: string): Achievement[] => {
  const game = getGameById(gameId)
  return game ? game.achievements : []
}

export const getTotalXpByGame = (gameId: string): number => {
  const achievements = getAchievementsByGame(gameId)
  return achievements.reduce((total, achievement) => total + achievement.xp, 0)
}

export const getTotalXpByCategory = (category: Game['category']): number => {
  const categoryGames = getGamesByCategory(category)
  return categoryGames.reduce((total, game) => total + getTotalXpByGame(game.id), 0)
}

export const getTotalXp = (): number => {
  return games.reduce((total, game) => total + getTotalXpByGame(game.id), 0)
}
