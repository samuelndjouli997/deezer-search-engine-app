import { AlertCircle, Clock, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePersistedCountdown } from "@/hooks/use-persisted-countdown"

type ErrorComponentProps = {
  error: Error
  retryAfter?: number
  onRetry?: () => void
}

export const ErrorComponent = ({
  error,
  retryAfter,
  onRetry
}: ErrorComponentProps) => {
  const countdown = usePersistedCountdown(
    "error-rate-limit-countdown",
    retryAfter
  )

  const isBlocked = countdown > 0
  const isRateLimitError = retryAfter !== undefined

  return (
    <div className="mx-auto max-w-md bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-lg p-6">
      <div className="flex justify-start items-start gap-3 mb-4">
        <AlertCircle className="size-6 text-red-600 dark:text-red-400 shrink-0 mt-1" />
        <div>
          <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-2">
            {isRateLimitError ? "Rate Limit Exceeded" : "Something went wrong"}
          </h3>
          <p className="text-sm text-red-700 dark:text-red-300 mb-3">
            {isRateLimitError
              ? "You've made too many requests. Please wait before trying again."
              : error.message}
          </p>
        </div>
      </div>
      {onRetry && (
        <div className="flex flex-col gap-2">
          {isBlocked && (
            <div className="flex items-center justify-center gap-2 text-sm text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 rounded-md px-3 py-2">
              <Clock className="h-4 w-4" />
              <span>
                Retry available in {Math.floor(countdown / 60)}:
                {String(countdown % 60).padStart(2, "0")}
              </span>
            </div>
          )}
          {!isBlocked && (
            <Button
              role="button"
              onClick={onRetry}
              variant="outline"
              className="cursor-pointer"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
