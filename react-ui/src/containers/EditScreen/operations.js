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
    return dispatch(tokenize(data))
      .then(response => {
        let newLocalWords = response.data;
        newLocalWords = removeDolars(removeDuplicates(newLocalWords));
        dispatch(refreshWords(newLocalWords));
        return false;
      })
      .catch(err => {
        const { status, message } = err.response.data.errors[0];
        dispatch(showFlashMessageWithTimeout({
          type: 'error',
          text: 'Error - "' + message + '" (' + status + ')'
        }));
      });
  };
}
