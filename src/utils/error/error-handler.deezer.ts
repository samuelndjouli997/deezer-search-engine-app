import { ERROR_CODES } from "@/constants/mappings"

export type DeezerAPIError = Error & {
  status: number
  statusText: string
  url: string
}

export const isDeezerError = (error: unknown): error is DeezerAPIError => {
  return (
    error instanceof Error &&
    "status" in error &&
    "statusText" in error &&
    "url" in error
  )
}

export const deezerErrorHandler = (error: DeezerAPIError) => {
  const { status, statusText } = error

  const isBadRequest = status === ERROR_CODES.BAD_REQUEST
  const isNotFound = status === ERROR_CODES.NOT_FOUND
  const hasTooManyRequests = status === ERROR_CODES.TOO_MANY_REQUESTS
  const isServerError = status >= ERROR_CODES.SERVER_ERROR

  if (isBadRequest) {
    return {
      status: ERROR_CODES.BAD_REQUEST,
      code: "DEEZER/BAD_REQUEST",
      message: "Invalid request parameters"
    }
  }

  if (isNotFound) {
    return {
      status: ERROR_CODES.NOT_FOUND,
      code: "DEEZER/NOT_FOUND",
      message: "Resource not found"
    }
  }

  if (hasTooManyRequests) {
    return {
      status: ERROR_CODES.TOO_MANY_REQUESTS,
      code: "DEEZER/RATE_LIMITED",
      message: "Rate limit exceeded. Please try again later"
    }
  }

  if (isServerError) {
    return {
      status: ERROR_CODES.SERVER_ERROR,
      code: "DEEZER/SERVER_ERROR",
      message: "Deezer API is temporarily unavailable"
    }
  }

  return {
    status: ERROR_CODES.SERVER_ERROR,
    code: "DEEZER/API_ERROR",
    message: `Deezer API error: ${statusText}`
  }
}
