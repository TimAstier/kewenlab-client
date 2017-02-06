import axios from 'axios';
import * as t from './actionTypes';
import API_URL from '../config/api';

export function setLocalWords(words) {
  return {
    type: t.SET_LOCAL_WORDS,
    localWords: words
  }
}

export function setCurrentWords(words) {
  return {
    type: t.SET_CURRENT_WORDS,
    currentWords: words
  }
}

// TODO: dispatch actions to handle async request
export function tokenize(data) {
  return dispatch => {
    return axios.post(`${API_URL}/api/tokenizer`, data);
  }
}

export function addNewLocalWords(wordsArray) {
  return {
    type: t.ADD_NEW_LOCAL_WORDS,
    wordsArray
  }
}

export function removeDeletedLocalWords(wordsArray) {
  return {
    type: t.REMOVE_DELETED_LOCAL_WORDS,
    wordsArray
  }
}

export function clearWordsToDelete() {
  return {
    type: t.CLEAR_WORDS_TO_DELETE
  }
}

export function setVisibilityFilter(value) {
  return {
    type: t.SET_WORD_VISIBILITY_FILTER,
    filter: value
  }
}

// TODO: dispatch actions to handle async request
export function saveWords(data) {
  return dispatch => {
    return axios.put(`${API_URL}/api/texts/${data.textId}/words`, data);
  }
}
