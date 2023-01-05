import React, { Fragment, useState } from 'react';
import tw from 'twin.macro';
import * as yup from 'yup';
import Button from '../../components/Button/Button';
import ErrorHandler from '../../components/ErrorHandler';
import FeedEdit from '../../components/Feed/FeedEdit';
import Post from '../../components/Feed/Post';
import Form from '../../components/Form/Form';
import Input from '../../components/Input';
import Loader from '../../components/Loader';
import Paginator from '../../components/Paginator';
import { useGetPostsQuery } from '../../store/feed/apis';
import useFormHook from '../../util/useFormHook';

const SecStatus = tw.section`w-[90%] my-4 mx-auto md:w-[30rem]`;

const schema = yup.object({ status: yup.string() });
type FeedData = { status: string };
const defaultValues: FeedData = { status: '' };
// old state
// isEditing: false, posts: [], totalPosts: 0, editPost: null,
// status: '', postPage: 1, postsLoading: true, editLoading: false

const Feed: React.FC = () => {
  const formHook = useFormHook(schema, defaultValues);
  const { data, error, isLoading } = useGetPostsQuery();
  const [page, setPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);

  const currentdate = new Date();
  console.log(currentdate, 'loading?', isLoading);
  console.log(currentdate, 'data?', data);

  //#region TEMP COMMENTS

  // fetch posts on mount

  const statusUpdate = () => {
    // call update status
  };

  const startEdit = (_id: string) => () => {
    // this.setState(prevState => {
    //   const loadedPost = { ...prevState.posts.find(p => p._id === postId) };
    //   return { isEditing: true, editPost: loadedPost };
    // });
  };

  const cancelEdit = () => {
    // this.setState({ isEditing: false, editPost: null });
  };

  const finishEdit = () => {
    // call create/update, update post list
  };

  const deletePost = (_id: string) => () => {
    // call delete, update posts in page
  };

  const newPostHandler = () => {
    // this.setState({ isEditing: true });
  };

  const catchError = () => {
    // this.setState({ error: error });
  };

  const loadPosts = (direction?: string) => () => {
    // TODO
  };
  //#endregion
  return (
    <Fragment>
      <ErrorHandler error={error} />
      <FeedEdit
        editing={isEditing}
        // selectedPost={this.state.editPost}
        loading={false /* this.state.editLoading */}
        // onCancelEdit={cancelEdit}
        // onFinishEdit={finishEdit}
      />
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
        {isLoading ? (
          <div tw="text-center mt-8">
            <Loader />
          </div>
        ) : !data || data.posts.length === 0 ? (
          <p tw="text-center">No posts found.</p>
        ) : (
          <Paginator
            onPrevious={loadPosts('previous')}
            onNext={loadPosts('next')}
            lastPage={0}
            currentPage={page}>
            {data.posts.map((post) => (
              <Post
                key={post._id}
                id={post._id}
                author={post.creator.name}
                date={new Date(post.createdAt).toLocaleDateString('en-US')}
                title={post.title}
                image={post.imageUrl}
                content={post.content}
                onStartEdit={startEdit(post._id)}
                onDelete={deletePost(post._id)}
              />
            ))}
          </Paginator>
        )}
      </section>
    </Fragment>
  );
};

export default Feed;
