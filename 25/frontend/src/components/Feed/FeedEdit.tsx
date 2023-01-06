import React, { Fragment } from 'react';
import tw from 'twin.macro';
import useFormHook from '../../util/useFormHook';
import Backdrop from '../Backdrop';
import Form from '../Form/Form';
import Input from '../Input';
import TextArea from '../Input/TextArea';
import Modal from '../Modal';
import { IPost, PostFormData } from '../../store/feed/interfaces';
import { z } from 'zod';

const DivPreview = tw.div`w-60 h-28`;

const schema = z.object({
  title: z.string().min(5),
  content: z.string().min(5),
});

const getInitialValues = (post?: IPost) => {
  let values: PostFormData = { title: '', /* imageUrl: '', */ content: '' };
  if (post) {
    const { title, content } = post;
    values = { title, content };
  }
  return values;
};

type Props = {
  editing: boolean;
  loading: boolean;
  selectedPost?: IPost;
  onCancelEdit(): void;
  onFinishEdit(data: PostFormData): void;
};
const FeedEdit: React.FC<Props> = (props) => {
  const { editing, loading, selectedPost, onCancelEdit, onFinishEdit } = props;
  const initialValues = getInitialValues(selectedPost);
  const formHook = useFormHook(schema, initialValues);
  const { handleSubmit, reset } = formHook;

  const acceptPostChangeHandler = async () => {
    await handleSubmit((data) => {
      reset();
      onFinishEdit(data);
    })();
  };

  const cancelPostChangeHandler = onCancelEdit;

  if (!editing) return null;

  return (
    <Fragment>
      <Backdrop onClick={cancelPostChangeHandler} />
      <Modal
        title="New Post"
        acceptEnabled={formHook.formState.isValid}
        onCancelModal={cancelPostChangeHandler}
        onAcceptModal={acceptPostChangeHandler}
        isLoading={loading}>
        <Form formHook={formHook} onSubmit={onFinishEdit}>
          <Input name="title" label="Title" />
          <Input type="file" name="image" label="Image" />
          <DivPreview>
            {/* !this.state.imagePreview */ true && <p>Please choose an image.</p>}
            {/* {this.state.imagePreview && (
              <Image imageUrl={this.state.imagePreview} contain left />
            )} */}
          </DivPreview>
          <TextArea name="content" label="Content" rows={5} />
        </Form>
      </Modal>
    </Fragment>
  );
};

export default FeedEdit;

// onBlur={this.inputBlurHandler.bind(this, 'title')}
// valid={this.state.postForm['title'].valid}
// touched={this.state.postForm['title'].touched}
// value={this.state.postForm['title'].value}

// onBlur={this.inputBlurHandler.bind(this, 'image')}
// valid={this.state.postForm['image'].valid}
// touched={this.state.postForm['image'].touched}

// onBlur={this.inputBlurHandler.bind(this, 'content')}
// valid={this.state.postForm['content'].valid}
// touched={this.state.postForm['content'].touched}
