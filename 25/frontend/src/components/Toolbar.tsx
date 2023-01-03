import React, { PropsWithChildren } from 'react';

const Toolbar: React.FC<PropsWithChildren> = ({ children }) => (
  <div className="toolbar">
      {children}
  </div>
);

export default Toolbar;
