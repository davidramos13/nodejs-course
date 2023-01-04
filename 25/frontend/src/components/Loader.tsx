import React from 'react';
import tw from 'twin.macro';

const DivLoader = tw.div`inline-block relative w-16 h-16`;
const DivLine = tw.div`block absolute w-[51px] h-[51px] m-1.5 border-[6px]
  rounded-full border-transparent border-t-$violet`;

const Loader: React.FC = () => (
  <DivLoader>
    <DivLine />
    <DivLine />
    <DivLine />
    <DivLine />
  </DivLoader>
);

export default Loader;
