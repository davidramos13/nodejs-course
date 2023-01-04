import React, { PropsWithChildren } from 'react';
import tw from 'twin.macro';

const SectionAuth = tw.section`w-[90%] m-auto p-4 border-$violet rounded md:w-[40rem]`;

const Auth: React.FC<PropsWithChildren> = ({ children }) => (
  <SectionAuth>{children}</SectionAuth>
);

export default Auth;
