import { List, Map, fromJS } from 'immutable';
import * as t from '../actionTypes';
import * as actions from '../actions';
import reducer, * as s from '../reducer';

// actionCreators are tested indirectly in reducer tests
// Note: the duplicated wordsArea tests are not maintained
// TODO: Remove duplicted wordsArea reducer's tests after the refactoring

describe('charsArea reducer', () => {

  it('returns initial state', () => {
    expect(reducer(undefined, {})).toEqual(Map({
      localChars: List([]),
      currentChars: List([]),
      charsToDelete: List([]),
      visibilityFilter: 'all'
    }));
  });

  it('handles SET_LOCAL_CHARS', () => {
    const initialState = Map({
      localChars: List(),
      currentChars: List(),
      charsToDelete: List(),
      visibilityFilter: 'all'
    });
    const chars = [{
        id: 1,
        chinese: '我',
        texts: [],
        charText: { id: 1, textId: 1, charId: 1, order: 1 }
      }, {
        id: 2,
        chinese: '你',
        texts: [],
        charText: { id: 2, textId: 1, charId: 2, order: 2 }
      }
    ];
    const action = actions.setLocalChars(chars);
    const expectedState = Map({
      localChars: fromJS(chars),
      currentChars: List(),
      charsToDelete: List(),
      visibilityFilter: 'all'
    });

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('handles SET_CURRENT_CHARS', () => {
    const initialState = Map({
      localChars: List(),
      currentChars: List(),
      charsToDelete: List(),
      visibilityFilter: 'all'
    });
    const chars = [{
        id: 1,
        chinese: '我',
        texts: [],
        charText: { id: 1, textId: 1, charId: 1, order: 1 }
      }, {
        id: 2,
        chinese: '你',
        texts: [],
        charText: { id: 2, textId: 1, charId: 2, order: 2 }
      }
    ];
    const action = actions.setCurrentChars(chars);
    const expectedState = Map({
      localChars: List(),
      currentChars: fromJS(chars),
      charsToDelete: List(),
      visibilityFilter: 'all'
    });

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('handles CLEAR_CHARS_TO_DELETE', () => {
    const initialState = Map({
      localChars: List(),
      currentChars: List(),
      charsToDelete: List([{
          id: 1,
          chinese: '我',
          texts: [],
          charText: { id: 1, textId: 1, charId: 1, order: 1 }
        }, {
          id: 2,
          chinese: '你',
          texts: [],
          charText: { id: 2, textId: 1, charId: 2, order: 2 }
        }]),
      visibilityFilter: 'all'
    });
    const action = actions.clearCharsToDelete();
    const expectedState = Map({
      localChars: List(),
      currentChars: List(),
      charsToDelete: List(),
      visibilityFilter: 'all'
    });

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('handles SET_CHAR_VISIBILITY_FILTER', () => {
    const initialState = Map({
      localChars: List(),
      currentChars: List(),
      charsToDelete: List(),
      visibilityFilter: 'all'
    });
    const action = actions.setVisibilityFilter('new');
    const expectedState = Map({
      localChars: List(),
      currentChars: List(),
      charsToDelete: List(),
      visibilityFilter: 'new'
    });

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('handles ADD_NEW_LOCAL_CHARS', () => {
    const initialState = fromJS({
      localChars: [
        { id: 1, chinese: '我' },
        { id: 2, chinese: '你' },
        { id: null, chinese: '他' }
      ],
      currentChars: [
        { id: 1, chinese: '我' },
        { id: 2, chinese: '你' }
      ],
      charsToDelete: [],
      visibilityFilter: 'all'
    });
    const action = actions.addNewLocalChars(['你','木','水']);
    const expectedState = fromJS({
      localChars: [
        { id: 1, chinese: '我' },
        { id: 2, chinese: '你' },
        { id: null, chinese: '他' },
        { id: null, chinese: '木' },
        { id: null, chinese: '水' }
      ],
      currentChars: [
        { id: 1, chinese: '我' },
        { id: 2, chinese: '你' }
      ],
      charsToDelete: [],
      visibilityFilter: 'all'
    });

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  describe('REMOVE_DELETED_LOCAL_CHARS', () => {

    it('removes chars from localChars and add them to charsToDelete', () => {
      const initialState = fromJS({
        localChars: [
          { id: 1, chinese: '我', charText: { manuallyAdded: false, manuallyDeleted: false } }
        ],
        currentChars: [],
        charsToDelete: [],
        visibilityFilter: 'all'
      });
      // Simulates when a user deletes everything in the text input:
      const action = actions.removeDeletedLocalChars([]);
      const expectedState = fromJS({
        localChars: [],
        currentChars: [],
        charsToDelete: [
          { id: 1, chinese: '我', charText: { manuallyAdded: false, manuallyDeleted: false } }
        ],
        visibilityFilter: 'all'
      });

      expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('does not add localChars to charsToDelete', () => {
      const initialState = fromJS({
        localChars: [
          // a standard localChar
          { id: null, chinese: '二' },
          // a weird localChar
          { id: null, chinese: '一', charText: { manuallyAdded: false, manuallyDeleted: false } },
          // another weird localChar
          { id: 1, chinese: '二' },
          // a localChar that is in currentChars
          { id: 1, chinese: '三', charText: { manuallyAdded: false, manuallyDeleted: false } }
        ],
        currentChars: [],
        charsToDelete: [],
        visibilityFilter: 'all'
      });
      // Simulates when a user deletes everything in the text input:
      const action = actions.removeDeletedLocalChars([]);
      const expectedState = fromJS({
        localChars: [],
        currentChars: [],
        charsToDelete: [
          { id: 1, chinese: '三', charText: { manuallyAdded: false, manuallyDeleted: false } }
        ],
        visibilityFilter: 'all'
      });

      expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('does not do anything with manuallyAdded chars', () => {
      const initialState = fromJS({
        localChars: [
          { id: 1, chinese: '我', charText: { manuallyAdded: true, manuallyDeleted: false } }
        ],
        currentChars: [],
        charsToDelete: [],
        visibilityFilter: 'all'
      });
      // Simulates when a user deletes everything in the text input:
      const action = actions.removeDeletedLocalChars([]);
      const expectedState = fromJS({
        localChars: [
          { id: 1, chinese: '我', charText: { manuallyAdded: true, manuallyDeleted: false } }
        ],
        currentChars: [],
        charsToDelete: [],
        visibilityFilter: 'all'
      });

      expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('does not do anything with manuallyDeleted chars', () => {
      const initialState = fromJS({
        localChars: [
          { id: 1, chinese: '我', charText: { manuallyAdded: false, manuallyDeleted: true } }
        ],
        currentChars: [],
        charsToDelete: [],
        visibilityFilter: 'all'
      });
      // Simulates when a user deletes everything in the text input:
      const action = actions.removeDeletedLocalChars([]);
      const expectedState = fromJS({
        localChars: [
          { id: 1, chinese: '我', charText: { manuallyAdded: false, manuallyDeleted: true } }
        ],
        currentChars: [],
        charsToDelete: [],
        visibilityFilter: 'all'
      });

      expect(reducer(initialState, action)).toEqual(expectedState);
    });

  });

});

describe('charsArea selectors', () => {

  it('getSaved returns false', () => {
    const state = fromJS({
      localChars: [
        { id: 1, chinese: '我' },
        { id: 2, chinese: '你' },
        { id: null, chinese: '他' }
      ],
      currentChars: [
        { id: 1, chinese: '我' },
        { id: 2, chinese: '你' }
      ],
      charsToDelete: [],
      visibilityFilter: 'all'
    });

    expect(s.getSaved(state)).toEqual(false);
  });

  it('getSaved returns true', () => {
    const state = fromJS({
      localChars: [
        { id: 1, chinese: '我' },
        { id: 2, chinese: '你' }
      ],
      currentChars: [
        { id: 1, chinese: '我' },
        { id: 2, chinese: '你' }
      ],
      charsToDelete: [],
      visibilityFilter: 'all'
    });

    expect(s.getSaved(state)).toEqual(true);
  });

  it('countChanges', () => {
    const state = fromJS({
      localChars: [
        { id: 1, chinese: '我' },
        { id: null, chinese: '他' },
        { id: null, chinese: '木' },
        { id: null, chinese: '水' }
      ],
      currentChars: [
        { id: 1, chinese: '我' },
        { id: 2, chinese: '你' }
      ],
      charsToDelete: [{ id: 2, chinese: '你' }],
      visibilityFilter: 'all'
    });

    expect(s.countChanges(state)).toEqual(4);
  });

  it('getTotalChars', () => {
    const state = fromJS({
      localChars: [
        { id: 1, chinese: '我' },
        { id: null, chinese: '他' },
        { id: null, chinese: '木' }
      ],
      currentChars: [
        { id: 1, chinese: '我' },
        { id: 2, chinese: '你' }
      ],
      charsToDelete: [{ id: 2, chinese: '你' }],
      visibilityFilter: 'all'
    });

    expect(s.getTotalChars(state)).toEqual(2);
  });

  it('countNewChars', () => {
    const state = fromJS({
      localChars: [],
      currentChars: [
        { id: 1, chinese: '我', texts: [] },
        { id: 2, chinese: '你', texts: [{ title: 'Lesson 1' }] },
        { id: 3, chinese: '谁', charText: { manuallyAdded: true } },
        { id: 4, chinese: '说', charText: { manuallyDeleted: true } }
      ],
      charsToDelete: [],
      visibilityFilter: 'all'
    });

    expect(s.countNewChars(state)).toEqual(3);
  });

  it('filterLocalChars with "all" visibilityFilter', () => {
    const state = fromJS({
      localChars: [
        { id: null, chinese: '我' },
        { id: 2, chinese: '你', texts: [{ title: 'Lesson 1' }] },
        { id: 3, chinese: '他', texts: [] }
      ],
      currentChars: [],
      charsToDelete: [],
      visibilityFilter: 'all'
    });

    expect(s.filterLocalChars(state)).toEqual([
      { id: null, chinese: '我' },
      { id: 2, chinese: '你', texts: [{ title: 'Lesson 1' }] },
      { id: 3, chinese: '他', texts: [] }
    ]);
  });

  it('filterLocalChars with "new" visibilityFilter', () => {
    const state = fromJS({
      localChars: [
        { id: null, chinese: '我' },
        { id: 2, chinese: '你', texts: [{ title: 'Lesson 1' }] },
        { id: 3, chinese: '他', texts: [], charText: { manuallyAdded: false } }
      ],
      currentChars: [],
      charsToDelete: [],
      visibilityFilter: 'new'
    });

    expect(s.filterLocalChars(state)).toEqual([
      { id: 3, chinese: '他', texts: [], charText: { manuallyAdded: false } }
    ]);
  });

  it('filterLocalChars with "notnew" visibilityFilter', () => {
    const state = fromJS({
      localChars: [
        { id: null, chinese: '我' },
        { id: 2, chinese: '你', texts: [{ title: 'Lesson 1' }] },
        { id: 3, chinese: '他', texts: [] }
      ],
      currentChars: [],
      charsToDelete: [],
      visibilityFilter: 'notnew'
    });

    expect(s.filterLocalChars(state)).toEqual([
      { id: 2, chinese: '你', texts: [{ title: 'Lesson 1' }] }
    ]);
  });

  it('filterLocalChars with "notsaved" visibilityFilter', () => {
    const state = fromJS({
      localChars: [
        { id: null, chinese: '我' },
        { id: 2, chinese: '你', texts: [{ title: 'Lesson 1' }] },
        { id: 3, chinese: '他', texts: [] }
      ],
      currentChars: [],
      charsToDelete: [],
      visibilityFilter: 'notsaved'
    });

    expect(s.filterLocalChars(state)).toEqual([
      { id: null, chinese: '我' }
    ]);
  });

  it('filterLocalChars with "manuallydeleted" visibilityFilter', () => {
    const state = fromJS({
      localChars: [
        { id: null, chinese: '我' },
        { id: 2,
          chinese: '你',
          texts: [{ title: 'Lesson 1' }],
          charText: { manuallyDeleted: true }
        },
        { id: 3, chinese: '他', texts: [], charText: { manuallyDeleted: false } }
      ],
      currentChars: [],
      charsToDelete: [],
      visibilityFilter: 'manuallydeleted'
    });

    expect(s.filterLocalChars(state)).toEqual([
      { id: 2,
        chinese: '你',
        texts: [{ title: 'Lesson 1' }],
        charText: { manuallyDeleted: true }
      }
    ]);
  });

});
