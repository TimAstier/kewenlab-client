import { Map } from 'immutable';
import reducer, * as actions from './suggestionInput';

describe('suggestionInput reducer', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, {})).toEqual(Map({
      textNumber: 0
    }));
  });

  describe('SET_SUGGESTION_TEXT_NUMBER', () => {
    it('is handled', () => {
      const initialState = Map({
        textNumber: 0
      });
      const action = actions.setSuggestionTextNumber(3);
      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(Map({
        textNumber: 3
      }));
    });

    it('handles NaN cases', () => {
      const initialState = Map({
        textNumber: 3
      });
      const action = actions.setSuggestionTextNumber('a');
      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(Map({
        textNumber: 0
      }));
    });
  });
});
