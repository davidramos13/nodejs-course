import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Post } from './interfaces';

type GetPosts = { posts: Post[] };
// Define a service using a base URL and expected endpoints
export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/feed/' }),
  endpoints: (builder) => ({
    getPosts: builder.query<GetPosts, void>({ query: () => 'posts' }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPostsQuery } = postsApi;
