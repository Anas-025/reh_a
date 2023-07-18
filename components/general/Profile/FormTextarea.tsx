import React, { FC } from "react";

interface Props {
  label: string;
  className?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  maxLength?: number;
  isRequierd?: boolean;
  [key: string]: any;
}

const FormTextarea: FC<Props> = ({
  label,
  value,
  onChange,
  maxLength,
  isRequired,
  ...props
}) => {
  return (
    <div className="relative">
      <label>
        <div className="mb-[1.3rem] border-b-[1px] border-b-[#B4B4B4] text-[18px] relative">
          {label}
          {isRequired && <span className="text-red-500 ml-1">*</span>}
        </div>
        <div className="w-full sm:max-w-[400px]">
          <div className="flex flex-row items-center justify-between relative">
            <textarea
              className={`w-full p-4 rounded-[10px] resize-none border-[1px] border-[#B4B4B4] outline-[#B4B4B4]`}
              value={value}
              maxLength={maxLength}
              required={isRequired}
              onChange={onChange}
              rows={4}
              {...props}
            />
            {maxLength && (
              <div className="absolute bottom-0 right-0">
                {value ? value?.length : 0}/{maxLength}
              </div>
            )}
          </div>
        </div>
      </label>
    </div>
  );
};

export default FormTextarea;
