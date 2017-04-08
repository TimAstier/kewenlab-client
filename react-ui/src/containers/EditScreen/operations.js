import { showFlashMessageWithTimeout } from '../../redux/flashMessages';
import { removeDuplicates, preTokenization, removeDolars }
  from '../../utils/custom';
import { tokenize, refreshWords } from '../../redux/items';
import { deserializeChars, deserializeWords } from '../../utils/deserializer';
import { saveChars, saveCharsSuccess, saveCharsFailure,
  saveWords, saveWordsSuccess, saveWordsFailure } from '../../redux/items';
import { saveTextContent, saveTextContentSuccess, saveTextContentFailure }
  from '../../redux/textEditor';

export function tokenizeWords(localContent) {
  return dispatch => {
    // TODO: Use serializers to define which attributes to send in payload
    const data = {
      content: preTokenization(localContent)
    };
    return dispatch(tokenize(data)).then(
      (res) => {
        let newLocalWords = res.data;
        newLocalWords = removeDolars(removeDuplicates(newLocalWords));
        dispatch(refreshWords(newLocalWords));
        return false;
      },
      () => {
        dispatch(showFlashMessageWithTimeout({
          type: 'error',
          text: 'Error: could not tokenize text from the server.'
        }));
      }
    );
  };
}

export function saveCharsArea(data) {
  return dispatch => {
    // TODO: Use serializers to define which attributes to send in payload
    return dispatch(saveChars(data)).then(
      (res) => {
        dispatch(saveCharsSuccess(deserializeChars(res.data)));
      },
      () => {
        dispatch(saveCharsFailure());
        dispatch(showFlashMessageWithTimeout({
          type: 'error',
          text: 'Error: could not save chars on the server.'
        }));
      }
    );
  };
}

export function saveWordsArea(data) {
  return dispatch => {
    // TODO: Use serializers to define which attributes to send in payload
    return dispatch(saveWords(data)).then(
      (res) => {
        dispatch(saveWordsSuccess(deserializeWords(res.data)));
      },
      () => {
        dispatch(saveWordsFailure());
        dispatch(showFlashMessageWithTimeout({
          type: 'error',
          text: 'Error: could not save words on the server.'
        }));
      }
    );
  };
}

export function saveTextEditor(data) {
  return dispatch => {
    // TODO: Use serializers to define which attributes to send in payload
    return dispatch(saveTextContent(data)).then(
      () => {
        dispatch(saveTextContentSuccess(data.content));
      },
      () => {
        dispatch(saveTextContentFailure());
        dispatch(showFlashMessageWithTimeout({
          type: 'error',
          text: 'Error: could not save text on the server.'
        }));
      }
    );
  };
}
