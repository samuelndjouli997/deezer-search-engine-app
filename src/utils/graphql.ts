type GraphQLError = {
  message: string
  extensions?: {
    code?: string
    retryAfter?: number
    [key: string]: unknown
  }
}

type GraphQLResponse<T> = {
  data?: T
  errors?: GraphQLError[]
}

export const fetchGraphQL = async <T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> => {
  const response = await fetch("/api/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables })
  })

  const json: GraphQLResponse<T> = await response.json()

  if (json.errors && json.errors.length > 0) {
    const error = json.errors[0]

    const formattedError = new Error(error.message) as Error & {
      code?: string
      retryAfter?: number
    }

    formattedError.code = error.extensions?.code
    formattedError.retryAfter = error.extensions?.retryAfter

    throw formattedError
  }

  if (!json.data) throw new Error("No data returned from GraphQL")

  return json.data
}
