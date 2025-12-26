import { useState, useEffect, useRef } from "react"

export const usePersistedCountdown = (
  storageKey: string,
  initialSeconds?: number
) => {
  const [countdown, setCountdown] = useState<number>(() => {
    if (typeof window === "undefined") return initialSeconds || 0

    const stored = localStorage.getItem(storageKey)
    if (!stored) return initialSeconds || 0

    try {
      const { endTime } = JSON.parse(stored)
      const msRemaining = endTime - Date.now()

      if (msRemaining > 0) {
        return Math.ceil(msRemaining / 1000)
      }

      localStorage.removeItem(storageKey)
    } catch {
      localStorage.removeItem(storageKey)
    }

    return initialSeconds || 0
  })

  const initialSecondsRef = useRef<number | undefined>(initialSeconds)

  useEffect(() => {
    if (
      initialSeconds &&
      initialSeconds > 0 &&
      initialSeconds !== initialSecondsRef.current
    ) {
      initialSecondsRef.current = initialSeconds

      const endTime = Date.now() + initialSeconds * 1000

      setCountdown(initialSeconds)

      localStorage.setItem(storageKey, JSON.stringify({ endTime }))
    }
  }, [initialSeconds, storageKey])

  useEffect(() => {
    if (countdown <= 0) {
      localStorage.removeItem(storageKey)

      return
    }

    const interval = setInterval(() => {
      setCountdown((prev) => {
        const next = prev - 1

        if (next <= 0) {
          localStorage.removeItem(storageKey)

          clearInterval(interval)

          return 0
        }

        return next
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [countdown, storageKey])

  return countdown
}
