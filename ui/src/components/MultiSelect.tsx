import React from 'react';
import { Select } from 'antd';
import '../assets/css/MultiSelect.css';

const { Option } = Select;

const MultiSelect: React.FC<{
  options: { value: string; label: string }[];
  handleChange: (value: string[]) => void;
}> = ({ options, handleChange }) => (
  <>
    <Select
      className="min-w-[300px]"
      mode="multiple"
      allowClear
      placeholder="Please select"
      onChange={handleChange}
    >
      {options.map((option) => (
        <Option key={option.value}>{option.label}</Option>
      ))}
    </Select>
  </>
);

export default MultiSelect;
