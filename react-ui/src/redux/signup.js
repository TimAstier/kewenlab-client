// Not sure that this is the right place to put those 'actions'
import axios from 'axios';

export function userSignupRequest(userData) {
  return () => {
    return axios.post(`${process.env.REACT_APP_API_URL}/api/users`, userData);
  };
}
export function isUserExists(identifier) {
  return () => {
    return axios.get(`${process.env.REACT_APP_API_URL}/api/users/${identifier}`);
  };
}
