import {
  useCreatePostMutation,
  useDeletePostMutation,
  useGetPostsQuery,
  useUpdatePostMutation,
} from '../../store/feed/apis';
import getLastError from '../../util/getLastError';

const useFeedQueries = (fetchPage: number) => {
  const {
    data,
    error: fetchError,
    isLoading: fetchLoading,
    fulfilledTimeStamp: fetchTime,
    refetch,
  } = useGetPostsQuery(fetchPage); // GET /posts

  const [
    createPost,
    { error: createError, isLoading: createLoading, fulfilledTimeStamp: createTime },
  ] = useCreatePostMutation(); // POST /post

  const [
    updatePost,
    { error: updateError, isLoading: updateLoading, fulfilledTimeStamp: updateTime },
  ] = useUpdatePostMutation(); // PUT /post/:id

  const [
    deletePost,
    { error: deleteError, isLoading: deleteLoading, fulfilledTimeStamp: deleteTime },
  ] = useDeletePostMutation(); // PUT /post/:id

  const error = getLastError(
    [fetchError, fetchTime],
    [createError, createTime],
    [updateError, updateTime],
    [deleteError, deleteTime],
  );

  const isLoading = fetchLoading || deleteLoading;
  const editLoading = createLoading || updateLoading;

  return { data, refetch, error, isLoading, editLoading, createPost, updatePost, deletePost };
};

export default useFeedQueries;
