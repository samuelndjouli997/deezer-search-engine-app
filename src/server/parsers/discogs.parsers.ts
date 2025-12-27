import z from "zod"

const DiscogsArtistSearchResultSchema = z.object({
  id: z.number(),
  title: z.string(),
  resource_url: z.string(),
  thumb: z.string().optional(),
  cover_image: z.string().optional()
})

export const DiscogsSearchResponseSchema = z.object({
  results: z.array(DiscogsArtistSearchResultSchema),
  pagination: z.object({
    page: z.number(),
    pages: z.number(),
    items: z.number()
  })
})

export const DiscogsArtistDetailsSchema = z.object({
  id: z.number(),
  name: z.string(),
  profile: z.string().optional(),
  images: z
    .array(
      z.object({
        type: z.string(),
        uri: z.string(),
        resource_url: z.string(),
        width: z.number(),
        height: z.number()
      })
    )
    .optional(),
  urls: z.array(z.string()).optional(),
  members: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
        active: z.boolean().optional()
      })
    )
    .optional()
})
