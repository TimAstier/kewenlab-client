import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from './types';
import shortid from 'shortid';

export function addFlashMessage(message, id = shortid.generate()) {
  return {
    type: ADD_FLASH_MESSAGE,
    message: {
      type: message.type,
      text: message.text,
      id
    }
  };
}

export function deleteFlashMessage(id) {
  return {
    type: DELETE_FLASH_MESSAGE,
    id
  };
}

// Based on: http://stackoverflow.com
// /questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout

// Can use this to test: https://facebook.github.io/jest/docs/timer-mocks.html

export function showFlashMessageWithTimeout(message) {
  const id = shortid.generate();
  return dispatch => {
    dispatch(addFlashMessage(message, id));
    setTimeout(() => {
      dispatch(deleteFlashMessage(id));
    }, 5000);
  };
}
