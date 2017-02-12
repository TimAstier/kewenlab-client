import axios from 'axios';
import API_URL from '../config/api';

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

export function setCharsVisibilityFilter(value) {
  return {
    type: 'SET_CHARS_VISIBILITY_FILTER',
    filter: value
  };
}

// TODO: dispatch actions to handle async request
export function saveChars(data) {
  return () => {
    return axios.put(`${API_URL}/api/texts/${data.textId}/chars`, data);
  };
}
