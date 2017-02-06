import * as t from './actionTypes';
import { Map, List, fromJS } from 'immutable';
import isEmpty from 'lodash/isEmpty';
import { defineStatus } from '../utils/custom';

const initialState = Map({
  localChars: List(),
  currentChars: List(),
  charsToDelete: List(),
  visibilityFilter: 'all'
});

export default (state = initialState, action) => {
  switch (action.type) {
    case t.SET_LOCAL_CHARS:
      return state.set('localChars', fromJS(action.localChars));
    case t.SET_CURRENT_CHARS:
      return state.set('currentChars', fromJS(action.currentChars));
    case t.CLEAR_CHARS_TO_DELETE:
      return state.set('charsToDelete', List());
    case t.SET_CHAR_VISIBILITY_FILTER:
      return state.set('visibilityFilter', action.filter);
    case t.ADD_NEW_LOCAL_CHARS:
      let newChars = [];
      action.charsArray.forEach((char) => {
        let pos = state
          .get('localChars')
          .toJS()
          .map(e => e.chinese)
          .indexOf(char);
        if (pos < 0) {
          newChars.push({ id: null, chinese: char });
        }
      });
      const newLocalChars = state.get('localChars').concat(fromJS(newChars));
      return state.set('localChars', newLocalChars);
    case t.REMOVE_DELETED_LOCAL_CHARS:
      let charsToDelete = [];
      return state.merge(Map(fromJS({
        localChars: state.get('localChars').toJS().filter((charItem) => {
          if (action.charsArray.indexOf(charItem.chinese) < 0) {
            if (charItem.id !== null) {
              charsToDelete.push(charItem);
            }
            return false;
          }
          return true;
        }),
        charsToDelete: state.get('charsToDelete').toJS().concat(charsToDelete)
      })));
    default:
      return state;
  }
};

// Selectors

export const getSaved = (state = initialState) => {
  return state.get('currentChars').equals(state.get('localChars'));
};

export const countChanges = (state = initialState) => {
  let newChars = state
    .get('localChars')
    .filter(x => x.get('id') === null);
  return state.get('charsToDelete').size + newChars.size;
};

export const getTotalChars = (state = initialState) => {
  return state.get('currentChars').size;
};

export const countNewChars = (state = initialState) => {
  return state
    .get('currentChars')
    .toJS()
    .filter(x => isEmpty(x.texts))
    .length;
};

export const filterLocalChars = (state = initialState) => {
  let localChars = state.get('localChars').toJS();
  switch(state.get('visibilityFilter')) {
    case 'all':
      return localChars;
    case 'new':
      return localChars.filter(x => defineStatus(x) === 'new');
    case 'notnew':
      return localChars.filter(x => {
        return (defineStatus(x) !== 'new') && (defineStatus(x) !== 'notsaved');
      });
      case 'notsaved':
        return localChars.filter(x => defineStatus(x) === 'notsaved');
    default:
      return localChars;
  }
};
