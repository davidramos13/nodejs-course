import {
  useCreatePostMutation,
  useDeletePostMutation,
  useGetPostsQuery,
  useGetStatusQuery,
  useUpdatePostMutation,
  useUpdateStatusMutation,
} from '../../store/feed';
import getLastError from '../../util/getLastError';

const useFeedQueries = (fetchPage: number) => {
  const {
    data,
    isSuccess: postsFetched,
    error: fetchError,
    isLoading: fetchLoading,
    fulfilledTimeStamp: fetchTime,
    refetch,
  } = useGetPostsQuery({ page: fetchPage }); // GET /posts

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

  const { data: statusData, isSuccess: statusFetched } = useGetStatusQuery();
  const [updateStatus] = useUpdateStatusMutation();

  const error = getLastError(
    [fetchError, fetchTime],
    [createError, createTime],
    [updateError, updateTime],
    [deleteError, deleteTime],
  );

  const mainLoading = fetchLoading;
  const editLoading = createLoading || updateLoading || deleteLoading;

  const postsResult = data ? data.posts : undefined;
  const status = statusData ? statusData.user.status : undefined;

  return {
    queries: {
      postsFetched,
      postsResult,
      refetch,
      status,
      statusFetched,
    },
    mutations: {
      createPost,
      updatePost,
      deletePost,
      updateStatus,
    },
    loaders: {
      mainLoading,
      editLoading,
    },
    error,
  };
};

export default useFeedQueries;
