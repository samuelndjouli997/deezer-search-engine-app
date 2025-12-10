export const typeDefs = `
  type Artist {
    id: ID!
    name: String!
    biography: String
    picture: String
  }

  type Album {
    title: String
    cover: String
  }

  type Track {
    id: ID!
    title: String!
    artist: Artist!
    album: Album!
    duration: Int
    explicit_lyrics: Boolean
    type: String!
    preview: String
    rank: Int
  }

    type Query {
        _health: String! 
        searchTrack(query: String!, limit: Int!, index: Int!): [Track!]!
    }
`
