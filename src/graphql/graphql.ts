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
  title?: Maybe<Scalars['String']['output']>;
};

export type Artist = {
  __typename?: 'Artist';
  biography?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  picture?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  _health: Scalars['String']['output'];
  searchTrack: Array<Track>;
};


export type QuerySearchTrackArgs = {
  index: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
  query: Scalars['String']['input'];
};

export type Track = {
  __typename?: 'Track';
  album: Album;
  artist: Artist;
  duration?: Maybe<Scalars['Int']['output']>;
  explicit_lyrics?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  preview?: Maybe<Scalars['String']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type SearchTrackQueryQueryVariables = Exact<{
  query: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
  index: Scalars['Int']['input'];
}>;


export type SearchTrackQueryQuery = { __typename?: 'Query', searchTrack: Array<{ __typename?: 'Track', id: string, title: string, duration?: number | null, rank?: number | null, artist: { __typename?: 'Artist', id: string, name: string }, album: { __typename?: 'Album', title?: string | null } }> };

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

export const SearchTrackQueryDocument = new TypedDocumentString(`
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
    `) as unknown as TypedDocumentString<SearchTrackQueryQuery, SearchTrackQueryQueryVariables>;