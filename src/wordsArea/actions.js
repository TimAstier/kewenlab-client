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
