import React, { Fragment, useState } from 'react';
import tw, { css, styled } from 'twin.macro';
import Button from '../../components/Button/Button';
import ErrorHandler from '../../components/ErrorHandler';
import FeedEdit from '../../components/Feed/FeedEdit';
import Input from '../../components/Form/Input';
import Loader from '../../components/Loader';
import Paginator from '../../components/Paginator';

const SecStatus = tw.section`w-[90%] my-4 mx-auto md:w-[30rem]`;
const CssForm = styled.form(() => [
  tw`flex items-center`,
  css`& * {${tw`my-0 mx-2`}}`
]);

// old state
// isEditing: false, posts: [], totalPosts: 0, editPost: null,
// status: '', postPage: 1, postsLoading: true, editLoading: false

const Feed: React.FC = () => {
//#region TEMP COMMENTS
  // temp states for now
  const [status, setStatus] = useState('');

  // fetch posts on mount

  const statusUpdate = () => {
    // call update status
  };

  const startEdit = () => {
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

  const onChange = (inputId: string, value: string) => {
    setStatus(value);
  };

  const deletePostHandler = () => {
    // call delete, update posts in page
  };

  const newPostHandler = () => {
    // this.setState({ isEditing: true });
  };

  const errorHandler = () => {
    // this.setState({ error: null });
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
      <ErrorHandler error={null/* this.state.error */} onHandle={errorHandler} />
      <FeedEdit
        editing={false/* this.state.isEditing */}
        // selectedPost={this.state.editPost}
        loading={false/* this.state.editLoading */}
        // onCancelEdit={cancelEdit}
        // onFinishEdit={finishEdit}
      />
      <SecStatus>
        <CssForm onSubmit={statusUpdate}>
          <Input
            tw="my-0 mx-2"
            id="status"
            placeholder="Your status"
            onChange={onChange}
            value={status}
          />
          <Button mode="flat" type="submit" tw="my-0 mx-2">
            Update
          </Button>
        </CssForm>
      </SecStatus>
      <section tw="text-center">
        <Button mode="raised" design="accent" onClick={newPostHandler}>
          New Post
        </Button>
      </section>
      <section>
        {/* this.state.postsLoading */ true && (
          <div tw="text-center mt-8">
            <Loader />
          </div>
        )}
        {/* this.state.posts.length <= 0 && !this.state.postsLoading */ false ? (
          <p tw="text-center">No posts found.</p>
        ) : null}
        {/* !this.state.postsLoading */ true && (
          <Paginator
            onPrevious={loadPosts('previous')}
            onNext={loadPosts('next')}
            lastPage={1/* this.state.totalPosts */}
            currentPage={1/* this.state.postPage */}
          >
            {/* {this.state.posts.map(post => (
              <Post
                key={post._id}
                id={post._id}
                author={post.creator.name}
                date={new Date(post.createdAt).toLocaleDateString('en-US')}
                title={post.title}
                image={post.imageUrl}
                content={post.content}
                onStartEdit={this.startEditPostHandler.bind(this, post._id)}
                onDelete={this.deletePostHandler.bind(this, post._id)}
              />
            ))} */}
          </Paginator>
        )}
      </section>
    </Fragment>
  );
};

export default Feed;
