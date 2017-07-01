import React, { Component } from 'react';
import styled from 'styled-components';
import { injectGlobal } from 'styled-components';

import { Provider } from 'react-redux';
import store from './store';

import { Route } from 'react-router'
import { ConnectedRouter, push } from 'react-router-redux'
import { history } from './store';

import Menu from './Menu';
import ActivityLog from './ActivityLog';
import Members from './Members';
import Me from './Me';

const Wrapper = styled.section`
  background: #fff;
  margin: auto;
  max-width: 425px;
  outline: 1px solid #aaa;
`;

injectGlobal`
  body {
    background: #eee;
  }
`;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Wrapper>
            <Menu />
            <Route exact path="/" component={ActivityLog}/>
            <Route exact path="/members" component={Members}/>
            <Route exact path="/me" component={Me}/>
          </Wrapper>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
