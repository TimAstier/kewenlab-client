import { showFlashMessageWithTimeout } from '../redux/flashMessages';

export default function apiCall(data, call, success, failure) {
  return dispatch =>
    dispatch(call(data)).then(
      (res) => {
        dispatch(success(res.data));
      },
      () => {
        dispatch(failure());
        dispatch(showFlashMessageWithTimeout({
          type: 'error',
          text: 'ERROR_MESSAGE'
        }));
      }
    );
}
