'use client'

import { useState } from 'react'
import confetti from 'canvas-confetti'

// Simple confetti hook for triggering celebration animations
export const useConfetti = () => {
  const [isActive, setIsActive] = useState(false)

  const triggerConfetti = (options = {}) => {
    if (typeof window !== 'undefined') {
      setIsActive(true)
      
      // Default confetti options
      const defaultOptions = {
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      }
      
      // Merge with custom options
      const confettiOptions = { ...defaultOptions, ...options }
      
      // Fire the confetti
      confetti(confettiOptions)
      
      // Reset active state after animation
      setTimeout(() => {
        setIsActive(false)
      }, 2000)
    }
  }

  return {
    isActive,
    triggerConfetti
  }
}
