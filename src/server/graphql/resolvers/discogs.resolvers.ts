import { getArtistBiography, searchDeezerTrack } from "@/server/services"
import { discogsBiographyCodeToHTML } from "@/utils/string"

type Args = {
  query: string
  limit: number
  index: number
}

const biographyCache = new Map<string, string>()

export const discogsResolvers = {
  searchTrackWithBiography: async ({ query, limit, index }: Args) => {
    const tracks = await searchDeezerTrack({ query, limit, index })

    const tracksWithBiography = await Promise.all(
      tracks.map(async (track) => {
        const artistName = track.artist.name.toLowerCase()

        if (!biographyCache.has(artistName)) {
          const biography = await getArtistBiography(artistName)

          const cleanedBiography = biography
            ? discogsBiographyCodeToHTML(biography)
            : "Biography not available"

          biographyCache.set(artistName, cleanedBiography)
        }

        return {
          ...track,
          artist: {
            ...track.artist,
            biography: biographyCache.get(artistName)!
          }
        }
      })
    )

    return tracksWithBiography
  }
}
