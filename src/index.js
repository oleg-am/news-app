import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import 'font-awesome/css/font-awesome.css';
import 'font-awesome/fonts/FontAwesome.otf';

import configureStore from './redux/store';
import './index.css';
import App from './containers/App';

const history = createHistory();

// Let the reducers handle initial state
const initialState = {};
const store = configureStore(initialState, history);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
