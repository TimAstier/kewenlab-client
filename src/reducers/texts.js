import { UPDATE_TEXT_ITEMS, SET_CURRENT_TEXT } from '../actions/types';

const initialState = {
  textItems: [],
  currentText: {}
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
    default:
      return state;
  }
}
