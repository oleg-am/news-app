import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import NoMatch from 'components/NoMatch';

import FirstPage from 'containers/FirstPage';
import SecondPage from 'containers/SecondPage';

export default class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={FirstPage} />
          <Route exact path="/:idSource" component={SecondPage} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}
