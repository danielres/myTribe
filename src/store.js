import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { leanReducer } from 'lean-redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';

import createHistory from 'history/createBrowserHistory'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const history = createHistory();
const middleware = routerMiddleware(history);

const store = createStore(
  leanReducer,
  combineReducers({
    router: routerReducer,
  }),
  composeEnhancers(applyMiddleware(middleware)),
)

export default store;
export { history };
