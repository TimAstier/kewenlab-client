import axios from 'axios';
import * as t from './actionTypes';

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
      axios.get(`${process.env.REACT_APP_API_URL}/api/texts/${id}`),
      axios.get(`${process.env.REACT_APP_API_URL}/api/texts/${id}/chars`),
      axios.get(`${process.env.REACT_APP_API_URL}/api/texts/${id}/words`)
    ]);
  };
}

export function getTextItems() {
  return () => {
    return axios.get(`${process.env.REACT_APP_API_URL}/api/texts`);
  };
}

export function createNewText() {
  return () => {
    return axios.post(`${process.env.REACT_APP_API_URL}/api/texts`);
  };
}
