import React from 'react';
import ReactDOM from 'react-dom';

type Props = { open?: boolean; onClick(): void };
const Backdrop: React.FC<Props> = ({ open = false, onClick }) => {
  return ReactDOM.createPortal(
    <div
      className={['backdrop', open ? 'open' : ''].join(' ')}
      onClick={onClick}
    />,
    document.getElementById('backdrop-root')!
  );
};


export default Backdrop;
