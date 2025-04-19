'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { playSound } from '@/lib/sound-system'
import { Button } from '@/components/ui/button'
import { FallbackGame } from './FallbackGame'

// Dynamically import Three.js components with no SSR
const ThreeComponents = dynamic(
  () => import('./ThreeComponents').catch(() => ({ default: ({ onBoxClick }: { onBoxClick: () => void }) => <FallbackGame onScoreChange={() => onBoxClick()} /> })),
  { ssr: false, loading: () => <div className="flex items-center justify-center h-full">Loading 3D components...</div> }
)



// Simple game component
export function SimpleGame() {
  const [score, setScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)

  // Handle box click
  const handleBoxClick = () => {
    setScore(score + 1)

    // Play different sounds based on score
    if (score % 5 === 0 && score > 0) {
      playSound('achievement')
    } else {
      playSound('click')
    }
  }

  // Start game
  const startGame = () => {
    setGameStarted(true)
    setScore(0)
    playSound('success')
  }

  return (
    <div className="w-full h-[500px] relative">
      {!gameStarted ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg border">
          <h2 className="text-2xl font-bold mb-4">Simple 3D Game</h2>
          <p className="text-center max-w-md mb-6">
            Click on the rotating cube to score points. Every 5 points you'll earn a special sound!
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
          <div className="w-full h-full">
            <Suspense fallback={<div className="flex items-center justify-center h-full">Loading game...</div>}>
              <ThreeComponents onBoxClick={handleBoxClick} />
            </Suspense>
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
