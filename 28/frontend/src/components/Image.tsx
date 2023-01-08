import React from 'react';
import tw from 'twin.macro';

const DivImage = tw.div`w-full h-full bg-no-repeat`;

type Props = { imageUrl: string; contain?: boolean; left?: boolean };
const Image: React.FC<Props> = ({ imageUrl, contain = false, left = false }) => {
  const url = imageUrl.startsWith('data:image')
    ? imageUrl
    : `${import.meta.env.VITE_BACKEND_URL}/${imageUrl}`;
  return (
    <DivImage
      style={{
        backgroundImage: `url('${url}')`,
        backgroundSize: contain ? 'contain' : 'cover',
        backgroundPosition: left ? 'left' : 'center',
      }}
    />
  );
};

export default Image;
