import { healthResolvers } from "@/server/graphql/resolvers/health.resolvers"
import { deezerResolvers } from "@/server/graphql/resolvers/deezer.resolvers"

export const resolvers = {
  ...deezerResolvers,
  ...healthResolvers
}
