"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { PrivacyGame } from "@/components/games/privacy-protector/PrivacyGame"

export default function PrivacyProtectorGamePage() {
  return (
    <DashboardLayout>
      <PrivacyGame />
    </DashboardLayout>
  )
}
