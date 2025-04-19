'use client'

import { useState, useEffect, useRef } from 'react'
import { playSound } from '@/lib/sound-system'
import { Button } from '@/components/ui/button'

export function Simple2DGame() {
  const [score, setScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [boxPosition, setBoxPosition] = useState({ x: 50, y: 50 })
  const [boxSize, setBoxSize] = useState(50)
  const gameAreaRef = useRef<HTMLDivElement>(null)
  
  // Start game
  const startGame = () => {
    setGameStarted(true)
    setScore(0)
    moveBox()
    playSound('success')
  }
  
  // Move box to random position
  const moveBox = () => {
    const newX = Math.floor(Math.random() * 80) + 10
    const newY = Math.floor(Math.random() * 80) + 10
    setBoxPosition({ x: newX, y: newY })
    
    // Make box smaller as score increases
    if (score > 0 && score % 5 === 0) {
      setBoxSize(Math.max(20, boxSize - 5))
    }
  }
  
  // Handle box click
  const handleBoxClick = () => {
    const newScore = score + 1
    setScore(newScore)
    moveBox()
    
    // Play different sounds based on score
    if (newScore % 5 === 0) {
      playSound('achievement')
    } else {
      playSound('click')
    }
  }
  
  return (
    <div className="w-full h-[500px] relative">
      {!gameStarted ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg border">
          <h2 className="text-2xl font-bold mb-4">Simple 2D Game</h2>
          <p className="text-center max-w-md mb-6">
            Click on the moving square to score points. Every 5 points you'll earn a special sound and the square will get smaller!
          </p>
          <Button onClick={startGame} className="bg-gradient-to-r from-indigo-500 to-purple-500">
            Start Game
          </Button>
        </div>
      ) : (
        <>
          <div className="absolute top-4 left-4 z-10 bg-black/50 text-white px-4 py-2 rounded-md">
            Score: {score}
          </div>
          <div 
            ref={gameAreaRef}
            className="w-full h-full bg-gradient-to-br from-gray-900 to-indigo-900 rounded-lg overflow-hidden"
          >
            <div 
              className="absolute cursor-pointer bg-orange-500 hover:bg-pink-500 transition-colors rounded-md"
              style={{ 
                left: `${boxPosition.x}%`, 
                top: `${boxPosition.y}%`,
                width: `${boxSize}px`,
                height: `${boxSize}px`,
                transform: 'translate(-50%, -50%)'
              }}
              onClick={handleBoxClick}
            />
          </div>
          <Button 
            className="absolute bottom-4 right-4 bg-red-500 hover:bg-red-600"
            onClick={() => setGameStarted(false)}
          >
            End Game
          </Button>
        </>
      )}
    </div>
  )
}
