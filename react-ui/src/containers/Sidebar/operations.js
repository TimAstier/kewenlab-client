import { setLocalContent, setCurrentContent } from '../../redux/textEditor';
import { setLocalChars, setCurrentChars, setLocalWords, setCurrentWords,
  clearCharsToUpdate, clearCharsToDelete, clearWordsToUpdate,
  clearWordsToDelete } from '../../redux/items';
import { setCurrentTextId } from '../../redux/sidebar';

export function resetEditScreen() {
  return dispatch => {
    dispatch(setCurrentTextId({ id: 0 }));
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
