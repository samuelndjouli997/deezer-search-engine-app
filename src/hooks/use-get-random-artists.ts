import { graphql } from "@/graphql"
import { FetchRandomArtistsQueryQuery } from "@/graphql/graphql"
import { fetchGraphQL } from "@/utils/graphql"
import { useQuery } from "@tanstack/react-query"

type Artist = FetchRandomArtistsQueryQuery["fetchRandomArtists"][number]

const FETCH_RANDOM_ARTISTS_QUERY = graphql(`
  query FetchRandomArtistsQuery($count: Int!) {
    fetchRandomArtists(count: $count) {
      id
      picture
      name
      biography
      link
      picture_xl
      position
    }
  }
`)

export const useGetRandomArtists = (count: number) => {
  const query = useQuery<Artist[], Error>({
    queryKey: ["artists", count],
    queryFn: async () => {
      const data = await fetchGraphQL<FetchRandomArtistsQueryQuery>(
        FETCH_RANDOM_ARTISTS_QUERY.toString(),
        { count }
      )
      return data.fetchRandomArtists
    },
    retry: false
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
