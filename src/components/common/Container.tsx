import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div
      className={`max-w-4xl mx-auto py-4 px-4 md:px-8 mt-4 ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Container;
