import { DeezerSearchResponseSchema } from "@/server/parsers/deezer.parser"

export const searchDeezerTrack = async ({
  query,
  limit,
  index
}: {
  query: string
  limit: number
  index: number
}) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_DEEZER_API}/search?q=${query}&limit=${limit}&index=${index}`
    )

    if (!response.ok) {
      throw new Error(`API Deezer error: ${response.statusText}`)
    }

    const json = await response.json()

    const parsedJson = DeezerSearchResponseSchema.parse(json)

    return parsedJson.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
