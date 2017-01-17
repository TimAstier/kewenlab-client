import { UPDATE_TEXT_ITEMS } from '../actions/types';

export default (state = [], action = {}) => {
  switch(action.type) {
    case UPDATE_TEXT_ITEMS:
      return action.textItems;
    default:
      return state;
  }
}
