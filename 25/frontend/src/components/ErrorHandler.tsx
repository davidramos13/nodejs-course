import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import React, { Fragment, useEffect, useState } from 'react';
import Backdrop from './Backdrop';
import Modal from './Modal';

type RtkError = SerializedError | FetchBaseQueryError;

const getMessage = (error: RtkError) => {
  if ('status' in error) {
    const { status } = error;
    if (status === 'FETCH_ERROR' || status === 'CUSTOM_ERROR') return `${error.error}`;
    else if (status === 'PARSING_ERROR') {
      return `${error.error}\nOriginal Status: ${error.originalStatus}`;
    } else return `${status} - Data: ${error.data}`; // status is TIMEOUT_ERROR or number here
  }

  return `${error.code} - ${error.name} - ${error.message}`;
};

type Props = { error?: RtkError };
const ErrorHandler: React.FC<Props> = ({ error }) => {
  const [showModal, setShowModal] = useState(false);

  const hasError = !!error;
  useEffect(() => {
    setShowModal(!!hasError);
  }, [hasError]);

  if (!error || !showModal) return null;

  console.log(error);
  const message = getMessage(error);

  const onHandle = () => {
    setShowModal(false);
  };

  return (
    <Fragment>
      <Backdrop onClick={onHandle} />
      <Modal
        title="An Error Occurred"
        onCancelModal={onHandle}
        onAcceptModal={onHandle}
        acceptEnabled>
        <p>{message}</p>
      </Modal>
    </Fragment>
  );
};

export default ErrorHandler;
