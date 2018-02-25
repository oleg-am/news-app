import { createSelector, createStructuredSelector } from 'reselect';

import REDUCER from './constants';

const filters = state => state[REDUCER].filters;
const data = state => state[REDUCER].data;
const pagination = state => state[REDUCER].pagination;

// eslint-disable-next-line no-shadow
const filteredData = createSelector(data, filters, (list, filters) => (
  list.filter(item => (
    Object.keys(filters).every(key => (
      !filters[key].length || filters[key].includes(item[key])
    ))
  ))
));

// eslint-disable-next-line no-shadow
const dataWithPagination = createSelector(filteredData, pagination, (list, { limit, page }) => {
  const start = (page - 1) * limit;
  const end = start + limit;

  return list.slice(start, end);
});

// eslint-disable-next-line no-shadow
const paginationWithPageCount = createSelector(filteredData, pagination, (list, pagination) => {
  const length = list.length; // eslint-disable-line prefer-destructuring

  return {
    ...pagination,
    pageCount: length ? Math.ceil(length / pagination.limit) : 1,
  };
});

export default createStructuredSelector({
  filters,
  pagination: paginationWithPageCount,
  data: dataWithPagination,
});
