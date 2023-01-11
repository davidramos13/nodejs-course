import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';

import { BACKEND_URL } from '../../util/config';
import { readTokenFromStorage } from '../../util/storage';

export type ClientErrorResponse = { name: string };
export type ServerErrorResponse = { message: string; status: string };

export const api = createApi({
  baseQuery: graphqlRequestBaseQuery<ClientErrorResponse>({
    url: `${BACKEND_URL}/graphql`,
    customErrors: ({ name, response }) => {
      if (response?.errors?.length) {
        const error = response.errors[0] as ServerErrorResponse;
        return { name: `${error.message} (${error.status})` };
      }
      return { name };
    },
    prepareHeaders: (headers) => {
      const token = readTokenFromStorage();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
