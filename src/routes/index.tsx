import z from "zod"
import { Loader2 } from "lucide-react"
import { DefaultLayout } from "@/components/layout/default-layout"
import { TrackTable } from "@/components/table/track/track-table"
import { createFileRoute } from "@tanstack/react-router"
import { useSearchTrack } from "@/hooks/use-search-tracks"
import { columns } from "@/components/table/track/track-columns"

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
  const { data, isLoading, error } = useSearchTrack()

  if (isLoading) {
    return (
      <DefaultLayout>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </DefaultLayout>
    )
  }

  if (error) {
    return (
      <DefaultLayout>
        <div className="text-center py-12 text-red-500">
          Error: {error.message}
        </div>
      </DefaultLayout>
    )
  }

  if (!data || data.length === 0) {
    return (
      <DefaultLayout>
        <div className="text-center py-12 text-muted-foreground">
          🎵 Search for tracks to get started
        </div>
      </DefaultLayout>
    )
  }

  return (
    <DefaultLayout>
      <TrackTable columns={columns} data={data} />
    </DefaultLayout>
  )
}
