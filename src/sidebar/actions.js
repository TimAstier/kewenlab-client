import axios from "axios";
import * as t from './actionTypes';

export function getTextItems() {
  return dispatch => {
    return axios.get('/api/texts');
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
      axios.get(`/api/texts/${id}`),
      axios.get(`/api/texts/${id}/chars`),
      axios.get(`/api/texts/${id}/words`)
    ]);
  };
}

export function setCurrentText(text, chars, words) {
  return {
    type: t.SET_CURRENT_TEXT,
    currentText: {
      id: text.id,
      currentContent: text.content,
      currentChars: chars,
      currentWords: words
    }
  };
}
