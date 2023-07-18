import React, { FC, useEffect, useState } from "react";

interface Props {
  label: string;
  options: { value: string; label: string }[];
  checkedValues: string[];
  onChange: (checkedValues: string[]) => void;
  otherOption?: boolean;
}

const FormCheckbox: FC<Props> = ({
  label,
  options,
  checkedValues,
  onChange,
  otherOption = false,
}) => {
  const [otherValue, setOtherValue] = useState<string | null>(null);
  const [otherChecked, setOtherChecked] = useState(false);

  useEffect(() => {
    setOtherValue(
      checkedValues.filter((value) => {
        return options.every((option) => option.value !== value);
      })[0]
    );
  }, [checkedValues]);

  useEffect(() => {
    if (otherValue && options.every((option) => option.value !== otherValue)) {
      onChange([
        ...checkedValues.filter((value) => {
          // return !options.every((option) => option.value !== value);
          // remove all from checkedValues that are not in options
          return options.some(({ value: optionValue }) => optionValue === value)
        }),
        // add the otherValue to checkedValues
        otherValue,
      ]);
    }
  }, [otherValue]);

  useEffect(() => {
    if (!otherChecked) {
      onChange(
        checkedValues.filter((value) => {
          return !options.every((option) => option.value !== value);
        })
      );
    }

    if (otherChecked && !otherValue) {
      onChange([...checkedValues]);
    }

  }, [otherChecked]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    let newCheckedValues = [...checkedValues];

    if (checked) {
      // add the checked value to the array
      newCheckedValues.push(value);
    } else {
      // removes the unchecked value from the array
      newCheckedValues = newCheckedValues.filter((v) => v !== value);
    }
    onChange(newCheckedValues);
  };

  const handleOtherCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { checked } = e.target;
    setOtherChecked(checked);
    if (!checked) {
      setOtherValue(null);
    }
  };

  const handleOtherInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherValue(e.target.value);
  };

  return (
    <div>
      <p className="mb-[1.3rem] border-b-[1px] border-b-[#B4B4B4] text-[18px]">{label}</p>
      {options.map((option) => (
        <div key={option.value} className="mb-2">
          <label>
            <input
              type="checkbox"
              value={option.value}
              checked={checkedValues.includes(option.value)}
              onChange={handleCheckboxChange}
            />
            <span className="ml-2">{option.label}</span>
          </label>
        </div>
      ))}
      {otherOption && (
        <div>
          <input
            type="checkbox"
            // id="other"
            value={otherValue || ""}
            onChange={handleOtherCheckboxChange}
            checked={otherChecked}
          />
          <label htmlFor="other" className="ml-2">
            Other:
          </label>
          <input
            type="text"
            value={otherValue || ""}
            onChange={handleOtherInputChange}
            disabled={!otherChecked}
            className="border rounded-xl py-1 px-4 outline-none font-semibold text-[#333] ml-2"
          />
        </div>
      )}
    </div>
  );
};

export default FormCheckbox;
