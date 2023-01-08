import { useCreatePostMutation } from './graphql/CreatePost.generated';
import { useDeletePostMutation } from './graphql/DeletePost.generated';
import { GetPostQuery, useGetPostQuery } from './graphql/GetPost.generated';
import { useGetPostsQuery } from './graphql/GetPosts.generated';
import { useGetStatusQuery } from './graphql/GetStatus.generated';
import { useUpdatePostMutation } from './graphql/UpdatePost.generated';
import { useUpdateStatusMutation } from './graphql/UpdateStatus.generated';

export type Post = GetPostQuery['post'];
export type PostForm = Pick<Post, 'content' | 'imageUrl' | 'title'> & { image?: FileList };

export {
  useCreatePostMutation,
  useDeletePostMutation,
  useGetPostQuery,
  useGetPostsQuery,
  useGetStatusQuery,
  useUpdatePostMutation,
  useUpdateStatusMutation,
};
