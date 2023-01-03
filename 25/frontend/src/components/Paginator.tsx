import React, { PropsWithChildren } from 'react';

type Props = { currentPage: number; lastPage: number;
  onPrevious(): void; onNext(): void };
const Paginator: React.FC<PropsWithChildren<Props>> = props => {
  const { children, currentPage, lastPage, onPrevious, onNext } = props;

  return (
    <div className="paginator">
      {children}
      <div className="paginator__controls">
        {currentPage > 1 && (
          <button className="paginator__control" onClick={onPrevious}>
            Previous
          </button>
        )}
        {currentPage < lastPage && (
          <button className="paginator__control" onClick={onNext}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Paginator;
