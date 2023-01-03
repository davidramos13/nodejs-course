import React, { PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';

type Props = { title: string; onCancelModal(): void; onAcceptModal(): void;
  acceptEnabled?: boolean; isLoading?: boolean };
const Modal: React.FC<PropsWithChildren<Props>> = props => {
  const { children, title, onAcceptModal, onCancelModal,
    acceptEnabled = false, isLoading = false } = props;

  return ReactDOM.createPortal(
    <div className="modal">
      <header className="modal__header">
        <h1>{title}</h1>
      </header>
      <div className="modal__content">{children}</div>
      <div className="modal__actions">
        <Button design="danger" mode="flat" onClick={onCancelModal}>
          Cancel
        </Button>
        <Button
          mode="raised"
          onClick={onAcceptModal}
          disabled={!acceptEnabled}
          loading={isLoading}
        >
          Accept
        </Button>
      </div>
    </div>,
    document.getElementById('modal-root')!
  );;
};

export default Modal;
