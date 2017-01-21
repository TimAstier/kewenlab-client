import * as t from './actionTypes';
import type { State } from './model';

const initialState: State = {
  localContent: ''
};

export default (state = initialState, action: any): State => {
  switch (action.type) {
    case t.SET_LOCAL_CONTENT:
      return {
        localContent: action.localContent
      };
    default:
      return state;
  }
};
