import React from 'react';
import PropTypes from 'prop-types';
import Select from 'components/Select';

import './style.css';

const { array, arrayOf, objectOf, oneOf, oneOfType, shape, bool, number, string, func, node } = PropTypes;

export const propTypes = {
  placeholder: string,
  selectedValues: array,
  options: array,
  addFilters: func.isRequired,
  removeFilters: func.isRequired,
};

export const defaultProps = {

};

// eslint-disable-next-line react/prop-types
const Tag = ({ item, onRemove }) => (
  <span key={item} className="Tag">
    {item}
    <span
      role="button"
      tabIndex="0"
      onClick={onRemove}
      className="Tag__remove"
    >
      ×
    </span>
  </span>
);

const removeSelected = (arr, selected) => arr.filter(item => !selected.includes(item));

const FilterSelect = ({ placeholder, selectedValues, options, addFilters, removeFilters }) => {
  const availableOptions = removeSelected(options, selectedValues);

  return (
    <div className="FilterSelect">
      <Select
        disabled={!availableOptions.length}
        placeholder={placeholder}
        options={availableOptions}
        value=""
        onChange={addFilters}
      />
      <div className="FilterSelect_selectedValues">
        {selectedValues.map(item => (
          <Tag
            key={item}
            className="FilterSelect_selectedValues"
            item={item}
            onRemove={removeFilters(item)}
          />
        ))}
      </div>
    </div>
  );
};

FilterSelect.propTypes = propTypes;
FilterSelect.defaultProps = defaultProps;

export default FilterSelect;
