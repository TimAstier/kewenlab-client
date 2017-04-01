import { Map, List, fromJS } from 'immutable';
import axios from 'axios';

// Action Types
const SET = 'kewen-lab/suggestions/SET';
const CLEAR = 'kewen-lab/suggestions/CLEAR';
const FETCH = 'kewen-lab/suggestions/FETCH';
const FETCH_SUCCESS = 'kewen-lab/suggestions/FETCH_SUCCESS';
const FETCH_FAILURE = 'kewen-lab/suggestions/FETCH_FAILURE';
const REMOVE_WORD = 'kewen-lab/suggestions/REMOVE_WORD';

// Reducer
const INITIAL_STATE = Map({
  chars: List(),
  words: List(),
  isFetching: false
});

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case FETCH:
      return state.set('isFetching', true);
    case FETCH_SUCCESS:
      return state.set('isFetching', false);
    case FETCH_FAILURE:
      return state.set('isFetching', false);
    case SET:
      return state.merge(fromJS({
        chars: action.data.chars,
        words: action.data.words.filter(w => {
          return action.data.hiddenWords.indexOf(w.id) === -1;
        })
      }));
    case CLEAR:
      return state.merge(fromJS({
        chars: [],
        words: []
      }));
    case REMOVE_WORD:
      return state.set(
        'words',
        state.get('words').filter(w => w.get('id') !== action.id)
      );
    default:
      return state;
  }
}

// Action Creators
export function setSuggestions(data) {
  return {
    type: SET,
    data
  };
}

export function clearSuggestions() {
  return {
    type: CLEAR
  };
}

export function fetchSuggestions(data) {
  return dispatch => {
    dispatch({ type: FETCH });
    return axios.get(`${process.env.REACT_APP_API_URL}/api/texts/${data.currentTextId}/suggestions/${data.textNumber}/${data.currentUserId}`);
  };
}

export function fetchSuggestionsSuccess(data) {
  return dispatch => {
    dispatch({ type: FETCH_SUCCESS });
    return dispatch(setSuggestions(data));
  };
}

export function fetchSuggestionFailure() {
  return {
    type: FETCH_FAILURE
  };
}

export function removeWordSuggestion(id) {
  return {
    type: REMOVE_WORD,
    id
  };
}

export function banWord(id) {
  return dispatch => {
    return axios.put(`${process.env.REACT_APP_API_URL}/api/words/${id}/ban`).then(() => {
      dispatch(removeWordSuggestion(id));
    });
  };
}

export function hideWord(wordId, currentUserId) {
  return dispatch => {
    return axios.put(`${process.env.REACT_APP_API_URL}/api/users/${currentUserId}/hideword/${wordId}`).then(() => {
      dispatch(removeWordSuggestion(wordId));
    });
  };
}
