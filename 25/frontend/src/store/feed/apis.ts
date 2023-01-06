import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
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

type GetPosts = { posts: IPost[]; totalItems: number };
type PutPost = PostFormData & { _id: string };
// Define a service using a base URL and expected endpoints
export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/feed/` }),
  endpoints: (builder) => ({
    getPost: builder.query<IPost, string | undefined>({ query: (id) => `post/${id}` }),
    getPosts: builder.query<GetPosts, number>({
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
} = postsApi;
