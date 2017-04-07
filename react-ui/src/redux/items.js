import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import { Map, List, fromJS } from 'immutable';

// Action Types
// Chars
const SET_LOCAL_CHARS = 'kewen-lab/items/SET_LOCAL_CHARS';
const SET_CURRENT_CHARS = 'kewen-lab/items/SET_CURRENT_CHARS';
const ADD_NEW_LOCAL_CHARS = 'kewen-lab/items/ADD_NEW_LOCAL_CHARS';
const REMOVE_DELETED_LOCAL_CHARS = 'kewen-lab/items/REMOVE_DELETED_LOCAL_CHARS';
const CLEAR_CHARS_TO_DELETE = 'kewen-lab/items/CLEAR_CHARS_TO_DELETE';
const UPDATE_CHARS_ORDER = 'kewen-lab/items/UPDATE_CHARS_ORDER';
const CLEAR_CHARS_TO_UPDATE = 'kewen-lab/items/CLEAR_CHARS_TO_UPDATE';
const SET_CHARS_VISIBILITY_FILTER = 'kewen-lab/items/SET_CHARS_VISIBILITY_FILTER';
const SAVE_CHARS = 'kewen-lab/items/SAVE_CHARS';
const SAVE_CHARS_SUCCESS = 'kewen-lab/items/SAVE_CHARS_SUCCESS';
const SAVE_CHARS_FAILURE = 'kewen-lab/items/SAVE_CHARS_FAILURE';

// Words
const SET_LOCAL_WORDS = 'kewen-lab/items/SET_LOCAL_WORDS';
const SET_CURRENT_WORDS = 'kewen-lab/items/SET_CURRENT_WORDS';
const ADD_NEW_LOCAL_WORDS = 'kewen-lab/items/ADD_NEW_LOCAL_WORDS';
const REMOVE_DELETED_LOCAL_WORDS = 'kewen-lab/items/REMOVE_DELETED_LOCAL_WORDS';
const CLEAR_WORDS_TO_DELETE = 'kewen-lab/items/CLEAR_WORDS_TO_DELETE';
const UPDATE_WORDS_ORDER = 'kewen-lab/items/UPDATE_WORDS_ORDER';
const CLEAR_WORDS_TO_UPDATE = 'kewen-lab/items/CLEAR_WORDS_TO_UPDATE';
const SET_WORDS_VISIBILITY_FILTER = 'kewen-lab/items/SET_WORDS_VISIBILITY_FILTER';
const SAVE_WORDS = 'kewen-lab/items/SAVE_WORDS';
const SAVE_WORDS_SUCCESS = 'kewen-lab/items/SAVE_WORDS_SUCCESS';
const SAVE_WORDS_FAILURE = 'kewen-lab/items/SAVE_WORDS_FAILURE';

// Reducer
const INITIAL_STATE = Map({
  localItems: List(),
  currentItems: List(),
  itemsToDelete: List(),
  itemsToUpdate: List(),
  visibilityFilter: 'all',
  isSaving: false
});

// Case reducers (tested indirectly in slice reducer's test):

function setLocalItems(state, action) {
  return state.set('localItems',
    fromJS(action.localItems.sort((a, b) => {
      return a.order - b.order;
    }))
  );
}

function setCurrentItems(state, action) {
  return state.set('currentItems',
    fromJS(action.currentItems.sort((a, b) => {
      return a.order - b.order;
    }))
  );
}

function clearItemsToDelete(state) {
  return state.set('itemsToDelete', List());
}

function setItemsVisibilityFilter(state, action) {
  return state.set('visibilityFilter', action.filter);
}

function addNewLocalItems(state, action) {
  const newItems = [];
  const localItems = state
    .get('localItems')
    .toJS()
    .map(e => e.chinese);
  action.itemsArray.forEach((item, i) => {
    const localIndex = localItems.indexOf(item);
    if (localIndex < 0) {
      newItems.push({
        id: null,
        chinese: item,
        order: i,
        status: 'notsaved'
      });
    }
  });
  const newLocalItems = state.get('localItems').concat(fromJS(newItems));
  return state.set('localItems', newLocalItems);
}

// This probably requires refactoring (it does two things)
function removeDeletedLocalItems(state, action) {
  const itemsToDelete = [];
  return state.merge(Map(fromJS({
    localItems: state.get('localItems').toJS().filter((item) => {
      if (action.itemsArray.indexOf(item.chinese) < 0) {
        // Select items to add in itemsToDelete
        if (item.id !== null) {
          // No need to put localItems in itemsToDelete
          if (item.manuallyAdded === false &&
          item.manuallyDeleted === false) {
            // We do not put in itemsToDelete currentItems
            // that have been added or deleted manually
            itemsToDelete.push(item);
          }
        }

        // Filtering out of localItems
        if (item.id === null) {
          // localItems can be removed from localItems
          return false;
        } else if (item.manuallyAdded === false &&
          item.manuallyDeleted === false) {
          // currentItems are removed only if not manuallyAdded
          return false;
        }
      }
      return true;
    }),
    itemsToDelete: state.get('itemsToDelete').toJS().concat(itemsToDelete)
  })));
}

function updateItemsOrder(state, action) {
  const localItems = state.get('localItems').toJS();
  const savedItems = state.get('currentItems').toJS().map(x => x.chinese);
  const itemsToUpdate = state.get('itemsToUpdate').toJS();
  localItems.forEach((item, i) => {
    const realOrder = action.itemsArray.indexOf(item.chinese);
    if (item.order !== realOrder) {
      // Update localItems with correct Order
      const updatedItem = localItems[i];
      updatedItem.order = realOrder;
      localItems[i] = updatedItem;

      // Add to itemsToUpdate if this item was previously saved
      if (savedItems.indexOf(item.chinese) !== -1) {
        // If already in itemsToUpdate, update instead of adding new
        const index = itemsToUpdate.map(x => x.chinese).indexOf(item.chinese);
        if (index !== -1) {
          itemsToUpdate[index] = updatedItem;
        } else {
          itemsToUpdate.push(updatedItem);
        }
      }
    }
  });
  return state.merge(Map(fromJS({
    localItems,
    itemsToUpdate
  })));
}

function clearItemsToUpdate(state) {
  return state.set('itemsToUpdate', List());
}

function saveItems(state) {
  return state.set('isSaving', true);
}

function saveItemsSuccess(state) {
  return state.set('isSaving', false);
}

function saveItemsFailure(state) {
  return state.set('isSaving', false);
}

// high-order reducer:
export default (itemName = '') => {
  // slice reducer:
  return function itemsArea(state = INITIAL_STATE, action) {
    switch (action.type) {
      case `kewen-lab/items/SET_LOCAL_${itemName}`:
        return setLocalItems(state, action);
      case `kewen-lab/items/SET_CURRENT_${itemName}`:
        return setCurrentItems(state, action);
      case `kewen-lab/items/CLEAR_${itemName}_TO_DELETE`:
        return clearItemsToDelete(state);
      case `kewen-lab/items/SET_${itemName}_VISIBILITY_FILTER`:
        return setItemsVisibilityFilter(state, action);
      case `kewen-lab/items/ADD_NEW_LOCAL_${itemName}`:
        return addNewLocalItems(state, action);
      case `kewen-lab/items/REMOVE_DELETED_LOCAL_${itemName}`:
        return removeDeletedLocalItems(state, action);
      case `kewen-lab/items/UPDATE_${itemName}_ORDER`:
        return updateItemsOrder(state, action);
      case `kewen-lab/items/CLEAR_${itemName}_TO_UPDATE`:
        return clearItemsToUpdate(state);
      case `kewen-lab/items/SAVE_${itemName}`:
        return saveItems(state);
      case `kewen-lab/items/SAVE_${itemName}_SUCCESS`:
        return saveItemsSuccess(state);
      case `kewen-lab/items/SAVE_${itemName}_FAILURE`:
        return saveItemsFailure(state);
      default:
        return state;
    }
  };
};

// Action Creators
// Chars
export function setLocalChars(items) {
  return {
    type: SET_LOCAL_CHARS,
    localItems: items
  };
}

export function setCurrentChars(items) {
  return {
    type: SET_CURRENT_CHARS,
    currentItems: items
  };
}

export function addNewLocalChars(itemsArray) {
  return {
    type: ADD_NEW_LOCAL_CHARS,
    itemsArray
  };
}

export function removeDeletedLocalChars(itemsArray) {
  return {
    type: REMOVE_DELETED_LOCAL_CHARS,
    itemsArray
  };
}

export function clearCharsToDelete() {
  return {
    type: CLEAR_CHARS_TO_DELETE
  };
}

export function updateCharsOrder(itemsArray) {
  return {
    type: UPDATE_CHARS_ORDER,
    itemsArray
  };
}

export function clearCharsToUpdate() {
  return {
    type: CLEAR_CHARS_TO_UPDATE
  };
}

export function setCharsVisibilityFilter(value) {
  return {
    type: SET_CHARS_VISIBILITY_FILTER,
    filter: value
  };
}

export function saveChars(data) {
  return dispatch => {
    dispatch({ type: SAVE_CHARS });
    return axios.put(`${process.env.REACT_APP_API_URL}/api/texts/${data.textId}/chars`, data);
  };
}

export function saveCharsSuccess(items) {
  return dispatch => {
    dispatch({ type: SAVE_CHARS_SUCCESS });
    dispatch(setCurrentChars(items));
    dispatch(setLocalChars(items));
    dispatch(clearCharsToDelete());
    return dispatch(clearCharsToUpdate());
  };
}

export function saveCharsFailure() {
  return {
    type: SAVE_CHARS_FAILURE
  };
}

export function refreshChars(charsArray) {
  return dispatch => {
    dispatch(removeDeletedLocalChars(charsArray));
    if (!isEmpty(charsArray)) {
      dispatch(addNewLocalChars(charsArray));
      dispatch(updateCharsOrder(charsArray));
    }
  };
}

// WORDS
export function setLocalWords(items) {
  return {
    type: SET_LOCAL_WORDS,
    localItems: items
  };
}

export function setCurrentWords(items) {
  return {
    type: SET_CURRENT_WORDS,
    currentItems: items
  };
}

export function addNewLocalWords(itemsArray) {
  return {
    type: ADD_NEW_LOCAL_WORDS,
    itemsArray
  };
}

export function removeDeletedLocalWords(itemsArray) {
  return {
    type: REMOVE_DELETED_LOCAL_WORDS,
    itemsArray
  };
}

export function clearWordsToDelete() {
  return {
    type: CLEAR_WORDS_TO_DELETE
  };
}

export function updateWordsOrder(itemsArray) {
  return {
    type: UPDATE_WORDS_ORDER,
    itemsArray
  };
}

export function clearWordsToUpdate() {
  return {
    type: CLEAR_WORDS_TO_UPDATE
  };
}

export function setWordsVisibilityFilter(value) {
  return {
    type: SET_WORDS_VISIBILITY_FILTER,
    filter: value
  };
}

export function saveWords(data) {
  return dispatch => {
    dispatch({ type: SAVE_WORDS });
    return axios.put(`${process.env.REACT_APP_API_URL}/api/texts/${data.textId}/words`, data);
  };
}

export function saveWordsSuccess(items) {
  return dispatch => {
    dispatch({ type: SAVE_WORDS_SUCCESS });
    dispatch(setCurrentWords(items));
    dispatch(setLocalWords(items));
    dispatch(clearWordsToDelete());
    dispatch(clearWordsToUpdate());
  };
}

export function saveWordsFailure() {
  return {
    type: SAVE_WORDS_FAILURE
  };
}

export function tokenize(data) {
  return () => {
    return axios.post(`${process.env.REACT_APP_API_URL}/api/tokenizer`, data);
  };
}

export function refreshWords(wordsArray) {
  return dispatch => {
    dispatch(removeDeletedLocalWords(wordsArray));
    if (!isEmpty(wordsArray)) {
      dispatch(addNewLocalWords(wordsArray));
      return dispatch(updateWordsOrder(wordsArray));
    }
    return false;
  };
}

// Selectors

export const getSaved = (state = INITIAL_STATE) => {
  return state.get('currentItems').equals(state.get('localItems'));
};

export const countChanges = (state = INITIAL_STATE) => {
  const newItems = state
    .get('localItems')
    .filter(x => x.get('id') === null);
  return state.get('itemsToDelete').size + newItems.size;
};

export const getTotalItems = (state = INITIAL_STATE) => {
  return state
    .get('currentItems')
    .toJS()
    .filter(x => x.status !== 'manuallydeleted')
    .length;
};

export const countNewItems = (state = INITIAL_STATE) => {
  return state
    .get('currentItems')
    .toJS()
    .filter(x => x.status === 'new')
    .length;
};

export const filterLocalItems = (state = INITIAL_STATE) => {
  const localItems = state
    .get('localItems')
    .toJS()
    .sort((a, b) => { return a.order - b.order; });
  switch (state.get('visibilityFilter')) {
    case 'all':
      return localItems.filter(x => x.status !== 'manuallydeleted');
    case 'new':
      return localItems.filter(x => x.status === 'new');
    case 'notnew':
      return localItems.filter(x => {
        return (
          (x.status !== 'new') &&
          (x.status !== 'notsaved') &&
          (x.status !== 'manuallydeleted')
        );
      });
    case 'notsaved':
      return localItems.filter(x => x.status === 'notsaved');
    case 'manuallydeleted':
      return localItems.filter(x => x.status === 'manuallydeleted');
    default:
      return localItems;
  }
};
