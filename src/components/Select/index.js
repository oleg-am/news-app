import React from 'react';
import PropTypes from 'prop-types';
import { withProps } from 'recompose';
import './style.css';

const { arrayOf, bool, string, number, func, oneOf, oneOfType } = PropTypes;

const stringOrNumberType = oneOfType([string, number]);

export const propTypes = {
  value: stringOrNumberType.isRequired,
  options: arrayOf(stringOrNumberType).isRequired,
  placeholder: string,
  onChange: func.isRequired,
  disabled: bool,
  size: oneOf(['small', '']),
};

export const defaultProps = {
  placeholder: '',
  disabled: false,
  size: '',
};

const Select = ({ value, options, onChange, placeholder, disabled, size }) => (
  <select
    className={`Select form-control ${size}`}
    value={value}
    onChange={onChange}
    disabled={disabled}
  >
    {placeholder && <option key="default" value="default">{placeholder}</option>}
    {options.map(item => (
      <option key={item} value={item}>{item}</option>
    ))}
  </select>
);

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

const PAGINATION_LIMIT_OPTIONS = [2, 6, 12, 24, 50, 100];

export const LimitSelect = withProps({
  options: PAGINATION_LIMIT_OPTIONS,
  size: 'small',
})(Select);

export default Select;
