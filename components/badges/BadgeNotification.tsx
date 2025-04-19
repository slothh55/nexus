'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '@/lib/badge-system'
import { Shield, Brain, Lock, Trophy, Award, Sparkles, X } from 'lucide-react'
import confetti from 'canvas-confetti'
import { playSound } from '@/lib/sound-system'

interface BadgeNotificationProps {
  badge: Badge
  onClose: () => void
  autoClose?: boolean
  autoCloseDelay?: number
}

export function BadgeNotification({
  badge,
  onClose,
  autoClose = true,
  autoCloseDelay = 5000
}: BadgeNotificationProps) {
  const [isVisible, setIsVisible] = useState(true)

  // Auto close after delay
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(onClose, 500) // Wait for exit animation to complete
      }, autoCloseDelay)

      return () => clearTimeout(timer)
    }
  }, [autoClose, autoCloseDelay, onClose])

  // Trigger confetti and play sound when component mounts
  useEffect(() => {
    triggerConfetti()
    playSound('achievement')
  }, [])

  // Get icon component
  const getIconComponent = () => {
    switch (badge.icon) {
      case 'Shield':
        return Shield
      case 'Brain':
        return Brain
      case 'Lock':
        return Lock
      case 'Trophy':
        return Trophy
      case 'Award':
        return Award
      case 'Sparkles':
        return Sparkles
      default:
        return Award
    }
  }

  const IconComponent = getIconComponent()

  // Trigger confetti
  const triggerConfetti = () => {
    try {
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        })
      } else {
        console.log('Confetti library not available')
      }
    } catch (error) {
      console.error('Failed to trigger confetti:', error)
    }
  }

  // Handle close
  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 500) // Wait for exit animation to complete
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-4 right-4 z-50 max-w-sm"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden border">
            <div className={`h-2 w-full bg-gradient-to-r ${badge.color}`}></div>
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className={`rounded-full bg-gradient-to-r ${badge.color} p-3 flex-shrink-0`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg">Badge Unlocked!</h3>
                    <button
                      onClick={handleClose}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <p className="font-medium text-base mt-1">{badge.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{badge.description}</p>

                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {badge.category}
                    </span>

                    <button
                      onClick={handleClose}
                      className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      View in Collection
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
