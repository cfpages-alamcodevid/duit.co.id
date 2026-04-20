import { useState, useEffect, useCallback } from "react"

type Theme = "light" | "dark"

const STORAGE_KEY = "duit-co-id-theme"

function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem(STORAGE_KEY) as Theme
}

function setStoredTheme(theme: Theme) {
  localStorage.setItem(STORAGE_KEY, theme)
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = getStoredTheme()
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    const initialTheme: Theme = stored || (prefersDark ? "dark" : "light")
    setTheme(initialTheme)

    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }

    setMounted(true)
  }, [])

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    setStoredTheme(newTheme)

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme])

  const setThemeMode = useCallback((newTheme: Theme) => {
    setTheme(newTheme)
    setStoredTheme(newTheme)

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  return {
    theme,
    isDark: theme === "dark",
    mounted,
    toggleTheme,
    setThemeMode,
  }
}