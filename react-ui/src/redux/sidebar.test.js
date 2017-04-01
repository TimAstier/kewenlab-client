import reducer, * as actions from './sidebar';
import { Map, List } from 'immutable';

// reducer test
describe('sidebar reducer', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, {})).toEqual(Map({
      textItems: List([]),
      currentTextId: 0,
      isFetching: false
    }));
  });

  it('handles SET_TEXT_ITEMS', () => {
    const initialState = Map({
      textItems: List([
        { id: 1, title: 'Lesson 1', order: 1 },
        { id: 2, title: 'Lesson 2', order: 1 }
      ]),
      currentTextId: 1
    });
    const textItems = List([
      { id: 1, title: 'New title', order: 1 },
      { id: 2, title: 'Lesson 3', order: 3 },
      { id: 4, title: 'Lesson 2', order: 2 }
    ]);
    const action = actions.setTextItems(textItems);
    const nextState = reducer(initialState, action);

    expect(nextState).toEqual(Map({
      textItems,
      currentTextId: 1
    }));
  });

  it('handles SET_CURRENT_TEXT_ID', () => {
    const initialState = Map({
      textItems: List([
        { id: 1, title: 'Lesson 1', order: 1 }
      ]),
      currentTextId: 0
    });
    const action = actions.setCurrentTextId({ id: 1, title: 'Lesson 1', order: 1 });
    const nextState = reducer(initialState, action);

    expect(nextState).toEqual(Map({
      textItems: List([
        { id: 1, title: 'Lesson 1', order: 1 }
      ]),
      currentTextId: 1
    }));
  });
});
