import { fetchTopArtists, searchDeezerTrack } from "@/server/services"
import { randomizeItems } from "@/utils/filter"

type Args = {
  query: string
  limit: number
  index: number
}

export const deezerResolvers = {
  searchTrack: async ({ query, limit, index }: Args) => {
    const tracks = await searchDeezerTrack({ query, limit, index })

    return tracks.map((track) => ({
      ...track,
      artist: {
        ...track.artist,
        biography: "Biography not available",
        picture: track.artist.picture ?? "/user-placeholder.png"
      }
    }))
  },
  fetchRandomArtists: async ({ count }: { count: number }) => {
    const allArtists = await fetchTopArtists()

    return randomizeItems(allArtists)
      .slice(0, count)
      .map((artist) => ({
        ...artist,
        biography: "Biography not available",
        picture: artist.picture ?? "/user-placeholder.png"
      }))
  }
}
