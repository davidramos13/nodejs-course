import React from 'react';
import { NavLink } from 'react-router-dom';
import tw from 'twin.macro';
import Logo from '../Logo';
import MobileToggle from './MobileToggle';
import NavigationItems from './NavigationItems';

const NavMain = tw.nav`flex h-full px-4 items-center`;
const DivSpacer = tw.div`flex-1`;
const UlItems = tw.ul`list-none p-0 mx-6 hidden md:flex`;

type Props = { onOpenMobileNav(): void; isAuth: boolean; onLogout(): void };
const MainNavigation: React.FC<Props> = ({ onOpenMobileNav, isAuth, onLogout }) => (
  <NavMain>
    <MobileToggle onOpen={onOpenMobileNav} />
    <div>
      <NavLink to="/">
        <Logo />
      </NavLink>
    </div>
    <DivSpacer />
    <UlItems>
      <NavigationItems isAuth={isAuth} onLogout={onLogout} />
    </UlItems>
  </NavMain>
);

export default MainNavigation;
