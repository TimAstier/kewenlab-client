import axios from 'axios';

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

export function updateWordsOrder(itemsArray) {
  return {
    type: 'UPDATE_WORDS_ORDER',
    itemsArray
  };
}

export function clearWordsToUpdate() {
  return {
    type: 'CLEAR_WORDS_TO_UPDATE'
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
    return axios.put(`${process.env.REACT_APP_API_URL}/api/texts/${data.textId}/words`, data);
  };
}

// TODO: dispatch actions to handle async request
export function tokenize(data) {
  return () => {
    return axios.post(`${process.env.REACT_APP_API_URL}/api/tokenizer`, data);
  };
}
