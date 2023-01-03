import React, { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

type Props = {
  link?: string; design?: string; mode: string; type?: 'button' | 'submit';
  onClick?(): void; disabled?: boolean; loading?: boolean;
};
const Button: React.FC<PropsWithChildren<Props>> = props => {
  const { link, design, mode, children, onClick, loading = false,
    disabled = false, type = 'button' } = props;

  if (link) {
    return (
      <Link
        className={["button", `button--${design}`, `button--${mode}`].join(" ")}
        to={link}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={[
        'button',
        `button--${design}`,
        `button--${mode}`
      ].join(' ')}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
};

export default Button;
