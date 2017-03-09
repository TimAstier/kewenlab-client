import * as t from './actionTypes';

export function setSuggestionTextNumber(number) {
  return {
    type: t.SET_SUGGESTION_TEXT_NUMBER,
    number
  };
}
