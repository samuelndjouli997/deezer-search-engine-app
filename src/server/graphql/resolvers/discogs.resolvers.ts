import { getArtistBiography, searchDeezerTrack } from "@/server/services"

type Args = {
  query: string
  limit: number
  index: number
}

export const discogsResolvers = {
  searchTrackWithBiography: async ({ query, limit, index }: Args) => {
    const tracks = await searchDeezerTrack({ query, limit, index })

    const tracksWithBiography = await Promise.all(
      tracks.map(async (track) => {
        const biography = await getArtistBiography(track.artist.name)

        return {
          ...track,
          artist: {
            ...track.artist,
            biography: biography ?? "Biography not available"
          }
        }
      })
    )

    return tracksWithBiography
  }
}
