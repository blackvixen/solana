"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function DarkModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-[28px] h-[28px] lg:w-auto lg:h-auto" asChild>
        <Button variant="outline" size="icon" className={`!p-1.5 !focus:outline-none !focus:border-0 !focus:ring-0 !outline-none !border-0 !ring-0 bg-transparent hover:bg-transparent hover:text-lightTextColored dark:hover:text-darkTextColored transition-all ease-in-out duration-300`}>
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle Dark Mode</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-gray-800 text-white border-b-0 border-x-0 border-t-1 border-t-secondary dark:border-t-secondary-foreground rounded-none" align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
