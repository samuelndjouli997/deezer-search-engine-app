import z from "zod"
import { createFileRoute } from "@tanstack/react-router"
import { useSearchTrack } from "@/hooks/use-search-tracks"
import { DefaultLayout } from "@/components/layout/default-layout"
import { columns } from "@/components/table/track/track-columns"
import { TrackTable } from "@/components/table/track/track-table"
import { Welcome } from "@/components/welcome"
import { Skeleton } from "@/components/ui/skeleton"
import { ErrorComponent } from "@/components/error-component"

const searchSchema = z.object({
  query: z.string().optional(),
  limit: z.number().optional()
})

const DatahPendingSkeleton = () => (
  <DefaultLayout>
    <div className="flex flex-col items-start justify-center gap-4">
      <Skeleton className="h-10 w-20" />
      <Skeleton className="h-[70vh] w-full" />
    </div>
  </DefaultLayout>
)

export const Route = createFileRoute("/")({
  validateSearch: searchSchema,
  component: App
})

function App() {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isError,
    retryAfter
  } = useSearchTrack()

  const allTracks = data?.pages.flat() ?? []

  if (isLoading) return <DatahPendingSkeleton />

  if (isError) {
    return (
      <DefaultLayout>
        <ErrorComponent
          error={error}
          retryAfter={retryAfter}
          onRetry={() => refetch()}
        />
      </DefaultLayout>
    )
  }

  if (allTracks.length === 0) {
    return (
      <DefaultLayout>
        <Welcome />
      </DefaultLayout>
    )
  }

  return (
    <DefaultLayout>
      <TrackTable
        columns={columns}
        data={allTracks}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </DefaultLayout>
  )
}
