import { DARK_MODE_MEDIA_QUERY, THEME_COOKIE_NAME } from "@/constants/cookies"
import { THEME_CLASSES } from "@/constants/mappings"
import React, { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: THEME_CLASSES.SYSTEM,
  setTheme: () => null
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

const getThemeFromCookie = (cookieName: string): Theme | null => {
  if (typeof document === "undefined") return null

  const match = document.cookie.match(new RegExp(`(^| )${cookieName}=([^;]+)`))

  return match ? (match[2] as Theme) : null
}

const setCookie = (name: string, value: string, days: number = 365) => {
  if (typeof document === "undefined") return

  const expires = new Date(Date.now() + days * 864e5).toUTCString()

  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`
}

export function ThemeProvider({
  children,
  defaultTheme = THEME_CLASSES.SYSTEM,
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true)

    const savedTheme = getThemeFromCookie(THEME_COOKIE_NAME)

    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      // First visit - set to system theme so it can respond to OS changes
      setTheme(THEME_CLASSES.SYSTEM)

      // Store the system preference in cookie only
      setCookie(THEME_COOKIE_NAME, THEME_CLASSES.SYSTEM)
    }
  }, [defaultTheme])

  useEffect(() => {
    if (!mounted) return

    const root = window.document.documentElement
    root.classList.remove(THEME_CLASSES.LIGHT, THEME_CLASSES.DARK)

    if (theme === THEME_CLASSES.SYSTEM) {
      const systemTheme = window.matchMedia(DARK_MODE_MEDIA_QUERY).matches
        ? THEME_CLASSES.DARK
        : THEME_CLASSES.LIGHT

      root.classList.add(systemTheme)

      return
    }

    root.classList.add(theme)
  }, [theme, mounted])

  // Listen for system preference changes when theme is "system"
  useEffect(() => {
    if (!mounted || theme !== THEME_CLASSES.SYSTEM) return

    const mediaQuery = window.matchMedia(DARK_MODE_MEDIA_QUERY)

    const handleChange = () => {
      const root = window.document.documentElement
      root.classList.remove(THEME_CLASSES.LIGHT, THEME_CLASSES.DARK)

      const systemTheme = mediaQuery.matches
        ? THEME_CLASSES.DARK
        : THEME_CLASSES.LIGHT

      root.classList.add(systemTheme)
    }

    mediaQuery.addEventListener("change", handleChange)

    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [theme, mounted])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      setCookie(THEME_COOKIE_NAME, theme)
      setTheme(theme)
    }
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  return context
}
