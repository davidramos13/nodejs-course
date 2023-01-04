import { Fragment, useEffect, useState } from 'react';
import AppRoutes from './AppRoutes ';
import Backdrop from './components/Backdrop';
import ErrorHandler from './components/ErrorHandler';
import Layout from './components/Layout';
import MainNavigation from './components/Navigation/MainNavigation';
import MobileNavigation from './components/Navigation/MobileNavigation';
import Toolbar from './components/Toolbar';
import ViteReact from './components/ViteReact';

// old state = { showBackdrop: false, showMobileNav: false, isAuth: true,
//   token: null, userId: null, authLoading: false, error: null};

const App: React.FC = () => {
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [isAuth, setIsAuth] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      logoutHandler();
      return;
    }
    const userId = localStorage.getItem('userId');
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();

      setIsAuth(true);
      setToken(token);
      setUserId(userId);

    setAutoLogout(remainingMilliseconds);
  }, []);

  const mobileNavHandler = (isOpen: boolean) => () => {
    setShowMobileNav(isOpen);
    setShowBackdrop(isOpen);
  };

  const backdropClickHandler = () => {
    setShowBackdrop(false);
    setShowMobileNav(false);
    setError(null);
  };

  const logoutHandler = () => {
    setIsAuth(false);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
  };

  const setAutoLogout = (milliseconds: number) => {
    setTimeout(() => {
      logoutHandler();
    }, milliseconds);
  };

  const errorHandler = () => {
    setError(null);
  };

  const loginHandler = (/* event, authData */) => {
    // event.preventDefault();
    // this.setState({ authLoading: true });
    // fetch('URL')
    //   .then(res => {
    //     if (res.status === 422) {
    //       throw new Error('Validation failed.');
    //     }
    //     if (res.status !== 200 && res.status !== 201) {
    //       console.log('Error!');
    //       throw new Error('Could not authenticate you!');
    //     }
    //     return res.json();
    //   })
    //   .then(resData => {
    //     console.log(resData);
    //     this.setState({
    //       isAuth: true,
    //       token: resData.token,
    //       authLoading: false,
    //       userId: resData.userId
    //     });
    //     localStorage.setItem('token', resData.token);
    //     localStorage.setItem('userId', resData.userId);
    //     const remainingMilliseconds = 60 * 60 * 1000;
    //     const expiryDate = new Date(
    //       new Date().getTime() + remainingMilliseconds
    //     );
    //     localStorage.setItem('expiryDate', expiryDate.toISOString());
    //     this.setAutoLogout(remainingMilliseconds);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     this.setState({
    //       isAuth: false,
    //       authLoading: false,
    //       error: err
    //     });
    //   });
  };

  const signupHandler = (/* event, authData */) => {
    // event.preventDefault();
    // this.setState({ authLoading: true });
    // fetch('URL')
    //   .then(res => {
    //     if (res.status === 422) {
    //       throw new Error(
    //         "Validation failed. Make sure the email address isn't used yet!"
    //       );
    //     }
    //     if (res.status !== 200 && res.status !== 201) {
    //       console.log('Error!');
    //       throw new Error('Creating a user failed!');
    //     }
    //     return res.json();
    //   })
    //   .then(resData => {
    //     console.log(resData);
    //     this.setState({ isAuth: false, authLoading: false });
    //     this.props.history.replace('/');
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     this.setState({
    //       isAuth: false,
    //       authLoading: false,
    //       error: err
    //     });
    //   });
  }

  return (
    <Fragment>
      <ViteReact />
      {showBackdrop && (
        <Backdrop onClick={backdropClickHandler} />
      )}
      <ErrorHandler error={error} onHandle={errorHandler} />
      <Layout
        header={
          <Toolbar>
            <MainNavigation
              onOpenMobileNav={mobileNavHandler(true)}
              onLogout={logoutHandler}
              isAuth={isAuth}
            />
          </Toolbar>
        }
        mobileNav={
          <MobileNavigation
            open={showMobileNav}
            mobile
            onChooseItem={mobileNavHandler(false)}
            onLogout={logoutHandler}
            isAuth={isAuth}
          />
        }
      />
      {<AppRoutes isAuth={isAuth} />}
    </Fragment>
  );
};

export default App;
