/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query FetchRandomArtistsQuery($count: Int!) {\n    fetchRandomArtists(count: $count) {\n      id\n      picture\n      name\n      biography\n      link\n      picture_xl\n      position\n    }\n  }\n": typeof types.FetchRandomArtistsQueryDocument,
    "\n  query SearchTrackWithBiographyQuery(\n    $query: String!\n    $limit: Int!\n    $index: Int!\n  ) {\n    searchTrackWithBiography(query: $query, limit: $limit, index: $index) {\n      id\n      title\n      duration\n      rank\n      explicit_lyrics\n      artist {\n        id\n        name\n        biography\n        picture\n      }\n      album {\n        title\n        cover\n      }\n    }\n  }\n": typeof types.SearchTrackWithBiographyQueryDocument,
};
const documents: Documents = {
    "\n  query FetchRandomArtistsQuery($count: Int!) {\n    fetchRandomArtists(count: $count) {\n      id\n      picture\n      name\n      biography\n      link\n      picture_xl\n      position\n    }\n  }\n": types.FetchRandomArtistsQueryDocument,
    "\n  query SearchTrackWithBiographyQuery(\n    $query: String!\n    $limit: Int!\n    $index: Int!\n  ) {\n    searchTrackWithBiography(query: $query, limit: $limit, index: $index) {\n      id\n      title\n      duration\n      rank\n      explicit_lyrics\n      artist {\n        id\n        name\n        biography\n        picture\n      }\n      album {\n        title\n        cover\n      }\n    }\n  }\n": types.SearchTrackWithBiographyQueryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FetchRandomArtistsQuery($count: Int!) {\n    fetchRandomArtists(count: $count) {\n      id\n      picture\n      name\n      biography\n      link\n      picture_xl\n      position\n    }\n  }\n"): typeof import('./graphql').FetchRandomArtistsQueryDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchTrackWithBiographyQuery(\n    $query: String!\n    $limit: Int!\n    $index: Int!\n  ) {\n    searchTrackWithBiography(query: $query, limit: $limit, index: $index) {\n      id\n      title\n      duration\n      rank\n      explicit_lyrics\n      artist {\n        id\n        name\n        biography\n        picture\n      }\n      album {\n        title\n        cover\n      }\n    }\n  }\n"): typeof import('./graphql').SearchTrackWithBiographyQueryDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
