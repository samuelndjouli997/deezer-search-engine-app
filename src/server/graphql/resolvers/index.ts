import { healthResolvers } from "@/server/graphql/resolvers/health.resolvers"
import { deezerResolvers } from "@/server/graphql/resolvers/deezer.resolvers"
import { discogsResolvers } from "@/server/graphql/resolvers/discogs.resolvers"

export const resolvers = {
  ...deezerResolvers,
  ...discogsResolvers,
  ...healthResolvers
}
