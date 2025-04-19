'use client'

import { useState, useEffect } from 'react'

// Simple achievement hook for storing and retrieving achievements
export const useAchievements = (gameId: string) => {
  const [achievements, setAchievements] = useState<string[]>([])

  // Load achievements from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedAchievements = localStorage.getItem(`${gameId}-achievements`)
        if (savedAchievements) {
          setAchievements(JSON.parse(savedAchievements))
        }
      } catch (error) {
        console.error('Error loading achievements:', error)
      }
    }
  }, [gameId])

  // Add a new achievement
  const addAchievement = (achievementId: string) => {
    if (!achievements.includes(achievementId)) {
      const newAchievements = [...achievements, achievementId]
      setAchievements(newAchievements)
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(`${gameId}-achievements`, JSON.stringify(newAchievements))
        } catch (error) {
          console.error('Error saving achievements:', error)
        }
      }
      
      return true // Achievement was newly added
    }
    
    return false // Achievement was already earned
  }

  return {
    achievements,
    addAchievement
  }
}
