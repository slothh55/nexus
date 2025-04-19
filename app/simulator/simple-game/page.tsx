'use client'

import { useState, useEffect } from 'react'
import { DashboardLayout } from "@/components/dashboard-layout"
import { SimpleGame } from "@/components/games/simple-game/SimpleGame"
import { Simple2DGame } from "@/components/games/simple-game/Simple2DGame"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GamepadIcon, Trophy, Info } from "lucide-react"
import Link from "next/link"
import dynamic from 'next/dynamic'

// Dynamically import the debug component
const DebugInfo = dynamic(
  () => import('@/components/games/simple-game/DebugInfo').then(mod => mod.DebugInfo),
  { ssr: false }
)

export default function SimpleGamePage() {
  const [score, setScore] = useState(0)
  const [showDebug, setShowDebug] = useState(false)
  const [use3D, setUse3D] = useState(true)

  return (
    <DashboardLayout>
      {showDebug && <DebugInfo />}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <GamepadIcon className="h-8 w-8 text-indigo-500" />
              Simple 3D Game
            </h1>
            <p className="text-muted-foreground mt-2">
              A simple 3D game with sound effects to demonstrate the sound system
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              <span className="text-xl font-bold">{score}</span>
            </div>
            <Badge variant="outline" className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
              Demo Game
            </Badge>
          </div>
        </div>

        <Card className="overflow-hidden">
          <div className="h-2 w-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
          <CardHeader>
            <CardTitle>Simple 3D Game with Sound</CardTitle>
            <CardDescription>
              Click on the rotating cube to score points and hear different sound effects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex justify-end">
              <div className="flex items-center space-x-2">
                <span className={!use3D ? "font-medium" : "text-muted-foreground"}>2D</span>
                <button
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    use3D ? "bg-primary" : "bg-input"
                  }`}
                  onClick={() => setUse3D(!use3D)}
                >
                  <span
                    className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform ${
                      use3D ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
                <span className={use3D ? "font-medium" : "text-muted-foreground"}>3D</span>
              </div>
            </div>
            {use3D ? <SimpleGame /> : <Simple2DGame />}
          </CardContent>
          <CardFooter className="border-t p-4">
            <div className="rounded-lg border p-3 bg-blue-50 dark:bg-blue-950/20 w-full">
              <h3 className="font-medium mb-1 flex items-center gap-2">
                <Info className="h-4 w-4 text-blue-500" />
                About This Demo:
              </h3>
              <p className="text-sm">
                This simple game demonstrates the sound system using Howler.js. Click on the cube (3D) or square (2D) to hear different sound effects.
                Every 5 points, you'll hear a special achievement sound! If the 3D version doesn't work on your device, try switching to the 2D version.
              </p>
            </div>
          </CardFooter>
        </Card>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setShowDebug(!showDebug)}>
            {showDebug ? 'Hide Debug Info' : 'Show Debug Info'}
          </Button>
          <Button asChild variant="outline">
            <Link href="/simulator">Back to Games</Link>
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
