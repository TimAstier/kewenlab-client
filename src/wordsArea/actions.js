import axios from 'axios';
import API_URL from '../config/api';

export function setLocalWords(items) {
  return {
    type: 'SET_LOCAL_WORDS',
    localItems: items
  };
}

export function setCurrentWords(items) {
  return {
    type: 'SET_CURRENT_WORDS',
    currentItems: items
  };
}

export function addNewLocalWords(itemsArray) {
  return {
    type: 'ADD_NEW_LOCAL_WORDS',
    itemsArray
  };
}

export function removeDeletedLocalWords(itemsArray) {
  return {
    type: 'REMOVE_DELETED_LOCAL_WORDS',
    itemsArray
  };
}

export function clearWordsToDelete() {
  return {
    type: 'CLEAR_WORDS_TO_DELETE'
  };
}

export function setWordsVisibilityFilter(value) {
  return {
    type: 'SET_WORDS_VISIBILITY_FILTER',
    filter: value
  };
}

// TODO: dispatch actions to handle async request
export function saveWords(data) {
  return () => {
    return axios.put(`${API_URL}/api/texts/${data.textId}/words`, data);
  };
}

// TODO: dispatch actions to handle async request
export function tokenize(data) {
  return () => {
    return axios.post(`${API_URL}/api/tokenizer`, data);
  };
}
