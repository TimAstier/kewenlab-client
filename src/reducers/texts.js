import { UPDATE_TEXT_ITEMS, SET_CURRENT_TEXT } from '../actions/types';

const initialState = {
  textItems: [],
  currentText: {
    id: null,
    currentChars: [],
    currentWords: []
  },
  localData: {
    localChars: [],
    localWords: []
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
          id: action.currentText.id,
          currentChars: action.currentText.currentChars,
          currentWords: action.currentText.currentWords
        },
        localData: {
          localChars: action.currentText.currentChars,
          localWords: action.currentText.currentWords
        }
      };
    default:
      return state;
  }
}
