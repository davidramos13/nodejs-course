/** THIS FILE IS AUTOGENERATED, DO NOT EDIT IT!
 * instead, edit `.graphql` files and run graphql-codegen script
 * for this file to be re-created */

import * as Types from '../../graphql/types.generated';

import { api } from '../../graphql/authApi';
export type CreateUserMutationVariables = Types.Exact<{
  email: Types.Scalars['String'];
  name: Types.Scalars['String'];
  password: Types.Scalars['String'];
}>;


export type CreateUserMutation = { __typename?: 'RootMutation', createUser: { __typename?: 'User', _id: string, email: string } };


export const CreateUserDocument = `
    mutation CreateUser($email: String!, $name: String!, $password: String!) {
  createUser(userInput: {email: $email, name: $name, password: $password}) {
    _id
    email
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    CreateUser: build.mutation<CreateUserMutation, CreateUserMutationVariables>({
      query: (variables) => ({ document: CreateUserDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useCreateUserMutation } = injectedRtkApi;

