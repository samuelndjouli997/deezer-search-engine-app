import { graphql } from "@/graphql"
import { SearchTrackQueryQuery } from "@/graphql/graphql"
import { useQuery } from "@tanstack/react-query"
import { useSearch } from "@tanstack/react-router"

const SEARCH_TRACKS_QUERY = graphql(`
  query SearchTrackQuery($query: String!, $limit: Int!, $index: Int!) {
    searchTrack(query: $query, limit: $limit, index: $index) {
      id
      title
      duration
      rank
      artist {
        id
        name
      }
      album {
        title
      }
    }
  }
`)

export const useSearchTrack = () => {
  const search = useSearch({ from: "/" })

  return useQuery<SearchTrackQueryQuery["searchTrack"]>({
    queryKey: ["tracks", search.query, search.limit, search.index],
    queryFn: async () => {
      const response = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: SEARCH_TRACKS_QUERY,
          variables: search
        })
      })

      const json = await response.json()

      if (json.errors) throw new Error(json.errors[0].message)

      return json.data.searchTrack
    },
    enabled: (search.query?.length ?? 0) > 0
  })
}
