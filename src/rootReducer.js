import { combineReducers } from 'redux';

import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth';
import texts, * as fromTexts from './reducers/texts';

// TODO: Use Immutable.js in reducers
export default combineReducers({
  flashMessages,
  auth,
  texts
});

// TODO: Use Reselect library
export const getSaved = (state) => {
  return fromTexts.getSaved(state.texts);
}
