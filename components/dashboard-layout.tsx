"use client";

import type { ReactNode } from "react"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { Rocket, Sparkles } from "lucide-react"

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 border-r bg-background p-4">
        <div className="flex items-center gap-2 font-bold text-xl mb-6">
          <div className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 p-2">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">Nexus AI</span>
        </div>
        <MainNav />
        <div className="mt-auto pt-4">
          <ModeToggle />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="border-b bg-background p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-medium md:hidden flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-indigo-500" />
              <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                Nexus AI
              </span>
            </h1>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                <Rocket className="h-4 w-4 text-indigo-500" />
                <span>Ready for your next adventure?</span>
              </div>
              <UserNav />
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto bg-gradient-to-b from-white to-indigo-50/30 dark:from-background dark:to-indigo-950/10">
          {children}
        </main>
      </div>
    </div>
  )
}

