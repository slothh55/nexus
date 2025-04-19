'use client'

import { useState } from 'react'

// Simple hook for managing game state
export const useGameState = (initialState) => {
  const [state, setState] = useState(initialState)
  
  const updateState = (newState) => {
    if (typeof newState === 'function') {
      setState(prevState => ({
        ...prevState,
        ...newState(prevState)
      }))
    } else {
      setState(prevState => ({
        ...prevState,
        ...newState
      }))
    }
  }
  
  return [state, updateState]
}

// Timer hook for game countdowns
export const useGameTimer = (duration, onTimeUp) => {
  const [timeLeft, setTimeLeft] = useState(duration)
  const [timerId, setTimerId] = useState(null)
  const [isPaused, setIsPaused] = useState(true)
  
  const startTimer = () => {
    if (isPaused) {
      setIsPaused(false)
      const id = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(id)
            if (onTimeUp) onTimeUp()
            return 0
          }
          return prev - 1
        })
      }, 1000)
      setTimerId(id)
    }
  }
  
  const pauseTimer = () => {
    if (!isPaused && timerId) {
      clearInterval(timerId)
      setIsPaused(true)
    }
  }
  
  const resetTimer = (newDuration = duration) => {
    if (timerId) clearInterval(timerId)
    setTimeLeft(newDuration)
    setIsPaused(true)
  }
  
  return {
    timeLeft,
    isPaused,
    startTimer,
    pauseTimer,
    resetTimer
  }
}

// Format time in MM:SS format
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}
