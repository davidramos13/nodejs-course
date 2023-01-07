import React from 'react';
import tw from 'twin.macro';
import Button from '../Button/Button';

const noop = () => {
  // TEMP EMPTY FN
};

const ArticlePost = tw.article`my-4 mx-0 border border-$violet
  rounded-md p-2 md:p-4 md:w-[40rem] md:mx-auto`;
const H3Meta = tw.h3`text-base text-gray-600 m-0`;
const H1Title = tw.h1`text-2xl my-4 mx-0 text-$violet`;
// const DivImage = tw.div`h-60 w-full`;
const DivActions = tw.div`text-right`;

type Props = {
  id: string;
  author: string;
  date: string;
  title: string;
  image: string;
  content: string;
  onStartEdit(): void;
  onDelete(): void;
};
const Post: React.FC<Props> = (props) => {
  const { id, author, date, title, onStartEdit, onDelete } = props;

  const onView = noop;

  return (
    <ArticlePost>
      <header>
        <H3Meta>
          Posted by {author} on {date}
        </H3Meta>
        <H1Title>{title}</H1Title>
      </header>
      {/* <DivImage>
        <Image imageUrl={image} contain />
      </DivImage>
      <div className="post__content">{content}</div> */}
      <DivActions>
        <Button mode="flat" link={id} onClick={onView}>
          View
        </Button>
        <Button mode="flat" onClick={onStartEdit}>
          Edit
        </Button>
        <Button mode="flat" design="danger" onClick={onDelete}>
          Delete
        </Button>
      </DivActions>
    </ArticlePost>
  );
};

export default Post;
