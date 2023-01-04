import React from 'react';
import tw from 'twin.macro';

const BtnToggle = tw.div`flex flex-col border-none w-10 h-[80%]
  p-0 mr-4 justify-evenly cursor-pointer md:hidden`;

const SpanBar = tw.span`h-1 w-10 bg-white`;

type Props = { onOpen(): void; };
const MobileToggle: React.FC<Props> = ({ onOpen }) => (
  <BtnToggle onClick={onOpen}>
    <SpanBar />
    <SpanBar />
    <SpanBar />
  </BtnToggle>
);

export default MobileToggle;
