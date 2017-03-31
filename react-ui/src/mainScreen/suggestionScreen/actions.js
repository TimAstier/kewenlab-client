import * as t from './actionTypes';
import axios from 'axios';

export function setSuggestions(data) {
  return {
    type: t.SET_SUGGESTIONS,
    data
  };
}

export function clearSuggestions() {
  return {
    type: t.CLEAR_SUGGESTIONS
  };
}

export function fetchSuggestions(data) {
  return dispatch => {
    dispatch({ type: t.FETCH_SUGGESTIONS });
    return axios.get(`${process.env.REACT_APP_API_URL}/api/texts/${data.currentTextId}/suggestions/${data.textNumber}/${data.currentUserId}`);
  };
}

export function fetchSuggestionsSuccess(data) {
  return dispatch => {
    dispatch({ type: t.FETCH_SUGGESTIONS_SUCCESS });
    return dispatch(setSuggestions(data));
  };
}

export function fetchSuggestionFailure() {
  return {
    type: t.FETCH_SUGGESTIONS_FAILURE
  };
}

export function removeWordSuggestion(id) {
  return {
    type: t.REMOVE_WORD_SUGGESTION,
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
