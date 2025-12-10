import z from "zod"
import { DefaultLayout } from "@/components/layout/default-layout"
import { TrackTable } from "@/components/table/track/track-table"
import { createFileRoute } from "@tanstack/react-router"

const searchSchema = z.object({
  query: z.string().optional(),
  limit: z.number().optional(),
  index: z.number().optional()
})

export const Route = createFileRoute("/")({
  validateSearch: searchSchema,
  component: App
})

function App() {
  return (
    <DefaultLayout>
      <TrackTable />
    </DefaultLayout>
  )
}
