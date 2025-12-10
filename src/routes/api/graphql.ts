import { buildSchema, graphql } from "graphql"
import { createFileRoute } from "@tanstack/react-router"
import { typeDefs } from "@/server/graphql/schema"
import { resolvers } from "@/server/graphql/resolvers"

const schema = buildSchema(typeDefs)

export const Route = createFileRoute("/api/graphql")({
  server: {
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
          return new Response("Invalid JSON body.", { status: 400 })
        }
      }
    }
  }
})
