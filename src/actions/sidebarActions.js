import axios from "axios";

 export function getTextItems() {
   return dispatch => {
     return axios.get('/api/texts');
   }
 }
