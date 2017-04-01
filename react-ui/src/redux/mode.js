import { Map } from 'immutable';

// Action Types
const SET = 'kewen-lab/mode/SET';

// Reducer
const INITIAL_STATE = Map({
  mode: 'edit'
});

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case SET:
      return state.set('mode', action.mode);
    default:
      return state;
  }
}

// Action Creators
export function setMode(mode) {
  return {
    type: SET,
    mode
  };
}
