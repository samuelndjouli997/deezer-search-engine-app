import { graphql } from "@/graphql"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useSearch } from "@tanstack/react-router"

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

  const fetchTracks = async ({ pageParam }: { pageParam: number }) => {
    const response = await fetch("/api/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: SEARCH_TRACKS_QUERY.toString(),
        variables: {
          query: search.query ?? "",
          limit: search.limit ?? 10,
          index: pageParam
        }
      })
    })

    const json = await response.json()

    if (json.errors) throw new Error(json.errors[0].message)

    return json.data.searchTrack
  }

  return useInfiniteQuery({
    queryKey: ["tracks", search.query, search.limit],
    queryFn: fetchTracks,
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      const limit = search.limit ?? 10

      if (lastPage.length < limit) return undefined

      return lastPageParam + limit
    },
    enabled: (search.query?.length ?? 0) > 0
  })
}
