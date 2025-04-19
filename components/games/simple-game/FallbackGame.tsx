'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { playSound } from '@/lib/sound-system'

// Fallback 2D game when 3D is not available
export function FallbackGame({ onScoreChange }: { onScoreChange: (score: number) => void }) {
  const [score, setScore] = useState(0)
  const [position, setPosition] = useState({ x: 50, y: 50 })
  
  // Move the box to a random position
  const moveBox = () => {
    const newX = Math.floor(Math.random() * 80) + 10
    const newY = Math.floor(Math.random() * 80) + 10
    setPosition({ x: newX, y: newY })
    
    // Increment score
    const newScore = score + 1
    setScore(newScore)
    onScoreChange(newScore)
    
    // Play sound
    if (newScore % 5 === 0 && newScore > 0) {
      playSound('achievement')
    } else {
      playSound('click')
    }
  }
  
  return (
    <div className="w-full h-full bg-gray-900 relative">
      <div 
        className="absolute cursor-pointer bg-orange-500 hover:bg-pink-500 transition-colors rounded-md"
        style={{ 
          left: `${position.x}%`, 
          top: `${position.y}%`,
          width: '50px',
          height: '50px',
          transform: 'translate(-50%, -50%)'
        }}
        onClick={moveBox}
      />
    </div>
  )
}
