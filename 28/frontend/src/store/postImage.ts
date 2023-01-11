import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BACKEND_URL } from '../util/config';
import { readTokenFromStorage } from '../util/storage';

export const postImageApi = createApi({
  reducerPath: 'postImageApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/`,
    prepareHeaders: (headers) => {
      const token = readTokenFromStorage();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    putImage: builder.mutation<{ filePath: string }, { image: FileList }>({
      query: ({ image }) => {
        const formData = new FormData();
        if (image && image[0]) {
          formData.append('image', image[0]);
        }
        return { url: 'postimage', method: 'PUT', body: formData };
      },
    }),
  }),
});

export const { usePutImageMutation } = postImageApi;
