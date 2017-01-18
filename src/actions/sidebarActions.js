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
     return axios.get(`/api/texts/${id}`);
   };
 }

 export function setCurrentText(text) {
   return {
     type: SET_CURRENT_TEXT,
     currentText: text
   };
 }
