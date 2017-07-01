import React, { Component } from 'react';

import { Provider } from 'react-redux';
import store from './store';

import { Route } from 'react-router'
import { ConnectedRouter, push } from 'react-router-redux'
import { history } from './store';

import Menu from './Menu';
import ActivityLog from './ActivityLog';
import Me from './Me';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Menu />
            <Route exact path="/" component={ActivityLog}/>
            <Route exact path="/me" component={Me}/>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
