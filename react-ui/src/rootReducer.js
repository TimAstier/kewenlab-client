import { combineReducers } from 'redux-immutable';
import routerReducer from './routerReducer';

import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth';
import textEditor from './textEditor';
import sidebar from './sidebar';
import charsArea from './charsArea';
import wordsArea from './wordsArea';
import suggestionInput from './suggestionInput';
import suggestionScreen from './appscreens/suggestionScreen';

import createItemsReducerWithNamedType from './common/items/reducer';

const charsReducer = createItemsReducerWithNamedType('CHARS');
const wordsReducer = createItemsReducerWithNamedType('WORDS');

export default combineReducers({
  flashMessages,
  auth,
  [textEditor.constants.NAME]: textEditor.reducer,
  [sidebar.constants.NAME]: sidebar.reducer,
  [charsArea.constants.NAME]: charsReducer,
  [wordsArea.constants.NAME]: wordsReducer,
  [suggestionInput.constants.NAME]: suggestionInput.reducer,
  [suggestionScreen.constants.NAME]: suggestionScreen.reducer,
  routing: routerReducer
});
