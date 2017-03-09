import * as t from './actionTypes';
import { Map } from 'immutable';

const INITIAL_STATE = Map({
  textNumber: 0
});

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case t.SET_SUGGESTION_TEXT_NUMBER:
      return state.set('textNumber', isNaN(action.number) ? 0 : action.number);
    default:
      return state;
  }
};
