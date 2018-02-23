import * as types from './constants';

const apiKey = process.env.REACT_APP_API_KEY;

export const changeFilters = (key, value) => ({
  type: types.CHANGE_FILTERS, key, value,
});

export const resetAllFilters = () => ({
  type: types.RESET_ALL_FILTERS,
});

const url = `https://newsapi.org/v2/sources?apiKey=${apiKey}`;

export const load = () => ({
  types: [types.LOAD_REQUEST, types.LOAD_SUCCESS, types.LOAD_FAILURE],
  promise: api => api.get(url),
  localStorageKey: 'sources',
});
