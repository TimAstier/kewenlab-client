import findIndex from 'lodash/findIndex';
import { List } from 'immutable';
import shortid from 'shortid';

// Action Types
const ADD = 'kewen-lab/flashMessages/ADD';
const DELETE = 'kewen-lab/flashMessages/DELETE';

// Reducer
const INITIAL_STATE = List();

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case ADD:
      return state.push({
        type: action.message.type,
        text: action.message.text,
        // id is generated in the action creator to keep this function pure
        id: action.message.id
      });
    case DELETE:
      const index = findIndex(state.toJS(), { id: action.id });
      if (index >= 0) {
        return state.delete(index);
      }
      return state;
    default:
      return state;
  }
}

// Action Creators
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

// Based on: http://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout
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
