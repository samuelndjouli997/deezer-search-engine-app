import { fetchTopArtists, searchDeezerTrack } from "@/server/services"
import { randomizeItems } from "@/utils/filter"

type Args = {
  query: string
  limit: number
  index: number
}

export const deezerResolvers = {
  searchTrack: async ({ query, limit, index }: Args) => {
    return searchDeezerTrack({ query, limit, index })
  },
  fetchRandomArtists: async ({ count }: { count: number }) => {
    const allArtists = await fetchTopArtists()

    return randomizeItems(allArtists).slice(0, count)
  }
}
