import * as t from './actionTypes';
import { List, Map } from 'immutable';

const initialState = Map({
  textItems: List([]),
  currentTextId: 0
});

export default (state = initialState, action) => {
  switch (action.type) {
    case t.SET_TEXT_ITEMS:
      return state.set('textItems', List(action.textItems));
    case t.SET_CURRENT_TEXT_ID:
      return state.set('currentTextId', action.currentTextId);
    default:
      return state;
  }
};
