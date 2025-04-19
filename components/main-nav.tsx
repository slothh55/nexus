"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Home, MessageSquare, FileText, PlayCircle, BarChart3, Settings, Award, Rocket, BookOpen, BarChart } from "lucide-react"

const routes = [
  {
    name: "Home",
    path: "/",
    icon: Home,
    color: "text-indigo-500",
  },
  {
    name: "My Progress",
    path: "/progress",
    icon: BarChart,
    color: "text-blue-500",
  },
  {
    name: "Learning Paths",
    path: "/learning-paths",
    icon: Rocket,
    color: "text-purple-500",
  },
  {
    name: "Courses",
    path: "/courses",
    icon: BookOpen,
    color: "text-green-500",
  },
  {
    name: "Games & Challenges",
    path: "/simulator",
    icon: PlayCircle,
    color: "text-red-500",
  },
  {
    name: "Quizzes",
    path: "/quizzes",
    icon: FileText,
    color: "text-amber-500",
  },
  {
    name: "My Badges",
    path: "/badges",
    icon: Award,
    color: "text-pink-500",
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
    color: "text-slate-500",
  },
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col space-y-2 w-full">
      {routes.map((route) => {
        const Icon = route.icon
        const isActive = pathname === route.path
        return (
          <Button
            key={route.path}
            variant={isActive ? "default" : "ghost"}
            className={cn(
              "justify-start transition-all duration-300 hover:scale-105",
              isActive
                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                : `hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-950/20 dark:hover:to-purple-950/20 ${route.color}`,
            )}
            asChild
          >
            <Link href={route.path} className="flex items-center gap-2">
              <div className={cn("rounded-full p-1", isActive ? "bg-white/20" : "")}>
                <Icon className={cn("h-4 w-4", isActive ? "text-white" : "")} />
              </div>
              {route.name}
            </Link>
          </Button>
        )
      })}
    </nav>
  )
}

