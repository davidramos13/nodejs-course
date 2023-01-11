import { Global } from '@emotion/react';
import React, { Fragment } from 'react';
import tw, { css, GlobalStyles as BaseStyles, theme } from 'twin.macro';

const customStyles = css({
  body: {
    fontFamily: 'sans-serif',
    WebkitTapHighlightColor: theme`colors.purple.500`,
    ...tw`antialiased`,
  },
  h1: {
    fontWeight: 'bold',
  },
});

const GlobalStyles = () => (
  <Fragment>
    <BaseStyles />
    <Global styles={customStyles} />
  </Fragment>
);

export default GlobalStyles;
