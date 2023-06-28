import React from 'react';

const Textarea: React.FC<any> = ({
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
      <textarea
        className={`textarea textarea-bordered !outline-offset-0 h-24 ${className}`}
        {...rest}
      ></textarea>
      <label className="label py-1">
        <span className="label-text-alt">{labelBottomLeft}</span>
        <span className="label-text-alt">{labelBottomRight}</span>
      </label>
    </div>
  );
};

export default Textarea;
