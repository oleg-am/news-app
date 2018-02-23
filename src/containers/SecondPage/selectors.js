import { createSelector, createStructuredSelector } from 'reselect';

import REDUCER from './constants';

const filters = state => state[REDUCER].filters;
const data = state => state[REDUCER].data;

export default createStructuredSelector({
  filters,
  data: createSelector(filters, data, (filters, data) => ( // eslint-disable-line no-shadow
    data.filter(item => (
      Object.keys(filters).every(key => (
        !filters[key].length || filters[key].includes(item[key])
      ))
    ))
  )),
});
