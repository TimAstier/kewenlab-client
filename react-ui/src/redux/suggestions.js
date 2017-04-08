import { Map, List, fromJS} from 'immutable';
import axios from 'axios';
import apiCall from '../helpers/apiCall';

// Action Types
const SET = 'kewen-lab/suggestions/SET';
const CLEAR = 'kewen-lab/suggestions/CLEAR';
const FETCH = 'kewen-lab/suggestions/FETCH';
const FETCH_SUCCESS = 'kewen-lab/suggestions/FETCH_SUCCESS';
const FETCH_FAILURE = 'kewen-lab/suggestions/FETCH_FAILURE';
const REMOVE_WORD = 'kewen-lab/suggestions/REMOVE_WORD';
const TOGGLE_FAVORITE = 'kewen-lab/suggestions/TOGGLE_FAVORITE';

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
        words: action.data.words
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
    case TOGGLE_FAVORITE:
      const updatedWords = state.get('words').map(t => {
        if (t.get('id') === action.id) {
          return t.update('favorite', favorite => !favorite);
        }
        return t;
      });
      return state.set('words', updatedWords);
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

export function fetch(data) {
  const { textId, textNumber, userId, projectId } = data;
  return dispatch => {
    dispatch({ type: FETCH });
    return axios.get(`${process.env.REACT_APP_API_URL}/api/texts/${textId}/suggestions/${textNumber}/${userId}/${projectId}`);
  };
}

export function fetchSuccess(data) {
  return dispatch => {
    dispatch({ type: FETCH_SUCCESS });
    return dispatch(setSuggestions(data));
  };
}

export function fetchFailure() {
  return {
    type: FETCH_FAILURE
  };
}

export function getSuggestions(data) {
  return apiCall(data, fetch, fetchSuccess, fetchFailure);
}

export function removeWordSuggestion(id) {
  return {
    type: REMOVE_WORD,
    id
  };
}

export function toggleFavorite(id) {
  return {
    type: TOGGLE_FAVORITE,
    id
  };
}

export function banWord(id) {
  return dispatch => {
    return axios.put(`${process.env.REACT_APP_API_URL}/api/words/${id}/ban`)
      .then(() => dispatch(removeWordSuggestion(id)));
  };
}

export function hideWord(wordId, currentUserId) {
  return dispatch => {
    return axios.put(`${process.env.REACT_APP_API_URL}/api/users/${currentUserId}/hideword/${wordId}`).then(() => {
      dispatch(removeWordSuggestion(wordId));
    });
  };
}

export function favoriteWord(wordId, currentUserId) {
  return dispatch => {
    return axios.put(`${process.env.REACT_APP_API_URL}/api/users/${currentUserId}/favoriteword/${wordId}`)
      .then(() => {
        dispatch(toggleFavorite(wordId));
        // console.log('Word ' + wordId + ' favorited.');
      });
  };
}

export function unfavoriteWord(wordId, currentUserId) {
  return dispatch => {
    return axios.put(`${process.env.REACT_APP_API_URL}/api/users/${currentUserId}/unfavoriteword/${wordId}`)
      .then(() => {
        dispatch(toggleFavorite(wordId));
        // console.log('Word ' + wordId + ' unfavorited.');
      });
  };
}
