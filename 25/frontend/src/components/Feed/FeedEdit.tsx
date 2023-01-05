import React, { Fragment } from 'react';
import tw from 'twin.macro';
import useFormHook from '../../util/useFormHook';
import * as yup from 'yup';
import Backdrop from '../Backdrop';
import Form from '../Form/Form';
import Input from '../Input';
import TextArea from '../Input/TextArea';
import Modal from '../Modal';

const DivPreview = tw.div`w-60 h-28`;
const noop = () => {
  // TEMP EMPTY FN
};

const schema = yup
  .object({
    title: yup.string().required().min(5),
    image: yup.string().required(),
    content: yup.string().required().min(5),
  })
  .required();

type PostData = { title: string; image: string; content: string };
const defaultValues: PostData = { title: '', image: '', content: '' };

type Props = { editing: boolean; loading: boolean };
const FeedEdit: React.FC<Props> = (props) => {
  const formHook = useFormHook(schema, defaultValues);
  const { editing, loading } = props;

  const acceptPostChangeHandler = noop;
  const cancelPostChangeHandler = noop;

  if (!editing) return null;

  const onSubmit = (data: PostData) => {
    console.log(data);
  };

  return (
    <Fragment>
      <Backdrop onClick={cancelPostChangeHandler} />
      <Modal
        title="New Post"
        // acceptEnabled={this.state.formIsValid}
        onCancelModal={cancelPostChangeHandler}
        onAcceptModal={acceptPostChangeHandler}
        isLoading={loading}>
        <Form formHook={formHook} onSubmit={onSubmit}>
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
