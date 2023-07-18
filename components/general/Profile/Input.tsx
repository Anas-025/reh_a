import React, { FC } from "react";

interface InputProps {
  type: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  value: any;
  className?: string;
  [key: string]: any;
}

const Input: FC<InputProps> = ({
  type,
  onChange,
  name,
  value,
  className,
  ...props
}) => {
  return (
    <input
      type={type}
      onChange={onChange}
      name={name}
      value={value}
      className={`px-4 py-2 border-[1px] w-full md:min-w-[150px] max-w-[200px] md:max-w-[300px] border-gray-300 hover:border-gray-600 text-[#000] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent ${className}`}
      {...props}
    />
  );
};

export default Input;
