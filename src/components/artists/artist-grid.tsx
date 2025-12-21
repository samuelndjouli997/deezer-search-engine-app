import { useGetRandomArtists } from "@/hooks/use-get-random-artists"
import { Loader2 } from "lucide-react"
import { ArtistCard } from "@/components/artists/artist-card"
import { Button } from "@/components/ui/button"

export const ArtistGrid = () => {
  const { data, isLoading, error, refetch, isRefetching } =
    useGetRandomArtists(6)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

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
        {data && data.map((artist) => <ArtistCard artist={artist} />)}
      </div>
      <div className="text-center">
        <Button
          role="button"
          className="text-center text-white font-semibold bg-purple-600 cursor-pointer"
          onClick={() => refetch()}
          disabled={isRefetching}
        >
          Discover others artists
        </Button>
      </div>
    </>
  )
}
