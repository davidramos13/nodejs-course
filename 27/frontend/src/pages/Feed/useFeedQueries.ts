import {
  useCreatePostMutation,
  useDeletePostMutation,
  useGetPostsQuery,
  useGetStatusQuery,
  useUpdatePostMutation,
  useUpdateStatusMutation,
} from '../../store/feed/apis';
import getLastError from '../../util/getLastError';

const useFeedQueries = (fetchPage: number) => {
  const {
    data,
    isSuccess: dataFetched,
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

  return {
    queries: {
      data,
      dataFetched,
      refetch,
      status: statusData?.status,
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
