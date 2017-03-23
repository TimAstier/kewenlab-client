import * as t from './actionTypes';
import { Map } from 'immutable';

const initialState = Map({
  mode: 'edit'
});

export default (state = initialState, action) => {
  switch (action.type) {
    case t.SET_APP_SCREEN_MODE:
      return state.set('mode', action.mode);
    default:
      return state;
  }
};
