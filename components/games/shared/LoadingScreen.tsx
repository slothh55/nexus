'use client'

import React from 'react'
import { Progress } from '@/components/ui/progress'
import { GamepadIcon } from 'lucide-react'

interface LoadingScreenProps {
  progress?: number
  message?: string
}

export function LoadingScreen({ 
  progress = 0, 
  message = 'Loading game assets...' 
}: LoadingScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[400px] bg-muted/50 rounded-lg">
      <div className="animate-bounce mb-4">
        <div className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 p-3">
          <GamepadIcon className="h-8 w-8 text-white" />
        </div>
      </div>
      <h3 className="text-xl font-bold mb-2">Getting Ready!</h3>
      <p className="text-muted-foreground mb-4">{message}</p>
      <div className="w-64 mb-2">
        <Progress value={progress} className="h-2" />
      </div>
      <p className="text-sm text-muted-foreground">{Math.round(progress)}%</p>
    </div>
  )
}
