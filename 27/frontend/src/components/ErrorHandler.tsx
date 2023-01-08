import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { ErrorResponse } from '@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes';
import React, { Fragment, useEffect, useState } from 'react';
import Backdrop from './Backdrop';
import Modal from './Modal';

export type RtkError = SerializedError | FetchBaseQueryError | ErrorResponse;

const add = (label: string, data?: string | number) => {
  if (!data) return '';
  return `${label}: ${data}`;
};

const getMessage = (error: RtkError) => {
  const lines: string[] = [];
  if ('status' in error) {
    const { status } = error;
    if (status === 'FETCH_ERROR' || status === 'CUSTOM_ERROR')
      lines.push(add('Error', error.error));
    else if (status === 'PARSING_ERROR') {
      lines.push(add('Error', error.error), add('Original Status', error.originalStatus));
    } else {
      lines.push(add('Status', status)); // status is TIMEOUT_ERROR or number here
    }
  } else if ('code' in error) {
    const { name, code, message } = error;
    lines.push(add('Error', name), add('Code', code), add('Message', message));
  } else {
    const { name, message } = error;
    lines.push(add('Error', name), add('Message', message));
  }
  return lines.join('\n');
};

type Props = { error?: RtkError };
const ErrorHandler: React.FC<Props> = ({ error }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(!!error);
  }, [error]);

  if (!error || !showModal) return null;

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
