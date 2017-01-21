import { combineReducers } from 'redux';

import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth';
import texts from './reducers/texts';
import textEditor from './textEditor';
import sidebar from './sidebar'

import * as fromTextEditor from './textEditor/reducer';

// TODO: Use Immutable.js in reducers
export default combineReducers({
  flashMessages,
  auth,
  texts,
  [textEditor.constants.NAME]: textEditor.reducer,
  [sidebar.constants.NAME]: sidebar.reducer
});

// TODO: Use Reselect library
export const getSaved = (state) => {
  return fromTextEditor.getSaved(state.textEditor);
}
