'use client'

import React from 'react'
import { useEffect, useState, useRef } from 'react'

interface PasswordGame2DProps {
  passwordStrength: number
  challengeCompleted: boolean
  timeLeft: number
  gameOver: boolean
  onGameOver?: () => void
  onPlayAgain?: () => void
  onReturnHome?: () => void
  onReturnGames?: () => void
  onScoreUpdate?: (score: number) => void
}

interface RobotPosition {
  id: number
  x: number
  y: number
  angle: number
  progress: number
  size: number
  speed: number
  lastAttack: number
  walkOffset: number
  type: 'ground' | 'drone' | 'air' // Type of robot
  hoverOffset?: number // For drone hovering animation
  exploding?: boolean // Whether the robot is exploding
  explosionProgress?: number // Progress of explosion animation (0-1)
}

interface Confetti {
  id: number
  x: number
  y: number
  size: number
  color: string
  rotation: number
  speed: number
  horizontalSpeed: number
}

// Helper function to generate unique IDs for lasers
const generateUniqueId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Helper function for timestamps (to fix the no-argument errors)
const getCurrentTimestamp = (): number => {
  return Date.now()
}

export function PasswordGame2D({
  passwordStrength,
  challengeCompleted,
  timeLeft = 60, // initial time
  gameOver = false,
  onGameOver,
  onPlayAgain,
  onReturnHome,
  onReturnGames,
  onScoreUpdate
}: PasswordGame2DProps) {
  const [castleHealth, setCastleHealth] = useState(100)
  const [robots, setRobots] = useState<RobotPosition[]>([])
  const [confetti, setConfetti] = useState<Confetti[]>([])
  const [showWinScreen, setShowWinScreen] = useState(false)
  const [robotsExploding, setRobotsExploding] = useState(false)
  const [resetCounter, setResetCounter] = useState(0) // Counter to force re-render on reset
  // Internal countdown timer state
  const [localTimeLeft, setLocalTimeLeft] = useState(timeLeft)
  // Store calculated score
  const [gameScore, setGameScore] = useState(0)
  const gameOverCalled = useRef<boolean>(false)

  // Reset internal timer on resetCounter or initial timeLeft change
  useEffect(() => {
    setLocalTimeLeft(timeLeft)
    gameOverCalled.current = false
  }, [resetCounter, timeLeft])

  // Countdown effect: decrement every second until zero
  useEffect(() => {
    if (gameOver || challengeCompleted) return
    if (localTimeLeft <= 0) {
      if (!gameOverCalled.current) {
        gameOverCalled.current = true
        onGameOver?.()
      }
      return
    }
    const timerId = setInterval(() => {
      setLocalTimeLeft(prev => Math.max(0, prev - 1))
    }, 1000)
    return () => clearInterval(timerId)
  }, [localTimeLeft, gameOver, challengeCompleted, onGameOver])

  const animationRef = useRef<number>()
  const confettiRef = useRef<number>()
  const winTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize robots
  useEffect(() => {
    // Create ground robots and flying drones
    const totalRobots = 8 // Total number of robots
    const groundRobots = 5 // Number of ground robots
    const drones = totalRobots - groundRobots // Number of flying drones

    const initialRobots = [];

    // Create ground robots
    for (let i = 0; i < groundRobots; i++) {
      const angle = (i / groundRobots) * Math.PI * 2
      const distance = 350 // Start from very far outside (increased distance)
      const x = Math.cos(angle) * distance
      // Place ground robots at the bottom of the screen
      const y = Math.sin(angle) * distance / 2 - 100 // Lower position for ground robots
      // Make robots bigger and size based on password strength (weaker = bigger threat)
      const size = 18 + (100 - passwordStrength) / 5 // Bigger size
      // Calculate speed so robots reach the castle at the end of the timer
      // Distance to travel / time in seconds / frames per second
      const speed = (distance - 40) / (60 * 60) // Always use 60 seconds for consistent speed

      initialRobots.push({
        id: i,
        x,
        y,
        angle,
        progress: 0,
        size,
        speed,
        lastAttack: 0,
        walkOffset: Math.random() * Math.PI, // Random offset for walking animation
        type: 'ground'
      })
    }

    // Create flying drones
    for (let i = 0; i < drones; i++) {
      const angle = ((i / drones) * Math.PI * 2) + (Math.PI / drones) // Offset from ground robots
      const distance = 320 // Start from very far outside (increased distance)
      const x = Math.cos(angle) * distance
      const y = Math.sin(angle) * distance / 2 + 80 // Much higher altitude for drones
      // Drones are smaller but faster
      const size = 14 + (100 - passwordStrength) / 8
      // Drones move faster
      const speed = (distance - 40) / (60 * 50) // Always use 60 seconds for consistent speed

      initialRobots.push({
        id: groundRobots + i,
        x,
        y,
        angle,
        progress: 0,
        size,
        speed,
        lastAttack: 0,
        walkOffset: 0,
        hoverOffset: Math.random() * Math.PI * 2, // For hovering animation
        type: 'drone'
      })
    }

    setRobots(initialRobots)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [passwordStrength, resetCounter])

  // Update robot positions and handle attacks
  useEffect(() => {
    if (gameOver || challengeCompleted) return

    const updateRobots = (timestamp: number) => {
      setRobots(prevRobots => {
        return prevRobots.map(robot => {
          // Use a simple percentage-based approach for targeting
          // Horizontally: Target the center of the scene
          const castleX = 0 // Center of the scene horizontally

          // Vertically: Target a point about 20% up from the bottom
          // The scene height is 64px, so 20% up is around 13px
          const castleY = 13 // Fixed position that's 20% up from the bottom

          // Calculate direction to target
          const dx = castleX - robot.x
          const dy = castleY - robot.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Update robot position
          let newX = robot.x
          let newY = robot.y
          let newProgress = robot.progress
          let newWalkOffset = robot.walkOffset
          let newHoverOffset = robot.hoverOffset || 0

          // Different movement patterns for ground robots and drones
          if (robot.type === 'ground') {
            // Ground robots move directly towards castle
            newX += (dx / distance) * robot.speed
            newY += (dy / distance) * robot.speed
            newProgress += robot.speed
            newWalkOffset = (robot.walkOffset + 0.1) % (Math.PI * 2) // Update walking animation
          } else {
            // Drones have a more erratic movement pattern
            newX += (dx / distance) * robot.speed * (1 + Math.sin(newHoverOffset) * 0.2)
            newY += (dy / distance) * robot.speed * (1 + Math.cos(newHoverOffset) * 0.2)
            newProgress += robot.speed
            newHoverOffset = (newHoverOffset + 0.05) % (Math.PI * 2) // Update hovering animation
          }

          // Return updated robot position only
          return {
            ...robot,
            x: newX,
            y: newY,
            progress: newProgress,
            walkOffset: newWalkOffset,
            hoverOffset: newHoverOffset
          }
        })
      })

      animationRef.current = requestAnimationFrame(updateRobots)
    }

    animationRef.current = requestAnimationFrame(updateRobots)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [challengeCompleted, gameOver])

  // Health decrease timer - reduce health by 5% every 3 seconds with visual indicator
  const [showDamageFlash, setShowDamageFlash] = useState(false)

  useEffect(() => {
    if (gameOver || challengeCompleted) return

    const healthInterval = setInterval(() => {
      // Show damage flash
      setShowDamageFlash(true)

      // Hide damage flash after 500ms
      setTimeout(() => {
        setShowDamageFlash(false)
      }, 500)

      // Reduce castle health
      setCastleHealth(prev => Math.max(0, prev - 5))
    }, 3000) // Every 3 seconds

    return () => clearInterval(healthInterval)
  }, [gameOver, challengeCompleted])

  // Check for game over when castle health reaches 0
  useEffect(() => {
    if (castleHealth <= 0 && !challengeCompleted && !gameOverCalled.current) {
      gameOverCalled.current = true
      onGameOver && onGameOver()
    }

    if (castleHealth > 0 && gameOverCalled.current) {
      gameOverCalled.current = false
    }
  }, [castleHealth, challengeCompleted, onGameOver])

  // Handle confetti animation and delayed win screen
  useEffect(() => {
    if (challengeCompleted && !showWinScreen) {
      // Calculate score when challenge is completed
      const timeBonus = Math.round((localTimeLeft / 60) * 500); // Up to 500 points for time
      const healthBonus = Math.round((castleHealth / 100) * 300); // Up to 300 points for health
      const strengthBonus = Math.round((passwordStrength / 100) * 200); // Up to 200 points for password strength
      
      const totalScore = timeBonus + healthBonus + strengthBonus;
      setGameScore(totalScore);
      
      // Pass score to parent component if callback exists
      if (onScoreUpdate) {
        onScoreUpdate(totalScore);
      }

      // Create confetti particles
      const confettiCount = 100
      const newConfetti = []

      for (let i = 0; i < confettiCount; i++) {
        newConfetti.push({
          id: i,
          x: Math.random() * 300 - 150, // Random position across the screen
          y: -100 - Math.random() * 100, // Start above the screen
          size: 5 + Math.random() * 10,
          color: [
            '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff',
            '#ff8800', '#8800ff', '#00ff88', '#ff0088'
          ][Math.floor(Math.random() * 10)],
          rotation: Math.random() * 360,
          speed: 2 + Math.random() * 3,
          horizontalSpeed: Math.random() * 2 - 1
        })
      }

      setConfetti(newConfetti)

      // Animate confetti
      const animateConfetti = () => {
        setConfetti(prev => {
          return prev.map(particle => ({
            ...particle,
            y: particle.y + particle.speed,
            x: particle.x + particle.horizontalSpeed,
            rotation: particle.rotation + 2
          })).filter(particle => particle.y < 300) // Remove particles that fall off screen
        })

        confettiRef.current = requestAnimationFrame(animateConfetti)
      }

      confettiRef.current = requestAnimationFrame(animateConfetti)

      // Start robot explosions after a short delay
      setTimeout(() => {
        setRobotsExploding(true)

        // Mark all robots as exploding
        setRobots(prevRobots => {
          return prevRobots.map(robot => ({
            ...robot,
            exploding: true,
            explosionProgress: 0
          }))
        })
      }, 500) // Start explosions after 500ms

      // Show win screen after delay
      winTimerRef.current = setTimeout(() => {
        setShowWinScreen(true)
      }, 3000) // 3 second delay

      return () => {
        if (confettiRef.current) {
          cancelAnimationFrame(confettiRef.current)
        }
        if (winTimerRef.current) {
          clearTimeout(winTimerRef.current)
        }
      }
    }
  }, [challengeCompleted, showWinScreen, localTimeLeft, castleHealth, passwordStrength, onScoreUpdate]);

  // Handle robot explosions
  useEffect(() => {
    if (!robotsExploding) return

    const animateExplosions = () => {
      setRobots(prevRobots => {
        return prevRobots.map(robot => {
          if (!robot.exploding) return robot

          // Increment explosion progress
          const newProgress = (robot.explosionProgress || 0) + 0.02

          return {
            ...robot,
            explosionProgress: newProgress
          }
        })
      })

      // Continue animation until win screen shows
      if (!showWinScreen) {
        requestAnimationFrame(animateExplosions)
      }
    }

    const explosionAnimationId = requestAnimationFrame(animateExplosions)

    return () => cancelAnimationFrame(explosionAnimationId)
  }, [robotsExploding, showWinScreen])

  // Simplified game reset function
  const resetGame = () => {
    // Increment reset counter to force component re-render
    setResetCounter(prev => prev + 1)

    // Reset all state variables to initial values
    // Ensure castle health is reset to full
    setCastleHealth(100)
    // Clear any active lasers
    // Reset robot positions
    setRobots([]) // Clear robots - useEffect will re-initialize them
    setConfetti([])
    setRobotsExploding(false)
    setShowWinScreen(false)
    setShowDamageFlash(false)

    // Reset score
    setGameScore(0);

    // Reset GameOver flag
    gameOverCalled.current = false

    // Clear any active animation frames
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = undefined
    }

    if (confettiRef.current) {
      cancelAnimationFrame(confettiRef.current)
      confettiRef.current = undefined
    }

    // Clear any active timers
    if (winTimerRef.current) {
      clearTimeout(winTimerRef.current)
      winTimerRef.current = null
    }
  }

  // Get color based on password strength
  const getStrengthColor = () => {
    if (passwordStrength >= 80) return 'bg-green-500'
    if (passwordStrength >= 60) return 'bg-blue-500'
    if (passwordStrength >= 40) return 'bg-yellow-500'
    if (passwordStrength >= 20) return 'bg-orange-500'
    return 'bg-red-500'
  }

  return (
    <div
      key={resetCounter} // Use reset counter as key to force complete re-render
      className="w-full h-full min-h-[400px] bg-gradient-to-br from-indigo-900 to-purple-900 rounded-lg flex flex-col items-center justify-center text-white p-4"
    >
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold mb-2">Password Fortress</h3>
        <p className="text-sm opacity-80">Defend your fortress from robot attackers!</p>
      </div>

      {/* Timer */}
      <div className={`text-center mb-4 ${localTimeLeft < 15 ? 'text-red-400 animate-pulse' : ''}`}>
        <div className="text-sm font-medium">Time Remaining:</div>
        <div className="text-xl font-bold">
          {Math.floor(localTimeLeft / 60)}:{(localTimeLeft % 60).toString().padStart(2, '0')}
        </div>
      </div>

      {/* Password Strength Meter */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4">
        <div className="mb-2 text-sm font-medium">Password Strength: {passwordStrength}%</div>
        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${getStrengthColor()}`}
            style={{ width: `${passwordStrength}%` }}
          />
        </div>
      </div>

      {/* Castle Health Bar */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-sm rounded-lg p-2 mb-4">
        <div className="mb-1 text-sm font-medium">Castle Health: {castleHealth}%</div>
        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${
              castleHealth > 60 ? 'bg-green-500' :
              castleHealth > 30 ? 'bg-yellow-500' :
              'bg-red-500'
            }`}
            style={{ width: `${castleHealth}%` }}
          />
        </div>
      </div>

      {/* Game Visualization - Detailed Castle and Robots */}
      <div className="relative w-64 h-64 mb-4">
        {/* Base/Ground */}
        <div className="absolute bottom-0 w-full h-4 bg-purple-800 rounded-full"></div>

        {/* Moat */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-48 h-2 bg-blue-500 rounded-full opacity-70"></div>

        {/* Outer Wall */}
        <div
          className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 w-40 rounded-t-lg transition-all duration-500 ${showDamageFlash ? 'bg-red-600' : 'bg-gray-600'}`}
          style={{ height: `${Math.max(20, passwordStrength/2)}px` }}
        >
          {/* Wall details - crenellations */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`outer-crenel-${i}`}
              className={`absolute top-0 w-3 h-2 ${showDamageFlash ? 'bg-red-700' : 'bg-gray-700'}`}
              style={{ left: `${i * 5}px` }}
            ></div>
          ))}

          {/* Damage flash overlay */}
          {showDamageFlash && (
            <div className="absolute inset-0 bg-red-500 opacity-30 rounded-t-lg z-10"></div>
          )}
        </div>

        {/* Inner Wall */}
        <div
          className={`absolute left-1/2 transform -translate-x-1/2 w-32 rounded-t-lg transition-all duration-500 ${showDamageFlash ? 'bg-red-500' : 'bg-gray-500'}`}
          style={{
            height: `${Math.max(30, passwordStrength/1.5)}px`,
            bottom: `${Math.max(20, passwordStrength/2) + 4}px`
          }}
        >
          {/* Wall details - windows */}
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`window-${i}`}
              className="absolute bg-blue-900 w-4 h-4 rounded-t-lg"
              style={{
                left: `${8 + i * 8}px`,
                top: `${10}px`
              }}
            ></div>
          ))}

          {/* Damage flash overlay */}
          {showDamageFlash && (
            <div className="absolute inset-0 bg-red-500 opacity-40 rounded-t-lg z-10"></div>
          )}
        </div>

        {/* Central Tower */}
        <div
          className={`absolute left-1/2 transform -translate-x-1/2 w-20 rounded-t-lg transition-all duration-500 ${showDamageFlash ? 'bg-red-400' : 'bg-gray-400'}`}
          style={{
            height: `${Math.max(40, passwordStrength)}px`,
            bottom: `${Math.max(20, passwordStrength/2) + Math.max(30, passwordStrength/1.5) + 4}px`
          }}
        >
          {/* Tower windows */}
          <div className="absolute bg-blue-900 w-6 h-8 rounded-t-lg left-7 top-10"></div>

          {/* Tower door */}
          <div className="absolute bg-yellow-900 w-8 h-10 rounded-t-lg left-6 bottom-0"></div>

          {/* Damage flash overlay */}
          {showDamageFlash && (
            <div className="absolute inset-0 bg-red-500 opacity-50 rounded-t-lg z-10"></div>
          )}
        </div>

        {/* Tower Top */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 w-0 h-0 transition-all duration-500"
          style={{
            borderLeft: '15px solid transparent',
            borderRight: '15px solid transparent',
            borderBottom: '20px solid #e2e8f0',
            bottom: `${Math.max(20, passwordStrength/2) + Math.max(30, passwordStrength/1.5) + Math.max(40, passwordStrength) + 4}px`
          }}
        ></div>

        {/* Flag */}
        <div
          className="absolute transition-all duration-500"
          style={{
            left: `calc(50% + 5px)`,
            bottom: `${Math.max(20, passwordStrength/2) + Math.max(30, passwordStrength/1.5) + Math.max(40, passwordStrength) + 24}px`,
          }}
        >
          <div className="w-1 h-12 bg-gray-800"></div>
          <div
            className="absolute w-8 h-6 left-1 top-0"
            style={{
              background: passwordStrength >= 70 ? '#10b981' :
                       passwordStrength >= 40 ? '#f59e0b' : '#ef4444',
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 25% 50%)'
            }}
          ></div>
        </div>

        {/* Treasure chest */}
        <div
          className={`absolute w-8 h-6 bg-yellow-800 border border-yellow-600 rounded transition-all duration-500 ${challengeCompleted ? 'bg-yellow-600' : ''}`}
          style={{
            bottom: `${Math.max(20, passwordStrength/2) + Math.max(30, passwordStrength/1.5) + Math.max(40, passwordStrength) + 20}px`,
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        ></div>

        {/* Robot enemies */}
        {robots.map((robot) => {
          const { id, x, y, size, walkOffset, type, hoverOffset = 0, exploding, explosionProgress = 0 } = robot

          // If robot is exploding, render explosion instead
          if (exploding && explosionProgress > 0) {
            // Create explosion effect with more particles and variety
            const particleCount = 20 // More particles for a bigger explosion
            const explosionParticles = []

            // Only render explosion if progress is less than 1 (not complete)
            if (explosionProgress < 1) {
              // Main explosion particles
              for (let i = 0; i < particleCount; i++) {
                const angle = (i / particleCount) * Math.PI * 2
                // Add some randomness to the distance
                const distance = explosionProgress * size * (2 + Math.random())
                const particleX = x + Math.cos(angle) * distance
                const particleY = y + Math.sin(angle) * distance
                // Vary particle sizes
                const particleSize = size * (0.1 + Math.random() * 0.2) * (1 - explosionProgress)
                // Vary colors slightly
                const colorVariation = Math.floor(Math.random() * 30)
                const particleColor = type === 'ground' ?
                  `rgb(${255 - colorVariation}, ${51 - colorVariation}, ${51 - colorVariation})` :
                  `rgb(${255 - colorVariation}, ${0}, ${102 - colorVariation})`

                explosionParticles.push(
                  <div
                    key={`explosion-${id}-${i}`}
                    className="absolute rounded-full"
                    style={{
                      width: `${particleSize}px`,
                      height: `${particleSize}px`,
                      left: `calc(50% + ${particleX}px)`,
                      bottom: type === 'ground' ? `${50 + particleY}px` : `${100 + particleY}px`,
                      background: particleColor,
                      boxShadow: `0 0 ${size * 0.7}px ${particleColor}`,
                      opacity: 1 - explosionProgress,
                      transform: 'translate(-50%, 0)',
                      zIndex: 20
                    }}
                  />
                )
              }

              // Add debris particles (smaller, darker fragments)
              for (let i = 0; i < particleCount / 2; i++) {
                const angle = (i / (particleCount / 2)) * Math.PI * 2 + Math.random() * 0.5
                const distance = explosionProgress * size * (1.5 + Math.random() * 1.5)
                const particleX = x + Math.cos(angle) * distance
                const particleY = y + Math.sin(angle) * distance
                const particleSize = size * 0.1 * (1 - explosionProgress)

                explosionParticles.push(
                  <div
                    key={`debris-${id}-${i}`}
                    className="absolute"
                    style={{
                      width: `${particleSize}px`,
                      height: `${particleSize}px`,
                      left: `calc(50% + ${particleX}px)`,
                      bottom: type === 'ground' ? `${50 + particleY}px` : `${100 + particleY}px`,
                      background: '#333333',
                      boxShadow: '0 0 3px #000000',
                      opacity: 1 - explosionProgress,
                      transform: `translate(-50%, 0) rotate(${Math.random() * 360}deg)`,
                      zIndex: 21
                    }}
                  />
                )
              }

              // Add central explosion flash (larger and brighter)
              explosionParticles.push(
                <div
                  key={`explosion-center-${id}`}
                  className="absolute rounded-full"
                  style={{
                    width: `${size * (1 - explosionProgress) * 3}px`,
                    height: `${size * (1 - explosionProgress) * 3}px`,
                    left: `calc(50% + ${x}px)`,
                    bottom: type === 'ground' ? `${50 + y}px` : `${100 + y}px`,
                    background: 'white',
                    boxShadow: `0 0 ${size * 1.5}px ${type === 'ground' ? '#ff3333' : '#ff0066'}`,
                    opacity: 0.9 - explosionProgress * 0.9,
                    transform: 'translate(-50%, 0)',
                    zIndex: 19
                  }}
                />
              )

              // Add secondary glow for more dramatic effect
              explosionParticles.push(
                <div
                  key={`explosion-glow-${id}`}
                  className="absolute rounded-full"
                  style={{
                    width: `${size * (1 - explosionProgress) * 4}px`,
                    height: `${size * (1 - explosionProgress) * 4}px`,
                    left: `calc(50% + ${x}px)`,
                    bottom: type === 'ground' ? `${50 + y}px` : `${100 + y}px`,
                    background: 'transparent',
                    boxShadow: `0 0 ${size * 2}px ${type === 'ground' ? '#ff6666' : '#ff66cc'}`,
                    opacity: 0.6 - explosionProgress * 0.6,
                    transform: 'translate(-50%, 0)',
                    zIndex: 18
                  }}
                />
              )

              return <>{explosionParticles}</>
            }

            return null // Don't render anything if explosion is complete
          }

          if (type === 'ground') {
            // Ground robot (android-like)
            // Walking animation - make legs move
            const legOffset = Math.sin(walkOffset) * 2

            return (
              <div
                key={id}
                className="absolute bg-gray-800 rounded-md"
                style={{
                  width: `${size}px`,
                  height: `${size * 1.5}px`,
                  left: `calc(50% + ${x}px)`,
                  bottom: `${y < -50 ? 10 : 50 + y}px`, // Ensure ground robots are on the ground
                  transform: 'translate(-50%, 0)', // Only center horizontally
                  zIndex: 5
                }}
              >
                {/* Robot head - more menacing */}
                <div className="absolute bg-gray-700 rounded-sm"
                  style={{
                    width: `${size * 0.8}px`,
                    height: `${size * 0.6}px`,
                    top: `${-size * 0.3}px`,
                    left: `${size * 0.1}px`
                  }}>
                  {/* Robot eyes - two glowing red eyes */}
                  <div className="absolute bg-red-600 rounded-full"
                    style={{
                      width: `${size * 0.25}px`,
                      height: `${size * 0.15}px`,
                      top: `${size * 0.2}px`,
                      left: `${size * 0.1}px`,
                      boxShadow: '0 0 8px #ff0000',
                      opacity: 0.9
                    }}></div>
                  <div className="absolute bg-red-600 rounded-full"
                    style={{
                      width: `${size * 0.25}px`,
                      height: `${size * 0.15}px`,
                      top: `${size * 0.2}px`,
                      right: `${size * 0.1}px`,
                      boxShadow: '0 0 8px #ff0000',
                      opacity: 0.9
                    }}></div>
                </div>

                {/* Robot body */}
                <div className="absolute bg-gray-800"
                  style={{
                    width: `${size * 0.8}px`,
                    height: `${size * 0.6}px`,
                    top: `${size * 0.5}px`,
                    left: `${size * 0.1}px`
                  }}>
                  {/* Body details */}
                  <div className="absolute bg-red-500 rounded-full"
                    style={{
                      width: `${size * 0.1}px`,
                      height: `${size * 0.1}px`,
                      top: `${size * 0.25}px`,
                      left: `${size * 0.35}px`,
                      boxShadow: '0 0 5px #ff0000',
                      opacity: 0.8
                    }}></div>
                </div>

                {/* Robot legs with walking animation */}
                <div className="absolute bg-gray-600 rounded-sm"
                  style={{
                    width: `${size * 0.25}px`,
                    height: `${size * 0.6}px`,
                    bottom: `${-size * 0.3 - legOffset}px`,
                    left: `${size * 0.2}px`,
                    transform: `rotate(${legOffset * 10}deg)`
                  }}></div>
                <div className="absolute bg-gray-600 rounded-sm"
                  style={{
                    width: `${size * 0.25}px`,
                    height: `${size * 0.6}px`,
                    bottom: `${-size * 0.3 + legOffset}px`,
                    right: `${size * 0.2}px`,
                    transform: `rotate(${-legOffset * 10}deg)`
                  }}></div>
              </div>
            )
          } else {
            // Flying drone
            // Hovering animation
            const hoverY = Math.sin(hoverOffset) * 3

            return (
              <div
                key={id}
                className="absolute"
                style={{
                  width: `${size}px`,
                  height: `${size * 0.6}px`,
                  left: `calc(50% + ${x}px)`,
                  bottom: `${100 + y + hoverY}px`, // Keep drones higher in the air
                  transform: 'translate(-50%, 0)', // Only center horizontally
                  zIndex: 5
                }}
              >
                {/* Drone body */}
                <div className="absolute bg-gray-700 rounded-full"
                  style={{
                    width: `${size}px`,
                    height: `${size * 0.4}px`,
                    top: `${size * 0.1}px`,
                    left: 0
                  }}></div>

                {/* Drone eye/sensor */}
                <div className="absolute bg-red-600 rounded-full"
                  style={{
                    width: `${size * 0.2}px`,
                    height: `${size * 0.2}px`,
                    top: `${size * 0.2}px`,
                    left: `${size * 0.4}px`,
                    boxShadow: '0 0 8px #ff0000',
                    opacity: 0.9
                  }}></div>

                {/* Drone glow */}
                <div className="absolute bg-blue-500 rounded-full"
                  style={{
                    width: `${size * 0.8}px`,
                    height: `${size * 0.2}px`,
                    bottom: `${-size * 0.1}px`,
                    left: `${size * 0.1}px`,
                    opacity: 0.4,
                    boxShadow: '0 0 12px #3b82f6'
                  }}></div>
              </div>
            )
          }
        })}

        {/* Confetti */}
        {confetti.map((particle) => (
          <div
            key={particle.id}
            className="absolute"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              left: `calc(50% + ${particle.x}px)`,
              bottom: `calc(50% + ${particle.y}px)`,
              transform: `rotate(${particle.rotation}deg)`,
              opacity: 0.8
            }}
          ></div>
        ))}
      </div>

      {/* Game state indicators */}
      {challengeCompleted && !gameOver && (
        <div className="bg-green-500 text-white text-sm px-3 py-1 rounded-full animate-pulse">
          Challenge Complete!
        </div>
      )}

      {gameOver && !challengeCompleted && (
        <div className="bg-red-500 text-white text-sm px-3 py-1 rounded-full animate-pulse">
          Fortress Breached!
        </div>
      )}

      {/* Win Screen */}
      {challengeCompleted && showWinScreen && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center p-6 z-10 rounded-lg">
          <div className="bg-gradient-to-b from-green-900 to-green-700 p-6 rounded-lg shadow-lg max-w-md w-full text-center">
            <div className="text-4xl font-bold text-white mb-4">Victory!</div>
            <div className="text-xl text-green-100 mb-6">Your fortress has withstood the attack!</div>

            {/* Score breakdown */}
            <div className="bg-green-800/50 rounded-lg p-4 mb-6">
              <div className="text-2xl font-bold text-white mb-2">Score: {gameScore}</div>
              <div className="grid grid-cols-3 gap-2 text-sm text-green-100">
                <div>
                  <div className="font-medium">Time Bonus</div>
                  <div className="text-xl">{Math.round((localTimeLeft / 60) * 500)}</div>
                </div>
                <div>
                  <div className="font-medium">Health Bonus</div>
                  <div className="text-xl">{Math.round((castleHealth / 100) * 300)}</div>
                </div>
                <div>
                  <div className="font-medium">Password</div>
                  <div className="text-xl">{Math.round((passwordStrength / 100) * 200)}</div>
                </div>
              </div>
            </div>

            <div className="text-green-100 mb-8">
              Your password was strong enough to protect your digital fortress. Well done!
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <button
                onClick={() => {
                  resetGame() // Reset the game state first
                  onPlayAgain && onPlayAgain() // Then call the parent callback
                }}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Play Again
              </button>
              <button
                onClick={onReturnGames}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors"
              >
                More Games
              </button>
              <button
                onClick={onReturnHome}
                className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Home
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lose Screen */}
      {gameOver && !challengeCompleted && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center p-6 z-10 rounded-lg">
          <div className="bg-gradient-to-b from-red-900 to-red-700 p-6 rounded-lg shadow-lg max-w-md w-full text-center">
            <div className="text-4xl font-bold text-white mb-4">Defeat!</div>
            <div className="text-xl text-red-100 mb-6">Your fortress has been breached!</div>

            <div className="text-red-100 mb-8">
              Your password wasn't strong enough. The robot attackers have breached your defenses!
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <button
                onClick={() => {
                  resetGame() // Reset the game state first
                  onPlayAgain && onPlayAgain() // Then call the parent callback
                }}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={onReturnGames}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors"
              >
                More Games
              </button>
              <button
                onClick={onReturnHome}
                className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
