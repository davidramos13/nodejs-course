import React, { Fragment } from "react";
import { NavLink } from 'react-router-dom';

const navItems = [
  { id: "feed", text: "Feed", link: "/", auth: true },
  { id: "login", text: "Login", link: "/", auth: false },
  { id: "signup", text: "Signup", link: "/signup", auth: false },
];

type Props = { isAuth: boolean; mobile?: boolean; onChoose?(): void; onLogout(): void };
const NavigationItems: React.FC<Props> = (props) => {
  const { isAuth, mobile = false, onChoose, onLogout } = props;
  return (
    <Fragment>
      {navItems
        .filter((item) => item.auth === isAuth)
        .map((item) => (
          <li
            key={item.id}
            className={["navigation-item", mobile ? "mobile" : ""].join(
              " "
            )}
          >
            <NavLink to={item.link} onClick={onChoose}>
              {item.text}
            </NavLink>
          </li>
        )
      )}
      {isAuth && (
        <li className="navigation-item" key="logout">
          <button onClick={onLogout}>Logout</button>
        </li>
      )}
    </Fragment>
  );
};

export default NavigationItems;
