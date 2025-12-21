import {
  ChartArtistResponseSchema,
  DeezerSearchResponseSchema
} from "@/server/parsers/deezer.parser"

type SearchDeezerTrackProps = {
  query: string
  limit: number
  index: number
}

export const searchDeezerTrack = async ({
  query,
  limit,
  index
}: SearchDeezerTrackProps) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_DEEZER_API}/search?q=${query}&limit=${limit}&index=${index}`
    )

    if (!response.ok) {
      throw new Error(
        `Deezer API error: ${response.status} ${response.statusText} - URL: ${response.url}`
      )
    }

    const json = await response.json()

    const parsedJson = DeezerSearchResponseSchema.parse(json)

    return parsedJson.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const fetchTopArtists = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_DEEZER_API}/chart/0/artists`
    )

    if (!response.ok) {
      throw new Error(
        `Deezer API error: ${response.status} ${response.statusText} - URL: ${response.url}`
      )
    }

    const json = await response.json()

    const parsedJson = ChartArtistResponseSchema.parse(json)

    return parsedJson.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
