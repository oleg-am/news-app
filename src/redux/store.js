import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
// import createSagaMiddleware from 'redux-saga'
import axios from 'axios';
import apiMiddleware from './middlewares/apiMiddleware';
import reducers from './reducers';

const logger = createLogger({
  collapsed: true,
});
// const sagaMiddleware = createSagaMiddleware()

export default function configureStore(initialState = {}, history) {
  // Create the store with two middlewares
  const middlewares = [
    routerMiddleware(history),
    apiMiddleware(axios),
    // sagaMiddleware,
    logger,
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  const store = createStore(
    reducers,
    initialState,
    compose(...enhancers),
  );

  // Extensions
  // store.runSaga = sagaMiddleware.run
  store.asyncReducers = {}; // Async reducer registry

  return store;
}
