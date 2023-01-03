import React from 'react';
import { useParams } from 'react-router-dom';
import Image from '../../components/Image';

// change hardcoded values with state: { title, author, date, image, content }
const SinglePost: React.FC = () => {
  const { postId } = useParams();

  if (!postId) return null;
  const id = parseInt(postId);

  // useEffect for loading

  return (
    <section className="single-post">
      <h1>TITLE</h1>
      <h2>
        Created by AUTHOR on DATE
      </h2>
      <div className="single-post__image">
        <Image imageUrl='IMAGEURL' contain />
      </div>
      <p>CONTENT</p>
    </section>
  );
};

export default SinglePost;
