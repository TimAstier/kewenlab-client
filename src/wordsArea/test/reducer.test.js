import { List, Map, fromJS } from 'immutable';
import * as t from '../actionTypes';
import * as actions from '../actions';
import reducer, * as s from '../reducer';

// Not maintained, see charsArea reducer's test

describe('wordsArea reducer', () => {

  it('returns initial state', () => {
    expect(reducer(undefined, {})).toEqual(Map({
      localWords: List([]),
      currentWords: List([]),
      wordsToDelete: List([]),
      visibilityFilter: 'all'
    }));
  });

  it('handles SET_LOCAL_WORDS', () => {
    const initialState = Map({
      localWords: List(),
      currentWords: List(),
      wordsToDelete: List(),
      visibilityFilter: 'all'
    });
    const words = [{
        id: 1,
        chinese: '我',
        texts: [],
        wordText: { id: 1, textId: 1, wordId: 1, order: 1 }
      }, {
        id: 2,
        chinese: '你',
        texts: [],
        wordText: { id: 2, textId: 1, wordId: 2, order: 2 }
      }
    ];
    const action = actions.setLocalWords(words);
    const expectedState = Map({
      localWords: fromJS(words),
      currentWords: List(),
      wordsToDelete: List(),
      visibilityFilter: 'all'
    });

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('handles SET_CURRENT_WORDS', () => {
    const initialState = Map({
      localWords: List(),
      currentWords: List(),
      wordsToDelete: List(),
      visibilityFilter: 'all'
    });
    const words = [{
        id: 1,
        chinese: '我',
        texts: [],
        wordText: { id: 1, textId: 1, wordId: 1, order: 1 }
      }, {
        id: 2,
        chinese: '你',
        texts: [],
        wordText: { id: 2, textId: 1, wordId: 2, order: 2 }
      }
    ];
    const action = actions.setCurrentWords(words);
    const expectedState = Map({
      localWords: List(),
      currentWords: fromJS(words),
      wordsToDelete: List(),
      visibilityFilter: 'all'
    });

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('handles CLEAR_WORDS_TO_DELETE', () => {
    const initialState = Map({
      localWords: List(),
      currentWords: List(),
      wordsToDelete: List([{
          id: 1,
          chinese: '我',
          texts: [],
          wordText: { id: 1, textId: 1, wordId: 1, order: 1 }
        }, {
          id: 2,
          chinese: '你',
          texts: [],
          wordText: { id: 2, textId: 1, wordId: 2, order: 2 }
        }]),
      visibilityFilter: 'all'
    });
    const action = actions.clearWordsToDelete();
    const expectedState = Map({
      localWords: List(),
      currentWords: List(),
      wordsToDelete: List(),
      visibilityFilter: 'all'
    });

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('handles SET_WORD_VISIBILITY_FILTER', () => {
    const initialState = Map({
      localWords: List(),
      currentWords: List(),
      wordsToDelete: List(),
      visibilityFilter: 'all'
    });
    const action = actions.setVisibilityFilter('new');
    const expectedState = Map({
      localWords: List(),
      currentWords: List(),
      wordsToDelete: List(),
      visibilityFilter: 'new'
    });

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('handles ADD_NEW_LOCAL_WORDS', () => {
    const initialState = fromJS({
      localWords: [
        { id: 1, chinese: '我' },
        { id: 2, chinese: '你' },
        { id: null, chinese: '他' }
      ],
      currentWords: [
        { id: 1, chinese: '我' },
        { id: 2, chinese: '你' }
      ],
      wordsToDelete: [],
      visibilityFilter: 'all'
    });
    const action = actions.addNewLocalWords(['你','木','水']);
    const expectedState = fromJS({
      localWords: [
        { id: 1, chinese: '我' },
        { id: 2, chinese: '你' },
        { id: null, chinese: '他' },
        { id: null, chinese: '木' },
        { id: null, chinese: '水' }
      ],
      currentWords: [
        { id: 1, chinese: '我' },
        { id: 2, chinese: '你' }
      ],
      wordsToDelete: [],
      visibilityFilter: 'all'
    });

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

});

describe('wordsArea selectors', () => {

  it('getSaved returns false', () => {
    const state = fromJS({
      localWords: [
        { id: 1, chinese: '我' },
        { id: 2, chinese: '你' },
        { id: null, chinese: '他' }
      ],
      currentWords: [
        { id: 1, chinese: '我' },
        { id: 2, chinese: '你' }
      ],
      wordsToDelete: [],
      visibilityFilter: 'all'
    });

    expect(s.getSaved(state)).toEqual(false);
  });

  it('getSaved returns true', () => {
    const state = fromJS({
      localWords: [
        { id: 1, chinese: '我' },
        { id: 2, chinese: '你' }
      ],
      currentWords: [
        { id: 1, chinese: '我' },
        { id: 2, chinese: '你' }
      ],
      wordsToDelete: [],
      visibilityFilter: 'all'
    });

    expect(s.getSaved(state)).toEqual(true);
  });

  it('countChanges', () => {
    const state = fromJS({
      localWords: [
        { id: 1, chinese: '我' },
        { id: null, chinese: '他' },
        { id: null, chinese: '木' },
        { id: null, chinese: '水' }
      ],
      currentWords: [
        { id: 1, chinese: '我' },
        { id: 2, chinese: '你' }
      ],
      wordsToDelete: [{ id: 2, chinese: '你' }],
      visibilityFilter: 'all'
    });

    expect(s.countChanges(state)).toEqual(4);
  });

  it('getTotalWords', () => {
    const state = fromJS({
      localWords: [
        { id: 1, chinese: '我' },
        { id: null, chinese: '他' },
        { id: null, chinese: '木' }
      ],
      currentWords: [
        { id: 1, chinese: '我' },
        { id: 2, chinese: '你' },
        { id: 3, chinese: '谁', wordText: { manuallyAdded: true } },
        { id: 4, chinese: '说', wordText: { manuallyDeleted: true } }
      ],
      wordsToDelete: [{ id: 2, chinese: '你' }],
      visibilityFilter: 'all'
    });

    expect(s.getTotalWords(state)).toEqual(3);
  });

  it('countNewWords', () => {
    const state = fromJS({
      localWords: [],
      currentWords: [
        { id: 1, chinese: '我', texts: [] },
        { id: 2, chinese: '你', texts: [{ title: 'Lesson 1' }] },
        { id: 3, chinese: '他', texts: [] }
      ],
      wordsToDelete: [],
      visibilityFilter: 'all'
    });

    expect(s.countNewWords(state)).toEqual(2);
  });

  it('filterLocalWords with "all" visibilityFilter', () => {
    const state = fromJS({
      localWords: [
        { id: null, chinese: '我' },
        { id: 2, chinese: '你', texts: [{ title: 'Lesson 1' }] },
        { id: 3, chinese: '他', texts: [] }
      ],
      currentWords: [],
      wordsToDelete: [],
      visibilityFilter: 'all'
    });

    expect(s.filterLocalWords(state)).toEqual([
      { id: null, chinese: '我' },
      { id: 2, chinese: '你', texts: [{ title: 'Lesson 1' }] },
      { id: 3, chinese: '他', texts: [] }
    ]);
  });

  it('filterLocalWords with "new" visibilityFilter', () => {
    const state = fromJS({
      localWords: [
        { id: null, chinese: '我' },
        { id: 2, chinese: '你', texts: [{ title: 'Lesson 1' }] },
        { id: 3, chinese: '他', texts: [], wordText: { manuallyAdded: false } }
      ],
      currentWords: [],
      wordsToDelete: [],
      visibilityFilter: 'new'
    });

    expect(s.filterLocalWords(state)).toEqual([
      { id: 3, chinese: '他', texts: [], wordText: { manuallyAdded: false } }
    ]);
  });

  it('filterLocalWords with "notnew" visibilityFilter', () => {
    const state = fromJS({
      localWords: [
        { id: null, chinese: '我' },
        { id: 2, chinese: '你', texts: [{ title: 'Lesson 1' }] },
        { id: 3, chinese: '他', texts: [] }
      ],
      currentWords: [],
      wordsToDelete: [],
      visibilityFilter: 'notnew'
    });

    expect(s.filterLocalWords(state)).toEqual([
      { id: 2, chinese: '你', texts: [{ title: 'Lesson 1' }] }
    ]);
  });

  it('filterLocalWords with "notsaved" visibilityFilter', () => {
    const state = fromJS({
      localWords: [
        { id: null, chinese: '我' },
        { id: 2, chinese: '你', texts: [{ title: 'Lesson 1' }] },
        { id: 3, chinese: '他', texts: [] }
      ],
      currentWords: [],
      wordsToDelete: [],
      visibilityFilter: 'notsaved'
    });

    expect(s.filterLocalWords(state)).toEqual([
      { id: null, chinese: '我' }
    ]);
  });

  it('filterLocalWords with "manuallydeleted" visibilityFilter', () => {
    const state = fromJS({
      localWords: [
        { id: null, chinese: '我' },
        { id: 2,
          chinese: '你',
          texts: [{ title: 'Lesson 1' }],
          wordText: { manuallyDeleted: true }
        },
        { id: 3, chinese: '他', texts: [], wordText: { manuallyDeleted: false } }
      ],
      currentWords: [],
      wordsToDelete: [],
      visibilityFilter: 'manuallydeleted'
    });

    expect(s.filterLocalWords(state)).toEqual([
      { id: 2,
        chinese: '你',
        texts: [{ title: 'Lesson 1' }],
        wordText: { manuallyDeleted: true }
      }
    ]);
  });

});
