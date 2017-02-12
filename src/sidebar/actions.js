import axios from 'axios';
import * as t from './actionTypes';
import API_URL from '../config/api';

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
      axios.get(`${API_URL}/api/texts/${id}`),
      axios.get(`${API_URL}/api/texts/${id}/chars`),
      axios.get(`${API_URL}/api/texts/${id}/words`)
    ]);
  };
}

export function getTextItems() {
  return () => {
    return axios.get(`${API_URL}/api/texts`);
  };
}

export function createNewText() {
  return () => {
    return axios.post(`${API_URL}/api/texts`);
  };
}
