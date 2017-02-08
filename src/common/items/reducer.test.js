import { List, Map, fromJS } from 'immutable';
import * as actions from '../../charsArea/actions';
import createItemsReducerWithNamedType from './reducer';

const charsReducer = createItemsReducerWithNamedType('CHARS');

// actionCreators are tested indirectly in reducer tests

describe('items reducer', () => {

  it('returns initial state', () => {
    expect(charsReducer(undefined, {})).toEqual(Map({
      localItems: List([]),
      currentItems: List([]),
      itemsToDelete: List([]),
      visibilityFilter: 'all'
    }));
  });

  it('handles SET_LOCAL_ITEMS', () => {
    const initialState = Map({
      localItems: List(),
      currentItems: List(),
      itemsToDelete: List(),
      visibilityFilter: 'all'
    });
    const items = [{
        id: 1,
        chinese: '我',
        texts: []
      }, {
        id: 2,
        chinese: '你',
        texts: []
      }
    ];
    const action = actions.setLocalChars(items);
    const expectedState = Map({
      localItems: fromJS(items),
      currentItems: List(),
      itemsToDelete: List(),
      visibilityFilter: 'all'
    });

    expect(charsReducer(initialState, action)).toEqual(expectedState);
  });

  it('handles SET_CURRENT_ITEMS', () => {
    const initialState = Map({
      localItems: List(),
      currentItems: List(),
      itemsToDelete: List(),
      visibilityFilter: 'all'
    });
    const items = [{
        id: 1,
        chinese: '我',
        texts: []
      }, {
        id: 2,
        chinese: '你',
        texts: []
      }
    ];
    const action = actions.setCurrentChars(items);
    const expectedState = Map({
      localItems: List(),
      currentItems: fromJS(items),
      itemsToDelete: List(),
      visibilityFilter: 'all'
    });

    expect(charsReducer(initialState, action)).toEqual(expectedState);
  });

  it('handles CLEAR_ITEMS_TO_DELETE', () => {
    const initialState = Map({
      localItems: List(),
      currentItems: List(),
      itemsToDelete: List([{
          id: 1,
          chinese: '我',
          texts: []
        }, {
          id: 2,
          chinese: '你',
          texts: []
        }]),
      visibilityFilter: 'all'
    });
    const action = actions.clearCharsToDelete();
    const expectedState = Map({
      localItems: List(),
      currentItems: List(),
      itemsToDelete: List(),
      visibilityFilter: 'all'
    });

    expect(charsReducer(initialState, action)).toEqual(expectedState);
  });

  it('handles SET_ITEMS_VISIBILITY_FILTER', () => {
    const initialState = Map({
      localItems: List(),
      currentItems: List(),
      itemsToDelete: List(),
      visibilityFilter: 'all'
    });
    const action = actions.setCharsVisibilityFilter('new');
    const expectedState = Map({
      localItems: List(),
      currentItems: List(),
      itemsToDelete: List(),
      visibilityFilter: 'new'
    });

    expect(charsReducer(initialState, action)).toEqual(expectedState);
  });

  it('handles ADD_NEW_LOCAL_ITEMS', () => {
    const initialState = fromJS({
      localItems: [
        { id: 1, chinese: '我' },
        { id: 2, chinese: '你' },
        { id: null, chinese: '他' }
      ],
      currentItems: [
        { id: 1, chinese: '我' },
        { id: 2, chinese: '你' }
      ],
      itemsToDelete: [],
      visibilityFilter: 'all'
    });
    const action = actions.addNewLocalChars(['你','木','水']);
    const expectedState = fromJS({
      localItems: [
        { id: 1, chinese: '我' },
        { id: 2, chinese: '你' },
        { id: null, chinese: '他' },
        { id: null, chinese: '木' },
        { id: null, chinese: '水' }
      ],
      currentItems: [
        { id: 1, chinese: '我' },
        { id: 2, chinese: '你' }
      ],
      itemsToDelete: [],
      visibilityFilter: 'all'
    });

    expect(charsReducer(initialState, action)).toEqual(expectedState);
  });

  describe('REMOVE_DELETED_LOCAL_ITEMS', () => {

    it('removes items from localItems and add them to itemsToDelete', () => {
      const initialState = fromJS({
        localItems: [
          { id: 1, chinese: '我', manuallyAdded: false, manuallyDeleted: false }
        ],
        currentItems: [],
        itemsToDelete: [],
        visibilityFilter: 'all'
      });
      // Simulates when a user deletes everything in the text input:
      const action = actions.removeDeletedLocalChars([]);
      const expectedState = fromJS({
        localItems: [],
        currentItems: [],
        itemsToDelete: [
          { id: 1, chinese: '我', manuallyAdded: false, manuallyDeleted: false }
        ],
        visibilityFilter: 'all'
      });

      expect(charsReducer(initialState, action)).toEqual(expectedState);
    });

    it('does not add localItems to itemsToDelete', () => {
      const initialState = fromJS({
        localItems: [
          // a localItem
          { id: null, chinese: '二' },
          // a localItem that is in currentItems
          { id: 1, chinese: '三', manuallyAdded: false, manuallyDeleted: false }
        ],
        currentItems: [],
        itemsToDelete: [],
        visibilityFilter: 'all'
      });
      // Simulates when a user deletes everything in the text input:
      const action = actions.removeDeletedLocalChars([]);
      const expectedState = fromJS({
        localItems: [],
        currentItems: [],
        itemsToDelete: [
          { id: 1, chinese: '三', manuallyAdded: false, manuallyDeleted: false }
        ],
        visibilityFilter: 'all'
      });

      expect(charsReducer(initialState, action)).toEqual(expectedState);
    });

    it('does not do anything with manuallyAdded items', () => {
      const initialState = fromJS({
        localItems: [
          { id: 1, chinese: '我', manuallyAdded: true, manuallyDeleted: false }
        ],
        currentItems: [],
        itemsToDelete: [],
        visibilityFilter: 'all'
      });
      // Simulates when a user deletes everything in the text input:
      const action = actions.removeDeletedLocalChars([]);
      const expectedState = fromJS({
        localItems: [
          { id: 1, chinese: '我', manuallyAdded: true, manuallyDeleted: false }
        ],
        currentItems: [],
        itemsToDelete: [],
        visibilityFilter: 'all'
      });

      expect(charsReducer(initialState, action)).toEqual(expectedState);
    });

    it('does not do anything with manuallyDeleted items', () => {
      const initialState = fromJS({
        localItems: [
          { id: 1, chinese: '我', manuallyAdded: false, manuallyDeleted: true }
        ],
        currentItems: [],
        itemsToDelete: [],
        visibilityFilter: 'all'
      });
      // Simulates when a user deletes everything in the text input:
      const action = actions.removeDeletedLocalChars([]);
      const expectedState = fromJS({
        localItems: [
          { id: 1, chinese: '我', manuallyAdded: false, manuallyDeleted: true }
        ],
        currentItems: [],
        itemsToDelete: [],
        visibilityFilter: 'all'
      });

      expect(charsReducer(initialState, action)).toEqual(expectedState);
    });

  });

});
