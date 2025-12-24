import { ERROR_CODES } from "@/constants/mappings"
import { z } from "zod"

export const zodErrorHandler = (error: z.ZodError) => {
  const firstIssue = error.issues[0]

  const hasMultipleIssues = error.issues.length > 1

  if (hasMultipleIssues) {
    return {
      code: "ZOD/MULTIPLE_VALIDATION_ERRORS",
      status: ERROR_CODES.UNPROCESSABLE_ENTITY,
      message: `Multiple validation errors (${error.issues.length} issues)`
    }
  }

  return {
    code: "ZOD/VALIDATION_ERROR",
    status: ERROR_CODES.UNPROCESSABLE_ENTITY,
    message: `Validation error at ${firstIssue.path.join(".")}: ${firstIssue.message}`
  }
}
