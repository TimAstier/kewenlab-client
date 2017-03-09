import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import SignupPage from './components/signup/SignupPage';
import Greetings from './components/Greetings';
import LoginPage from './components/login/LoginPage';
import EditScreen from './editScreen/EditScreen';
import SuggestionScreen from './suggestionScreen/SuggestionScreen';

import requireAuth from './utils/requireAuth';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Greetings} />
    <Route path="/edit" component={requireAuth(EditScreen)} />
    <Route path="/suggestion" component={requireAuth(SuggestionScreen)} />
    <Route path="/signup" component={SignupPage} />
    <Route path="/login" component={LoginPage} />
  </Route>
);
