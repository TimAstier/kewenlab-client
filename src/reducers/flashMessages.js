import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from '../actions/types';
import findIndex from 'lodash/findIndex';
import { List } from 'immutable';

const initialState = List();

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case ADD_FLASH_MESSAGE:
      return state.push({
        type: action.message.type,
        text: action.message.text,
        // id is generated in the action creator to keep this function pure
        id: action.message.id
      });
    case DELETE_FLASH_MESSAGE:
      const index = findIndex(state.toJS(), { id: action.id });
      if (index >= 0) {
        return state.delete(index);
      } else {
        return state;
      }
    default:
      return state;
  }
};
