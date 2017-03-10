import * as t from './actionTypes';
import axios from 'axios';

export function setSuggestions(data) {
  return {
    type: t.SET_SUGGESTIONS,
    suggestions: data
  }
};

export function fetchSuggestions(data) {
  return dispatch => {
    dispatch({ type: t.FETCH_SUGGESTIONS });
    return axios.get(`${process.env.REACT_APP_API_URL}/api/texts/${data.currentTextId}/suggestions/${data.textNumber}`);
  };
};

export function fetchSuggestionsSuccess(data) {
  return dispatch => {
    dispatch({ type: t.FETCH_SUGGESTIONS_SUCCESS });
    return dispatch(setSuggestions(data));
  };
};

export function fetchSuggestionFailure() {
  return {
    type: t.FETCH_SUGGESTIONS_FAILURE
  };
};
