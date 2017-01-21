import * as t from './actionTypes';
import type { State } from './model';

const initialState: State = {
  textItems: [],
  currentTextId: 0
};

export default (state = initialState, action: any): State => {
  switch (action.type) {
    case t.UPDATE_TEXT_ITEMS:
      return {
        ...state,
        textItems: action.textItems
      };
      case t.SET_CURRENT_TEXT:
        return {
          ...state,
          currentTextId: action.currentText.id
        };
    default:
      return state;
  }
};
