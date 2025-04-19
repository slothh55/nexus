'use client'

import React from 'react'

interface GameCanvasProps {
  children: React.ReactNode
  controls?: boolean
  background?: string
}

export function GameCanvas({ children, controls = true, background = '#000000' }: GameCanvasProps) {
  return (
    <div 
      className="w-full h-full min-h-[400px] relative overflow-hidden"
      style={{ background }}
    >
      {children}
    </div>
  )
}
