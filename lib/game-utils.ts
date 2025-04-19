import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useState, useEffect } from 'react'

// Load a GLTF/GLB model
export function useGLTF(path: string) {
  return useLoader(GLTFLoader, path)
}

// Load a texture
export function useTexture(path: string) {
  return useLoader(TextureLoader, path)
}

// Simple game state management
export function useGameState<T>(initialState: T) {
  const [state, setState] = useState<T>(initialState)
  
  const updateState = (newState: Partial<T>) => {
    setState(prevState => ({
      ...prevState,
      ...newState
    }))
  }
  
  return [state, updateState] as const
}

// Timer hook for games
export function useGameTimer(initialTime: number, onTimeEnd?: () => void) {
  const [timeLeft, setTimeLeft] = useState(initialTime)
  const [isRunning, setIsRunning] = useState(false)
  
  useEffect(() => {
    let timer: NodeJS.Timeout
    
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer)
            setIsRunning(false)
            onTimeEnd?.()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    
    return () => {
      if (timer) clearInterval(timer)
    }
  }, [isRunning, timeLeft, onTimeEnd])
  
  const startTimer = () => setIsRunning(true)
  const pauseTimer = () => setIsRunning(false)
  const resetTimer = (newTime?: number) => {
    setTimeLeft(newTime ?? initialTime)
    setIsRunning(false)
  }
  
  return { timeLeft, isRunning, startTimer, pauseTimer, resetTimer }
}

// Format time (seconds) to MM:SS
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}
