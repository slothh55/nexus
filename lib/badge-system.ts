'use client'

import { BadgeProgress, saveBadgeProgress, getGameProgress, getQuizProgress, getUserProgress } from './local-storage'
import { toast } from 'sonner'

// Badge definitions
export interface Badge {
  id: string
  title: string
  description: string
  category: string
  criteria: BadgeCriteria
  icon: string
  color: string
  level?: 'bronze' | 'silver' | 'gold'
}

// Badge criteria types
export type BadgeCriteria = 
  | GameCompletionCriteria
  | QuizCompletionCriteria
  | ScoreCriteria
  | MultipleCompletionCriteria
  | CombinationCriteria

export interface GameCompletionCriteria {
  type: 'game-completion'
  gameId: string
  minScore?: number
}

export interface QuizCompletionCriteria {
  type: 'quiz-completion'
  quizId: string
  minScore?: number
  minCorrectPercentage?: number
}

export interface ScoreCriteria {
  type: 'score'
  gameId: string
  minScore: number
}

export interface MultipleCompletionCriteria {
  type: 'multiple-completion'
  gameId: string
  count: number
}

export interface CombinationCriteria {
  type: 'combination'
  criteria: BadgeCriteria[]
  requireAll: boolean
}

// Badge definitions
export const badges: Badge[] = [
  // Game completion badges
  {
    id: 'phishing-defender-bronze',
    title: 'Phishing Defender Bronze',
    description: 'Complete the Phishing Defender game once.',
    category: 'Online Safety',
    criteria: {
      type: 'game-completion',
      gameId: 'phishing-defender'
    },
    icon: 'Shield',
    color: 'from-amber-500 to-amber-600',
    level: 'bronze'
  },
  {
    id: 'phishing-defender-silver',
    title: 'Phishing Defender Silver',
    description: 'Score at least 500 points in the Phishing Defender game.',
    category: 'Online Safety',
    criteria: {
      type: 'score',
      gameId: 'phishing-defender',
      minScore: 500
    },
    icon: 'Shield',
    color: 'from-slate-400 to-slate-500',
    level: 'silver'
  },
  {
    id: 'phishing-defender-gold',
    title: 'Phishing Defender Gold',
    description: 'Complete the Phishing Defender game 3 times.',
    category: 'Online Safety',
    criteria: {
      type: 'multiple-completion',
      gameId: 'phishing-defender',
      count: 3
    },
    icon: 'Shield',
    color: 'from-yellow-500 to-yellow-600',
    level: 'gold'
  },
  {
    id: 'fact-checker-bronze',
    title: 'Fact Checker Bronze',
    description: 'Complete the Fact Checker Challenge game once.',
    category: 'Information Literacy',
    criteria: {
      type: 'game-completion',
      gameId: 'fact-checker'
    },
    icon: 'Brain',
    color: 'from-amber-500 to-amber-600',
    level: 'bronze'
  },
  {
    id: 'fact-checker-silver',
    title: 'Fact Checker Silver',
    description: 'Score at least 500 points in the Fact Checker Challenge game.',
    category: 'Information Literacy',
    criteria: {
      type: 'score',
      gameId: 'fact-checker',
      minScore: 500
    },
    icon: 'Brain',
    color: 'from-slate-400 to-slate-500',
    level: 'silver'
  },
  {
    id: 'fact-checker-gold',
    title: 'Fact Checker Gold',
    description: 'Complete the Fact Checker Challenge game 3 times.',
    category: 'Information Literacy',
    criteria: {
      type: 'multiple-completion',
      gameId: 'fact-checker',
      count: 3
    },
    icon: 'Brain',
    color: 'from-yellow-500 to-yellow-600',
    level: 'gold'
  },
  {
    id: 'password-hero-bronze',
    title: 'Password Hero Bronze',
    description: 'Complete the Password Hero game once.',
    category: 'Online Safety',
    criteria: {
      type: 'game-completion',
      gameId: 'password-hero'
    },
    icon: 'Lock',
    color: 'from-amber-500 to-amber-600',
    level: 'bronze'
  },
  {
    id: 'password-hero-silver',
    title: 'Password Hero Silver',
    description: 'Score at least 500 points in the Password Hero game.',
    category: 'Online Safety',
    criteria: {
      type: 'score',
      gameId: 'password-hero',
      minScore: 500
    },
    icon: 'Lock',
    color: 'from-slate-400 to-slate-500',
    level: 'silver'
  },
  {
    id: 'password-hero-gold',
    title: 'Password Hero Gold',
    description: 'Complete the Password Hero game 3 times.',
    category: 'Online Safety',
    criteria: {
      type: 'multiple-completion',
      gameId: 'password-hero',
      count: 3
    },
    icon: 'Lock',
    color: 'from-yellow-500 to-yellow-600',
    level: 'gold'
  },
  {
    id: 'privacy-protector-bronze',
    title: 'Privacy Protector Bronze',
    description: 'Complete the Privacy Protector game once.',
    category: 'Online Safety',
    criteria: {
      type: 'game-completion',
      gameId: 'privacy-protector'
    },
    icon: 'Shield',
    color: 'from-amber-500 to-amber-600',
    level: 'bronze'
  },
  {
    id: 'privacy-protector-silver',
    title: 'Privacy Protector Silver',
    description: 'Score at least 500 points in the Privacy Protector game.',
    category: 'Online Safety',
    criteria: {
      type: 'score',
      gameId: 'privacy-protector',
      minScore: 500
    },
    icon: 'Shield',
    color: 'from-slate-400 to-slate-500',
    level: 'silver'
  },
  {
    id: 'privacy-protector-gold',
    title: 'Privacy Protector Gold',
    description: 'Complete the Privacy Protector game 3 times.',
    category: 'Online Safety',
    criteria: {
      type: 'multiple-completion',
      gameId: 'privacy-protector',
      count: 3
    },
    icon: 'Shield',
    color: 'from-yellow-500 to-yellow-600',
    level: 'gold'
  },
  
  // Quiz completion badges
  {
    id: 'phishing-quiz-master',
    title: 'Phishing Quiz Master',
    description: 'Score at least 80% on the Phishing Defender quiz.',
    category: 'Online Safety',
    criteria: {
      type: 'quiz-completion',
      quizId: 'phishing-defender-quiz',
      minCorrectPercentage: 80
    },
    icon: 'Award',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'fact-quiz-master',
    title: 'Fact Quiz Master',
    description: 'Score at least 80% on the Fact Checker quiz.',
    category: 'Information Literacy',
    criteria: {
      type: 'quiz-completion',
      quizId: 'fact-checker-quiz',
      minCorrectPercentage: 80
    },
    icon: 'Award',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'password-quiz-master',
    title: 'Password Quiz Master',
    description: 'Score at least 80% on the Password Hero quiz.',
    category: 'Online Safety',
    criteria: {
      type: 'quiz-completion',
      quizId: 'password-hero-quiz',
      minCorrectPercentage: 80
    },
    icon: 'Award',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'privacy-quiz-master',
    title: 'Privacy Quiz Master',
    description: 'Score at least 80% on the Privacy Protector quiz.',
    category: 'Online Safety',
    criteria: {
      type: 'quiz-completion',
      quizId: 'privacy-protector-quiz',
      minCorrectPercentage: 80
    },
    icon: 'Award',
    color: 'from-blue-500 to-blue-600'
  },
  
  // Special achievement badges
  {
    id: 'digital-safety-champion',
    title: 'Digital Safety Champion',
    description: 'Complete all online safety games and quizzes.',
    category: 'Special Achievement',
    criteria: {
      type: 'combination',
      criteria: [
        { type: 'game-completion', gameId: 'phishing-defender' },
        { type: 'game-completion', gameId: 'password-hero' },
        { type: 'game-completion', gameId: 'privacy-protector' },
        { type: 'quiz-completion', quizId: 'phishing-defender-quiz' },
        { type: 'quiz-completion', quizId: 'password-hero-quiz' },
        { type: 'quiz-completion', quizId: 'privacy-protector-quiz' }
      ],
      requireAll: true
    },
    icon: 'Trophy',
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'information-master',
    title: 'Information Master',
    description: 'Complete all information literacy games and quizzes.',
    category: 'Special Achievement',
    criteria: {
      type: 'combination',
      criteria: [
        { type: 'game-completion', gameId: 'fact-checker' },
        { type: 'quiz-completion', quizId: 'fact-checker-quiz' },
        { type: 'quiz-completion', quizId: 'information-literacy-quiz' }
      ],
      requireAll: true
    },
    icon: 'Trophy',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'digital-champion',
    title: 'Digital Champion',
    description: 'Complete all games and quizzes.',
    category: 'Special Achievement',
    criteria: {
      type: 'combination',
      criteria: [
        { type: 'game-completion', gameId: 'phishing-defender' },
        { type: 'game-completion', gameId: 'fact-checker' },
        { type: 'game-completion', gameId: 'password-hero' },
        { type: 'game-completion', gameId: 'privacy-protector' },
        { type: 'quiz-completion', quizId: 'phishing-defender-quiz' },
        { type: 'quiz-completion', quizId: 'fact-checker-quiz' },
        { type: 'quiz-completion', quizId: 'password-hero-quiz' },
        { type: 'quiz-completion', quizId: 'privacy-protector-quiz' },
        { type: 'quiz-completion', quizId: 'information-literacy-quiz' },
        { type: 'quiz-completion', quizId: 'online-safety-quiz' }
      ],
      requireAll: true
    },
    icon: 'Award',
    color: 'from-indigo-500 to-purple-500'
  }
]

// Initialize badges in local storage
export function initializeBadges(): void {
  const progress = getUserProgress()
  
  // Add any missing badges to progress
  badges.forEach(badge => {
    if (!progress.badges[badge.id]) {
      progress.badges[badge.id] = {
        id: badge.id,
        unlocked: false,
        progress: 0,
        dateUnlocked: null,
        category: badge.category
      }
    }
  })
  
  // Save updated progress
  saveBadgeProgress(progress.badges as any)
}

// Check if a badge should be awarded
export function checkBadgeCriteria(badgeId: string): boolean {
  const badge = badges.find(b => b.id === badgeId)
  if (!badge) return false
  
  return evaluateCriteria(badge.criteria)
}

// Evaluate badge criteria
function evaluateCriteria(criteria: BadgeCriteria): boolean {
  switch (criteria.type) {
    case 'game-completion':
      return checkGameCompletion(criteria)
    case 'quiz-completion':
      return checkQuizCompletion(criteria)
    case 'score':
      return checkScore(criteria)
    case 'multiple-completion':
      return checkMultipleCompletion(criteria)
    case 'combination':
      return checkCombination(criteria)
    default:
      return false
  }
}

// Check game completion criteria
function checkGameCompletion(criteria: GameCompletionCriteria): boolean {
  const gameProgress = getGameProgress(criteria.gameId)
  if (!gameProgress) return false
  
  if (criteria.minScore !== undefined) {
    return gameProgress.completed && gameProgress.score >= criteria.minScore
  }
  
  return gameProgress.completed
}

// Check quiz completion criteria
function checkQuizCompletion(criteria: QuizCompletionCriteria): boolean {
  const quizProgress = getQuizProgress(criteria.quizId)
  if (!quizProgress) return false
  
  if (criteria.minScore !== undefined) {
    return quizProgress.completed && quizProgress.score >= criteria.minScore
  }
  
  if (criteria.minCorrectPercentage !== undefined) {
    const percentage = (quizProgress.correctAnswers / quizProgress.totalQuestions) * 100
    return quizProgress.completed && percentage >= criteria.minCorrectPercentage
  }
  
  return quizProgress.completed
}

// Check score criteria
function checkScore(criteria: ScoreCriteria): boolean {
  const gameProgress = getGameProgress(criteria.gameId)
  if (!gameProgress) return false
  
  return gameProgress.score >= criteria.minScore
}

// Check multiple completion criteria
function checkMultipleCompletion(criteria: MultipleCompletionCriteria): boolean {
  const gameProgress = getGameProgress(criteria.gameId)
  if (!gameProgress) return false
  
  return gameProgress.timesPlayed >= criteria.count
}

// Check combination criteria
function checkCombination(criteria: CombinationCriteria): boolean {
  if (criteria.requireAll) {
    return criteria.criteria.every(c => evaluateCriteria(c))
  } else {
    return criteria.criteria.some(c => evaluateCriteria(c))
  }
}

// Check and award all eligible badges
export function checkAndAwardBadges(): string[] {
  const awardedBadges: string[] = []
  
  badges.forEach(badge => {
    const badgeProgress = getUserProgress().badges[badge.id]
    
    // Skip already unlocked badges
    if (badgeProgress && badgeProgress.unlocked) return
    
    // Check if badge should be awarded
    if (checkBadgeCriteria(badge.id)) {
      // Award badge
      saveBadgeProgress({
        id: badge.id,
        unlocked: true,
        progress: 100,
        dateUnlocked: new Date().toISOString(),
        category: badge.category
      })
      
      awardedBadges.push(badge.id)
    }
  })
  
  return awardedBadges
}

// Show badge notification
export function showBadgeNotification(badgeId: string): void {
  const badge = badges.find(b => b.id === badgeId)
  if (!badge) return
  
  toast.success(`Badge Unlocked: ${badge.title}`, {
    description: badge.description,
    duration: 5000
  })
}

// Calculate badge progress
export function calculateBadgeProgress(badgeId: string): number {
  const badge = badges.find(b => b.id === badgeId)
  if (!badge) return 0
  
  // For simple criteria, we can calculate a percentage
  switch (badge.criteria.type) {
    case 'game-completion': {
      const gameProgress = getGameProgress(badge.criteria.gameId)
      if (!gameProgress) return 0
      return gameProgress.completed ? 100 : Math.min(gameProgress.score / 100, 99)
    }
    case 'quiz-completion': {
      const quizProgress = getQuizProgress(badge.criteria.quizId)
      if (!quizProgress) return 0
      return quizProgress.completed ? 100 : Math.min((quizProgress.correctAnswers / quizProgress.totalQuestions) * 100, 99)
    }
    case 'score': {
      const gameProgress = getGameProgress(badge.criteria.gameId)
      if (!gameProgress) return 0
      return Math.min((gameProgress.score / badge.criteria.minScore) * 100, 100)
    }
    case 'multiple-completion': {
      const gameProgress = getGameProgress(badge.criteria.gameId)
      if (!gameProgress) return 0
      return Math.min((gameProgress.timesPlayed / badge.criteria.count) * 100, 100)
    }
    case 'combination': {
      // For combination criteria, we count how many sub-criteria are met
      const metCriteria = badge.criteria.criteria.filter(c => evaluateCriteria(c)).length
      return (metCriteria / badge.criteria.criteria.length) * 100
    }
    default:
      return 0
  }
}

// Update all badge progress
export function updateAllBadgeProgress(): void {
  const progress = getUserProgress()
  
  badges.forEach(badge => {
    if (!progress.badges[badge.id]?.unlocked) {
      progress.badges[badge.id] = {
        ...progress.badges[badge.id],
        id: badge.id,
        progress: calculateBadgeProgress(badge.id),
        category: badge.category
      }
    }
  })
  
  // Save updated progress
  saveBadgeProgress(progress.badges as any)
}

// Initialize badges when this module is imported
if (typeof window !== 'undefined') {
  initializeBadges()
}
