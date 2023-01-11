import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { readTokenFromStorage } from '../../util/storage';
import { IPost, PostFormData } from './interfaces';

const getFormData = (data: Omit<PutPost, '_id'>) => {
  const { content, title, image, imageUrl } = data;
  const formData = new FormData();
  formData.append('title', title);
  formData.append('content', content);
  if (imageUrl) {
    formData.append('imageUrl', imageUrl);
  }
  if (image && image[0]) {
    formData.append('image', image[0]);
  }
  return formData;
};

type GetPostsResponse = { posts: IPost[]; totalItems: number };
type PutPost = PostFormData & { _id: string };

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/feed/`,
    prepareHeaders: (headers) => {
      const token = readTokenFromStorage();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPost: builder.query<IPost, string | undefined>({ query: (id) => `post/${id}` }),
    getPosts: builder.query<GetPostsResponse, number>({
      query: (page) => ({ url: 'posts', params: { page } }),
    }),
    createPost: builder.mutation<void, PostFormData>({
      query: (body) => {
        const formData = getFormData(body);
        return { url: 'post', method: 'POST', body: formData };
      },
    }),
    updatePost: builder.mutation<void, PutPost>({
      query: (body) => {
        const { _id, ...rest } = body;
        const formData = getFormData(rest);
        return { url: `post/${_id}`, method: 'PUT', body: formData };
      },
    }),
    deletePost: builder.mutation<void, string>({
      query: (id) => ({ url: `post/${id}`, method: 'DELETE' }),
    }),
    getStatus: builder.query<{ status: string }, void>({ query: () => 'status' }),
    updateStatus: builder.mutation<void, { status: string }>({
      query: (body) => ({ url: 'status', method: 'POST', body }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetPostQuery,
  useGetPostsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetStatusQuery,
  useUpdateStatusMutation,
} = postsApi;
