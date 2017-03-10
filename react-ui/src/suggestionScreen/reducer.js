import * as t from './actionTypes';
import { Map, List, fromJS } from 'immutable';

const INITIAL_STATE = Map({
  chars: List(),
  words: List(),
  isFetching: false
});

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case t.FETCH_SUGGESTIONS:
      return state.set('isFetching', true);
    case t.FETCH_SUGGESTIONS_SUCCESS:
      return state.set('isFetching', false);
    case t.FETCH_SUGGESTIONS_FAILURE:
      return state.set('isFetching', false);
    case t.SET_SUGGESTIONS:
      state.set('chars', fromJS(action.data.chars));
      return state.set('words', fromJS(action.data.words));
    default:
      return state;
  }
};
