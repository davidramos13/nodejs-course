import { Fragment, useEffect, useState } from 'react';

import AppRoutes from './AppRoutes ';
import Backdrop from './components/Backdrop';
import Layout from './components/Layout';
import MainNavigation from './components/Navigation/MainNavigation';
import MobileNavigation from './components/Navigation/MobileNavigation';
import Toolbar from './components/Toolbar';
import ViteReact from './components/ViteReact';
import { useAppDispatch } from './store';
import { checkAuth, logout } from './store/auth/slice';

const App: React.FC = () => {
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [ready, setReady] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
    setReady(true);
  }, []);

  const mobileNavHandler = (isOpen: boolean) => () => {
    setShowMobileNav(isOpen);
    setShowBackdrop(isOpen);
  };

  const backdropClickHandler = () => {
    setShowBackdrop(false);
    setShowMobileNav(false);
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  if (!ready) return null;

  return (
    <Fragment>
      <ViteReact />
      {showBackdrop && <Backdrop onClick={backdropClickHandler} />}
      <Layout
        header={
          <Toolbar>
            <MainNavigation onOpenMobileNav={mobileNavHandler(true)} onLogout={logoutHandler} />
          </Toolbar>
        }
        mobileNav={
          <MobileNavigation
            open={showMobileNav}
            onChooseItem={mobileNavHandler(false)}
            onLogout={logoutHandler}
          />
        }
      />
      {<AppRoutes />}
    </Fragment>
  );
};

export default App;
