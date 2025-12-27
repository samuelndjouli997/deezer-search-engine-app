/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Album = {
  __typename?: 'Album';
  cover?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type Artist = {
  __typename?: 'Artist';
  biography: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  link?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  picture: Scalars['String']['output'];
  picture_xl?: Maybe<Scalars['String']['output']>;
  position?: Maybe<Scalars['Int']['output']>;
};

export type Query = {
  __typename?: 'Query';
  _health: Scalars['String']['output'];
  fetchRandomArtists: Array<Artist>;
  searchTrack: Array<Track>;
  searchTrackWithBiography: Array<Track>;
};


export type QueryFetchRandomArtistsArgs = {
  count: Scalars['Int']['input'];
};


export type QuerySearchTrackArgs = {
  index: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
  query: Scalars['String']['input'];
};


export type QuerySearchTrackWithBiographyArgs = {
  index: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
  query: Scalars['String']['input'];
};

export type Track = {
  __typename?: 'Track';
  album: Album;
  artist: Artist;
  duration: Scalars['Int']['output'];
  explicit_lyrics?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  preview?: Maybe<Scalars['String']['output']>;
  rank: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type FetchRandomArtistsQueryQueryVariables = Exact<{
  count: Scalars['Int']['input'];
}>;


export type FetchRandomArtistsQueryQuery = { __typename?: 'Query', fetchRandomArtists: Array<{ __typename?: 'Artist', id: string, picture: string, name: string, biography: string, link?: string | null, picture_xl?: string | null, position?: number | null }> };

export type SearchTrackWithBiographyQueryQueryVariables = Exact<{
  query: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
  index: Scalars['Int']['input'];
}>;


export type SearchTrackWithBiographyQueryQuery = { __typename?: 'Query', searchTrackWithBiography: Array<{ __typename?: 'Track', id: string, title: string, duration: number, rank: number, explicit_lyrics?: boolean | null, artist: { __typename?: 'Artist', id: string, name: string, biography: string, picture: string }, album: { __typename?: 'Album', title: string, cover?: string | null } }> };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const FetchRandomArtistsQueryDocument = new TypedDocumentString(`
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
    `) as unknown as TypedDocumentString<FetchRandomArtistsQueryQuery, FetchRandomArtistsQueryQueryVariables>;
export const SearchTrackWithBiographyQueryDocument = new TypedDocumentString(`
    query SearchTrackWithBiographyQuery($query: String!, $limit: Int!, $index: Int!) {
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
    `) as unknown as TypedDocumentString<SearchTrackWithBiographyQueryQuery, SearchTrackWithBiographyQueryQueryVariables>;