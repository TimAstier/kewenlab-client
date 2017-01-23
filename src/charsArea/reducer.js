import * as t from './actionTypes';
import type { State } from './model';

const initialState: State = {
  localChars: [],
  currentChars: []
};

export default (state = initialState, action: any): State => {

  // VERY UGLY - Should be a better way to do this...
  let oldState = state.localChars;

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
          localChars: oldState.concat(newChars)
        };
      case t.REMOVE_DELETED_LOCAL_CHARS:
        return {
          ...state,
          localChars: oldState.filter((charItem) => {
            if (action.payload.indexOf(charItem.chinese) < 0) {
              console.log(charItem);
              return false;
            } else {
              return true;
            }
          })
        }

    default:
      return state;
  }
};
