import { setLocalContent, setCurrentContent } from '../../redux/textEditor';
import { setLocalChars, setCurrentChars, setLocalWords, setCurrentWords,
  clearCharsToUpdate, clearCharsToDelete, clearWordsToUpdate,
  clearWordsToDelete } from '../../redux/items';

export function resetEditScreen() {
  return dispatch => {
    dispatch(setLocalContent(''));
    dispatch(setCurrentContent(''));
    dispatch(setLocalChars([]));
    dispatch(setCurrentChars([]));
    dispatch(setLocalWords([]));
    dispatch(setCurrentWords([]));
    dispatch(clearCharsToUpdate());
    dispatch(clearCharsToDelete());
    dispatch(clearWordsToUpdate());
    return dispatch(clearWordsToDelete());
  };
}
