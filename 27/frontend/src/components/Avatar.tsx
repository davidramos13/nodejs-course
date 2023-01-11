import React from 'react';
import tw from 'twin.macro';

import Image from './Image';

const DivAvatar = tw.div`w-40 h-40 my-2 mx-auto rounded-full overflow-hidden`;

type Props = { image: string; size: number; height: number };
const Avatar: React.FC<Props> = ({ image, size, height }) => (
  <DivAvatar style={{ width: size + 'rem', height: height + 'rem' }}>
    <Image imageUrl={image} />
  </DivAvatar>
);

export default Avatar;
