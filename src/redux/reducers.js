import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import FirstPage from 'containers/FirstPage/reducer';
import FIRST_PAGE_REDUCER_NAME from 'containers/FirstPage/constants';
import SecondPage from 'containers/SecondPage/reducer';
import SECOND_PAGE_REDUCER_NAME from 'containers/SecondPage/constants';

export default combineReducers({
  routing: routerReducer,
  [FIRST_PAGE_REDUCER_NAME]: FirstPage,
  [SECOND_PAGE_REDUCER_NAME]: SecondPage,
});
