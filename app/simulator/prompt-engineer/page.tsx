'use client'

import { DashboardLayout } from "@/components/dashboard-layout"
import { PromptEngineerGame } from "@/components/games/prompt-engineer/PromptEngineerGame"

export default function PromptEngineerGamePage() {
  return (
    <DashboardLayout>
      <PromptEngineerGame />
    </DashboardLayout>
  )
}
