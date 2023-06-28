import type { ReactNode } from 'react';
import { useState } from 'react';

type MenuProps = {
  anchorEl: ReactNode;
  children: ReactNode;
  className?: string;
};

const Menu: React.FC<MenuProps> = ({
  anchorEl,
  children,
  className,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`flex items-center dropdown dropdown-bottom dropdown-end ${className}`}
    >
      <div className="flex items-center" tabIndex={0} onClick={handleToggle}>
        {anchorEl}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        {children}
      </ul>
    </div>
  );
};

export default Menu;
