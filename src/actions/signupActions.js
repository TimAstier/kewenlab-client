import axios from 'axios';
import API_URL from '../config/api';

console.log('API_URL: ' + API_URL);

export function userSignupRequest(userData) {
  return dispatch => {
    return axios.post(`${API_URL}/api/users`, userData);
  }
};

export function isUserExists(identifier) {
  return dispatch => {
    return axios.get(`${API_URL}/api/users/${identifier}`);
  }
}
