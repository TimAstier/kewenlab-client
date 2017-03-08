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

// TODO: dispatch actions to handle async request
// TODO: test async action creators
export function saveTextContent(data) {
  return () => {
    return axios.put(`${process.env.REACT_APP_API_URL}/api/texts/${data.id}`, data);
  };
}
