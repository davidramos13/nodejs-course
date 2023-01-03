import React, { Fragment, PropsWithChildren, ReactElement } from 'react';

type Props = { header: ReactElement; mobileNav: ReactElement; };
const Layout: React.FC<PropsWithChildren<Props>> = props => {
  const { header, mobileNav, children } = props;

  return (
    <Fragment>
      <header className="main-header">{header}</header>
      {mobileNav}
      <main className="content">{children}</main>
    </Fragment>
  );
};

export default Layout;
