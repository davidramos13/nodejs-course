import React from 'react';
import tw, { styled } from 'twin.macro';
import NavigationItems from './NavigationItems';

const NavMobile = styled.nav<{ open: boolean }>(({ open }) => [
  tw`fixed top-0 left-0 h-screen w-96 px-8 py-12 z-20`,
  tw`bg-white shadow-x1 transition-transform -translate-x-full`,
  open && tw`translate-x-0`
]);

const UlItems = styled.ul<{ mobile: boolean }>(({ mobile }) => [
  tw`list-none flex m-0 p-0`,
  mobile && tw`flex-col`
]);

type Props = { open: boolean; mobile?: boolean; isAuth: boolean;
  onChooseItem(): void; onLogout(): void };
const MobileNavigation: React.FC<Props> = props => {
  const { open, mobile = false, onChooseItem, isAuth, onLogout } = props;

  return (
    <NavMobile open={open}>
      <UlItems mobile={mobile}>
        <NavigationItems
          mobile
          onChoose={onChooseItem}
          isAuth={isAuth}
          onLogout={onLogout}
        />
      </UlItems>
    </NavMobile>
  );
};

export default MobileNavigation;
