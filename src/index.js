import './styles/core.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import withScroll from 'scroll-behavior';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import {IndexRoute, Route, useRouterHistory} from 'react-router';
import createHashHistory from 'history/lib/createHashHistory';
import {syncHistoryWithStore, routerMiddleware} from 'react-router-redux';
import {loadSettings} from './actions';
import reducers from './reducers';
import routes from './routes';
import ReactStormpath, { Router } from 'react-stormpath';
import LoginView from './routes/Login'
const initialState = {};
const appHistory = withScroll(
  useRouterHistory(createHashHistory)({queryKey: false})
);
const router = routerMiddleware(appHistory);
const store = createStore(reducers, initialState, compose(
  applyMiddleware(thunk, router),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

const history = syncHistoryWithStore(appHistory, store);
store.dispatch(loadSettings());

ReactStormpath.init();

ReactDOM.render(
  <Provider store={store}>
      <Router history={history} >
          <HomeRoute path='/' component={LoginView}>

          </HomeRoute>
      </Router>
  </Provider>
  , document.getElementById('root'));
