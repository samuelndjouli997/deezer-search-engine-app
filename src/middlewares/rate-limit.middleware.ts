import { createMiddleware } from "@tanstack/react-start"
import { RATE_LIMIT } from "@/constants/rate-limit"
import { checkSlidingWindowRateLimit } from "@/utils/rate-limit"

export const rateLimitMiddleware = createMiddleware().server(
  ({ next, request }) => {
    const clientId =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "anonymous"

    const { allowed, resetTime } = checkSlidingWindowRateLimit(clientId)

    if (!allowed) {
      const retryAfter = Math.ceil((resetTime - Date.now()) / 1000)

      throw new Response(
        JSON.stringify({
          errors: [
            {
              message: "Rate limit exceeded",
              extensions: {
                code: "RATE_LIMIT_EXCEEDED",
                retryAfter,
                resetAt: new Date(resetTime).toISOString()
              }
            }
          ]
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "X-RateLimit-Limit": String(RATE_LIMIT),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": String(resetTime),
            "Retry-After": String(retryAfter)
          }
        }
      )
    }

    return next()
  }
)
