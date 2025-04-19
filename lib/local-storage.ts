'use client'

// Types for our local storage data
export interface UserProgress {
  games: Record<string, GameProgress>
  quizzes: Record<string, QuizProgress>
  badges: Record<string, BadgeProgress>
  learningPaths: Record<string, LearningPathProgress>
  courses: Record<string, CourseProgress>
  quests: Record<string, QuestProgress>
  adventureTime: number // Total time in minutes
  lastActive: string
  lastUpdated: string
}

export interface GameProgress {
  id: string
  completed: boolean
  score: number
  highScore: number
  lastPlayed: string
  timesPlayed: number
  levels: Record<string, LevelProgress>
}

export interface LevelProgress {
  id: string
  completed: boolean
  score: number
  highScore: number
}

export interface LearningPathProgress {
  id: string
  started: boolean
  completed: boolean
  completedModules: number
  lastAccessed: string
}

export interface CourseProgress {
  id: string
  started: boolean
  completed: boolean
  progress: number
  modules: Record<string, ModuleProgress>
  lastAccessed: string
}

export interface ModuleProgress {
  id: string
  completed: boolean
  timeSpent: number
  lastAccessed: string
}

export interface QuestProgress {
  id: string
  pathId: string
  completed: boolean
  lastAccessed: string
}

export interface QuizProgress {
  id: string
  completed: boolean
  score: number
  totalQuestions: number
  correctAnswers: number
  lastCompleted: string
  attempts: number
}

export interface BadgeProgress {
  id: string
  unlocked: boolean
  progress: number
  dateUnlocked: string | null
  category: string
}

// Local storage keys
const STORAGE_KEY = 'digital-inclusion-companion-progress'
const SETTINGS_KEY = 'digital-inclusion-companion-settings'
const VERSION_KEY = 'digital-inclusion-companion-version'
const CURRENT_VERSION = '1.0.0'

// Default progress data
const defaultProgress: UserProgress = {
  games: {},
  quizzes: {},
  badges: {},
  learningPaths: {},
  courses: {},
  quests: {},
  adventureTime: 0,
  lastActive: new Date().toISOString(),
  lastUpdated: new Date().toISOString()
}

// Default settings
const defaultSettings = {
  theme: 'system',
  soundEnabled: true,
  soundVolume: 80,
  notificationsEnabled: true,
  highContrast: false,
  largeText: false,
  reducedMotion: false,
  autoSave: true
}

// Initialize local storage with default data if not exists
export function initLocalStorage(): void {
  try {
    // Check if we have data already
    const existingData = localStorage.getItem(STORAGE_KEY)
    const existingSettings = localStorage.getItem(SETTINGS_KEY)
    const existingVersion = localStorage.getItem(VERSION_KEY)

    // If no data or version mismatch, initialize with defaults
    if (!existingData || existingVersion !== CURRENT_VERSION) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProgress))
      localStorage.setItem(VERSION_KEY, CURRENT_VERSION)
    }

    // Initialize settings if not exists
    if (!existingSettings) {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(defaultSettings))
    }
  } catch (error) {
    console.error('Failed to initialize local storage:', error)
  }
}

// Get all user progress
export function getUserProgress(): UserProgress {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : defaultProgress
  } catch (error) {
    console.error('Failed to get user progress:', error)
    return defaultProgress
  }
}

// Save all user progress
export function saveUserProgress(progress: UserProgress): void {
  try {
    progress.lastUpdated = new Date().toISOString()
    progress.lastActive = new Date().toISOString()
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch (error) {
    console.error('Failed to save user progress:', error)
  }
}

// Game progress functions
export function getGameProgress(gameId: string): GameProgress | null {
  const progress = getUserProgress()
  return progress.games[gameId] || null
}

export function saveGameProgress(gameProgress: GameProgress): void {
  try {
    const progress = getUserProgress()
    progress.games[gameProgress.id] = {
      ...progress.games[gameProgress.id],
      ...gameProgress,
      lastPlayed: new Date().toISOString()
    }
    saveUserProgress(progress)
  } catch (error) {
    console.error('Failed to save game progress:', error)
  }
}

// Quiz progress functions
export function getQuizProgress(quizId: string): QuizProgress | null {
  const progress = getUserProgress()
  return progress.quizzes[quizId] || null
}

export function saveQuizProgress(quizProgress: QuizProgress): void {
  try {
    const progress = getUserProgress()
    progress.quizzes[quizProgress.id] = {
      ...progress.quizzes[quizProgress.id],
      ...quizProgress,
      lastCompleted: new Date().toISOString()
    }
    saveUserProgress(progress)
  } catch (error) {
    console.error('Failed to save quiz progress:', error)
  }
}

// Badge progress functions
export function getBadgeProgress(badgeId: string): BadgeProgress | null {
  const progress = getUserProgress()
  return progress.badges[badgeId] || null
}

export function saveBadgeProgress(badgeProgress: BadgeProgress): void {
  try {
    const progress = getUserProgress()
    progress.badges[badgeProgress.id] = {
      ...progress.badges[badgeProgress.id],
      ...badgeProgress
    }
    saveUserProgress(progress)
  } catch (error) {
    console.error('Failed to save badge progress:', error)
  }
}

// Get all badges
export function getAllBadges(): Record<string, BadgeProgress> {
  const progress = getUserProgress()
  return progress.badges
}

// Get all unlocked badges
export function getUnlockedBadges(): BadgeProgress[] {
  const progress = getUserProgress()
  return Object.values(progress.badges).filter(badge => badge.unlocked)
}

// Calculate overall progress percentage
export function getOverallProgress(): number {
  const progress = getUserProgress()

  // Count total items and completed items
  const games = Object.values(progress.games)
  const quizzes = Object.values(progress.quizzes)
  const badges = Object.values(progress.badges)
  const paths = Object.values(progress.learningPaths)

  const totalItems = games.length + quizzes.length + badges.length + paths.length
  if (totalItems === 0) return 0

  const completedGames = games.filter(game => game.completed).length
  const completedQuizzes = quizzes.filter(quiz => quiz.completed).length
  const unlockedBadges = badges.filter(badge => badge.unlocked).length
  const completedPaths = paths.filter(path => path.completed).length

  const completedItems = completedGames + completedQuizzes + unlockedBadges + completedPaths

  return Math.round((completedItems / totalItems) * 100)
}

// Reset all progress
export function resetUserProgress(): void {
  try {
    const newProgress = {
      ...defaultProgress,
      lastActive: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress))
  } catch (error) {
    console.error('Failed to reset progress:', error)
  }
}

// Check if local storage is available
export function isLocalStorageAvailable(): boolean {
  try {
    const test = 'test'
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch (e) {
    return false
  }
}

// Learning path functions
export function getLearningPathProgress(pathId: string): LearningPathProgress | null {
  const progress = getUserProgress()
  return progress.learningPaths[pathId] || null
}

export function saveLearningPathProgress(pathProgress: LearningPathProgress): void {
  try {
    const progress = getUserProgress()
    progress.learningPaths[pathProgress.id] = {
      ...progress.learningPaths[pathProgress.id],
      ...pathProgress,
      lastAccessed: new Date().toISOString()
    }
    saveUserProgress(progress)
  } catch (error) {
    console.error('Failed to save learning path progress:', error)
  }
}

// Calculate learning path progress based on related games and quizzes
export function calculateLearningPathProgress(pathId: string, relatedGames: string[], relatedQuizzes: string[]): number {
  const progress = getUserProgress()

  // Count completed related items
  let completedItems = 0
  let totalItems = relatedGames.length + relatedQuizzes.length

  // If no related items, return 0
  if (totalItems === 0) return 0

  // Check completed games
  relatedGames.forEach(gameId => {
    if (progress.games[gameId]?.completed) {
      completedItems++
    }
  })

  // Check completed quizzes
  relatedQuizzes.forEach(quizId => {
    if (progress.quizzes[quizId]?.completed) {
      completedItems++
    }
  })

  return Math.round((completedItems / totalItems) * 100)
}

// Get total completed quests (games + quizzes + quests)
export function getCompletedQuestsCount(): number {
  try {
    const progress = getUserProgress()

    const completedGames = progress.games ? Object.values(progress.games).filter(game => game.completed).length : 0
    const completedQuizzes = progress.quizzes ? Object.values(progress.quizzes).filter(quiz => quiz.completed).length : 0
    const completedQuests = progress.quests ? Object.values(progress.quests).filter(quest => quest.completed).length : 0

    return completedGames + completedQuizzes + completedQuests
  } catch (error) {
    console.error('Failed to get completed quests count:', error)
    return 0
  }
}

// Update adventure time
export function updateAdventureTime(minutes: number): void {
  try {
    const progress = getUserProgress()
    progress.adventureTime += minutes
    saveUserProgress(progress)
  } catch (error) {
    console.error('Failed to update adventure time:', error)
  }
}

// Get adventure time formatted as hours
export function getAdventureTimeFormatted(): string {
  const progress = getUserProgress()
  const hours = Math.floor(progress.adventureTime / 60)
  const minutes = progress.adventureTime % 60

  if (hours === 0) {
    return `${minutes} minutes`
  } else if (minutes === 0) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'}`
  } else {
    return `${hours}.${Math.floor(minutes / 6)} hours`
  }
}

// Course progress functions
export function getCourseProgress(courseId: string): CourseProgress | null {
  const progress = getUserProgress()
  return progress.courses[courseId] || null
}

export function updateCourseProgress(courseId: string, progressPercent: number, completed: boolean = false): void {
  try {
    const progress = getUserProgress()

    if (!progress.courses[courseId]) {
      progress.courses[courseId] = {
        id: courseId,
        started: true,
        completed: false,
        progress: 0,
        modules: {},
        lastAccessed: new Date().toISOString()
      }
    }

    progress.courses[courseId] = {
      ...progress.courses[courseId],
      progress: progressPercent,
      completed: completed,
      lastAccessed: new Date().toISOString()
    }

    saveUserProgress(progress)
  } catch (error) {
    console.error('Failed to update course progress:', error)
  }
}

export function updateModuleCompletion(courseId: string, moduleId: string, completed: boolean): void {
  try {
    const progress = getUserProgress()

    if (!progress.courses[courseId]) {
      progress.courses[courseId] = {
        id: courseId,
        started: true,
        completed: false,
        progress: 0,
        modules: {},
        lastAccessed: new Date().toISOString()
      }
    }

    if (!progress.courses[courseId].modules[moduleId]) {
      progress.courses[courseId].modules[moduleId] = {
        id: moduleId,
        completed: false,
        timeSpent: 0,
        lastAccessed: new Date().toISOString()
      }
    }

    progress.courses[courseId].modules[moduleId] = {
      ...progress.courses[courseId].modules[moduleId],
      completed: completed,
      lastAccessed: new Date().toISOString()
    }

    saveUserProgress(progress)
  } catch (error) {
    console.error('Failed to update module completion:', error)
  }
}

// User settings functions
export function getUserSettings(): any {
  try {
    const data = localStorage.getItem(SETTINGS_KEY)
    return data ? JSON.parse(data) : defaultSettings
  } catch (error) {
    console.error('Failed to get user settings:', error)
    return defaultSettings
  }
}

export function updateUserSettings(settings: any): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
  } catch (error) {
    console.error('Failed to update user settings:', error)
  }
}

// Quest progress functions
export function updateQuestCompletion(pathId: string, questId: string, completed: boolean): void {
  try {
    const progress = getUserProgress()

    const questKey = `${pathId}/${questId}`

    if (!progress.quests[questKey]) {
      progress.quests[questKey] = {
        id: questId,
        pathId: pathId,
        completed: false,
        lastAccessed: new Date().toISOString()
      }
    }

    progress.quests[questKey] = {
      ...progress.quests[questKey],
      completed: completed,
      lastAccessed: new Date().toISOString()
    }

    saveUserProgress(progress)
  } catch (error) {
    console.error('Failed to update quest completion:', error)
  }
}

// Initialize local storage when this module is imported
if (typeof window !== 'undefined') {
  initLocalStorage()
}
