import * as t from './actionTypes';
import type { State } from './model';

const initialState: State = {
  localContent: '',
  currentContent: ''
};

export default (state = initialState, action: any): State => {
  switch (action.type) {
    case t.SET_LOCAL_CONTENT:
      return {
        ...state,
        localContent: action.localContent
      };
      case t.SET_CURRENT_CONTENT:
        return {
          ...state,
          currentContent: action.currentContent
        };
    default:
      return state;
  }
};

// Selectors

export const getSaved = (state = initialState) => {
  if(state.currentContent === state.localContent) {
    return true;
  } else {
    return false;
  }
}
