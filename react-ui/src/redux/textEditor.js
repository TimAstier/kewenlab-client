import { Map } from 'immutable';
import axios from 'axios';
import apiCall from '../helpers/apiCall';

// Actions Types

const SET_LOCAL_CONTENT = 'kewen-lab/textEditor/SET_LOCAL_CONTENT';
const SET_CURRENT_CONTENT = 'kewen-lab/textEditor/SET_CURRENT_CONTENT';
const SAVE = 'kewen-lab/textEditor/SAVE';
const SAVE_SUCCESS = 'kewen-lab/textEditor/SAVE_SUCCESS';
export const SAVE_FAILURE = 'kewen-lab/textEditor/SAVE_FAILURE';


// Reducer
const INITIAL_STATE = Map({
  localContent: '',
  currentContent: '',
  isSaving: false
});

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case SET_LOCAL_CONTENT:
      return state.set('localContent', action.localContent);
    case SET_CURRENT_CONTENT:
      return state.set('currentContent', action.currentContent);
    case SAVE:
      return state.set('isSaving', true);
    case SAVE_SUCCESS:
      return state.set('isSaving', false);
    case SAVE_FAILURE:
      return state.set('isSaving', false);
    default:
      return state;
  }
}

// Action Creators
export function setLocalContent(content) {
  return {
    type: SET_LOCAL_CONTENT,
    localContent: content || ''
  };
}

export function setCurrentContent(content) {
  return {
    type: SET_CURRENT_CONTENT,
    currentContent: content || ''
  };
}

export function save(data) {
  return dispatch => {
    dispatch({ type: SAVE });
    return axios.put(`${process.env.REACT_APP_API_URL}/api/texts/${data.id}`, data);
  };
}

export function saveSuccess(data) {
  const content = data.affected[1][0].content;
  return dispatch => {
    dispatch({ type: SAVE_SUCCESS });
    return dispatch(setCurrentContent(content));
  };
}

export function saveFailure() {
  return { type: SAVE_FAILURE };
}

export function saveTextEditor(data) {
  return apiCall(data, save, saveSuccess, saveFailure);
}

// Selectors
export const getSaved = (state = INITIAL_STATE) => {
  return (state.get('currentContent') === state.get('localContent'));
};
