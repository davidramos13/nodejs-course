import React from 'react';
import Button from '../Button';

type Props = { id: string; author: string; date: string;
  title: string; onStartEdit(): void; onDelete(): void };
const Post: React.FC<Props> = props => {
  const { id, author, date, title, onStartEdit, onDelete } = props;

  const onView = () => {};

  return (
    <article className="post">
      <header className="post__header">
        <h3 className="post__meta">
          Posted by {author} on {date}
        </h3>
        <h1 className="post__title">{title}</h1>
      </header>
      {/* <div className="post__image">
        <Image imageUrl={image} contain />
      </div>
      <div className="post__content">{content}</div> */}
      <div className="post__actions">
        <Button mode="flat" link={id} onClick={onView}>
          View
        </Button>
        <Button mode="flat" onClick={onStartEdit}>
          Edit
        </Button>
        <Button mode="flat" design="danger" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </article>
  );
};

export default Post;
