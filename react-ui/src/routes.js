import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HomePage from './components/HomePage';
import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/login/LoginPage';
import MainScreen from './appscreens/MainScreen';

import requireAuth from './utils/requireAuth';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/edit" component={requireAuth(() => <MainScreen mode="edit" />)} />
    <Route path="/suggestion" component={requireAuth(() => <MainScreen mode="suggestion" />)} />
    <Route path="/signup" component={SignupPage} />
    <Route path="/login" component={LoginPage} />
  </Route>
);
