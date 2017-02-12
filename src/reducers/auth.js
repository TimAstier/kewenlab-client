import { SET_CURRENT_USER } from '../actions/types';
import isEmpty from 'lodash/isEmpty';
import { Map } from 'immutable';

const initialState = Map({
  isAuthenticated: false,
  user: {}
});

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return state.set('isAuthenticated', !isEmpty(action.user))
        .set('user', action.user);
    default:
      return state;
  }
};
