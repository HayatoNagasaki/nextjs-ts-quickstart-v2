type Col4Props = {
  children: React.ReactNode;
  className?: string;
};

type Col8Props = {
  children: React.ReactNode;
  className?: string;
};

export const Col4: React.FC<Col4Props> = ({ children, className, ...rest }) => {
  return (
    <div className={`w-full md:w-[calc(100%*4/12)] ${className}`} {...rest}>
      {children}
    </div>
  );
};

export const Col8: React.FC<Col8Props> = ({ children, className, ...rest }) => {
  return (
    <div className={`w-full md:w-[calc(100%*8/12)] ${className}`} {...rest}>
      {children}
    </div>
  );
};
