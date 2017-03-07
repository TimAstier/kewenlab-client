import axios from 'axios';
import API_URL from '../config/api';

export function userSignupRequest(userData) {
  return () => {
    return axios.post(`${API_URL}/api/users`, userData);
  };
}
export function isUserExists(identifier) {
  return () => {
    return axios.get(`${API_URL}/api/users/${identifier}`);
  };
}
