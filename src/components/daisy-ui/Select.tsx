import React from 'react';

type Option = {
  value: string;
  label: string;
};

const Select: React.FC<any> = ({
  className,
  options,
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
      <select
        className={`select select-bordered !outline-offset-0 ${className}`}
        {...rest}
      >
        {options.map((option: Option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label className="label py-1">
        <span className="label-text-alt">{labelBottomLeft}</span>
        <span className="label-text-alt">{labelBottomRight}</span>
      </label>
    </div>
  );
};

export default Select;
