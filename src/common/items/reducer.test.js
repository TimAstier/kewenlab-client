import { List, Map, fromJS } from 'immutable';
import * as charsActions from '../../charsArea/actions';
import * as wordsActions from '../../wordsArea/actions';
import createItemsReducerWithNamedType from './reducer';

const charsReducer = createItemsReducerWithNamedType('CHARS');
const wordsReducer = createItemsReducerWithNamedType('WORDS');

// Those tests are for chars and words
// actionCreators are tested indirectly
// high-order reducer is tested indirectly
describe('items reducer', () => {
  it('returns initial state', () => {
    expect(charsReducer(undefined, {})).toEqual(Map({
      localItems: List([]),
      currentItems: List([]),
      itemsToDelete: List([]),
      itemsToUpdate: List([]),
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
    }];
    const charsAction = charsActions.setLocalChars(items);
    const wordsAction = wordsActions.setLocalWords(items);
    const expectedState = Map({
      localItems: fromJS(items),
      currentItems: List(),
      itemsToDelete: List(),
      visibilityFilter: 'all'
    });

    expect(charsReducer(initialState, charsAction)).toEqual(expectedState);
    expect(wordsReducer(initialState, wordsAction)).toEqual(expectedState);
  });

  it('SET_CURRENT_ITEMS in the right order', () => {
    const initialState = Map({
      localItems: List(),
      currentItems: List(),
      itemsToDelete: List(),
      visibilityFilter: 'all'
    });
    const items = [{
      id: 1,
      chinese: '三',
      order: 2
    }, {
      id: 2,
      chinese: '一',
      order: 0
    }, {
      id: 3,
      chinese: '二',
      order: 1
    }];
    const charsAction = charsActions.setLocalChars(items);
    const wordsAction = wordsActions.setLocalWords(items);
    const expectedState = Map({
      localItems: fromJS([
        {
          id: 2,
          chinese: '一',
          order: 0
        }, {
          id: 3,
          chinese: '二',
          order: 1
        }, {
          id: 1,
          chinese: '三',
          order: 2
        }
      ]),
      currentItems: List(),
      itemsToDelete: List(),
      visibilityFilter: 'all'
    });
    expect(charsReducer(initialState, charsAction)).toEqual(expectedState);
    expect(wordsReducer(initialState, wordsAction)).toEqual(expectedState);
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
    }];
    const charsAction = charsActions.setCurrentChars(items);
    const wordsAction = wordsActions.setCurrentWords(items);
    const expectedState = Map({
      localItems: List(),
      currentItems: fromJS(items),
      itemsToDelete: List(),
      visibilityFilter: 'all'
    });

    expect(charsReducer(initialState, charsAction)).toEqual(expectedState);
    expect(wordsReducer(initialState, wordsAction)).toEqual(expectedState);
  });

  it('SET_CURRENT_ITEMS in the right order', () => {
    const initialState = Map({
      localItems: List(),
      currentItems: List(),
      itemsToDelete: List(),
      visibilityFilter: 'all'
    });
    const items = [{
      id: 1,
      chinese: '三',
      order: 2
    }, {
      id: 2,
      chinese: '一',
      order: 0
    }, {
      id: 3,
      chinese: '二',
      order: 1
    }];
    const charsAction = charsActions.setCurrentChars(items);
    const wordsAction = wordsActions.setCurrentWords(items);
    const expectedState = Map({
      localItems: List(),
      currentItems: fromJS([
        {
          id: 2,
          chinese: '一',
          order: 0
        }, {
          id: 3,
          chinese: '二',
          order: 1
        }, {
          id: 1,
          chinese: '三',
          order: 2
        }
      ]),
      itemsToDelete: List(),
      visibilityFilter: 'all'
    });
    expect(charsReducer(initialState, charsAction)).toEqual(expectedState);
    expect(wordsReducer(initialState, wordsAction)).toEqual(expectedState);
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
    const charsAction = charsActions.clearCharsToDelete();
    const wordsAction = wordsActions.clearWordsToDelete();
    const expectedState = Map({
      localItems: List(),
      currentItems: List(),
      itemsToDelete: List(),
      visibilityFilter: 'all'
    });

    expect(charsReducer(initialState, charsAction)).toEqual(expectedState);
    expect(wordsReducer(initialState, wordsAction)).toEqual(expectedState);
  });

  it('handles SET_ITEMS_VISIBILITY_FILTER', () => {
    const initialState = Map({
      localItems: List(),
      currentItems: List(),
      itemsToDelete: List(),
      visibilityFilter: 'all'
    });
    const charsAction = charsActions.setCharsVisibilityFilter('new');
    const wordsAction = wordsActions.setWordsVisibilityFilter('new');
    const expectedState = Map({
      localItems: List(),
      currentItems: List(),
      itemsToDelete: List(),
      visibilityFilter: 'new'
    });

    expect(charsReducer(initialState, charsAction)).toEqual(expectedState);
    expect(wordsReducer(initialState, wordsAction)).toEqual(expectedState);
  });

  describe('ADD_NEW_LOCAL_ITEMS', () => {
    it('adds new items to localItems with the correct order', () => {
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
      const charsAction = charsActions.addNewLocalChars(['你', '木', '水']);
      const wordsAction = wordsActions.addNewLocalWords(['你', '木', '水']);
      const expectedState = fromJS({
        localItems: [
          { id: 1, chinese: '我' },
          { id: 2, chinese: '你' },
          { id: null, chinese: '他' },
          { id: null, chinese: '木', order: 1 },
          { id: null, chinese: '水', order: 2 }
        ],
        currentItems: [
          { id: 1, chinese: '我' },
          { id: 2, chinese: '你' }
        ],
        itemsToDelete: [],
        visibilityFilter: 'all'
      });

      expect(charsReducer(initialState, charsAction)).toEqual(expectedState);
      expect(wordsReducer(initialState, wordsAction)).toEqual(expectedState);
    });
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
      const charsAction = charsActions.removeDeletedLocalChars([]);
      const wordsAction = wordsActions.removeDeletedLocalWords([]);
      const expectedState = fromJS({
        localItems: [],
        currentItems: [],
        itemsToDelete: [
          { id: 1, chinese: '我', manuallyAdded: false, manuallyDeleted: false }
        ],
        visibilityFilter: 'all'
      });

      expect(charsReducer(initialState, charsAction)).toEqual(expectedState);
      expect(wordsReducer(initialState, wordsAction)).toEqual(expectedState);
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
      const charsAction = charsActions.removeDeletedLocalChars([]);
      const wordsAction = wordsActions.removeDeletedLocalWords([]);
      const expectedState = fromJS({
        localItems: [],
        currentItems: [],
        itemsToDelete: [
          { id: 1, chinese: '三', manuallyAdded: false, manuallyDeleted: false }
        ],
        visibilityFilter: 'all'
      });

      expect(charsReducer(initialState, charsAction)).toEqual(expectedState);
      expect(wordsReducer(initialState, wordsAction)).toEqual(expectedState);
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
      const charsAction = charsActions.removeDeletedLocalChars([]);
      const wordsAction = wordsActions.removeDeletedLocalWords([]);
      const expectedState = fromJS({
        localItems: [
          { id: 1, chinese: '我', manuallyAdded: true, manuallyDeleted: false }
        ],
        currentItems: [],
        itemsToDelete: [],
        visibilityFilter: 'all'
      });

      expect(charsReducer(initialState, charsAction)).toEqual(expectedState);
      expect(wordsReducer(initialState, wordsAction)).toEqual(expectedState);
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
      const charsAction = charsActions.removeDeletedLocalChars([]);
      const wordsAction = wordsActions.removeDeletedLocalWords([]);
      const expectedState = fromJS({
        localItems: [
          { id: 1, chinese: '我', manuallyAdded: false, manuallyDeleted: true }
        ],
        currentItems: [],
        itemsToDelete: [],
        visibilityFilter: 'all'
      });

      expect(charsReducer(initialState, charsAction)).toEqual(expectedState);
      expect(wordsReducer(initialState, wordsAction)).toEqual(expectedState);
    });
  });

  describe('UPDATE_ITEMS_ORDER', () => {
    it('updates local order', () => {
      const initialState = fromJS({
        localItems: [
          { id: 3, chinese: '一', order: 0 },
          { id: 2, chinese: '二', order: 1 },
          { id: 1, chinese: '三', order: 2 }
        ],
        currentItems: [],
        itemsToDelete: [],
        itemsToUpdate: [],
        visibilityFilter: 'all'
      });
      const itemsArray = ['三', '一', '二'];
      const charsAction = charsActions.updateCharsOrder(itemsArray);
      const expectedState = fromJS({
        localItems: [
          { id: 3, chinese: '一', order: 1 },
          { id: 2, chinese: '二', order: 2 },
          { id: 1, chinese: '三', order: 0 }
        ],
        currentItems: [],
        itemsToDelete: [],
        itemsToUpdate: [],
        visibilityFilter: 'all'
      });

      expect(charsReducer(initialState, charsAction)).toEqual(expectedState);
    });

    it('adds new-ordered-saved items to itemsToUpdate', () => {
      const initialState = fromJS({
        localItems: [
          { id: null, chinese: '一', order: 0 },
          { id: 0, chinese: '二', order: 1 },
          { id: 1, chinese: '三', order: 2 }
        ],
        currentItems: [
          { id: 0, chinese: '二', order: 1 },
          { id: 1, chinese: '三', order: 0 }
        ],
        itemsToUpdate: []
      });
      const itemsArray = ['三', '二', '一'];
      const charsAction = charsActions.updateCharsOrder(itemsArray);
      const expectedState = fromJS({
        localItems: [
          { id: null, chinese: '一', order: 2 },
          { id: 0, chinese: '二', order: 1 },
          { id: 1, chinese: '三', order: 0 }
        ],
        currentItems: [
          { id: 0, chinese: '二', order: 1 },
          { id: 1, chinese: '三', order: 0 }
        ],
        itemsToUpdate: [
          { id: 1, chinese: '三', order: 0 }
        ]
      });

      expect(charsReducer(initialState, charsAction)).toEqual(expectedState);
    });

    it('does not create duplicates in itemsToUpdate', () => {
      const initialState = fromJS({
        localItems: [
          { id: null, chinese: '一', order: 0 },
          { id: 0, chinese: '二', order: 1 },
          { id: 1, chinese: '三', order: 2 }
        ],
        currentItems: [
          { id: 0, chinese: '二', order: 1 },
          { id: 1, chinese: '三', order: 0 }
        ],
        itemsToUpdate: [{ id: 1, chinese: '三', order: 2 }]
      });
      const itemsArray = ['三', '二', '一'];
      const charsAction = charsActions.updateCharsOrder(itemsArray);
      const expectedState = fromJS({
        localItems: [
          { id: null, chinese: '一', order: 2 },
          { id: 0, chinese: '二', order: 1 },
          { id: 1, chinese: '三', order: 0 }
        ],
        currentItems: [
          { id: 0, chinese: '二', order: 1 },
          { id: 1, chinese: '三', order: 0 }
        ],
        itemsToUpdate: [
          { id: 1, chinese: '三', order: 0 }
        ]
      });

      expect(charsReducer(initialState, charsAction)).toEqual(expectedState);
    });
  });

  it('handles CLEAR_ITEMS_TO_UPDATE', () => {
    const initialState = fromJS({
      itemsToUpdate: ['a', 'b', 'c']
    });
    const charsAction = charsActions.clearCharsToUpdate();
    const expectedState = fromJS({
      itemsToUpdate: []
    });

    expect(charsReducer(initialState, charsAction)).toEqual(expectedState);
  });
});
