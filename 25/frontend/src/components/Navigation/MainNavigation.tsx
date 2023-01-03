import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../Logo';
import MobileToggle from './MobileToggle';
import NavigationItems from './NavigationItems';

type Props = { onOpenMobileNav(): void; isAuth: boolean; onLogout(): void };
const MainNavigation: React.FC<Props> = ({ onOpenMobileNav, isAuth, onLogout }) => (
  <nav className="main-nav">
    <MobileToggle onOpen={onOpenMobileNav} />
    <div className="main-nav__logo">
      <NavLink to="/">
        <Logo />
      </NavLink>
    </div>
    <div className="spacer" />
    <ul className="main-nav__items">
      <NavigationItems isAuth={isAuth} onLogout={onLogout} />
    </ul>
  </nav>
);

export default MainNavigation;
