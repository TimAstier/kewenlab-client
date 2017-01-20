import { UPDATE_TEXT_ITEMS, SET_CURRENT_TEXT,
  SET_LOCAL_CONTENT } from '../actions/types';

const initialState = {
  textItems: [],
  currentText: {
    id: null,
    currentContent: '',
    currentChars: [],
    currentWords: []
  },
  localData: {
    localContent: '',
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
          currentContent: action.currentText.currentContent,
          currentChars: action.currentText.currentChars,
          currentWords: action.currentText.currentWords
        },
        localData: {
          localContent: action.currentText.currentContent,
          localChars: action.currentText.currentChars,
          localWords: action.currentText.currentWords
        }
      };
    case SET_LOCAL_CONTENT:
      return {
        ...state,
        localData: {
          ...state.localData,
          localContent: action.localContent
        }
      }
    default:
      return state;
  }
}

// Selectors

export const getSaved = (state = initialState) => {
  if(state.currentText.currentContent === state.localData.localContent) {
    return true;
  } else {
    return false;
  }
}
