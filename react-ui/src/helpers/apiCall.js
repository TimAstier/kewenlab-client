import { showFlashMessageWithTimeout } from '../redux/flashMessages';

export default function apiCall(data, call, success, failure) {
  return dispatch =>
    dispatch(call(data))
      .then(response => {
        dispatch(success(response.data));
      })
      .catch(err => {
        dispatch(failure());
        const { status, message } = err.response.data.errors[0];
        dispatch(showFlashMessageWithTimeout({
          type: 'error',
          text: 'Error - "' + message + '" (' + status + ')'
        }));
      });
}
