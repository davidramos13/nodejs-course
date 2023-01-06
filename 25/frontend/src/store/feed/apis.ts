import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPost, PostFormData } from './interfaces';

type GetPosts = { posts: IPost[] };
// Define a service using a base URL and expected endpoints
export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/feed/` }),
  endpoints: (builder) => ({
    getPost: builder.query<IPost, string | undefined>({ query: (id) => `posts/${id}` }),
    getPosts: builder.query<GetPosts, void>({ query: () => 'posts' }),
    createPost: builder.mutation<void, PostFormData>({
      query: (body) => {
        const { image, title, content } = body;

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (image && image[0]) {
          formData.append('image', image[0]);
        }

        return { url: 'post', method: 'POST', body: formData };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPostQuery, useGetPostsQuery, useCreatePostMutation } = postsApi;
