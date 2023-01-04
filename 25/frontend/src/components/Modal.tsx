import React, { PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';
import tw from 'twin.macro';
import Button from './Button/Button';

const DivModal = tw.div`fixed w-[90%] left-[5%] top-[20vh]
  bg-white rounded-md z-20 shadow-y2
  md:w-[40rem] md:left-[calc(100%-40rem)/2]`;
const Header = tw.header`border-b-2 border-b-$violet`;
const H1Header = tw.h1`text-2xl text-$violet m-4`;
const DivContent = tw.div`p-4`;
const DivActions = tw.div`p-4 text-right`;
const CssButton = tw(Button)`my-0 mx-2`;

type Props = { title: string; onCancelModal(): void; onAcceptModal(): void;
  acceptEnabled?: boolean; isLoading?: boolean };
const Modal: React.FC<PropsWithChildren<Props>> = props => {
  const { children, title, onAcceptModal, onCancelModal,
    acceptEnabled = false, isLoading = false } = props;

  return ReactDOM.createPortal(
    <DivModal>
      <Header>
        <H1Header>{title}</H1Header>
      </Header>
      <DivContent>{children}</DivContent>
      <DivActions>
        <CssButton design="danger" mode="flat" onClick={onCancelModal}>
          Cancel
        </CssButton>
        <CssButton
          mode="raised"
          onClick={onAcceptModal}
          disabled={!acceptEnabled}
          loading={isLoading}
        >
          Accept
        </CssButton>
      </DivActions>
    </DivModal>,
    document.getElementById('modal-root')!
  );;
};

export default Modal;
