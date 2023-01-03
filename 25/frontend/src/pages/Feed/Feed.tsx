import React, { Fragment } from 'react';
import Button from '../../components/Button';
import ErrorHandler from '../../components/ErrorHandler';
import FeedEdit from '../../components/Feed/FeedEdit';
import Input from '../../components/Form/Input';
import Loader from '../../components/Loader';
import Paginator from '../../components/Paginator';

// old state
// isEditing: false, posts: [], totalPosts: 0, editPost: null,
// status: '', postPage: 1, postsLoading: true, editLoading: false

const Feed: React.FC = () => {
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

  const onChange = () => {
    // this.setState({ error: null });
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
      <section className="feed__status">
        <form onSubmit={statusUpdate}>
          <Input
            id="status"
            placeholder="Your status"
            onChange={onChange}
            value={""/* this.state.status */}
          />
          <Button mode="flat" type="submit">
            Update
          </Button>
        </form>
      </section>
      <section className="feed__control">
        <Button mode="raised" design="accent" onClick={newPostHandler}>
          New Post
        </Button>
      </section>
      <section className="feed">
        {/* this.state.postsLoading */ false && (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Loader />
          </div>
        )}
        {/* this.state.posts.length <= 0 && !this.state.postsLoading */ false ? (
          <p style={{ textAlign: 'center' }}>No posts found.</p>
        ) : null}
        {/* !this.state.postsLoading */ true && (
          <Paginator
            onPrevious={loadPosts('previous')}
            onNext={loadPosts('next')}
            lastPage={Math.ceil(/* this.state.totalPosts */4 / 2)}
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
