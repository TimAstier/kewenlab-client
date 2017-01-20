import axios from 'axios';
import { SET_LOCAL_CONTENT } from './types';

export function setLocalContent(content) {
  return {
    type: SET_LOCAL_CONTENT,
    localContent: content
  }
}

// TODO: dispatch actions to handle async request
export function saveTextContent(data) {
  return dispatch => {
    return axios.put(`/api/texts/${data.id}`, data);
  }
}
