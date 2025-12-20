import { z } from "zod"

const ArtistSchema = z.object({
  id: z.number(),
  picture: z.string(),
  name: z.string(),
  biography: z.string().optional(),
  link: z.string().optional(),
  picture_xl: z.string().optional(),
  position: z.number().optional()
})

const AlbumSchema = z.object({
  title: z.string(),
  cover: z.string()
})

export const DeezerTrackSchema = z.object({
  id: z.number(),
  title: z.string(),
  artist: ArtistSchema,
  album: AlbumSchema,
  duration: z.number(),
  rank: z.number(),
  explicit_lyrics: z.boolean().optional(),
  type: z.string(),
  preview: z.string().optional()
})

export const DeezerSearchResponseSchema = z.object({
  data: z.array(DeezerTrackSchema),
  total: z.number().optional(),
  next: z.string().optional()
})

export const ChartArtistResponseSchema = z.object({
  data: z.array(ArtistSchema)
})
