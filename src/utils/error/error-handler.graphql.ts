import { ERROR_CODES } from "@/constants/mappings"

export const graphqlErrorHandler = (error: Error) => {
  const isSyntaxError = error.message.includes("Syntax Error")
  const isValidationError = error.message.includes("validation")
  const isParseError = error.message.includes("JSON")

  if (isSyntaxError) {
    return {
      status: ERROR_CODES.BAD_REQUEST,
      code: "GRAPHQL/SYNTAX_ERROR",
      message: "Invalid GraphQL query syntax"
    }
  }

  if (isValidationError) {
    return {
      status: ERROR_CODES.BAD_REQUEST,
      code: "GRAPHQL/VALIDATION_ERROR",
      message: "GraphQL query validation failed"
    }
  }

  if (isParseError) {
    return {
      status: ERROR_CODES.BAD_REQUEST,
      code: "GRAPHQL/PARSE_ERROR",
      message: "Invalid JSON body"
    }
  }

  return {
    status: ERROR_CODES.SERVER_ERROR,
    code: "GRAPHQL/EXECUTION_ERROR",
    message: error.message
  }
}
