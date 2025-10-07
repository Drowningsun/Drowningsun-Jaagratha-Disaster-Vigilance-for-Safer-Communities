"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Moon, Sun } from "lucide-react"

export function ModeSwitch() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const isDark = resolvedTheme === "dark"

  return (
    <div className="flex items-center gap-2" role="group" aria-label="Toggle color theme">
      <Sun className="h-4 w-4 opacity-70" aria-hidden />
      <Switch
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        aria-label="Switch between light and dark mode"
      />
      <Moon className="h-4 w-4 opacity-70" aria-hidden />
      <Label className="sr-only" htmlFor="theme-switch">
        Theme
      </Label>
    </div>
  )
}
