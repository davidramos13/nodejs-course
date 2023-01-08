import React, { Fragment, useEffect, useState } from 'react';
import tw from 'twin.macro';
import { z } from 'zod';
import Button from '../../components/Button/Button';
import ErrorHandler from '../../components/ErrorHandler';
import FeedEdit from '../../components/Feed/FeedEdit';
import PostItem from '../../components/Feed/PostItem';
import Form from '../../components/Form/Form';
import Input from '../../components/Input';
import Loader from '../../components/Loader';
import Paginator from '../../components/Paginator';
import { Post, PostForm } from '../../store/feed';
import useFormHook from '../../util/useFormHook';
import useFeedQueries from './useFeedQueries';

const SecStatus = tw.section`w-[90%] my-4 mx-auto md:w-[30rem]`;

const schema = z.object({ status: z.string() });
type FeedData = { status: string };
const defaultValues: FeedData = { status: '' };

const Feed: React.FC = () => {
  const [page, setPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const formHook = useFormHook(schema, defaultValues);
  const { queries, mutations, loaders, error } = useFeedQueries(page);
  const { postsResult, refetch, status, statusFetched } = queries;
  const { createPost, deletePost, updatePost, updateStatus } = mutations;
  const { mainLoading, editLoading } = loaders;

  useEffect(() => {
    if (statusFetched) formHook.reset({ status });
  }, [statusFetched]);

  //#region TEMP COMMENTS
  const statusUpdate = async (data: { status: string }) => {
    await updateStatus({ status: data.status });
  };

  const startEdit = (id: string) => () => {
    const post = postsResult?.posts?.find((p) => p._id === id);
    if (!post) return;
    setSelectedPost(post);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setSelectedPost(null);
    setIsEditing(false);
  };

  const finishEdit = async (formData: PostForm) => {
    const { image: _image, ...data } = formData;
    if (selectedPost) {
      await updatePost({ ...data, id: selectedPost._id });
    } else {
      await createPost(data);
    }
    setSelectedPost(null);
    setIsEditing(false);
    refetch();
  };

  const deletePostHandler = (id: string) => async () => {
    await deletePost({ id });
    setPage(1);
    refetch();
  };

  const newPostHandler = () => {
    setIsEditing(true);
  };

  const loadPosts = (direction: number) => () => {
    if (!postsResult) return;
    const maxPage = Math.ceil(postsResult.totalItems / 2);
    const newPage = page + direction;

    if (newPage === 0 || newPage > maxPage) {
      // this could happen on refetches after a delete for example
      setPage(1);
    } else setPage(newPage);
  };
  //#endregion
  return (
    <Fragment>
      <ErrorHandler error={error} />
      {isEditing && (
        <FeedEdit
          selectedPost={selectedPost} // temporal until having edit fetch ready
          loading={editLoading}
          onCancelEdit={cancelEdit}
          onFinishEdit={finishEdit}
        />
      )}
      <SecStatus>
        <Form useStyled formHook={formHook} onSubmit={statusUpdate}>
          <Input name="status" placeholder="Your status" />
          <Button mode="flat" type="submit">
            Update
          </Button>
        </Form>
      </SecStatus>
      <section tw="text-center">
        <Button mode="raised" design="accent" onClick={newPostHandler}>
          New Post
        </Button>
      </section>
      <section>
        {mainLoading ? (
          <div tw="text-center mt-8">
            <Loader />
          </div>
        ) : !postsResult || postsResult.posts.length === 0 ? (
          <p tw="text-center">No posts found.</p>
        ) : (
          <Paginator
            onPrevious={loadPosts(-1)}
            onNext={loadPosts(1)}
            lastPage={Math.ceil(postsResult.totalItems / 2)}
            currentPage={page}>
            {postsResult.posts.map((post) => (
              <PostItem
                key={post._id}
                id={post._id}
                author={post.creator.name}
                date={new Date(post.createdAt).toLocaleDateString('en-US')}
                title={post.title}
                image={post.imageUrl}
                content={post.content}
                onStartEdit={startEdit(post._id)}
                onDelete={deletePostHandler(post._id)}
                loading={editLoading}
              />
            ))}
          </Paginator>
        )}
      </section>
    </Fragment>
  );
};

export default Feed;
