import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';
import { BACKEND_URL } from '../../util/config';
import { ClientErrorResponse, ServerErrorResponse } from './api';

export const api = createApi({
  reducerPath: 'authApi',
  baseQuery: graphqlRequestBaseQuery<ClientErrorResponse>({
    url: `${BACKEND_URL}/graphql`,
    customErrors: ({ name, response }) => {
      if (response?.errors?.length) {
        const error = response.errors[0] as ServerErrorResponse;
        return { name: `${error.message} (${error.status})` };
      }
      return { name };
    },
  }),
  endpoints: () => ({}),
});
