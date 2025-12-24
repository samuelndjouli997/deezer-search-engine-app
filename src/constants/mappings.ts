export const THEME_CLASSES = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system"
} as const

export const ERROR_SOURCES = {
  DEEZER: "DEEZER",
  GRAPHQL: "GRAPHQL",
  ERROR: "ERROR",
  ZOD: "ZOD",
  UNKNOWN: "UNKNOWN"
} as const

export const ERROR_LEVELS = {
  INFO: "INFO",
  WARN: "WARNING",
  ERROR: "ERROR",
  TRACE: "TRACE"
} as const

export const ERROR_CODES = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  SERVER_ERROR: 500
} as const
