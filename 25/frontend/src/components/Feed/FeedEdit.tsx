import React, { Fragment, useState } from 'react';
import tw from 'twin.macro';
import useFormHook from '../../util/useFormHook';
import Backdrop from '../Backdrop';
import Form from '../Form/Form';
import Input from '../Input';
import Image from '../Image';
import TextArea from '../Input/TextArea';
import Modal from '../Modal';
import { IPost, PostFormData } from '../../store/feed/interfaces';
import { z } from 'zod';
import { generateBase64FromImage } from '../../util/image';
import FilePicker from '../Input/FilePicker';

const DivPreview = tw.div`w-60 h-28`;

const getSchema = (isNewPost: boolean) => {
  const schema = z.object({
    title: z.string().min(5),
    image: z.custom<FileList>((file) => !!file),
    content: z.string().min(5),
  });
  return isNewPost ? schema : schema.omit({ image: true });
};

const getInitialValues = (post?: IPost) => {
  let values: PostFormData = { title: '', content: '' };
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
  const schema = getSchema(!selectedPost);

  const [imageUrl, setImageUrl] = useState(selectedPost?.imageUrl);
  const formHook = useFormHook(schema, initialValues);
  const { handleSubmit, reset } = formHook;

  const acceptPostChangeHandler = async () => {
    // this submit is triggered manually (the base source is not using a button type=submit in the modal)
    await handleSubmit((data) => {
      reset();
      setImageUrl(undefined);
      onFinishEdit(data);
    })();
  };

  if (!editing) return null;

  const onFileChange = async (files: FileList) => {
    if (files.length === 0) {
      setImageUrl(undefined);
      return;
    }

    const base64Url = await generateBase64FromImage(files[0]);
    setImageUrl(base64Url);
  };

  return (
    <Fragment>
      <Backdrop onClick={onCancelEdit} />
      <Modal
        title="New Post"
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
