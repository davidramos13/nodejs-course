/** THIS FILE IS AUTOGENERATED, DO NOT EDIT IT!
 * instead, edit `.graphql` files and run graphql-codegen script
 * for this file to be re-created */

import * as Types from '../../graphql/types.generated';

import { api } from '../../graphql/api';
export type GetPostQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetPostQuery = { __typename?: 'RootQuery', post: { __typename?: 'Post', _id: string, title: string, content: string, imageUrl: string, createdAt: string, updatedAt: string, creator: { __typename?: 'User', name: string } } };


export const GetPostDocument = `
    query GetPost($id: ID!) {
  post(id: $id) {
    _id
    title
    content
    imageUrl
    createdAt
    updatedAt
    creator {
      name
    }
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    GetPost: build.query<GetPostQuery, GetPostQueryVariables>({
      query: (variables) => ({ document: GetPostDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetPostQuery, useLazyGetPostQuery } = injectedRtkApi;

