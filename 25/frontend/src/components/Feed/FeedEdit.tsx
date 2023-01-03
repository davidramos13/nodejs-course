import React, { Fragment } from 'react';
import Backdrop from '../Backdrop';
import FilePicker from '../Form/FilePicker';
import Input from '../Form/Input';
import Modal from '../Modal';

type Props = { editing: boolean; loading: boolean; }
const FeedEdit: React.FC<Props> = props => {
  const { editing, loading } = props;

  const acceptPostChangeHandler = () => {};
  const cancelPostChangeHandler = () => {};

  const postInputChangeHandler = () => {
    // TODO
  };

  if (!editing) return null;

  return (
    <Fragment>
      <Backdrop onClick={cancelPostChangeHandler} />
      <Modal
        title="New Post"
        // acceptEnabled={this.state.formIsValid}
        onCancelModal={cancelPostChangeHandler}
        onAcceptModal={acceptPostChangeHandler}
        isLoading={loading}
      >
        <form>
          <Input
            id="title"
            label="Title"
            onChange={postInputChangeHandler}
            value="" // title
            // onBlur={this.inputBlurHandler.bind(this, 'title')}
            // valid={this.state.postForm['title'].valid}
            // touched={this.state.postForm['title'].touched}
            // value={this.state.postForm['title'].value}
          />
          <FilePicker
            id="image"
            label="Image"
            onChange={postInputChangeHandler}
            // onBlur={this.inputBlurHandler.bind(this, 'image')}
            // valid={this.state.postForm['image'].valid}
            // touched={this.state.postForm['image'].touched}
          />
          <div className="new-post__preview-image">
            {/* {!this.state.imagePreview && <p>Please choose an image.</p>}
            {this.state.imagePreview && (
              <Image imageUrl={this.state.imagePreview} contain left />
            )} */}
          </div>
          <Input
            id="content"
            label="Content"
            multiline
            rows={5}
            onChange={postInputChangeHandler}
            // onBlur={this.inputBlurHandler.bind(this, 'content')}
            // valid={this.state.postForm['content'].valid}
            // touched={this.state.postForm['content'].touched}
            value="" // content
          />
        </form>
      </Modal>
    </Fragment>
  );
};

export default FeedEdit;
