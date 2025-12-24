import { z } from "zod"
import { ERROR_CODES, ERROR_SOURCES } from "@/constants/mappings"
import type { GlobalError, ErrorHandlerOptions } from "@/types/Error"
import { zodErrorHandler } from "@/utils/error/error-handler.zod"
import {
  deezerErrorHandler,
  isDeezerError
} from "@/utils/error/error-handler.deezer"
import { graphqlErrorHandler } from "@/utils/error/error-handler.graphql"
import { maybeLogAndReturn } from "@/utils/logger"

export const globalErrorHandler = (
  error: unknown,
  options: ErrorHandlerOptions = {}
): GlobalError => {
  if (error instanceof z.ZodError) {
    return maybeLogAndReturn(
      {
        ...zodErrorHandler(error),
        rawError: JSON.stringify(error),
        source: ERROR_SOURCES.ZOD
      },
      options
    )
  }

  if (isDeezerError(error)) {
    return maybeLogAndReturn(
      {
        ...deezerErrorHandler(error),
        rawError: JSON.stringify(error),
        source: ERROR_SOURCES.DEEZER
      },
      options
    )
  }

  if (error instanceof Error && error.message.includes("GraphQL")) {
    return maybeLogAndReturn(
      {
        ...graphqlErrorHandler(error),
        rawError: JSON.stringify(error),
        source: ERROR_SOURCES.GRAPHQL
      },
      options
    )
  }

  if (error instanceof Error) {
    return maybeLogAndReturn(
      {
        source: ERROR_SOURCES.ERROR,
        rawError: JSON.stringify(error),
        status: ERROR_CODES.SERVER_ERROR,
        code: "ERROR/GENERIC",
        message: error.message
      },
      options
    )
  }

  return maybeLogAndReturn(
    {
      status: ERROR_CODES.SERVER_ERROR,
      code: "ERROR/UNKNOWN",
      message: "An unexpected error occurred",
      rawError: JSON.stringify(error),
      source: ERROR_SOURCES.UNKNOWN
    },
    options
  )
}
