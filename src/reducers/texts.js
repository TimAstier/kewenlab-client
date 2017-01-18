import { UPDATE_TEXT_ITEMS, SET_CURRENT_TEXT,
  SET_CURRENT_TEXT_CONTENT } from '../actions/types';

const initialState = {
  textItems: [],
  currentText: {
    content: ''
  }
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case UPDATE_TEXT_ITEMS:
      return {
        textItems: action.textItems,
        currentText: state.currentText
      };
    case SET_CURRENT_TEXT:
      return {
        textItems: state.textItems,
        currentText: action.currentText
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
