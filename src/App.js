import React, { Component } from 'react';

import { Provider } from 'react-redux';
import store from './store';

import { Route } from 'react-router'
import { ConnectedRouter, push } from 'react-router-redux'
import { history } from './store';

import ActivityLog from './ActivityLog';
import Menu from './Menu';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Menu />
            <Route exact path="/" component={ActivityLog}/>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
