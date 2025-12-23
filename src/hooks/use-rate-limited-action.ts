import { useEffect, useState } from "react"
import { useRateLimitedCallback } from "@tanstack/react-pacer"

type UseRateLimitedActionOptions = {
  limit?: number
  window?: number
  windowType?: "fixed" | "sliding"
  onReject?: (secondsUntilNext: number) => void
  storageKey?: string
}

export const useRateLimitedAction = (
  action: () => void,
  options?: UseRateLimitedActionOptions
) => {
  const storageKey = options?.storageKey ?? "rate-limit-default"

  const [countdown, setCountdown] = useState<number>(() => {
    if (typeof window === "undefined") return 0

    const stored = localStorage.getItem(storageKey)

    if (!stored) return 0

    try {
      const { endTime } = JSON.parse(stored)
      const msRemaining = endTime - Date.now()

      if (msRemaining > 0) return Math.ceil(msRemaining / 1000)

      localStorage.removeItem(storageKey)
    } catch (error) {
      localStorage.removeItem(storageKey)
    }

    return 0
  })

  const rateLimitedAction = useRateLimitedCallback(
    () => {
      action()
    },
    {
      limit: options?.limit ?? 50,
      window: options?.window ?? 60 * 60 * 1000,
      windowType: options?.windowType ?? "sliding",
      onReject: (rateLimiter) => {
        const msUntilNext = rateLimiter.getMsUntilNextWindow()
        const secondsUntilNext = Math.ceil(msUntilNext / 1000)

        setCountdown(secondsUntilNext)

        const endTime = Date.now() + msUntilNext
        localStorage.setItem(storageKey, JSON.stringify({ endTime }))

        options?.onReject?.(secondsUntilNext)
      }
    }
  )

  useEffect(() => {
    if (countdown <= 0) {
      localStorage.removeItem(storageKey)
      return
    }

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          localStorage.removeItem(storageKey)
          return 0
        }

        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [countdown])

  return {
    execute: rateLimitedAction,
    countdown,
    isBlocked: countdown > 0
  }
}
