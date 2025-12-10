import { healthResolvers } from "@/server/graphql/resolvers/health"
import { deezerResolvers } from "@/server/graphql/resolvers/deezer"

export const resolvers = {
  ...deezerResolvers,
  ...healthResolvers
}
