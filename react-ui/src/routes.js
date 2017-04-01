import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { App, HomePage, MainScreen } from './containers';
import { SignupPage, LoginPage } from './components';

import requireAuth from './utils/requireAuth';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/app" component={requireAuth(MainScreen)} />
    <Route path="/signup" component={SignupPage} />
    <Route path="/login" component={LoginPage} />
  </Route>
);
