import { UPDATE_TEXT_ITEMS, SET_CURRENT_TEXT,
  SET_CURRENT_TEXT_CONTENT } from '../actions/types';

const initialState = {
  textItems: [],
  currentText: {
    currentContent: '',
    currentChars: [],
    currentWords: []
  }
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
        currentText: {
          currentContent: action.currentText.currentContent,
          currentChars: action.currentText.currentChars,
          currentWords: action.currentText.currentWords
        }
      };
    case SET_CURRENT_TEXT_CONTENT:
      return {
        ...state,
        currentText: {
          ...state.currentText,
          currentContent: action.currentContent
        }
      }
    default:
      return state;
  }
}
