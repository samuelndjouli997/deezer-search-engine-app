import z from "zod"

export const globalErrorSchema = z.object({
  status: z.number(),
  code: z.string(),
  message: z.string(),
  source: z.string(),
  data: z.record(z.string(), z.unknown()).optional(),
  rawError: z.string().optional()
})
