import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';
import isEmpty from 'lodash/isEmpty';
import { Map } from 'immutable';

// Action Types
const SET_CURRENT_USER = 'kewen-lab/auth/SET_CURRENT_USER';

// Reducer
const INITIAL_STATE = Map({
  isAuthenticated: false,
  user: {}
});

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return state.set('isAuthenticated', !isEmpty(action.user))
        .set('user', action.user);
    default:
      return state;
  }
}

// Action Creators
export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  };
}

export function login(data) {
  return dispatch => {
    return axios.post(`${process.env.REACT_APP_API_URL}/api/auth`, data).then(res => {
      const token = res.data.token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwtDecode(token)));
    });
  };
}
