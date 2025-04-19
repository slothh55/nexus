import { DashboardLayout } from '@/components/dashboard-layout'
import { AIWorldBuilderGame } from '@/components/games/ai-world-builder/AIWorldBuilderGame'

export default function AIWorldBuilderPage() {
  return (
    <DashboardLayout>
      <AIWorldBuilderGame />
    </DashboardLayout>
  )
}
