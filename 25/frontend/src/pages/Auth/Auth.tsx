import React, { PropsWithChildren } from 'react';

const Auth: React.FC<PropsWithChildren> = ({ children }) => (
  <section className="auth-form">{children}</section>
);

export default Auth;
