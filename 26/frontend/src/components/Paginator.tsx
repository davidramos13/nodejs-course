import React, { PropsWithChildren } from 'react';
import tw from 'twin.macro';

const DivControls = tw.div`flex justify-center`;
const BtnControl = tw.button`w-20 py-1 px-0 my-0 mx-4 border border-$violet
  bg-transparent cursor-pointer text-base text-$violet focus:outline-none
  hover:text-$yellow hover:border-$yellow
  active:text-$yellow active:border-$yellow`;

type Props = { currentPage: number; lastPage: number; onPrevious(): void; onNext(): void };
const Paginator: React.FC<PropsWithChildren<Props>> = (props) => {
  const { children, currentPage, lastPage, onPrevious, onNext } = props;

  return (
    <div>
      {children}
      <DivControls>
        {currentPage > 1 && <BtnControl onClick={onPrevious}>Previous</BtnControl>}
        {currentPage < lastPage && <BtnControl onClick={onNext}>Next</BtnControl>}
      </DivControls>
    </div>
  );
};

export default Paginator;
