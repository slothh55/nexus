"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, LogOut, Settings, Award, Rocket, BarChart } from "lucide-react"
import Link from "next/link"

export function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full border-2 border-indigo-200 p-0 hover:border-indigo-300 dark:border-indigo-800 dark:hover:border-indigo-700"
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Explorer" />
            <AvatarFallback className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">EX</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Explorer</p>
            <p className="text-xs leading-none text-muted-foreground">explorer@nexusai.com</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/progress" className="flex cursor-pointer items-center">
              <BarChart className="mr-2 h-4 w-4 text-blue-500" />
              <span>My Progress</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/badges" className="flex cursor-pointer items-center">
              <Award className="mr-2 h-4 w-4 text-amber-500" />
              <span>My Badges</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/learning-paths" className="flex cursor-pointer items-center">
              <Rocket className="mr-2 h-4 w-4 text-purple-500" />
              <span>My Adventures</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings" className="flex cursor-pointer items-center">
              <Settings className="mr-2 h-4 w-4 text-slate-500" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/login" className="flex cursor-pointer items-center">
            <LogOut className="mr-2 h-4 w-4 text-red-500" />
            <span>Log out</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

