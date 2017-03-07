import axios from 'axios';
import * as t from './actionTypes';
import API_URL from '../config/api';

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
    return axios.put(`${API_URL}/api/texts/${data.id}`, data);
  };
}