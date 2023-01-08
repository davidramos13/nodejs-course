import React, { Fragment } from 'react';
import tw from 'twin.macro';
import useFormHook from '../../util/useFormHook';
import Backdrop from '../Backdrop';
import Form from '../Form/Form';
import Input from '../Input';
import Image from '../Image';
import TextArea from '../Input/TextArea';
import Modal from '../Modal';
import { z } from 'zod';
import FilePicker from '../Input/FilePicker';
import { Post, PostForm } from '../../store/feed';
import { usePutImageMutation } from '../../store/postImage';

const DivPreview = tw.div`w-60 h-28`;

const getSchema = (isNewPost: boolean) => {
  const schema = z.object({
    title: z.string().min(5),
    image: z.custom<FileList>((file) => file && (file as FileList).length),
    imageUrl: z.string(),
    content: z.string().min(5),
  });
  return isNewPost ? schema : schema.partial({ image: true });
};

const getInitialValues = (post: PostForm | null) => {
  let values: PostForm = { title: '', content: '', imageUrl: '' };
  if (post) {
    const { title, content, imageUrl } = post;
    values = { title, content, imageUrl };
  }
  return values;
};

type Props = {
  loading: boolean;
  selectedPost: Post | null;
  onCancelEdit(): void;
  onFinishEdit(data: PostForm): void;
};
const FeedEdit: React.FC<Props> = (props) => {
  const { loading, selectedPost, onCancelEdit, onFinishEdit } = props;
  const initialValues = getInitialValues(selectedPost);
  const schema = getSchema(!selectedPost);
  const formHook = useFormHook(schema, initialValues);
  const { handleSubmit, setValue, watch } = formHook;

  const [uploadImage] = usePutImageMutation();

  const acceptPostChangeHandler = async () => {
    // this submit is triggered manually (the base source is not using a button type=submit in the modal)
    await handleSubmit((data) => onFinishEdit(data))();
  };

  const onFileChange = async (files: FileList) => {
    if (files.length === 0) {
      setValue('imageUrl', '');
      return;
    }

    const result = await uploadImage({ image: files });
    if ('error' in result) return;
    setValue('imageUrl', result.data.filePath);
  };

  const imageUrl = watch('imageUrl');

  return (
    <Fragment>
      <Backdrop onClick={onCancelEdit} />
      <Modal
        title={selectedPost ? 'Edit Post' : 'New Post'}
        acceptEnabled={formHook.formState.isValid}
        onCancelModal={onCancelEdit}
        onAcceptModal={acceptPostChangeHandler}
        isLoading={loading}>
        <Form formHook={formHook} onSubmit={onFinishEdit}>
          <Input name="title" label="Title" />
          <FilePicker name="image" label="Image" onFileChange={onFileChange} />
          <DivPreview>
            {!imageUrl && <p>Please choose an image.</p>}
            {imageUrl && <Image imageUrl={imageUrl} contain left />}
          </DivPreview>
          <TextArea name="content" label="Content" rows={5} />
        </Form>
      </Modal>
    </Fragment>
  );
};

export default FeedEdit;
