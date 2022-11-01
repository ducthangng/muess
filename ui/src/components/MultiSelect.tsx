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
      mode="multiple"
      allowClear
      style={{
        width: '313px',
        height: '33px',
        overflow: 'auto',
        position: 'relative',
        top: '25px',
        left: '147px'
      }}
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
