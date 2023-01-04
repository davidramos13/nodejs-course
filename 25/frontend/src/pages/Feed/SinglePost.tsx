import React from 'react';
import { useParams } from 'react-router-dom';
import tw from 'twin.macro';
import Image from '../../components/Image';

const SecContainer = tw.section`w-[90%] m-auto text-center text-$violet md:w-[40rem]`;
const H2Legend = tw.h2`text-base text-[#464646] pb-4 border-b-2 border-b-[#464646]`;
const DivImage = tw.div`w-80 h-80 my-4 mx-auto`;

// change hardcoded values with state: { title, author, date, image, content }
const SinglePost: React.FC = () => {
  const { postId } = useParams();

  if (!postId) return null;
  const id = parseInt(postId);

  // useEffect for loading

  return (
    <SecContainer>
      <h1>TITLE</h1>
      <H2Legend>
        Created by AUTHOR on DATE
      </H2Legend>
      <DivImage>
        <Image imageUrl='IMAGEURL' contain />
      </DivImage>
      <p>CONTENT</p>
    </SecContainer>
  );
};

export default SinglePost;
