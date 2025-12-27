import {
  DiscogsArtistDetailsSchema,
  DiscogsSearchResponseSchema
} from "@/server/parsers"
import { globalErrorHandler } from "@/utils/error/error-handler"

const DISCOGS_API = import.meta.env.VITE_DISCOGS_API
const DISCOGS_KEY = import.meta.env.VITE_DISCOGS_API_KEY
const DISCOGS_SECRET = import.meta.env.VITE_DISCOGS_API_SECRET

export const searchDiscogsArtist = async (artistName: string) => {
  try {
    const response = await fetch(
      `${DISCOGS_API}/database/search?q=${encodeURIComponent(artistName)}&type=artist&key=${DISCOGS_KEY}&secret=${DISCOGS_SECRET}`,
      { headers: { "User-Agent": "DeezerSearchApp/1.0" } }
    )

    if (!response.ok) {
      throw new Error(
        `Discogs API error: ${response.status} ${response.statusText}`
      )
    }

    const json = await response.json()
    const parsedJson = DiscogsSearchResponseSchema.parse(json)

    return parsedJson.results[0] ?? null
  } catch (error) {
    const customError = globalErrorHandler(error, { log: true })
    throw customError
  }
}

export const fetchDiscogsArtistDetails = async (artistId: number) => {
  try {
    const response = await fetch(
      `${DISCOGS_API}/artists/${artistId}?key=${DISCOGS_KEY}&secret=${DISCOGS_SECRET}`,
      { headers: { "User-Agent": "DeezerSearchApp/1.0" } }
    )

    if (!response.ok) {
      throw new Error(
        `Discogs API error: ${response.status} ${response.statusText}`
      )
    }

    const json = await response.json()
    const parsedJson = DiscogsArtistDetailsSchema.parse(json)

    return parsedJson
  } catch (error) {
    const customError = globalErrorHandler(error, { log: true })
    throw customError
  }
}

export const getArtistBiography = async (artistName: string) => {
  try {
    const searchResult = await searchDiscogsArtist(artistName)

    if (!searchResult) return null

    const artistDetails = await fetchDiscogsArtistDetails(searchResult.id)

    return artistDetails.profile ?? null
  } catch (error) {
    console.error(`Failed to get biography for ${artistName}:`, error)
    return null
  }
}
