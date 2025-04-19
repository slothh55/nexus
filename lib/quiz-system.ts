'use client'

import { QuizProgress, saveQuizProgress, getUserProgress } from './local-storage'
import { checkAndAwardBadges, showBadgeNotification } from './badge-system'

// Quiz question type
export interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  difficulty: 'easy' | 'medium' | 'hard'
  image?: string
}

// Quiz type
export interface Quiz {
  id: string
  title: string
  description: string
  category: string
  questions: QuizQuestion[]
  timeLimit?: number
  passingScore?: number
  color: string
  icon: string
}

// Quiz result type
export interface QuizResult {
  quizId: string
  score: number
  totalQuestions: number
  correctAnswers: number
  answers: number[]
  timeTaken: number
  completed: boolean
  passed: boolean
}

// Initialize quiz progress
export function initializeQuizProgress(quizId: string, totalQuestions: number): void {
  const progress = getUserProgress()
  
  // Add quiz progress if it doesn't exist
  if (!progress.quizzes[quizId]) {
    progress.quizzes[quizId] = {
      id: quizId,
      completed: false,
      score: 0,
      totalQuestions,
      correctAnswers: 0,
      lastCompleted: '',
      attempts: 0
    }
    
    saveQuizProgress(progress.quizzes[quizId])
  }
}

// Save quiz result
export function saveQuizResult(result: QuizResult): string[] {
  // Get existing progress
  const progress = getUserProgress()
  const existingProgress = progress.quizzes[result.quizId]
  
  // Create new progress
  const newProgress: QuizProgress = {
    id: result.quizId,
    completed: result.completed,
    score: result.score,
    totalQuestions: result.totalQuestions,
    correctAnswers: result.correctAnswers,
    lastCompleted: new Date().toISOString(),
    attempts: existingProgress ? existingProgress.attempts + 1 : 1
  }
  
  // Save progress
  saveQuizProgress(newProgress)
  
  // Check for badges
  const awardedBadges = checkAndAwardBadges()
  
  // Show notifications for awarded badges
  awardedBadges.forEach(badgeId => {
    showBadgeNotification(badgeId)
  })
  
  return awardedBadges
}

// Calculate quiz score
export function calculateQuizScore(
  answers: number[],
  questions: QuizQuestion[],
  timeBonus: number = 0
): QuizResult {
  // Count correct answers
  let correctAnswers = 0
  
  answers.forEach((answer, index) => {
    if (answer === questions[index].correctAnswer) {
      correctAnswers++
    }
  })
  
  // Calculate base score
  const baseScore = Math.round((correctAnswers / questions.length) * 100)
  
  // Add time bonus
  const totalScore = baseScore + timeBonus
  
  // Determine if passed (default passing score is 70%)
  const passed = baseScore >= 70
  
  return {
    quizId: '',  // To be filled by caller
    score: totalScore,
    totalQuestions: questions.length,
    correctAnswers,
    answers,
    timeTaken: 0,  // To be filled by caller
    completed: true,
    passed
  }
}

// Get quiz progress summary
export function getQuizSummary(): {
  totalQuizzes: number
  completedQuizzes: number
  averageScore: number
  totalCorrectAnswers: number
  totalQuestions: number
} {
  const progress = getUserProgress()
  const quizzes = Object.values(progress.quizzes)
  
  if (quizzes.length === 0) {
    return {
      totalQuizzes: 0,
      completedQuizzes: 0,
      averageScore: 0,
      totalCorrectAnswers: 0,
      totalQuestions: 0
    }
  }
  
  const completedQuizzes = quizzes.filter(q => q.completed).length
  const totalScore = quizzes.reduce((sum, quiz) => sum + quiz.score, 0)
  const averageScore = totalScore / quizzes.length
  const totalCorrectAnswers = quizzes.reduce((sum, quiz) => sum + quiz.correctAnswers, 0)
  const totalQuestions = quizzes.reduce((sum, quiz) => sum + quiz.totalQuestions, 0)
  
  return {
    totalQuizzes: quizzes.length,
    completedQuizzes,
    averageScore,
    totalCorrectAnswers,
    totalQuestions
  }
}
