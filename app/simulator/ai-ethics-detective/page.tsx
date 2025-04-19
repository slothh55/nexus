'use client'

import { DashboardLayout } from "@/components/dashboard-layout"
import { AIEthicsDetectiveGame } from "@/components/games/ai-ethics-detective/AIEthicsDetectiveGame"

export default function AIEthicsDetectiveGamePage() {
  return (
    <DashboardLayout>
      <AIEthicsDetectiveGame />
    </DashboardLayout>
  )
}
