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
      return state.merge(fromJS({
        chars: action.suggestions.chars,
        words: action.suggestions.words
      }));
    case t.CLEAR_SUGGESTIONS:
      return state.merge(fromJS({
        chars: [],
        words: []
      }));
    default:
      return state;
  }
};
