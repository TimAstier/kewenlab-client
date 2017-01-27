import axios from 'axios';
import * as t from './actionTypes';

export function setLocalChars(chars) {
  return {
    type: t.SET_LOCAL_CHARS,
    localChars: chars
  }
}

export function setCurrentChars(chars) {
  return {
    type: t.SET_CURRENT_CHARS,
    currentChars: chars
  }
}

export function addNewLocalChars(charsArray) {
  return {
    type: t.ADD_NEW_LOCAL_CHARS,
    payload: charsArray
  }
}

export function removeDeletedLocalChars(charsArray) {
  return {
    type: t.REMOVE_DELETED_LOCAL_CHARS,
    payload: charsArray
  }
}

export function clearCharsToDelete() {
  return {
    type: t.CLEAR_CHARS_TO_DELETE
  }
}

export function setVisibilityFilter(value) {
  return {
    type: t.SET_CHAR_VISIBILITY_FILTER,
    payload: value
  }
}

// TODO: dispatch actions to handle async request
export function saveChars(data) {
  return dispatch => {
    return axios.put(`/api/texts/${data.textId}/chars`, data);
  }
}
