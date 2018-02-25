import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import './style.css';

const { number, string, func } = PropTypes;
export const propTypes = {
  className: string,
  value: number,
  pageCount: number.isRequired,
  onChange: func.isRequired,
};

export const defaultProps = {
  className: '',
  value: 1,
};

const Pagination = ({ className, value, pageCount, onChange }) => {
  const onPageChange = ({ selected }) => {
    onChange && onChange(selected + 1);
  };

  return (
    <div className={`Pagination ${className}`}>
      <ReactPaginate
        initialPage={value - 1}
        forcePage={value - 1}
        pageCount={pageCount}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        breakLabel={<span>...</span>}
        breakClassName="break"
        onPageChange={onPageChange}
        containerClassName="pagination"
        subContainerClassName="pages pagination"
        activeClassName="active"
        disableInitialCallback
      />
    </div>
  );
};


Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;

export default Pagination;
