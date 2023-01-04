import React from 'react';
import tw from 'twin.macro';

const DivImage = tw.div`w-full h-full bg-no-repeat`;

type Props = { imageUrl: string; contain?: boolean }
const Image: React.FC<Props> = ({ imageUrl, contain = false }) => (
  <DivImage
    style={{
      backgroundImage: `url('${imageUrl}')`,
      backgroundSize: contain ? 'contain' : 'cover',
      backgroundPosition: 'center'
    }}
  />
);

export default Image;
