import { showFlashMessageWithTimeout } from '../../redux/flashMessages';
import { removeDuplicates, preTokenization, removeDolars }
  from '../../utils/custom';
import { tokenize, refreshWords } from '../../redux/items';

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
        // TODO: Return real error from the server
        dispatch(showFlashMessageWithTimeout({
          type: 'error',
          text: 'Error: could not tokenize text from the server.'
        }));
      }
    );
  };
}
