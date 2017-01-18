import { combineReducers } from 'redux';

import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth';
import texts from './reducers/texts';

export default combineReducers({
  flashMessages,
  auth,
  texts
});
