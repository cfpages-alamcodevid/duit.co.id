import { useTheme } from "@/hooks/useTheme"
import { Sun, Moon, Monitor } from "lucide-react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export const ThemeToggle = ({ className }: { className?: string }) => {
  const { theme, isDark, mounted, toggleTheme } = useTheme()
  const [hoverMode, setHoverMode] = useState<"light" | "dark" | null>(null)

  useEffect(() => {
    if (!mounted) {
      const stored = localStorage.getItem("duit-co-id-theme")
      if (stored) return

      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      if (prefersDark) {
        document.documentElement.classList.add("dark")
      }
    }
  }, [mounted])

  if (!mounted) {
    return (
      <button
        className={cn(
          "relative p-2 rounded-full transition-all duration-200",
          "bg-white/60 dark:bg-black/40",
          "backdrop-blur-md",
          "border border-white/30 dark:border-white/10",
          "hover:bg-white/80 dark:hover:bg-black/60",
          "shadow-[0_2px_8px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.3)]",
          className
        )}
        aria-label="Toggle theme"
      >
        <Monitor className="w-5 h-5 text-heading-light dark:text-white" />
      </button>
    )
  }

  const displayMode = hoverMode || theme

  return (
    <button
      className={cn(
        "relative p-2 rounded-full transition-all duration-200",
        "bg-white/60 dark:bg-black/40",
        "backdrop-blur-md",
        "border border-white/30 dark:border-white/10",
        "hover:bg-white/80 dark:hover:bg-black/60",
        "shadow-[0_2px_8px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.3)]",
        "focus:outline-none focus:ring-2 focus:ring-money-green/50",
        className
      )}
      onClick={toggleTheme}
      onMouseEnter={() => setHoverMode(isDark ? "light" : "dark")}
      onMouseLeave={() => setHoverMode(null)}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className="relative w-5 h-5">
        <Sun
          className={cn(
            "w-5 h-5 absolute inset-0 transition-all duration-300",
            "text-aureum-gold",
            displayMode === "dark"
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 rotate-90 scale-0"
          )}
        />
        <Moon
          className={cn(
            "w-5 h-5 absolute inset-0 transition-all duration-300",
            "text-money-green-light",
            displayMode === "light"
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 -rotate-90 scale-0"
          )}
        />
      </div>

      <span className="sr-only">Toggle theme</span>
    </button>
  )
}