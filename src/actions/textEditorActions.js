import axios from 'axios';
import { SET_CURRENT_TEXT_CONTENT } from './types';

export function setCurrentTextContent(content) {
  return {
    type: SET_CURRENT_TEXT_CONTENT,
    content
  }
}

// TODO: dispatch actions to handle async request
export function saveTextContent(data) {
  console.log(data);
  return dispatch => {
    return axios.put(`/api/texts/${data.id}`, data);
  }
}
