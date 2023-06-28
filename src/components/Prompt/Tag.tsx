type TagProps = {
  className?: string;
  children: string;
};

const Tag: React.FC<TagProps> = ({ className, children, ...rest }) => {
  return (
    <span
      className={`px-2 py-1 mr-2 text-xs text-white bg-blue-500 rounded ${className}`}
      {...rest}
    >
      {children}
    </span>
  );
};

export default Tag;
