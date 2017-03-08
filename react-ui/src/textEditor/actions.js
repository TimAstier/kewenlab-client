import axios from 'axios';
import * as t from './actionTypes';

export function setLocalContent(content) {
  return {
    type: t.SET_LOCAL_CONTENT,
    localContent: content || ''
  };
}

export function setCurrentContent(content) {
  return {
    type: t.SET_CURRENT_CONTENT,
    currentContent: content || ''
  };
}

// TODO: test async action creators
export function saveTextContent(data) {
  return dispatch => {
    dispatch ({ type: 'SAVE_TEXT_CONTENT' });
    return axios.put(`${process.env.REACT_APP_API_URL}/api/texts/${data.id}`, data);
  };
}

export function saveTextContentSuccess(content) {
  return dispatch => {
    dispatch({ type: 'SAVE_TEXT_CONTENT_SUCCESS' });
    return dispatch(setCurrentContent(content));
  };
};

export function saveTextContentFailure() {
  return { type: 'SAVE_TEXT_CONTENT_FAILURE' };
};
