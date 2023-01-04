import React from 'react';
import ReactDOM from 'react-dom';
import tw from 'twin.macro';

const DivBackdrop = tw.div`w-full h-screen bg-black/75
  z-10 fixed left-0 top-0 transition-opacity ease-out opacity-100`;

const backdropElement = document.getElementById('backdrop-root') as HTMLElement;

type Props = { onClick(): void };
const Backdrop: React.FC<Props> = ({ onClick }) => {
  return ReactDOM.createPortal(<DivBackdrop onClick={onClick} />, backdropElement);
};

export default Backdrop;
