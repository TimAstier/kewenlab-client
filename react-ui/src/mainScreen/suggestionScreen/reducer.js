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
        chars: action.data.chars,
        words: action.data.words.filter(w => {
          return action.data.hiddenWords.indexOf(w.id) === -1;
        })
      }));
    case t.CLEAR_SUGGESTIONS:
      return state.merge(fromJS({
        chars: [],
        words: []
      }));
    case t.REMOVE_WORD_SUGGESTION:
      return state.set(
        'words',
        state.get('words').filter(w => w.get('id') !== action.id)
      );
    default:
      return state;
  }
};
