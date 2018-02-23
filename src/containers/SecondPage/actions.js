import * as types from './constants';

const apiKey = process.env.REACT_APP_API_KEY;

export const changeFilters = (key, value) => ({
  type: types.CHANGE_FILTERS, key, value,
});

const getUrl = idSource => `https://newsapi.org/v2/top-headlines?sources=${idSource}&apiKey=${apiKey}`;

export const load = idSource => ({
  types: [types.LOAD_REQUEST, types.LOAD_SUCCESS, types.LOAD_FAILURE],
  promise: api => api.get(getUrl(idSource)),
  localStorageKey: idSource,
});
