import * as t from './actionTypes';
import type { State } from './model';

const initialState: State = {
  localWords: [],
  currentWords: []
};

export default (state = initialState, action: any): State => {
  switch (action.type) {
    case t.SET_LOCAL_WORDS:
      return {
        ...state,
        localWords: action.localWords
      };
      case t.SET_CURRENT_WORDS:
        return {
          ...state,
          currentWords: action.currentWords
        };
    default:
      return state;
  }
};
