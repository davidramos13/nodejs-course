import React, { PropsWithChildren } from "react";
import { CssButton, CssButtonProps, CssLink } from "./Button.styled";

type Props = CssButtonProps & {
  link?: string;
  type?: 'button' | 'submit';
  onClick?(): void;
  disabled?: boolean;
  loading?: boolean;
};
const Button: React.FC<PropsWithChildren<Props>> = props => {
  const { link, design, mode, children, onClick, loading = false,
    disabled = false, type = 'button' } = props;

  if (link) {
    return (
      <CssLink design={design} mode={mode} to={link}>
        {children}
      </CssLink>
    );
  }

  return (
    <CssButton design={design}
      mode={mode}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
    >
      {loading ? 'Loading...' : children}
    </CssButton>
  );
};

export default Button;
