import * as t from './actionTypes';
import type { State } from './model';
import isEqual from 'lodash/isEqual';

const initialState: State = {
  localChars: [],
  currentChars: [],
  charsToDelete: []
};

export default (state = initialState, action: any): State => {

  // VERY UGLY - Should be a better way to do this...
  let oldLocalChars = state.localChars;
  let oldCharsToDelete = state.charsToDelete;

  switch (action.type) {
    case t.SET_LOCAL_CHARS:
      return {
        ...state,
        localChars: action.localChars
      };
      case t.SET_CURRENT_CHARS:
        return {
          ...state,
          currentChars: action.currentChars
        };
      case t.ADD_NEW_LOCAL_CHARS:
        let newChars = [];
        action.payload.forEach((char) => {
          let pos = state.localChars.map(e => e.chinese).indexOf(char);
          // No need to do anything if char is already in localChars
          if (pos < 0) {
            newChars.push({ id: null, chinese: char });
          }
        });
        return {
          ...state,
          localChars: oldLocalChars.concat(newChars)
        };
      case t.REMOVE_DELETED_LOCAL_CHARS:
        let charsToDelete = [];
        return {
          ...state,
          localChars: oldLocalChars.filter((charItem) => {
            if (action.payload.indexOf(charItem.chinese) < 0) {
              if (charItem.id !== null) {
                charsToDelete.push(charItem);
              }
              return false;
            } else {
              return true;
            }
          }),
          charsToDelete: oldCharsToDelete.concat(charsToDelete)
        };
      case t.CLEAR_CHARS_TO_DELETE:
        return {
          ...state,
          charsToDelete: []
        }
    default:
      return state;
  }
};

// Selectors

export const getSaved = (state = initialState) => {
  return isEqual(state.currentChars, state.localChars);
}

export const countChanges = (state = initialState) => {
  let localChars = state.localChars;
  let newChars = localChars.filter(x => x.id === null);
  return state.charsToDelete.length + newChars.length;
}
