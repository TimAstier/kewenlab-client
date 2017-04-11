import { deserializeChars, deserializeWords } from '../../utils/deserializer';
import { getCurrentText, setCurrentTextId } from '../../redux/sidebar';
import { setCurrentContent, setLocalContent } from '../../redux/textEditor';
import { setCurrentChars, setLocalChars,
  clearCharsToDelete, clearCharsToUpdate, setCurrentWords, setLocalWords,
  clearWordsToDelete, clearWordsToUpdate } from '../../redux/items';
import { clearSuggestions } from '../../redux/suggestions';
import { showFlashMessageWithTimeout } from '../../redux/flashMessages';
import checkNetwork from '../../helpers/checkNetwork';

export function handleItemClick(e, { data }) {
  return dispatch => {
    return dispatch(getCurrentText(data[0], data[1]))
      .then(
        res => {
          const text = res[0].data.text;
          const chars = deserializeChars(res[1].data.chars);
          const words = deserializeWords(res[2].data.words);
          dispatch(setCurrentTextId(text));
          dispatch(setLocalContent(text.content));
          dispatch(setCurrentContent(text.content));
          dispatch(setLocalChars(chars));
          dispatch(setCurrentChars(chars));
          dispatch(clearCharsToDelete());
          dispatch(clearCharsToUpdate());
          dispatch(setLocalWords(words));
          dispatch(setCurrentWords(words));
          dispatch(clearWordsToDelete());
          dispatch(clearWordsToUpdate());
          return dispatch(clearSuggestions());
        },
        err => {
          const type = 'error';
          const text = checkNetwork(err);
          dispatch(showFlashMessageWithTimeout({ type, text }));
        }
      );
  };
}
