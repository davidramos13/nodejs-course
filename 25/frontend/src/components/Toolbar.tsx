import React, { PropsWithChildren } from 'react';
import tw from 'twin.macro';

const DivToolbar = tw.div`w-full h-14 bg-$violet`;

const Toolbar: React.FC<PropsWithChildren> = ({ children }) => (
  <DivToolbar>
      {children}
  </DivToolbar>
);

export default Toolbar;
