import { useEffect, useState } from "react"
import { useGetRandomArtists } from "@/hooks/use-get-random-artists"
import { Loader2 } from "lucide-react"
import { useRateLimitedCallback } from "@tanstack/react-pacer"
import { ArtistCard } from "@/components/artists/artist-card"
import { Button } from "@/components/ui/button"

export const ArtistGrid = () => {
  const [countdown, setCountdown] = useState<number>(0)

  const { data, isLoading, error, refetch, isRefetching } =
    useGetRandomArtists(6)

  const handleRefetch = useRateLimitedCallback(
    () => {
      refetch()
    },
    {
      limit: 50,
      window: 60 * 60 * 1000,
      windowType: "sliding",
      onReject: (rateLimiter) => {
        const msUntilNext = rateLimiter.getMsUntilNextWindow()
        const secondsUntilNext = Math.ceil(msUntilNext / 1000)

        setCountdown(secondsUntilNext)

        console.error("Patience !", {
          description: `Attendez ${secondsUntilNext}s entre chaque shuffle.`
        })
      }
    }
  )

  useEffect(() => {
    if (countdown <= 0) return

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [countdown])

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
        {data &&
          data.map((artist) => <ArtistCard artist={artist} key={artist.id} />)}
      </div>
      <div className="text-center">
        <Button
          role="button"
          className="text-center text-white font-semibold bg-purple-600 cursor-pointer"
          onClick={handleRefetch}
          disabled={isRefetching || countdown > 0}
        >
          {isRefetching ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : countdown > 0 ? (
            `Wait ${countdown}s`
          ) : (
            "Discover others artists"
          )}
        </Button>
      </div>
    </>
  )
}
