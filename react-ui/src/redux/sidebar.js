import { List, Map } from 'immutable';
import axios from 'axios';
import { showFlashMessageWithTimeout } from './flashMessages';

// Actions Types
const SET = 'kewen-lab/sidebar/SET';
const SET_CURRENT_TEXT_ID = 'kewen-lab/sidebar/SET_CURRENT_TEXT_ID';
const FETCH = 'kewen-lab/sidebar/FETCH';
const FETCH_SUCCESS = 'kewen-lab/sidebar/FETCH_SUCCESS';
const FETCH_FAILURE = 'kewen-lab/sidebar/FETCH_FAILURE';


// Reducer
const INITIAL_STATE = Map({
  textItems: List([]),
  currentTextId: 0,
  isFetching: false
});

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case SET:
      return state.set('textItems', List(action.textItems));
    case SET_CURRENT_TEXT_ID:
      return state.set('currentTextId', action.currentTextId);
    case FETCH:
      return state.set('isFetching', true);
    case FETCH_SUCCESS:
      return state.set('isFetching', false);
    case FETCH_FAILURE:
      return state.set('isFetching', false);
    default:
      return state;
  }
}

// Action Creators
export function setTextItems(textItems) {
  return { type: SET, textItems };
}

export function setCurrentTextId(text) {
  return { type: SET_CURRENT_TEXT_ID, currentTextId: text.id };
}

export function getCurrentText(id) {
  return () => {
    return axios.all([
      axios.get(`${process.env.REACT_APP_API_URL}/api/texts/${id}`),
      axios.get(`${process.env.REACT_APP_API_URL}/api/texts/${id}/chars`),
      axios.get(`${process.env.REACT_APP_API_URL}/api/texts/${id}/words`)
    ]);
  };
}

export function createNewText() {
  return () => {
    return axios.post(`${process.env.REACT_APP_API_URL}/api/texts`);
  };
}

export function fetchTextItems() {
  return dispatch => {
    dispatch({ type: FETCH });
    return axios.get(`${process.env.REACT_APP_API_URL}/api/texts`);
  };
}

export function fetchTextItemsSuccess(data) {
  return dispatch => {
    dispatch({ type: FETCH_SUCCESS });
    return dispatch(setTextItems(data));
  };
}

export function fetchTextItemsFailure() {
  return { type: FETCH_FAILURE };
}

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
