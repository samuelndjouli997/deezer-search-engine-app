import { Artist } from "@/types/Artist"
import { Album } from "@/types/Album"

export type Track = {
  id: string
  title: string
  artist: Artist
  album: Album
  duration: number
  rank: number
  explicit_lyrics?: boolean
  type: string
  preview?: string
}
