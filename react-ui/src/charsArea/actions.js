import axios from 'axios';
import isEmpty from 'lodash/isEmpty';

export function setLocalChars(items) {
  return {
    type: 'SET_LOCAL_CHARS',
    localItems: items
  };
}

export function setCurrentChars(items) {
  return {
    type: 'SET_CURRENT_CHARS',
    currentItems: items
  };
}

export function addNewLocalChars(itemsArray) {
  return {
    type: 'ADD_NEW_LOCAL_CHARS',
    itemsArray
  };
}

export function removeDeletedLocalChars(itemsArray) {
  return {
    type: 'REMOVE_DELETED_LOCAL_CHARS',
    itemsArray
  };
}

export function clearCharsToDelete() {
  return {
    type: 'CLEAR_CHARS_TO_DELETE'
  };
}

export function updateCharsOrder(itemsArray) {
  return {
    type: 'UPDATE_CHARS_ORDER',
    itemsArray
  };
}

export function clearCharsToUpdate() {
  return {
    type: 'CLEAR_CHARS_TO_UPDATE'
  };
}

export function setCharsVisibilityFilter(value) {
  return {
    type: 'SET_CHARS_VISIBILITY_FILTER',
    filter: value
  };
}

// TODO: dispatch actions to handle async request
export function saveChars(data) {
  return dispatch => {
    dispatch({ type: 'SAVE_CHARS' });
    return axios.put(`${process.env.REACT_APP_API_URL}/api/texts/${data.textId}/chars`, data);
  };
}

export function saveCharsSuccess(items) {
  return dispatch => {
    dispatch({ type: 'SAVE_CHARS_SUCCESS' });
    dispatch(setCurrentChars(items));
    dispatch(setLocalChars(items));
    dispatch(clearCharsToDelete());
    return dispatch(clearCharsToUpdate());
  };
}

export function saveCharsFailure() {
  return {
    type: 'SAVE_CHARS_FAILURE'
  };
}

// Combinations

export function refreshChars(charsArray) {
  return dispatch => {
    dispatch(removeDeletedLocalChars(charsArray));
    if (!isEmpty(charsArray)) {
      dispatch(addNewLocalChars(charsArray));
      dispatch(updateCharsOrder(charsArray));
    }
  };
}
