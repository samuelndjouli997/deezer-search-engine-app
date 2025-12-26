import { graphql } from "@/graphql"
import { SearchTrackQueryQuery } from "@/graphql/graphql"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useSearch } from "@tanstack/react-router"
import { fetchGraphQL } from "@/utils/graphql"

const SEARCH_TRACKS_QUERY = graphql(`
  query SearchTrackQuery($query: String!, $limit: Int!, $index: Int!) {
    searchTrack(query: $query, limit: $limit, index: $index) {
      id
      title
      duration
      rank
      explicit_lyrics
      artist {
        id
        name
      }
      album {
        title
        cover
      }
    }
  }
`)

export const useSearchTrack = () => {
  const search = useSearch({ from: "/" })

  const query = useInfiniteQuery({
    queryKey: ["tracks", search.query, search.limit],
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      const data = await fetchGraphQL<SearchTrackQueryQuery>(
        SEARCH_TRACKS_QUERY.toString(),
        {
          query: search.query ?? "",
          limit: search.limit ?? 10,
          index: pageParam
        }
      )
      return data.searchTrack
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      const limit = search.limit ?? 10

      if (lastPage.length < limit) return undefined

      return lastPageParam + limit
    },
    retry: false,
    enabled: (search.query?.length ?? 0) > 0
  })

  const hasRetryAfter = query.error && "retryAfter" in query.error

  const retryAfter = hasRetryAfter
    ? (query.error as Error & { retryAfter: number }).retryAfter
    : undefined

  return {
    ...query,
    retryAfter
  }
}
