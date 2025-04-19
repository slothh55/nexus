import { phishingDefenderQuiz } from './phishing-defender-quiz'
import { factCheckerQuiz } from './fact-checker-quiz'
import { passwordHeroQuiz } from './password-hero-quiz'
import { privacyProtectorQuiz } from './privacy-protector-quiz'
import { aiEthicsQuiz } from './ai-ethics-quiz'
import { digitalCommunicationQuiz } from './digital-communication-quiz'
import { onlineSafetyQuiz } from './online-safety-quiz'
import { informationLiteracyQuiz } from './information-literacy-quiz'
import { Quiz } from '@/lib/quiz-system'

// Export all quizzes
export const quizzes: Quiz[] = [
  phishingDefenderQuiz,
  factCheckerQuiz,
  passwordHeroQuiz,
  privacyProtectorQuiz,
  aiEthicsQuiz,
  digitalCommunicationQuiz,
  onlineSafetyQuiz,
  informationLiteracyQuiz
]

// Get quiz by ID
export function getQuizById(id: string): Quiz | undefined {
  return quizzes.find(quiz => quiz.id === id)
}

// Export individual quizzes
export {
  phishingDefenderQuiz,
  factCheckerQuiz,
  passwordHeroQuiz,
  privacyProtectorQuiz,
  aiEthicsQuiz,
  digitalCommunicationQuiz,
  onlineSafetyQuiz,
  informationLiteracyQuiz
}
