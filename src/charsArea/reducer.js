import * as t from './actionTypes';
import type { State } from './model';

const initialState: State = {
  localChars: [],
  currentChars: []
};

export default (state = initialState, action: any): State => {
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
    default:
      return state;
  }
};
