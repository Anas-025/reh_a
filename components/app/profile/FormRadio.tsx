import React, { FC } from "react";

interface Props {
  label: string;
  options: { value: string; label: string }[];
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checkedValue: string;
}

const FormRadio: FC<Props> = ({
  label,
  options,
  name,
  onChange,
  checkedValue,
}) => {
  return (
    <div>
      <p className="pb-2 font-semibold text-[18px] text-[#333]">{label}</p>
      {options.map((option) => (
        <div key={option.value} className="mb-2">
          <label>
            <input
              type="radio"
              value={option.value}
              name={name}
              onChange={onChange}
              checked={option.value === checkedValue}
            />
            <span className="ml-2">{option.label}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default FormRadio;
