import React, { FC, memo } from "react";

interface Props {
  label: string;
  className?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  disabled?: boolean;
  errorMsg?: string;
  [key: string]: any;
}

const FormTextInput: FC<Props> = ({
  label,
  className = "",
  value,
  maxLength,
  disabled = false,
  errorMsg = null,
  ...props
}) => {
  return (
    <div>
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
              type="text"
              value={value}
              maxLength={maxLength}
              disabled={disabled}
              className={`${
                disabled ? "cursor-not-allowed" : ""
              } outline-none ${className}`}
              {...props}
            />
            {maxLength && (
              <div className="pl-1">
                {value ? value?.length : 0}/{maxLength}
              </div>
            )}
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

export default memo(FormTextInput);
