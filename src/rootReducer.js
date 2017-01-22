import { combineReducers } from 'redux';

import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth';
import textEditor from './textEditor';
import sidebar from './sidebar';
import charsArea from './charsArea';
import wordsArea from './wordsArea';

import * as fromTextEditor from './textEditor/reducer';

// TODO: Use Immutable.js in reducers
export default combineReducers({
  flashMessages,
  auth,
  [textEditor.constants.NAME]: textEditor.reducer,
  [sidebar.constants.NAME]: sidebar.reducer,
  [charsArea.constants.NAME]: charsArea.reducer,
  [wordsArea.constants.NAME]: wordsArea.reducer
});

// TODO: Use Reselect library
export const getSaved = (state) => {
  return fromTextEditor.getSaved(state.textEditor);
}
