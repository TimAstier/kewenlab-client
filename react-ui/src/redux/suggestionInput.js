import { Map } from 'immutable';

// Action Types
const SET_TEXT_NUMBER = 'kewen-lab/suggestionInput/SET_TEXT_NUMBER';

// Reducer
const INITIAL_STATE = Map({
  textNumber: 0
});

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case SET_TEXT_NUMBER:
      return state.set('textNumber', isNaN(action.number) ? 0 : action.number);
    default:
      return state;
  }
}

// Action Creators

export function setSuggestionTextNumber(number) {
  return {
    type: SET_TEXT_NUMBER,
    number
  };
}
