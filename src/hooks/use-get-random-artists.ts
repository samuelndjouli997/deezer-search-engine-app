import { graphql } from "@/graphql"
import { useQuery } from "@tanstack/react-query"

const FETCH_ARTISTS_QUERY = graphql(`
  query FetchArtistsQuery($count: Int!) {
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
  const fetchRandomArtists = async () => {
    const response = await fetch("/api/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: FETCH_ARTISTS_QUERY.toString(),
        variables: { count }
      })
    })

    const json = await response.json()

    if (json.errors) throw new Error(json.errors[0].message)

    return json.data.fetchRandomArtists
  }

  return useQuery({
    queryKey: ["artists", count],
    queryFn: fetchRandomArtists
  })
}
