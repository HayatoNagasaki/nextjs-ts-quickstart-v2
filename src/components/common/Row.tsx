type RowProps = {
  children: React.ReactNode;
  className?: string;
};

const Row: React.FC<RowProps> = ({ children, className, ...rest }) => {
  return (
    <div className={`flex flex-wrap ${className}`} {...rest}>
      {children}
    </div>
  );
};

export default Row;
