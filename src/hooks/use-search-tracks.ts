import { graphql } from "@/graphql"
import { SearchTrackWithBiographyQueryQuery } from "@/graphql/graphql"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useSearch } from "@tanstack/react-router"
import { fetchGraphQL } from "@/utils/graphql"

const SEARCH_TRACKS_WITH_BIOGRAPHY_QUERY = graphql(`
  query SearchTrackWithBiographyQuery(
    $query: String!
    $limit: Int!
    $index: Int!
  ) {
    searchTrackWithBiography(query: $query, limit: $limit, index: $index) {
      id
      title
      duration
      rank
      explicit_lyrics
      artist {
        id
        name
        biography
        picture
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
      const data = await fetchGraphQL<SearchTrackWithBiographyQueryQuery>(
        SEARCH_TRACKS_WITH_BIOGRAPHY_QUERY.toString(),
        {
          query: search.query ?? "",
          limit: search.limit ?? 10,
          index: pageParam
        }
      )
      return data.searchTrackWithBiography
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
