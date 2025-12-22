import { RATE_LIMIT, WINDOW_MS } from "@/constants/rate-limit"

type RequestLog = { requestsTimestamp: number[] }

const requestLogs = new Map<string, RequestLog>()

export const checkSlidingWindowRateLimit = (
  clientId: string
): {
  allowed: boolean
  remaining: number
  resetTime: number
} => {
  const now = Date.now()
  const windowStart = now - WINDOW_MS

  let log = requestLogs.get(clientId)

  if (!log) {
    log = { requestsTimestamp: [] }
    requestLogs.set(clientId, log)
  }

  log.requestsTimestamp = log.requestsTimestamp.filter((ts) => ts > windowStart)

  const requestCount = log.requestsTimestamp.length

  if (requestCount >= RATE_LIMIT) {
    const oldestTimestamp = log.requestsTimestamp[0]
    const resetTime = oldestTimestamp + WINDOW_MS

    return {
      allowed: false,
      remaining: 0,
      resetTime
    }
  }

  log.requestsTimestamp.push(now)

  return {
    allowed: true,
    remaining: RATE_LIMIT - requestCount - 1,
    resetTime: now + WINDOW_MS
  }
}
