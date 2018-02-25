import { combineReducers } from 'redux';
import * as types from './constants';

export const initialState = {
  filters: {
    category: [],
    country: [],
    language: [],
  },
  pagination: {
    limit: 6,
    page: 1,
  },
  data: [],
};

export default combineReducers({
  filters(state = initialState.filters, action) {
    switch (action.type) {
      case types.CHANGE_FILTERS:
        return {
          ...state,
          [action.key]: action.value,
        };
      case types.RESET_ALL_FILTERS:
        return initialState.filters;
      default:
        return state;
    }
  },
  pagination(state = initialState.pagination, action) {
    switch (action.type) {
      case types.CHANGE_PAGINAGION:
        return {
          ...state,
          [action.key]: action.value,
        };
      case types.CHANGE_FILTERS:
      case types.RESET_ALL_FILTERS:
        return initialState.pagination;
      default:
        return state;
    }
  },
  data(state = initialState.data, action) {
    switch (action.type) {
      case types.LOAD_SUCCESS:
        return action.result.sources;
      default:
        return state;
    }
  },
});
