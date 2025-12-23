import { useGetRandomArtists } from "@/hooks/use-get-random-artists"
import { Loader2 } from "lucide-react"
import { ArtistCard } from "@/components/artists/artist.card"
import { Button } from "@/components/ui/button"
import { ArtistGridSkeleton } from "@/components/artists/artist-grid.skeleton"
import { useRateLimitedAction } from "@/hooks/use-rate-limited-action"

export const ArtistGrid = () => {
  const { data, isLoading, error, refetch, isRefetching } =
    useGetRandomArtists(6)

  const {
    execute: handleRefetch,
    countdown,
    isBlocked
  } = useRateLimitedAction(() => refetch(), {
    storageKey: "fetch-artist-key"
  })

  if (isLoading || isRefetching) return <ArtistGridSkeleton />

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        Error: {error.message}
      </div>
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
          onClick={handleRefetch}
          disabled={isRefetching || isBlocked}
        >
          {isRefetching ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : isBlocked ? (
            `Wait ${countdown}s`
          ) : (
            "Discover others artists"
          )}
        </Button>
      </div>
    </>
  )
}
