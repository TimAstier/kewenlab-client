import axios from 'axios';
// Remove
import { SET_LOCAL_CONTENT } from './types';

// Remove
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
