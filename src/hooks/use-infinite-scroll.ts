import { useEffect, useRef } from "react"

type UseInfiniteScrollOptions = {
  fetchNextPage: () => void
  hasNextPage: boolean
  isFetchingNextPage: boolean
  rootMargin?: string
  threshold?: number
}

export const useInfiniteScroll = ({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  rootMargin = "100px",
  threshold = 0.1
}: UseInfiniteScrollOptions) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const sentinelRef = useRef<HTMLTableRowElement>(null)

  useEffect(() => {
    const scrollElement = scrollRef.current
    const sentinel = sentinelRef.current

    if (!scrollElement || !sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]

        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      {
        root: scrollElement,
        rootMargin,
        threshold
      }
    )

    observer.observe(sentinel)

    return () => observer.disconnect()
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, rootMargin, threshold])

  return { scrollRef, sentinelRef }
}
