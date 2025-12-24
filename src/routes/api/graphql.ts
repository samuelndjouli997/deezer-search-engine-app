import { buildSchema, graphql } from "graphql"
import { createFileRoute } from "@tanstack/react-router"
import { rateLimitMiddleware } from "@/middlewares/rate-limit.middleware"
import { typeDefs } from "@/server/graphql/schema"
import { resolvers } from "@/server/graphql/resolvers"
import { globalErrorHandler } from "@/utils/error/error-handler"

const schema = buildSchema(typeDefs)

export const Route = createFileRoute("/api/graphql")({
  server: {
    middleware: [rateLimitMiddleware],
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json()

        try {
          const result = await graphql({
            schema,
            source: body.query,
            variableValues: body.variables,
            rootValue: resolvers
          })

          return Response.json(result)
        } catch (error) {
          const { status, code, message } = globalErrorHandler(error)

          return Response.json(
            {
              errors: [{ message, extensions: { code } }]
            },
            { status }
          )
        }
      }
    }
  }
})
