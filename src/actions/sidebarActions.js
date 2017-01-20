import axios from "axios";
import { UPDATE_TEXT_ITEMS, SET_CURRENT_TEXT } from './types';

 export function getTextItems() {
   return dispatch => {
     return axios.get('/api/texts');
   };
 }

 export function updateTextItems(textItems) {
   return {
     type: UPDATE_TEXT_ITEMS,
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
     type: SET_CURRENT_TEXT,
     currentText: {
       currentContent: text.content,
       currentChars: chars,
       currentWords: words
     }
   };
 }
