import React, { FC } from "react";

interface Props {
  label: string;
  className?: string;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  errorMsg?: string;
  [key: string]: any;
}

const FormNumberInput: FC<Props> = ({
  label,
  className = "",
  value,
  disabled = false,
  errorMsg = null,
  ...props
}) => {
  return (
    <div className="my-8 w-[50%]">
      <label className={`relative ${disabled ? "cursor-not-allowed" : ""}`}>
        <div className="pb-2 font-semibold text-[18px] text-[#333]">
          {label}
        </div>
        <div
          className={`border rounded-xl py-2 px-4 ${
            disabled ? "cursor-not-allowed" : ""
          } ${errorMsg ? "border-red-500" : ""} `}
        >
          <div className="flex flex-row items-center justify-between">
            <input
              type="number"
              value={value}
              disabled={disabled}
              className={`${
                disabled ? "cursor-not-allowed" : ""
              } outline-none ${className}`}
              {...props}
            />
            {errorMsg && (
              <div className="text-red-500 text-xs absolute top-[8px] right-[8px]">
                {errorMsg}
              </div>
            )}
          </div>
        </div>
      </label>
    </div>
  );
};

export default FormNumberInput;
