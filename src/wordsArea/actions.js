import axios from 'axios';
import * as t from './actionTypes';

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
    return axios.post(`/api/tokenizer`, data);
  }
}

export function addNewLocalWords(newLocalWords) {
  return {
    type: t.ADD_NEW_LOCAL_WORDS,
    payload: newLocalWords
  }
}

export function removeDeletedLocalWords(wordsArray) {
  return {
    type: t.REMOVE_DELETED_LOCAL_WORDS,
    payload: wordsArray
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
    payload: value
  }
}

// TODO: dispatch actions to handle async request
export function saveWords(data) {
  return dispatch => {
    return axios.put(`/api/texts/${data.textId}/words`, data);
  }
}
