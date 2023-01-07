import React, { Fragment, PropsWithChildren, ReactElement } from 'react';
import tw from 'twin.macro';

const HeaderMain = tw.header`fixed left-0 top-0 w-full`;
const MainContent = tw.main`p-4 mt-14 md:py-4 md:px-8`;

type Props = { header: ReactElement; mobileNav: ReactElement };
const Layout: React.FC<PropsWithChildren<Props>> = (props) => {
  const { header, mobileNav, children } = props;

  return (
    <Fragment>
      <HeaderMain>{header}</HeaderMain>
      {mobileNav}
      <MainContent>{children}</MainContent>
    </Fragment>
  );
};

export default Layout;
