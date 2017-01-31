import axios from "axios";
import * as t from './actionTypes';
import API_URL from '../config/api';

export function getTextItems() {
  return dispatch => {
    return axios.get(`${API_URL}/api/texts`);
  };
}

export function updateTextItems(textItems) {
  return {
    type: t.UPDATE_TEXT_ITEMS,
    textItems
  };
}

export function getCurrentText(id) {
  return dispatch => {
    return axios.all([
      axios.get(`${API_URL}/api/texts/${id}`),
      axios.get(`${API_URL}/api/texts/${id}/chars`),
      axios.get(`${API_URL}/api/texts/${id}/words`)
    ]);
  };
}

export function setCurrentText(text) {
  return {
    type: t.SET_CURRENT_TEXT,
    currentText: {
      id: text.id,
      currentContent: text.content
    }
  };
}

export function createNewText() {
  return dispatch => {
    return axios.post(`${API_URL}/api/texts`);
  };
}
