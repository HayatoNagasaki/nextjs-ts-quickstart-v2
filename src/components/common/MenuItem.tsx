import type { ReactNode } from 'react';

type MenuItemProps = {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
};

const MenuItem: React.FC<MenuItemProps> = ({
  className,
  children,
  onClick,
  ...rest
}) => {
  return (
    <li className={`text-gray-800 ${className}`} onClick={onClick} {...rest}>
      <a style={{ color: 'inherit' }}>{children}</a>
    </li>
  );
};

export default MenuItem;
