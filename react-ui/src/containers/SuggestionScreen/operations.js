import { showFlashMessageWithTimeout } from '../../redux/flashMessages';
import { fetchSuggestions, fetchSuggestionsSuccess, fetchSuggestionFailure }
  from '../../redux/suggestions';

export function getSuggestions(data) {
  return dispatch => {
    return dispatch(fetchSuggestions(data)).then(
      (res) => {
        return dispatch(fetchSuggestionsSuccess(res.data));
      },
      () => {
        dispatch(fetchSuggestionFailure());
        return dispatch(showFlashMessageWithTimeout({
          type: 'error',
          text: 'Error: could not get suggestions from the server.'
        }));
      }
    );
  };
}
