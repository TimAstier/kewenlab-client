import { combineReducers } from 'redux';

import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth';
import textItems from './reducers/textItems';

export default combineReducers({
  flashMessages,
  auth,
  textItems
});
