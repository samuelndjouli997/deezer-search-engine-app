import { Loader2 } from "lucide-react"
import { ArtistCard } from "@/components/artists/artist-card"
import { ErrorComponent } from "@/components/error-component"
import { Button } from "@/components/ui/button"
import { ArtistGridSkeleton } from "@/components/artists/artist-grid.skeleton"
import { useGetRandomArtists } from "@/hooks/use-get-random-artists"

export const ArtistGrid = () => {
  const { data, isLoading, error, refetch, isRefetching, isError, retryAfter } =
    useGetRandomArtists(6)

  if (isLoading || isRefetching) return <ArtistGridSkeleton />

  if (isError) {
    return (
      <ErrorComponent
        error={error}
        retryAfter={retryAfter}
        onRetry={() => refetch()}
      />
    )
  }

  return (
    <>
      <div className="grid w-full grid-cols-2 lg:grid-cols-6 space-x-2 lg:space-x-0 justify-center items-center lg:space-y-0">
        {data &&
          data.map((artist) => <ArtistCard artist={artist} key={artist.id} />)}
      </div>
      <div className="text-center">
        <Button
          role="button"
          className="text-center text-white font-semibold bg-purple-600 cursor-pointer"
          onClick={() => refetch()}
          disabled={isRefetching}
        >
          {isRefetching ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : (
            "Discover others artists"
          )}
        </Button>
      </div>
    </>
  )
}
