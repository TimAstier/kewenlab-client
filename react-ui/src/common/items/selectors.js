import { defineStatus } from '../../utils/custom';
import { INITIAL_STATE } from './reducer';

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
    .filter(x => defineStatus(x) !== 'manuallydeleted')
    .length;
};

export const countNewItems = (state = INITIAL_STATE) => {
  return state
    .get('currentItems')
    .toJS()
    .filter(x => defineStatus(x) === 'new')
    .length;
};

export const filterLocalItems = (state = INITIAL_STATE) => {
  const localItems = state
    .get('localItems')
    .toJS()
    .sort((a, b) => { return a.order - b.order; });
  switch (state.get('visibilityFilter')) {
    case 'all':
      return localItems.filter(x => defineStatus(x) !== 'manuallydeleted');
    case 'new':
      return localItems.filter(x => defineStatus(x) === 'new');
    case 'notnew':
      return localItems.filter(x => {
        return (
          (defineStatus(x) !== 'new') &&
          (defineStatus(x) !== 'notsaved') &&
          (defineStatus(x) !== 'manuallydeleted')
        );
      });
    case 'notsaved':
      return localItems.filter(x => defineStatus(x) === 'notsaved');
    case 'manuallydeleted':
      return localItems.filter(x => defineStatus(x) === 'manuallydeleted');
    default:
      return localItems;
  }
};
