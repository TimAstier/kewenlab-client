import { Map, List, fromJS } from 'immutable';

export const INITIAL_STATE = Map({
  localItems: List(),
  currentItems: List(),
  itemsToDelete: List(),
  visibilityFilter: 'all'
});

// case reducers (tested indirectly in slice reducer's test):

function setLocalItems(state, action) {
  return state.set('localItems', fromJS(action.localItems));
}

function setCurrentItems(state, action) {
  return state.set('currentItems', fromJS(action.currentItems));
}

function clearItemsToDelete(state) {
  return state.set('itemsToDelete', List());
}

function setItemsVisibilityFilter(state, action) {
  return state.set('visibilityFilter', action.filter);
}

// Idea: use the position in the array to determine the order?
function addNewLocalItems(state, action) {
  const newItems = [];
  const localItems = state
    .get('localItems')
    .toJS()
    .map(e => e.chinese);
  action.itemsArray.forEach((item, i) => {
    const localIndex = localItems.indexOf(item);
    if (localIndex < 0) {
      newItems.push({ id: null, chinese: item, order: i });
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

// high-order reducer:
export default (itemName = '') => {
  // slice reducer:
  return function itemsArea(state = INITIAL_STATE, action) {
    switch (action.type) {
      case `SET_LOCAL_${itemName}`:
        return setLocalItems(state, action);
      case `SET_CURRENT_${itemName}`:
        return setCurrentItems(state, action);
      case `CLEAR_${itemName}_TO_DELETE`:
        return clearItemsToDelete(state);
      case `SET_${itemName}_VISIBILITY_FILTER`:
        return setItemsVisibilityFilter(state, action);
      case `ADD_NEW_LOCAL_${itemName}`:
        return addNewLocalItems(state, action);
      case `REMOVE_DELETED_LOCAL_${itemName}`:
        return removeDeletedLocalItems(state, action);
      default:
        return state;
    }
  };
};
