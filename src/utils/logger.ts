import { ERROR_LEVELS } from "@/constants/mappings"
import type { ConstantValues } from "@/utils/types"

const DEFAULT_LOG_ENABLED = true
const DEFAULT_LOG_LEVEL = ERROR_LEVELS.ERROR

export const errorLogger = (
  data: unknown,
  level: ConstantValues<typeof ERROR_LEVELS> = DEFAULT_LOG_LEVEL
) => {
  if (level === ERROR_LEVELS.TRACE) return console.trace(data)
  if (level === ERROR_LEVELS.WARN) return console.warn(data)
  if (level === ERROR_LEVELS.INFO) return console.info(data)

  return console.error(data)
}

export const maybeLogAndReturn = <T>(
  data: T,
  opts?: { log?: boolean; level?: ConstantValues<typeof ERROR_LEVELS> }
): T => {
  const shouldLog = opts?.log ?? DEFAULT_LOG_ENABLED

  if (shouldLog) errorLogger(data, opts?.level)

  return data
}
