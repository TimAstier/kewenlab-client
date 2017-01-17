import axios from "axios";
import { UPDATE_TEXT_ITEMS } from './types';

 export function getTextItems() {
   return dispatch => {
     return axios.get('/api/texts');
   }
 }

 export function updateTextItems(textItems) {
   return {
     type: UPDATE_TEXT_ITEMS,
     textItems
   }
 }
