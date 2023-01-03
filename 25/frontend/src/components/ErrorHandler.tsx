import React, { Fragment } from 'react';
import Backdrop from './Backdrop';
import Modal from './Modal';

type Props = { error: { message: string } | null; onHandle(): void };
const ErrorHandler: React.FC<Props> = ({ error, onHandle }) => (
  <Fragment>
    {error && <Backdrop onClick={onHandle} />}
    {error && (
      <Modal
        title="An Error Occurred"
        onCancelModal={onHandle}
        onAcceptModal={onHandle}
        acceptEnabled
      >
        <p>{error.message}</p>
      </Modal>
    )}
  </Fragment>
);

export default ErrorHandler;
