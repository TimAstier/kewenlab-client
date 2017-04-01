import { combineReducers } from 'redux-immutable';

import routing from './redux/routing';
import sidebar from './redux/sidebar';
import textEditor from './redux/textEditor';
import mode from './redux/mode';
import suggestions from './redux/suggestions';
import suggestionInput from './redux/suggestionInput';
import flashMessages from './redux/flashMessages';
import auth from './redux/auth';

import createItemsReducerWithNamedType from './redux.items';

const chars = createItemsReducerWithNamedType('CHARS');
const words = createItemsReducerWithNamedType('WORDS');

export default combineReducers({
  sidebar,
  textEditor,
  mode,
  suggestions,
  suggestionInput,
  routing,
  chars,
  words,
  flashMessages,
  auth,
});
