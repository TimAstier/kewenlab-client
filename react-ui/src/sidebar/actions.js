import axios from 'axios';
import * as t from './actionTypes';
import { showFlashMessageWithTimeout } from '../actions/flashMessages';

export function setTextItems(textItems) {
  return {
    type: t.SET_TEXT_ITEMS,
    textItems
  };
}

export function setCurrentTextId(text) {
  return {
    type: t.SET_CURRENT_TEXT_ID,
    currentTextId: text.id
  };
}

// TODO: test async action creators
export function getCurrentText(id) {
  return () => {
    return axios.all([
      axios.get(`${process.env.REACT_APP_API_URL}/api/texts/${id}`),
      axios.get(`${process.env.REACT_APP_API_URL}/api/texts/${id}/chars`),
      axios.get(`${process.env.REACT_APP_API_URL}/api/texts/${id}/words`)
    ]);
  };
}

export function fetchTextItems() {
  return dispatch => {
    dispatch({ type: t.FETCH_TEXT_ITEMS });
    return axios.get(`${process.env.REACT_APP_API_URL}/api/texts`);
  };
}

export function fetchTextItemsSuccess(data) {
  return dispatch => {
    dispatch({ type: t.FETCH_TEXT_ITEMS_SUCCESS });
    return dispatch(setTextItems(data));
  };
}

export function fetchTextItemsFailure() {
  return { type: t.FETCH_TEXT_ITEMS_FAILURE };
}

export function createNewText() {
  return () => {
    return axios.post(`${process.env.REACT_APP_API_URL}/api/texts`);
  };
}

// Combinations

export function getTextItems() {
  return dispatch =>
    dispatch(fetchTextItems()).then(
      (res) => {
        dispatch(fetchTextItemsSuccess(res.data.texts));
      },
      () => {
        dispatch(fetchTextItemsFailure());
        dispatch(showFlashMessageWithTimeout({
          type: 'error',
          text: 'Error: could not retrieve texts from the server.'
        }));
      }
    );
}

export function addText() {
  return dispatch =>
    dispatch(createNewText()).then(
      () => {
        dispatch(getTextItems());
      },
      () => {
        dispatch(showFlashMessageWithTimeout({
          type: 'error',
          text: 'Error: could not create new text.'
        }));
      }
    );
}
