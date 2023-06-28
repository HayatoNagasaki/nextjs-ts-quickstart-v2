import React from 'react';

const TextField: React.FC<any> = ({
  className,
  label,
  labelTopRight,
  labelBottomLeft,
  labelBottomRight,
  ...rest
}) => {
  return (
    <div className="form-control">
      <label className="label py-1">
        <span className="label-text">{label}</span>
        <span className="label-text-alt">{labelTopRight}</span>
      </label>
      <input
        className={`input input-bordered !outline-offset-0 ${className}`}
        {...rest}
      />
      <label className="label py-1">
        <span className="label-text-alt">{labelBottomLeft}</span>
        <span className="label-text-alt">{labelBottomRight}</span>
      </label>
    </div>
  );
};

export default TextField;
