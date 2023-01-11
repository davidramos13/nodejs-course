import React from 'react';
import tw from 'twin.macro';

import reactLogo from '../assets/react.svg';

const DivContainer = tw.div`fixed right-0 bottom-0`;
const ALogo = tw.a`inline-block`;
const ImgLogo = tw.img`h-24 p-2 will-change-auto hover:drop-shadow-blue`;

const ReactLogo = tw(ImgLogo)`animate-spin-slow`;

const ViteReact: React.FC = () => {
  return (
    <DivContainer>
      <ALogo href="https://vitejs.dev" target="_blank">
        <ImgLogo src="/vite.svg" alt="Vite logo" />
      </ALogo>
      <ALogo href="https://reactjs.org" target="_blank">
        <ReactLogo src={reactLogo} alt="React logo" />
      </ALogo>
    </DivContainer>
  );
};

export default ViteReact;
