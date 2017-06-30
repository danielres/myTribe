import { createStore, applyMiddleware } from 'redux';
import { leanReducer } from 'lean-redux';

const store = createStore(
  leanReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
