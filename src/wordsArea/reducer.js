import * as t from './actionTypes';
import type { State } from './model';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import { defineStatus } from '../utils/custom';

const initialState: State = {
  localWords: [],
  currentWords: [],
  wordsToDelete: [],
  visibilityFilter: 'all'
};

export default (state = initialState, action: any): State => {

  // VERY UGLY - Should be a better way to do this...
  let oldLocalWords = state.localWords;
  let oldWordsToDelete = state.wordsToDelete;

  switch (action.type) {
    case t.SET_LOCAL_WORDS:
      return {
        ...state,
        localWords: action.localWords
      };
      case t.SET_CURRENT_WORDS:
        return {
          ...state,
          currentWords: action.currentWords
        };
        case t.ADD_NEW_LOCAL_WORDS:
          let newWords = [];
          action.payload.forEach((word) => {
            // TODO: This foes not seem to be pure...
            let pos = state.localWords.map(e => e.chinese).indexOf(word);
            // No need to do anything if word is already in localWords
            // TODO: Keep track of manually deleted words to avoid adding them
            if (pos < 0) {
              newWords.push({ id: null, chinese: word });
            }
          });
          return {
            ...state,
            localWords: oldLocalWords.concat(newWords)
          };
        case t.REMOVE_DELETED_LOCAL_WORDS:
          let wordsToDelete = [];
          return {
            ...state,
            localWords: oldLocalWords.filter((wordItem) => {
              if (action.payload.indexOf(wordItem.chinese) < 0) {
                // TODO: Avoid removing words that were manually added
                if (wordItem.id !== null) {
                  wordsToDelete.push(wordItem);
                }
                return false;
              } else {
                return true;
              }
            }),
            wordsToDelete: oldWordsToDelete.concat(wordsToDelete)
          };
        case t.CLEAR_WORDS_TO_DELETE:
          return {
            ...state,
            wordsToDelete: []
          }
        case t.SET_WORD_VISIBILITY_FILTER:
          return {
            ...state,
            visibilityFilter: action.payload
          };
    default:
      return state;
  }
};

// Selectors

export const getSaved = (state = initialState) => {
  return isEqual(state.currentWords, state.localWords);
}

export const countChanges = (state = initialState) => {
  let localWords = state.localWords;
  let newWords = localWords.filter(x => x.id === null);
  return state.wordsToDelete.length + newWords.length;
}

export const getTotalWords = (state = initialState) => {
  return state.currentWords.length;
}

export const countNewWords = (state = initialState) => {
  let currentWords = state.currentWords
  return currentWords.filter(x => isEmpty(x.texts)).length;
}

export const filterLocalWords = (state = initialState) => {
  let localWords = state.localWords;
  switch(state.visibilityFilter) {
    case 'all':
      return localWords;
    case 'new':
      return localWords.filter(x => defineStatus(x) === 'new');
    case 'notnew':
      return localWords.filter(x => {
        return (defineStatus(x) !== 'new') && (defineStatus(x) !== 'notsaved');
      });
      case 'notsaved':
        return localWords.filter(x => defineStatus(x) === 'notsaved');
    default:
      return localWords;
  }
}
