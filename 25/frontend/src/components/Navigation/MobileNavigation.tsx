import React from 'react';
import NavigationItems from './NavigationItems';

type Props = { open: boolean; mobile?: boolean; isAuth: boolean;
  onChooseItem(): void; onLogout(): void };
const MobileNavigation: React.FC<Props> = props => {
  const { open, mobile = false, onChooseItem, isAuth, onLogout } = props;

  return (
    <nav className={['mobile-nav', open ? 'open' : ''].join(' ')}>
      <ul
        className={['mobile-nav__items', mobile ? 'mobile' : ''].join(' ')}
      >
        <NavigationItems
          mobile
          onChoose={onChooseItem}
          isAuth={isAuth}
          onLogout={onLogout}
        />
      </ul>
    </nav>
  );
};

export default MobileNavigation;
