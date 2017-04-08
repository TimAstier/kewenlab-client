import { showFlashMessageWithTimeout } from '../redux/flashMessages';

export default function apiCall(data, call, success, failure) {
  return dispatch =>
    dispatch(call(data))
      .then(response => {
        dispatch(success(response.data));
      })
      .catch(err => {
        dispatch(failure());
        const type = 'error';
        let text = '';
        if (!navigator.onLine) { // Browser is offline?
          text = 'No Internet connexion';
        } else if (err.response === undefined) { // No response from the server
          text = 'No response from the server';
        } else { // Error message from the server
          const { status, message } = err.response.data.errors[0];
          text = 'Error - "' + message + '" (' + status + ')';
        }
        dispatch(showFlashMessageWithTimeout({ type, text }));
      });
}
