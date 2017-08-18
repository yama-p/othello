import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import './index.css';
import Game from './containers/index'
import reducers from './reducers'

// const RootReducer = combineReducers({reducers});

const store = createStore(reducers);

ReactDOM.render(
  <Provider store={ store }>
    <Game />
  </Provider>,
  document.getElementById('root')
);
