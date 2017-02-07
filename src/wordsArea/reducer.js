import * as t from './actionTypes';
import { Map, List, fromJS } from 'immutable';
import isEmpty from 'lodash/isEmpty';
import { defineStatus } from '../utils/custom';

const initialState = Map({
  localWords: List(),
  currentWords: List(),
  wordsToDelete: List(),
  visibilityFilter: 'all'
});

export default (state = initialState, action) => {
  switch (action.type) {
    case t.SET_LOCAL_WORDS:
      return state.set('localWords', fromJS(action.localWords));
    case t.SET_CURRENT_WORDS:
      return state.set('currentWords', fromJS(action.currentWords));
    case t.CLEAR_WORDS_TO_DELETE:
      return state.set('wordsToDelete', List());
    case t.SET_WORD_VISIBILITY_FILTER:
    return state.set('visibilityFilter', action.filter);
    case t.ADD_NEW_LOCAL_WORDS:
      let newWords = [];
      action.wordsArray.forEach((word) => {
        let pos = state
          .get('localWords')
          .toJS()
          .map(e => e.chinese)
          .indexOf(word);
        if (pos < 0) {
          newWords.push({ id: null, chinese: word });
        }
      });
      const newLocalWords = state.get('localWords').concat(fromJS(newWords));
      return state.set('localWords', newLocalWords);
    case t.REMOVE_DELETED_LOCAL_WORDS:
      let wordsToDelete = [];
      return state.merge(Map(fromJS({
        localWords: state.get('localWords').toJS().filter((wordItem) => {
          if (action.wordsArray.indexOf(wordItem.chinese) < 0) {

            // Select words to add in wordsToDelete
            if (wordItem.hasOwnProperty('wordText') && wordItem.id !== null) {
              // No need to put localWords in wordsToDelete
              if(wordItem.wordText.manuallyAdded === false &&
              wordItem.wordText.manuallyDeleted === false) {
                // We do not put in wordsToDelete currentWords
                // that have been added or deleted manually
                wordsToDelete.push(wordItem);
              }
            }

            // Filtering out of localWords
            if (wordItem.hasOwnProperty('wordText') === false ||
              wordItem.id === null) {
              // localWords can be removed from localWords
              return false;
            } else if (wordItem.wordText.manuallyAdded === false &&
            wordItem.wordText.manuallyDeleted === false) {
              // currentWords are removed only if not manuallyAdded
              return false;
            }
          }
          return true;
        }),
        wordsToDelete: state.get('wordsToDelete').toJS().concat(wordsToDelete)
      })));
    default:
      return state;
  }
};

// Selectors

export const getSaved = (state = initialState) => {
  return state.get('currentWords').equals(state.get('localWords'));
}

export const countChanges = (state = initialState) => {
  let newWords = state
    .get('localWords')
    .filter(x => x.get('id') === null);
  return state.get('wordsToDelete').size + newWords.size;
}

export const getTotalWords = (state = initialState) => {
  return state
    .get('currentWords')
    .toJS()
    .filter(x => defineStatus(x) !== 'manuallydeleted')
    .length;
}

export const countNewWords = (state = initialState) => {
  return state
    .get('currentWords')
    .toJS()
    .filter(x => isEmpty(x.texts))
    .length;
}

export const filterLocalWords = (state = initialState) => {
  let localWords = state.get('localWords').toJS();
  switch(state.get('visibilityFilter')) {
    case 'all':
      return localWords.filter(x => defineStatus(x) !== 'manuallydeleted');
    case 'new':
      return localWords.filter(x => defineStatus(x) === 'new');
    case 'notnew':
      return localWords.filter(x => {
        return(
          (defineStatus(x) !== 'new') &&
          (defineStatus(x) !== 'notsaved') &&
          (defineStatus(x) !== 'manuallydeleted')
        );
      });
    case 'notsaved':
      return localWords.filter(x => defineStatus(x) === 'notsaved');
    case 'manuallydeleted':
      return localWords.filter(x => defineStatus(x) === 'manuallydeleted');
    default:
      return localWords;
  }
}
