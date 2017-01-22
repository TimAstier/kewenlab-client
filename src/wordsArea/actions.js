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
