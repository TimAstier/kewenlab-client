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
