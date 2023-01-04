import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import tw, { css, styled } from 'twin.macro';

const navItems = [
  { id: 'feed', text: 'Feed', link: '/', auth: true },
  { id: 'login', text: 'Login', link: '/', auth: false },
  { id: 'signup', text: 'Signup', link: '/signup', auth: false },
];

//#region Styled components
const LiNavItem = styled.li<{ mobile: boolean }>(({ mobile }) => [
  tw`px-6 last-of-type:pr-0`,
  mobile && tw`text-2xl my-2`,
]);
const CssNavLink = styled(NavLink)<{ mobile: number }>(({ mobile }) => [
  tw`no-underline text-white`,
  mobile === 1 && tw`text-$violet`,
  css`
    &:hover,
    &:active,
    &.active {
      ${tw`text-$yellow`}
    }
  `,
]);
const BtnLogout = tw.button`p-0 text-white border-none
  bg-transparent cursor-pointer`;
//#endregion

type Props = { isAuth: boolean; mobile?: boolean; onChoose?(): void; onLogout(): void };
const NavigationItems: React.FC<Props> = (props) => {
  const { isAuth, mobile = false, onChoose, onLogout } = props;
  return (
    <Fragment>
      {navItems
        .filter((item) => item.auth === isAuth)
        .map((item) => (
          <LiNavItem key={item.id} mobile={mobile}>
            <CssNavLink to={item.link} onClick={onChoose} mobile={mobile ? 1 : 0}>
              {item.text}
            </CssNavLink>
          </LiNavItem>
        ))}
      {isAuth && (
        <LiNavItem key="logout" mobile={mobile}>
          <BtnLogout onClick={onLogout}>Logout</BtnLogout>
        </LiNavItem>
      )}
    </Fragment>
  );
};

export default NavigationItems;
