import React from 'react';
import { useParams } from 'react-router-dom';
import tw from 'twin.macro';
import Image from '../../components/Image';
import { useGetPostQuery } from '../../store/feed/apis';

const SecContainer = tw.section`w-[90%] m-auto text-center text-$violet md:w-[40rem]`;
const H2Legend = tw.h2`text-base text-[#464646] pb-4 border-b-2 border-b-[#464646]`;
const DivImage = tw.div`w-80 h-80 my-4 mx-auto`;

const SinglePost: React.FC = () => {
  const { postId } = useParams();
  const { data: post, error, isLoading } = useGetPostQuery(postId);

  if (!postId || isLoading || error || !post) return null;

  const date = new Date(post.createdAt).toLocaleDateString();
  const url = `${import.meta.env.VITE_BACKEND_URL}/${post.imageUrl}`;

  return (
    <SecContainer>
      <h1>{post.title}</h1>
      <H2Legend>
        Created by {post.creator.name} on {date}
      </H2Legend>
      <DivImage>
        <Image imageUrl={url} contain />
      </DivImage>
      <p>{post.content}</p>
    </SecContainer>
  );
};

export default SinglePost;
