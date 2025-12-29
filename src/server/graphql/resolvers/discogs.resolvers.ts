import { getArtistBiography, searchDeezerTrack } from "@/server/services"
import { discogsBiographyCodeToHTML } from "@/utils/string"

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

        const cleanedBiography = biography
          ? discogsBiographyCodeToHTML(biography)
          : "Biography not available"

        return {
          ...track,
          artist: {
            ...track.artist,
            biography: cleanedBiography
          }
        }
      })
    )

    return tracksWithBiography
  }
}
