import reducer, * as actions from '../suggestions';
import { Map, List, fromJS } from 'immutable';

// TODO: async action creators and operations

describe('reducer', () => {
  const INITIAL_STATE = Map({
    chars: List(),
    words: List(),
    isFetching: false
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  describe('FETCH', () => {
    it('should set isFetching to true', () => {
      const action = { type: 'kewen-lab/suggestions/FETCH' };
      expect(reducer(INITIAL_STATE, action))
        .toEqual(Map({
          chars: List(),
          words: List(),
          isFetching: true
        }));
    });
  });

  describe('FETCH_SUCCESS', () => {
    it('should set isFetching to false', () => {
      const action = { type: 'kewen-lab/suggestions/FETCH_SUCESS' };
      expect(reducer(INITIAL_STATE, action))
        .toEqual(Map({
          chars: List(),
          words: List(),
          isFetching: false
        }));
    });
  });

  describe('FETCH_FAILURE', () => {
    it('should set isFetching to false', () => {
      const action = { type: 'kewen-lab/suggestions/FETCH_FAILURE' };
      expect(reducer(INITIAL_STATE, action))
        .toEqual(Map({
          chars: List(),
          words: List(),
          isFetching: false
        }));
    });
  });

  describe('setSuggestions', () => {
    it('should be handled by reducer', () => {
      const data = {
        chars: ['a', 'b'],
        words: ['abc', 'def']
      };
      expect(reducer(INITIAL_STATE, actions.setSuggestions(data)))
        .toEqual(fromJS({
          chars: ['a', 'b'],
          words: ['abc', 'def'],
          isFetching: false
        }));
    });
  });

  describe('clearSuggestions', () => {
    it('should be handled by reducer', () => {
      const state = fromJS({
        chars: ['a', 'b', 'c'],
        words: ['abc'],
        isFetching: false
      });
      expect(reducer(state, actions.clearSuggestions()))
        .toEqual(INITIAL_STATE);
    });
  });

  describe('removeWordSuggestion', () => {
    it('should remove only the word with given id', () => {
      const state = fromJS({
        words: [{ id: 1 }, { id: 2 }, { id: 3 }]
      });
      expect(reducer(state, actions.removeWordSuggestion(2)))
        .toEqual(fromJS({
          words: [{ id: 1 }, { id: 3 }]
        }));
    });
  });

  describe('toggleFavorite', () => {
    it('should toggle favorite value of word with a given id', () => {
      const state = fromJS({
        words: [{ id: 1, favorite: false }, { id: 2, favorite: true }]
      });
      expect(reducer(state, actions.toggleFavorite(2)))
        .toEqual(fromJS({
          words: [{ id: 1, favorite: false }, { id: 2, favorite: false }],
        }));
      expect(reducer(state, actions.toggleFavorite(1)))
        .toEqual(fromJS({
          words: [{ id: 1, favorite: true }, { id: 2, favorite: true }],
        }));
    });
  });
});
