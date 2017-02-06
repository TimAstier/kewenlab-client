import { combineReducers } from 'redux-immutable';
import routerReducer from './routerReducer';

import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth';
import textEditor from './textEditor';
import sidebar from './sidebar';
import charsArea from './charsArea';
import wordsArea from './wordsArea';

// TODO: Use Immutable.js in reducers
export default combineReducers({
  flashMessages,
  auth,
  [textEditor.constants.NAME]: textEditor.reducer,
  [sidebar.constants.NAME]: sidebar.reducer,
  [charsArea.constants.NAME]: charsArea.reducer,
  [wordsArea.constants.NAME]: wordsArea.reducer,
  routing: routerReducer
});
