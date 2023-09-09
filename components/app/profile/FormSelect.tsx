import React, { FC } from 'react'

interface Props {
    label: string
    options: { value: string; label: string }[]
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const FormSelect: FC<Props> = ({ label, options, onChange }) => {
  return (
    <div className='mb-8'>
        <label htmlFor="select" className='font-semibold text-[18px] text-[#333]'>{label}</label>
        <select id="select" onChange={onChange} className="outline-none">
        {options.map((option) => (
            <option key={option.value} value={option.value}>
            {option.label}
            </option>
        ))}
        </select>
    </div>
  )
}

export default FormSelect