import React from 'react';

type Props = { onOpen(): void; };
const MobileToggle: React.FC<Props> = ({ onOpen }) => (
  <button className="mobile-toggle" onClick={onOpen}>
    <span className="mobile-toggle__bar" />
    <span className="mobile-toggle__bar" />
    <span className="mobile-toggle__bar" />
  </button>
);

export default MobileToggle;
