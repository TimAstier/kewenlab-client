import { List, Map, fromJS } from 'immutable';
import * as t from '../actionTypes';
import * as actions from '../actions';
import reducer, * as s from '../reducer';

// actionCreators are tested indirectly in reducer tests

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

  it('handles REMOVE_DELETED_LOCAL_CHARS', () => {
    const initialState = fromJS({
      localChars: [
        { id: 1, chinese: '我', charText: { manuallyAdded: false } },
        { id: 2, chinese: '你', charText: { manuallyAdded: false } },
        { id: null, chinese: '他', charText: { manuallyAdded: false } },
        { id: null, chinese: '火', charText: { manuallyAdded: true } },
        { id: 3, chinese: '山', charText: { manuallyAdded: true } }
      ],
      currentChars: [
        { id: 1, chinese: '我' },
        { id: 2, chinese: '你' }
      ],
      charsToDelete: [],
      visibilityFilter: 'all'
    });
    const action = actions.removeDeletedLocalChars(['你','木','水']);
    const expectedState = fromJS({
      localChars: [
        { id: 2, chinese: '你', charText: { manuallyAdded: false } }
      ],
      currentChars: [
        { id: 1, chinese: '我' },
        { id: 2, chinese: '你' }
      ],
      charsToDelete: [
        { id: 1, chinese: '我', charText: { manuallyAdded: false } }
      ],
      visibilityFilter: 'all'
    });

    expect(reducer(initialState, action)).toEqual(expectedState);
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
        { id: 3, chinese: '他', texts: [] }
      ],
      charsToDelete: [],
      visibilityFilter: 'all'
    });

    expect(s.countNewChars(state)).toEqual(2);
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
        { id: 3, chinese: '他', texts: [] }
      ],
      currentChars: [],
      charsToDelete: [],
      visibilityFilter: 'new'
    });

    expect(s.filterLocalChars(state)).toEqual([
      { id: 3, chinese: '他', texts: [] }
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

});
