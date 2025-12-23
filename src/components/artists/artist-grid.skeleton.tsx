import { Skeleton } from "@/components/ui/skeleton"

const ArtistCardSkeleton = () => (
  <div className="flex flex-col space-y-2 justify-center items-center mb-4 lg:mb-0">
    <Skeleton className="size-40 lg:size-52 rounded-full" />
    <Skeleton className="h-4 w-16" />
  </div>
)

export const ArtistGridSkeleton = () => (
  <div className="grid w-full grid-cols-2 lg:grid-cols-6 gap-4">
    {Array.from({ length: 6 }, (_, i) => (
      <ArtistCardSkeleton key={i} />
    ))}
  </div>
)
