import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react';
import React from 'react';

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ onClick, children, className, ...rest }: ButtonProps) => {
  return (
    <button
      type={rest.type || 'button'}
      className={`btn font-normal px-4 py-3 ${className}`}
      onClick={onClick}
      style={{ minHeight: 'unset', height: 'auto' }}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
