// Learning path definitions
export interface LearningPath {
  id: string
  title: string
  description: string
  level: string
  estimatedTime: string
  modules: number
  tags: string[]
  color: string
  icon: string
  relatedGames: string[]
  relatedQuizzes: string[]
  relatedCourses: string[]
}

// Define learning paths with their related games and quizzes
export const learningPaths: LearningPath[] = [
  {
    id: "digital-explorer",
    title: "Digital Explorer Path",
    description: "Start your journey to become a certified Digital Explorer!",
    level: "Beginner",
    estimatedTime: "4 hours",
    modules: 8,
    tags: ["Information", "Safety", "Research"],
    color: "from-blue-500 to-green-500",
    icon: "Rocket",
    relatedGames: ["fact-checker"],
    relatedQuizzes: ["fact-checker-quiz", "information-literacy-quiz"],
    relatedCourses: ["information-literacy", "digital-research"]
  },
  {
    id: "ai-adventurer",
    title: "AI Adventurer Path",
    description: "Discover the exciting world of AI and learn how to use it responsibly!",
    level: "Intermediate",
    estimatedTime: "3 hours",
    modules: 6,
    tags: ["AI", "Ethics", "Technology"],
    color: "from-amber-500 to-purple-500",
    icon: "Sparkles",
    relatedGames: ["ai-ethics-detective", "ai-world-builder", "prompt-engineer"],
    relatedQuizzes: ["ai-ethics-quiz"],
    relatedCourses: ["ai-basics", "ai-ethics-kids"]
  },
  {
    id: "safety-ranger",
    title: "Safety Ranger Path",
    description: "Learn to protect yourself and your friends in the digital world!",
    level: "All Levels",
    estimatedTime: "5 hours",
    modules: 10,
    tags: ["Security", "Privacy", "Protection"],
    color: "from-green-500 to-teal-500",
    icon: "Shield",
    relatedGames: ["phishing-defender", "password-hero", "privacy-protector"],
    relatedQuizzes: ["phishing-defender-quiz", "password-hero-quiz", "privacy-protector-quiz", "online-safety-quiz"],
    relatedCourses: ["online-safety-basics", "password-security"]
  },
  {
    id: "communication-hero",
    title: "Communication Hero Path",
    description: "Master the art of digital communication and become a Communication Hero!",
    level: "Intermediate",
    estimatedTime: "6 hours",
    modules: 12,
    tags: ["Communication", "Collaboration", "Etiquette"],
    color: "from-purple-500 to-pink-500",
    icon: "MessageSquare",
    relatedGames: ["digital-escape-room"],
    relatedQuizzes: ["digital-communication-quiz"],
    relatedCourses: ["digital-communication", "social-media-literacy"]
  }
];

// Recommended modules for each learning path
export interface RecommendedModule {
  title: string
  path: string
  time: string
  level: string
  icon: string
  color: string
}

export const recommendedModules: RecommendedModule[] = [
  {
    title: "Finding Digital Clues",
    path: "digital-explorer",
    time: "20 min",
    level: "Beginner",
    icon: "BookOpen",
    color: "text-blue-500",
  },
  {
    title: "AI Robot Friends",
    path: "ai-adventurer",
    time: "30 min",
    level: "Intermediate",
    icon: "Bot",
    color: "text-amber-500",
  },
  {
    title: "Password Power-Up",
    path: "safety-ranger",
    time: "15 min",
    level: "Beginner",
    icon: "Shield",
    color: "text-green-500",
  },
  {
    title: "Team Talk Champions",
    path: "communication-hero",
    time: "25 min",
    level: "Intermediate",
    icon: "MessageSquare",
    color: "text-purple-500",
  }
];

// Get a learning path by ID
export function getLearningPathById(id: string): LearningPath | undefined {
  return learningPaths.find(path => path.id === id);
}

// Get all learning paths
export function getAllLearningPaths(): LearningPath[] {
  return learningPaths;
}

// Get recommended modules
export function getRecommendedModules(): RecommendedModule[] {
  return recommendedModules;
}
