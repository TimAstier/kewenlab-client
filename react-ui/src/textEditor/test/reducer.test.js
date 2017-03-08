import { Map } from 'immutable';

import reducer, { getSaved } from '../reducer';

describe('textEditor reducer', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, {})).toEqual(Map({
      localContent: '',
      currentContent: '',
      isSaving: false
    }));
  });

  it('handles SET_LOCAL_CONTENT', () => {
    const initialState = Map({
      localContent: '我还没变。',
      currentContent: '我没变。'
    });
    const action = { type: 'SET_LOCAL_CONTENT', localContent: '我变了。' };
    const nextState = reducer(initialState, action);

    expect(nextState).toEqual(Map({
      localContent: '我变了。',
      currentContent: '我没变。'
    }));
  });

  it('handles SET_CURRENT_CONTENT', () => {
    const initialState = Map({
      localContent: '法国',
      currentContent: '中国'
    });
    const action = { type: 'SET_CURRENT_CONTENT', currentContent: '瑞典' };
    const nextState = reducer(initialState, action);

    expect(nextState).toEqual(Map({
      localContent: '法国',
      currentContent: '瑞典'
    }));
  });

  it('handles SAVE_TEXT_CONTENT', () => {
    const initialState = Map({
      isSaving: false
    });
    const action = { type: 'SAVE_TEXT_CONTENT' };
    const nextState = reducer(initialState, action);

    expect(nextState).toEqual(Map({
      isSaving: true
    }));
  });

  it('handles SAVE_TEXT_CONTENT_SUCCESS', () => {
    const initialState = Map({
      isSaving: true
    });
    const action = { type: 'SAVE_TEXT_CONTENT_SUCCESS' };
    const nextState = reducer(initialState, action);

    expect(nextState).toEqual(Map({
      isSaving: false
    }));
  });

  it('handles SAVE_TEXT_CONTENT_FAILURE', () => {
    const initialState = Map({
      isSaving: true
    });
    const action = { type: 'SAVE_TEXT_CONTENT_FAILURE' };
    const nextState = reducer(initialState, action);

    expect(nextState).toEqual(Map({
      isSaving: false
    }));
  });

  it('has a working getSaved selector', () => {
    const stateA = Map({
      localContent: '法国',
      currentContent: '法国'
    });
    const stateB = Map({
      localContent: '',
      currentContent: '法国'
    });
    const savedA = getSaved(stateA);
    const savedB = getSaved(stateB);

    expect(savedA).toEqual(true);
    expect(savedB).toEqual(false);
  });
});
