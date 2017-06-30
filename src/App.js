import React, { Component } from 'react';
import ActivityLog from './ActivityLog';
import Menu from './Menu';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Menu />
        <ActivityLog />
      </div>
    );
  }
}

export default App;
