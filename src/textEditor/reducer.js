import * as t from './actionTypes';
import { Map } from 'immutable';

const INITIAL_STATE = Map({
  localContent: '',
  currentContent: ''
});

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case t.SET_LOCAL_CONTENT:
      return state.set('localContent', action.localContent);
      case t.SET_CURRENT_CONTENT:
        return state.set('currentContent', action.currentContent);
    default:
      return state;
  }
};

// Selectors
// TODO: Learn about Reselect

export const getSaved = (state = INITIAL_STATE) => {
  return (state.get('currentContent') === state.get('localContent'));
}
