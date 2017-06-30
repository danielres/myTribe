import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';

import ActivityLog from './ActivityLog';
import Menu from './Menu';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Menu />
          <ActivityLog />
        </div>
      </Provider>
    );
  }
}

export default App;
