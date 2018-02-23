import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const { arrayOf, bool, string, func } = PropTypes;

export const propTypes = {
  value: string.isRequired,
  options: arrayOf(string).isRequired,
  placeholder: string,
  onChange: func.isRequired,
  disabled: bool,
};

export const defaultProps = {
  placeholder: '',
  disabled: false,
};

const Select = ({ value, options, onChange, placeholder, disabled }) => (
  <select className="Select" value={value} onChange={onChange} disabled={disabled} >
    {placeholder && <option key="default" value="default">{placeholder}</option>}
    {options.map(item => (
      <option key={item} value={item}>{item}</option>
    ))}
  </select>
);

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

export default Select;
