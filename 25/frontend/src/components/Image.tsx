import React from 'react';

type Props = { imageUrl: string; contain?: boolean }
const Image: React.FC<Props> = ({ imageUrl, contain = false }) => (
  <div
    className="image"
    style={{
      backgroundImage: `url('${imageUrl}')`,
      backgroundSize: contain ? 'contain' : 'cover',
      backgroundPosition: 'center'
    }}
  />
);

export default Image;
