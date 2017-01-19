import { UPDATE_TEXT_ITEMS, SET_CURRENT_TEXT,
  SET_CURRENT_TEXT_CONTENT } from '../actions/types';

const initialState = {
  textItems: [],
  currentText: {
    content: ''
  },
  chars: [],
  words: []
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case UPDATE_TEXT_ITEMS:
      return {
        ...state,
        textItems: action.textItems,
      };
    case SET_CURRENT_TEXT:
      return {
        ...state,
        currentText: action.payload.currentText,
        chars: action.payload.chars,
        words: action.payload.words
      };
    case SET_CURRENT_TEXT_CONTENT:
      return {
        ...state,
        currentText: {
          ...state.currentText,
          content: action.content
        }
      }
    default:
      return state;
  }
}
