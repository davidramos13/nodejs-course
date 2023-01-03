import React from 'react';

type ImageProps = { imageUrl: string; contain?: boolean }
const Image: React.FC<ImageProps> = ({ imageUrl, contain = false }) => (
  <div
    className="image"
    style={{
      backgroundImage: `url('${imageUrl}')`,
      backgroundSize: contain ? 'contain' : 'cover',
      backgroundPosition: 'center'
    }}
  />
);

type Props = { image: string; size: number; height: number };
const Avatar: React.FC<Props> = ({ image, size, height }) => (
  <div
    className="avatar"
    style={{ width: size + 'rem', height: size + 'rem' }}
  >
    <Image imageUrl={image} />
  </div>
);

export default Avatar;
