'use client'

import React from 'react'

interface Text3DProps {
  children: React.ReactNode
  position: [number, number, number]
  fontSize?: number
  color?: string
}

export function Text3D({ children, position, fontSize = 0.3, color = '#ffffff' }: Text3DProps) {
  // This is a 2D implementation that simulates 3D text positioning
  // In a real Three.js implementation, this would use actual 3D positioning
  
  // Convert 3D position to 2D screen position (simplified)
  // For 2D games, we'll just use x and y, ignoring z
  const [x, y, z] = position
  
  // Scale to fit the container
  const scaledX = 50 + (x * 10) // Center (0) is 50%, scale by 10
  const scaledY = 50 + (y * 10) // Center (0) is 50%, scale by 10
  
  return (
    <div 
      className="absolute transform -translate-x-1/2 -translate-y-1/2 text-center"
      style={{ 
        left: `${scaledX}%`, 
        top: `${scaledY}%`,
        fontSize: `${fontSize * 2}rem`,
        color,
        textShadow: '0 0 5px rgba(0,0,0,0.5)'
      }}
    >
      {children}
    </div>
  )
}
